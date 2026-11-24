import Link from "next/link";
import type { ReactNode } from "react";
import { bookingHref, whatsappHref, waMessage } from "@/lib/whatsapp";
import { formatPrice, unitLabel, type Package } from "@/lib/packages";

/* ---------- Icons ---------- */
export const WaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.22-8.23 8.22Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
  </svg>
);
const Arrow = () => (
  <svg viewBox="0 0 20 20" aria-hidden="true" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6">
    <path d="M4 10h11M11 5l5 5-5 5" />
  </svg>
);

/* ---------- Buttons ---------- */
export function BookButton({ page, label = "Book a free consultation", variant = "primary" }: { page: string; label?: string; variant?: "primary" | "ghost" }) {
  const b = bookingHref(page);
  const cls = `btn btn-${variant}`;
  return b.external ? (
    <a className={cls} href={b.href} target="_blank" rel="noopener">{label}</a>
  ) : (
    <Link className={cls} href={b.href}>{label}</Link>
  );
}

export function WhatsAppButton({ topic, label = "Message us on WhatsApp", variant = "ghost" }: { topic: string; label?: string; variant?: "primary" | "ghost" }) {
  return (
    <a className={`btn btn-${variant}`} href={whatsappHref(waMessage(topic))} target="_blank" rel="noopener">
      <WaIcon />
      {label}
    </a>
  );
}

/* ---------- Decorative fine lines, echoing the brand banner ---------- */
export const Lines = ({ className = "hero-lines" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 600 600" aria-hidden="true" fill="none">
    <circle cx="430" cy="170" r="250" stroke="#C99A3E" strokeOpacity=".55" strokeWidth="1" />
    <circle cx="430" cy="170" r="310" stroke="#C99A3E" strokeOpacity=".35" strokeWidth="1" />
    <path d="M120 -20 L560 620" stroke="#fff" strokeOpacity=".08" />
    <path d="M140 -20 L580 620" stroke="#fff" strokeOpacity=".06" />
  </svg>
);

/* ---------- Hero ---------- */
export function Hero({ eyebrow, title, sub, children, compact = false }: { eyebrow?: string; title: string; sub?: string; children?: ReactNode; compact?: boolean }) {
  return (
    <section className={`hero on-dark${compact ? " compact" : ""}`}>
      <Lines />
      <div className="wrap">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
        {sub && <p className="lede">{sub}</p>}
        {children && <div className="btn-row" style={{ marginTop: "2rem" }}>{children}</div>}
      </div>
    </section>
  );
}

/* ---------- Package card (price always from packages.json) ---------- */
export function PackageCard({ p, forLine, includes, topic }: { p: Package; forLine?: string; includes?: string; topic?: string }) {
  const unit = unitLabel(p);
  return (
    <article className="package">
      <header>
        {forLine && <span className="for">{forLine}</span>}
        <h3>{p.name.replace(/ Package$/, "")}</h3>
        <div className="price">
          {formatPrice(p)}
          {unit && <span className="unit">{unit}</span>}
        </div>
      </header>
      {includes ? (
        <p className="includes">{includes}</p>
      ) : (
        p.deliverables.length > 0 && (
          <ul>{p.deliverables.map((d) => <li key={d}>{d}</li>)}</ul>
        )
      )}
      <div className="cta">
        <a href={whatsappHref(waMessage(`the ${topic ?? p.name}`))} target="_blank" rel="noopener">
          Ask about this on WhatsApp <Arrow />
        </a>
      </div>
    </article>
  );
}

/* ---------- FAQ with FAQPage schema ---------- */
export function FAQ({ items, heading = "FAQ" }: { items: { q: string; a: string }[]; heading?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({ "@type": "Question", name: i.q, acceptedAnswer: { "@type": "Answer", text: i.a } })),
  };
  return (
    <section className="section">
      <div className="wrap">
        <h2>{heading}</h2>
        <div className="faq">
          {items.map((i) => (
            <details key={i.q}>
              <summary>{i.q}</summary>
              <p>{i.a}</p>
            </details>
          ))}
        </div>
      </div>
      <JsonLd data={schema} />
    </section>
  );
}

/* ---------- Closing CTA band: one action, never two competing (rule 4) ---------- */
export function CTABand({ page, title, body, action = "book", topic }: { page: string; title?: string; body?: string; action?: "book" | "whatsapp"; topic?: string }) {
  return (
    <section className="cta-band on-dark">
      <Lines />
      <div className="wrap">
        {title && <h2>{title}</h2>}
        {body && <p>{body}</p>}
        <div className="btn-row" style={{ marginTop: "1.5rem" }}>
          {action === "book" ? <BookButton page={page} /> : <WhatsAppButton topic={topic ?? page} variant="primary" />}
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
