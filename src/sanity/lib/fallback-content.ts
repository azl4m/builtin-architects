import { CONTACT } from "@/lib/site";
import { PROJECTS, FEATURED_PROJECT_SLUG } from "@/lib/projects";
import type {
  CmsAboutPage,
  CmsContactPage,
  CmsCtaBand,
  CmsHomePage,
  CmsProject,
  CmsProjectsPage,
  CmsService,
  CmsServicesPage,
  CmsSiteSettings,
  CmsTestimonial,
} from "./types";

/**
 * Content shown before a Sanity project is connected (or if a query
 * returns nothing). Mirrors the original hardcoded copy from the design
 * handoff, reshaped into the same fields the CMS schema exposes — so
 * pages render identically either way.
 */

export const FALLBACK_SITE_SETTINGS: CmsSiteSettings = {
  logo: null,
  siteName: "BUILTIN",
  siteNameSub: "Developers & Interiors",
  tagline: "Build your dreams with us.",
  description:
    "BUILTIN Developers & Interiors is a Kerala-based architecture, interior design, and construction studio delivering projects from first sketch to final handover.",
  footerBlurb: "Architecture, Interior & Construction under one roof. Build your dreams with us.",
  contactOffice: CONTACT.office,
  contactCity: CONTACT.city,
  contactPhone: CONTACT.phone,
  contactEmail: CONTACT.email,
  contactHours: CONTACT.hours,
  stats: [
    { value: "12+", label: "Years of Practice" },
    { value: "140+", label: "Projects Delivered" },
    { value: "98%", label: "On-Time Handover" },
    { value: "4", label: "Cities Served" },
  ],
};

export const FALLBACK_CTA_BAND: CmsCtaBand = {
  eyebrow: "Ready To Begin",
  heading: "Let's build your dream project together",
  buttonLabel: "Start A Conversation",
};

export const FALLBACK_TESTIMONIALS: CmsTestimonial[] = [
  {
    _id: "fallback-testimonial-1",
    quote:
      "BUILTIN managed our entire build with real precision — the site work matched the drawings down to the last detail, delivered on schedule.",
    name: "Habeeb Rahman",
    role: "Chairman, Profile Group",
  },
  {
    _id: "fallback-testimonial-2",
    quote:
      "A rare team that respects design intent while executing with genuine technical precision on site.",
    name: "Salahudheen",
    role: "Architect, DCloud",
  },
  {
    _id: "fallback-testimonial-3",
    quote:
      "From consultation to final touches, the team was attentive and created a space that truly feels like home.",
    name: "Mansoor",
    role: "Educator",
  },
];

export const FALLBACK_SERVICES: CmsService[] = [
  {
    _id: "fallback-service-1",
    order: 1,
    numberLabel: "01",
    title: "Architectural Services",
    icon: "pencil-ruler",
    shortDescription:
      "Concept design, planning approvals, and detailed drawings that balance light, space, and function.",
    fullDescription:
      "From first sketch to sanctioned plan, we design residences, commercial spaces, and institutions that respond to site, climate, and how people actually move through a building.",
    statCaption: "Concept to sanctioned drawing",
    features: [
      "Concept & schematic design",
      "Statutory approvals & documentation",
      "Detailed working drawings",
      "Project management consultancy",
    ],
    image: null,
  },
  {
    _id: "fallback-service-2",
    order: 2,
    numberLabel: "02",
    title: "Interior Design",
    icon: "sofa",
    shortDescription:
      "Bespoke interiors and styling — from material palettes to custom furniture and lighting.",
    fullDescription:
      "We shape interiors around how a space will actually be used — material, light, and furniture chosen to work together, not just photograph well.",
    statCaption: "Space, material, and light",
    features: [
      "Space planning & layout",
      "Material & finish selection",
      "Custom furniture & lighting design",
      "Styling & final dressing",
    ],
    image: null,
  },
  {
    _id: "fallback-service-3",
    order: 3,
    numberLabel: "03",
    title: "Interior Contracting",
    icon: "hammer",
    shortDescription: "Turning approved interior designs into finished spaces — on-site, on schedule.",
    fullDescription:
      "Our contracting teams execute the interior design intent directly — carpentry, false ceilings, electrical and finishing work — with one point of accountability from drawing to handover.",
    statCaption: "Design executed on site",
    features: [
      "Carpentry & custom joinery",
      "False ceiling & electrical fit-out",
      "Painting & finishing work",
      "Single point of site accountability",
    ],
    image: null,
  },
  {
    _id: "fallback-service-4",
    order: 4,
    numberLabel: "04",
    title: "Building Construction",
    icon: "hard-hat",
    shortDescription: "End-to-end build execution with dedicated site management and quality control.",
    fullDescription:
      "Our site teams carry the design intent through to execution — with dedicated supervision, quality checks, and a schedule you can actually plan around.",
    statCaption: "Site execution & handover",
    features: [
      "Full-scale residential & commercial builds",
      "Site supervision & quality control",
      "Contractor & vendor coordination",
      "Timely handover",
    ],
    image: null,
  },
];

export const FALLBACK_HOME_PAGE: CmsHomePage = {
  heroEyebrow: "Architecture · Interior · Construction",
  heroHeadline: "Build Your Dreams With Us",
  heroSubcopy:
    "From first sketch to final handover — BUILTIN Developers & Interiors delivers thoughtful design and reliable execution across every stage of your build.",
  heroImage: null,
  heroVideo: null,
  aboutEyebrow: "At BUILTIN",
  aboutHeading: "Excellence, built into every foundation",
  aboutParagraphs: [
    "BUILTIN Developers & Interiors brings architecture, interior design, and construction under one roof, so every project moves from concept to completion without friction. We pair precise engineering with a considered eye for space, light, and material.",
    "Our teams manage design intent and site execution together — meaning fewer handoffs, tighter timelines, and a finished space that matches the drawing.",
  ],
  aboutImage: null,
  servicesEyebrow: "What We Do",
  servicesHeading: "Our Services",
  featuredProjectsEyebrow: "Selected Work",
  featuredProjectsHeading: "Featured Projects",
  testimonialsEyebrow: "Client Says",
  testimonialsHeading: "Testimonials",
  clientLogos: [],
};

export const FALLBACK_ABOUT_PAGE: CmsAboutPage = {
  heroEyebrow: "Who We Are",
  heroHeading: "About Us",
  heroImage: null,
  storyEyebrow: "Our Story",
  storyHeading: "Design and execution, under one roof",
  storyParagraphs: [
    "BUILTIN Developers & Interiors was founded on a simple premise: the best buildings happen when the people who design them also oversee how they're built. What began as a small architectural practice has grown into a full-service studio spanning architecture, interiors, and construction.",
    "Today, our teams take on residential, commercial, and institutional projects across Kerala — carrying every commission from the first concept sketch through to the final handover of keys.",
    "We believe good design should be lived in, not just looked at — and that reliable construction is what makes that possible.",
  ],
  storyImage: null,
  missionTitle: "Our Mission",
  missionText:
    "To deliver architecture, interiors, and construction with equal care — creating spaces that are precise in execution and honest in design, on time and on budget.",
  visionTitle: "Our Vision",
  visionText:
    "To be recognised as one of the region's most trusted names in integrated design-and-build — known for thoughtful spaces and dependable delivery.",
  processEyebrow: "How We Work",
  processHeading: "Our Process",
  processSteps: [
    {
      number: "01",
      title: "Consult",
      description: "We listen first — understanding site, budget, and how you'll actually live or work in the space.",
    },
    {
      number: "02",
      title: "Design",
      description: "Concept through detailed drawings, refined with you until every plan feels right.",
    },
    {
      number: "03",
      title: "Execute",
      description: "Our site teams build to the drawing, with regular reviews to keep quality and schedule on track.",
    },
    {
      number: "04",
      title: "Handover",
      description: "A finished space, walked through and handed over — ready to live in from day one.",
    },
  ],
};

export const FALLBACK_SERVICES_PAGE: CmsServicesPage = {
  heroEyebrow: "What We Do",
  heroHeading: "Three disciplines. One accountable team.",
  heroSubcopy:
    "Architecture, interior design, and construction — coordinated end to end so nothing gets lost between the drawing and the finished space.",
  heroImage: null,
};

export const FALLBACK_PROJECTS_PAGE: CmsProjectsPage = {
  heroEyebrow: "Selected Work",
  heroHeading: "Projects across Kerala",
  heroIntro: "Residences, interiors, and institutional builds — designed and delivered by BUILTIN.",
  heroImage: null,
};

export const FALLBACK_CONTACT_PAGE: CmsContactPage = {
  heroEyebrow: "Let's Talk",
  heroHeading: "Contact Us",
  heroImage: null,
  introEyebrow: "Get In Touch",
  introHeading: "Tell us about your project",
  introParagraph:
    "Whether it's a new home, an interior refresh, or a full-scale build — reach out and our team will get back within one business day.",
  mapImage: null,
};

export const FALLBACK_PROJECTS: CmsProject[] = PROJECTS.map((p) => ({
  _id: `fallback-${p.slug}`,
  title: p.title,
  slug: p.slug,
  cardTitle: p.cardTitle,
  client: p.client,
  area: p.area,
  location: p.location,
  status: p.status,
  scope: p.scope,
  category: p.category,
  cardMeta: p.cardMeta,
  featured: p.slug === FEATURED_PROJECT_SLUG,
  heroImage: null,
  beforeImage: null,
  tagline: p.tagline,
  desc1: p.desc1,
  desc2: p.desc2,
  galleryImages: [],
  videoUrl: null,
  videoPosterImage: null,
}));
