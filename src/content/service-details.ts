import type { MediaKey } from "@/content/media";

/**
 * Hizmet detay içerikleri — özgün taslak; yayın öncesi yetkili uzman onayı gerekir.
 * Kurallar: doz/karışım tarifi yok, "%100 / kesin / zararsız" gibi iddialar yok,
 * sağlıkla ilgili ifadeler genel ve temkinli. Sprint 3'te services tablosuna aktarılır.
 */
export interface ServiceDetail {
  slug: string;
  /** Hero altındaki kısa özet (GEO: soruya doğrudan cevap) */
  summary: string;
  intro: string[];
  symptoms: { title: string; text: string }[];
  risks: string[];
  process: { title: string; text: string }[];
  methods: { title: string; text: string }[];
  before: string[];
  after: string[];
  suitableFor: string[];
  gallery: MediaKey[];
  related: string[];
  faq: { q: string; a: string }[];
}

export const serviceDetails: Record<string, ServiceDetail> = {
  "hamam-bocegi-ilaclama": {
    slug: "hamam-bocegi-ilaclama",
    summary:
      "Hamam böceği kontrolü; türün ve saklanma noktalarının tespiti, mutfak ve ıslak alanlara odaklanan hedefli uygulama ve gerekirse takip ziyaretiyle planlanır.",
    intro: [
      "Hamam böcekleri genellikle sıcak, nemli ve besine kolay ulaşılan alanları tercih eder. Gündüz pek görünmedikleri için birkaç bireyin fark edilmesi, çoğu zaman tesisat boşluklarında, dolap arkalarında veya beyaz eşya altında daha geniş bir popülasyonun bulunabileceğine işaret eder.",
      "Etkili kontrol, yalnızca görünen böceklere değil; yumurta kapsülleri ve saklanma noktaları dahil yaşam döngüsünün tamamına yönelik bir planla mümkündür. Bu nedenle uygulamadan önce alanı inceler, ardından konuta veya işletmeye uygun yöntemi belirleriz.",
    ],
    symptoms: [
      { title: "Gece hareketlilik", text: "Işık yakıldığında hızla saklanan böcekler, özellikle mutfak ve banyoda." },
      { title: "Dışkı izleri", text: "Dolap köşelerinde ve çekmece içlerinde kahve telvesine benzeyen küçük lekeler." },
      { title: "Yumurta kapsülleri", text: "Mobilya arkalarında veya rafların altında kahverengi, kapsül şeklinde kılıflar." },
      { title: "Kalıcı koku", text: "Yoğun popülasyonlarda kapalı alanlarda hissedilen ağır, yağlı bir koku." },
    ],
    risks: [
      "Gıdalar ve mutfak yüzeyleriyle temas ederek hijyen sorunlarına yol açabilirler.",
      "Dışkı ve kabuk kalıntıları bazı kişilerde alerjik şikâyetleri tetikleyebilir.",
      "Apartmanlarda tesisat şaftları üzerinden daireler arasında yayılabilirler.",
      "İşletmelerde gıda güvenliği denetimlerinde uygunsuzluk nedeni olabilirler.",
    ],
    process: [
      { title: "Ön görüşme", text: "Görülen böceğin yeri, sıklığı ve alanın kullanımı hakkında bilgi alınır." },
      { title: "İnceleme", text: "Mutfak, ıslak hacimler, tesisat geçişleri ve beyaz eşya çevresi kontrol edilir." },
      { title: "Plan", text: "Uygulama noktaları, yöntem ve gerekiyorsa takip ziyareti yazılı olarak paylaşılır." },
      { title: "Uygulama", text: "Saklanma noktalarına yönelik, ürün etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "Takip", text: "Sonuç değerlendirilir; tekrarı azaltmak için yapısal ve hijyen önerileri sunulur." },
    ],
    methods: [
      { title: "Jel yem uygulaması", text: "Böceklerin saklandığı çatlak ve boşluklara noktasal olarak uygulanır; açık yüzeylere yayılmaz." },
      { title: "Çatlak–yarık uygulaması", text: "Tesisat geçişleri ve süpürgelik boşlukları gibi hedef noktalara yöneliktir." },
      { title: "İzleme tuzakları", text: "Popülasyonun yoğunluğunu ve uygulamanın etkisini takip etmek için kullanılır." },
      { title: "Yapısal öneriler", text: "Tesisat boşluklarının kapatılması, nem ve atık yönetimi gibi kalıcılığı artıran adımlar." },
    ],
    before: [
      "Mutfak tezgâhlarını ve dolap içlerini boşaltıp açıkta gıda bırakmayın.",
      "Evcil hayvan mama ve su kaplarını kaldırın; akvaryum varsa ekibi bilgilendirin.",
      "Çocuklar, hamile bireyler veya hassasiyeti olan kişiler hakkında ön görüşmede bilgi verin.",
      "Ekibin tesisat ve beyaz eşya arkasına ulaşabileceği alanı açık bırakın.",
    ],
    after: [
      "Alana dönüş süresi için ekibin ve ürün etiketinin bilgilendirmesine uyun.",
      "Jel uygulanan noktaları silmeyin ve temizlik maddesiyle temas ettirmeyin.",
      "Uygulamadan sonraki günlerde böcek görülmesi beklenebilir; artış olursa bize bildirin.",
      "Önerilen takip ziyaretini aksatmayın.",
    ],
    suitableFor: ["Daireler ve müstakil evler", "Apartman ortak alanları", "Restoran ve kafeler", "Otel mutfakları", "Ofis mutfakları", "Gıda depoları"],
    gallery: ["restaurantKitchen", "inspection", "cockroachFloor"],
    related: ["bocek-ilaclama", "apartman-ve-bina-ilaclama", "restoran-ve-kafe-pest-kontrol", "ev-ilaclama"],
    faq: [
      { q: "Hamam böceği uygulaması kaç ziyarette tamamlanır?", a: "Popülasyonun yoğunluğuna ve alanın yapısına bağlıdır. Yumurta kapsüllerinden çıkan yeni bireyler nedeniyle çoğu durumda takip ziyareti planlanır; sayı inceleme sonrasında belirtilir." },
      { q: "Uygulama sırasında evden çıkmam gerekir mi?", a: "Seçilen yönteme göre değişir. Noktasal jel uygulamalarında genellikle uzun süre dışarıda kalmak gerekmez; net bilgi plan aşamasında verilir." },
      { q: "Komşulardan böcek geliyorsa tek başıma uygulama yaptırmam yeterli olur mu?", a: "Tesisat şaftları ortak olduğunda bina genelinde planlama daha kalıcı sonuç verir. Bu durumda apartman yönetimiyle koordineli bir program öneririz." },
    ],
  },

  "fare-ve-kemirgen-kontrolu": {
    slug: "fare-ve-kemirgen-kontrolu",
    summary:
      "Fare ve kemirgen kontrolü; giriş noktalarının tespiti, izleme istasyonları ve yapısal önlemleri birleştiren, kayıtlı bir program olarak yürütülür.",
    intro: [
      "Kemirgenler küçük açıklıklardan içeri girebilir ve yiyecek, su ve barınak buldukları alanlara hızla yerleşebilir. Bu nedenle kalıcı kontrolün temelinde yalnızca uygulama değil, giriş noktalarının bulunup kapatılması yer alır.",
      "Konut, apartman ve işletmelerde izleme istasyonlarıyla aktiviteyi takip ediyor; elde edilen bulgulara göre programı güncelliyoruz.",
    ],
    symptoms: [
      { title: "Dışkı", text: "Dolap köşeleri, depo rafları ve duvar diplerinde küçük, koyu renkli dışkılar." },
      { title: "Kemirme izleri", text: "Ambalaj, kablo, ahşap veya plastik yüzeylerde diş izleri." },
      { title: "Ses", text: "Özellikle gece tavan arası, asma tavan veya duvar içinden gelen tırmalama sesleri." },
      { title: "Yağlı izler", text: "Sürekli kullanılan geçiş yollarında duvar diplerinde oluşan koyu lekeler." },
    ],
    risks: [
      "Gıdaları ve ambalajları kirleterek hijyen ve stok kaybına neden olabilirler.",
      "Elektrik kablolarını kemirerek arıza riski oluşturabilirler.",
      "Bazı hastalıkların taşınmasında rol oynayabildikleri bilinmektedir.",
      "İşletmelerde denetim uygunsuzluğu ve itibar kaybı yaratabilirler.",
    ],
    process: [
      { title: "Ön görüşme", text: "Belirtilerin görüldüğü alanlar ve yapının özellikleri öğrenilir." },
      { title: "Keşif", text: "Giriş noktaları, geçiş yolları ve barınma alanları belirlenir." },
      { title: "Plan", text: "İstasyon noktaları, kontrol sıklığı ve yapısal öneriler yazılı paylaşılır." },
      { title: "Uygulama", text: "Kilitli istasyonlar ve uygun yöntemlerle, etiket talimatlarına göre uygulama yapılır." },
      { title: "İzleme", text: "İstasyonlar düzenli kontrol edilir, bulgular kayıt altına alınır." },
    ],
    methods: [
      { title: "Kilitli yem istasyonları", text: "Çocuk, evcil hayvan ve hedef dışı canlıların erişimini sınırlayan güvenli istasyonlar." },
      { title: "Mekanik yakalama", text: "İç mekânlarda ve hassas alanlarda tercih edilebilen kimyasal içermeyen yöntem." },
      { title: "Giriş noktası kapatma önerileri", text: "Kapı altları, tesisat geçişleri ve havalandırma açıklıkları için yapısal öneriler." },
      { title: "Kayıtlı izleme", text: "İşletmelerde istasyon haritası ve ziyaret kayıtlarıyla izlenebilir program." },
    ],
    before: [
      "Belirti gördüğünüz noktaları not alın veya fotoğraflayın.",
      "Depo ve dolaplarda açık gıdaları kapalı kaplara alın.",
      "Ekibin tavan arası, bodrum ve tesisat geçişlerine ulaşabilmesini sağlayın.",
      "Evcil hayvanlarınız hakkında ön görüşmede bilgi verin.",
    ],
    after: [
      "İstasyonların yerini değiştirmeyin ve açmaya çalışmayın.",
      "Önerilen yapısal önlemleri (kapı altı fırçası, delik kapatma vb.) uygulayın.",
      "Yeni belirti görürseniz tarih ve yerle birlikte bize bildirin.",
      "İzleme ziyaretlerinin aksamamasına dikkat edin.",
    ],
    suitableFor: ["Konutlar ve bahçeli evler", "Apartman bodrum ve otoparkları", "Depolar ve lojistik alanları", "Restoran ve gıda işletmeleri", "Fabrikalar", "Ofisler"],
    gallery: ["warehouseTeam", "mouse", "basementStairs"],
    related: ["depo-ilaclama", "bodrum-ve-ortak-alan-kontrolu", "periyodik-pest-management", "fabrika-ve-endustriyel-alan-kontrolu"],
    faq: [
      { q: "Fare ile sıçan arasında uygulama farkı var mı?", a: "Evet. Türlerin davranışı, girebildikleri açıklık boyutu ve hareket alanları farklıdır; istasyon yerleşimi ve yöntem buna göre belirlenir." },
      { q: "Yem istasyonları evcil hayvanlar için risk oluşturur mu?", a: "Kilitli istasyonlar erişimi sınırlamak için tasarlanmıştır; yine de yerleşim evcil hayvanlar dikkate alınarak planlanır ve ön görüşmede bilgi alınır." },
      { q: "Kontrol ne kadar sürer?", a: "Aktivitenin yoğunluğuna ve giriş noktalarının kapatılmasına bağlıdır. İzleme ziyaretlerinin bulgularına göre süre birlikte değerlendirilir." },
    ],
  },

  "tahta-kurusu-ilaclama": {
    slug: "tahta-kurusu-ilaclama",
    summary:
      "Tahta kurusu kontrolü; yatak, mobilya ve dikiş yerlerinin detaylı incelenmesi, hedefli uygulama ve yaşam döngüsünü dikkate alan takip ziyaretleriyle planlanır.",
    intro: [
      "Tahta kuruları genellikle yatak, baza, koltuk ve dikiş yerleri gibi insanların uzun süre dinlendiği alanlara yakın saklanır. Valiz, ikinci el mobilya veya konaklama sonrası eşyalarla taşınabildikleri için temizlik düzeyinden bağımsız olarak her yerde görülebilirler.",
      "Saklanma noktaları çok küçük olabildiği için başarı büyük ölçüde detaylı incelemeye ve uygulamanın takip ziyaretleriyle desteklenmesine bağlıdır.",
    ],
    symptoms: [
      { title: "Sıralı ısırık izleri", text: "Sabahları fark edilen, çoğu zaman sıra hâlinde dizilmiş kaşıntılı izler." },
      { title: "Çarşafta lekeler", text: "Yatak çarşafı ve yastıklarda küçük kırmızımsı veya koyu noktalar." },
      { title: "Dikiş yerlerinde izler", text: "Yatak kenarı ve baza dikişlerinde koyu dışkı noktaları ve deri kalıntıları." },
      { title: "Canlı birey", text: "Elma çekirdeği büyüklüğünde, yassı, kahverengi böcekler." },
    ],
    risks: [
      "Isırıklar kaşıntı ve uyku düzeninde bozulmaya neden olabilir.",
      "Eşyalarla taşınarak aynı binadaki başka dairelere yayılabilirler.",
      "Konaklama işletmelerinde misafir şikâyeti ve itibar kaybı yaratabilirler.",
      "Yanlış veya yarım bırakılan uygulamalar sorunun uzamasına yol açabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Belirtilerin başladığı zaman, odalar ve son seyahat/eşya bilgisi alınır." },
      { title: "Detaylı inceleme", text: "Yatak, baza, koltuk, priz ve süpürgelik boşlukları tek tek kontrol edilir." },
      { title: "Plan", text: "Uygulama yapılacak odalar, hazırlık listesi ve takip ziyaretleri belirlenir." },
      { title: "Uygulama", text: "Saklanma noktalarına yönelik, etiket talimatlarına uygun uygulama yapılır." },
      { title: "Takip ziyareti", text: "Yumurtadan çıkan bireylere karşı planlanan aralıkta tekrar kontrol yapılır." },
    ],
    methods: [
      { title: "Hedefli uygulama", text: "Dikiş yerleri, çatlaklar ve mobilya bağlantı noktalarına yönelik uygulama." },
      { title: "Tekstil yönetimi", text: "Yıkanabilir tekstilin yüksek ısıda yıkanması ve kapalı torbalarda taşınması önerileri." },
      { title: "İzleme", text: "Yatak ayaklarına yerleştirilebilen tuzaklarla aktivitenin takibi." },
      { title: "Takip programı", text: "Yaşam döngüsü dikkate alınarak planlanan ikinci ve gerekirse üçüncü ziyaret." },
    ],
    before: [
      "Yatak çarşafı, perde ve yıkanabilir tekstilleri yüksek ısıda yıkayıp kapalı torbada saklayın.",
      "Yatak çevresindeki eşyaları azaltın, ancak eşyaları başka odalara dağıtmayın.",
      "Yatağı ve mobilyaları duvardan biraz uzaklaştırın.",
      "Etkilenen odaları ve belirtileri ön görüşmede detaylı paylaşın.",
    ],
    after: [
      "Alana dönüş süresi için ekibin ve etiketin talimatlarına uyun.",
      "Takip ziyaretine kadar yatağınızı başka odaya taşımayın.",
      "Yeni ısırık veya birey görürseniz not alın.",
      "Seyahat dönüşü valizleri yatak üzerine koymamaya özen gösterin.",
    ],
    suitableFor: ["Daireler ve evler", "Oteller ve pansiyonlar", "Öğrenci yurtları", "Hasta ve bakım evleri", "Toplu konaklama alanları"],
    gallery: ["hotelRoom", "livingRoom", "technicianHome"],
    related: ["ev-ilaclama", "otel-ilaclama", "pire-ilaclama", "bocek-ilaclama"],
    faq: [
      { q: "Tahta kurusu tek uygulamayla biter mi?", a: "Yumurtalar nedeniyle çoğu durumda takip ziyareti gerekir. Ziyaret sayısı ve aralığı inceleme bulgularına göre planda belirtilir." },
      { q: "Yatağımı atmam gerekir mi?", a: "Çoğu durumda gerekmez. Yatağın durumu incelemede değerlendirilir; atılması gerekirse yayılmayı önlemek için kapalı şekilde taşınması önerilir." },
      { q: "Tahta kurusu temizlikle ilgili midir?", a: "Hayır. Eşyalarla taşındıkları için temizlik düzeyinden bağımsız olarak her alanda görülebilirler." },
    ],
  },

  "pire-ilaclama": {
    slug: "pire-ilaclama",
    summary:
      "Pire kontrolü; evcil hayvanın veteriner tedavisi, tekstil ve zemin temizliği ile profesyonel uygulamanın birlikte planlanmasıyla yürütülür.",
    intro: [
      "Pirelerin yaşam döngüsünün büyük bölümü hayvanın üzerinde değil; halı, koltuk, yatak ve zemin aralıklarında geçer. Bu nedenle yalnızca hayvanın tedavisi ya da yalnızca alan uygulaması tek başına yeterli olmayabilir.",
      "Evcil hayvan sahiplerine, veteriner hekimleriyle eşgüdüm içinde ilerleyebilecekleri, yaşam alanına yönelik bir plan sunuyoruz.",
    ],
    symptoms: [
      { title: "Evcil hayvanda kaşınma", text: "Sık kaşınma, ısırma ve tüy dökülmesi gibi davranış değişiklikleri." },
      { title: "Bileklerde ısırık", text: "Özellikle ayak bileği ve bacaklarda kümelenmiş küçük, kaşıntılı izler." },
      { title: "Siyah noktalar", text: "Hayvanın yattığı yerlerde, ıslak mendille kızarıklık bırakan küçük siyah noktalar." },
      { title: "Sıçrayan böcekler", text: "Halı ve zemin üzerinde hızla sıçrayan çok küçük, koyu renkli böcekler." },
    ],
    risks: [
      "Isırıklar insanlarda ve hayvanlarda kaşıntı ve tahrişe yol açabilir.",
      "Evcil hayvanlarda deri sorunlarına ve huzursuzluğa neden olabilir.",
      "Boş kalan evlerde, dönüşte yoğun ısırık şikâyeti görülebilir.",
      "Bodrum ve ortak alanlardan dairelere taşınabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Evcil hayvan bilgisi, veteriner tedavisi ve belirtiler hakkında bilgi alınır." },
      { title: "İnceleme", text: "Hayvanın dinlendiği alanlar, halılar, koltuklar ve zemin aralıkları kontrol edilir." },
      { title: "Plan", text: "Uygulama alanları, hazırlık listesi ve takip ziyareti yazılı paylaşılır." },
      { title: "Uygulama", text: "Tekstil ve zemin odaklı, etiket talimatlarına uygun uygulama yapılır." },
      { title: "Takip", text: "Yeni çıkan bireylere karşı planlanan aralıkta kontrol yapılır." },
    ],
    methods: [
      { title: "Alan uygulaması", text: "Halı, koltuk altı ve zemin aralıkları gibi gelişim alanlarına yönelik uygulama." },
      { title: "Veteriner eşgüdümü", text: "Hayvanın tedavisinin veteriner hekim tarafından planlanması önerisi." },
      { title: "Temizlik önerileri", text: "Elektrik süpürgesiyle düzenli temizlik ve hayvan yataklarının yıkanması." },
      { title: "Takip ziyareti", text: "Yaşam döngüsü dikkate alınarak ikinci kontrolün planlanması." },
    ],
    before: [
      "Evcil hayvanınızın tedavisi için veteriner hekiminize danışın.",
      "Zeminleri ve koltukları elektrik süpürgesiyle temizleyip torbayı dışarıda atın.",
      "Hayvan yataklarını ve yıkanabilir tekstilleri yüksek ısıda yıkayın.",
      "Uygulama sırasında evcil hayvanların alanda bulunmayacağı şekilde planlama yapın.",
    ],
    after: [
      "Alana dönüş süresi için ekibin ve etiketin talimatlarına uyun.",
      "Uygulamadan sonraki günlerde süpürge ile düzenli temizliğe devam edin.",
      "Bir süre sıçrayan birey görülebilir; takip ziyaretini aksatmayın.",
      "Evcil hayvanın veteriner kontrollerini sürdürün.",
    ],
    suitableFor: ["Evcil hayvanlı konutlar", "Uzun süre boş kalan evler", "Apartman bodrumları", "Barınak ve bakım alanları"],
    gallery: ["livingRoom", "dogScratching", "basementLaundry"],
    related: ["ev-ilaclama", "bodrum-ve-ortak-alan-kontrolu", "tahta-kurusu-ilaclama", "kene-kontrolu"],
    faq: [
      { q: "Evcil hayvanım varken uygulama yapılabilir mi?", a: "Evet, ancak uygulama sırasında ve sonrasındaki dönüş süresinde hayvanların alanda bulunmaması gerekir. Ayrıntılar ön görüşmede planlanır." },
      { q: "Neden takip ziyareti gerekiyor?", a: "Pire kozaları bazı uygulamalardan korunabilir; kozadan çıkan yeni bireylere karşı ikinci kontrol sonucu güçlendirir." },
      { q: "Evcil hayvanım yokken neden pire olabilir?", a: "Önceki sakinlerden, bodrum veya bahçeden, ya da sokak hayvanlarının bulunduğu ortak alanlardan taşınmış olabilirler." },
    ],
  },

  "bocek-ilaclama": {
    slug: "bocek-ilaclama",
    summary:
      "Böcek ilaçlama; önce görülen böceğin türünü ve kaynağını belirleyen bir inceleme, ardından türe ve alana göre seçilen hedefli uygulama ve gerekirse takip ziyaretiyle planlanır.",
    intro: [
      "Evde ya da işyerinde görülen her böcek aynı yöntemle kontrol edilmez. Hamam böceği, karınca, gümüş böceği veya güve gibi türlerin beslenme, saklanma ve çoğalma alışkanlıkları birbirinden farklıdır; yanlış tür için seçilen yöntem çoğu zaman yalnızca görünen bireyleri etkiler.",
      "Bu yüzden böcek ilaçlama hizmetini tür tespitiyle başlatıyoruz. Gördüğünüz böceğin fotoğrafı bile ön görüşmede işimizi kolaylaştırır; inceleme sonrasında uygulama alanları, hazırlık adımları ve takip ihtiyacı size yazılı olarak iletilir.",
    ],
    symptoms: [
      { title: "Tekrarlayan görülme", text: "Temizliğe rağmen aynı odada veya aynı saatlerde yeniden ortaya çıkan böcekler." },
      { title: "Kalıntı ve izler", text: "Dolap köşelerinde dışkı noktaları, deri kabukları ya da toz benzeri kalıntılar." },
      { title: "Hasarlı ürünler", text: "Kuru gıda paketlerinde delikler, tekstilde küçük yenik izleri." },
      { title: "Belirli bir hat", text: "Pencere, süpürgelik veya tesisat boyunca düzenli bir yol izleyen böcekler." },
    ],
    risks: [
      "Tür bilinmeden yapılan uygulamalar sorunu geçici olarak bastırıp kaynağı yerinde bırakabilir.",
      "Bazı türler gıda ve mutfak yüzeylerine temas ederek hijyeni olumsuz etkileyebilir.",
      "Gelişigüzel ürün kullanımı böceklerin başka odalara veya komşu alanlara dağılmasına yol açabilir.",
      "Geç fark edilen popülasyonlar daha geniş kapsamlı ve daha uzun süren bir program gerektirebilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Böceğin görüldüğü yer, sıklık ve varsa fotoğraf üzerinden ilk değerlendirme yapılır." },
      { title: "Tür tespiti", text: "Alan incelenir; tür, yoğunluk ve muhtemel kaynak noktaları belirlenir." },
      { title: "Yazılı plan", text: "Uygulama yapılacak alanlar, yöntem, hazırlık listesi ve takip ihtiyacı paylaşılır." },
      { title: "Uygulama", text: "Türe uygun yöntemle, ürün etiket talimatlarına bağlı kalınarak hedefli uygulama yapılır." },
      { title: "Değerlendirme", text: "Sonuçlar takip edilir; tekrarı azaltacak yapısal ve hijyen önerileri iletilir." },
    ],
    methods: [
      { title: "Türe göre hedefli uygulama", text: "Uygulama, yalnızca türün saklandığı ve geçtiği noktalara yönelik olarak planlanır." },
      { title: "Yapışkan izleme kartları", text: "Hangi türün nerede yoğunlaştığını görmek ve sonucu ölçmek için yerleştirilir." },
      { title: "Kaynak azaltma", text: "Nem, açık gıda, ambalaj ve atık gibi böcekleri besleyen koşullar için öneriler." },
      { title: "Fiziksel engeller", text: "Çatlak, tesisat geçişi ve pencere boşlukları için kapatma ve sızdırmazlık önerileri." },
    ],
    before: [
      "Böceği gördüğünüz noktaları ve saatleri not edin; mümkünse fotoğraf çekin.",
      "Açıkta kalan gıdaları kapalı kaplara alın, tezgâhları boşaltın.",
      "Hane veya işyerindeki çocuk, hamile, evcil hayvan ve hassasiyet bilgilerini paylaşın.",
      "Uygulama yapılacak dolap ve köşelerin önünü açık bırakın.",
    ],
    after: [
      "Alana dönüş zamanı için ekibin ve ürün etiketinin talimatlarına uyun.",
      "Uygulama noktalarını belirtilen süre boyunca yıkamayın veya silmeyin.",
      "İlk günlerde böcek görülmesi olası olabilir; artış fark ederseniz bize bildirin.",
      "Önerilen yapısal düzenlemeleri ve takip ziyaretini planlayın.",
    ],
    suitableFor: ["Daireler ve müstakil evler", "Ofisler", "Mağaza ve atölyeler", "Restoran mutfakları", "Depolar", "Apartman ortak alanları"],
    gallery: ["inspection", "cockroach", "livingRoom"],
    related: ["hamam-bocegi-ilaclama", "karinca-ilaclama", "gumus-bocegi-kontrolu", "ev-ilaclama"],
    faq: [
      { q: "Hangi böcek olduğunu bilmiyorum, yine de teklif alabilir miyim?", a: "Evet. Ön görüşmede böceğin görünümünü, boyutunu ve görüldüğü yeri anlatmanız ya da fotoğraf paylaşmanız yeterlidir; tür tespiti yerinde incelemede yapılır." },
      { q: "Böcek ilaçlama sonrası evde koku kalır mı?", a: "Bu, seçilen yönteme ve ürüne göre değişir. Noktasal yöntemlerde genellikle belirgin bir koku olmaz; alanın havalandırılması ve dönüş süresi plan aşamasında açıkça belirtilir." },
      { q: "Böcekler tamamen gidene kadar ne kadar sürer?", a: "Türe, yoğunluğa ve kaynağın kapatılıp kapatılamamasına bağlıdır. Takip ziyaretinde sonuç değerlendirilir ve gerekiyorsa plan güncellenir." },
    ],
  },

  "hasere-kontrolu": {
    slug: "hasere-kontrolu",
    summary:
      "Haşere kontrolü; tek seferlik ilaçlama yerine izleme, önleme ve gerektiğinde müdahaleyi birleştiren, sonuçları kayıt altına alınan planlı bir yaklaşımdır.",
    intro: [
      "Zararlılar çoğu zaman bir alana tek bir nedenle gelmez: açık bir giriş noktası, nem, ulaşılabilir besin ve sığınak birlikte rol oynar. Bu koşullar değişmeden yapılan uygulamalar kısa süreli rahatlama sağlayıp aynı sorunun birkaç hafta sonra geri dönmesine neden olabilir.",
      "Haşere kontrolü hizmetimizde önce alanın risk noktalarını çıkarıyor, izleme araçlarıyla aktiviteyi ölçüyor ve müdahaleyi yalnızca gerekli noktalarda planlıyoruz. Böylece hem uygulamanın kapsamı daralır hem de sonucun sürdürülebilir olması hedeflenir.",
    ],
    symptoms: [
      { title: "Döngüsel sorun", text: "Her yıl aynı mevsimde ya da her uygulamadan sonra tekrar eden zararlı görülmesi." },
      { title: "Birden fazla tür", text: "Aynı alanda farklı böcek veya kemirgen belirtilerinin birlikte görülmesi." },
      { title: "Denetim beklentisi", text: "İşletmenin düzenli kayıt ve izleme belgesi sunması gereken durumlar." },
      { title: "Yapısal açıklıklar", text: "Bodrum, tesisat geçişi ya da çatı bağlantılarında zararlı girişine elverişli boşluklar." },
    ],
    risks: [
      "Kaynağı belirlenmeyen sorunlar tekrarlayan uygulama ihtiyacı doğurabilir.",
      "Gereğinden geniş alanlara yapılan uygulamalar alan kullanıcılarını gereksiz yere etkileyebilir.",
      "Kayıt tutulmadığında hangi önlemin işe yaradığı ölçülemez.",
      "Zararlılar ortak alanlar üzerinden komşu daire veya işletmelere yayılabilir.",
    ],
    process: [
      { title: "Risk analizi", text: "Alanın kullanımı, giriş noktaları, nem ve atık düzeni değerlendirilir." },
      { title: "İzleme kurulumu", text: "Uygun noktalara izleme kartları veya istasyonlar yerleştirilir." },
      { title: "Eşik belirleme", text: "Hangi bulguda müdahale gerekeceği alanın türüne göre birlikte belirlenir." },
      { title: "Hedefli müdahale", text: "Eşik aşıldığında etiket talimatlarına uygun, noktasal uygulama yapılır." },
      { title: "Raporlama", text: "Bulgular, yapılan işlemler ve öneriler kayıt altına alınarak paylaşılır." },
    ],
    methods: [
      { title: "İzleme noktaları", text: "Aktivitenin nerede ve ne yoğunlukta olduğunu gösteren düzenli kontrol noktaları." },
      { title: "Önleyici düzenlemeler", text: "Giriş noktalarının kapatılması, atık ve depolama düzeni için uygulanabilir öneriler." },
      { title: "Noktasal uygulama", text: "Yalnızca aktivite tespit edilen bölgelere yönelik, kapsamı sınırlı müdahale." },
      { title: "Kayıt ve trend takibi", text: "Ziyaret bulgularının karşılaştırılmasıyla programın düzenli olarak güncellenmesi." },
    ],
    before: [
      "Son dönemde gözlediğiniz zararlıları, yerlerini ve tarihlerini listeleyin.",
      "Varsa önceki uygulama kayıtlarını ve kullanılan yöntem bilgisini hazırlayın.",
      "Bodrum, depo, tesisat ve çatı gibi alanlara erişim sağlayın.",
      "Alan kullanıcılarının (çalışan, sakin, misafir) yoğun olduğu saatleri bildirin.",
    ],
    after: [
      "İzleme kartlarını ve istasyonları yerinden oynatmayın.",
      "Önerilen yapısal düzenlemeleri öncelik sırasına göre uygulayın.",
      "Ziyaretler arasında gördüğünüz yeni belirtileri not edip paylaşın.",
      "Rapordaki önerileri ilgili ekiplerle (temizlik, teknik servis) paylaşın.",
    ],
    suitableFor: ["Konutlar", "Apartman ve siteler", "Ofisler", "Gıda işletmeleri", "Depo ve lojistik alanları", "Üretim tesisleri"],
    gallery: ["warehouseTeam", "surfaceHygiene", "basementStairs"],
    related: ["entegre-zararli-yonetimi", "periyodik-pest-management", "bocek-ilaclama", "fare-ve-kemirgen-kontrolu"],
    faq: [
      { q: "Haşere kontrolü ile ilaçlama arasındaki fark nedir?", a: "İlaçlama tek bir müdahaleyi ifade ederken haşere kontrolü; izleme, önleme, gerektiğinde uygulama ve sonucun değerlendirilmesini kapsayan bir süreçtir." },
      { q: "Hiç uygulama yapılmadan kontrol mümkün mü?", a: "Bazı durumlarda izleme ve yapısal önlemler yeterli olabilir. Uygulama ihtiyacı, izleme bulgularına göre değerlendirilir." },
      { q: "Konutlar için de uygun mu, yoksa yalnızca işletmeler için mi?", a: "Her ikisi için de uygundur. Konutlarda program daha sade tutulur; işletmelerde kayıt ve raporlama ağırlığı artar." },
    ],
  },

  "karinca-ilaclama": {
    slug: "karinca-ilaclama",
    summary:
      "Karınca kontrolü; karınca yollarının ve yuva bölgesinin izlenmesi, koloniye ulaşmayı hedefleyen uygulama ve besin kaynaklarının azaltılmasıyla planlanır.",
    intro: [
      "Mutfakta ya da balkonda görülen karıncalar genellikle koloninin yalnızca besin arayan küçük bir bölümüdür. Yuva duvar boşluğunda, zemin altında veya bahçede olabilir; görünen karıncaların silinmesi koloninin yeni yollar açmasının önüne geçmez.",
      "Bu nedenle kontrolü karınca yollarını takip ederek ve yuvaya ulaşabilecek yöntemleri seçerek planlıyoruz. Türün beslenme tercihi de yöntemi etkiler; bazı türler tatlıya, bazıları yağlı ve proteinli besinlere yönelir.",
    ],
    symptoms: [
      { title: "Düzenli karınca hattı", text: "Tezgâh, süpürgelik veya pencere boyunca aynı güzergâhı izleyen karıncalar." },
      { title: "İnce toz birikintisi", text: "Duvar dibinde, derz aralarında veya ahşap yakınında oluşan küçük talaş ya da toprak yığınları." },
      { title: "Kanatlı bireyler", text: "Belirli dönemlerde içeride görülen kanatlı karıncalar." },
      { title: "Gıdalarda toplanma", text: "Şeker, bal, evcil hayvan maması ya da çöp kutusu çevresinde kümelenme." },
    ],
    risks: [
      "Gıdalara ve hazırlık yüzeylerine ulaşarak hijyeni olumsuz etkileyebilirler.",
      "Yanlış yöntemler koloninin bölünüp birden fazla noktaya dağılmasına yol açabilir.",
      "Bazı türler ahşap ya da yalıtım malzemesinde yuva kurabilir.",
      "İşletmelerde müşteri gözü önünde görülmeleri itibar kaybına neden olabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Karıncaların görüldüğü yerler, saatler ve dikkat çeken besin kaynakları sorulur." },
      { title: "Hat takibi", text: "Karınca yolları izlenerek giriş noktası ve muhtemel yuva bölgesi belirlenir." },
      { title: "Plan", text: "Türe uygun yöntem, uygulama noktaları ve takip ihtiyacı paylaşılır." },
      { title: "Uygulama", text: "Koloniye ulaşmayı hedefleyen, etiket talimatlarına uygun noktasal uygulama yapılır." },
      { title: "Kontrol", text: "Hatların azalması takip edilir; giriş noktaları için öneriler iletilir." },
    ],
    methods: [
      { title: "Yem istasyonları", text: "Karıncaların besini koloniye taşımasından yararlanan, kapalı ve noktasal yöntem." },
      { title: "Giriş noktası tespiti", text: "Derz, pencere ve tesisat geçişlerinde karıncanın içeri girdiği noktaların bulunması." },
      { title: "Besin yönetimi", text: "Tatlı ve yağlı gıdaların, mamanın ve çöpün kapalı tutulmasına yönelik öneriler." },
      { title: "Dış çevre değerlendirmesi", text: "Bahçe, balkon ve saksılarda yuva oluşumuna elverişli alanların incelenmesi." },
    ],
    before: [
      "Karınca hatlarını silmeden önce fotoğraflayın; güzergâh tespiti için faydalıdır.",
      "Tatlı, yağlı gıdaları ve evcil hayvan mamasını kapalı kaplara alın.",
      "Balkon ve bahçeye erişimin mümkün olup olmadığını bildirin.",
      "Ev halkı ve evcil hayvanlar hakkında bilgi paylaşın.",
    ],
    after: [
      "Yem istasyonlarının yerini değiştirmeyin ve çevresinde temizlik maddesi kullanmayın.",
      "İlk günlerde istasyon çevresinde karınca görülmesi beklenen bir durumdur.",
      "Açıkta gıda bırakmamaya ve kırıntıları düzenli temizlemeye devam edin.",
      "Hatlar devam ederse yer ve saat bilgisiyle bize ulaşın.",
    ],
    suitableFor: ["Daireler ve bahçeli evler", "Restoran ve kafeler", "Ofis mutfakları", "Okul ve yurt mutfakları", "Bahçe ve teraslar"],
    gallery: ["houseExterior", "restaurantKitchen", "livingRoom"],
    related: ["bocek-ilaclama", "bahce-ve-acik-alan-kontrolu", "ev-ilaclama", "restoran-ve-kafe-pest-kontrol"],
    faq: [
      { q: "Karıncaları sprey ile öldürmek neden yeterli olmuyor?", a: "Görünen karıncalar koloninin küçük bir kısmıdır. Yuva ve kraliçe etkilenmediği sürece koloni yeni bireylerle yollarını sürdürebilir." },
      { q: "Karıncalar komşudan veya bahçeden mi geliyor?", a: "Sıklıkla dış çevreden ya da duvar boşluklarından gelirler. Hat takibi ile giriş noktası belirlenir ve öneriler buna göre verilir." },
      { q: "Uygulamadan sonra ne zaman sonuç görülür?", a: "Yem yöntemlerinde etkinin koloniye yayılması zaman alabilir. Beklenen süre ve takip zamanı plan aşamasında paylaşılır." },
    ],
  },

  "sivrisinek-kontrolu": {
    slug: "sivrisinek-kontrolu",
    summary:
      "Sivrisinek kontrolü; durgun su kaynaklarının bulunup azaltılması, fiziksel bariyerler ve gerektiğinde açık alanlara yönelik mevsimsel uygulamalarla planlanır.",
    intro: [
      "Sivrisineklerin gelişimi suda başlar; saksı altlığı, tıkalı oluk, kullanılmayan kova veya rögar gibi küçük su birikintileri bile üreme alanı olabilir. Bu nedenle kalıcı sonuç için ilk adım, alandaki su kaynaklarının tek tek tespit edilmesidir.",
      "Bahçe, site ve açık alanlarda sivrisinek kontrolünü mevsime göre planlıyor; su kaynaklarının yönetimi, pencere ve kapı bariyerleri ve gerektiğinde dinlenme alanlarına yönelik uygulamaları birlikte ele alıyoruz.",
    ],
    symptoms: [
      { title: "Akşam ısırıkları", text: "Özellikle akşam ve gece saatlerinde balkon, bahçe veya yatak odasında artan ısırıklar." },
      { title: "Durgun su", text: "Saksı altlıkları, oluklar, süs havuzları veya rögarlarda bekleyen su." },
      { title: "Su yüzeyinde larva", text: "Durgun suyun yüzeyinde kıpırdayan küçük, ince canlılar." },
      { title: "Gölge alanlarda yoğunluk", text: "Sık bitki örtüsü, çit ve nemli köşelerde dinlenen sivrisinekler." },
    ],
    risks: [
      "Isırıklar kaşıntı, uyku düzensizliği ve açık alan kullanımında rahatsızlığa yol açabilir.",
      "Sivrisinekler bazı hastalıkların taşınmasında rol oynayabildiği için sağlık otoriteleri üreme alanlarının azaltılmasını önerir.",
      "Ortak alanlardaki su birikintileri tüm site sakinlerini etkileyebilir.",
      "Yalnızca uçan bireylere yönelik müdahale, yeni neslin sudan çıkmasını engellemez.",
    ],
    process: [
      { title: "Ön görüşme", text: "Isırık zamanları, alanın yapısı ve bilinen su kaynakları hakkında bilgi alınır." },
      { title: "Su kaynağı taraması", text: "Bahçe, çatı, oluk, rögar ve ortak alanlardaki birikintiler kontrol edilir." },
      { title: "Plan", text: "Kaynak azaltma listesi, bariyer önerileri ve gerekiyorsa uygulama takvimi paylaşılır." },
      { title: "Uygulama", text: "Kaldırılamayan su kaynakları ve dinlenme alanlarına etiket talimatlarına uygun uygulama yapılır." },
      { title: "Mevsimsel takip", text: "Sıcak dönem boyunca kaynaklar ve yoğunluk düzenli aralıklarla değerlendirilir." },
    ],
    methods: [
      { title: "Kaynak azaltma", text: "Boşaltılabilen su birikintilerinin kaldırılması, olukların açılması, kapların ters çevrilmesi." },
      { title: "Fiziksel bariyerler", text: "Pencere ve kapılarda sineklik kullanımı, rögar kapaklarının kapalı tutulması." },
      { title: "Larva aşamasına yönelik yöntem", text: "Boşaltılamayan su kaynaklarında gelişimi hedef alan, etikete uygun uygulama." },
      { title: "Dinlenme alanı uygulaması", text: "Gölge ve bitki örtüsü yoğun bölgelerde, mevsime göre planlanan alan uygulaması." },
    ],
    before: [
      "Saksı altlıklarını, kovaları ve su toplayan eşyaları boşaltın.",
      "Süs havuzu, balık ya da arı kovanı varsa ekibi önceden bilgilendirin.",
      "Bahçe kapısı, çatı ve rögar alanlarına erişim sağlayın.",
      "Çocukların ve evcil hayvanların uygulama sırasında açık alanda bulunmayacağı şekilde planlayın.",
    ],
    after: [
      "Açık alana dönüş zamanı için ekibin ve etiketin talimatlarına uyun.",
      "Haftada en az bir kez su toplayan kapları kontrol edip boşaltın.",
      "Sineklik ve kapı aralıklarını kontrol edin.",
      "Yağışlı dönemlerden sonra oluşan yeni birikintileri not edip paylaşın.",
    ],
    suitableFor: ["Bahçeli evler ve villalar", "Konut siteleri", "Otel ve tesis bahçeleri", "Restoran terasları", "Açık otopark ve peyzaj alanları"],
    gallery: ["gardenMask", "residentialSite", "houseExterior"],
    related: ["bahce-ve-acik-alan-kontrolu", "site-ilaclama", "kene-kontrolu", "otel-ilaclama"],
    faq: [
      { q: "Sivrisinek uygulaması yılın hangi döneminde yapılmalı?", a: "Sıcaklık arttıkça üreme hızlanır. Kaynak azaltmanın ilkbaharda başlaması, uygulama ihtiyacının ise sıcak dönem boyunca takip edilmesi önerilir." },
      { q: "Sadece bizim bahçeye uygulama yeterli olur mu?", a: "Sivrisinekler komşu alanlardan da gelebilir. Kendi alanınızdaki kaynakları azaltmak fark yaratır; site ölçeğinde planlama sonucu güçlendirir." },
      { q: "Süs havuzumuzdaki balıklar etkilenir mi?", a: "Havuz ve balık bilgisi ön görüşmede alınır; bu tür su kaynakları için yöntem buna göre seçilir veya alan uygulama dışında bırakılır." },
    ],
  },

  "kene-kontrolu": {
    slug: "kene-kontrolu",
    summary:
      "Kene kontrolü; bahçe, çim ve bitki örtüsü sınırlarındaki riskli alanların belirlenmesi, peyzaj düzenlemesi ve mevsime uygun alan uygulamasıyla riski azaltmaya yöneliktir.",
    intro: [
      "Keneler genellikle uzun otların, çalılıkların ve yaprak birikintilerinin bulunduğu, nemli ve gölgeli alanlarda yaşar. Bahçeli evler, site yeşil alanları ve ormana yakın yapılarda, özellikle ilkbahar ve yaz aylarında insanlar ve evcil hayvanlar için risk oluşturabilirler.",
      "Kene kontrolünde amaç, kenelerin yaşadığı mikro alanları azaltmak ve insanların sık kullandığı bölgelerle bu alanlar arasında bir tampon oluşturmaktır. Gerekli görülen bölgelere uygulama, peyzaj önerileriyle birlikte planlanır.",
    ],
    symptoms: [
      { title: "Evcil hayvanda kene", text: "Bahçeden dönen köpek veya kedide, özellikle kulak ve boyun çevresinde kene bulunması." },
      { title: "Uzun ot ve çalılık", text: "Bakımsız çim, çit dipleri ve yaprak yığınlarının bulunduğu alanlar." },
      { title: "Yaban hayatına yakınlık", text: "Orman, boş arazi veya sokak hayvanlarının sık geçtiği bölgelere komşu bahçeler." },
      { title: "Giysilerde kene", text: "Bahçe işleri veya yürüyüş sonrası giysi ya da ciltte kene fark edilmesi." },
    ],
    risks: [
      "Keneler bazı hastalıkların taşınmasında rol oynayabilir; sağlık otoriteleri kene tutunmasında hekime başvurulmasını önerir.",
      "Evcil hayvanlar keneyi bahçeden eve taşıyabilir.",
      "Çocuk oyun alanlarının bitki örtüsüne yakın olması maruziyeti artırabilir.",
      "Bakımsız sınır alanları her sezon tekrar eden bir risk kaynağı oluşturur.",
    ],
    process: [
      { title: "Ön görüşme", text: "Alanın büyüklüğü, evcil hayvan ve çocuk kullanımı ile görülme sıklığı öğrenilir." },
      { title: "Alan incelemesi", text: "Çim sınırları, çitler, yaprak birikintileri ve nemli gölge alanlar değerlendirilir." },
      { title: "Plan", text: "Peyzaj önerileri, uygulama bölgeleri ve sezon takvimi yazılı paylaşılır." },
      { title: "Uygulama", text: "Riskli bitki örtüsü sınırlarına, etiket talimatlarına uygun alan uygulaması yapılır." },
      { title: "Sezon takibi", text: "Aktif dönemde alan yeniden değerlendirilir; plan gerekirse güncellenir." },
    ],
    methods: [
      { title: "Peyzaj düzenlemesi", text: "Çimin kısa tutulması, yaprak ve dal birikintilerinin kaldırılması önerileri." },
      { title: "Tampon şerit", text: "Ağaçlık alan ile kullanım alanı arasında kuru, açık bir geçiş bölgesi oluşturulması." },
      { title: "Hedefli alan uygulaması", text: "Yalnızca kenenin barınabileceği sınır ve gölge alanlarına yönelik uygulama." },
      { title: "Evcil hayvan eşgüdümü", text: "Evcil hayvanların kene korumasının veteriner hekimle planlanması önerisi." },
    ],
    before: [
      "Çimi biçin ve yaprak, dal birikintilerini toplayın.",
      "Bahçe mobilyalarını, oyuncakları ve evcil hayvan eşyalarını kapalı alana alın.",
      "Uygulama sırasında evcil hayvanların ve çocukların bahçede olmamasını sağlayın.",
      "Sebze bahçesi, arı kovanı veya süs havuzu varsa önceden bildirin.",
    ],
    after: [
      "Bahçeye dönüş zamanı için ekibin ve etiketin talimatlarına uyun.",
      "Bahçe işlerinden sonra giysi ve cildinizi kontrol edin.",
      "Evcil hayvanlarınızı düzenli olarak kontrol edin ve veteriner önerilerini sürdürün.",
      "Ciltte tutunmuş kene fark ederseniz kendiniz koparmaya çalışmadan sağlık kuruluşuna başvurun.",
    ],
    suitableFor: ["Bahçeli evler ve villalar", "Site yeşil alanları", "Okul ve kreş bahçeleri", "Kamp ve piknik alanları", "Hayvan barınma alanları"],
    gallery: ["gardenMask", "dogScratching", "houseExterior"],
    related: ["bahce-ve-acik-alan-kontrolu", "pire-ilaclama", "sivrisinek-kontrolu", "site-ilaclama"],
    faq: [
      { q: "Kene uygulaması ev içinde de yapılır mı?", a: "Kenelerin çoğu açık alanda yaşar; bu nedenle odak bahçe ve bitki örtüsüdür. Ev içinde belirti varsa durum incelemede ayrıca değerlendirilir." },
      { q: "Bahçemde kene görmedim, yine de önlem almalı mıyım?", a: "Ormana veya boş araziye komşu, uzun otlu bahçelerde peyzaj düzenlemesi önleyici olarak faydalı olabilir. Uygulama ihtiyacı incelemeye göre belirlenir." },
      { q: "Ciltte kene görürsem ne yapmalıyım?", a: "Keneyi ezmeden ve koparmaya çalışmadan en yakın sağlık kuruluşuna başvurmanız önerilir. Sağlık Bakanlığı da bu konuda hekime başvurulmasını tavsiye eder." },
    ],
  },

  "gumus-bocegi-kontrolu": {
    slug: "gumus-bocegi-kontrolu",
    summary:
      "Gümüş böceği kontrolü; nemin kaynağının bulunması, saklanma noktalarına yönelik hedefli uygulama ve banyo, bodrum gibi alanlar için nem yönetimi önerileriyle planlanır.",
    intro: [
      "Gümüş böcekleri yüksek nem ve karanlık ortamları sever; banyo, çamaşır odası, bodrum ve kitap rafları en sık görüldükleri yerlerdir. Kâğıt, karton, nişastalı yüzeyler ve tekstil lifleriyle beslenebildikleri için arşiv ve depolama alanlarında da sorun yaratabilirler.",
      "Bu türde nem yönetimi kontrolün ayrılmaz bir parçasıdır. Uygulamayı nemin kaynağına yönelik önerilerle birlikte planlıyor, havalandırma ve sızıntı gibi yapısal nedenleri raporda açıkça belirtiyoruz.",
    ],
    symptoms: [
      { title: "Gece hareketlilik", text: "Banyo veya mutfak ışığı yakıldığında hızla kaçan, gümüş renkli, ince uzun böcekler." },
      { title: "Kâğıtta hasar", text: "Kitap, belge, duvar kâğıdı veya karton kutularda düzensiz yenik izleri." },
      { title: "Nemli köşeler", text: "Küf kokusu, terleyen duvarlar veya sızıntı izleri bulunan alanlar." },
      { title: "Pul kalıntıları", text: "Raf ve çekmece diplerinde ince, gümüşi pul ve deri kalıntıları." },
    ],
    risks: [
      "Kitap, belge ve arşiv malzemelerinde kalıcı hasar oluşturabilirler.",
      "Tekstil ve nişastalı yüzeylerde lekeler ve yenik izleri bırakabilirler.",
      "Varlıkları çoğu zaman gözden kaçan bir nem sorununa işaret eder.",
      "Nem kaynağı giderilmeden yapılan uygulamalar sorunun tekrarlamasına yol açabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Görülen alanlar, nem sorunları ve depolanan malzemeler hakkında bilgi alınır." },
      { title: "Nem ve saklanma incelemesi", text: "Banyo, bodrum, raf arkaları ve tesisat çevresi kontrol edilir." },
      { title: "Plan", text: "Uygulama noktaları ve nem kontrolü için öneriler yazılı paylaşılır." },
      { title: "Uygulama", text: "Çatlak, süpürgelik ve raf boşluklarına etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "Takip", text: "Aktivite izleme kartlarıyla değerlendirilir; nem önlemlerinin etkisi gözden geçirilir." },
    ],
    methods: [
      { title: "Nem yönetimi", text: "Havalandırma, sızıntı onarımı ve nem alma cihazı kullanımına yönelik öneriler." },
      { title: "Çatlak–yarık uygulaması", text: "Süpürgelik, derz ve raf boşlukları gibi saklanma noktalarına yönelik uygulama." },
      { title: "Depolama düzeni", text: "Karton kutular yerine kapalı plastik saklama kapları kullanılması önerisi." },
      { title: "İzleme kartları", text: "Yoğunluğun ve uygulama sonrası değişimin takip edilmesi." },
    ],
    before: [
      "Banyo ve bodrumdaki nem ya da sızıntı sorunlarını not edin.",
      "Raf diplerindeki karton kutu ve kâğıt yığınlarını mümkün olduğunca kaldırın.",
      "Süpürgelik ve raf arkalarına erişimi kolaylaştırın.",
      "Değerli kitap veya arşiv malzemesi varsa önceden bildirin.",
    ],
    after: [
      "Alana dönüş zamanı için ekibin ve etiketin talimatlarına uyun.",
      "Banyo ve bodrumları düzenli havalandırın.",
      "Önerilen sızıntı ve yalıtım düzeltmelerini planlayın.",
      "Kâğıt ve tekstil ürünlerini kuru, kapalı alanlarda saklayın.",
    ],
    suitableFor: ["Daireler ve evler", "Bodrum katları", "Arşiv ve kütüphaneler", "Otel banyoları", "Çamaşırhaneler"],
    gallery: ["basementStairs", "livingRoom", "inspection"],
    related: ["bodrum-ve-ortak-alan-kontrolu", "guve-kontrolu", "bocek-ilaclama", "ev-ilaclama"],
    faq: [
      { q: "Gümüş böceği insanlara zarar verir mi?", a: "Isırma veya sokma ile bilinen bir türü değildir; asıl sorun kâğıt ve tekstilde oluşturduğu hasar ile işaret ettiği nem problemidir." },
      { q: "Nem alma cihazı tek başına yeterli olur mu?", a: "Nemin azalması gümüş böcekleri için ortamı elverişsiz hâle getirir; ancak mevcut popülasyon için çoğu durumda hedefli uygulama da gerekir." },
      { q: "Yeni taşındığım evde gümüş böceği var, neden olabilir?", a: "Nemli bir yapı, uzun süre kapalı kalma veya taşınma kutularıyla gelmiş olabilirler. İncelemede kaynak birlikte değerlendirilir." },
    ],
  },

  "guve-kontrolu": {
    slug: "guve-kontrolu",
    summary:
      "Güve kontrolü; güvenin tekstil mi yoksa kuru gıda kaynaklı mı olduğunun tespiti, kaynağın bulunması, hedefli uygulama ve önleyici depolama önerileriyle planlanır.",
    intro: [
      "Evlerde görülen güveler iki ana gruba ayrılır: yün, kaşmir ve halı gibi doğal lifli tekstillere zarar veren elbise güveleri ile un, bakliyat ve kuru meyve gibi ürünlerde gelişen kiler güveleri. Hangisiyle karşı karşıya olduğunuz, nereye bakılacağını ve hangi yöntemin seçileceğini belirler.",
      "Uçan erişkinler sorunun yalnızca görünen kısmıdır; asıl hasarı larvalar verir. Bu nedenle kontrolde kaynağın bulunmasına, etkilenen ürünlerin ayıklanmasına ve depolama düzenine öncelik veriyoruz.",
    ],
    symptoms: [
      { title: "Tekstilde delikler", text: "Yün kazak, takım elbise veya halıda düzensiz, küçük delikler." },
      { title: "İpeksi ağlar", text: "Un, pirinç veya kuru gıda paketlerinde ağ ve topaklanma." },
      { title: "Uçan küçük güveler", text: "Akşamları mutfakta ya da dolap çevresinde dolaşan küçük, kahverengimsi güveler." },
      { title: "Larva ve kozalar", text: "Dolap köşelerinde, raf birleşimlerinde veya tavan köşelerinde küçük kılıflar." },
    ],
    risks: [
      "Doğal lifli giysi, halı ve döşemelerde kalıcı hasara neden olabilirler.",
      "Kuru gıdaları kullanılamaz hâle getirerek israfa yol açabilirler.",
      "Kaynak ürün atılmadığı sürece sorun tekrar edebilir.",
      "Gıda işletmelerinde stok kaybı ve denetim uygunsuzluğu oluşturabilirler.",
    ],
    process: [
      { title: "Ön görüşme", text: "Güvenin görüldüğü alan ve etkilenen ürünler hakkında bilgi alınır." },
      { title: "Tür ve kaynak tespiti", text: "Dolaplar, kiler, raflar ve depolanan tekstil incelenir." },
      { title: "Plan", text: "Ayıklanacak ürünler, uygulama noktaları ve izleme önerileri yazılı paylaşılır." },
      { title: "Uygulama", text: "Raf ve dolap boşluklarına etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "İzleme", text: "Feromon tuzaklarıyla erişkin aktivitesi takip edilerek sonuç değerlendirilir." },
    ],
    methods: [
      { title: "Kaynak ayıklama", text: "Etkilenmiş gıda ve tekstil ürünlerinin belirlenip uzaklaştırılması." },
      { title: "Feromon tuzakları", text: "Türe özgü tuzaklarla erişkin aktivitesinin izlenmesi; tek başına kontrol yöntemi değildir." },
      { title: "Depolama düzeni", text: "Kuru gıdaların ve sezonluk giysilerin hava almayan kaplarda saklanması." },
      { title: "Hedefli uygulama", text: "Dolap köşeleri, raf birleşimleri ve çatlaklar gibi gelişim noktalarına yönelik uygulama." },
    ],
    before: [
      "Kilerdeki açık paketleri kontrol edip etkilenenleri kapalı torbayla atın.",
      "Etkilenen giysileri ayırın; yıkanabilenleri etiketine uygun en yüksek ısıda yıkayın.",
      "Raf ve dolapları boşaltıp elektrik süpürgesiyle temizleyin.",
      "Uygulama yapılacak dolapların önünü açık bırakın.",
    ],
    after: [
      "Dolaplara eşyaları yerleştirmeden önce belirtilen süreyi bekleyin.",
      "Kuru gıdaları kapalı kaplara, sezonluk giysileri kapalı torbalara koyun.",
      "Tuzakları yerinden oynatmayın ve yakalanan güve sayısını gözlemleyin.",
      "Yeni delik veya ağ fark ederseniz bize bildirin.",
    ],
    suitableFor: ["Evler ve daireler", "Halı ve tekstil depoları", "Kuru gıda depoları", "Restoran kilerleri", "Otel çamaşırhaneleri"],
    gallery: ["livingRoom", "warehouse", "hotelRoom"],
    related: ["gumus-bocegi-kontrolu", "depo-ilaclama", "ev-ilaclama", "bocek-ilaclama"],
    faq: [
      { q: "Mutfaktaki güve ile dolaptaki güve aynı mı?", a: "Genellikle değildir. Mutfakta görülenler çoğunlukla kiler güvesi, dolapta tekstile zarar verenler elbise güvesidir; kontrol yöntemi buna göre seçilir." },
      { q: "Feromon tuzağı güveleri yok eder mi?", a: "Tuzaklar çoğunlukla erişkin erkek güveleri yakalar ve izleme amaçlıdır. Kaynağın ayıklanması ve depolama düzeni olmadan tek başına yeterli değildir." },
      { q: "Etkilenen giysileri atmam gerekir mi?", a: "Hasar düzeyine göre değişir. Yıkanabilen veya kuru temizlemeye verilebilen ürünler çoğu zaman kurtarılabilir." },
    ],
  },

  "akrep-kontrolu": {
    slug: "akrep-kontrolu",
    summary:
      "Akrep kontrolü; bahçeli ve kırsal yapılarda saklanma alanlarının azaltılması, giriş noktalarının kapatılması ve gerektiğinde çevre uygulamasıyla riski azaltmaya yöneliktir.",
    intro: [
      "Akrepler gündüzleri taş, odun yığını, moloz ve çatlak gibi serin ve karanlık yerlerde saklanır; geceleri beslenmek için dolaşır. İstanbul’un ormana ve kırsal alanlara yakın bölgelerindeki bahçeli evlerde, özellikle sıcak aylarda görülebilirler.",
      "Akrep kontrolünün temelini, yapı çevresindeki saklanma alanlarının azaltılması ve içeri giriş noktalarının kapatılması oluşturur. Uygulama gerekiyorsa yapının çevresine ve tespit edilen saklanma noktalarına yönelik planlanır.",
    ],
    symptoms: [
      { title: "Gece görülme", text: "Akşam saatlerinde duvar diplerinde, terasta veya bodrumda dolaşan akrepler." },
      { title: "Taş ve odun yığınları", text: "Yapıya yakın taş duvar, odunluk, moloz ve kiremit birikintileri." },
      { title: "Duvar çatlakları", text: "Dış cephe, temel ve bahçe duvarlarında açık çatlak ve boşluklar." },
      { title: "Kapı altı açıklıkları", text: "Fitili olmayan kapılar ve sineklik bulunmayan zemin kat pencereleri." },
    ],
    risks: [
      "Sokmaları ağrıya ve lokal reaksiyonlara neden olabilir; şikâyet durumunda hekime başvurulmalıdır.",
      "Çocuklar ve yaşlılar için daha fazla dikkat gerektirebilir.",
      "Ayakkabı, havlu ve yere bırakılan giysilerde saklanabilirler.",
      "Yapı çevresi düzenlenmedikçe her sıcak sezonda tekrar görülebilirler.",
    ],
    process: [
      { title: "Ön görüşme", text: "Görülme yeri, sıklığı ve yapının çevresi hakkında bilgi alınır." },
      { title: "Çevre incelemesi", text: "Bahçe, duvar dipleri, odunluk, bodrum ve giriş noktaları kontrol edilir." },
      { title: "Plan", text: "Saklanma alanlarını azaltma listesi, yapısal öneriler ve uygulama alanları paylaşılır." },
      { title: "Uygulama", text: "Yapı çevresine ve saklanma noktalarına etiket talimatlarına uygun uygulama yapılır." },
      { title: "Değerlendirme", text: "Sezon içinde görülme durumu takip edilir; öneriler gerekirse güncellenir." },
    ],
    methods: [
      { title: "Saklanma alanı azaltma", text: "Taş, odun ve moloz yığınlarının yapıdan uzaklaştırılması önerisi." },
      { title: "Giriş noktası kapatma", text: "Kapı fitili, sineklik ve çatlak dolgusu ile içeri girişin sınırlandırılması." },
      { title: "Yapışkan izleme kartları", text: "Bodrum ve duvar diplerinde aktivitenin takip edilmesi." },
      { title: "Çevre uygulaması", text: "Yapının dış çevresine ve tespit edilen saklanma noktalarına yönelik hedefli uygulama." },
    ],
    before: [
      "Yapıya bitişik taş, odun ve moloz yığınlarını mümkünse uzaklaştırın.",
      "Bahçe, bodrum ve depo alanlarına erişim sağlayın.",
      "Ev halkında çocuk, yaşlı veya evcil hayvan bulunup bulunmadığını bildirin.",
      "Akrep gördüğünüz noktaları not edin.",
    ],
    after: [
      "Alana dönüş zamanı için ekibin ve etiketin talimatlarına uyun.",
      "Ayakkabıları ve dışarıda bırakılan giysileri kullanmadan önce silkeleyin.",
      "Yatakları duvardan biraz uzak tutun, yatak örtülerinin yere değmemesine dikkat edin.",
      "Sokma durumunda vakit kaybetmeden sağlık kuruluşuna başvurun.",
    ],
    suitableFor: ["Bahçeli evler ve villalar", "Yazlık ve kırsal yapılar", "Ormana yakın siteler", "Depo ve barakalar", "Şantiye çevreleri"],
    gallery: ["houseExterior", "buildingExterior", "basementStairs"],
    related: ["bahce-ve-acik-alan-kontrolu", "bodrum-ve-ortak-alan-kontrolu", "kene-kontrolu", "ev-ilaclama"],
    faq: [
      { q: "İstanbul’da akrep görülür mü?", a: "Ormana, taşlık alanlara veya kırsala yakın bazı bölgelerde, özellikle sıcak aylarda görülebilir. Şehir merkezindeki apartmanlarda daha seyrektir." },
      { q: "Akrep sokarsa ne yapmalıyım?", a: "Sakin kalarak en yakın sağlık kuruluşuna başvurun. Özellikle çocuklarda ve yaşlılarda vakit kaybetmemek önemlidir." },
      { q: "Tek bir uygulama akrepleri uzak tutar mı?", a: "Uygulama yardımcıdır ancak saklanma alanları ve giriş noktaları düzenlenmezse yeni bireyler gelebilir. Bu nedenle yapısal öneriler planın ana parçasıdır." },
    ],
  },

  "ev-ilaclama": {
    slug: "ev-ilaclama",
    summary:
      "Ev ilaçlama; görülen zararlının türü, evin yapısı ve ev halkının düzeni dikkate alınarak hazırlık, hedefli uygulama ve sonrası bilgilendirmeyle planlanan bir hizmettir.",
    intro: [
      "Bir evde zararlı görülmesi çoğu zaman tek bir odayla sınırlı kalmaz; mutfak dolapları, banyo gider çevresi, balkon kapısı veya tesisat geçişleri gibi noktalar birbirine bağlıdır. Bu yüzden uygulamadan önce hangi canlıyla karşı karşıya olduğumuzu ve nereden geldiğini anlamaya çalışırız.",
      "Çocuklu, evcil hayvanlı veya hassasiyeti olan bireylerin yaşadığı evlerde plan, ev halkının günlük düzenine göre şekillenir. Hazırlık listesi, uygulama günü ve alana dönüş süresi önceden konuşulur; böylece süreç sürprizsiz ilerler.",
    ],
    symptoms: [
      { title: "Tekrarlayan görülme", text: "Aynı odada veya aynı saatlerde birkaç gün üst üste fark edilen böcek ya da iz." },
      { title: "Mutfakta ambalaj hasarı", text: "Kuru gıda paketlerinde delik, kırıntı birikimi veya dolap içinde küçük kalıntılar." },
      { title: "Islak alanlarda hareketlilik", text: "Banyo gideri, lavabo altı ve çamaşır makinesi çevresinde görülen canlılar." },
      { title: "Taşınma sonrası belirtiler", text: "Yeni taşınılan evde, önceki sakinlerden kalmış olabilecek zararlı izleri." },
    ],
    risks: [
      "Mutfak yüzeyleri ve saklanan gıdalarla temas ederek ev içi hijyeni bozabilirler.",
      "Bazı zararlılara bağlı kalıntılar hassas kişilerde rahatsızlık yaratabilir.",
      "Fark edilmeden geçen süre, popülasyonun evin başka bölümlerine yayılmasına yol açabilir.",
      "Kontrolsüz market ürünleriyle yapılan denemeler sorunu gizleyip uzatabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Görülen canlı, evin metrekaresi, ev halkı ve evcil hayvan bilgisi alınır." },
      { title: "Yerinde inceleme", text: "Mutfak, banyo, balkon kapıları ve tesisat geçişleri tek tek gözden geçirilir." },
      { title: "Plan ve hazırlık listesi", text: "Uygulanacak odalar, ev halkının dışarıda kalacağı süre ve hazırlık adımları paylaşılır." },
      { title: "Uygulama", text: "Saklanma noktalarına odaklanan, etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "Takip ve öneriler", text: "Sonuç takip ziyaretiyle değerlendirilir; tekrarı azaltacak ev içi öneriler sunulur." },
    ],
    methods: [
      { title: "Noktasal uygulama", text: "Açık yüzeyler yerine çatlak, dolap köşesi ve tesisat boşluğu gibi hedef noktalara yöneliktir." },
      { title: "İzleme tuzakları", text: "Hangi odada ne kadar aktivite olduğunu görmek ve sonucu ölçmek için yerleştirilir." },
      { title: "Yalıtım önerileri", text: "Gider kapakları, kapı altları ve kablo geçişleri için basit yapısal düzeltmeler." },
      { title: "Hijyen ve depolama", text: "Kuru gıdaların kapalı kaplarda saklanması ve atık düzeni gibi kalıcılığı artıran adımlar." },
    ],
    before: [
      "Uygulama yapılacak odalardaki açık gıdaları, tabak ve bardakları kapalı dolaplara kaldırın.",
      "Çocuk oyuncaklarını ve evcil hayvan eşyalarını uygulama alanından uzaklaştırın.",
      "Ev halkından hamile, bebek veya solunum hassasiyeti olan biri varsa ön görüşmede belirtin.",
      "Lavabo altı ve beyaz eşya çevresine ekibin ulaşabileceği alan bırakın.",
    ],
    after: [
      "Eve dönüş süresi için ekibin ve ürün etiketinin bilgilendirmesine uyun.",
      "Dönüşte odaları havalandırın, yalnızca ekibin belirttiği yüzeyleri silin.",
      "Hedefli uygulama yapılan köşe ve boşlukları birkaç gün temizlik maddesiyle silmeyin.",
      "Belirtiler azalmazsa veya artarsa tarih ve oda bilgisiyle bize bildirin.",
    ],
    suitableFor: ["Daireler", "Müstakil ve bahçeli evler", "Yeni taşınılan konutlar", "Uzun süre boş kalan evler", "Evcil hayvanlı haneler"],
    gallery: ["technicianHome", "livingRoom", "inspection"],
    related: ["bocek-ilaclama", "hamam-bocegi-ilaclama", "apartman-ve-bina-ilaclama", "tahta-kurusu-ilaclama"],
    faq: [
      { q: "Ev ilaçlaması kaç saat sürer?", a: "Evin büyüklüğüne, oda sayısına ve görülen zararlıya göre değişir. Uygulama süresi ile eve dönüş süresi inceleme sonrasında birlikte netleştirilir." },
      { q: "Evcil hayvanımı uygulama sırasında nerede tutmalıyım?", a: "Uygulama sırasında ve dönüş süresi dolana kadar hayvanın alanda bulunmaması önerilir. Akvaryum veya kafes hayvanı varsa ön görüşmede belirtmeniz planlamayı kolaylaştırır." },
      { q: "Sadece mutfağa uygulama yaptırmak yeterli olur mu?", a: "Sorun mutfakla sınırlıysa evet. Ancak banyo ve tesisat bağlantıları ortaksa inceleme sırasında bu alanların da plana alınması önerilebilir." },
    ],
  },

  "apartman-ve-bina-ilaclama": {
    slug: "apartman-ve-bina-ilaclama",
    summary:
      "Apartman ve bina ilaçlama; yönetim kararıyla başlayan, ortak alanlar, tesisat şaftları ve bodrumla birlikte daireleri de kapsayabilen, sakinleri önceden bilgilendiren bina ölçeğinde bir programdır.",
    intro: [
      "Apartmanlarda zararlılar çoğunlukla ortak tesisat şaftları, çöp odaları ve bodrum katları üzerinden daireler arasında dolaşır. Tek bir dairede yapılan uygulama kısa süreli rahatlama sağlasa bile kaynak ortak alanda kaldığında sorun kısa sürede geri dönebilir.",
      "Bu nedenle programı apartman yönetimiyle birlikte kurgularız: hangi ortak alanların ve kaç dairenin kapsama gireceği, uygulama günü ve sakinlerin nasıl bilgilendirileceği önceden belirlenir.",
    ],
    symptoms: [
      { title: "Birden fazla dairede şikâyet", text: "Farklı katlardaki sakinlerin benzer zamanlarda aynı zararlıyı bildirmesi." },
      { title: "Şaft çevresinde yoğunluk", text: "Banyo ve mutfak tesisat kapaklarının yakınında sık görülen böcekler." },
      { title: "Çöp odası ve bodrum izleri", text: "Ortak alanlarda dışkı, kemirme izi veya gece hareketliliği." },
      { title: "Merdiven boşluğunda görülme", text: "Kapı önleri ve merdiven köşelerinde ara ara rastlanan canlılar." },
    ],
    risks: [
      "Ortak tesisat üzerinden daireden daireye yayılım sürebilir.",
      "Çöp odası ve bodrum gibi alanlar kemirgenler için barınak oluşturabilir.",
      "Tek tek yapılan daire uygulamaları, zararlıyı komşu dairelere yönlendirebilir.",
      "Sakinler arasında şikâyet ve yönetimle iletişim sorunları artabilir.",
    ],
    process: [
      { title: "Yönetimle ön görüşme", text: "Bina yaşı, kat ve daire sayısı, şikâyet geçmişi ve yönetim kararı konuşulur." },
      { title: "Bina keşfi", text: "Bodrum, çöp odası, kazan dairesi, şaft kapakları ve merdiven boşlukları incelenir." },
      { title: "Kapsam ve duyuru", text: "Ortak alanlar ve katılacak daireler belirlenir; sakinler için bilgilendirme metni hazırlanır." },
      { title: "Koordineli uygulama", text: "Ortak alanlar ve daireler aynı plan içinde, etiket talimatlarına uygun şekilde ele alınır." },
      { title: "Takip ve yönetim notu", text: "Takip ziyaretinin bulguları ve yapısal öneriler yönetime yazılı olarak iletilir." },
    ],
    methods: [
      { title: "Şaft ve tesisat odaklı uygulama", text: "Daireleri birbirine bağlayan tesisat geçişlerine yönelik hedefli çalışma." },
      { title: "Ortak alan istasyonları", text: "Bodrum ve çöp odasında kilitli izleme istasyonlarıyla kemirgen aktivitesinin takibi." },
      { title: "Sakin bilgilendirmesi", text: "Hazırlık ve dönüş kurallarını anlatan kısa, anlaşılır duyuru metni." },
      { title: "Yapısal öneriler", text: "Şaft kapaklarının sızdırmazlığı, çöp odası düzeni ve kapı altı boşlukları için öneriler." },
    ],
    before: [
      "Yönetim kararını ve uygulama tarihini sakinlere en az birkaç gün önceden duyurun.",
      "Katılacak dairelerin listesini ve anahtar teslim düzenini netleştirin.",
      "Bodrum, kazan dairesi ve çöp odasının kapılarını uygulama günü açık bulundurun.",
      "Bina girişine ve ortak alanlara uyarı notu asılmasına izin verin.",
    ],
    after: [
      "Ortak alanlara dönüş süresi dolana kadar çocukların ve evcil hayvanların buralara girmemesini sağlayın.",
      "Bodrum ve çöp odasındaki istasyonların yerinin değiştirilmemesini sakinlere hatırlatın.",
      "Yeni şikâyetleri daire ve tarih bilgisiyle yönetim üzerinden toplayın.",
      "Takip ziyareti tarihini yeniden duyurun.",
    ],
    suitableFor: ["Apartmanlar", "Çok katlı konut binaları", "Karma kullanımlı binalar", "Kiralık daire blokları", "Eski yapılı binalar"],
    gallery: ["basementStairs", "apartments", "buildingExterior"],
    related: ["bodrum-ve-ortak-alan-kontrolu", "site-ilaclama", "hamam-bocegi-ilaclama", "fare-ve-kemirgen-kontrolu"],
    faq: [
      { q: "Tüm dairelerin katılması zorunlu mu?", a: "Zorunlu değildir, ancak şaftları ortak olan dairelerin katılımı arttıkça sonuç daha kalıcı olur. Katılmayan daireler planlamada ayrıca not edilir." },
      { q: "Daire sakinleri uygulama sırasında evde olmalı mı?", a: "Daire içi uygulamalarda bir yetişkinin kapıyı açması veya anahtar düzeni kurulması yeterlidir. Dönüş süresi duyuru metninde belirtilir." },
      { q: "Yönetime nasıl bir bilgi verilir?", a: "Uygulanan alanlar, bulgular ve önerilen yapısal düzeltmeler yazılı bir notla yönetime iletilir; bu not sakinlerle paylaşılabilir." },
    ],
  },

  "site-ilaclama": {
    slug: "site-ilaclama",
    summary:
      "Site ilaçlama; çok bloklu konut sitelerinde bloklar, ortak tesisler, peyzaj ve havuz çevresi için site yönetimiyle hazırlanan takvimli ve raporlanabilir bir programdır.",
    intro: [
      "Sitelerde zararlı riski tek bir binayla sınırlı değildir; bloklar, kapalı otoparklar, sosyal tesisler, çöp toplama noktaları ve geniş peyzaj alanları farklı canlılar için farklı yaşam alanları sunar. Her bölüm aynı yöntemle ele alındığında hem kaynak boşa harcanır hem de sorunlu noktalar gözden kaçabilir.",
      "Site yönetimiyle birlikte bölge bölge bir harita çıkarır, her bölüm için uygulama ve izleme sıklığını belirleriz. Ziyaretlerin ardından yönetimin sakinlere aktarabileceği, anlaşılır bir rapor hazırlanır.",
    ],
    symptoms: [
      { title: "Bloklar arası farklı şikâyetler", text: "Bir blokta hamam böceği, diğerinde fare gibi bölgeye göre değişen bildirimler." },
      { title: "Peyzajda sivrisinek ve kene", text: "Yeşil alan, çocuk parkı ve yürüyüş yollarında yaz aylarında artan şikâyetler." },
      { title: "Havuz ve süs havuzu çevresi", text: "Durgun su birikintileri ve sulama noktalarında larva veya uçan haşere yoğunluğu." },
      { title: "Çöp toplama alanlarında aktivite", text: "Konteyner çevresinde kemirgen izi, dağılmış atık ve gece hareketliliği." },
    ],
    risks: [
      "Ortak alanlardaki kaynaklar blokların tamamını etkileyebilir.",
      "Peyzaj alanlarındaki sivrisinek ve keneler sakinlerin açık alan kullanımını kısıtlayabilir.",
      "Plansız uygulamalar bazı bölgeleri sürekli dışarıda bırakabilir.",
      "Kayıt tutulmadığında yönetim, sakinlere yapılan çalışmayı açıklamakta zorlanabilir.",
    ],
    process: [
      { title: "Yönetim toplantısı", text: "Blok sayısı, ortak tesisler, peyzaj büyüklüğü ve geçmiş şikâyetler değerlendirilir." },
      { title: "Bölge haritası", text: "Bloklar, otoparklar, çöp noktaları, havuz çevresi ve yeşil alanlar ayrı bölgeler olarak işaretlenir." },
      { title: "Takvim", text: "Her bölge için uygulama ve izleme sıklığı, mevsimsel değişikliklerle birlikte planlanır." },
      { title: "Bölgesel uygulama", text: "Her alan kendi riskine göre, etiket talimatlarına uygun yöntemlerle ele alınır." },
      { title: "Yönetim raporu", text: "Ziyaret bulguları, istasyon kontrolleri ve öneriler yönetime düzenli raporlanır." },
    ],
    methods: [
      { title: "Bölge bazlı planlama", text: "İç mekân, ortak tesis ve açık alanların ayrı yöntem ve sıklıkla ele alınması." },
      { title: "Çevre istasyonları", text: "Blok çevresi ve çöp noktalarına kilitli kemirgen izleme istasyonları yerleştirilmesi." },
      { title: "Su birikintisi yönetimi", text: "Havuz çevresi, sulama ve drenaj noktalarında sivrisinek üremesini azaltmaya yönelik öneriler." },
      { title: "Raporlama", text: "Yönetimin sakinlerle paylaşabileceği, bölge bazlı bulgu ve öneri raporu." },
    ],
    before: [
      "Site yönetimi, uygulama takvimini sakinlere duyuru panosu veya mesaj grubu üzerinden iletsin.",
      "Peyzaj uygulaması yapılacak günlerde sulama programını ekiple birlikte planlayın.",
      "Havuz, çocuk parkı ve spor alanlarının geçici olarak kullanıma kapatılacağı saatleri belirleyin.",
      "Teknik personelin ekibe bodrum ve otopark erişimi sağlamasını organize edin.",
    ],
    after: [
      "Açık alanlara ve çocuk parkına dönüş süresi için ekibin bilgilendirmesine uyun.",
      "Çevre istasyonlarının bahçıvan veya temizlik ekibi tarafından yerinden oynatılmamasını sağlayın.",
      "Sakinlerden gelen yeni şikâyetleri blok ve konum bilgisiyle kayıt altına alın.",
      "Yönetim raporundaki yapısal önerileri bütçe planına dahil etmeyi değerlendirin.",
    ],
    suitableFor: ["Çok bloklu konut siteleri", "Havuzlu ve peyzajlı siteler", "Villa siteleri", "Rezidans kompleksleri", "Kapalı otoparklı yaşam alanları"],
    gallery: ["buildingExterior", "residentialSite", "gardenMask"],
    related: ["apartman-ve-bina-ilaclama", "bahce-ve-acik-alan-kontrolu", "sivrisinek-kontrolu", "periyodik-pest-management"],
    faq: [
      { q: "Sitede tüm bloklara aynı gün uygulama yapılır mı?", a: "Site büyüklüğüne göre değişir. Geniş sitelerde bloklar ve açık alanlar birkaç güne yayılabilir; takvim yönetimle birlikte belirlenir." },
      { q: "Havuz çevresinde uygulama nasıl planlanır?", a: "Havuz kullanımının olmadığı saatler tercih edilir. Öncelik durgun su kaynaklarının azaltılmasıdır; gerekli uygulamalar etiket talimatlarına uygun yapılır ve dönüş süresi duyurulur." },
      { q: "Yönetime verilen raporda neler yer alır?", a: "Ziyaret tarihleri, uygulanan bölgeler, istasyon kontrol sonuçları ve yönetimin değerlendirebileceği yapısal öneriler raporda bulunur." },
    ],
  },

  "ofis-ilaclama": {
    slug: "ofis-ilaclama",
    summary:
      "Ofis ilaçlama; çalışma düzenini aksatmamak için mesai dışında planlanan, mutfak ve kahve köşesi, kablo kanalları ve depo alanlarına odaklanan bir uygulamadır.",
    intro: [
      "Ofislerde zararlılar çoğu zaman mutfak, kahve köşesi ve masa altı atık kutuları çevresinde başlar; asma tavan, yükseltilmiş döşeme ve kablo kanalları ise saklanmaları için uygun boşluklar sunar. Çalışanların gün içinde fark ettiği tek bir böcek, bu gizli alanlarda daha geniş bir aktivitenin işareti olabilir.",
      "Uygulamaları akşam, hafta sonu veya ofisin en sakin olduğu saatlere planlarız. Böylece çalışanlar sabah işe döndüğünde dönüş süresi dolmuş, alan düzenli şekilde teslim edilmiş olur.",
    ],
    symptoms: [
      { title: "Kahve köşesinde böcek", text: "Kahve makinesi, su sebili ve buzdolabı arkasında görülen küçük böcekler." },
      { title: "Masa altında kırıntı ve iz", text: "Masada yemek yenen ofislerde çekmece ve kablo kutularında kalıntı veya dışkı." },
      { title: "Asma tavandan ses", text: "Mesai saatleri dışında tavan veya kablo kanallarından gelen tırmalama sesleri." },
      { title: "Arşiv odasında kemirme", text: "Karton kutularda, kâğıt dosyalarda veya kablo kılıflarında kemirme izleri." },
    ],
    risks: [
      "Çalışan memnuniyetini ve ziyaretçi izlenimini olumsuz etkileyebilir.",
      "Kemirgenler kablo ve veri hatlarına zarar vererek arızaya yol açabilir.",
      "Arşiv ve depo alanlarında belge ve malzeme kaybı yaşanabilir.",
      "Ortak mutfak alanlarında hijyen sorunları oluşabilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Ofisin büyüklüğü, çalışma saatleri, mutfak düzeni ve şikâyetler konuşulur." },
      { title: "Keşif", text: "Mutfak, kahve köşesi, kablo kanalları, asma tavan erişim noktaları ve arşiv incelenir." },
      { title: "Mesai dışı planlama", text: "Uygulama saati, dönüş süresi ve bina yönetimiyle koordinasyon belirlenir." },
      { title: "Uygulama", text: "Çalışma alanları ve teknik boşluklar etiket talimatlarına uygun şekilde ele alınır." },
      { title: "Teslim ve takip", text: "Ofis düzenli teslim edilir; gerekirse izleme ziyareti planlanır." },
    ],
    methods: [
      { title: "Hedefli mutfak uygulaması", text: "Beyaz eşya arkası, tezgâh altı ve tesisat geçişlerine noktasal çalışma." },
      { title: "Teknik boşluk kontrolü", text: "Kablo kanalı, yükseltilmiş döşeme ve asma tavan boşluklarının izlenmesi." },
      { title: "İzleme istasyonları", text: "Arşiv, depo ve sunucu odası çevresinde kemirgen aktivitesinin takibi." },
      { title: "Ofis içi alışkanlık önerileri", text: "Masada gıda saklamama, atık kutularının günlük boşaltılması gibi basit kurallar." },
    ],
    before: [
      "Çalışanlara masalarda açık gıda ve içecek bırakmamalarını hatırlatın.",
      "Mutfak ve kahve köşesindeki tezgâhları boşaltın, buzdolabındaki ortak gıdaları kapatın.",
      "Bina yönetiminden mesai dışı giriş ve asansör kullanımı için izin alın.",
      "Sunucu odası veya hassas ekipman alanlarını ön görüşmede belirtin.",
    ],
    after: [
      "Ofise dönüşte ekibin belirttiği süreye uyun ve alanı kısa süre havalandırın.",
      "Mutfak yüzeylerini kullanım öncesinde temizleyin; hedefli uygulama noktalarını silmeyin.",
      "İzleme istasyonlarının temizlik personeli tarafından kaldırılmamasını sağlayın.",
      "Çalışanlardan gelen yeni bildirimleri tek bir kişi üzerinden toplayın.",
    ],
    suitableFor: ["Açık ofisler", "Plaza katları", "Ortak çalışma alanları", "Çağrı merkezleri", "Arşivli kurumsal ofisler", "Eğitim ve danışmanlık merkezleri"],
    gallery: ["inspection", "office", "surfaceHygiene"],
    related: ["isyeri-ilaclama", "periyodik-pest-management", "fare-ve-kemirgen-kontrolu", "hamam-bocegi-ilaclama"],
    faq: [
      { q: "Ofis ilaçlaması mesai saatinde yapılabilir mi?", a: "Çalışma düzenini korumak için genellikle akşam veya hafta sonu tercih edilir. Zorunlu durumlarda yalnızca boş bölümlerde, dönüş süresi dikkate alınarak planlama yapılabilir." },
      { q: "Bilgisayar ve elektronik ekipmanlar etkilenir mi?", a: "Uygulama noktaları ekipmandan uzak, hedefli şekilde seçilir. Hassas cihazların bulunduğu alanlar keşif sırasında belirlenir ve yönteme yansıtılır." },
      { q: "Plaza katındaki ofis için bina yönetimiyle görüşmek gerekir mi?", a: "Evet, önerilir. Ortak şaftlar ve teknik katlar bina yönetiminin sorumluluğundadır; koordineli çalışma sonucun kalıcılığını artırır." },
    ],
  },

  "isyeri-ilaclama": {
    slug: "isyeri-ilaclama",
    summary:
      "İşyeri ilaçlama; mağaza, atölye ve ticari alanlarda müşteri trafiği, açılış-kapanış saatleri ve ürün teşhiri gözetilerek planlanan hedefli bir uygulamadır.",
    intro: [
      "Ticari alanlarda zararlı görülmesi yalnızca hijyen sorunu değildir; bir müşterinin vitrin önünde ya da raf arasında böcek görmesi işletmenin itibarını doğrudan etkileyebilir. Mağaza arkası depolar, mal kabul kapıları ve personel dinlenme alanları genellikle ilk kaynak noktalarıdır.",
      "Uygulamayı işletmenin kapalı olduğu saatlere ya da en sakin zamanına yerleştiririz. Satış alanı, depo ve personel alanları ayrı ayrı değerlendirilir; ürün teşhiri olan bölümlerde yöntem buna göre seçilir.",
    ],
    symptoms: [
      { title: "Mal kabul alanında iz", text: "Gelen kolilerin açıldığı bölümde böcek, dışkı veya kemirilmiş ambalaj." },
      { title: "Raf arkalarında aktivite", text: "Teşhir raflarının arkası ve altında biriken toz, kırıntı ve canlı izleri." },
      { title: "Personel mutfağında böcek", text: "Çay ocağı, lavabo ve küçük buzdolabı çevresinde görülen hareketlilik." },
      { title: "Müşteri veya personel bildirimi", text: "Satış alanında zararlı görüldüğüne dair bir şikâyetin ilk kez gelmesi." },
    ],
    risks: [
      "Müşterilerin gözü önünde görülen zararlılar işletme itibarını zedeleyebilir.",
      "Stoktaki ürünler ve ambalajlar zarar görerek satılamaz hâle gelebilir.",
      "Gelen sevkiyatlarla taşınan zararlılar fark edilmeden yerleşebilir.",
      "Denetimlerde hijyen uygunsuzluğu olarak kayda geçebilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "İşletmenin türü, çalışma saatleri, depo düzeni ve görülen zararlı konuşulur." },
      { title: "Keşif", text: "Satış alanı, depo, mal kabul kapısı ve personel bölümleri incelenir." },
      { title: "Zamanlama", text: "Kapanış sonrası veya açılış öncesi bir uygulama saati belirlenir." },
      { title: "Uygulama", text: "Bölümlere göre ayrılmış, etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "Takip", text: "Sonuç takip ziyaretiyle değerlendirilir; gerekirse periyodik programa geçilir." },
    ],
    methods: [
      { title: "Bölümlü uygulama", text: "Satış alanı, depo ve personel alanları için ayrı yöntem ve yoğunluk belirlenmesi." },
      { title: "Mal kabul kontrolü", text: "Gelen kolilerin açılmadan önce gözle kontrol edilmesine yönelik basit bir düzen önerisi." },
      { title: "İzleme istasyonları", text: "Depo ve arka kapı çevresinde kemirgen ve sürünen böcek aktivitesinin takibi." },
      { title: "Yapısal öneriler", text: "Arka kapı altı boşlukları, tesisat geçişleri ve atık alanı düzeni için öneriler." },
    ],
    before: [
      "Teşhirdeki açık gıda ürünlerini ve test ürünlerini kapalı alana kaldırın.",
      "Depodaki kolileri duvardan biraz uzaklaştırarak ekibe erişim alanı bırakın.",
      "Alışveriş merkezi içindeyseniz yönetimden mesai dışı çalışma izni alın.",
      "Personelin uygulama saatinde alanda bulunmayacağı şekilde vardiyayı düzenleyin.",
    ],
    after: [
      "Açılış öncesinde dönüş süresine uyun ve alanı havalandırın.",
      "Müşteriyle temas eden tezgâh ve kasa yüzeylerini kullanım öncesinde silin.",
      "İstasyonların raf düzenlemesi sırasında yer değiştirmemesine dikkat edin.",
      "Yeni gelen sevkiyatlarda iz görürseniz fotoğraflayıp bize iletin.",
    ],
    suitableFor: ["Mağazalar ve butikler", "Atölyeler", "Showroomlar", "Market ve bakkallar", "Kuaför ve güzellik salonları", "Alışveriş merkezi birimleri"],
    gallery: ["inspection", "buildingExterior", "surfaceHygiene"],
    related: ["ofis-ilaclama", "depo-ilaclama", "periyodik-pest-management", "bocek-ilaclama"],
    faq: [
      { q: "Mağazayı kapatmadan uygulama yapılabilir mi?", a: "Genellikle kapanış sonrası veya açılış öncesi tercih edilir. Satışın sürmesi gereken durumlarda depo ve personel alanları önce ele alınabilir; satış alanı ayrı bir zamana planlanır." },
      { q: "Ürünlerimi uygulama sırasında kaldırmam gerekir mi?", a: "Açık gıda ve ambalajsız ürünlerin kaldırılması önerilir. Ambalajlı ürünler için hangi rafların örtüleceği keşif sırasında belirlenir." },
      { q: "Tek seferlik uygulama mı, periyodik program mı?", a: "Sorun ilk kez görülüyorsa tek uygulama ve takip ziyareti yeterli olabilir. Sık mal kabulü olan işletmelerde periyodik izleme daha dengeli bir sonuç verir." },
    ],
  },

  "bahce-ve-acik-alan-kontrolu": {
    slug: "bahce-ve-acik-alan-kontrolu",
    summary:
      "Bahçe ve açık alan kontrolü; sivrisinek, kene ve karınca gibi canlıların üreme ve saklanma alanlarını azaltmayı, gerektiğinde mevsime uygun hedefli uygulamayla birleştiren bir programdır.",
    intro: [
      "Bahçe, teras ve peyzaj alanlarında zararlılarla mücadele iç mekândan farklıdır; uzun çimler, yaprak birikintileri, saksı altlıkları ve sulama sırasında oluşan su birikintileri üreme alanlarını belirler. Bu alanlar düzenlenmeden yapılan uygulamalar çoğu zaman kısa süreli etki gösterir.",
      "Önce bahçenin kullanım biçimini öğreniriz: çocuk oyun alanı, evcil hayvanların dolaştığı bölüm, sebze bahçesi veya havuz çevresi. Uygulama alanları ve zamanlama, bu kullanım bölgeleri ile faydalı canlılar dikkate alınarak belirlenir.",
    ],
    symptoms: [
      { title: "Akşam saatlerinde sivrisinek", text: "Gün batımından sonra teras ve bahçe oturma alanlarında artan ısırıklar." },
      { title: "Evcil hayvanda kene", text: "Bahçede dolaşan köpek veya kedinin tüylerinde tutunmuş keneler." },
      { title: "Karınca yolları", text: "Bahçeden eve doğru uzanan, kapı eşiği ve teras kenarında belirgin karınca hatları." },
      { title: "Su birikintileri", text: "Saksı altlıkları, kova, oluk ve süs havuzlarında durgun kalan su." },
    ],
    risks: [
      "Sivrisinek ve kene ısırıkları kaşıntıya yol açabilir; bazı türler hastalık taşınmasında rol oynayabilir.",
      "Bahçede çoğalan karıncalar mutfağa ve yaşam alanlarına yönelebilir.",
      "Açık alanın kullanımı özellikle yaz aylarında kısıtlanabilir.",
      "Bilinçsiz uygulamalar faydalı böceklere ve bitkilere zarar verebilir.",
    ],
    process: [
      { title: "Ön görüşme", text: "Bahçenin büyüklüğü, kullanım bölgeleri, evcil hayvan ve sulama düzeni öğrenilir." },
      { title: "Alan incelemesi", text: "Çalılık, çim kenarı, su birikintisi, kapı eşiği ve duvar dipleri kontrol edilir." },
      { title: "Kaynak azaltma planı", text: "Yaprak temizliği, budama ve su birikintisi yönetimi gibi öncelikli adımlar belirlenir." },
      { title: "Hedefli uygulama", text: "Gerekli bölgelerde, bitki ve kullanım alanları gözetilerek etiket talimatlarına uygun uygulama yapılır." },
      { title: "Mevsimsel takip", text: "Sıcak aylarda aktivite takip ziyaretleriyle değerlendirilir, plan güncellenir." },
    ],
    methods: [
      { title: "Su birikintisi yönetimi", text: "Sivrisinek üremesini azaltmak için durgun su kaynaklarının boşaltılması ve kapatılması." },
      { title: "Peyzaj düzenleme önerileri", text: "Çim boyu, yaprak birikintisi ve çalı sıklığına yönelik bakım önerileri." },
      { title: "Bariyer bölgeleri", text: "Ev girişi ve teras kenarı gibi geçiş hatlarına odaklanan sınırlı uygulama." },
      { title: "İzleme", text: "Karınca yolları ve kene riskli bölgelerin ziyaretlerde gözle takibi." },
    ],
    before: [
      "Uygulama alanındaki oyuncakları, minderleri ve evcil hayvan kaplarını kaldırın.",
      "Çimi biçin, yaprak birikintilerini ve dökülen meyveleri toplayın.",
      "Sebze bahçesi veya hasat yakın bölgeler varsa ön görüşmede belirtin.",
      "Uygulama gününden önce ve sonra sulama programını ekiple birlikte planlayın.",
    ],
    after: [
      "Bahçeye dönüş süresi dolana kadar çocukları ve evcil hayvanları alandan uzak tutun.",
      "Saksı altlıklarını ve su biriken kapları düzenli boşaltmaya devam edin.",
      "Evcil hayvanların tüylerini bahçe dönüşünde kene açısından kontrol edin.",
      "Rüzgârlı veya yağmurlu günlerden sonra yeniden aktivite görülürse bize bildirin.",
    ],
    suitableFor: ["Bahçeli müstakil evler", "Villa bahçeleri", "Teras ve çatı bahçeleri", "Site peyzaj alanları", "Kafe ve restoran bahçeleri"],
    gallery: ["gardenMask", "houseExterior", "mosquito"],
    related: ["sivrisinek-kontrolu", "kene-kontrolu", "karinca-ilaclama", "site-ilaclama"],
    faq: [
      { q: "Bahçe uygulaması en uygun hangi mevsimde yapılır?", a: "Sivrisinek ve kene aktivitesi genellikle ilkbahar sonundan sonbahara kadar artar. Sezon başında yapılan kaynak azaltma çalışmaları, sonraki uygulamaların ihtiyacını azaltabilir." },
      { q: "Bitkilerim ve meyve ağaçlarım etkilenir mi?", a: "Uygulama alanları bitki türü ve hasat zamanı dikkate alınarak seçilir. Sebze bahçesi ve meyve ağaçları için ayrı bir plan yapılır, gerekirse bu bölgeler kapsam dışında tutulur." },
      { q: "Arılar ve faydalı böcekler için ne yapılıyor?", a: "Çiçeklenme dönemindeki bitkiler ve arıların yoğun olduğu saatler uygulama planında dikkate alınır. Öncelik her zaman kaynak azaltma ve hedefli çalışmadır." },
    ],
  },

  "bodrum-ve-ortak-alan-kontrolu": {
    slug: "bodrum-ve-ortak-alan-kontrolu",
    summary:
      "Bodrum ve ortak alan kontrolü; bodrum, kazan dairesi, çöp odası, sığınak ve otoparklarda zararlıların kaynağını bulmaya, izleme istasyonları ve yapısal önerilerle kontrol altında tutmaya yönelik bir hizmettir.",
    intro: [
      "Binaların bodrum ve teknik katları nem, karanlık ve az kullanım nedeniyle zararlılar için uygun barınaklar oluşturur. Kazan dairesi sıcaklığı, çöp odası atıkları ve kanalizasyon bağlantıları bu alanları kemirgen, hamam böceği ve pire için başlangıç noktası hâline getirebilir.",
      "Bu nedenle ortak alanları dairelerden ayrı bir öncelik olarak ele alırız. Kaynak noktaları haritalanır, kilitli istasyonlarla aktivite izlenir ve bina yönetimine yapısal düzeltmeler için somut öneriler sunulur.",
    ],
    symptoms: [
      { title: "Çöp odasında kemirme", text: "Çöp poşetlerinde yırtık, konteyner çevresinde dağılmış atık ve dışkı." },
      { title: "Nemli duvar ve rutubet", text: "Bodrum duvarlarında küf, su sızıntısı ve nemli köşelerde biriken canlılar." },
      { title: "Depo bölmelerinde iz", text: "Sakinlerin eşya depolarında kemirilmiş karton, kumaş veya ahşap." },
      { title: "Gider ve rögar çevresi", text: "Yer süzgeçleri ve rögar kapakları etrafında yoğunlaşan böcekler." },
    ],
    risks: [
      "Bodrumda yerleşen kemirgenler ve böcekler tesisat üzerinden dairelere ulaşabilir.",
      "Sakinlerin depoladığı eşyalar zarar görebilir.",
      "Kablo ve tesisat yalıtımlarında kemirme hasarı oluşabilir.",
      "Ortak alan kullanımı hijyen açısından rahatsız edici hâle gelebilir.",
    ],
    process: [
      { title: "Yönetimle görüşme", text: "Ortak alanların listesi, erişim anahtarları ve geçmiş şikâyetler toplanır." },
      { title: "Kaynak haritası", text: "Giriş noktaları, nem kaynakları, atık alanları ve rögarlar işaretlenir." },
      { title: "İstasyon yerleşimi", text: "Kilitli izleme istasyonlarının yerleri ve numaraları belirlenir." },
      { title: "Hedefli uygulama", text: "Kaynak noktalarına, etiket talimatlarına uygun şekilde uygulama yapılır." },
      { title: "İzleme ve öneri", text: "İstasyon kontrolleri kayda geçirilir; yapısal düzeltmeler yönetime iletilir." },
    ],
    methods: [
      { title: "Kilitli istasyonlar", text: "Çocuk ve evcil hayvan erişimini sınırlayan, numaralı ve haritalı istasyonlar." },
      { title: "Nem ve atık yönetimi", text: "Sızıntıların giderilmesi, havalandırma ve çöp odası düzeni için öneriler." },
      { title: "Giriş noktası tespiti", text: "Rögar, havalandırma menfezi ve kapı altı boşluklarının kontrolü." },
      { title: "Ziyaret kayıtları", text: "Her kontrolde istasyon durumunun ve bulguların yazılı olarak tutulması." },
    ],
    before: [
      "Bodrum, kazan dairesi ve sığınak anahtarlarının uygulama günü hazır olmasını sağlayın.",
      "Koridorlarda biriken atık, kullanılmayan eşya ve kartonları mümkün olduğunca kaldırın.",
      "Sakinlerin depo bölmelerine erişim gerekiyorsa önceden haber verin.",
      "Bilinen su sızıntısı veya rutubet noktalarını ekiple paylaşın.",
    ],
    after: [
      "İstasyonların yerini değiştirmeyin ve sakinlere bu konuda bilgi verin.",
      "Çöp odasının kapısının kapalı tutulmasına ve atıkların düzenli toplanmasına dikkat edin.",
      "Önerilen nem ve yalıtım düzeltmelerini yönetim planına alın.",
      "Yeni iz görülürse alan ve tarihle birlikte bize iletin.",
    ],
    suitableFor: ["Apartman bodrumları", "Kazan daireleri", "Çöp odaları", "Kapalı otoparklar", "Sığınak ve depo katları", "Site teknik alanları"],
    gallery: ["basementLaundry", "basementStairs", "rat"],
    related: ["apartman-ve-bina-ilaclama", "fare-ve-kemirgen-kontrolu", "pire-ilaclama", "gumus-bocegi-kontrolu"],
    faq: [
      { q: "Sadece bodrum için uygulama yaptırmak işe yarar mı?", a: "Kaynak bodrumdaysa dairelerdeki şikâyetlerin azalmasında önemli bir adımdır. Daireler de etkilenmişse ortak alanla birlikte daire uygulamaları planlanabilir." },
      { q: "İstasyonlar ne kadar süre bodrumda kalır?", a: "İzleme amacıyla yerleştirildikleri için aktivite azalsa bile bir süre yerinde tutulmaları önerilir. Süre ziyaret bulgularına göre yönetimle birlikte belirlenir." },
      { q: "Rutubet zararlı sorununu etkiler mi?", a: "Evet. Nemli ortamlar birçok böcek türü için çekicidir. Rutubetin azaltılması, uygulamanın etkisini daha uzun süre korumaya yardımcı olur." },
    ],
  },

  "restoran-ve-kafe-pest-kontrol": {
    slug: "restoran-ve-kafe-pest-kontrol",
    summary:
      "Restoran ve kafe pest kontrol; mutfak, depo, servis ve atık alanlarını kapsayan, istasyon haritası ve ziyaret kayıtlarıyla gıda güvenliği denetim gerekliliklerine uygun kayıt düzeni oluşturan periyodik bir programdır.",
    intro: [
      "Gıda işletmelerinde zararlı kontrolü, tek seferlik bir uygulamadan çok sürekli bir yönetim işidir. Mal kabulünde gelen koliler, sıcak mutfak ekipmanlarının arkası, kuru gıda depoları ve atık alanı birbirinden farklı riskler taşır ve her biri ayrı izlenmelidir.",
      "Programı işletmenin servis saatlerine göre kurgular, ziyaretleri kapanış sonrası veya açılış öncesine yerleştiririz. Her ziyaretin bulguları kayıt dosyasına işlenir; böylece işletme, tabi olduğu denetimlerde yapılan çalışmayı belgeleyebilir.",
    ],
    symptoms: [
      { title: "Dışkı izi", text: "Kuru gıda rafları, ekipman altları ve dolap köşelerinde küçük koyu kalıntılar." },
      { title: "Ambalaj hasarı", text: "Un, bakliyat veya şeker çuvallarında delik, kemirme ya da dökülme." },
      { title: "Denetim bulgusu", text: "İç veya dış denetimde zararlı kontrolüyle ilgili eksik kayıt ya da uygunsuzluk notu." },
      { title: "Servis alanında görülme", text: "Misafirlerin veya personelin salonda böcek ya da kemirgen fark etmesi." },
    ],
    risks: [
      "Gıdalar ve hazırlık yüzeyleri kirlenerek gıda güvenliği riski oluşabilir.",
      "Denetimlerde uygunsuzluk ve faaliyetle ilgili yaptırımlar gündeme gelebilir.",
      "Misafir şikâyetleri ve çevrim içi yorumlar itibarı zedeleyebilir.",
      "Stok kaybı ve ekipman arızası nedeniyle maliyet artabilir.",
    ],
    process: [
      { title: "Risk keşfi", text: "Mal kabul, depo, sıcak ve soğuk mutfak, bulaşıkhane, salon ve atık alanı incelenir." },
      { title: "İstasyon haritası", text: "İzleme istasyonları numaralandırılır ve işletme planı üzerinde işaretlenir." },
      { title: "Ziyaret takvimi", text: "Risk seviyesine göre ziyaret sıklığı ve servis saatlerine uygun zamanlama belirlenir." },
      { title: "Uygulama ve kontrol", text: "Bulgu olan noktalara etiket talimatlarına uygun hedefli uygulama yapılır, istasyonlar kontrol edilir." },
      { title: "Kayıt ve rapor", text: "Her ziyaretin tarihi, bulguları ve düzeltici öneriler kayıt dosyasına işlenir." },
    ],
    methods: [
      { title: "İzleme istasyonları", text: "Kemirgen ve sürünen böcekler için gıdadan ayrı, kilitli ve numaralı istasyonlar." },
      { title: "Uçan haşere izleme", text: "Hazırlık alanı dışına, gıdaya temas etmeyecek şekilde yerleştirilen izleme düzenekleri." },
      { title: "Kayıt dosyası", text: "İstasyon haritası, ziyaret raporları, bulgu takibi ve düzeltici faaliyet notları." },
      { title: "Personel ve yapı önerileri", text: "Mal kabul kontrolü, atık düzeni, kapı sızdırmazlığı ve temizlik planına yönelik öneriler." },
    ],
    before: [
      "Ziyaret saatini servis bitişine göre ekiple birlikte belirleyin.",
      "Açık gıdaları kapalı kaplara alın, hazırlık yüzeylerini boşaltın.",
      "Ekipman arkalarına ve depo raflarının altına erişim alanı bırakın.",
      "Varsa önceki denetim raporlarını ve kayıt dosyasını ekiple paylaşın.",
    ],
    after: [
      "Hazırlık yüzeylerini ve ekipmanları kullanım öncesinde işletmenin temizlik prosedürüne göre temizleyin.",
      "İstasyonları yerinden oynatmayın; temizlik sırasında hasar görenleri bize bildirin.",
      "Ziyaret raporlarını kayıt dosyasında güncel ve erişilebilir tutun.",
      "Raporda belirtilen düzeltici önerileri bir sonraki ziyarete kadar tamamlamaya çalışın.",
    ],
    suitableFor: ["Restoranlar", "Kafeler", "Pastane ve fırınlar", "Merkezi mutfaklar", "Catering işletmeleri", "Bar ve lokantalar"],
    gallery: ["inspection", "restaurantKitchen", "cockroachFloor"],
    related: ["entegre-zararli-yonetimi", "periyodik-pest-management", "hamam-bocegi-ilaclama", "fare-ve-kemirgen-kontrolu"],
    faq: [
      { q: "Restoranlarda ziyaret sıklığı nasıl belirlenir?", a: "İşletmenin büyüklüğü, mal kabul yoğunluğu, bina yapısı ve geçmiş bulgular birlikte değerlendirilir. Sıklık ilk keşif sonrası önerilir ve bulgulara göre güncellenebilir." },
      { q: "Kayıt dosyasında neler bulunur?", a: "İstasyon haritası, ziyaret raporları, bulgu takip çizelgesi, düzeltici öneriler ve kullanılan uygulamalara ilişkin genel bilgiler yer alır. İçerik işletmenin tabi olduğu denetimlerin beklentilerine göre düzenlenir." },
      { q: "Servis sırasında ziyaret yapılır mı?", a: "Gıda hazırlığını ve misafir deneyimini etkilememek için ziyaretler genellikle servis dışı saatlere planlanır. Acil bir bulguda müdahale zamanı işletmeyle birlikte belirlenir." },
    ],
  },

  "otel-ilaclama": {
    slug: "otel-ilaclama",
    summary:
      "Otel ilaçlama; misafir odaları, mutfak, çamaşırhane ve teknik alanları ayrı bölümler olarak ele alan, oda bazlı tahta kurusu protokolü ve misafir mahremiyetine uygun zamanlamayla yürütülen bir programdır.",
    intro: [
      "Otellerde zararlı riski, misafir trafiği ve bavullarla taşınan canlılar nedeniyle sürekli değişir. Bir odada tahta kurusu fark edilmesi, mutfakta hamam böceği görülmesi ya da çamaşırhanede güve izine rastlanması farklı bölümlerin farklı yöntemlerle izlenmesini gerektirir.",
      "Programı oda doluluk takvimi ve kat hizmetleri düzeniyle birlikte planlarız. Uygulama yapılan odalar rezervasyon sisteminde geçici olarak bloke edilir; ekibimiz misafir alanlarında görünürlüğü düşük tutacak şekilde çalışır.",
    ],
    symptoms: [
      { title: "Misafir şikâyeti", text: "Isırık veya yatakta böcek görüldüğüne dair bir misafir bildirimi." },
      { title: "Çarşaf ve yatak izleri", text: "Kat görevlilerinin çarşaf değişiminde fark ettiği küçük koyu lekeler." },
      { title: "Çamaşırhanede iz", text: "Tekstil depolarında güve, nemli köşelerde böcek veya kemirgen aktivitesi." },
      { title: "Mutfak ve oda servisi alanları", text: "Kat ofisleri ve servis asansörü çevresinde görülen böcekler." },
    ],
    risks: [
      "Tahta kurusu vakaları misafir memnuniyetini ve çevrim içi değerlendirmeleri olumsuz etkileyebilir.",
      "Etkilenen odaların satış dışı kalması gelir kaybına yol açabilir.",
      "Çamaşırhane ve tekstil depoları üzerinden zararlılar odalara taşınabilir.",
      "Mutfak ve restoran bölümleri gıda güvenliği denetimlerinde uygunsuzlukla karşılaşabilir.",
    ],
    process: [
      { title: "Bölüm keşfi", text: "Misafir katları, mutfak, restoran, çamaşırhane, personel alanları ve teknik katlar incelenir." },
      { title: "Bölümlere ayrılmış plan", text: "Her bölüm için yöntem, ziyaret sıklığı ve sorumlu kişi belirlenir." },
      { title: "Oda bazlı protokol", text: "Tahta kurusu bildiriminde etkilenen oda ve bitişik odalar için inceleme ve uygulama adımları tanımlanır." },
      { title: "Uygulama", text: "Odalar doluluk takvimine göre, ortak alanlar düşük trafik saatlerinde etiket talimatlarına uygun şekilde ele alınır." },
      { title: "Kayıt ve geri bildirim", text: "Oda numarası bazında bulgular kaydedilir; kat hizmetleri ekibine geri bildirim verilir." },
    ],
    methods: [
      { title: "Oda bazlı tahta kurusu protokolü", text: "Bildirim gelen odanın bloke edilmesi, detaylı inceleme ve bitişik odaların kontrolü." },
      { title: "Kat hizmetleri farkındalığı", text: "Kat görevlilerinin çarşaf değişiminde dikkat edeceği belirtiler için kısa bilgilendirme." },
      { title: "Tekstil akışı kontrolü", text: "Kirli ve temiz çamaşırın taşınma ve depolanma düzenine yönelik öneriler." },
      { title: "Bölümlü izleme", text: "Mutfak, depo ve teknik alanlarda istasyonlarla sürekli aktivite takibi." },
    ],
    before: [
      "Uygulama yapılacak odaları rezervasyon sisteminde belirtilen süre boyunca satışa kapatın.",
      "Kat hizmetleri ekibiyle oda tekstilinin ayrı torbalarda çamaşırhaneye taşınmasını planlayın.",
      "Misafir şikâyeti varsa oda numarasını, tarihi ve bildirim içeriğini ekiple paylaşın.",
      "Mutfak ve restoran bölümleri için servis dışı bir zaman aralığı belirleyin.",
    ],
    after: [
      "Odaları ekibin belirttiği dönüş süresi ve havalandırma sonrası satışa açın.",
      "Takip ziyareti tamamlanana kadar etkilenen odanın mobilyalarını başka odalara taşımayın.",
      "Kat görevlilerinden gelen yeni gözlemleri oda numarasıyla kayda geçirin.",
      "Bitişik odalarda yapılan kontrol sonuçlarını önbüro ile paylaşın.",
    ],
    suitableFor: ["Şehir otelleri", "Butik oteller", "Apart oteller", "Pansiyon ve konukevleri", "Hosteller", "Kongre ve tatil tesisleri"],
    gallery: ["bedBug", "hotelRoom", "basementLaundry"],
    related: ["tahta-kurusu-ilaclama", "restoran-ve-kafe-pest-kontrol", "periyodik-pest-management", "guve-kontrolu"],
    faq: [
      { q: "Bir odada tahta kurusu bulunduğunda tüm katı kapatmak gerekir mi?", a: "Çoğu durumda gerekmez. Etkilenen oda ve bitişik odalar öncelikli olarak incelenir; kapsamın genişletilmesi bu bulgulara göre karar verilir." },
      { q: "Misafirler ilaçlama yapıldığını fark eder mi?", a: "Odalar boşken çalışılır ve ortak alanlar düşük trafik saatlerine planlanır. Ekip, misafir mahremiyetini koruyacak şekilde servis koridorlarını tercih eder." },
      { q: "Oda ne zaman yeniden satışa açılabilir?", a: "Uygulama yöntemine ve dönüş süresine bağlıdır. Tahta kurusu vakalarında takip ziyareti sonuçları da değerlendirilerek karar verilir." },
    ],
  },

  "depo-ilaclama": {
    slug: "depo-ilaclama",
    summary:
      "Depo ilaçlama; stok düzeni, raf sistemleri ve sevkiyat akışı gözetilerek kemirgen ve depo zararlılarına karşı çevre ve iç alan istasyonları, kayıtlı ziyaretler ve hedefli uygulamayla planlanan bir kontrol programıdır.",
    intro: [
      "Depolarda zararlılar çoğunlukla yükleme kapıları, palet altları ve uzun süre hareket görmeyen stoklar çevresinde yerleşir. Kemirgenler ambalajlara zarar verirken un, tahıl ve kuru gıda gibi ürünlerde depo zararlısı böcekler kısa sürede çoğalabilir.",
      "Programı depo planı üzerinde kurarız: dış çevre, yükleme rampaları, raf koridorları ve ofis bölümleri ayrı halkalar olarak izlenir. Ziyaretler forklift trafiğini ve sevkiyat saatlerini aksatmayacak şekilde planlanır.",
    ],
    symptoms: [
      { title: "Palet altında dışkı", text: "Palet aralarında ve raf diplerinde kemirgen dışkısı veya yuva malzemesi." },
      { title: "Delinmiş koliler", text: "Karton ve streç film üzerinde kemirme izi ya da dökülen ürün." },
      { title: "Ürün üzerinde küçük böcekler", text: "Kuru gıda ve tahıl ürünlerinde hareket eden küçük böcek veya güve." },
      { title: "Rampa çevresinde aktivite", text: "Yükleme kapıları açık kaldığında içeri giren canlılar veya dış çevrede yuva izi." },
    ],
    risks: [
      "Kirlenen veya hasar gören ürünler satış dışı kalabilir.",
      "Müşteri iadeleri ve tedarik zinciri şikâyetleri artabilir.",
      "Kemirgenler elektrik tesisatına ve ambalaj makinelerine zarar verebilir.",
      "Depo zararlıları bir partiden diğerine yayılarak kayıpları büyütebilir.",
    ],
    process: [
      { title: "Depo keşfi", text: "Dış çevre, rampalar, raf koridorları, soğuk oda ve ofis bölümleri incelenir." },
      { title: "Halka planı", text: "Dış çevre, bina hattı ve iç alan için istasyon yerleri harita üzerinde belirlenir." },
      { title: "Ziyaret takvimi", text: "Ürün türüne ve risk seviyesine göre ziyaret sıklığı belirlenir." },
      { title: "Uygulama ve kontrol", text: "İstasyonlar kontrol edilir; bulgu olan bölgelerde etiket talimatlarına uygun hedefli uygulama yapılır." },
      { title: "Raporlama", text: "Ziyaret bulguları, istasyon tüketimleri ve düzeltici öneriler raporlanır." },
    ],
    methods: [
      { title: "Çevre ve iç alan istasyonları", text: "Dış çevrede kilitli istasyonlar, iç alanda gıdadan ayrı izleme düzenekleri." },
      { title: "Stok rotasyonu önerileri", text: "İlk giren ilk çıkar düzeni ve uzun süre bekleyen stokların düzenli kontrolü." },
      { title: "Rampa ve kapı sızdırmazlığı", text: "Yükleme kapısı fırçaları ve kapı altı boşlukları için yapısal öneriler." },
      { title: "Kayıtlı izleme", text: "İstasyon haritası, ziyaret raporları ve bulgu takibiyle izlenebilir program." },
    ],
    before: [
      "Raf diplerine ve duvar boyunca istasyon yerleştirilecek alanlara erişim bırakın.",
      "Ziyaret saatini sevkiyat ve forklift trafiğinin az olduğu bir zamana planlayın.",
      "Hasarlı veya şüpheli ürün partilerini ayırarak ekibe gösterin.",
      "Depolanan ürün türlerini, özellikle gıda ve hassas ürünleri önceden bildirin.",
    ],
    after: [
      "İstasyonların forklift ve palet hareketi sırasında yerinden oynamamasına dikkat edin.",
      "Yükleme kapılarını kullanım dışında kapalı tutun.",
      "Raporlardaki stok ve temizlik önerilerini depo ekibiyle paylaşın.",
      "Yeni gelen sevkiyatlarda iz görülürse partiyi ayırıp bize bildirin.",
    ],
    suitableFor: ["Gıda depoları", "Lojistik ve dağıtım merkezleri", "Antrepolar", "Hammadde depoları", "E-ticaret depoları", "Soğuk hava depoları"],
    gallery: ["warehouseTeam", "warehouse", "rat"],
    related: ["fare-ve-kemirgen-kontrolu", "fabrika-ve-endustriyel-alan-kontrolu", "periyodik-pest-management", "guve-kontrolu"],
    faq: [
      { q: "Depo ilaçlaması sırasında sevkiyat durur mu?", a: "Genellikle durmaz. Ziyaretler sevkiyatın az olduğu saatlere planlanır; hedefli uygulama gereken bölgeler geçici olarak ayrılabilir." },
      { q: "Gıda ürünlerinin bulunduğu raflara nasıl yaklaşılır?", a: "Gıdaya temas riski olan alanlarda öncelik izleme ve mekanik yöntemlerdir. Uygulama gerekiyorsa ürünlerden ayrı noktalar seçilir ve etiket talimatlarına uyulur." },
      { q: "İstasyon sayısı neye göre belirlenir?", a: "Depo büyüklüğü, duvar uzunluğu, kapı sayısı ve risk bölgeleri dikkate alınır. Sayı ve yerleşim keşif sonrası harita üzerinde önerilir." },
    ],
  },

  "fabrika-ve-endustriyel-alan-kontrolu": {
    slug: "fabrika-ve-endustriyel-alan-kontrolu",
    summary:
      "Fabrika ve endüstriyel alan kontrolü; hammadde kabulünden üretim hattına ve sevkiyat kapılarına kadar tesisin risk haritası çıkarılarak, işletmenin tabi olduğu denetimlere uygun kayıt düzeniyle yürütülen bir programdır.",
    intro: [
      "Üretim tesislerinde zararlılar en sık hammadde kabulü, sevkiyat kapıları, atık sahası ve sıcak teknik alanlar üzerinden içeri girer. Üretim hattı durmadan çalıştığı için uygulama zamanı, yöntem ve güvenlik kuralları tesisin işleyişiyle uyumlu olmalıdır.",
      "Tesis planı üzerinde bir risk haritası hazırlar, bölgeleri düşük, orta ve yüksek riskli olarak sınıflandırırız. Ziyaret sıklığı, istasyon yoğunluğu ve raporlama düzeni bu haritaya ve işletmenin kalite ekibinin beklentilerine göre şekillenir.",
    ],
    symptoms: [
      { title: "Hammadde kabulünde bulgu", text: "Gelen çuval, palet veya konteynerlerde zararlı ya da hasar izi." },
      { title: "Sevkiyat kapılarında aktivite", text: "Açık kalan kapılardan içeri giren kemirgen, kuş veya uçan haşere." },
      { title: "Teknik alanlarda iz", text: "Kompresör odası, pano arkaları ve kablo tavalarında dışkı veya kemirme." },
      { title: "Denetim veya müşteri notu", text: "Kalite denetiminde ya da müşteri ziyaretinde zararlı kontrolüyle ilgili tespit." },
    ],
    risks: [
      "Ürün kontaminasyonu, geri çağırma ve müşteri kaybı riski doğabilir.",
      "Kemirgenler kablo ve otomasyon sistemlerine zarar vererek üretimi durdurabilir.",
      "Denetimlerde kayıt eksikliği uygunsuzluk olarak raporlanabilir.",
      "Atık sahası ve dış çevre kontrolsüz kaldığında iç alan baskısı artabilir.",
    ],
    process: [
      { title: "Tesis keşfi", text: "Hammadde kabul, üretim, paketleme, depo, sevkiyat, atık sahası ve sosyal alanlar incelenir." },
      { title: "Risk haritası", text: "Bölgeler risk seviyesine göre sınıflandırılır, istasyon yerleri plan üzerinde işaretlenir." },
      { title: "Program onayı", text: "Ziyaret sıklığı, raporlama formatı ve iş güvenliği kuralları kalite ekibiyle birlikte netleştirilir." },
      { title: "Uygulama ve izleme", text: "Halkalardaki istasyonlar okunur; aktivite görülen bölgede yetkili uygulayıcı tarafından etiket talimatlarına uygun müdahale yapılır." },
      { title: "Trend ve rapor", text: "Ziyaret bulguları bölge bazında karşılaştırılır, düzeltici öneriler raporlanır." },
    ],
    methods: [
      { title: "Halkalı istasyon sistemi", text: "Dış çevre, bina hattı ve iç alan için katmanlı kemirgen izleme düzeni." },
      { title: "Uçan haşere izleme", text: "Üretim ve paketleme alanlarında ürüne temas etmeyecek noktalarda izleme düzenekleri." },
      { title: "Giriş noktası yönetimi", text: "Sevkiyat kapıları, hava perdeleri ve tesisat geçişleri için yapısal öneriler." },
      { title: "Denetime hazır kayıt", text: "İstasyon haritası, ziyaret raporları, bulgu trendleri ve düzeltici faaliyet takibi." },
    ],
    before: [
      "Ziyaretlerde ekibe eşlik edecek bir kalite veya teknik sorumlu belirleyin.",
      "Tesisin iş güvenliği kurallarını ve giriş prosedürlerini önceden paylaşın.",
      "Hassas üretim bölgelerini ve uygulamanın yapılmaması gereken alanları belirtin.",
      "Önceki denetim raporlarını ve zararlı bulgu kayıtlarını ekiple paylaşın.",
    ],
    after: [
      "İstasyonların bakım ve temizlik çalışmaları sırasında yerinden oynatılmamasını sağlayın.",
      "Sevkiyat kapılarını kullanım dışında kapalı tutma kuralını personele hatırlatın.",
      "Raporlardaki düzeltici önerileri sorumlu bölümlere atayıp takibini yapın.",
      "Hammadde kabulünde fark edilen bulguları parti numarasıyla kaydedip bize iletin.",
    ],
    suitableFor: ["Gıda üretim tesisleri", "Ambalaj fabrikaları", "Tekstil fabrikaları", "Kimya ve plastik tesisleri", "Organize sanayi bölgesi işletmeleri", "Üretim atölyeleri"],
    gallery: ["warehouseTeam", "factory", "inspection"],
    related: ["entegre-zararli-yonetimi", "depo-ilaclama", "periyodik-pest-management", "fare-ve-kemirgen-kontrolu"],
    faq: [
      { q: "Üretim durdurulmadan çalışma yapılabilir mi?", a: "Çoğu ziyaret üretim devam ederken yapılabilir; izleme ve kontrol ürüne temas etmeyen bölgelerde yürütülür. Hedefli uygulama gereken alanlar duruş veya bakım zamanlarına planlanır." },
      { q: "Risk haritası ne sıklıkla güncellenir?", a: "Tesise yeni hat eklendiğinde, yerleşim değiştiğinde veya bulgularda belirgin bir artış görüldüğünde güncellenir. Ayrıca düzenli aralıklarla kalite ekibiyle birlikte gözden geçirilir." },
      { q: "Raporlar denetimlerde kullanılabilir mi?", a: "Raporlar işletmenin tabi olduğu denetimlerde sunulabilecek düzende hazırlanır. Format ve içerik, kalite ekibinin ihtiyaçlarına göre uyarlanabilir." },
    ],
  },

  "periyodik-pest-management": {
    slug: "periyodik-pest-management",
    summary:
      "Periyodik pest management; belirlenen aralıklarla izleme, gerektiğinde uygulama ve her ziyaret sonrası raporlamayı kapsayan, bulguların trend analiziyle değerlendirildiği sözleşmeli bir programdır.",
    intro: [
      "Zararlı sorunu ortaya çıktıktan sonra müdahale etmek, çoğu zaman daha fazla zaman, maliyet ve itibar kaybı demektir. Periyodik program, aktiviteyi erken fark etmeyi ve küçük bulguları büyümeden yönetmeyi amaçlar.",
      "Sözleşme kapsamında alanlar, ziyaret sıklığı ve raporlama düzeni baştan tanımlanır. Her ziyaretin bulguları kayda geçer; zaman içinde biriken veriler hangi bölgede, hangi mevsimde risk arttığını gösteren bir trend analizine dönüşür.",
    ],
    symptoms: [
      { title: "Tekrarlayan tek seferlik çağrılar", text: "Aynı zararlı için yılda birkaç kez acil uygulama ihtiyacı doğması." },
      { title: "Mevsimsel artışlar", text: "Yaz aylarında veya ısıtma döneminde düzenli olarak artan şikâyetler." },
      { title: "Kayıt beklentisi", text: "Müşteri, denetçi veya yönetimin zararlı kontrolüne dair düzenli kayıt istemesi." },
      { title: "Çok bölümlü alan", text: "Birden fazla kat, depo veya şubesi olan ve tek tek takibi zor işletmeler." },
    ],
    risks: [
      "Düzensiz kontrolde aktivite fark edilene kadar yayılmış olabilir.",
      "Acil müdahaleler planlı ziyaretlere göre işletme düzenini daha çok etkileyebilir.",
      "Kayıt eksikliği denetimlerde ve müşteri görüşmelerinde sorun yaratabilir.",
      "Bulgular karşılaştırılmadığında kalıcı kaynaklar tespit edilemeyebilir.",
    ],
    process: [
      { title: "Başlangıç keşfi", text: "Tüm alanlar incelenir, mevcut riskler ve önceki kayıtlar değerlendirilir." },
      { title: "Sözleşme ve kapsam", text: "Kapsanan alanlar, ziyaret sıklığı, acil çağrı düzeni ve raporlama formatı belirlenir." },
      { title: "Ziyaret sıklığının belirlenmesi", text: "Alanın türü, risk seviyesi ve mevsim dikkate alınarak takvim oluşturulur." },
      { title: "Düzenli ziyaretler", text: "Her ziyarette istasyonlar kontrol edilir, gerekirse etiket talimatlarına uygun uygulama yapılır." },
      { title: "Raporlama ve trend analizi", text: "Ziyaret raporları birikerek dönemsel değerlendirmeye dönüşür; plan buna göre güncellenir." },
    ],
    methods: [
      { title: "İzleme istasyonları", text: "Numaralı ve haritalı istasyonlarla her ziyarette karşılaştırılabilir veri." },
      { title: "Ziyaret raporu", text: "Tarih, kontrol edilen noktalar, bulgular ve öneriler içeren düzenli kayıt." },
      { title: "Trend analizi", text: "Dönemler arası bulgu karşılaştırmasıyla risk bölgelerinin ve mevsimsel etkilerin görülmesi." },
      { title: "Esnek sıklık", text: "Bulgulara göre ziyaret aralığının artırılması veya seyreltilmesi." },
    ],
    before: [
      "Program kapsamına girecek tüm alanların listesini ve erişim düzenini hazırlayın.",
      "Ziyaretlerde iletişim kurulacak bir sorumlu kişi belirleyin.",
      "Varsa önceki ilaçlama ve denetim kayıtlarını ekiple paylaşın.",
      "Ziyaret için uygun gün ve saat aralıklarını önceden bildirin.",
    ],
    after: [
      "Ziyaret raporlarını tek bir dosyada veya dijital klasörde düzenli saklayın.",
      "Raporlardaki önerileri sorumlu kişilere iletip uygulanma durumunu takip edin.",
      "Ziyaret aralarında görülen bulguları tarih ve yerle not edin.",
      "Dönemsel değerlendirme toplantılarında kapsam ve sıklığı birlikte gözden geçirin.",
    ],
    suitableFor: ["Restoran ve kafeler", "Oteller", "Depo ve lojistik merkezleri", "Fabrikalar", "Siteler ve apartmanlar", "Çok şubeli işletmeler"],
    gallery: ["inspection", "warehouseTeam", "restaurantKitchen"],
    related: ["entegre-zararli-yonetimi", "restoran-ve-kafe-pest-kontrol", "depo-ilaclama", "fabrika-ve-endustriyel-alan-kontrolu"],
    faq: [
      { q: "Ziyaret sıklığı nasıl belirlenir?", a: "Alanın türü, gıda ile teması, bina yapısı, geçmiş bulgular ve mevsim birlikte değerlendirilir. Başlangıçta önerilen sıklık, ilk dönemin bulgularına göre güncellenebilir." },
      { q: "Ziyaretler arasında sorun çıkarsa ne olur?", a: "Sözleşmede tanımlanan iletişim düzeniyle bildirim yapılır ve bulgunun önemine göre ek ziyaret planlanır." },
      { q: "Trend analizi ne işe yarar?", a: "Hangi bölgede ve hangi dönemde aktivite arttığını gösterir. Böylece önlemler, sorun büyümeden doğru noktalara yönlendirilebilir." },
    ],
  },

  "entegre-zararli-yonetimi": {
    slug: "entegre-zararli-yonetimi",
    summary:
      "Entegre zararlı yönetimi (IPM); önleme, izleme, eşik değerlendirmesi, gerektiğinde hedefli müdahale ve sonuçların değerlendirilmesi adımlarını birleştirerek kimyasal kullanımını ihtiyaçla sınırlı tutan bir işletme yaklaşımıdır.",
    intro: [
      "Entegre zararlı yönetiminin temel fikri, zararlıyı ortaya çıktıktan sonra değil, ortaya çıkmasına zemin hazırlayan koşulları yöneterek kontrol etmektir. Bina yapısı, hijyen, depolama ve personel alışkanlıkları en az uygulama kadar belirleyicidir.",
      "Bu yaklaşımda her müdahale bir karara dayanır: izleme verileri önceden belirlenen eşiği aşıyorsa harekete geçilir ve en hedefli yöntem seçilir. Sonuç ölçülür, plan bu ölçüme göre güncellenir; döngü sürekli tekrarlanır.",
    ],
    symptoms: [
      { title: "Sürekli tekrarlayan sorunlar", text: "Düzenli uygulamaya rağmen aynı zararlının aynı bölgelerde geri dönmesi." },
      { title: "Kimyasal kullanımını azaltma ihtiyacı", text: "Gıda, sağlık veya eğitim alanlarında daha kontrollü bir yaklaşıma ihtiyaç duyulması." },
      { title: "Kök neden belirsizliği", text: "Zararlının nereden geldiğinin ve neden kalıcı olduğunun bilinmemesi." },
      { title: "Bütüncül kayıt beklentisi", text: "Önleme, izleme ve müdahalenin tek bir planda belgelenmesi isteği." },
    ],
    risks: [
      "Yalnızca uygulamaya dayalı yaklaşımlar kök nedeni çözmeden maliyeti artırabilir.",
      "Gereğinden sık kimyasal kullanımı hedef dışı canlılar ve çevre açısından istenmeyen sonuçlar doğurabilir.",
      "Yapısal sorunlar giderilmediğinde zararlı baskısı sürekli devam edebilir.",
      "Ölçülmeyen sonuçlar, programın işe yarayıp yaramadığının anlaşılmasını zorlaştırır.",
    ],
    process: [
      { title: "Önleme", text: "Giriş noktaları, hijyen, depolama ve atık düzeni değerlendirilir; yapısal öneriler hazırlanır." },
      { title: "İzleme", text: "İstasyonlar ve gözlem noktalarıyla aktivite düzenli olarak ölçülür." },
      { title: "Eşik", text: "Her bölge için hangi bulgu düzeyinde müdahale edileceği önceden tanımlanır." },
      { title: "Müdahale", text: "Eşik aşıldığında önce mekanik ve fiziksel yöntemler, gerekirse etiket talimatlarına uygun hedefli uygulama seçilir." },
      { title: "Değerlendirme", text: "Sonuçlar takip ziyaretiyle ölçülür, plan ve eşikler bulgulara göre güncellenir." },
    ],
    methods: [
      { title: "Yapısal ve hijyen önlemleri", text: "Boşlukların kapatılması, temizlik planı ve depolama düzeninin iyileştirilmesi." },
      { title: "İzleme ve eşik yönetimi", text: "Bölge bazında ölçülebilir göstergeler ve müdahale kararı için tanımlı eşikler." },
      { title: "Hedefli müdahale", text: "Yalnızca gerekli noktalarda, en sınırlı etkiye sahip yöntemin seçilmesi." },
      { title: "Personel katılımı", text: "Çalışanların bulguları bildirmesi ve önleyici alışkanlıklar için kısa eğitimler." },
    ],
    before: [
      "Programın sahibi olacak bir sorumlu kişi veya ekip belirleyin.",
      "Bina planlarını, önceki ilaçlama kayıtlarını ve bilinen sorunlu bölgeleri paylaşın.",
      "Yapısal düzeltmeler için bakım ekibinin sürece katılımını planlayın.",
      "Personelin bulgu bildirebileceği basit bir iletişim yolu oluşturun.",
    ],
    after: [
      "Önerilen yapısal ve hijyen önlemlerini öncelik sırasına göre uygulayın.",
      "Personelden gelen bulgu bildirimlerini düzenli olarak ekiple paylaşın.",
      "Dönemsel değerlendirme raporlarını yönetimle birlikte gözden geçirin.",
      "Eşik değerlerinin ve ziyaret sıklığının bulgulara göre güncellenmesine açık olun.",
    ],
    suitableFor: ["Gıda üretim ve servis işletmeleri", "Hastane ve sağlık kurumları", "Okul ve eğitim kurumları", "Oteller", "Fabrikalar ve depolar", "Kurumsal kampüsler"],
    gallery: ["inspection", "factory", "warehouseTeam"],
    related: ["periyodik-pest-management", "hasere-kontrolu", "restoran-ve-kafe-pest-kontrol", "fabrika-ve-endustriyel-alan-kontrolu"],
    faq: [
      { q: "IPM ile klasik ilaçlama arasındaki fark nedir?", a: "Klasik yaklaşım çoğunlukla düzenli uygulamaya dayanır. IPM ise önleme ve izlemeyi merkeze alır; müdahale yalnızca izleme verisi bunu gerektirdiğinde ve en hedefli yöntemle yapılır." },
      { q: "Eşik değeri nedir?", a: "Bir bölgede müdahale kararı verilmesini gerektiren bulgu düzeyidir. Gıda hazırlık alanı gibi hassas bölgelerde eşik çok düşük, dış çevrede daha yüksek olabilir." },
      { q: "Entegre zararlı yönetimi kimyasal kullanılmadığı anlamına mı gelir?", a: "Hayır. Kimyasal yöntemler gerektiğinde kullanılabilir; ancak önleme ve izlemeyle desteklendiği için kullanım ihtiyaçla sınırlı ve hedefli tutulur." },
    ],
  },

};

export function getServiceDetail(slug: string) {
  return serviceDetails[slug] ?? null;
}
