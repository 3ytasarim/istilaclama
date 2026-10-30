import { PageHero, DraftNotice } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.kvkk, path: "/kvkk-aydinlatma-metni", noindex: true });

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{"label":"KVKK Aydınlatma Metni"}]}
        eyebrow="Yasal"
        title="KVKK Aydınlatma Metni"
        description="Kişisel verilerin işlenmesine ilişkin aydınlatma metni."
      />
      <DraftNotice>Bu metin, işletme tarafından onaylanmış hukuki metin sağlandığında yayınlanacaktır.</DraftNotice>
    </>
  );
}
