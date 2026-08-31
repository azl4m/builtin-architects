"use client";

import { useState } from "react";
import type { FaqItem } from "@/sanity/lib/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-col border-t border-hairline">
      {items.map((item, index) => {
        const isOpen = activeIndex === index;
        return (
          <div
            key={index}
            className="border-b border-hairline py-5 transition-colors duration-300"
          >
            <h3>
              <button
                type="button"
                onClick={() => toggle(index)}
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${index}`}
                id={`faq-btn-${index}`}
                className="flex w-full items-center justify-between gap-4 text-left font-display text-lg font-semibold text-ink hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:rounded-sm py-1.5 transition-colors duration-200"
              >
                <span>{item.question}</span>
                <span className="shrink-0 flex h-6 w-6 items-center justify-center rounded-full bg-alt text-accent">
                  <svg
                    className={`h-3 w-3 transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              className={`transition-all duration-300 ease-in-out overflow-hidden ${
                isOpen ? "max-h-[500px] opacity-100 mt-3" : "max-h-0 opacity-0"
              }`}
            >
              <p className="text-sm leading-[1.8] text-body pr-8">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
