"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ListOrdered } from "lucide-react";
import { cn } from "@/lib/utils";

export type TocItem = { id: string; title: string };

/**
 * Numaralı içindekiler (01, 02 …) — okunan başlığı vurgular, okuma ilerlemesini gösterir.
 * Masaüstünde yapışkan sağ sütun, mobilde açılır kapanır kutu. Bağlantılar ilk HTML'de bulunur.
 */
export function GuideToc({ items, variant }: { items: TocItem[]; variant: "mobile" | "desktop" }) {
  const [active, setActive] = useState(items[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    if (!els.length) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = window.innerHeight * 0.3;
      let current = els[0]!.id;
      for (const el of els) if (el.getBoundingClientRect().top <= line) current = el.id;
      setActive(current);
      const first = els[0]!.getBoundingClientRect().top + window.scrollY;
      const last = els[els.length - 1]!;
      const end = last.getBoundingClientRect().bottom + window.scrollY - window.innerHeight * 0.6;
      setProgress(Math.min(1, Math.max(0, (window.scrollY + line - first) / Math.max(1, end - first))));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  const list = (
    <ol className="relative space-y-1">
      {items.map((it, i) => {
        const on = it.id === active;
        const passed = items.findIndex((x) => x.id === active) > i;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              onClick={() => setOpen(false)}
              aria-current={on ? "location" : undefined}
              className={cn(
                "group flex items-center gap-3 rounded-xl py-2 pl-2 pr-3 text-sm transition-colors",
                on ? "bg-mint text-on-mint" : "text-muted hover:bg-sunken hover:text-foreground",
              )}
            >
              <span
                className={cn(
                  "grid size-8 shrink-0 place-items-center rounded-lg font-display text-xs font-extrabold tabular-nums transition-all duration-300",
                  on
                    ? "scale-105 bg-brand-gradient text-white shadow-[0_8px_18px_-8px_rgb(8_127_109/0.8)]"
                    : passed
                      ? "bg-primary/12 text-primary"
                      : "bg-sunken text-muted group-hover:text-foreground",
                )}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className={cn("leading-snug", on && "font-semibold")}>{it.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* Mobil */}
      {variant === "mobile" && (
      <div className="rounded-2xl border border-border bg-surface shadow-xs">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex min-h-13 w-full items-center gap-3 px-4 text-left font-semibold text-foreground"
        >
          <ListOrdered aria-hidden="true" className="size-5 text-primary" /> İçindekiler
          <ChevronDown aria-hidden="true" className={cn("ml-auto size-5 text-muted transition-transform", open && "rotate-180")} />
        </button>
        <div hidden={!open} className="border-t border-border p-2">
          {list}
        </div>
      </div>
      )}

      {/* Masaüstü */}
      {variant === "desktop" && (
      <nav aria-label="İçindekiler" className="rounded-[var(--radius-card)] border border-border bg-surface p-4 shadow-sm">
        <div className="mb-3 flex items-center justify-between px-2">
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            <ListOrdered aria-hidden="true" className="size-4 text-primary" /> İçindekiler
          </p>
          <span className="font-display text-xs font-bold tabular-nums text-primary">%{Math.round(progress * 100)}</span>
        </div>
        <div className="mx-2 mb-3 h-1 overflow-hidden rounded-full bg-sunken">
          <div className="h-full rounded-full bg-brand-gradient transition-[width] duration-200" style={{ width: `${progress * 100}%` }} />
        </div>
        {list}
      </nav>
      )}
    </>
  );
}
