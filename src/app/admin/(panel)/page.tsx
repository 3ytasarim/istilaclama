import Link from "next/link";
import { desc, sql } from "drizzle-orm";
import { ArrowUpRight, BookOpen, Building2, Inbox, MapPin } from "lucide-react";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/auth/session";
import { fmtDate, LEAD_STATUS } from "@/lib/admin/leads";
import { cn } from "@/lib/utils";

export const metadata = { title: "Gösterge paneli" };

const count = async (q: Promise<{ n: number }[]>) => (await q)[0]?.n ?? 0;

export default async function Dashboard() {
  const user = await requireUser();
  const n = sql<number>`count(*)::int`;
  const [newLeads, weekLeads, services, published, districts, hoods, posts, recent] = await Promise.all([
    count(db.select({ n }).from(schema.leads).where(sql`${schema.leads.status} = 'new'`)),
    count(db.select({ n }).from(schema.leads).where(sql`${schema.leads.createdAt} > now() - interval '7 days'`)),
    count(db.select({ n }).from(schema.services)),
    count(db.select({ n }).from(schema.services).where(sql`${schema.services.status} = 'published'`)),
    count(db.select({ n }).from(schema.districts)),
    count(db.select({ n }).from(schema.neighbourhoods)),
    count(db.select({ n }).from(schema.blogPosts)),
    db.select().from(schema.leads).orderBy(desc(schema.leads.createdAt)).limit(6),
  ]);
  const cards = [
    { label: "Yeni teklif", value: newLeads, sub: `Son 7 günde ${weekLeads} başvuru`, icon: Inbox, href: "/admin/teklifler" },
    { label: "Hizmet", value: services, sub: `${published} yayında · ${services - published} taslak`, icon: Building2 },
    { label: "Bölge sayfası", value: districts + hoods, sub: `${districts} ilçe · ${hoods} mahalle`, icon: MapPin },
    { label: "Blog yazısı", value: posts, sub: "İçerikler taslak", icon: BookOpen },
  ];
  return (
    <>
      <h1 className="font-display text-2xl font-bold text-foreground">Merhaba {user.name.split(" ")[0]}</h1>
      <p className="mt-1 text-muted">Sitenizin özeti ve son teklif başvuruları.</p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, sub, icon: Icon, href }) => (
          <li key={label} className="rounded-2xl border border-border bg-surface p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="grid size-10 place-items-center rounded-xl bg-mint text-on-mint"><Icon aria-hidden="true" className="size-5" /></span>
              {href && <Link href={href} aria-label={`${label} sayfası`} className="text-muted hover:text-primary"><ArrowUpRight className="size-5" /></Link>}
            </div>
            <p className="mt-4 font-display text-3xl font-extrabold tabular-nums text-foreground">{value.toLocaleString("tr-TR")}</p>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="mt-0.5 text-xs text-muted">{sub}</p>
          </li>
        ))}
      </ul>
      <section className="mt-10 rounded-2xl border border-border bg-surface shadow-xs">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display font-bold text-foreground">Son başvurular</h2>
          <Link href="/admin/teklifler" className="text-sm font-semibold text-primary hover:underline">Tümü</Link>
        </div>
        {recent.length === 0 ? (
          <p className="px-5 py-10 text-center text-muted">Henüz başvuru yok. Sitedeki teklif formu doldurulduğunda burada görünecek.</p>
        ) : (
          <ul className="divide-y divide-border">
            {recent.map((l) => (
              <li key={l.id}>
                <Link href={`/admin/teklifler/${l.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 hover:bg-sunken">
                  <span className={cn("size-2 rounded-full", l.readAt ? "bg-transparent" : "bg-[#2fb59b]")} />
                  <span className="font-medium text-foreground">{l.name}</span>
                  <span className="text-sm text-muted">{[l.serviceSlug, l.districtSlug].filter(Boolean).join(" · ")}</span>
                  <span className={cn("ml-auto rounded-full px-2.5 py-0.5 text-xs font-semibold", LEAD_STATUS[l.status]?.cls)}>{LEAD_STATUS[l.status]?.label}</span>
                  <span className="text-xs text-muted">{fmtDate(l.createdAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
