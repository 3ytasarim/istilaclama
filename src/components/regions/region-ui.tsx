import Link from "next/link";
import { ArrowRight, ArrowUpRight, Building2, Layers3, MapPin, MessageCircle } from "lucide-react";
import type { ReactNode } from "react";
import { Breadcrumbs, type Crumb } from "@/components/shared/page-hero";
import { Photo } from "@/components/ui/photo";
import { Eyebrow } from "@/components/ui/section-heading";
import { HeroFloaters } from "@/components/sections/hero-floaters";
import type { MediaAsset } from "@/content/media";
import { AGE_LABEL, FLOOR_LABEL } from "@/lib/regions/content";
import type { BuildingStats } from "@/lib/regions/data";
import { DATA_SOURCE } from "@/lib/regions/data";
import { cn } from "@/lib/utils";

/* ───────── Hero ───────── */
export function RegionHero({
  crumbs,
  eyebrow,
  titleLead,
  titleAccent,
  summary,
  photo,
  photoCaption,
  quoteHref,
  whatsapp,
  facts,
}: {
  crumbs: Crumb[];
  eyebrow: string;
  titleLead: string;
  titleAccent: string;
  summary: string;
  photo: MediaAsset;
  photoCaption?: string;
  quoteHref: string;
  whatsapp: string | null;
  facts: { label: string; value: string }[];
}) {
  return (
    <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
      <div className="absolute inset-0 animate-hero-zoom">
        <Photo asset={photo} sizes="100vw" priority className="opacity-75" />
      </div>
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/80 to-[#06161d]/20" />
      <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/60" />
      <HeroFloaters />

      <div className="container-page relative pb-16 pt-[calc(var(--header-h)+2.5rem)] sm:pb-24">
        <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_ol]:text-white/70 [&_span]:text-white [&_svg]:text-white/40">
          <Breadcrumbs items={crumbs} />
        </div>
        <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="max-w-3xl">
            <Eyebrow tone="light">{eyebrow}</Eyebrow>
            <h1 className="animate-rise mt-5 text-display font-extrabold">
              {titleLead} <span className="hero-word">{titleAccent}</span>
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">{summary}</p>
            <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:200ms] sm:flex-row">
              <Link
                href={quoteHref}
                className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5 sm:justify-center"
              >
                Bu bölge için teklif al
                <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 font-semibold backdrop-blur-md hover:bg-white/12"
                >
                  <MessageCircle aria-hidden="true" className="size-4 text-[#4ade80]" /> WhatsApp
                </a>
              )}
            </div>
          </div>
          <dl className="animate-rise grid grid-cols-2 gap-3 [animation-delay:280ms]">
            {facts.map((f) => (
              <div key={f.label} className="rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-md">
                <dt className="text-xs font-medium uppercase tracking-[0.12em] text-white/55">{f.label}</dt>
                <dd className="mt-1 font-display text-2xl font-extrabold tracking-[-0.03em]">{f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        {photoCaption && <p className="mt-8 text-xs text-white/45">Fotoğraf: {photoCaption}</p>}
      </div>
    </section>
  );
}

/* ───────── Bina yapısı grafiği ───────── */
function Bars({ title, icon, labels, values, colors }: { title: string; icon: ReactNode; labels: string[]; values: number[]; colors: string[] }) {
  return (
    <div className="rounded-[var(--radius-card)] border border-border bg-surface p-6 shadow-xs">
      <p className="flex items-center gap-2 font-display font-bold text-foreground">
        <span className="grid size-9 place-items-center rounded-xl bg-mint text-on-mint">{icon}</span>
        {title}
      </p>
      <ul className="mt-5 space-y-4">
        {labels.map((l, i) => (
          <li key={l}>
            <div className="flex items-baseline justify-between text-sm">
              <span className="text-muted">{l}</span>
              <span className="font-display text-lg font-bold tabular-nums text-foreground">%{values[i]}</span>
            </div>
            <div className="mt-1.5 h-2.5 overflow-hidden rounded-full bg-sunken">
              <div
                data-reveal
                className={cn("bar-fill h-full rounded-full", colors[i])}
                style={{ "--bar": `${values[i]}%`, "--reveal-i": i } as React.CSSProperties}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BuildingChart({ stats }: { stats: BuildingStats }) {
  return (
    <figure>
      <div className="grid gap-4 md:grid-cols-2">
        <Bars
          title="Bina yaşı"
          icon={<Building2 aria-hidden="true" className="size-4" />}
          labels={AGE_LABEL}
          values={stats.agePct}
          colors={["bg-[#0b7a63]", "bg-[#2fb59b]", "bg-[#4fb8dc]"]}
        />
        <Bars
          title="Kat sayısı"
          icon={<Layers3 aria-hidden="true" className="size-4" />}
          labels={FLOOR_LABEL}
          values={stats.floorPct}
          colors={["bg-[#2fb59b]", "bg-[#087ea4]", "bg-[#103342]"]}
        />
      </div>
      <figcaption className="mt-3 text-xs text-muted">
        Kaynak:{" "}
        <a href={DATA_SOURCE.url} target="_blank" rel="noopener" className="underline hover:text-foreground">
          {DATA_SOURCE.label}
        </a>
        . Yüzdeler toplam bina sayısına göre yuvarlanmıştır.
      </figcaption>
    </figure>
  );
}

/* ───────── SEO metni ───────── */
export function SeoNote({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section aria-labelledby="seo-not" className="border-t border-border bg-sunken">
      <div className="container-page py-12">
        <h2 id="seo-not" className="font-display text-lg font-bold text-foreground">
          {title}
        </h2>
        <div className="mt-3 max-w-4xl space-y-3 text-[0.9375rem] leading-relaxed text-muted">{children}</div>
      </div>
    </section>
  );
}

/* ───────── Footer üstü ilgili bağlantılar ───────── */
export function RelatedLinks({ groups }: { groups: { title: string; links: { label: string; href: string }[] }[] }) {
  return (
    <nav aria-label="İlgili bağlantılar" className="border-t border-border bg-background">
      <div className="container-page grid gap-8 py-12 md:grid-cols-3">
        {groups
          .filter((g) => g.links.length > 0)
          .map((g) => (
            <div key={g.title}>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-on-mint">{g.title}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {g.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex min-h-9 items-center gap-1 rounded-full border border-border bg-surface px-3.5 text-sm text-foreground/80 transition-colors hover:border-primary/40 hover:bg-mint hover:text-on-mint"
                    >
                      {l.label}
                      <ArrowUpRight aria-hidden="true" className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </nav>
  );
}

export function PinIcon() {
  return <MapPin aria-hidden="true" className="size-4" />;
}
