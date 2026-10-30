import type { BlogCategory, BlogPostSummary } from "@/types/content";

export const blogCategories: BlogCategory[] = [
  { slug: "bocek-ve-hasere-rehberleri", title: "Böcek ve Haşere Rehberleri" },
  { slug: "evde-onleyici-tedbirler", title: "Evde Önleyici Tedbirler" },
  { slug: "isyeri-hijyen-ve-pest-kontrol", title: "İşyeri Hijyen ve Pest Kontrol" },
  { slug: "mevsimsel-hasere-sorunlari", title: "Mevsimsel Haşere Sorunları" },
  { slug: "sik-sorulan-sorular", title: "Sık Sorulan Sorular" },
  { slug: "profesyonel-uygulama-rehberleri", title: "Profesyonel Uygulama Rehberleri" },
];

/** İlk 10 konu — taslak. Gövde metinleri Sprint 5'te kaynaklı olarak yazılıp uzman onayına sunulur. */
export const blogPosts: BlogPostSummary[] = [
  { slug: "evde-hamam-bocegi-gorulmesinin-olasi-nedenleri", title: "Evde Hamam Böceği Görülmesinin Olası Nedenleri",
    excerpt: "Nem, açık gıda ve tesisat boşlukları gibi hamam böceklerini çeken koşullar ve ilk yapılabilecekler.",
    category: "bocek-ve-hasere-rehberleri", readingMinutes: 6, status: "draft", publishedAt: null },
  { slug: "tahta-kurusu-belirtileri-nasil-anlasilir", title: "Tahta Kurusu Belirtileri Nasıl Anlaşılır?",
    excerpt: "Yatak dikişlerindeki lekeler, ısırık düzenleri ve tahta kurusunu benzer sorunlardan ayıran işaretler.",
    category: "bocek-ve-hasere-rehberleri", readingMinutes: 7, status: "draft", publishedAt: null },
  { slug: "farelerin-yasam-alanina-girisini-onlemek", title: "Farelerin Yaşam Alanına Girişini Önlemek İçin Yapılabilecekler",
    excerpt: "Giriş noktalarının kapatılması, atık düzeni ve yapısal önlemlerle kemirgen riskini azaltmak.",
    category: "evde-onleyici-tedbirler", readingMinutes: 6, status: "draft", publishedAt: null },
  { slug: "pire-sorununda-hangi-onlemler-alinabilir", title: "Pire Sorununda Hangi Önlemler Alınabilir?",
    excerpt: "Evcil hayvan bakımı, tekstil temizliği ve profesyonel uygulamanın birlikte planlanması.",
    category: "evde-onleyici-tedbirler", readingMinutes: 5, status: "draft", publishedAt: null },
  { slug: "ilaclama-oncesinde-nelere-dikkat-edilmeli", title: "İlaçlama Öncesinde Nelere Dikkat Edilmeli?",
    excerpt: "Uygulama gününden önce yapılacak hazırlıklar ve ekiple paylaşılması gereken bilgiler.",
    category: "profesyonel-uygulama-rehberleri", readingMinutes: 5, status: "draft", publishedAt: null },
  { slug: "profesyonel-hasere-kontrolu-nasil-planlanir", title: "Profesyonel Haşere Kontrolü Nasıl Planlanır?",
    excerpt: "İnceleme, tür tespiti, yöntem seçimi ve takip adımlarıyla planlı haşere kontrolü.",
    category: "profesyonel-uygulama-rehberleri", readingMinutes: 8, status: "draft", publishedAt: null },
  { slug: "apartmanlarda-ortak-alan-hasere-kontrolu", title: "Apartmanlarda Ortak Alan Haşere Kontrolü",
    excerpt: "Bodrum, çöp odası ve şaftların neden birlikte ele alınması gerektiği ve yönetim için öneriler.",
    category: "isyeri-hijyen-ve-pest-kontrol", readingMinutes: 6, status: "draft", publishedAt: null },
  { slug: "restoranlarda-entegre-zararli-yonetimi", title: "Restoranlarda Entegre Zararlı Yönetimi",
    excerpt: "Gıda işletmelerinde önleme, izleme ve kayıt tutmayı birleştiren IPM yaklaşımı.",
    category: "isyeri-hijyen-ve-pest-kontrol", readingMinutes: 9, status: "draft", publishedAt: null },
  { slug: "yaz-aylarinda-sivrisinek-sorununu-azaltma", title: "Yaz Aylarında Sivrisinek Sorununu Azaltma Yöntemleri",
    excerpt: "Durgun suların yönetimi, fiziksel bariyerler ve açık alan uygulamalarının rolü.",
    category: "mevsimsel-hasere-sorunlari", readingMinutes: 5, status: "draft", publishedAt: null },
  { slug: "ilaclama-hizmeti-secerken-hangi-belgelere-bakilmali", title: "İlaçlama Hizmeti Seçerken Hangi Belgelere Bakılmalı?",
    excerpt: "Biyosidal uygulama izni, sorumlu yönetici ve ürün ruhsatı gibi sorulması gereken belgeler.",
    category: "sik-sorulan-sorular", readingMinutes: 6, status: "draft", publishedAt: null },
];
