import "server-only";
import raw from "@/content/data/ibb-mahalle-bina-2017.json";
import { districtProfiles } from "@/content/district-profiles";
import { istanbulDistricts } from "@/content/regions";

/**
 * Bölge veri katmanı. Mahalle listesi ve bina istatistikleri:
 * İBB Açık Veri Portalı — "2017 Yılı Mahalle Bazlı Bina Sayıları" (İBB Açık Veri Lisansı).
 */
export const DATA_SOURCE = {
  label: "İBB Açık Veri Portalı — 2017 Yılı Mahalle Bazlı Bina Sayıları",
  url: "https://data.ibb.gov.tr/dataset/mahalle-bazli-bina-analiz-verisi",
  year: 2017,
};

type RawMahalle = { name: string; slug: string; uavt: number; age: [number, number, number]; floors: [number, number, number] };
const data = raw as unknown as Record<string, RawMahalle[]>;

export interface BuildingStats {
  total: number;
  /** [1980 öncesi, 1980–2000, 2000 sonrası] yüzde */
  agePct: [number, number, number];
  /** [1–4 kat, 5–9 kat, 9–19 kat] yüzde */
  floorPct: [number, number, number];
}

export interface Neighbourhood extends BuildingStats {
  name: string;
  slug: string;
  uavt: number;
  districtSlug: string;
  /** İlçedeki bina sayısı sırası (1 = en çok bina) */
  rank: number;
}

const pct = (parts: number[]) => {
  const sum = parts.reduce((a, b) => a + b, 0) || 1;
  return parts.map((p) => Math.round((p / sum) * 100)) as [number, number, number];
};

function stats(age: number[], floors: number[]): BuildingStats {
  return { total: age.reduce((a, b) => a + b, 0), agePct: pct(age), floorPct: pct(floors) };
}

export function districtStats(districtSlug: string): (BuildingStats & { count: number }) | null {
  const list = data[districtSlug];
  if (!list) return null;
  const age = [0, 0, 0];
  const floors = [0, 0, 0];
  for (const m of list) {
    m.age.forEach((v, i) => (age[i]! += v));
    m.floors.forEach((v, i) => (floors[i]! += v));
  }
  return { ...stats(age, floors), count: list.length };
}

export function listNeighbourhoods(districtSlug: string): Neighbourhood[] {
  const list = data[districtSlug] ?? [];
  const ranked = [...list].sort((a, b) => b.age.reduce((x, y) => x + y, 0) - a.age.reduce((x, y) => x + y, 0));
  return list.map((m) => ({
    name: m.name,
    slug: m.slug,
    uavt: m.uavt,
    districtSlug,
    rank: ranked.indexOf(m) + 1,
    ...stats(m.age, m.floors),
  }));
}

export function getNeighbourhood(districtSlug: string, slug: string) {
  return listNeighbourhoods(districtSlug).find((m) => m.slug === slug) ?? null;
}

export function getDistrictProfile(slug: string) {
  return districtProfiles[slug] ?? null;
}

export function allNeighbourhoodParams() {
  return istanbulDistricts.flatMap((d) => (data[d.slug] ?? []).map((m) => ({ ilce: d.slug, mahalle: m.slug })));
}

/** Yapı stoku profili — içerik ve hizmet önerisini veriye göre seçmek için. */
export type StockProfile = "eski" | "karma" | "yeni";
export type HeightProfile = "alcak" | "orta" | "yuksek";

export function stockProfile(s: BuildingStats): StockProfile {
  if (s.agePct[0] >= 40) return "eski";
  if (s.agePct[2] >= 50) return "yeni";
  return "karma";
}
export function heightProfile(s: BuildingStats): HeightProfile {
  if (s.floorPct[2] >= 10) return "yuksek";
  if (s.floorPct[0] >= 70) return "alcak";
  return "orta";
}

/** Profile göre öne çıkan hizmetler (slug). */
export function recommendedServices(s: BuildingStats): string[] {
  const out = new Set<string>();
  const sp = stockProfile(s);
  const hp = heightProfile(s);
  if (sp === "eski") ["hamam-bocegi-ilaclama", "bodrum-ve-ortak-alan-kontrolu", "fare-ve-kemirgen-kontrolu"].forEach((x) => out.add(x));
  if (sp === "yeni") ["site-ilaclama", "apartman-ve-bina-ilaclama"].forEach((x) => out.add(x));
  if (hp === "yuksek") ["apartman-ve-bina-ilaclama", "hamam-bocegi-ilaclama"].forEach((x) => out.add(x));
  if (hp === "alcak") ["karinca-ilaclama", "bahce-ve-acik-alan-kontrolu", "fare-ve-kemirgen-kontrolu"].forEach((x) => out.add(x));
  ["ev-ilaclama", "tahta-kurusu-ilaclama", "pire-ilaclama"].forEach((x) => out.add(x));
  return [...out].slice(0, 6);
}
