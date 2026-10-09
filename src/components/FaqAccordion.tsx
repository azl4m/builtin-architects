"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";
import { useFaqAccordion } from "@/components/FaqAccordionProvider";
import type { FaqItem } from "@/sanity/lib/types";

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const prefix = useId();
  const shared = useFaqAccordion();
  const [localActiveId, setLocalActiveId] = useState<string | null>(null);
  const activeId = shared ? shared.activeId : localActiveId;
  const toggle = (id: string) => {
    if (shared) shared.toggle(id);
    else setLocalActiveId((current) => current === id ? null : id);
  };

  if (!items?.length) return null;

  return (
    <div className="flex flex-col border-t border-hairline">
      {items.map((item, index) => {
        const id = `${prefix}-${index}`;
        const isOpen = activeId === id;
        return (
          <div key={id} className={`border-b border-hairline transition-colors duration-300 motion-reduce:transition-none ${isOpen ? "bg-alt/60" : ""}`}>
            <h3>
              <button
                type="button"
                onClick={() => toggle(id)}
                aria-expanded={isOpen}
                aria-controls={`${id}-answer`}
                id={`${id}-button`}
                className={`group flex min-h-16 w-full items-center justify-between gap-5 rounded-sm px-3 py-5 text-left font-display text-base font-semibold transition-colors duration-200 hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:px-4 md:text-lg ${isOpen ? "text-accent" : "text-ink"}`}
              >
                <span>{item.question}</span>
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors duration-300 ${isOpen ? "bg-accent text-ivory" : "bg-alt text-accent group-hover:bg-accent/10"}`}>
                  <Plus aria-hidden="true" size={16} className={`transition-transform duration-300 ease-in-out motion-reduce:transition-none ${isOpen ? "rotate-45" : ""}`} />
                </span>
              </button>
            </h3>
            <div
              id={`${id}-answer`}
              role="region"
              aria-labelledby={`${id}-button`}
              aria-hidden={!isOpen}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
            >
              <div className="min-h-0 overflow-hidden">
                <p className="max-w-[760px] px-3 pb-6 text-[15px] leading-7 text-body md:px-4 md:pr-14">{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
