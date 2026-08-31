import type { Metadata } from "next";
import Link from "next/link";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";
import { getServices, getServicesPage } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interior design, interior contracting, and building construction — four disciplines coordinated from concept to completion by one accountable BUILTIN team.",
  alternates: { canonical: "/services" },
};

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3.5 border-b border-hairline pb-3.5 text-[15px] text-copy-dark last:border-b-0 last:pb-0">
      <span className="font-bold text-accent">—</span> {children}
    </div>
  );
}

const GHOST_COLORS = ["#dce3f2", "#c9d3ea", "#dce3f2", "#c9d3ea"];

export default async function ServicesPage() {
  const [servicesPage, services] = await Promise.all([getServicesPage(), getServices()]);

  return (
    <>
      <section id="site-hero" className="relative h-[56vh] min-h-[420px] overflow-hidden">
        <SmartImage
          image={servicesPage.heroImage}
          alt={servicesPage.heroHeading}
          label="Construction / drafting photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative z-[2] flex h-full max-w-[820px] flex-col justify-end px-16 pb-14 max-md:px-6 max-md:pb-8">
          <Reveal
            as="div"
            delay={0}
            className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-2 max-md:text-[11px] max-md:tracking-[2px]"
          >
            {servicesPage.heroEyebrow}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.09}
            className="mb-5 font-display text-[64px] leading-[1.05] font-semibold text-ivory max-lg:text-[48px] max-md:mb-2 max-md:text-[26px] max-md:leading-[1.2]"
          >
            {servicesPage.heroHeading}
          </Reveal>
          <Reveal
            as="p"
            delay={0.18}
            className="text-[17px] leading-[1.7] text-[#dce3f2] max-md:text-[13px] max-md:leading-[1.5]"
          >
            {servicesPage.heroSubcopy}
          </Reveal>
        </div>
      </section>

      <section className="relative z-[3] mx-auto -mt-16 max-w-[1400px] px-16 max-md:mt-0 max-md:px-6">
        <div className="grid grid-cols-4 gap-10 bg-ink px-14 py-12 text-ivory shadow-[0_30px_60px_rgba(10,20,40,0.25)] max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-8 max-md:px-8 max-md:py-8">
          {services.map((s, i) => (
            <Link
              key={s._id}
              href={`/services/${s.slug}`}
              className={`block hover:opacity-90 transition-opacity ${
                i < services.length - 1 ? "border-r border-hairline-dark pr-10 max-lg:border-r-0 max-lg:pr-0" : ""
              }`}
            >
              <div className="mb-1.5 font-display text-[28px] text-accent-light leading-tight">
                {s.numberLabel} — {s.title}
              </div>
              <div className="text-xs leading-[1.6] text-footer-muted">{s.statCaption}</div>
            </Link>
          ))}
        </div>
      </section>

      {services.map((service, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <section
            key={service._id}
            className={`${i % 2 === 1 ? "bg-alt" : ""} ${
              i === 0
                ? "pt-[160px] pb-[140px] max-md:pt-24 max-md:pb-20"
                : i === services.length - 1
                  ? "pt-[140px] pb-[160px] max-md:pt-20 max-md:pb-24"
                  : "py-[140px] max-md:py-20"
            } px-16 max-md:px-6`}
          >
            <div className="mx-auto grid max-w-[1400px] grid-cols-2 items-center gap-20 max-lg:grid-cols-1 max-lg:gap-12">
              <div className={imageFirst ? "order-2" : ""}>
                <div
                  className="-mb-7 font-display text-[96px] leading-none font-semibold max-md:text-6xl"
                  style={{ color: GHOST_COLORS[i % GHOST_COLORS.length] }}
                >
                  {service.numberLabel}
                </div>
                <h2 className="mb-6 font-display text-[42px] font-semibold max-md:text-[30px]">
                  {service.title}
                </h2>
                <p className="mb-7 text-base leading-[1.85] text-body">{service.fullDescription}</p>
                <div className="flex flex-col gap-4 mb-8">
                  {service.features.map((feature) => (
                    <FeatureRow key={feature}>{feature}</FeatureRow>
                  ))}
                </div>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-block border-b-2 border-accent pb-1 text-sm font-bold tracking-[1px] text-ink uppercase hover:text-accent transition-colors"
                >
                  View Details & Projects →
                </Link>
              </div>
              <div className={`group overflow-hidden rounded-[4px] ${imageFirst ? "order-1" : ""}`}>
                <SmartImage
                  image={service.image}
                  alt={service.title}
                  label={`${service.title} photo`}
                  className="h-[560px] w-full transition-transform duration-[600ms] ease-out group-hover:scale-[1.04]"
                />
              </div>
            </div>
          </section>
        );
      })}
    </>
  );
}
