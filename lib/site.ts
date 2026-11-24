/**
 * Site facts. Anything not yet confirmed by Daniel is read from an environment
 * variable and is simply LEFT OUT of the page when unset — the site never shows
 * a visible placeholder like [RC NUMBER].
 */
const env = (k: string) => {
  const v = process.env[k]?.trim();
  return v ? v : undefined;
};

export const site = {
  name: "Elivique",
  tagline: "Elevate · Innovate · Thrive",
  url: (env("NEXT_PUBLIC_SITE_URL") ?? "https://elivique.com").replace(/\/$/, ""),
  email: env("NEXT_PUBLIC_CONTACT_EMAIL") ?? "hello@elivique.com",
  location: "Lagos, Nigeria",
  /** International format, digits only, e.g. 2348012345678. Enables per-page prefilled wa.me links. */
  whatsappNumber: env("NEXT_PUBLIC_WHATSAPP_NUMBER")?.replace(/\D/g, ""),
  /** Published short link used across the social assets; used when no number is configured. */
  whatsappShortLink: "https://wa.link/elivique",
  calendlyUrl: env("NEXT_PUBLIC_CALENDLY_URL"),
  rcNumber: env("NEXT_PUBLIC_RC_NUMBER"),
  address: env("NEXT_PUBLIC_REGISTERED_ADDRESS"),
  phone: env("NEXT_PUBLIC_PHONE"),
  hours: env("NEXT_PUBLIC_OPENING_HOURS"),
  /** Comma-separated profile URLs for Organization schema sameAs. */
  socialProfiles: (env("NEXT_PUBLIC_SOCIAL_PROFILES") ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean),
  /** Legal pages stay off until a Nigerian lawyer has reviewed the drafts (brief §8). */
  legalPagesEnabled: env("NEXT_PUBLIC_LEGAL_PAGES_ENABLED") === "true",
  clerkEnabled: Boolean(env("NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY")),
};

export const nav = [
  { href: "/career", label: "Career" },
  { href: "/relocate", label: "Study & relocate" },
  { href: "/ielts", label: "IELTS" },
  { href: "/business", label: "Business" },
  { href: "/pricing", label: "Pricing" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];

export const footerNav = [
  { href: "/career", label: "Career" },
  { href: "/relocate", label: "Study & relocate" },
  { href: "/ielts", label: "IELTS" },
  { href: "/business", label: "Business" },
  { href: "/organisations", label: "NGO & policy" },
  { href: "/ai", label: "AI training" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/resources", label: "Resources" },
  { href: "/blog", label: "Articles" },
  { href: "/jobs", label: "Jobs" },
  { href: "/contact", label: "Contact" },
];
