import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { serviceMedia } from "@/content/media";
import { cn } from "@/lib/utils";
import type { IconKey } from "@/types/content";

type Sector = { title: string; text: string; serviceSlug: string; icon: IconKey };

export function SectorsSection({ sectors }: { sectors: Sector[] }) {
  return (
    <section aria-labelledby="kurumsal-baslik" className="section-y relative overflow-hidden bg-[#071b24] text-white">
      <div aria-hidden="true" className="absolute -left-40 top-0 size-[560px] rounded-full bg-[#087f6d]/25 blur-[120px]" />
      <div aria-hidden="true" className="absolute -right-40 bottom-0 size-[480px] rounded-full bg-[#087ea4]/20 blur-[120px]" />
      <div className="container-page relative">
        <SectionHeading
          tone="light"
          id="kurumsal-baslik"
          eyebrow="Kurumsal hizmetler"
          title="İşletmenizin ritmine uyan zararlı yönetimi"
          description="Gıda güvenliği, misafir deneyimi ve üretim sürekliliği farklı ihtiyaçlar doğurur. Programı sektörünüzün gerekliliklerine göre kurarız."
        />
        <ul className="mt-14 grid auto-rows-[300px] gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {sectors.map((s, i) => (
            <li
              key={s.title}
              data-reveal
              style={{ "--reveal-i": i % 4 } as React.CSSProperties}
              className={cn(i === 0 && "sm:col-span-2 lg:row-span-2", (i === 3 || i === 6) && "lg:col-span-2")}
            >
              <Link
                href={`/hizmetlerimiz/${s.serviceSlug}`}
                className="group relative flex h-full flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 ring-1 ring-white/10"
              >
                <Photo
                  asset={serviceMedia(s.serviceSlug)}
                  sizes="(min-width:1024px) 50vw, (min-width:640px) 50vw, 100vw"
                  className="transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.06]"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071b24] via-[#071b24]/50 to-[#071b24]/0" />
                <span className="absolute right-5 top-5 grid size-11 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-[background-color,transform] duration-500 group-hover:rotate-45 group-hover:bg-white group-hover:text-navy">
                  <ArrowUpRight aria-hidden="true" className="size-5" />
                </span>
                <span className="relative">
                  <h3 className={cn("font-display font-bold tracking-[-0.02em]", i === 0 ? "text-3xl sm:text-4xl" : "text-xl")}>
                    {s.title}
                  </h3>
                  <p className={cn("mt-1.5 text-white/75", i === 0 ? "max-w-md text-base" : "text-sm")}>{s.text}</p>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
