import { ClipboardCheck, Clock, ScanSearch, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { Photo } from "@/components/ui/photo";
import { Eyebrow } from "@/components/ui/section-heading";
import { HeroFloaters } from "@/components/sections/hero-floaters";
import { media, serviceMedia } from "@/content/media";
import { getNeighbourhood } from "@/lib/regions/data";
import { listDistricts, listServices } from "@/server/content";
import { QuoteForm } from "./quote-form";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, webPageJsonLd } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({ ...PAGE_SEO.quote, path: "/teklif-al" });

const PEST_SLUGS = [
  "hamam-bocegi-ilaclama", "fare-ve-kemirgen-kontrolu", "tahta-kurusu-ilaclama",
  "pire-ilaclama", "karinca-ilaclama", "sivrisinek-kontrolu",
];

type Props = { searchParams: Promise<{ hizmet?: string; ilce?: string; mahalle?: string }> };

export default async function QuotePage({ searchParams }: Props) {
  const sp = await searchParams;
  const [services, districts] = await Promise.all([listServices(), listDistricts()]);
  const pests = PEST_SLUGS.map((slug) => services.find((s) => s.slug === slug))
    .filter((s) => s !== undefined)
    .map((s) => ({ slug: s.slug, title: s.shortTitle, image: serviceMedia(s.slug).src }));
  // Mahalle adı slug'dan tahmin edilmez; gerçek veriden alınır (icmeler → İçmeler)
  const hood = sp.ilce && sp.mahalle ? getNeighbourhood(sp.ilce, sp.mahalle)?.name : undefined;

  return (
    <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] pb-20 text-white">
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Teklif Al", path: "/teklif-al" }]),
          webPageJsonLd({ name: PAGE_SEO.quote.title, description: PAGE_SEO.quote.description, path: "/teklif-al" }),
        ]}
      />
      <div className="absolute inset-0 h-[620px]">
        <Photo asset={media.inspection} sizes="100vw" priority className="opacity-40" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-[#06161d]/60 via-[#06161d]/80 to-[#06161d]" />
      </div>
      <HeroFloaters />
      <div className="container-page relative pt-[calc(var(--header-h)+2.5rem)]">
        <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_ol]:text-white/70 [&_span]:text-white [&_svg]:text-white/40">
          <Breadcrumbs items={[{ label: "Teklif Al" }]} />
        </div>
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
          <div className="lg:pt-6">
            <Eyebrow tone="light">Hızlı teklif</Eyebrow>
            <h1 className="animate-rise mt-5 text-page font-extrabold">
              Sorununuzu anlatın, <span className="hero-word">planı</span> birlikte hazırlayalım
            </h1>
            <p className="animate-rise mt-5 max-w-lg text-lead text-white/75 [animation-delay:120ms]">
              Üç kısa adımda bilgilerinizi paylaşın. Talebiniz ilgili ekibe iletilir ve alanınıza uygun yöntemle size dönüş yapılır.
            </p>
            <ul className="mt-10 space-y-4">
              {[
                { icon: ScanSearch, t: "Önce değerlendirme", d: "Zararlı türü ve alanı birlikte netleştiririz." },
                { icon: ClipboardCheck, t: "Yazılı uygulama planı", d: "Yöntem, hazırlık ve takip adımları paylaşılır." },
                { icon: ShieldCheck, t: "Bilgileriniz güvende", d: "Yalnızca talebinizi yanıtlamak için kullanılır." },
                { icon: Clock, t: "Yaklaşık 1 dakika", d: "Formu doldurmak kısa sürer." },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="flex gap-4">
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-[#5fd3bc] ring-1 ring-white/10">
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
          <div className="relative rounded-[1.75rem] bg-surface p-6 text-foreground shadow-[0_40px_80px_-30px_rgb(0_0_0/0.7)] sm:p-9">
            <QuoteForm
              pests={pests}
              services={services.map((s) => ({ slug: s.slug, title: s.title }))}
              districts={districts.map(({ slug, name, side }) => ({ slug, name, side }))}
              initial={{
                hizmet: services.some((s) => s.slug === sp.hizmet) ? sp.hizmet : undefined,
                ilce: districts.some((d) => d.slug === sp.ilce) ? sp.ilce : undefined,
                mahalle: hood,
                kaynak: "/teklif-al",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
