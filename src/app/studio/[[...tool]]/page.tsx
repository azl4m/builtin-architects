"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";
import { isSanityConfigured } from "@/sanity/env";

export default function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          maxWidth: 640,
          margin: "96px auto",
          padding: "0 24px",
          color: "#201d1a",
          lineHeight: 1.6,
        }}
      >
        <h1 style={{ fontSize: 28, marginBottom: 16 }}>Sanity isn&apos;t connected yet</h1>
        <p style={{ marginBottom: 12 }}>
          This studio needs a Sanity project before it can run. From the project root:
        </p>
        <ol style={{ marginBottom: 12, paddingLeft: 20 }}>
          <li>
            <code>npx sanity login</code>
          </li>
          <li>
            <code>npx sanity init</code> — choose &quot;create new project&quot;, and when asked for
            a schema, select &quot;empty&quot; (this repo already has one)
          </li>
          <li>
            Copy the project ID it prints into <code>.env.local</code> as{" "}
            <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>, set{" "}
            <code>NEXT_PUBLIC_SANITY_DATASET=production</code>
          </li>
          <li>Restart the dev server and reload this page</li>
        </ol>
        <p>See the project README for the full setup + seeding steps.</p>
      </div>
    );
  }

  return <NextStudio config={config} />;
}
