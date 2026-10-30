"use server";

import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { db, schema } from "@/db";
import { rateLimited } from "@/lib/security/rate-limit";
import { listDistricts, listServices } from "@/server/content";

export type QuoteState = { ok?: boolean; error?: string; fieldErrors?: Record<string, string> };

const CONSENT_VERSION = "taslak-2026-10";
const PLACE_TYPES = ["Ev / daire", "Apartman / site", "Ofis / işyeri", "Restoran / kafe / otel", "Depo / fabrika", "Diğer"] as const;

const schemaInput = z.object({
  hizmet: z.string().trim().max(80).optional(),
  alan: z.enum(PLACE_TYPES, { message: "Alan türünü seçin." }),
  ilce: z.string().trim().min(1, "İlçe seçin.").max(60),
  mahalle: z.string().trim().max(80).optional(),
  ad: z.string().trim().min(3, "Ad soyad en az 3 karakter olmalı.").max(80),
  telefon: z
    .string()
    .trim()
    .transform((v) => v.replace(/[^\d+]/g, ""))
    .refine((v) => /^(\+?90)?0?5\d{9}$/.test(v) || /^(\+?90)?0?[2-4]\d{9}$/.test(v), "Geçerli bir telefon numarası girin."),
  eposta: z.union([z.literal(""), z.string().trim().email("Geçerli bir e-posta girin.").max(120)]).optional(),
  mesaj: z.string().trim().max(1500).optional(),
  kvkk: z.literal("on", { message: "Devam etmek için aydınlatma metnini onaylayın." }),
  kaynak: z.string().max(200).optional(),
  // spam korumaları
  website: z.string().max(0).optional(),
  t: z.coerce.number(),
});

export async function submitQuote(_: QuoteState, form: FormData): Promise<QuoteState> {
  const raw = Object.fromEntries(form.entries());
  const parsed = schemaInput.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const k = String(issue.path[0]);
      if (k === "website" || k === "t") return { ok: true }; // bot: sessizce kabul et
      fieldErrors[k] ??= issue.message;
    }
    return { error: "Lütfen işaretli alanları kontrol edin.", fieldErrors };
  }
  const d = parsed.data;
  // Çok hızlı gönderim = bot
  if (Date.now() - d.t < 2500) return { ok: true };

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const ipHash = createHash("sha256").update(`lead:${ip}:${process.env.SESSION_SECRET ?? ""}`).digest("hex").slice(0, 32);
  if (rateLimited(`lead:${ipHash}`, 5, 30 * 60_000)) {
    return { error: "Kısa sürede çok fazla başvuru gönderildi. Lütfen daha sonra tekrar deneyin." };
  }

  const [services, districts] = await Promise.all([listServices(), listDistricts()]);
  const service = services.find((s) => s.slug === d.hizmet)?.slug ?? null;
  const district = districts.find((x) => x.slug === d.ilce)?.slug ?? null;
  if (!district) return { error: "Lütfen listeden bir ilçe seçin.", fieldErrors: { ilce: "İlçe seçin." } };

  await db.insert(schema.leads).values({
    name: d.ad,
    phone: d.telefon,
    email: d.eposta || null,
    serviceSlug: service,
    districtSlug: district,
    neighbourhood: d.mahalle || null,
    placeType: d.alan,
    message: d.mesaj || null,
    sourcePath: d.kaynak?.startsWith("/") ? d.kaynak : null,
    kvkkConsent: true,
    consentVersion: CONSENT_VERSION,
    ipHash,
  });
  return { ok: true };
}
