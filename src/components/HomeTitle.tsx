"use client";

import { motion } from "framer-motion";

export default function HomeTitle() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="px-5 pt-20 text-center sm:pt-24"
    >
      <h1 className="font-display text-[clamp(1.75rem,4.5vw,3rem)] leading-[0.95]">
        Mahsa Hosseini
      </h1>
      <p className="mt-2 text-center text-xs sm:text-sm text-ink-soft">Multidisciplinary Artist</p>
    </motion.div>
  );
}
