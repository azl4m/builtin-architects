import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Hero eyebrow", type: "string", initialValue: "Who We Are" }),
    defineField({ name: "heroHeading", title: "Hero heading", type: "string", initialValue: "About Us" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),

    defineField({ name: "storyEyebrow", title: "Story eyebrow", type: "string", initialValue: "Our Story" }),
    defineField({ name: "storyHeading", title: "Story heading", type: "string" }),
    defineField({
      name: "storyParagraphs",
      title: "Story paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({ name: "storyImage", title: "Story image", type: "image", options: { hotspot: true } }),

    defineField({ name: "missionTitle", title: "Mission title", type: "string", initialValue: "Our Mission" }),
    defineField({ name: "missionText", title: "Mission text", type: "text", rows: 3 }),
    defineField({ name: "visionTitle", title: "Vision title", type: "string", initialValue: "Our Vision" }),
    defineField({ name: "visionText", title: "Vision text", type: "text", rows: 3 }),

    defineField({ name: "processEyebrow", title: "Process eyebrow", type: "string", initialValue: "How We Work" }),
    defineField({ name: "processHeading", title: "Process heading", type: "string", initialValue: "Our Process" }),
    defineField({
      name: "processSteps",
      title: "Process steps",
      type: "array",
      of: [{ type: "processStep" }],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
