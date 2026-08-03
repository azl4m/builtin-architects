import { defineField, defineType } from "sanity";

export default defineType({
  name: "projectsPage",
  title: "Projects Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", initialValue: "Selected Work" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string" }),
    defineField({ name: "heroIntro", title: "Hero intro paragraph", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: "Projects Page" }),
  },
});
