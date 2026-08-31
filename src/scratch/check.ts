import { createClient } from "next-sanity";

const client = createClient({
  projectId: "5pxnmwkv",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  perspective: "published",
});

async function run() {
  const data = await client.fetch(`*[_type == "homePage"][0]{
    galleryEyebrow, galleryHeading, galleryImages
  }`);
  console.log("SANITY DATA:", JSON.stringify(data, null, 2));
}

run();
