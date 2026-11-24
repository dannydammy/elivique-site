import Link from "next/link";
import { CTABand, Hero } from "@/components/ui";
import { FormError } from "@/components/Notice";
import { guides } from "@/lib/guides";
import { getArticles } from "@/lib/notion";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Free Guides | Elivique",
  description: "Three checklists we use with paying clients, given away because they are more useful than a brochure.",
  path: "/resources",
});

export default async function ResourcesPage({ searchParams }: { searchParams: Promise<{ error?: string; guide?: string }> }) {
  const { error, guide: errGuide } = await searchParams;
  const articles = (await getArticles()).filter((a) => !a.membersOnly).slice(0, 5);
  return (
    <>
      <Hero compact eyebrow="Resources" title="Free guides worth your email address." sub="Three checklists we use with paying clients, given away because they are more useful than a brochure." />

      <section className="section">
        <div className="wrap guides">
          {guides.map((g) => (
            <article key={g.slug} id={g.slug} className="guide">
              <span className="tag">{g.tag}</span>
              <h3>{g.title}</h3>
              <p className="muted">{g.sub}</p>
              {errGuide === g.slug && <FormError code={error} topic={`the ${g.title}`} />}
              <form className="form" method="post" action="/api/lead">
                <input type="hidden" name="guide" value={g.slug} />
                <div className="hp" aria-hidden="true"><label>Leave this empty <input type="text" name="company_website" tabIndex={-1} autoComplete="off" /></label></div>
                <div className="field"><label htmlFor={`n-${g.slug}`}>Name</label><input id={`n-${g.slug}`} name="name" required autoComplete="name" maxLength={120} /></div>
                <div className="field"><label htmlFor={`e-${g.slug}`}>Email</label><input id={`e-${g.slug}`} name="email" type="email" required autoComplete="email" maxLength={160} /></div>
                <label className="small" style={{ display: "flex", gap: ".6rem", alignItems: "flex-start" }}>
                  <input type="checkbox" name="consent" value="yes" required style={{ marginTop: ".3rem" }} />
                  <span>I agree that Elivique may email me.</span>
                </label>
                <div><button className="btn btn-primary" type="submit">Download</button></div>
              </form>
            </article>
          ))}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="section tint">
          <div className="wrap narrow">
            <h2>Articles</h2>
            <ul className="listing">
              {articles.map((a) => (
                <li key={a.id}>
                  <h3><Link href={`/blog/${a.slug}`}>{a.title}</Link></h3>
                  {a.summary && <p className="muted" style={{ margin: 0 }}>{a.summary}</p>}
                </li>
              ))}
            </ul>
            <p style={{ marginTop: "1.25rem" }}><Link href="/blog">All articles →</Link></p>
          </div>
        </section>
      )}

      <CTABand page="Resources" />
    </>
  );
}
