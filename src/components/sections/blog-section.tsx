import Link from "next/link";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { buttonClasses } from "@/components/ui/button";
import { blogMedia } from "@/content/media";
import type { BlogCategory, BlogPostSummary } from "@/types/content";

export function BlogSection({ posts, categories }: { posts: BlogPostSummary[]; categories: BlogCategory[] }) {
  const cat = (slug: string) => categories.find((c) => c.slug === slug)?.title ?? "";
  const [lead, ...rest] = posts;
  if (!lead) return null;

  return (
    <section aria-labelledby="blog-baslik" className="section-y bg-sunken">
      <div className="container-page">
        <SectionHeading
          id="blog-baslik"
          eyebrow="Bilgi merkezi"
          title="Uzman rehberleri ve önleyici öneriler"
          description="Zararlıları tanımak, erken belirtileri fark etmek ve tekrarını önlemek için hazırladığımız rehberler."
          action={
            <Link href="/blog" className={buttonClasses("secondary", "lg")}>
              Tüm yazılar <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          }
        />
        <div className="mt-14 grid gap-5 lg:grid-cols-[1.25fr_1fr]">
          <article
            data-reveal
            className="group relative flex min-h-[460px] flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-8 text-white sm:p-10"
          >
            <Photo
              asset={blogMedia(lead.slug)}
              sizes="(min-width:1024px) 55vw, 100vw"
              className="transition-transform duration-[1.2s] ease-[var(--ease-out)] group-hover:scale-[1.05]"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#071b24] via-[#071b24]/55 to-transparent" />
            <div className="relative">
              <p className="inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] backdrop-blur-md">
                {cat(lead.category)}
              </p>
              <h3 className="mt-4 max-w-xl font-display text-2xl font-bold leading-tight sm:text-4xl">
                <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0">
                  {lead.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-lg text-white/75">{lead.excerpt}</p>
              <p className="mt-6 inline-flex items-center gap-1.5 text-sm text-white/70">
                <Clock aria-hidden="true" className="size-4" /> {lead.readingMinutes} dk okuma
              </p>
            </div>
          </article>

          <ul className="grid gap-4">
            {rest.slice(0, 3).map((p, i) => (
              <li key={p.slug} data-reveal style={{ "--reveal-i": i + 1 } as React.CSSProperties}>
                <article className="group relative flex h-full items-center gap-5 rounded-[var(--radius-card)] border border-border bg-surface p-3 pr-6 transition-[box-shadow,border-color] hover:border-border-strong hover:shadow-md">
                  <div className="relative aspect-[4/3] w-32 shrink-0 overflow-hidden rounded-2xl sm:w-40">
                    <Photo
                      asset={blogMedia(p.slug)}
                      sizes="160px"
                      decorative
                      className="transition-transform duration-700 group-hover:scale-[1.08]"
                    />
                  </div>
                  <div className="min-w-0 flex-1 py-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.12em] text-on-mint">{cat(p.category)}</p>
                    <h3 className="mt-1.5 font-display text-[1.0625rem] font-bold leading-snug text-foreground">
                      <Link href={`/blog/${p.slug}`} className="after:absolute after:inset-0">
                        {p.title}
                      </Link>
                    </h3>
                    <p className="mt-1.5 text-sm text-muted">{p.readingMinutes} dk okuma</p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="hidden size-5 shrink-0 text-muted transition-[transform,color] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary sm:block"
                  />
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
