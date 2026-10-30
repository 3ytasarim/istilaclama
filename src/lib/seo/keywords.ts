/**
 * Anahtar kelime haritasından türetilen sayfa başlıkları ve açıklamaları (bkz. docs/SEO_KEYWORD_MAP.md).
 * Kurallar: başlık ≤ ~60 karakter (marka sığarsa eklenir), açıklama ~140–160 karakter, Türkçe, fayda odaklı;
 * "7/24", "ücretsiz", "%100", "garanti", fiyat ve yıl gibi doğrulanmamış iddialar yok.
 */

export interface PageSeo {
  /** Birincil anahtar kelime (dokümantasyon / denetim için) */
  primary: string;
  /** Marka hariç başlık */
  title: string;
  description: string;
}

export const PAGE_SEO = {
  home: {
    primary: "istanbul böcek ilaçlama",
    title: "İstanbul Böcek İlaçlama ve Haşere Kontrolü",
    description:
      "İstanbul'da ev, apartman, site ve işletmeler için türe göre planlanan böcek ilaçlama ve haşere kontrolü. Yerinde inceleme, yazılı plan ve takip ziyareti.",
  },
  services: {
    primary: "ilaçlama hizmetleri",
    title: "İlaçlama Hizmetleri: Haşere, Ev ve İşletme",
    description:
      "Hamam böceği, fare, tahta kurusu ve pireden ev, apartman, restoran ve otele kadar 25 ilaçlama hizmeti. Zararlıya ve alana göre planlanan haşere kontrolü.",
  },
  regions: {
    primary: "istanbul ilaçlama bölgeleri",
    title: "İstanbul İlaçlama Hizmet Bölgeleri",
    description:
      "İstanbul'un Anadolu ve Avrupa yakasındaki 39 ilçe ve mahalleleri için bölge sayfaları. İlçenizi seçin, yapı stokuna göre haşere kontrolü hakkında bilgi alın.",
  },
  blog: {
    primary: "haşere rehberi",
    title: "Haşere Bilgi Merkezi ve İlaçlama Rehberleri",
    description:
      "Hamam böceği, tahta kurusu, fare, pire ve sivrisinek için kaynaklı rehberler: belirtiler, önleyici tedbirler ve hizmet seçerken dikkat edilecekler.",
  },
  faq: {
    primary: "ilaçlama sık sorulan sorular",
    title: "İlaçlama Hakkında Sık Sorulan Sorular",
    description:
      "İlaçlamadan önce hazırlık, uygulama sonrası eve dönüş, takip ziyareti, işletmeler için periyodik program ve istenmesi gereken belgeler hakkında net cevaplar.",
  },
  about: {
    primary: "ilaçlama firması",
    title: "Hakkımızda: Haşere Kontrolü Yaklaşımımız",
    description:
      "İST İlaçlama'nın çalışma yaklaşımı: önce yerinde inceleme, yazılı uygulama planı, etiket talimatlarına uygun uygulama, takip ziyareti ve belge şeffaflığı.",
  },
  contact: {
    primary: "ilaçlama firması iletişim",
    title: "İletişim ve Teklif Talebi",
    description:
      "İST İlaçlama'ya ulaşın: teklif formunu doldurun ya da doğrulanmış iletişim kanallarından yazın. Talebinizde paylaşmanız gereken bilgileri burada bulun.",
  },
  quote: {
    primary: "ilaçlama teklifi",
    title: "İlaçlama Teklifi Alın: Online Talep Formu",
    description:
      "Haşere türünü, alanın tipini ve ilçenizi paylaşın; ihtiyacınıza göre hazırlanan uygulama planı ve teklif için size dönüş yapalım. Form birkaç dakika sürer.",
  },
  kvkk: {
    primary: "kvkk aydınlatma metni",
    title: "KVKK Aydınlatma Metni",
    description: "İST İlaçlama web sitesi ve teklif formu üzerinden paylaşılan kişisel verilerin işlenmesine ilişkin KVKK kapsamındaki aydınlatma metni.",
  },
  privacy: {
    primary: "gizlilik politikası",
    title: "Gizlilik Politikası",
    description: "İST İlaçlama web sitesinde toplanan bilgilerin hangi amaçla kullanıldığı, nasıl korunduğu ve haklarınızı nasıl kullanabileceğiniz hakkında bilgi.",
  },
  cookies: {
    primary: "çerez politikası",
    title: "Çerez Politikası",
    description: "İST İlaçlama web sitesinde kullanılan çerez türleri, kullanım amaçları ve tarayıcınızdan çerez tercihlerinizi nasıl yönetebileceğiniz hakkında bilgi.",
  },
} satisfies Record<string, PageSeo>;

/** Hizmet detay sayfaları (slug → başlık/açıklama). Eksik slug için sayfa kendi verisinden üretir. */
export const SERVICE_SEO: Record<string, PageSeo> = {
  "bocek-ilaclama": {
    primary: "böcek ilaçlama",
    title: "Böcek İlaçlama İstanbul: Türe Göre Plan",
    description:
      "İstanbul'da böcek ilaçlama: önce türü ve kaynağı tespit eder, ev ve iş yerinize uygun yöntemi planlarız. Hazırlık listesi, uygulama ve takip ziyareti.",
  },
  "hasere-kontrolu": {
    primary: "haşere kontrolü",
    title: "Haşere Kontrolü İstanbul: İzleme ve Önleme",
    description:
      "Tek seferlik ilaçlama yerine izleme, önleme ve hedefli uygulamayı birleştiren haşere kontrolü. Ev, apartman ve işletmeler için planlı program.",
  },
  "hamam-bocegi-ilaclama": {
    primary: "hamam böceği ilaçlama",
    title: "Hamam Böceği İlaçlama İstanbul",
    description:
      "Hamam böceği ilaçlama: mutfak, banyo ve tesisat boşluklarında tür ve saklanma noktası tespiti, hedefli uygulama ve gerekirse takip ziyareti. Teklif alın.",
  },
  "fare-ve-kemirgen-kontrolu": {
    primary: "fare ilaçlama",
    title: "Fare İlaçlama ve Kemirgen Kontrolü",
    description:
      "Fare ve sıçan sorununda giriş noktalarını tespit eder, izleme istasyonları ve yapısal önerilerle kemirgen kontrolünü planlarız. Ev, bina ve işletmeler için.",
  },
  "pire-ilaclama": {
    primary: "pire ilaçlama",
    title: "Pire İlaçlama İstanbul: Ev ve Bahçe",
    description:
      "Pire ilaçlama: evcil hayvan bakımıyla eşgüdümlü, yaşam döngüsünü dikkate alan uygulama. Halı, tekstil ve bahçe için hazırlık listesi ve takip planı.",
  },
  "tahta-kurusu-ilaclama": {
    primary: "tahta kurusu ilaçlama",
    title: "Tahta Kurusu İlaçlama İstanbul",
    description:
      "Tahta kurusu ilaçlama: yatak, mobilya ve dikiş yerlerinde detaylı inceleme, türe uygun yöntem ve takip ziyaretli uygulama planı. Belirtileri ve hazırlığı öğrenin.",
  },
  "karinca-ilaclama": {
    primary: "karınca ilaçlama",
    title: "Karınca İlaçlama: Koloniye Yönelik Çözüm",
    description:
      "Karınca ilaçlama: karınca yollarını ve yuva bölgelerini izleyerek koloniye yönelik kontrol. Mutfak, balkon ve bahçe için önleyici öneriler ve uygulama planı.",
  },
  "sivrisinek-kontrolu": {
    primary: "sivrisinek ilaçlama",
    title: "Sivrisinek İlaçlama ve Kontrolü İstanbul",
    description:
      "Sivrisinek kontrolü: durgun su kaynaklarının azaltılması ve mevsime uygun alan uygulamalarıyla bahçe, site ve açık alanlarda sivrisinek yoğunluğunu azaltın.",
  },
  "kene-kontrolu": {
    primary: "kene ilaçlama",
    title: "Kene İlaçlama: Bahçe ve Açık Alan Kontrolü",
    description:
      "Kene kontrolü: bahçe, çim ve açık alanlarda kene riskini azaltmaya yönelik alan uygulamaları ve bitki örtüsü önerileri. Evcil hayvanlı evler için planlama.",
  },
  "gumus-bocegi-kontrolu": {
    primary: "gümüş böceği ilaçlama",
    title: "Gümüş Böceği İlaçlama ve Nem Kontrolü",
    description:
      "Gümüş böceği kontrolü: banyo, bodrum ve nemli alanlarda kaynak tespiti, nem yönetimi önerileri ve hedefli uygulama. Tekrarı azaltmak için kalıcı önlemler.",
  },
  "guve-kontrolu": {
    primary: "güve ilaçlama",
    title: "Güve İlaçlama: Tekstil ve Gıda Güvesi",
    description:
      "Güve kontrolü: dolap ve tekstil güveleri ile kiler (gıda) güvelerinde kaynak tespiti, hedefli uygulama ve önleyici depolama önerileri. Ev ve işletmeler için.",
  },
  "akrep-kontrolu": {
    primary: "akrep ilaçlama",
    title: "Akrep İlaçlama ve Kontrolü İstanbul",
    description:
      "Akrep kontrolü: bahçeli ve müstakil yapılarda saklanma alanlarını azaltan düzenleme önerileri ve hedefli uygulama. Riskli noktalar ve önleme adımları.",
  },
  "ev-ilaclama": {
    primary: "ev ilaçlama",
    title: "Ev İlaçlama İstanbul: Hazırlık ve Takip",
    description:
      "Ev ilaçlama: ev halkının düzenine göre planlanan uygulama, öncesinde hazırlık listesi, sonrasında havalandırma ve takip bilgisi. Zararlıya uygun yöntem seçimi.",
  },
  "apartman-ve-bina-ilaclama": {
    primary: "apartman ilaçlama",
    title: "Apartman ve Bina İlaçlama İstanbul",
    description:
      "Apartman ilaçlama: daireler, ortak alanlar, şaftlar ve bodrum birlikte ele alınır. Yönetimle koordineli takvim ve sakinlere bilgilendirme ile bina ölçeğinde plan.",
  },
  "site-ilaclama": {
    primary: "site ilaçlama",
    title: "Site İlaçlama: Yönetimle Takvimli Program",
    description:
      "Site ilaçlama: çok bloklu sitelerde yönetimle koordineli, takvimli ve raporlanabilir haşere kontrolü. Ortak alan, otopark, peyzaj ve çöp alanları dahil.",
  },
  "ofis-ilaclama": {
    primary: "ofis ilaçlama",
    title: "Ofis İlaçlama İstanbul: Mesaiye Uygun Plan",
    description:
      "Ofis ilaçlama: çalışma düzenini aksatmayan saatlerde planlanan uygulama, mutfak ve arşiv alanlarına odaklı kontrol, çalışanlar için kısa bilgilendirme.",
  },
  "isyeri-ilaclama": {
    primary: "işyeri ilaçlama",
    title: "İşyeri İlaçlama: Mağaza ve Atölye",
    description:
      "İşyeri ilaçlama: mağaza, atölye ve ticari alanlarda müşteri trafiği gözetilerek planlanan haşere kontrolü. Uygulama kaydı ve tekrarını önleme önerileri.",
  },
  "bahce-ve-acik-alan-kontrolu": {
    primary: "bahçe ilaçlama",
    title: "Bahçe İlaçlama ve Açık Alan Kontrolü",
    description:
      "Bahçe ilaçlama: bahçe, teras ve peyzaj alanlarında sivrisinek, kene ve karıncaya yönelik kontrol. Su birikintisi ve bitki örtüsü için önleyici öneriler.",
  },
  "bodrum-ve-ortak-alan-kontrolu": {
    primary: "bodrum ilaçlama",
    title: "Bodrum ve Ortak Alan İlaçlama",
    description:
      "Bodrum ve ortak alan ilaçlama: kazan dairesi, çöp odası, şaft ve otoparklarda kaynak odaklı kontrol. Apartman yönetimleri için düzenli izleme önerisi.",
  },
  "restoran-ve-kafe-pest-kontrol": {
    primary: "restoran ilaçlama",
    title: "Restoran ve Kafe Pest Kontrol İstanbul",
    description:
      "Restoran ve kafe pest kontrol: mutfak, depo ve servis alanları için kayıtlı periyodik program. Gıda güvenliği denetimlerine uygun dokümantasyon ve takip.",
  },
  "otel-ilaclama": {
    primary: "otel ilaçlama",
    title: "Otel İlaçlama ve Pest Kontrol İstanbul",
    description:
      "Otel ilaçlama: misafir deneyimini koruyan, oda, çamaşırhane ve mutfak bölümlerine göre ayrılmış pest kontrol programı. Tahta kurusu şüphesinde izlenecek adımlar.",
  },
  "depo-ilaclama": {
    primary: "depo ilaçlama",
    title: "Depo İlaçlama: Kemirgen ve Depo Zararlısı",
    description:
      "Depo ilaçlama: stok ve sevkiyat düzenine uygun, kemirgen ve depo zararlısı odaklı kontrol. İzleme istasyonları, kayıt ve risk noktası raporlaması.",
  },
  "fabrika-ve-endustriyel-alan-kontrolu": {
    primary: "fabrika ilaçlama",
    title: "Fabrika İlaçlama ve Endüstriyel Pest Kontrol",
    description:
      "Fabrika ilaçlama: üretim hattı, hammadde ve sevkiyat alanları için risk haritalı pest kontrol programı. İzleme, kayıt ve denetime hazır raporlama.",
  },
  "periyodik-pest-management": {
    primary: "periyodik ilaçlama",
    title: "Periyodik Pest Kontrol Programı İstanbul",
    description:
      "Periyodik pest kontrol: belirli aralıklarla izleme, gerektiğinde uygulama ve raporlamayı kapsayan sözleşmeli program. İşletmeler ve siteler için planlı takvim.",
  },
  "entegre-zararli-yonetimi": {
    primary: "entegre zararlı yönetimi",
    title: "Entegre Zararlı Yönetimi (IPM) İşletmeler",
    description:
      "Entegre zararlı yönetimi (IPM): önleme, izleme ve gerektiğinde müdahaleyi birleştiren işletme programı. Kayıt, trend takibi ve sürekli iyileştirme.",
  },
};
