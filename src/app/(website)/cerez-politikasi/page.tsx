import { PageHero, DraftNotice } from "@/components/shared/page-hero";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.cookies, path: "/cerez-politikasi", noindex: true });

export default function Page() {
  return (
    <>
      <PageHero
        crumbs={[{"label":"Çerez Politikası"}]}
        eyebrow="Yasal"
        title="Çerez Politikası"
        description="Sitemizde kullanılan çerezler ve tercih yönetimi."
      />
      <DraftNotice>Bu metin, işletme tarafından onaylanmış hukuki metin sağlandığında yayınlanacaktır.</DraftNotice>
    </>
  );
}
