// Tohum veri: src/content/* → veritabanı. Tekrar çalıştırılabilir; mevcut kayıtları EZMEZ (onConflictDoNothing),
// böylece admin panelinde yapılan düzenlemeler korunur.
import { config } from "dotenv";
import { readFileSync } from "node:fs";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as s from "../src/db/schema";
import { media, serviceImage, blogImage } from "../src/content/media";
import { services } from "../src/content/services";
import { serviceDetails } from "../src/content/service-details";
import { istanbulDistricts } from "../src/content/regions";
import { districtProfiles } from "../src/content/district-profiles";
import { blogCategories, blogPosts } from "../src/content/blog";
import { faqItems } from "../src/content/faq";
config({ path: ".env.local", quiet: true });

const url = (process.env.DATABASE_URL || "").replace("sslmode=require", "sslmode=verify-full");
const client = new Client({ connectionString: url });
await client.connect();
const db = drizzle(client, { schema: s });

const ibb = JSON.parse(readFileSync("src/content/data/ibb-mahalle-bina-2017.json", "utf8")) as Record<
  string,
  { name: string; slug: string; uavt: number; age: number[]; floors: number[] }[]
>;
const count = { media: 0, services: 0, districts: 0, hoods: 0, cats: 0, posts: 0, faq: 0, settings: 0, pages: 0 };

/* Medya */
const mediaId = new Map<string, string>();
for (const [key, m] of Object.entries(media)) {
  const r = await db
    .insert(s.mediaAssets)
    .values({
      src: m.src, fileName: m.src.split("/").pop()!, mime: "image/jpeg", width: m.width, height: m.height,
      alt: m.alt, credit: "Unsplash", license: "Unsplash License", sourceUrl: m.source, focus: m.focus ?? "50% 50%", legacyKey: key,
    })
    .onConflictDoNothing()
    .returning({ id: s.mediaAssets.id });
  if (r[0]) count.media++;
  const row = r[0] ?? (await db.select({ id: s.mediaAssets.id }).from(s.mediaAssets).where(eq(s.mediaAssets.legacyKey, key)))[0];
  if (row) mediaId.set(key, row.id);
}

/* Hizmetler */
for (const sv of services) {
  const r = await db
    .insert(s.services)
    .values({
      slug: sv.slug, title: sv.title, shortTitle: sv.shortTitle, group: sv.group, icon: sv.icon, excerpt: sv.excerpt,
      detail: serviceDetails[sv.slug] ?? null, coverMediaId: mediaId.get(serviceImage[sv.slug] ?? "") ?? null,
      featured: sv.featured, sortOrder: sv.order, status: serviceDetails[sv.slug] ? "published" : "draft",
      publishedAt: serviceDetails[sv.slug] ? new Date() : null,
    })
    .onConflictDoNothing()
    .returning({ id: s.services.id });
  if (r[0]) count.services++;
}

/* İlçeler + mahalleler */
for (const d of istanbulDistricts) {
  const p = districtProfiles[d.slug];
  const r = await db
    .insert(s.districts)
    .values({ slug: d.slug, name: d.name, side: d.side, about: p?.about, pestContext: p?.pestContext, neighbours: p?.neighbours ?? [] })
    .onConflictDoNothing()
    .returning({ id: s.districts.id });
  if (r[0]) count.districts++;
  const did = r[0]?.id ?? (await db.select({ id: s.districts.id }).from(s.districts).where(eq(s.districts.slug, d.slug)))[0]!.id;
  const rows = (ibb[d.slug] ?? []).map((m) => ({
    districtId: did, slug: m.slug, name: m.name, uavt: m.uavt, buildingStats: { age: m.age, floors: m.floors },
  }));
  if (rows.length) {
    const ins = await db.insert(s.neighbourhoods).values(rows).onConflictDoNothing().returning({ id: s.neighbourhoods.id });
    count.hoods += ins.length;
  }
}

/* Blog */
const catId = new Map<string, string>();
for (const [i, c] of blogCategories.entries()) {
  const r = await db.insert(s.blogCategories).values({ slug: c.slug, title: c.title, sortOrder: i }).onConflictDoNothing().returning({ id: s.blogCategories.id });
  if (r[0]) count.cats++;
  catId.set(c.slug, r[0]?.id ?? (await db.select({ id: s.blogCategories.id }).from(s.blogCategories).where(eq(s.blogCategories.slug, c.slug)))[0]!.id);
}
for (const p of blogPosts) {
  const r = await db
    .insert(s.blogPosts)
    .values({
      slug: p.slug, title: p.title, excerpt: p.excerpt, categoryId: catId.get(p.category) ?? null,
      coverMediaId: mediaId.get(blogImage[p.slug] ?? "") ?? null, readingMinutes: p.readingMinutes, status: "draft",
    })
    .onConflictDoNothing()
    .returning({ id: s.blogPosts.id });
  if (r[0]) count.posts++;
}

/* SSS (yalnız tablo boşsa) */
const faqExisting = await db.select({ id: s.faqItems.id }).from(s.faqItems).limit(1);
if (!faqExisting.length) {
  const ins = await db
    .insert(s.faqItems)
    .values(faqItems.map((f, i) => ({ question: f.question, answer: f.answer, topic: f.scope, sortOrder: i })))
    .returning({ id: s.faqItems.id });
  count.faq = ins.length;
}

/* Site ayarları (doğrulanmamış alanlar boş) */
const v = (value: unknown, verified = false) => ({ value, verified });
const settings: Record<string, unknown> = {
  "business.name": v("İST İlaçlama", true),
  "business.legalName": v(null),
  "contact.phone": v(null),
  "contact.whatsapp": v(null),
  "contact.email": v(null),
  "contact.address": v(null),
  "contact.workingHours": v(null),
  "contact.serviceArea": v("İstanbul"),
  "social.links": v([], true),
  "kvkk.consentVersion": v("taslak-2026-10", true),
};
for (const [key, value] of Object.entries(settings)) {
  const r = await db.insert(s.siteSettings).values({ key, value }).onConflictDoNothing().returning({ key: s.siteSettings.key });
  if (r[0]) count.settings++;
}

/* Statik sayfalar (taslak) */
for (const [slug, title] of [
  ["kurumsal", "Kurumsal"], ["iletisim", "İletişim"], ["kvkk-aydinlatma-metni", "KVKK Aydınlatma Metni"],
  ["gizlilik-politikasi", "Gizlilik Politikası"], ["cerez-politikasi", "Çerez Politikası"],
] as const) {
  const r = await db.insert(s.pages).values({ slug, title }).onConflictDoNothing().returning({ id: s.pages.id });
  if (r[0]) count.pages++;
}

console.log("Eklenen kayıtlar:", count);
await client.end();
