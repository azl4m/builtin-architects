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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SITE_TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "BUILTIN Developers & Interiors is a Kerala-based architecture, interior design, and construction studio delivering projects from first sketch to final handover.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Architecture, interior design, and construction under one roof. From first sketch to final handover.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${SITE_TAGLINE}`,
    description:
      "Architecture, interior design, and construction under one roof. From first sketch to final handover.",
  },
  alternates: {
    canonical: "/",
  },
};

/**
 * Deliberately minimal: /studio renders the Sanity Studio full-screen and
 * must not inherit site chrome. Header/CTABand/Footer live in the (site)
 * route group's layout instead.
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${manrope.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
        <MotionConfig reducedMotion="user">{children}</MotionConfig>
      </body>
    </html>
  );
}
