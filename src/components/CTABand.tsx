"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface CTABandProps {
  eyebrow: string;
  heading: string;
  buttonLabel: string;
}

export default function CTABand({ eyebrow, heading, buttonLabel }: CTABandProps) {
  const reduceMotion = useReducedMotion();
  const entrance = {
    initial: reduceMotion ? false as const : { opacity: 0, y: 18 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  };

  return (
    <section className="relative overflow-hidden bg-ivory px-6 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-6 md:gap-8 lg:grid-cols-12 lg:gap-14">
        <motion.div
          {...entrance}
          className="relative mx-auto aspect-square w-full max-w-[300px] sm:max-w-[360px] lg:col-span-6 lg:max-w-[560px]"
        >
          <Image
            src="/images/architecture-cta.png"
            alt="Contemporary villa cutaway with detailed architectural blueprint linework"
            fill
            sizes="(min-width: 1024px) 560px, (min-width: 640px) 360px, 300px"
            className="pointer-events-none select-none object-contain"
          />
        </motion.div>

        <motion.div
          {...entrance}
          className="flex flex-col items-center text-center lg:col-span-6 lg:items-start lg:text-left"
        >
          <p className="mb-3 text-[11px] font-semibold tracking-[3px] text-accent uppercase md:mb-4 md:text-xs">
            {eyebrow || "Ready to begin"}
          </p>
          <h2 className="max-w-[560px] text-balance font-display text-[30px] leading-[1.2] font-semibold text-ink sm:text-4xl lg:text-[44px] xl:text-[46px]">
            {heading || "Let's build your dream project together"}
          </h2>
          <p className="mt-4 max-w-[430px] text-[15px] leading-7 text-body md:mt-5 md:text-base">
            From your first idea to the final detail, we bring your vision to life.
          </p>
          <Link
            href="/contact"
            className="group mt-6 inline-flex min-h-12 w-full max-w-[320px] items-center justify-center gap-3 rounded-[3px] bg-ink px-7 py-3.5 text-xs font-bold tracking-[1.2px] text-ivory uppercase shadow-sm transition-colors duration-200 hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-auto sm:max-w-none md:mt-7"
          >
            {buttonLabel || "Start a Conversation"}
            <ArrowRight
              aria-hidden="true"
              size={17}
              className="shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-focus-visible:translate-x-1 motion-reduce:transition-none motion-reduce:transform-none"
            />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
