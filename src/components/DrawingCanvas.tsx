"use client";

import { useEffect, useRef, useState } from "react";

type Tool =
  | "pencil"
  | "brush"
  | "spray"
  | "eraser"
  | "rect"
  | "square"
  | "circle"
  | "triangle"
  | "star"
  | "smiley"
  | "text";

const PALETTE = [
  "#000000", "#7f7f7f", "#880015", "#ed1c24", "#ff7f27", "#fff200",
  "#22b14c", "#00a2e8", "#3f48cc", "#a349a4",
  "#ffffff", "#c3c3c3", "#b97a57", "#ffaec9", "#ffc90e", "#efe4b0",
  "#b5e61d", "#99d9ea", "#7092be", "#c8bfe7",
  "#fcd7e0", "#c0e2fa", "#d6c9f2", "#1c05a1",
];

const CANVAS_W = 760;
const CANVAS_H = 460;

function getPos(canvas: HTMLCanvasElement, e: { clientX: number; clientY: number }) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  return {
    x: (e.clientX - rect.left) * scaleX,
    y: (e.clientY - rect.top) * scaleY,
  };
}

function drawSmiley(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string) {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const r = Math.max(8, Math.min(Math.abs(x1 - x0), Math.abs(y1 - y0)) / 2);
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(cx - r * 0.35, cy - r * 0.25, Math.max(2, r * 0.08), 0, Math.PI * 2);
  ctx.arc(cx + r * 0.35, cy - r * 0.25, Math.max(2, r * 0.08), 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(cx, cy + r * 0.05, r * 0.55, 0.15 * Math.PI, 0.85 * Math.PI);
  ctx.stroke();
}

function drawStar(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string) {
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  const outer = Math.max(8, Math.min(Math.abs(x1 - x0), Math.abs(y1 - y0)) / 2);
  const inner = outer * 0.42;
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    const r = i % 2 === 0 ? outer : inner;
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawTriangle(ctx: CanvasRenderingContext2D, x0: number, y0: number, x1: number, y1: number, color: string) {
  ctx.strokeStyle = color;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo((x0 + x1) / 2, y0);
  ctx.lineTo(x0, y1);
  ctx.lineTo(x1, y1);
  ctx.closePath();
  ctx.stroke();
}

const TOOLS: { id: Tool; label: string; icon: React.ReactNode }[] = [
  {
    id: "pencil",
    label: "Pencil",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <path d="M3 17l1-4 9-9 3 3-9 9-4 1z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "brush",
    label: "Brush",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <path d="M13 3c2 0 4 2 4 4-3 1-5 3-6 6l-3-3c1-3 3-6 5-7z" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <path d="M8 10l-4 4 2 2 4-4" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: "spray",
    label: "Spray can",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <rect x="6" y="8" width="7" height="10" rx="1" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <rect x="8" y="4" width="3" height="4" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="15" cy="4" r="0.6" fill="currentColor" />
        <circle cx="17" cy="6" r="0.6" fill="currentColor" />
        <circle cx="16" cy="3" r="0.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: "eraser",
    label: "Eraser",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <rect x="4" y="10" width="12" height="6" rx="1" transform="rotate(-20 10 13)" fill="none" stroke="currentColor" strokeWidth="1.3" />
      </svg>
    ),
  },
  {
    id: "rect",
    label: "Rectangle",
    icon: <svg viewBox="0 0 20 20" width="16" height="16"><rect x="3" y="5" width="14" height="10" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>,
  },
  {
    id: "square",
    label: "Square",
    icon: <svg viewBox="0 0 20 20" width="16" height="16"><rect x="4" y="4" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>,
  },
  {
    id: "circle",
    label: "Circle",
    icon: <svg viewBox="0 0 20 20" width="16" height="16"><circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.4" /></svg>,
  },
  {
    id: "triangle",
    label: "Triangle",
    icon: <svg viewBox="0 0 20 20" width="16" height="16"><path d="M10 3l7 14H3z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" /></svg>,
  },
  {
    id: "star",
    label: "Star",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <path d="M10 2l2.2 5.8L18 9l-4.6 3.6L14.7 18 10 14.6 5.3 18l1.3-5.4L2 9l5.8-1.2z" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: "smiley",
    label: "Smiley",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" strokeWidth="1.3" />
        <circle cx="7.5" cy="8.5" r="0.9" fill="currentColor" />
        <circle cx="12.5" cy="8.5" r="0.9" fill="currentColor" />
        <path d="M6.5 12c1 1.5 6 1.5 7 0" fill="none" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    id: "text",
    label: "Text",
    icon: (
      <svg viewBox="0 0 20 20" width="16" height="16">
        <text x="5" y="15" fontSize="13" fontFamily="Georgia, serif" fill="currentColor">A</text>
      </svg>
    ),
  },
];

export default function DrawingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const snapshotRef = useRef<ImageData | null>(null);
  const startRef = useRef<{ x: number; y: number } | null>(null);
  const lastRef = useRef<{ x: number; y: number } | null>(null);
  const drawingRef = useRef(false);

  const [tool, setTool] = useState<Tool>("pencil");
  const [color, setColor] = useState("#013961");
  const [textInput, setTextInput] = useState<{ x: number; y: number; value: string } | null>(null);
  const [sentState, setSentState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textInput) {
      textInputRef.current?.focus();
    }
  }, [textInput === null]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  function widthForTool(t: Tool) {
    if (t === "pencil") return 1.5;
    if (t === "brush") return 5;
    if (t === "spray") return 1;
    if (t === "eraser") return 18;
    return 3;
  }

  function canvasClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (tool !== "text") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const pos = getPos(canvas, e);
    setTextInput({ x: pos.x, y: pos.y, value: "" });
  }

  function pointerDown(e: React.PointerEvent<HTMLCanvasElement>) {
    if (tool === "text") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(canvas, e);

    canvas.setPointerCapture(e.pointerId);
    drawingRef.current = true;
    startRef.current = pos;
    lastRef.current = pos;

    const isShape = ["rect", "square", "circle", "triangle", "star", "smiley"].includes(tool);
    if (isShape) {
      snapshotRef.current = ctx.getImageData(0, 0, canvas.width, canvas.height);
    } else {
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = widthForTool(tool);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
      ctx.lineTo(pos.x + 0.01, pos.y + 0.01);
      ctx.stroke();
    }
  }

  function pointerMove(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!drawingRef.current) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const pos = getPos(canvas, e);

    if (tool === "spray") {
      ctx.fillStyle = color;
      for (let i = 0; i < 14; i++) {
        const angle = Math.random() * Math.PI * 2;
        const radius = Math.random() * 9;
        ctx.fillRect(pos.x + Math.cos(angle) * radius, pos.y + Math.sin(angle) * radius, 1, 1);
      }
      lastRef.current = pos;
      return;
    }

    if (tool === "pencil" || tool === "brush" || tool === "eraser") {
      const last = lastRef.current ?? pos;
      ctx.strokeStyle = tool === "eraser" ? "#ffffff" : color;
      ctx.lineWidth = widthForTool(tool);
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(last.x, last.y);
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();
      lastRef.current = pos;
      return;
    }

    // shape preview (rubber-band)
    if (snapshotRef.current && startRef.current) {
      ctx.putImageData(snapshotRef.current, 0, 0);
      const { x: x0, y: y0 } = startRef.current;
      let x1 = pos.x;
      let y1 = pos.y;
      if (tool === "square") {
        const side = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0));
        x1 = x0 + Math.sign(x1 - x0 || 1) * side;
        y1 = y0 + Math.sign(y1 - y0 || 1) * side;
      }
      if (tool === "rect" || tool === "square") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        ctx.strokeRect(Math.min(x0, x1), Math.min(y0, y1), Math.abs(x1 - x0), Math.abs(y1 - y0));
      } else if (tool === "circle") {
        ctx.strokeStyle = color;
        ctx.lineWidth = 3;
        const cx = (x0 + x1) / 2;
        const cy = (y0 + y1) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, Math.abs(x1 - x0) / 2, Math.abs(y1 - y0) / 2, 0, 0, Math.PI * 2);
        ctx.stroke();
      } else if (tool === "triangle") {
        drawTriangle(ctx, x0, y0, x1, y1, color);
      } else if (tool === "star") {
        drawStar(ctx, x0, y0, x1, y1, color);
      } else if (tool === "smiley") {
        drawSmiley(ctx, x0, y0, x1, y1, color);
      }
    }
  }

  function pointerUp() {
    drawingRef.current = false;
    snapshotRef.current = null;
    startRef.current = null;
    lastRef.current = null;
  }

  function commitText() {
    if (!textInput) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx && textInput.value.trim()) {
      ctx.fillStyle = color;
      ctx.font = "22px Karla, ui-sans-serif, sans-serif";
      ctx.textBaseline = "top";
      ctx.fillText(textInput.value, textInput.x, textInput.y);
    }
    setTextInput(null);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (canvas && ctx) {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  function handleDownload() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob((blob) => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "my-drawing.png";
      a.click();
      URL.revokeObjectURL(url);
    }, "image/png");
  }

  async function handleSend() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const file = new File([blob], "drawing-for-mahsa.png", { type: "image/png" });

      const nav = navigator as Navigator & {
        canShare?: (data?: { files?: File[] }) => boolean;
        share?: (data: { files?: File[]; title?: string; text?: string }) => Promise<void>;
      };

      if (nav.canShare?.({ files: [file] }) && nav.share) {
        try {
          await nav.share({
            files: [file],
            title: "A drawing for Mahsa",
            text: "Made this on your site!",
          });
          setSentState("sent");
          setTimeout(() => setSentState("idle"), 3000);
          return;
        } catch {
          // user cancelled or share failed — fall through to email fallback
        }
      }

      setSentState("sending");
      try {
        const body = new FormData();
        body.append("drawing", blob, "drawing-for-mahsa.png");
        const res = await fetch("/api/send-drawing", { method: "POST", body });
        if (!res.ok) throw new Error("failed");
        setSentState("sent");
      } catch {
        setSentState("error");
      }
      setTimeout(() => setSentState("idle"), 3000);
    }, "image/png");
  }

  return (
    <div className="mx-auto w-full max-w-4xl select-none rounded-sm border-2 border-[#0a0a6e] bg-[#c3c3c3] p-[3px] shadow-[4px_4px_0_rgba(0,0,0,0.25)]">
      {/* title bar */}
      <div className="flex items-center justify-between rounded-t-[1px] bg-gradient-to-r from-[#000080] to-[#1c05a1] px-2 py-1">
        <span className="font-display text-xs text-white sm:text-sm">Paint</span>
        <div className="flex gap-1">
          {["_", "□", "x"].map((s) => (
            <span
              key={s}
              className="flex h-4 w-4 items-center justify-center border border-[#7f7f7f] bg-[#c3c3c3] text-[9px] leading-none text-black"
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* menu bar */}
      <div className="flex gap-4 bg-[#c3c3c3] px-2 py-1 text-xs text-black">
        {["File", "Edit", "View", "Image", "Colors", "Help"].map((m) => (
          <span key={m}>{m}</span>
        ))}
      </div>

      <div className="flex gap-1 bg-[#c3c3c3] p-1">
        {/* tool box */}
        <div className="grid h-fit grid-cols-2 gap-[2px] border border-[#7f7f7f] bg-[#c3c3c3] p-1">
          {TOOLS.map((t) => (
            <button
              key={t.id}
              type="button"
              title={t.label}
              onClick={() => setTool(t.id)}
              className={`flex h-6 w-6 items-center justify-center text-black ${
                tool === t.id
                  ? "border border-[#7f7f7f] bg-[#a8a8a8] shadow-[inset_1px_1px_0_rgba(0,0,0,0.4)]"
                  : "border border-transparent bg-[#c3c3c3] shadow-[1px_1px_0_#fff,inset_1px_1px_0_#e8e8e8] hover:bg-[#d4d4d4]"
              }`}
            >
              {t.icon}
            </button>
          ))}
        </div>

        {/* canvas */}
        <div className="relative flex-1 border border-[#7f7f7f] bg-white">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
            onPointerLeave={pointerUp}
            onClick={canvasClick}
            className="block h-auto w-full touch-none"
            style={{ cursor: tool === "text" ? "text" : "crosshair" }}
          />
          {textInput && (
            <input
              ref={textInputRef}
              value={textInput.value}
              onChange={(e) => setTextInput({ ...textInput, value: e.target.value })}
              onBlur={commitText}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitText();
                if (e.key === "Escape") setTextInput(null);
              }}
              style={{
                position: "absolute",
                left: `${(textInput.x / CANVAS_W) * 100}%`,
                top: `${(textInput.y / CANVAS_H) * 100}%`,
                maxWidth: `calc(${100 - (textInput.x / CANVAS_W) * 100}% - 4px)`,
                color,
              }}
              className="w-36 max-w-full border border-dashed border-ink bg-white/90 px-1 text-lg outline-none"
            />
          )}
        </div>
      </div>

      {/* color palette */}
      <div className="flex items-center gap-2 bg-[#c3c3c3] p-2">
        <div className="relative h-8 w-10 shrink-0">
          <span
            className="absolute left-0 top-0 h-6 w-7 border border-[#7f7f7f]"
            style={{ background: "#ffffff" }}
          />
          <span
            className="absolute bottom-0 right-0 h-6 w-7 border border-[#7f7f7f]"
            style={{ background: color }}
          />
        </div>
        <div className="grid grid-cols-11 gap-[3px]">
          {PALETTE.map((c) => (
            <button
              key={c}
              type="button"
              title={c}
              onClick={() => setColor(c)}
              className={`h-4 w-4 border ${color === c ? "border-2 border-black" : "border-[#7f7f7f]"}`}
              style={{ background: c }}
            />
          ))}
        </div>
      </div>

      {/* action buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2 bg-[#c3c3c3] px-2 pb-2">
        <button
          type="button"
          title="clear the canvas"
          onClick={clearCanvas}
          className="border border-[#7f7f7f] bg-[#c3c3c3] px-3 py-1 text-xs text-black shadow-[1px_1px_0_#fff] hover:bg-[#d4d4d4] active:shadow-[inset_1px_1px_0_rgba(0,0,0,0.4)]"
        >
          Clear
        </button>
        <div className="flex gap-2">
          <button
            type="button"
            title="download for you"
            onClick={handleDownload}
            className="border border-[#7f7f7f] bg-[#c3c3c3] px-4 py-1 text-xs text-black shadow-[1px_1px_0_#fff] hover:bg-[#d4d4d4] active:shadow-[inset_1px_1px_0_rgba(0,0,0,0.4)]"
          >
            Download
          </button>
          <button
            type="button"
            title="send to mahsa"
            onClick={handleSend}
            disabled={sentState === "sending"}
            className="border border-[#7f7f7f] bg-[#c3c3c3] px-4 py-1 text-xs text-black shadow-[1px_1px_0_#fff] hover:bg-[#d4d4d4] active:shadow-[inset_1px_1px_0_rgba(0,0,0,0.4)] disabled:opacity-60"
          >
            {sentState === "sending"
              ? "Sending…"
              : sentState === "sent"
                ? "Sent!"
                : sentState === "error"
                  ? "Couldn't send"
                  : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
}
