"use client";

import { motion } from "framer-motion";
import SmartImage from "@/components/SmartImage";
import type { SanityImageValue } from "@/sanity/lib/types";

interface ScrollytellingItem {
  image: SanityImageValue | null;
  label: string;
  alt: string;
  caption?: string;
}

interface ProjectScrollytellingProps {
  items: ScrollytellingItem[];
}

/**
 * Full-bleed scroll sequence replacing a static gallery grid — each photo
 * settles into place (scale + fade) as it enters view, with an optional
 * caption fading in a beat after. Scroll-triggered, once each, so it never
 * replays on scroll-up.
 */
export default function ProjectScrollytelling({ items }: ProjectScrollytellingProps) {
  return (
    <div className="flex flex-col gap-4 md:gap-5">
      {items.map((item, i) => (
        <motion.div
          key={i}
          className="relative h-[72vh] min-h-[380px] w-full max-w-[1000px] mx-auto overflow-hidden rounded-[6px] max-md:h-[52vh] max-md:min-h-[300px]"
          initial={{ opacity: 0, scale: 1.04 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{ willChange: "transform, opacity", transform: "translateZ(0)" }}
        >
          <SmartImage image={item.image} alt={item.alt} label={item.label} className="absolute inset-0 h-full w-full object-cover" />
          {item.caption ? (
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,20,40,0.6)_100%)] px-8 pt-14 pb-5 max-md:px-5 max-md:pt-10 max-md:pb-4">
              <motion.p
                className="max-w-[620px] font-display text-base font-semibold leading-tight text-ivory max-md:text-sm"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {item.caption}
              </motion.p>
            </div>
          ) : null}
        </motion.div>
      ))}
    </div>
  );
}
