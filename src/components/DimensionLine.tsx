"use client";

import { motion } from "framer-motion";

interface DimensionLineProps {
  className?: string;
  width?: number;
}

/**
 * A drafting-style dimension line (tick — line — tick) that draws itself in
 * on scroll into view. Small recurring accent tying the UI to architectural
 * technical drawings rather than a generic decorative rule. Uses currentColor
 * so it inherits whatever text color the parent sets.
 */
export default function DimensionLine({ className = "", width = 96 }: DimensionLineProps) {
  return (
    <svg width={width} height={12} viewBox={`0 0 ${width} 12`} fill="none" className={className} aria-hidden="true">
      <motion.path
        d={`M2 2 V10 M2 6 H${width - 2} M${width - 2} 2 V10`}
        stroke="currentColor"
        strokeWidth={1.5}
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}
