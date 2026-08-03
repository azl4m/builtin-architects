import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaBand",
  title: "CTA Band (all pages)",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "buttonLabel", title: "Button label", type: "string" }),
  ],
  preview: {
    prepare: () => ({ title: "CTA Band" }),
  },
});
