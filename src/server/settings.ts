import "server-only";

import { inArray } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { db, schema } from "@/db";
import { siteSettings as fallback } from "@/content/settings";
import { CONTACT_FIELDS, SETTINGS_TAG, type ContactField } from "@/lib/settings/contact-fields";
import type { SiteSettings, VerifiedValue } from "@/types/content";

type Stored = { value: unknown; verified?: boolean };

/** DB'deki iletişim ayarları (admin paneli). Önbellekli; admin kaydedince SETTINGS_TAG ile tazelenir. */
const readContact = unstable_cache(
  async (): Promise<Partial<Record<ContactField, string | null>>> => {
    const rows = await db
      .select({ key: schema.siteSettings.key, value: schema.siteSettings.value })
      .from(schema.siteSettings)
      .where(inArray(schema.siteSettings.key, Object.values(CONTACT_FIELDS)));
    const out: Partial<Record<ContactField, string | null>> = {};
    for (const [field, key] of Object.entries(CONTACT_FIELDS) as [ContactField, string][]) {
      const row = rows.find((r) => r.key === key);
      if (!row) continue;
      const v = (row.value as Stored | null)?.value;
      out[field] = typeof v === "string" && v.trim() ? v.trim() : null;
    }
    return out;
  },
  ["site-settings-contact"],
  { tags: [SETTINGS_TAG] },
);

/**
 * Site ayarları: admin panelinde girilen değer önceliklidir (girilmiş = yayına onaylı).
 * Panelde boş bırakılan alan sitede gizlenir. DB'ye ulaşılamazsa statik/env değerlerine düşer.
 */
export async function getSiteSettings(): Promise<SiteSettings> {
  let stored: Partial<Record<ContactField, string | null>> = {};
  try {
    stored = await readContact();
  } catch (e) {
    console.error("[settings] DB okunamadı, varsayılan ayarlar kullanılıyor:", (e as Error).message);
    return fallback;
  }
  // Panelde dolu alan → yayında. Boş alan → .env.local yedeği (SITE_PHONE / WHATSAPP_NUMBER), o da yoksa gizli.
  const pick = (field: ContactField): VerifiedValue<string> => {
    const value = stored[field];
    return value ? { value, verified: true } : fallback[field];
  };
  return {
    ...fallback,
    phone: pick("phone"),
    whatsapp: pick("whatsapp"),
    email: pick("email"),
    address: pick("address"),
    workingHours: pick("workingHours"),
  };
}
