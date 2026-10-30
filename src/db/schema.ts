import { sql } from "drizzle-orm";
import {
  boolean, index, integer, jsonb, pgEnum, pgTable, text, timestamp, uniqueIndex, uuid,
} from "drizzle-orm/pg-core";

/* ───────── Ortak ───────── */
const id = () => uuid("id").primaryKey().defaultRandom();
const createdAt = () => timestamp("created_at", { withTimezone: true }).notNull().defaultNow();
const updatedAt = () => timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date());

export const publishStatus = pgEnum("publish_status", ["draft", "review", "published", "archived"]);
export const userRole = pgEnum("user_role", ["admin", "editor", "seo"]);
export const leadStatus = pgEnum("lead_status", ["new", "contacted", "quoted", "completed", "spam"]);
export const istanbulSide = pgEnum("istanbul_side", ["anadolu", "avrupa"]);

/* ───────── Kimlik ───────── */
export const users = pgTable("users", {
  id: id(),
  email: text("email").notNull(),
  name: text("name").notNull(),
  passwordHash: text("password_hash").notNull(),
  role: userRole("role").notNull().default("editor"),
  isActive: boolean("is_active").notNull().default(true),
  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("users_email_uq").on(sql`lower(${t.email})`)]);

export const sessions = pgTable("sessions", {
  /** Çerezdeki rastgele belirtecin SHA-256 özeti (ham belirteç saklanmaz) */
  id: text("id").primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  ipHash: text("ip_hash"),
  userAgent: text("user_agent"),
  createdAt: createdAt(),
}, (t) => [index("sessions_user_idx").on(t.userId), index("sessions_expires_idx").on(t.expiresAt)]);

export const loginAttempts = pgTable("login_attempts", {
  id: id(),
  /** e-posta + ip özeti */
  key: text("key").notNull(),
  success: boolean("success").notNull(),
  createdAt: createdAt(),
}, (t) => [index("login_attempts_key_idx").on(t.key, t.createdAt)]);

/* ───────── Site ayarları ───────── */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: updatedAt(),
});

/* ───────── Medya ───────── */
export const mediaAssets = pgTable("media_assets", {
  id: id(),
  /** Herkese açık yol, ör. /images/stock/x.jpg veya /uploads/2026/10/x.webp */
  src: text("src").notNull(),
  fileName: text("file_name").notNull(),
  mime: text("mime").notNull(),
  width: integer("width").notNull(),
  height: integer("height").notNull(),
  sizeBytes: integer("size_bytes"),
  /** Üretilen türevler: [{ width, format, src }] */
  variants: jsonb("variants").$type<{ width: number; format: string; src: string }[]>().notNull().default([]),
  alt: text("alt").notNull().default(""),
  title: text("title"),
  caption: text("caption"),
  credit: text("credit"),
  license: text("license"),
  sourceUrl: text("source_url"),
  focus: text("focus").default("50% 50%"),
  isDecorative: boolean("is_decorative").notNull().default(false),
  /** Kod içi anahtar (seed eşleştirmesi için), ör. "heroTechnician" */
  legacyKey: text("legacy_key"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("media_src_uq").on(t.src), uniqueIndex("media_legacy_key_uq").on(t.legacyKey)]);

/* ───────── Hizmetler ───────── */
export const services = pgTable("services", {
  id: id(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  shortTitle: text("short_title").notNull(),
  group: text("group").notNull(),
  icon: text("icon").notNull(),
  excerpt: text("excerpt").notNull(),
  /** Detay içeriği (summary, intro, symptoms, risks, process, methods, before, after, suitableFor, gallery, related, faq) */
  detail: jsonb("detail"),
  coverMediaId: uuid("cover_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  status: publishStatus("status").notNull().default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("services_slug_uq").on(t.slug), index("services_status_idx").on(t.status, t.sortOrder)]);

/* ───────── Bölgeler ───────── */
export const districts = pgTable("districts", {
  id: id(),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  side: istanbulSide("side").notNull(),
  about: text("about"),
  pestContext: text("pest_context"),
  neighbours: text("neighbours").array().notNull().default(sql`'{}'::text[]`),
  coverMediaId: uuid("cover_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  active: boolean("active").notNull().default(true),
  status: publishStatus("status").notNull().default("published"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("districts_slug_uq").on(t.slug)]);

export const neighbourhoods = pgTable("neighbourhoods", {
  id: id(),
  districtId: uuid("district_id").notNull().references(() => districts.id, { onDelete: "cascade" }),
  slug: text("slug").notNull(),
  name: text("name").notNull(),
  uavt: integer("uavt"),
  /** İBB 2017: { age: [..3], floors: [..3] } */
  buildingStats: jsonb("building_stats").$type<{ age: number[]; floors: number[] }>(),
  /** Admin'in ekleyeceği mahalleye özel yerel not (özgün içerik) */
  localNote: text("local_note"),
  status: publishStatus("status").notNull().default("published"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("neighbourhoods_district_slug_uq").on(t.districtId, t.slug)]);

/* ───────── Blog ───────── */
export const blogCategories = pgTable("blog_categories", {
  id: id(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
}, (t) => [uniqueIndex("blog_categories_slug_uq").on(t.slug)]);

export const blogPosts = pgTable("blog_posts", {
  id: id(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  /** Güvenli (sanitize edilmiş) HTML veya yapılandırılmış blok içerik */
  body: jsonb("body"),
  categoryId: uuid("category_id").references(() => blogCategories.id, { onDelete: "set null" }),
  coverMediaId: uuid("cover_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  authorName: text("author_name"),
  readingMinutes: integer("reading_minutes").notNull().default(5),
  sources: jsonb("sources").$type<{ label: string; url: string }[]>().notNull().default([]),
  relatedServices: text("related_services").array().notNull().default(sql`'{}'::text[]`),
  status: publishStatus("status").notNull().default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  publishedAt: timestamp("published_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("blog_posts_slug_uq").on(t.slug), index("blog_posts_status_idx").on(t.status, t.publishedAt)]);

/* ───────── SSS ───────── */
export const faqItems = pgTable("faq_items", {
  id: id(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  topic: text("topic").notNull().default("genel"),
  serviceSlug: text("service_slug"),
  sortOrder: integer("sort_order").notNull().default(0),
  status: publishStatus("status").notNull().default("published"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index("faq_topic_idx").on(t.topic, t.sortOrder)]);

/* ───────── Statik sayfalar ───────── */
export const pages = pgTable("pages", {
  id: id(),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  body: jsonb("body"),
  coverMediaId: uuid("cover_media_id").references(() => mediaAssets.id, { onDelete: "set null" }),
  status: publishStatus("status").notNull().default("draft"),
  seoTitle: text("seo_title"),
  seoDescription: text("seo_description"),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [uniqueIndex("pages_slug_uq").on(t.slug)]);

/* ───────── Teklif / iletişim başvuruları ───────── */
export const leads = pgTable("leads", {
  id: id(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  serviceSlug: text("service_slug"),
  districtSlug: text("district_slug"),
  neighbourhood: text("neighbourhood"),
  placeType: text("place_type"),
  message: text("message"),
  sourcePath: text("source_path"),
  channel: text("channel").notNull().default("form"),
  status: leadStatus("status").notNull().default("new"),
  kvkkConsent: boolean("kvkk_consent").notNull(),
  consentVersion: text("consent_version").notNull(),
  ipHash: text("ip_hash"),
  readAt: timestamp("read_at", { withTimezone: true }),
  createdAt: createdAt(),
  updatedAt: updatedAt(),
}, (t) => [index("leads_status_idx").on(t.status, t.createdAt), index("leads_created_idx").on(t.createdAt)]);

export const leadNotes = pgTable("lead_notes", {
  id: id(),
  leadId: uuid("lead_id").notNull().references(() => leads.id, { onDelete: "cascade" }),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  note: text("note").notNull(),
  createdAt: createdAt(),
}, (t) => [index("lead_notes_lead_idx").on(t.leadId)]);

/* ───────── Denetim kaydı ───────── */
export const auditLogs = pgTable("audit_logs", {
  id: id(),
  userId: uuid("user_id").references(() => users.id, { onDelete: "set null" }),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id"),
  data: jsonb("data"),
  createdAt: createdAt(),
}, (t) => [index("audit_entity_idx").on(t.entity, t.createdAt)]);
