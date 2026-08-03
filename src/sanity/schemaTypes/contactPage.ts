import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", initialValue: "Let's Talk" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string", initialValue: "Contact Us" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),

    defineField({ name: "introEyebrow", title: "Intro eyebrow", type: "string", initialValue: "Get In Touch" }),
    defineField({ name: "introHeading", title: "Intro heading", type: "string" }),
    defineField({ name: "introParagraph", title: "Intro paragraph", type: "text", rows: 3 }),

    defineField({ name: "mapImage", title: "Map / location image", type: "image", options: { hotspot: true } }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
