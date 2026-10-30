import { PageHero } from "@/components/shared/page-hero";
import { RegionPicker } from "@/components/regions/region-picker";
import { listDistricts } from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { JsonLd } from "@/components/shared/json-ld";
import { breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({ ...PAGE_SEO.regions, path: "/hizmet-bolgeleri" });

export default async function Page() {
  const districts = await listDistricts();
  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([{ name: "Hizmet Bölgeleri", path: "/hizmet-bolgeleri" }]),
          itemListJsonLd(
            "İstanbul ilaçlama hizmet bölgeleri",
            districts.map((d) => ({ name: `${d.name} Böcek İlaçlama`, path: `/hizmet-bolgeleri/istanbul/${d.slug}` })),
          ),
        ]}
      />
      <PageHero
        crumbs={[{ label: "Hizmet Bölgeleri" }]}
        eyebrow="Hizmet bölgeleri"
        title="Hizmet bölgelerimiz"
        description="İlçenizi seçin; bölgenize özel hizmet kapsamını ve iletişim seçeneklerini görün."
      />
      <div className="container-page py-16">
        <RegionPicker districts={districts.map(({ slug, name, side }) => ({ slug, name, side }))} />
      </div>
    </>
  );
}
