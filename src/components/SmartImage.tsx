import Image from "next/image";
import PlaceholderImage from "@/components/PlaceholderImage";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImageValue } from "@/sanity/lib/types";

interface SmartImageProps {
  image?: SanityImageValue | null;
  /** Used only when `image` is empty — e.g. an auto-derived video thumbnail URL. */
  fallbackSrc?: string | null;
  alt: string;
  label: string;
  className?: string;
  badge?: string;
  sizes?: string;
  priority?: boolean;
}

/**
 * Renders a real Sanity image when one has been uploaded in the Studio;
 * otherwise an explicit `fallbackSrc` if given; otherwise the placeholder
 * box, so every page still looks complete before content is authored.
 */
export default function SmartImage({
  image,
  fallbackSrc,
  alt,
  label,
  className = "",
  badge,
  sizes = "100vw",
  priority,
}: SmartImageProps) {
  const sanitySrc = urlFor(image)?.width(2000).fit("max").auto("format").url();
  const src = sanitySrc ?? fallbackSrc ?? null;

  if (!src) {
    return <PlaceholderImage label={label} className={className} badge={badge} />;
  }

  const hasPosition = /(^|\s)(relative|absolute|fixed|sticky)(\s|$)/.test(className);

  return (
    <div className={`${hasPosition ? "" : "relative"} overflow-hidden ${className}`}>
      <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      {badge ? (
        <span className="absolute top-4 left-4 bg-ivory px-3.5 py-1.5 text-[10px] font-bold tracking-[1px] text-ink uppercase">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
