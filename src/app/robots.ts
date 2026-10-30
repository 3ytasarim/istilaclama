import type { MetadataRoute } from "next";
import { SITE_INDEXABLE, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Yayın öncesi (SITE_INDEXABLE !== "true") tüm tarayıcılara kapalı; sayfalardaki noindex ile birlikte çalışır.
 * Yayında: herkese açık, yalnız yönetim paneli ve API kapalı. AI tarayıcıları (GPTBot, ClaudeBot,
 * PerplexityBot, Google-Extended vb.) ayrıca engellenmez — GEO görünürlüğü için bilinçli tercih.
 */
export default function robots(): MetadataRoute.Robots {
  if (!SITE_INDEXABLE) {
    return { rules: [{ userAgent: "*", disallow: "/" }] };
  }
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin", "/api"] }],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: SITE_URL,
  };
}
