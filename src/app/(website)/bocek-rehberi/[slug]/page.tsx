import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BookOpen, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { HeroFloaters } from "@/components/sections/hero-floaters";
import { CtaSection } from "@/components/sections/cta-section";
import { GuideToc } from "@/components/guide/guide-toc";
import { RelatedLinks, SeoNote } from "@/components/regions/region-ui";
import { media, serviceMedia } from "@/content/media";
import { pestGuides } from "@/content/pest-guide";
import { PEST_GROUPS } from "@/content/pest-guide-types";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings, listServices } from "@/server/content";

type Props = { params: Promise<{ slug: string }> };
const find = (slug: string) => pestGuides.find((p) => p.slug === slug) ?? null;

export function generateStaticParams() {
  return pestGuides.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const img = media[p.imageKey];
  const title = `${p.name} Nedir, Nasıl Tanınır? Belirtiler ve Önleme`;
  return {
    title,
    description: p.summary.length > 160 ? `${p.summary.slice(0, 157).replace(/\s+\S*$/, "")}…` : p.summary,
    alternates: { canonical: `/bocek-rehberi/${p.slug}` },
    openGraph: { type: "article", title: `${p.name} Rehberi | İST İlaçlama`, description: p.summary, images: [{ url: img.src, alt: img.alt }] },
  };
}

export default async function PestGuidePage({ params }: Props) {
  const p = find((await params).slug);
  if (!p) notFound();
  const [settings, services] = await Promise.all([getSiteSettings(), listServices()]);
  const service = services.find((s) => s.slug === p.serviceSlug);
  const hero = media[p.imageKey];
  const whatsapp = whatsappLink(settings, `Merhaba, İST İlaçlama web sitesi üzerinden yazıyorum. Konu: ${p.name}. Bilgi ve teklif almak istiyorum.`);
  const toc = [
    ...p.sections.map((s) => ({ id: s.id, title: s.title })),
    { id: "sss", title: "Sık sorulan sorular" },
  ];
  const others = pestGuides.filter((x) => x.slug !== p.slug);
  const sameGroup = others.filter((x) => x.group === p.group);
  const related = [...sameGroup, ...others.filter((x) => x.group !== p.group)].slice(0, 6);
  const url = `/bocek-rehberi/${p.slug}`;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Böcek Rehberi", item: absoluteUrl("/bocek-rehberi") },
              { "@type": "ListItem", position: 3, name: p.name, item: absoluteUrl(url) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Article",
            headline: `${p.name} Nedir, Nasıl Tanınır?`,
            description: p.summary,
            image: absoluteUrl(hero.src),
            mainEntityOfPage: absoluteUrl(url),
            inLanguage: "tr-TR",
            about: { "@type": "Thing", name: p.name, alternateName: [p.scientific, ...p.altNames] },
            author: { "@type": "Organization", name: settings.businessName, url: absoluteUrl("/") },
            publisher: { "@type": "Organization", name: settings.businessName, url: absoluteUrl("/") },
            citation: p.sources.map((s) => s.url),
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: p.faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          },
        ]}
      />

      {/* Hero */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={hero} sizes="100vw" priority className="opacity-70" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/60" />
        <HeroFloaters />
        <div className="container-page relative pb-16 pt-[calc(var(--header-h)+2.5rem)] sm:pb-24">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_ol]:text-white/70 [&_span]:text-white [&_svg]:text-white/40">
            <Breadcrumbs items={[{ label: "Böcek Rehberi", href: "/bocek-rehberi" }, { label: p.name }]} />
          </div>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-3xl">
              <Eyebrow tone="light">{PEST_GROUPS[p.group]}</Eyebrow>
              <h1 className="animate-rise mt-5 text-display font-extrabold">
                <span className="hero-word">{p.name}</span>
              </h1>
              <p className="animate-rise mt-3 font-display text-lg italic text-white/60 [animation-delay:80ms]">{p.scientific}</p>
              <p className="animate-rise mt-6 max-w-2xl text-lead text-white/80 [animation-delay:140ms]">{p.summary}</p>
              {p.altNames.length > 0 && (
                <ul className="animate-rise mt-6 flex flex-wrap gap-2 [animation-delay:200ms]" aria-label="Diğer adları">
                  {p.altNames.map((n) => (
                    <li key={n} className="rounded-full border border-white/15 bg-white/[0.07] px-3 py-1 text-sm text-white/80 backdrop-blur-md">
                      {n}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* Kimlik kartı */}
            <div className="animate-rise relative [animation-delay:260ms]">
              <div aria-hidden="true" className="absolute -inset-px rounded-[1.75rem] bg-gradient-to-b from-white/30 via-white/5 to-[#5fd3bc]/30" />
              <dl className="relative rounded-[1.75rem] bg-[#0b2430]/80 p-6 backdrop-blur-xl">
                <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#8fe3d2]">
                  <BookOpen aria-hidden="true" className="size-4" /> Kimlik kartı
                </p>
                {p.idCard.map((r) => (
                  <div key={r.label} className="flex justify-between gap-4 border-t border-white/10 py-2.5 text-sm first-of-type:border-t-0">
                    <dt className="shrink-0 text-white/55">{r.label}</dt>
                    <dd className="text-right font-medium text-white/90">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* İçerik + içindekiler */}
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-16 lg:py-20">
        <div className="lg:hidden">
          <GuideToc items={toc} variant="mobile" />
        </div>
        <article className="min-w-0">
          {p.sections.map((s, i) => (
            <section key={s.id} id={s.id} aria-labelledby={`${s.id}-baslik`} className="scroll-mt-36 border-b border-border pb-12 pt-4 last:border-b-0 [&:not(:first-child)]:pt-12">
              <div className="flex items-start gap-4">
                <span aria-hidden="true" className="mt-1 font-display text-4xl font-extrabold tabular-nums leading-none text-primary/25 sm:text-5xl">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 id={`${s.id}-baslik`} data-split className="text-h3 font-bold text-foreground sm:text-[1.75rem] sm:leading-tight">
                  {s.title}
                </h2>
              </div>
              <div className="mt-5 space-y-4 text-[1.0625rem] leading-relaxed text-foreground/85">
                {s.paragraphs.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
              </div>
              {s.bullets && s.bullets.length > 0 && (
                <ul className="mt-5 grid gap-2.5 sm:grid-cols-2">
                  {s.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 rounded-xl bg-sunken p-3.5 text-[0.9375rem] text-foreground/85">
                      <CheckCircle2 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" /> {b}
                    </li>
                  ))}
                </ul>
              )}
              {/* Profesyonel destek bölümünde hizmet kartı */}
              {s.id === "profesyonel-destek" && service && (
                <Link
                  href={`/hizmetlerimiz/${service.slug}`}
                  className="group relative mt-8 flex min-h-48 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white sm:p-8"
                >
                  <Photo asset={serviceMedia(service.slug)} sizes="(min-width:1024px) 60vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-105" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d]/90 via-[#06161d]/60 to-transparent" />
                  <span className="relative">
                    <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#8fe3d2]">
                      <ShieldCheck aria-hidden="true" className="size-4" /> İlgili hizmet
                    </span>
                    <span className="mt-2 block font-display text-2xl font-bold">{service.title}</span>
                    <span className="mt-1 block max-w-lg text-sm text-white/75">{service.excerpt}</span>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
                      Hizmeti incele <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </span>
                  </span>
                </Link>
              )}
            </section>
          ))}

          {/* SSS */}
          <section id="sss" aria-labelledby="sss-baslik" className="scroll-mt-36 pt-12">
            <div className="flex items-start gap-4">
              <span aria-hidden="true" className="mt-1 font-display text-4xl font-extrabold tabular-nums leading-none text-primary/25 sm:text-5xl">
                {String(p.sections.length + 1).padStart(2, "0")}
              </span>
              <h2 id="sss-baslik" className="text-h3 font-bold text-foreground sm:text-[1.75rem] sm:leading-tight">
                {p.name} hakkında sık sorulan sorular
              </h2>
            </div>
            <div className="mt-6">
              <FaqAccordion items={p.faq.map((f, i) => ({ id: `${p.slug}-${i}`, question: f.q, answer: f.a, scope: "genel" as const }))} />
            </div>
          </section>

          {/* Kaynaklar */}
          {p.sources.length > 0 && (
            <aside aria-labelledby="kaynaklar" className="mt-12 rounded-[var(--radius-card)] border border-border bg-sunken p-6">
              <h2 id="kaynaklar" className="font-display font-bold text-foreground">Kaynaklar</h2>
              <ul className="mt-3 space-y-2">
                {p.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener nofollow" className="inline-flex items-start gap-2 text-sm text-primary hover:underline">
                      <ExternalLink aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" /> {s.label}
                    </a>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-muted">Bu sayfa genel bilgilendirme amaçlıdır; sağlık şikâyetlerinde hekiminize başvurun.</p>
            </aside>
          )}
        </article>

        <aside className="hidden lg:block">
          <div className="sticky top-[calc(var(--header-h)+1.5rem)] space-y-4">
            <GuideToc items={toc} variant="desktop" />
            <Link
              href={`/teklif-al${service ? `?hizmet=${service.slug}` : ""}`}
              className="group/btn ind-primary flex min-h-14 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-6 pr-2 font-bold text-[#04201b]"
            >
              Teklif alın
              <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                <ArrowRight aria-hidden="true" className="size-4" />
              </span>
            </Link>
          </div>
        </aside>
      </div>

      {/* Diğer zararlılar */}
      <section aria-labelledby="diger-zararlilar" className="section-y bg-sunken">
        <div className="container-page">
          <SectionHeading id="diger-zararlilar" eyebrow="Böcek rehberi" title={<>Diğer <span className="text-gradient">zararlılar</span></>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <li key={r.slug} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
                <Link href={`/bocek-rehberi/${r.slug}`} className="group relative flex h-60 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white">
                  <Photo asset={media[r.imageKey]} sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/40 to-transparent" />
                  <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                  <span className="relative">
                    <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#8fe3d2]">{PEST_GROUPS[r.group]}</span>
                    <span className="mt-1 block font-display text-xl font-bold">{r.name}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} title={`${p.name} sorununu birlikte planlayalım`} />

      <SeoNote title={`${p.name} ilaçlama — İST İlaçlama`}>
        <p>{p.seoText}</p>
      </SeoNote>

      <RelatedLinks
        groups={[
          { title: "İlgili hizmet", links: service ? [{ label: service.title, href: `/hizmetlerimiz/${service.slug}` }] : [] },
          { title: PEST_GROUPS[p.group], links: sameGroup.map((x) => ({ label: x.name, href: `/bocek-rehberi/${x.slug}` })) },
          { title: "Rehber", links: [{ label: "Tüm zararlılar", href: "/bocek-rehberi" }, { label: "Sık sorulan sorular", href: "/sik-sorulan-sorular" }, { label: "Teklif al", href: "/teklif-al" }] },
        ]}
      />
    </>
  );
}
