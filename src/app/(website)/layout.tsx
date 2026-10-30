import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { InductionButtons } from "@/components/ui/induction-button";
import { AssistantLazy } from "@/components/assistant/assistant-lazy";
import { RevealObserver } from "@/components/shared/reveal-observer";
import type { HeaderData } from "@/components/layout/header-data";
import { phoneLink, whatsappHref } from "@/lib/contact";
import { media, serviceMedia } from "@/content/media";
import { pestGuides } from "@/content/pest-guide";
import { PEST_GROUPS } from "@/content/pest-guide-types";
import { getNavigation, getSiteSettings, listDistricts, listServiceGroups, listServices } from "@/server/content";

const GROUP_COVER = { hasere: "inspection", "yasam-alani": "technicianHome", kurumsal: "warehouseTeam" } as const;

export default async function WebsiteLayout({ children }: { children: React.ReactNode }) {
  const [settings, nav, groups, services, districts] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    listServiceGroups(),
    listServices(),
    listDistricts(),
  ]);

  const headerData: HeaderData = {
    nav: nav.main,
    phone: phoneLink(settings),
    whatsapp: whatsappHref(settings),
    serviceGroups: groups.map((g) => {
      const cover = media[GROUP_COVER[g.key]];
      return {
        key: g.key,
        title: g.title,
        description: g.description,
        cover: { src: cover.src, alt: cover.alt },
        items: services
          .filter((s) => s.group === g.key)
          .map(({ slug, title, excerpt }) => ({ slug, title, excerpt, image: serviceMedia(slug).src })),
      };
    }),
    districts: districts.map(({ slug, name, side }) => ({ slug, name, side })),
    pests: pestGuides.map((p) => ({ slug: p.slug, name: p.name, group: PEST_GROUPS[p.group], image: media[p.imageKey].src })),
    regionCover: { src: media.istanbulOrtakoyReflection.src, alt: media.istanbulOrtakoyReflection.alt },
  };

  return (
    <>
      <a
        href="#icerik"
        className="sr-only z-[100] rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        İçeriğe geç
      </a>
      <SiteHeader data={headerData} />
      <main id="icerik">{children}</main>
      <SiteFooter />
      <AssistantLazy whatsapp={headerData.whatsapp} />
      <RevealObserver />
      <InductionButtons />
    </>
  );
}
