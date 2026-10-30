# SEO Anahtar Kelime Haritası — İST İlaçlama

> Tarih: 2026-10-28 · Uygulandığı yer: `src/lib/seo/keywords.ts` (PAGE_SEO, SERVICE_SEO) ve dinamik sayfaların `generateMetadata` fonksiyonları.
> **Arama hacmi yok.** Öncelikler göreli (Y/O/D) ve aşağıdaki gözlemlere dayanır; Search Console + Türkiye konumlu bir sıralama aracıyla doğrulanmalıdır.

## 1. Yöntem ve sınırlar

- Rakip incelemesi: pakisilaclama.com, istanbulilaclama.com, ilaclama.com.tr, biosin.com.tr, farepireilaclama.com.tr — ana sayfa, 2–3 hizmet sayfası ve varsa ilçe sayfası (title, H1, URL deseni, içerik yapısı).
- SERP kontrolü: 13 Türkçe sorgu. Arama aracı ABD konumlu olduğundan sonuçlar gerçek google.com.tr İstanbul sıralaması **değildir**; "konuyu kim sahipleniyor" sinyali olarak okunmalı. "Kullanıcılar ayrıca sordu" kutusu ve hacim verisi alınamadı.
- Rakiplerin JSON-LD şemaları araçla görülemedi (script içerikleri ayıklanıyor); Rich Results Test ile elle bakılmalı.

## 2. Gözlemler (özet)

| Bulgu | Etki |
|---|---|
| "ilaçlama" ve "böcek ilaçlama" tüm rakiplerin H1/title'ında baş terim; "haşere ilaçlama" ikincil H2; "haşere kontrolü" / "pest kontrol" kurumsal ve HACCP bağlamında | Ev/zararlı sayfalarında "ilaçlama", kurumsal sayfalarda "pest kontrol" / "haşere kontrolü" |
| Hizmet + konum sorgularında armut.com (`/{ilce}-{hizmet}-ilaclama`), firmasec, ensun.io ve haber sitelerindeki tanıtım yazıları baskın | İlçe/mahalle sayfaları ince şablon değil, yerel veri + güven sinyaliyle ayrışmalı |
| 39 ilçe sayfası: farepireilaclama ve pakisilaclama (`{ilce}-bocek-ilaclama`); mahalle sayfası yalnız pakis'te ve ince (~300 kelime). İncelenen tüm ilçe sayfalarında yanlış ilçe/adres hatası var | Bizim mahalle sayfaları İBB verisiyle özgün; adres uydurulmaması doğru tercih |
| Zehirlenme haberleri (Esenyurt, Ümraniye, Keçiören, İzmir) baş sorguların önemli kısmını kaplıyor | Güvenlik, belge (biyosidal ruhsat), eve dönüş süresi içerikleri talep görüyor |
| "nasıl yok edilir", "belirtileri" sorgularını sağlık kurumları (Acıbadem, Memorial), Rentokil TR, medya ve forumlar sahipleniyor; rakip hizmet sayfası çıkmadı | Bilgi niyeti → Böcek Rehberi + blog; hizmet sayfası bu sorguları hedeflemez |
| "ilaçlama sonrası eve ne zaman girilir / kaç saat sonra" için otoriter cevap sayfası görülmedi | En net içerik fırsatı (cevap öncelikli rehber) |
| Rakiplerde fiyat (850–7.500 TL), "%100 garanti", tutarsız kuruluş yılları | Biz doğrulanmamış iddia kullanmıyoruz; fiyat yalnız işletme onaylarsa |
| "tahta kurusu" ve "tahtakurusu" yazımları ikisi de kullanılıyor (sağlık siteleri bitişik) | Rehberde varyant olarak geçmeli (`altNames`) |

## 3. Yamyamlık (cannibalization) kuralı — rehber ↔ hizmet ↔ blog

| Niyet | Sayfa türü | Hedef sorgu kalıbı | Hedeflemez |
|---|---|---|---|
| Ticari | `/hizmetlerimiz/{slug}` | "{zararlı} ilaçlama", "{zararlı} ilaçlama istanbul", "{alan} ilaçlama" | "nedir", "belirtileri", "nasıl yok edilir" |
| Ticari + yerel | `/hizmet-bolgeleri/istanbul/{ilce}[/{mahalle}]` | "{ilçe} böcek ilaçlama", "{mahalle} ilaçlama" | zararlı adı tek başına |
| Bilgi (tür) | `/bocek-rehberi/{slug}` | "{zararlı} nedir / nasıl tanınır / belirtileri / nerede yaşar" | "ilaçlama", "istanbul" |
| Bilgi (durum/soru) | `/blog/{slug}` | "neden", "ne yapılmalı", "nelere dikkat", "hangi belgeler" | tür tanımı (rehberde) ve hizmet terimi |

Bağlantı yönü: rehber/blog → ilgili hizmet sayfası (tek "ilgili hizmet" linki); hizmet → rehber ("türü tanıyın"). Aynı sorgu için iki sayfa yazılmaz; çakışan blog fikirleri rehbere bölüm olarak eklenir.

## 4. URL deseni → anahtar kelime haritası

Öncelik: **Y** yüksek · **O** orta · **D** düşük (gözlenen ticari niyet ve rekabete göre, hacim değil).

| URL | Birincil | İkincil | Niyet | Öncelik | Title deseni (≤60) | Meta description deseni (140–160) |
|---|---|---|---|---|---|---|
| `/` | istanbul böcek ilaçlama | istanbul ilaçlama, haşere kontrolü, ilaçlama firması | Ticari | Y | İstanbul Böcek İlaçlama ve Haşere Kontrolü \| İST İlaçlama | Kime (ev, apartman, site, işletme) + yaklaşım (türe göre plan) + süreç (inceleme, yazılı plan, takip) |
| `/hizmetlerimiz` | ilaçlama hizmetleri | haşere ilaçlama, ev ilaçlama, işletme ilaçlama | Ticari | O | İlaçlama Hizmetleri: Haşere, Ev ve İşletme \| Marka | Zararlı örnekleri + alan örnekleri + "25 hizmet" + planlama |
| `/hizmetlerimiz/{zararli}` (12) | {zararlı} ilaçlama | {zararlı} ilaçlama istanbul, {zararlı} kontrolü, {zararlı} firması | Ticari | Y (hamam böceği, fare, tahta kurusu, pire) / O | {Zararlı} İlaçlama İstanbul[: fayda] \| Marka | "{Zararlı} ilaçlama:" + nerede inceleriz + yöntem + takip + "Teklif alın." |
| `/hizmetlerimiz/{alan}` (7) | {alan} ilaçlama | {alan} ilaçlama istanbul, ortak alan, yönetim | Ticari | Y (apartman, ev) / O (site, ofis, işyeri) / D (bahçe, bodrum) | {Alan} İlaçlama İstanbul: {fayda} | Alan özgü kapsam + koordinasyon + hazırlık |
| `/hizmetlerimiz/{kurumsal}` (6) | {sektör} ilaçlama / pest kontrol | periyodik ilaçlama, HACCP pest kontrol, IPM | Ticari B2B | O (restoran, otel) / D | {Sektör} İlaçlama ve Pest Kontrol İstanbul | Kayıtlı program + alan bölümleri + denetime hazır dokümantasyon |
| `/hizmet-bolgeleri` | istanbul ilaçlama bölgeleri | anadolu yakası ilaçlama, avrupa yakası ilaçlama | Gezinme | D | İstanbul İlaçlama Hizmet Bölgeleri | 39 ilçe + mahalle + "ilçenizi seçin" |
| `/hizmet-bolgeleri/istanbul/{ilce}` (39) | {ilçe} böcek ilaçlama | {ilçe} ilaçlama, {ilçe} haşere kontrolü | Ticari yerel | Y | {İlçe} Böcek İlaçlama ve Haşere Kontrolü \| Marka (sığmazsa markasız) | "{İlçe} böcek ilaçlama ve haşere kontrolü: {n} mahallede … yapı stokuna göre …" + "Teklif alın." |
| `/hizmet-bolgeleri/istanbul/{ilce}/{mahalle}` (959) | {mahalle} böcek ilaçlama | {mahalle} ilaçlama, {mahalle} {ilçe} ilaçlama | Ticari yerel (uzun kuyruk) | D (tekil) / O (toplam) | {Mahalle} Böcek İlaçlama, {İlçe} \| Marka | "{Mahalle} Mahallesi ({İlçe}) … {n} binalık yapı stokuna göre …" (İBB verisi → her sayfada özgün sayı) |
| `/bocek-rehberi` | böcek rehberi | ev zararlıları, böcek türleri | Bilgi | O | Böcek Rehberi: Ev Zararlılarını Tanıma ve Önleme | Tür örnekleri + "fotoğraflarla tanıyın" + belirti/önleme |
| `/bocek-rehberi/{tur}` (14) | {tür} nedir / nasıl tanınır | {tür} belirtileri, nerede yaşar, {tür} ısırığı, yazım varyantları | Bilgi | O (hamam böceği, tahta kurusu Y) | {Tür} Nedir, Nasıl Tanınır? (≤60 için kısaltılmalı, bkz. checklist) | Rehber özeti (40–60 kelime) ilk 160 karakter |
| `/blog` | haşere rehberi | ilaçlama rehberi, bilgi merkezi | Bilgi | D | Haşere Bilgi Merkezi ve İlaçlama Rehberleri | Konu örnekleri + "kaynaklı" |
| `/blog/{slug}` (10) | yazının soru kalıbı | ilgili PAA soruları | Bilgi | O | Yazı başlığı (+ marka sığarsa) | Özet + "kaynak gösterilen rehber" eki |
| `/sik-sorulan-sorular` | ilaçlama sık sorulan sorular | ilaçlama sonrası eve ne zaman girilir, ilaçlama öncesi hazırlık | Bilgi / AEO | O | İlaçlama Hakkında Sık Sorulan Sorular | Konu listesi (hazırlık, dönüş, takip, belgeler) |
| `/teklif-al` | ilaçlama teklifi | ilaçlama fiyat teklifi | İşlem | O | İlaçlama Teklifi Alın: Online Talep Formu | Ne paylaşılır + ne alınır + "birkaç dakika" |
| `/kurumsal` | ilaçlama firması | haşere kontrol firması, çalışma yaklaşımı | Güven | D | Hakkımızda: Haşere Kontrolü Yaklaşımımız | Yaklaşım adımları |
| `/iletisim` | ilaçlama firması iletişim | — | Gezinme | D | İletişim ve Teklif Talebi | Kanallar + talepte paylaşılacaklar |
| Yasal (3) | — | — | — | — | Sayfa adı \| Marka | Kısa tanım — **onaylı metin gelene kadar noindex** |

Gerçek değerler `src/lib/seo/keywords.ts` dosyasındadır; 25 hizmetin tamamı için ayrı title/description tanımlıdır.

## 5. İçerik fırsatları (öncelik sırasıyla; içerik ekibine)

1. **"İlaçlama sonrası eve ne zaman girilir?"** — cevap öncelikli rehber (SERP'te otoriter sayfa yok; güvenlik haberleri talebi gösteriyor). Ürün/doz vermeden, "etiket ve uygulayıcı talimatı" + havalandırma + çocuk/evcil hayvan bölümü.
2. **İlaçlama firmasında hangi belgeler istenmeli** (biyosidal ürün ruhsatı, uygulayıcı belgesi) — blogda var; belge şeffaflığı sayfası ile birleştirilmeli.
3. Sektör sayfalarını derinleştirme: apartman/site yönetimi (yönetim kararı, duyuru şablonu), restoran (HACCP denetimi), otel (tahta kurusu protokolü) — rakiplerde zayıf.
4. Mevsimsel/yerel: kahverengi kokarca böceği (Kadıköy haberleri), Amerikan beyaz kelebeği tırtılı, valilik sivrisinek/kene genelgeleri — rehbere tür olarak eklenebilir.
5. Yazım varyantları: "tahtakurusu", "hamamböceği" rehberde `altNames` olarak görünür metinde geçmeli.
