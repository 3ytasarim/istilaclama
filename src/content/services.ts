import type { ServiceGroup, ServiceSummary } from "@/types/content";

/**
 * Tohum veri — Sprint 2'de `db:seed` ile services tablosuna aktarılır.
 * Tüm metinler özgün taslaktır; yayın öncesi yetkili uzman onayı gerekir.
 */
export const serviceGroups: ServiceGroup[] = [
  {
    key: "hasere",
    title: "Haşere Türüne Göre",
    description: "Zararlının türüne ve yayılım biçimine göre planlanan kontrol uygulamaları.",
  },
  {
    key: "yasam-alani",
    title: "Yaşam Alanına Göre",
    description: "Ev, apartman, site ve ofislerde alanın kullanımına uygun çözümler.",
  },
  {
    key: "kurumsal",
    title: "Kurumsal Hizmetler",
    description: "Gıda, konaklama ve üretim işletmeleri için periyodik zararlı yönetimi.",
  },
];

const s = (
  order: number,
  slug: string,
  title: string,
  shortTitle: string,
  group: ServiceSummary["group"],
  icon: ServiceSummary["icon"],
  excerpt: string,
  featured = false,
): ServiceSummary => ({
  order,
  slug,
  title,
  shortTitle,
  group,
  icon,
  excerpt,
  featured,
  status: "draft",
  imageKey: `service-${slug}`,
});

export const services: ServiceSummary[] = [
  // Haşere türüne göre
  s(1, "bocek-ilaclama", "Böcek İlaçlama", "Böcek İlaçlama", "hasere", "bug",
    "Yaşam alanında görülen böcek türünün tespitiyle başlayan, kaynağa yönelik planlı uygulama.", true),
  s(2, "hasere-kontrolu", "Haşere Kontrolü", "Haşere Kontrolü", "hasere", "shield",
    "Tek seferlik müdahale yerine izleme, önleme ve uygulamayı birleştiren kontrol yaklaşımı.", true),
  s(3, "hamam-bocegi-ilaclama", "Hamam Böceği İlaçlama", "Hamam Böceği", "hasere", "bug",
    "Mutfak, banyo ve tesisat boşluklarında saklanan hamam böceklerine yönelik hedefli uygulama.", true),
  s(4, "fare-ve-kemirgen-kontrolu", "Fare ve Kemirgen Kontrolü", "Fare ve Kemirgen", "hasere", "rat",
    "Giriş noktalarının tespiti, izleme istasyonları ve yapısal önerilerle kemirgen kontrolü.", true),
  s(5, "pire-ilaclama", "Pire İlaçlama", "Pire", "hasere", "flea",
    "Evcil hayvan bakımıyla eşgüdümlü, yaşam döngüsünü dikkate alan pire kontrolü.", true),
  s(6, "tahta-kurusu-ilaclama", "Tahta Kurusu İlaçlama", "Tahta Kurusu", "hasere", "bed",
    "Yatak, mobilya ve dikiş yerlerinde detaylı inceleme ve takip ziyaretli uygulama planı.", true),
  s(7, "karinca-ilaclama", "Karınca İlaçlama", "Karınca", "hasere", "ant",
    "Karınca yollarının ve yuva bölgelerinin izlenmesiyle koloniye yönelik kontrol.", false),
  s(8, "sivrisinek-kontrolu", "Sivrisinek Kontrolü", "Sivrisinek", "hasere", "mosquito",
    "Durgun su kaynaklarının azaltılmasıyla desteklenen, mevsimsel sivrisinek kontrolü.", false),
  s(9, "kene-kontrolu", "Kene Kontrolü", "Kene", "hasere", "tick",
    "Bahçe, çim ve açık alanlarda kene riskini azaltmaya yönelik alan uygulamaları.", false),
  s(10, "gumus-bocegi-kontrolu", "Gümüş Böceği Kontrolü", "Gümüş Böceği", "hasere", "silverfish",
    "Nemli alanlarda görülen gümüş böceklerine karşı nem yönetimiyle birlikte uygulama.", false),
  s(11, "guve-kontrolu", "Güve Kontrolü", "Güve", "hasere", "moth",
    "Tekstil ve kuru gıda güvelerinde kaynak tespiti ve önleyici depolama önerileri.", false),
  s(12, "akrep-kontrolu", "Akrep Kontrolü", "Akrep", "hasere", "scorpion",
    "Bahçeli ve kırsal yapılarda saklanma alanlarının azaltılmasına odaklanan kontrol.", false),

  // Yaşam alanına göre
  s(20, "ev-ilaclama", "Ev İlaçlama", "Ev", "yasam-alani", "home",
    "Ev halkının günlük düzeni gözetilerek planlanan, hazırlık ve sonrası bilgilendirmeli uygulama.", true),
  s(21, "apartman-ve-bina-ilaclama", "Apartman ve Bina İlaçlama", "Apartman ve Bina", "yasam-alani", "building",
    "Ortak alanlar, şaftlar ve bodrumlarla birlikte bütün bina ölçeğinde planlama.", true),
  s(22, "site-ilaclama", "Site İlaçlama", "Site", "yasam-alani", "buildings",
    "Çok bloklu sitelerde yönetimle koordineli, takvimli ve raporlanabilir uygulama.", false),
  s(23, "ofis-ilaclama", "Ofis İlaçlama", "Ofis", "yasam-alani", "office",
    "Çalışma düzenini aksatmayacak saatlerde planlanan ofis uygulamaları.", false),
  s(24, "isyeri-ilaclama", "İşyeri İlaçlama", "İşyeri", "yasam-alani", "store",
    "Mağaza, atölye ve ticari alanlarda müşteri trafiği gözetilerek yapılan uygulama.", false),
  s(25, "bahce-ve-acik-alan-kontrolu", "Bahçe ve Açık Alan Kontrolü", "Bahçe ve Açık Alan", "yasam-alani", "garden",
    "Bahçe, teras ve peyzaj alanlarında sivrisinek, kene ve karıncaya yönelik kontrol.", false),
  s(26, "bodrum-ve-ortak-alan-kontrolu", "Bodrum ve Ortak Alan Kontrolü", "Bodrum ve Ortak Alan", "yasam-alani", "basement",
    "Bodrum, kazan dairesi, çöp odası ve otoparklarda kaynak odaklı kontrol.", false),

  // Kurumsal
  s(40, "restoran-ve-kafe-pest-kontrol", "Restoran ve Kafe Pest Kontrol", "Restoran ve Kafe", "kurumsal", "restaurant",
    "Gıda güvenliği denetimlerine uygun kayıt ve takip düzeniyle periyodik pest kontrol.", true),
  s(41, "otel-ilaclama", "Otel İlaçlama", "Otel", "kurumsal", "hotel",
    "Misafir deneyimini koruyan, oda ve servis alanlarına göre bölümlenmiş program.", true),
  s(42, "depo-ilaclama", "Depo İlaçlama", "Depo", "kurumsal", "warehouse",
    "Stok ve sevkiyat düzenine uygun, kemirgen ve depo zararlısı odaklı kontrol.", false),
  s(43, "fabrika-ve-endustriyel-alan-kontrolu", "Fabrika ve Endüstriyel Alan Kontrolü", "Fabrika ve Endüstriyel", "kurumsal", "factory",
    "Üretim hattı, hammadde ve sevkiyat alanları için risk haritalı kontrol programı.", false),
  s(44, "periyodik-pest-management", "Periyodik Pest Management", "Periyodik Program", "kurumsal", "calendar",
    "Belirli aralıklarla izleme, uygulama ve raporlamayı kapsayan sözleşmeli program.", true),
  s(45, "entegre-zararli-yonetimi", "İşletmeler İçin Entegre Zararlı Yönetimi", "Entegre Zararlı Yönetimi", "kurumsal", "layers",
    "Önleme, izleme ve gerektiğinde müdahaleyi birleştiren entegre zararlı yönetimi (IPM).", false),
];

export const sectorCards: { title: string; text: string; serviceSlug: string; icon: ServiceSummary["icon"] }[] = [
  { title: "Restoran & Kafe", text: "Mutfak, depo ve servis alanları için kayıtlı periyodik kontrol.", serviceSlug: "restoran-ve-kafe-pest-kontrol", icon: "restaurant" },
  { title: "Otel", text: "Oda, çamaşırhane ve mutfak bölümlerine göre ayrılmış program.", serviceSlug: "otel-ilaclama", icon: "hotel" },
  { title: "Apartman & Site", text: "Ortak alanlar ve bodrumlar için yönetimle koordineli takvim.", serviceSlug: "apartman-ve-bina-ilaclama", icon: "building" },
  { title: "Fabrika", text: "Hammadde ve üretim akışına uygun risk haritalı izleme.", serviceSlug: "fabrika-ve-endustriyel-alan-kontrolu", icon: "factory" },
  { title: "Depo & Lojistik", text: "Stok güvenliği için kemirgen ve depo zararlısı odaklı kontrol.", serviceSlug: "depo-ilaclama", icon: "warehouse" },
  { title: "Ofis", text: "Mesai düzenini aksatmayan saatlerde planlı uygulama.", serviceSlug: "ofis-ilaclama", icon: "office" },
  { title: "Ticari Alan", text: "Mağaza ve atölyelerde müşteri trafiğine uygun planlama.", serviceSlug: "isyeri-ilaclama", icon: "store" },
];
