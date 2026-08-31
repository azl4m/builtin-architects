interface LogoProps {
  size?: number;
  className?: string;
}

/** Geometric mark matching the brand: a navy roundel with a folded "b" glyph in white. */
export default function Logo({ size = 40, className = "" }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <circle cx="50" cy="50" r="50" fill="#0e2a46" />
      <path d="M36 42 L48 26 L62 37 L48 51 L48 70 L36 70 Z" fill="#ffffff" />
      <circle cx="65" cy="60" r="14" fill="#ffffff" />
    </svg>
  );
}
