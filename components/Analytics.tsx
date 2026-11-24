import Script from "next/script";

/**
 * Plausible: privacy-friendly, no cookie banner needed (brief §1, §11).
 * Loads lazily, never render-blocking. Off until NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  if (!domain) return null;
  return <Script src="https://plausible.io/js/script.outbound-links.js" data-domain={domain} strategy="lazyOnload" />;
}
