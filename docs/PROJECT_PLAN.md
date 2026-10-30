# İST İlaçlama — Proje Planı

Domain: https://istilaclama.com.tr · Dil: Türkçe · Tip: Kurumsal site + özel admin CMS (PostgreSQL)

## 1. Proje kararları

| Konu | Karar | Gerekçe |
|---|---|---|
| Framework | Next.js 16 (App Router), React 19, TS strict | Server Components ile gerçek HTML çıktısı, ISR + on-demand revalidation |
| Stil | Tailwind CSS v4 + CSS token'ları | Tek design system, dark mode token'ları hazır |
| UI primitive | Radix UI (`radix-ui`), Lucide ikonlar | Erişilebilir dropdown/accordion/dialog; shadcn kalıpları elle, tutarlı tek sistemde |
| Animasyon | Motion (yalnız istemci adacıklarında) + CSS | Hydration yükünü düşük tutmak için çoğu reveal CSS/IntersectionObserver |
| Veritabanı | Neon PostgreSQL + Drizzle ORM + versiyonlu migration | Kullanıcı tercihi; migration'lar `DIRECT_URL` ile |
| Auth | Kendi session sistemimiz: Argon2id + HTTP-only cookie + DB session | Basit, denetlenebilir, harici bağımlılık yok |
| Editör | Tiptap (Sprint 5) + sunucu tarafı sanitize | Güvenli rich text |
| Medya | Sharp pipeline → AVIF/WebP türevleri; `local` / `s3` storage adaptörü | Image SEO sistemi |
| Port | Geliştirme: `localhost:3460` | Diğer projelerle çakışmasın |

## 2. Site haritası

```
/                                   Ana sayfa
/kurumsal                           Hakkımızda / süreç / belgeler
/hizmetlerimiz                      Hizmet listesi (3 grup)
/hizmetlerimiz/[slug]               Hizmet detay (19 bölümlü şablon)
/hizmet-bolgeleri                   Bölge seçici
/hizmet-bolgeleri/istanbul          İstanbul (Anadolu/Avrupa)
/hizmet-bolgeleri/istanbul/[ilce]   İlçe sayfası (yalnız aktif + yeterli içerik → index)
/blog                               Bilgi merkezi
/blog/kategori/[slug]               Kategori
/blog/[slug]                        Yazı
/sik-sorulan-sorular                SSS
/iletisim                           İletişim + teklif formu
/teklif-al                          Odaklı teklif formu
/kvkk-aydinlatma-metni, /gizlilik-politikasi, /cerez-politikasi
/admin, /admin/giris                CMS
```

## 3. Sprintler ve durum

| Sprint | Kapsam | Durum |
|---|---|---|
| 0 | Rakip analizi, site haritası, design system, mimari, içerik modeli | **Bu turda** |
| 1 | Header + mega menü, hero, ana sayfa bölümleri, footer, responsive | **Bu turda** |
| 2 | Neon bağlantısı (salt-okunur doğrulama), Drizzle şema, auth, RBAC, admin shell | `DATABASE_URL` bekliyor |
| 3 | Hizmetler CMS + detay sayfaları | — |
| 4 | Hizmet bölgeleri (39 ilçe, taslak/aktif, noindex kuralı) | — |
| 5 | Blog + medya kütüphanesi + Image SEO pipeline | — |
| 6 | Metadata, JSON-LD, sitemap/image sitemap, redirects, SEO audit | — |
| 7 | Teklif formu, WhatsApp, lead dashboard | — |
| 8 | Güvenlik sertleştirme, cache, a11y, CWV | — |
| 9 | E2E, SEO crawl, HTML rendering testleri, production checklist | — |

## 4. Mimari ilke: içerik katmanı

Sprint 1'de bileşenler veriyi doğrudan sabitlerden değil, `src/server/content/*` repository fonksiyonlarından alır
(`getSiteSettings()`, `listServices()` vb.). Sprint 2+ bu fonksiyonların içi Drizzle sorgularıyla değişir; bileşenler değişmez.
Şu an kaynak: `src/content/*.ts` tohum verisi (aynı veri Sprint 2'de `db:seed` ile veritabanına aktarılacak).

## 5. Doğruluk kuralları (yayın kapısı)

- Doğrulanmamış işletme bilgisi (telefon, adres, ruhsat, sertifika, çalışma saati, garanti, fiyat) **yayınlanmaz**; `verified: false` alanlarla taslak tutulur, arayüzde gizlenir.
- Sahte sayaç, puan, yorum, müşteri sayısı, sertifika üretilmez.
- "%100 güvenli / tamamen zararsız / kesin çözüm" gibi ifadeler yasak (bkz. `docs/CONTENT_GUIDELINES.md`).
- Dozaj, karışım tarifi, yetkisiz kullanım talimatı yayınlanmaz.
- İlçe sayfaları varsayılan `draft` + `noindex`; admin doğrulayıp içerik eşiğini geçince yayınlanır.
- Dış etkili işlem (deploy, DNS, prod migration, Search Console) ayrı onay olmadan yapılmaz.

## 6. Kullanıcıdan beklenen bilgiler

Bkz. `docs/OPEN_ITEMS.md`.
