export type PublishStatus = "draft" | "review" | "published" | "archived";

/** Doğrulanmamış işletme bilgisi yayınlanmaz; arayüz `verified` alanına bakar. */
export interface VerifiedValue<T> {
  value: T | null;
  verified: boolean;
}

export interface SiteSettings {
  businessName: string;
  legalName: VerifiedValue<string>;
  tagline: string;
  phone: VerifiedValue<string>;
  /** E.164 biçimi, + olmadan (wa.me için). Placeholder modunda null. */
  whatsapp: VerifiedValue<string>;
  email: VerifiedValue<string>;
  address: VerifiedValue<string>;
  workingHours: VerifiedValue<string>;
  serviceAreaSummary: VerifiedValue<string>;
  social: { label: string; href: string }[];
}

export type ServiceGroupKey = "hasere" | "yasam-alani" | "kurumsal";

export interface ServiceGroup {
  key: ServiceGroupKey;
  title: string;
  description: string;
}

export type IconKey =
  | "bug"
  | "shield"
  | "rat"
  | "flea"
  | "bed"
  | "ant"
  | "mosquito"
  | "tick"
  | "silverfish"
  | "moth"
  | "scorpion"
  | "home"
  | "building"
  | "buildings"
  | "office"
  | "store"
  | "garden"
  | "basement"
  | "restaurant"
  | "hotel"
  | "warehouse"
  | "factory"
  | "calendar"
  | "layers";

export interface ServiceSummary {
  slug: string;
  title: string;
  shortTitle: string;
  group: ServiceGroupKey;
  icon: IconKey;
  excerpt: string;
  status: PublishStatus;
  featured: boolean;
  order: number;
  /** Görsel kütüphanesindeki varlık anahtarı; gerçek fotoğraf yüklenene kadar illüstrasyon. */
  imageKey: string;
}

export type IstanbulSide = "anadolu" | "avrupa";

export interface Region {
  slug: string;
  name: string;
  side: IstanbulSide;
  /** Admin hizmet kapsamını doğrulayana kadar false. */
  active: boolean;
  status: PublishStatus;
}

export interface BlogCategory {
  slug: string;
  title: string;
}

export interface BlogPostSummary {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readingMinutes: number;
  status: PublishStatus;
  publishedAt: string | null;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  scope: "genel" | "hizmet" | "bolge";
}

export interface NavItem {
  label: string;
  href: string;
  children?: "services" | "regions" | "guide";
  /** Dar masaüstü (<1440px) için kısa etiket */
  short?: string;
  /** Yalnız geniş masaüstünde (>=1440px) göster */
  wideOnly?: boolean;
}
