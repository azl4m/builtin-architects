"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const TAGS = {
  div: motion.div,
  h1: motion.h1,
  h3: motion.h3,
  p: motion.p,
} as const;

interface RevealProps {
  children: ReactNode;
  as?: keyof typeof TAGS;
  delay?: number;
  className?: string;
  direction?: "left" | "up";
  /** Animate on scroll into view instead of on mount — for content below the fold. */
  viewTriggered?: boolean;
  /**
   * Adds a lift + shadow response via whileHover/whileTap instead of CSS
   * :hover — :hover doesn't fire meaningfully on touch devices, so a
   * CSS-only hover effect is invisible on mobile. whileTap gives touch users
   * an equivalent tactile press response; whileHover still covers desktop.
   */
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

/**
 * Entrance animation, powered by Framer Motion. By default fades + slides in
 * on mount (used for hero content, already in view on page load). Pass
 * `viewTriggered` for content further down the page, where it instead
 * animates the first time it scrolls into view. Reduced-motion is handled
 * globally by <MotionConfig reducedMotion="user"> in the root layout, which
 * downgrades every transform-based animation here to an instant opacity
 * crossfade for users with that OS preference set.
 */
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
  const variants = buildVariants(direction, delay);
  const interaction = hoverLift ? { whileHover: HOVER_LIFT, whileTap: TAP_PRESS } : {};

  if (viewTriggered) {
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

  return (
    <MotionTag initial="hidden" animate="visible" variants={variants} className={className} {...interaction}>
      {children}
    </MotionTag>
  );
}
