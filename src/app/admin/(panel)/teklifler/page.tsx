import Link from "next/link";
import { and, desc, eq, ilike, or, sql, type SQL } from "drizzle-orm";
import { Download, Search } from "lucide-react";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/auth/session";
import { fmtDate, LEAD_STATUS, LEAD_STATUSES } from "@/lib/admin/leads";
import { cn } from "@/lib/utils";
import { listDistricts, listServices } from "@/server/content";

export const metadata = { title: "Teklif başvuruları" };
type Props = { searchParams: Promise<{ durum?: string; q?: string }> };

export default async function LeadsPage({ searchParams }: Props) {
  await requireUser();
  const { durum, q } = await searchParams;
  const where: SQL[] = [];
  if (durum && (LEAD_STATUSES as readonly string[]).includes(durum)) where.push(eq(schema.leads.status, durum as (typeof LEAD_STATUSES)[number]));
  if (q?.trim()) {
    const like = `%${q.trim()}%`;
    where.push(
      or(ilike(schema.leads.name, like), ilike(schema.leads.phone, like), ilike(schema.leads.districtSlug, like), ilike(schema.leads.serviceSlug, like))!,
    );
  }
  const rows = await db
    .select()
    .from(schema.leads)
    .where(where.length ? and(...where) : undefined)
    .orderBy(desc(schema.leads.createdAt))
    .limit(200);
  const counts = await db.select({ status: schema.leads.status, n: sql<number>`count(*)::int` }).from(schema.leads).groupBy(schema.leads.status);
  const total = counts.reduce((a, c) => a + c.n, 0);
  const [allServices, allDistricts] = await Promise.all([listServices(), listDistricts()]);
  const svc = (slug: string | null) => allServices.find((x) => x.slug === slug)?.shortTitle ?? slug;
  const dst = (slug: string | null) => allDistricts.find((x) => x.slug === slug)?.name ?? slug;
  const tabs = [
    { k: "", label: "Tümü", n: total },
    ...LEAD_STATUSES.map((k) => ({ k, label: LEAD_STATUS[k]!.label, n: counts.find((c) => c.status === k)?.n ?? 0 })),
  ];

  return (
    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">Teklif başvuruları</h1>
          <p className="mt-1 text-muted">Sitedeki teklif formundan gelen başvurular.</p>
        </div>
        <a
          href={`/admin/teklifler-export${durum ? `?durum=${durum}` : ""}`}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border bg-surface px-4 text-sm font-semibold hover:bg-mint"
        >
          <Download aria-hidden="true" className="size-4" /> CSV indir
        </a>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-2">
        {tabs.map((t) => (
          <Link
            key={t.k || "all"}
            href={t.k ? `/admin/teklifler?durum=${t.k}` : "/admin/teklifler"}
            className={cn(
              "inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm font-medium",
              (durum ?? "") === t.k
                ? "border-navy bg-navy text-white dark:border-primary dark:bg-primary dark:text-primary-foreground"
                : "border-border bg-surface hover:bg-mint",
            )}
          >
            {t.label} <span className="text-xs opacity-70">{t.n}</span>
          </Link>
        ))}
        <form className="relative ml-auto w-full sm:w-72">
          {durum && <input type="hidden" name="durum" value={durum} />}
          <Search aria-hidden="true" className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <label className="sr-only" htmlFor="lead-q">
            Ara
          </label>
          <input
            id="lead-q"
            name="q"
            defaultValue={q}
            placeholder="İsim, telefon, ilçe…"
            className="min-h-10 w-full rounded-full border border-border bg-surface pl-10 pr-4 text-sm outline-none focus:border-accent"
          />
        </form>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-border bg-surface shadow-xs">
        {rows.length === 0 ? (
          <p className="px-5 py-14 text-center text-muted">Bu filtreyle eşleşen başvuru yok.</p>
        ) : (
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="border-b border-border bg-sunken text-xs uppercase tracking-wider text-muted">
              <tr>
                {["Ad soyad", "Telefon", "Hizmet", "Bölge", "Durum", "Tarih"].map((h) => (
                  <th key={h} className="px-5 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rows.map((l) => (
                <tr key={l.id} className={cn("hover:bg-sunken", !l.readAt && "font-semibold")}>
                  <td className="px-5 py-3">
                    <Link href={`/admin/teklifler/${l.id}`} className="flex items-center gap-2 text-foreground hover:text-primary">
                      {!l.readAt && <span className="size-2 shrink-0 rounded-full bg-[#2fb59b]" aria-label="Okunmadı" />}
                      {l.name}
                    </Link>
                  </td>
                  <td className="px-5 py-3">
                    <a href={`tel:${l.phone.replace(/[^\d+]/g, "")}`} className="hover:text-primary">
                      {l.phone}
                    </a>
                  </td>
                  <td className="px-5 py-3 text-muted">{svc(l.serviceSlug) ?? "—"}</td>
                  <td className="px-5 py-3 text-muted">{[dst(l.districtSlug), l.neighbourhood].filter(Boolean).join(" / ") || "—"}</td>
                  <td className="px-5 py-3">
                    <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", LEAD_STATUS[l.status]?.cls)}>{LEAD_STATUS[l.status]?.label}</span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3 text-muted">{fmtDate(l.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
