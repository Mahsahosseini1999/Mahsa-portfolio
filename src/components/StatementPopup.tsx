"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";

const statement = [
  "I am interested in what our actions leave behind, in the earth, on nonhumans and on humans. I work across drawing, installation, video, sound and photography, selecting the medium by intuition and by the physical and sensory conditions each project asks for.",
  "I am developing a practice of close observation and responsiveness to what materials do. I try to let go of control. Wind and mold have changed my works, and I let those changes become part of them.",
  "My process is slow and repeated. I drew the same pregnant body again and again. During the exhibition “I Myself Grew From This Murky Soil,” I watered the soil almost every hour. Through these repeated acts I make rituals of my own.",
  "I want the audience to do more than look.",
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
        className="mx-auto mt-3 block text-[#ffd400] underline decoration-[#ffd400] underline-offset-4 [text-shadow:0_1px_0_#013961,0_-1px_0_#013961,1px_0_0_#013961,-1px_0_0_#013961] transition-colors hover:text-[#fff3a0]"
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
