import { defineField, defineType } from "sanity";

export default defineType({
  name: "homePage",
  title: "Home Page",
  type: "document",
  fields: [
    defineField({
      name: "heroEyebrow",
      title: "Hero eyebrow",
      type: "string",
      initialValue: "Architecture · Interior · Contracting · Construction",
    }),
    defineField({ name: "heroHeadline", title: "Hero headline", type: "string" }),
    defineField({ name: "heroSubcopy", title: "Hero subcopy", type: "text", rows: 3 }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroVideo",
      title: "Hero video (optional)",
      description:
        "Uploads and streams through Mux. When set, this autoplays (muted, looped) behind the hero text instead of the hero image. Leave empty to keep using the hero image.",
      type: "mux.video",
    }),
    defineField({
      name: "heroCtaLabel",
      title: "Hero Primary CTA Label",
      type: "string",
      initialValue: "Explore projects",
    }),
    defineField({
      name: "heroCtaLink",
      title: "Hero Primary CTA Link",
      type: "string",
      initialValue: "/projects",
    }),
    defineField({
      name: "heroCtaSecondaryLabel",
      title: "Hero Secondary CTA Label",
      type: "string",
      initialValue: "Start discussion",
    }),
    defineField({
      name: "heroCtaSecondaryLink",
      title: "Hero Secondary CTA Link",
      type: "string",
      initialValue: "/contact",
    }),

    defineField({ name: "aboutEyebrow", title: "About excerpt eyebrow", type: "string", initialValue: "At BUILTIN" }),
    defineField({ name: "aboutHeading", title: "About excerpt heading", type: "string" }),
    defineField({
      name: "aboutParagraphs",
      title: "About excerpt paragraphs",
      type: "array",
      of: [{ type: "text", rows: 3 }],
    }),
    defineField({ name: "aboutImage", title: "About excerpt image", type: "image", options: { hotspot: true } }),

    defineField({ name: "servicesEyebrow", title: "Services eyebrow", type: "string", initialValue: "What We Do" }),
    defineField({ name: "servicesHeading", title: "Services heading", type: "string", initialValue: "Our Services" }),

    defineField({
      name: "featuredProjectsEyebrow",
      title: "Featured projects eyebrow",
      type: "string",
      initialValue: "Selected Work",
    }),
    defineField({
      name: "featuredProjectsHeading",
      title: "Featured projects heading",
      type: "string",
      initialValue: "Featured Projects",
    }),

    defineField({
      name: "testimonialsEyebrow",
      title: "Testimonials eyebrow",
      type: "string",
      initialValue: "Client Says",
    }),
    defineField({
      name: "testimonialsHeading",
      title: "Testimonials heading",
      type: "string",
      initialValue: "Testimonials",
    }),

    defineField({
      name: "clientLogos",
      title: "Client logos",
      type: "array",
      of: [{ type: "image" }],
    }),
    defineField({
      name: "galleryEyebrow",
      title: "Gallery Eyebrow",
      type: "string",
      initialValue: "Visual Showcase",
    }),
    defineField({
      name: "galleryHeading",
      title: "Gallery Heading",
      type: "string",
      initialValue: "Our Work Gallery",
    }),
    defineField({
      name: "galleryImages",
      title: "Gallery Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "seo",
      title: "SEO Settings",
      type: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Home Page" }),
  },
});
