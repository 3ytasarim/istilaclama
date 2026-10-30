import type { MetadataRoute } from "next";
import { blogMedia, media, serviceMedia } from "@/content/media";
import { districtMedia } from "@/content/district-media";
import { getServiceDetail } from "@/content/service-details";
import { getBlogBody } from "@/content/blog-bodies";
import { pestGuides } from "@/content/pest-guide";
import { listNeighbourhoods } from "@/lib/regions/data";
import { CONTENT_UPDATED_AT } from "@/lib/seo/metadata";
import { absoluteUrl } from "@/lib/site";
import { listBlogPosts, listDistricts, listServices } from "@/server/content";

/**
 * Tek sitemap (~1.050 URL; 50.000 sınırının çok altında). Yalnız indekslenebilir sayfalar girer:
 * - gövdesi olmayan hizmet / blog sayfaları (noindex) dışarıda,
 * - onaylı metni gelmemiş yasal sayfalar (noindex) dışarıda,
 * - /admin, /api ve yönlendirme yapan /hizmet-bolgeleri/istanbul hiç yer almaz.
 * Hizmet, ilçe, mahalle ve rehber sayfalarında görsel (image sitemap) eklenir.
 */

const lastModified = new Date(CONTENT_UPDATED_AT);

const img = (src: string) => (src.startsWith("http") ? src : absoluteUrl(src));

type Entry = MetadataRoute.Sitemap[number];
const entry = (path: string, priority: number, images?: string[], changeFrequency: Entry["changeFrequency"] = "monthly"): Entry => ({
  url: absoluteUrl(path),
  lastModified,
  changeFrequency,
  priority,
  ...(images?.length ? { images: images.map(img) } : {}),
});

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [services, districts, posts] = await Promise.all([listServices(), listDistricts(), listBlogPosts()]);

  const core: MetadataRoute.Sitemap = [
    entry("/", 1, [media.heroTechnician.src], "weekly"),
    entry("/hizmetlerimiz", 0.9, [media.heroTechnician.src]),
    entry("/hizmet-bolgeleri", 0.8),
    entry("/bocek-rehberi", 0.8),
    entry("/blog", 0.7, undefined, "weekly"),
    entry("/teklif-al", 0.8),
    entry("/kurumsal", 0.5, [media.inspection.src]),
    entry("/iletisim", 0.5),
    entry("/sik-sorulan-sorular", 0.6),
  ];

  const servicePages = services
    .filter((s) => getServiceDetail(s.slug))
    .map((s) => entry(`/hizmetlerimiz/${s.slug}`, 0.9, [serviceMedia(s.slug).src]));

  const guidePages = pestGuides.map((p) => entry(`/bocek-rehberi/${p.slug}`, 0.7, [media[p.imageKey].src]));

  const blogPages = posts
    .filter((p) => getBlogBody(p.slug))
    .map((p) => ({
      ...entry(`/blog/${p.slug}`, 0.6, [blogMedia(p.slug).src]),
      ...(p.publishedAt ? { lastModified: new Date(p.publishedAt) } : {}),
    }));

  const regionPages = districts.flatMap((d, i) => {
    const photo = districtMedia(d.slug, d.side, i).asset.src;
    const base = `/hizmet-bolgeleri/istanbul/${d.slug}`;
    return [
      entry(base, 0.7, [photo]),
      ...listNeighbourhoods(d.slug).map((m) => entry(`${base}/${m.slug}`, 0.5, [photo])),
    ];
  });

  return [...core, ...servicePages, ...guidePages, ...blogPages, ...regionPages];
}
