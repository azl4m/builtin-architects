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
    <section className="bg-alt py-10 px-4 max-md:py-6 max-md:px-2 border-t border-hairline">
      <div className="mx-auto max-w-[1400px]">
        {/* Highly Performant CSS Multi-Column Masonry Grid */}
        <div className="columns-2 gap-2 sm:columns-3 lg:columns-4 [column-fill:_balance]">
          {images.map((img, i) => {
            const src = urlFor(img)?.width(800).auto("format").url() || "";
            return (
              <motion.div
                key={i}
                className="mb-2 break-inside-avoid overflow-hidden cursor-zoom-in relative group"
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.05, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setActiveIdx(i)}
              >
                <img
                  src={src}
                  alt={`Gallery photo ${i + 1}`}
                  className="w-full h-auto object-cover transition-transform duration-[800ms] ease-out group-hover:scale-102"
                  loading="lazy"
                />
                {/* Subtle hover overlay for luxury aesthetic */}
                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
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
