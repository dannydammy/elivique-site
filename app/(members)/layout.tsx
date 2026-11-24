import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { site } from "@/lib/site";
import { Hero, WhatsAppButton } from "@/components/ui";

export const metadata: Metadata = { robots: { index: false, follow: false } };

/** Clerk is loaded only inside the member area. */
export default function MembersLayout({ children }: { children: React.ReactNode }) {
  if (!site.clerkEnabled) {
    return (
      <Hero compact eyebrow="Members" title="The member area is not open yet." sub="In the meantime, everything we offer is available by WhatsApp.">
        <WhatsAppButton topic="the member area" variant="primary" />
      </Hero>
    );
  }
  return (
    <ClerkProvider
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      signInFallbackRedirectUrl="/account"
      signUpFallbackRedirectUrl="/account"
      appearance={{
        variables: { colorPrimary: "#1B2A4E", fontFamily: "var(--sans)", borderRadius: "6px" },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
