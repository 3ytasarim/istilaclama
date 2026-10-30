import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Photo } from "@/components/ui/photo";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import { JsonLd } from "@/components/shared/json-ld";
import { CtaSection } from "@/components/sections/cta-section";
import { NeighbourhoodChips } from "@/components/regions/neighbourhood-chips";
import { BuildingChart, RegionHero, RelatedLinks, SeoNote } from "@/components/regions/region-ui";
import { districtMedia } from "@/content/district-media";
import { media, serviceMedia } from "@/content/media";

const ADVICE_PHOTOS = [media.inspection, media.technicianHome, media.heroTechnician, media.surfaceHygiene, media.warehouseTeam, media.houseExterior];
import { phoneLink, whatsappLink } from "@/lib/contact";
import {
  neighbourhoodComparison, neighbourhoodFaq, neighbourhoodIntro, neighbourhoodPestAdvice, neighbourhoodSeoText,
} from "@/lib/regions/content";
import {
  allNeighbourhoodParams, districtStats, getDistrictProfile, getNeighbourhood, listNeighbourhoods, recommendedServices,
} from "@/lib/regions/data";
import { BRAND, buildMetadata, withSuffix } from "@/lib/seo/metadata";
import { areaJsonLd, breadcrumbJsonLd, faqPageJsonLd, serviceJsonLd } from "@/lib/seo/jsonld";
import { getDistrict, getSiteSettings, listDistricts, listServices } from "@/server/content";

type Props = { params: Promise<{ ilce: string; mahalle: string }> };

export async function generateStaticParams() {
  return allNeighbourhoodParams();
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { ilce, mahalle } = await params;
  const d = await getDistrict(ilce);
  const m = d ? getNeighbourhood(ilce, mahalle) : null;
  if (!d || !m) return {};
  const all = await listDistricts();
  const base = `${m.name} Mahallesi (${d.name}) böcek ilaçlama ve haşere kontrolü: ${m.total.toLocaleString("tr-TR")} binalık yapı stokuna göre planlanan uygulama.`;
  return buildMetadata({
    title: [`${m.name} Böcek İlaçlama, ${d.name}`, `${m.name} Böcek İlaçlama`],
    description: withSuffix(base, [`${BRAND}'dan teklif alın.`, "Teklif alın."]),
    path: `/hizmet-bolgeleri/istanbul/${d.slug}/${m.slug}`,
    image: districtMedia(d.slug, d.side, all.indexOf(d)).asset,
  });
}

export default async function NeighbourhoodPage({ params }: Props) {
  const { ilce, mahalle } = await params;
  const d = await getDistrict(ilce);
  const m = d ? getNeighbourhood(ilce, mahalle) : null;
  if (!d || !m) notFound();

  const [settings, all, services] = await Promise.all([getSiteSettings(), listDistricts(), listServices()]);
  const dStats = districtStats(d.slug)!;
  const profile = getDistrictProfile(d.slug);
  const hoods = listNeighbourhoods(d.slug);
  const { asset: photo, own } = districtMedia(d.slug, d.side, all.indexOf(d));
  const whatsapp = whatsappLink(
    settings,
    `Merhaba, İST İlaçlama web sitesi üzerinden yazıyorum. Bölge: ${d.name} / ${m.name} Mahallesi. Bilgi ve teklif almak istiyorum.`,
  );
  const recommended = recommendedServices(m).map((s) => services.find((x) => x.slug === s)).filter((s) => s !== undefined);
  const advice = neighbourhoodPestAdvice(m);
  const faq = neighbourhoodFaq(m, d.name);
  const neighbours = (profile?.neighbours ?? []).map((s) => all.find((x) => x.slug === s)).filter((x) => x !== undefined);
  // Alfabetik sırada önceki/sonraki mahalleler (coğrafi komşuluk iddiası yok)
  const idx = hoods.findIndex((h) => h.slug === m.slug);
  const nearbyInList = [...hoods.slice(Math.max(0, idx - 4), idx), ...hoods.slice(idx + 1, idx + 5)];
  const districtUrl = `/hizmet-bolgeleri/istanbul/${d.slug}`;
  const url = `${districtUrl}/${m.slug}`;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Hizmet Bölgeleri", path: "/hizmet-bolgeleri" },
            { name: d.name, path: districtUrl },
            { name: m.name, path: url },
          ]),
          serviceJsonLd({
            name: `${m.name} Böcek İlaçlama`,
            serviceType: "Haşere kontrolü",
            description: `${d.name} ilçesine bağlı ${m.name} Mahallesi'nde ev, apartman ve iş yerleri için mahallenin yapı özelliklerine göre planlanan haşere kontrolü.`,
            path: url,
            areaServed: areaJsonLd(`${m.name} Mahallesi`, d.name),
          }),
          // SSS bölümü sayfada görünür (FaqAccordion)
          faqPageJsonLd(faq),
        ]}
      />

      <RegionHero
        crumbs={[
          { label: "Hizmet Bölgeleri", href: "/hizmet-bolgeleri" },
          { label: d.name, href: districtUrl },
          { label: m.name },
        ]}
        eyebrow={`${d.name} · ${d.side === "anadolu" ? "Anadolu Yakası" : "Avrupa Yakası"}`}
        titleLead={m.name}
        titleAccent="Böcek İlaçlama"
        summary={`${d.name} ilçesine bağlı ${m.name} Mahallesi'nde ev, apartman ve iş yerleri için mahallenin yapı özelliklerine göre planlanan haşere kontrolü.`}
        photo={photo}
        photoCaption={own ? photo.alt : undefined}
        quoteHref={`/teklif-al?ilce=${d.slug}&mahalle=${m.slug}`}
        whatsapp={whatsapp}
        facts={[
          { label: "Bina (İBB 2017)", value: m.total.toLocaleString("tr-TR") },
          { label: "İlçedeki sırası", value: `${m.rank} / ${dStats.count}` },
          { label: "1980 öncesi", value: `%${m.agePct[0]}` },
          { label: "2000 sonrası", value: `%${m.agePct[2]}` },
        ]}
      />

      {/* Mahalle hakkında + yapı stoku */}
      <section aria-labelledby="mahalle-hakkinda" className="section-y">
        <div className="container-page grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading id="mahalle-hakkinda" eyebrow={`${m.name} Mahallesi`} title={<>Mahallenin <span className="text-gradient">yapı profili</span></>} />
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted" data-reveal>
              <p>{neighbourhoodIntro(m, d.name)}</p>
              <p>{neighbourhoodComparison(m, dStats, d.name)}</p>
            </div>
          </div>
          <div data-reveal className="lg:pt-24">
            <BuildingChart stats={m} />
          </div>
        </div>
      </section>

      {/* Haşere kontrolü açısından */}
      <section aria-labelledby="mahalle-oneriler" className="section-y bg-sunken">
        <div className="container-page grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="relative aspect-[4/3.2] overflow-hidden rounded-[var(--radius-panel)] shadow-lg">
            <Photo asset={ADVICE_PHOTOS[m.uavt % ADVICE_PHOTOS.length]!} sizes="(min-width:1024px) 45vw, 100vw" />
          </div>
          <div>
            <SectionHeading id="mahalle-oneriler" eyebrow="Haşere kontrolü" title={<>{m.name} için <span className="text-gradient">nelere dikkat edilmeli?</span></>} />
            <ul className="mt-6 space-y-4">
              {advice.map((a, i) => (
                <li key={i} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="flex gap-3">
                  <CheckCircle2 aria-hidden="true" className="mt-1 size-5 shrink-0 text-primary" />
                  <p className="leading-relaxed text-foreground/85">{a}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Önerilen hizmetler */}
      <section aria-labelledby="mahalle-hizmetleri" className="section-y">
        <div className="container-page">
          <SectionHeading id="mahalle-hizmetleri" eyebrow="Önerilen hizmetler" title={<>{m.name} <span className="text-gradient">için hizmetler</span></>} />
          <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recommended.map((s, i) => (
              <li key={s.slug} data-reveal style={{ "--reveal-i": i % 3 } as React.CSSProperties}>
                <Link href={`/hizmetlerimiz/${s.slug}`} className="group relative flex h-56 flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] p-6 text-white">
                  <Photo asset={serviceMedia(s.slug)} sizes="(min-width:1024px) 33vw, 50vw" className="transition-transform duration-[1.2s] group-hover:scale-[1.06]" />
                  <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-[#06161d]/40 to-transparent" />
                  <span className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur-md transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </span>
                  <span className="relative block font-display text-xl font-bold">{s.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* SSS */}
      <section aria-labelledby="mahalle-sss" className="section-y bg-sunken">
        <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading id="mahalle-sss" eyebrow="Sık sorulan sorular" title={<>{m.name} <span className="text-gradient">ilaçlama SSS</span></>} />
          <div data-reveal>
            <FaqAccordion items={faq.map((f, i) => ({ id: `${m.slug}-${i}`, question: f.q, answer: f.a, scope: "bolge" as const }))} />
          </div>
        </div>
      </section>

      {/* İlçe hakkında (kısa) + diğer mahalleler */}
      <section aria-labelledby="ilce-ozet" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="ilce-ozet"
            eyebrow={`${d.name} ilçesi`}
            title={<>{d.name} <span className="text-gradient">diğer mahalleleri</span></>}
            description={`${m.name} Mahallesi ${d.name} ilçesindeki ${dStats.count} mahalleden biridir. Diğer mahallelerin yapı profillerini ve hizmet bilgilerini aşağıdan inceleyebilirsiniz.`}
          />
          <div className="mt-10" data-reveal>
            <NeighbourhoodChips districtSlug={d.slug} items={hoods.map(({ name, slug }) => ({ name, slug }))} current={m.slug} />
          </div>
        </div>
      </section>

      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} title={`${m.name} Mahallesi için size uygun planı hazırlayalım`} />

      <SeoNote title={`${m.name} ilaçlama — İST İlaçlama`}>
        <p>{neighbourhoodSeoText(m, d.name)}</p>
      </SeoNote>

      <RelatedLinks
        groups={[
          {
            title: `${m.name} hizmetleri`,
            links: recommended.slice(0, 5).map((s) => ({ label: `${m.name} ${s.shortTitle.toLocaleLowerCase("tr")}`, href: `/hizmetlerimiz/${s.slug}` })),
          },
          {
            title: `${d.name} mahalleleri`,
            links: nearbyInList.map((h) => ({ label: `${h.name} ilaçlama`, href: `${districtUrl}/${h.slug}` })),
          },
          {
            title: "İlçe ve yakın ilçeler",
            links: [
              { label: `${d.name} ilaçlama`, href: districtUrl },
              ...neighbours.map((n) => ({ label: `${n.name} ilaçlama`, href: `/hizmet-bolgeleri/istanbul/${n.slug}` })),
            ],
          },
        ]}
      />
    </>
  );
}
