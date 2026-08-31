import Image from "next/image";
import Logo from "@/components/Logo";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/types";

interface SiteLogoProps {
  logo?: SanityImageValue | null;
  alt: string;
  size?: number;
  className?: string;
}

/** Renders the CMS-uploaded logo when set in Site Settings, else the default mark. */
export default function SiteLogo({ logo, alt, size = 38, className = "" }: SiteLogoProps) {
  const src = urlFor(logo)?.width(size * 2).height(size * 2).fit("max").auto("format").url();

  if (!src) return <Logo size={size} className={className} />;

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`object-contain ${className}`}
    />
  );
}
