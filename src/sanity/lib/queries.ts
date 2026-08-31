import { groq } from "next-sanity";

const projectFields = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  "cardTitle": coalesce(cardTitle, title),
  client,
  area,
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
  videoPosterImage
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
    _id, order, numberLabel, title, icon, shortDescription, fullDescription, statCaption,
    "features": coalesce(features, []),
    image
  }
`;

export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  logo, siteName, siteNameSub, tagline, description, footerBlurb,
  contactOffice, contactCity, contactPhone, contactEmail, contactHours,
  "stats": coalesce(stats, [])
}`;

export const ctaBandQuery = groq`*[_type == "ctaBand"][0]{ eyebrow, heading, buttonLabel }`;

export const homePageQuery = groq`*[_type == "homePage"][0]{
  heroEyebrow, heroHeadline, heroSubcopy, heroImage,
  "heroVideo": heroVideo.asset->{ playbackId, status },
  aboutEyebrow, aboutHeading,
  "aboutParagraphs": coalesce(aboutParagraphs, []),
  aboutImage,
  servicesEyebrow, servicesHeading,
  featuredProjectsEyebrow, featuredProjectsHeading,
  testimonialsEyebrow, testimonialsHeading,
  "clientLogos": coalesce(clientLogos, [])
}`;

export const aboutPageQuery = groq`*[_type == "aboutPage"][0]{
  heroEyebrow, heroHeading, heroImage,
  storyEyebrow, storyHeading,
  "storyParagraphs": coalesce(storyParagraphs, []),
  storyImage,
  missionTitle, missionText, visionTitle, visionText,
  processEyebrow, processHeading,
  "processSteps": coalesce(processSteps, [])
}`;

export const servicesPageQuery = groq`*[_type == "servicesPage"][0]{
  heroEyebrow, heroHeading, heroSubcopy, heroImage
}`;

export const projectsPageQuery = groq`*[_type == "projectsPage"][0]{
  heroEyebrow, heroHeading, heroIntro, heroImage
}`;

export const contactPageQuery = groq`*[_type == "contactPage"][0]{
  heroEyebrow, heroHeading, heroImage,
  introEyebrow, introHeading, introParagraph,
  mapImage
}`;
