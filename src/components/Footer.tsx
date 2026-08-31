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
    <footer className="bg-footer px-16 pt-20 pb-10 text-footer-muted max-md:px-6 max-md:pt-14">
      <div className="mx-auto grid max-w-[1400px] grid-cols-[2fr_1fr_1fr_1.4fr] gap-[60px] border-b border-hairline-dark pb-14 max-lg:grid-cols-2 max-lg:gap-10 max-sm:grid-cols-1">
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
      <div className="mx-auto max-w-[1400px] pt-8 text-[13px] text-footer-muted/70">
        © {new Date().getFullYear()} {siteName} {siteNameSub}.
      </div>
    </footer>
  );
}
