# İST İlaçlama — Pazar ve Rakip Araştırması

> Hazırlayan: Market Research Specialist · Tarih: 2026-10-27 · Kapsam: İstanbul ilaçlama sektöründe 5 rakip site
> Yöntem: Her sitenin ana sayfası ve 2–4 iç sayfası (hizmet detayı, ilçe/bölge, blog, iletişim/teklif) çekildi. Ham HTML'den title, meta, H1, canonical ve JSON-LD tipleri çıkarıldı. İlçe sayfaları birbiriyle paragraf bazında karşılaştırıldı.
> Not: Rakip metinleri kopyalanmadı. Aşağıdaki her şey kendi cümlelerimizle özetlendi.

---

## 1. Özet

- **Pazar, eski WordPress/HTML sitelerle dolu.** Beş rakibin hiçbiri "premium, modern, hızlı" hissi vermiyor. Tasarım sıradan, görseller stok veya SVG yer tutucusu, mobil deneyim telefon/WhatsApp butonuna indirgenmiş.
- **Herkes aynı vaatte yarışıyor:** 7/24, garantili, kokusuz, Sağlık Bakanlığı onaylı, "450–950 TL'den başlayan" fiyat. Fark yaratan tek şey **kanıt** olacak: ruhsat numarası, gerçek ekip, gerçek saha fotoğrafı, şeffaf süreç.
- **Güven iddiaları doğrulanamıyor.** Ruhsat/belge numarası gösteren yok. Bazı sitelerde yıl sayısı aynı sayfada 20, 24, 25 ve "1995'ten beri" diye değişiyor. ISO 27001 (bilgi güvenliği) bile ilaçlama güven rozeti gibi sunuluyor.
- **Riskli dil yaygın:** "%100 memnuniyet/garanti", "insana ve evcil hayvana hiçbir zararı yok", "%99'a kadar etkili", "Türkiye'nin 1 numarası", "tek bir haşere bile görmeyeceksiniz". Bu dil hem yasal risk hem de Google'ın YMYL/güven değerlendirmesi açısından zayıf.
- **İlçe sayfaları iki uçta:** Pak İş ve Fare Pire İlaçlama'da ilçe sayfalarının %93–96'sı aynı metin, sadece ilçe adı değişiyor (doorway riski). Biosin az sayıda ilçe sayfası açmış ama içerikleri büyük ölçüde özgün. ilaclama.com.tr ve istanbulilaclama.com ilçe sayfası yerine sadece Anadolu/Avrupa Yakası sayfası kullanıyor.
- **Formlar zayıf:** Gerçek bir "teklif sihirbazı" (haşere türü, mekân tipi, m², foto yükleme) sunan yok. Çoğu "numaranı bırak" kutusu ya da WhatsApp linki.
- **Schema kullanımı sığ:** Çoğunda Yoast/Rank Math'in otomatik WebSite/Organization şeması var. `LocalBusiness`/`PestControlService` (ya da `HomeAndConstructionBusiness`), `Service`, `HowTo` gibi zengin işaretleme ya yok ya da tutarsız. istanbulilaclama.com bölge sayfasında kendi verdiği, 6 oylu bir `AggregateRating` var (Google'ın self-serving review kuralına takılır).
- **İçerik/GEO fırsatı büyük:** Bilgi merkezi olan iki site var (ilaclama.com.tr "Haşerehane", istanbulilaclama.com "Bilgi Merkezi") ama yazar, tarih ve kaynak yok. Pak İş'in blogu B2B (HACCP, BRCGS, fumigasyon) konusunda en derin olanı. Biosin'in blog sayfası boş.

**Ana fırsat:** "Kanıtlanabilir güven + şeffaf süreç + modern teklif deneyimi + gerçekten yerel içerik." Rakiplerin hiçbiri bu dördünü birlikte yapmıyor.

---

## 2. Rakip Karşılaştırma Tablosu

| Kriter | Pak İş (pakisilaclama.com) | İstanbul İlaçlama (istanbulilaclama.com) | ilaclama.com.tr | Biosin (biosin.com.tr) | Fare Pire İlaçlama (farepireilaclama.com.tr) |
|---|---|---|---|---|---|
| Altyapı (gözlem) | Özel CMS, TR/EN | WordPress | WordPress (WP Rocket) | WordPress (Kadence, Slider Revolution) | Statik `.html` |
| Konumlandırma | B2B, fumigasyon, liman/lojistik, gıda güvenliği | Ev + işyeri, "en eski" iddiası | Ev ağırlıklı, "en hızlı/en güvenilir" | Ev + kurumsal, İstanbul/Bursa/Gebze | Ev + küçük işletme, 7/24 acil |
| Title kalitesi | Ana sayfada marka; iç sayfalarda sadece hizmet/ilçe adı (marka yok) | Anahtar kelime dizisi, okunur | "Garantili" ile başlıyor, anahtar kelime ağırlıklı | İyi, marka + konum + hizmet | Kısa ve temiz |
| Meta description | Var; bir hizmet sayfasında HTML `<p>` kaçışı sızmış | "%100 Memnuniyet Garantili" + emoji + "Tıklayın!" | "%100 garanti" + emoji | Ölçülü, kurumsal | Ana sayfada yok, ilçe sayfalarında şablon |
| H1 | Ana sayfada 2 adet H1 (slider) | Var, tek kelime grubu | Var | Ana sayfada bozuk ("Anasayfa" + birleşik metin) | **Hiçbir sayfada H1 yok** (H2 ile başlıyor) |
| JSON-LD | Yok | WebSite, Organization, Breadcrumb; bölge sayfasında AggregateRating (5/5, 6 oy) | Organization, FAQPage, ContactPoint, Breadcrumb; bölge sayfası Article+Person | WebSite, Service+Offer, Place, FAQPage, Breadcrumb, VideoObject | WebSite, Organization, AdministrativeArea |
| Hizmet sayısı | 5 ana + ürün satışı | ~15 (bazıları çift URL) | ~8 | ~15 | 15 |
| İlçe sayfası | 51 (39 İstanbul + 12 Kocaeli), şablon | Yok (sadece 2 yaka) | Yok (sadece 2 yaka) | Az sayıda (Kadıköy, Esenyurt, Ümraniye + Bursa, Gebze), özgün | 39, şablon |
| Teklif formu | Yok (tel/WhatsApp) | "Numaranı bırak" + 4 alanlı iletişim formu | "Beni arayın" kutusu; iletişim sayfasında form yok | Teklif sayfası var ama alanları JS ile yükleniyor | Yok (tel/WhatsApp/e-posta) |
| Fiyat şeffaflığı | Yok | "900 TL'den" | Daire tipine göre fiyat tablosu (1+1 950 TL…) + "fiyat modülü" | PDF fiyat listesi + "500 TL'den" | Yok |
| Belge gösterimi | 9 belge adı (ISO, TSE, biyosidal izin, zirai fumigasyon ruhsatı), numara yok | 5 belge görseli, başlıksız | Ruhsat + ISO + TSE PDF linkleri | "ISO 90001" yazım hatalı rozet | Hiç yok |
| Sigorta | — | AXA iddiası | Doğa Sigorta iddiası | — | — |
| Sosyal kanıt | 26 isimsiz logo ("Referans 1…26") | Referans sayfası | ~15 büyük marka logosu, 818 oy iddiası | 724 Google yorumu (Trustindex) | 3 isimsiz kısa yorum |
| Blog | Güçlü B2B blog (25+ yazı) | Bilgi merkezi (hizmet sayfalarına bağlı) | Haşerehane (haşere rehberi) | Blog sayfası boş | Yok; SSS sayfası 404 |
| En büyük zayıflık | B2C kullanıcı için soğuk, ilçe sayfaları kopya | Çelişkili iddialar, çift URL'ler | Çelişkili rakamlar, kırık Avrupa Yakası linki | Mutlak "zararsız" dili | H1 yok, güven sinyali yok, doorway sayfalar |

> **Dikkat:** istanbulilaclama.com ve ilaclama.com.tr aynı WhatsApp numarasını (0543 460 39 33) paylaşıyor. istanbulilaclama.com'un bölge sayfası meta açıklamasında ilaclama.com.tr'nin 444 34 71 numarası geçiyor. Muhtemelen aynı işletmeye ait iki site (çoklu domain stratejisi). Pazarı "5 bağımsız rakip" yerine "4 grup" olarak düşünmek daha doğru.

---

## 3. Site Site Bulgular

### 3.1 Pak İş — pakisilaclama.com

- **Hiyerarşi:** Üst bar (tel, e-posta, TR/EN) → iki slider H1 (liman/konteyner fumigasyonu) → 5 hizmet kartı → "Neden biz" (uzman ekip, 7/24, garantili) → 3 adımlı süreç (ücretsiz keşif, planlama ve fiyat, periyodik takip) → blog → sertifikalar → referans logoları → footer.
- **Hizmetler:** Haşere kontrol, ticari haşere kontrol, fumigasyon, danışmanlık, dezenfeksiyon. Ayrıca PCO ürün satışı, İSG ekipmanı, "Böcek Rehberi", online ödeme.
- **Hizmet detayı:** Fumigasyon sayfası genel, saha koşullarına vurgu yapan bir anlatım. Meta description'a HTML etiketi kaçmış (teknik hata).
- **İlçe sayfaları:** `/{ilce}-bocek-ilaclama`, 39 İstanbul + 12 Kocaeli ilçesi. Sarıyer ve Kartal sayfaları karşılaştırıldı: uzun paragrafların 29'undan 28'i ilçe adı dışında birebir aynı. Meta description'lar da şablon. Title'da marka yok.
- **Güven:** Belge listesi en geniş olan site (ISO 9001/10002/14001/45001/27001, TSE hizmet yeterlilik, biyosidal ürün uygulama izni, zirai fumigasyon ruhsatı, giriş noktaları ilaçlama yetki belgesi), BİFUDER üyeliği. Ama numara, tarih ve PDF yok.
- **Görseller:** Referans görselleri "Referans 1…26" alt metniyle. Bir HACCP yazısında konuyla ilgisiz bir depo rafı fotoğrafı kullanılmış.
- **Blog:** En güçlü içerik. HACCP, BRCGS, IFS, FSSC 22000 uyumlu pest yönetimi, HORECA, gemi/depo/fabrika fumigasyonu, okul/AVM/enerji tesisi dezenfeksiyonu. Sektör × hizmet matrisiyle üretilmiş, başlıkları kalıplı ve abartılı ("biyolojik sıfırlama", "kesin çözüm").
- **Tutarsızlık:** Marka adı bölümden bölüme değişiyor (Pest Control & Fumigation Port Services / Fumigation Port Services).
- **Çıkarım:** B2B ve gıda güvenliği segmentinde ciddi bir rakip. B2C ev kullanıcısına konuşmuyor.

### 3.2 İstanbul İlaçlama — istanbulilaclama.com

- **Hiyerarşi:** Header + 3 telefon → hizmet kartları + geri arama kutusu → H1 "Böcek İlaçlama" → belge görselleri → şirket tanıtımı + video → ilaçlama türleri (kokusuz, jel, fare istasyonu, "kokulu yapmıyoruz") → SSS → işyeri ve iki yaka bölümleri → ev ilaçlama SSS → fiyat → "nasıl yapılır" → footer. Yaklaşık 5.500 kelimelik, SEO metni yığılmış bir ana sayfa.
- **Hizmetler:** Böcek, işyeri, fare, pire, hamam böceği, tahta kurusu, ev, acil, kokusuz, jel, akrep, karınca, uyuz, gümüş böceği.
- **Teknik sorunlar:** Aynı hizmet için çift URL (`/pire-ilaclama/` ve `/pire-ilaclama.htm`, `/isyeri-ilaclama` ve `/acil-ilaclama/ilaclama/isyeri-ilaclama/`). Mantıksız iç içe yollar var. Bazı CTA'lar `href="#"`.
- **Bölge:** Sadece Anadolu ve Avrupa Yakası sayfaları. Anadolu sayfasında 6 oyla 5/5 `AggregateRating` şeması var.
- **Güven:** "Sağlık Bakanlığı ruhsatlı", TSE/ISO, AXA sigortası, HACCP ve kalite politikası sayfaları, Bayer ürünleri. Tecrübe 20 yıl, 25 yıl ve "1995'ten beri" olarak tutarsız.
- **Form:** İletişim formunda ad, telefon (zorunlu), e-posta, mesaj alanları var. KVKK onay kutusu yok. "15 dakikada arıyoruz" vaadi.
- **SSS:** Kapsamlı (eve ne zaman girilir, çocuk/bitki, koku, rapor verilir mi, tekrar uygulama). İçerik olarak iyi ama cevaplarda mutlak dil kullanılıyor.
- **Çıkarım:** SEO yaşı ve içerik hacmi güçlü, güvenilirlik ve tutarlılık zayıf.

### 3.3 ilaclama.com.tr

- **Hiyerarşi:** Hero ("en hızlı ve en güvenilir") → SB/ISO/TSE rozetleri → sigorta bandı → geri arama + "950 TL'den" → neden biz → böcek ilaçlama (istatistik, hizmet listesi, fiyat modülü) → oda oda haşere haritası (mutfak, banyo, yatak odası, çatı, bodrum) → KPI (25+ yıl, aylık 7.000+ müşteri) → teşhis/tedavi/takip → haşere grupları → uzun SEO metni + akordeon SSS → yorumlar → footer formu. Yaklaşık 7.300 kelime.
- **Hizmet detayı (pire):** Sitenin en olgun şablonu. Fiyat tablosu, nasıl yapılır, kokusuz avantajları, eve kaç saatte girilir, nasıl önlenir, evde pire nasıl anlaşılır ve 6 SSS içeriyor. Ancak aynı sayfada süre (20–40 / 30–45 dk), eve dönüş (2–4 / 4–6 / 4–8 saat) ve takip (5–7 / 5–14 gün) rakamları çelişiyor.
- **Fırsat fikri:** "Oda oda haşere haritası" ve "fiyat modülü" iyi UX fikirleri ama kötü uygulanmış.
- **Bölge:** `/hizmet-bolgelerimiz/` (Article şemalı) + Anadolu/Avrupa sayfaları. Avrupa Yakası linki her yerde Anadolu URL'sine gidiyor (kırık iç link).
- **Güven:** Ruhsat, ISO 9001 ve TSE PDF'lerine link (rakipler arasında en iyisi), Doğa Sigorta, büyük kurum logoları. Yıl, personel ve müşteri sayıları sayfadan sayfaya çelişiyor (500+ / 5.000+ periyodik müşteri, 20 / 40+ kişi).
- **Form:** İletişim sayfasında teklif formu yok, sadece yorum formu var (yıldız, yorum, zorunlu KVKK onayı). "Teklif Al" fiyat sayfasına gidiyor.
- **Blog:** "Haşerehane" haşere kütüphanesi. Yazar ve tarih yok. Yorumlar "5 yıl önce" tarihli.
- **Schema:** FAQPage (7 soru), Organization, ContactPoint, PostalAddress.
- **Çıkarım:** İçerik derinliği ve UX fikirleri açısından en ciddi B2C rakip. Tutarlılık ve güvenilirlik açığı en büyük zayıflığı.

### 3.4 Biosin — biosin.com.tr

- **Hiyerarşi:** Hero (Sağlık Bakanlığı + biyosidal) → hakkında → "Sizi hemen arayalım" → 6 hizmet bloğu → özel pest kontrol planı → Google yorumları (724) → mevsimsel ilaçlama görselleri → 6 SSS → bölgeler → footer.
- **Hizmetler:** En geniş B2C yelpaze: hamam böceği, fare, tahta kurusu, ev, böcek, pire, akrep, gümüş böceği, uyuz, kene, arı, bit, sinek, pest kontrol, dezenfeksiyon.
- **Hizmet detayı (böcek ilaçlama):** Yaklaşık 1.000 kelime. Jel, kokulu ve kokusuz yöntemler, yorumlar, SSS, PDF fiyat listesi. Yazar ve tarih yok.
- **İlçe sayfaları:** `/{ilce}-bocek-ilaclama/`. Kadıköy ve Esenyurt karşılaştırıldı: uzun paragrafların ortak olanları büyük ölçüde CSS/JS ve navigasyon, gövde metni çoğunlukla özgün. Kadıköy sayfasında FAQPage, Esenyurt'ta VideoObject var. **Bu, ilçe sayfası stratejisinin rakipler arasındaki en sağlıklı örneği.** Az sayıda sayfa, ama her biri ayrı yazılmış.
- **Güven:** 724 Google yorumu ve Trustindex rozeti en güçlü sosyal kanıt. Belge rozetinde "ISO 90001" yazım hatası var, ISO 27001 ilaçlamayla ilgisiz.
- **Form:** `/teklif-al/` sayfasında form alanları JS ile yükleniyor, ham HTML'de görünmüyor. Sayfada KVKK onay kutusu da görünmüyor.
- **Riskli dil:** Jel için "insana ve evcil hayvana hiçbir zararı yok", "sağlığınıza tamamen zararsız", "%99'a kadar etkili", "kalıcı çözüm".
- **Blog:** Blog sayfası var ama listelenen yazı yok, sadece menü.
- **Çıkarım:** Yerel SEO (yorum sayısı, özgün ilçe sayfası, şema) açısından en akıllı rakip. Tasarım eski, iddiaları riskli.

### 3.5 Fare Pire İlaçlama — farepireilaclama.com.tr

- **Hiyerarşi:** Header (ara/WhatsApp) → giriş (Üsküdar Kandilli merkez) → istatistik (28 dk servis, 24 saat, 39 ilçe, 7 gün) → 3 hizmet kartı → keşif odaklı yaklaşım → 6 hizmet bloğu → ev/ofis/apartman/açık alan → 3 adımlı süreç → neden biz + 3 kısa yorum → 39 ilçe linki → 7 SSS → footer. Hiyerarşi temiz ve okunur.
- **Hizmetler:** Mekân bazlı ayrım güçlü: ev, ofis, iş yeri, apartman, bina, bahçe, logar, otel, cafe. Ayrıca hamam böceği, karınca, pire, tahta kurusu.
- **Hizmet detayı (hamam böceği):** Yaklaşık 700 kelime. Hazırlık maddeleri (açık gıda, evcil hayvan eşyası) iyi. Biyoloji, tanıma, süre, fiyat ve güvenlik bilgisi yok. Alt metinler tekrarlı. Dosya adlarında rastgele sayı son ekleri ve yazım hatası var (`haman-bocegi`).
- **İlçe sayfaları:** `/{ilce}-bocek-ilaclama.html`, 39 adet. Üsküdar ve Şişli karşılaştırıldı: ilçe adı normalleştirilince uzun paragrafların 15'inden 14'ü aynı, dosya boyutu ve kelime sayısı birebir eşit. Meta description'lar şablon. **Tipik doorway sayfası.**
- **Teknik:** Hiçbir sayfada H1 yok. Ana sayfada meta description yok. Menüdeki SSS sayfası 404 veriyor.
- **Güven:** Ruhsat, belge, yıl ve isimli referans yok. Buna karşın KVKK, çerez, mesafeli satış ve açık rıza metinleri eksiksiz.
- **İyi fikir:** "WhatsApp'tan fotoğraf, video ve konum gönder" ile ön teşhis. Sektörde en kullanıcı dostu ön eleme fikri bu.
- **Çıkarım:** Temiz, hafif, mobil odaklı ama içi boş. Güven ve içerik açısından en kolay geçilecek rakip.

---

## 4. Sektör Hizmet Kapsamı (Konsolide Taksonomi)

Rakiplerin ortak hizmet evreni üç eksende toplanıyor: **haşere türü**, **mekân tipi** ve **yöntem**. Bizim bilgi mimarimiz bu üç ekseni ayrı tutmalı ve aralarında iç link kurmalı.

### 4.1 Haşere türüne göre (B2C arama hacminin çekirdeği)
| Grup | Alt hizmetler | Kaç rakip kapsıyor |
|---|---|---|
| Hamam böceği | Alman/Amerikan hamam böceği, jel uygulaması | 5/5 |
| Pire | Ev/halı, evcil hayvan kaynaklı, bahçe | 5/5 |
| Tahta kurusu | Yatak/mobilya, otel | 5/5 |
| Kemirgen (fare/sıçan) | Fare istasyonu, yem kutusu, giriş noktası kapatma | 4/5 |
| Karınca | Ev, bahçe | 3/5 |
| Akrep | Bahçe, müstakil ev | 2/5 |
| Gümüş böceği | Banyo/nemli alan | 2/5 |
| Sinek / sivrisinek | Açık alan, işletme | 1/5 |
| Kene, bit, uyuz (deri böceği) | Sağlıkla ilişkili, hassas | 1–2/5 |
| Arı / eşek arısı | Yuva tespiti | 1/5 |
| Yabani ot ilaçlama | Bahçe, site | 1/5 (Pak İş görselinde) |

### 4.2 Mekân tipine göre (B2B ve uzun kuyruk)
Ev/daire, apartman/site ortak alanları, villa/müstakil, ofis, işyeri/mağaza, restoran/kafe (HORECA), otel, gıda üretim tesisi, depo/ambar, fabrika, okul, AVM, hastane/sağlık, gemi/yat, liman/konteyner, bahçe/açık alan, logar/kanalizasyon.

### 4.3 Yönteme göre
Jel uygulama, kokusuz (pülverize/ULV), kokulu (bazıları bilinçli olarak "yapmıyoruz" diyor), sisleme, fumigasyon, kemirgen istasyonu, periyodik pest kontrol sözleşmesi, dezenfeksiyon.

### 4.4 Kurumsal/uyum hizmetleri (sadece Pak İş derinlemesine)
HACCP / BRCGS / IFS / FSSC 22000 uyumlu pest yönetimi, denetim raporu, trend analizi, danışmanlık.

**Öneri:** v1 için 8–10 haşere sayfası, 6–8 mekân sayfası, 1 periyodik/kurumsal pest kontrol sayfası ve 1 dezenfeksiyon sayfası yeterli. Kene, bit ve uyuz gibi sağlıkla ilişkili konular hekim yönlendirmesi gerektirir. Bunlarda tıbbi iddia içermeyen, dikkatli içerik yazılmalı ya da kapsam dışında bırakılmalı.

---

## 5. İlçe/Bölge Sayfası Stratejileri ve Riskleri

### 5.1 Gözlenen stratejiler
| Strateji | Kim | Sonuç/Risk |
|---|---|---|
| 39+ ilçe, tek şablon, sadece ilçe adı değişiyor | Pak İş (%96 aynı), Fare Pire (%93 aynı) | Google'ın doorway ve scaled content politikasına takılma riski yüksek. Bu sayfalar dizinden düşebilir ve sitenin genel kalite sinyalini aşağı çekebilir. |
| Ülke dışı/il dışı genişleme aynı şablonla | Pak İş (12 Kocaeli ilçesi) | Fiziksel ofis olmadan yerel sinyal zayıf. |
| İlçe sayfası yok, sadece 2 yaka sayfası | ilaclama.com.tr, istanbulilaclama.com | Güvenli ama "Kadıköy böcek ilaçlama" gibi yerel uzun kuyruk aramaları kaçırılıyor. |
| Az sayıda ama özgün ilçe sayfası + ilçe başına şema | Biosin (Kadıköy, Esenyurt, Ümraniye) | En sağlıklı model. Her sayfanın ayrı metni, FAQ/Video şeması var. |

### 5.2 Önerimiz: "Kanıt temelli yerel sayfa" modeli
1. **Aşamalı yayın:** İlk etapta en yüksek talep ve hizmet yoğunluğu olan 8–12 ilçe (örneğin Kadıköy, Üsküdar, Ataşehir, Ümraniye, Maltepe, Kartal, Pendik, Beşiktaş, Şişli, Bakırköy, Esenyurt, Beylikdüzü). 39 ilçenin tamamı yalnızca her biri için gerçek içerik olduğunda açılmalı.
2. **Her ilçe sayfasında özgün veri bulunmalı** (şablon yazı değil):
   - O ilçede yapılan gerçek iş örnekleri (anonim vaka: "Moda'da 3+1 daire, Alman hamam böceği, 2 uygulama"), gerçek saha fotoğrafı
   - Yapı stoku ve haşere ilişkisi (eski yapı/bodrum katı/sahil nemi gibi farklar; uydurma istatistik yok)
   - Ortalama ulaşım/randevu süresi (gerçek veriyle)
   - İlçeye özgü SSS (2–3 soru)
   - İlçe bazlı yorumlar (yalnızca gerçek olanlar)
3. **Kalite eşiği:** İki ilçe sayfası arasında ilçe adı normalleştirildikten sonra gövde metni ortaklığı %30'u geçmemeli. Bunu yayın öncesi otomatik kontrol olarak koymak gerekir. Yeterli veri yoksa sayfa `noindex` kalmalı ya da hiç açılmamalı.
4. **URL:** `/istanbul/{ilce}-ilaclama/`. İleride hizmet × ilçe kombinasyonu (örneğin `/istanbul/kadikoy/hamam-bocegi-ilaclama/`) yalnızca gerçek talep verisi ve özgün içerik varsa açılmalı. Toplu kombinasyon üretimi yapılmamalı.
5. **Hub sayfası:** `/hizmet-bolgeleri/` sayfasında Anadolu/Avrupa ayrımı, harita ve ilçe kartları olmalı.

---

## 6. Güven Sinyalleri

### 6.1 Rakiplerde gözlenen
| Sinyal | Durum | Değerlendirme |
|---|---|---|
| "Sağlık Bakanlığı onaylı/ruhsatlı" | 4/5 sitede metin olarak var | Hiçbiri ruhsat numarası, tarih veya sorumlu müdür bilgisi göstermiyor. Sadece ilaclama.com.tr PDF linki veriyor. |
| ISO / TSE rozetleri | 4/5 | Numarasız. Biosin'de yazım hatası ("90001"). ISO 27001 ilaçlamayla ilgisiz. |
| Sigorta | 2/5 | Poliçe kapsamı belirtilmemiş. |
| Referans logoları | 3/5 | Pak İş'te isimsiz numaralı görseller. ilaclama.com.tr'de büyük kurum logoları var, doğrulama yok. |
| Google yorumları | 1/5 (Biosin, 724) | En güçlü ve doğrulanabilir sinyal. |
| Sektör birliği | 1/5 (Pak İş, BİFUDER) | Değerli, az kullanılıyor. |
| Yıl/tecrübe | 3/5 | Tutarsız, güveni zedeliyor. |
| Ekip/teknisyen yüzü | 0/5 | **Hiçbirinde yok.** |
| Kullanılan ürünlerin adı/ruhsatı | 0/5 (1'i sadece marka adı) | **Hiçbirinde yok.** |
| Uygulama sonrası rapor/belge | Sadece SSS'de söz | Örnek rapor gösteren yok. |

### 6.2 Bizim güven katmanımız (önerilen)
1. **Belgeler sayfası:** Sağlık Bakanlığı / İl Sağlık Müdürlüğü biyosidal ürün uygulama izin belgesi, numara ve geçerlilik tarihiyle birlikte. Görsel + PDF + "nasıl doğrularsınız" açıklaması.
2. **Mesul müdür ve ekip:** İsim, unvan, yetkinlik belgesi, fotoğraf. Teknisyen profilleri hem E-E-A-T hem de "eve kim gelecek" kaygısına cevap verir.
3. **Kullanılan ürünler tablosu:** Ruhsatlı biyosidal ürünlerin ticari adı, etken madde grubu, uygulama alanı ve güvenlik bilgi formu (SDS) linki. "Zararsız" demek yerine "doğru dozda, etikete uygun, ruhsatlı" demek.
4. **Örnek hizmet raporu:** Anonimleştirilmiş PDF; uygulama tarihi, ürün, doz, alan, tavsiyeler.
5. **Gerçek Google yorumları:** Widget'la göster. Schema'da self-serving `AggregateRating` kullanma.
6. **Sigorta:** Varsa sigorta şirketi ve kapsam türü, kısa ve net.
7. **Garanti:** Mutlak vaat yerine yazılı ve şartlı "kontrol ziyareti politikası" (örnek: "X gün içinde aynı haşere için ücretsiz kontrol ziyareti; tahta kurusu ve pirede protokol farklı"). Şartlar açık yazılmalı.
8. **Fiziksel adres + harita + çalışma saatleri:** NAP tutarlılığı ve Google İşletme Profili ile birebir aynı bilgi.

---

## 7. Form Analizi

| Site | Form tipi | Alanlar | KVKK onayı | Not |
|---|---|---|---|---|
| Pak İş | Yok | — | — | Tel, WhatsApp, e-posta |
| İstanbul İlaçlama | Geri arama + iletişim formu | Ad, telefon (zorunlu), e-posta, mesaj | **Yok** | "15 dk'da ararız" |
| ilaclama.com.tr | "Beni arayın" kutusu + yorum formu | Geri arama: telefon. Yorum: yıldız, yorum, e-posta | Yorum formunda zorunlu onay var | İletişim sayfasında teklif formu yok |
| Biosin | Teklif sayfası | JS ile yükleniyor (ham HTML'de görünmüyor) | Görünmüyor | KVKK ve çerez linkleri var |
| Fare Pire | Yok | — | — | WhatsApp'tan foto/video/konum isteniyor |

**Sonuç:** Yapılandırılmış, aşamalı bir teklif formu sunan rakip yok. Ön teşhis için fotoğraf yükleme özelliği hiçbir formda yok (sadece WhatsApp üzerinden). KVKK uyumu ya eksik ya da sadece link düzeyinde.

### Önerilen teklif akışı (CRO kuralı: ilk adımda en fazla 3 alan)
- **Adım 1 (3 alan):** Haşere türü (ikonlu seçim + "emin değilim"), mekân tipi (ev/apartman/işyeri/restoran…), ilçe.
- **Adım 2:** Ad, telefon, tercih edilen iletişim kanalı (arama/WhatsApp), uygun zaman aralığı.
- **Adım 3 (opsiyonel):** Fotoğraf/video yükleme (ön teşhis), m² veya oda sayısı, not.
- **Uyum:** Ayrı ve işaretsiz KVKK aydınlatma onayı, pazarlama izni için ayrı onay kutusu (ETK/İYS). Telefon formatı doğrulaması ve hata mesajları.
- **Gönderim sonrası:** "Ne olacak?" zaman çizelgesi, örnek hazırlık listesi PDF'i, WhatsApp ile devam seçeneği.
- **Alternatif kanallar:** Sabit "Ara" ve "WhatsApp" butonları mobilde her zaman görünür. Her kanal ayrı analytics event'i üretir.

---

## 8. Rakiplerin Eksikleri = Bizim Fırsatlarımız

| # | Rakip boşluğu | İST İlaçlama fırsatı |
|---|---|---|
| 1 | Hiçbir sitede premium/modern tasarım yok; slider, stok görsel ve SVG yer tutucu baskın | Linear/Stripe kalitesinde, sade, hızlı, gerçek saha fotoğraflı bir marka deneyimi. Sektörde anında fark edilir. |
| 2 | Ruhsat numarası, mesul müdür ve ürün listesi gösteren yok | "Şeffaflık" sayfası ve her hizmet sayfasında belge/ürün kutusu |
| 3 | Rakamlar çelişkili (süre, eve dönüş, yıl, müşteri sayısı) | Tek kaynaklı içerik: süre ve güvenlik değerleri CMS'te tek yerde tanımlanır, her sayfa oradan okur. |
| 4 | Mutlak "zararsız/garantili" dili | Bilimsel ve dürüst dil: "ruhsatlı ürün, etikete uygun doz, şu süre boyunca şu önlemler" |
| 5 | Teklif formu yok veya ilkel | Haşere/mekân/ilçe seçimli, foto yüklemeli 3 adımlı teklif sihirbazı |
| 6 | Fiyat ya hiç yok ya da çelişkili tablo | Şeffaf "fiyatı ne belirler?" sayfası + daire tipine göre başlangıç aralıkları + interaktif tahmin aracı (kesin fiyat keşif sonrası) |
| 7 | Hazırlık ve sonrası talimatları dağınık | Her hizmet için indirilebilir/yazdırılabilir "Uygulama öncesi/sonrası kontrol listesi". Çocuk, hamile, evcil hayvan, akvaryum ve bitki için ayrı kutular. |
| 8 | Haşere tanıma içeriği zayıf | "Bu hangi böcek?" tanıma rehberi (fotoğraflı) ve opsiyonel AI foto ön teşhisi (AI çıktısı açıkça etiketli, nihai teşhis teknisyende) |
| 9 | İlçe sayfaları kopya veya hiç yok | Kanıt temelli, aşamalı yerel sayfalar (bkz. Bölüm 5) |
| 10 | Blog'larda yazar, tarih ve kaynak yok | E-E-A-T: yazar (mesul müdür/uzman), inceleme tarihi, kaynak (DSÖ, Sağlık Bakanlığı biyosidal mevzuatı, üniversite entomoloji kaynakları) |
| 11 | B2C ile B2B karışık ya da biri tamamen yok | İki net yol: "Evim için" ve "İşletmem için". B2B tarafında periyodik sözleşme, HACCP/BRCGS denetim desteği ve dijital rapor portalı. |
| 12 | Teknik SEO hataları (H1 yok, çift URL, kırık link, 404 SSS, HTML sızan meta) | Temiz bilgi mimarisi, tek canonical, otomatik link kontrolü |
| 13 | Schema sığ veya self-serving | LocalBusiness (uygun alt tip) + Service + FAQPage (yalnızca görünür SSS) + HowTo (hazırlık adımları) + BreadcrumbList + Person (yazar) |
| 14 | GEO: AI asistanların alıntılayacağı kısa, net, kaynaklı cevap blokları yok | Her sayfanın başında 2–3 cümlelik "kısa cevap" kutusu, tablolar, tutarlı entity bilgisi |
| 15 | Erişilebilirlik ve performans düşük (ağır slider, WP eklentileri) | Statik/ISR sayfalar, Core Web Vitals yeşil, WCAG AA |
| 16 | Randevu ve takip deneyimi yok | Online randevu, SMS/WhatsApp hatırlatma, kontrol ziyareti planlayıcı |
| 17 | Mevsimsellik yalnızca görsel olarak geçiyor (Biosin) | Mevsimsel haşere takvimi ("İstanbul'da hangi ay hangi haşere?"). Hem içerik hem kampanya hem GEO için değerli. |

---

## 9. Kaçınılacak İddialar

Aşağıdaki ifadeler rakiplerde görüldü (kelimesi kelimesine değil, tip olarak). İST İlaçlama sitesinde **kullanılmamalı**:

| Kaçınılacak ifade tipi | Neden riskli | Yerine |
|---|---|---|
| "%100 zararsız", "insana/evcil hayvana hiçbir zararı yok", "tamamen zararsız" | Biyosidal ürünler tanımı gereği risk taşır. Yanıltıcı reklam riski (Reklam Kurulu, Ticaret Bakanlığı) ve sağlık riski var. | "Sağlık Bakanlığı ruhsatlı ürünler, etiket talimatına uygun dozda uygulanır. Uygulama sonrası X saat havalandırma önerilir." |
| "%100 garanti", "kesin çözüm", "kalıcı çözüm", "tek bir haşere bile görmeyeceksiniz" | Yumurta evresi ve dış kaynaklı yeniden bulaşma nedeniyle teknik olarak doğru değil. Rakipler de kendi metinlerinde bununla çelişiyor. | "Yazılı kontrol ziyareti politikası" + "Bazı haşerelerde 2–3 uygulama gerekebilir" |
| "%99 etkili", "%95 başarı", "4 kat daha etkili", "%78 evde görülür" | Kaynağı gösterilmeyen istatistik | Yalnızca kaynaklı veri ya da kendi ölçülmüş, metodolojisi açıklanmış verimiz |
| "Türkiye'nin 1 numarası", "İstanbul'un en iyisi/en eskisi", "bizden iyisi yok" | Kanıtlanamayan üstünlük iddiası (karşılaştırmalı reklam kuralları) | Somut ve doğrulanabilir farklılık: "ruhsat no …", "X yorumda 4,8 puan (Google)" |
| "28 dakikada kapınızdayız", "15 dakikada ararız" (koşulsuz) | İstanbul trafiğinde garanti edilemez | "Mesai saatlerinde ortalama dönüş süremiz: X dk (son 3 ay)" gibi ölçülmüş ve koşullu ifade |
| COVID-19'a karşı koruma vaadi | Sağlık beyanı, mevzuat riski | Dezenfeksiyonu ruhsatlı ürün ve kapsam bilgisiyle anlat, hastalık önleme vaadi verme. |
| İlgisiz belgeleri güven rozeti gibi sunmak (ISO 27001 vb.) | Yanıltıcı izlenim | Sadece hizmetle ilgili ve geçerli belgeler |
| Self-serving `AggregateRating` şeması, sahte/isimsiz yorum | Google yapılandırılmış veri politikası ihlali, tüketici yanıltma | Gerçek Google yorumlarını widget ile göstermek |
| Tutarsız yıl/müşteri sayısı | Güven kaybı | Tek kaynaklı, doğrulanabilir kuruluş bilgisi |
| Uyuz/bit gibi konularda tedavi tavsiyesi | Tıbbi tavsiye kapsamı | "Sağlık şikâyetinde hekime başvurun" yönlendirmesi |

---

## 10. Önerilen Site Haritası ve İç Link Stratejisi

### 10.1 Site haritası (v1)
```
/                                  Ana sayfa
/hizmetler/                        Hizmet hub'ı
  /hizmetler/hamam-bocegi-ilaclama/
  /hizmetler/pire-ilaclama/
  /hizmetler/tahta-kurusu-ilaclama/
  /hizmetler/fare-ilaclama/        (kemirgen kontrolü)
  /hizmetler/karinca-ilaclama/
  /hizmetler/akrep-ilaclama/
  /hizmetler/gumus-bocegi-ilaclama/
  /hizmetler/sinek-sivrisinek-ilaclama/
  /hizmetler/dezenfeksiyon/
  /hizmetler/periyodik-pest-kontrol/   (B2B sözleşme)
/mekanlar/                         Mekân hub'ı
  /mekanlar/ev-ilaclama/
  /mekanlar/apartman-site-ilaclama/
  /mekanlar/isyeri-ofis-ilaclama/
  /mekanlar/restoran-kafe-ilaclama/
  /mekanlar/otel-ilaclama/
  /mekanlar/gida-uretim-depo-ilaclama/  (HACCP/BRCGS)
  /mekanlar/bahce-acik-alan-ilaclama/
/istanbul/                         Hizmet bölgeleri hub'ı (harita, iki yaka)
  /istanbul/anadolu-yakasi/
  /istanbul/avrupa-yakasi/
  /istanbul/{ilce}-ilaclama/       (aşamalı, kanıt temelli; bkz. Bölüm 5)
/fiyatlar/                         Fiyatı ne belirler + başlangıç aralıkları + tahmin aracı
/teklif-al/                        3 adımlı teklif sihirbazı
/nasil-calisiyoruz/                Süreç: keşif → teşhis → uygulama → rapor → kontrol
/guvenlik-ve-hazirlik/             Uygulama öncesi/sonrası rehber (çocuk, evcil hayvan, hamile)
/belgeler/                         Ruhsat, izin, sigorta, kullanılan ürünler (SDS)
/hakkimizda/                       Hikâye, mesul müdür, ekip
  /ekip/{isim}/                    Yazar/uzman profilleri (E-E-A-T)
/referanslar/                      Vaka çalışmaları (B2C anonim, B2B izinli)
/hasere-rehberi/                   Haşere tanıma kütüphanesi
  /hasere-rehberi/{tur}/           Tanıma, biyoloji, belirtiler, önleme
/blog/                             Mevsimsel takvim, kılavuzlar, mevzuat
/sss/                              Merkezi SSS (kategori filtreli)
/iletisim/
/kvkk/ /cerez-politikasi/ /gizlilik/ /kontrol-ziyareti-politikasi/
```

### 10.2 İç link stratejisi (hub & spoke, 3 eksenli)
1. **Haşere sayfası ↔ rehber:** `/hizmetler/pire-ilaclama/` (ticari niyet) ile `/hasere-rehberi/pire/` (bilgi niyeti) karşılıklı bağlanır. Rehber "nasıl tanırım", hizmet "nasıl çözeriz" sorusunu cevaplar. Böylece kanibalizasyon önlenir.
2. **Haşere × mekân:** Her haşere sayfasında "En sık görüldüğü mekânlar" kutusu ilgili mekân sayfalarına bağlanır. Mekân sayfasında da "Bu mekânda sık görülen haşereler" kutusu haşere sayfalarına bağlanır.
3. **İlçe sayfaları:** Her ilçe sayfası en çok talep gelen 3–4 hizmete ve komşu 2–3 ilçeye bağlanır. Hub sayfası tüm ilçeleri listeler. Hizmet sayfalarından ilçelere yoğun footer linki verilmez; bağlamlı "Hizmet verdiğimiz bölgeler" bloğu yeterli.
4. **Güven sayfalarına derin link:** Her hizmet sayfasında `/belgeler/` (ilgili ürün/izin), `/guvenlik-ve-hazirlik/` (ilgili bölüm çapası) ve `/fiyatlar/` linkleri bulunur.
5. **Blog → para sayfası:** Her blog yazısı en az 1 hizmet, 1 rehber ve 1 teklif CTA'sına bağlanır. Mevsimsel takvim sayfası ilgili ayın haşere sayfalarına bağlanır.
6. **Breadcrumb her sayfada** (BreadcrumbList şeması ile).
7. **Anchor çeşitliliği:** Aynı hedefe hep aynı tam eşleşen anchor verilmez. Doğal ve açıklayıcı anchor kullanılır.
8. **Yetim sayfa kontrolü:** Build sırasında her indekslenebilir sayfanın en az 3 iç link aldığı doğrulanır.

### 10.3 Ana sayfa önerilen hiyerarşi
1. Hero: net değer önerisi (5 saniye kuralı) + "Teklif al" + "Hemen ara/WhatsApp" + 3 güven mikrosinyali (ruhsat no, Google puanı, mesul müdür)
2. "Sorununuz ne?" haşere seçici (ikonlu) → ilgili hizmet sayfasına ya da teklif sihirbazına önceden seçili olarak yönlendirir
3. Ev / İşletme ayrımı (iki kart)
4. Süreç (5 adım, gerçek fotoğraf)
5. Şeffaflık bloğu: kullanılan ürünler, belgeler, örnek rapor
6. Gerçek yorumlar + vaka çalışmaları
7. Fiyatı ne belirler? (kısa) → /fiyatlar/
8. Hizmet bölgeleri haritası
9. Mevsimsel uyarı bandı (dinamik: "Ekim: kemirgen sezonu başlıyor")
10. SSS (6–8 soru, FAQPage şeması)
11. Son CTA + footer (NAP, çalışma saatleri, yasal linkler)

---

## 11. Kaynaklar (Çekilen URL'ler)

Tüm sayfalar 2026-10-27 tarihinde başarıyla çekildi. Yalnızca farepireilaclama.com.tr/sss.html **404** döndü.

**Pak İş**
- https://pakisilaclama.com/
- https://pakisilaclama.com/fumigasyon-hizmetleri
- https://pakisilaclama.com/hizmet-bolgeleri
- https://pakisilaclama.com/sariyer-bocek-ilaclama
- https://pakisilaclama.com/kartal-bocek-ilaclama
- https://pakisilaclama.com/blog

**İstanbul İlaçlama**
- https://www.istanbulilaclama.com/
- https://www.istanbulilaclama.com/ilaclama-iletisim/
- https://www.istanbulilaclama.com/istanbul-anadolu-yakasi-ilaclama/
- https://www.istanbulilaclama.com/bilgi-merkezi

**ilaclama.com.tr**
- https://www.ilaclama.com.tr/
- https://www.ilaclama.com.tr/pire-ilaclama/
- https://www.ilaclama.com.tr/iletisim/
- https://www.ilaclama.com.tr/hizmet-bolgelerimiz/
- https://www.ilaclama.com.tr/blog/ (Haşerehane'ye yönleniyor)

**Biosin**
- https://biosin.com.tr/
- https://biosin.com.tr/bocek-ilaclama/
- https://biosin.com.tr/teklif-al/
- https://biosin.com.tr/kadikoy-bocek-ilaclama/
- https://biosin.com.tr/esenyurt-bocek-ilaclama/
- https://biosin.com.tr/blog/

**Fare Pire İlaçlama**
- https://www.farepireilaclama.com.tr/
- https://www.farepireilaclama.com.tr/hamam-bocegi-ilaclama.html
- https://www.farepireilaclama.com.tr/uskudar-bocek-ilaclama.html
- https://www.farepireilaclama.com.tr/sisli-bocek-ilaclama.html
- https://www.farepireilaclama.com.tr/sss.html (404)

**Yöntem notları ve sınırlar**
- Title, meta, canonical, H1 ve JSON-LD tipleri ham HTML'den (curl) çıkarıldı. Görünür içerik, form ve iddialar WebFetch ile okundu.
- JS ile yüklenen formların (Biosin teklif formu, bazı "beni arayın" kutuları) alanları ham HTML'de görünmedi. Bunlar tarayıcıda ayrıca doğrulanmalı.
- İlçe sayfası benzerlik oranları, 120 karakterden uzun metin satırları ilçe adı normalleştirilerek karşılaştırılıp hesaplandı. Kesin değil, yön göstericidir.
- Lighthouse/Core Web Vitals ölçümü bu çalışmanın kapsamında değildi. Performans karşılaştırması için ayrı bir ölçüm önerilir.
- Rakiplerin belge ve ruhsat iddiaları resmi kaynaklardan doğrulanmadı.
