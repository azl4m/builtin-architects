import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import type { CmsProject, CmsService, CmsSiteSettings, FaqItem } from "@/sanity/lib/types";

export function organizationJsonLd(settings?: CmsSiteSettings) {
  const name = settings?.businessName || settings?.siteName || SITE_NAME;
  const email = settings?.contactEmail || CONTACT.email;
  const telephone = settings?.contactPhone || CONTACT.phone;
  const addressLocality = settings?.contactCity || "Calicut";
  const addressRegion = settings?.contactState || "Kerala";
  const addressCountry = settings?.contactCountry || "IN";
  const streetAddress = settings?.contactOffice || CONTACT.office;

  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name,
    url: SITE_URL,
    email,
    telephone,
    address: {
      "@type": "PostalAddress",
      streetAddress,
      addressLocality,
      addressRegion,
      addressCountry,
    },
    areaServed: "Kerala, India",
    sameAs: settings?.socialLinks?.map((l) => l.url) || [],
  };
}

export function projectJsonLd(project: CmsProject) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    about: project.scope,
    creator: {
      "@type": "Organization",
      name: SITE_NAME,
    },
    locationCreated: {
      "@type": "Place",
      name: project.location,
    },
  };
}

export function serviceJsonLd(service: CmsService) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.shortDescription,
    provider: {
      "@type": "GeneralContractor",
      name: SITE_NAME,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Kerala, India",
    },
  };
}

export function faqPageJsonLd(faqs: FaqItem[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

