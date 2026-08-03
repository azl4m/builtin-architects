import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import { getServices, getServicesPage } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Architecture, interior design, and construction — three disciplines coordinated end to end by one accountable BUILTIN team, from concept to handover.",
  alternates: { canonical: "/services" },
};

function FeatureRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-baseline gap-3.5 border-b border-hairline pb-3.5 text-[15px] text-copy-dark last:border-b-0 last:pb-0">
      <span className="font-bold text-accent">—</span> {children}
    </div>
  );
}

const GHOST_COLORS = ["#e9ddc4", "#ddd0b2", "#e9ddc4"];

export default async function ServicesPage() {
  const [servicesPage, services] = await Promise.all([getServicesPage(), getServices()]);

  return (
    <>
      <section className="relative h-[56vh] min-h-[420px] overflow-hidden">
        <SmartImage
          image={servicesPage.heroImage}
          alt={servicesPage.heroHeading}
          label="Construction / drafting photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,18,16,0.25)_0%,rgba(20,18,16,0.65)_100%)]" />
        <div className="relative z-[2] flex h-full max-w-[820px] flex-col justify-center px-16 max-md:px-6">
          <div className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase">
            {servicesPage.heroEyebrow}
          </div>
          <h1 className="mb-5 font-serif text-[64px] leading-[1.05] font-semibold text-ivory max-lg:text-[48px] max-md:text-[36px]">
            {servicesPage.heroHeading}
          </h1>
          <p className="text-[17px] leading-[1.7] text-[#e7e1d6]">{servicesPage.heroSubcopy}</p>
        </div>
      </section>

      <section className="relative z-[3] mx-auto -mt-16 max-w-[1400px] px-16 max-md:px-6">
        <div className="grid grid-cols-3 gap-10 bg-ink px-14 py-12 text-ivory shadow-[0_30px_60px_rgba(20,18,16,0.25)] max-md:grid-cols-1 max-md:gap-8 max-md:px-8 max-md:py-8">
          {services.map((s, i) => (
            <div
              key={s._id}
              className={i < services.length - 1 ? "border-r border-[#3a362f] pr-10 max-md:border-r-0 max-md:pr-0" : ""}
            >
              <div className="mb-1.5 font-serif text-[34px] text-accent-light">
                {s.numberLabel} — {s.title}
              </div>
              <div className="text-sm leading-[1.6] text-footer-muted">{s.statCaption}</div>
            </div>
          ))}
        </div>
      </section>

      {services.map((service, i) => {
        const imageFirst = i % 2 === 1;
        return (
          <section
            key={service._id}
            className={`${i === 1 ? "bg-alt" : ""} ${
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
                  className="-mb-7 font-serif text-[96px] leading-none font-semibold max-md:text-6xl"
                  style={{ color: GHOST_COLORS[i % GHOST_COLORS.length] }}
                >
                  {service.numberLabel}
                </div>
                <h2 className="mb-6 font-serif text-[42px] font-semibold max-md:text-[30px]">
                  {service.title}
                </h2>
                <p className="mb-7 text-base leading-[1.85] text-body">{service.fullDescription}</p>
                <div className="flex flex-col gap-4">
                  {service.features.map((feature) => (
                    <FeatureRow key={feature}>{feature}</FeatureRow>
                  ))}
                </div>
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
