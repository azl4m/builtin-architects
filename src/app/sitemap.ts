import type { MetadataRoute } from "next";
import { getProjectSlugs, getServiceSlugs } from "@/sanity/lib/fetchers";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = ["", "/about", "/services", "/projects", "/contact", "/faq"].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));

  const [projectSlugs, serviceSlugs] = await Promise.all([
    getProjectSlugs(),
    getServiceSlugs(),
  ]);

  const projectRoutes = projectSlugs.map((slug) => ({
    url: `${SITE_URL}/projects/${slug}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = serviceSlugs.map((slug) => ({
    url: `${SITE_URL}/services/${slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...projectRoutes, ...serviceRoutes];
}
