import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import {
  getHomePage,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Home",
  description:
    "From first sketch to final handover — BUILTIN Developers & Interiors delivers thoughtful architecture, interior design, and construction across Kerala.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, projects, services, testimonials, siteSettings] = await Promise.all([
    getHomePage(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getSiteSettings(),
  ]);

  const featuredHome = projects.slice(0, 4);

  return (
    <>
      <section className="relative h-[88vh] min-h-[620px] overflow-hidden">
        <SmartImage
          image={home.heroImage}
          alt={home.heroHeadline}
          label="Hero project photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.35)_0%,rgba(20,18,16,0.55)_100%)]" />
        <div className="relative z-[2] flex h-full max-w-[900px] flex-col justify-center px-16 max-md:px-6">
          <div className="mb-5 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {home.heroEyebrow}
          </div>
          <h1 className="mb-7 text-pretty font-serif text-[76px] leading-[1.05] font-semibold text-ivory max-lg:text-[56px] max-md:text-[42px]">
            {home.heroHeadline}
          </h1>
          <p className="mb-10 max-w-[560px] text-lg leading-[1.6] text-[#e7e1d6]">{home.heroSubcopy}</p>
          <div className="flex flex-wrap gap-5">
            <Link
              href="/projects"
              className="rounded-[2px] bg-accent px-[34px] py-4 text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-hover"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-[2px] border border-ivory px-[34px] py-4 text-sm font-bold tracking-[1px] text-ivory uppercase transition-colors hover:border-accent hover:text-accent"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-20 px-16 py-[140px] max-lg:grid-cols-1 max-lg:gap-12 max-md:px-6 max-md:py-20">
        <SmartImage
          image={home.aboutImage}
          alt={home.aboutHeading}
          label="Studio / build photo"
          className="h-[520px] w-full rounded-[4px]"
        />
        <div>
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {home.aboutEyebrow}
          </div>
          <h2 className="mb-7 font-serif text-[44px] leading-[1.15] font-semibold max-md:text-[32px]">
            {home.aboutHeading}
          </h2>
          {home.aboutParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base leading-[1.85] text-body ${
                i === home.aboutParagraphs.length - 1 ? "mb-9" : "mb-5"
              }`}
            >
              {paragraph}
            </p>
          ))}
          <Link
            href="/about"
            className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase"
          >
            Read More →
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-4 gap-10 bg-ink px-16 py-20 text-center text-ivory max-lg:grid-cols-2 max-lg:gap-8 max-md:px-6">
        {siteSettings.stats.map((stat) => (
          <div key={stat.label}>
            <div className="font-serif text-[56px] text-accent">{stat.value}</div>
            <div className="mt-2 text-[13px] tracking-[2px] text-footer-muted uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mb-[70px] text-center">
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {home.servicesEyebrow}
          </div>
          <h2 className="font-serif text-[44px] font-semibold max-md:text-[32px]">
            {home.servicesHeading}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-10 max-lg:grid-cols-1">
          {services.map((s) => (
            <div key={s._id} className="border border-hairline bg-surface px-9 py-12">
              <div className="mb-4 font-serif text-[15px] text-accent">{s.numberLabel}</div>
              <h3 className="mb-4 font-serif text-[26px] font-semibold">{s.title}</h3>
              <p className="text-[15px] leading-[1.8] text-body">{s.shortDescription}</p>
            </div>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Link
            href="/services"
            className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase"
          >
            Explore All Services →
          </Link>
        </div>
      </section>

      <section className="bg-alt px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mx-auto max-w-[1400px]">
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <div>
              <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
                {home.featuredProjectsEyebrow}
              </div>
              <h2 className="font-serif text-[44px] font-semibold max-md:text-[32px]">
                {home.featuredProjectsHeading}
              </h2>
            </div>
            <Link
              href="/projects"
              className="border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase"
            >
              All Projects →
            </Link>
          </div>
          <div className="grid grid-cols-4 gap-7 max-lg:grid-cols-2 max-sm:grid-cols-1">
            {featuredHome.map((project) => (
              <Link key={project._id} href="/projects" className="block text-ink no-underline">
                <SmartImage
                  image={project.heroImage}
                  alt={project.cardTitle}
                  label={project.cardTitle}
                  className="mb-[18px] h-[280px] w-full rounded-[2px]"
                />
                <div className="mb-1 font-serif text-xl font-semibold">{project.cardTitle}</div>
                <div className="text-[13px] text-muted">{project.cardMeta[0]}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mb-16 text-center">
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {home.testimonialsEyebrow}
          </div>
          <h2 className="font-serif text-[44px] font-semibold max-md:text-[32px]">
            {home.testimonialsHeading}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-9 max-lg:grid-cols-1">
          {testimonials.map((t) => (
            <div key={t._id} className="border border-hairline bg-surface px-8 py-10">
              <p className="mb-7 font-serif text-[19px] leading-[1.7] text-copy-dark italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="text-sm font-bold">{t.name}</div>
              <div className="text-[13px] text-muted">{t.role}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center justify-center gap-20 bg-alt px-16 py-16 max-md:gap-10 max-md:px-6">
        {(home.clientLogos.length ? home.clientLogos : [null, null, null, null]).map((logo, i) => (
          <SmartImage
            key={i}
            image={logo}
            alt="Client logo"
            label={`Client logo ${i + 1}`}
            className="h-[70px] w-[160px] rounded-[2px]"
          />
        ))}
      </section>
    </>
  );
}
