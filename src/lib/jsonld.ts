import { CONTACT, SITE_NAME, SITE_URL } from "@/lib/site";
import type { CmsProject } from "@/sanity/lib/types";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: SITE_NAME,
    url: SITE_URL,
    email: CONTACT.email,
    telephone: CONTACT.phone,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Calicut",
      addressRegion: "Kerala",
      addressCountry: "IN",
    },
    areaServed: "Kerala, India",
    sameAs: [],
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
