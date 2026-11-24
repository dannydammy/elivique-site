import Link from "next/link";
import { notFound } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getArticleBody, getArticles } from "@/lib/notion";

export const dynamic = "force-dynamic";
export const metadata = { title: "Member article" };

export default async function MemberArticle({ params }: { params: Promise<{ slug: string }> }) {
  await auth.protect();
  const { slug } = await params;
  const a = (await getArticles()).find((x) => x.slug === slug);
  if (!a) notFound();
  const html = await getArticleBody(a.id);
  return (
    <article className="section">
      <div className="wrap">
        <p className="eyebrow"><Link href="/account" style={{ color: "inherit", textDecoration: "none" }}>Member area</Link></p>
        <h1 style={{ fontSize: "var(--step-3)", maxWidth: "24ch" }}>{a.title}</h1>
        <hr className="rule" style={{ margin: "2rem 0" }} />
        <div className="prose" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </article>
  );
}
