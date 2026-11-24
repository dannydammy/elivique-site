import type { Metadata } from "next";
import { Hero, WhatsAppButton } from "@/components/ui";

export const metadata: Metadata = { title: "Thank you", robots: { index: false } };

/** A real page, not a toast: this URL is the conversion event (brief §6). */
export default function ThankYou() {
  return (
    <Hero title="Thank you — your message has arrived." sub="It is with our team now, and we will reply to the email or number you gave us. If it is urgent, WhatsApp is fastest.">
      <WhatsAppButton topic="the enquiry I just sent through the website" variant="primary" />
    </Hero>
  );
}
