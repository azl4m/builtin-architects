"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote } from "lucide-react";
import type { CmsTestimonial } from "@/sanity/lib/types";

interface TestimonialCardStackProps {
  testimonials: CmsTestimonial[];
  eyebrow?: string;
  heading?: string;
}

export default function TestimonialCardStack({
  testimonials,
  eyebrow = "TESTIMONIALS",
  heading = "Trusted by homeowners & leaders across Kerala.",
}: TestimonialCardStackProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const list =
    testimonials && testimonials.length > 0
      ? testimonials
      : [
          {
            _id: "t1",
            quote:
              "BUILTIN managed our entire build with real precision — the site work matched the drawings down to the last detail, delivered on schedule.",
            name: "Habeeb Rahman",
            role: "Chairman, Profile Group",
          },
          {
            _id: "t2",
            quote:
              "A rare team that respects design intent while executing with genuine technical precision on site.",
            name: "Salahudheen",
            role: "Architect, DCloud",
          },
          {
            _id: "t3",
            quote:
              "From consultation to final touches, the team was attentive and created a space that truly feels like home.",
            name: "Mansoor",
            role: "Educator",
          },
        ];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % list.length);
  }, [list.length]);

  useEffect(() => {
    if (isPaused || list.length <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 3000);
    return () => clearInterval(timer);
  }, [isPaused, list.length, handleNext]);

  const activeTestimonial = list[currentIndex];

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .filter(Boolean)
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <section className="relative overflow-hidden py-28 px-6 max-md:py-12 max-md:px-4">
      {/* Background Image with Dark Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('https://res.cloudinary.com/r33neaxf/image/upload/v1788264566/pexels-thisispav-32103606_qmpflw.jpg')`,
        }}
      />
      {/* Clean Dark Overlay for pure image contrast without any blue tinting */}
      <div className="absolute inset-0 bg-black/55 backdrop-blur-[1px]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow Pill Badge */}
        <div className="mb-6 max-md:mb-3 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-1 text-[10px] md:text-[11px] font-bold tracking-[2.5px] text-white/90 uppercase backdrop-blur-md shadow-sm">
            {eyebrow}
          </span>
        </div>

        {/* Heading (No Description Paragraph as requested) */}
        <h2 className="mb-14 max-md:mb-6 font-display text-2xl md:text-5xl font-semibold leading-[1.25] text-white max-w-2xl mx-auto tracking-[0.5px]">
          {heading}
        </h2>

        {/* 3D Stacked Testimonial Cards Container - Fixed Height for zero layout shifts */}
        <div
          className="relative mx-auto h-[260px] md:h-[280px] w-full max-w-2xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Layer 3 - Bottom Background Card */}
          <div className="absolute inset-x-5 top-4 md:top-6 bottom-0 rounded-xl md:rounded-2xl border border-white/10 bg-black/10 backdrop-blur-sm shadow-xl transition-all duration-700 max-md:inset-x-3" />

          {/* Layer 2 - Middle Background Card */}
          <div className="absolute inset-x-2.5 top-2 md:top-3 bottom-0 rounded-xl md:rounded-2xl border border-white/15 bg-black/20 backdrop-blur-md shadow-2xl transition-all duration-700 max-md:inset-x-1.5" />

          {/* Active Card with Framer Motion AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTestimonial._id || currentIndex}
              initial={{ opacity: 0, y: 16, scale: 0.95, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, scale: 0.95, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 flex flex-col justify-between rounded-xl md:rounded-2xl border border-white/20 bg-black/35 backdrop-blur-md p-5 md:p-8 text-left shadow-[0_25px_60px_rgba(0,0,0,0.5)] transition-all duration-500 hover:border-white/35 hover:bg-black/45"
            >
              {/* Top Section: Quote Icon & Quote Text */}
              <div className="flex flex-col overflow-hidden">
                <div className="mb-3 md:mb-4 flex items-center justify-between shrink-0">
                  <div className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-lg md:rounded-xl bg-white/10 text-white/90 border border-white/15 backdrop-blur-md">
                    <Quote className="h-4 w-4 md:h-5 md:w-5 stroke-[1.75]" />
                  </div>
                  <div className="flex gap-0.5 md:gap-1 text-amber-400 text-xs md:text-sm">
                    {"★".repeat(5)}
                  </div>
                </div>

                {/* Quote Text - Clamped/Scrollable to prevent card height shifts */}
                <p className="line-clamp-4 md:line-clamp-3 font-display text-sm md:text-lg leading-[1.65] text-white/95 italic font-light overflow-hidden">
                  &ldquo;{activeTestimonial.quote}&rdquo;
                </p>
              </div>

              {/* Bottom Section: Client Info locked at fixed bottom */}
              <div className="flex items-center gap-3 md:gap-4 border-t border-white/15 pt-3 md:pt-4 shrink-0">
                <div className="flex h-8 w-8 md:h-11 md:w-11 shrink-0 items-center justify-center rounded-full bg-white/15 border border-white/20 font-display text-xs md:text-sm font-bold text-white shadow-md backdrop-blur-md">
                  {getInitials(activeTestimonial.name)}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="truncate text-xs md:text-base font-bold text-white tracking-[0.3px]">
                    {activeTestimonial.name}
                  </h3>
                  <p className="truncate text-[10px] md:text-xs text-white/70 font-medium">
                    {activeTestimonial.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress Indicators / Dots (Auto-scrolling indicator) */}
        <div className="mt-6 md:mt-10 flex items-center justify-center gap-2">
          {list.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-1.5 md:h-2 rounded-full transition-all duration-500 ${
                idx === currentIndex
                  ? "w-6 md:w-8 bg-white"
                  : "w-1.5 md:w-2 bg-white/30 hover:bg-white/50"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
