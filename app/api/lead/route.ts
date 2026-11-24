import { NextResponse, type NextRequest } from "next/server";
import { clean, deliverLead, rateLimited, validEmail } from "@/lib/leads";
import { guideBySlug } from "@/lib/guides";

/** POST /api/lead — lead magnet download. Captures name + email, then hands over the guide. */
export async function POST(req: NextRequest) {
  const form = await req.formData();
  const guide = guideBySlug(clean(form.get("guide"), 80));
  if (!guide) return NextResponse.redirect(new URL("/resources", req.url), 303);
  const back = (q: string) => NextResponse.redirect(new URL(`/resources?${q}&guide=${guide.slug}#${guide.slug}`, req.url), 303);

  if (clean(form.get("company_website"))) return NextResponse.redirect(new URL(`/resources/thank-you?guide=${guide.slug}`, req.url), 303);
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip, 10)) return back("error=rate");

  const name = clean(form.get("name"), 120);
  const email = clean(form.get("email"), 160).toLowerCase();
  const consent = form.get("consent") === "yes";
  if (!name || !validEmail(email) || !consent) return back("error=invalid");

  const result = await deliverLead({
    name, email, consent, source: "Lead magnet", sourcePage: `/resources — ${guide.title}`, packageOfInterest: guide.title,
  });
  if (!result.ok) return back("error=delivery");
  return NextResponse.redirect(new URL(`/resources/thank-you?guide=${guide.slug}`, req.url), 303);
}
