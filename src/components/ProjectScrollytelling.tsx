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
          className="relative h-[72vh] min-h-[380px] overflow-hidden rounded-[4px] max-md:h-[52vh] max-md:min-h-[300px]"
          initial={{ opacity: 0, scale: 1.06 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <SmartImage image={item.image} alt={item.alt} label={item.label} className="absolute inset-0 h-full w-full" />
          {item.caption ? (
            <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,20,40,0.75)_100%)] px-8 pt-24 pb-8 max-md:px-5 max-md:pt-16 max-md:pb-6">
              <motion.p
                className="max-w-[620px] font-display text-2xl font-semibold leading-tight text-ivory max-md:text-lg"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
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
