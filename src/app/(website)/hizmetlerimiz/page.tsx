import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardCheck, Eye, FlaskConical, RefreshCw } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { ServiceIcon } from "@/components/ui/service-icon";
import { CtaSection } from "@/components/sections/cta-section";
import { media, serviceMedia } from "@/content/media";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings, listServiceGroups, listServices } from "@/server/content";
import type { ServiceGroupKey } from "@/types/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.services, path: "/hizmetlerimiz" });

const GROUP_INTRO: Record<ServiceGroupKey, { eyebrow: string; accent: string }> = {
  hasere: { eyebrow: "Zararlı türü", accent: "türüne göre" },
  "yasam-alani": { eyebrow: "Yaşam alanı", accent: "alanınıza göre" },
  kurumsal: { eyebrow: "İşletmeler", accent: "işletmeniz için" },
};

const GROUP_TITLE: Record<ServiceGroupKey, string> = {
  hasere: "Zararlının",
  "yasam-alani": "Kullanım",
  kurumsal: "Kayıtlı programlar",
};

const APPROACH = [
  { icon: Eye, title: "İnceleme", text: "Tür, yoğunluk ve kaynak noktalarının tespiti." },
  { icon: ClipboardCheck, title: "Yazılı plan", text: "Yöntem, hazırlık listesi ve takvim." },
  { icon: FlaskConical, title: "Etikete uygun uygulama", text: "Yetkili uygulayıcı, ruhsatlı ürün." },
  { icon: RefreshCw, title: "Takip", text: "Sonucun değerlendirilmesi ve öneriler." },
];

export default async function Page() {
  const [groups, services, settings] = await Promise.all([listServiceGroups(), listServices(), getSiteSettings()]);
  const whatsapp = whatsappHref(settings);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Hizmetlerimiz", item: absoluteUrl("/hizmetlerimiz") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Haşere kontrolü hizmetleri",
            itemListElement: services.map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(`/hizmetlerimiz/${s.slug}`),
            })),
          },
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={media.heroTechnician} sizes="100vw" priority className="opacity-75" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/50" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[560px] rounded-full bg-[#087f6d]/25 blur-[120px]" />

        <div className="container-page relative pb-16 pt-[calc(var(--header-h)+2.5rem)] sm:pb-24">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40 [&_ol]:text-white/70">
            <Breadcrumbs items={[{ label: "Hizmetlerimiz" }]} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Eyebrow tone="light">{services.length} hizmet · 3 kategori</Eyebrow>
            <h1 className="animate-rise mt-5 text-display font-extrabold">
              Haşere kontrolü <span className="hero-word">hizmetlerimiz</span>
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">
              Zararlının türüne, alanın kullanımına ve işletmenizin denetim ihtiyaçlarına göre planlanan uygulamalar. Her
              hizmet inceleme ile başlar, yazılı plan ve takip ile tamamlanır.
            </p>
          </div>

          <ul className="animate-rise mt-10 grid gap-3 [animation-delay:200ms] sm:grid-cols-3">
            {groups.map((g) => (
              <li key={g.key}>
                <a
                  href={`#${g.key}`}
                  className="ind-dark group flex min-h-16 items-center justify-between gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-md transition-colors hover:bg-white/12"
                >
                  <span>
                    <span className="block font-semibold">{g.title}</span>
                    <span className="block text-sm text-white/65">
                      {services.filter((s) => s.group === g.key).length} hizmet
                    </span>
                  </span>
                  <ArrowRight aria-hidden="true" className="size-4 shrink-0 rotate-90 text-white/70 transition-transform group-hover:translate-y-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Yaklaşım bandı ───────── */}
      <section aria-label="Tüm hizmetlerde ortak yaklaşım" className="border-b border-border bg-sunken">
        <ol className="container-page grid gap-4 py-8 sm:grid-cols-2 lg:grid-cols-4">
          {APPROACH.map(({ icon: Icon, title, text }, i) => (
            <li key={title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-on-mint">
                <Icon aria-hidden="true" className="size-5" />
              </span>
              <span>
                <span className="block font-display font-bold text-foreground">
                  <span className="text-primary">0{i + 1}</span> {title}
                </span>
                <span className="block text-sm text-muted">{text}</span>
              </span>
            </li>
          ))}
        </ol>
      </section>

      {/* ───────── Gruplar ───────── */}
      {groups.map((g, gi) => {
        const items = services.filter((s) => s.group === g.key);
        const intro = GROUP_INTRO[g.key];
        // 3 sütunda boş hücre kalmasın: kalan 2 ise ilk kart, kalan 1 ise ilk ve son kart geniş
        const rem = items.length % 3;
        const wide = (i: number) => (rem === 2 && i === 0) || (rem === 1 && (i === 0 || i === items.length - 1));
        return (
          <section
            key={g.key}
            id={g.key}
            aria-labelledby={`grup-${g.key}`}
            className={`section-y scroll-mt-32 ${gi % 2 === 1 ? "bg-sunken" : ""}`}
          >
            <div className="container-page">
              <SectionHeading
                id={`grup-${g.key}`}
                eyebrow={intro.eyebrow}
                title={
                  <>
                    {GROUP_TITLE[g.key]} <span className="text-gradient">{intro.accent}</span>
                  </>
                }
                description={g.description}
              />
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((s, i) => (
                  <li
                    key={s.slug}
                    data-reveal
                    style={{ "--reveal-i": i % 6 } as React.CSSProperties}
                    className={wide(i) ? "lg:col-span-2" : ""}
                  >
                    <Link
                      href={`/hizmetlerimiz/${s.slug}`}
                      className="group relative flex h-80 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white"
                    >
                      <Photo
                        asset={serviceMedia(s.slug)}
                        sizes={wide(i) ? "(min-width:1024px) 66vw, (min-width:640px) 50vw, 100vw" : "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"}
                        className="transition-transform duration-[1.2s] group-hover:scale-[1.06]"
                      />
                      <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/55 to-[#06161d]/5" />
                      <span className="absolute left-5 top-5 grid size-11 place-items-center rounded-xl bg-white/15 text-white backdrop-blur-md">
                        <ServiceIcon name={s.icon} className="size-5" />
                      </span>
                      <span className="absolute right-5 top-5 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                      <span className="relative">
                        <span className="block font-display text-xl font-bold">{s.title}</span>
                        <span className="mt-1.5 line-clamp-2 block text-sm leading-relaxed text-white/80">{s.excerpt}</span>
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        );
      })}

      {/* ───────── Hangi hizmet? ───────── */}
      <section aria-labelledby="secim-baslik" className="section-y">
        <div className="container-page">
          <div className="relative grid gap-10 overflow-hidden rounded-[2rem] bg-[#071b24] p-8 text-white sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
            <div aria-hidden="true" className="animate-aurora-a absolute -left-32 -top-32 size-[460px] rounded-full bg-[#087f6d]/35 blur-[110px]" />
            <div className="relative">
              <Eyebrow tone="light">Emin değil misiniz?</Eyebrow>
              <h2 id="secim-baslik" className="mt-5 text-h2 font-bold text-white">
                Hangi hizmete ihtiyacınız olduğunu <span className="text-gradient">birlikte belirleyelim</span>
              </h2>
              <p className="mt-5 max-w-xl text-white/70">
                Gördüğünüz zararlıyı tanımlayamıyorsanız ya da birden fazla sorun varsa, teklif formunda kısaca anlatmanız
                yeterli. İnceleme sonrasında alanınıza uygun hizmet ve plan önerilir.
              </p>
            </div>
            <div className="relative flex flex-col justify-center gap-3">
              <Link
                href="/teklif-al"
                className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5"
              >
                Sorunu anlatın, plan önerelim
                <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
              <Link
                href="/sik-sorulan-sorular"
                className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 font-semibold backdrop-blur-md hover:bg-white/12"
              >
                Sık sorulan soruları inceleyin
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} />
    </>
  );
}
