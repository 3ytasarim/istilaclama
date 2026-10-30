import Link from "next/link";
import { notFound } from "next/navigation";
import { asc, eq } from "drizzle-orm";
import { ArrowLeft, MessageCircle, Phone } from "lucide-react";
import { z } from "zod";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/auth/session";
import { fmtDate, LEAD_STATUS, LEAD_STATUSES } from "@/lib/admin/leads";
import { cn } from "@/lib/utils";
import { listDistricts, listServices } from "@/server/content";
import { addLeadNote, setLeadStatus } from "../actions";

export const metadata = { title: "Başvuru detayı" };

export default async function LeadDetail({ params }: { params: Promise<{ id: string }> }) {
  await requireUser();
  const id = z.string().uuid().safeParse((await params).id);
  if (!id.success) notFound();
  const lead = (await db.select().from(schema.leads).where(eq(schema.leads.id, id.data)).limit(1))[0];
  if (!lead) notFound();
  if (!lead.readAt) await db.update(schema.leads).set({ readAt: new Date() }).where(eq(schema.leads.id, lead.id));
  const notes = await db
    .select({ id: schema.leadNotes.id, note: schema.leadNotes.note, createdAt: schema.leadNotes.createdAt, author: schema.users.name })
    .from(schema.leadNotes)
    .leftJoin(schema.users, eq(schema.users.id, schema.leadNotes.userId))
    .where(eq(schema.leadNotes.leadId, lead.id))
    .orderBy(asc(schema.leadNotes.createdAt));
  const [allServices, allDistricts] = await Promise.all([listServices(), listDistricts()]);
  const serviceName = allServices.find((x) => x.slug === lead.serviceSlug)?.title ?? lead.serviceSlug;
  const districtName = allDistricts.find((x) => x.slug === lead.districtSlug)?.name ?? lead.districtSlug;
  const waDigits = lead.phone.replace(/\D/g, "").replace(/^0/, "90");
  const rows: [string, string | null][] = [
    ["Telefon", lead.phone],
    ["E-posta", lead.email],
    ["Hizmet", serviceName],
    ["Alan türü", lead.placeType],
    ["İlçe", districtName],
    ["Mahalle", lead.neighbourhood],
    ["Kaynak sayfa", lead.sourcePath],
    ["KVKK onayı", lead.kvkkConsent ? `Verildi (metin sürümü: ${lead.consentVersion})` : "Yok"],
    ["Başvuru tarihi", fmtDate(lead.createdAt)],
  ];

  return (
    <>
      <Link href="/admin/teklifler" className="inline-flex min-h-10 items-center gap-1.5 text-sm text-muted hover:text-foreground">
        <ArrowLeft aria-hidden="true" className="size-4" /> Başvurular
      </Link>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <h1 className="font-display text-2xl font-bold text-foreground">{lead.name}</h1>
        <span className={cn("rounded-full px-3 py-1 text-xs font-semibold", LEAD_STATUS[lead.status]?.cls)}>{LEAD_STATUS[lead.status]?.label}</span>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
          <dl className="grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {rows.map(([k, v]) => (
              <div key={k}>
                <dt className="text-xs font-semibold uppercase tracking-wider text-muted">{k}</dt>
                <dd className="mt-0.5 text-foreground">{v || "—"}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 border-t border-border pt-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted">Mesaj</p>
            <p className="mt-1 whitespace-pre-line text-foreground">{lead.message || "—"}</p>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <a
              href={`tel:${lead.phone.replace(/[^\d+]/g, "")}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-navy px-4 text-sm font-semibold text-white dark:bg-primary dark:text-primary-foreground"
            >
              <Phone aria-hidden="true" className="size-4" /> Ara
            </a>
            <a
              href={`https://wa.me/${waDigits}`}
              target="_blank"
              rel="noopener"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-[#25d366] px-4 text-sm font-semibold text-[#052e16]"
            >
              <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp
            </a>
          </div>
        </section>

        <div className="space-y-6">
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <h2 className="font-display font-bold text-foreground">Durum</h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {LEAD_STATUSES.map((s) => (
                <form key={s} action={setLeadStatus.bind(null, lead.id, s)}>
                  <button
                    disabled={lead.status === s}
                    className={cn(
                      "min-h-10 rounded-full border px-3.5 text-sm font-medium transition-colors",
                      lead.status === s ? "border-transparent " + LEAD_STATUS[s]!.cls : "border-border hover:bg-mint",
                    )}
                  >
                    {LEAD_STATUS[s]!.label}
                  </button>
                </form>
              ))}
            </div>
          </section>
          <section className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
            <h2 className="font-display font-bold text-foreground">İç notlar</h2>
            <ul className="mt-4 space-y-3">
              {notes.length === 0 && <li className="text-sm text-muted">Henüz not yok.</li>}
              {notes.map((n) => (
                <li key={n.id} className="rounded-xl bg-sunken p-3 text-sm">
                  <p className="whitespace-pre-line text-foreground">{n.note}</p>
                  <p className="mt-1 text-xs text-muted">
                    {n.author ?? "—"} · {fmtDate(n.createdAt)}
                  </p>
                </li>
              ))}
            </ul>
            <form action={addLeadNote.bind(null, lead.id)} className="mt-4 space-y-2">
              <label htmlFor="note" className="sr-only">
                Not ekle
              </label>
              <textarea
                id="note"
                name="note"
                required
                maxLength={2000}
                rows={3}
                placeholder="Görüşme notu, teklif tutarı, randevu…"
                className="w-full rounded-xl border border-border bg-surface p-3 text-sm outline-none focus:border-accent"
              />
              <button className="min-h-10 rounded-xl bg-navy px-4 text-sm font-semibold text-white dark:bg-primary dark:text-primary-foreground">
                Notu kaydet
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}
