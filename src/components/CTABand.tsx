"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface CTABandProps {
  eyebrow: string;
  heading: string;
  buttonLabel: string;
}

export default function CTABand({ eyebrow, heading, buttonLabel }: CTABandProps) {
  return (
    <section className="relative overflow-hidden bg-ivory py-16 md:py-24 px-6 md:px-16">
      {/* Main Container: 2-Column Side-by-Side on Desktop (Image 7 cols, Text 5 cols), 3-Tier Stack on Mobile */}
      <div className="relative z-20 mx-auto max-w-[1400px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* 1. TOP ON MOBILE: Eyebrow Badge (Visible at top on mobile) */}
        <div className="text-[13px] font-semibold tracking-[4px] text-accent uppercase max-md:text-[11px] max-md:tracking-[2px] max-lg:order-1 lg:hidden text-center">
          {eyebrow || "READY TO BEGIN"}
        </div>

        {/* 2. MIDDLE ON MOBILE / LEFT ON DESKTOP: Larger 3D Floating Villa Model (7 cols on desktop) */}
        <motion.div
          className="relative flex items-center justify-center w-full lg:col-span-7 lg:order-1 max-lg:order-2 py-2 md:py-4"
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Soft Floor Shadow underneath 3D model */}
          <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[75%] h-[35px] rounded-full bg-black/15 blur-lg pointer-events-none" />

          {/* Floating Transparent 3D Architectural Cutaway & Blueprint Model (Larger on Desktop) */}
          <motion.img
            src="https://res.cloudinary.com/r33neaxf/image/upload/v1788324008/ChatGPT_Image_Sep_1__2026__06_55_23_PM-removebg-preview_uveoat.png"
            alt="3D Architectural & Construction Blueprint Model"
            className="w-full max-w-[650px] lg:max-w-[880px] xl:max-w-[960px] h-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)] pointer-events-none select-none"
            animate={{ y: [0, -12, 0] }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 4.5,
              ease: "easeInOut",
            }}
          />
        </motion.div>

        {/* 3. BOTTOM ON MOBILE / RIGHT ON DESKTOP: Heading & CTA Button (5 cols on desktop) */}
        <div className="w-full lg:col-span-5 lg:order-2 max-lg:order-3 flex flex-col max-lg:items-center lg:items-start text-center lg:text-left">
          {/* Eyebrow Badge (Desktop view) */}
          <div className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase hidden lg:block">
            {eyebrow || "READY TO BEGIN"}
          </div>

          {/* Main Heading */}
          <h2 className="mb-6 max-w-[650px] font-display text-4xl md:text-5xl lg:text-[46px] xl:text-5xl font-semibold leading-[1.18] text-ink max-md:text-[28px]">
            {heading || "Let's build your dream project together"}
          </h2>

          {/* CTA Button */}
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-[2px] bg-ink px-8 py-3.5 text-xs font-bold tracking-[1.5px] text-ivory uppercase transition-colors hover:bg-accent hover:text-ivory w-fit shadow-md"
          >
            {buttonLabel || "Start a Conversation"} →
          </Link>
        </div>

      </div>
    </section>
  );
}
