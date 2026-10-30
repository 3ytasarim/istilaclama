import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Eyebrow, SplitHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { RegionPicker } from "@/components/regions/region-picker";
import { media } from "@/content/media";
import type { Region } from "@/types/content";

export function RegionsSection({ districts }: { districts: Region[] }) {
  const anadolu = districts.filter((d) => d.side === "anadolu").length;
  return (
    <section aria-labelledby="bolgeler-baslik" className="section-y">
      <div className="container-page grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        {/* Görsel panel */}
        <div data-reveal className="relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-[var(--radius-panel)] p-8 text-white sm:p-10">
          <div className="absolute inset-0 animate-slow-pan">
            <Photo asset={media.istanbulMaidenTower} sizes="(min-width:1024px) 42vw, 100vw" />
          </div>
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#071b24]/80 via-[#071b24]/10 to-[#071b24]/85" />
          <div className="relative">
            <Eyebrow tone="light">Hizmet bölgelerimiz</Eyebrow>
            <h2 id="bolgeler-baslik" data-split className="mt-5 text-h2 font-bold text-white">
              <SplitHeading>İstanbul’da bölgenizi seçin</SplitHeading>
            </h2>
            <p className="mt-4 max-w-md text-white/75">
              İlçenizi bulun; bölgenize özel hizmet kapsamını, sık karşılaşılan sorunları ve iletişim seçeneklerini görün.
            </p>
          </div>
          <div className="relative mt-10 grid grid-cols-2 gap-3">
            {[
              { label: "Anadolu Yakası", count: anadolu, dot: "bg-[#2fb59b]" },
              { label: "Avrupa Yakası", count: districts.length - anadolu, dot: "bg-[#4fb8dc]" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/15 bg-white/[0.08] p-4 backdrop-blur-md">
                <p className="flex items-center gap-2 text-sm text-white/75">
                  <span className={`size-2 rounded-full ${s.dot}`} /> {s.label}
                </p>
                <p className="mt-1 font-display text-3xl font-extrabold">
                  {s.count} <span className="text-base font-semibold text-white/60">ilçe</span>
                </p>
              </div>
            ))}
            <Link
              href="/hizmet-bolgeleri"
              className="col-span-2 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white font-semibold text-navy transition-colors hover:bg-mint"
            >
              <MapPin aria-hidden="true" className="size-4" /> Bölge rehberi <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        {/* İlçe seçici */}
        <div data-reveal className="rounded-[var(--radius-panel)] border border-border bg-sunken p-6 sm:p-8">
          <RegionPicker districts={districts.map(({ slug, name, side }) => ({ slug, name, side }))} compact />
        </div>
      </div>
    </section>
  );
}
