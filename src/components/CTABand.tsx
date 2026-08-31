import Link from "next/link";

interface CTABandProps {
  eyebrow: string;
  heading: string;
  buttonLabel: string;
}

export default function CTABand({ eyebrow, heading, buttonLabel }: CTABandProps) {
  return (
    <section className="relative overflow-hidden px-16 py-[120px] text-center text-ivory max-md:px-6 max-md:py-20 bg-ink">
      {/* Background Image */}
      <img
        src="https://res.cloudinary.com/ddblal31l/image/upload/v1788186594/ChatGPT_Image_Aug_31_2026_07_47_23_PM_atpums.png"
        alt="Build your dream project background"
        className="absolute inset-0 h-full w-full object-cover select-none pointer-events-none opacity-45"
      />
      {/* Dark tint overlay for text readability */}
      <div className="absolute inset-0 bg-ink/40 z-10" />

      {/* Content wrapper */}
      <div className="relative z-20">
        <div className="mb-5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase max-md:mb-3 max-md:text-[11px] max-md:tracking-[2px]">{eyebrow}</div>
        <h2 className="mx-auto mb-10 max-w-[700px] font-display text-5xl font-semibold max-md:text-[28px] max-md:leading-[1.25] max-md:mb-6">
          {heading}
        </h2>
        <Link
          href="/contact"
          className="inline-block rounded-[2px] bg-ivory px-11 py-[18px] text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-light hover:text-ivory max-md:px-8 max-md:py-3.5 max-md:text-xs"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
