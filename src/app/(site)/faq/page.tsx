import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getServices, getSiteSettings, getFaqPage } from "@/sanity/lib/fetchers";
import FaqAccordion from "@/components/FaqAccordion";
import FaqAccordionProvider from "@/components/FaqAccordionProvider";
import type { FaqItem } from "@/sanity/lib/types";

const description = "Answers to common questions about architecture, interior design, interior contracting and construction: planning your project, budgets, timelines and getting started.";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getFaqPage();
  const title = page?.seo?.metaTitle || "Architecture, Interiors & Construction FAQs";
  const desc = page?.seo?.metaDescription || description;
  return {
    title: page?.seo?.metaTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: page?.seo?.canonicalUrl || "/faq" },
    openGraph: { title: page?.seo?.ogTitle || title, description: page?.seo?.ogDescription || desc, url: "/faq", type: "website" },
    robots: page?.seo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function FaqPage() {
  const [services, settings, page] = await Promise.all([getServices(), getSiteSettings(), getFaqPage()]);
  const general: FaqItem[] = [
    {
      question: "What services does BUILTIN offer?",
      answer: "BUILTIN brings architecture, interior design, interior contracting and building construction together. Explore our service pages to understand each discipline, then contact us to discuss the scope your project needs.",
    },
    {
      question: "Where is BUILTIN based, and can you take on my project?",
      answer: `Our listed location is ${settings.contactCity || "Calicut, Kerala"}. Share your project's actual location when you contact us so the team can confirm availability and whether the scope can be supported.`,
    },
    {
      question: "What should I prepare before the first conversation?",
      answer: "Share the project location, whether it is a new build or an existing space, your approximate area, budget range and preferred timeline. Site photographs, available drawings and a few reference images are useful if you have them; you can still get in touch if you are at an early stage.",
    },
    {
      question: "What is the difference between interior design and interior contracting?",
      answer: "Interior design develops the layout, materials, lighting and overall appearance of a space. Interior contracting turns approved designs into a finished interior through on-site execution. Discuss which stages you need so the scope and responsibilities are clear.",
    },
    {
      question: "How much will architecture, interiors or construction cost?",
      answer: "The estimate depends on the location, area, scope, site conditions, materials and level of finish. A useful starting point is your budget range and available drawings. Ask for a project-specific proposal that explains inclusions, exclusions and the basis of the estimate rather than relying on a single general rate.",
    },
    {
      question: "How long does a project take?",
      answer: "Timelines depend on the scale of work, design decisions, site readiness, required approvals and material availability. Share your preferred completion date early. Confirm a project-specific schedule and milestones with the team before work begins.",
    },
    {
      question: "Can I see examples of your completed work?",
      answer: "Visit our Projects page to explore published work and the project details provided by the team. Look for examples relevant to your type of space and the services you need, and mention those projects when you enquire.",
    },
  ];
  const generalItems = (page?.faqs ?? general).filter((item) => item.question?.trim() && item.answer?.trim());
  const serviceGroups = (page?.includeServiceFaqs === false ? [] : services).map((service) => ({
    service,
    items: (service.faqs || []).filter((item) => item.question?.trim() && item.answer?.trim()),
  })).filter((group) => group.items.length > 0);

  return (
    <FaqAccordionProvider>
      <section id="site-hero" className="border-b border-hairline bg-alt px-6 pt-36 pb-14 md:px-16 md:pt-44 md:pb-20">
        <div className="mx-auto max-w-[1200px]">
          <p className="mb-5 text-xs font-semibold tracking-[3px] text-accent uppercase">{page?.heroEyebrow || "A little clarity before you begin"}</p>
          <h1 className="max-w-[800px] text-balance font-display text-4xl leading-[1.15] font-semibold text-ink md:text-6xl">{page?.heroHeading || "Your questions, answered."}</h1>
          <p className="mt-6 max-w-[600px] text-base leading-7 text-body md:text-lg">{page?.heroDescription || "Practical answers about planning, designing and building your space. Start here, then tell us what you have in mind."}</p>
          <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-3">
            {generalItems.length > 0 && <Link href="#getting-started" className="rounded-full border border-hairline bg-ivory px-4 py-2.5 text-sm font-semibold hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{page?.generalHeading || "Getting started"}</Link>}
            {serviceGroups.map(({ service }, index) => (
              <Link key={service._id} href={`#service-faq-${index}`} className="rounded-full border border-hairline bg-ivory px-4 py-2.5 text-sm font-semibold hover:border-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">{service.title}</Link>
            ))}
          </nav>
        </div>
      </section>

      <div className="mx-auto max-w-[1200px] px-6 py-14 md:px-16 md:py-20">
        {generalItems.length > 0 && <section id="getting-started" aria-labelledby="getting-started-heading" className="scroll-mt-28 grid gap-6 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div>
            <p className="mb-3 text-xs font-semibold tracking-[2px] text-accent uppercase">01 / The essentials</p>
            <h2 id="getting-started-heading" className="font-display text-2xl font-semibold md:text-3xl">{page?.generalHeading || "Getting started"}</h2>
            <p className="mt-4 text-sm leading-7 text-body">{page?.generalDescription || "From the first conversation to a clearer project brief."}</p>
          </div>
          <FaqAccordion items={generalItems} />
        </section>}

        {serviceGroups.map(({ service, items }, index) => (
          <section key={service._id} id={`service-faq-${index}`} aria-labelledby={`service-heading-${index}`} className="mt-14 scroll-mt-28 grid gap-6 lg:mt-20 lg:grid-cols-[1fr_2fr] lg:gap-16">
            <div>
              <p className="mb-3 text-xs font-semibold tracking-[2px] text-accent uppercase">{String(index + 2).padStart(2, "0")} / Your space</p>
              <h2 id={`service-heading-${index}`} className="font-display text-2xl font-semibold md:text-3xl">{service.title}</h2>
              <Link href={`/services/${service.slug}`} className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent">Explore this service <ArrowRight aria-hidden="true" size={16} /></Link>
            </div>
            <FaqAccordion items={items} />
          </section>
        ))}

        <section className="mt-14 rounded-lg bg-ink px-6 py-9 text-ivory md:mt-20 md:px-10 md:py-12">
          <h2 className="font-display text-2xl font-semibold md:text-3xl">{page?.ctaHeading || "Have a question about your own project?"}</h2>
          <p className="mt-3 max-w-[600px] text-sm leading-7 text-white/80">{page?.ctaDescription || "Tell us about your location, space and priorities. We can discuss the next step together."}</p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link href="/contact" className="inline-flex min-h-12 items-center gap-3 rounded-sm bg-ivory px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-accent-light focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">{page?.ctaLabel || "Start a conversation"} <ArrowRight aria-hidden="true" size={17} /></Link>
            <Link href="/projects" className="inline-flex min-h-12 items-center px-4 text-sm font-semibold underline underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">Explore our projects</Link>
          </div>
        </section>
      </div>
    </FaqAccordionProvider>
  );
}
