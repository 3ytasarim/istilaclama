import "server-only";

/**
 * Basit bellek içi kayan pencere sınırlayıcı (tek sunucu için).
 * Çok sunuculu kurulumda Redis/Upstash ile değiştirilmeli (Sprint 8).
 */
const buckets = new Map<string, number[]>();

export function rateLimited(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const hits = (buckets.get(key) ?? []).filter((t) => now - t < windowMs);
  hits.push(now);
  buckets.set(key, hits);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) if (!v.some((t) => now - t < windowMs)) buckets.delete(k);
  }
  return hits.length > limit;
}
