import { PageHero, DraftNotice } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.privacy, path: "/gizlilik-politikasi", noindex: true });

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{"label":"Gizlilik Politikası"}]}
        eyebrow="Yasal"
        title="Gizlilik Politikası"
        description="Web sitemizde gizliliğinizi nasıl koruduğumuz."
      />
      <DraftNotice>Bu metin, işletme tarafından onaylanmış hukuki metin sağlandığında yayınlanacaktır.</DraftNotice>
    </>
  );
}
