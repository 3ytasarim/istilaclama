# Veri Modeli (Drizzle / Neon PostgreSQL) — Sprint 2 tasarımı

Bu belge tasarımdır; şema henüz veritabanına uygulanmadı. Canlı DB önce **salt okunur** incelenecek, mevcut tablolar korunacak,
veri silen migration yazılmayacak.

## Ortak kurallar

- PK: `uuid` (`gen_random_uuid()`); `created_at`, `updated_at` (timestamptz) her tabloda.
- Yayınlanabilir içerik: `status` enum (`draft | review | published | archived`), `published_at`, `deleted_at` (soft delete).
- Slug'lar `unique`, Türkçe → ASCII (`src/lib/slug.ts`).
- SEO alanları ayrı tabloda (`seo_metadata`, polimorfik değil: her içerik tablosunda `seo_id` FK) → audit sorguları tek tablodan.

## Tablolar

| Grup | Tablolar |
|---|---|
| Kimlik | `users`, `sessions`, `roles`, `permissions`, `role_permissions`, `user_roles`, `login_attempts` |
| Site | `site_settings` (anahtar-değer + `verified` bayrağı), `navigation_items`, `pages`, `page_sections` |
| Hizmet | `service_categories`, `services`, `service_sections` (19 bölümlü şablonun blokları), `service_region_relations` |
| Bölge | `regions` (il/ilçe ağacı, `side`, `active`, `content_score`), `service_areas` |
| Blog | `blog_posts`, `blog_categories`, `blog_tags`, `post_tag_relations`, `post_sources` (kaynak atıfları), `authors` |
| Medya | `media_assets` (orijinal + SEO alanları), `media_variants` (boyut × format), `media_usages` (nerede kullanıldı) |
| Ortak içerik | `faq_items` (scope + FK), `certifications` (belge no, veren kurum, geçerlilik, `verified`), `testimonials` (onay akışı) |
| Dönüşüm | `contact_leads`, `lead_notes`, `consent_records` (KVKK metin versiyonu + zaman damgası) |
| SEO | `seo_metadata`, `seo_redirects` (301/302/410), `seo_audits` + `seo_audit_issues`, `seo_external_tasks`, `backlinks`, `citations` |
| Denetim | `content_revisions` (JSON anlık görüntü), `audit_logs` (kim, ne, ne zaman, önce/sonra) |

## Önemli kısıtlar

- `regions`: `active = true` ancak admin onayıyla; `status = published` için `content_score` eşiği (özgün metin uzunluğu,
  görsel, SSS, iç bağlantı sayısı) uygulama katmanında kontrol edilir. Eşik altı → `noindex` + sitemap dışı.
- `site_settings.verified = false` olan değerler public API'den dönmez.
- `contact_leads`: telefon E.164 normalize, `ip_hash` (ham IP saklanmaz), `source_path`, `status` enum
  (`new | contacted | quoted | completed | spam`). Saklama süresi ayarı + silme job'u (KVKK).
- `media_usages` FK'leri silmeyi engeller (kullanımdaki görsel silinemez → "güvenli silme").

## Repository sınırı

Bileşenler yalnız `src/server/content.ts` fonksiyonlarını kullanır. Sprint 2'de bu fonksiyonların içi Drizzle sorgularına
çevrilir; `src/content/*.ts` tohum verisi `db:seed` ile aktarılır.
