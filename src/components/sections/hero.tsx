import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Bug, MapPin, MessageCircle, ShieldCheck } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { HeroFloaters } from "@/components/sections/hero-floaters";
import { GlassSelect } from "@/components/ui/glass-select";
import { media, serviceMedia } from "@/content/media";
import type { Region, ServiceSummary } from "@/types/content";

const PESTS = [
  { slug: "hamam-bocegi-ilaclama", label: "Hamam böceği" },
  { slug: "fare-ve-kemirgen-kontrolu", label: "Fare" },
  { slug: "tahta-kurusu-ilaclama", label: "Tahta kurusu" },
  { slug: "pire-ilaclama", label: "Pire" },
  { slug: "karinca-ilaclama", label: "Karınca" },
];


export function Hero({
  whatsapp,
  services,
  districts,
}: {
  whatsapp: string | null;
  services: ServiceSummary[];
  districts: Region[];
}) {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative -mt-[var(--header-h)] flex min-h-[min(980px,100svh)] flex-col overflow-hidden bg-[#06161d] text-white"
    >
      {/* Fotoğraf + katmanlar */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={media.heroTechnician} sizes="100vw" priority className="opacity-90" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/10 lg:via-[#06161d]/70" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/60" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[640px] rounded-full bg-[#087f6d]/25 blur-[120px]" />
        <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-[0.07] [mask-image:linear-gradient(to_right,#000,transparent_70%)]" />
        <HeroFloaters />
      </div>

      <div className="container-page relative flex flex-1 flex-col pt-[calc(var(--header-h)+3rem)] sm:pt-[calc(var(--header-h)+4.5rem)]">
        <div className="grid flex-1 items-center gap-12 pb-36 sm:pb-40 lg:grid-cols-[1.25fr_minmax(360px,420px)] xl:gap-20">
          <div className="max-w-[760px]">
            <p className="animate-rise inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.07] py-1.5 pl-1.5 pr-4 text-[0.8125rem] font-medium text-white/90 backdrop-blur-md">
              <span className="relative grid size-6 place-items-center rounded-full bg-[#2fb59b] text-[#04201b]">
                <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-[#2fb59b]" />
                <ShieldCheck aria-hidden="true" className="relative size-3.5" />
              </span>
              Ev ve işletmeler için planlı haşere kontrolü
            </p>

            <h1
              id="hero-title"
              className="animate-rise mt-7 text-display font-extrabold text-white [animation-delay:80ms]"
            >
              Yaşam Alanlarınız İçin{" "}
              <span className="hero-word">
                Profesyonel
              </span>{" "}
              Haşere Kontrolü
            </h1>

            <p className="animate-rise mt-7 max-w-[600px] text-lead text-white/75 [animation-delay:160ms]">
              Ev ve iş yerlerinde haşere sorunlarına karşı ihtiyaçlarınıza uygun, planlı ve profesyonel çözümler. Önce
              alanı ve zararlıyı inceliyor, ardından size özel bir uygulama planı sunuyoruz.
            </p>

            <div className="animate-rise mt-10 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:flex-wrap">
              <Link
                href="/teklif-al"
                className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full sm:justify-center bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 text-base font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5"
              >
                Hemen Teklif Al
                <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white transition-transform group-hover/btn:translate-x-0.5">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
              <Link
                href="/hizmetlerimiz"
                className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 text-base font-semibold text-white backdrop-blur-md transition-colors hover:border-white/50 hover:bg-white/12"
              >
                Hizmetleri İncele
              </Link>
              {whatsapp && (
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 font-semibold text-white/90 hover:text-white"
                >
                  <MessageCircle aria-hidden="true" className="size-5 text-[#4ade80]" /> WhatsApp
                </a>
              )}
            </div>

            {/* Zararlı seçici */}
            <div className="animate-rise mt-12 [animation-delay:320ms]">
              <p className="text-sm font-medium text-white/60">Hangi zararlıyla karşılaştınız?</p>
              <ul className="mt-4 flex flex-wrap gap-2.5">
                {PESTS.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/hizmetlerimiz/${p.slug}`}
                      className="group/pest inline-flex min-h-12 items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.06] py-1 pl-1 pr-4 text-[0.9375rem] font-medium text-white/90 backdrop-blur-md transition-[background-color,border-color] hover:border-[#5fd3bc]/60 hover:bg-white/12"
                    >
                      <span className="relative size-10 overflow-hidden rounded-full ring-2 ring-white/20">
                        <Image
                          src={serviceMedia(p.slug).src}
                          alt=""
                          fill
                          sizes="40px"
                          className="object-cover transition-transform duration-500 group-hover/pest:scale-115"
                        />
                      </span>
                      {p.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <QuickQuote services={services} districts={districts} />
        </div>
      </div>
    </section>
  );
}

const GROUPS = [
  { key: "hasere", label: "Haşere türüne göre" },
  { key: "yasam-alani", label: "Yaşam alanına göre" },
  { key: "kurumsal", label: "Kurumsal hizmetler" },
] as const;

/** GET formu: seçimleri teklif sayfasına taşır, kişisel veri toplamaz. */
function QuickQuote({ services, districts }: { services: ServiceSummary[]; districts: Region[] }) {
  return (
    <div className="animate-rise relative hidden [animation-delay:400ms] lg:block">
      <div aria-hidden="true" className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-white/30 via-white/5 to-[#5fd3bc]/30" />
      <form
        action="/teklif-al"
        method="get"
        className="relative rounded-[1.75rem] bg-[#0b2430]/75 p-7 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] backdrop-blur-xl"
      >
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#8fe3d2]">Hızlı teklif</p>
        <p className="mt-2 font-display text-2xl font-bold leading-tight">Sorununuzu 30 saniyede anlatın</p>
        <p className="mt-2 text-sm text-white/60">İki seçim yapın, teklif formunda kalan bilgileri tamamlayın.</p>

        <div className="mt-6 space-y-4">
          <div>
            <span className="mb-1.5 block text-xs font-medium text-white/70">Hizmet / zararlı türü</span>
            <GlassSelect
              name="hizmet"
              label="Hizmet veya zararlı türü"
              placeholder="Seçiniz"
              icon={<Bug aria-hidden="true" className="size-4" />}
              groups={GROUPS.map((g) => ({
                label: g.label,
                options: services
                  .filter((s) => s.group === g.key)
                  .map((s) => ({ value: s.slug, label: s.title, image: serviceMedia(s.slug).src })),
              }))}
            />
          </div>
          <div>
            <span className="mb-1.5 block text-xs font-medium text-white/70">İlçe</span>
            <GlassSelect
              name="ilce"
              label="İlçe"
              placeholder="Seçiniz"
              icon={<MapPin aria-hidden="true" className="size-4" />}
              groups={(["anadolu", "avrupa"] as const).map((side) => ({
                label: side === "anadolu" ? "Anadolu Yakası" : "Avrupa Yakası",
                options: districts
                  .filter((d) => d.side === side)
                  .map((d) => ({ value: d.slug, label: d.name, dot: side === "anadolu" ? "bg-[#2fb59b]" : "bg-[#4fb8dc]" })),
              }))}
            />
          </div>
        </div>

        <button
          type="submit"
          className="group/btn mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-xl bg-white text-base font-bold text-[#103342] transition-colors hover:bg-[#ddf5ef]"
        >
          Devam et
          <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
        </button>

        <div className="mt-6 flex items-center gap-3 border-t border-white/10 pt-5">
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full ring-2 ring-white/20">
            <Photo asset={media.inspection} sizes="44px" decorative />
          </span>
          <p className="text-xs leading-relaxed text-white/60">
            Talebiniz incelendikten sonra alanınıza uygun yöntemi ve gerekiyorsa yerinde inceleme zamanını planlıyoruz.
          </p>
        </div>
      </form>
    </div>
  );
}
