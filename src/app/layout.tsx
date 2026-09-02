import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import { MotionConfig } from "framer-motion";
import { SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";
import { organizationJsonLd } from "@/lib/jsonld";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

import { getSiteSettings } from "@/sanity/lib/fetchers";

export async function generateMetadata(): Promise<Metadata> {
  const siteSettings = await getSiteSettings();
  
  const titleDefault = `${siteSettings.siteName} ${siteSettings.siteNameSub} — ${siteSettings.tagline}`;
  const desc = siteSettings.defaultSeo?.metaDescription || siteSettings.description;
  const canonical = siteSettings.defaultSeo?.canonicalUrl || "/";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: titleDefault,
      template: `%s | ${siteSettings.siteName}`,
    },
    description: desc,
    openGraph: {
      type: "website",
      siteName: siteSettings.siteName,
      title: siteSettings.defaultSeo?.ogTitle || titleDefault,
      description: siteSettings.defaultSeo?.ogDescription || desc,
      url: SITE_URL,
      images: siteSettings.defaultSeo?.ogImage ? [{ url: siteSettings.defaultSeo.ogImage.asset?.url || "" }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: siteSettings.defaultSeo?.ogTitle || titleDefault,
      description: siteSettings.defaultSeo?.ogDescription || desc,
    },
    alternates: {
      canonical,
    },
    icons: {
      icon: "/icon.png",
      shortcut: "/icon.png",
      apple: "/icon.png",
    },
    robots: siteSettings.defaultSeo?.noIndex ? { index: false, follow: true } : undefined,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const siteSettings = await getSiteSettings();

  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <head>
        <link rel="preconnect" href="https://stream.mux.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://image.mux.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://stream.mux.com" />
        <link rel="dns-prefetch" href="https://image.mux.com" />
      </head>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd(siteSettings)) }}
        />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
