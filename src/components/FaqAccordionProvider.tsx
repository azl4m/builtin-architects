"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

const FaqContext = createContext<{
  activeId: string | null;
  toggle: (id: string) => void;
} | null>(null);

export function useFaqAccordion() {
  return useContext(FaqContext);
}

export default function FaqAccordionProvider({ children }: { children: ReactNode }) {
  const [activeId, setActiveId] = useState<string | null>(null);
  return (
    <FaqContext.Provider value={{ activeId, toggle: (id) => setActiveId((current) => current === id ? null : id) }}>
      {children}
    </FaqContext.Provider>
  );
}
