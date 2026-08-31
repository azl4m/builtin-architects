import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "logo",
      title: "Logo",
      description: "Used in the header and footer nav. Leave empty to keep the default mark.",
      type: "image",
    }),
    defineField({ name: "siteName", title: "Site name", type: "string", initialValue: "BUILTIN" }),
    defineField({
      name: "siteNameSub",
      title: "Site name subtitle",
      description: 'Shown under the logo, e.g. "Developers & Interiors"',
      type: "string",
      initialValue: "Developers & Interiors",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Default meta description", type: "text", rows: 3 }),
    defineField({ name: "footerBlurb", title: "Footer blurb", type: "text", rows: 2 }),
    defineField({ name: "contactOffice", title: "Office address (full, used on Contact page)", type: "string" }),
    defineField({ name: "contactCity", title: "City (short, used in footer)", type: "string" }),
    defineField({ name: "contactPhone", title: "Phone", type: "string" }),
    defineField({ name: "contactEmail", title: "Email", type: "string" }),
    defineField({ name: "contactHours", title: "Hours", type: "string" }),
    defineField({
      name: "stats",
      title: "Company stats",
      description: "Shown in the stats bar on Home and About.",
      type: "array",
      of: [{ type: "statItem" }],
      validation: (rule) => rule.max(4),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
