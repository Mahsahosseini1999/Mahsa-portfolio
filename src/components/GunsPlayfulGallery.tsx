"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";
import Slideshow from "@/components/Slideshow";

type GalleryImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

type Piece = {
  left: string;
  top: string;
  rotate: number;
  width: string;
  duration: number;
  roamX: number[];
  roamY: number[];
  scale: number[];
  fallX: number;
};

const pieces: Piece[] = [
  { left: "4%", top: "1%", rotate: -12, width: "w-28 sm:w-40", duration: 3.2, roamX: [0, 90, -60, 130, 0], roamY: [0, -70, 40, -110, 0], scale: [1, 1.2, 0.8, 1.1, 1], fallX: -10 },
  { left: "58%", top: "0%", rotate: 9, width: "w-24 sm:w-36", duration: 12.5, roamX: [0, -100, 70, -130, 0], roamY: [0, 80, -50, 100, 0], scale: [1, 0.75, 1.25, 0.9, 1], fallX: 14 },
  { left: "30%", top: "11%", rotate: 16, width: "w-32 sm:w-44", duration: 2.4, roamX: [0, 70, -110, 60, 0], roamY: [0, -110, 50, -70, 0], scale: [1, 1.25, 0.8, 1.1, 1], fallX: -18 },
  { left: "76%", top: "17%", rotate: -7, width: "w-28 sm:w-40", duration: 15, roamX: [0, -120, 80, -60, 0], roamY: [0, 60, -90, 50, 0], scale: [1, 0.82, 1.2, 0.9, 1], fallX: 8 },
  { left: "9%", top: "27%", rotate: 20, width: "w-24 sm:w-36", duration: 4.6, roamX: [0, 100, -70, 110, 0], roamY: [0, -60, 90, -50, 0], scale: [1, 1.22, 0.78, 1.05, 1], fallX: -12 },
  { left: "44%", top: "24%", rotate: -18, width: "w-36 sm:w-48", duration: 17, roamX: [0, -90, 120, -70, 0], roamY: [0, 100, -60, 80, 0], scale: [1, 0.8, 1.25, 0.9, 1], fallX: 16 },
  { left: "66%", top: "37%", rotate: 11, width: "w-28 sm:w-40", duration: 3, roamX: [0, 110, -90, 60, 0], roamY: [0, -80, 70, -100, 0], scale: [1, 1.2, 0.8, 1.1, 1], fallX: -8 },
  { left: "4%", top: "47%", rotate: -8, width: "w-32 sm:w-44", duration: 13, roamX: [0, -70, 100, -120, 0], roamY: [0, 90, -70, 60, 0], scale: [1, 0.78, 1.22, 0.9, 1], fallX: 12 },
  { left: "36%", top: "49%", rotate: 14, width: "w-24 sm:w-36", duration: 5.8, roamX: [0, 120, -80, 90, 0], roamY: [0, -100, 60, -80, 0], scale: [1, 1.25, 0.8, 1.05, 1], fallX: -16 },
  { left: "56%", top: "57%", rotate: -15, width: "w-28 sm:w-40", duration: 9.5, roamX: [0, -110, 70, -90, 0], roamY: [0, 80, -100, 60, 0], scale: [1, 0.8, 1.2, 0.9, 1], fallX: 10 },
  { left: "80%", top: "54%", rotate: 6, width: "w-24 sm:w-36", duration: 2.8, roamX: [0, 90, -120, 70, 0], roamY: [0, -90, 60, -70, 0], scale: [1, 1.18, 0.8, 1.1, 1], fallX: -14 },
  { left: "18%", top: "64%", rotate: -10, width: "w-32 sm:w-44", duration: 16, roamX: [0, -100, 80, -110, 0], roamY: [0, 110, -70, 90, 0], scale: [1, 0.82, 1.24, 0.9, 1], fallX: 18 },
  { left: "48%", top: "71%", rotate: 18, width: "w-28 sm:w-40", duration: 6.4, roamX: [0, 80, -110, 90, 0], roamY: [0, -70, 100, -60, 0], scale: [1, 1.2, 0.8, 1.05, 1], fallX: -10 },
  { left: "66%", top: "80%", rotate: -6, width: "w-36 sm:w-52", duration: 11, roamX: [0, -90, 110, -80, 0], roamY: [0, 70, -90, 60, 0], scale: [1, 0.85, 1.18, 0.95, 1], fallX: 12 },
];

export default function GunsPlayfulGallery({ images }: { images: GalleryImage[] }) {
  const [mode, setMode] = useState<"playful" | "gallery">("playful");
  const [burst, setBurst] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setBurst(true);
      setTimeout(() => setBurst(false), 1300);
    }, 8500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <button
        type="button"
        onClick={() => setMode((m) => (m === "playful" ? "gallery" : "playful"))}
        className="self-start rounded-full border border-ink/20 px-5 py-2 text-sm uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
      >
        {mode === "playful" ? "Switch to gallery mode" : "Switch to playful mode"}
      </button>

      {mode === "playful" ? (
        <div className="relative min-h-[900px] overflow-hidden sm:min-h-[1200px]">
          {pieces.slice(0, images.length).map((piece, i) => {
            const img = images[i];
            return (
              <motion.div
                key={i}
                className={`absolute ${piece.width}`}
                style={{ left: piece.left, top: piece.top, rotate: piece.rotate }}
                initial={{ opacity: 0, x: piece.fallX, y: -260, scale: 0.6 }}
                animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                transition={{ duration: 0.85, delay: i * 0.15, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <motion.div
                  animate={{
                    x: piece.roamX,
                    y: piece.roamY,
                    scale: piece.scale,
                    rotate: [0, piece.rotate > 0 ? -6 : 6, piece.rotate > 0 ? 6 : -6, 0],
                  }}
                  transition={{
                    duration: burst ? piece.duration / 4 : piece.duration,
                    delay: i * 0.15 + 0.85,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    placeholder="blur"
                    sizes="(min-width: 640px) 20vw, 40vw"
                    className="h-auto w-full object-contain mix-blend-multiply"
                  />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <Slideshow images={images} captionColor="#013961" />
      )}
    </div>
  );
}
