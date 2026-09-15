"use client";

import { motion } from "framer-motion";

const arcLetters = [
  { char: "A", rest: { y: 0, x: 0, rotate: 0 }, hover: { y: -2, x: -6, rotate: -22 } },
  { char: "r", rest: { y: 0, x: 0, rotate: 0 }, hover: { y: -20, x: 0, rotate: 0 } },
  { char: "c", rest: { y: 0, x: 0, rotate: 0 }, hover: { y: -2, x: 6, rotate: 22 } },
];

export default function ArcTitle({ title }: { title: string }) {
  const rest = title.slice(3);

  return (
    <motion.h1
      initial="rest"
      whileHover="hover"
      className="mt-6 cursor-default font-display text-[clamp(2.75rem,8vw,5rem)] leading-[1.02]"
    >
      <span className="inline-flex">
        {arcLetters.map((l, i) => (
          <motion.span
            key={i}
            variants={{ rest: l.rest, hover: l.hover }}
            transition={{ type: "spring", stiffness: 300, damping: 12 }}
            className="inline-block"
          >
            {l.char}
          </motion.span>
        ))}
      </span>
      {rest}
    </motion.h1>
  );
}
