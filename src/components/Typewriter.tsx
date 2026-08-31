"use client";

import { motion } from "framer-motion";

interface TypewriterProps {
  text: string;
  className?: string;
}

export default function Typewriter({ text, className = "" }: TypewriterProps) {
  // Split text into sentences based on period followed by space
  // E.g. "Four disciplines. One accountable team." -> ["Four disciplines.", "One accountable team."]
  const sentences = text.split(/\.\s+/).map((s) => {
    const trimmed = s.trim();
    if (trimmed && !trimmed.endsWith(".")) {
      return trimmed + ".";
    }
    return trimmed;
  }).filter(Boolean);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.025, delayChildren: 0.15 },
    },
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120,
      },
    },
    hidden: {
      opacity: 0,
      y: 8,
      transition: {
        type: "spring" as const,
        damping: 15,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.h1
      className={className}
      variants={container}
      initial="hidden"
      animate="visible"
    >
      {sentences.map((sentence, sIdx) => (
        <span key={sIdx} className="block">
          {Array.from(sentence).map((letter, lIdx) => (
            <motion.span
              variants={child}
              key={`${sIdx}-${lIdx}`}
              className="inline-block whitespace-pre"
            >
              {letter}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h1>
  );
}
