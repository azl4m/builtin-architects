import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import HeroVideo from "@/components/HeroVideo";
import Reveal from "@/components/Reveal";
import ZoomReveal from "@/components/ZoomReveal";
import Typewriter from "@/components/Typewriter";
import TextLoop from "@/components/TextLoop";
import AnimatedStat from "@/components/AnimatedStat";
import DimensionLine from "@/components/DimensionLine";
import FeaturedProjectsShowcase from "@/components/FeaturedProjectsShowcase";
import MasonryGallery from "@/components/MasonryGallery";
import TestimonialCardStack from "@/components/TestimonialCardStack";
import CTABand from "@/components/CTABand";
import ClientLogos from "@/components/ClientLogos";
import { SERVICE_ICONS } from "@/lib/serviceIcons";
import {
  getCtaBand,
  getHomePage,
  getProjects,
  getServices,
  getSiteSettings,
  getTestimonials,
} from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "BUILTIN Developers & Interiors | Architecture, Interiors & Construction in Calicut",
  description:
    "Architecture, interior design, interior contracting, and construction in Calicut, Kerala. 16+ years of experience in integrated design and execution.",
  alternates: { canonical: "/" },
};

export default async function HomePage() {
  const [home, projects, services, testimonials, siteSettings, ctaBand] = await Promise.all([
    getHomePage(),
    getProjects(),
    getServices(),
    getTestimonials(),
    getSiteSettings(),
    getCtaBand(),
  ]);

  const featuredHome = projects.slice(0, 4);

  const heroEyebrow = home.heroEyebrow || "Architecture · Interior · Contracting · Construction";
  const heroHeadline = home.heroHeadline || "Four disciplines. One accountable team.";
  const heroSubcopy = home.heroSubcopy || "Architecture, interior design, interior contracting, and construction — coordinated from concept to completion so nothing gets lost between the drawing and the finished space.";
  const heroCtaLabel = home.heroCtaLabel || "View Projects";
  const heroCtaLink = home.heroCtaLink || "/projects";
  const heroCtaSecondaryLabel = home.heroCtaSecondaryLabel || "Get In Touch";
  const heroCtaSecondaryLink = home.heroCtaSecondaryLink || "/contact";

  return (
    <>
      {/* 1. HERO */}
      <section id="site-hero" className="relative h-dvh min-h-[560px] overflow-hidden">
        <SmartImage
          image={home.heroImage}
          alt={heroHeadline}
          label="Hero project photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        {home.heroVideo?.playbackId && home.heroVideo.status === "ready" ? (
          <HeroVideo playbackId={home.heroVideo.playbackId} className="absolute inset-0 z-10 h-full w-full" />
        ) : null}
        <div className="hero-overlay absolute inset-0 z-20" />
        <div className="absolute inset-0 z-30 flex max-w-[900px] flex-col justify-end px-16 pb-20 max-md:px-6 max-md:pb-10">
          <TextLoop
            text={heroEyebrow}
            className="mb-5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-3 max-md:text-[11px] max-md:tracking-[2px]"
          />
          <Typewriter
            text={heroHeadline}
            className="mb-7 text-pretty font-display text-[48px] leading-[1.25] font-light text-ivory max-lg:text-[38px] max-md:mb-3 max-md:text-[26px] max-md:leading-[1.3] tracking-[0.5px]"
          />
          <Reveal
            as="p"
            className="mb-10 max-w-[560px] text-lg leading-[1.6] text-[#dce3f2] max-md:mb-6 max-md:text-[14px] max-md:leading-[1.5]"
          >
            {heroSubcopy}
          </Reveal>
          <Reveal as="div" className="flex flex-wrap gap-5 max-md:gap-3">
            {heroCtaLabel && (
              <Link
                href={heroCtaLink}
                className="rounded-[2px] bg-ivory px-[34px] py-4 text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-light hover:text-ivory max-md:px-6 max-md:py-3 max-md:text-xs"
              >
                {heroCtaLabel}
              </Link>
            )}
            {heroCtaSecondaryLabel && (
              <Link
                href={heroCtaSecondaryLink}
                className="rounded-[2px] border border-ivory/30 px-[34px] py-4 text-sm font-bold tracking-[1px] text-ivory uppercase transition-colors hover:bg-ivory hover:text-ink max-md:px-6 max-md:py-3 max-md:text-xs"
              >
                {heroCtaSecondaryLabel}
              </Link>
            )}
          </Reveal>
        </div>
      </section>

      {/* 2. VALUES / NUMBERS (STATS) */}
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

      {/* 3. OUR SERVICES */}
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
          {(() => {
            const SHORT_DESC: Record<string, string> = {
              "architecture": "Concept design, planning, and detailed blueprints.",
              "interior-design": "Bespoke styling, material palettes, and custom furniture.",
              "interior-contracting": "Turning approved designs into finished physical spaces.",
              "building-construction": "End-to-end build execution and quality site management."
            };

            return services.map((s, i) => {
              const Icon = SERVICE_ICONS[s.icon];
              return (
                <Reveal
                  key={s._id}
                  as="div"
                  direction="up"
                  delay={i * 0.1}
                  viewTriggered
                  hoverLift
                  className="relative border border-hairline bg-surface p-0"
                >
                  <Link href={`/services/${s.slug}`} className="relative block h-full w-full px-7 pt-14 pb-8 text-left hover:no-underline group">
                    <div className="absolute top-6 left-7 font-display text-[13px] font-semibold text-accent/60">
                      {s.numberLabel}
                    </div>
                    <div className="mb-6 text-accent">
                      <Icon className="h-12 w-12 stroke-[1.25] transition-transform duration-300 group-hover:scale-105" />
                    </div>
                    <h3 className="mb-2 font-display text-[19px] font-semibold text-ink group-hover:text-accent transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-[13px] leading-[1.65] text-body">
                      {SHORT_DESC[s.slug] || s.shortDescription}
                    </p>
                  </Link>
                </Reveal>
              );
            });
          })()}
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

      {/* 4. FEATURED PROJECTS */}
      <section className="bg-alt mb-20 md:mb-32">
        <FeaturedProjectsShowcase
          eyebrow={home.featuredProjectsEyebrow}
          heading={home.featuredProjectsHeading}
          projects={featuredHome}
        />
      </section>

      {/* 5. LET'S BUILD PROJECT SECTION (CTA BAND) */}
      <CTABand
        eyebrow={ctaBand.eyebrow}
        heading={ctaBand.heading}
        buttonLabel={ctaBand.buttonLabel}
      />

      {/* 6. ABOUT US */}
      <section className="mx-auto grid max-w-[1400px] grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-16 px-16 py-[140px] max-md:px-6 max-md:py-20">
        <ZoomReveal className="rounded-[6px] h-[480px] lg:h-[620px] xl:h-[660px] w-full lg:col-span-7 shadow-xl">
          <SmartImage
            image={home.aboutImage}
            alt={home.aboutHeading}
            label="Studio / build photo"
            className="h-full w-full object-cover"
          />
        </ZoomReveal>
        <div className="lg:col-span-5">
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

      {/* 7. TESTIMONIALS */}
      <TestimonialCardStack
        testimonials={testimonials}
        eyebrow={home.testimonialsEyebrow ?? "TESTIMONIALS"}
        heading="Trusted by homeowners & leaders across Kerala."
      />

      {/* 8. MASONRY GALLERY */}
      <MasonryGallery
        eyebrow={home.galleryEyebrow ?? "Visual Showcase"}
        heading={home.galleryHeading ?? "Our Work Gallery"}
        images={home.galleryImages ?? []}
      />

      {/* 9. CLIENT LOGOS */}
      <ClientLogos logos={home.clientLogos} />
    </>
  );
}

