"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface ZoomRevealProps {
  children: ReactNode;
  className?: string;
}

export default function ZoomReveal({ children, className = "" }: ZoomRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.22 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 30, ease: [0.25, 1, 0.5, 1] }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
