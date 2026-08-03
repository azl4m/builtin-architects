interface PlaceholderImageProps {
  label: string;
  className?: string;
  badge?: string;
}

/**
 * Stand-in for real photography (none was supplied with the design handoff).
 * Swap for next/image with a real src once CMS/asset URLs are available —
 * the surrounding markup/sizing is production-ready as-is.
 */
export default function PlaceholderImage({ label, className = "", badge }: PlaceholderImageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={`relative flex items-center justify-center overflow-hidden bg-[linear-gradient(135deg,#e4ddd0_0%,#cfc6b4_50%,#e4ddd0_100%)] ${className}`}
    >
      <span className="px-6 text-center font-sans text-[13px] tracking-[0.5px] text-ink/50">
        {label}
      </span>
      {badge ? (
        <span className="absolute top-4 left-4 bg-ivory px-3.5 py-1.5 text-[10px] font-bold tracking-[1px] text-ink uppercase">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
