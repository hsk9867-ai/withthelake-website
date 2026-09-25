export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
import { STORIES } from "@/content/stories";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const now = new Date();

  const pages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/what-we-do`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/senio`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/impact`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/story`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${base}/store`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.7 },
  ];

  if (SITE.publish.withWellMe) {
    pages.push({ url: `${base}/what-we-do/with-well-me`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }
  if (SITE.publish.communityHealth) {
    pages.push({ url: `${base}/what-we-do/community-health`, lastModified: now, changeFrequency: "monthly", priority: 0.7 });
  }

  for (const s of STORIES) {
    pages.push({
      url: `${base}/story/${s.slug}`,
      lastModified: new Date(s.date.replaceAll(".", "-")),
      changeFrequency: "yearly",
      priority: 0.5,
    });
  }

  return pages;
}
