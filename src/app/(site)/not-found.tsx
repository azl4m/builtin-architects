import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center px-16 py-40 text-center max-md:px-6 max-md:py-24">
      <div className="mb-4 text-[13px] font-semibold tracking-[4px] text-accent uppercase">404</div>
      <h1 className="mb-6 font-serif text-5xl font-semibold max-md:text-4xl">
        We couldn&apos;t find that page
      </h1>
      <p className="mb-10 max-w-[480px] text-base leading-[1.85] text-body">
        The page you&apos;re looking for may have moved or no longer exists.
      </p>
      <Link
        href="/"
        className="rounded-[2px] bg-accent px-11 py-4 text-sm font-bold tracking-[1px] text-ink uppercase transition-colors hover:bg-accent-hover"
      >
        Back To Home
      </Link>
    </section>
  );
}
