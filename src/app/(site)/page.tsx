import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import AnimatedStat from "@/components/AnimatedStat";
import DimensionLine from "@/components/DimensionLine";
import FeaturedProjectsShowcase from "@/components/FeaturedProjectsShowcase";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
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
      <section id="site-hero" className="relative h-dvh min-h-[560px] overflow-hidden">
        <SmartImage
          image={home.heroImage}
          alt={home.heroHeadline}
          label="Hero project photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        {home.heroVideo?.playbackId && home.heroVideo.status === "ready" ? (
          <HeroVideo playbackId={home.heroVideo.playbackId} className="absolute inset-0 h-full w-full" />
        ) : null}
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex h-full max-w-[900px] flex-col justify-end px-16 pb-20 max-md:px-6 max-md:pb-10">
          <Reveal
            as="div"
            delay={0}
            className="mb-5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-3 max-md:text-[11px] max-md:tracking-[2px]"
          >
            {home.heroEyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.09}
            className="mb-7 text-pretty font-display text-[76px] leading-[1.05] font-semibold text-ivory max-lg:text-[56px] max-md:mb-3 max-md:text-[32px] max-md:leading-[1.15]"
          >
            {home.heroHeadline}
          </Reveal>
          <Reveal
            as="p"
            delay={0.18}
            className="mb-10 max-w-[560px] text-lg leading-[1.6] text-[#dce3f2] max-md:mb-6 max-md:text-[14px] max-md:leading-[1.5]"
          >
            {home.heroSubcopy}
          </Reveal>
          <Reveal as="div" delay={0.27} className="flex flex-wrap gap-5 max-md:gap-3">
            <Link
              href="/projects"
              className="rounded-[2px] bg-ivory px-[34px] py-4 text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-light hover:text-ivory max-md:px-6 max-md:py-3 max-md:text-xs"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="rounded-[2px] border border-ivory px-[34px] py-4 text-sm font-bold tracking-[1px] text-ivory uppercase transition-colors hover:border-accent-light hover:text-accent-light max-md:px-6 max-md:py-3 max-md:text-xs"
            >
              Get In Touch
            </Link>
          </Reveal>
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
          <h2 className="mb-7 font-display text-[44px] leading-[1.15] font-semibold max-md:text-[32px]">
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

      <section className="blueprint-grid grid grid-cols-4 gap-10 bg-ink px-16 py-20 text-center text-ivory max-lg:grid-cols-2 max-lg:gap-8 max-md:px-6">
        {siteSettings.stats.map((stat) => (
          <div key={stat.label}>
            <AnimatedStat value={stat.value} className="font-display text-[56px] text-ivory" />
            <div className="mt-2 text-[13px] tracking-[2px] text-footer-muted uppercase">
              {stat.label}
            </div>
          </div>
        ))}
      </section>

      <section className="mx-auto max-w-[1400px] px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mb-[70px] text-center">
          <div className="mb-[18px] flex items-center justify-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            <DimensionLine className="text-accent" width={56} />
            {home.servicesEyebrow}
            <DimensionLine className="text-accent" width={56} />
          </div>
          <h2 className="font-display text-[44px] font-semibold max-md:text-[32px]">
            {home.servicesHeading}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
          {services.map((s, i) => {
            const Icon = SERVICE_ICONS[s.icon];
            return (
              <Reveal
                key={s._id}
                as="div"
                direction="up"
                delay={i * 0.1}
                viewTriggered
                hoverLift
                className="border border-hairline bg-surface px-7 py-10"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-alt text-accent">
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </div>
                <div className="mb-3 font-display text-[13px] text-accent">{s.numberLabel}</div>
                <h3 className="mb-3 font-display text-[21px] font-semibold">{s.title}</h3>
                <p className="text-[14px] leading-[1.75] text-body">{s.shortDescription}</p>
              </Reveal>
            );
          })}
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

      <section className="bg-alt">
        <FeaturedProjectsShowcase
          eyebrow={home.featuredProjectsEyebrow}
          heading={home.featuredProjectsHeading}
          projects={featuredHome}
        />
      </section>

      <section className="mx-auto max-w-[1200px] px-16 py-[140px] max-md:px-6 max-md:py-20">
        <div className="mb-16 text-center">
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {home.testimonialsEyebrow}
          </div>
          <h2 className="font-display text-[44px] font-semibold max-md:text-[32px]">
            {home.testimonialsHeading}
          </h2>
        </div>
        <div className="grid grid-cols-3 gap-9 max-lg:grid-cols-1">
          {testimonials.map((t) => (
            <div key={t._id} className="border border-hairline bg-surface px-8 py-10">
              <p className="mb-7 font-display text-[19px] leading-[1.7] text-copy-dark italic">
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
