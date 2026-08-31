"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";

interface AnimatedStatProps {
  value: string;
  className?: string;
}

/**
 * Counts up from 0 to the numeric part of `value` (e.g. "140+", "98%") once
 * scrolled into view, then re-attaches the original suffix. Falls back to
 * showing the final value immediately for prefers-reduced-motion, and for
 * any stat value that isn't a leading number (nothing to count in that case).
 */
export default function AnimatedStat({ value, className = "" }: AnimatedStatProps) {
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (target === null || !isInView) return;

    if (shouldReduceMotion) {
      setDisplay(target);
      return;
    }

    const controls = animate(motionValue, target, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [isInView, target, shouldReduceMotion, motionValue]);

  if (target === null) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}
