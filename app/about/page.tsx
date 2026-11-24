import { CTABand, Hero } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "About | Elivique",
  description: "Why Elivique exists, how we work, and what we will not promise.",
  path: "/about",
});

/*
 * The content pack reserves the founder story for Daniel: "written from what is actually true and
 * documented. No invented credentials." Until it is supplied, this page uses only approved copy from
 * the Elivique Company Profile. Founder and credentials sections are intentionally absent.
 */
const steps = [
  { h: "Start with your goal", p: "Tell us what you are trying to achieve, your current situation and your timeline." },
  { h: "Agree the scope", p: "We confirm deliverables, fees, timing, information required and revisions before work begins." },
  { h: "Prepare and review", p: "You supply accurate information. We prepare the agreed materials and work through the included reviews." },
  { h: "Approve and move forward", p: "You review the final content and approve it for use. We hand over the agreed files and any next steps included in the package." },
];

export default function AboutPage() {
  return (
    <>
      <Hero
        compact
        eyebrow="About"
        title="Why Elivique exists."
        sub="Ambition is often accompanied by scattered advice, unclear requirements and documents that do not explain the person or organisation well. We help clients organise the information, understand the next steps and prepare materials that reflect their real background and goals."
      />

      <section className="section">
        <div className="wrap">
          <div className="principles">
            <div className="principle">
              <h3>Who we are</h3>
              <p>Elivique is a Nigerian professional development and business support company. We support individuals preparing for career transitions, funded study and relocation, and help businesses and institutions communicate their work through well structured documentation.</p>
            </div>
            <div className="principle">
              <h3>Our vision</h3>
              <p>A Nigeria where the quality of your preparation helps determine how far you can go.</p>
            </div>
            <div className="principle">
              <h3>Our mission</h3>
              <p>To help Nigerians and Nigerian organisations move forward through careful research, clear documentation and honest guidance about what preparation can achieve.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="section-head"><h2>Working with Elivique</h2></div>
          <ol className="steps">
            {steps.map((s) => (
              <li key={s.h}><h3>{s.h}</h3><p>{s.p}</p></li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap narrow">
          <h2>What we will not promise</h2>
          <p className="lede">Our services support preparation. Employers, institutions, funders, testing bodies and immigration authorities make their own decisions. We do not guarantee jobs, admission, funding, visas or test scores.</p>
          <h3 style={{ marginTop: "2rem" }}>What you can expect</h3>
          <p className="muted">Clear scope, careful handling of your information and documents grounded in your actual experience or organisational records. Research-based recommendations should identify their sources and the date of verification.</p>
        </div>
      </section>

      <CTABand page="About" />
    </>
  );
}
