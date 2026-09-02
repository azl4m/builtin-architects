"use client";

import { motion } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/types";

interface ClientLogosProps {
  logos: (SanityImageValue | null)[];
  eyebrow?: string;
  heading?: string;
}

export default function ClientLogos({
  logos,
  eyebrow = "TRUSTED PARTNERS",
  heading = "Brands & Leaders We've Worked With",
}: ClientLogosProps) {
  // Filter valid uploaded logos or provide clean fallback array
  const validLogos = logos && logos.filter(Boolean).length > 0 ? logos : [null, null, null, null];

  return (
    <section className="relative overflow-hidden bg-alt py-16 px-6 max-md:py-12 border-t border-hairline">
      <div className="mx-auto max-w-[1400px] text-center">
        {/* Optional Eyebrow */}
        {eyebrow && (
          <div className="mb-3 text-[11px] md:text-[12px] font-semibold tracking-[3px] text-accent uppercase">
            {eyebrow}
          </div>
        )}

        {/* Section Heading */}
        {heading && (
          <h2 className="mb-10 font-display text-xl md:text-2xl font-semibold text-ink/80 max-md:mb-8">
            {heading}
          </h2>
        )}

        {/* Client Logos Row (Single line on mobile & laptop) */}
        <div className="flex flex-nowrap items-center justify-center gap-2.5 sm:gap-6 md:gap-8 w-full max-w-full overflow-x-auto no-scrollbar">
          {validLogos.map((logo, i) => {
            const src = logo ? urlFor(logo)?.width(500).fit("max").auto("format").url() : null;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex shrink-0 h-14 w-[100px] xs:w-[120px] sm:h-20 sm:w-44 md:h-24 md:w-52 items-center justify-center rounded-lg sm:rounded-xl border border-hairline/80 bg-surface px-3 py-2 sm:px-6 sm:py-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:scale-[1.03] hover:border-accent/40 hover:shadow-md"
              >
                {src ? (
                  <img
                    src={src}
                    alt={`Client logo ${i + 1}`}
                    className="max-h-8 sm:max-h-12 w-auto max-w-full object-contain filter grayscale opacity-75 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 mix-blend-multiply"
                    loading="lazy"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center">
                    <span className="font-display text-[10px] sm:text-sm font-bold tracking-[1px] sm:tracking-[1.5px] text-ink/40 uppercase group-hover:text-accent transition-colors">
                      PARTNER {i + 1}
                    </span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
