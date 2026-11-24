import { site } from "./site";

/**
 * Every WhatsApp button names the page it came from, so enquiries arrive
 * pre-qualified (brief §5). Prefilled text needs a wa.me number; until one is
 * configured we fall back to the published wa.link/elivique short link.
 */
export function whatsappHref(message: string): string {
  if (site.whatsappNumber) {
    return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;
  }
  return site.whatsappShortLink;
}

export const waMessage = (topic: string) => `Hi Elivique — I'm interested in ${topic}`;

/** Booking: Calendly if configured, otherwise the consultation request goes to WhatsApp. */
export function bookingHref(page: string): { href: string; external: boolean } {
  if (site.calendlyUrl) return { href: "/contact#book", external: false };
  return { href: whatsappHref(`Hi Elivique — I'd like to book a free consultation (from the ${page} page)`), external: true };
}
