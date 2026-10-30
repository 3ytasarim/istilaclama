import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { HeroFloaters } from "@/components/sections/hero-floaters";
import { CtaSection } from "@/components/sections/cta-section";
import { RelatedLinks, SeoNote } from "@/components/regions/region-ui";
import { media } from "@/content/media";
import { pestGuides } from "@/content/pest-guide";
import { PEST_GROUPS, type PestGroup } from "@/content/pest-guide-types";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { cn } from "@/lib/utils";
import { getSiteSettings } from "@/server/content";

export const metadata: Metadata = {
  title: "Böcek Rehberi: Ev Zararlılarını Tanıma ve Önleme",
  description:
    "Hamam böceği, tahta kurusu, pire, fare ve diğer ev zararlılarını fotoğraflarla tanıyın; belirtileri, riskleri ve önleme yollarını öğrenin.",
  alternates: { canonical: "/bocek-rehberi" },
};

const FAQ = [
  {
    q: "Evde gördüğüm böceğin türünü nasıl anlarım?",
    a: "Boyutuna, rengine, görüldüğü yere ve saatine bakın; rehberdeki kimlik kartlarıyla karşılaştırın. Emin olamazsanız net bir fotoğrafını çekip teklif formu veya WhatsApp üzerinden paylaşabilirsiniz; kesin tespit yerinde inceleme ile yapılır.",
  },
  {
    q: "Hangi durumlarda profesyonel destek almak gerekir?",
    a: "Zararlı her gün görülüyorsa, sayısı artıyorsa, birden fazla odaya yayıldıysa, ısırık veya sağlık şikâyeti varsa ya da önleyici tedbirlere rağmen sorun sürüyorsa profesyonel inceleme önerilir.",
  },
  {
    q: "Rehberdeki bilgiler ilaçlama yerine geçer mi?",
    a: "Hayır. Rehber, zararlıları tanımanıza ve kimyasal içermeyen önlemler almanıza yardımcı olmak için hazırlanmıştır. Uygulama yöntemi; alanın, zararlının ve hane koşullarının değerlendirilmesiyle belirlenir.",
  },
];

export default async function PestGuideIndex() {
  const settings = await getSiteSettings();
  const groups = (Object.keys(PEST_GROUPS) as PestGroup[])
    .map((g) => ({ key: g, title: PEST_GROUPS[g], items: pestGuides.filter((p) => p.group === g) }))
    .filter((g) => g.items.length);
  const whatsapp = whatsappHref(settings);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Böcek Rehberi",
            url: absoluteUrl("/bocek-rehberi"),
            inLanguage: "tr-TR",
            hasPart: pestGuides.map((p) => ({ "@type": "Article", headline: `${p.name} Nedir, Nasıl Tanınır?`, url: absoluteUrl(`/bocek-rehberi/${p.slug}`) })),
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Böcek Rehberi", item: absoluteUrl("/bocek-rehberi") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={media.cockroach} sizes="100vw" priority className="opacity-45" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/60" />
        <HeroFloaters />
        <div className="container-page relative pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-28">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_ol]:text-white/70 [&_span]:text-white [&_svg]:text-white/40">
            <Breadcrumbs items={[{ label: "Böcek Rehberi" }]} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Eyebrow tone="light">Böcek rehberi</Eyebrow>
            <h1 className="animate-rise mt-5 text-display font-extrabold">
              Evdeki zararlıyı <span className="hero-word">tanıyın</span>
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">
              {pestGuides.length} yaygın zararlının fotoğrafı, kimlik kartı, yaşam döngüsü, belirtileri ve kimyasal içermeyen önleme yolları tek
              rehberde.
            </p>
            <ul className="animate-rise mt-8 flex flex-wrap gap-2 [animation-delay:200ms]">
              {groups.map((g) => (
                <li key={g.key}>
                  <a href={`#${g.key}`} className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] px-4 text-sm font-medium backdrop-blur-md hover:bg-white/12">
                    {g.title} <span className="text-white/50">{g.items.length}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {groups.map((g, gi) => (
        <section key={g.key} id={g.key} aria-labelledby={`${g.key}-baslik`} className={cn("section-y scroll-mt-28", gi % 2 === 1 && "bg-sunken")}>
          <div className="container-page">
            <SectionHeading id={`${g.key}-baslik`} eyebrow={String(gi + 1).padStart(2, "0")} title={g.title} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {g.items.map((p, i) => (
                <li key={p.slug} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
                  <Link href={`/bocek-rehberi/${p.slug}`} className="group flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface shadow-xs transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-md">
                    <span className="relative block h-52 overflow-hidden">
                      <Photo asset={media[p.imageKey]} sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                      <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/80 text-navy backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                        <ArrowUpRight aria-hidden="true" className="size-4" />
                      </span>
                    </span>
                    <span className="flex flex-1 flex-col p-6">
                      <span className="font-display text-xl font-bold text-foreground">{p.name}</span>
                      <span className="mt-0.5 text-sm italic text-muted">{p.scientific}</span>
                      <span className="mt-3 line-clamp-3 text-[0.9375rem] leading-relaxed text-muted">{p.summary}</span>
                      <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                        {p.altNames.slice(0, 3).map((n) => (
                          <span key={n} className="rounded-full bg-mint px-2.5 py-0.5 text-xs font-medium text-on-mint">
                            {n}
                          </span>
                        ))}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ))}

      <section aria-labelledby="rehber-sss" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="rehber-sss" eyebrow="Sık sorulan sorular" title={<>Rehber hakkında <span className="text-gradient">merak edilenler</span></>} />
          <div data-reveal>
            <FaqAccordion items={FAQ.map((f, i) => ({ id: `rehber-${i}`, question: f.q, answer: f.a, scope: "genel" as const }))} />
          </div>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} title="Gördüğünüz zararlıyı birlikte tanımlayalım" />

      <SeoNote title="Böcek rehberi — İST İlaçlama">
        <p>
          İST İlaçlama Böcek Rehberi; İstanbul&apos;da evlerde ve iş yerlerinde en sık karşılaşılan hamam böceği, kalorifer böceği, tahta kurusu,
          pire, kene, sivrisinek, fare, sıçan, karınca, gümüş böceği, güve, karasinek, akrep ve örümcekleri tanımanız için hazırlanmıştır. Her
          rehber sayfası zararlının nasıl tanınacağını, yaşam döngüsünü, belirtilerini ve kimyasal içermeyen önleme yollarını anlatır; sorun
          sürüyorsa ilgili böcek ilaçlama ve haşere kontrolü hizmetimize yönlendirir.
        </p>
      </SeoNote>

      <RelatedLinks
        groups={groups.slice(0, 3).map((g) => ({ title: g.title, links: g.items.map((p) => ({ label: p.name, href: `/bocek-rehberi/${p.slug}` })) }))}
      />
    </>
  );
}
