"use server";

import { revalidatePath, updateTag } from "next/cache";
import { z } from "zod";
import { db, schema } from "@/db";
import { audit, requireUser } from "@/lib/auth/session";
import { CONTACT_FIELDS, SETTINGS_TAG, normalizeWhatsapp, type ContactField } from "@/lib/settings/contact-fields";

export type SettingsState = { ok?: boolean; message?: string; errors?: Partial<Record<ContactField, string>> };

const opt = (max: number) => z.string().trim().max(max, `En fazla ${max} karakter.`);

const input = z.object({
  phone: opt(30).refine((v) => !v || /^[+\d][\d\s()-]{6,}$/.test(v), "Geçerli bir telefon numarası girin (ör. 0216 123 45 67)."),
  whatsapp: opt(30).refine((v) => !v || /^\d{11,15}$/.test(normalizeWhatsapp(v)), "Geçerli bir cep numarası girin (ör. 0532 123 45 67)."),
  email: z.union([z.literal(""), z.string().trim().email("Geçerli bir e-posta girin.").max(120)]),
  address: opt(300),
  workingHours: opt(120),
});

export async function updateContactSettings(_prev: SettingsState, form: FormData): Promise<SettingsState> {
  const user = await requireUser(["admin"]);
  const parsed = input.safeParse(Object.fromEntries((Object.keys(CONTACT_FIELDS) as ContactField[]).map((k) => [k, String(form.get(k) ?? "")])));
  if (!parsed.success) {
    const errors: SettingsState["errors"] = {};
    for (const issue of parsed.error.issues) errors[issue.path[0] as ContactField] ??= issue.message;
    return { ok: false, message: "Lütfen işaretli alanları düzeltin.", errors };
  }

  const values: Record<ContactField, string> = { ...parsed.data, whatsapp: parsed.data.whatsapp ? normalizeWhatsapp(parsed.data.whatsapp) : "" };
  const now = new Date();
  for (const [field, key] of Object.entries(CONTACT_FIELDS) as [ContactField, string][]) {
    const value = values[field] || null;
    // Panelde girilen değer yayına onaylı sayılır; boş alan sitede gizlenir.
    const json = { value, verified: Boolean(value) };
    await db
      .insert(schema.siteSettings)
      .values({ key, value: json })
      .onConflictDoUpdate({ target: schema.siteSettings.key, set: { value: json, updatedAt: now } });
  }
  await audit(user.id, "settings.contact", "site_settings", undefined, values);

  // Ayar önbelleğini hemen geçersiz kıl ve tüm site sayfalarını yeniden üret (footer, iletişim, header, schema…)
  updateTag(SETTINGS_TAG);
  revalidatePath("/", "layout");
  return { ok: true, message: "Kaydedildi. Sitedeki tüm sayfalar güncellendi." };
}
