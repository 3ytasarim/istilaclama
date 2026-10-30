/** Admin panelinden düzenlenen iletişim alanları — DB anahtarı ↔ SiteSettings alanı eşlemesi. */
export const CONTACT_FIELDS = {
  phone: "contact.phone",
  whatsapp: "contact.whatsapp",
  email: "contact.email",
  address: "contact.address",
  workingHours: "contact.workingHours",
} as const;

export type ContactField = keyof typeof CONTACT_FIELDS;

export const SETTINGS_TAG = "site-settings";

/** Türkiye numaralarını wa.me biçimine çevirir: "0532 123 45 67" → "905321234567". */
export function normalizeWhatsapp(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.startsWith("00")) d = d.slice(2);
  if (d.startsWith("0")) d = `9${d}`;
  if (d.length === 10 && d.startsWith("5")) d = `90${d}`;
  return d;
}
