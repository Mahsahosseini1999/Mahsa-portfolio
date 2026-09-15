"use client";

import { motion } from "framer-motion";

export default function AnimatedTitle({ title }: { title: string }) {
  return (
    <div className="mt-6 overflow-hidden">
      <motion.h1
        className="font-display text-[clamp(1.8rem,6.5vw,4rem)] leading-[1.02] whitespace-nowrap"
        animate={{ x: ["0%", "140%", "0%", "-140%", "0%"] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      >
        {title}
      </motion.h1>
    </div>
  );
}
