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

  const seoTitle = project.seo?.metaTitle || `${project.title} | BUILTIN Developers & Interiors`;
  const seoDesc = project.seo?.metaDescription || `${project.tagline} — ${project.scope} for ${project.client} in ${project.location}.`;
  const canonical = project.seo?.canonicalUrl || `/projects/${project.slug}`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical },
    openGraph: {
      title: project.seo?.ogTitle || seoTitle,
      description: project.seo?.ogDescription || seoDesc,
      images: project.seo?.ogImage ? [{ url: project.seo.ogImage.asset?.url || "" }] : [],
    },
    robots: project.seo?.noIndex ? { index: false, follow: true } : undefined,
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

      <section id="site-hero" className="relative min-h-[420px] md:min-h-[460px] w-full max-w-full overflow-hidden">
        <SmartImage
          image={project.heroImage}
          alt={project.title}
          label={`${project.title} hero photo`}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex max-w-[900px] flex-col justify-end px-16 pt-[120px] pb-14 max-lg:px-8 max-md:px-5 max-md:pt-28 max-md:pb-8">
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
            className="font-display text-[58px] leading-[1.08] font-semibold text-ivory max-lg:text-[40px] max-md:text-[28px] max-sm:text-[22px] break-words text-balance"
          >
            {project.title}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-16 px-16 py-20 max-lg:grid-cols-1 max-lg:gap-10 max-lg:px-8 max-md:px-5 max-md:py-12">
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 max-sm:grid-cols-1 lg:flex lg:flex-col lg:gap-[26px] border-b border-hairline/60 pb-8 lg:border-b-0 lg:pb-0">
          {[
            ["Client", project.client],
            ["Built-up Area", project.area],
            ["Location", project.location],
            ["Status", project.status],
            ["Scope", project.scope],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <div className="mb-1 text-xs font-bold tracking-[1.5px] text-accent uppercase">
                {label}
              </div>
              <div className="text-[14px] md:text-[15px] text-copy-dark break-words">{value}</div>
            </div>
          ))}
        </div>
        <div className="min-w-0">
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase max-md:text-[11px] max-md:tracking-[2px]">
            Overview
          </div>
          <h2 className="mb-6 font-display text-[34px] font-semibold max-lg:text-[28px] max-md:text-[22px] leading-[1.25] text-balance">
            {project.tagline}
          </h2>
          <p className="mb-5 text-base leading-[1.8] text-body max-md:text-sm">{project.desc1}</p>
          <p className="text-base leading-[1.8] text-body max-md:text-sm">{project.desc2}</p>
        </div>
      </section>

      {project.beforeImage ? (
        <section className="mx-auto max-w-[1400px] px-16 py-[100px] max-lg:px-8 max-md:px-5 max-md:py-12 w-full max-w-full overflow-hidden">
          <div className="mb-[18px] flex items-center gap-3 text-[13px] font-semibold tracking-[4px] text-accent uppercase max-md:text-[11px] max-md:tracking-[2px]">
            Before / After
            <DimensionLine className="text-accent shrink-0" />
          </div>
          <h2 className="mb-8 md:mb-10 font-display text-[38px] font-semibold max-lg:text-[30px] max-md:text-[24px]">
            See The Transformation
          </h2>
          <BeforeAfterSlider
            beforeImage={project.beforeImage}
            afterImage={project.heroImage ?? project.galleryImages[0]}
            title={project.title}
            className="h-[560px] max-lg:h-[440px] max-md:h-[320px] max-sm:h-[240px] w-full overflow-hidden rounded-[4px]"
          />
        </section>
      ) : null}

      <section className="bg-alt px-16 py-[100px] max-lg:px-8 max-md:px-5 max-md:py-12 w-full max-w-full overflow-hidden">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-[18px] flex items-center gap-3 text-[13px] font-semibold tracking-[4px] text-accent uppercase max-md:text-[11px] max-md:tracking-[2px]">
            Gallery
            <DimensionLine className="text-accent shrink-0" />
          </div>
          <h2 className="mb-8 md:mb-12 font-display text-[38px] font-semibold max-lg:text-[30px] max-md:text-[24px]">
            Project Photos
          </h2>
          <ProjectScrollytelling items={scrollItems} />
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-16 py-[100px] max-lg:px-8 max-md:px-5 max-md:py-12 w-full max-w-full overflow-hidden">
        <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase max-md:text-[11px] max-md:tracking-[2px]">
          Walkthrough
        </div>
        <h2 className="mb-8 md:mb-12 font-display text-[38px] font-semibold max-lg:text-[30px] max-md:text-[24px]">
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
