import { CTABand, Hero, WhatsAppButton } from "@/components/ui";
import { byDivision, formatPrice, unitLabel } from "@/lib/packages";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Prices — Every Elivique Service and What It Costs",
  description:
    "The full Elivique rate card. Career, relocation, IELTS, business and NGO packages, memberships and bundles. No hidden fees.",
  path: "/pricing",
});

const DIVISION_LABEL: Record<string, string> = {
  Career: "Career",
  "Global Mobility": "Study, relocation & IELTS",
  Business: "Business, NGO & AI",
  Retainer: "Memberships",
  Bundle: "Bundles",
};

export default function PricingPage() {
  const groups = byDivision();
  return (
    <>
      <Hero
        compact
        eyebrow="Pricing"
        title="Everything we do, and what it costs."
        sub="No hidden fees. Where a price is a range, scope decides it, and we confirm the figure before you pay anything."
      >
        <WhatsAppButton topic="your prices (from the Pricing page)" variant="primary" />
      </Hero>
      <section className="section">
        <div className="wrap">
          {groups.map(([division, items]) => (
            <div key={division} className="price-group table-scroll">
              <table className="price-table">
                <caption>{DIVISION_LABEL[division] ?? division}</caption>
                <thead>
                  <tr>
                    <th scope="col">Service</th>
                    <th scope="col" className="amt">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((p) => (
                    <tr key={p.id}>
                      <th scope="row" style={{ fontWeight: 500 }}>
                        {p.name}
                        <span className="unit">{p.workstream}</span>
                      </th>
                      <td className="amt">
                        {formatPrice(p)}
                        {unitLabel(p) && <span className="unit">{unitLabel(p)}</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      </section>
      <CTABand page="Pricing" action="whatsapp" topic="your prices (from the Pricing page)" />
    </>
  );
}
