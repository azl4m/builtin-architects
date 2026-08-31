import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import ProjectVideo from "@/components/ProjectVideo";
import Reveal from "@/components/Reveal";
import BeforeAfterSlider from "@/components/BeforeAfterSlider";
import ProjectScrollytelling from "@/components/ProjectScrollytelling";
import DimensionLine from "@/components/DimensionLine";
import { getProjectBySlug, getProjectSlugs } from "@/sanity/lib/fetchers";
import { projectJsonLd } from "@/lib/jsonld";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: `${project.tagline} — ${project.scope} for ${project.client} in ${project.location}.`,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      title: project.title,
      description: project.tagline,
    },
  };
}

const galleryLabels = [
  "Wide interior/exterior photo",
  "Detail photo",
  "Detail photo",
  "Project photo",
  "Project photo",
  "Project photo",
];

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  const gallery = galleryLabels.map((label, i) => ({
    label,
    image: project.galleryImages[i] ?? null,
  }));

  const scrollItems = gallery.map((g, i) => {
    let caption: string | undefined;
    if (i === 0) caption = project.tagline || undefined;
    else if (i === 2) caption = [project.scope, project.area].filter(Boolean).join(" · ") || undefined;
    else if (i === 5) caption = `Completed for ${project.client} in ${project.location}`;
    return { image: g.image, label: g.label, alt: `${project.title} — photo ${i + 1}`, caption };
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <section id="site-hero" className="relative min-h-[460px] overflow-hidden">
        <SmartImage
          image={project.heroImage}
          alt={project.title}
          label={`${project.title} hero photo`}
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex max-w-[900px] flex-col justify-end px-16 pt-[120px] pb-14 max-md:px-6 max-md:pt-24 max-md:pb-8">
          <Reveal as="div" delay={0} className="mb-5 w-fit max-md:mb-2">
            <Link
              href="/projects"
              className="inline-block text-[13px] tracking-[1px] text-accent-light max-md:text-[12px]"
            >
              ← All Projects
            </Link>
          </Reveal>
          <Reveal
            as="div"
            delay={0.09}
            className="mb-3.5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-2 max-md:text-[11px] max-md:tracking-[2px]"
          >
            {project.status}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.18}
            className="font-display text-[58px] leading-[1.08] font-semibold text-ivory max-lg:text-[42px] max-md:text-[26px]"
          >
            {project.title}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-20 px-16 py-20 max-lg:grid-cols-1 max-lg:gap-12 max-md:px-6 max-md:py-14">
        <div className="flex flex-col gap-[26px]">
          {[
            ["Client", project.client],
            ["Built-up Area", project.area],
            ["Location", project.location],
            ["Status", project.status],
            ["Scope", project.scope],
          ].map(([label, value]) => (
            <div key={label}>
              <div className="mb-1.5 text-xs font-bold tracking-[1.5px] text-accent uppercase">
                {label}
              </div>
              <div className="text-[15px] text-copy-dark">{value}</div>
            </div>
          ))}
        </div>
        <div>
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            Overview
          </div>
          <h2 className="mb-6 font-display text-[34px] font-semibold max-md:text-[26px]">
            {project.tagline}
          </h2>
          <p className="mb-5 text-base leading-[1.9] text-body">{project.desc1}</p>
          <p className="text-base leading-[1.9] text-body">{project.desc2}</p>
        </div>
      </section>

      {project.beforeImage ? (
        <section className="mx-auto max-w-[1400px] px-16 py-[100px] max-md:px-6 max-md:py-16">
          <div className="mb-[18px] flex items-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            Before / After
            <DimensionLine className="text-accent" />
          </div>
          <h2 className="mb-10 font-display text-[38px] font-semibold max-md:text-[28px]">
            See The Transformation
          </h2>
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.heroImage ?? project.galleryImages[0]}
            title={project.title}
            className="h-[560px] w-full overflow-hidden rounded-[4px] max-md:h-[340px]"
          />
        </section>
      ) : null}

      <section className="bg-alt px-16 py-[100px] max-md:px-6 max-md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-[18px] flex items-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            Gallery
            <DimensionLine className="text-accent" />
          </div>
          <h2 className="mb-12 font-display text-[38px] font-semibold max-md:text-[28px]">
            Project Photos
          </h2>
          <ProjectScrollytelling items={scrollItems} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-16 py-[100px] max-md:px-6 max-md:py-16">
        <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
          Walkthrough
        </div>
        <h2 className="mb-12 font-display text-[38px] font-semibold max-md:text-[28px]">
          Project Video
        </h2>
        <ProjectVideo
          videoUrl={project.videoUrl}
          posterImage={project.videoPosterImage}
          title={project.title}
        />
      </section>
    </>
  );
}
