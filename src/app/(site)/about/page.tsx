import type { Metadata } from "next";
import { Target, Compass } from "lucide-react";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";
import AnimatedStat from "@/components/AnimatedStat";
import DimensionLine from "@/components/DimensionLine";
import { getAboutPage, getSiteSettings } from "@/sanity/lib/fetchers";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAboutPage();
  const seoTitle = about.seo?.metaTitle || "About Us | BUILTIN Developers & Interiors";
  const seoDesc = about.seo?.metaDescription || "BUILTIN Developers & Interiors brings architecture, interiors, and construction under one roof — a full-service studio delivering projects across Kerala.";
  const canonical = about.seo?.canonicalUrl || "/about";

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical },
    openGraph: {
      title: about.seo?.ogTitle || seoTitle,
      description: about.seo?.ogDescription || seoDesc,
      images: about.seo?.ogImage ? [{ url: about.seo.ogImage.asset?.url || "" }] : [],
    },
    robots: about.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function AboutPage() {
  const [about, siteSettings] = await Promise.all([getAboutPage(), getSiteSettings()]);

  return (
    <>
      <section id="site-hero" className="relative h-[46vh] min-h-[340px] overflow-hidden">
        <SmartImage
          image={about.heroImage}
          alt={about.heroHeading}
          label="Office / team photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex h-full flex-col justify-end px-16 pb-14 max-md:px-6 max-md:pb-8">
          <Reveal
            as="div"
            delay={0}
            className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-2 max-md:text-[11px] max-md:tracking-[2px]"
          >
            {about.heroEyebrow}
          </Reveal>
          <Reveal as="h1" delay={0.09} className="font-display text-[56px] font-semibold text-ivory max-md:text-[30px]">
            {about.heroHeading}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-20 px-16 py-[140px] max-lg:grid-cols-1 max-lg:gap-12 max-md:px-6 max-md:py-20">
        <div>
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {about.storyEyebrow}
          </div>
          <h2 className="mb-7 font-display text-[42px] leading-[1.15] font-semibold max-md:text-[30px]">
            {about.storyHeading}
          </h2>
          {about.introduction && (
            <p className="text-lg leading-[1.75] font-semibold text-accent mb-6">
              {about.introduction}
            </p>
          )}
          {about.storyParagraphs.map((paragraph, i) => (
            <p
              key={i}
              className={`text-base leading-[1.85] text-body ${
                i === about.storyParagraphs.length - 1 && !about.experience ? "" : "mb-5"
              }`}
            >
              {paragraph}
            </p>
          ))}
          {about.experience && (
            <p className="text-base leading-[1.85] text-body font-medium text-copy-dark mt-6 border-l-2 border-accent pl-4">
              {about.experience}
            </p>
          )}
        </div>
        <SmartImage
          image={about.storyImage}
          alt={about.storyHeading}
          label="Founder / studio photo"
          className="h-[560px] w-full rounded-[4px]"
        />
      </section>

      <section className="relative overflow-hidden bg-alt px-16 py-[120px] max-md:px-6 max-md:py-16">
        {/* Architectural grid overlay */}
        <div className="blueprint-grid absolute inset-0 opacity-40 pointer-events-none" />

        <div className="relative z-10 mx-auto grid max-w-[1400px] grid-cols-2 gap-10 max-md:grid-cols-1 max-md:gap-6">
          {/* Mission Card */}
          <Reveal direction="up" delay={0.1} viewTriggered={true} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-hairline/80 bg-surface/90 backdrop-blur-sm p-12 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl active:scale-[0.98] active:border-accent/60 max-md:p-7">
              {/* Glowing Top Accent Line - Always subtly visible & pulsing on mobile */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-accent/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-90 max-md:animate-pulse" />
              
              {/* Background Watermark Number */}
              <div className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[140px] font-extrabold leading-none text-accent/5 select-none transition-colors duration-300 group-hover:text-accent/10 max-md:text-[110px] max-md:opacity-80">
                01
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-accent uppercase">
                      Our Purpose
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-ivory max-md:ring-2 max-md:ring-accent/20">
                      <Target className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mb-4 font-display text-[32px] font-semibold text-ink max-md:text-[24px]">
                    {about.missionTitle}
                  </h3>
                </div>
                <p className="text-base leading-[1.85] text-body/90 max-md:text-[15px]">
                  {about.missionText}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Vision Card */}
          <Reveal direction="up" delay={0.25} viewTriggered={true} className="h-full">
            <div className="group relative flex h-full flex-col justify-between overflow-hidden rounded-xl border border-hairline/80 bg-surface/90 backdrop-blur-sm p-12 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/40 hover:shadow-xl active:scale-[0.98] active:border-accent/60 max-md:p-7">
              {/* Glowing Top Accent Line - Always subtly visible & pulsing on mobile */}
              <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-accent via-accent/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 max-md:opacity-90 max-md:animate-pulse" />
              
              {/* Background Watermark Number */}
              <div className="pointer-events-none absolute -bottom-6 -right-2 font-display text-[140px] font-extrabold leading-none text-accent/5 select-none transition-colors duration-300 group-hover:text-accent/10 max-md:text-[110px] max-md:opacity-80">
                02
              </div>

              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 rounded-full bg-accent/10 px-3.5 py-1 text-[11px] font-bold tracking-[2px] text-accent uppercase">
                      Our Aspiration
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/10 text-accent transition-transform duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-ivory max-md:ring-2 max-md:ring-accent/20">
                      <Compass className="h-5 w-5" />
                    </div>
                  </div>

                  <h3 className="mb-4 font-display text-[32px] font-semibold text-ink max-md:text-[24px]">
                    {about.visionTitle}
                  </h3>
                </div>
                <p className="text-base leading-[1.85] text-body/90 max-md:text-[15px]">
                  {about.visionText}
                </p>
              </div>
            </div>
          </Reveal>
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
            {about.processEyebrow}
            <DimensionLine className="text-accent" width={56} />
          </div>
          <h2 className="font-display text-[44px] font-semibold max-md:text-[32px]">
            {about.processHeading}
          </h2>
        </div>
        <div className="grid grid-cols-4 gap-9 max-lg:grid-cols-2 max-sm:grid-cols-1">
          {about.processSteps.map((step) => (
            <div key={step.number} className="px-2">
              <div className="mb-4 font-display text-[40px] text-accent">{step.number}</div>
              <h3 className="mb-3 text-lg font-bold">{step.title}</h3>
              <p className="text-sm leading-[1.8] text-body">{step.description}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
