"use client";

import React from "react";
import { motion } from "framer-motion";

interface LetterSlicesProps {
  letter: string;
  letterIndex: number;
}

const NUM_PIECES = 6;

export default function LetterSlices({ letter, letterIndex }: LetterSlicesProps) {
  const sliceHeight = 100 / NUM_PIECES;

  return (
    <div className="relative inline-block">
      <span className="invisible leading-[0.85] text-[clamp(60px,12vw,220px)] font-bold">
        {letter}
      </span>

      {Array.from({ length: NUM_PIECES }).map((_, pieceIndex) => {
        const top = sliceHeight * pieceIndex;
        const bottom = Math.max(0, 100 - sliceHeight * (pieceIndex + 1));
        const fromLeft = (pieceIndex + letterIndex) % 2 === 0;

        const hiddenClip = fromLeft
          ? `inset(${top}% 0% ${bottom}% 100%)`
          : `inset(${top}% 100% ${bottom}% 0%)`;

        const visibleClip = `inset(${top}% 0% ${bottom}% 0%)`;

        const delay = letterIndex * 0.6 + pieceIndex * 0.08;

        return (
          <motion.span
            key={pieceIndex}
            initial={{ clipPath: hiddenClip, opacity: 0, scale: 0.9, y: fromLeft ? 10 : -10 }}
            animate={{ clipPath: visibleClip, opacity: 1, scale: 1, y: 0 }}
            transition={{ delay, duration: 0.45, ease: "easeOut" }}
            className="absolute inset-0 flex items-center justify-center pointer-events-none select-none"
            style={{ WebkitTextStroke: "2px rgba(34,197,94,1)" }}
          >
            <span className="leading-[0.85] text-[clamp(60px,12vw,220px)] font-bold
                             bg-gradient-to-r from-green-400 via-blue-500 to-purple-600
                             bg-clip-text text-transparent drop-shadow-lg">
              {letter}
            </span>
          </motion.span>
        );
      })}
    </div>
  );
}
