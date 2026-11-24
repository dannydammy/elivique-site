import { Hero, WhatsAppButton } from "@/components/ui";
import { FormError } from "@/components/Notice";
import { packages } from "@/lib/packages";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const metadata = pageMeta({
  title: "Contact | Elivique",
  description: "WhatsApp is fastest. The form reaches the same inbox.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ error?: string; package?: string }> }) {
  const { error, package: preselect } = await searchParams;
  return (
    <>
      <Hero compact eyebrow="Contact" title="Talk to us." sub="WhatsApp is fastest. The form reaches the same inbox.">
        <WhatsAppButton topic="your services (from the Contact page)" variant="primary" />
      </Hero>

      <section className="section">
        <div className="wrap contact-grid">
          <div id="form">
            <h2>Send a message</h2>
            <FormError code={error} topic="your services (from the Contact page)" />
            <form className="form" method="post" action="/api/contact">
              <input type="hidden" name="source" value="/contact" />
              <div className="hp" aria-hidden="true">
                <label>Leave this empty <input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label>
              </div>
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" required autoComplete="name" maxLength={120} />
              </div>
              <div className="field">
                <label htmlFor="phone">Phone / WhatsApp</label>
                <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+234" maxLength={40} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" name="email" type="email" autoComplete="email" maxLength={160} />
                <span className="hint">A phone number or an email is enough.</span>
              </div>
              <div className="field">
                <label htmlFor="package">Package of interest</label>
                <select id="package" name="package" defaultValue={preselect ?? ""}>
                  <option value="">Not sure yet</option>
                  {packages.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="message">Message</label>
                <textarea id="message" name="message" maxLength={3000} />
              </div>
              <label className="small" style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
                <input type="checkbox" name="consent" value="yes" required style={{ marginTop: ".3rem" }} />
                <span>I agree that Elivique may store these details and contact me about this enquiry.</span>
              </label>
              <div><button className="btn btn-primary" type="submit">Send</button></div>
            </form>
          </div>

          <div>
            <h2>Other ways in</h2>
            <ul className="channel-list">
              <li>
                <span className="label">WhatsApp</span>
                <span><WhatsAppButton topic="your services (from the Contact page)" /></span>
              </li>
              <li>
                <span className="label">Email</span>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              {site.phone && (
                <li><span className="label">Phone</span><a href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a></li>
              )}
              {site.hours && <li><span className="label">Hours</span><span>{site.hours}</span></li>}
              {site.address && <li><span className="label">Address</span><span>{site.address}</span></li>}
            </ul>
          </div>
        </div>
      </section>

      {site.calendlyUrl && (
        <section className="section tint" id="book">
          <div className="wrap">
            <h2>Book a free consultation</h2>
            {/* Plain lazy iframe: no Calendly widget script, nothing render-blocking. */}
            <iframe
              className="calendly-slot"
              src={`${site.calendlyUrl}${site.calendlyUrl.includes("?") ? "&" : "?"}hide_gdpr_banner=1`}
              title="Book a free consultation with Elivique"
              loading="lazy"
              width="100%"
              height="700"
              style={{ border: 0, width: "100%" }}
            />
          </div>
        </section>
      )}
    </>
  );
}
