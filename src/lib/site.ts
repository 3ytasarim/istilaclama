export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://istilaclama.com.tr").replace(/\/$/, "");

/**
 * Yayın öncesi bayraklar. Canlıya alınana kadar:
 * - site arama motorlarına kapalıdır (SITE_INDEXABLE=true olmadıkça noindex),
 * - taslak içerik önizleme amaçlı gösterilir (SHOW_DRAFT_CONTENT=false ile kapatılır).
 */
export const SITE_INDEXABLE = process.env.SITE_INDEXABLE === "true";
export const SHOW_DRAFT_CONTENT = process.env.SHOW_DRAFT_CONTENT !== "false";

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}
