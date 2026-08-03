import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order (1–3)",
      type: "number",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "numberLabel",
      title: "Number label",
      description: 'Displayed numeral, e.g. "01"',
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "shortDescription",
      title: "Short description",
      description: "One sentence, used on the Home page services overview card.",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "fullDescription",
      title: "Full description",
      description: "Longer paragraph used on the Services page detail section.",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "statCaption",
      title: "Stat-strip caption",
      description: "Short caption shown in the overlapping stat strip on the Services page.",
      type: "string",
    }),
    defineField({
      name: "features",
      title: "Feature list",
      description: "Bulleted list shown on the Services page detail section.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    { title: "Display order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
  preview: {
    select: { title: "title", subtitle: "numberLabel", media: "image" },
  },
});
