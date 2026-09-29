export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/asset";
import { getContent } from "@/lib/cms/store";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const { site, story } = await getContent();
  const base = SITE_URL.replace(/\/$/, "");
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-do`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/senio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/impact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/healing`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/info`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/story`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/store`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  if (site.publish.withWellMe) {
    pages.push({ url: `${base}/what-we-do/with-well-me`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  if (site.publish.communityHealth) {
    pages.push({ url: `${base}/what-we-do/community-health`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  for (const s of story.items) {
    const parsed = new Date(s.date.replaceAll(".", "-"));
    pages.push({
      url: `${base}/story/${s.slug}`,
      lastModified: Number.isNaN(parsed.getTime()) ? now : parsed,
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return pages;
}
