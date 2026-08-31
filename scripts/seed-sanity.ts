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
      heroEyebrow: "Architecture · Interior · Contracting · Construction",
      heroHeadline: "Four disciplines. One accountable team.",
      heroSubcopy:
        "Architecture, interior design, interior contracting, and construction — coordinated from concept to completion so nothing gets lost between the drawing and the finished space.",
      heroCtaLabel: "View Projects",
      heroCtaLink: "/projects",
      heroCtaSecondaryLabel: "Get In Touch",
      heroCtaSecondaryLink: "/contact",
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
      heroHeading: "Four disciplines. One accountable team.",
      heroSubcopy:
        "Architecture, interior design, interior contracting, and construction — coordinated from concept to completion so nothing gets lost between the drawing and the finished space.",
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
      title: "Architectural Services",
      slug: { _type: "slug", current: "architecture" },
      icon: "pencil-ruler",
      shortDescription:
        "Concept design, planning approvals, and detailed drawings that balance light, space, and function.",
      fullDescription:
        "From first sketch to sanctioned plan, we design residences, commercial spaces, and institutions that respond to site, climate, and how people actually move through a building.",
      serviceDescription:
        "We design custom spaces that respond to our region's distinct climate, site topography, and the specific ways people move through them. By bringing architecture and execution under one accountable team, we ensure your building is both structurally sound and true to the original design intent.",
      statCaption: "Concept to sanctioned drawing",
      features: [
        "Concept & schematic design",
        "Statutory approvals & documentation",
        "Detailed working drawings",
        "Project management consultancy",
      ],
      keyCapabilities: [
        "Concept & schematic design",
        "Statutory approvals & documentation",
        "Detailed working drawings",
        "Project management consultancy",
      ],
      heroTitle: "Architecture Firm in Calicut",
      heroDescription: "Concept design, planning approvals, and detailed drawings that balance light, space, and function.",
      faqs: [
        {
          _key: "faq-1",
          question: "What does an architecture firm in Calicut handle?",
          answer: "An architecture firm like BUILTIN handles everything from initial concept layouts, schematic designs, and statutory building approval drawings to detailed structural, plumbing, electrical, and site working drawings.",
          order: 1,
        },
        {
          _key: "faq-2",
          question: "Does BUILTIN provide residential architectural services?",
          answer: "Yes, we specialize in residential architecture in Calicut, designing custom family homes, villas, and multi-generational residences tailored to your lifestyle and site context.",
          order: 2,
        },
        {
          _key: "faq-3",
          question: "Does BUILTIN work on commercial architecture projects?",
          answer: "Yes, we design commercial architecture projects, including retail spaces, corporate offices, and institutional buildings across Calicut and Kozhikode.",
          order: 3,
        },
        {
          _key: "faq-4",
          question: "How does the architectural design process work?",
          answer: "Our process starts with a consultation to understand your requirements, followed by concept layouts, 3D visualizations, detailed drawing development, and coordination with engineering and contracting teams for seamless execution.",
          order: 4,
        },
        {
          _key: "faq-5",
          question: "Where does BUILTIN provide architectural services?",
          answer: "BUILTIN primarily provides architectural services in Calicut (Kozhikode) and surrounding regions across Kerala, India.",
          order: 5,
        },
      ],
    },
    {
      _id: "service-interior-design",
      _type: "service",
      order: 2,
      numberLabel: "02",
      title: "Interior Design",
      slug: { _type: "slug", current: "interior-design" },
      icon: "sofa",
      shortDescription:
        "Bespoke interiors and styling — from material palettes to custom furniture and lighting.",
      fullDescription:
        "We shape interiors around how a space will actually be used — material, light, and furniture chosen to work together, not just photograph well.",
      serviceDescription:
        "We believe that premium interior design should be functional first. Our design team shapes spaces around how your family or business lives, choosing materials, lighting, custom furniture, and textures that wear well and look harmonized.",
      statCaption: "Space, material, and light",
      features: [
        "Space planning & layout",
        "Material & finish selection",
        "Custom furniture & lighting design",
        "Styling & final dressing",
      ],
      keyCapabilities: [
        "Space planning & layout",
        "Material & finish selection",
        "Custom furniture & lighting design",
        "Styling & final dressing",
      ],
      heroTitle: "Interior Design in Calicut",
      heroDescription: "Bespoke interiors and styling — from material palettes to custom furniture and lighting.",
      faqs: [
        {
          _key: "faq-1",
          question: "What types of interior design projects does BUILTIN handle?",
          answer: "We handle a wide range of interior design projects, including custom residential interiors, modern kitchens, commercial spaces, and office fit-outs in Calicut.",
          order: 1,
        },
        {
          _key: "faq-2",
          question: "Do you provide residential interior design?",
          answer: "Yes, we offer complete residential interior design services covering living rooms, bedrooms, kitchens, and personalized styling.",
          order: 2,
        },
        {
          _key: "faq-3",
          question: "Do you provide commercial interior design?",
          answer: "Yes, we design functional and brand-focused commercial interiors for shops, offices, and business spaces.",
          order: 3,
        },
        {
          _key: "faq-4",
          question: "Do you provide interior design and execution together?",
          answer: "Yes, we bring interior design and interior contracting together under one roof, ensuring the final built space matches the design intent perfectly.",
          order: 4,
        },
        {
          _key: "faq-5",
          question: "How does the interior design process work?",
          answer: "We start with space planning, followed by material and finish selection, custom furniture drafting, and styling before transitioning to on-site execution.",
          order: 5,
        },
      ],
    },
    {
      _id: "service-interior-contracting",
      _type: "service",
      order: 3,
      numberLabel: "03",
      title: "Interior Contracting",
      slug: { _type: "slug", current: "interior-contracting" },
      icon: "hammer",
      shortDescription: "Turning approved interior designs into finished spaces — on-site, on schedule.",
      fullDescription:
        "Our contracting teams execute the interior design intent directly — carpentry, false ceilings, electrical and finishing work — with one point of accountability from drawing to handover.",
      serviceDescription:
        "Unlike pure designers, our interior contracting service gives you complete site execution capabilities. Our experienced carpenters, technicians, and supervisors bring drawings to life with one single point of accountability.",
      statCaption: "Design executed on site",
      features: [
        "Carpentry & custom joinery",
        "False ceiling & electrical fit-out",
        "Painting & finishing work",
        "Single point of site accountability",
      ],
      keyCapabilities: [
        "Carpentry & custom joinery",
        "False ceiling & electrical fit-out",
        "Painting & finishing work",
        "Single point of site accountability",
      ],
      heroTitle: "Interior Contractor in Calicut",
      heroDescription: "Turning approved interior designs into finished spaces — on-site, on schedule.",
      faqs: [
        {
          _key: "faq-1",
          question: "What does interior contracting include?",
          answer: "Interior contracting covers the complete execution phase of an interior design, including custom carpentry, false ceilings, electrical wiring, plumbing fixtures, tiling, and painting.",
          order: 1,
        },
        {
          _key: "faq-2",
          question: "Do you handle interior execution?",
          answer: "Yes, we have dedicated in-house execution teams who build exactly to the approved drawings, ensuring strict quality control.",
          order: 2,
        },
        {
          _key: "faq-3",
          question: "Do you provide residential interior contracting?",
          answer: "Yes, we undertake complete residential interior execution, transforming empty rooms into fully finished living spaces.",
          order: 3,
        },
        {
          _key: "faq-4",
          question: "Do you undertake commercial interior projects?",
          answer: "Yes, we handle commercial interior contracting and corporate fit-outs, delivering projects on tight timelines for immediate occupancy.",
          order: 4,
        },
      ],
    },
    {
      _id: "service-building-construction",
      _type: "service",
      order: 4,
      numberLabel: "04",
      title: "Building Construction",
      slug: { _type: "slug", current: "building-construction" },
      icon: "hard-hat",
      shortDescription: "End-to-end build execution with dedicated site management and quality control.",
      fullDescription:
        "Our site teams carry the design intent through to execution — with dedicated supervision, quality checks, and a schedule you can actually plan around.",
      serviceDescription:
        "We provide end-to-end building construction, managing site preparation, concrete works, brickwork, plastering, structural works, and finishing details. We operate with strict scheduling and regular quality inspections.",
      statCaption: "Site execution & handover",
      features: [
        "Full-scale residential & commercial builds",
        "Site supervision & quality control",
        "Contractor & vendor coordination",
        "Timely handover",
      ],
      keyCapabilities: [
        "Full-scale residential & commercial builds",
        "Site supervision & quality control",
        "Contractor & vendor coordination",
        "Timely handover",
      ],
      heroTitle: "Building Construction Company in Calicut",
      heroDescription: "End-to-end build execution with dedicated site management and quality control.",
      faqs: [
        {
          _key: "faq-1",
          question: "What types of building construction projects does BUILTIN undertake?",
          answer: "BUILTIN undertakes building construction projects ranging from custom luxury houses and residential villas to commercial structures and institutional campus buildings in Calicut.",
          order: 1,
        },
        {
          _key: "faq-2",
          question: "Do you provide residential construction services?",
          answer: "Yes, we offer end-to-end residential building construction services, managing everything from foundation work to final structural handover.",
          order: 2,
        },
        {
          _key: "faq-3",
          question: "Do you undertake commercial construction projects?",
          answer: "Yes, we build commercial developments, office buildings, and retail properties tailored to functional business requirements.",
          order: 3,
        },
        {
          _key: "faq-4",
          question: "Where does BUILTIN provide construction services?",
          answer: "We provide building construction services throughout Kozhikode (Calicut) and neighboring districts in Kerala, India.",
          order: 4,
        },
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
