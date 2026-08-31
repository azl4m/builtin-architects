"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_LINKS } from "@/lib/site";
import SiteLogo from "@/components/SiteLogo";
import type { SanityImageValue } from "@/sanity/lib/types";

interface HeaderProps {
  siteName: string;
  siteNameSub: string;
  logo?: SanityImageValue | null;
}

// Routes that open with a full-bleed hero image/video at the very top —
// only these get the transparent-over-hero treatment. Anything else (e.g.
// a 404) keeps the solid header from the start so nav text stays legible.
const HERO_ROUTES = ["/", "/about", "/services", "/projects", "/contact"];

export default function Header({ siteName, siteNameSub, logo }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Tracks whether the hero has scrolled out from behind the header — not a
  // fixed scroll distance, since hero height varies a lot per page (a full
  // viewport on Home vs. a short banner on Contact). Without its own
  // background, the logo needs to know exactly when it stops sitting on the
  // hero photo so its light/dark color swap stays correct everywhere.
  useEffect(() => {
    const hero = document.getElementById("site-hero");
    if (!hero) {
      setScrolled(true);
      return;
    }

    setScrolled(false);
    const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting), {
      rootMargin: "-90px 0px 0px 0px",
      threshold: 0,
    });
    observer.observe(hero);
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  const hasHeroAtTop =
    pathname === "/" || HERO_ROUTES.includes(pathname ?? "") || Boolean(pathname?.startsWith("/projects/"));
  const transparent = hasHeroAtTop && !scrolled;

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="flex items-center justify-between px-16 py-5 max-lg:px-6 max-lg:py-4">
        <Link
          href="/"
          className={`flex items-center gap-3 no-underline transition-colors duration-300 ${
            transparent ? "text-ivory" : "text-ink"
          }`}
          onClick={() => setOpen(false)}
        >
          <span className="shrink-0 overflow-hidden max-lg:rounded-full">
            <SiteLogo logo={logo} alt={siteName} size={38} />
          </span>
          <div className="min-w-0 max-md:hidden">
            <div className="font-display text-[24px] leading-tight font-bold tracking-[1px]">{siteName}</div>
            <div
              className={`mt-0.5 text-[10px] tracking-[3px] uppercase transition-colors duration-300 ${
                transparent ? "text-accent-light" : "text-accent"
              }`}
            >
              {siteNameSub}
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-0.5 rounded-full bg-ink/90 p-1.5 backdrop-blur-md max-lg:hidden">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              isActive("/") ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
            }`}
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`rounded-full px-4 py-2 text-sm transition-colors ${
                isActive(link.href) ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`ml-1 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              isActive("/contact") ? "bg-accent-light text-ivory" : "bg-ivory text-ink hover:bg-accent-light hover:text-ivory"
            }`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden items-center gap-1 rounded-full bg-ink/90 p-1.5 backdrop-blur-md max-lg:flex">
          <Link
            href="/contact"
            className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${
              isActive("/contact") ? "bg-accent-light text-ivory" : "bg-ivory text-ink"
            }`}
          >
            Contact
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="flex flex-col gap-[5px] rounded-full p-2.5"
          >
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-transform duration-300 ${
                open ? "translate-y-[6.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-opacity duration-300 ${open ? "opacity-0" : ""}`}
            />
            <span
              className={`h-[1.5px] w-5 bg-ivory transition-transform duration-300 ${
                open ? "-translate-y-[6.5px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {open ? (
        <div className="hidden px-6 pb-6 max-lg:block">
          <nav className="flex flex-col gap-1 rounded-2xl bg-ink/95 p-2 backdrop-blur-md">
            {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`rounded-xl px-4 py-3 text-base transition-colors ${
                  isActive(link.href) ? "bg-ivory/15 text-ivory" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
