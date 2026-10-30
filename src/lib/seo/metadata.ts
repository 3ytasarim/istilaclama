import type { Metadata } from "next";
import { media } from "@/content/media";
import { SITE_INDEXABLE, absoluteUrl } from "@/lib/site";

/** Tek marka adı — title, OG, JSON-LD ve llms.txt aynı yazımı kullanır (entity tutarlılığı). */
export const BRAND = "İST İlaçlama";
export const TITLE_SEPARATOR = " | ";
export const TITLE_MAX = 60;
export const LOCALE = "tr_TR";

/**
 * İçerik son güncelleme tarihi (sitemap lastModified). İçerik CMS'e taşınınca
 * kayıt bazlı `updatedAt` ile değiştirilir; o zamana kadar içerik değiştiğinde güncellenir.
 */
export const CONTENT_UPDATED_AT = "2026-10-28";

export interface SeoImage {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export const DEFAULT_OG_IMAGE: SeoImage = media.heroTechnician;

/**
 * Aday başlıklardan ilkini seçer; marka eklenmiş hâli sınırı aşmıyorsa markayı ekler.
 * Hiçbiri sığmazsa ilk adayı markasız döndürür (Google zaten kırpar; anahtar kelime başta kalır).
 */
export function fitTitle(candidates: string[], max = TITLE_MAX): string {
  for (const c of candidates) {
    const branded = `${c}${TITLE_SEPARATOR}${BRAND}`;
    if (branded.length <= max) return branded;
  }
  for (const c of candidates) if (c.length <= max) return c;
  return candidates[0] ?? BRAND;
}

/** Açıklamaya, sınırı aşmayan ilk ek cümleyi ekler (aday listesi uzundan kısaya verilir). */
export function withSuffix(text: string, suffix: string | string[], max = 160): string {
  for (const s of Array.isArray(suffix) ? suffix : [suffix]) {
    const joined = `${text.trim()} ${s.trim()}`;
    if (joined.length <= max) return joined;
  }
  return text.trim();
}

export interface BuildMetadataInput {
  /** Marka hariç sayfa başlığı ya da aday listesi (ilk sığan seçilir). */
  title: string | string[];
  /** true ise başlık olduğu gibi kullanılır (marka eklenmez). */
  absoluteTitle?: boolean;
  description: string;
  /** Kök göreli yol, ör. "/hizmetlerimiz/ev-ilaclama" — self canonical olur. */
  path: string;
  image?: SeoImage;
  type?: "website" | "article";
  publishedTime?: string | null;
  modifiedTime?: string | null;
  /** İçerik eşiğini geçmemiş sayfalar: noindex (bağlantılar takip edilir). */
  noindex?: boolean;
}

/**
 * Sayfa metadata'sı. Next.js'te alt segmentin `openGraph`/`twitter` nesnesi kökü tamamen
 * değiştirdiği için locale, siteName ve görsel her sayfada yeniden verilir.
 */
export function buildMetadata(input: BuildMetadataInput): Metadata {
  const candidates = Array.isArray(input.title) ? input.title : [input.title];
  const title = input.absoluteTitle ? candidates[0] ?? BRAND : fitTitle(candidates);
  const image = input.image ?? DEFAULT_OG_IMAGE;
  const ogImage = {
    url: absoluteUrl(image.src),
    alt: image.alt,
    ...(image.width ? { width: image.width } : {}),
    ...(image.height ? { height: image.height } : {}),
  };
  const url = absoluteUrl(input.path);

  return {
    title: { absolute: title },
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: input.type ?? "website",
      locale: LOCALE,
      siteName: BRAND,
      url,
      title,
      description: input.description,
      images: [ogImage],
      ...(input.type === "article" && input.publishedTime ? { publishedTime: input.publishedTime } : {}),
      ...(input.type === "article" && input.modifiedTime ? { modifiedTime: input.modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: input.description,
      images: [ogImage.url],
    },
    // Site kapalıyken kök layout'taki noindex,nofollow geçerli kalsın diye robots yalnız noindex için yazılır.
    ...(input.noindex ? { robots: SITE_INDEXABLE ? { index: false, follow: true } : { index: false, follow: false } } : {}),
  };
}
