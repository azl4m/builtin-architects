try {
  process.loadEnvFile(".env.local");
} catch {
  // fall through
}

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error("Missing NEXT_PUBLIC_SANITY_PROJECT_ID or SANITY_API_WRITE_TOKEN in .env.local.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

async function updateDulhanDetails() {
  const tagline = "A landmark commercial facade and luxury bridal salon interior designed for immersive customer experiences.";
  const desc1 = "Designed and delivered for Dulhan, The Beauty Lounge combines striking exterior facade architecture with bespoke interior spatial planning. The project prioritised a seamless flow between private consultation suites, active styling stations, and a high-impact lounge area that reflects modern luxury and warmth.";
  const desc2 = "Our team managed both the architectural facade transformation and interior contracting end-to-end — coordinating custom lighting schemes, premium material palettes, built-in joinery, and specialized mechanical fit-outs to ensure a pristine finish on schedule.";

  // Update existing document or draft
  await client
    .patch("d9c1ddd0-7618-4410-b350-310b8d2630a2")
    .set({
      tagline,
      desc1,
      desc2,
    })
    .commit();

  console.log("Successfully updated Dulhan project overview & descriptions in Sanity!");
}

updateDulhanDetails().catch((err) => {
  console.error("Failed to update project details:", err);
  process.exit(1);
});
