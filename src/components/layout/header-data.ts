import type { IstanbulSide, NavItem, ServiceGroupKey } from "@/types/content";

/** Header'a (istemci bileşeni) aktarılan, serileştirilebilir minimum veri. */
export interface HeaderData {
  nav: NavItem[];
  phone: { label: string; href: string } | null;
  whatsapp: string | null;
  serviceGroups: {
    key: ServiceGroupKey;
    title: string;
    description: string;
    cover: { src: string; alt: string };
    items: { slug: string; title: string; excerpt: string; image: string }[];
  }[];
  districts: { slug: string; name: string; side: IstanbulSide }[];
  regionCover: { src: string; alt: string };
  pests: { slug: string; name: string; group: string; image: string }[];
}
