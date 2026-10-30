"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen, Building2, FileText, HelpCircle, Image as ImageIcon, Inbox, LayoutDashboard, LogOut, MapPin, Menu, Settings, Users, X,
} from "lucide-react";
import { cn } from "@/lib/utils";

export type NavEntry = { href: string; label: string; icon: keyof typeof ICONS; badge?: number; soon?: boolean };
const ICONS = { dashboard: LayoutDashboard, inbox: Inbox, services: Building2, regions: MapPin, blog: BookOpen, faq: HelpCircle, media: ImageIcon, pages: FileText, settings: Settings, users: Users };

export function Sidebar({ items, user, logoutAction }: { items: NavEntry[]; user: { name: string; role: string }; logoutAction: () => Promise<void> }) {
  const path = usePathname();
  const [open, setOpen] = useState(false);
  const nav = (
    <nav aria-label="Yönetim menüsü" className="flex h-full flex-col">
      <div className="px-5 pb-6 pt-6">
        <Link href="/admin" className="font-display text-lg font-extrabold text-white">
          istilaclama<span className="text-[#5fd3bc]">.panel</span>
        </Link>
      </div>
      <ul className="flex-1 space-y-1 px-3">
        {items.map((it) => {
          const Icon = ICONS[it.icon];
          const active = it.href === "/admin" ? path === "/admin" : path.startsWith(it.href);
          return (
            <li key={it.href}>
              {it.soon ? (
                <span className="flex min-h-11 cursor-not-allowed items-center gap-3 rounded-xl px-3 text-sm text-white/35" aria-disabled="true">
                  <Icon aria-hidden="true" className="size-4" /> {it.label}
                  <span className="ml-auto rounded-full bg-white/10 px-2 py-0.5 text-[0.625rem] uppercase tracking-wider">yakında</span>
                </span>
              ) : (
                <Link
                  href={it.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors",
                    active ? "bg-white/12 text-white" : "text-white/70 hover:bg-white/8 hover:text-white",
                  )}
                >
                  <Icon aria-hidden="true" className={cn("size-4", active && "text-[#5fd3bc]")} /> {it.label}
                  {!!it.badge && <span className="ml-auto rounded-full bg-[#2fb59b] px-2 py-0.5 text-xs font-bold text-[#04201b]">{it.badge}</span>}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
      <div className="border-t border-white/10 p-4">
        <p className="truncate text-sm font-semibold text-white">{user.name}</p>
        <p className="text-xs uppercase tracking-wider text-white/45">{user.role}</p>
        <form action={logoutAction} className="mt-3">
          <button className="flex min-h-10 w-full items-center gap-2 rounded-xl px-3 text-sm text-white/70 hover:bg-white/8 hover:text-white">
            <LogOut aria-hidden="true" className="size-4" /> Çıkış yap
          </button>
        </form>
      </div>
    </nav>
  );
  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 bg-[#071b24] lg:block">{nav}</aside>
      <div className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-surface px-4 lg:hidden">
        <span className="font-display font-extrabold">istilaclama<span className="text-primary">.panel</span></span>
        <button type="button" aria-label="Menüyü aç" onClick={() => setOpen(true)} className="grid size-11 place-items-center rounded-xl border border-border">
          <Menu aria-hidden="true" className="size-5" />
        </button>
      </div>
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button aria-label="Menüyü kapat" className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-[#071b24]">
            <button type="button" aria-label="Menüyü kapat" onClick={() => setOpen(false)} className="absolute right-3 top-4 grid size-10 place-items-center rounded-xl text-white/80">
              <X aria-hidden="true" className="size-5" />
            </button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
