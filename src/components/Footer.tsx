"use client";

import { useState, type CSSProperties } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const notes = [
  "still sailing",
  "hi",
  "obsessed with something new this week",
  "her room is never chaos",
];

type FooterTheme = {
  bg: string;
  text: string;
  textSoft: string;
};

export default function Footer({ theme }: { theme?: FooterTheme }) {
  const [noteIndex, setNoteIndex] = useState<number | null>(null);

  const style = theme
    ? ({
        background: theme.bg,
        color: theme.text,
        "--ink": theme.text,
        "--ink-soft": theme.textSoft,
      } as CSSProperties & Record<string, string>)
    : undefined;

  return (
    <footer
      className={`relative border-t border-ink/10 px-5 py-8 sm:px-8 lg:px-12 ${theme ? "" : "bg-paper-deep"}`}
      style={style}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-display text-3xl">Mahsa Hosseini</p>
          <p className="mt-1 text-sm text-ink-soft">Groningen, Netherlands</p>
        </div>

        <div className="flex flex-col items-start gap-3 text-sm sm:items-end">
          <Link
            href="/contact"
            className="underline decoration-ink/30 underline-offset-4 hover:decoration-accent hover:text-accent transition-colors"
          >
            Contact
          </Link>
          <div className="flex items-center gap-4">
            <a
              href="https://on.soundcloud.com/lIrFovyiY4OGvQjVDy"
              target="_blank"
              rel="noreferrer"
              aria-label="SoundCloud"
              className="text-ink transition-colors hover:text-accent"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path
                  d="M3 15.5v-3M5.2 16v-5M7.4 16v-7M9.6 16.2V10M11.8 16.2V8.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M12.2 16.2h6.3a2.9 2.9 0 0 0 .5-5.76 3.9 3.9 0 0 0-7.4-1.5 2.3 2.3 0 0 0-.9-.06z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="https://youtube.com/@mahsahosseini99"
              target="_blank"
              rel="noreferrer"
              aria-label="YouTube"
              className="text-ink transition-colors hover:text-accent"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <rect x="2" y="5.5" width="20" height="13" rx="4" stroke="currentColor" strokeWidth="1.4" />
                <path d="M10.5 9.5l5 2.5-5 2.5z" fill="currentColor" />
              </svg>
            </a>
            <a
              href="https://mahsa.bandcamp.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Bandcamp"
              className="text-ink transition-colors hover:text-accent"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M4 4.5l16 7.5-16 7.5z" fill="currentColor" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-7xl items-center justify-between">
        <p className="text-xs text-ink-soft">
          &copy; {new Date().getFullYear()} Mahsa Hosseini
        </p>

        <button
          type="button"
          aria-label="A little paper boat"
          onClick={() => setNoteIndex((i) => ((i ?? -1) + 1) % notes.length)}
          className="relative"
        >
          <motion.svg
            width="34"
            height="24"
            viewBox="0 0 34 24"
            fill="none"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut" }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9, rotate: -8 }}
          >
            <path
              d="M2 15 L17 3 L32 15 L27 20 L7 20 Z"
              stroke="var(--ink)"
              strokeWidth="1.4"
              strokeLinejoin="round"
              fill="var(--paper)"
            />
            <line x1="17" y1="15" x2="17" y2="20" stroke="var(--ink)" strokeWidth="1.4" />
          </motion.svg>

          {noteIndex !== null && (
            <motion.span
              initial={{ opacity: 0, y: 6, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="absolute -top-9 right-0 whitespace-nowrap rounded-full border border-ink/15 bg-paper px-3 py-1 text-xs font-display"
            >
              {notes[noteIndex]}
            </motion.span>
          )}
        </button>
      </div>
    </footer>
  );
}
