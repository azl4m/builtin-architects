"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ZoomRevealProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  initialScale?: number;
}

export default function ZoomReveal({
  children,
  className = "",
  duration = 5.0,
  initialScale = 1.15,
}: ZoomRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: initialScale }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration, ease: [0.25, 1, 0.5, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
