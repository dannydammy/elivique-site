import { BookButton, CTABand, FAQ, Hero, JsonLd, PackageCard, WhatsAppButton } from "@/components/ui";
import { pkg, priceOf, type Package } from "@/lib/packages";
import { fromPrice, pageMeta, serviceSchema } from "@/lib/seo";

const TIERS = [
  {
    id: "C-NYSC-01", tier: "NYSC / fresh graduate", for: "Corps members and new graduates",
    includes: "Entry-level ATS CV, cover letter template and guide, LinkedIn setup, industry targeting brief, 30 curated job links, interview preparation guide, First Job Playbook",
  },
  {
    id: "C-STR-01", tier: "Career Starter", for: "1–2 years' experience",
    includes: "Full ATS CV, three tailored cover letters, LinkedIn setup, personal brand statement, two live interview coaching sessions, job search strategy session, four weeks of curated alerts, application tracker",
  },
  {
    id: "C-ACC-01", tier: "Career Accelerator", for: "5–10 years",
    includes: "Senior CV with a real career narrative, LinkedIn positioning, 60-minute strategy session, three interview coaching sessions including competency questions, salary negotiation brief, industry transition strategy, six weeks of senior alerts",
  },
  {
    id: "C-EXE-01", tier: "Career Executive", for: "10+ years, C-suite",
    includes: "Executive CV and board biography, executive LinkedIn positioning, 90-minute strategy session, four interview sessions across competency, panel, board and stakeholder formats, compensation negotiation brief, leadership narrative, referee briefing pack, eight weeks of executive alerts, search approach pack",
  },
];

export const metadata = pageMeta({
  title: "Career Packages Nigeria — CV, LinkedIn & Interview Coaching",
  description: `Four career packages from NYSC to executive. ATS CVs, LinkedIn setup, interview coaching and curated job alerts. From ${fromPrice(TIERS.map((t) => t.id))}.`,
  path: "/career",
});

const faqs = [
  { q: "Will you guarantee me a job?", a: "No, and nobody credible will. Hiring decisions belong to employers. What we guarantee is that your application is as strong as preparation can make it." },
  { q: "Do you write the CV for me or with me?", a: "We write it, from your intake form and a conversation. You review it and we revise it within the rounds included." },
  { q: "How long does it take?", a: "Three to five working days from a complete intake form. The intake is the step most people underestimate." },
  { q: "Do you manage my LinkedIn afterwards?", a: "No. We set it up properly once. We stopped selling ongoing LinkedIn management because once a client takes control, the outcome can no longer be protected — and we would rather not sell something we cannot stand behind." },
  { q: "Can I upgrade later?", a: "Yes. If you buy a lower tier and upgrade within 30 days, you pay the difference only." },
];

export default function CareerPage() {
  const tiers = TIERS.map((t) => ({ ...t, p: pkg(t.id) })).filter((t): t is typeof t & { p: Package } => Boolean(t.p));
  const addOns = [
    { label: "Extended job alerts, one extra month", price: priceOf("C-STR-02"), suffix: "total with Career Starter" },
    { label: "NYSC pack with one live interview coaching session", price: priceOf("C-NYSC-02"), suffix: "" },
  ].filter((a) => a.price);

  return (
    <>
      <Hero
        compact
        eyebrow="Career"
        title="Career support, by where you actually are."
        sub="Four packages, from your first job after NYSC to executive search. Each one includes the CV, the LinkedIn setup, the interview preparation and the curated opportunities — the depth is what changes."
      >
        <WhatsAppButton topic="a Career package" variant="primary" />
        <BookButton page="Career" variant="ghost" />
      </Hero>

      <section className="section">
        <div className="wrap">
          <div className="section-head"><h2>The four tiers</h2></div>
          <div className="packages">
            {tiers.map((t) => (
              <PackageCard key={t.id} p={{ ...t.p, name: t.tier }} forLine={t.for} includes={t.includes} topic={`${t.tier} package`} />
            ))}
          </div>
        </div>
      </section>

      {addOns.length > 0 && (
        <section className="section tint">
          <div className="wrap narrow">
            <h2>Add-ons</h2>
            <ul className="addons">
              {addOns.map((a) => (
                <li key={a.label}>
                  <span>{a.label}</span>
                  <span className="amt">{a.price}{a.suffix ? ` ${a.suffix}` : ""}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <FAQ items={faqs} />
      <CTABand page="Career" action="whatsapp" topic="a Career package" />
      <JsonLd data={serviceSchema("Career packages", "/career", tiers.map((t) => t.p))} />
    </>
  );
}
