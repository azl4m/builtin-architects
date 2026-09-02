import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";
import type { SanityImageValue } from "@/sanity/lib/types";

interface FooterProps {
  siteName: string;
  siteNameSub: string;
  logo?: SanityImageValue | null;
  footerBlurb: string;
  contactCity: string;
  contactEmail: string;
  contactPhone: string;
  serviceTitles: string[];
}

export default function Footer({
  siteName,
  siteNameSub,
  logo,
  footerBlurb,
  contactCity,
  contactEmail,
  contactPhone,
  serviceTitles,
}: FooterProps) {
  return (
    <footer className="relative overflow-hidden bg-footer px-16 pt-20 pb-10 text-footer-muted max-md:px-6 max-md:pt-14">
      {/* Background Architectural Image */}
      <img
        src="https://res.cloudinary.com/ddblal31l/image/upload/v1788186594/ChatGPT_Image_Aug_31_2026_07_47_23_PM_atpums.png"
        alt="Footer architectural background"
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none opacity-25"
      />
      {/* Dark overlay for contrast and crisp readability */}
      <div className="absolute inset-0 bg-ink/70 z-10 pointer-events-none" />

      {/* Footer Content */}
      <div className="relative z-20 mx-auto grid max-w-[1400px] grid-cols-[2fr_1fr_1fr_1.4fr] gap-[60px] border-b border-hairline-dark pb-14 max-lg:grid-cols-2 max-lg:gap-10 max-sm:grid-cols-1">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <SiteLogo logo={logo} alt={siteName} size={34} />
            <div className="font-display text-2xl font-bold tracking-[1px] text-ivory">{siteName}</div>
          </div>
          <div className="mb-5 text-[11px] tracking-[2px] text-accent-light uppercase">{siteNameSub}</div>
          <p className="max-w-[280px] text-sm leading-[1.8]">{footerBlurb}</p>
        </div>

        <div>
          <div className="mb-5 text-[13px] tracking-[1px] text-ivory uppercase">Explore</div>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/about" className="text-footer-muted hover:text-ivory">
              About Us
            </Link>
            <Link href="/services" className="text-footer-muted hover:text-ivory">
              Services
            </Link>
            <Link href="/projects" className="text-footer-muted hover:text-ivory">
              Projects
            </Link>
          </div>
        </div>

        <div>
          <div className="mb-5 text-[13px] tracking-[1px] text-ivory uppercase">Services</div>
          <div className="flex flex-col gap-3 text-sm">
            {serviceTitles.map((title) => (
              <div key={title}>{title}</div>
            ))}
          </div>
        </div>

        <div>
          <div className="mb-5 text-[13px] tracking-[1px] text-ivory uppercase">Contact</div>
          <div className="flex flex-col gap-3 text-sm">
            <div>{contactCity}</div>
            <div>{contactEmail}</div>
            <div>{contactPhone}</div>
          </div>
        </div>
      </div>
      <div className="relative z-20 mx-auto max-w-[1400px] pt-8 text-[13px] text-footer-muted/70">
        © {new Date().getFullYear()} {siteName} {siteNameSub}.
      </div>
    </footer>
  );
}
