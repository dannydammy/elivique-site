import data from "@/data/packages.json";
import publish from "@/data/publish.json";

export type Package = (typeof data.packages)[number];

const hidden = new Set(Object.keys(publish.hidden));

/** All products approved for display. Prices come ONLY from data/packages.json. */
export const packages: Package[] = data.packages.filter((p) => !hidden.has(p.id));

export function pkg(id: string): Package | undefined {
  return packages.find((p) => p.id === id);
}

const naira = (n: number) => "₦" + n.toLocaleString("en-NG", { maximumFractionDigits: 0 });

export function formatPrice(p: Package): string {
  return p.priceLow === p.priceHigh ? naira(p.priceLow) : `${naira(p.priceLow)}–${naira(p.priceHigh)}`;
}

/** Price for a product that must exist; returns undefined (so the caller hides it) if unpublished. */
export function priceOf(id: string): string | undefined {
  const p = pkg(id);
  return p ? formatPrice(p) : undefined;
}

export const unitLabel = (p: Package) => (p.unit && p.unit !== "per client" ? p.unit : "");

export function byDivision() {
  const order = ["Career", "Global Mobility", "Business", "Retainer", "Bundle"];
  const groups = new Map<string, Package[]>();
  for (const p of packages) {
    if (!groups.has(p.division)) groups.set(p.division, []);
    groups.get(p.division)!.push(p);
  }
  return [...groups.entries()].sort((a, b) => order.indexOf(a[0]) - order.indexOf(b[0]));
}

export { naira };
