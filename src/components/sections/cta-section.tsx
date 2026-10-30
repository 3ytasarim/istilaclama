import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircle, Phone, Sparkle } from "lucide-react";
import { Eyebrow, SplitHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { media } from "@/content/media";

const FLOW = ["Formu doldurun", "Alanınızı değerlendirelim", "Planı birlikte netleştirelim"];
const MARQUEE = [
  "Hamam böceği", "Fare ve kemirgen", "Tahta kurusu", "Pire", "Karınca", "Sivrisinek",
  "Restoran & kafe", "Otel", "Apartman & site", "Depo", "Fabrika", "Periyodik program",
];

export function CtaSection({
  phone,
  whatsapp,
  title = "Sorunu birlikte tanımlayalım, size uygun planı hazırlayalım",
}: {
  phone: { label: string; href: string } | null;
  whatsapp: string | null;
  title?: string;
}) {
  return (
    <section aria-labelledby="cta-baslik" className="pb-[clamp(4rem,2.8rem+5vw,7.5rem)] pt-4">
      <div className="container-page">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-[#071b24] text-white shadow-lg">
          {/* Hareketli ışık lekeleri */}
          <div aria-hidden="true" className="absolute inset-0">
            <div className="animate-aurora-a absolute -left-32 -top-32 size-[520px] rounded-full bg-[#087f6d]/45 blur-[110px]" />
            <div className="animate-aurora-b absolute -bottom-40 left-1/3 size-[460px] rounded-full bg-[#087ea4]/40 blur-[110px]" />
            <div className="grid-lines absolute inset-0 opacity-[0.08]" />
          </div>

          <div className="relative grid items-center gap-12 px-6 py-14 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16 lg:py-20">
            <div>
              <div data-reveal>
                <Eyebrow tone="light">Hemen başlayalım</Eyebrow>
              </div>
              <h2 id="cta-baslik" data-split className="mt-5 text-h2 font-bold text-white">
                <SplitHeading>{title}</SplitHeading>
              </h2>

              <ol data-reveal style={{ "--reveal-i": 3 } as React.CSSProperties} className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2">
                {FLOW.map((step, i) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] py-1.5 pl-1.5 pr-3.5 text-sm text-white/85">
                      <span className="grid size-6 place-items-center rounded-full bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-xs font-bold text-[#04201b]">
                        {i + 1}
                      </span>
                      {step}
                    </span>
                    {i < FLOW.length - 1 && <span aria-hidden="true" className="hidden h-px w-5 bg-white/25 sm:block" />}
                  </li>
                ))}
              </ol>

              <div data-reveal style={{ "--reveal-i": 4 } as React.CSSProperties} className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/teklif-al"
                  className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full sm:justify-center bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 text-base font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5"
                >
                  Teklif formunu doldur
                  <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white transition-transform group-hover/btn:translate-x-0.5">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
                <Link
                  href="/hizmetlerimiz"
                  className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-7 font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/12"
                >
                  Hizmetleri incele <ArrowUpRight aria-hidden="true" className="size-4" />
                </Link>
                {phone && (
                  <a href={phone.href} className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 font-semibold text-white/90 hover:text-white">
                    <Phone aria-hidden="true" className="size-4" /> {phone.label}
                  </a>
                )}
                {whatsapp && (
                  <a href={whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 font-semibold text-white/90 hover:text-white">
                    <MessageCircle aria-hidden="true" className="size-4 text-[#4ade80]" /> WhatsApp
                  </a>
                )}
              </div>
            </div>

            {/* Işıklı çerçeveli fotoğraf */}
            <div data-reveal className="relative mx-auto hidden w-full max-w-[420px] lg:block">
              <div aria-hidden="true" className="absolute -inset-[2px] overflow-hidden rounded-[2rem]">
                <div className="animate-spin-slow absolute left-1/2 top-1/2 size-[200%] -translate-x-1/2 -translate-y-1/2 bg-[conic-gradient(from_0deg,transparent_0deg,#5fd3bc_60deg,transparent_120deg,transparent_180deg,#4fb8dc_240deg,transparent_300deg)]" />
              </div>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-[#071b24]">
                <Photo asset={media.gardenMask} sizes="420px" />
                <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071b24]/80 via-transparent to-transparent" />
              </div>
              <div className="animate-float absolute -left-10 bottom-10 max-w-[260px] rounded-2xl border border-white/15 bg-[#0b2430]/85 p-5 text-white shadow-[0_24px_48px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl">
                <p className="flex items-center gap-2.5 font-semibold">
                  <span className="relative grid size-8 place-items-center rounded-lg bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b]">
                    <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-lg bg-[#2fb59b]/60" />
                    <Sparkle aria-hidden="true" className="relative size-4" />
                  </span>
                  Alana özel plan
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/80">Yöntem, hazırlık ve takip adımları size yazılı olarak iletilir.</p>
              </div>
              <div className="animate-float absolute -right-6 top-10 rounded-2xl border border-white/15 bg-[#0b2430]/85 px-4 py-3 text-white shadow-[0_24px_48px_-16px_rgb(0_0_0/0.7)] backdrop-blur-xl [animation-delay:-3s]">
                <p className="flex items-center gap-2 text-sm font-semibold">
                  <span className="size-2 rounded-full bg-[#4ade80]" /> Önce inceleme
                </p>
                <p className="mt-0.5 text-xs text-white/70">Tür ve kaynak tespiti</p>
              </div>
            </div>
          </div>

          {/* Kayan hizmet şeridi */}
          <div className="relative overflow-hidden border-t border-white/10 py-5 [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)]">
            <div className="animate-marquee flex w-max gap-10 whitespace-nowrap">
              {[...MARQUEE, ...MARQUEE].map((m, i) => (
                <span key={i} aria-hidden={i >= MARQUEE.length} className="flex items-center gap-10 font-display text-lg font-semibold text-white/50">
                  {m}
                  <span aria-hidden="true" className="text-[#5fd3bc]">✦</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
