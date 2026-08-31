import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CTABand from "@/components/CTABand";
import { getCtaBand, getServices, getSiteSettings } from "@/sanity/lib/fetchers";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [siteSettings, ctaBand, services] = await Promise.all([
    getSiteSettings(),
    getCtaBand(),
    getServices(),
  ]);

  return (
    <div className="flex min-h-screen flex-col bg-ivory font-sans text-ink">
      <Header
        siteName={siteSettings.siteName}
        siteNameSub={siteSettings.siteNameSub}
        logo={siteSettings.logo}
        services={services}
      />
      <main className="flex-1">{children}</main>
      <CTABand eyebrow={ctaBand.eyebrow} heading={ctaBand.heading} buttonLabel={ctaBand.buttonLabel} />
      <Footer
        siteName={siteSettings.siteName}
        siteNameSub={siteSettings.siteNameSub}
        logo={siteSettings.logo}
        footerBlurb={siteSettings.footerBlurb}
        contactCity={siteSettings.contactCity}
        contactEmail={siteSettings.contactEmail}
        contactPhone={siteSettings.contactPhone}
        serviceTitles={services.map((s) => s.title)}
      />
    </div>
  );
}
