import type { Metadata } from "next";
import SmartImage from "@/components/SmartImage";
import ContactForm from "@/components/ContactForm";
import { getContactPage, getSiteSettings } from "@/sanity/lib/fetchers";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Tell us about your project — reach BUILTIN Developers & Interiors in Calicut, Kerala and our team will get back within one business day.",
  alternates: { canonical: "/contact" },
};

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
      <section className="relative h-[40vh] min-h-[300px] overflow-hidden">
        <SmartImage
          image={contact.heroImage}
          alt={contact.heroHeading}
          label="Site / building photo"
          className="absolute inset-0 h-full w-full"
          priority
        />
        <div className="absolute inset-0 bg-[rgba(20,18,16,0.5)]" />
        <div className="relative z-[2] flex h-full flex-col justify-center px-16 max-md:px-6">
          <div className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase">
            {contact.heroEyebrow}
          </div>
          <h1 className="font-serif text-[56px] font-semibold text-ivory max-md:text-[40px]">
            {contact.heroHeading}
          </h1>
        </div>
      </section>

      <section className="mx-auto grid max-w-[1400px] grid-cols-[1fr_1.3fr] gap-20 px-16 py-[120px] max-lg:grid-cols-1 max-lg:gap-12 max-md:px-6 max-md:py-16">
        <div>
          <div className="mb-[18px] text-[13px] font-semibold tracking-[4px] text-accent uppercase">
            {contact.introEyebrow}
          </div>
          <h2 className="mb-7 font-serif text-[36px] font-semibold">{contact.introHeading}</h2>
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
