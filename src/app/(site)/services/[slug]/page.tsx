import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SmartImage from "@/components/SmartImage";
import Reveal from "@/components/Reveal";
import FaqAccordion from "@/components/FaqAccordion";
import DimensionLine from "@/components/DimensionLine";
import { getServiceBySlug, getServiceSlugs, getProjects } from "@/sanity/lib/fetchers";
import { serviceJsonLd, faqPageJsonLd } from "@/lib/jsonld";

interface ServiceDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getServiceSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServiceDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return {};

  const seoTitle = service.seo?.metaTitle || `${service.title} | BUILTIN Developers & Interiors`;
  const seoDesc = service.seo?.metaDescription || service.shortDescription;
  const canonical = service.seo?.canonicalUrl || `/services/${service.slug}`;

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical },
    openGraph: {
      title: service.seo?.ogTitle || seoTitle,
      description: service.seo?.ogDescription || seoDesc,
      images: service.seo?.ogImage ? [{ url: service.seo.ogImage.asset?.url || "" }] : [],
    },
    robots: service.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ServiceDetailPage({ params }: ServiceDetailPageProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) notFound();

  // Fetch related projects
  const allProjects = await getProjects();
  
  // Clean related projects lookup
  const slugCategoryMap: Record<string, string> = {
    "architecture": "Architecture",
    "interior-design": "Interior Design",
    "interior-contracting": "Interior Contracting",
    "building-construction": "Building Construction",
  };
  
  const targetCategory = slugCategoryMap[service.slug];
  const related = allProjects.filter((p) => p.category === targetCategory).slice(0, 3);

  // Schema LDs
  const serviceLd = serviceJsonLd(service);
  const faqsLd = faqPageJsonLd(service.faqs || []);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd) }}
      />
      {faqsLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqsLd) }}
        />
      )}

      {/* Hero Section */}
      <section id="site-hero" className="relative h-[56vh] min-h-[420px] overflow-hidden">
        <SmartImage
          image={service.image}
          alt={service.title}
          label={`${service.title} featured image`}
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="absolute inset-0 z-30 flex max-w-[820px] flex-col justify-end px-16 pb-14 max-md:px-6 max-md:pb-8">
          <Reveal
            as="div"
            delay={0}
            className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-2 max-md:text-[11px] max-md:tracking-[2px]"
          >
            Service {service.numberLabel}
          </Reveal>
          <Reveal
            as="h1"
            delay={0.09}
            className="mb-5 font-display text-[56px] leading-[1.1] font-semibold text-ivory max-lg:text-[44px] max-md:mb-2 max-md:text-[28px]"
          >
            {service.heroTitle || service.title}
          </Reveal>
          <Reveal
            as="p"
            delay={0.18}
            className="text-[17px] leading-[1.7] text-[#dce3f2] max-md:text-[13px] max-md:leading-[1.5]"
          >
            {service.heroDescription || service.shortDescription}
          </Reveal>
        </div>
      </section>

      {/* Detailed Description and Capabilities */}
      <section className="mx-auto max-w-[1400px] px-16 py-20 max-md:px-6 max-md:py-14">
        <div className="grid grid-cols-[2fr_1fr] gap-20 max-lg:grid-cols-1 max-lg:gap-12">
          {/* Main Description */}
          <div>
            <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
              Overview
            </div>
            <h2 className="mb-6 font-display text-[34px] font-semibold max-md:text-[26px]">
              Coordinated Design & Execution
            </h2>
            <p className="text-base leading-[1.9] text-body mb-6">
              {service.serviceDescription || service.fullDescription}
            </p>
            <p className="text-base leading-[1.9] text-body">
              At BUILTIN, we avoid the standard fragmentation between separate design firms and construction contractors. By integrating our disciplines, we make sure that spacing systems, material specifications, and structural constraints are resolved under one accountable team.
            </p>
          </div>

          {/* Capabilities Grid */}
          <div className="border border-hairline bg-surface p-10 rounded-[4px] max-md:p-8">
            <h3 className="mb-6 font-display text-xl font-bold text-accent">Key Capabilities</h3>
            <ul className="flex flex-col gap-4">
              {(service.keyCapabilities?.length ? service.keyCapabilities : service.features).map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 border-b border-hairline pb-3.5 text-sm text-copy-dark last:border-b-0 last:pb-0"
                >
                  <span className="font-bold text-accent">—</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Carousel (Optional) */}
      {service.gallery && service.gallery.length > 0 && (
        <section className="bg-alt px-16 py-20 max-md:px-6 max-md:py-14">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-[18px] flex items-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
              Gallery
              <DimensionLine className="text-accent" />
            </div>
            <h2 className="mb-10 font-display text-[38px] font-semibold max-md:text-[28px]">
              Work Gallery
            </h2>
            <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {service.gallery.map((img, i) => (
                <div key={i} className="group overflow-hidden rounded-[4px] h-[340px]">
                  <SmartImage
                    image={img}
                    alt={`${service.title} gallery photo ${i + 1}`}
                    label="Service Photo"
                    className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Projects */}
      {related.length > 0 && (
        <section className={service.gallery?.length ? "" : "bg-alt" + " px-16 py-20 max-md:px-6 max-md:py-14"}>
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-[18px] flex items-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
              Portfolio
              <DimensionLine className="text-accent" />
            </div>
            <h2 className="mb-12 font-display text-[38px] font-semibold max-md:text-[28px]">
              Featured {service.title} Projects
            </h2>
            <div className="grid grid-cols-3 gap-8 max-lg:grid-cols-2 max-md:grid-cols-1">
              {related.map((p) => (
                <Link
                  href={`/projects/${p.slug}`}
                  key={p._id}
                  className="group block border border-hairline bg-surface overflow-hidden rounded-[4px]"
                >
                  <div className="relative h-[240px] overflow-hidden">
                    <SmartImage
                      image={p.heroImage}
                      alt={p.title}
                      label="Project photo"
                      className="h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-[11px] font-bold tracking-[1px] text-accent uppercase">
                      {p.location}
                    </span>
                    <h3 className="mt-2 font-display text-lg font-semibold text-ink group-hover:text-accent transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-muted line-clamp-2 leading-[1.6]">
                      {p.tagline}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Accordion FAQ Section */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="mx-auto max-w-[860px] px-16 py-20 max-md:px-6 max-md:py-14">
          <div className="mb-10 text-center">
            <div className="mb-[18px] flex items-center justify-center gap-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">
              <DimensionLine className="text-accent" width={32} />
              Frequently Asked Questions
              <DimensionLine className="text-accent" width={32} />
            </div>
            <h2 className="font-display text-[38px] font-semibold max-md:text-[28px]">
              Service FAQ
            </h2>
          </div>
          <FaqAccordion items={service.faqs} />
        </section>
      )}

      {/* Dynamic CTA */}
      <section className="bg-ink px-16 py-24 text-center text-ivory max-md:px-6 max-md:py-16 border-t border-hairline-dark">
        <div className="mx-auto max-w-[640px]">
          <h2 className="mb-6 font-display text-[44px] font-semibold leading-[1.15] max-md:text-[30px]">
            Ready to execute your vision?
          </h2>
          <p className="mb-10 text-sm leading-[1.8] text-footer-muted">
            Connect with our team in Calicut to discuss your architecture, interior, or construction project. We provide end-to-end supervision and honest craftsmanship.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-[2px] bg-accent-light px-8 py-4 text-sm font-bold tracking-[1.2px] text-ivory uppercase transition-colors hover:bg-ivory hover:text-ink"
          >
            Start a project discussion
          </Link>
        </div>
      </section>
    </>
  );
}
