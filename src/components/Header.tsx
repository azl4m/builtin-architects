"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import SiteLogo from "@/components/SiteLogo";
import type { CmsService, SanityImageValue } from "@/sanity/lib/types";

interface HeaderProps {
  siteName: string;
  siteNameSub: string;
  logo?: SanityImageValue | null;
  services: CmsService[];
}

// Routes that open with a full-bleed hero image/video at the very top
const HERO_ROUTES = ["/", "/about", "/services", "/projects", "/contact"];

export default function Header({ siteName, siteNameSub, logo, services = [] }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Tracks scroll behavior to adjust transparent/solid states
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

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 150);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname?.startsWith(href);
  };

  const hasHeroAtTop =
    pathname === "/" ||
    HERO_ROUTES.includes(pathname ?? "") ||
    Boolean(pathname?.startsWith("/projects/")) ||
    Boolean(pathname?.startsWith("/services/"));

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

        {/* Desktop Navigation */}
        <nav className="flex items-center gap-0.5 rounded-full bg-ink/90 p-1.5 backdrop-blur-md max-lg:hidden">
          <Link
            href="/"
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              isActive("/") && pathname === "/" ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              isActive("/about") ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
            }`}
          >
            About
          </Link>

          {/* Dynamic Dropdown for Services */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className={`flex items-center gap-1.5 rounded-full px-4 py-2 text-sm transition-colors ${
                isActive("/services") ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
              }`}
            >
              Services
              <svg
                className={`h-3 w-3 opacity-70 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {dropdownOpen && (
              <div className="absolute left-1/2 mt-2 w-56 -translate-x-1/2 rounded-xl bg-ink/95 p-1.5 shadow-xl backdrop-blur-md border border-hairline-dark z-50 before:absolute before:inset-x-0 before:-top-3 before:h-3 before:content-['']">
                <Link
                  href="/services"
                  onClick={() => setDropdownOpen(false)}
                  className="block rounded-lg px-4 py-2 text-xs font-bold tracking-[1.5px] text-accent-light uppercase hover:bg-ivory/10 transition-colors"
                >
                  All Services
                </Link>
                <div className="my-1 border-t border-hairline-dark" />
                {services.map((s) => (
                  <Link
                    key={s._id}
                    href={`/services/${s.slug}`}
                    onClick={() => setDropdownOpen(false)}
                    className="block rounded-lg px-4 py-2 text-sm text-ivory/80 hover:text-ivory hover:bg-ivory/10 transition-colors"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/projects"
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              isActive("/projects") ? "bg-ivory/15 text-ivory" : "text-ivory/75 hover:text-ivory"
            }`}
          >
            Projects
          </Link>

          <Link
            href="/contact"
            className={`ml-1 rounded-full px-5 py-2 text-sm font-bold transition-colors ${
              isActive("/contact") ? "bg-accent-light text-ivory" : "bg-ivory text-ink hover:bg-accent-light hover:text-ivory"
            }`}
          >
            Contact
          </Link>
        </nav>

        {/* Mobile Hamburger menu buttons */}
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

      {/* Mobile Drawer menu */}
      {open ? (
        <div className="hidden px-6 pb-6 max-lg:block">
          <nav className="flex flex-col gap-1 rounded-2xl bg-ink/95 p-2 backdrop-blur-md">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-base transition-colors ${
                isActive("/") && pathname === "/" ? "bg-ivory/15 text-ivory" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-base transition-colors ${
                isActive("/about") ? "bg-ivory/15 text-ivory" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              About
            </Link>

            {/* Mobile Services Accordion */}
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                className={`flex items-center justify-between rounded-xl px-4 py-3 text-base transition-colors text-left ${
                  isActive("/services") ? "bg-ivory/15 text-ivory" : "text-ivory/80 hover:text-ivory"
                }`}
              >
                <span>Services</span>
                <svg
                  className={`h-4 w-4 opacity-75 transition-transform duration-200 ${mobileServicesOpen ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {mobileServicesOpen && (
                <div className="flex flex-col gap-1 pl-4 pr-2 py-2 bg-ink/30 rounded-xl mt-1">
                  <Link
                    href="/services"
                    onClick={() => {
                      setOpen(false);
                      setMobileServicesOpen(false);
                    }}
                    className="rounded-lg px-4 py-2 text-xs font-bold tracking-[1px] text-accent-light uppercase"
                  >
                    All Services Overview
                  </Link>
                  {services.map((s) => (
                    <Link
                      key={s._id}
                      href={`/services/${s.slug}`}
                      onClick={() => {
                        setOpen(false);
                        setMobileServicesOpen(false);
                      }}
                      className="rounded-lg px-4 py-2 text-sm text-ivory/70 hover:text-ivory hover:bg-ivory/5"
                    >
                      {s.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/projects"
              onClick={() => setOpen(false)}
              className={`rounded-xl px-4 py-3 text-base transition-colors ${
                isActive("/projects") ? "bg-ivory/15 text-ivory" : "text-ivory/80 hover:text-ivory"
              }`}
            >
              Projects
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
