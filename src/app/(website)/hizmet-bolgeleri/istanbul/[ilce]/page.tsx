import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { CtaSection } from "@/components/sections/cta-section";
import { NeighbourhoodChips } from "@/components/regions/neighbourhood-chips";
import { BuildingChart, RegionHero, RelatedLinks, SeoNote } from "@/components/regions/region-ui";
import { districtMedia } from "@/content/district-media";
import { serviceMedia } from "@/content/media";
import { phoneLink, whatsappLink } from "@/lib/contact";
import { abl, districtSeoText, districtStatsText, loc } from "@/lib/regions/content";
import { districtStats, getDistrictProfile, listNeighbourhoods, recommendedServices } from "@/lib/regions/data";
import { BRAND, buildMetadata, withSuffix } from "@/lib/seo/metadata";
import { areaJsonLd, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { getDistrict, getSiteSettings, listDistricts, listServices } from "@/server/content";

type Props = { params: Promise<{ ilce: string }> };

export async function generateStaticParams() {
  return (await listDistricts()).map((d) => ({ ilce: d.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const d = await getDistrict((await params).ilce);
  if (!d) return {};
  const s = districtStats(d.slug);
  const all = await listDistricts();
  const photo = districtMedia(d.slug, d.side, all.indexOf(d)).asset;
  const base = `${d.name} böcek ilaçlama ve haşere kontrolü: ${s ? `${s.count} mahallede ` : ""}ev, apartman, site ve iş yerleri için yapı stokuna göre planlanan uygulama.`;
  return buildMetadata({
    title: [`${d.name} Böcek İlaçlama ve Haşere Kontrolü`, `${d.name} Böcek İlaçlama`],
    description: withSuffix(base, [`${BRAND}'dan teklif alın.`, "Teklif alın."]),
    path: `/hizmet-bolgeleri/istanbul/${d.slug}`,
    image: photo,
  });
}

export default async function DistrictPage({ params }: Props) {
  const d = await getDistrict((await params).ilce);
  if (!d) notFound();
  const [settings, all, services] = await Promise.all([getSiteSettings(), listDistricts(), listServices()]);
  const profile = getDistrictProfile(d.slug);
  const stats = districtStats(d.slug);
  const hoods = listNeighbourhoods(d.slug);
  const { asset: photo, own } = districtMedia(d.slug, d.side, all.indexOf(d));
  const whatsapp = whatsappLink(settings, `Merhaba, İST İlaçlama web sitesi üzerinden yazıyorum. Bölge: ${d.name}. Bilgi ve teklif almak istiyorum.`);
  const recommended = stats ? recommendedServices(stats).map((s) => services.find((x) => x.slug === s)).filter((s) => s !== undefined) : [];
  const neighbours = (profile?.neighbours ?? []).map((s) => all.find((x) => x.slug === s)).filter((x) => x !== undefined);
  const biggest = [...hoods].sort((a, b) => a.rank - b.rank).slice(0, 12);
  const url = `/hizmet-bolgeleri/istanbul/${d.slug}`;

  const faq = [
    {
      q: `${loc(d.name)} ilaçlama hizmeti veriyor musunuz?`,
      a: `${d.name} ve mahalleleri için teklif formunu doldurabilir veya WhatsApp üzerinden bize yazabilirsiniz. Talebiniz incelenerek hizmet kapsamı ve uygun zaman konusunda size dönüş yapılır.`,
    },
    {
      q: `${loc(d.name)} en sık hangi haşere sorunları görülür?`,
      a: profile?.pestContext ?? "Sorunlar yapı tipine ve çevreye göre değişir; kesin tespit yerinde inceleme ile yapılır.",
    },
    {
      q: "İlaçlama fiyatı nasıl belirlenir?",
      a: "Fiyat; alanın büyüklüğüne, zararlı türüne ve yoğunluğuna göre değişir. Kısa bir ön değerlendirme sonrasında size özel teklif hazırlanır.",
    },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Hizmet Bölgeleri", path: "/hizmet-bolgeleri" },
            { name: d.name, path: url },
          ]),
          serviceJsonLd({
            name: `${d.name} Böcek İlaçlama ve Haşere Kontrolü`,
            serviceType: "Haşere kontrolü",
            description: `${d.name} genelinde ev, apartman, site ve iş yerleri için zararlının türüne ve yapının özelliklerine göre planlanan haşere kontrolü.`,
            path: url,
            image: photo.src,
            areaServed: areaJsonLd(d.name),
          }),
          // SSS bölümü sayfada görünür (FaqAccordion)
          faqPageJsonLd(faq),
        ]}
      />

      <RegionHero
        crumbs={[{ label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" }, { label: d.name }]}
        eyebrow={d.side === "anadolu" ? "İstanbul · Anadolu Yakası" : "İstanbul · Avrupa Yakası"}
        titleLead={d.name}
        titleAccent="Böcek İlaçlama"
        summary={`${d.name} genelinde ev, apartman, site ve iş yerleri için zararlının türüne ve yapının özelliklerine göre planlanan haşere kontrolü.`}
        photo={photo}
        photoCaption={own ? photo.alt : undefined}
        quoteHref={`/teklif-al?ilce=${d.slug}`}
        whatsapp={whatsapp}
        facts={[
          { label: "Mahalle", value: String(stats?.count ?? hoods.length) },
          { label: "Bina (İBB 2017)", value: stats ? stats.total.toLocaleString("tr-TR") : "—" },
          { label: "1980 öncesi bina", value: stats ? `%${stats.agePct[0]}` : "—" },
          { label: "1–4 katlı bina", value: stats ? `%${stats.floorPct[0]}` : "—" },
        ]}
      />

      {/* İlçe hakkında */}
      <section aria-labelledby="ilce-hakkinda" className="section-y">
        <div className="container-page grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading id="ilce-hakkinda" eyebrow={`${d.name} hakkında`} title={<>{d.name} <span className="text-gradient">ve haşere kontrolü</span></>} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted" data-reveal>
              {profile && <p>{profile.about}</p>}
              {profile && <p>{profile.pestContext}</p>}
            </div>
          </div>
          <div data-reveal className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--radius-panel)] shadow-lg">
            <Photo asset={photo} sizes="(min-width:1024px) 45vw, 100vw" />
          </div>
        </div>
      </section>

      {/* Yapı stoku */}
      {stats && (
        <section aria-labelledby="yapi-stoku" className="section-y bg-sunken">
          <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <SectionHeading
              id="yapi-stoku"
              eyebrow="Yapı stoku"
              title={<>{loc(d.name)} <span className="text-gradient">binalar</span></>}
              description={districtStatsText(d.name, stats)}
            />
            <div data-reveal>
              <BuildingChart stats={stats} />
            </div>
          </div>
        </section>
      )}

      {/* Mahalleler */}
      <section aria-labelledby="mahalleler" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="mahalleler"
            eyebrow="Mahalleler"
            title={<>{d.name} <span className="text-gradient">mahalleleri</span></>}
            description={`Mahallenizi seçin; mahallenin yapı özelliklerine göre hazırlanmış bilgileri ve iletişim seçeneklerini görün.`}
          />
          <div className="mt-10" data-reveal>
            <NeighbourhoodChips districtSlug={d.slug} items={hoods.map(({ name, slug }) => ({ name, slug }))} />
          </div>
        </div>
      </section>

      {/* Öne çıkan hizmetler */}
      {recommended.length > 0 && (
        <section aria-labelledby="bolge-hizmetleri" className="section-y bg-sunken">
          <div className="container-page">
            <SectionHeading
              id="bolge-hizmetleri"
              eyebrow="Öne çıkan hizmetler"
              title={<>{loc(d.name)} <span className="text-gradient">sık talep edilenler</span></>}
              description="İlçenin yapı stoku ve çevresel özelliklerine göre öne çıkan hizmetler."
            />
            <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {recommended.map((s, i) => (
                <li key={s.slug} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
                  <Link href={`/hizmetlerimiz/${s.slug}`} className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white">
                    <Photo asset={serviceMedia(s.slug)} sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                    <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/40 to-transparent" />
                    <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                      <ArrowUpRight aria-hidden="true" className="size-4" />
                    </span>
                    <span className="relative">
                      <span className="block font-display text-xl font-bold">
                        {d.name} {s.shortTitle.toLocaleLowerCase("tr")} {s.group === "hasere" ? "kontrolü" : "ilaçlama"}
                      </span>
                      <span className="mt-1 line-clamp-2 block text-sm text-white/75">{s.excerpt}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* SSS */}
      <section aria-labelledby="ilce-sss" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="ilce-sss" eyebrow="Sık sorulan sorular" title={<>{d.name} <span className="text-gradient">ilaçlama SSS</span></>} />
          <div data-reveal>
            <FaqAccordion items={faq.map((f, i) => ({ id: `${d.slug}-${i}`, question: f.q, answer: f.a, scope: "bolge" as const }))} />
          </div>
        </div>
      </section>

      {/* Komşu ilçeler */}
      {neighbours.length > 0 && (
        <section aria-labelledby="komsu-ilceler" className="pb-[clamp(4rem,2.8rem+5vw,7.5rem)]">
          <div className="container-page">
            <h2 id="komsu-ilceler" className="font-display text-2xl font-bold text-foreground">
              {abl(d.name)} yakın ilçeler
            </h2>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {neighbours.map((n) => (
                <li key={n.slug}>
                  <Link href={`/hizmet-bolgeleri/istanbul/${n.slug}`} className="inline-flex min-h-12 items-center gap-2 rounded-full border border-border bg-surface px-5 font-medium shadow-xs transition-colors hover:border-primary/40 hover:bg-mint">
                    <MapPin aria-hidden="true" className="size-4 text-primary" /> {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} title={`${loc(d.name)} haşere sorununu birlikte çözelim`} />

      <SeoNote title={`${d.name} ilaçlama — İST İlaçlama`}>
        <p>{districtSeoText(d.name, d.slug)}</p>
      </SeoNote>

      <RelatedLinks
        groups={[
          {
            title: `${d.name} hizmetleri`,
            links: recommended.map((s) => ({ label: `${d.name} ${s.shortTitle.toLocaleLowerCase("tr")}`, href: `/hizmetlerimiz/${s.slug}` })),
          },
          {
            title: `${d.name} mahalleleri`,
            links: biggest.map((m) => ({ label: `${m.name} ilaçlama`, href: `${url}/${m.slug}` })),
          },
          {
            title: "Yakın ilçeler",
            links: neighbours.map((n) => ({ label: `${n.name} ilaçlama`, href: `/hizmet-bolgeleri/istanbul/${n.slug}` })),
          },
        ]}
      />
    </>
  );
}
