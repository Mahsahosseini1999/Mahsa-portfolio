"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/cv", label: "CV / Statement" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  const isHome = pathname === "/";

  return (
    <>
      {!isHome && (
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="fixed top-5 left-5 sm:top-7 sm:left-7 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-ink/20 bg-paper/90 backdrop-blur-sm shadow-[0_2px_10px_rgba(51,38,43,0.08)] transition-transform hover:-rotate-6"
        >
          <span className="sr-only">Menu</span>
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <motion.span
              className="block h-[1.6px] w-full rounded-full bg-ink"
              animate={open ? { y: 7, rotate: 45 } : { y: 0, rotate: 0 }}
            />
            <motion.span
              className="block h-[1.6px] w-full rounded-full bg-ink"
              animate={open ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[1.6px] w-full rounded-full bg-ink"
              animate={open ? { y: -7, rotate: -45 } : { y: 0, rotate: 0 }}
            />
          </span>
        </button>
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-paper-deep"
            initial={{ clipPath: "circle(2% at 8% 6%)" }}
            animate={{ clipPath: "circle(150% at 8% 6%)" }}
            exit={{ clipPath: "circle(2% at 8% 6%)" }}
            transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
          >
            <nav className="flex flex-col items-start gap-3 px-8">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 12 }}
                  transition={{ delay: open ? 0.15 + i * 0.06 : 0, duration: 0.35 }}
                >
                  <Link
                    href={link.href}
                    className="font-display text-[clamp(2.5rem,8vw,5.5rem)] leading-[1.05] text-ink hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
