import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { buttonClasses } from "@/components/ui/button";
import { serviceMedia } from "@/content/media";
import { cn } from "@/lib/utils";
import type { ServiceSummary } from "@/types/content";

/**
 * Bento düzeni (lg, 4 kolon):
 * [ 0 (2x2) ][ 1 ][ 2 ]
 * [         ][ 3 (2x1) ]
 * [ 4 ][ 5 ][ 6 ][ CTA ]
 */
const LAYOUT = [
  "lg:col-span-2 lg:row-span-2",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "",
];

export function ServicesSection({ services }: { services: ServiceSummary[] }) {
  const items = services.slice(0, 7);
  return (
    <section aria-labelledby="hizmetler-baslik" className="section-y scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          id="hizmetler-baslik"
          eyebrow="Hizmetlerimiz"
          title={
            <>
              Her zararlı ve her alan için <span className="text-gradient">ayrı bir yaklaşım</span>
            </>
          }
          description="Hamam böceğinden kemirgenlere, evden endüstriyel tesislere kadar; yöntemi zararlının türüne ve alanın kullanımına göre belirliyoruz."
          action={
            <Link href="/hizmetlerimiz" className={buttonClasses("secondary", "lg")}>
              Tüm hizmetler <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />

        <ul className="mt-14 grid auto-rows-[300px] gap-4 sm:auto-rows-[280px] sm:grid-cols-2 lg:grid-cols-4">
          {items.map((s, i) => (
            <li key={s.slug} data-reveal style={{ "--reveal-i": i % 4 } as React.CSSProperties} className={cn(LAYOUT[i])}>
              <Link
                href={`/hizmetlerimiz/${s.slug}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-navy p-6 text-white sm:p-7"
              >
                <Photo
                  asset={serviceMedia(s.slug)}
                  sizes={i === 0 ? "(min-width:1024px) 50vw, 100vw" : "(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"}
                  className="transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.06]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/45 to-transparent" />
                <span aria-hidden="true" className="absolute inset-0 bg-[#087f6d]/0 transition-colors duration-500 group-hover:bg-[#087f6d]/15" />

                <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/15 text-white backdrop-blur-md transition-[background-color,transform] duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-navy">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>

                <span className="relative">
                  <h3 className={cn("font-display font-bold tracking-[-0.02em]", i === 0 ? "text-3xl sm:text-4xl" : "text-xl")}>
                    {s.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-white/75",
                      i === 0 ? "max-w-md text-base" : "line-clamp-2 text-sm",
                    )}
                  >
                    {s.excerpt}
                  </p>
                </span>
              </Link>
            </li>
          ))}
          <li data-reveal className="sm:col-span-2 lg:col-span-1">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[var(--radius-panel)] bg-brand-gradient p-7 text-white">
              <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-25" />
              <p className="relative font-display text-2xl font-bold leading-tight">Aradığınız hizmeti göremediniz mi?</p>
              <div className="relative">
                <p className="text-sm text-white/85">
                  Gözlemlediğiniz zararlıyı ve alanı anlatın, uygun yöntemi birlikte belirleyelim.
                </p>
                <Link href="/teklif-al" className={buttonClasses("light", "md", "mt-5")}>
                  Bize danışın <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
