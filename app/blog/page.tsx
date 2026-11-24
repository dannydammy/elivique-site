import Link from "next/link";
import { CTABand, Hero } from "@/components/ui";
import { getArticles } from "@/lib/notion";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Articles | Elivique",
  description: "Articles from Elivique on careers, study and relocation, IELTS and business documentation.",
  path: "/blog",
});

const fmt = (d?: string) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }) : "");

export default async function BlogIndex() {
  const articles = await getArticles();
  return (
    <>
      <Hero compact eyebrow="Resources" title="Articles" />
      <section className="section">
        <div className="wrap narrow">
          {articles.length === 0 ? (
            <p className="empty">No articles published yet.</p>
          ) : (
            <ul className="listing">
              {articles.map((a) => (
                <li key={a.id}>
                  <div className="meta">
                    {a.date && <time dateTime={a.date}>{fmt(a.date)}</time>}
                    {a.membersOnly && <span className="pill gold">Members</span>}
                  </div>
                  <h3><Link href={`/blog/${a.slug}`}>{a.title}</Link></h3>
                  {a.summary && <p className="muted" style={{ margin: 0 }}>{a.summary}</p>}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <CTABand page="Articles" />
    </>
  );
}
