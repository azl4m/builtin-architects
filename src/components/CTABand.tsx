import Link from "next/link";

interface CTABandProps {
  eyebrow: string;
  heading: string;
  buttonLabel: string;
}

export default function CTABand({ eyebrow, heading, buttonLabel }: CTABandProps) {
  return (
    <section className="bg-ink px-16 py-[120px] text-center text-ivory max-md:px-6 max-md:py-20">
      <div className="mb-5 text-[13px] font-semibold tracking-[4px] text-accent-light uppercase">{eyebrow}</div>
      <h2 className="mx-auto mb-10 max-w-[700px] font-display text-5xl font-semibold max-md:text-4xl">
        {heading}
      </h2>
      <Link
        href="/contact"
        className="inline-block rounded-[2px] bg-ivory px-11 py-[18px] text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-light hover:text-ivory"
      >
        {buttonLabel}
      </Link>
    </section>
  );
}
