import type { Metadata } from "next";
import { site } from "./site";
import { formatPrice, packages, type Package } from "./packages";

/** Page metadata: titles and descriptions come verbatim from the content pack (section 6). */
export function pageMeta({ title, description, path, absoluteTitle = true }: { title: string; description: string; path: string; absoluteTitle?: boolean }): Metadata {
  const url = site.url + path;
  const og = `/og?title=${encodeURIComponent(title.replace(/ \| Elivique$/, ""))}`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: site.name, type: "website", locale: "en_NG", images: [{ url: og, width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title, description, images: [og] },
  };
}

export function organizationSchema() {
  const org: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: site.url + "/logo.png",
    email: site.email,
    slogan: "Elevate. Innovate. Thrive.",
    areaServed: "NG",
  };
  if (site.rcNumber) org.identifier = { "@type": "PropertyValue", propertyID: "CAC RC number", value: site.rcNumber };
  if (site.address) org.address = site.address;
  if (site.phone) org.telephone = site.phone;
  if (site.socialProfiles.length) org.sameAs = site.socialProfiles;
  return org;
}

export function serviceSchema(name: string, path: string, items: Package[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    url: site.url + path,
    provider: { "@type": "Organization", name: site.name, url: site.url },
    areaServed: "NG",
    offers: items.map((p) =>
      p.priceLow === p.priceHigh
        ? { "@type": "Offer", name: p.name, price: p.priceLow, priceCurrency: "NGN" }
        : { "@type": "AggregateOffer", name: p.name, lowPrice: p.priceLow, highPrice: p.priceHigh, priceCurrency: "NGN" }
    ),
  };
}

/** Lowest published price in a set, used where the content pack's meta copy quotes "From ₦…". */
export function fromPrice(ids: string[]) {
  const ps = packages.filter((p) => ids.includes(p.id)).sort((a, b) => a.priceLow - b.priceLow);
  return ps[0] ? formatPrice({ ...ps[0], priceHigh: ps[0].priceLow }) : "";
}
