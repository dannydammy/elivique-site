import Link from "next/link";
import { notFound } from "next/navigation";
import { CTABand, JsonLd } from "@/components/ui";
import { getArticleBody, getArticles } from "@/lib/notion";
import { pageMeta } from "@/lib/seo";
import { site } from "@/lib/site";

export const revalidate = 300;

async function find(slug: string) {
  return (await getArticles()).find((a) => a.slug === slug);
}

export async function generateStaticParams() {
  return (await getArticles()).filter((a) => !a.membersOnly).map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const a = await find((await params).slug);
  if (!a) return { title: "Article not found", robots: { index: false } };
  return {
    ...pageMeta({ title: `${a.title} | Elivique`, description: a.summary || a.title, path: `/blog/${a.slug}` }),
    ...(a.membersOnly ? { robots: { index: false } } : {}),
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const a = await find((await params).slug);
  if (!a) notFound();
  // Members-only articles are summarised publicly; the full text lives in the member area.
  const html = a.membersOnly ? null : await getArticleBody(a.id);
  return (
    <>
      <article className="section">
        <div className="wrap">
          <p className="eyebrow"><Link href="/blog" style={{ color: "inherit", textDecoration: "none" }}>Articles</Link></p>
          <h1 style={{ fontSize: "var(--step-3)", maxWidth: "24ch" }}>{a.title}</h1>
          {a.date && (
            <p className="muted small">
              <time dateTime={a.date}>{new Date(a.date + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</time>
            </p>
          )}
          <hr className="rule" style={{ margin: "2rem 0" }} />
          {html ? (
            <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
          ) : (
            <div className="prose">
              {a.summary && <p className="lede">{a.summary}</p>}
              <p><Link className="btn btn-primary" href={`/account/articles/${a.slug}`}>Read in the member area</Link></p>
            </div>
          )}
        </div>
      </article>
      <JsonLd
        data={{
          "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.summary || undefined,
          datePublished: a.date, url: `${site.url}/blog/${a.slug}`, publisher: { "@type": "Organization", name: site.name, url: site.url },
        }}
      />
      <CTABand page="Articles" />
    </>
  );
}
