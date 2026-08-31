"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  h1: motion.h1,
  h3: motion.h3,
  p: motion.p,
} as const;

const STATIC_TAGS = {
  div: "div",
  h1: "h1",
  h3: "h3",
  p: "p",
} as const;

interface RevealProps {
  children: ReactNode;
  as?: keyof typeof TAGS;
  delay?: number;
  className?: string;
  direction?: "left" | "up";
  viewTriggered?: boolean;
  hoverLift?: boolean;
}

function buildVariants(direction: "left" | "up", delay: number): Variants {
  return {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -48 : 0,
      y: direction === "up" ? 24 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay },
    },
  };
}

const HOVER_LIFT = { y: -6, boxShadow: "0 20px 40px rgba(14,42,70,0.12)" };
const TAP_PRESS = { y: -2, scale: 0.98, boxShadow: "0 10px 20px rgba(14,42,70,0.1)" };

export default function Reveal({
  children,
  as = "div",
  delay = 0,
  className = "",
  direction = "left",
  viewTriggered = false,
  hoverLift = false,
}: RevealProps) {
  const MotionTag = TAGS[as];
  const StaticTag = STATIC_TAGS[as] as any;
  const variants = buildVariants(direction, delay);
  const interaction = hoverLift ? { whileHover: HOVER_LIFT, whileTap: TAP_PRESS } : {};

  // For immediate elements on mount (above the fold), use high-performance CSS animations.
  // This completely avoids any Framer Motion hydration lockups on load.
  if (!viewTriggered) {
    const animationClass = direction === "left" ? "animate-reveal-left" : "animate-reveal-up";
    return (
      <StaticTag
        className={`${className} ${animationClass}`}
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </StaticTag>
    );
  }

  // For elements below the fold, animate when they enter the scroll viewport
  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={variants}
      className={className}
      transition={{ duration: 0.2 }}
      {...interaction}
    >
      {children}
    </MotionTag>
  );
}
