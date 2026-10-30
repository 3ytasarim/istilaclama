import Link from "next/link";
import { ArrowRight, ArrowUpRight, BookOpen, Clock, Quote } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { blogBodies } from "@/content/blog-bodies";
import { blogMedia, media } from "@/content/media";
import { absoluteUrl } from "@/lib/site";
import { listBlogCategories, listBlogPosts } from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { ORGANIZATION_ID } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({ ...PAGE_SEO.blog, path: "/blog", image: media.inspection });

export default async function Page() {
  const [posts, categories] = await Promise.all([listBlogPosts(), listBlogCategories()]);
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? "";
  const [lead, ...rest] = posts;
  const usedCategories = categories
    .map((c) => ({ ...c, count: posts.filter((p) => p.category === c.slug).length }))
    .filter((c) => c.count > 0);
  const sourceCount = new Set(posts.flatMap((p) => blogBodies[p.slug]?.sources.map((s) => s.url) ?? [])).size;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Blog", item: absoluteUrl("/blog") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "Blog",
            name: "İST İlaçlama Bilgi Merkezi",
            url: absoluteUrl("/blog"),
            inLanguage: "tr-TR",
            publisher: { "@id": ORGANIZATION_ID },
            blogPost: posts.map((p) => ({ "@type": "BlogPosting", headline: p.title, url: absoluteUrl(`/blog/${p.slug}`) })),
          },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Blog" }]}
        eyebrow="Bilgi merkezi"
        title="Rehberler ve önleyici öneriler"
        description="Zararlıları tanımak, erken belirtileri fark etmek ve tekrarını önlemek için hazırladığımız, kaynak gösterilen rehberler."
      >
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-muted">
          <li className="flex items-center gap-2">
            <BookOpen aria-hidden="true" className="size-4 text-primary" /> {posts.length} rehber
          </li>
          {sourceCount > 0 && (
            <li className="flex items-center gap-2">
              <Quote aria-hidden="true" className="size-4 text-primary" /> {sourceCount} farklı otorite kaynağı
            </li>
          )}
          <li className="flex items-center gap-2">
            <Clock aria-hidden="true" className="size-4 text-primary" /> Ortalama{" "}
            {Math.round(posts.reduce((a, p) => a + p.readingMinutes, 0) / Math.max(posts.length, 1))} dk okuma
          </li>
        </ul>
      </PageHero>

      {lead && (
        <section aria-labelledby="one-cikan" className="section-y pb-0">
          <div className="container-page">
            <h2 id="one-cikan" className="sr-only">
              Öne çıkan rehber
            </h2>
            <article
              data-reveal
              className="group relative grid overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface lg:grid-cols-[1.2fr_1fr]"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-auto lg:min-h-[420px]">
                <Photo
                  asset={blogMedia(lead.slug)}
                  sizes="(min-width:1024px) 55vw, 100vw"
                  priority
                  className="transition-transform duration-[1.2s] group-hover:scale-[1.04]"
                />
              </div>
              <div className="flex flex-col justify-center p-8 sm:p-12">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-on-mint">{cat(lead.category)}</p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight text-foreground sm:text-3xl">
                  <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0">
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-4 text-muted">{blogBodies[lead.slug]?.summary ?? lead.excerpt}</p>
                <p className="mt-6 inline-flex items-center gap-4 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock aria-hidden="true" className="size-4" /> {lead.readingMinutes} dk okuma
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-semibold text-primary">
                    Okumaya başla <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </p>
              </div>
            </article>
          </div>
        </section>
      )}

      <section aria-labelledby="tum-rehberler" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="tum-rehberler"
            eyebrow="Tüm rehberler"
            title={
              <>
                Konuya göre <span className="text-gradient">rehberler</span>
              </>
            }
          />
          <ul aria-label="Kategoriler" className="mt-8 flex flex-wrap gap-2">
            {usedCategories.map((c) => (
              <li key={c.slug} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm font-medium text-foreground/85">
                {c.title}
                <span className="grid min-w-5 place-items-center rounded-full bg-mint px-1.5 text-xs font-bold text-on-mint">{c.count}</span>
              </li>
            ))}
          </ul>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--reveal-i": i % 6 } as React.CSSProperties}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-panel)] border border-border bg-surface transition-[box-shadow,border-color] hover:border-border-strong hover:shadow-md">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Photo
                      asset={blogMedia(p.slug)}
                      sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      decorative
                      className="transition-transform duration-700 group-hover:scale-105"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-[#06161d]/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
                      {cat(p.category)}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold leading-snug text-foreground">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                    <p className="mt-5 flex items-center justify-between text-sm text-muted">
                      <span className="inline-flex items-center gap-1.5">
                        <Clock aria-hidden="true" className="size-4" /> {p.readingMinutes} dk okuma
                      </span>
                      <ArrowUpRight aria-hidden="true" className="size-4 transition-transform group-hover:rotate-45 group-hover:text-primary" />
                    </p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-12 max-w-3xl text-sm leading-relaxed text-muted">
            Rehberler genel bilgilendirme amaçlıdır; sağlıkla ilgili şikâyetlerde hekiminize başvurun. Biyosidal ürünlerin
            yalnızca yetkili uygulayıcılar tarafından ve etiket talimatlarına uygun kullanılması gerektiği için yazılarımızda
            doz veya karışım tarifi yer almaz.
          </p>
        </div>
      </section>
    </>
  );
}
