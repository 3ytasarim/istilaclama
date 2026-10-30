import Link from "next/link";
import { ArrowRight, MessageCircleQuestion } from "lucide-react";
import { PageHero } from "@/components/shared/page-hero";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { SectionHeading } from "@/components/ui/section-heading";
import { CtaSection } from "@/components/sections/cta-section";
import { faqTopics } from "@/content/faq";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings, listFaq } from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.faq, path: "/sik-sorulan-sorular" });

export default async function Page() {
  const [items, settings] = await Promise.all([listFaq(), getSiteSettings()]);
  const groups = faqTopics
    .map((t) => ({ ...t, items: items.filter((f) => f.topic === t.key) }))
    .filter((g) => g.items.length > 0);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Sık Sorulan Sorular", item: absoluteUrl("/sik-sorulan-sorular") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: items.map((f) => ({
              "@type": "Question",
              name: f.question,
              acceptedAnswer: { "@type": "Answer", text: f.answer },
            })),
          },
        ]}
      />

      <PageHero
        crumbs={[{ label: "Sık Sorulan Sorular" }]}
        eyebrow="SSS"
        title="Sık sorulan sorular"
        description="Teklif sürecinden uygulama sonrasına, işletme programlarından belgelere kadar en çok merak edilen soruların kısa ve açık cevapları."
      >
        <nav aria-label="Soru grupları" className="mt-10">
          <ul className="flex flex-wrap gap-2.5">
            {groups.map((g) => (
              <li key={g.key}>
                <a
                  href={`#${g.key}`}
                  className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-surface px-5 font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-mint"
                >
                  {g.title}
                  <span className="grid min-w-6 place-items-center rounded-full bg-mint px-1.5 text-xs font-bold text-on-mint">
                    {g.items.length}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      <div className="container-page grid gap-12 py-16 sm:py-20 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
        {/* Yan bilgi kartı */}
        <aside className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:self-start">
          <div className="relative overflow-hidden rounded-[var(--radius-panel)] bg-[#071b24] p-8 text-white">
            <div aria-hidden="true" className="animate-aurora-a absolute -right-24 -top-24 size-[320px] rounded-full bg-[#087f6d]/40 blur-[90px]" />
            <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b]">
              <MessageCircleQuestion aria-hidden="true" className="size-6" />
            </span>
            <p className="relative mt-5 font-display text-2xl font-bold">Sorunuz burada yok mu?</p>
            <p className="relative mt-2 text-white/70">
              Alanınızı ve gözlemlediğiniz durumu teklif formunda kısaca anlatın; size özel sorularınızı da plan
              görüşmesinde yanıtlayalım.
            </p>
            <Link
              href="/teklif-al"
              className="ind-primary relative mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] px-6 font-bold text-[#04201b]"
            >
              Teklif formu <ArrowRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
          <p className="mt-6 text-sm leading-relaxed text-muted">
            Cevaplar genel bilgilendirme amaçlıdır. Uygulama yöntemi, dönüş süresi ve takip ihtiyacı alanınıza göre
            plan aşamasında netleştirilir. Hizmete özel sorular için{" "}
            <Link href="/hizmetlerimiz" className="font-semibold text-primary hover:underline">
              hizmet sayfalarına
            </Link>{" "}
            göz atabilirsiniz.
          </p>
        </aside>

        <div className="space-y-16">
          {groups.map((g) => (
            <section key={g.key} id={g.key} aria-labelledby={`sss-${g.key}`} className="scroll-mt-40">
              <SectionHeading id={`sss-${g.key}`} title={g.title} description={g.description} />
              <div data-reveal className="mt-8">
                <FaqAccordion items={g.items} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsappHref(settings)} />
    </>
  );
}
