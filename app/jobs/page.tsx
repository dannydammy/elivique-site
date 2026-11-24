import Link from "next/link";
import { CTABand, Hero } from "@/components/ui";
import { getJobs } from "@/lib/notion";
import { JobList } from "@/components/JobList";
import { pageMeta } from "@/lib/seo";

export const revalidate = 300;

export const metadata = pageMeta({
  title: "Jobs | Elivique",
  description: "Job openings curated by Elivique, each with a link to the employer's own application page.",
  path: "/jobs",
});

export default async function JobsPage() {
  const all = await getJobs();
  const open = all.filter((j) => !j.membersOnly);
  const memberCount = all.length - open.length;
  return (
    <>
      <Hero compact eyebrow="Career" title="Jobs" />
      <section className="section">
        <div className="wrap narrow">
          {open.length === 0 ? <p className="empty">No openings listed right now.</p> : <JobList jobs={open} />}
          {memberCount > 0 && (
            <p className="notice" style={{ marginTop: "2rem" }}>
              {memberCount} more {memberCount === 1 ? "opening is" : "openings are"} listed in the member area. <Link href="/account">Sign in</Link>
            </p>
          )}
        </div>
      </section>
      <CTABand page="Jobs" action="whatsapp" topic="a Career package (from the Jobs page)" />
    </>
  );
}
