/**
 * Kurumsal ve İletişim sayfa metinleri — özgün taslak; yayın öncesi yetkili onayı gerekir.
 * Doğrulanmamış işletme bilgisi (kuruluş yılı, ekip, unvan, adres, belge numaraları) yazılmaz;
 * `value: null` alanlar arayüzde "doğrulama bekleniyor" olarak gösterilir. Sprint 5'te pages tablosuna aktarılır.
 */

export interface PageCard {
  title: string;
  text: string;
}

export interface TransparencyDocument {
  key: string;
  title: string;
  /** Belgenin ne işe yaradığı — ziyaretçiye açıklama */
  description: string;
  /** Belge numarası / sahibi vb. Doğrulanana kadar null. */
  value: string | null;
  verified: boolean;
}

export const aboutPage = {
  meta: {
    title: "Kurumsal | Çalışma Yaklaşımımız",
    description:
      "İST İlaçlama’nın haşere kontrolüne yaklaşımı: önce inceleme, yazılı plan, etiket talimatlarına uygun uygulama, takip ve belge şeffaflığı.",
  },
  hero: {
    eyebrow: "Kurumsal",
    titleLead: "Haşere kontrolünde",
    titleAccent: "planlı ve şeffaf",
    titleTail: "bir yaklaşım",
    description:
      "İstanbul’da konutlar, apartmanlar ve işletmeler için zararlı kontrolünü bir uygulama değil, inceleme ile başlayıp takip ile tamamlanan bir süreç olarak ele alıyoruz.",
  },
  about: {
    eyebrow: "Biz kimiz",
    title: "Önce anlamak, sonra uygulamak",
    paragraphs: [
      "İST İlaçlama, İstanbul’da ev, apartman, site ve işletmelere yönelik haşere kontrolü hizmeti sunmak için kuruldu. Çıkış noktamız basit: Her zararlı sorunu farklı bir nedenden doğar ve bu nedeni anlamadan yapılan uygulama çoğu zaman yalnızca geçici bir rahatlama sağlar.",
      "Bu yüzden çalışmalarımızı ön görüşme ve inceleme ile başlatıyor; tür, yoğunluk ve kaynak noktalarını belirledikten sonra alanın kullanımına uygun bir plan hazırlıyoruz. Plan; hangi yöntemin neden seçildiğini, hazırlık adımlarını ve gerekiyorsa takip ziyaretlerini yazılı olarak içerir.",
      "Uygulamalarda ürün etiketindeki talimatlara bağlı kalmayı, uygulamanın kapsamını ihtiyaç duyulan noktalarla sınırlamayı ve alan kullanıcılarını süreç boyunca açıkça bilgilendirmeyi temel kural olarak görüyoruz.",
    ],
  },
  principles: {
    eyebrow: "İlkelerimiz",
    title: "Her uygulamada uyduğumuz kurallar",
    description: "Hizmetin türü ne olursa olsun aşağıdaki ilkeler değişmez.",
    items: [
      { title: "Önce inceleme", text: "Zararlının türü ve kaynağı belirlenmeden yöntem seçilmez; gerektiğinde yerinde inceleme yapılır." },
      { title: "Yazılı plan", text: "Yöntem, uygulama alanları, hazırlık listesi ve takip ihtiyacı uygulama öncesinde paylaşılır." },
      { title: "Etikete uygunluk", text: "Ürünler yalnızca ruhsatında ve etiketinde belirtilen kullanım alanlarına ve talimatlara göre uygulanır." },
      { title: "Ölçülü kapsam", text: "Uygulama, ihtiyaç duyulan noktalarla sınırlı tutulur; gereğinden geniş alanlara yayılmaz." },
      { title: "Takip ve değerlendirme", text: "Sonuç takip edilir, gerektiğinde plan güncellenir ve tekrarı azaltacak öneriler iletilir." },
      { title: "Açık iletişim", text: "Dönüş süresi, dikkat edilmesi gerekenler ve kullanılan ürün bilgisi sorulduğunda açıkça paylaşılır." },
    ] satisfies PageCard[],
  },
  process: {
    eyebrow: "Hizmet sürecimiz",
    title: "Talepten takibe beş adım",
    steps: [
      { title: "Talep ve ön görüşme", text: "Alanın türü, ilçe ve gözlemlediğiniz belirtiler hakkında bilgi alınır." },
      { title: "İnceleme", text: "Gerekli görülen durumlarda alan yerinde incelenir; tür ve kaynak noktaları belirlenir." },
      { title: "Plan ve teklif", text: "Yöntem, hazırlık listesi, takvim ve takip ihtiyacı yazılı olarak iletilir." },
      { title: "Uygulama", text: "Yetkili uygulayıcı tarafından, etiket talimatlarına uygun şekilde uygulama yapılır." },
      { title: "Takip ve kayıt", text: "Sonuç değerlendirilir, öneriler paylaşılır; işletmelerde kayıt düzeni sürdürülür." },
    ] satisfies PageCard[],
  },
  commitments: {
    eyebrow: "Neyi yapmıyoruz",
    title: "Söz vermediklerimiz de önemli",
    description:
      "Haşere kontrolünde sonucu alanın yapısı, kullanım alışkanlıkları ve çevre koşulları birlikte belirler. Bu nedenle bazı vaatlerden bilinçli olarak uzak duruyoruz.",
    items: [
      { title: "Gerçekçi olmayan vaat", text: "Her koşulda aynı sonucu vaat etmiyor, beklenen süreyi ve takip ihtiyacını baştan açıkça söylüyoruz." },
      { title: "Kendi başınıza uygulama tarifi", text: "Biyosidal ürünler yetkili kişilerce kullanılmalıdır; doz veya karışım tarifi paylaşmıyoruz." },
      { title: "Gereksiz geniş uygulama", text: "Alanın tamamına yayılan uygulamalar yerine kaynağa yönelik, noktasal yöntemleri önceliklendiriyoruz." },
      { title: "Doğrulanmamış iddia", text: "Sitemizde doğrulanmamış rakam, ödül veya belge yayımlamıyoruz; belgeler doğrulandıkça ekleniyor." },
    ] satisfies PageCard[],
  },
  documents: {
    eyebrow: "Belge şeffaflığı",
    title: "Belgelerimiz",
    description:
      "Bir ilaçlama firmasıyla çalışmadan önce aşağıdaki belgeleri sormanızı öneririz. Kendi belgelerimizin bilgileri doğrulandıkça bu bölümde yayımlanacaktır.",
    pendingLabel: "Doğrulama bekleniyor",
    items: [
      {
        key: "uygulama-izni",
        title: "Biyosidal Ürün Uygulama İzin Belgesi",
        description: "Firmanın biyosidal ürün uygulaması yapmaya yetkili olduğunu gösteren, ilgili sağlık otoritesince düzenlenen belge.",
        value: null,
        verified: false,
      },
      {
        key: "sorumlu-yonetici",
        title: "Mesul Müdür (Sorumlu Yönetici)",
        description: "Uygulamaların mevzuata uygun yürütülmesinden sorumlu, yetki belgesine sahip kişi.",
        value: null,
        verified: false,
      },
      {
        key: "uygulayici-belgesi",
        title: "Uygulayıcı Eğitim / Yeterlilik Belgeleri",
        description: "Sahada uygulama yapan personelin ilgili eğitimleri aldığını gösteren belgeler.",
        value: null,
        verified: false,
      },
      {
        key: "urun-ruhsat",
        title: "Kullanılan Ürünlerin Ruhsat Bilgileri",
        description: "Uygulamada kullanılan biyosidal ürünlerin ruhsatlı olduğunu gösteren bilgiler; uygulama sırasında talep edilebilir.",
        value: null,
        verified: false,
      },
      {
        key: "ticari-bilgi",
        title: "Ticari Unvan ve Vergi Bilgileri",
        description: "Firmanın resmi unvanı, vergi dairesi ve vergi numarası.",
        value: null,
        verified: false,
      },
    ] satisfies TransparencyDocument[],
    note:
      "Belge ve mevzuat gereklilikleri zaman içinde değişebilir. Güncel düzenlemeler için T.C. Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü duyurularını takip etmenizi öneririz.",
  },
  /** Kurumsal sayfada şu an bilinçli olarak boş bırakılan işletme bilgileri */
  pendingFacts: [
    "Ticari unvan ve kuruluş yılı",
    "Ekip büyüklüğü ve uzmanlık alanları",
    "Biyosidal ürün uygulama izin belgesi numarası",
    "Sorumlu yönetici adı ve belgesi",
    "Merkez adresi ve çalışma saatleri",
  ],
};

export const contactPage = {
  meta: {
    title: "İletişim",
    description:
      "İST İlaçlama ile iletişime geçin: teklif formu ve doğrulanmış iletişim kanalları. Talebinizde hangi bilgileri paylaşmanız gerektiğini öğrenin.",
  },
  hero: {
    eyebrow: "Bize ulaşın",
    titleLead: "Sorununuzu",
    titleAccent: "birlikte tanımlayalım",
    description:
      "Gözlemlediğiniz zararlıyı, alanınızı ve ilçenizi paylaşın; size uygun planı hazırlamak için gereken ilk adımı birlikte atalım.",
  },
  channels: {
    eyebrow: "İletişim kanalları",
    title: "Size en uygun kanalı seçin",
    description: "Teklif formu her zaman açıktır. Diğer iletişim kanalları doğrulandıkça bu sayfada yer alır.",
    form: {
      title: "Teklif formu",
      text: "Alanınızı ve sorunu birkaç adımda anlatın; talebiniz incelendikten sonra sizinle iletişime geçilir.",
      cta: "Teklif formunu doldur",
    },
    phone: { title: "Telefon", text: "Hızlı ön görüşme ve randevu planlaması için." },
    whatsapp: { title: "WhatsApp", text: "Fotoğraf paylaşarak ön değerlendirme için." },
    email: { title: "E-posta", text: "Kurumsal talepler ve belge paylaşımı için." },
    address: { title: "Adres", text: "Merkez ofis." },
    hours: { title: "Çalışma saatleri", text: "Görüşme ve uygulama planlaması için." },
    pendingNote:
      "Telefon, e-posta ve adres bilgilerimiz doğrulama aşamasındadır; doğrulandığında burada yayımlanacaktır. Bu sırada teklif formunu kullanabilirsiniz.",
  },
  checklist: {
    eyebrow: "Talep hazırlığı",
    title: "Mesajınızda bunları paylaşın",
    description: "Aşağıdaki bilgiler, ilk görüşmede doğru planı hazırlamamızı kolaylaştırır.",
    items: [
      { title: "Alanın türü", text: "Daire, müstakil ev, apartman ortak alanı, ofis, restoran, depo vb." },
      { title: "İlçe ve yaklaşık büyüklük", text: "İlçe/mahalle ve metrekare ya da oda sayısı." },
      { title: "Gözlemlenen zararlı", text: "Ne gördüğünüz, nerede ve ne sıklıkta; mümkünse bir fotoğraf." },
      { title: "Hane veya işletme bilgisi", text: "Çocuk, hamile birey, evcil hayvan, gıda üretimi gibi hassasiyetler." },
      { title: "Uygun zaman", text: "Uygulama için tercih ettiğiniz gün ve saat aralıkları." },
    ] satisfies PageCard[],
  },
  regions: {
    eyebrow: "Hizmet bölgeleri",
    title: "İstanbul’un iki yakasında",
    text: "Bölge sayfalarında ilçenize göre hizmet kapsamını ve ilçeye özgü bilgileri bulabilirsiniz. Hizmet kapsamı talebiniz sırasında teyit edilir.",
    cta: "Bölgenizi seçin",
  },
  privacy:
    "Paylaştığınız kişisel veriler yalnızca talebinizi yanıtlamak amacıyla, KVKK Aydınlatma Metni’nde açıklanan şekilde işlenir.",
};
