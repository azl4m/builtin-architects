export interface SanityImageValue {
  asset?: { _ref: string; _type: "reference"; _id?: string; url?: string };
  hotspot?: { x: number; y: number; height: number; width: number };
  crop?: { top: number; bottom: number; left: number; right: number };
  alt?: string;
}

export type ProjectStatus = "In Progress" | "Under Construction" | "Completed";
export type ProjectCategory = "Architecture" | "Interior" | "Construction";

export interface CmsProject {
  _id: string;
  title: string;
  slug: string;
  cardTitle: string;
  client: string;
  area: string;
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
  icon: ServiceIconKey;
  shortDescription: string;
  fullDescription: string;
  statCaption: string;
  features: string[];
  image: SanityImageValue | null;
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
  tagline: string;
  description: string;
  footerBlurb: string;
  contactOffice: string;
  contactCity: string;
  contactPhone: string;
  contactEmail: string;
  contactHours: string;
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
}

export interface CmsServicesPage {
  heroEyebrow: string;
  heroHeading: string;
  heroSubcopy: string;
  heroImage: SanityImageValue | null;
}

export interface CmsProjectsPage {
  heroEyebrow: string;
  heroHeading: string;
  heroIntro: string;
  heroImage: SanityImageValue | null;
}

export interface CmsContactPage {
  heroEyebrow: string;
  heroHeading: string;
  heroImage: SanityImageValue | null;
  introEyebrow: string;
  introHeading: string;
  introParagraph: string;
  mapImage: SanityImageValue | null;
}
