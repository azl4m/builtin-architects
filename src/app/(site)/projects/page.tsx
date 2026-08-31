import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import ProjectsGrid from "@/components/ProjectsGrid";
import Reveal from "@/components/Reveal";
import { getProjects, getProjectsPage } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Residences, interiors, and institutional builds across Kerala — designed and delivered by BUILTIN Developers & Interiors.",
  alternates: { canonical: "/projects" },
};

export default async function ProjectsPage() {
  const [projectsPage, projects] = await Promise.all([getProjectsPage(), getProjects()]);

  const featured = projects.find((p) => p.featured) ?? projects[0];
  const rest = projects.filter((p) => p.slug !== featured.slug);

  return (
    <>
      <section id="site-hero" className="relative min-h-[420px] overflow-hidden">
        <SmartImage
          image={projectsPage.heroImage}
          alt={projectsPage.heroHeading}
          label="Signature project photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex max-w-[900px] flex-col justify-end px-16 pt-[120px] pb-16 max-md:px-6 max-md:pt-24 max-md:pb-8">
          <Reveal
            as="div"
            delay={0}
            className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-2 max-md:text-[11px] max-md:tracking-[2px]"
          >
            {projectsPage.heroEyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.09}
            className="mb-4 font-display text-[64px] leading-[1.05] font-semibold text-ivory max-lg:text-[48px] max-md:mb-2 max-md:text-[28px]"
          >
            {projectsPage.heroHeading}
          </Reveal>
          <Reveal
            as="p"
            delay={0.18}
            className="max-w-[640px] text-[17px] leading-[1.7] text-[#dce3f2] max-md:text-[13px] max-md:leading-[1.5]"
          >
            {projectsPage.heroIntro}
          </Reveal>
        </div>
      </section>

      <ProjectsGrid featured={featured} rest={rest} />
    </>
  );
}
