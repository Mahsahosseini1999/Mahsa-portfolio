"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Trinket = {
  href: string;
  label: string;
  depth: number;
  className: string;
  rotate: number;
  floatDuration: number;
  roamX: number[];
  roamY: number[];
  node: React.ReactNode;
};

const trinkets: Trinket[] = [
  {
    href: "/projects/interrelation",
    label: "Interrelation — a set of chairs",
    depth: 26,
    rotate: -8,
    floatDuration: 16,
    roamX: [0, 90, 40, -60, 0],
    roamY: [0, -60, -140, -50, 0],
    className: "left-[6%] bottom-[10%] w-16 sm:w-24",
    node: (
      <svg viewBox="0 0 100 70" fill="none">
        <path
          d="M15 62h18V44a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v18h18M18 44V16a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v10M57 44V16a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v10"
          stroke="#ff8a00"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    href: "/projects/where-it-ends-up",
    label: "Where It Ends Up — cables",
    depth: 40,
    rotate: 14,
    floatDuration: 19,
    roamX: [0, -100, -40, 70, 0],
    roamY: [0, 70, 150, 60, 0],
    className: "right-[8%] top-[14%] w-14 sm:w-20",
    node: (
      <svg viewBox="0 0 100 100" fill="none">
        <path
          d="M20 80c0-33 60-13 60-46 0-14-12-22-24-18"
          stroke="#0091ff"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <circle cx="20" cy="80" r="5" fill="#ff3355" />
      </svg>
    ),
  },
  {
    href: "/projects/arc-of-birth",
    label: "Arc of Birth — a scribble",
    depth: 55,
    rotate: -18,
    floatDuration: 14,
    roamX: [0, 70, 130, 50, 0],
    roamY: [0, 80, 20, -60, 0],
    className: "left-[10%] top-[18%] w-14 sm:w-20",
    node: (
      <svg viewBox="0 0 100 60" fill="none">
        <path d="M6 40c5-15 10-24 15-24s5 20 10 20 5-30 15-30" stroke="#ff3355" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M46 6c5 15 5 24 10 24s5-20 10-20 5 30 15 30" stroke="#ffd400" strokeWidth="4" strokeLinecap="round" fill="none" />
        <path d="M76 40c5-8 8-12 14-12" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
    ),
  },
  {
    href: "/projects/brick-ballet",
    label: "Brick Ballet — a footprint",
    depth: 20,
    rotate: 10,
    floatDuration: 21,
    roamX: [0, -80, -150, -70, 0],
    roamY: [0, -90, -30, 60, 0],
    className: "right-[6%] bottom-[12%] w-14 sm:w-20",
    node: (
      <svg viewBox="0 0 90 60" fill="none">
        <rect x="4" y="4" width="82" height="52" rx="2" fill="#7c3aed" opacity="0.18" stroke="#7c3aed" strokeWidth="2.4" />
        <rect x="14" y="14" width="30" height="20" rx="1" fill="none" stroke="#7c3aed" strokeWidth="1.8" />
      </svg>
    ),
  },
  {
    href: "/projects/people-places-time",
    label: "People, Places, Time — a photo corner",
    depth: 34,
    rotate: -22,
    floatDuration: 17,
    roamX: [0, 60, 140, 80, 0],
    roamY: [0, -70, -20, 50, 0],
    className: "left-[20%] top-[62%] w-12 sm:w-16",
    node: (
      <svg viewBox="0 0 80 80" fill="none">
        <rect x="10" y="10" width="60" height="60" fill="none" stroke="#00c853" strokeWidth="3.4" />
        <path d="M10 45l16-16 12 12 10-10 22 22" stroke="#ff8a00" strokeWidth="2.4" fill="none" />
      </svg>
    ),
  },
  {
    href: "/projects/in-the-ground",
    label: "In the Ground — a sprout",
    depth: 46,
    rotate: 6,
    floatDuration: 18,
    roamX: [0, -60, -20, 90, 0],
    roamY: [0, -80, -150, -60, 0],
    className: "right-[22%] bottom-[6%] w-12 sm:w-16",
    node: (
      <svg viewBox="0 0 60 80" fill="none">
        <path d="M30 75V35" stroke="#ff8a00" strokeWidth="2.8" strokeLinecap="round" />
        <path d="M30 40c-10 0-16-8-16-18 10 0 16 8 16 18z" fill="#00c853" />
        <path d="M30 32c10 0 16-9 16-20-10 0-16 9-16 20z" fill="#7c3aed" />
      </svg>
    ),
  },
  {
    href: "/projects/the-g-word",
    label: "The G Word — a gun",
    depth: 30,
    rotate: -14,
    floatDuration: 20,
    roamX: [0, 80, 150, 70, 0],
    roamY: [0, -70, -10, 60, 0],
    className: "left-[44%] bottom-[8%] w-12 sm:w-16",
    node: (
      <svg viewBox="0 0 100 60" fill="none">
        <path
          d="M8 32h50a6 6 0 0 0 6-6V14h20v10h8v8H82a4 4 0 0 0-4 4c0 9-7 16-16 16H30"
          stroke="#ff2e63"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M30 46 22 58" stroke="#ff2e63" strokeWidth="3.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    href: "/projects/one-piece",
    label: "One Piece — a straw hat",
    depth: 38,
    rotate: -6,
    floatDuration: 15,
    roamX: [0, -90, -20, 100, 0],
    roamY: [0, 60, 130, 40, 0],
    className: "right-[38%] top-[8%] w-14 sm:w-20",
    node: (
      <svg viewBox="0 0 100 70" fill="none">
        <ellipse cx="50" cy="30" rx="46" ry="10" fill="#ffd400" stroke="#013961" strokeWidth="2.4" />
        <path d="M22 30c0-14 12-24 28-24s28 10 28 24" fill="#ffd400" stroke="#013961" strokeWidth="2.4" />
        <rect x="22" y="26" width="56" height="8" rx="1" fill="#ff2e63" />
      </svg>
    ),
  },
];

export default function HomeScene() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative flex min-h-[calc(100svh-1px)] flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {trinkets.map((t) => (
        <Piece key={t.href} trinket={t} sx={sx} sy={sy} />
      ))}

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10"
      >
        <h1 className="font-display text-[clamp(3rem,11vw,7.5rem)] leading-[0.95]">
          Mahsa Hosseini
        </h1>
        <p className="mt-6 text-center text-sm sm:text-base text-ink-soft">Multidisciplinary Artist</p>
      </motion.div>
    </div>
  );
}

function Piece({
  trinket,
  sx,
  sy,
}: {
  trinket: Trinket;
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
}) {
  const x = useTransform(sx, (v) => v * trinket.depth);
  const y = useTransform(sy, (v) => v * trinket.depth);

  return (
    <motion.div
      style={{ x, y, rotate: trinket.rotate }}
      className={`absolute z-0 ${trinket.className}`}
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.15 }}
    >
      <motion.div
        animate={{
          x: trinket.roamX,
          y: trinket.roamY,
          rotate: [0, trinket.rotate > 0 ? 10 : -10, trinket.rotate > 0 ? -6 : 6, 0],
        }}
        transition={{ duration: trinket.floatDuration, repeat: Infinity, ease: "easeInOut" }}
      >
        <Link
          href={trinket.href}
          aria-label={trinket.label}
          className="block opacity-90 transition-opacity hover:opacity-100"
        >
          <motion.div whileHover={{ rotate: 4, scale: 1.06 }}>{trinket.node}</motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}
