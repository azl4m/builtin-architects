import { defineField, defineType } from "sanity";

export default defineType({
  name: "seo",
  title: "SEO Settings",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "SEO Title",
      type: "string",
      description: "Keep it under 60 characters for best results in search engines.",
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Keep it under 155 characters.",
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Leave empty to use the default page URL.",
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Title for social media sharing (optional).",
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 3,
      description: "Description for social media sharing (optional).",
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      description: "Image for social media sharing (recommended size: 1200x630).",
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      description: "Prevent search engines from indexing this page.",
      initialValue: false,
    }),
  ],
});
