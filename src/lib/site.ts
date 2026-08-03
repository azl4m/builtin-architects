export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.builtin-di.com";

export const SITE_NAME = "BUILTIN Developers & Interiors";

export const SITE_TAGLINE = "Build your dreams with us.";

export const CONTACT = {
  office: "Calicut, Kerala, India",
  city: "Calicut, Kerala",
  phone: "+91 00000 00000",
  email: "hello@builtin-di.com",
  hours: "Mon – Sat, 9:30am – 6:30pm",
};

export const NAV_LINKS = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
] as const;
