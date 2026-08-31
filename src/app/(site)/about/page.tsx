import type { Metadata } from "next";
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

      <section className="bg-alt px-16 py-[120px] max-md:px-6 max-md:py-16">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-[60px] max-md:grid-cols-1 max-md:gap-8">
          <div className="border border-hairline bg-surface p-12 max-md:p-8">
            <h3 className="mb-[18px] font-display text-[28px] font-semibold text-accent">
              {about.missionTitle}
            </h3>
            <p className="text-base leading-[1.85] text-body">{about.missionText}</p>
          </div>
          <div className="border border-hairline bg-surface p-12 max-md:p-8">
            <h3 className="mb-[18px] font-display text-[28px] font-semibold text-accent">
              {about.visionTitle}
            </h3>
            <p className="text-base leading-[1.85] text-body">{about.visionText}</p>
          </div>
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
