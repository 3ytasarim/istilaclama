import { desc, eq } from "drizzle-orm";
import { db, schema } from "@/db";
import { getCurrentUser } from "@/lib/auth/session";
import { LEAD_STATUSES } from "@/lib/admin/leads";

/** Yetkili kullanıcılar için CSV dışa aktarım (Excel uyumlu: UTF-8 BOM, ; ayraç). */
export async function GET(req: Request) {
  const user = await getCurrentUser();
  if (!user || !["admin", "editor"].includes(user.role)) return new Response("Yetkisiz", { status: 401 });
  const durum = new URL(req.url).searchParams.get("durum");
  const valid = durum && (LEAD_STATUSES as readonly string[]).includes(durum) ? (durum as (typeof LEAD_STATUSES)[number]) : null;
  const rows = await db
    .select()
    .from(schema.leads)
    .where(valid ? eq(schema.leads.status, valid) : undefined)
    .orderBy(desc(schema.leads.createdAt));

  // CSV enjeksiyonuna karşı = + - @ ile başlayan hücreleri kaçır
  const cell = (v: unknown) => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  const head = ["Tarih", "Ad soyad", "Telefon", "E-posta", "Hizmet", "Alan", "İlçe", "Mahalle", "Mesaj", "Durum", "Kaynak"];
  const lines = rows.map((r) =>
    [r.createdAt.toISOString(), r.name, r.phone, r.email, r.serviceSlug, r.placeType, r.districtSlug, r.neighbourhood, r.message, r.status, r.sourcePath]
      .map(cell)
      .join(";"),
  );
  return new Response("﻿" + [head.map(cell).join(";"), ...lines].join("\r\n"), {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="teklifler-${new Date().toISOString().slice(0, 10)}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
