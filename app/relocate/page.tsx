import { BookButton, CTABand, Hero, JsonLd, PackageCard, WhatsAppButton } from "@/components/ui";
import { pkg, type Package } from "@/lib/packages";
import { pageMeta, serviceSchema } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Japa & Scholarship Support — UK, Canada, Germany, Australia, USA",
  description:
    "Visa routes, real costs and departure timelines for five destinations, plus scholarship applications. Every figure checked against the official source.",
  path: "/relocate",
});

/* "What it covers" copy is verbatim from the content pack; prices come from packages.json.
   Bundles (X-01, X-05) only appear once removed from data/publish.json. */
const ROWS = [
  { id: "G-JAPA-01", name: "Japa Full Pack — one destination", covers: "Country research brief, visa route and eligibility checklist, step-by-step timeline to departure, full cost breakdown, Statement of Purpose, Personal Statement, employer and institution reference letter guides, verified contact list, pre-departure document checklist" },
  { id: "G-JAPA-02", name: "Multi-Country Comparison Brief", covers: "Up to five destinations compared against your profile and budget, scored, with a full pack for the recommended route" },
  { id: "G-JAPA-03", name: "Statement of Purpose only", covers: "One SOP written to your target institution or route, with a revision round" },
  { id: "G-SCH-01", name: "Scholarship Readiness Pack", covers: "Opportunity audit, ten scholarships shortlisted with deadlines and eligibility, committee-format CV, referee brief, application tracker" },
  { id: "G-SCH-02", name: "Scholarship Full Application Support", covers: "The readiness pack plus a complete application for one scholarship, including the personal statement or research proposal" },
  { id: "X-01", name: "Japa + Scholarship bundle", covers: "Funding secured first, relocation second, on one managed timeline" },
  { id: "X-05", name: "Complete Relocation Bundle", covers: "Japa, Scholarship and IELTS together" },
];

export default function RelocatePage() {
  const rows = ROWS.map((r) => ({ ...r, p: pkg(r.id) })).filter((r): r is typeof r & { p: Package } => Boolean(r.p));
  return (
    <>
      <Hero
        compact
        eyebrow="Study & relocate"
        title="Relocation, planned from the official source."
        sub="We hold intelligence packs for the UK, Canada, Germany, Australia and the USA — route, eligibility, real costs, and a timeline built backwards from your departure. Every figure carries the government page it came from and the date we last checked it."
      >
        <WhatsAppButton topic="Japa / relocation support" variant="primary" />
        <BookButton page="Study & relocate" variant="ghost" />
      </Hero>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>Packages</h2></div>
          <div className="packages">
            {rows.map((r) => (
              <PackageCard key={r.id} p={{ ...r.p, name: r.name }} includes={r.covers} topic={r.name} />
            ))}
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="honesty on-dark">
            <h2>What we will not do</h2>
            <p>We will not guarantee you a visa. That decision belongs to the destination&apos;s government, and any provider who promises otherwise is telling you something that is not true.</p>
            <p>We will not refer you to an agent we have not checked. Where a country has a public register of licensed advisers — the OISC in the UK, MARA in Australia, the CICC in Canada — we check it, and we tell you how to check it yourself.</p>
            <p>We will not give you a number without telling you where it came from. Immigration fees and thresholds move. Every figure in your pack carries its official source and the date we read it, and we re-check before you act.</p>
          </div>
        </div>
      </section>

      <CTABand page="Study & relocate" action="whatsapp" topic="Japa / relocation support" />
      <JsonLd data={serviceSchema("Japa and scholarship support", "/relocate", rows.map((r) => r.p))} />
    </>
  );
}
