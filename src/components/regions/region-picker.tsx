"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowUpRight, MapPin, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { IstanbulSide } from "@/types/content";

type District = { slug: string; name: string; side: IstanbulSide };
const TABS: { key: IstanbulSide | "tum"; label: string; short: string }[] = [
  { key: "tum", label: "Tümü", short: "Tümü" },
  { key: "anadolu", label: "Anadolu Yakası", short: "Anadolu" },
  { key: "avrupa", label: "Avrupa Yakası", short: "Avrupa" },
];

const norm = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFKD").replace(/[̀-ͯ]/g, "");

export function RegionPicker({ districts, compact = false }: { districts: District[]; compact?: boolean }) {
  const [tab, setTab] = useState<IstanbulSide | "tum">("tum");
  const [query, setQuery] = useState("");
  const q = useDeferredValue(query);

  const list = useMemo(
    () => districts.filter((d) => (tab === "tum" || d.side === tab) && norm(d.name).includes(norm(q.trim()))),
    [districts, tab, q],
  );

  return (
    <div>
      <div className={cn("flex flex-col gap-4", !compact && "md:flex-row md:items-center md:justify-between")}>
        <div className="inline-flex self-start rounded-full border border-border bg-surface p-1 shadow-xs" role="group" aria-label="Yaka filtresi">
          {TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              aria-pressed={tab === t.key}
              onClick={() => setTab(t.key)}
              className={cn(
                "min-h-11 whitespace-nowrap rounded-full px-4 text-sm font-semibold transition-colors",
                tab === t.key
                  ? "bg-navy text-white dark:bg-primary dark:text-primary-foreground"
                  : "text-muted hover:text-foreground",
              )}
            >
              <span className="sm:hidden">{t.short}</span>
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
        <label className={cn("relative block", !compact && "md:w-80")}>
          <span className="sr-only">İlçe ara</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="İlçe ara… (ör. Kadıköy)"
            className="min-h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-[0.9375rem] text-foreground shadow-xs placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </label>
      </div>

      <p className="sr-only" aria-live="polite">
        {list.length} ilçe listeleniyor
      </p>
      <ul className={cn("mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3", compact ? "max-h-[440px] overflow-y-auto pr-1" : "lg:grid-cols-5")}>
        {list.map((d) => (
          <li key={d.slug}>
            <Link
              href={`/hizmet-bolgeleri/istanbul/${d.slug}`}
              className="group flex min-h-14 items-center justify-between gap-2 rounded-2xl border border-border bg-surface px-4 py-3 text-[0.9375rem] font-medium text-foreground transition-[border-color,box-shadow,background-color] hover:border-primary/40 hover:bg-mint/60 hover:shadow-sm"
            >
              <span className="flex items-center gap-2">
                <MapPin aria-hidden="true" className={cn("size-4", d.side === "anadolu" ? "text-primary" : "text-accent")} />
                {d.name}
              </span>
              <ArrowUpRight aria-hidden="true" className="size-4 text-muted opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </li>
        ))}
      </ul>
      {list.length === 0 && (
        <p className="mt-8 rounded-2xl border border-dashed border-border-strong p-6 text-center text-muted">
          “{query}” ile eşleşen ilçe bulunamadı.
        </p>
      )}
    </div>
  );
}
