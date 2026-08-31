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
      style={{
        backgroundImage:
          "repeating-linear-gradient(45deg, rgba(14,42,70,0.06) 0px, rgba(14,42,70,0.06) 1px, transparent 1px, transparent 13px), linear-gradient(135deg, #f3f5f9 0%, #e2e6ee 55%, #f3f5f9 100%)",
      }}
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
    >
      <div className="flex flex-col items-center gap-3 px-6 text-center">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-accent/35 font-display text-lg text-accent">
          B
        </span>
        <span className="font-sans text-[11px] font-semibold tracking-[2px] text-ink/40 uppercase">
          {label}
        </span>
      </div>
      {badge ? (
        <span className="absolute top-4 left-4 bg-ivory px-3.5 py-1.5 text-[10px] font-bold tracking-[1px] text-ink uppercase">
          {badge}
        </span>
      ) : null}
    </div>
  );
}
