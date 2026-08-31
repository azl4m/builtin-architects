"use client";

import { useEffect, useState } from "react";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/types";

interface BeforeAfterSliderProps {
  beforeImage: SanityImageValue;
  afterImage: SanityImageValue;
  title: string;
  className?: string;
}

/**
 * Draggable before/after comparison — the empty site vs. the finished
 * build. Only ever rendered by the caller when a beforeImage exists, so
 * there's no "missing photo" fallback state to design for here.
 *
 * react-compare-slider serializes its inline styles slightly differently
 * between the server and client render pass (a library quirk), which trips
 * React's hydration mismatch check. Delaying its render until after mount
 * sidesteps that entirely — it's a drag interaction with no real reason to
 * exist in the server-rendered HTML anyway.
 */
export default function BeforeAfterSlider({ beforeImage, afterImage, title, className = "" }: BeforeAfterSliderProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const beforeSrc = urlFor(beforeImage)?.width(1600).fit("max").auto("format").url();
  const afterSrc = urlFor(afterImage)?.width(1600).fit("max").auto("format").url();

  if (!beforeSrc || !afterSrc) return null;
  if (!mounted) return <div className={`animate-pulse bg-alt ${className}`} />;

  return (
    <ReactCompareSlider
      className={className}
      itemOne={<ReactCompareSliderImage src={beforeSrc} alt={`${title} — before`} />}
      itemTwo={<ReactCompareSliderImage src={afterSrc} alt={`${title} — after`} />}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
