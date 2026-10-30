import type { SiteSettings } from "@/types/content";
import { verified } from "@/lib/contact";
import { SITE_URL, absoluteUrl } from "@/lib/site";
import { BRAND } from "@/lib/seo/metadata";

/**
 * JSON-LD üreticileri. Kurallar:
 * - İşletme bilgisi yalnız `verified()` ile; doğrulanmamış telefon, adres, koordinat, puan, yorum yazılmaz.
 * - Fiziksel adres doğrulanmadığı için LocalBusiness yerine Organization kullanılır (bkz. docs/SEO_GEO_CHECKLIST.md).
 * - FAQPage yalnız soru-cevapların sayfada görünür olduğu yerlerde kullanılır.
 */

type Json = Record<string, unknown>;
const CONTEXT = "https://schema.org";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const LOGO_PATH = "/images/brand/istilaclama-logo.png";

const orgRef = { "@id": ORGANIZATION_ID };
const istanbul = { "@type": "City", name: "İstanbul", sameAs: "https://www.wikidata.org/wiki/Q406" };

export function organizationJsonLd(settings: SiteSettings): Json {
  const phone = verified(settings.phone);
  const email = verified(settings.email);
  const address = verified(settings.address);
  const legalName = verified(settings.legalName);
  const sameAs = settings.social.map((s) => s.href).filter(Boolean);
  return {
    "@context": CONTEXT,
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: settings.businessName,
    ...(legalName ? { legalName } : {}),
    url: absoluteUrl("/"),
    logo: { "@type": "ImageObject", url: absoluteUrl(LOGO_PATH) },
    description: "İstanbul'da ev, apartman, site ve işletmeler için haşere kontrolü ve ilaçlama hizmetleri.",
    areaServed: istanbul,
    knowsAbout: ["Haşere kontrolü", "Böcek ilaçlama", "Kemirgen kontrolü", "Entegre zararlı yönetimi"],
    ...(phone ? { telephone: phone } : {}),
    ...(email ? { email } : {}),
    ...(address
      ? { address: { "@type": "PostalAddress", streetAddress: address.replace(/\s+/g, " "), addressLocality: "İstanbul", addressCountry: "TR" } }
      : {}),
    ...(phone
      ? { contactPoint: { "@type": "ContactPoint", telephone: phone, contactType: "customer service", areaServed: "TR", availableLanguage: "Turkish" } }
      : {}),
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteJsonLd(): Json {
  // Sitede arama sayfası olmadığı için SearchAction eklenmez.
  return {
    "@context": CONTEXT,
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: BRAND,
    url: absoluteUrl("/"),
    inLanguage: "tr-TR",
    publisher: orgRef,
  };
}

export interface Crumb {
  name: string;
  path: string;
}

/** "Ana Sayfa" otomatik eklenir. */
export function breadcrumbJsonLd(items: Crumb[]): Json {
  const all = [{ name: "Ana Sayfa", path: "/" }, ...items];
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: all.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: absoluteUrl(c.path) })),
  };
}

export function serviceJsonLd(input: {
  name: string;
  description: string;
  path: string;
  serviceType: string;
  image?: string;
  /** Varsayılan: İstanbul */
  areaServed?: Json;
}): Json {
  return {
    "@context": CONTEXT,
    "@type": "Service",
    name: input.name,
    serviceType: input.serviceType,
    description: input.description,
    url: absoluteUrl(input.path),
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    provider: orgRef,
    areaServed: input.areaServed ?? istanbul,
  };
}

/** İlçe / mahalle için hizmet alanı (İstanbul'a bağlı). */
export function areaJsonLd(name: string, parent?: string): Json {
  return {
    "@type": "AdministrativeArea",
    name: parent ? `${name}, ${parent}, İstanbul` : `${name}, İstanbul`,
    containedInPlace: istanbul,
  };
}

export function blogPostingJsonLd(input: {
  headline: string;
  description: string;
  path: string;
  image?: string;
  section?: string;
  datePublished?: string | null;
  dateModified?: string | null;
  citations?: { name: string; publisher: string; url: string }[];
}): Json {
  const url = absoluteUrl(input.path);
  return {
    "@context": CONTEXT,
    "@type": "BlogPosting",
    headline: input.headline,
    description: input.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    inLanguage: "tr-TR",
    ...(input.image ? { image: absoluteUrl(input.image) } : {}),
    ...(input.section ? { articleSection: input.section } : {}),
    ...(input.datePublished ? { datePublished: input.datePublished } : {}),
    ...(input.dateModified ? { dateModified: input.dateModified } : {}),
    author: orgRef,
    publisher: orgRef,
    ...(input.citations?.length
      ? { citation: input.citations.map((c) => ({ "@type": "CreativeWork", name: c.name, publisher: { "@type": "Organization", name: c.publisher }, url: c.url })) }
      : {}),
  };
}

/** Yalnız soru-cevapları sayfada görünür olan sayfalarda kullanın. */
export function faqPageJsonLd(items: { q: string; a: string }[]): Json {
  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]): Json {
  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, url: absoluteUrl(it.path) })),
  };
}

/** AboutPage, ContactPage, CollectionPage gibi sayfa türleri. */
export function webPageJsonLd(input: { type?: string; name: string; description: string; path: string }): Json {
  return {
    "@context": CONTEXT,
    "@type": input.type ?? "WebPage",
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    inLanguage: "tr-TR",
    isPartOf: { "@id": WEBSITE_ID },
    about: orgRef,
  };
}
