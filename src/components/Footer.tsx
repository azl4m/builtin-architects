import Link from "next/link";

interface FooterProps {
  siteName: string;
  siteNameSub: string;
  footerBlurb: string;
  contactCity: string;
  contactEmail: string;
  contactPhone: string;
  serviceTitles: string[];
}

export default function Footer({
  siteName,
  siteNameSub,
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
          <div className="mb-2.5 font-serif text-2xl tracking-[2px] text-ivory">{siteName}</div>
          <div className="mb-5 text-[11px] tracking-[2px] text-accent uppercase">{siteNameSub}</div>
          <p className="max-w-[280px] text-sm leading-[1.8]">{footerBlurb}</p>
        </div>

        <div>
          <div className="mb-5 text-[13px] tracking-[1px] text-ivory uppercase">Explore</div>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="/about" className="text-footer-muted hover:text-accent">
              About Us
            </Link>
            <Link href="/services" className="text-footer-muted hover:text-accent">
              Services
            </Link>
            <Link href="/projects" className="text-footer-muted hover:text-accent">
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
      <div className="mx-auto max-w-[1400px] pt-8 text-[13px] text-[#7a7266]">
        © {new Date().getFullYear()} {siteName} {siteNameSub}.
      </div>
    </footer>
  );
}
