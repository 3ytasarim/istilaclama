# SEO + GEO Kontrol Listesi — İST İlaçlama

> Tarih: 2026-10-28 · Anahtar kelime kararları: `docs/SEO_KEYWORD_MAP.md`
> **Site yayın öncesi kapalıdır:** `SITE_INDEXABLE` (`src/lib/site.ts`) `"true"` olmadıkça tüm sayfalar `noindex, nofollow`, `robots.txt` `Disallow: /`. Bu varsayılan değiştirilmez; canlıya geçişte yalnız ortam değişkeni açılır.

## 1. Uygulananlar

### Teknik SEO
- [x] `buildMetadata()` — mutlak canonical (`metadataBase` + self path), `og:locale=tr_TR`, `og:site_name`, `og:url`, OG görseli (genişlik/yükseklik/alt), `twitter:card=summary_large_image`. Alt sayfalarda OG nesnesi kökü ezdiği için her sayfada yeniden üretilir.
- [x] Başlık seçimi `fitTitle()`: ≤60 karakter, marka (`| İST İlaçlama`) sığarsa eklenir; sığmazsa anahtar kelime başta kalır.
- [x] Açıklamalar 140–160 karakter, benzersiz, Türkçe; `withSuffix()` sınır aşılırsa daha kısa eki ya da hiç eki seçer.
- [x] Taslak/eksik sayfalar `noindex` + sitemap dışı: gövdesi olmayan hizmet ve blog sayfaları, onaylı metni gelmemiş 3 yasal sayfa.
- [x] `src/app/robots.ts` — kapalıyken `Disallow: /`; açıkken `Allow: /`, `Disallow: /admin, /api`, `Sitemap:` ve `Host:`. AI tarayıcıları ayrıca engellenmez (GEO görünürlüğü).
- [x] `src/app/sitemap.ts` — tek dosya (~1.051 URL, 50.000 sınırının altında; `generateSitemaps` gereksiz karmaşa ve otomatik index üretmediği için kullanılmadı). `lastModified` (`CONTENT_UPDATED_AT`, blogda `publishedAt`), `changeFrequency`, `priority`, hizmet/ilçe/mahalle/rehber/blog için **image sitemap** (`<image:image>`). `/admin`, `/api`, yönlendirme yapan `/hizmet-bolgeleri/istanbul` yok.
- [x] Rehber sayısı `pestGuides` dizisinden okunur; yeni tür eklenince sitemap kendiliğinden güncellenir.

### Yapılandırılmış veri (JSON-LD, `src/lib/seo/jsonld.ts`)
| Sayfa türü | Şemalar |
|---|---|
| Tüm sayfalar (kök layout) | `Organization` (`@id: /#organization`), `WebSite` (`@id: /#website`, SearchAction yok — site içi arama yok) |
| Hizmet detay (25) | `BreadcrumbList`, `Service` (provider → Organization @id, areaServed İstanbul), `FAQPage` (sayfada görünen SSS) |
| İlçe (39) / mahalle (959) | `BreadcrumbList`, `Service` (areaServed `AdministrativeArea` → İstanbul), `FAQPage` (görünen bölge SSS'i) |
| Hizmetlerimiz | `BreadcrumbList`, `ItemList` |
| Hizmet bölgeleri | `BreadcrumbList`, `ItemList` (39 ilçe) |
| Blog listesi | `BreadcrumbList`, `Blog` (publisher → Organization @id) |
| Blog yazısı | `BreadcrumbList`, `BlogPosting` (author/publisher → Organization @id, `citation` kaynaklar) |
| SSS | `BreadcrumbList`, `FAQPage` |
| Kurumsal / İletişim | `BreadcrumbList`, `AboutPage` / `ContactPage` (about → Organization @id) |
| Teklif al | `BreadcrumbList`, `WebPage` |
| Böcek rehberi (liste ve detay sayfaları) | `CollectionPage`, `Article`, `FAQPage`, `BreadcrumbList` |

**Neden `LocalBusiness` değil:** Google `LocalBusiness` için doğrulanabilir fiziksel adres (`address`) bekler; işletmenin doğrulanmış adresi, koordinatı, çalışma saati yok. Uydurma ya da eksik adresli `LocalBusiness` hem yönergelere aykırı hem de NAP tutarsızlığı yaratır. Bu yüzden `Organization` + `areaServed: İstanbul` (Wikidata Q406) kullanılır; telefon, e-posta, `legalName`, `sameAs` yalnız `verified()` true olduğunda yazılır. Adres + Google İşletme Profili doğrulanınca tür `["Organization", "LocalBusiness"]` (veya `HomeAndConstructionBusiness`; schema.org'da haşere kontrolüne özgü tür yoktur) olarak yükseltilir ve `address`, `geo`, `openingHoursSpecification` eklenir. Adres hiç yayımlanmayacaksa (yalnız hizmet alanı işletmesi) `Organization` + `areaServed` kalır.

Kural: Puan (`aggregateRating`), yorum (`Review`), fiyat (`offers`), kuruluş yılı **yazılmaz** — doğrulanmış veri yok.

### GEO / AI arama
- [x] `public/llms.txt` — doğrulanmış temel bilgiler, marka yazımı, sayfa haritası (25 hizmet, 14 rehber, bölge desenleri, veri kaynağı), iddia kısıtları.
- [x] Varlık tutarlılığı: tüm title, OG `site_name`, JSON-LD `name` ve llms.txt "İST İlaçlama" (`BRAND` sabiti) kullanır.
- [x] FAQPage yalnız SSS'in görünür olduğu sayfalarda (hizmet, ilçe, mahalle, SSS, rehber). Ana sayfadaki 5 soruluk SSS bölümü için **ayrı FAQPage eklenmedi** — aynı sorular `/sik-sorulan-sorular`'da işaretli; yinelenen FAQ şeması önlendi.
- [x] Blog yazılarında `citation` ile dış kaynaklar (otorite sinyali).

## 2. Doğrudan cevap özeti (40–60 kelime) denetimi

| Sayfa türü | Alan | Kelime sayısı | Durum |
|---|---|---|---|
| Blog yazıları (10) | `blogBodies[].summary` | 45–54 | ✅ |
| Böcek rehberi (14) | `pestGuides[].summary` | 39–48 | ✅ (1 sayfa 39, sınırda) |
| Hizmet detay (25) | `serviceDetails[].summary` (hero altı) | 16–29 | ⚠️ Kısa. İçerik ekibi: hero altına ya da `intro[0]` başına 40–60 kelimelik "X nedir, nasıl yapılır, kime uygun" cevabı |
| İlçe (39) | hero `summary` (sayfa içinde sabit cümle) | ~20 | ⚠️ Kısa; ilçe adını, mahalle sayısını ve yapı stoku profilini içeren 40–60 kelimelik özet önerilir (`src/lib/regions/content.ts`) |
| Mahalle (959) | hero özeti | kısa | ⚠️ Aynı öneri; bina sayısı ve yaş profili zaten veri olarak mevcut |
| Ana sayfa | Hero alt metni | kısa | ⚠️ "İST İlaçlama nedir/ne yapar" tek paragraf (40–60 kelime) önerilir |
| SSS | Her cevap | soru başına kısa | ✅ |

(Bu bölüm denetim raporudur; `src/content/**` ve bileşenler bu kapsamda değiştirilmedi.)

## 3. Böcek Rehberi için öneriler

1. `generateMetadata` → `buildMetadata()` kullanmalı: şu an OG nesnesinde `locale`, `siteName`, `url` yok; Twitter görseli kökten gelmiyor.
2. Başlık `"{Ad} Nedir, Nasıl Tanınır? Belirtiler ve Önleme"` + şablon `| İST İlaçlama` → ~65–75 karakter. Öneri: `fitTitle([\`${p.name} Nedir, Nasıl Tanınır?\`, \`${p.name} Belirtileri ve Önleme\`])`; `p.name` küçük harfle başlıyor ("Hamam böceği") — başlıkta "Hamam Böceği" biçimi tercih edilmeli.
3. Açıklama `…` ile kesiliyor; `summary`'nin ilk cümlesi ya da ayrı `metaDescription` alanı daha temiz.
4. JSON-LD: `author`/`publisher` → `{ "@id": ORGANIZATION_ID }`; `breadcrumbJsonLd()` yardımcıları; `Article`'a `dateModified` (içerik tarihi) eklenmeli; `citation` URL dizisi yerine `CreativeWork` nesneleri.
5. Rehber dizin sayfası metadata'sı da `buildMetadata({ title: "Böcek Rehberi: Ev Zararlılarını Tanıma ve Önleme", … })` ile OG/Twitter'ı tamamlamalı.

## 4. Dosyalar

| Dosya | Durum |
|---|---|
| `src/lib/seo/metadata.ts` | buildMetadata, fitTitle, withSuffix (çoklu ek), BRAND, CONTENT_UPDATED_AT |
| `src/lib/seo/jsonld.ts` | Organization, WebSite, BreadcrumbList, Service, AdministrativeArea, BlogPosting, FAQPage, ItemList, WebPage |
| `src/lib/seo/keywords.ts` | PAGE_SEO (11 sayfa), SERVICE_SEO (25 hizmet) |
| `src/app/robots.ts`, `src/app/sitemap.ts` | yeni |
| `public/llms.txt` | yeni |
| `src/app/layout.tsx` | metadataBase, title template, root robots, Organization + WebSite JSON-LD |
| `src/app/(website)/**/page.tsx` | yalnız metadata/generateMetadata ve JSON-LD blokları: ana sayfa, hizmetlerimiz, hizmet detay, hizmet bölgeleri, ilçe, mahalle, blog, blog yazısı, SSS, teklif al, kurumsal, iletişim, 3 yasal sayfa |

## 5. Doğrulama (gönderim yapmadan)

```bash
curl -s http://localhost:3460/robots.txt
curl -s http://localhost:3460/sitemap.xml | grep -c "<loc>"
```
- Sayfa kaynağında `<title>`, `meta[name=description]`, `link[rel=canonical]`, `script[type="application/ld+json"]` kontrolü (JSON.parse ile).
- Yayın sonrası: [Rich Results Test](https://search.google.com/test/rich-results) ve [Schema Markup Validator](https://validator.schema.org/) — URL veya kod yapıştırarak.
- Search Console: mülk doğrulama, sitemap gönderimi ve URL denetimi **yalnız canlıya geçiş onayından sonra, kullanıcı tarafından** yapılır. Bu çalışmada hiçbir dış servise gönderim/ping/IndexNow yapılmadı.
- Canlıya geçiş: `SITE_INDEXABLE=true`, `SHOW_DRAFT_CONTENT=false`, `NEXT_PUBLIC_SITE_URL=https://istilaclama.com.tr` → robots/sitemap/noindex tekrar kontrol. `SHOW_DRAFT_CONTENT=false` ile draft hizmet/blog sayfaları listeden düşer; sitemap aynı listeyi kullandığı için tutarlı kalır.

## 6. Kullanıcıdan beklenen veriler

| Veri | Nerede kullanılacak |
|---|---|
| Doğrulanmış telefon / WhatsApp | Organization `telephone`, `contactPoint`, llms.txt |
| Fiziksel adres (varsa) + çalışma saatleri | `LocalBusiness` yükseltmesi, iletişim sayfası, NAP |
| Google İşletme Profili (GBP) bağlantısı | `sameAs`, yerel sıralama |
| Sosyal medya profilleri | `sameAs` (`siteSettings.social`) |
| Ticari unvan (`legalName`), vergi/MERSİS | Organization `legalName`, künye |
| Biyosidal ürün uygulama izni / sorumlu yönetici belgesi | Kurumsal ve belge şeffaflığı sayfaları, E-E-A-T |
| Logo SVG (kare ve yatay) | Organization `logo` (şu an PNG), favicon |
| Özel OG görseli (1200×630, marka) | `DEFAULT_OG_IMAGE` |
| Onaylı KVKK / gizlilik / çerez metinleri | Yasal sayfaların noindex'ten çıkarılması ve sitemap'e eklenmesi |
| Gerçek müşteri yorumları (izinli) | Ancak doğrulanırsa `Review` — şimdilik yok |
