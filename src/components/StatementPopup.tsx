"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const statement = [
  "My practice moves between the body and the soil. In a world marked by violence and uncertainty, I am interested in what our actions leave behind in the earth, on nonhumans, and on humans. I came to soil through death, and to burial as a material process my body will go through one day. Soil is matter, and it is alive; things break down in it and become something else.",
  "Through working with soil, I try to find my way back to the living systems my body belongs to. I start by getting close. I observe, collect, touch, and carry. I draw with soil on paper and lotus leaves, record sounds, and translate the process into installation, video, and photography. I take soil from the places my research leads me to. My attentiveness is not innocent, which leads me to ask: can attention alone be a form of care?",
  "Repetition is my method, a self-made ritual. I drew the pregnant body again and again, and drew with turbah, a soil I have eaten since childhood, every day for 40 days. I set the routine and let go of the outcome. Wind, water, mold, and the failures of an old camera change the work, and I keep what they change.",
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
              className="relative max-h-[94vh] w-full max-w-2xl overflow-y-auto rounded-sm border border-ink/20 bg-paper p-5 text-left font-sans shadow-xl sm:px-10 sm:py-8"
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
              <div className="mt-4 flex flex-col gap-3 text-[clamp(0.875rem,2.3vh,1.125rem)] leading-relaxed">
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
