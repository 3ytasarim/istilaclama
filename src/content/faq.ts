import type { FaqItem } from "@/types/content";

/**
 * Genel SSS taslağı. Ürün/ruhsat/süre içeren cevaplar işletmeye göre değişeceğinden
 * kesin rakam veya garanti içermez; yayın öncesi yetkili uzman onayı gerekir.
 * Sıralama önemlidir: ana sayfa ilk 5 soruyu gösterir.
 */
export type FaqTopicKey = "surec" | "hazirlik" | "uygulama" | "isletme" | "belge";

export const faqTopics: { key: FaqTopicKey; title: string; description: string }[] = [
  { key: "surec", title: "Teklif ve süreç", description: "Teklif, inceleme ve planlamanın nasıl ilerlediği." },
  { key: "hazirlik", title: "Hazırlık ve güvenlik", description: "Uygulama öncesinde ev ve işyerinde yapılacaklar." },
  { key: "uygulama", title: "Uygulama ve sonrası", description: "Uygulama günü, dönüş süresi ve takip ziyaretleri." },
  { key: "isletme", title: "İşletmeler ve yöneticiler", description: "Periyodik program, kayıt ve ortak alan planlaması." },
  { key: "belge", title: "Belgeler ve şeffaflık", description: "Sorulması gereken belgeler ve bilgilendirme." },
];

export const faqItems: (FaqItem & { topic: FaqTopicKey })[] = [
  {
    id: "teklif-sureci",
    scope: "genel",
    topic: "surec",
    question: "Teklif almak için hangi bilgileri paylaşmam gerekiyor?",
    answer:
      "Alanın türü (ev, apartman, işletme vb.), yaklaşık büyüklüğü, ilçe ve gözlemlediğiniz zararlı türü teklifin hazırlanması için yeterli bir başlangıçtır. Gerekli görülürse uygulama öncesinde yerinde inceleme planlanır.",
  },
  {
    id: "yerinde-inceleme",
    scope: "genel",
    topic: "surec",
    question: "Uygulamadan önce yerinde inceleme yapılıyor mu?",
    answer:
      "Zararlı türü, yoğunluğu ve kaynak bölgeleri her alanda farklıdır. Bu nedenle uygulama planı, ön görüşme ve gerektiğinde yerinde inceleme sonrasında hazırlanır.",
  },
  {
    id: "hazirlik",
    scope: "genel",
    topic: "hazirlik",
    question: "İlaçlama öncesinde nasıl bir hazırlık yapmalıyım?",
    answer:
      "Hazırlık; zararlı türüne, uygulama yöntemine ve alanın kullanımına göre değişir. Uygulama günü öncesinde size alanınıza özel bir hazırlık listesi iletilir.",
  },
  {
    id: "evcil-hayvan",
    scope: "genel",
    topic: "hazirlik",
    question: "Evde çocuk veya evcil hayvan varsa nelere dikkat ediliyor?",
    answer:
      "Ön görüşmede hane hakkında bilgi alınır; yöntem seçimi, uygulama alanları ve alana dönüş zamanı bu bilgilere göre planlanır. Kullanılan ürünün etiketinde yer alan talimatlara uyulması esastır.",
  },
  {
    id: "tek-seferlik",
    scope: "genel",
    topic: "uygulama",
    question: "Tek bir uygulama yeterli olur mu?",
    answer:
      "Bazı zararlılarda yaşam döngüsü nedeniyle takip ziyareti gerekebilir. Kaç ziyaret gerektiği, inceleme bulgularına göre plan içinde açıkça belirtilir.",
  },
  {
    id: "isletme-kayit",
    scope: "genel",
    topic: "isletme",
    question: "İşletmeler için periyodik takip ve raporlama sunuluyor mu?",
    answer:
      "Kurumsal programlarda ziyaret takvimi, izleme noktaları ve uygulama kayıtları planlanır. Kapsam, işletmenin türüne ve denetim gerekliliklerine göre belirlenir.",
  },
  {
    id: "belgeler",
    scope: "genel",
    topic: "belge",
    question: "Bir ilaçlama firmasından hangi belgeleri istemeliyim?",
    answer:
      "Biyosidal ürün uygulama izin belgesi, sorumlu yönetici bilgisi ve kullanılan ürünlerin ruhsat bilgileri sorulabilecek temel belgelerdir. Belgelerimiz doğrulandıkça kurumsal sayfada yayınlanacaktır.",
  },
  {
    id: "fiyat-belirleme",
    scope: "genel",
    topic: "surec",
    question: "Fiyat neye göre belirleniyor?",
    answer:
      "Fiyat; alanın büyüklüğü ve türü, zararlının cinsi ve yoğunluğu, uygulama yöntemi ve gereken takip ziyareti sayısına göre değişir. Bu yüzden sabit bir liste yerine alanınıza özel teklif hazırlanır.",
  },
  {
    id: "teklif-suresi",
    scope: "genel",
    topic: "surec",
    question: "Teklif formunu doldurduktan sonra süreç nasıl ilerliyor?",
    answer:
      "Talebiniz incelendikten sonra eksik bilgiler için sizinle iletişime geçilir. Gerekirse yerinde inceleme günü planlanır; ardından yöntem, hazırlık ve takip adımlarını içeren plan size iletilir.",
  },
  {
    id: "fotograf",
    scope: "genel",
    topic: "surec",
    question: "Gördüğüm böceğin fotoğrafını göndermek işe yarar mı?",
    answer:
      "Evet. Net bir fotoğraf, türün ön değerlendirmesini kolaylaştırır ve doğru ekipmanla gelinmesine yardımcı olur. Tür tespiti yine de yerinde inceleme ile yapılır.",
  },
  {
    id: "evde-bulunma",
    scope: "genel",
    topic: "hazirlik",
    question: "Uygulama sırasında evde bulunmam gerekir mi?",
    answer:
      "Uygulamanın başında alanı göstermek ve sonunda bilgilendirmeyi almak için yetişkin bir kişinin bulunması önerilir. Uygulama süresince alanda kalınıp kalınamayacağı seçilen yönteme göre önceden bildirilir.",
  },
  {
    id: "hassas-bireyler",
    scope: "genel",
    topic: "hazirlik",
    question: "Hamile, bebek veya astımlı bir birey varsa ne yapılmalı?",
    answer:
      "Bu bilgiyi ön görüşmede mutlaka paylaşın. Yöntem, uygulama alanları ve dönüş süresi buna göre planlanır; gerekli görülürse hekiminize danışmanız önerilir.",
  },
  {
    id: "gida-esya",
    scope: "genel",
    topic: "hazirlik",
    question: "Mutfaktaki gıdaları ve eşyaları ne yapmalıyım?",
    answer:
      "Açıkta bulunan gıdaları kapalı kaplara alın veya dolaplara kaldırın. Uygulama yapılacak dolapların boşaltılması gerekiyorsa bu bilgi hazırlık listesinde ayrıca belirtilir.",
  },
  {
    id: "donus-suresi",
    scope: "genel",
    topic: "uygulama",
    question: "Uygulamadan ne kadar sonra alana dönebilirim?",
    answer:
      "Dönüş süresi kullanılan yönteme ve ürünün etiket talimatlarına göre değişir. Ekip uygulama sonunda bu süreyi ve havalandırma önerilerini size açıkça iletir.",
  },
  {
    id: "sonra-gorulme",
    scope: "genel",
    topic: "uygulama",
    question: "Uygulamadan sonra hâlâ böcek görmem normal mi?",
    answer:
      "İlk günlerde saklandıkları yerden çıkan bireyler görülebilir. Sayı azalmıyor veya artıyorsa bunu bildirmeniz, takip ziyaretinin doğru planlanmasına yardımcı olur.",
  },
  {
    id: "temizlik-sonrasi",
    scope: "genel",
    topic: "uygulama",
    question: "Uygulamadan sonra temizlik yapabilir miyim?",
    answer:
      "Genel temizlik yapılabilir; ancak uygulama yapılan noktaların belirli bir süre silinmemesi gerekebilir. Hangi alanların ne zaman temizlenebileceği uygulama sonrası bilgilendirmede belirtilir.",
  },
  {
    id: "apartman-karar",
    scope: "genel",
    topic: "isletme",
    question: "Apartman genelinde uygulama için yönetim kararı gerekir mi?",
    answer:
      "Ortak alanlarda yapılacak uygulamalar genellikle yönetim veya yönetici aracılığıyla planlanır. Sakinlerin önceden bilgilendirilmesi ve dairelerin katılımı sonucun kalıcılığını artırır.",
  },
  {
    id: "mesai-disi",
    scope: "genel",
    topic: "isletme",
    question: "İşyerimin çalışma düzeni aksamadan uygulama yapılabilir mi?",
    answer:
      "Ofis, mağaza ve restoranlarda uygulama, mümkün olduğunca kapanış sonrası veya yoğunluğun düşük olduğu saatlerde planlanır. Uygun zaman ön görüşmede birlikte belirlenir.",
  },
  {
    id: "ziyaret-sikligi",
    scope: "genel",
    topic: "isletme",
    question: "Periyodik programda ziyaret sıklığı nasıl belirleniyor?",
    answer:
      "Sıklık; işletmenin türüne, risk düzeyine, mevsime ve önceki ziyaretlerin bulgularına göre belirlenir. Program bulgulara göre zaman içinde güncellenebilir.",
  },
  {
    id: "uygulama-belgesi",
    scope: "genel",
    topic: "belge",
    question: "Uygulama sonrasında belge veya rapor veriliyor mu?",
    answer:
      "Uygulamanın tarihi, alanı ve yapılan işlemleri gösteren bir kayıt düzenlenmesi planlanmaktadır. Belgenin kapsamı ve biçimi, firma belgeleri doğrulandığında bu sayfada netleştirilecektir.",
  },
  {
    id: "urun-bilgisi",
    scope: "genel",
    topic: "belge",
    question: "Kullanılan ürün hakkında bilgi alabilir miyim?",
    answer:
      "Evet. Uygulamada kullanılan ürünün adı ve ruhsat bilgisini sorabilirsiniz. Ürünlerin yalnızca yetkili kişilerce ve etiket talimatlarına uygun şekilde uygulanması gerektiği için kendi başınıza uygulama tarifi verilmez.",
  },
];
