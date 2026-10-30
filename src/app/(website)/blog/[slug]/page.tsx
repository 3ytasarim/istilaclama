import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, BookOpen, Check, Clock, ExternalLink, ListOrdered, ShieldAlert } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/sections/cta-section";
import { getBlogBody } from "@/content/blog-bodies";
import { blogMedia, serviceMedia } from "@/content/media";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { BRAND, buildMetadata, withSuffix } from "@/lib/seo/metadata";
import { blogPostingJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getBlogPost, getSiteSettings, listBlogCategories, listBlogPosts, listServices } from "@/server/content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await listBlogPosts()).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPost((await params).slug);
  if (!post) return {};
  const body = getBlogBody(post.slug);
  return buildMetadata({
    title: post.title,
    description: withSuffix(post.excerpt, [
      `${BRAND} bilgi merkezinden kaynak gösterilen rehber.`,
      "Kaynak gösterilen rehber.",
    ]),
    path: `/blog/${post.slug}`,
    image: blogMedia(post.slug),
    type: "article",
    publishedTime: post.publishedAt,
    // Gövdesi henüz yazılmamış yazılar indekslenmez
    noindex: !body,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) notFound();

  const [settings, categories, posts, services] = await Promise.all([
    getSiteSettings(),
    listBlogCategories(),
    listBlogPosts(),
    listServices(),
  ]);
  const body = getBlogBody(slug);
  const hero = blogMedia(slug);
  const category = categories.find((c) => c.slug === post.category);
  const relatedServices = (body?.relatedServices ?? [])
    .map((s) => services.find((x) => x.slug === s))
    .filter((s) => s !== undefined)
    .slice(0, 4);
  const relatedPosts = [
    ...posts.filter((p) => p.slug !== slug && p.category === post.category),
    ...posts.filter((p) => p.slug !== slug && p.category !== post.category),
  ].slice(0, 3);
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
            { name: post.title, path: `/blog/${slug}` },
          ]),
          blogPostingJsonLd({
            headline: post.title,
            description: body?.summary ?? post.excerpt,
            path: `/blog/${slug}`,
            image: hero.src,
            section: category?.title,
            datePublished: post.publishedAt,
            citations: body?.sources.map((s) => ({ name: s.title, publisher: s.publisher, url: s.url })),
          }),
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={hero} sizes="100vw" priority className="opacity-60" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/85 to-[#06161d]/30" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/50" />
        <div className="container-page relative pb-16 pt-[calc(var(--header-h)+2.5rem)] sm:pb-24">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40 [&_ol]:text-white/70">
            <Breadcrumbs items={[{ label: "Blog", href: "/blog" }, { label: post.title }]} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Eyebrow tone="light">{category?.title ?? "Rehber"}</Eyebrow>
            <h1 className="animate-rise mt-5 text-page font-extrabold">{post.title}</h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">{post.excerpt}</p>
            <p className="animate-rise mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/70 [animation-delay:200ms]">
              <span className="inline-flex items-center gap-1.5">
                <Clock aria-hidden="true" className="size-4" /> {post.readingMinutes} dk okuma
              </span>
              {body && (
                <span className="inline-flex items-center gap-1.5">
                  <BookOpen aria-hidden="true" className="size-4" /> {body.sources.length} kaynak
                </span>
              )}
              <span>Hazırlayan: {settings.businessName}</span>
            </p>
          </div>
        </div>
      </section>

      {body ? (
        <div className="container-page grid gap-12 py-14 sm:py-20 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-16 xl:grid-cols-[300px_minmax(0,720px)] xl:justify-center">
          {/* İçindekiler */}
          <aside className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
            <details open className="group rounded-[var(--radius-card)] border border-border bg-surface">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-3 px-5 font-display font-bold text-foreground [&::-webkit-details-marker]:hidden">
                <span className="inline-flex items-center gap-2">
                  <ListOrdered aria-hidden="true" className="size-4 text-primary" /> İçindekiler
                </span>
                <ArrowRight aria-hidden="true" className="size-4 text-muted transition-transform group-open:rotate-90" />
              </summary>
              <nav aria-label="İçindekiler" className="border-t border-border px-3 py-3">
                <ol className="space-y-0.5 text-[0.9375rem]">
                  {body.sections.map((s, i) => (
                    <li key={s.id}>
                      <a href={`#${s.id}`} className="flex min-h-10 gap-2 rounded-lg px-2 py-2 text-foreground/85 hover:bg-mint hover:text-on-mint">
                        <span className="font-semibold text-primary">{i + 1}.</span> {s.title}
                      </a>
                      {s.subsections && (
                        <ol className="mb-1 ml-6 border-l border-border pl-2">
                          {s.subsections.map((sub) => (
                            <li key={sub.id}>
                              <a href={`#${sub.id}`} className="flex min-h-9 items-center rounded-lg px-2 text-sm text-muted hover:bg-mint hover:text-on-mint">
                                {sub.title}
                              </a>
                            </li>
                          ))}
                        </ol>
                      )}
                    </li>
                  ))}
                  <li>
                    <a href="#kaynaklar" className="flex min-h-10 items-center gap-2 rounded-lg px-2 text-foreground/85 hover:bg-mint hover:text-on-mint">
                      <span className="font-semibold text-primary">↗</span> Kaynaklar
                    </a>
                  </li>
                </ol>
              </nav>
            </details>
            <Link
              href="/teklif-al"
              className="mt-4 hidden min-h-12 items-center justify-center gap-2 rounded-full bg-navy px-5 font-semibold text-white lg:flex dark:bg-primary dark:text-primary-foreground"
            >
              Teklif al <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </aside>

          <article className="min-w-0">
            {/* Özet */}
            <div className="rounded-[var(--radius-panel)] border border-primary/15 bg-mint/50 p-7 sm:p-8">
              <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-on-mint">Kısaca</p>
              <p className="mt-3 text-lg leading-relaxed text-foreground">{body.summary}</p>
              <ul className="mt-6 space-y-3">
                {body.keyTakeaways.map((k) => (
                  <li key={k} className="flex gap-3">
                    <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Check aria-hidden="true" className="size-3.5" />
                    </span>
                    <span className="text-foreground/85">{k}</span>
                  </li>
                ))}
              </ul>
            </div>

            {body.sections.map((s) => (
              <section key={s.id} aria-labelledby={s.id} className="mt-14">
                <h2 id={s.id} className="scroll-mt-36 font-display text-[clamp(1.5rem,1.2rem+1.2vw,2rem)] font-bold leading-tight text-foreground">
                  {s.title}
                </h2>
                <div className="mt-5 space-y-5 text-[1.0625rem] leading-[1.8] text-foreground/80">
                  {s.paragraphs.map((p) => (
                    <p key={p.slice(0, 32)}>{p}</p>
                  ))}
                </div>
                {s.bullets && (
                  <ul className="mt-6 space-y-3 rounded-[var(--radius-card)] border border-border bg-surface p-6">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-3 leading-relaxed text-foreground/85">
                        <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-primary" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                {s.subsections?.map((sub) => (
                  <div key={sub.id} className="mt-8">
                    <h3 id={sub.id} className="scroll-mt-36 font-display text-h3 font-bold text-foreground">
                      {sub.title}
                    </h3>
                    <div className="mt-3 space-y-4 text-[1.0625rem] leading-[1.8] text-foreground/80">
                      {sub.paragraphs.map((p) => (
                        <p key={p.slice(0, 32)}>{p}</p>
                      ))}
                    </div>
                    {sub.bullets && (
                      <ul className="mt-4 space-y-2.5">
                        {sub.bullets.map((b) => (
                          <li key={b} className="flex gap-3 leading-relaxed text-foreground/85">
                            <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-primary" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </section>
            ))}

            {/* Uyarı */}
            <p className="mt-14 flex gap-3 rounded-[var(--radius-card)] border border-border bg-sunken p-5 text-sm leading-relaxed text-muted">
              <ShieldAlert aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-primary" />
              Bu rehber genel bilgilendirme amaçlıdır ve uzman incelemesinin yerini tutmaz. Sağlıkla ilgili şikâyetlerde
              hekiminize başvurun; biyosidal ürünler yalnızca yetkili uygulayıcılar tarafından, etiket talimatlarına uygun
              şekilde kullanılmalıdır.
            </p>

            {/* Kaynaklar */}
            <section id="kaynaklar" aria-labelledby="kaynaklar-baslik" className="mt-12 scroll-mt-36">
              <h2 id="kaynaklar-baslik" className="font-display text-2xl font-bold text-foreground">
                Kaynaklar
              </h2>
              <ol className="mt-5 space-y-3">
                {body.sources.map((src, i) => (
                  <li key={src.url}>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5 transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-sm"
                    >
                      <span className="font-display font-bold text-primary">[{i + 1}]</span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-semibold text-foreground group-hover:text-primary">{src.title}</span>
                        <span className="mt-0.5 block text-sm text-muted">{src.publisher}</span>
                        <span className="mt-1 block truncate text-xs text-muted">{src.url.replace(/^https?:\/\//, "")}</span>
                      </span>
                      <ExternalLink aria-hidden="true" className="mt-1 size-4 shrink-0 text-muted" />
                      <span className="sr-only">(yeni sekmede açılır)</span>
                    </a>
                  </li>
                ))}
              </ol>
            </section>
          </article>
        </div>
      ) : (
        <div className="container-page py-14">
          <div className="rounded-[var(--radius-card)] border border-dashed border-border-strong bg-sunken p-8 text-muted">
            Bu yazının gövdesi kaynaklı olarak hazırlanıyor ve uzman onayından sonra yayınlanacaktır.
          </div>
        </div>
      )}

      {/* İlgili hizmetler */}
      {relatedServices.length > 0 && (
        <section aria-labelledby="ilgili-hizmet" className="section-y bg-sunken">
          <div className="container-page">
            <SectionHeading
              id="ilgili-hizmet"
              eyebrow="İlgili hizmetler"
              title={
                <>
                  Bu konuda <span className="text-gradient">destek alın</span>
                </>
              }
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {relatedServices.map((r, i) => (
                <li key={r.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                  <Link href={`/hizmetlerimiz/${r.slug}`} className="group relative flex h-72 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white">
                    <Photo asset={serviceMedia(r.slug)} sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
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

      {/* Diğer rehberler */}
      <section aria-labelledby="diger-rehber" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="diger-rehber"
            eyebrow="Bilgi merkezi"
            title={
              <>
                Diğer <span className="text-gradient">rehberler</span>
              </>
            }
            action={
              <Link href="/blog" className="inline-flex min-h-12 items-center gap-1.5 font-semibold text-primary hover:underline">
                Tüm yazılar <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            }
          />
          <ul className="mt-12 grid gap-5 md:grid-cols-3">
            {relatedPosts.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <article className="group relative h-full overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Photo asset={blogMedia(p.slug)} sizes="(min-width:768px) 33vw, 100vw" decorative className="transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm text-muted">{p.excerpt}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsappHref(settings)} />
    </>
  );
}
