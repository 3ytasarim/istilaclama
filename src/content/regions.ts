import { slugify } from "@/lib/slug";
import type { Region } from "@/types/content";

/**
 * İstanbul'un 39 ilçesi — yalnız coğrafi veri.
 * Hepsi başlangıçta pasif + taslak: listelenmeleri hizmet verildiği anlamına gelmez.
 * Admin gerçek hizmet kapsamını doğrulayınca aktifleştirir (Sprint 4).
 */
const ANADOLU = [
  "Adalar", "Ataşehir", "Beykoz", "Çekmeköy", "Kadıköy", "Kartal", "Maltepe",
  "Pendik", "Sancaktepe", "Sultanbeyli", "Şile", "Tuzla", "Ümraniye", "Üsküdar",
];

const AVRUPA = [
  "Arnavutköy", "Avcılar", "Bağcılar", "Bahçelievler", "Bakırköy", "Başakşehir", "Bayrampaşa",
  "Beşiktaş", "Beylikdüzü", "Beyoğlu", "Büyükçekmece", "Çatalca", "Esenler", "Esenyurt",
  "Eyüpsultan", "Fatih", "Gaziosmanpaşa", "Güngören", "Kağıthane", "Küçükçekmece", "Sarıyer",
  "Silivri", "Sultangazi", "Şişli", "Zeytinburnu",
];

const make = (name: string, side: Region["side"]): Region => ({
  name,
  side,
  slug: slugify(name),
  active: false,
  status: "published",
});

export const istanbulDistricts: Region[] = [
  ...ANADOLU.map((n) => make(n, "anadolu")),
  ...AVRUPA.map((n) => make(n, "avrupa")),
].sort((a, b) => a.name.localeCompare(b.name, "tr"));
