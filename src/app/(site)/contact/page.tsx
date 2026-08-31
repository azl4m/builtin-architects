import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getContactPage, getSiteSettings } from "@/sanity/lib/fetchers";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContactPage();
  const seoTitle = contact.seo?.metaTitle || "Contact Us | BUILTIN Developers & Interiors";
  const seoDesc = contact.seo?.metaDescription || "Tell us about your project — reach BUILTIN Developers & Interiors in Calicut, Kerala and our team will get back within one business day.";
  const canonical = contact.seo?.canonicalUrl || "/contact";

  return {
    title: seoTitle,
    description: seoDesc,
    alternates: { canonical },
    openGraph: {
      title: contact.seo?.ogTitle || seoTitle,
      description: contact.seo?.ogDescription || seoDesc,
      images: contact.seo?.ogImage ? [{ url: contact.seo.ogImage.asset?.url || "" }] : [],
    },
    robots: contact.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function ContactPage() {
  const [contact, siteSettings] = await Promise.all([getContactPage(), getSiteSettings()]);

  const infoRows = [
    { label: "Office", value: siteSettings.contactOffice },
    { label: "Phone", value: siteSettings.contactPhone },
    { label: "Email", value: siteSettings.contactEmail },
    { label: "Hours", value: siteSettings.contactHours },
  ];

  return (
    <>
      <section id="site-hero" className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <SmartImage
          image={contact.heroImage}
          alt={contact.heroHeading}
          label="Site / building photo"
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
            {contact.heroEyebrow}
          </Reveal>
          <Reveal as="h1" delay={0.09} className="font-display text-[56px] font-semibold text-ivory max-md:text-[30px]">
            {contact.heroHeading}
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-[1fr_1.3fr] gap-20 px-16 py-[120px] max-lg:grid-cols-1 max-lg:gap-12 max-md:px-6 max-md:py-16">
        <div>
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {contact.introEyebrow}
          </div>
          <h2 className="mb-7 font-display text-[36px] font-semibold">{contact.introHeading}</h2>
          <p className="mb-10 text-[15px] leading-[1.85] text-body">{contact.introParagraph}</p>
          <div className="flex flex-col gap-7">
            {infoRows.map((row) => (
              <div key={row.label}>
                <div className="mb-1.5 text-xs font-bold tracking-[1.5px] text-accent uppercase">
                  {row.label}
                </div>
                <div className="text-[15px] text-copy-dark">{row.value}</div>
              </div>
            ))}
          </div>
        </div>

        <ContactForm />
      </section>

      <section className="mx-auto max-w-[1400px] px-16 pb-[120px] max-md:px-6 max-md:pb-16">
        <SmartImage
          image={contact.mapImage}
          alt="Map / location"
          label="Map / location image"
          className="h-[380px] w-full rounded-[2px]"
        />
      </section>
    </>
  );
}
