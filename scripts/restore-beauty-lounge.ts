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

async function restoreBeautyLounge() {
  const doc = {
    _id: "d9c1ddd0-7618-4410-b350-310b8d2630a2",
    _type: "project",
    title: "The Beauty Lounge by Dulhan – Commercial Facade & Interior Architecture",
    slug: { _type: "slug", current: "the-beauty-lounge-by-dulhan" },
    cardTitle: "The Beauty Lounge by Dulhan",
    client: "Dulhan",
    location: "Kerala",
    status: "Completed",
    scope: "Commercial Facade & Interior Architecture",
    category: "Interior Design",
    published: true,
  };

  await client.createOrReplace(doc);
  console.log("Successfully restored 'The Beauty Lounge by Dulhan' in Sanity.");
}

restoreBeautyLounge().catch((err) => {
  console.error("Failed to restore project:", err);
  process.exit(1);
});
