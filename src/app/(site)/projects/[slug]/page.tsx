import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import ProjectVideo from "@/components/ProjectVideo";
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd(project)) }}
      />

      <section className="relative min-h-[460px] overflow-hidden">
        <SmartImage
          image={project.heroImage}
          alt={project.title}
          label={`${project.title} hero photo`}
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.15)_0%,rgba(20,18,16,0.72)_100%)]" />
        <div className="relative z-[2] flex max-w-[900px] flex-col justify-end px-16 pt-[120px] pb-14 max-md:px-6 max-md:pt-24 max-md:pb-10">
          <Link href="/projects" className="mb-5 inline-block w-fit text-[13px] tracking-[1px] text-accent-light">
            ← All Projects
          </Link>
          <div className="mb-3.5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase">
            {project.status}
          </div>
          <h1 className="font-serif text-[58px] leading-[1.08] font-semibold text-ivory max-lg:text-[42px] max-md:text-[32px]">
            {project.title}
          </h1>
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
          <h2 className="mb-6 font-serif text-[34px] font-semibold max-md:text-[26px]">
            {project.tagline}
          </h2>
          <p className="mb-5 text-base leading-[1.9] text-body">{project.desc1}</p>
          <p className="text-base leading-[1.9] text-body">{project.desc2}</p>
        </div>
      </section>

      <section className="bg-alt px-16 py-[100px] max-md:px-6 max-md:py-16">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            Gallery
          </div>
          <h2 className="mb-12 font-serif text-[38px] font-semibold max-md:text-[28px]">
            Project Photos
          </h2>
          <div className="mb-6 grid grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6 max-md:grid-cols-1">
            <SmartImage
              image={gallery[0].image}
              alt={`${project.title} — photo 1`}
              label={gallery[0].label}
              className="h-[480px] w-full rounded-[4px] max-md:h-[300px]"
            />
            <div className="grid grid-rows-2 gap-6">
              <SmartImage
                image={gallery[1].image}
                alt={`${project.title} — photo 2`}
                label={gallery[1].label}
                className="h-[228px] w-full rounded-[4px]"
              />
              <SmartImage
                image={gallery[2].image}
                alt={`${project.title} — photo 3`}
                label={gallery[2].label}
                className="h-[228px] w-full rounded-[4px]"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6 max-md:grid-cols-1">
            {gallery.slice(3).map((g, i) => (
              <SmartImage
                key={i}
                image={g.image}
                alt={`${project.title} — photo ${i + 4}`}
                label={g.label}
                className="h-[260px] w-full rounded-[4px]"
              />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1400px] px-16 py-[100px] max-md:px-6 max-md:py-16">
        <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
          Walkthrough
        </div>
        <h2 className="mb-12 font-serif text-[38px] font-semibold max-md:text-[28px]">
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
