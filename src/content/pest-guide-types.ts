import type { MediaKey } from "@/content/media";

/** Böcek Rehberi (bilgi niyeti). Hizmet sayfaları (satın alma niyeti) ile karşılıklı bağlanır. */
export type PestGroup = "hamam-bocekleri" | "kan-emenler" | "kemirgenler" | "ev-bocekleri" | "orumcegimsiler";

export interface PestSection {
  /** Sabit bölüm kimlikleri — içindekiler (01, 02, …) bunlardan üretilir */
  id: "nasil-taninir" | "yasam-dongusu" | "nerede-yasar" | "belirtiler" | "riskler" | "karistirilan-turler" | "onleme" | "profesyonel-destek";
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface PestGuide {
  slug: string;
  name: string;
  /** Halk arasındaki diğer adları (SEO + kullanıcı dili) */
  altNames: string[];
  scientific: string;
  group: PestGroup;
  /** 40–60 kelimelik doğrudan cevap (GEO / öne çıkan snippet) */
  summary: string;
  /** Kimlik kartı: boy, renk, aktif dönem, yaşam süresi vb. */
  idCard: { label: string; value: string }[];
  sections: PestSection[];
  /** İlgili hizmet sayfası slug'ı */
  serviceSlug: string;
  faq: { q: string; a: string }[];
  sources: { label: string; url: string }[];
  /** Sayfa altındaki, İST İlaçlama adının geçtiği SEO metni */
  seoText: string;
  imageKey: MediaKey;
  /** Ek galeri görselleri (isteğe bağlı) */
  gallery?: MediaKey[];
}

export const PEST_GROUPS: Record<PestGroup, string> = {
  "hamam-bocekleri": "Hamam böcekleri",
  "kan-emenler": "Kan emen zararlılar",
  kemirgenler: "Kemirgenler",
  "ev-bocekleri": "Ev ve depo böcekleri",
  orumcegimsiler: "Örümceğimsiler",
};
