"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { MapPin, Search } from "lucide-react";

const norm = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFKD").replace(/[̀-ͯ]/g, "");

/**
 * Mahalle etiketleri (hero'daki zararlı etiketleri gibi). Tüm bağlantılar ilk HTML'de bulunur (SEO);
 * arama yalnızca görsel filtredir.
 */
export function NeighbourhoodChips({
  districtSlug,
  items,
  current,
}: {
  districtSlug: string;
  items: { name: string; slug: string }[];
  current?: string;
}) {
  const [q, setQ] = useState("");
  const dq = useDeferredValue(q);
  const visible = useMemo(() => new Set(items.filter((m) => norm(m.name).includes(norm(dq.trim()))).map((m) => m.slug)), [items, dq]);

  return (
    <div>
      {items.length > 12 && (
        <label className="relative mb-5 block max-w-sm">
          <span className="sr-only">Mahalle ara</span>
          <Search aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={`${items.length} mahalle içinde ara…`}
            className="min-h-12 w-full rounded-full border border-border bg-surface pl-11 pr-4 text-[0.9375rem] shadow-xs placeholder:text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </label>
      )}
      <ul className="flex flex-wrap gap-2.5">
        {items.map((m) => (
          <li key={m.slug} hidden={!visible.has(m.slug)}>
            <Link
              href={`/hizmet-bolgeleri/istanbul/${districtSlug}/${m.slug}`}
              aria-current={current === m.slug ? "page" : undefined}
              className={
                current === m.slug
                  ? "inline-flex min-h-11 items-center gap-2 rounded-full bg-navy px-4 text-[0.9375rem] font-semibold text-white"
                  : "group inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-surface px-4 text-[0.9375rem] font-medium text-foreground shadow-xs transition-[border-color,background-color,transform] hover:-translate-y-0.5 hover:border-primary/40 hover:bg-mint"
              }
            >
              <MapPin aria-hidden="true" className="size-4 text-primary transition-transform group-hover:scale-110" />
              {m.name}
            </Link>
          </li>
        ))}
      </ul>
      {visible.size === 0 && <p className="mt-4 text-muted">“{q}” ile eşleşen mahalle bulunamadı.</p>}
    </div>
  );
}
