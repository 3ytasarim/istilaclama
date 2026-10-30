import { Hero } from "@/components/sections/hero";
import { StatsBand } from "@/components/sections/stats-band";
import { ServicesSection } from "@/components/sections/services-section";
import { WhySection } from "@/components/sections/why-section";
import { ProcessSection } from "@/components/sections/process-section";
import { RegionsSection } from "@/components/sections/regions-section";
import { SectorsSection } from "@/components/sections/sectors-section";
import { BlogSection } from "@/components/sections/blog-section";
import { FaqSection } from "@/components/sections/faq-section";
import { CtaSection } from "@/components/sections/cta-section";
import { phoneLink, whatsappHref } from "@/lib/contact";
import {
  getSiteSettings,
  listBlogCategories,
  listBlogPosts,
  listDistricts,
  listFaq,
  listSectorCards,
  listServices,
} from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";

export const metadata = buildMetadata({ ...PAGE_SEO.home, path: "/" });

export default async function HomePage() {
  const [settings, services, allServices, districts, sectors, posts, categories, faq] = await Promise.all([
    getSiteSettings(),
    listServices({ featured: true }),
    listServices(),
    listDistricts(),
    listSectorCards(),
    listBlogPosts(4),
    listBlogCategories(),
    listFaq(),
  ]);
  const whatsapp = whatsappHref(settings);

  return (
    <>
      <Hero whatsapp={whatsapp} services={allServices} districts={districts} />
      <StatsBand
        stats={[
          { value: allServices.length, label: "Hizmet türü", detail: "Haşere, yaşam alanı ve kurumsal", icon: "layers" },
          { value: allServices.filter((s) => s.group === "hasere").length, label: "Zararlı türü", detail: "Her biri için ayrı yöntem ve hazırlık", icon: "bug" },
          { value: districts.length, label: "İlçelik bölge rehberi", detail: "Anadolu ve Avrupa yakası ilçe sayfaları", icon: "map" },
          { value: 5, label: "Adımlı süreç", detail: "Ön değerlendirmeden takibe kadar planlı", icon: "steps" },
        ]}
      />
      <ServicesSection services={services} />
      <WhySection />
      <ProcessSection />
      <RegionsSection districts={districts} />
      <SectorsSection sectors={sectors} />
      <BlogSection posts={posts} categories={categories} />
      <FaqSection items={faq.slice(0, 5)} />
      <CtaSection phone={phoneLink(settings)} whatsapp={whatsapp} />
    </>
  );
}
