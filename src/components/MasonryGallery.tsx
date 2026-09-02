"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/types";

interface MasonryGalleryProps {
  eyebrow: string;
  heading: string;
  images: SanityImageValue[];
}

export default function MasonryGallery({ eyebrow, heading, images }: MasonryGalleryProps) {
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  // Lock scroll when lightbox is active
  useEffect(() => {
    if (activeIdx !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [activeIdx]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (activeIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIdx(null);
      if (e.key === "ArrowRight") setActiveIdx((prev) => (prev !== null ? (prev + 1) % images.length : null));
      if (e.key === "ArrowLeft") setActiveIdx((prev) => (prev !== null ? (prev - 1 + images.length) % images.length : null));
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeIdx, images.length]);

  if (!images || images.length === 0) return null;

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeIdx === null) return;
    setActiveIdx((activeIdx - 1 + images.length) % images.length);
  };

  return (
    <section className="bg-alt py-12 px-4 max-md:py-6 max-md:px-2 border-t border-hairline">
      <div className="mx-auto max-w-[1400px]">
        {/* Seamless 7-Item Bento Grid Layout applying identically on mobile and desktop */}
        <div className="grid grid-cols-12 grid-rows-3 gap-0 h-[460px] sm:h-[560px] md:h-[640px] w-full rounded-xl md:rounded-2xl overflow-hidden border border-hairline/80 shadow-2xl bg-ink">
          {images.map((img, i) => {
            const src = urlFor(img)?.width(1200).auto("format").url() || "";
            
            // Explicit 12-col x 3-row grid mapping applying on ALL viewports (mobile & desktop)
            const gridLayouts = [
              "col-start-1 col-end-5 row-start-1 row-end-3",  // IMG 1: Top-Left (cols 1-4, rows 1-2)
              "col-start-5 col-end-10 row-start-1 row-end-2", // IMG 2: Top-Middle (cols 5-9, row 1)
              "col-start-10 col-end-13 row-start-1 row-end-2",// IMG 3: Top-Right (cols 10-12, row 1)
              "col-start-5 col-end-10 row-start-2 row-end-3", // IMG 4: Center-Middle (cols 5-9, row 2)
              "col-start-10 col-end-13 row-start-2 row-end-4",// IMG 5: Bottom-Right (cols 10-12, rows 2-3)
              "col-start-1 col-end-5 row-start-3 row-end-4",  // IMG 6: Bottom-Left (cols 1-4, row 3)
              "col-start-5 col-end-10 row-start-3 row-end-4", // IMG 7: Bottom-Middle (cols 5-9, row 3)
            ];
            const layoutClass = gridLayouts[i % gridLayouts.length];

            return (
              <motion.div
                key={i}
                className={`group relative w-full h-full overflow-hidden rounded-none cursor-zoom-in ${layoutClass}`}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIdx(i)}
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  className="h-full w-full object-cover transition-transform duration-[700ms] ease-out group-hover:scale-105"
                  loading="lazy"
                />
                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-black/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Immersive Lightbox Modal */}
      <AnimatePresence>
        {activeIdx !== null && (() => {
          const lightboxSrc = urlFor(images[activeIdx])?.width(1600).auto("format").url() || "";
          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 px-4 backdrop-blur-sm cursor-zoom-out"
              onClick={() => setActiveIdx(null)}
            >
              {/* Close Button */}
              <button
                className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light cursor-pointer select-none z-30"
                onClick={() => setActiveIdx(null)}
              >
                ✕
              </button>

              {/* Left Arrow Button */}
              <button
                className="absolute left-6 text-white/50 hover:text-white text-4xl font-light cursor-pointer select-none z-30 p-4 max-md:left-2"
                onClick={handlePrev}
              >
                ‹
              </button>

              {/* Image Container with Spring Zoom Entry */}
              <motion.div
                key={activeIdx}
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative max-h-[85vh] max-w-[90vw] overflow-hidden z-20"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={lightboxSrc}
                  alt={`Enlarged gallery photo ${activeIdx + 1}`}
                  className="max-h-[85vh] max-w-[90vw] object-contain rounded-[4px] select-none"
                />
              </motion.div>

              {/* Right Arrow Button */}
              <button
                className="absolute right-6 text-white/50 hover:text-white text-4xl font-light cursor-pointer select-none z-30 p-4 max-md:right-2"
                onClick={handleNext}
              >
                ›
              </button>

              {/* Interactive Index Indicator */}
              <div className="absolute bottom-6 text-white/60 text-sm select-none z-30">
                {activeIdx + 1} / {images.length}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
