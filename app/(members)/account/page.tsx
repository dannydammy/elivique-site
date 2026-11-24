import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { BookButton, WhatsAppButton } from "@/components/ui";
import { JobList } from "@/components/JobList";
import { getArticles, getJobs, upsertMember } from "@/lib/notion";
import { guides } from "@/lib/guides";

export const metadata = { title: "Member area" };
export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { userId } = await auth.protect();
  const user = await currentUser();
  const name = [user?.firstName, user?.lastName].filter(Boolean).join(" ");
  const email = user?.primaryEmailAddress?.emailAddress;

  const [jobs, articles] = await Promise.all([getJobs(), getArticles(), upsertMember({ clerkId: userId, name, email })]);

  return (
    <>
      <section className="hero on-dark compact">
        <div className="wrap" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <p className="eyebrow">Member area</p>
            <h1>{user?.firstName ? `Welcome, ${user.firstName}.` : "Welcome."}</h1>
          </div>
          <UserButton />
        </div>
      </section>

      <section className="section">
        <div className="wrap member-grid">
          <div>
            <h2>Guides</h2>
            <ul className="listing">
              {guides.map((g) => (
                <li key={g.slug}>
                  <span className="meta"><span className="pill">{g.tag}</span></span>
                  <h3><a href={g.file} download>{g.title}</a></h3>
                  <p className="muted" style={{ margin: 0 }}>{g.sub}</p>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Talk to us</h2>
            <div className="btn-row" style={{ display: "grid", gap: ".75rem", justifyItems: "start" }}>
              <BookButton page="Member area" />
              <WhatsAppButton topic="a package (from the member area)" />
            </div>
          </div>
        </div>
      </section>

      <section className="section tint">
        <div className="wrap narrow">
          <h2>Jobs</h2>
          {jobs.length ? <JobList jobs={jobs} /> : <p className="empty">No openings listed right now.</p>}
        </div>
      </section>

      {articles.length > 0 && (
        <section className="section">
          <div className="wrap narrow">
            <h2>Articles</h2>
            <ul className="listing">
              {articles.map((a) => (
                <li key={a.id}>
                  {a.membersOnly && <span className="meta"><span className="pill gold">Members</span></span>}
                  <h3><Link href={a.membersOnly ? `/account/articles/${a.slug}` : `/blog/${a.slug}`}>{a.title}</Link></h3>
                  {a.summary && <p className="muted" style={{ margin: 0 }}>{a.summary}</p>}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </>
  );
}
