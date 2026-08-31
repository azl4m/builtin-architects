"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import SmartImage from "@/components/SmartImage";
import type { CmsProject } from "@/sanity/lib/types";

interface FeaturedProjectsShowcaseProps {
  eyebrow: string;
  heading: string;
  projects: CmsProject[];
}

/** Keeps a keyframe range strictly increasing — useTransform requires this,
 * and clamping the first/last segment to [0,1] can otherwise collapse two
 * points to the same value (e.g. project 0's range starts at 0 twice). */
function safeRange(values: number[]): number[] {
  const out: number[] = [];
  let prev = -Infinity;
  for (const v of values) {
    const clamped = Math.min(1, Math.max(0, v));
    const safe = clamped <= prev ? prev + 0.0001 : clamped;
    out.push(safe);
    prev = safe;
  }
  return out;
}

interface PanelProps {
  project: CmsProject;
  index: number;
  count: number;
  scrollYProgress: MotionValue<number>;
}

function Panel({ project, index, count, scrollYProgress }: PanelProps) {
  const segment = 1 / count;
  const start = index * segment;
  const end = start + segment;
  const overlap = segment * 0.3;
  const isFirst = index === 0;
  const isLast = index === count - 1;

  // The first project has nothing to crossfade in from, so it's already
  // fully visible the instant the section pins — no fade-in phase. The
  // last project stays fully visible right through to release instead of
  // fading out beforehand (nothing crossfades in after it).
  const points: number[] = [];
  const opacityOut: number[] = [];
  const yOut: number[] = [];

  if (!isFirst) {
    points.push(start - overlap);
    opacityOut.push(0);
    yOut.push(24);
  }
  points.push(start);
  opacityOut.push(1);
  yOut.push(0);
  if (!isLast) {
    points.push(end - overlap);
    opacityOut.push(1);
    yOut.push(0);
    points.push(end);
    opacityOut.push(0);
    yOut.push(-24);
  } else {
    points.push(1);
    opacityOut.push(1);
    yOut.push(0);
  }

  const fadeRange = safeRange(points);
  const opacity = useTransform(scrollYProgress, fadeRange, opacityOut);
  const y = useTransform(scrollYProgress, fadeRange, yOut);
  const scale = useTransform(scrollYProgress, [start, Math.min(1, start + overlap)], [1.02, 1]);

  return (
    <motion.div
      className="absolute inset-0 flex items-center justify-center px-[3vw] max-md:px-4"
      style={{ opacity, zIndex: index }}
    >
      <motion.div
        className="relative h-full max-h-[76vh] w-full overflow-hidden rounded-[4px] max-md:max-h-[58vh]"
        style={{ scale, y }}
      >
        <SmartImage
          image={project.heroImage}
          alt={project.cardTitle}
          label={project.cardTitle}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-x-0 bottom-0 bg-[linear-gradient(180deg,transparent_0%,rgba(10,20,40,0.75)_100%)] px-10 pt-28 pb-10 max-md:px-6 max-md:pt-16 max-md:pb-6">
          <div className="font-display text-3xl font-semibold text-ivory max-md:text-xl">{project.cardTitle}</div>
          <div className="mt-1.5 text-sm text-[#dce3f2] max-md:text-xs">{project.cardMeta[0]}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 px-16 max-md:px-6">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <div className="text-[12px] font-semibold tracking-[4px] text-accent uppercase">{eyebrow}</div>
        <h2 className="font-display text-2xl font-semibold max-md:text-xl">{heading}</h2>
      </div>
      <Link href="/projects" className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase">
        All Projects →
      </Link>
    </div>
  );
}

/**
 * Scroll-driven full-screen showcase: pins via CSS `position: sticky` (no
 * JS scroll-jacking — trackpad/wheel/touch all behave natively) while a
 * tall spacer container gives scroll distance for the crossfade between
 * projects. Progress is read from actual scroll position (useScroll), not
 * time, so it's fully reversible and always in sync with the user's input.
 */
export default function FeaturedProjectsShowcase({ eyebrow, heading, projects }: FeaturedProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Reads as "not reduced" on both the server render and the client's first
  // paint (matching, so hydration never conflicts), then flips after mount
  // if the OS preference is actually set — window.matchMedia isn't available
  // during SSR, and checking it synchronously on the client's first render
  // would disagree with the server's render and trigger a hydration error.
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false);
  useEffect(() => {
    setShouldReduceMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  // Bound directly to real scroll position — no spring/lag layer. A spring
  // trails slightly behind the actual scroll input, which reads as
  // resistance ("hard to scroll") rather than smoothness; direct binding is
  // what keeps the animation feeling attached to the user's own gesture.
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });

  if (shouldReduceMotion) {
    return (
      <div className="mx-auto max-w-[1400px] px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">{eyebrow}</div>
            <h2 className="font-display text-[44px] font-semibold max-md:text-[32px]">{heading}</h2>
          </div>
          <Link href="/projects" className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase">
            All Projects →
          </Link>
        </div>
        <div className="flex flex-col gap-10">
          {projects.map((project) => (
            <Link key={project._id} href="/projects" className="block text-ink no-underline">
              <SmartImage
                image={project.heroImage}
                alt={project.cardTitle}
                label={project.cardTitle}
                className="mb-4 h-[380px] w-full rounded-[4px] max-md:h-[240px]"
              />
              <div className="font-display text-2xl font-semibold">{project.cardTitle}</div>
              <div className="text-sm text-muted">{project.cardMeta[0]}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} style={{ height: `${projects.length * 70}vh` }} className="relative">
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden pt-28 pb-8 max-md:pt-24 max-md:pb-5">
        <SectionHeader eyebrow={eyebrow} heading={heading} />
        <div className="relative flex-1">
          {projects.map((project, i) => (
            <Panel key={project._id} project={project} index={i} count={projects.length} scrollYProgress={scrollYProgress} />
          ))}
        </div>
      </div>
    </div>
  );
}
