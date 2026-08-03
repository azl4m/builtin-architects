/**
 * Pushes the current fallback copy (the original design-handoff content)
 * into Sanity as a starting point, so the Studio isn't empty on day one.
 * Safe to re-run — every document uses a fixed _id and createOrReplace.
 *
 * Usage: npm run seed
 * Requires (in .env.local): NEXT_PUBLIC_SANITY_PROJECT_ID,
 * NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_WRITE_TOKEN
 * (create one at https://www.sanity.io/manage → API → Tokens, "Editor" role).
 */

try {
  process.loadEnvFile(".env.local");
} catch {
  // no .env.local — fall through to whatever is already in process.env
}

import { createClient } from "@sanity/client";
import { PROJECTS, FEATURED_PROJECT_SLUG } from "../src/lib/projects";
import { CONTACT, SITE_NAME, SITE_TAGLINE } from "../src/lib/site";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN.\n" +
      "Run `npx sanity login` + `npx sanity init` first, then add a write token to .env.local."
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function seed() {
  const docs = [
    {
      _id: "siteSettings",
      _type: "siteSettings",
      siteName: SITE_NAME,
      siteNameSub: "Developers & Interiors",
      tagline: SITE_TAGLINE,
      description:
        "BUILTIN Developers & Interiors is a Kerala-based architecture, interior design, and construction studio delivering projects from first sketch to final handover.",
      footerBlurb: "Architecture, Interior & Construction under one roof. Build your dreams with us.",
      contactOffice: CONTACT.office,
      contactCity: CONTACT.city,
      contactPhone: CONTACT.phone,
      contactEmail: CONTACT.email,
      contactHours: CONTACT.hours,
      stats: [
        { _type: "statItem", value: "12+", label: "Years of Practice" },
        { _type: "statItem", value: "140+", label: "Projects Delivered" },
        { _type: "statItem", value: "98%", label: "On-Time Handover" },
        { _type: "statItem", value: "4", label: "Cities Served" },
      ],
    },
    {
      _id: "ctaBand",
      _type: "ctaBand",
      eyebrow: "Ready To Begin",
      heading: "Let's build your dream project together",
      buttonLabel: "Start A Conversation",
    },
    {
      _id: "homePage",
      _type: "homePage",
      heroEyebrow: "Architecture · Interior · Construction",
      heroHeadline: "Build Your Dreams With Us",
      heroSubcopy:
        "From first sketch to final handover — BUILTIN Developers & Interiors delivers thoughtful design and reliable execution across every stage of your build.",
      aboutEyebrow: "At BUILTIN",
      aboutHeading: "Excellence, built into every foundation",
      aboutParagraphs: [
        "BUILTIN Developers & Interiors brings architecture, interior design, and construction under one roof, so every project moves from concept to completion without friction. We pair precise engineering with a considered eye for space, light, and material.",
        "Our teams manage design intent and site execution together — meaning fewer handoffs, tighter timelines, and a finished space that matches the drawing.",
      ],
      servicesEyebrow: "What We Do",
      servicesHeading: "Our Services",
      featuredProjectsEyebrow: "Selected Work",
      featuredProjectsHeading: "Featured Projects",
      testimonialsEyebrow: "Client Says",
      testimonialsHeading: "Testimonials",
    },
    {
      _id: "aboutPage",
      _type: "aboutPage",
      heroEyebrow: "Who We Are",
      heroHeading: "About Us",
      storyEyebrow: "Our Story",
      storyHeading: "Design and execution, under one roof",
      storyParagraphs: [
        "BUILTIN Developers & Interiors was founded on a simple premise: the best buildings happen when the people who design them also oversee how they're built. What began as a small architectural practice has grown into a full-service studio spanning architecture, interiors, and construction.",
        "Today, our teams take on residential, commercial, and institutional projects across Kerala — carrying every commission from the first concept sketch through to the final handover of keys.",
        "We believe good design should be lived in, not just looked at — and that reliable construction is what makes that possible.",
      ],
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
          _type: "processStep",
          _key: "step-1",
          number: "01",
          title: "Consult",
          description: "We listen first — understanding site, budget, and how you'll actually live or work in the space.",
        },
        {
          _type: "processStep",
          _key: "step-2",
          number: "02",
          title: "Design",
          description: "Concept through detailed drawings, refined with you until every plan feels right.",
        },
        {
          _type: "processStep",
          _key: "step-3",
          number: "03",
          title: "Execute",
          description: "Our site teams build to the drawing, with regular reviews to keep quality and schedule on track.",
        },
        {
          _type: "processStep",
          _key: "step-4",
          number: "04",
          title: "Handover",
          description: "A finished space, walked through and handed over — ready to live in from day one.",
        },
      ],
    },
    {
      _id: "servicesPage",
      _type: "servicesPage",
      heroEyebrow: "What We Do",
      heroHeading: "Three disciplines. One accountable team.",
      heroSubcopy:
        "Architecture, interior design, and construction — coordinated end to end so nothing gets lost between the drawing and the finished space.",
    },
    {
      _id: "projectsPage",
      _type: "projectsPage",
      heroEyebrow: "Selected Work",
      heroHeading: "Projects across Kerala",
      heroIntro: "Residences, interiors, and institutional builds — designed and delivered by BUILTIN.",
    },
    {
      _id: "contactPage",
      _type: "contactPage",
      heroEyebrow: "Let's Talk",
      heroHeading: "Contact Us",
      introEyebrow: "Get In Touch",
      introHeading: "Tell us about your project",
      introParagraph:
        "Whether it's a new home, an interior refresh, or a full-scale build — reach out and our team will get back within one business day.",
    },
    {
      _id: "service-architecture",
      _type: "service",
      order: 1,
      numberLabel: "01",
      title: "Architecture",
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
    },
    {
      _id: "service-interior",
      _type: "service",
      order: 2,
      numberLabel: "02",
      title: "Interior",
      shortDescription: "Bespoke interiors and styling — from material palettes to custom furniture and lighting.",
      fullDescription:
        "We shape interiors around how a space will actually be used — material, light, and furniture chosen to work together, not just photograph well.",
      statCaption: "Space, material, and light",
      features: [
        "Space planning & layout",
        "Material & finish selection",
        "Custom furniture & lighting design",
        "Styling & final dressing",
      ],
    },
    {
      _id: "service-construction",
      _type: "service",
      order: 3,
      numberLabel: "03",
      title: "Construction",
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
    },
    {
      _id: "testimonial-1",
      _type: "testimonial",
      order: 1,
      quote:
        "BUILTIN managed our entire build with real precision — the site work matched the drawings down to the last detail, delivered on schedule.",
      name: "Habeeb Rahman",
      role: "Chairman, Profile Group",
    },
    {
      _id: "testimonial-2",
      _type: "testimonial",
      order: 2,
      quote: "A rare team that respects design intent while executing with genuine technical precision on site.",
      name: "Salahudheen",
      role: "Architect, DCloud",
    },
    {
      _id: "testimonial-3",
      _type: "testimonial",
      order: 3,
      quote:
        "From consultation to final touches, the team was attentive and created a space that truly feels like home.",
      name: "Mansoor",
      role: "Educator",
    },
    ...PROJECTS.map((p, i) => ({
      _id: `project-${p.slug}`,
      _type: "project",
      order: i + 1,
      title: p.title,
      slug: { _type: "slug", current: p.slug },
      cardTitle: p.cardTitle,
      client: p.client,
      area: p.area,
      location: p.location,
      status: p.status,
      scope: p.scope,
      category: p.category,
      cardMeta: p.cardMeta,
      featured: p.slug === FEATURED_PROJECT_SLUG,
      tagline: p.tagline,
      desc1: p.desc1,
      desc2: p.desc2,
    })),
  ];

  const transaction = client.transaction();
  for (const doc of docs) {
    transaction.createOrReplace(doc as never);
  }
  await transaction.commit();

  console.log(`Seeded ${docs.length} documents into dataset "${dataset}".`);
  console.log("Open /studio, add images to heroes/galleries, then publish.");
}

seed().catch((error) => {
  console.error("Seed failed:", error);
  process.exit(1);
});
