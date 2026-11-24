import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { getArticles } from "@/lib/notion";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes = ["", "/career", "/relocate", "/ielts", "/business", "/organisations", "/ai", "/pricing", "/about", "/resources", "/contact", "/blog", "/jobs"];
  if (site.legalPagesEnabled) routes.push("/privacy", "/terms");
  const articles = (await getArticles()).filter((a) => !a.membersOnly);
  return [
    ...routes.map((r) => ({ url: site.url + r, changeFrequency: "weekly" as const, priority: r === "" ? 1 : 0.7 })),
    ...articles.map((a) => ({ url: `${site.url}/blog/${a.slug}`, lastModified: a.date, changeFrequency: "monthly" as const, priority: 0.5 })),
  ];
}
