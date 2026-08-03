import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import ProjectsGrid from "@/components/ProjectsGrid";
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
      <section className="relative min-h-[420px] overflow-hidden">
        <SmartImage
          image={projectsPage.heroImage}
          alt={projectsPage.heroHeading}
          label="Signature project photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.25)_0%,rgba(20,18,16,0.7)_100%)]" />
        <div className="relative z-[2] flex max-w-[900px] flex-col justify-end px-16 pt-[120px] pb-16 max-md:px-6 max-md:pt-24 max-md:pb-10">
          <div className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase">
            {projectsPage.heroEyebrow}
          </div>
          <h1 className="mb-4 font-serif text-[64px] leading-[1.05] font-semibold text-ivory max-lg:text-[48px] max-md:text-[36px]">
            {projectsPage.heroHeading}
          </h1>
          <p className="max-w-[640px] text-[17px] leading-[1.7] text-[#e7e1d6]">
            {projectsPage.heroIntro}
          </p>
        </div>
      </section>

      <ProjectsGrid featured={featured} rest={rest} />
    </>
  );
}
