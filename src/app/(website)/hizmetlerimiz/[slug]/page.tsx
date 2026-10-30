import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  AlertTriangle, ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, Eye, FlaskConical, MapPin, Sparkles,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading, SplitHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { CtaSection } from "@/components/sections/cta-section";
import { blogMedia, media, serviceMedia } from "@/content/media";
import { getServiceDetail } from "@/content/service-details";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { buildMetadata } from "@/lib/seo/metadata";
import { SERVICE_SEO } from "@/lib/seo/keywords";
import { breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import {
  getService, getSiteSettings, listBlogPosts, listDistricts, listServiceGroups, listServices,
} from "@/server/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listServices()).map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService((await params).slug);
  if (!service) return {};
  const detail = getServiceDetail(service.slug);
  const seo = SERVICE_SEO[service.slug];
  return buildMetadata({
    title: seo ? [seo.title, `${service.title} İstanbul`] : [`${service.title} İstanbul`, service.title],
    description: seo?.description ?? detail?.summary ?? service.excerpt,
    path: `/hizmetlerimiz/${service.slug}`,
    image: serviceMedia(service.slug),
    // İçeriği tamamlanmamış hizmetler indekslenmez
    noindex: !detail,
  });
}

const TOC = [
  { id: "belirtiler", label: "Belirtiler" },
  { id: "riskler", label: "Riskler" },
  { id: "surec", label: "Süreç" },
  { id: "yontemler", label: "Yöntemler" },
  { id: "hazirlik", label: "Hazırlık" },
  { id: "bolgeler", label: "Bölgeler" },
  { id: "sss", label: "SSS" },
];

export default async function ServicePage({ params }: Props) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const [detail, settings, allServices, groups, districts, posts] = await Promise.all([
    getServiceDetail(slug),
    getSiteSettings(),
    listServices(),
    listServiceGroups(),
    listDistricts(),
    listBlogPosts(),
  ]);
  const group = groups.find((g) => g.key === service.group);
  const hero = serviceMedia(slug);
  const whatsapp = whatsappHref(settings, { service: service.title });
  const related = (detail?.related ?? allServices.filter((s) => s.group === service.group && s.slug !== slug).map((s) => s.slug))
    .map((r) => allServices.find((s) => s.slug === r))
    .filter((s) => s !== undefined)
    .slice(0, 4);
  const keyword = service.shortTitle.toLocaleLowerCase("tr").split(" ")[0] ?? "";
  const relatedPosts = [...new Set([...posts.filter((p) => p.title.toLocaleLowerCase("tr").includes(keyword)), ...posts])].slice(0, 3);
  const popular = ["kadikoy", "uskudar", "atasehir", "umraniye", "maltepe", "besiktas", "sisli", "bakirkoy", "beylikduzu", "pendik"]
    .map((s) => districts.find((d) => d.slug === s))
    .filter((d) => d !== undefined);

  const crumbs = [
    { label: "Hizmetlerimiz", href: "/hizmetlerimiz" },
    { label: service.title },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Hizmetlerimiz", path: "/hizmetlerimiz" },
            { name: service.title, path: `/hizmetlerimiz/${slug}` },
          ]),
          serviceJsonLd({
            name: service.title,
            serviceType: service.title,
            description: detail?.summary ?? service.excerpt,
            path: `/hizmetlerimiz/${slug}`,
            image: hero.src,
          }),
          // SSS bölümü sayfada görünür (FaqAccordion)
          ...(detail?.faq.length ? [faqPageJsonLd(detail.faq)] : []),
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={hero} sizes="100vw" priority className="opacity-80" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/50" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[560px] rounded-full bg-[#087f6d]/25 blur-[120px]" />

        <div className="container-page relative pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-28">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40 [&_ol]:text-white/70">
            <Breadcrumbs items={crumbs} />
          </div>
          <div className="mt-10 grid items-end gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="max-w-3xl">
              <Eyebrow tone="light">{group?.title ?? "Hizmet"}</Eyebrow>
              <h1 className="animate-rise mt-5 text-display font-extrabold">
                {service.title.split(" ").slice(0, -1).join(" ")}{" "}
                <span className="hero-word">{service.title.split(" ").slice(-1)}</span>
              </h1>
              <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">
                {detail?.summary ?? service.excerpt}
              </p>
              <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:200ms] sm:flex-row">
                <Link
                  href={`/teklif-al?hizmet=${slug}`}
                  className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full sm:justify-center bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5"
                >
                  Bu hizmet için teklif al
                  <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                    <ArrowRight aria-hidden="true" className="size-4" />
                  </span>
                </Link>
                {whatsapp && (
                  <a href={whatsapp} target="_blank" rel="noopener" className="inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 px-7 font-semibold">
                    WhatsApp ile sorun
                  </a>
                )}
                <a href="#belirtiler" className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 font-semibold backdrop-blur-md hover:bg-white/12">
                  Detayları incele <ChevronDown aria-hidden="true" className="size-4" />
                </a>
              </div>
            </div>

            {/* Hızlı bilgi kartı */}
            <ul className="animate-rise grid gap-3 [animation-delay:280ms] sm:grid-cols-3 lg:grid-cols-1">
              {[
                { icon: Eye, t: "Önce inceleme", d: "Tür ve kaynak tespiti" },
                { icon: ClipboardCheck, t: "Yazılı plan", d: "Yöntem, hazırlık, takvim" },
                { icon: FlaskConical, t: "Etikete uygun", d: "Ürün talimatlarına uyum" },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex items-center gap-4 rounded-2xl border border-white/12 bg-white/[0.07] p-4 backdrop-blur-md">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b]">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span>
                    <span className="block font-semibold">{t}</span>
                    <span className="block text-sm text-white/65">{d}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {detail ? (
        <>
          {/* Sayfa içi gezinme — sabit değil; hero'nun altına taşan cam panel */}
          <nav aria-label="Sayfa içeriği" className="container-page relative z-20 -mt-8 sm:-mt-9">
            <div className="animate-rise relative overflow-hidden rounded-[1.5rem] border border-white/70 bg-surface/90 p-2 shadow-[0_24px_60px_-24px_rgb(16_51_66/0.45)] backdrop-blur-xl [animation-delay:320ms] dark:border-border">
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <ul className="flex items-center gap-1 overflow-x-auto [mask-image:linear-gradient(to_right,#000_82%,transparent)] [scrollbar-width:none] lg:[mask-image:none]">
                {TOC.map((t, i) => (
                  <li key={t.id} className="animate-rise shrink-0" style={{ animationDelay: `${380 + i * 60}ms` }}>
                    <a
                      href={`#${t.id}`}
                      className="group/toc relative inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-2xl px-4 text-sm font-semibold text-muted transition-[background-color,color] duration-300 hover:bg-mint hover:text-on-mint"
                    >
                      <span className="grid size-6 place-items-center rounded-lg bg-sunken font-display text-[0.6875rem] font-bold text-primary transition-colors duration-300 group-hover/toc:bg-primary group-hover/toc:text-primary-foreground">
                        {i + 1}
                      </span>
                      {t.label}
                      <span aria-hidden="true" className="absolute inset-x-4 bottom-1.5 h-0.5 origin-left scale-x-0 rounded-full bg-brand-gradient transition-transform duration-500 ease-[var(--ease-out)] group-hover/toc:scale-x-100" />
                    </a>
                  </li>
                ))}
                <li className="ml-auto shrink-0 pl-2">
                  <Link
                    href={`/teklif-al?hizmet=${slug}`}
                    className="group/btn inline-flex min-h-12 items-center gap-2 whitespace-nowrap rounded-2xl bg-navy px-5 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 dark:bg-primary dark:text-primary-foreground"
                  >
                    Teklif al <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover/btn:translate-x-0.5" />
                  </Link>
                </li>
              </ul>
            </div>
          </nav>

          {/* Giriş + görsel */}
          <section aria-labelledby="giris" className="section-y">
            <div className="container-page grid items-center gap-14 lg:grid-cols-2">
              <div>
                <SectionHeading id="giris" eyebrow="Hizmet hakkında" title={<>{service.title} <span className="text-gradient">nasıl planlanır?</span></>} />
                <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted" data-reveal>
                  {detail.intro.map((p) => (
                    <p key={p.slice(0, 20)}>{p}</p>
                  ))}
                </div>
              </div>
              <div data-reveal className="relative">
                <div className="relative aspect-[4/3.4] overflow-hidden rounded-[var(--radius-panel)] shadow-lg">
                  <Photo asset={media[detail.gallery[0] ?? "inspection"]} sizes="(min-width:1024px) 45vw, 100vw" />
                </div>
                <div className="glass absolute -bottom-6 -left-4 max-w-[280px] rounded-2xl border border-white/70 p-5 shadow-lg sm:-left-8 dark:border-border">
                  <p className="flex items-center gap-2 font-semibold text-foreground">
                    <Sparkles aria-hidden="true" className="size-4 text-primary" /> Uygun olduğu alanlar
                  </p>
                  <p className="mt-1.5 text-sm text-muted">{detail.suitableFor.slice(0, 3).join(" · ")}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Belirtiler */}
          <section id="belirtiler" aria-labelledby="belirtiler-baslik" className="section-y scroll-mt-40 bg-sunken">
            <div className="container-page">
              <SectionHeading id="belirtiler-baslik" eyebrow="Belirtiler" title={<>Sorunu <span className="text-gradient">nasıl fark edersiniz?</span></>} description="Aşağıdaki işaretlerden birini veya birkaçını görüyorsanız profesyonel inceleme planlamak faydalı olur." />
              <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {detail.symptoms.map((s, i) => (
                  <li key={s.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-6 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-md">
                    <span aria-hidden="true" className="absolute -right-6 -top-6 font-display text-[7rem] font-extrabold leading-none text-mint transition-colors group-hover:text-primary/15">
                      {i + 1}
                    </span>
                    <span className="relative grid size-11 place-items-center rounded-xl bg-mint text-on-mint">
                      <Eye aria-hidden="true" className="size-5" />
                    </span>
                    <h3 className="relative mt-5 font-display text-lg font-bold text-foreground">{s.title}</h3>
                    <p className="relative mt-1.5 text-[0.9375rem] leading-relaxed text-muted">{s.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Riskler */}
          <section id="riskler" aria-labelledby="riskler-baslik" className="section-y scroll-mt-40">
            <div className="container-page">
              <div className="relative grid gap-10 overflow-hidden rounded-[2rem] bg-[#071b24] p-8 text-white sm:p-12 lg:grid-cols-[1fr_1.2fr] lg:p-16">
                <div aria-hidden="true" className="animate-aurora-a absolute -left-32 -top-32 size-[460px] rounded-full bg-[#087f6d]/35 blur-[110px]" />
                <div className="relative">
                  <Eyebrow tone="light">Riskler</Eyebrow>
                  <h2 id="riskler-baslik" data-split className="mt-5 text-h2 font-bold text-white">
                    <SplitHeading>
                      <>Neden <span className="text-gradient">ertelenmemeli?</span></>
                    </SplitHeading>
                  </h2>
                  <p className="mt-5 text-white/70">Erken müdahale, sorunun yayılmasını ve uygulamanın kapsamının büyümesini önler.</p>
                </div>
                <ul className="relative grid gap-3">
                  {detail.risks.map((r, i) => (
                    <li key={r} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="flex gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md">
                      <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#f59e0b]/15 text-[#fbbf24]">
                        <AlertTriangle aria-hidden="true" className="size-5" />
                      </span>
                      <p className="self-center text-white/85">{r}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Süreç */}
          <section id="surec" aria-labelledby="surec-detay" className="section-y scroll-mt-40 pt-0">
            <div className="container-page">
              <SectionHeading id="surec-detay" eyebrow="Kontrol süreci" title={<>Adım adım <span className="text-gradient">uygulama planı</span></>} align="center" />
              <ol className="relative mt-14 grid gap-5 md:grid-cols-5">
                <span aria-hidden="true" className="absolute left-[10%] right-[10%] top-7 hidden h-px bg-gradient-to-r from-primary via-accent to-primary md:block" />
                {detail.process.map((p, i) => (
                  <li key={p.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="relative flex gap-4 md:flex-col md:items-center md:text-center">
                    <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl bg-brand-gradient font-display text-lg font-extrabold text-white shadow-[0_14px_30px_-10px_rgb(8_127_109/0.7)] ring-4 ring-background">
                      0{i + 1}
                    </span>
                    <div>
                      <h3 className="font-display font-bold text-foreground md:mt-4">{p.title}</h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* Yöntemler */}
          <section id="yontemler" aria-labelledby="yontem-baslik" className="section-y scroll-mt-40 bg-sunken">
            <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+90px)] lg:self-start">
                <SectionHeading id="yontem-baslik" eyebrow="Kullanılan yöntemler" title={<>Alana göre <span className="text-gradient">seçilen yöntem</span></>} description="Yöntem; zararlının türüne, alanın kullanımına ve hane/işletme koşullarına göre birlikte belirlenir. Dozaj ve ürün bilgisi yetkili uygulayıcı tarafından, etiket talimatlarına göre planlanır." />
              </div>
              <ul className="grid gap-4 sm:grid-cols-2">
                {detail.methods.map((m, i) => (
                  <li key={m.title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-xs">
                    <span className="font-display text-sm font-bold text-primary">0{i + 1}</span>
                    <h3 className="mt-3 font-display text-xl font-bold text-foreground">{m.title}</h3>
                    <p className="mt-2 leading-relaxed text-muted">{m.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Hazırlık: önce / sonra */}
          <section id="hazirlik" aria-labelledby="hazirlik-baslik" className="section-y scroll-mt-40">
            <div className="container-page">
              <SectionHeading id="hazirlik-baslik" eyebrow="Hazırlık" title={<>Uygulama <span className="text-gradient">öncesi ve sonrası</span></>} align="center" />
              <div className="mt-12 grid gap-5 lg:grid-cols-2">
                {[
                  { t: "Uygulama öncesi", items: detail.before, tone: "bg-mint/60 border-primary/15" },
                  { t: "Uygulama sonrası", items: detail.after, tone: "bg-ice border-accent/15" },
                ].map((b) => (
                  <div key={b.t} data-reveal className={`rounded-[var(--radius-panel)] border p-8 sm:p-10 ${b.tone}`}>
                    <h3 className="font-display text-2xl font-bold text-foreground">{b.t}</h3>
                    <ul className="mt-6 space-y-4">
                      {b.items.map((it) => (
                        <li key={it} className="flex gap-3">
                          <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                            <Check aria-hidden="true" className="size-3.5" />
                          </span>
                          <span className="text-foreground/85">{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Galeri + uygun alanlar */}
          <section aria-labelledby="alanlar-baslik" className="pb-[clamp(4rem,2.8rem+5vw,7.5rem)]">
            <div className="container-page">
              <div className="grid auto-rows-[220px] gap-4 sm:grid-cols-3 sm:auto-rows-[260px]">
                {detail.gallery.map((g, i) => (
                  <div key={g} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className={`relative overflow-hidden rounded-[var(--radius-panel)] ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""}`}>
                    <Photo asset={media[g]} sizes={i === 0 ? "(min-width:640px) 66vw, 100vw" : "(min-width:640px) 33vw, 100vw"} className="transition-transform duration-[1.2s] hover:scale-105" />
                  </div>
                ))}
              </div>
              <div className="mt-10 flex flex-col gap-5 md:flex-row md:items-center">
                <h2 id="alanlar-baslik" className="shrink-0 font-display text-lg font-bold text-foreground">Uygun olduğu alanlar:</h2>
                <ul className="flex flex-wrap gap-2">
                  {detail.suitableFor.map((s) => (
                    <li key={s} className="rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/85">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Bölgeler */}
          <section id="bolgeler" aria-labelledby="bolge-baslik" className="section-y scroll-mt-40 bg-sunken">
            <div className="container-page grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <SectionHeading id="bolge-baslik" eyebrow="Hizmet bölgeleri" title={<>İstanbul’da <span className="text-gradient">bölgenizi seçin</span></>} description="Bölge sayfalarında ilçenize özel hizmet kapsamını ve iletişim seçeneklerini bulabilirsiniz." />
              <div data-reveal>
                <ul className="flex flex-wrap gap-2.5">
                  {popular.map((d) => (
                    <li key={d.slug}>
                      <Link href={`/hizmet-bolgeleri/istanbul/${d.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-surface px-5 font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-mint">
                        <MapPin aria-hidden="true" className="size-4 text-primary" /> {d.name}
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link href="/hizmet-bolgeleri" className="mt-6 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline">
                  Tüm bölgeler <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
              </div>
            </div>
          </section>

          {/* SSS */}
          <section id="sss" aria-labelledby="sss-detay" className="section-y scroll-mt-40">
            <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
              <SectionHeading id="sss-detay" eyebrow="Sık sorulan sorular" title={<>{service.shortTitle} <span className="text-gradient">hakkında</span></>} />
              <div data-reveal>
                <FaqAccordion items={detail.faq.map((f, i) => ({ id: `${slug}-${i}`, question: f.q, answer: f.a, scope: "hizmet" as const }))} />
              </div>
            </div>
          </section>
        </>
      ) : (
        <section className="section-y">
          <div className="container-page">
            <div className="rounded-[var(--radius-panel)] border border-dashed border-border-strong bg-sunken p-8 text-muted sm:p-10">
              Bu hizmetin detaylı içeriği (belirtiler, riskler, süreç, hazırlık ve SSS) hazırlanıyor ve uzman onayından sonra
              yayınlanacak. Bu sırada sorunuzu teklif formu üzerinden iletebilirsiniz.
            </div>
          </div>
        </section>
      )}

      {/* İlgili hizmetler */}
      {related.length > 0 && (
        <section aria-labelledby="ilgili-baslik" className="section-y bg-sunken">
          <div className="container-page">
            <SectionHeading id="ilgili-baslik" eyebrow="İlgili hizmetler" title={<>Bunlar da <span className="text-gradient">ilginizi çekebilir</span></>} />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {related.map((r, i) => (
                <li key={r.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                  <Link href={`/hizmetlerimiz/${r.slug}`} className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white">
                    <Photo asset={serviceMedia(r.slug)} sizes="(min-width:1024px) 25vw, 50vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/40 to-transparent" />
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </span>
                    <span className="relative">
                      <span className="block font-display text-xl font-bold">{r.title}</span>
                      <span className="mt-1 line-clamp-2 block text-sm text-white/75">{r.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* İlgili rehberler */}
      <section aria-labelledby="rehber-baslik" className="section-y">
        <div className="container-page">
          <SectionHeading id="rehber-baslik" eyebrow="Bilgi merkezi" title={<>İlgili <span className="text-gradient">rehberler</span></>} />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <article className="group relative overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Photo asset={blogMedia(p.slug)} sizes="(min-width:768px) 33vw, 100vw" decorative className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">{p.title}</Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection
        phone={phoneLink(settings)}
        whatsapp={whatsapp}
        title={`${service.title} için size uygun planı birlikte hazırlayalım`}
      />
    </>
  );
}
