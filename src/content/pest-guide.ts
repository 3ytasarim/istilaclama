import type { PestGuide, PestSection } from "@/content/pest-guide-types";

/* Böcek Rehberi içerikleri — bilgi niyetli, genel uzman rehberliği.
   Kimyasal ürün, etken madde, doz veya uygulama talimatı içermez; önleme önerileri yalnızca fiziksel/hijyen odaklıdır. */

const TITLES: Record<PestSection["id"], string> = {
  "nasil-taninir": "Nasıl tanınır?",
  "yasam-dongusu": "Yaşam döngüsü",
  "nerede-yasar": "Nerede yaşar, nerede saklanır?",
  belirtiler: "Varlığını gösteren belirtiler",
  riskler: "Sağlık ve hijyen riskleri",
  "karistirilan-turler": "Hangi türlerle karıştırılır?",
  onleme: "Önleme için yapılabilecekler",
  "profesyonel-destek": "Ne zaman profesyonel destek alınmalı?",
};

const sec = (id: PestSection["id"], paragraphs: string[], bullets?: string[]): PestSection =>
  bullets ? { id, title: TITLES[id], paragraphs, bullets } : { id, title: TITLES[id], paragraphs };

const UC_COCKROACH = { label: "University of California IPM — Cockroaches", url: "https://ipm.ucanr.edu/home-and-landscape/cockroaches/" };
const UKY_COCKROACH = { label: "University of Kentucky Entomology — Cockroach Elimination in Homes and Apartments", url: "https://entomology.ca.uky.edu/ef614" };

export const pestGuides: PestGuide[] = [
  /* 1 ─────────────────────────────── HAMAM BÖCEĞİ */
  {
    slug: "hamam-bocegi",
    name: "Hamam böceği",
    altNames: ["Amerikan hamam böceği", "lağım böceği", "büyük hamam böceği", "uçan hamam böceği", "kırmızı hamam böceği"],
    scientific: "Periplaneta americana",
    group: "hamam-bocekleri",
    summary:
      "Hamam böceği (Amerikan hamam böceği), 3,5–4 cm boyunda, kırmızımsı kahverengi, parlak ve yassı gövdeli bir böcektir. Göğüs kalkanının kenarında açık sarımsı bir bant bulunur ve iki eşeyde de kanat vardır. Gece aktiftir; lağım hatları, bodrumlar, gider boruları ve nemli tesisat boşluklarından binaya girer.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde genellikle 35–40 mm, bazı bireylerde 50 mm'ye kadar" },
      { label: "Rengi", value: "Kırmızımsı kahverengi; göğüs kalkanı kenarında açık sarı bant" },
      { label: "Aktif olduğu dönem", value: "Gece; sıcak ve nemli aylarda (Mayıs–Ekim) belirgin artış" },
      { label: "Yaşam süresi", value: "Erişkin olarak yaklaşık 1 yıl, uygun koşullarda daha uzun" },
      { label: "Beslenme", value: "Her şeyi yiyen; organik atık, gıda artıkları, kâğıt, yapışkan maddeler" },
      { label: "Yaygın görüldüğü yerler", value: "Lağım ve kanalizasyon hatları, bodrum katlar, gider ve rögar çevresi, kazan daireleri" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Amerikan hamam böceği, evlerde görülen hamam böceği türlerinin en irisidir. Gövdesi yassı, parlak ve kırmızımsı kahverengidir; başın hemen arkasındaki göğüs kalkanının kenarlarında açık sarımsı, halka benzeri bir bant dikkat çeker. Antenleri en az vücudu kadar uzundur ve sürekli hareket eder. Erişkinlerde kanatlar karın ucuna kadar uzanır; sıcak havalarda kısa mesafeli süzülerek uçabildikleri görülür.",
        "Yavrular (nimfler) kanatsızdır, erişkinlere göre daha küçük ve daha açık renklidir. İlk evrelerdeki nimfler grimsi kahverengi görünebilir. Hızlı koşar, ışık yandığında kısa sürede karanlık bir köşeye kaçar. Bu iri yapısı ve kaçma refleksi nedeniyle halk arasında çoğu zaman lağım böceği olarak da anılır.",
      ]),
      sec("yasam-dongusu", [
        "Hamam böcekleri tam olmayan başkalaşım geçirir: yumurta, nimf ve erişkin evreleri vardır. Dişi, yaklaşık 8 mm uzunluğunda, kahverengi ve çanta biçiminde bir yumurta kapsülü (ooteka) üretir. Her kapsülde ortalama 14–16 yumurta bulunur. Dişi bu kapsülü genellikle korunaklı, nemli ve besin kaynağına yakın bir yüzeye bırakır veya yapıştırır.",
        "Nimflerin erişkinliğe ulaşması sıcaklığa ve besine bağlı olarak birkaç aydan bir yılı aşan sürelere kadar uzayabilir; bu süreçte defalarca deri değiştirirler. Erişkin bir dişi ömrü boyunca çok sayıda kapsül bırakabildiğinden, kontrolsüz bir lağım hattında popülasyon zamanla büyük boyutlara ulaşabilir. Sıcaklık arttıkça gelişim hızlanır; bu nedenle yaz aylarında görülme sıklığı belirgin biçimde yükselir.",
      ]),
      sec("nerede-yasar", [
        "Bu tür sıcak, nemli ve karanlık ortamları sever. İstanbul gibi yoğun kanalizasyon altyapısına sahip şehirlerde asıl yaşam alanı lağım hatları, rögarlar ve yer altı tesisat boşluklarıdır. Binalara çoğunlukla zemin süzgeçleri, lavabo ve banyo giderleri, boru geçiş delikleri, bodrum kapıları ve havalandırma açıklıkları yoluyla girer.",
        "Bina içinde bodrum katlar, kazan daireleri, çöp odaları, asansör kuyuları ve su tesisatının geçtiği şaftlar en sık görüldüğü yerlerdir. Daire içinde ise banyo ve mutfak giderleri, lavabo altı dolaplar, beyaz eşya arkaları ve süpürgelik boşlukları saklanma noktası olarak kullanılır.",
      ], [
        "Zemin ve duş süzgeçleri, rögar kapakları",
        "Lavabo altı dolaplar ve boru geçiş boşlukları",
        "Bodrum, kazan dairesi, çöp odası",
        "Tesisat şaftları ve asansör kuyusu",
      ]),
      sec("belirtiler", [
        "En belirgin işaret, özellikle gece ışık yakıldığında görülen canlı bireylerdir. Gündüz görülmeleri genellikle saklanma alanlarının dolduğunu ya da yakın bir kaynaktan yoğun geçiş olduğunu düşündürür. Dolap köşelerinde, çekmece içlerinde ve gider çevresinde kahve telvesine benzeyen silindirik dışkılar, boş yumurta kapsülleri ve deri değiştirme kalıntıları da sık rastlanan izlerdir.",
        "Yoğun popülasyonlarda ortamda ağır, küflü ve yağımsı bir koku oluşabilir. Banyoda ya da mutfakta gece aniden ortaya çıkan büyük bireyler, giderlerin kuru kaldığını veya sifon sisteminde bir açıklık bulunduğunu gösterebilir.",
      ]),
      sec("riskler", [
        "Amerikan hamam böceği lağım, çöp ve atık su gibi kirli ortamlarla mutfak, banyo ve gıda alanları arasında gidip gelir. Bu nedenle bacakları ve vücut yüzeyiyle bazı bakteri ve mikroorganizmaları yüzeylere taşıyabileceği, gıda hijyenini olumsuz etkileyebileceği kabul edilir. Doğrudan ısırma ya da sokma gibi bir davranışı yoktur.",
        "Dışkıları, deri kalıntıları ve vücut parçaları ev tozuna karışarak hassas kişilerde alerjik şikâyetlerin ve astım belirtilerinin artmasına katkıda bulunabilir. Özellikle çocukların, yaşlıların ve solunum yolu hastalığı olanların bulunduğu evlerde bu durum daha fazla önem taşır. Sağlıkla ilgili bir şikâyetiniz varsa hekime başvurmanız önerilir.",
      ]),
      sec("karistirilan-turler", [
        "Amerikan hamam böceği en sık kalorifer böceği olarak bilinen Alman hamam böceğiyle karıştırılır. Ancak kalorifer böceği yalnızca 12–16 mm boyundadır, açık kahverengidir ve göğüs kalkanında iki paralel koyu çizgi taşır. Kalorifer böceği daha çok mutfakta yaşar; Amerikan türü ise genellikle lağım ve gider kaynaklıdır.",
        "Bahçelerde ve zemin katlarda görülen Doğu hamam böceği (Blatta orientalis) de koyu, neredeyse siyah rengi ve daha kısa kanatlarıyla ayrılır. Toprak ve yaprak altında yaşayan bazı böcekler de uzaktan benzer görünebilir; ayırt etmekte zorlanıyorsanız fotoğrafla tür tespiti yaptırmak doğru yaklaşımdır.",
      ]),
      sec("onleme", [
        "Bu türle mücadelede en etkili adım, böceğin binaya giriş yollarını fiziksel olarak kapatmaktır. Gider ve süzgeçlerin sürekli su dolu kalması, sifonun koku ve böcek bariyeri görevini sürdürmesini sağlar. Kullanılmayan banyo ve balkon süzgeçlerine düzenli olarak su dökmek bu nedenle önemlidir.",
        "Nem ve gıda kaynağını azaltmak da popülasyonun yerleşmesini zorlaştırır. Bina ölçeğinde ise bodrum ve çöp odası düzeni, rögar kapaklarının sağlamlığı ve tesisat boşluklarının kapatılması ortak alan yönetiminin konusu olmalıdır.",
      ], [
        "Süzgeçlere kapaklı ya da ızgaralı tıkaç takın; kullanılmayan giderlere düzenli su dökün",
        "Boru geçişlerindeki ve süpürgelik arkasındaki boşlukları silikon veya dolgu ile kapatın",
        "Sızdıran musluk ve boruları onarın, lavabo altını kuru tutun",
        "Çöpleri kapaklı kovada tutun ve her akşam boşaltın",
        "Bodrum ve depo alanlarında karton yığınlarını ve atıl eşyaları azaltın",
      ]),
      sec("profesyonel-destek", [
        "Tek tük ve dışarıdan geldiği belli olan bireyler fiziksel önlemlerle azaltılabilir. Ancak gün içinde de böcek görülüyorsa, birden fazla dairede aynı şikâyet varsa ya da bodrum ve çöp odası gibi ortak alanlarda yoğunluk fark ediliyorsa sorun büyük olasılıkla bina altyapısıyla ilişkilidir ve tek bir dairede alınacak önlemler yeterli olmaz.",
        "Bu durumda giriş noktalarının tespiti, ortak alanların ve tesisat hatlarının birlikte ele alınması ve uygulama sonrası izleme yapılması gerekir. Gıda işletmeleri, apartmanlar ve siteler için düzenli kontrol planı oluşturmak, sorunun tekrar etmesini önlemenin en sağlıklı yoludur.",
      ]),
    ],
    serviceSlug: "hamam-bocegi-ilaclama",
    faq: [
      { q: "Hamam böceği neden evde olur?", a: "Çoğunlukla lağım ve gider hatlarından, kuruyan süzgeçlerden ve boru geçiş boşluklarından gelir. Nem, açıkta bırakılan yiyecek ve çöp, bireylerin evde kalmasını kolaylaştırır." },
      { q: "Amerikan hamam böceği uçar mı?", a: "Kanatları vardır ve özellikle sıcak havalarda kısa mesafeli uçabilir ya da yüksekten süzülebilir. Ancak genellikle koşarak hareket etmeyi tercih eder." },
      { q: "Gündüz hamam böceği görmek ne anlama gelir?", a: "Gece aktif bir tür olduğu için gündüz görülmesi, saklanma alanlarının kalabalıklaştığını veya yakınlarda yoğun bir kaynak bulunduğunu düşündürebilir. Bu durumda yerinde inceleme yapılması önerilir." },
      { q: "Hamam böceği ısırır mı?", a: "Bu türün insanları ısırma alışkanlığı yoktur. Asıl sorun, kirli ortamlardan yüzeylere mikroorganizma taşıyabilmesi ve alerjik şikâyetlere katkıda bulunabilmesidir." },
      { q: "Hamam böceği ile kalorifer böceği aynı mıdır?", a: "Hayır. Hamam böceği genellikle iri Amerikan türünü, kalorifer böceği ise küçük, açık kahverengi ve iki çizgili Alman hamam böceğini ifade eder. Yaşam alanları ve kontrol yaklaşımları farklıdır." },
    ],
    sources: [UC_COCKROACH, UKY_COCKROACH],
    seoText:
      "Binanızda iri, kırmızımsı kahverengi hamam böcekleri görüyorsanız sorun çoğu zaman tek bir dairenin değil, gider ve tesisat hatlarının konusudur. İST İlaçlama, İstanbul genelinde hamam böceği ilaçlama hizmetini giriş noktalarının tespiti, ortak alanların değerlendirilmesi ve uygulama sonrası takip adımlarıyla planlar. Konut, apartman ve gıda işletmeleri için hamam böceği kontrolü hakkında bilgi almak üzere hizmet sayfamızı inceleyebilir, yerinde keşif talebinde bulunabilirsiniz.",
    imageKey: "cockroach",
  },

  /* 2 ─────────────────────────────── KALORİFER BÖCEĞİ */
  {
    slug: "kalorifer-bocegi",
    name: "Kalorifer böceği",
    altNames: ["Alman hamam böceği", "mutfak böceği", "küçük hamam böceği", "sarı hamam böceği", "fırın böceği"],
    scientific: "Blattella germanica",
    group: "hamam-bocekleri",
    summary:
      "Kalorifer böceği, Alman hamam böceği olarak da bilinen, 12–16 mm boyunda, açık kahverengi ve göğüs kalkanında iki paralel koyu çizgi taşıyan küçük bir hamam böceğidir. Sıcak ve nemli mutfakları tercih eder, çok hızlı ürer ve ev içinde kalıcı koloni kurabilen en yaygın hamam böceği türüdür.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde 12–16 mm" },
      { label: "Rengi", value: "Açık kahverengi–sarımsı; göğüs kalkanında iki paralel koyu çizgi" },
      { label: "Aktif olduğu dönem", value: "Gece; ısıtılan iç mekânlarda yıl boyu" },
      { label: "Yaşam süresi", value: "Erişkin olarak yaklaşık 4–7 ay" },
      { label: "Beslenme", value: "Gıda artıkları, yağ, şeker, nişasta, sabun ve tutkal kalıntıları" },
      { label: "Yaygın görüldüğü yerler", value: "Mutfak dolapları, beyaz eşya arkaları, ocak ve fırın çevresi, banyo" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Kalorifer böceği, evlerde görülen hamam böcekleri arasında en küçük ve en yaygın olanıdır. Erişkinler 12–16 mm boyundadır; rengi açık kahverengi ile sarımsı kahve arasında değişir. Onu diğer türlerden ayıran en net özellik, başın arkasındaki göğüs kalkanında boylu boyunca uzanan iki paralel koyu çizgidir.",
        "Kanatları olmasına rağmen neredeyse hiç uçmaz; çok hızlı koşar ve dar çatlaklara kolayca sığar. Nimfler daha koyu, neredeyse siyah renktedir ve sırtlarında açık renkli bir orta şerit bulunur. Dişiler, karın ucunda taşıdıkları açık kahverengi yumurta kapsülüyle kolayca fark edilir.",
      ]),
      sec("yasam-dongusu", [
        "Türün ev içinde bu kadar başarılı olmasının nedeni üreme hızıdır. Dişi, içinde 30–40 yumurta bulunan kapsülü yumurtalar açılmak üzereyken bırakana kadar karnında taşır; böylece yumurtalar kuruma ve dış etkilere karşı korunur. Bir dişi ömrü boyunca 4–8 kapsül üretebilir.",
        "Uygun sıcaklıkta yumurtadan çıkan nimfler yaklaşık 6–10 haftada erişkin olur ve kısa sürede üremeye başlar. Bu nedenle başlangıçta birkaç bireyle gelen bir sorun, birkaç ay içinde yüzlerce bireye ulaşabilir. Isıtılan apartman dairelerinde mevsim ayırt etmeden yıl boyunca çoğalmaya devam eder.",
      ]),
      sec("nerede-yasar", [
        "Kalorifer böceği dışarıda yaşayan bir tür değildir; neredeyse tamamen insan yapılarına bağlıdır. Sıcak, nemli ve besine yakın dar boşlukları tercih eder. Mutfak, türün yaşamı için gereken üç unsuru, yani ısıyı, suyu ve gıdayı bir arada sunduğundan en sık görüldüğü alandır.",
        "Evlere genellikle market poşetleri, karton kutular, ikinci el beyaz eşya ve mobilyalarla taşınır. Apartmanlarda ise ortak tesisat şaftları, kalorifer boruları ve elektrik kanalları üzerinden daireler arasında yayılabilir; halk arasındaki kalorifer böceği adı da sıcak boru hatlarını sevmesinden gelir.",
      ], [
        "Bulaşık makinesi, buzdolabı ve fırın arkası",
        "Lavabo altı, dolap menteşe ve köşe birleşimleri",
        "Elektrikli küçük ev aletlerinin içi (kahve makinesi, mikrodalga)",
        "Fayans ve tezgâh arası derzler",
      ]),
      sec("belirtiler", [
        "Gece mutfak ışığı yakıldığında hızla kaçışan küçük kahverengi böcekler en tipik işarettir. Dolap köşelerinde, menteşelerde ve çekmece raylarında karabiber ya da kahve telvesi görünümünde küçük siyah dışkı noktaları birikir. Bu lekeler genellikle böceğin sürekli kullandığı saklanma noktasını gösterir.",
        "Boş yumurta kapsülleri, deri değiştirme kabukları ve ölü nimfler de yaygın bulgulardır. Yoğunluk arttıkça mutfakta hafif ekşi ve yağımsı bir koku hissedilebilir. Gündüz saatlerinde de böcek görülmeye başlanması, popülasyonun büyüdüğünün önemli bir göstergesidir.",
      ]),
      sec("riskler", [
        "Kalorifer böceği doğrudan gıdaların, tabakların ve mutfak gereçlerinin üzerinde dolaştığı için hijyen açısından önemli bir sorundur. Vücut yüzeyiyle bazı bakterileri gıdalara ve temas yüzeylerine taşıyabileceği, böylece mide-bağırsak şikâyetlerine yol açabilecek mikroorganizmaların yayılmasında rol oynayabileceği bilinmektedir.",
        "Ayrıca dışkı ve vücut kalıntılarında bulunan proteinler ev içi alerjenler arasında yer alır; yoğun ve uzun süreli varlığı astım ile alerjik rinit şikâyetlerini artırabilir. Gıda işletmelerinde ise denetimlerde ciddi bir uygunsuzluk olarak değerlendirilir. Sağlık şikâyetlerinde hekime danışılması önerilir.",
      ]),
      sec("karistirilan-turler", [
        "En sık karışıklık, iri Amerikan hamam böceğiyle yaşanır. Amerikan türü 3,5–4 cm boyunda, kırmızımsı kahverengidir ve genellikle lağım kaynaklıdır; kalorifer böceği ise küçük, açık renkli ve iki çizgilidir. Kahverengi bantlı hamam böceği (Supella longipalpa) de benzer boyuttadır, ancak kanatlarında enine açık bantlar bulunur ve mutfak dışındaki kuru, yüksek alanlarda da görülür.",
        "Küçük nimfler bazen tahta kurusu veya böcek larvalarıyla karıştırılabilir. Tahta kurusu ise çok daha yassı, yuvarlak ve kanatsızdır; ayrıca mutfakta değil, yatak çevresinde bulunur.",
      ]),
      sec("onleme", [
        "Kalorifer böceğiyle mücadelenin temeli, besin ve su kaynaklarını ortadan kaldırmak ve saklanma boşluklarını azaltmaktır. Fiziksel önlemler tek başına yerleşik bir koloniyi bitirmeye yetmeyebilir, ancak sorunun büyümesini yavaşlatır ve profesyonel uygulamanın kalıcılığını belirgin biçimde artırır.",
        "Eve giren karton kutular ve ikinci el eşyalar, özellikle elektrikli aletler, içeri alınmadan önce dikkatle kontrol edilmelidir.",
      ], [
        "Gece yatmadan önce tezgâhı silin, kirli bulaşık bırakmayın",
        "Kuru gıdaları sıkı kapanan cam veya sert plastik kaplarda saklayın",
        "Evcil hayvan mamasını gece açıkta bırakmayın",
        "Musluk ve gider sızıntılarını giderin, lavabo altını kuru tutun",
        "Dolap ve fayans arasındaki çatlakları dolgu ile kapatın",
        "Karton kutuları ve kâğıt poşetleri mutfakta biriktirmeyin",
      ]),
      sec("profesyonel-destek", [
        "Kalorifer böceği, ev içinde kalıcı koloni kuran ve hızla çoğalan bir tür olduğu için, düzenli olarak birden fazla birey görüyorsanız sorunu erkenden ele almak önemlidir. Gündüz görülmeleri, dolap içlerinde yoğun dışkı izleri ya da komşu dairelerde de benzer şikâyetler profesyonel değerlendirme gerektirir.",
        "Profesyonel süreçte saklanma noktalarının ayrıntılı tespiti, uygun yöntemin seçimi ve belirli aralıklarla kontrol ziyaretleri birlikte planlanır. Yumurta kapsülleri dış etkilere karşı korunaklı olduğundan, tek seferlik müdahale yerine izleme odaklı bir program genellikle daha sağlıklı sonuç verir.",
      ]),
    ],
    serviceSlug: "hamam-bocegi-ilaclama",
    faq: [
      { q: "Kalorifer böceği neden olur?", a: "Genellikle market poşetleri, karton kutular veya ikinci el eşyalarla eve taşınır ya da apartmandaki tesisat hatlarından gelir. Mutfaktaki ısı, nem ve gıda artıkları yerleşmesini kolaylaştırır." },
      { q: "Kalorifer böceği temiz evde de olur mu?", a: "Evet. Temizlik yerleşmeyi zorlaştırır ancak tek başına engellemez; böcek eşyalarla veya komşu dairelerden gelebilir. Temizlik, profesyonel kontrolün etkisini artıran önemli bir destektir." },
      { q: "Kalorifer böceği ne kadar sürede çoğalır?", a: "Uygun koşullarda nimfler 6–10 haftada erişkin olur ve her yumurta kapsülünde 30–40 yumurta bulunur. Bu nedenle birkaç ay içinde ciddi bir popülasyon oluşabilir." },
      { q: "Kalorifer böceği uçar mı?", a: "Kanatları olmasına rağmen pratikte uçmaz; koşarak ve dar boşluklara saklanarak hareket eder." },
    ],
    sources: [
      { label: "Penn State Extension — German Cockroaches", url: "https://extension.psu.edu/german-cockroaches" },
      UC_COCKROACH,
      UKY_COCKROACH,
    ],
    seoText:
      "Mutfakta gece ortaya çıkan küçük, iki çizgili böcekler genellikle kalorifer böceğidir ve hızlı üredikleri için erken müdahale önem taşır. İST İlaçlama, İstanbul'da kalorifer böceği ilaçlama sürecini saklanma noktalarının tespiti, hijyen önerileri ve kontrol ziyaretleriyle birlikte yürütür. Ev, ofis ve restoran mutfaklarında Alman hamam böceği kontrolü için hamam böceği ilaçlama hizmet sayfamızdan ayrıntılı bilgi alabilirsiniz.",
    imageKey: "cockroachFloor",
  },

  /* 3 ─────────────────────────────── TAHTA KURUSU */
  {
    slug: "tahta-kurusu",
    name: "Tahta kurusu",
    altNames: ["yatak böceği", "yatak kurdu", "tahtakurusu", "duvar biti", "kan emen böcek"],
    scientific: "Cimex lectularius",
    group: "kan-emenler",
    summary:
      "Tahta kurusu, insan kanıyla beslenen, 4–7 mm boyunda, yassı, oval ve kırmızımsı kahverengi, kanatsız bir böcektir. Gündüz yatak dikişlerinde, baza ve karyola birleşimlerinde saklanır, gece uyuyan kişiyi ısırır. Çarşafta pas renkli lekeler, yumurta ve deri kalıntıları en tipik belirtileridir.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde 4–7 mm (elma çekirdeği büyüklüğünde); beslendikten sonra şişkin" },
      { label: "Rengi", value: "Kırmızımsı kahverengi; nimfler açık, neredeyse saydam" },
      { label: "Aktif olduğu dönem", value: "Gece, özellikle sabaha karşı; ısıtılan ortamlarda yıl boyu" },
      { label: "Yaşam süresi", value: "Erişkin olarak birkaç ay ile bir yıl arası; uzun süre aç kalabilir" },
      { label: "Beslenme", value: "Yalnızca kan; esas olarak insan" },
      { label: "Yaygın görüldüğü yerler", value: "Yatak dikişleri, baza, karyola, başlık arkası, priz ve süpürgelik çevresi" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Erişkin tahta kurusu yaklaşık elma çekirdeği büyüklüğündedir: 4–7 mm boyunda, yukarıdan bakıldığında oval ve kâğıt gibi yassıdır. Rengi kırmızımsı kahverengidir; kan emdikten sonra gövdesi uzar, şişer ve daha koyu kırmızıya döner. Kanatları yoktur, uçamaz ve zıplayamaz; yavaş ama kararlı biçimde yürür.",
        "Yumurtadan yeni çıkan nimfler 1 mm civarında, açık sarımsı ve neredeyse saydamdır; bu nedenle beslenmedikleri sürece fark edilmeleri zordur. Yumurtalar ise yaklaşık 1 mm boyunda, süt beyazı ve hafif kavisli olup genellikle kumaş dikişlerine ve ahşap çatlaklarına yapışık halde kümeler oluşturur.",
      ]),
      sec("yasam-dongusu", [
        "Tahta kurusu yumurta, beş nimf evresi ve erişkin evresinden geçer. Her nimf evresinden bir sonrakine geçebilmek için en az bir kez kan emmesi gerekir. Oda sıcaklığında ve düzenli beslenme imkânı olduğunda yumurtadan erişkine gelişim yaklaşık 5–8 hafta sürer; serin ortamlarda bu süre uzar.",
        "Bir dişi ömrü boyunca birkaç yüz yumurta bırakabilir. Erişkinler beslenme imkânı bulamadığında aylarca hayatta kalabilir. Bu dayanıklılık, boş kalan evlerde ya da kaldırılan mobilyalarda sorunun kendiliğinden bitmemesinin ve yeniden ortaya çıkmasının temel nedenidir.",
      ]),
      sec("nerede-yasar", [
        "Tahta kurusu konağının yakınında yaşamayı tercih eder; bu nedenle bireylerin büyük çoğunluğu yatağın birkaç metre çevresinde bulunur. Gündüzleri yatak dikişlerinde, baza ve karyola birleşimlerinde, başlık arkasında ve komodin çekmecelerinde saklanır. Yoğunluk arttıkça perde kıvrımları, süpürgelikler, priz kapakları, tablo arkaları ve kanepeler de kullanılır.",
        "Evden eve en sık bavul, sırt çantası, ikinci el mobilya ve yatakla taşınır. Oteller, yurtlar, misafirhaneler ve toplu taşıma, temizlik düzeyinden bağımsız olarak taşınma riskinin yüksek olduğu ortamlardır.",
      ], [
        "Yatak kenar dikişleri ve etiket altları",
        "Baza, karyola ve başlık birleşim yerleri",
        "Komodin, çekmece ve yatak yanındaki mobilyalar",
        "Priz, süpürgelik ve duvar çatlakları",
      ]),
      sec("belirtiler", [
        "En dikkat çekici belirti, sabah uyanıldığında kollarda, boyunda, sırtta veya bacaklarda görülen kaşıntılı kızarıklıklardır. Isırıklar sıklıkla sıra halinde veya küçük kümeler şeklinde dizilir. Ancak herkes ısırıklara aynı tepkiyi vermez; bazı kişilerde hiç iz oluşmayabilir. Bu nedenle tanı için ısırık görüntüsüne değil, fiziksel kanıta bakmak gerekir.",
        "Çarşaf, yastık kılıfı ve yatak dikişlerinde görülen pas rengi veya siyah nokta şeklindeki lekeler, böceğin dışkısıdır. Ezilmiş bireylerden kaynaklanan küçük kan lekeleri, deri değiştirme kabukları ve yumurta kümeleri de kesin işaretler arasındadır. Yoğun durumlarda odada tatlımsı, küfe benzer bir koku hissedilebilir.",
      ]),
      sec("riskler", [
        "Tahta kurusunun hastalık bulaştırdığına dair güçlü bir bilimsel kanıt bulunmamaktadır. Asıl sorun ısırıklara bağlı kaşıntı, ciltte tahriş ve kaşımaya bağlı ikincil enfeksiyonlardır. Bazı kişilerde ısırıklara karşı belirgin alerjik reaksiyonlar gelişebilir; böyle bir durumda hekime başvurulmalıdır.",
        "Tahta kurusunun etkisi çoğu zaman fiziksel olmaktan çok psikolojiktir. Uykusuzluk, kaygı ve yatağa girme korkusu sık görülür. Sorunun saklanması ya da geciktirilmesi, böceğin evin diğer odalarına ve komşu dairelere yayılmasına neden olabilir.",
      ]),
      sec("karistirilan-turler", [
        "Tahta kurusu en sık pire, kene ve kalorifer böceği nimfleriyle karıştırılır. Pire yanlardan basık, zıplayan ve çok küçük bir böcektir; tahta kurusu ise üstten basıktır ve zıplamaz. Kene sekiz bacaklıdır ve deriye tutunarak uzun süre beslenir. Hamam böceği nimfleri daha uzun, hızlı ve uzun antenlidir.",
        "Kuş veya yarasa yuvalarının yakınında görülen kuş ve yarasa tahta kuruları da insan tahta kurusuna çok benzer; yalnızca mikroskobik ayrıntılarla ayrılırlar. Pencere pervazında ya da çatı katında benzer böcekler görüyorsanız, kaynağın yuva olup olmadığını uzman bir gözle değerlendirmek gerekir.",
      ]),
      sec("onleme", [
        "Tahta kurusu ile ilgili en önemli koruma adımı, böceğin eve taşınmasını engellemektir. Seyahat dönüşü bavulları yatağın üzerine koymamak, giysileri yüksek ısıda yıkamak ve ikinci el mobilyaları dikkatle incelemek riski önemli ölçüde azaltır. Isı, tahta kurusunun tüm evrelerine karşı etkili, kimyasal içermeyen bir yöntemdir.",
        "Var olduğundan şüphelenilen bir durumda eşyaları rastgele başka odalara taşımak, böceği yaymaktan başka işe yaramaz. Önce kesin tespit yapılmalı, ardından planlı bir müdahale yapılmalıdır.",
      ], [
        "Otelde bavulu yatak yerine bavul sehpasına koyun; yatak dikişlerini kontrol edin",
        "Seyahat dönüşü giysileri yüksek sıcaklıkta yıkayın ve kurutucuda kurutun",
        "Yatak ve yastıklar için fermuarlı, böcek geçirmez kılıf kullanın",
        "Yatak çevresini ve bazayı düzenli olarak elektrik süpürgesiyle süpürün; torbayı kapatarak atın",
        "Sokaktan veya ikinci el alınan mobilyayı eve almadan önce ayrıntılı inceleyin",
      ]),
      sec("profesyonel-destek", [
        "Tahta kurusu, kendi kendine geçmeyen ve evde yapılan rastgele uygulamalarla genellikle çözülmeyen bir sorundur. Tek bir canlı birey, yumurta veya dışkı lekesi bulduğunuzda profesyonel destek almanız önerilir. Erken müdahale, hem sürenin hem de yayılımın sınırlanması açısından çok önemlidir.",
        "Profesyonel süreç, yatak ve mobilyaların sistematik incelenmesiyle başlar; ardından yaşam alanına uygun yöntem seçilir ve yumurtadan çıkan yeni nimfleri yakalamak için takip ziyaretleri planlanır. Apartmanlarda bitişik dairelerin de değerlendirilmesi sorunun tekrar etmemesi için faydalıdır.",
      ]),
    ],
    serviceSlug: "tahta-kurusu-ilaclama",
    faq: [
      { q: "Tahta kurusu kendiliğinden geçer mi?", a: "Hayır. Erişkinler aylarca aç kalabildiği için boş bırakılan evlerde bile sorun devam edebilir. Tespit edildiğinde planlı bir müdahale gerekir." },
      { q: "Tahta kurusu nereden gelir?", a: "Çoğunlukla bavul, çanta, ikinci el mobilya veya yatakla taşınır. Oteller, yurtlar ve toplu kullanım alanları en sık taşınma noktalarıdır; temizlikle doğrudan ilişkili değildir." },
      { q: "Tahta kurusu ısırığı nasıl anlaşılır?", a: "Genellikle sabah fark edilen, sıra veya küme halinde kaşıntılı kızarıklıklardır. Ancak ısırıklar başka böceklere de benzeyebilir; yatakta dışkı lekesi veya böcek bulunması daha güvenilir bir işarettir." },
      { q: "Tahta kurusu hastalık bulaştırır mı?", a: "Hastalık bulaştırdığına dair güçlü bir kanıt yoktur. Ancak kaşıntı, ciltte tahriş, uyku bozukluğu ve kaygıya neden olabilir; şikâyetlerinizde hekime danışın." },
      { q: "Tahta kurusu sıcaklıkta ölür mü?", a: "Yüksek ısı tahta kurusunun tüm evrelerine karşı etkilidir; bu nedenle çamaşırların yüksek sıcaklıkta yıkanıp kurutulması önerilir. Ev genelinde ise profesyonel planlama gerekir." },
    ],
    sources: [
      { label: "U.S. EPA — Bed Bugs", url: "https://www.epa.gov/bedbugs" },
      { label: "University of California IPM — Bed Bugs", url: "https://ipm.ucanr.edu/home-and-landscape/bed-bugs/" },
      { label: "University of Kentucky Entomology — Bed Bugs", url: "https://entomology.ca.uky.edu/ef636" },
    ],
    seoText:
      "Yatakta pas renkli lekeler, sabah fark edilen kaşıntılı izler ya da dikiş aralarında küçük kahverengi böcekler görüyorsanız tahta kurusu olasılığını erkenden değerlendirmek gerekir. İST İlaçlama, İstanbul'da tahta kurusu ilaçlama sürecini ayrıntılı yatak ve mobilya incelemesi, yaşam alanına uygun yöntem ve takip ziyaretleriyle planlar. Evler, oteller ve yurtlar için tahta kurusu kontrolü hizmetimiz hakkında bilgi almak üzere ilgili sayfayı ziyaret edebilirsiniz.",
    imageKey: "bedBug",
  },

  /* 4 ─────────────────────────────── PİRE */
  {
    slug: "pire",
    name: "Pire",
    altNames: ["kedi piresi", "köpek piresi", "ev piresi", "halı piresi", "pire böceği"],
    scientific: "Ctenocephalides felis",
    group: "kan-emenler",
    summary:
      "Pire, 1–3 mm boyunda, koyu kırmızımsı kahverengi, yanlardan basık ve kanatsız, kan emen bir böcektir. Güçlü arka bacaklarıyla çok yükseğe zıplar. Evlerde en sık görülen tür kedi piresidir; kedi ve köpeklerde yaşar, ancak insanları da ısırabilir. Bileklerdeki kaşıntılı kırmızı noktalar tipik belirtidir.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde 1–3 mm" },
      { label: "Rengi", value: "Koyu kırmızımsı kahverengi, parlak" },
      { label: "Aktif olduğu dönem", value: "Sıcak ve nemli aylarda artış; ısıtılan evlerde yıl boyu" },
      { label: "Yaşam süresi", value: "Konak üzerinde erişkin olarak birkaç hafta ile birkaç ay" },
      { label: "Beslenme", value: "Erişkinler kan emer; larvalar organik döküntü ve pire dışkısıyla beslenir" },
      { label: "Yaygın görüldüğü yerler", value: "Evcil hayvan yatakları, halı ve kilim, koltuk, bodrum ve boş kalan daireler" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Pire çıplak gözle görülebilen ama yakalaması zor, çok küçük bir böcektir. Gövdesi yanlardan basık olduğu için kıllar arasında rahatça hareket eder. Rengi koyu kırmızımsı kahverengidir ve parlak görünür. Kanatları yoktur; ancak arka bacakları son derece güçlüdür ve kendi boyunun onlarca katı yükseğe zıplayabilir.",
        "Evcil hayvanın tüyleri arasında hızlı hareket eden koyu noktalar veya tüy diplerinde biriken siyah, virgül şeklinde tanecikler pirenin varlığına işaret eder. Bu taneciklerin pire dışkısı olup olmadığını anlamak için nemli beyaz bir kâğıda koymak yeterlidir; kırmızımsı bir hale oluşursa sindirilmiş kan içerdiği anlaşılır.",
      ]),
      sec("yasam-dongusu", [
        "Pire tam başkalaşım geçirir: yumurta, larva, pupa ve erişkin. Dişi konak üzerinde yumurtlar, ancak yumurtalar kaygan olduğu için kısa sürede halıya, hayvan yatağına ve koltuklara dökülür. Yumurtadan çıkan, gözsüz ve kurt benzeri larvalar ışıktan kaçarak halı liflerinin derinine iner ve organik döküntüyle beslenir.",
        "Larvalar ipeksi bir koza örerek pupa evresine geçer. Koza içindeki erişkin, titreşim, ısı ve karbondioksit gibi bir konak sinyali alana kadar haftalarca, hatta aylarca bekleyebilir. Uzun süre boş kalan bir eve taşınıldığında ya da tatilden dönüldüğünde aniden yoğun pire ısırığıyla karşılaşılmasının nedeni budur. Koşullara bağlı olarak tüm döngü iki hafta ile birkaç ay arasında tamamlanır.",
      ]),
      sec("nerede-yasar", [
        "Erişkin pireler zamanlarının büyük bölümünü konak hayvanın üzerinde geçirir. Ancak toplam popülasyonun çok büyük kısmı yumurta, larva ve pupa olarak ev ortamında bulunur. Bu nedenle sorun yalnızca hayvanın üzerinde değil, yaşadığı ve dinlendiği her yerde ele alınmalıdır.",
        "Evlerde en yoğun bulundukları yerler hayvanın yattığı ve sık vakit geçirdiği noktalardır. Bodrumlar, sokak kedilerinin barındığı merdiven altları, bahçe içindeki gölgelik alanlar ve uzun süre boş kalan daireler de pirelerin birikebildiği yerler arasındadır.",
      ], [
        "Kedi ve köpek yatakları, battaniyeler",
        "Halı, kilim ve koltuk aralıkları",
        "Parke derzleri ve süpürgelik kenarları",
        "Bodrum, merdiven altı, otopark gibi sokak hayvanlarının uğradığı alanlar",
      ]),
      sec("belirtiler", [
        "Evcil hayvanların sık kaşınması, kendini ısırması, tüy dökülmesi ve özellikle kuyruk dibinde kızarıklık görülmesi en yaygın ilk işaretlerdir. Hayvanın tüyleri ince dişli bir tarakla tarandığında canlı pireler veya siyah dışkı taneleri bulunabilir.",
        "İnsanlarda ise pire ısırıkları genellikle ayak bileklerinde ve bacakların alt kısmında küçük, ortası belirgin, çok kaşıntılı kırmızı noktalar şeklinde görülür. Beyaz çorap giyerek halı üzerinde yürümek, çoraplara sıçrayan pireleri fark etmenin basit bir yoludur.",
      ]),
      sec("riskler", [
        "Pire ısırıkları yoğun kaşıntıya ve kaşımaya bağlı ciltte tahrişe neden olur. Bazı insanlarda ve özellikle hayvanlarda pire tükürüğüne karşı alerjik deri iltihabı gelişebilir. Yoğun pire yükü taşıyan küçük yavru hayvanlarda kan kaybı da önemli bir sorun olabilir.",
        "Kedi piresi, hayvanlarda ve nadiren çocuklarda görülen bir şerit kurdunun ara konağıdır. Ayrıca bazı bakteriyel enfeksiyonların taşınmasında rol oynayabileceği bilinmektedir. Evcil hayvanınızda kaşıntı veya deri sorunu varsa veteriner hekime, kendinizde süren şikâyetler varsa hekime başvurmanız önerilir.",
      ]),
      sec("karistirilan-turler", [
        "Pire en sık tahta kurusu ve küçük kenelerle karıştırılır. Tahta kurusu üstten basık, oval ve zıplamayan bir böcektir; yatak çevresinde yaşar. Kene ise sekiz bacaklıdır, zıplamaz ve deriye tutunarak saatlerce, hatta günlerce beslenir.",
        "Banyo ve lavabo çevresinde görülen küçük zıplayan canlılar çoğu zaman pire değil, nemli ortamları seven kuyruksokanlar (springtail) olur. Bunlar kan emmez ve ısırmaz. Kaynağı belirsiz ısırıklarda ise sivrisinek ve kuş akarları da değerlendirilmesi gereken olasılıklardır.",
      ]),
      sec("onleme", [
        "Pire kontrolünde başarının anahtarı, hayvan ile ev ortamının aynı anda ele alınmasıdır. Evcil hayvanın veteriner hekim önerisiyle düzenli olarak korunması, ev içindeki yeni nesillerin oluşmasını önemli ölçüde azaltır. Hayvana yönelik herhangi bir ürün mutlaka veteriner hekim tavsiyesiyle seçilmelidir.",
        "Ev ortamında ise mekanik temizlik çok etkilidir. Elektrik süpürgesinin titreşimi ve emişi hem larvaları hem de kozadaki pireleri uzaklaştırır; düzenli süpürme, sorunun büyümesini yavaşlatan en önemli adımdır.",
      ], [
        "Halı, koltuk ve süpürgelik kenarlarını sık aralıklarla süpürün; süpürge torbasını kapalı poşetle atın",
        "Hayvan yataklarını ve battaniyeleri yüksek sıcaklıkta yıkayın",
        "Evcil hayvanınızın düzenli kontrolünü veteriner hekiminizle planlayın",
        "Bodrum ve merdiven altlarında sokak hayvanlarının barınabileceği boşlukları kapatın",
        "Bahçede çim ve gölgelik alanları bakımlı tutun",
      ]),
      sec("profesyonel-destek", [
        "Evcil hayvan tedavi edildiği ve düzenli temizlik yapıldığı halde ısırıklar devam ediyorsa, ev ortamında yerleşik bir popülasyon olduğu düşünülebilir. Özellikle evcil hayvan olmayan bir evde pire görülmesi, taşınma sonrası aniden başlayan ısırıklar ya da bodrumda sokak hayvanı kaynaklı yoğunluk profesyonel değerlendirme gerektirir.",
        "Profesyonel süreçte kaynak alanlar belirlenir, ev ve ortak alanlar birlikte ele alınır ve pupaların açılma süresi dikkate alınarak takip ziyareti planlanır. Hayvan sahiplerine, veteriner hekimle koordineli ilerlemeleri önerilir.",
      ]),
    ],
    serviceSlug: "pire-ilaclama",
    faq: [
      { q: "Evde hayvan yokken pire olur mu?", a: "Olabilir. Önceki ev sakinlerinin hayvanlarından kalan kozalar, bodrumdaki sokak kedileri veya fareler pire kaynağı olabilir. Uzun süre boş kalan evlerde bu durum sık görülür." },
      { q: "Pire insanda yaşar mı?", a: "Kedi piresi insanı ısırabilir, ancak insan üzerinde kalıcı olarak yaşamaz ve üremez. Isırıklar genellikle ayak bileği ve bacaklarda görülür." },
      { q: "Pire ısırığı nasıl anlaşılır?", a: "Ayak bileklerinde ve bacaklarda küçük, çok kaşıntılı, ortası belirgin kırmızı noktalar şeklindedir. Şikâyetler sürerse veya alerjik reaksiyon gelişirse hekime başvurun." },
      { q: "Pire neden tatilden dönünce artar?", a: "Kozadaki erişkin pireler titreşim ve ısı gibi bir konak sinyali gelene kadar bekleyebilir. Ev yeniden kullanılmaya başlandığında çok sayıda pire aynı anda kozadan çıkar." },
    ],
    sources: [
      { label: "University of California IPM — Fleas", url: "https://ipm.ucanr.edu/home-and-landscape/fleas/" },
      { label: "University of Kentucky Entomology — Flea Control and Prevention", url: "https://entomology.ca.uky.edu/ef602" },
      { label: "University of Kentucky Entomology — Smarter Flea Control", url: "https://entomology.ca.uky.edu/ef628" },
    ],
    seoText:
      "Ayak bileklerinde kaşıntılı noktalar, sürekli kaşınan bir evcil hayvan ya da uzun süre boş kalmış bir evde aniden başlayan ısırıklar pire sorununa işaret edebilir. İST İlaçlama, İstanbul'da pire ilaçlama hizmetini ev ortamı, ortak alanlar ve bodrumların birlikte değerlendirildiği bir planla yürütür. Konut ve apartmanlarda pire kontrolü hakkında ayrıntılı bilgi almak ve keşif talebi oluşturmak için pire ilaçlama sayfamıza göz atabilirsiniz.",
    imageKey: "flea",
  },

  /* 5 ─────────────────────────────── KENE */
  {
    slug: "kene",
    name: "Kene",
    altNames: ["sert kene", "hayvan kenesi", "kene böceği", "Hyalomma kenesi", "KKKA kenesi"],
    scientific: "Ixodidae (sert keneler)",
    group: "kan-emenler",
    summary:
      "Kene, böcek değil örümceğimsiler sınıfına ait, kan emen bir eklembacaklıdır. Erişkinler sekiz bacaklıdır; aç haldeyken birkaç milimetre, kan emdikten sonra bir santimetreyi aşabilir. Çayır, mera, çalılık ve hayvan barınaklarında yaşar; deriye tutunarak günlerce beslenir ve bazı hastalıkların taşınmasında rol oynayabilir.",
    idCard: [
      { label: "Boyu", value: "Aç erişkinlerde yaklaşık 3–6 mm; kan emdikten sonra 1 cm ve üzeri" },
      { label: "Rengi", value: "Kahverengi, kırmızımsı kahverengi; bazı türlerde bacaklarda açık renkli halkalar" },
      { label: "Aktif olduğu dönem", value: "Ilık aylar; Türkiye'de özellikle ilkbahar ve yaz (Nisan–Eylül)" },
      { label: "Yaşam süresi", value: "Türe ve iklime bağlı olarak tüm döngü birkaç ay ile birkaç yıl" },
      { label: "Beslenme", value: "Her evrede kan; memeliler, kuşlar, sürüngenler ve insan" },
      { label: "Yaygın görüldüğü yerler", value: "Çayır, mera, çalılık, orman kenarı, hayvan barınakları, yüksek otlu bahçeler" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Keneler, örümcekler ve akreplerle aynı sınıfta yer alan örümceğimsilerdir. Erişkin ve nimf evrelerinde sekiz, larva evresinde altı bacakları vardır. Gövdeleri baş, göğüs ve karın olarak ayrılmış görünmez; tek parça, damla veya oval biçimli bir yapıya sahiptir. Sert kenelerin sırtında, erkeklerde tüm sırtı, dişilerde ise ön kısmı kaplayan sert bir kalkan bulunur.",
        "Türkiye'de Kırım-Kongo kanamalı ateşi (KKKA) bağlamında sıkça anılan Hyalomma marginatum, diğer kenelere göre iri, koyu kahverengi gövdeli ve bacakları açık renkli halkalarla bantlı bir türdür. Ancak bir kenenin türünü yalnızca görüntüsüne bakarak belirlemek uzmanlık gerektirir; bu nedenle her kene ciddiye alınmalıdır.",
      ]),
      sec("yasam-dongusu", [
        "Sert keneler yumurta, larva, nimf ve erişkin evrelerinden geçer. Larva, nimf ve erişkin evrelerinin her birinde bir kez kan emmeleri gerekir. Dişi kene doyduktan sonra konaktan düşer ve toprağa veya korunaklı bir yarığa binlerce yumurta bırakır.",
        "Bazı türler her evrede farklı bir konak kullanırken, bazıları iki evreyi aynı konak üzerinde geçirir. Hyalomma türlerinin larva ve nimf evreleri genellikle kuşlar ve küçük memeliler üzerinde, erişkinleri ise büyükbaş hayvanlarda beslenir. Türe ve iklime bağlı olarak tüm yaşam döngüsü birkaç aydan birkaç yıla kadar sürebilir.",
      ]),
      sec("nerede-yasar", [
        "Keneler çayırlar, meralar, çalılıklar, orman kenarları ve yüksek otlu alanlarda yaşar. Birçok tür, otların ucunda bekleyerek yanından geçen konağa tutunur. Hyalomma gibi bazı türler ise aktif olarak konağa doğru hareket edebilir. Hayvan barınakları, ahırlar ve hayvanların otlatıldığı alanlar kene yoğunluğunun yüksek olduğu yerlerdir.",
        "İstanbul'da kene riski özellikle kırsal karakterini koruyan ilçelerde, orman ve mera kenarlarında, piknik alanlarında ve bakımsız, otlu bahçelerde artar. Köpekler ve kediler de keneleri bahçeden eve taşıyabilir.",
      ], [
        "Yüksek otlu bahçeler ve boş arsalar",
        "Mera, çayır ve orman kenarları",
        "Ahır, kümes ve hayvan barınakları",
        "Bahçe duvarı, taş yığını ve çalı dipleri",
      ]),
      sec("belirtiler", [
        "Kenenin varlığı genellikle deriye tutunmuş bireyin fark edilmesiyle anlaşılır. Kene ısırığı çoğu zaman ağrısızdır; bu yüzden fark edilmesi gecikebilir. Kasık, koltuk altı, diz arkası, bel, kulak arkası ve saçlı deri kenelerin sıklıkla tutunduğu bölgelerdir.",
        "Bahçede veya açık alanda sık kene görülmesi, evcil hayvanların üzerinde tekrarlayan keneler bulunması ya da hayvan barınaklarında yoğunluk fark edilmesi, çevrede yerleşik bir popülasyon olduğunu gösterir. Kene ile temas sonrasındaki günlerde ateş, halsizlik, kas ağrısı, baş ağrısı, bulantı veya kanama gibi belirtiler ortaya çıkarsa vakit kaybetmeden sağlık kuruluşuna başvurulmalıdır.",
      ]),
      sec("riskler", [
        "Keneler bazı bakteriyel ve viral hastalıkların taşınmasında rol oynayabilir. Türkiye'de en çok bilinen örnek, Kırım-Kongo kanamalı ateşidir (KKKA). Dünya Sağlık Örgütü, bu hastalığın başlıca Hyalomma cinsi keneler aracılığıyla ve enfekte hayvanların kan ve dokularıyla temas yoluyla bulaşabildiğini bildirmektedir. Risk, özellikle hayvancılıkla uğraşanlar ve kırsal alanda çalışanlar için daha yüksektir.",
        "Her kene ısırığı hastalık anlamına gelmez; ancak hiçbir kene hafife alınmamalıdır. Vücudunuzda kene görürseniz Sağlık Bakanlığı önerileri doğrultusunda en yakın sağlık kuruluşuna başvurun. Keneyi çıplak elle ezmek, üzerine herhangi bir madde sürmek veya yakmak gibi uygulamalardan kaçının ve temas sonrası ortaya çıkan şikâyetleri hekiminize mutlaka bildirin.",
      ]),
      sec("karistirilan-turler", [
        "Küçük, aç keneler zaman zaman tahta kurusu, pire veya örümcekle karıştırılabilir. Tahta kurusu ve pire altı bacaklı böceklerdir; kene ise erişkin ve nimf evrelerinde sekiz bacaklıdır ve gövdesi tek parça görünür. Örümceklerde ise baş-göğüs ve karın bölümleri belirgin biçimde ayrılmıştır.",
        "Bitkiler üzerinde görülen kırmızı akarlar ve bahçedeki diğer küçük akarlar da kenelerle karıştırılabilir. Bunların çoğu insan için önemli bir risk oluşturmaz, ancak ayrımı yapmakta zorlanıyorsanız örneği sağlık kuruluşuna ya da bir uzmana göstermeniz en doğru yaklaşımdır.",
      ]),
      sec("onleme", [
        "Kene ile temas riskini azaltmanın en etkili yolu, açık alanlarda kişisel korunma önlemlerine dikkat etmek ve yaşanan çevreyi kenelerin barınamayacağı şekilde düzenlemektir. Doğa yürüyüşü, piknik ve bahçe işlerinden sonra vücudun dikkatle kontrol edilmesi alışkanlık haline getirilmelidir.",
        "Bahçe düzenlemesi de önemli bir adımdır. Kısa biçilmiş çim, güneş alan açık alanlar ve kuru ortamlar keneler için elverişsizdir.",
      ], [
        "Açık alanda açık renkli, uzun kollu giysiler giyin; pantolon paçalarını çorap içine alın",
        "Yürüyüş ve bahçe işi dönüşünde tüm vücudu ve saçlı deriyi kontrol edin",
        "Bahçedeki otları kısa tutun; çalı, yaprak ve taş yığınlarını kaldırın",
        "Evcil hayvanlarınızın kene kontrolünü veteriner hekiminizle planlayın",
        "Kıyafetleri dönüşte yüksek sıcaklıkta yıkayın ve kurutun",
      ]),
      sec("profesyonel-destek", [
        "Bahçenizde, site ortak alanlarında veya hayvan barınaklarında düzenli olarak kene görülüyorsa, çevresel bir kontrol planı gerekebilir. Özellikle çocukların oynadığı alanlar, evcil hayvanların dolaştığı bahçeler ve kırsal karakterli ilçelerdeki konutlar için bu değerlendirme önemlidir.",
        "Profesyonel süreçte kenelerin barındığı mikro alanlar belirlenir, peyzaj düzenlemesi önerileri verilir ve gerektiğinde mevsime uygun bir uygulama programı oluşturulur. Kişisel sağlıkla ilgili her türlü durumda ise ilk başvurulacak yerin sağlık kuruluşu olduğunu unutmayın.",
      ]),
    ],
    serviceSlug: "kene-kontrolu",
    faq: [
      { q: "Kene ısırırsa ne yapmalıyım?", a: "Sağlık Bakanlığı önerileri doğrultusunda en yakın sağlık kuruluşuna başvurun. Keneyi ezmeyin, üzerine madde sürmeyin veya yakmayın. Sonraki günlerde ateş, halsizlik veya kanama gibi şikâyetler olursa hemen hekime başvurun." },
      { q: "Her kene KKKA bulaştırır mı?", a: "Hayır. Kenelerin çok küçük bir kısmı virüs taşır ve her ısırık hastalığa yol açmaz. Ancak riski dışlamak mümkün olmadığından her kene teması ciddiye alınmalı ve sağlık kuruluşuna danışılmalıdır." },
      { q: "Keneler hangi aylarda çıkar?", a: "Türkiye'de keneler ilkbahardan sonbahara kadar aktiftir; en yoğun dönem genellikle Nisan–Eylül arasıdır. Ilık geçen sonbahar ve kış aylarında da görülebilirler." },
      { q: "Kene eve girer mi?", a: "Keneler genellikle dış ortamda yaşar; eve çoğunlukla evcil hayvanlar, giysiler veya bahçeden taşınarak girer. Bazı türler ise köpek kulübelerinde ve barınaklarda yerleşebilir." },
    ],
    sources: [
      { label: "World Health Organization — Crimean-Congo haemorrhagic fever", url: "https://www.who.int/news-room/fact-sheets/detail/crimean-congo-haemorrhagic-fever" },
      { label: "ECDC — Hyalomma marginatum factsheet", url: "https://www.ecdc.europa.eu/en/disease-vectors/facts/tick-factsheets/hyalomma-marginatum" },
      { label: "University of Kentucky Entomology — Ticks and Disease", url: "https://entomology.ca.uky.edu/ef618" },
    ],
    seoText:
      "Bahçenizde, site ortak alanlarında ya da evcil hayvanınızın üzerinde sık sık kene görüyorsanız çevresel bir değerlendirme yapılması faydalı olur. İST İlaçlama, İstanbul'da kene kontrolü hizmetini kenelerin barındığı alanların tespiti, peyzaj düzenleme önerileri ve mevsime uygun bir uygulama programıyla planlar. Bahçeli konutlar, siteler ve kırsal karakterli bölgeler için kene ilaçlama ve kontrol süreci hakkında hizmet sayfamızdan bilgi alabilirsiniz.",
    imageKey: "tick",
  },

  /* 6 ─────────────────────────────── SİVRİSİNEK */
  {
    slug: "sivrisinek",
    name: "Sivrisinek",
    altNames: ["ev sivrisineği", "Asya kaplan sivrisineği", "kaplan sivrisinek", "çizgili sivrisinek", "gece sivrisineği"],
    scientific: "Culex pipiens, Aedes albopictus",
    group: "kan-emenler",
    summary:
      "Sivrisinek, ince gövdeli, uzun bacaklı ve hortumlu, iki kanatlı bir sinektir. Yalnızca dişiler kan emer. Evlerde en yaygın tür olan Culex pipiens kahverengimsi ve gece aktiftir; siyah-beyaz çizgili Asya kaplan sivrisineği ise gündüz ısırır. Her ikisi de durgun suda ürer ve bazı hastalıkların taşınmasında rol oynayabilir.",
    idCard: [
      { label: "Boyu", value: "Yaklaşık 4–7 mm (bacaklar hariç)" },
      { label: "Rengi", value: "Culex: açık–koyu kahverengi; Aedes albopictus: siyah, bacak ve gövdede beyaz çizgiler" },
      { label: "Aktif olduğu dönem", value: "Culex: akşam ve gece; Aedes albopictus: gündüz, özellikle sabah ve ikindi; yoğun dönem Mayıs–Ekim" },
      { label: "Yaşam süresi", value: "Erişkin dişilerde genellikle 2–4 hafta; bazı Culex dişileri kışı korunaklı yerlerde geçirir" },
      { label: "Beslenme", value: "Dişiler yumurta gelişimi için kan emer; erkekler ve dişiler bitki özsuyu ve nektarla beslenir" },
      { label: "Yaygın görüldüğü yerler", value: "Bodrumlar, rögar ve foseptikler, durgun su birikintileri, saksı altlıkları, yağmur oluğu" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Sivrisinekler ince ve uzun bacaklı, tek çift kanatlı sineklerdir. Başlarının önünde, dişilerde kan emmeye uyarlanmış uzun bir hortum bulunur. Erkekler tüylü antenleriyle dişilerden ayrılır ve kan emmez. Evlerde en sık görülen ev sivrisineği Culex pipiens, kahverengimsi, sade görünümlü bir türdür ve dinlenirken gövdesini yüzeye paralel tutar.",
        "Asya kaplan sivrisineği Aedes albopictus ise siyah gövdesi ve bacaklarındaki belirgin beyaz halkalarla kolayca ayırt edilir; göğsünün sırt kısmında ortadan geçen tek bir beyaz çizgi bulunur. Bu tür ısırıkları çoğunlukla gündüz yapar ve ayak bileği, baldır gibi alçak bölgeleri hedefler.",
      ]),
      sec("yasam-dongusu", [
        "Sivrisinekler tam başkalaşım geçirir: yumurta, larva, pupa ve erişkin. Yumurta, larva ve pupa evrelerinin tamamı suda geçer. Culex dişileri yumurtalarını su yüzeyinde sal biçiminde kümeler halinde bırakır. Aedes albopictus ise yumurtalarını su seviyesinin hemen üzerindeki nemli kap çeperlerine yapıştırır; bu yumurtalar kurumaya dayanıklıdır ve su geldiğinde açılır.",
        "Sıcak havalarda yumurtadan erişkine gelişim bir haftadan biraz uzun sürebilir. Bu nedenle bir saksı altlığında ya da unutulmuş bir kovada biriken birkaç günlük su bile yeni bir sivrisinek neslinin oluşmasına yeterlidir. Culex pipiens'in bazı dişileri kışı bodrum gibi korunaklı yerlerde geçirir.",
      ]),
      sec("nerede-yasar", [
        "Ev sivrisineği organik madde bakımından zengin, durgun ve kirli suları tercih eder. Bina bodrumlarında biriken su, rögarlar, foseptikler, tıkalı oluklar ve yağmur suyu kanalları İstanbul'da en sık üreme noktalarıdır. Apartman bodrumlarındaki su birikintileri, tüm binayı etkileyen yoğun sivrisinek sorunlarının yaygın bir kaynağıdır.",
        "Asya kaplan sivrisineği ise küçük, yapay su kaplarını sever: saksı altlıkları, kovalar, eski lastikler, bidonlar, kullanılmayan süs havuzları ve çöp kutusu kapakları. Bu tür ülkemizin bazı bölgelerinde tespit edildiği bildirilen, Avrupa'da da yayılımı izlenen bir türdür.",
      ], [
        "Bodrumda biriken su ve rögar çevresi",
        "Saksı altlıkları, kovalar, eski lastikler",
        "Tıkalı oluk ve yağmur suyu gideri",
        "Kullanılmayan süs havuzu, varil ve su depoları",
      ]),
      sec("belirtiler", [
        "Sivrisinek varlığının en belirgin işareti, gece kulak yanında duyulan ince vızıltı ve sabah fark edilen kaşıntılı şişliklerdir. Isırıklar genellikle açıkta kalan kol, bacak ve yüz bölgesinde görülür. Gündüz, özellikle bahçede ya da balkonda oturulurken bacaklarda ısırık oluşuyorsa kaplan sivrisineği olasılığı akla gelmelidir.",
        "Bina ölçeğinde ise bodrum duvarlarında ve merdiven boşluklarında dinlenen yoğun sivrisinek kümeleri, su birikintilerinde kıpır kıpır hareket eden larvalar ve bodrum kapısı açıldığında havalanan sivrisinek bulutları, binada aktif bir üreme alanı olduğunu gösterir.",
      ]),
      sec("riskler", [
        "Sivrisinek ısırıkları çoğu kişide kaşıntılı şişliklere neden olur; bazı kişilerde, özellikle çocuklarda, daha büyük lokal reaksiyonlar gelişebilir. Kaşımaya bağlı yaralar ikincil enfeksiyonlara yol açabilir. Uyku bölünmesi de yaz aylarında önemli bir yaşam kalitesi sorunudur.",
        "Dünya Sağlık Örgütü, sivrisineklerin dünya genelinde bazı vektör kaynaklı hastalıkların taşınmasında önemli rol oynadığını belirtmektedir. Culex türleri Batı Nil virüsü, Aedes albopictus ise dang ve chikungunya gibi enfeksiyonlar bağlamında anılır. Bu riskler bölgeye ve döneme göre değişir; ateş, döküntü veya eklem ağrısı gibi şikâyetlerde hekime başvurun.",
      ]),
      sec("karistirilan-turler", [
        "Sivrisinekler en sık sivrisinek benzeri, ancak ısırmayan sineklerle karıştırılır. Göl ve deniz kıyılarında sürüler oluşturan su sinekleri (Chironomidae) kan emmez; dinlenirken ön bacaklarını havaya kaldırmalarıyla tanınır. Çok iri ve uzun bacaklı tipulidler de halk arasında dev sivrisinek olarak bilinir, ama ısırmaz.",
        "Tatarcıklar (Phlebotominae) ise sivrisinekten çok daha küçük, tüylü ve sessiz uçan kan emicilerdir. Banyo giderlerinde görülen küçük, kalp biçimli kanatlı sinekler ise lağım sineğidir ve sivrisinek değildir.",
      ]),
      sec("onleme", [
        "Sivrisinekle mücadelenin en etkili ve kalıcı yolu, üreme alanlarını ortadan kaldırmaktır. Haftada bir kez evin ve bahçenin etrafında dolaşıp su biriken her kabı boşaltmak, sivrisinek sayısını belirgin biçimde azaltır. Bina ölçeğinde bodrum su birikintilerinin giderilmesi, tüm sakinlerin şikâyetini azaltan en önemli adımdır.",
        "Fiziksel bariyerler de bireysel korunmada çok etkilidir. Sağlam sineklikler, cibinlik ve vantilatör kullanımı ısırık riskini düşürür.",
      ], [
        "Saksı altlıklarını, kovaları ve bidonları haftada bir boşaltın veya ters çevirin",
        "Oluk ve yağmur suyu giderlerini temiz ve akışkan tutun",
        "Bodrumdaki su sızıntılarını giderin, biriken suyu tahliye edin",
        "Su depolarını ve varilleri sıkı kapaklı tutun",
        "Pencere ve kapılara sağlam sineklik takın; yatakta cibinlik kullanın",
      ]),
      sec("profesyonel-destek", [
        "Bodrumda kalıcı su birikintisi, rögar veya foseptik kaynaklı yoğunluk, site bahçelerinde süs havuzları ya da çok sayıda dairenin aynı anda şikâyet etmesi profesyonel değerlendirme gerektirir. Bu durumlarda bireysel önlemler, kaynak devam ettiği sürece yeterli olmaz.",
        "Profesyonel süreçte üreme alanları haritalanır, larva ve erişkin evreleri ayrı ayrı ele alınır ve mevsim boyunca izleme planlanır. Site ve apartman yönetimleriyle birlikte yapılacak düzenli bir program, yaz aylarındaki şikâyetleri önemli ölçüde azaltabilir.",
      ]),
    ],
    serviceSlug: "sivrisinek-kontrolu",
    faq: [
      { q: "Sivrisinekler neden bodrumdan gelir?", a: "Bodrumlarda biriken durgun su, rögar ve foseptik çevresi, ev sivrisineği için ideal üreme alanıdır. Ayrıca bazı dişiler kışı bodrumlarda geçirir." },
      { q: "Gündüz ısıran sivrisinek hangisi?", a: "Siyah-beyaz çizgili Asya kaplan sivrisineği (Aedes albopictus) çoğunlukla gündüz ısırır. Ev sivrisineği ise akşam ve gece aktiftir." },
      { q: "Sivrisinek neden bazı insanları daha çok ısırır?", a: "Sivrisinekler karbondioksit, vücut ısısı, ter ve deri kokusu gibi sinyallerle konak bulur. Bu sinyallerin kişiden kişiye farklı olması, bazı kişilerin daha fazla ısırılmasına neden olabilir." },
      { q: "Sivrisinek ne kadar yaşar?", a: "Erişkin dişiler genellikle 2–4 hafta yaşar. Ancak yeni nesiller sürekli suda geliştiği için üreme alanı kaldırılmadan sorun bitmez." },
    ],
    sources: [
      { label: "World Health Organization — Vector-borne diseases", url: "https://www.who.int/news-room/fact-sheets/detail/vector-borne-diseases" },
      { label: "ECDC — Aedes albopictus factsheet", url: "https://www.ecdc.europa.eu/en/disease-vectors/facts/mosquito-factsheets/aedes-albopictus" },
      { label: "University of California IPM — Mosquitoes", url: "https://ipm.ucanr.edu/home-and-landscape/mosquitoes/" },
    ],
    seoText:
      "Yaz akşamlarını zorlaştıran sivrisinek sorununun kaynağı çoğu zaman binanın bodrumundaki birikmiş su, rögarlar ya da bahçedeki unutulmuş kaplardır. İST İlaçlama, İstanbul'da sivrisinek kontrolü hizmetini üreme alanlarının tespiti, larva ve erişkin evrelerinin ayrı değerlendirilmesi ve mevsimlik izlemeyle planlar. Apartman, site ve bahçeli konutlar için sivrisinek ilaçlama ve kontrol programı hakkında bilgi almak üzere hizmet sayfamızı ziyaret edebilirsiniz.",
    imageKey: "mosquito",
  },

  /* 7 ─────────────────────────────── EV FARESİ */
  {
    slug: "ev-faresi",
    name: "Ev faresi",
    altNames: ["fare", "küçük fare", "ev sıçanı", "gri fare", "tarla faresi"],
    scientific: "Mus musculus",
    group: "kemirgenler",
    summary:
      "Ev faresi, 6–10 cm gövde uzunluğunda, gövdesi kadar uzun ince kuyruklu, iri kulaklı ve gri-kahverengi tüylü küçük bir kemirgendir. 6 mm kadar dar açıklıklardan geçebilir. Gece aktiftir; mutfak, kiler ve duvar boşluklarında yuvalanır. 3–6 mm uzunluğunda, uçları sivri dışkılar en tipik belirtisidir.",
    idCard: [
      { label: "Boyu", value: "Gövde 6–10 cm, kuyruk 5–10 cm; ağırlık yaklaşık 12–30 g" },
      { label: "Rengi", value: "Gri-kahverengi sırt, daha açık renkli karın" },
      { label: "Aktif olduğu dönem", value: "Gece; soğuk aylarda binalara girişi artar" },
      { label: "Yaşam süresi", value: "Doğada genellikle yaklaşık 1 yıl" },
      { label: "Beslenme", value: "Tahıl, tohum, kuru gıda; az miktarda ve sık aralıklarla beslenir" },
      { label: "Yaygın görüldüğü yerler", value: "Mutfak dolapları, kiler, duvar ve tavan boşlukları, depo, beyaz eşya altı" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Ev faresi küçük, narin yapılı bir kemirgendir. Gövdesi 6–10 cm uzunluğundadır; ince ve tüysüz görünen kuyruğu gövdesi kadar ya da biraz daha uzundur. Kulakları vücuduna göre iri, gözleri küçük ve siyah, burnu sivridir. Sırt tüyleri gri ile açık kahverengi arasında değişir, karın kısmı daha açık renklidir.",
        "Yavru sıçanlarla sık karıştırılır; ancak genç bir sıçanın başı ve ayakları gövdesine göre orantısız biçimde iridir, ev faresinin ise başı ve ayakları küçüktür. Ev faresi meraklıdır, yeni nesneleri hızla inceler ve dikey yüzeylere, kablolara ve borulara rahatça tırmanabilir.",
      ]),
      sec("yasam-dongusu", [
        "Ev faresi son derece hızlı çoğalır. Dişiler yaklaşık 6–8 haftalıkken üreyebilir hale gelir. Gebelik yaklaşık üç hafta sürer ve her doğumda genellikle 5–6 yavru dünyaya gelir. Uygun koşullarda bir dişi yılda 5–10 kez doğum yapabilir.",
        "Bu hız, eve giren birkaç farenin birkaç ay içinde ciddi bir popülasyona dönüşebileceği anlamına gelir. Fareler küçük aile grupları halinde yaşar ve genellikle yuvalarının birkaç metre çevresinde dolaşır; bu dar hareket alanı, kontrol çalışmalarında doğru noktaların seçilmesini önemli kılar.",
      ]),
      sec("nerede-yasar", [
        "Ev faresi binaların içine son derece iyi uyum sağlamıştır. Yuvasını kâğıt, kumaş, yalıtım malzemesi ve kartondan oluşturur; bunun için duvar içleri, asma tavanlar, mutfak dolaplarının arkası ve beyaz eşyaların motor bölmeleri gibi sıcak ve korunaklı boşlukları seçer.",
        "Binaya çoğunlukla boru ve kablo geçişleri, kapı altı boşlukları, havalandırma menfezleri ve temel çatlakları yoluyla girer. Bir kurşun kalem kalınlığındaki, yaklaşık 6 mm'lik açıklık bile bir farenin geçmesine yeterlidir. Soğuk havaların başlamasıyla birlikte dış ortamdan binalara girişler belirgin biçimde artar.",
      ], [
        "Mutfak dolabı arkası ve süpürgelik boşlukları",
        "Fırın, buzdolabı ve bulaşık makinesi altı",
        "Asma tavan, duvar içi ve çatı arası",
        "Depo, kiler ve karton yığınları",
      ]),
      sec("belirtiler", [
        "En güvenilir belirti, 3–6 mm uzunluğunda, pirinç tanesi büyüklüğünde, koyu renkli ve uçları sivri dışkılardır. Fareler gün içinde çok sayıda dışkı bıraktığı için bu izler dolap köşelerinde, çekmecelerde ve gıda paketlerinin çevresinde hızla birikir.",
        "Gıda ambalajlarında kemirme izleri, ufalanmış kâğıt ve kumaş parçaları, gece duvar veya tavan içinden gelen tıkırtı ve tırmalama sesleri de sık görülür. Yoğun durumlarda keskin, amonyak benzeri bir idrar kokusu oluşur. Evcil kedi ve köpeklerin belirli bir dolap ya da duvar önünde ısrarla beklemesi de dikkat edilmesi gereken bir işarettir.",
      ]),
      sec("riskler", [
        "Fareler idrar, dışkı ve tüyleriyle gıdaları ve yüzeyleri kirletebilir. Bu yolla bazı bakteriyel enfeksiyonların ve diğer kemirgen kaynaklı hastalıkların taşınmasında rol oynayabilecekleri bilinmektedir. Fare dışkısı ve idrar kalıntıları ayrıca alerjik şikâyetleri ve astımı artırabilir.",
        "Kemirme davranışı yapısal riskler de yaratır. Fareler elektrik kablolarını, su borularını ve yalıtım malzemelerini kemirebilir; bu durum kısa devre ve yangın riskini artırabilir. Fare dışkısıyla kirlenmiş alanları kuru süpürmek yerine nemli bezle temizlemek ve eldiven kullanmak önerilir. Şüpheli bir sağlık şikâyetinde hekime başvurun.",
      ]),
      sec("karistirilan-turler", [
        "Ev faresi en sık genç sıçanlarla karıştırılır. Yavru sıçanın başı ve ayakları gövdesine göre iri, kuyruğu ise gövdesinden kısadır; dışkıları da daha kalındır. Sıçan dışkısı genellikle 12 mm'den uzundur.",
        "Bahçeli evlerde görülen tarla fareleri ve sivri fareler de ev faresine benzeyebilir. Sivri fareler aslında kemirgen değil böcekçil memelilerdir; çok uzun, sivri bir burunları ve küçük gözleri vardır. Türü doğru belirlemek, giriş noktalarının ve kontrol yönteminin seçiminde önemlidir.",
      ]),
      sec("onleme", [
        "Fare kontrolünün temeli, binaya girişi fiziksel olarak engellemektir. Boru ve kablo geçişleri, kapı altları ve havalandırma açıklıkları; farelerin kemiremeyeceği metal tel örgü, çelik yünü ve çimento esaslı dolgu malzemeleriyle kapatılmalıdır. Köpük dolgular tek başına yeterli değildir, çünkü fareler bunları kolayca kemirir.",
        "Gıda ve barınak imkânını azaltmak da en az yalıtım kadar önemlidir. Fareler çok az miktarda gıdayla yaşayabildiğinden, ufak kırıntılar bile yeterli olabilir.",
      ], [
        "Kuru gıdaları cam, metal veya sert plastik kaplarda saklayın",
        "Kapı altlarına fırçalı bant takın; boru geçişlerini tel örgü ile kapatın",
        "Çöpleri kapaklı kovada tutun ve düzenli olarak boşaltın",
        "Evcil hayvan ve kuş yemlerini gece açıkta bırakmayın",
        "Depolarda karton yerine kapaklı plastik kutu kullanın; eşyaları zeminden yükseltin",
      ]),
      sec("profesyonel-destek", [
        "Taze dışkı, gece duyulan sesler veya kemirme izleri birkaç günden uzun sürüyorsa, ev içinde yerleşik bir grup olduğu düşünülebilir. Gıda işletmeleri, depolar ve apartmanlar gibi alanlarda ise tek bir farenin bile görülmesi profesyonel değerlendirme gerektirir.",
        "Profesyonel süreçte giriş noktaları ve hareket hatları belirlenir, yapısal yalıtım önerileri sunulur, insan, evcil hayvan ve çevre güvenliği gözetilerek uygun kontrol yöntemi seçilir ve düzenli takip yapılır. Kalıcı sonuç için yalıtım ve izlemenin birlikte yürütülmesi önemlidir.",
      ]),
    ],
    serviceSlug: "fare-ve-kemirgen-kontrolu",
    faq: [
      { q: "Eve fare neden girer?", a: "Fareler sıcak, korunaklı bir barınak ve gıda kaynağı arar. Soğuk havaların başlamasıyla boru geçişleri, kapı altları ve havalandırma açıklıklarından binalara girişleri artar." },
      { q: "Fare ne kadar küçük bir delikten girer?", a: "Ev faresi yaklaşık 6 mm genişliğindeki, kabaca bir kurşun kalem kalınlığındaki açıklıktan geçebilir. Bu nedenle küçük boşlukların da kapatılması gerekir." },
      { q: "Fare dışkısı nasıl anlaşılır?", a: "Ev faresi dışkısı 3–6 mm uzunluğunda, koyu renkli ve uçları sivridir. Sıçan dışkısı ise genellikle 12 mm'den uzun ve daha kalındır." },
      { q: "Tek bir fare görmek sorun mudur?", a: "Fareler gece aktif ve hızlı üreyen hayvanlar olduğu için görülen bir birey genellikle daha fazlasının varlığına işaret eder. Dışkı ve kemirme izlerini kontrol etmeniz önerilir." },
    ],
    sources: [
      { label: "University of California IPM — House Mouse", url: "https://ipm.ucanr.edu/home-and-landscape/house-mouse/" },
      { label: "University of Kentucky Entomology — Control of Mice", url: "https://entomology.ca.uky.edu/ef617" },
    ],
    seoText:
      "Dolap köşelerinde sivri uçlu küçük dışkılar, kemirilmiş gıda paketleri ya da gece duvar içinden gelen tıkırtılar ev faresinin varlığına işaret edebilir. İST İlaçlama, İstanbul'da fare ve kemirgen kontrolü hizmetini giriş noktalarının tespiti, yapısal yalıtım önerileri ve düzenli izleme adımlarıyla yürütür. Evler, gıda işletmeleri ve depolar için fare ilaçlama ve kemirgen kontrol programı hakkında hizmet sayfamızdan ayrıntılı bilgi alabilirsiniz.",
    imageKey: "mouse",
  },

  /* 8 ─────────────────────────────── SIÇAN */
  {
    slug: "sican",
    name: "Sıçan",
    altNames: ["lağım faresi", "kanalizasyon faresi", "büyük fare", "çatı sıçanı", "kara sıçan", "göçmen sıçan"],
    scientific: "Rattus norvegicus, Rattus rattus",
    group: "kemirgenler",
    summary:
      "Sıçan, ev faresinden çok daha iri, 18–25 cm gövdeli bir kemirgendir. İstanbul'da en yaygın tür olan lağım sıçanı (Rattus norvegicus) iri, küt burunlu ve kısa kuyrukludur; kanalizasyon ve zemin katlarda yaşar. Çatı sıçanı (Rattus rattus) daha ince, uzun kuyruklu ve iyi tırmanıcıdır. 12–20 mm'lik iri dışkılar tipik belirtidir.",
    idCard: [
      { label: "Boyu", value: "Gövde 16–25 cm; lağım sıçanında 200–500 g, çatı sıçanında 150–250 g" },
      { label: "Rengi", value: "Lağım sıçanı: gri-kahverengi; çatı sıçanı: koyu gri, siyahımsı veya kahverengi" },
      { label: "Aktif olduğu dönem", value: "Gece, özellikle gün batımından sonra ve sabaha karşı" },
      { label: "Yaşam süresi", value: "Doğada genellikle yaklaşık 1 yıl" },
      { label: "Beslenme", value: "Her şeyi yiyen; gıda atıkları, tahıl, et, meyve; günlük su ihtiyacı yüksek" },
      { label: "Yaygın görüldüğü yerler", value: "Kanalizasyon, rögar, çöp alanları, bodrum ve zemin katlar, çatı arası, iskeleler" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Lağım sıçanı, Türkiye'de kentsel alanlarda en sık karşılaşılan sıçan türüdür. Gövdesi iri ve tıknaz, burnu küt, kulakları gövdesine göre küçük ve tüylüdür. Pullu kuyruğu gövdesinden biraz kısadır. Tüyleri gri-kahverengi, karnı daha açık renklidir. İyi yüzer ve toprak altında yuva tüneli kazar.",
        "Çatı sıçanı ya da kara sıçan ise daha ince yapılı, sivri burunlu ve iri kulaklıdır. Kuyruğu gövdesinden uzundur ve tırmanırken denge sağlar. Kablolar, ağaç dalları ve borular üzerinden çatılara kolayca ulaşır. İki tür arasındaki fark, kontrol stratejisinin zemin mi yoksa üst katlar mı odaklı olacağını belirlediği için önemlidir.",
      ]),
      sec("yasam-dongusu", [
        "Sıçanlar yaklaşık 2–3 aylıkken üreyebilir hale gelir. Gebelik yaklaşık üç hafta sürer ve her doğumda ortalama 6–12 yavru dünyaya gelir. Uygun gıda ve barınak koşullarında bir dişi yılda birkaç kez doğum yapabilir.",
        "Sıçanlar koloniler halinde yaşar ve belirgin bir sosyal hiyerarşiye sahiptir. Yeni nesnelere karşı temkinlidir; alışılmadık bir şey gördüklerinde bir süre ondan uzak dururlar. Bu davranış, kontrol çalışmalarının sabırla ve planlı biçimde yürütülmesini gerektirir. Her gece aynı yolları kullanma eğilimleri ise hareket hatlarının belirlenmesini kolaylaştırır.",
      ]),
      sec("nerede-yasar", [
        "Lağım sıçanı adından da anlaşılacağı gibi kanalizasyon hatlarında, rögarlarda, dere yataklarında, çöp alanlarında ve toprak altındaki tünellerde yaşar. Binalara çoğunlukla bodrum ve zemin katlardaki kırık gider borularından, rögar bağlantılarından ve temel çatlaklarından girer. Yaklaşık 12 mm genişliğindeki bir açıklık, genç bir sıçanın geçmesine yeterlidir.",
        "Çatı sıçanı ise yüksek noktaları tercih eder; çatı araları, asma tavanlar, ağaç üstleri ve sarmaşıklarla kaplı duvarlar tipik yaşam alanlarıdır. Liman bölgeleri, depolar ve eski ahşap yapılarda daha sık görülür.",
      ], [
        "Kanalizasyon, rögar ve kırık gider hatları",
        "Bodrum, kazan dairesi ve çöp odası",
        "Bahçe, çöp konteyneri ve kompost çevresi",
        "Çatı arası, asma tavan ve ağaçlık alanlar (çatı sıçanı)",
      ]),
      sec("belirtiler", [
        "Sıçan dışkıları 12–20 mm uzunluğunda, kalın ve kapsül biçimlidir; genellikle hareket hatları boyunca kümeler halinde bulunur. Duvar dipleri ve kapı kenarlarında, tüylerindeki yağ ve kirden kaynaklanan koyu sürtünme izleri oluşur.",
        "Bahçe, duvar dibi ve çöp alanı çevresinde toprakta açılmış 7–10 cm çapında yuva delikleri, kemirilmiş kapı ve ahşap kenarları, kırık plastik borular ve tavan içinden gelen ağır ayak sesleri de sık görülen işaretlerdir. Tuvalet veya zemin süzgeci çevresinde ıslak izler, kanalizasyon bağlantılı bir girişe işaret edebilir.",
      ]),
      sec("riskler", [
        "Sıçanlar idrar ve dışkılarıyla gıdaları, suyu ve yüzeyleri kirletebilir. Leptospiroz başta olmak üzere bazı bakteriyel enfeksiyonların ve kemirgen kaynaklı diğer hastalıkların taşınmasında rol oynayabilecekleri bilinmektedir. Sıçan ısırıkları nadir olsa da enfeksiyon riski taşır; ısırık veya çizik durumunda vakit kaybetmeden sağlık kuruluşuna başvurulmalıdır.",
        "Sıçanların kemirme gücü oldukça yüksektir; elektrik kablolarına, su ve gider borularına, yalıtım malzemelerine ve stoklanan ürünlere ciddi zarar verebilirler. Gıda işletmeleri ve depolar için hem hijyen hem de ekonomik kayıp açısından önemli bir risk oluştururlar.",
      ]),
      sec("karistirilan-turler", [
        "Sıçanlar en sık ev faresiyle karıştırılır. Ev faresi çok daha küçük, iri kulaklı ve küçük ayaklıdır; dışkısı 3–6 mm uzunluğunda ve sivri uçludur. Genç bir sıçanı ise orantısız büyük başından ve iri ayaklarından ayırt etmek mümkündür.",
        "Dere kenarlarında görülen bazı su kemirgenleri ve yaban gelinciği gibi küçük memeliler de uzaktan sıçana benzetilebilir. Lağım sıçanı ve çatı sıçanı arasındaki ayrım ise burun biçimi, kulak büyüklüğü ve kuyruk uzunluğuna bakılarak yapılır.",
      ]),
      sec("onleme", [
        "Sıçan kontrolünde yapısal önlemler belirleyicidir. Bodrum ve zemin katlardaki kırık gider boruları onarılmalı, rögar kapakları sağlam ve oturur olmalı, boru ve kablo geçişleri metal tel örgü veya çimento esaslı dolguyla kapatılmalıdır. Zemin süzgeçlerinde geri dönüşü engelleyen kapaklı modeller tercih edilebilir.",
        "Sıçanlar düzenli gıda ve su kaynağı olan yerlerde kalıcı koloniler kurar. Çöp yönetimi, bu nedenle bina ve site ölçeğinde en önemli önleme adımıdır.",
      ], [
        "Çöp konteynerlerini kapalı tutun; çöp poşetlerini zemine bırakmayın",
        "Bodrumdaki kırık gider boruları ve rögar bağlantılarını onarın",
        "Bahçede düşen meyveleri ve evcil hayvan mamasını toplayın",
        "Duvar dibindeki odun, taş ve eşya yığınlarını kaldırın",
        "Çatıya uzanan ağaç dallarını budayın, sarmaşıkları kontrol altında tutun",
      ]),
      sec("profesyonel-destek", [
        "Sıçan görülmesi, iri dışkı veya toprakta yuva delikleri bulunması durumunda profesyonel destek almanız önerilir. Sıçanlar temkinli, zeki ve koloni halinde yaşayan hayvanlar olduğu için rastgele müdahaleler genellikle kalıcı sonuç vermez ve risklidir.",
        "Profesyonel süreç; kaynak ve giriş noktalarının tespiti, hareket hatlarının belirlenmesi, insan, çocuk ve evcil hayvan güvenliğini gözeten kontrol noktalarının kurulması ve düzenli izlemeyi kapsar. Apartman ve sitelerde belediye kanalizasyon hatlarıyla bağlantılı sorunlarda ilgili kurumlarla koordinasyon da gerekebilir.",
      ]),
    ],
    serviceSlug: "fare-ve-kemirgen-kontrolu",
    faq: [
      { q: "Sıçan ile fare arasındaki fark nedir?", a: "Sıçan çok daha iridir (gövde 16–25 cm), küt burunlu ve kalın gövdelidir; dışkısı 12–20 mm uzunluğundadır. Ev faresi ise 6–10 cm boyunda, iri kulaklı ve narindir; dışkısı 3–6 mm'dir." },
      { q: "Sıçan tuvaletten çıkar mı?", a: "Lağım sıçanı iyi bir yüzücüdür ve kanalizasyon hatları üzerinden gider ve klozetlere ulaşabildiği bilinmektedir. Bu nedenle zemin kat ve bodrumlarda gider bağlantılarının sağlam olması önemlidir." },
      { q: "Sıçanlar neden bahçede yuva yapar?", a: "Lağım sıçanı toprak altında tünel kazar; çöp, kompost, düşen meyve ve evcil hayvan maması gibi kaynaklar bahçeyi cazip hale getirir." },
      { q: "Sıçan ısırırsa ne yapmalı?", a: "Yarayı bol su ve sabunla yıkayıp vakit kaybetmeden bir sağlık kuruluşuna başvurun. Sıçan ısırıkları enfeksiyon riski taşıyabilir." },
    ],
    sources: [
      { label: "University of California IPM — Rats", url: "https://ipm.ucanr.edu/home-and-landscape/rats/" },
      { label: "University of Kentucky Entomology — How to Pest-Proof Your Home", url: "https://entomology.ca.uky.edu/ef641" },
    ],
    seoText:
      "Bodrumda iri dışkılar, bahçede toprak delikleri ya da çöp alanı çevresinde gece hareket eden sıçanlar, bina ölçeğinde planlı bir müdahale gerektirir. İST İlaçlama, İstanbul'da sıçan kontrolünü kaynak ve giriş noktalarının tespiti, güvenli kontrol noktaları ve düzenli izlemeyle yürütür. Apartmanlar, siteler, depolar ve gıda işletmeleri için fare ve kemirgen kontrolü, sıçan ilaçlama süreci ve keşif talebi için hizmet sayfamıza göz atabilirsiniz.",
    imageKey: "rat",
  },

  /* 9 ─────────────────────────────── KARINCA */
  {
    slug: "karinca",
    name: "Karınca",
    altNames: ["ev karıncası", "siyah karınca", "firavun karıncası", "şeker karıncası", "kanatlı karınca", "bahçe karıncası"],
    scientific: "Formicidae (ör. Lasius niger, Monomorium pharaonis)",
    group: "ev-bocekleri",
    summary:
      "Karıncalar, ince belli, dirsekli antenli ve koloni halinde yaşayan sosyal böceklerdir. Evlerde en sık siyah bahçe karıncası (Lasius niger, 3–5 mm) ve küçük, sarımsı firavun karıncası (Monomorium pharaonis, yaklaşık 2 mm) görülür. Tatlı ve yağlı gıdalara doğru düzenli sıralar halinde yürümeleri en tipik belirtidir.",
    idCard: [
      { label: "Boyu", value: "İşçilerde türe göre yaklaşık 1,5–5 mm; kraliçeler daha iri" },
      { label: "Rengi", value: "Siyah bahçe karıncası: koyu kahve–siyah; firavun karıncası: sarımsı–açık kahverengi" },
      { label: "Aktif olduğu dönem", value: "İlkbahar–sonbahar; firavun karıncası ısıtılan binalarda yıl boyu" },
      { label: "Yaşam süresi", value: "İşçiler haftalar–aylar; kraliçeler türe göre yıllarca" },
      { label: "Beslenme", value: "Şeker, bal özü, yağ, protein ve ölü böcekler" },
      { label: "Yaygın görüldüğü yerler", value: "Mutfak tezgâhı, pencere pervazı, duvar çatlakları, bahçe ve kaldırım kenarı" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Karıncaları diğer küçük böceklerden ayıran temel özellikler; baş, göğüs ve karın arasındaki belirgin ince bel, dirsek biçiminde kırılan antenler ve koloni halinde düzenli sıralar oluşturarak yürümeleridir. Evlerde görülen bireylerin büyük çoğunluğu kanatsız, kısır işçi karıncalardır.",
        "Siyah bahçe karıncası 3–5 mm boyunda, koyu kahverengi ile siyah arasında bir renge sahiptir ve genellikle bahçeden eve gelir. Firavun karıncası ise yaklaşık 2 mm boyunda, sarımsı ve yarı saydam görünümlü, çok küçük bir türdür; bina içinde, özellikle sıcak duvar boşluklarında yuvalanır. Hangi türle karşı karşıya olunduğu, kontrol yaklaşımını doğrudan belirler.",
      ]),
      sec("yasam-dongusu", [
        "Karıncalar tam başkalaşım geçirir: yumurta, larva, pupa ve erişkin. Kolonide yumurtlayan kraliçe, işçiler ve belirli dönemlerde ortaya çıkan kanatlı erkek ve dişiler bulunur. Siyah bahçe karıncasında yaz sonunda, sıcak ve nemli günlerde binlerce kanatlı birey aynı anda havalanarak çiftleşme uçuşu yapar; yeni koloniler bu şekilde kurulur.",
        "Firavun karıncası ise kanatlı uçuş yapmaz; kolonisi birden fazla kraliçe içerir ve bir grup işçinin kraliçe ve yavrularla birlikte yeni bir noktaya taşınmasıyla bölünerek çoğalır. Bu özellik, yanlış müdahaleler sonucunda kolonilerin bina içinde dağılıp daha da yayılmasına yol açabilir.",
      ]),
      sec("nerede-yasar", [
        "Siyah bahçe karıncası yuvasını bahçe toprağında, kaldırım taşlarının altında, duvar diplerinde ve saksılarda kurar. Eve kapı eşiği, pencere pervazı, duvar çatlakları ve kablo geçişleri yoluyla girer ve gıda bulduktan sonra koku izi bırakarak diğer işçileri aynı yola yönlendirir.",
        "Firavun karıncası ise sıcaklığı ve nemi sabit olan iç mekânları tercih eder. Duvar boşlukları, prizler, mutfak dolapları, ısıtma boruları çevresi ve elektrikli cihazların içi tipik yuva yerleridir. Hastaneler, oteller, apartmanlar ve gıda işletmeleri gibi büyük ve sürekli ısıtılan binalarda sorun oluşturur.",
      ], [
        "Bahçe toprağı, kaldırım ve taş altları",
        "Kapı eşikleri, pencere pervazları ve duvar çatlakları",
        "Mutfak tezgâhı, dolap içleri ve çöp çevresi",
        "Priz, duvar boşluğu ve ısıtma boruları (firavun karıncası)",
      ]),
      sec("belirtiler", [
        "En belirgin işaret, mutfak tezgâhında, pencere kenarında veya duvar dibinde ince bir hat halinde ilerleyen karınca sıralarıdır. Açıkta kalan şeker, bal, reçel, meyve ve evcil hayvan maması kısa sürede karıncalarla kaplanabilir.",
        "Bahçede taş aralarından ve kaldırım kenarlarından çıkan ince toprak tepecikleri, bahçe karıncası yuvalarına işaret eder. Yaz sonunda ev içinde aniden çok sayıda kanatlı karınca görülmesi ise yakın bir yuvadan çiftleşme uçuşu yapıldığını gösterir. Banyo ve mutfakta sürekli görülen çok küçük, sarımsı karıncalar firavun karıncası olasılığını akla getirir.",
      ]),
      sec("riskler", [
        "Ev karıncalarının büyük çoğunluğu insan sağlığı için doğrudan ciddi bir tehdit oluşturmaz. Ancak gıdalara ve gıda temas yüzeylerine girdikleri için hijyen sorunu yaratır, gıda kaybına neden olur. Bazı türler kendilerini savunurken ısırabilir; bu genellikle kısa süreli bir yanma hissinden ibarettir.",
        "Firavun karıncası ise farklı bir önem taşır. Hastaneler gibi hassas ortamlarda yaraların, steril malzemelerin ve serum hatlarının çevresinde dolaşabildiği ve bazı mikroorganizmaları yüzeylere taşıyabileceği bildirilmektedir. Bu nedenle sağlık kuruluşları ve gıda işletmelerinde dikkatle izlenmesi gerekir.",
      ]),
      sec("karistirilan-turler", [
        "Kanatlı karıncalar en sık kanatlı termitlerle karıştırılır. Karıncada bel ince ve belirgindir, antenler dirseklidir, ön kanatlar arka kanatlardan daha uzundur. Termitte ise bel kalındır, antenler düz ve boncuk dizisi gibidir, dört kanat aynı boydadır. Termit şüphesi, ahşap yapı açısından ayrıca değerlendirilmelidir.",
        "Ahşap içinde yuva yapan iri marangoz karıncaları (Camponotus) da evlerde zaman zaman görülür; bunlar ahşaba zarar verebildiği için bahçe karıncasından ayrılmalıdır. Bazı küçük karınca türleri ise yine sıkça firavun karıncasıyla karıştırılır.",
      ]),
      sec("onleme", [
        "Karınca kontrolünde en etkili kimyasal olmayan yöntemler, gıda kaynaklarını ortadan kaldırmak ve giriş yollarını kapatmaktır. Karıncalar koku izi kullandığı için, sıraların geçtiği yüzeyleri sabunlu suyla silmek bu izleri bozar ve yeni işçilerin yolu bulmasını zorlaştırır.",
        "Firavun karıncası gibi bina içinde yuvalanan türlerde, rastgele uygulamalar koloninin bölünüp dağılmasına neden olabilir. Bu türlerde tür tespitinden sonra planlı bir yaklaşım gereklidir.",
      ], [
        "Şeker, bal ve tatlı gıdaları sıkı kapanan kaplarda saklayın",
        "Tezgâhı ve yemek alanını her kullanımdan sonra silin, kırıntı bırakmayın",
        "Karınca sıralarının geçtiği yüzeyleri sabunlu suyla temizleyin",
        "Kapı eşiği, pencere pervazı ve duvar çatlaklarını dolgu ile kapatın",
        "Bitki dallarının ve sarmaşıkların duvara değmesini önleyin",
        "Evcil hayvan mama kabını beslenme sonrası kaldırın",
      ]),
      sec("profesyonel-destek", [
        "Temizlik ve giriş noktalarının kapatılmasına rağmen karıncalar her gün yeniden ortaya çıkıyorsa, yuva büyük olasılıkla bina içinde ya da çok yakınındadır. Çok küçük, sarımsı karıncaların mutfak ve banyoda sürekli görülmesi, prizlerden veya duvar boşluklarından karınca çıkması profesyonel değerlendirme gerektirir.",
        "Profesyonel süreçte önce tür tespiti yapılır, ardından yuvanın konumu ve karıncaların izlediği yollar belirlenir. Koloniyi bölmeden ele alan bir yöntem seçilir ve uygulama sonrası takip yapılır. Gıda işletmelerinde ve sağlık kuruluşlarında düzenli izleme programı önerilir.",
      ]),
    ],
    serviceSlug: "karinca-ilaclama",
    faq: [
      { q: "Evde karınca neden olur?", a: "Karıncalar genellikle gıda ve su arayarak bahçeden veya duvar çatlaklarından eve girer. Açıkta kalan tatlı gıdalar ve kırıntılar, koku izi sayesinde diğer işçileri aynı yola çeker." },
      { q: "Kanatlı karınca neden çıkar?", a: "Kanatlı karıncalar, yeni koloniler kurmak için çiftleşme uçuşu yapan erkek ve dişilerdir. Genellikle yaz sonunda sıcak ve nemli günlerde ortaya çıkar; ev içinde görülmeleri yakında bir yuva olduğunu düşündürür." },
      { q: "Firavun karıncası nasıl anlaşılır?", a: "Yaklaşık 2 mm boyunda, sarımsı ve yarı saydam, çok küçük bir karıncadır. Mutfak, banyo ve prizler çevresinde sürekli görülür ve bina içinde yuvalanır." },
      { q: "Karınca ile termit nasıl ayırt edilir?", a: "Karıncanın beli ince, antenleri dirseklidir ve ön kanatları arka kanatlarından uzundur. Termitin beli kalın, antenleri düz ve dört kanadı eşit uzunluktadır." },
    ],
    sources: [
      { label: "University of California IPM — Ants", url: "https://ipm.ucanr.edu/home-and-landscape/ants/" },
      { label: "University of Kentucky Entomology — Ant Control for Householders", url: "https://entomology.ca.uky.edu/ef619" },
    ],
    seoText:
      "Mutfak tezgâhında her gün yeniden beliren karınca sıraları ya da prizlerden çıkan küçük sarımsı karıncalar, yuvanın bina içinde olabileceğine işaret eder. İST İlaçlama, İstanbul'da karınca ilaçlama sürecine tür tespitiyle başlar; yuvanın ve geçiş yollarının belirlenmesi, koloniyi bölmeden ele alan yöntem seçimi ve takip adımlarıyla ilerler. Ev, ofis ve gıda işletmelerinde karınca kontrolü hakkında bilgi almak için ilgili hizmet sayfamızı inceleyebilirsiniz.",
    imageKey: "ants",
  },

  /* 10 ────────────────────────────── GÜMÜŞ BÖCEĞİ */
  {
    slug: "gumus-bocegi",
    name: "Gümüş böceği",
    altNames: ["gümüşçün", "kitap böceği", "banyo böceği", "şeker böceği", "kâğıt böceği"],
    scientific: "Lepisma saccharinum",
    group: "ev-bocekleri",
    summary:
      "Gümüş böceği, 10–15 mm boyunda, gümüş grisi pullarla kaplı, havuç biçimli ve kanatsız küçük bir böcektir. Başında uzun antenler, karın ucunda üç ince kuyruk teli bulunur. Nemli ve karanlık banyo, bodrum ve depolarda yaşar; kâğıt, tutkal, duvar kâğıdı ve nişastalı maddelerle beslenir. İnsan sağlığı için doğrudan tehlikeli değildir.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde yaklaşık 10–15 mm (anten ve kuyruk telleri hariç)" },
      { label: "Rengi", value: "Gümüş grisi, metalik parlaklıkta pullu" },
      { label: "Aktif olduğu dönem", value: "Gece; nemli ortamlarda yıl boyu" },
      { label: "Yaşam süresi", value: "Uzun ömürlü; uygun koşullarda birkaç yıl" },
      { label: "Beslenme", value: "Nişasta, şeker, kâğıt, tutkal, duvar kâğıdı, kumaş lifleri, küf" },
      { label: "Yaygın görüldüğü yerler", value: "Banyo, lavabo altı, bodrum, kitaplık, arşiv ve depo, süpürgelik arkası" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Gümüş böceği, ilkel yapılı ve kanatsız bir böcektir. Gövdesi önden geniş, arkaya doğru incelen bir havuç ya da damla biçimindedir ve tamamen gümüş grisi, metalik parlaklıktaki ince pullarla kaplıdır. Başında uzun ve ince antenler, karın ucunda ise geriye doğru uzanan üç adet ince kuyruk teli bulunur.",
        "Hareketleri balığın yüzmesini andırır; yüzeyde hızlı ve kıvrak biçimde kayarak ilerler. Işık yandığında hemen karanlık bir boşluğa kaçar. Yavrular erişkinlere çok benzer, yalnızca daha küçük ve daha açık renklidir; pulları ilk deri değiştirmelerden sonra belirginleşir.",
      ]),
      sec("yasam-dongusu", [
        "Gümüş böceği basit bir gelişim gösterir: yumurtadan çıkan yavru, erişkinin küçük bir kopyasıdır ve büyüdükçe defalarca deri değiştirir. Diğer pek çok böceğin aksine erişkin olduktan sonra da deri değiştirmeye devam eder.",
        "Gelişimi yavaştır; sıcaklık ve neme bağlı olarak yumurtadan erişkine geçiş birkaç ay ile birkaç yıl arasında sürebilir. Dişiler yumurtalarını küçük gruplar halinde çatlak ve aralıklara bırakır. Uzun ömürlü olması ve uzun süre aç kalabilmesi, az sayıda bireyin bile yıllarca aynı ortamda kalabilmesini sağlar.",
      ]),
      sec("nerede-yasar", [
        "Gümüş böceğinin yaşamı için en önemli koşul yüksek nemdir. Bu nedenle banyolar, lavabo altları, bodrumlar, çamaşır odaları ve nem sorunu olan dış cepheye bakan duvarlar en sık görüldüğü yerlerdir. Küflü yüzeyler ve iyi havalanmayan küçük alanlar onun için idealdir.",
        "Beslenme alışkanlıkları nedeniyle kitaplıklar, arşivler, karton kutularla dolu depolar ve duvar kâğıdı kaplı odalar da tercih ettiği alanlar arasındadır. Eve genellikle karton kutular, eski kitaplar ve depolanmış eşyalarla taşınır.",
      ], [
        "Banyo süpürgelikleri, küvet ve duş teknesi çevresi",
        "Lavabo altı dolaplar ve tesisat boşlukları",
        "Bodrum, çamaşır odası ve nemli depolar",
        "Kitaplık, arşiv ve karton kutu yığınları",
      ]),
      sec("belirtiler", [
        "Genellikle gece banyo ışığı yakıldığında küvet, lavabo veya zemin üzerinde hızla kaçan gümüş renkli böcekler görülür. Küvete düşen bireyler kaygan yüzeyden çıkamadığı için sabahları orada fark edilebilir.",
        "Kitap ciltlerinde, kartonlarda, fotoğraflarda ve duvar kâğıtlarında yüzeyden kazınmış gibi düzensiz kenarlı aşınmalar, sarımsı lekeler, küçük siyah dışkı noktaları ve dökülmüş gümüş pullar da varlığını gösterir. Belirgin bir nem sorunu olan evlerde bu işaretler daha sık görülür.",
      ]),
      sec("riskler", [
        "Gümüş böceği ısırmaz, sokmaz ve bilinen bir hastalığı taşımaz. Bu nedenle insan sağlığı açısından doğrudan tehlikeli kabul edilmez. Bununla birlikte dökülen pulları ve dışkıları ev tozuna karışarak hassas kişilerde alerjik şikâyetlere katkıda bulunabilir.",
        "Asıl zararı eşyalaradır. Kitaplar, belgeler, fotoğraflar, duvar kâğıtları, ciltli arşiv malzemeleri ve bazı kumaşlar zamanla zarar görebilir. Gümüş böceği varlığı ayrıca evde çözülmesi gereken bir nem ya da su sızıntısı sorununun dolaylı bir işareti olarak değerlendirilmelidir.",
      ]),
      sec("karistirilan-turler", [
        "Gümüş böceği en sık ateş böceği olarak da bilinen akrabası Thermobia domestica ile karıştırılır. Bu tür daha koyu, benekli bir görünüme sahiptir ve nem yerine sıcaklığı sever; fırın, kazan dairesi ve sıcak su boruları çevresinde görülür.",
        "Çok sayıda uzun bacağı olan ev kırkayağı (Scutigera coleoptrata) da hızlı hareketi nedeniyle gümüş böceğiyle karıştırılabilir; ancak kırkayağın her bölümünde bacak bulunur ve gümüş pulları yoktur. Banyoda görülen çok küçük, zıplayan kuyruksokanlar ise pullu değildir ve çok daha küçüktür.",
      ]),
      sec("onleme", [
        "Gümüş böceğiyle mücadelede en etkili yöntem nemi azaltmaktır. Nem oranı düştüğünde bu böcek hayatta kalmakta zorlanır ve popülasyon kendiliğinden geriler. Banyoların düzenli havalandırılması, sızıntıların onarılması ve bodrumlarda nem alma cihazı kullanılması bu nedenle önemlidir.",
        "Barınma ve besin imkânını sınırlamak da yardımcı olur. Saklanma boşluklarının kapatılması ve kâğıt malzemelerin doğru depolanması uzun vadede sorunu azaltır.",
      ], [
        "Banyoyu duş sonrası havalandırın; aspiratörü çalışır durumda tutun",
        "Musluk, boru ve gider sızıntılarını onarın",
        "Bodrum ve depolarda nem alma cihazı kullanın",
        "Kitap, belge ve fotoğrafları kapaklı plastik kutularda saklayın",
        "Süpürgelik ve fayans çatlaklarını dolgu ile kapatın",
        "Karton yığınlarını azaltın; düzenli olarak elektrik süpürgesi kullanın",
      ]),
      sec("profesyonel-destek", [
        "Nem kontrolü ve temizliğe rağmen gümüş böcekleri sık görülmeye devam ediyorsa ya da arşiv, kütüphane, müze deposu gibi değerli kâğıt malzemelerin bulunduğu alanlarda iz fark ediliyorsa profesyonel değerlendirme faydalı olur.",
        "Profesyonel süreçte nem kaynakları ve saklanma noktaları belirlenir, yapıya ve malzemeye uygun bir kontrol planı oluşturulur ve izleme yapılır. Özellikle sürekli nem sorunu olan binalarda tesisat ve yalıtım sorunlarının da ele alınması kalıcı sonuç için gereklidir.",
      ]),
    ],
    serviceSlug: "gumus-bocegi-kontrolu",
    faq: [
      { q: "Gümüş böceği neden olur?", a: "Gümüş böceği yüksek nemi sever. Havalandırması zayıf banyolar, su sızıntıları ve nemli bodrumlar yerleşmesini kolaylaştırır. Eve çoğunlukla karton kutu ve eski kitaplarla taşınır." },
      { q: "Gümüş böceği zararlı mı?", a: "Isırmaz, sokmaz ve bilinen bir hastalık taşımaz. Ancak kitap, belge, duvar kâğıdı ve bazı kumaşlara zarar verebilir; varlığı evde nem sorunu olduğunu da düşündürür." },
      { q: "Gümüş böceği ne yer?", a: "Nişasta ve şeker içeren maddelerle beslenir: kâğıt, tutkal, kitap cildi, duvar kâğıdı, bazı kumaş lifleri, un ve küf bunların başında gelir." },
      { q: "Gümüş böceği nasıl azaltılır?", a: "En etkili yöntem nemi düşürmektir: banyoyu havalandırmak, sızıntıları onarmak ve bodrumda nem alma cihazı kullanmak. Kâğıt malzemeleri kapaklı kutularda saklamak da yardımcı olur." },
    ],
    sources: [
      { label: "University of California IPM — Silverfish and Firebrats", url: "https://ipm.ucanr.edu/home-and-landscape/silverfish-and-firebrats/" },
      { label: "University of Kentucky Entomology — How to Pest-Proof Your Home", url: "https://entomology.ca.uky.edu/ef641" },
    ],
    seoText:
      "Banyoda gece kaçışan gümüş renkli böcekler ya da kitaplarda ve duvar kâğıtlarında beliren aşınmalar, gümüş böceğinin yanı sıra çözülmesi gereken bir nem sorununa da işaret eder. İST İlaçlama, İstanbul'da gümüş böceği kontrolü hizmetini nem kaynaklarının ve saklanma noktalarının tespiti, yapıya uygun yöntem ve izleme adımlarıyla planlar. Ev, arşiv ve depolar için gümüş böceği ilaçlama süreci hakkında hizmet sayfamızdan bilgi alabilirsiniz.",
    imageKey: "silverfish",
  },

  /* 11 ────────────────────────────── GÜVE */
  {
    slug: "guve",
    name: "Güve",
    altNames: ["elbise güvesi", "giysi güvesi", "kumaş güvesi", "un güvesi", "kiler güvesi", "mutfak güvesi"],
    scientific: "Tineola bisselliella, Plodia interpunctella",
    group: "ev-bocekleri",
    summary:
      "Güve, evlerde iki farklı grupta görülen küçük bir pervanedir. Elbise güvesi (Tineola bisselliella) 6–8 mm boyunda, altın-saman renklidir ve larvaları yün, ipek ve kürk gibi hayvansal liflere zarar verir. Un güvesi (Plodia interpunctella) ise kanatları iki renkli bir türdür; larvaları un, bakliyat ve kuru gıdalarda gelişir.",
    idCard: [
      { label: "Boyu", value: "Elbise güvesi 6–8 mm; un güvesi 8–10 mm (kanat açıklığı yaklaşık 12–20 mm)" },
      { label: "Rengi", value: "Elbise güvesi: parlak altın–saman sarısı; un güvesi: kanat dibi açık gri, uç kısmı bakır–kızıl kahve" },
      { label: "Aktif olduğu dönem", value: "Isıtılan iç mekânlarda yıl boyu; ilkbahar ve yazın artış" },
      { label: "Yaşam süresi", value: "Erişkinler 1–3 hafta; larva evresi koşullara göre haftalar ile aylar" },
      { label: "Beslenme", value: "Larvalar: yün, ipek, kürk, tüy (elbise güvesi); un, tahıl, kuruyemiş, kuru meyve (un güvesi). Erişkinler beslenmez" },
      { label: "Yaygın görüldüğü yerler", value: "Gardırop, sandık, halı altı, kiler, mutfak dolabı ve kuru gıda paketleri" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Elbise güvesi, altın-saman renginde, parlak ve oldukça küçük bir pervanedir. Kanatlarında belirgin desen yoktur; başında kızıl-turuncu tüylerden oluşan bir perçem bulunur. Işıktan kaçar ve çoğu zaman uçmak yerine kıvrak hareketlerle yürüyerek karanlık köşelere saklanır. Zarar veren evre ise beyaz, başı kahverengi, küçük tırtıl biçimli larvadır.",
        "Un güvesi, kanatları dinlenirken gövdesinin üzerine çatı gibi kapanan, biraz daha iri bir türdür. Kanatların gövdeye yakın üçte biri açık gri-krem, geri kalanı bakır veya kızıl kahverengidir; bu iki renkli görünüm onu kolayca tanıtır. Akşamları mutfakta zikzak çizerek uçtuğu sık görülür.",
      ]),
      sec("yasam-dongusu", [
        "Her iki tür de tam başkalaşım geçirir: yumurta, larva, pupa ve erişkin. Erişkin güveler beslenmez; tek amaçları çiftleşmek ve yumurta bırakmaktır. Bu yüzden zarar yalnızca larva evresinde ortaya çıkar. Elbise güvesi dişisi yumurtalarını doğrudan yün, kürk veya tüy içeren kumaşların üzerine bırakır.",
        "Un güvesi dişisi ise yumurtalarını kuru gıdaların içine ya da yakınına bırakır. Sıcak koşullarda yaşam döngüsü birkaç haftada tamamlanabilir; serin ortamlarda ise larva evresi aylarca sürebilir. Larvalar olgunlaştığında besin kaynağından uzaklaşarak duvar ve tavan köşelerinde koza örer.",
      ]),
      sec("nerede-yasar", [
        "Elbise güvesi karanlık, sessiz ve uzun süre dokunulmayan alanları tercih eder. Gardırop köşeleri, sandıklar, yatak altı kutuları, uzun süre giyilmeyen yün paltolar, halı ve kilimlerin mobilya altında kalan kısımları en sık zarar gördüğü yerlerdir. Kirli veya ter içeren kumaşlar larvalar için daha caziptir.",
        "Un güvesi ise mutfak dolapları ve kilerde, özellikle uzun süre bekleyen un, irmik, pirinç, bakliyat, kuruyemiş, kuru meyve, baharat ve evcil hayvan mamaları içinde gelişir. Eve çoğunlukla zaten bulaşık olan bir gıda paketiyle girer.",
      ], [
        "Gardırop, sandık ve vakumsuz saklama kutuları",
        "Halı, kilim ve döşemeli mobilya altları",
        "Kiler, mutfak dolabı ve açık gıda paketleri",
        "Evcil hayvan maması ve kuş yemi",
      ]),
      sec("belirtiler", [
        "Elbise güvesinde en tipik belirti, yün kazak, palto, takım elbise ve halılarda ortaya çıkan düzensiz delikler ve tüyleri aşınmış alanlardır. Kumaşın üzerinde ipeksi tüneller, kum tanesi gibi küçük dışkılar ve boş larva kozaları bulunabilir. Gardırop açıldığında uçuşan ya da yürüyen küçük altın renkli güveler de yaygın bir işarettir.",
        "Un güvesinde ise gıdaların içinde ve paket kenarlarında örümcek ağına benzer ipek iplikler, topaklanmış un, gıda içinde dolaşan küçük beyaz larvalar ve tavan-duvar birleşimlerinde kozalar görülür. Akşam mutfakta uçan küçük pervaneler, dolaplardan birinde kaynak olduğunu gösterir.",
      ]),
      sec("riskler", [
        "Güveler ısırmaz, sokmaz ve bilinen bir hastalık taşımaz. Elbise güvesinin zararı ekonomiktir: değerli yün halılar, kürkler, el dokuması kilimler ve kıyafetler kalıcı olarak zarar görebilir.",
        "Un güvesinde ise zarar gıda kaybı ve hijyenle ilgilidir. Larva, dışkı ve ipek ağlarla kirlenen gıdalar tüketime uygun değildir ve atılmalıdır. Bulaşık gıdaların yanlışlıkla tüketilmesi genellikle ciddi bir sağlık sorunu yaratmasa da, şikâyet durumunda hekime danışılması önerilir.",
      ]),
      sec("karistirilan-turler", [
        "Evlerde görülen her küçük pervane güve değildir. Banyoda duvarlarda duran, tüylü ve kalp biçimli kanatlı küçük canlılar lağım sineğidir. Akşam ışığa gelen pek çok pervane de dışarıdan giren ve evde üremeyen türlerdir.",
        "Halı ve kumaş zararlarında en sık karışıklık halı böcekleriyle yaşanır. Halı böceği larvaları kıllı, kahverengi ve tırtıl benzeridir; ipek tünel örmezler ve erişkinleri küçük, yuvarlak böceklerdir. Kumaş zararında hangi canlının sorumlu olduğunun doğru tespiti, uygun önlemin seçilmesi açısından önemlidir.",
      ]),
      sec("onleme", [
        "Güvelerle mücadelenin temelini düzenli temizlik, doğru saklama ve sıcaklık kontrolü oluşturur. Larvalar ışık, hareket ve rahatsız edilmeyi sevmez; bu nedenle düzenli kullanılan, havalandırılan ve fırçalanan kıyafetlerde sorun nadiren büyür.",
        "Mutfakta ise bulaşık paketlerin ayıklanması ve yeni alınan kuru gıdaların hava geçirmez kaplara aktarılması, un güvesinin yeniden çoğalmasını önleyen en önemli adımdır.",
      ], [
        "Yün ve kürk eşyaları temizledikten sonra kapalı, hava geçirmez torbalarda saklayın",
        "Kıyafetleri etiketine uygun olarak yüksek sıcaklıkta yıkayın; uygun olanları dondurucuda bekletebilirsiniz",
        "Gardırop ve halı altlarını düzenli olarak elektrik süpürgesiyle temizleyin",
        "Kuru gıdaları sıkı kapanan cam veya sert plastik kaplarda saklayın",
        "Bulaşık gıda paketlerini kapalı poşette hemen evden çıkarın; dolap raflarını temizleyin",
        "Uzun süre bekleyen bakliyat ve unu düzenli olarak tüketin, stok biriktirmeyin",
      ]),
      sec("profesyonel-destek", [
        "Temizlik ve ayıklamaya rağmen güveler görülmeye devam ediyorsa, kaynak gözden kaçan bir noktada olabilir: bir duvar halısı, eski bir yorgan, bir dolabın arkası ya da unutulmuş bir mama paketi. Değerli halı ve kilim koleksiyonları, kürk mağazaları, tekstil depoları ve gıda depolarında ise profesyonel değerlendirme önerilir.",
        "Profesyonel süreçte kaynak belirlenir, türe göre uygun yöntem seçilir ve gerekirse feromon tuzaklarıyla izleme yapılır. Bu tuzaklar yalnızca erkek güveleri yakalayarak popülasyon hakkında bilgi verir; tek başına bir çözüm değil, izleme aracıdır.",
      ]),
    ],
    serviceSlug: "guve-kontrolu",
    faq: [
      { q: "Güve neden olur?", a: "Elbise güvesi uzun süre dokunulmayan yün, ipek ve kürk eşyalarda; un güvesi ise bekleyen kuru gıdalarda çoğalır. Un güvesi eve genellikle bulaşık bir gıda paketiyle girer." },
      { q: "Güveler kıyafeti mi yer, larvası mı?", a: "Kumaşa zarar veren güvenin larvasıdır. Erişkin güveler beslenmez; yalnızca çiftleşir ve yumurta bırakır." },
      { q: "Mutfakta uçan küçük kelebekler nedir?", a: "Çoğunlukla un güvesidir. Kaynağı bulmak için un, bakliyat, kuruyemiş, baharat ve evcil hayvan maması paketleri kontrol edilmelidir." },
      { q: "Güveli un kullanılabilir mi?", a: "Larva, ipek ağ ve dışkı ile kirlenmiş gıdalar tüketime uygun değildir; kapalı poşette atılması önerilir." },
    ],
    sources: [
      { label: "University of California IPM — Clothes Moths", url: "https://ipm.ucanr.edu/home-and-landscape/clothes-moths/" },
      { label: "University of California IPM — Pantry Pests", url: "https://ipm.ucanr.edu/home-and-landscape/pantry-pests/" },
      { label: "University of Kentucky Entomology — Clothes Moths", url: "https://entomology.ca.uky.edu/ef609" },
    ],
    seoText:
      "Yün kıyafetlerde beliren delikler, halılarda aşınan alanlar ya da mutfakta akşamları uçan küçük pervaneler güve sorununun habercisi olabilir. İST İlaçlama, İstanbul'da güve kontrolü hizmetini tür tespiti, kaynak noktalarının belirlenmesi ve izlemeye dayalı bir yaklaşımla planlar. Evler, halı ve tekstil depoları ile gıda depoları için elbise güvesi ve un güvesi ilaçlama süreci hakkında güve kontrolü sayfamızdan ayrıntılı bilgi alabilirsiniz.",
    imageKey: "moth",
  },

  /* 12 ────────────────────────────── KARASİNEK */
  {
    slug: "karasinek",
    name: "Karasinek",
    altNames: ["ev sineği", "sinek", "mutfak sineği", "çöp sineği", "kara sinek"],
    scientific: "Musca domestica",
    group: "ev-bocekleri",
    summary:
      "Karasinek (ev sineği), 6–7 mm boyunda, gri renkli, göğsünün sırt kısmında dört koyu boyuna çizgi bulunan, iri kırmızımsı gözlü bir sinektir. Isırmaz; sünger benzeri ağız yapısıyla sıvı gıdaları emer. Çöp, gübre ve organik atıklarda ürer, sıcak aylarda çok hızlı çoğalır ve hijyen açısından önemli bir risk oluşturur.",
    idCard: [
      { label: "Boyu", value: "Erişkinlerde yaklaşık 6–7 mm" },
      { label: "Rengi", value: "Gri; göğüste dört koyu boyuna çizgi, karın sarımsı-gri; gözler kırmızımsı kahve" },
      { label: "Aktif olduğu dönem", value: "Gündüz; en yoğun dönem ilkbahar sonu–sonbahar" },
      { label: "Yaşam süresi", value: "Erişkin olarak genellikle 2–4 hafta" },
      { label: "Beslenme", value: "Şekerli sıvılar, gıda artıkları, çöp, gübre ve organik atık" },
      { label: "Yaygın görüldüğü yerler", value: "Çöp alanları, mutfaklar, ahır ve kümesler, gıda işletmeleri, açık pazar yerleri" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Karasinek, evlerde en sık görülen sinektir. Orta büyüklükte, yaklaşık 6–7 mm boyunda ve gri renklidir. Tanımadaki en güvenilir özellik, göğsünün sırt kısmında boylu boyunca uzanan dört koyu çizgidir. Gözleri iri ve kırmızımsı kahverengidir; dişilerde gözler arasındaki mesafe erkeklere göre daha geniştir.",
        "Ağız yapısı sünger gibidir ve sıvıları emmeye uyarlanmıştır; bu nedenle ısırmaz. Katı gıdaları ise üzerine tükürük salgılayarak yumuşatır ve ardından emer. Pencere camına, tavana ve ışık kaynaklarının çevresine konmayı sever; ellerini ve bacaklarını sık sık birbirine sürterek temizler.",
      ]),
      sec("yasam-dongusu", [
        "Karasinek tam başkalaşım geçirir: yumurta, larva (kurtçuk), pupa ve erişkin. Dişi, ömrü boyunca birkaç yüz yumurta bırakabilir; yumurtalar genellikle çöp, gübre, çürüyen sebze-meyve ve diğer nemli organik atıkların içine kümeler halinde yerleştirilir.",
        "Sıcak yaz koşullarında yumurtadan erişkine gelişim yaklaşık bir ila iki hafta sürer. Beyaz renkli, bacaksız larvalar atığın içinde beslenir, ardından daha kuru bir noktaya geçerek kahverengi, fıçı biçimli pupaya dönüşür. Bu hızlı döngü, birkaç günlük biriken çöpün bile yeni bir sinek nesli üretmesine yetmesi anlamına gelir.",
      ]),
      sec("nerede-yasar", [
        "Karasinek insan yerleşimlerine sıkı sıkıya bağlıdır. Üreme alanları çöp konteynerleri, açık çöp alanları, kompost yığınları, hayvan barınakları, gübre birikintileri ve gıda atıklarının bulunduğu her yerdir. Erişkinler bu alanlarla mutfaklar, restoranlar ve gıda üretim alanları arasında serbestçe gidip gelir.",
        "Bina içine açık pencere ve kapılardan girer. Gündüz aktiftir; geceleri tavanlarda, ışık kablolarında ve dış cephelerde dinlenir. Sıcak havalarda sayıları hızla artar ve özellikle çöp toplama alanlarına yakın konutlarda yoğun şikâyetlere neden olur.",
      ], [
        "Çöp konteyneri ve çöp odası çevresi",
        "Kompost, gübre ve hayvan barınakları",
        "Restoran ve market arka alanları",
        "Mutfak, yemek alanı ve açık gıda tezgâhları",
      ]),
      sec("belirtiler", [
        "En belirgin işaret, mutfak, balkon veya yemek alanında sürekli dolaşan sineklerdir. Pencere kenarlarında, lamba çevresinde ve duvarlarda görülen küçük koyu benekler sinek dışkısıdır. Bu lekeler, sineklerin uzun süre dinlendiği noktaları gösterir.",
        "Çöp kutularının dibinde, kompostta veya hayvan barınaklarında beyaz kurtçukların görülmesi, yakın çevrede aktif bir üreme alanı olduğunu kanıtlar. Ev içinde sürekli yeni sinek görülmesi ise genellikle evin içinde ya da hemen dışında gözden kaçan bir atık kaynağına işaret eder.",
      ]),
      sec("riskler", [
        "Karasinek ısırmaz ve sokmaz; ancak hijyen açısından önemli bir zararlıdır. Çöp, gübre ve atık gibi kirli yüzeylerle gıdalar arasında gidip gelirken bacakları, vücut kılları, kusmuğu ve dışkısıyla bazı bakteri, virüs ve parazitleri mekanik olarak taşıyabilir.",
        "Bu yolla özellikle ishalle seyreden bazı mide-bağırsak enfeksiyonlarının ve göz enfeksiyonlarının yayılmasında rol oynayabileceği bilinmektedir. Risk, açık gıda tüketilen alanlarda ve sağlık açısından hassas kişilerin bulunduğu ortamlarda artar. Şikâyet durumunda hekime başvurulması önerilir.",
      ]),
      sec("karistirilan-turler", [
        "Karasinek en sık ahır sineği (Stomoxys calcitrans) ile karıştırılır. Ahır sineği karasineğe çok benzer, ancak öne doğru uzanan sivri bir hortumu vardır ve özellikle bacakları ısırarak kan emer. Isıran bir sinek söz konusuysa bu ayrım önemlidir.",
        "Yeşil veya mavi metalik renkli, daha iri et sinekleri (Calliphoridae), meyve çevresinde uçan küçük, kırmızı gözlü sirke sinekleri ve banyo giderlerinde görülen tüylü lağım sinekleri de karasinekle karıştırılabilir. Her birinin üreme alanı farklı olduğundan, doğru tür tespiti kaynağın bulunmasını kolaylaştırır.",
      ]),
      sec("onleme", [
        "Sinek kontrolünün temeli üreme alanlarını ortadan kaldırmaktır. Erişkin sinekleri tek tek yakalamak geçici rahatlama sağlar; ancak çöp ve atık yönetimi iyileştirilmeden yeni nesiller gelmeye devam eder.",
        "Fiziksel bariyerler bina içine girişi önlemede çok etkilidir. Sağlam sineklikler, kendiliğinden kapanan kapılar ve gıda işletmelerinde hava perdesi gibi önlemler sinek sayısını belirgin biçimde azaltır.",
      ], [
        "Çöpleri sıkı bağlanmış poşetlerde, kapaklı kovalarda tutun ve sık aralıklarla boşaltın",
        "Çöp kovalarını ve konteynerleri düzenli olarak yıkayın",
        "Pencere ve kapılara sağlam sineklik takın",
        "Gıdaları açıkta bırakmayın; yemek artıklarını bekletmeyin",
        "Kompostu kapalı haznede tutun; evcil hayvan dışkısını düzenli toplayın",
      ]),
      sec("profesyonel-destek", [
        "Restoran, gıda üretim alanı, market, otel ve hastane gibi işletmelerde sinek varlığı hem hijyen hem de denetim açısından önemli bir sorundur ve düzenli bir kontrol programı gerektirir. Konutlarda ise çöp alanına yakınlık, hayvan barınakları veya site ortak alanlarındaki kaynaklar nedeniyle süren yoğunluklar profesyonel değerlendirme gerektirebilir.",
        "Profesyonel süreçte üreme alanları belirlenir, sanitasyon önerileri sunulur, gerektiğinde ışıklı sinek yakalama cihazları gibi fiziksel yöntemlerle desteklenen ve izlemeye dayalı bir program uygulanır.",
      ]),
    ],
    serviceSlug: "hasere-kontrolu",
    faq: [
      { q: "Evde karasinek neden çok olur?", a: "Genellikle yakın çevrede bir üreme alanı vardır: çöp, kompost, evcil hayvan dışkısı veya gıda atıkları. Sıcak havalarda yaşam döngüsü hızlandığı için sayı kısa sürede artar." },
      { q: "Karasinek ısırır mı?", a: "Hayır, karasineğin ağız yapısı ısırmaya uygun değildir. Isıran ve karasineğe benzeyen sinek genellikle ahır sineğidir." },
      { q: "Karasinek hastalık taşır mı?", a: "Kirli yüzeylerden gıdalara bazı bakteri ve mikroorganizmaları mekanik olarak taşıyabilir ve bazı mide-bağırsak enfeksiyonlarının yayılmasında rol oynayabilir." },
      { q: "Karasinek ne kadar yaşar?", a: "Erişkin karasinek genellikle 2–4 hafta yaşar. Ancak sıcak koşullarda yeni nesiller yaklaşık 1–2 haftada geliştiği için üreme alanı kaldırılmadan sorun sürer." },
    ],
    sources: [
      { label: "University of California IPM — Flies", url: "https://ipm.ucanr.edu/home-and-landscape/flies/" },
      { label: "Penn State Extension — House Flies", url: "https://extension.psu.edu/house-flies" },
    ],
    seoText:
      "Mutfakta ve yemek alanında sürekli dolaşan karasinekler, çoğu zaman çevrede gözden kaçan bir atık ya da üreme kaynağının işaretidir. İST İlaçlama, İstanbul'da karasinek kontrolünü haşere kontrolü hizmetinin bir parçası olarak üreme alanlarının tespiti, sanitasyon önerileri ve izlemeye dayalı bir programla yürütür. Restoran, otel, gıda işletmesi ve siteler için sinek ilaçlama ve kontrol süreci hakkında haşere kontrolü sayfamızdan bilgi alabilirsiniz.",
    imageKey: "housefly",
  },

  /* 13 ────────────────────────────── AKREP */
  {
    slug: "akrep",
    name: "Akrep",
    altNames: ["sarı akrep", "kara akrep", "ev akrebi", "bahçe akrebi", "taş akrebi"],
    scientific: "Scorpiones (ör. Mesobuthus gibbosus, Euscorpius spp.)",
    group: "orumcegimsiler",
    summary:
      "Akrep, örümceğimsiler sınıfından, bir çift kıskaç benzeri ön uzantısı ve ucunda zehir iğnesi bulunan, kıvrık kuyruklu bir eklembacaklıdır. Türkiye'de pek çok tür görülür. İstanbul'da daha çok küçük ve koyu renkli Euscorpius türleri bilinir; kırsal ve bahçeli alanlarda taş, odun ve duvar aralarında saklanır ve gece aktiftir.",
    idCard: [
      { label: "Boyu", value: "Türe göre değişir; İstanbul çevresindeki Euscorpius türleri yaklaşık 3–4 cm, Mesobuthus gibbosus 6–7 cm'ye kadar" },
      { label: "Rengi", value: "Euscorpius: koyu kahverengi–siyahımsı; Mesobuthus: sarımsı kahverengi" },
      { label: "Aktif olduğu dönem", value: "Gece; sıcak aylarda (Mayıs–Eylül) belirgin artış" },
      { label: "Yaşam süresi", value: "Türe göre birkaç yıl" },
      { label: "Beslenme", value: "Böcekler, örümcekler ve diğer küçük eklembacaklılar" },
      { label: "Yaygın görüldüğü yerler", value: "Taş duvar ve taş yığınları, odunluk, bahçe, bodrum, eski yapılar, kırsal alanlar" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Akrepler, örümcekler ve kenelerle aynı sınıfta yer alan örümceğimsilerdir. Sekiz bacaklarının önünde, avlarını yakalamak için kullandıkları kıskaç benzeri bir çift uzantı (pedipalp) bulunur. Karın bölümünün arka kısmı, ucunda zehir bezi ve iğne taşıyan ince, eklemli bir kuyruk biçimindedir; bu kuyruk genellikle gövdenin üzerine doğru kıvrık tutulur.",
        "Türkiye'de farklı bölgelerde farklı akrep türleri yaşar. İstanbul ve Marmara çevresinde en çok, kalın kıskaçlı ve ince kuyruklu, küçük, koyu renkli Euscorpius türlerine rastlandığı bilinir. Ege ve Batı Anadolu'da yaygın olan Mesobuthus gibbosus ise daha iri, sarımsı kahverengi ve ince kıskaçlıdır.",
      ]),
      sec("yasam-dongusu", [
        "Akrepler yumurta bırakmaz; yavrularını canlı doğurur. Doğan yavrular ilk deri değişimlerine kadar annenin sırtında taşınır, ardından bağımsız yaşamaya başlar. Yavrular erişkin olana kadar birkaç kez deri değiştirir ve bu süreç türe bağlı olarak bir yılı aşabilir.",
        "Akrepler yavaş gelişen ve uzun yaşayan canlılardır; birçok tür birkaç yıl yaşayabilir. Uzun süre aç kalabilirler. Kışı genellikle taş altlarında veya toprak içinde hareketsiz geçirir, havalar ısındığında yeniden aktif hale gelirler.",
      ]),
      sec("nerede-yasar", [
        "Akrepler gündüzü serin, karanlık ve korunaklı yerlerde geçirir. Taş duvarlar ve yığınlar, kaya aralıkları, odunluklar, kütük altları, bahçe döşemesi altındaki boşluklar ve eski yapıların duvar çatlakları tipik saklanma alanlarıdır. İstanbul'da daha çok orman kenarı, kırsal ve bahçeli yerleşimlerde, müstakil evlerde ve yazlık bölgelerde görülürler.",
        "Bina içine genellikle kapı altı boşlukları, duvar çatlakları ve zemin kattaki açıklıklar yoluyla girerler. Ev içinde bodrumlar, ayakkabılıklar, perde kıvrımları, yerde bırakılan giysi ve havlular ile banyo gibi nemli ve sessiz alanlar tercih edilebilir.",
      ], [
        "Taş duvar, taş ve tuğla yığınları",
        "Odunluk, kütük ve bahçe döşemesi altları",
        "Bodrum, depo ve kiler",
        "Yerdeki ayakkabı, giysi ve havlular",
      ]),
      sec("belirtiler", [
        "Akrepler gece aktif ve gizlenmeyi seven canlılar olduğu için varlıkları çoğu zaman tesadüfen, bir bireyin evde ya da bahçede görülmesiyle anlaşılır. Aynı bölgede tekrar tekrar akrep görülmesi, çevrede yerleşik bir popülasyon olduğunu düşündürür.",
        "Akrepler ultraviyole (UV) ışık altında belirgin biçimde yeşil-mavi parlar. Bu özellik, karanlıkta bahçe duvarlarında ve taş aralarında akrep varlığının tespit edilmesinde kullanılır. Ayrıca bölgede çok sayıda böcek bulunması, akrepler için uygun bir besin kaynağı oluşturduğundan dolaylı bir risk işaretidir.",
      ]),
      sec("riskler", [
        "Akrep sokması genellikle sokulan bölgede ağrı, yanma, kızarıklık ve şişliğe neden olur. Etki türe ve kişiye göre değişir. Çocuklar, yaşlılar ve kronik hastalığı olan kişilerde daha ciddi tablolar görülebilir. İstanbul çevresinde yaygın Euscorpius türlerinin sokmasının genellikle hafif seyrettiği bildirilse de, sokmanın hangi türe ait olduğunu bilmek çoğu zaman mümkün değildir.",
        "Bu nedenle akrep sokmasında belirti hafif olsa bile vakit kaybetmeden sağlık kuruluşuna başvurulmalıdır. Nefes darlığı, yaygın uyuşma, kas seğirmesi, terleme veya bilinç değişikliği gibi belirtilerde hemen 112 Acil Çağrı Merkezi aranmalıdır. 114 Ulusal Zehir Danışma Merkezi'nden de bilgi alınabilir.",
      ]),
      sec("karistirilan-turler", [
        "Akrepler en sık yalancı akreplerle karıştırılır. Yalancı akrepler (Pseudoscorpiones) birkaç milimetre boyunda, kıskaçlı ama kuyruksuz ve iğnesiz zararsız canlılardır; kitap aralarında ve toprakta yaşar ve küçük böcekleri yer.",
        "Bazı bölgelerde görülen kamçılı örümceğimsiler ve iri, hızlı hareket eden kırkayaklar da zaman zaman akrepe benzetilebilir. Kırkayaklarda çok sayıda bacak ve uzun, yassı bir gövde bulunur; kuyruk iğnesi yoktur.",
      ]),
      sec("onleme", [
        "Akrep riskini azaltmanın en etkili yolu, evin hemen çevresindeki saklanma alanlarını azaltmak ve bina girişlerini kapatmaktır. Bahçede böcek sayısını düşüren düzenlemeler de akreplerin besin kaynağını azaltır.",
        "Akreplerin görüldüğü bölgelerde kişisel dikkat de çok önemlidir. Gece bahçede çıplak ayakla yürümemek, ayakkabı ve giysileri giymeden önce silkelemek basit ama etkili önlemlerdir.",
      ], [
        "Bina çevresindeki taş, tuğla, odun ve moloz yığınlarını kaldırın; odunu duvardan uzakta ve yerden yüksekte tutun",
        "Kapı altlarına fırçalı bant takın; duvar ve zemin çatlaklarını kapatın",
        "Ayakkabı, giysi ve havluları yerde bırakmayın; giymeden önce silkeleyin",
        "Yatakların ve beşiklerin duvara değmemesine özen gösterin",
        "Bahçe işlerinde kalın eldiven kullanın; gece bahçede ayakkabı giyin",
        "Dış aydınlatmayı azaltarak böcekleri ve dolayısıyla akrepleri çekmekten kaçının",
      ]),
      sec("profesyonel-destek", [
        "Evde veya bahçede birden fazla akrep görülmesi, özellikle çocukların, yaşlıların ya da evcil hayvanların bulunduğu ortamlarda profesyonel değerlendirme gerektirir. Bahçeli müstakil evler, yazlıklar ve kırsal karakterli sitelerde mevsim başında yapılacak bir inceleme faydalı olabilir.",
        "Profesyonel süreçte saklanma alanları ve giriş noktaları belirlenir, çevre düzenlemesi önerileri sunulur ve gerektiğinde akreplerin besin kaynağı olan böcek popülasyonunu da hedefleyen bir program oluşturulur. Sokma durumunda ise ilk adım her zaman sağlık kuruluşuna başvurmaktır.",
      ]),
    ],
    serviceSlug: "akrep-kontrolu",
    faq: [
      { q: "Akrep sokarsa ne yapmalı?", a: "Vakit kaybetmeden sağlık kuruluşuna başvurun. Nefes darlığı, yaygın uyuşma, kas seğirmesi veya bilinç değişikliği gibi belirtilerde hemen 112'yi arayın. 114 Ulusal Zehir Danışma Merkezi'nden de bilgi alabilirsiniz." },
      { q: "İstanbul'da akrep var mı?", a: "Evet. Özellikle orman kenarı, kırsal ve bahçeli alanlarda, çoğunlukla küçük ve koyu renkli Euscorpius türlerine rastlandığı bilinir." },
      { q: "Akrep eve nereden girer?", a: "Genellikle kapı altı boşluklarından, duvar ve zemin çatlaklarından ya da zemin kattaki açıklıklardan girer. Bina çevresindeki taş ve odun yığınları akrepleri eve yaklaştırır." },
      { q: "Akrepler hangi aylarda çıkar?", a: "Sıcak aylarda, genellikle Mayıs–Eylül arasında daha aktiftir. Gece avlanır, gündüz taş ve odun altlarında saklanır." },
    ],
    sources: [
      { label: "University of California IPM — Scorpions", url: "https://ipm.ucanr.edu/home-and-landscape/scorpions/" },
      { label: "University of Kentucky Entomology — Scorpions", url: "https://entomology.ca.uky.edu/ef633" },
    ],
    seoText:
      "Bahçeli evlerde, yazlıklarda ve orman kenarındaki yerleşimlerde tekrarlayan akrep görülmesi, çevrede saklanma alanlarının bulunduğunu gösterir. İST İlaçlama, İstanbul'da akrep kontrolü hizmetini saklanma ve giriş noktalarının tespiti, çevre düzenleme önerileri ve gerektiğinde böcek popülasyonunu da hedefleyen bir programla planlar. Müstakil evler ve siteler için akrep ilaçlama süreci hakkında akrep kontrolü sayfamızı inceleyebilir, keşif talebinde bulunabilirsiniz.",
    imageKey: "scorpion",
  },

  /* 14 ────────────────────────────── ÖRÜMCEK */
  {
    slug: "orumcek",
    name: "Örümcek",
    altNames: ["ev örümceği", "uzun bacaklı örümcek", "tavan örümceği", "huni ağlı örümcek", "karadul"],
    scientific: "Araneae (ör. Pholcus phalangioides, Eratigena spp., Latrodectus)",
    group: "orumcegimsiler",
    summary:
      "Örümcekler, sekiz bacaklı, baş-göğüs ve karın olmak üzere iki gövde bölümlü, ağ örebilen örümceğimsilerdir. Evlerde en sık uzun bacaklı tavan örümceği (Pholcus phalangioides) ve huni ağlı ev örümcekleri (Eratigena türleri) görülür. Bunlar böcekle beslenir ve insanlar için genellikle zararsızdır; karadul gibi türler ise temkin gerektirir.",
    idCard: [
      { label: "Boyu", value: "Tavan örümceği gövdesi 7–10 mm, bacaklarla 5 cm'ye kadar; ev örümcekleri gövde 10–18 mm" },
      { label: "Rengi", value: "Tavan örümceği soluk bej–gri; ev örümcekleri kahverengi desenli; karadul parlak siyah, kırmızı benekli" },
      { label: "Aktif olduğu dönem", value: "Yıl boyu; ev örümceği erkekleri sonbaharda daha sık görülür" },
      { label: "Yaşam süresi", value: "Türe göre 1–3 yıl" },
      { label: "Beslenme", value: "Böcekler ve diğer küçük eklembacaklılar" },
      { label: "Yaygın görüldüğü yerler", value: "Tavan köşeleri, bodrum, garaj, depo, pencere çevresi, bahçe duvarları" },
    ],
    sections: [
      sec("nasil-taninir", [
        "Örümcekler sekiz bacaklıdır ve gövdeleri iki ana bölümden oluşur: baş-göğüs (sefalotoraks) ve karın. Antenleri ve kanatları yoktur. Karın ucundaki ipek bezleriyle ağ örerler. Evlerde en sık görülen tür olan tavan örümceği Pholcus phalangioides, küçük soluk renkli gövdesi ve son derece uzun, ince bacaklarıyla kolayca tanınır; tavan köşelerinde düzensiz, gevşek ağlar kurar.",
        "Huni ağlı ev örümcekleri (Eratigena, eski adıyla Tegenaria türleri) daha iri, kahverengi ve tüylü görünüşlüdür; gövdeleri açık-koyu desenlidir. Köşelerde, bir uçta tünel ya da huni biçimli sığınağa açılan yatay, yoğun ağlar örerler. Sonbaharda eş arayan erkekler hızla zeminde koşarken sıkça görülür.",
      ]),
      sec("yasam-dongusu", [
        "Örümcekler yumurtalarını ipekten örülmüş bir kese (kokon) içine bırakır. Tavan örümceği dişileri bu keseyi ağızlarında taşır; ev örümcekleri ise keseyi korunaklı bir köşeye bağlar. Yumurtadan çıkan yavrular erişkinlerin küçük kopyalarıdır ve büyüdükçe birkaç kez deri değiştirir.",
        "Türe ve koşullara bağlı olarak erişkinliğe ulaşmak birkaç aydan bir yılı aşan sürelere kadar uzayabilir. Ev örümceklerinin birçoğu 1–3 yıl yaşayabilir. Sonbahar, birçok türde eş arama ve üreme dönemidir; bu nedenle ev içinde örümcek görülme sıklığı bu mevsimde artar.",
      ]),
      sec("nerede-yasar", [
        "Örümcekler besin, yani böcek bulabildikleri ve rahatsız edilmedikleri yerleri tercih eder. Tavan köşeleri, pencere ve kapı çevreleri, bodrumlar, garajlar, depolar, mobilya arkaları ve az kullanılan odalar en sık görüldükleri yerlerdir. Dış cephede saçak altları, aydınlatma armatürleri ve bahçe duvarları da sık kullanılır.",
        "Karadul olarak bilinen Latrodectus türleri ise genellikle ev içinde değil, dış ortamda yaşar. Türkiye'de görülen Latrodectus tredecimguttatus; tarlalar, taş duvarlar, kuru ve güneşli alanlar, odun ve taş yığınları gibi kırsal ortamlarla ilişkilidir.",
      ], [
        "Tavan köşeleri ve pencere çevresi",
        "Bodrum, garaj, depo ve çatı arası",
        "Mobilya arkaları ve az kullanılan odalar",
        "Dış cephe, saçak altı ve bahçe duvarları",
      ]),
      sec("belirtiler", [
        "Örümcek varlığı genellikle ağlarıyla fark edilir. Tavan köşelerinde düzensiz, gevşek ağlar tavan örümceğini; köşe ve dip kısımlarda huni biçimli sığınağı olan yoğun, yatay ağlar ev örümceğini gösterir. İpek yumurta keseleri ve deri değiştirme kalıntıları da sık görülür.",
        "Ev içinde çok sayıda örümcek görülmesi, aslında ortamda örümceklere besin olan çok sayıda böcek bulunduğunu da gösterebilir. Bu nedenle örümcek sorunuyla birlikte sinek, sivrisinek, gümüş böceği veya diğer böceklerin varlığı da değerlendirilmelidir.",
      ]),
      sec("riskler", [
        "Evlerde görülen örümceklerin büyük çoğunluğu insanlar için zararsızdır. Isırma olayları nadirdir ve genellikle örümcek sıkıştırıldığında ya da elle tutulduğunda gerçekleşir; çoğunlukla kısa süreli ağrı ve kızarıklıktan ibarettir. Örümcekler ayrıca ev içindeki böcekleri avlayarak doğal bir denge sağlar.",
        "Karadul (Latrodectus) ise temkin gerektiren bir türdür. Isırığı kas ağrısı, kramp, terleme ve bulantı gibi sistemik belirtilere yol açabilir. Karadul ısırığından şüpheleniliyorsa ya da herhangi bir örümcek ısırığı sonrası yaygın ağrı, nefes darlığı veya genel durum bozukluğu gelişirse hemen 112 aranmalı ve sağlık kuruluşuna başvurulmalıdır.",
      ]),
      sec("karistirilan-turler", [
        "Uzun bacaklı tavan örümceği en sık hasatçılarla (Opiliones) karıştırılır. Hasatçıların da çok uzun bacakları vardır; ancak gövdeleri tek parça ve yuvarlak görünür, ağ örmezler ve genellikle dış ortamda yaşarlar.",
        "Karadul ise çok daha az risk taşıyan bazı siyah örümceklerle karıştırılabilir. Bunların başında, ev içinde de sık görülen ve karaduldan farklı olarak kırmızı benek taşımayan Steatoda türleri gelir. Siyah, parlak ve karnında kırmızı benekleri olan bir örümcek görürseniz dokunmayın ve tür tespitini bir uzmana bırakın.",
      ]),
      sec("onleme", [
        "Ev içindeki örümcek sayısını azaltmanın en etkili ve kimyasal içermeyen yolu, düzenli temizlik ve örümceklerin besini olan böcekleri azaltmaktır. Ağları ve yumurta keselerini elektrik süpürgesiyle almak hem mevcut bireyleri hem de yeni nesilleri azaltır.",
        "Dış ortamda ise bina çevresindeki saklanma alanlarının azaltılması ve dış aydınlatmanın düzenlenmesi, örümceklerin ve onları çeken böceklerin binaya yaklaşmasını sınırlar.",
      ], [
        "Tavan köşelerini, pencere çevresini ve mobilya arkalarını düzenli süpürün",
        "Pencere ve kapılara sağlam sineklik takın, kapı altlarını kapatın",
        "Dış aydınlatmayı azaltın veya sarı tonlu ampuller tercih edin",
        "Bodrum ve depolarda karton yığınlarını azaltın, eşyaları düzenli tutun",
        "Bahçede taş ve odun yığınlarıyla çalışırken kalın eldiven kullanın",
      ]),
      sec("profesyonel-destek", [
        "Ev içinde çok sayıda örümcek ve ağ görülmesi, depo, bodrum ve garaj gibi alanlarda yoğun örümcek varlığı ya da karadul şüphesi taşıyan bireylerin görülmesi durumunda profesyonel değerlendirme faydalı olur. Bu durumlarda çoğu zaman örümceklerin besin kaynağı olan böcek sorunu da birlikte ele alınmalıdır.",
        "Profesyonel süreçte tür tespiti yapılır, örümceklerin ve besin kaynaklarının bulunduğu alanlar belirlenir ve bina içi ile dış çevreyi kapsayan bir haşere kontrol programı oluşturulur. Sağlıkla ilgili her türlü şüphede ise öncelik sağlık kuruluşuna başvurmaktır.",
      ]),
    ],
    serviceSlug: "hasere-kontrolu",
    faq: [
      { q: "Evdeki örümcekler zararlı mı?", a: "Evlerde görülen örümceklerin büyük çoğunluğu insanlar için zararsızdır ve böcekleri avlayarak doğal denge sağlar. Isırık nadirdir ve genellikle hafif seyreder." },
      { q: "Türkiye'de karadul var mı?", a: "Evet. Latrodectus tredecimguttatus türü özellikle tarla, taş duvar ve kırsal alanlarda görülebilir. Isırığından şüphelenildiğinde 112 aranmalı ve sağlık kuruluşuna başvurulmalıdır." },
      { q: "Sonbaharda evde neden daha çok örümcek görülür?", a: "Birçok ev örümceği türünde erkekler sonbaharda eş aramak için daha fazla dolaşır. Bu nedenle zeminde hızla koşan iri örümcekler bu dönemde daha sık fark edilir." },
      { q: "Örümcek ağları nasıl azaltılır?", a: "Düzenli süpürme, sineklik kullanımı ve dış aydınlatmanın azaltılması, hem örümcekleri hem de onların besini olan böcekleri azaltır." },
    ],
    sources: [
      { label: "University of California IPM — Spiders", url: "https://ipm.ucanr.edu/home-and-landscape/spiders/" },
      { label: "University of Kentucky Entomology — Common Spiders Found Around Homes and Buildings", url: "https://entomology.ca.uky.edu/ef622" },
    ],
    seoText:
      "Tavan köşelerinde biriken ağlar, bodrum ve depolarda sık görülen örümcekler ya da karadul şüphesi taşıyan bir birey, çevrenin uzman bir gözle incelenmesini gerektirebilir. İST İlaçlama, İstanbul'da örümcek kontrolünü haşere kontrolü hizmeti kapsamında tür tespiti ve örümceklerin besin kaynağı olan böceklerin birlikte değerlendirilmesiyle planlar. Konut, depo ve işletmeler için örümcek ilaçlama süreci hakkında haşere kontrolü sayfamızdan bilgi alabilirsiniz.",
    imageKey: "spider",
  },
];
