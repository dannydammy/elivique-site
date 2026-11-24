import Link from "next/link";
import { BookButton, CTABand, Hero, WhatsAppButton } from "@/components/ui";
import { pageMeta } from "@/lib/seo";

export const metadata = pageMeta({
  title: "Elivique — Careers, Relocation, IELTS & Business Documents",
  description:
    "Career packages, Japa and scholarship support, IELTS coaching and business documentation. Lagos-based. Every figure sourced and dated.",
  path: "/",
});

const routes = [
  { h: "Move your career forward", p: "From your first job after NYSC to a seat at the executive table.", href: "/career" },
  { h: "Study, work or relocate abroad", p: "UK, Canada, Germany, Australia, USA — route, cost, timeline and documents.", href: "/relocate" },
  { h: "Pass IELTS at Band 7+", p: "Four weeks, eight sessions, and feedback on everything you write.", href: "/ielts" },
  { h: "Build the business paperwork", p: "Plans, financial models, audits, annual reports, NGO structure and policy.", href: "/business" },
];

const why = [
  {
    h: "Every figure has a source and a date",
    p: "Visa fees, thresholds and deadlines change without notice. We tell you where each number came from and when we last checked it — and we check again before you act on it.",
  },
  {
    h: "We do not refer you to anyone we have not verified",
    p: "The relocation market runs on referrals to agents. We name only advisers we have checked against the official register, and we would rather give you a short list than a padded one.",
  },
  {
    h: "We will not promise you an outcome",
    p: "No preparation controls a visa officer, an admissions committee or an examiner. We tell you that before you pay, not after.",
  },
];

export default function Home() {
  return (
    <>
      <Hero
        eyebrow="Elevate · Innovate · Thrive"
        title="Your next level, prepared properly."
        sub="Careers, study and relocation abroad, IELTS, and the documentation businesses and NGOs are actually asked for. Written by people who check the source before they tell you the number."
      >
        <BookButton page="Home" />
        <WhatsAppButton topic="your services (from the Home page)" />
      </Hero>

      <section className="section">
        <div className="wrap">
          <nav className="routes" aria-label="Services">
            {routes.map((r, i) => (
              <Link key={r.href} href={r.href} className="route">
                <span className="num">0{i + 1}</span>
                <h3>{r.h}</h3>
                <p>{r.p}</p>
                <span className="go">Learn more →</span>
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap">
          <div className="section-head">
            <p className="eyebrow">Why Elivique</p>
          </div>
          <div className="principles">
            {why.map((w) => (
              <div key={w.h} className="principle">
                <h3>{w.h}</h3>
                <p>{w.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof strip intentionally absent until real, permissioned testimonials exist (content pack rule 2). */}

      <CTABand
        page="Home"
        title="Not sure which one you need?"
        body="Book twenty minutes. We will tell you honestly whether we can help, and what it would cost, before you spend anything."
      />
    </>
  );
}
