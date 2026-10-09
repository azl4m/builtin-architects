import type { StructureResolver } from "sanity/structure";

const SINGLETONS: { id: string; type: string; title: string }[] = [
  { id: "siteSettings", type: "siteSettings", title: "Site Settings" },
  { id: "ctaBand", type: "ctaBand", title: "CTA Band (all pages)" },
  { id: "homePage", type: "homePage", title: "Home Page" },
  { id: "aboutPage", type: "aboutPage", title: "About Page" },
  { id: "servicesPage", type: "servicesPage", title: "Services Page" },
  { id: "projectsPage", type: "projectsPage", title: "Projects Page" },
  { id: "contactPage", type: "contactPage", title: "Contact Page" },
  { id: "faqPage", type: "faqPage", title: "FAQ Page" },
];

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Content")
    .items([
      S.listItem()
        .title("Site")
        .child(
          S.list()
            .title("Site")
            .items(
              SINGLETONS.map((s) =>
                S.listItem()
                  .title(s.title)
                  .id(s.id)
                  .child(S.document().schemaType(s.type).documentId(s.id))
              )
            )
        ),
      S.divider(),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("testimonial").title("Testimonials"),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (item) =>
          ![...SINGLETONS.map((s) => s.type), "project", "service", "testimonial"].includes(
            item.getId() ?? ""
          )
      ),
    ]);

export const singletonIds = SINGLETONS.map((s) => s.id);
