# İST İlaçlama — istilaclama.com.tr

Kurumsal site + özel admin CMS. Next.js 16 · React 19 · TypeScript strict · Tailwind v4 · Radix UI · (Sprint 2+) Neon + Drizzle.

## Çalıştırma

```bash
npm install
npm run dev        # http://localhost:3460
npm run build
npm test           # vitest birim testleri
npm run lint && npm run typecheck
```

`.env.example` → `.env.local` kopyalayın. Yayın bayrakları:

| Değişken | Varsayılan | Anlam |
|---|---|---|
| `SITE_INDEXABLE` | kapalı | `true` olmadıkça tüm site `noindex, nofollow` |
| `SHOW_DRAFT_CONTENT` | açık | Taslak içerik önizlemede görünür; canlıda `false` |

## Belgeler

- `docs/PROJECT_PLAN.md`: kararlar, site haritası, sprint durumu
- `docs/MARKET_RESEARCH.md`: rakip analizi (5 site)
- `docs/DESIGN_SYSTEM.md`: token'lar, kontrast ölçümleri, bileşenler
- `docs/DATA_MODEL.md`: Sprint 2 veritabanı tasarımı
- `docs/CONTENT_GUIDELINES.md`: iddia ve içerik kuralları
- `docs/OPEN_ITEMS.md`: kullanıcıdan beklenen bilgiler
