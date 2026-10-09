import { client } from "./client";
import * as q from "./queries";
import * as fallback from "./fallback-content";
import type {
  CmsAboutPage,
  CmsContactPage,
  CmsFaqPage,
  CmsCtaBand,
  CmsHomePage,
  CmsProject,
  CmsProjectsPage,
  CmsService,
  CmsServicesPage,
  CmsSiteSettings,
  CmsTestimonial,
} from "./types";

const CONTENT_TAG = "sanity-content";

/**
 * Runs a Sanity query and falls back to seed content when: no project is
 * configured yet, the query returns nothing, or the request errors (e.g.
 * network issue, wrong dataset). Keeps every page renderable at all times.
 */
async function safeFetch<T>(query: string, params: Record<string, unknown>, fallbackValue: T): Promise<T> {
  if (!client) return fallbackValue;

  try {
    const isDev = process.env.NODE_ENV === "development";
    const result = await client.fetch<T>(query, params, {
      next: { 
        tags: [CONTENT_TAG], 
        revalidate: isDev ? 0 : 60 
      },
    });
    if (result === null || result === undefined) return fallbackValue;
    if (Array.isArray(result) && result.length === 0) return fallbackValue;
    return result;
  } catch (error) {
    console.error(`Sanity fetch failed for query, using fallback content:\n${query}`, error);
    return fallbackValue;
  }
}

export function getProjects(): Promise<CmsProject[]> {
  return safeFetch(q.allProjectsQuery, {}, fallback.FALLBACK_PROJECTS);
}

export async function getProjectBySlug(slug: string): Promise<CmsProject | null> {
  const localMatch = fallback.FALLBACK_PROJECTS.find((p) => p.slug === slug) ?? null;
  return safeFetch(q.projectBySlugQuery, { slug }, localMatch);
}

export function getProjectSlugs(): Promise<string[]> {
  return safeFetch(
    q.allProjectSlugsQuery,
    {},
    fallback.FALLBACK_PROJECTS.map((p) => p.slug)
  );
}

export function getTestimonials(): Promise<CmsTestimonial[]> {
  return safeFetch(q.allTestimonialsQuery, {}, fallback.FALLBACK_TESTIMONIALS);
}

export function getServices(): Promise<CmsService[]> {
  return safeFetch(q.allServicesQuery, {}, fallback.FALLBACK_SERVICES);
}

export async function getServiceBySlug(slug: string): Promise<CmsService | null> {
  const localMatch = fallback.FALLBACK_SERVICES.find((s) => s.slug === slug) ?? null;
  return safeFetch(q.serviceBySlugQuery, { slug }, localMatch);
}

export function getServiceSlugs(): Promise<string[]> {
  return safeFetch(
    q.allServiceSlugsQuery,
    {},
    fallback.FALLBACK_SERVICES.map((s) => s.slug)
  );
}

export function getSiteSettings(): Promise<CmsSiteSettings> {
  return safeFetch(q.siteSettingsQuery, {}, fallback.FALLBACK_SITE_SETTINGS);
}

export function getCtaBand(): Promise<CmsCtaBand> {
  return safeFetch(q.ctaBandQuery, {}, fallback.FALLBACK_CTA_BAND);
}

export function getHomePage(): Promise<CmsHomePage> {
  return safeFetch(q.homePageQuery, {}, fallback.FALLBACK_HOME_PAGE);
}

export function getAboutPage(): Promise<CmsAboutPage> {
  return safeFetch(q.aboutPageQuery, {}, fallback.FALLBACK_ABOUT_PAGE);
}

export function getServicesPage(): Promise<CmsServicesPage> {
  return safeFetch(q.servicesPageQuery, {}, fallback.FALLBACK_SERVICES_PAGE);
}

export function getProjectsPage(): Promise<CmsProjectsPage> {
  return safeFetch(q.projectsPageQuery, {}, fallback.FALLBACK_PROJECTS_PAGE);
}

export function getContactPage(): Promise<CmsContactPage> {
  return safeFetch(q.contactPageQuery, {}, fallback.FALLBACK_CONTACT_PAGE);
}

export function getFaqPage(): Promise<CmsFaqPage | null> {
  return safeFetch<CmsFaqPage | null>(q.faqPageQuery, {}, null);
}
