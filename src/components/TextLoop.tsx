"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TextLoopProps {
  text: string;
  className?: string;
}

export default function TextLoop({ text, className = "" }: TextLoopProps) {
  // Split the text by standard separator characters (middot, bullet, vertical bar)
  const items = text
    .split(/·|•|\|/)
    .map((item) => item.trim())
    .filter(Boolean);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 3200); // Cycle every 3.2 seconds
    return () => clearInterval(interval);
  }, [items.length]);

  if (items.length === 0) return null;

  return (
    <div className={`relative overflow-hidden h-6 ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-x-0 top-0 bottom-0 flex items-center justify-start whitespace-nowrap"
        >
          {items[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
