"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { motion } from "framer-motion";

type StripImage = { src: StaticImageData; alt: string };

export default function StorylinesMarquee({ images }: { images: StripImage[] }) {
  const track = [...images, ...images];

  return (
    <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
      <motion.div
        className="flex items-center gap-1"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {track.map((img, i) => (
          <div key={i} className="h-24 shrink-0 sm:h-32">
            <Image
              src={img.src}
              alt={img.alt}
              placeholder="blur"
              className="h-full w-auto object-contain"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
