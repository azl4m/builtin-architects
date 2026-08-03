"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import type { CmsProject, ProjectCategory } from "@/sanity/lib/types";

const TABS: ("All" | ProjectCategory)[] = ["All", "Architecture", "Interior", "Construction"];

interface ProjectsGridProps {
  featured: CmsProject;
  rest: CmsProject[];
}

export default function ProjectsGrid({ featured, rest }: ProjectsGridProps) {
  const [tab, setTab] = useState<(typeof TABS)[number]>("All");

  const showFeatured = tab === "All" || tab === featured.category;
  const filteredRest = useMemo(
    () => (tab === "All" ? rest : rest.filter((p) => p.category === tab)),
    [tab, rest]
  );

  return (
    <>
      <div className="mx-auto flex max-w-[1400px] gap-9 border-b border-hairline px-16 pt-14 max-md:gap-5 max-md:px-6">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`border-b-2 pb-2.5 text-[13px] tracking-[1px] uppercase transition-colors ${
              tab === t ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <section className="mx-auto max-w-[1400px] px-16 pt-20 pb-[60px] max-md:px-6 max-md:pt-12">
        {showFeatured ? (
          <div className="group mb-10 grid grid-cols-[1.3fr_1fr] border border-hairline bg-surface transition-[transform,box-shadow] duration-[350ms] ease-out hover:-translate-y-2 hover:shadow-[0_28px_56px_rgba(32,29,26,0.16)] max-lg:grid-cols-1">
            <div className="relative overflow-hidden">
              <SmartImage
                image={featured.heroImage}
                alt={featured.title}
                label={featured.cardTitle}
                className="h-full min-h-[420px] w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
              />
              <div className="absolute top-5 left-5 bg-accent px-4 py-2 text-[11px] font-bold tracking-[1px] text-ink uppercase">
                {featured.status}
              </div>
            </div>
            <div className="flex flex-col justify-center px-12 py-14 max-md:px-8 max-md:py-10">
              <div className="mb-4 text-xs font-bold tracking-[2px] text-accent uppercase">
                Featured Project
              </div>
              <h3 className="mb-5 font-serif text-[34px] font-semibold max-md:text-[26px]">
                {featured.title}
              </h3>
              <div className="text-sm leading-[2.1] text-body">
                <div>Client: {featured.client}</div>
                <div>Built-up Area: {featured.area}</div>
                <div>Location: {featured.location}</div>
                <div>Scope: {featured.scope}</div>
              </div>
              <Link
                href={`/projects/${featured.slug}`}
                className="mt-6 inline-block border-b-2 border-accent pb-1 text-[13px] font-bold tracking-[1px] text-ink uppercase w-fit"
              >
                Know More →
              </Link>
            </div>
          </div>
        ) : null}

        <div className="grid grid-cols-3 gap-9 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {filteredRest.map((project) => (
            <div
              key={project.slug}
              className="group border border-hairline bg-surface transition-[transform,box-shadow] duration-[350ms] ease-out hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(32,29,26,0.12)]"
            >
              <div className="relative overflow-hidden">
                <SmartImage
                  image={project.heroImage}
                  alt={project.title}
                  label={project.cardTitle}
                  className="h-[280px] w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.06]"
                />
                <div className="absolute top-4 left-4 bg-ivory px-3.5 py-1.5 text-[10px] font-bold tracking-[1px] text-ink uppercase">
                  {project.status}
                </div>
              </div>
              <div className="p-8">
                <h3 className="mb-3 font-serif text-[23px] font-semibold">{project.cardTitle}</h3>
                <div className="text-[13.5px] leading-[1.9] text-body">
                  {project.cardMeta.map((line) => (
                    <div key={line}>{line}</div>
                  ))}
                </div>
                <Link
                  href={`/projects/${project.slug}`}
                  className="mt-4 inline-block border-b-2 border-accent pb-[3px] text-[12.5px] font-bold tracking-[1px] text-ink uppercase"
                >
                  Know More →
                </Link>
              </div>
            </div>
          ))}

          <div className="flex flex-col items-start justify-center bg-ink p-10 text-ivory">
            <div className="mb-4 font-serif text-[30px] leading-[1.2] font-semibold">
              Have a project in mind?
            </div>
            <p className="mb-6 text-sm leading-[1.7] text-footer-muted">
              Let&apos;s talk through your site, budget, and timeline.
            </p>
            <Link
              href="/contact"
              className="border-b-2 border-accent pb-1 text-[13px] font-bold tracking-[1px] text-ivory uppercase"
            >
              Get In Touch →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
