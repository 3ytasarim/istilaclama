# Design System — "Premium Eco-Tech Corporate"

Kaynak: `src/app/globals.css` (`:root` token'ları + Tailwind v4 `@theme inline`).

## Renk token'ları

| Token | Açık | Koyu | Kullanım |
|---|---|---|---|
| `primary` | `#087F6D` | `#2FB59B` | Birincil CTA, vurgu |
| `primary-strong` | `#06604F` | `#3FC1A8` | Hover |
| `accent` | `#087EA4` | `#4FB8DC` | İkincil vurgu, odak halkası |
| `navy` | `#103342` | — | Utility bar, koyu bölümler |
| `mint` / `ice` | `#DDF5EF` / `#EFF8FC` | koyu ton | Bölüm zeminleri |
| `foreground` | `#183641` | `#E3EEF2` | Metin |
| `muted` | `#526173` | `#9FB3BE` | İkincil metin |
| `on-mint` | `#06604F` | `#5FD3BC` | Mint zemin üstü vurgu metni |

### Kontrast (WCAG AA ≥ 4.5:1, ölçüldü)

| Çift | Oran |
|---|---|
| primary üzerine beyaz metin | 4.92 |
| accent metin / beyaz | 4.64 |
| muted `#526173` / mint | 5.54 |
| foreground / mint | 11.19 |
| beyaz / navy | 13.34 |

Not: Brief'teki `#64748B` mint zeminde 4.17 kalıyor (AA altı). Bu yüzden ikincil metin `#526173` yapıldı.
`#087F6D` mint üzerinde 4.31 → mint zeminde vurgu metni için `on-mint` (`#06604F`) kullanılır.

## Tipografi

- Başlık: Plus Jakarta Sans 600/700/800, gövde: Inter — `next/font` ile self-host, `latin-ext`, `display: swap`.
- Akışkan ölçek: `text-display` (36→68px), `text-h2` (28→46px), `text-h3` (18→21px), `text-lead` (17→20px).
- ⚠ `cn()` içinde `tailwind-merge` bu özel ölçeklere tanıtıldı (`src/lib/utils.ts`). Yeni ölçek eklenirse oraya da eklenmeli; aksi halde renk sınıfı sanılıp silinir.

## Boşluk, yarıçap, gölge

- 8px ızgara; `container-page` (max 1240px, akışkan yan boşluk 16→32px), `section-y` (64→120px).
- Yarıçap: kart `1.25rem`, panel `1.75rem`, buton `full`.
- Gölge: `shadow-xs/sm/md/lg` — lacivert tabanlı yumuşak gölgeler.

## Hareket

- Varsayılan easing `cubic-bezier(0.16, 1, 0.3, 1)`; mikro 200–300ms, reveal 800ms, kademeli 70ms.
- Scroll reveal: tek `IntersectionObserver` (`RevealObserver`), `data-reveal` + `--reveal-i`. JS yoksa içerik görünür.
- `prefers-reduced-motion`: tüm animasyon/transition kapanır.

## Bileşenler (Sprint 1)

| Bileşen | Dosya | Not |
|---|---|---|
| Button / ButtonLink | `components/ui/button.tsx` | primary, secondary, ghost, light, outline-light; min 48px |
| SectionHeading / Eyebrow | `components/ui/section-heading.tsx` | açık/koyu ton |
| ServiceIcon | `components/ui/service-icon.tsx` | IconKey → Lucide |
| Logo | `components/shared/logo.tsx` | **geçici** amblem + kelime markası |
| Photo | `components/ui/photo.tsx` | next/image; AVIF/WebP, srcset, preload yalnız hero |
| PageHero / Breadcrumbs | `components/shared/page-hero.tsx` | iç sayfalar |
| FaqAccordion | `components/shared/faq-accordion.tsx` | Radix; kapalı cevaplar da HTML'de |
| RegionPicker | `components/regions/region-picker.tsx` | yaka filtresi + Türkçe duyarlı arama |
| SiteHeader (mega menü + mobil panel) | `components/layout/site-header.tsx` | 21st.dev Mega Menu Navbar uyarlaması; Escape/dış tıklama ile kapanır |

## Revizyon 2 (2026-10-27) — görseller ve 21st.dev bileşenleri

- **Fotoğraflar:** 32 adet Unsplash görseli (Unsplash License, ticari kullanım serbest), `public/images/stock/` altında SEO dosya adlarıyla.
  Kaynak kimlikleri ve alt metinleri `src/content/media.ts` içinde; indirme betiği `scripts/fetch-stock.mjs`.
  Alt metinler fotoğrafta görüneni anlatır. Gerçek firma fotoğrafları geldiğinde aynı anahtarlarla değiştirilecek.
- **21st.dev kaynaklı:** Header → "Mega Menu Navbar" (anelkabag/navbar2), Footer fikri → "Footer with Suite" (scrollxui).
  İkisi de Türkçeye, marka tokenlarına ve erişilebilirlik kurallarına göre uyarlandı (kaynak notu dosya başında).
- **Tipografi vurgusu:** Başlıklardaki vurgu kelimeleri Instrument Serif italik + marka gradyanı (`.text-gradient`, `.hero-word`).
- **Animasyonlar:** kelime kelime başlık açılışı (`data-split` + `SplitHeading`), parıltılı üst başlık kapsülü, hero'da yeşil tonların aktığı
  "Profesyonel", sayan istatistik bandı, kaydırmaya bağlı süreç zaman çizelgesi, hareketli ışık lekeleri, kayan hizmet şeridi,
  footer'da harf harf yükselen marka yazısı. Tümü `prefers-reduced-motion`'da kapanır.
- **İstatistikler:** yalnız doğrulanabilir site verisi (hizmet/zararlı türü sayısı, ilçe rehberi, süreç adımı). Firma rakamları doğrulanınca CMS'ten eklenecek.
