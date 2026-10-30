import type { NavItem, SiteSettings } from "@/types/content";

/**
 * Site ayarları — gerçek değerler admin panelinden girilecek (Sprint 2+).
 * `verified: false` olan alanlar arayüzde gösterilmez / yer tutucu ile değiştirilir.
 */
export const siteSettings: SiteSettings = {
  businessName: "İST İlaçlama",
  legalName: { value: null, verified: false },
  tagline: "Profesyonel haşere kontrolü",
  // Geçici: CMS gelene kadar .env.local üzerinden (SITE_PHONE, WHATSAPP_NUMBER=90XXXXXXXXXX). Boşsa sitede gizli.
  phone: { value: process.env.SITE_PHONE?.trim() || null, verified: Boolean(process.env.SITE_PHONE?.trim()) },
  whatsapp: { value: process.env.WHATSAPP_NUMBER?.trim() || null, verified: Boolean(process.env.WHATSAPP_NUMBER?.trim()) },
  email: { value: null, verified: false },
  address: { value: null, verified: false },
  workingHours: { value: null, verified: false },
  serviceAreaSummary: { value: "İstanbul", verified: false },
  social: [],
};

export const mainNav: NavItem[] = [
  { label: "Kurumsal", href: "/kurumsal" },
  { label: "Hizmetlerimiz", short: "Hizmetler", href: "/hizmetlerimiz", children: "services" },
  { label: "Hizmet Bölgeleri", short: "Bölgeler", href: "/hizmet-bolgeleri", children: "regions" },
  { label: "Böcek Rehberi", short: "Rehber", href: "/bocek-rehberi", children: "guide" },
  { label: "Blog", href: "/blog" },
  { label: "SSS", href: "/sik-sorulan-sorular", wideOnly: true },
  { label: "İletişim", href: "/iletisim" },
];

export const legalNav: NavItem[] = [
  { label: "KVKK Aydınlatma Metni", href: "/kvkk-aydinlatma-metni" },
  { label: "Gizlilik Politikası", href: "/gizlilik-politikasi" },
  { label: "Çerez Politikası", href: "/cerez-politikasi" },
];
