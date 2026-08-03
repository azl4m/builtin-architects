import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesPage",
  title: "Services Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", initialValue: "What We Do" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({ name: "heroSubcopy", title: "Hero subcopy", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: "Services Page" }),
  },
});
