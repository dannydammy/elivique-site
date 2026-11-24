import "server-only";
import { createEnquiry, notionReady, type Enquiry } from "./notion";

/**
 * One enquiry → every inbox that is configured (brief §6):
 *   1. Notion "Enquiries" database (the CRM inbox)              — NOTION_* env vars
 *   2. Google Sheet, in the CRM Pipeline column order (optional) — SHEETS_WEBHOOK_URL
 *   3. Email to hello@elivique.com via Resend (optional)         — RESEND_API_KEY
 * Succeeds if at least one destination accepted the lead, so a lead is never silently lost.
 */
export async function deliverLead(e: Enquiry): Promise<{ ok: boolean; delivered: string[]; errors: string[] }> {
  const delivered: string[] = [];
  const errors: string[] = [];
  const jobs: Promise<void>[] = [];

  if (notionReady("enquiries")) {
    jobs.push(createEnquiry(e).then(() => { delivered.push("notion"); }, (err) => { errors.push("notion: " + String(err?.message ?? err)); }));
  }

  const sheets = process.env.SHEETS_WEBHOOK_URL?.trim();
  if (sheets) {
    // Column order of the CRM workbook's Pipeline tab: Date in | Name | Phone / WhatsApp | Email | Source | Package of interest | ... | Notes
    const row = {
      dateIn: new Date().toISOString().slice(0, 10),
      name: e.name,
      phone: e.phone ?? "",
      email: e.email ?? "",
      source: `${e.source} (${e.sourcePage})`,
      packageOfInterest: e.packageOfInterest ?? "",
      stage: "New lead",
      nextAction: "Reply to enquiry",
      notes: e.message ?? "",
    };
    jobs.push(
      fetch(sheets, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(row), redirect: "follow" })
        .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); delivered.push("sheets"); })
        .catch((err) => { errors.push("sheets: " + String(err?.message ?? err)); })
    );
  }

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const to = process.env.CONTACT_TO_EMAIL?.trim() || "hello@elivique.com";
    const from = process.env.CONTACT_FROM_EMAIL?.trim() || "Elivique website <website@elivique.com>";
    const lines = [
      `Name: ${e.name}`, `Phone / WhatsApp: ${e.phone ?? "—"}`, `Email: ${e.email ?? "—"}`,
      `Source: ${e.source} — ${e.sourcePage}`, `Package of interest: ${e.packageOfInterest ?? "—"}`, "", e.message ?? "",
    ];
    jobs.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
        body: JSON.stringify({ from, to: [to], reply_to: e.email || undefined, subject: `New enquiry: ${e.packageOfInterest || e.sourcePage} — ${e.name}`, text: lines.join("\n") }),
      })
        .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); delivered.push("email"); })
        .catch((err) => { errors.push("email: " + String(err?.message ?? err)); })
    );
  }

  await Promise.all(jobs);
  if (errors.length) console.error("[leads] delivery errors", errors);
  return { ok: delivered.length > 0, delivered, errors };
}

/* Simple per-instance rate limit: 5 submissions per IP per 10 minutes. No CAPTCHA (brief §6). */
const hits = new Map<string, number[]>();
export function rateLimited(ip: string, limit = 5, windowMs = 10 * 60 * 1000) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}

export const clean = (v: FormDataEntryValue | null, max = 200) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, max) : "");
export const cleanMultiline = (v: FormDataEntryValue | null, max = 3000) => (typeof v === "string" ? v.trim().slice(0, max) : "");
export const validEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
