import Link from "next/link";
import {
  ArrowRight, BadgeCheck, ClipboardCheck, Clock, Eye, FileText, FlaskConical, MessagesSquare, RefreshCw, Target, XCircle,
} from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading, SplitHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/sections/cta-section";
import { media } from "@/content/media";
import { aboutPage as c } from "@/content/pages";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings, listServiceGroups, listServices } from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { ORGANIZATION_ID } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({ ...PAGE_SEO.about, path: "/kurumsal", image: media.inspection });

const PRINCIPLE_ICONS = [Eye, ClipboardCheck, FlaskConical, Target, RefreshCw, MessagesSquare];

export default async function Page() {
  const [settings, groups, services] = await Promise.all([getSiteSettings(), listServiceGroups(), listServices()]);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Kurumsal", item: absoluteUrl("/kurumsal") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "AboutPage",
            name: PAGE_SEO.about.title,
            description: PAGE_SEO.about.description,
            url: absoluteUrl("/kurumsal"),
            about: { "@id": ORGANIZATION_ID },
          },
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={media.inspection} sizes="100vw" priority className="opacity-70" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/25" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/50" />
        <div aria-hidden="true" className="absolute -left-40 top-1/3 size-[560px] rounded-full bg-[#087f6d]/25 blur-[120px]" />
        <div className="container-page relative pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-28">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40 [&_ol]:text-white/70">
            <Breadcrumbs items={[{ label: "Kurumsal" }]} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Eyebrow tone="light">{c.hero.eyebrow}</Eyebrow>
            <h1 className="animate-rise mt-5 text-display font-extrabold">
              {c.hero.titleLead} <span className="hero-word">{c.hero.titleAccent}</span> {c.hero.titleTail}
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">{c.hero.description}</p>
            <div className="animate-rise mt-9 flex flex-col gap-3 [animation-delay:200ms] sm:flex-row">
              <Link
                href="/teklif-al"
                className="group/btn ind-primary inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5 sm:justify-center"
              >
                Teklif al
                <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
              <a
                href="#belgeler"
                className="ind-dark inline-flex min-h-14 items-center justify-center gap-2 rounded-full border border-white/25 bg-white/[0.06] px-7 font-semibold backdrop-blur-md hover:bg-white/12"
              >
                Belgelerimiz <FileText aria-hidden="true" className="size-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── Biz kimiz ───────── */}
      <section aria-labelledby="hakkimizda" className="section-y">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              id="hakkimizda"
              eyebrow={c.about.eyebrow}
              title={
                <>
                  Önce anlamak, <span className="text-gradient">sonra uygulamak</span>
                </>
              }
            />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted" data-reveal>
              {c.about.paragraphs.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>
          </div>
          <div data-reveal className="relative grid grid-cols-5 grid-rows-[repeat(6,56px)] gap-4 sm:grid-rows-[repeat(6,72px)]">
            <div className="relative col-span-3 row-span-6 overflow-hidden rounded-[var(--radius-panel)] shadow-lg">
              <Photo asset={media.technicianHome} sizes="(min-width:1024px) 28vw, 60vw" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[var(--radius-panel)] shadow-md">
              <Photo asset={media.surfaceHygiene} sizes="(min-width:1024px) 18vw, 40vw" />
            </div>
            <div className="relative col-span-2 row-span-3 overflow-hidden rounded-[var(--radius-panel)] shadow-md">
              <Photo asset={media.warehouseTeam} sizes="(min-width:1024px) 18vw, 40vw" />
            </div>
          </div>
        </div>
      </section>

      {/* ───────── İlkeler ───────── */}
      <section aria-labelledby="ilkeler" className="section-y bg-sunken">
        <div className="container-page">
          <SectionHeading
            id="ilkeler"
            eyebrow={c.principles.eyebrow}
            title={
              <>
                Her uygulamada <span className="text-gradient">uyduğumuz kurallar</span>
              </>
            }
            description={c.principles.description}
          />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {c.principles.items.map((p, i) => {
              const Icon = PRINCIPLE_ICONS[i] ?? Eye;
              return (
                <li
                  key={p.title}
                  data-reveal
                  style={{ "--reveal-i": i } as React.CSSProperties}
                  className="group relative overflow-hidden rounded-[var(--radius-card)] border border-border bg-surface p-7 transition-[box-shadow,transform] duration-500 hover:-translate-y-1 hover:shadow-md"
                >
                  <span aria-hidden="true" className="absolute -right-5 -top-7 font-display text-[7rem] font-extrabold leading-none text-mint transition-colors group-hover:text-primary/15">
                    {i + 1}
                  </span>
                  <span className="relative grid size-12 place-items-center rounded-2xl bg-mint text-on-mint">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <h3 className="relative mt-5 font-display text-xl font-bold text-foreground">{p.title}</h3>
                  <p className="relative mt-2 leading-relaxed text-muted">{p.text}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* ───────── Süreç ───────── */}
      <section aria-labelledby="surec" className="section-y">
        <div className="container-page">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#071b24] p-8 text-white sm:p-12 lg:p-16">
            <div aria-hidden="true" className="animate-aurora-a absolute -left-32 -top-32 size-[460px] rounded-full bg-[#087f6d]/35 blur-[110px]" />
            <div aria-hidden="true" className="animate-aurora-b absolute -bottom-40 right-0 size-[420px] rounded-full bg-[#087ea4]/30 blur-[110px]" />
            <div className="relative max-w-2xl">
              <Eyebrow tone="light">{c.process.eyebrow}</Eyebrow>
              <h2 id="surec" data-split className="mt-5 text-h2 font-bold text-white">
                <SplitHeading>
                  <>
                    Talepten takibe <span className="text-gradient">beş adım</span>
                  </>
                </SplitHeading>
              </h2>
            </div>
            <ol className="relative mt-12 grid gap-4 md:grid-cols-5">
              {c.process.steps.map((s, i) => (
                <li
                  key={s.title}
                  data-reveal
                  style={{ "--reveal-i": i } as React.CSSProperties}
                  className="rounded-2xl border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md"
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] font-display font-extrabold text-[#04201b]">
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 font-display font-bold">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/70">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ───────── Söz vermediklerimiz ───────── */}
      <section aria-labelledby="yapmadiklarimiz" className="section-y pt-0">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
            <SectionHeading
              id="yapmadiklarimiz"
              eyebrow={c.commitments.eyebrow}
              title={
                <>
                  Söz vermediklerimiz <span className="text-gradient">de önemli</span>
                </>
              }
              description={c.commitments.description}
            />
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {c.commitments.items.map((it, i) => (
              <li
                key={it.title}
                data-reveal
                style={{ "--reveal-i": i } as React.CSSProperties}
                className="rounded-[var(--radius-card)] border border-border bg-surface p-7 shadow-xs"
              >
                <span className="grid size-11 place-items-center rounded-xl bg-[#f59e0b]/12 text-[#b45309] dark:text-[#fbbf24]">
                  <XCircle aria-hidden="true" className="size-5" />
                </span>
                <h3 className="mt-4 font-display text-lg font-bold text-foreground">{it.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{it.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────── Belge şeffaflığı ───────── */}
      <section id="belgeler" aria-labelledby="belgeler-baslik" className="section-y scroll-mt-32 bg-sunken">
        <div className="container-page">
          <SectionHeading
            id="belgeler-baslik"
            eyebrow={c.documents.eyebrow}
            title={
              <>
                Belge <span className="text-gradient">şeffaflığı</span>
              </>
            }
            description={c.documents.description}
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {c.documents.items.map((d, i) => (
              <li
                key={d.key}
                data-reveal
                style={{ "--reveal-i": i } as React.CSSProperties}
                className="flex flex-col rounded-[var(--radius-card)] border border-border bg-surface p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-on-mint">
                    {d.verified ? <BadgeCheck aria-hidden="true" className="size-5" /> : <FileText aria-hidden="true" className="size-5" />}
                  </span>
                  {d.verified && d.value ? null : (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong bg-sunken px-3 py-1 text-xs font-semibold text-muted">
                      <Clock aria-hidden="true" className="size-3.5" /> {c.documents.pendingLabel}
                    </span>
                  )}
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-foreground">{d.title}</h3>
                <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-muted">{d.description}</p>
                {d.verified && d.value && <p className="mt-4 font-semibold text-foreground">{d.value}</p>}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
            {c.documents.note} Hangi belgelerin neden önemli olduğunu{" "}
            <Link href="/blog/ilaclama-hizmeti-secerken-hangi-belgelere-bakilmali" className="font-semibold text-primary hover:underline">
              rehberimizde
            </Link>{" "}
            anlattık.
          </p>
        </div>
      </section>

      {/* ───────── Hizmet alanları ───────── */}
      <section aria-labelledby="alanlar" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="alanlar"
            eyebrow="Hizmet alanlarımız"
            title={
              <>
                Konuttan işletmeye <span className="text-gradient">tek yaklaşım</span>
              </>
            }
            action={
              <Link href="/hizmetlerimiz" className="inline-flex min-h-12 items-center gap-1.5 font-semibold text-primary hover:underline">
                Tüm hizmetler <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <ul className="mt-12 grid gap-4 md:grid-cols-3">
            {groups.map((g, i) => (
              <li key={g.key} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <Link
                  href={`/hizmetlerimiz#${g.key}`}
                  className="group flex h-full flex-col rounded-[var(--radius-panel)] border border-border bg-surface p-7 transition-[box-shadow,border-color] hover:border-border-strong hover:shadow-md"
                >
                  <span className="font-display text-sm font-bold text-primary">
                    {services.filter((s) => s.group === g.key).length} hizmet
                  </span>
                  <span className="mt-2 font-display text-xl font-bold text-foreground">{g.title}</span>
                  <span className="mt-2 flex-1 text-muted">{g.description}</span>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                    İncele <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsappHref(settings)} />
    </>
  );
}
