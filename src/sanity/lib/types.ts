export interface SanityImageValue {
  asset?: { _ref: string; _type: "reference"; _id?: string; url?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export interface SeoSettings {
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: SanityImageValue | null;
  noIndex?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
  order?: number;
}

export interface SocialLink {
  platform: string;
  url: string;
}

export type ProjectStatus = "In Progress" | "Under Construction" | "Completed";
export type ProjectCategory =
  | "Architecture"
  | "Interior Design"
  | "Interior Contracting"
  | "Building Construction";

export interface CmsProject {
  _id: string;
  title: string;
  slug: string;
  cardTitle: string;
  client: string;
  area: string;
  year?: string;
  location: string;
  status: ProjectStatus;
  scope: string;
  category: ProjectCategory;
  cardMeta: string[];
  featured: boolean;
  heroImage: SanityImageValue | null;
  beforeImage: SanityImageValue | null;
  tagline: string;
  desc1: string;
  desc2: string;
  galleryImages: SanityImageValue[];
  videoUrl: string | null;
  videoPosterImage: SanityImageValue | null;
  services?: { _ref: string; _type: "reference" }[];
  features?: string[];
  seo?: SeoSettings;
  published?: boolean;
}

export interface CmsTestimonial {
  _id: string;
  quote: string;
  name: string;
  role: string;
}

export type ServiceIconKey =
  | "compass"
  | "pencil-ruler"
  | "sofa"
  | "palette"
  | "hammer"
  | "wrench"
  | "hard-hat"
  | "building";

export interface CmsService {
  _id: string;
  order: number;
  numberLabel: string;
  title: string;
  slug: string;
  icon: ServiceIconKey;
  shortDescription: string;
  fullDescription: string;
  serviceDescription?: string;
  statCaption: string;
  features: string[];
  keyCapabilities?: string[];
  process?: ProcessStep[];
  relatedProjects?: { _ref: string; _type: "reference" }[];
  faqs?: FaqItem[];
  image: SanityImageValue | null;
  gallery?: SanityImageValue[];
  seo?: SeoSettings;
  published?: boolean;
  heroTitle?: string;
  heroDescription?: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export interface CmsSiteSettings {
  logo: SanityImageValue | null;
  siteName: string;
  siteNameSub: string;
  businessName?: string;
  tagline: string;
  description: string;
  longDescription?: string;
  footerBlurb: string;
  contactOffice: string;
  contactCity: string;
  contactState?: string;
  contactCountry?: string;
  businessPark?: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
  yearsOfExperience?: number;
  socialLinks?: SocialLink[];
  defaultSeo?: SeoSettings;
  stats: StatItem[];
}

export interface CmsCtaBand {
  eyebrow: string;
  heading: string;
  buttonLabel: string;
}

export interface CmsMuxVideo {
  playbackId: string;
  status?: string;
}

export interface CmsHomePage {
  heroEyebrow: string;
  heroHeadline: string;
  heroSubcopy: string;
  heroImage: SanityImageValue | null;
  heroVideo: CmsMuxVideo | null;
  heroCtaLabel?: string;
  heroCtaLink?: string;
  heroCtaSecondaryLabel?: string;
  heroCtaSecondaryLink?: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutParagraphs: string[];
  aboutImage: SanityImageValue | null;
  servicesEyebrow: string;
  servicesHeading: string;
  featuredProjectsEyebrow: string;
  featuredProjectsHeading: string;
  testimonialsEyebrow: string;
  testimonialsHeading: string;
  clientLogos: SanityImageValue[];
  galleryEyebrow?: string;
  galleryHeading?: string;
  galleryImages?: SanityImageValue[];
  seo?: SeoSettings;
}

export interface CmsAboutPage {
  heroEyebrow: string;
  heroHeading: string;
  heroImage: SanityImageValue | null;
  storyEyebrow: string;
  storyHeading: string;
  storyParagraphs: string[];
  storyImage: SanityImageValue | null;
  missionTitle: string;
  missionText: string;
  visionTitle: string;
  visionText: string;
  processEyebrow: string;
  processHeading: string;
  processSteps: ProcessStep[];
  introduction?: string;
  experience?: string;
  capabilities?: string[];
  seo?: SeoSettings;
}

export interface CmsServicesPage {
  heroEyebrow: string;
  heroHeading: string;
  heroSubcopy: string;
  heroImage: SanityImageValue | null;
  seo?: SeoSettings;
}

export interface CmsProjectsPage {
  heroEyebrow: string;
  heroHeading: string;
  heroIntro: string;
  heroImage: SanityImageValue | null;
  seo?: SeoSettings;
}

export interface CmsContactPage {
  heroEyebrow: string;
  heroHeading: string;
  heroImage: SanityImageValue | null;
  introEyebrow: string;
  introHeading: string;
  introParagraph: string;
  mapImage: SanityImageValue | null;
  address?: string;
  phone?: string;
  email?: string;
  hours?: string;
  mapLocation?: string;
  cta?: string;
  seo?: SeoSettings;
}
