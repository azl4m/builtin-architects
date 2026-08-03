export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2024-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

/**
 * True once a Sanity project has actually been provisioned (`sanity init`)
 * and its env vars set. Everything that talks to Sanity checks this first
 * and falls back to the local seed content otherwise, so the site works
 * before — and keeps working if you ever unset — the CMS connection.
 */
export const isSanityConfigured = Boolean(projectId && dataset);
