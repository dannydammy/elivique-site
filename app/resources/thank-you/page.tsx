import type { Metadata } from "next";
import { Hero, WhatsAppButton } from "@/components/ui";
import { guideBySlug, guides } from "@/lib/guides";

export const metadata: Metadata = { title: "Your guide", robots: { index: false } };

export default async function GuideThankYou({ searchParams }: { searchParams: Promise<{ guide?: string }> }) {
  const { guide: slug } = await searchParams;
  const g = guideBySlug(slug) ?? guides[0];
  return (
    <Hero title={g.title} sub={g.sub}>
      <a className="btn btn-primary" href={g.file} download>Download the PDF</a>
      <WhatsAppButton topic={`help after reading the ${g.title}`} />
    </Hero>
  );
}
