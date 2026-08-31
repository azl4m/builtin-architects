export type ProjectStatus = "In Progress" | "Under Construction" | "Completed";

export type ProjectCategory =
  | "Architecture"
  | "Interior Design"
  | "Interior Contracting"
  | "Building Construction";

export interface Project {
  slug: string;
  title: string;
  client: string;
  area: string;
  location: string;
  status: ProjectStatus;
  scope: string;
  category: ProjectCategory;
  cardTitle: string;
  cardMeta: string[];
  tagline: string;
  desc1: string;
  desc2: string;
}

export const PROJECTS: Project[] = [
  {
    slug: "residence-at-kasaragod",
    title: "Residence at Kasaragod",
    client: "Mr. Ihjas & Family",
    area: "2,000 sq.ft",
    location: "Kasaragod, Kerala",
    status: "In Progress",
    scope: "Architectural Design & Project Execution",
    category: "Architecture",
    cardTitle: "Residence at Kasaragod",
    cardMeta: ["2,000 sq.ft · Kasaragod", "Architectural Design & Execution"],
    tagline: "A family home planned around light and privacy",
    desc1:
      "This residence was designed to give a growing family distinct zones for daily life and quiet retreat, while making the most of a compact urban plot.",
    desc2:
      "Our team is carrying the project from sanctioned drawing through site execution, coordinating structural, electrical, and finishing work on one schedule.",
  },
  {
    slug: "luxury-residence-at-mukkom",
    title: "Luxury Residence at Mukkom",
    client: "Mr. Habeeb Rahman (Profile Group)",
    area: "16,000 sq.ft",
    location: "Mukkom, Kerala",
    status: "Under Construction",
    scope: "Complete Architectural Design & Project Management",
    category: "Architecture",
    cardTitle: "Luxury Residence, Mukkom",
    cardMeta: ["Architecture & Project Management"],
    tagline: "A large-format residence with resort-level finishes",
    desc1:
      "Spanning 16,000 sq.ft, this residence combines expansive entertaining spaces with private family wings, organised around a central courtyard.",
    desc2:
      "BUILTIN is managing the full architectural design and project delivery, coordinating specialist contractors to hold both quality and timeline.",
  },
  {
    slug: "contemporary-minimalist-interior",
    title: "Contemporary Minimalist Interior",
    client: "Mr. Midhlaj & Mrs. Refeedha",
    area: "1,300 sq.ft",
    location: "Omassery, Kerala",
    status: "Completed",
    scope: "Interior Design & Styling",
    category: "Interior Design",
    cardTitle: "Minimalist Interior",
    cardMeta: ["1,300 sq.ft · Omassery", "Interior Design & Styling"],
    tagline: "A calm, uncluttered home built on restraint",
    desc1:
      "The brief called for a pared-back interior — a neutral material palette, integrated storage, and furniture chosen to disappear into the architecture.",
    desc2:
      "Every surface and fixture was selected and styled by our interior team, from kitchen joinery to final soft-furnishing details.",
  },
  {
    slug: "private-residence-construction",
    title: "Private Residence Construction",
    client: "Mr. Sayyid Safwan",
    area: "—",
    location: "Kasaragod, Kerala",
    status: "Under Construction",
    scope: "Full-Scale Residential Construction",
    category: "Building Construction",
    cardTitle: "Private Residence Build",
    cardMeta: ["Kasaragod, Kerala", "Full-Scale Residential Construction"],
    tagline: "Full-scale construction, built to the drawing",
    desc1:
      "BUILTIN took on complete construction responsibility for this residence, translating the architect's drawings into a precisely built structure.",
    desc2:
      "Our site team manages daily supervision, material quality, and subcontractor coordination through to final handover.",
  },
  {
    slug: "commercial-interior-fit-out",
    title: "Commercial Interior Fit-Out",
    client: "Withheld on Request",
    area: "3,200 sq.ft",
    location: "Kozhikode, Kerala",
    status: "Completed",
    scope: "Interior Design & Execution",
    category: "Interior Design",
    cardTitle: "Commercial Interior Fit-Out",
    cardMeta: ["3,200 sq.ft · Kozhikode", "Interior Design & Execution"],
    tagline: "A commercial space designed around the brand",
    desc1:
      "This fit-out balanced functional workflow with a strong visual identity, giving the client a space that reflects their brand to every visitor.",
    desc2:
      "From layout to lighting and signage, our team delivered the full interior scope on a compressed timeline.",
  },
  {
    slug: "institutional-campus-building",
    title: "Institutional Campus Building",
    client: "Educational Trust",
    area: "12,000 sq.ft",
    location: "Malappuram, Kerala",
    status: "Completed",
    scope: "Architecture & Construction",
    category: "Building Construction",
    cardTitle: "Institutional Campus Building",
    cardMeta: ["12,000 sq.ft · Malappuram", "Architecture & Construction"],
    tagline: "A classroom building designed for daylight and calm",
    desc1:
      "Designed for an educational trust, this campus building prioritises natural light, ventilation, and durable, low-maintenance materials.",
    desc2:
      "BUILTIN handled both the architectural design and full construction, delivering the building ready for occupancy on schedule.",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export const FEATURED_PROJECT_SLUG = "luxury-residence-at-mukkom";
