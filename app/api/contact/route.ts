import { NextResponse, type NextRequest } from "next/server";
import { clean, cleanMultiline, deliverLead, rateLimited, validEmail } from "@/lib/leads";

/** POST /api/contact — plain HTML form post, no client JavaScript needed. */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const back = (q: string) => NextResponse.redirect(new URL(`/contact?${q}#form`, req.url), 303);

  // Honeypot: real people never fill this field. Pretend success so bots learn nothing.
  if (clean(form.get("company_website"))) return NextResponse.redirect(new URL("/thank-you", req.url), 303);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return back("error=rate");

  const name = clean(form.get("name"), 120);
  const phone = clean(form.get("phone"), 40);
  const email = clean(form.get("email"), 160).toLowerCase();
  const packageOfInterest = clean(form.get("package"), 160);
  const message = cleanMultiline(form.get("message"));
  const sourcePage = clean(form.get("source"), 120) || "/contact";
  const consent = form.get("consent") === "yes";

  if (!name || (!phone && !email) || (email && !validEmail(email)) || !consent) return back("error=invalid");

  const result = await deliverLead({ name, phone, email, packageOfInterest, message, sourcePage, source: "Website form", consent });
  if (!result.ok) return back("error=delivery");
  return NextResponse.redirect(new URL("/thank-you", req.url), 303);
}
