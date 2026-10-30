import { sql } from "drizzle-orm";
import { db, schema } from "@/db";
import { requireUser } from "@/lib/auth/session";
import { logout } from "./actions";
import { Sidebar, type NavEntry } from "./sidebar";

export const dynamic = "force-dynamic";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const user = await requireUser();
  const unread = (await db.select({ n: sql<number>`count(*)::int` }).from(schema.leads).where(sql`${schema.leads.readAt} is null and ${schema.leads.status} <> 'spam'`))[0]?.n ?? 0;
  const items: NavEntry[] = [
    { href: "/admin", label: "Gösterge paneli", icon: "dashboard" },
    { href: "/admin/teklifler", label: "Teklif başvuruları", icon: "inbox", badge: unread },
    { href: "/admin/hizmetler", label: "Hizmetler", icon: "services", soon: true },
    { href: "/admin/bolgeler", label: "Hizmet bölgeleri", icon: "regions", soon: true },
    { href: "/admin/blog", label: "Blog", icon: "blog", soon: true },
    { href: "/admin/sss", label: "SSS", icon: "faq", soon: true },
    { href: "/admin/medya", label: "Medya kütüphanesi", icon: "media", soon: true },
    { href: "/admin/sayfalar", label: "Sayfalar", icon: "pages", soon: true },
    { href: "/admin/ayarlar", label: "Site ayarları", icon: "settings" },
    { href: "/admin/kullanicilar", label: "Kullanıcılar", icon: "users", soon: true },
  ];
  return (
    <div className="lg:pl-64">
      <Sidebar items={items} user={{ name: user.name, role: user.role }} logoutAction={logout} />
      <main className="mx-auto max-w-[1280px] px-4 py-8 sm:px-8">{children}</main>
    </div>
  );
}
