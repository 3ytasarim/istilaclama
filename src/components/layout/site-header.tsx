"use client";

/*
 * Kaynak: 21st.dev "Mega Menu Navbar" (anelkabag/navbar2) — yüzen kart + kart içinde açılan mega menü.
 * Uyarlama: Türkçe içerik, hizmet grupları/ilçe verisi, next/image, Escape/dış tıklama/rota değişiminde kapanma,
 * hover ile açılma, dil seçici ve sosyal ikonlar kaldırıldı (doğrulanmış hesap yok).
 */

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, MapPin, Menu, MessageCircle, Phone, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { cn } from "@/lib/utils";
import type { HeaderData } from "@/components/layout/header-data";

type MenuKey = "services" | "regions" | "guide";

export function SiteHeader({ data }: { data: HeaderData }) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const cardRef = useRef<HTMLDivElement>(null);

  // Rota değişince her şeyi kapat
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpenMenu(null);
    setMobileOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    const onClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [openMenu, mobileOpen]);

  const isActive = (href: string) => pathname.startsWith(href);
  const expanded = Boolean(openMenu) || mobileOpen;

  return (
    <header className="sticky top-0 z-50 h-[var(--header-h)]">
      <div className="absolute inset-x-0 top-0 flex justify-center px-3 pt-3 sm:px-5 sm:pt-4">
        <div
          ref={cardRef}
          onMouseLeave={() => setOpenMenu(null)}
          className={cn(
            "w-full max-w-[1400px] overflow-hidden rounded-[1.75rem] border bg-white/95 backdrop-blur-xl transition-shadow duration-500 dark:bg-surface/95",
            scrolled || expanded
              ? "border-border shadow-[0_1px_2px_rgb(16_51_66/0.05),0_24px_48px_-16px_rgb(16_51_66/0.25)]"
              : "border-white/60 shadow-[0_1px_2px_rgb(16_51_66/0.04),0_12px_32px_-8px_rgb(16_51_66/0.18)] dark:border-border",
          )}
        >
          {/* Üst satır */}
          <div className="flex h-[68px] items-center justify-between gap-4 pl-4 pr-3 sm:h-[80px] sm:pl-6 sm:pr-4 xl:h-[100px] xl:pl-7">
            <Logo />

            <nav aria-label="Ana menü" className="hidden items-center gap-0.5 lg:flex">
              {data.nav.map((item) => {
                const base =
                  "flex min-h-11 items-center gap-1 whitespace-nowrap rounded-full px-3 text-[0.9375rem] font-medium transition-colors min-[1440px]:px-4";
                if (!item.children) {
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onMouseEnter={() => setOpenMenu(null)}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      className={cn(
                        base,
                        item.wideOnly && "hidden min-[1440px]:flex",
                        isActive(item.href)
                          ? "bg-mint text-on-mint"
                          : "text-foreground/70 hover:bg-sunken hover:text-foreground",
                      )}
                    >
                      <span className="min-[1440px]:hidden">{item.short ?? item.label}</span>
                      <span className="hidden min-[1440px]:inline">{item.label}</span>
                    </Link>
                  );
                }
                const key = item.children;
                const isOpen = openMenu === key;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => setOpenMenu((cur) => (cur === key ? null : key))}
                    onMouseEnter={() => setOpenMenu(key)}
                    aria-expanded={isOpen}
                    aria-controls={`mega-${key}`}
                    className={cn(
                      base,
                      isOpen
                        ? "bg-sunken text-foreground"
                        : isActive(item.href)
                          ? "text-on-mint"
                          : "text-foreground/70 hover:bg-sunken hover:text-foreground",
                    )}
                  >
                    <span className="min-[1440px]:hidden">{item.short ?? item.label}</span>
                    <span className="hidden min-[1440px]:inline">{item.label}</span>
                    <ChevronDown
                      aria-hidden="true"
                      className={cn("size-4 transition-transform duration-300", isOpen && "rotate-180")}
                    />
                  </button>
                );
              })}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              {data.phone && (
                <a
                  href={data.phone.href}
                  className="hidden min-h-11 items-center gap-2 rounded-full border border-border bg-sunken px-4 text-sm font-semibold text-foreground transition-colors hover:bg-mint xl:flex"
                >
                  <Phone aria-hidden="true" className="size-4 text-primary" />
                  {data.phone.label}
                </a>
              )}
              <Link
                href="/teklif-al"
                className="cta-attention group/cta relative hidden min-h-12 items-center gap-2 overflow-hidden rounded-full bg-navy pl-5 pr-1.5 text-sm font-semibold text-white transition-transform duration-300 hover:-translate-y-0.5 sm:flex dark:bg-primary dark:text-primary-foreground"
              >
                <span aria-hidden="true" className="cta-shine" />
                <span className="relative">Teklif Al</span>
                <span className="relative grid size-9 place-items-center rounded-full bg-brand-gradient">
                  <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2fb59b]/70" />
                  <ArrowRight aria-hidden="true" className="cta-arrow relative size-4 text-white" />
                </span>
              </Link>
              <button
                type="button"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-controls="mobil-menu"
                aria-label={mobileOpen ? "Menüyü kapat" : "Menüyü aç"}
                className="grid size-12 place-items-center rounded-full border border-border bg-sunken text-foreground lg:hidden"
              >
                {mobileOpen ? <X aria-hidden="true" className="size-5" /> : <Menu aria-hidden="true" className="size-5" />}
              </button>
            </div>
          </div>

          {/* Masaüstü mega menü */}
          {openMenu && (
              <div key={openMenu} id={`mega-${openMenu}`} className="header-drop hidden overflow-hidden lg:block">
                <div className="border-t border-border/70">
                  {openMenu === "services" ? <ServicesMega data={data} /> : openMenu === "guide" ? <GuideMega data={data} /> : <RegionsMega data={data} />}
                </div>
              </div>
            )}

          {/* Mobil panel */}
            {mobileOpen && (
              <div id="mobil-menu" className="header-drop overflow-hidden lg:hidden">
                <nav aria-label="Mobil menü" className="max-h-[calc(100svh-110px)] overflow-y-auto overscroll-contain border-t border-border/70 px-4 pb-5 pt-3">
                  {data.nav.map((item) =>
                    item.children ? (
                      <div key={item.href}>
                        <button
                          type="button"
                          onClick={() => setMobileSection((c) => (c === item.children ? null : item.children!))}
                          aria-expanded={mobileSection === item.children}
                          className="flex min-h-13 w-full items-center justify-between rounded-xl px-3 text-left text-lg font-semibold text-foreground"
                        >
                          {item.label}
                          <ChevronDown
                            aria-hidden="true"
                            className={cn("size-5 text-muted transition-transform", mobileSection === item.children && "rotate-180")}
                          />
                        </button>
                        {mobileSection === item.children && (
                          <div className="mb-2 ml-3 border-l border-border pl-3">
                            {item.children === "services"
                              ? data.serviceGroups.map((g) => (
                                  <div key={g.key} className="py-2">
                                    <p className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">{g.title}</p>
                                    <ul className="mt-1">
                                      {g.items.map((s) => (
                                        <li key={s.slug}>
                                          <Link href={`/hizmetlerimiz/${s.slug}`} className="flex min-h-12 items-center gap-3 rounded-xl px-2 hover:bg-mint">
                                            <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-sunken">
                                              <Image src={s.image} alt="" fill sizes="36px" className="object-cover" />
                                            </span>
                                            {s.title}
                                          </Link>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                ))
                              : item.children === "guide"
                              ? (
                                  <ul className="grid grid-cols-2 gap-1 py-2">
                                    {data.pests.map((p) => (
                                      <li key={p.slug}>
                                        <Link href={`/bocek-rehberi/${p.slug}`} className="flex min-h-12 items-center gap-2.5 rounded-xl px-2 hover:bg-mint">
                                          <span className="relative size-9 shrink-0 overflow-hidden rounded-lg bg-sunken">
                                            <Image src={p.image} alt="" fill sizes="36px" className="object-cover" />
                                          </span>
                                          <span className="text-sm">{p.name}</span>
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                )
                              : (["anadolu", "avrupa"] as const).map((side) => (
                                  <div key={side} className="py-2">
                                    <p className="px-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                                      {side === "anadolu" ? "Anadolu Yakası" : "Avrupa Yakası"}
                                    </p>
                                    <ul className="mt-1 grid grid-cols-2">
                                      {data.districts
                                        .filter((d) => d.side === side)
                                        .map((d) => (
                                          <li key={d.slug}>
                                            <Link href={`/hizmet-bolgeleri/istanbul/${d.slug}`} className="flex min-h-11 items-center rounded-xl px-2 hover:bg-mint">
                                              {d.name}
                                            </Link>
                                          </li>
                                        ))}
                                    </ul>
                                  </div>
                                ))}
                            <Link
                              href={item.href}
                              className="flex min-h-12 items-center gap-1.5 px-2 font-semibold text-primary"
                            >
                              Tümünü gör <ArrowRight aria-hidden="true" className="size-4" />
                            </Link>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link key={item.href} href={item.href} className="flex min-h-13 items-center rounded-xl px-3 text-lg font-semibold text-foreground">
                        {item.label}
                      </Link>
                    ),
                  )}
                  <div className="mt-4 grid gap-2 border-t border-border pt-4">
                    <Link
                      href="/teklif-al"
                      className="flex min-h-13 items-center justify-center gap-2 rounded-full bg-navy font-semibold text-white dark:bg-primary dark:text-primary-foreground"
                    >
                      Teklif Al <ArrowRight aria-hidden="true" className="size-4" />
                    </Link>
                    <div className="grid grid-cols-2 gap-2">
                      {data.phone && (
                        <a href={data.phone.href} className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-border font-semibold">
                          <Phone aria-hidden="true" className="size-4" /> Ara
                        </a>
                      )}
                      {data.whatsapp && (
                        <a href={data.whatsapp} target="_blank" rel="noopener" className="flex min-h-12 items-center justify-center gap-2 rounded-full border border-border font-semibold">
                          <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp
                        </a>
                      )}
                    </div>
                  </div>
                </nav>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="w-fit rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted">{children}</span>
  );
}

function ServicesMega({ data }: { data: HeaderData }) {
  const [hovered, setHovered] = useState(0);
  const group = data.serviceGroups[hovered] ?? data.serviceGroups[0];
  return (
    <div className="grid grid-cols-[1fr_1fr_1fr_300px] gap-8 px-8 pb-8 pt-6">
      {data.serviceGroups.map((g, gi) => (
        <div key={g.key} className="flex flex-col gap-5" onMouseEnter={() => setHovered(gi)}>
          <Eyebrow>{g.title}</Eyebrow>
          <ul className="flex flex-col gap-2.5">
            {g.items.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/hizmetlerimiz/${s.slug}`}
                  className="group/l flex items-center gap-2 font-display text-[1.0625rem] font-semibold tracking-[-0.01em] text-foreground transition-colors hover:text-primary"
                >
                  {s.title}
                  <ArrowUpRight aria-hidden="true" className="size-4 -translate-x-1 opacity-0 transition-[opacity,transform] group-hover/l:translate-x-0 group-hover/l:opacity-100" />
                </Link>
              </li>
            ))}
          </ul>
          {g.items.length > 7 && (
            <Link href={`/hizmetlerimiz#${g.key}`} className="mt-auto text-sm font-medium text-muted hover:text-foreground">
              +{g.items.length - 7} hizmet daha →
            </Link>
          )}
        </div>
      ))}
      {group && (
        <Link
          href={`/hizmetlerimiz#${group.key}`}
          className="group/img relative flex h-[300px] flex-col justify-end overflow-hidden rounded-2xl"
        >
            <span key={group.key} className="header-img-in absolute inset-0">
              <Image src={group.cover.src} alt={group.cover.alt} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
            </span>
          <span className="relative z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 pt-14">
            <span className="block text-sm font-semibold text-white">{group.description}</span>
            <span className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-white/80">
              {group.title} <ArrowUpRight aria-hidden="true" className="size-3.5" />
            </span>
          </span>
        </Link>
      )}
    </div>
  );
}

function GuideMega({ data }: { data: HeaderData }) {
  const featured = data.pests.slice(0, 2);
  const rest = data.pests.slice(2);
  return (
    <div className="grid grid-cols-[1fr_300px] gap-8 px-8 pb-8 pt-6">
      <div>
        <Eyebrow>Zararlıyı tanıyın · {data.pests.length} tür</Eyebrow>
        <ul className="mt-5 grid grid-cols-3 gap-x-4 gap-y-1 xl:grid-cols-4">
          {rest.map((p) => (
            <li key={p.slug}>
              <Link href={`/bocek-rehberi/${p.slug}`} className="group/l flex items-center gap-3 rounded-xl p-1.5 transition-colors hover:bg-mint/70">
                <span className="relative size-11 shrink-0 overflow-hidden rounded-xl bg-sunken">
                  <Image src={p.image} alt="" fill sizes="44px" className="object-cover transition-transform duration-500 group-hover/l:scale-110" />
                </span>
                <span className="min-w-0">
                  <span className="block truncate font-display text-[0.9375rem] font-semibold text-foreground">{p.name}</span>
                  <span className="block truncate text-xs text-muted">{p.group}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/bocek-rehberi" className="mt-5 inline-flex items-center gap-1.5 px-1.5 text-sm font-semibold text-primary hover:underline">
          Tüm böcek rehberi <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="grid gap-3">
        {featured.map((p) => (
          <Link key={p.slug} href={`/bocek-rehberi/${p.slug}`} className="group/img relative flex h-[142px] flex-col justify-end overflow-hidden rounded-2xl">
            <Image src={p.image} alt="" fill sizes="300px" className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
            <span className="relative z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-4 pt-10">
              <span className="block text-sm font-semibold text-white">{p.name}</span>
              <span className="text-xs text-white/75">{p.group} →</span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

function RegionsMega({ data }: { data: HeaderData }) {
  return (
    <div className="grid grid-cols-[1fr_1.6fr_300px] gap-10 px-8 pb-8 pt-6">
      {(["anadolu", "avrupa"] as const).map((side) => {
        const list = data.districts.filter((d) => d.side === side);
        return (
          <div key={side} className="flex flex-col gap-5">
            <Eyebrow>
              {side === "anadolu" ? "Anadolu Yakası" : "Avrupa Yakası"} · {list.length} ilçe
            </Eyebrow>
            <ul className={cn("grid gap-x-4 gap-y-2", side === "anadolu" ? "grid-cols-2" : "grid-cols-3")}>
              {list.map((d) => (
                <li key={d.slug}>
                  <Link
                    href={`/hizmet-bolgeleri/istanbul/${d.slug}`}
                    className="text-[0.9375rem] font-medium text-foreground/80 transition-colors hover:text-primary"
                  >
                    {d.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
      <Link href="/hizmet-bolgeleri" className="group/img relative flex h-[300px] flex-col justify-end overflow-hidden rounded-2xl">
        <Image src={data.regionCover.src} alt={data.regionCover.alt} fill sizes="300px" className="object-cover transition-transform duration-700 group-hover/img:scale-105" />
        <span className="relative z-10 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-5 pt-14">
          <span className="flex items-center gap-2 text-sm font-semibold text-white">
            <MapPin aria-hidden="true" className="size-4" /> Bölgenizi bulun
          </span>
          <span className="mt-1 block text-xs text-white/80">İlçe arayın, hizmet kapsamını görün →</span>
        </span>
      </Link>
    </div>
  );
}
