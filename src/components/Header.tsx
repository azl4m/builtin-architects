"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { NAV_LINKS } from "@/lib/site";

interface HeaderProps {
  siteName: string;
  siteNameSub: string;
}

export default function Header({ siteName, siteNameSub }: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-hairline bg-ivory/92 backdrop-blur-sm">
      <div className="flex items-center justify-between px-16 py-5 max-lg:px-6 max-lg:py-4">
        <Link href="/" className="no-underline text-ink" onClick={() => setOpen(false)}>
          <div className="font-serif text-[26px] font-semibold tracking-[2px]">{siteName}</div>
          <div className="mt-0.5 text-[10px] tracking-[3px] text-accent uppercase">{siteNameSub}</div>
        </Link>

        <nav className="flex items-center gap-10 max-lg:hidden">
          <Link
            href="/"
            className={`text-sm transition-colors hover:text-accent ${isActive("/") ? "text-accent" : "text-ink"}`}
          >
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm transition-colors hover:text-accent ${
                isActive(link.href) ? "text-accent" : "text-ink"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className={`rounded-[2px] border px-[22px] py-2.5 text-sm transition-colors hover:text-accent ${
              isActive("/contact") ? "border-accent text-accent" : "border-ink text-ink"
            }`}
          >
            Contact
          </Link>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="hidden flex-col gap-[5px] p-2 max-lg:flex"
        >
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "translate-y-[6.5px] rotate-45" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
          <span className={`h-[1.5px] w-6 bg-ink transition-transform ${open ? "-translate-y-[6.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open ? (
        <nav className="hidden flex-col gap-1 border-t border-hairline px-6 pt-4 pb-6 max-lg:flex">
          {[{ href: "/", label: "Home" }, ...NAV_LINKS].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`py-3 text-base ${isActive(link.href) ? "text-accent" : "text-ink"}`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 inline-block w-fit rounded-[2px] border border-ink px-[22px] py-2.5 text-sm text-ink"
          >
            Contact
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
