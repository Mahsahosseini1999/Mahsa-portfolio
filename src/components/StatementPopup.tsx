"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const statement = [
  "I am interested in what our actions leave behind in the earth, on nonhumans, and on humans. I make drawings, installations, sound, video, and photographs about being alive in a world marked by violence and uncertainty, in a body that will die.",
  "I work with soil and other natural materials because they open up ways of thinking beyond myself. Through them, I try to find my way back to the living systems I am already part of, and to understand myself better as one living thing among others. I start by getting close. I observe, collect, touch, and carry. My attempts to care for or understand those systems can involve taking something from them.",
  "Repeating an action lets me feel and understand things that thinking alone cannot reach. Through these gestures, I make rituals of my own. I drew the same pregnant body again and again, and I drew every day for 40 days with turbah. I often begin without knowing exactly what I feel or think about a subject. Slowly, my relationship to it changes.",
  "I decide on the routine, but not the outcome. Wind and mold have changed my works, and I let those changes stay. I am curious about what emerges when I leave room for things I cannot control.",
];

export default function StatementPopup() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mx-auto mt-3 block text-[#013961] underline decoration-[#013961] underline-offset-4 transition-opacity hover:opacity-70"
      >
        Click to see the statement.
      </button>

      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/40 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setOpen(false)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Statement"
              className="relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-ink/20 bg-paper p-6 text-left font-sans shadow-xl sm:p-10"
              initial={{ y: 16, scale: 0.98 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ y: 16, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close statement"
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-ink transition-transform hover:rotate-90"
              >
                &times;
              </button>
              <h2 className="font-display text-3xl">Statement</h2>
              <div className="mt-6 flex flex-col gap-4 text-base leading-relaxed sm:text-lg">
                {statement.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
          document.body
        )}
    </>
  );
}
