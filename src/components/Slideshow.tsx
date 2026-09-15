"use client";

import { useState } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type SlideImage = {
  src: StaticImageData;
  alt: string;
  caption?: string;
};

export default function Slideshow({
  images,
  captionColor,
  treatment,
}: {
  images: SlideImage[];
  captionColor?: string;
  treatment?: "grain";
}) {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(delta: number) {
    setDirection(delta);
    setIndex((i) => (i + delta + images.length) % images.length);
  }

  const current = images[index];

  return (
    <div className="flex flex-col gap-3">
      <div className="relative flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            initial={{ opacity: 0, x: direction > 0 ? 40 : -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction > 0 ? -40 : 40 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
          >
            <Image
              src={current.src}
              alt={current.alt}
              placeholder="blur"
              sizes="(min-width: 640px) 60vw, 90vw"
              className={`mx-auto h-auto max-h-[70vh] w-auto object-contain ${
                treatment === "grain" ? "grain-treatment" : ""
              }`}
            />
          </motion.div>
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button
              type="button"
              aria-label="Previous image"
              onClick={() => go(-1)}
              className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink shadow transition-transform hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              aria-label="Next image"
              onClick={() => go(1)}
              className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-paper/80 text-ink shadow transition-transform hover:scale-105"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M6 3 11 8l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4">
        {current.caption ? (
          <p
            className={`text-sm ${captionColor ? "" : "text-accent"}`}
            style={captionColor ? { color: captionColor } : undefined}
          >
            {current.caption}
          </p>
        ) : (
          <span />
        )}
        {images.length > 1 && (
          <span className="shrink-0 text-xs text-ink-soft">
            {index + 1} / {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to image ${i + 1}`}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-accent" : "w-1.5 bg-ink/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
