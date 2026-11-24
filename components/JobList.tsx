import type { Job } from "@/lib/notion";

const fmtDate = (d?: string) => (d ? new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }) : "");

export function JobList({ jobs }: { jobs: Job[] }) {
  return (
    <ul className="listing">
      {jobs.map((j) => (
        <li key={j.id}>
          <div className="meta">
            {j.level && <span className="pill">{j.level}</span>}
            {j.workType && <span>{j.workType}</span>}
            {j.sector && <span>{j.sector}</span>}
            {j.membersOnly && <span className="pill gold">Members</span>}
          </div>
          <h3><a href={j.applyUrl} target="_blank" rel="noopener nofollow">{j.role}</a></h3>
          <div className="meta">
            {j.organisation && <span>{j.organisation}</span>}
            {j.location && <span>{j.location}</span>}
            {j.deadline && <span>Deadline: <time dateTime={j.deadline}>{fmtDate(j.deadline)}</time></span>}
            {j.verifiedOn && <span>Link checked: <time dateTime={j.verifiedOn}>{fmtDate(j.verifiedOn)}</time></span>}
          </div>
          {j.notes && <p className="muted" style={{ margin: 0 }}>{j.notes}</p>}
        </li>
      ))}
    </ul>
  );
}

