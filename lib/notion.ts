import "server-only";
import { Client, isFullPage } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client";
import { marked } from "marked";

/**
 * Notion is the CMS for Articles and Jobs, and the inbox for Enquiries and Members.
 * Property names below must match the databases exactly — see README.md.
 * Everything degrades gracefully: with no token configured, lists are empty and
 * the site still builds and serves.
 */
const token = process.env.NOTION_TOKEN?.trim();
export const notion = token ? new Client({ auth: token }) : null;

export const DS = {
  articles: process.env.NOTION_ARTICLES_DATA_SOURCE_ID?.trim(),
  jobs: process.env.NOTION_JOBS_DATA_SOURCE_ID?.trim(),
  enquiries: process.env.NOTION_ENQUIRIES_DATA_SOURCE_ID?.trim(),
  members: process.env.NOTION_MEMBERS_DATA_SOURCE_ID?.trim(),
};

export const notionReady = (k: keyof typeof DS) => Boolean(notion && DS[k]);

/* ---------- property readers ---------- */
type Props = PageObjectResponse["properties"];
const text = (props: Props, name: string): string => {
  const p = props[name];
  if (!p) return "";
  if (p.type === "title") return p.title.map((t) => t.plain_text).join("").trim();
  if (p.type === "rich_text") return p.rich_text.map((t) => t.plain_text).join("").trim();
  if (p.type === "select") return p.select?.name ?? "";
  if (p.type === "url") return p.url ?? "";
  if (p.type === "email") return p.email ?? "";
  return "";
};
const date = (props: Props, name: string): string | undefined => {
  const p = props[name];
  return p?.type === "date" ? p.date?.start ?? undefined : undefined;
};
const bool = (props: Props, name: string) => {
  const p = props[name];
  return p?.type === "checkbox" ? p.checkbox : false;
};

async function queryAll(dataSourceId: string, body: Record<string, unknown>) {
  const out: PageObjectResponse[] = [];
  let cursor: string | undefined;
  do {
    const res = await notion!.dataSources.query({ data_source_id: dataSourceId, start_cursor: cursor, page_size: 100, ...body } as Parameters<Client["dataSources"]["query"]>[0]);
    for (const r of res.results) if (isFullPage(r as PageObjectResponse)) out.push(r as PageObjectResponse);
    cursor = res.has_more ? res.next_cursor ?? undefined : undefined;
  } while (cursor);
  return out;
}

const slugify = (s: string) =>
  s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 80);

/* ---------- Articles ---------- */
export type Article = { id: string; title: string; slug: string; summary: string; date?: string; membersOnly: boolean };

export async function getArticles(): Promise<Article[]> {
  if (!notionReady("articles")) return [];
  try {
    const pages = await queryAll(DS.articles!, {
      filter: { property: "Status", select: { equals: "Published" } },
      sorts: [{ property: "Publish date", direction: "descending" }],
    });
    return pages.map((p) => {
      const title = text(p.properties, "Title");
      return {
        id: p.id,
        title,
        slug: text(p.properties, "Slug") || slugify(title),
        summary: text(p.properties, "Summary"),
        date: date(p.properties, "Publish date"),
        membersOnly: bool(p.properties, "Members only"),
      };
    });
  } catch (e) {
    console.error("[notion] articles query failed", e);
    return [];
  }
}

export async function getArticleBody(id: string): Promise<string> {
  const res = await notion!.pages.retrieveMarkdown({ page_id: id });
  return renderNotionMarkdown(res.markdown);
}

/** Notion-flavoured markdown → HTML. Content is authored by Elivique staff in Notion. */
function renderNotionMarkdown(md: string): string {
  const cleaned = md
    .replace(/\s*\{color="[^"]*"\}/g, "") // block colour annotations
    .replace(/<\/?(columns|column)[^>]*>/g, "")
    .replace(/<callout[^>]*>/g, "<blockquote>")
    .replace(/<\/callout>/g, "</blockquote>")
    .replace(/<(script|iframe|style)[\s\S]*?<\/\1>/gi, "");
  return marked.parse(cleaned, { async: false, gfm: true }) as string;
}

/* ---------- Jobs ---------- */
export type Job = {
  id: string; role: string; organisation: string; location: string; workType: string; level: string; sector: string;
  applyUrl: string; deadline?: string; verifiedOn?: string; membersOnly: boolean; notes: string;
};

export async function getJobs(): Promise<Job[]> {
  if (!notionReady("jobs")) return [];
  try {
    const today = new Date().toISOString().slice(0, 10);
    const pages = await queryAll(DS.jobs!, {
      filter: {
        and: [
          { property: "Status", select: { equals: "Published" } },
          { or: [{ property: "Deadline", date: { is_empty: true } }, { property: "Deadline", date: { on_or_after: today } }] },
        ],
      },
      sorts: [{ property: "Deadline", direction: "ascending" }],
    });
    return pages.map((p) => ({
      id: p.id,
      role: text(p.properties, "Role"),
      organisation: text(p.properties, "Organisation"),
      location: text(p.properties, "Location"),
      workType: text(p.properties, "Work type"),
      level: text(p.properties, "Level"),
      sector: text(p.properties, "Sector"),
      applyUrl: text(p.properties, "Apply link"),
      deadline: date(p.properties, "Deadline"),
      verifiedOn: date(p.properties, "Verified on"),
      membersOnly: bool(p.properties, "Members only"),
      notes: text(p.properties, "Notes"),
    })).filter((j) => j.role && /^https?:\/\//.test(j.applyUrl));
  } catch (e) {
    console.error("[notion] jobs query failed", e);
    return [];
  }
}

/* ---------- Enquiries (CRM inbox) ---------- */
export type Enquiry = {
  name: string; phone?: string; email?: string; source: "Website form" | "Lead magnet"; sourcePage: string;
  packageOfInterest?: string; message?: string; consent: boolean;
};

const rt = (s?: string) => (s ? [{ type: "text" as const, text: { content: s.slice(0, 1900) } }] : []);

export async function createEnquiry(e: Enquiry) {
  if (!notionReady("enquiries")) throw new Error("Notion enquiries database is not configured");
  const today = new Date().toISOString().slice(0, 10);
  await notion!.pages.create({
    parent: { data_source_id: DS.enquiries! },
    properties: {
      Name: { title: rt(e.name) },
      "Date in": { date: { start: today } },
      "Phone / WhatsApp": { phone_number: e.phone || null },
      Email: { email: e.email || null },
      Source: { select: { name: e.source } },
      "Source page": { rich_text: rt(e.sourcePage) },
      "Package of interest": { rich_text: rt(e.packageOfInterest) },
      Message: { rich_text: rt(e.message) },
      Stage: { select: { name: "New lead" } },
      "Next action": { rich_text: rt("Reply to enquiry") },
      "Next action date": { date: { start: today } },
      "Consent to contact": { checkbox: e.consent },
    },
  } as Parameters<Client["pages"]["create"]>[0]);
}

/* ---------- Members (synced from Clerk on first visit to /account) ---------- */
export async function upsertMember(m: { clerkId: string; name: string; email?: string }) {
  if (!notionReady("members")) return;
  try {
    const existing = await notion!.dataSources.query({
      data_source_id: DS.members!,
      filter: { property: "Clerk user ID", rich_text: { equals: m.clerkId } },
      page_size: 1,
    } as Parameters<Client["dataSources"]["query"]>[0]);
    if (existing.results.length) return;
    await notion!.pages.create({
      parent: { data_source_id: DS.members! },
      properties: {
        Name: { title: rt(m.name || m.email || "Member") },
        Email: { email: m.email || null },
        "Clerk user ID": { rich_text: rt(m.clerkId) },
        Joined: { date: { start: new Date().toISOString().slice(0, 10) } },
        Status: { select: { name: "Active" } },
      },
    } as Parameters<Client["pages"]["create"]>[0]);
  } catch (e) {
    console.error("[notion] member upsert failed", e);
  }
}
