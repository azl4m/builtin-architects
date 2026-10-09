"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import SmartImage from "@/components/SmartImage";
import type { CmsProject } from "@/sanity/lib/types";

interface FeaturedProjectsShowcaseProps {
  eyebrow: string;
  heading: string;
  projects: CmsProject[];
}

interface StackedPanelProps {
  project: CmsProject;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function StackedPanel({ project, index, total, scrollYProgress }: StackedPanelProps) {
  const isFirst = index === 0;

  // Leave room to read the first and last cards before the section releases.
  const activeRange = 0.74;
  const numTransitions = Math.max(1, total - 1);
  const step = activeRange / numTransitions;
  const start = 0.08 + (index - 1) * step;
  const end = start + step * 0.85;
  const nextStart = 0.08 + index * step;
  const nextEnd = nextStart + step * 0.85;
  const ease = (value: number) => value * value * (3 - 2 * value);

  // Y Translation: Card 0 is fixed. Card 1+ slides up from 100% to 0%
  const yPercent = useTransform(
    scrollYProgress,
    [start, end],
    isFirst ? [0, 0] : [105, 0],
    { ease }
  );
  const y = useTransform(yPercent, (value) => `${value}%`);

  // Smooth scale down when next card slides over
  const scale = useTransform(
    scrollYProgress,
    [nextStart, nextEnd],
    index < total - 1 ? [1, 0.97] : [1, 1],
    { ease }
  );

  // Opacity dim when next card slides over
  const opacity = useTransform(
    scrollYProgress,
    [nextStart, nextEnd],
    index < total - 1 ? [1, 0.8] : [1, 1],
    { ease }
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0 w-full px-0 flex flex-col justify-end"
      style={{
        y: isFirst ? 0 : y,
        scale: index < total - 1 ? scale : 1,
        opacity: index < total - 1 ? opacity : 1,
        zIndex: index + 1,
        willChange: "transform, opacity",
        transformOrigin: "center bottom",
      }}
    >
      {/* Edge-to-edge full width card with rounded top corners and subtle glass border */}
      <Link
        href={`/projects/${project.slug}`}
        aria-label={`View ${project.cardTitle}`}
        className="group pointer-events-auto relative block h-full w-full overflow-hidden rounded-t-[32px] md:rounded-t-[44px] border-t border-white/20 bg-ink shadow-2xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-inset focus-visible:ring-accent-light"
      >
        <SmartImage
          image={project.heroImage}
          alt={project.cardTitle}
          label={project.cardTitle}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Dark overlay gradient for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent" />

        {/* Project Details Content */}
        <div className="absolute inset-x-0 bottom-0 px-6 md:px-16 pt-24 pb-10 max-md:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-block mb-2 text-xs font-semibold tracking-[3px] text-accent-light uppercase">
              {project.category || "Selected Work"}
            </span>
            <h3 className="font-display text-3xl md:text-5xl font-semibold text-ivory max-md:text-2xl">
              {project.cardTitle}
            </h3>
            {project.cardMeta?.[0] && (
              <p className="mt-2 text-sm md:text-base text-gray-300">
                {project.cardMeta[0]}
              </p>
            )}
          </div>

          <span
            aria-hidden="true"
            className="inline-flex items-center gap-2 self-start md:self-end rounded-full border border-white/30 bg-white/10 px-6 py-3 text-xs font-bold tracking-[1.5px] text-white uppercase backdrop-blur-md transition-colors duration-300 group-hover:bg-white group-hover:text-ink group-focus-visible:bg-white group-focus-visible:text-ink"
          >
            View Project →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function SectionHeader({ eyebrow, heading }: { eyebrow: string; heading: string }) {
  return (
    <div className="mx-auto mb-6 flex w-full max-w-[1400px] flex-wrap items-center justify-between gap-4 px-6 md:px-16">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <div className="text-[12px] font-semibold tracking-[4px] text-accent uppercase">
          {eyebrow}
        </div>
        <h2 className="font-display text-2xl md:text-3xl font-semibold max-md:text-xl">
          {heading}
        </h2>
      </div>
      <Link
        href="/projects"
        className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase"
      >
        All Projects →
      </Link>
    </div>
  );
}

export default function FeaturedProjectsShowcase({
  eyebrow,
  heading,
  projects,
}: FeaturedProjectsShowcaseProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  const total = projects.length;
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  if (total === 0) return null;

  if (shouldReduceMotion) {
    return (
      <div className="w-full px-6 md:px-16 py-20">
        <SectionHeader eyebrow={eyebrow} heading={heading} />
        <div className="flex flex-col gap-8">
          {projects.map((project) => (
            <Link key={project._id} href={`/projects/${project.slug}`} className="block w-full">
              <div className="relative h-[400px] w-full overflow-hidden rounded-t-[32px]">
                <SmartImage
                  image={project.heroImage}
                  alt={project.cardTitle}
                  label={project.cardTitle}
                  className="h-full w-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-display text-2xl font-semibold">{project.cardTitle}</h3>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ height: `${total > 1 ? total * 100 : 100}svh` }}
      className="relative w-full overflow-visible"
    >
      <div className="sticky top-0 flex h-[100svh] w-full flex-col overflow-hidden pt-12 md:pt-16 pb-0">
        <SectionHeader eyebrow={eyebrow} heading={heading} />
        <div className="relative min-h-0 flex-1 w-full px-0">
          {projects.map((project, i) => (
            <StackedPanel
              key={project._id}
              project={project}
              index={i}
              total={total}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

