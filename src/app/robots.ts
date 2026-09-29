export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/asset";

export default function robots(): MetadataRoute.Robots {
  const base = SITE_URL.replace(/\/$/, "");
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/", "/admin/"] },
    sitemap: `${base}/sitemap.xml`,
  };
}
