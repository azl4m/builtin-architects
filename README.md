# BUILTIN Developers & Interiors — Marketing Site

Next.js (App Router, TypeScript, Tailwind v4) implementation of the BUILTIN design handoff, with an embedded Sanity Studio for content management.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders fully out of the box using built-in fallback copy/placeholders — no Sanity project is required to run it.

## Connecting Sanity CMS

Everything on the site (page copy, projects, testimonials, services, contact info) is editable through an embedded Studio at `/studio`. Until you connect a project, `/studio` shows setup instructions and every page falls back to the original design copy.

1. **Create a Sanity project**
   ```bash
   npx sanity login
   npx sanity init
   ```
   Choose "create new project". When asked about a schema/config, say you'll configure it yourself — this repo already has one (`sanity.config.ts`, `src/sanity/schemaTypes/`).

2. **Set environment variables** — copy `.env.local.example` to `.env.local` and fill in the project ID it printed:
   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

3. **Seed initial content** (optional but recommended — populates the Studio with the current copy so it isn't empty):
   - Create a write token at [sanity.io/manage](https://www.sanity.io/manage) → your project → API → Tokens (role: **Editor**).
   - Add it to `.env.local` as `SANITY_API_WRITE_TOKEN`.
   - Run:
     ```bash
     npm run seed
     ```

4. **Restart `npm run dev`**, then open [http://localhost:3000/studio](http://localhost:3000/studio) to log in and start editing. Upload real photography to replace the placeholder image boxes.

### What's managed in Sanity

- **Projects, Testimonials, Services** — regular documents, list-able and orderable in the Studio.
- **Site Settings, CTA Band, Home/About/Services/Projects/Contact page copy** — singleton documents (one editable instance each) under the "Site" section of the Studio's left nav.

### How the fallback works

Every page fetches through `src/sanity/lib/fetchers.ts`. Each fetcher tries Sanity first and falls back to the original design copy (`src/sanity/lib/fallback-content.ts`) if: no project is connected yet, a query returns nothing, or the request errors. This means the site never breaks due to missing CMS content — new fields you leave empty in the Studio just show the fallback value instead of that field.

Images work the same way via the `SmartImage` component: a real Sanity image renders through `next/image`; an empty field renders the placeholder box.

## Contact form

The Contact page form posts to `/api/contact` (`src/app/api/contact/route.ts`), which validates the payload server-side. To actually deliver email, set `RESEND_API_KEY` and `CONTACT_TO_EMAIL` in `.env.local` (see `.env.local.example`) — without them, submissions are validated and logged, not sent.

## Project structure

```
src/app/(site)/        marketing pages — share Header/CTABand/Footer via layout.tsx
src/app/studio/         embedded Sanity Studio at /studio
src/app/api/contact/    contact form submission handler
src/components/         Header, Footer, CTABand, SmartImage, PlaceholderImage, ContactForm, ProjectsGrid
src/sanity/              schema types, GROQ queries, fetchers, fallback content, client/image helpers
src/lib/                 site constants, seed project data, JSON-LD helpers
scripts/seed-sanity.ts  pushes fallback copy into a connected Sanity dataset
```

## Deploy

Deploys like any Next.js app (e.g. Vercel). Set the same environment variables from `.env.local` in your hosting provider. The embedded Studio deploys with the app — no separate Sanity hosting needed.
