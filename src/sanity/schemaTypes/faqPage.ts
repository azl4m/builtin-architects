import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "faqPage",
  title: "FAQ Page",
  type: "document",
  fields: [
    defineField({ name: "heroEyebrow", title: "Eyebrow", type: "string", initialValue: "A little clarity before you begin" }),
    defineField({ name: "heroHeading", title: "Heading", type: "string", initialValue: "Your questions, answered.", validation: (rule) => rule.required() }),
    defineField({ name: "heroDescription", title: "Introduction", type: "text", rows: 3, initialValue: "Practical answers about planning, designing and building your space. Start here, then tell us what you have in mind." }),
    defineField({ name: "generalHeading", title: "General questions heading", type: "string", initialValue: "Getting started" }),
    defineField({ name: "generalDescription", title: "General questions introduction", type: "text", rows: 2, initialValue: "From the first conversation to a clearer project brief." }),
    defineField({ name: "faqs", title: "General questions", type: "array", of: [defineArrayMember({ type: "faq" })], description: "Drag to reorder. Leave unset to show the website defaults; an empty list hides general questions." }),
    defineField({ name: "includeServiceFaqs", title: "Include service questions", type: "boolean", initialValue: true, description: "Service questions are edited in their individual service documents." }),
    defineField({ name: "ctaHeading", title: "Contact heading", type: "string", initialValue: "Have a question about your own project?" }),
    defineField({ name: "ctaDescription", title: "Contact description", type: "text", rows: 2, initialValue: "Tell us about your location, space and priorities. We can discuss the next step together." }),
    defineField({ name: "ctaLabel", title: "Contact button label", type: "string", initialValue: "Start a conversation" }),
    defineField({ name: "seo", title: "SEO settings", type: "seo" }),
  ],
  preview: { prepare: () => ({ title: "FAQ Page" }) },
});
