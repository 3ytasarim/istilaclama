import type { SiteSettings } from "@/types/content";
import { telHref } from "@/lib/utils";

/** Yalnız doğrulanmış değeri döndürür; aksi halde null (arayüz öğeyi gizler). */
export function verified<T>(field: { value: T | null; verified: boolean }): T | null {
  return field.verified ? field.value : null;
}

export function phoneLink(settings: SiteSettings) {
  const phone = verified(settings.phone);
  return phone ? { label: phone, href: telHref(phone) } : null;
}

/**
 * Merkezi WhatsApp bağlantısı. Numara doğrulanmadıkça null döner —
 * placeholder modunda hiçbir üçüncü kişiye mesaj yönlendirilmez.
 */
export function whatsappHref(settings: SiteSettings, ctx: { service?: string; region?: string } = {}) {
  const number = verified(settings.whatsapp);
  if (!number) return null;
  const parts = [`Merhaba, ${settings.businessName} üzerinden bilgi almak istiyorum.`];
  if (ctx.service) parts.push(`Hizmet: ${ctx.service}.`);
  if (ctx.region) parts.push(`Bölge: ${ctx.region}.`);
  return `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(parts.join(" "))}`;
}

/** Serbest metinli WhatsApp bağlantısı (asistan). Numara doğrulanmadıysa null. */
export function whatsappLink(settings: SiteSettings, text: string) {
  const number = verified(settings.whatsapp);
  return number ? `https://wa.me/${number.replace(/\D/g, "")}?text=${encodeURIComponent(text)}` : null;
}
