import { groq } from "next-sanity";

const projectFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  "cardTitle": coalesce(cardTitle, title),
  client,
  area,
  year,
  location,
  status,
  scope,
  category,
  "cardMeta": coalesce(cardMeta, []),
  featured,
  heroImage,
  beforeImage,
  tagline,
  desc1,
  desc2,
  "galleryImages": coalesce(galleryImages, []),
  videoUrl,
  videoPosterImage,
  services[]->{ _id, title, "slug": slug.current },
  "features": coalesce(features, []),
  seo,
  published
`;

export const allProjectsQuery = groq`*[_type == "project"] | order(order asc, _createdAt asc) { ${projectFields} }`;

export const projectBySlugQuery = groq`*[_type == "project" && slug.current == $slug][0] { ${projectFields} }`;

export const allProjectSlugsQuery = groq`*[_type == "project" && defined(slug.current)].slug.current`;

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(order asc, _createdAt asc) {
    _id, quote, name, role
  }
`;

export const allServicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id, order, numberLabel, title, "slug": slug.current, icon, shortDescription, fullDescription,
    heroTitle, heroDescription, serviceDescription, statCaption,
    "features": coalesce(features, []),
    "keyCapabilities": coalesce(keyCapabilities, []),
    "process": coalesce(process, []),
    relatedProjects[]->{ _id, title, "slug": slug.current },
    "faqs": coalesce(faqs, []),
    image,
    "gallery": coalesce(gallery, []),
    seo,
    published
  }
`;

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id, order, numberLabel, title, "slug": slug.current, icon, shortDescription, fullDescription,
    heroTitle, heroDescription, serviceDescription, statCaption,
    "features": coalesce(features, []),
    "keyCapabilities": coalesce(keyCapabilities, []),
    "process": coalesce(process, []),
    relatedProjects[]->{ _id, title, "slug": slug.current },
    "faqs": coalesce(faqs, []),
    image,
    "gallery": coalesce(gallery, []),
    seo,
    published
  }
`;

export const allServiceSlugsQuery = groq`*[_type == "service" && defined(slug.current)].slug.current`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  logo, siteName, siteNameSub, businessName, tagline, description, longDescription, footerBlurb,
  contactOffice, contactCity, contactState, contactCountry, businessPark, contactPhone, contactEmail, contactHours,
  yearsOfExperience, "socialLinks": coalesce(socialLinks, []), defaultSeo,
  "stats": coalesce(stats, [])
}`;

export const ctaBandQuery = groq`*[_type == "ctaBand"][0]{ eyebrow, heading, buttonLabel }`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroEyebrow, heroHeadline, heroSubcopy, heroImage,
  "heroVideo": heroVideo.asset->{ playbackId, status },
  heroCtaLabel, heroCtaLink, heroCtaSecondaryLabel, heroCtaSecondaryLink,
  aboutEyebrow, aboutHeading,
  "aboutParagraphs": coalesce(aboutParagraphs, []),
  aboutImage,
  servicesEyebrow, servicesHeading,
  featuredProjectsEyebrow, featuredProjectsHeading,
  galleryEyebrow, galleryHeading,
  "galleryImages": coalesce(galleryImages, []),
  testimonialsEyebrow, testimonialsHeading,
  "clientLogos": coalesce(clientLogos, []),
  seo
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroEyebrow, heroHeading, heroImage,
  storyEyebrow, storyHeading,
  "storyParagraphs": coalesce(storyParagraphs, []),
  storyImage,
  missionTitle, missionText, visionTitle, visionText,
  processEyebrow, processHeading,
  "processSteps": coalesce(processSteps, []),
  introduction, experience, "capabilities": coalesce(capabilities, []), seo
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  heroEyebrow, heroHeading, heroSubcopy, heroImage, seo
}`;

export const projectsPageQuery = groq`*[_type == "projectsPage"][0]{
  heroEyebrow, heroHeading, heroIntro, heroImage, seo
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heroEyebrow, heroHeading, heroImage,
  introEyebrow, introHeading, introParagraph,
  mapImage, address, phone, email, hours, mapLocation, cta, seo
}`;
