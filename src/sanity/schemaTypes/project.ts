import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardTitle",
      title: "Card title",
      description: "Shorter title shown on project grid/home cards. Falls back to Title if empty.",
      type: "string",
    }),
    defineField({
      name: "client",
      title: "Client",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "area", title: "Built-up area", type: "string" }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: ["In Progress", "Under Construction", "Completed"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "scope",
      title: "Scope",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: ["Architecture", "Interior", "Construction"],
        layout: "radio",
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "cardMeta",
      title: "Card meta lines",
      description: "1–2 short lines shown under the title on grid/home cards.",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "featured",
      title: "Featured on Projects page",
      description: "Show as the large featured card at the top of /projects. Only one project should be featured at a time.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Sort order",
      type: "number",
    }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "tagline",
      title: "Overview tagline",
      description: "Short heading shown above the two description paragraphs on the project detail page.",
      type: "string",
    }),
    defineField({ name: "desc1", title: "Description, paragraph 1", type: "text", rows: 3 }),
    defineField({ name: "desc2", title: "Description, paragraph 2", type: "text", rows: 3 }),
    defineField({
      name: "galleryImages",
      title: "Gallery images",
      description: "First image is shown large; the rest fill the smaller gallery slots, in order.",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "videoUrl",
      title: "Walkthrough video URL",
      description:
        "Paste the video's link here — a Cloudinary delivery URL, a YouTube link, or a Vimeo link all work. The video is not uploaded to Sanity; upload it to Cloudinary (or YouTube/Vimeo) first, then paste the resulting URL here.",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["http", "https"] }).warning("Should be a full https:// link to the hosted video"),
    }),
    defineField({
      name: "videoPosterImage",
      title: "Video poster image (optional)",
      description:
        "Thumbnail shown before the video is played. Optional for Cloudinary and YouTube links — those auto-generate a first-frame thumbnail if you leave this empty. Upload one here only if you want a specific frame or a Vimeo link.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  orderings: [
    {
      title: "Display order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "heroImage" },
  },
});
