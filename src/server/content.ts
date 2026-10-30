import "server-only";

import { blogCategories, blogPosts } from "@/content/blog";
import { faqItems } from "@/content/faq";
import { istanbulDistricts } from "@/content/regions";
import { serviceGroups, services, sectorCards } from "@/content/services";
import { mainNav, legalNav } from "@/content/settings";
import { SHOW_DRAFT_CONTENT } from "@/lib/site";
import type { PublishStatus, ServiceGroupKey } from "@/types/content";

/**
 * İçerik repository'si. Bileşenler veriye yalnız buradan erişir.
 * Sprint 2+ bu fonksiyonların içi Drizzle sorgularıyla değiştirilecek; imzalar sabit kalır.
 */

const visible = (status: PublishStatus) =>
  status === "published" || (SHOW_DRAFT_CONTENT && (status === "draft" || status === "review"));

export { getSiteSettings } from "./settings";

export async function getNavigation() {
  return { main: mainNav, legal: legalNav };
}

export async function listServiceGroups() {
  return serviceGroups;
}

export async function listServices(opts: { group?: ServiceGroupKey; featured?: boolean } = {}) {
  return services
    .filter((s) => visible(s.status))
    .filter((s) => (opts.group ? s.group === opts.group : true))
    .filter((s) => (opts.featured ? s.featured : true))
    .sort((a, b) => a.order - b.order);
}

export async function getService(slug: string) {
  const item = services.find((s) => s.slug === slug);
  return item && visible(item.status) ? item : null;
}

export async function listSectorCards() {
  return sectorCards;
}

export async function listDistricts() {
  return istanbulDistricts;
}

export async function getDistrict(slug: string) {
  return istanbulDistricts.find((d) => d.slug === slug) ?? null;
}

export async function listBlogCategories() {
  return blogCategories;
}

export async function listBlogPosts(limit?: number) {
  const items = blogPosts.filter((p) => visible(p.status));
  return typeof limit === "number" ? items.slice(0, limit) : items;
}

export async function getBlogPost(slug: string) {
  const item = blogPosts.find((p) => p.slug === slug);
  return item && visible(item.status) ? item : null;
}

export async function listFaq(scope: "genel" = "genel") {
  return faqItems.filter((f) => f.scope === scope);
}
