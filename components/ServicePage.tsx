import { BookButton, CTABand, Hero, JsonLd, PackageCard } from "@/components/ui";
import { pkg, type Package } from "@/lib/packages";
import { serviceSchema } from "@/lib/seo";

/**
 * The content pack gives IELTS, Business, Organisations and AI an H1, an opening line and a
 * section list — but no section copy. Per the brief ("do not write new marketing copy"),
 * these pages show the written H1 and opening line, then each package with its contracted
 * deliverables from the Offer Master. Unwritten sections are left out, not invented.
 */
export function ServicePage({
  eyebrow, title, opening, path, page, groups, schemaName,
}: {
  eyebrow: string; title: string; opening: string; path: string; page: string; schemaName: string;
  groups: { heading: string; ids: string[] }[];
}) {
  const resolved = groups
    .map((g) => ({ ...g, items: g.ids.map(pkg).filter((p): p is Package => Boolean(p)) }))
    .filter((g) => g.items.length > 0);
  return (
    <>
      <Hero compact eyebrow={eyebrow} title={title} sub={opening}>
        <BookButton page={page} />
      </Hero>
      {resolved.map((g, i) => (
        <section key={g.heading} className={`section${i % 2 ? " tint" : ""}`}>
          <div className="wrap">
            <div className="section-head"><h2>{g.heading}</h2></div>
            <div className="packages">
              {g.items.map((p) => <PackageCard key={p.id} p={p} />)}
            </div>
          </div>
        </section>
      ))}
      <CTABand page={page} />
      <JsonLd data={serviceSchema(schemaName, path, resolved.flatMap((g) => g.items))} />
    </>
  );
}
