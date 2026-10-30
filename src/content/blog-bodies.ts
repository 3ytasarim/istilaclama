/**
 * Blog yazı gövdeleri — özgün taslak; yayın öncesi yetkili uzman onayı gerekir.
 * Kurallar: doz/karışım/ürün adı yok, "%100 / kesin / zararsız" gibi iddialar yok,
 * sağlıkla ilgili ifadeler genel ve kaynaklı. Sprint 5'te blog_posts.body alanına aktarılır.
 */
export interface BlogSource {
  /** Kaynak sayfanın başlığı (orijinal dilinde) */
  title: string;
  /** Yayımlayan kurum */
  publisher: string;
  url: string;
}

export interface BlogSubsection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogSection {
  /** İçindekiler bağlantısı için ASCII kimlik */
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
  subsections?: BlogSubsection[];
}

export interface BlogBody {
  slug: string;
  /** Yazının başında soruya doğrudan cevap veren özet (GEO) */
  summary: string;
  /** "Kısaca" kutusu — 3–5 madde */
  keyTakeaways: string[];
  sections: BlogSection[];
  sources: BlogSource[];
  /** src/content/services.ts slug'ları */
  relatedServices: string[];
}

const UC_IPM_COCKROACHES: BlogSource = {
  title: "Cockroaches — Pest Notes",
  publisher: "University of California Statewide IPM Program (UC IPM)",
  url: "https://ipm.ucanr.edu/PMG/PESTNOTES/pn7467.html",
};
const EPA_IPM_PRINCIPLES: BlogSource = {
  title: "Integrated Pest Management (IPM) Principles",
  publisher: "U.S. Environmental Protection Agency (EPA)",
  url: "https://www.epa.gov/ipm/introduction-integrated-pest-management",
};
const UC_IPM_WHAT_IS_IPM: BlogSource = {
  title: "What Is Integrated Pest Management (IPM)?",
  publisher: "University of California Statewide IPM Program (UC IPM)",
  url: "https://ipm.ucanr.edu/what-is-ipm/",
};
const EPA_SELECTING_SERVICE: BlogSource = {
  title: "Tips for Selecting a Pest Control Service",
  publisher: "U.S. Environmental Protection Agency (EPA)",
  url: "https://www.epa.gov/safepestcontrol/tips-selecting-pest-control-service",
};
const CDC_SEAL_UP: BlogSource = {
  title: "How to Seal Up to Prevent Rodents",
  publisher: "Centers for Disease Control and Prevention (CDC)",
  url: "https://www.cdc.gov/healthy-pets/rodent-control/seal-up.html",
};

export const blogBodies: Record<string, BlogBody> = {
  /* ------------------------------------------------------------------ */
  "evde-hamam-bocegi-gorulmesinin-olasi-nedenleri": {
    slug: "evde-hamam-bocegi-gorulmesinin-olasi-nedenleri",
    summary:
      "Evde hamam böceği görülmesinin en yaygın nedenleri; nem ve su sızıntıları, açıkta kalan gıda ve atıklar ile tesisat boşlukları gibi saklanma alanlarıdır. Apartmanlarda şaftlar ve ortak alanlar üzerinden daireler arasında geçiş de sık görülür. Kalıcı azalma için önce bu koşulların giderilmesi, ardından türe uygun bir kontrol planı yapılması gerekir.",
    keyTakeaways: [
      "Hamam böcekleri su, besin ve karanlık saklanma alanı bulduğu yere yerleşir.",
      "Gündüz görülen tek bir böcek, gizli alanlarda daha büyük bir popülasyona işaret edebilir.",
      "Temizlik ve boşlukların kapatılması kontrolün temelidir; tek başına sprey kalıcı sonuç vermeyebilir.",
      "Tür tespiti, hangi yöntemin işe yarayacağını belirler.",
    ],
    sections: [
      {
        id: "neden-evde-gorulur",
        title: "Hamam böcekleri neden evlere yerleşir?",
        paragraphs: [
          "Hamam böceklerinin bir mekâna yerleşmesi için üç temel koşul yeterlidir: su, besin ve gün boyu saklanabilecekleri sıcak, karanlık bir boşluk. Mutfaklar ve banyolar bu üç koşulu birlikte sunduğu için şikâyetlerin büyük kısmı bu alanlardan gelir. Temiz görünen bir evde bile lavabo altında biriken nem, buzdolabının arkasında kalan kırıntılar ya da tezgâh ile duvar arasındaki ince bir aralık yeterli olabilir.",
          "UC IPM, hamam böceklerinin özellikle çok daireli konutlarda alerji ve astım şikâyetlerini tetikleyebildiğini belirtir. Bu nedenle sorun yalnızca görüntü veya tiksinti meselesi olarak görülmemeli; evde astımlı ya da alerjik bir birey varsa erken önlem almak daha da önem kazanır. Şikâyetler artarsa hekime danışmak gerekir.",
          "Kaliforniya Üniversitesi IPM programının hamam böcekleri rehberine göre bu böcekler gündüzleri saklanıp geceleri besin aramaya çıkar ve bazı türler yaşam döngüsünün tamamını bina içinde sürdürebilir. Bu nedenle gündüz gözünüze çarpan bir böcek, çoğu zaman saklanma alanlarının dolduğunu ya da ortamın bozulduğunu düşündürür.",
        ],
      },
      {
        id: "nem-ve-su-kaynaklari",
        title: "Nem ve su kaynakları",
        paragraphs: [
          "Hamam böcekleri susuzluğa besinsizlikten çok daha az dayanır. Bu yüzden evdeki küçük su kaynakları, böcekleri bir alana bağlayan en güçlü etkenlerden biridir.",
          "Nemi azaltmak çoğu zaman beklenenden kolaydır. Banyoyu kullandıktan sonra havalandırmak, lavabo altındaki dolabı ara sıra açık bırakıp kurumasını sağlamak ve ıslak paspas ile bezleri gece boyunca zeminde bırakmamak, böceklerin sevdiği mikro ortamı bozar. Kombi ve klima tahliye hortumlarının nereye aktığını kontrol etmek de gözden kaçan bir su kaynağını ortaya çıkarabilir.",
        ],
        subsections: [
          {
            id: "tesisat-sizintilari",
            title: "Tesisat sızıntıları ve yoğuşma",
            paragraphs: [
              "Lavabo sifonlarındaki damlama, çamaşır makinesi hortumunun bağlantı noktası, kombi ve su ısıtıcısı çevresindeki yoğuşma sürekli bir nem kaynağı oluşturur. Dolap içi zeminin kabarması ya da küf kokusu, gözden kaçan bir sızıntının işareti olabilir.",
            ],
          },
          {
            id: "banyo-ve-giderler",
            title: "Banyo, gider ve rögar bağlantıları",
            paragraphs: [
              "Uzun süre kullanılmayan giderlerde su kilidinin kuruması, tesisat hattıyla yaşam alanı arasında açık bir geçit bırakabilir. Misafir banyosu gibi seyrek kullanılan alanlarda giderlere düzenli su akıtmak ve gider kapaklarının sağlam olduğunu kontrol etmek basit ama etkili bir önlemdir.",
            ],
          },
        ],
      },
      {
        id: "besin-ve-atik-duzeni",
        title: "Açıkta kalan gıda ve atık düzeni",
        paragraphs: [
          "Hamam böcekleri çok az miktarda besinle uzun süre yaşayabilir. Tezgâhta bekleyen kirli bulaşık, ağzı açık kuru gıda paketleri, evcil hayvan mama kabı ve gece boyunca kapağı açık kalan çöp kovası onlar için düzenli bir sofra anlamına gelir.",
          "Kaynakların önerdiği yaklaşım, besini erişilemez hâle getirmektir: gıdaları kapaklı kaplarda saklamak, çöpü her akşam ağzı kapalı şekilde çıkarmak, ocak ve fırın çevresindeki yağ birikintisini düzenli temizlemek. Bu adımlar tek başına sorunu bitirmeyebilir; ancak yapılan her uygulamanın etkisini belirgin biçimde artırır.",
          "Yeni taşınılan evlerde ve tadilat sonrasında da şikâyetler artabilir. Uzun süre boş kalan bir dairede önceki kullanımdan kalan kirlilik, söküm sırasında açığa çıkan duvar ve dolap boşlukları, böceklerin saklandığı alanları görünür kılar ya da onları yeni bölgelere hareket etmeye zorlar. Taşınmadan önce mutfak ve banyonun detaylı temizliği bu nedenle önemlidir.",
        ],
        bullets: [
          "Kuru gıdaları kapaklı cam veya sert plastik kaplara aktarın.",
          "Mama kaplarını gece boyunca dolu bırakmamaya çalışın.",
          "Beyaz eşyaların altını ve arkasını dönemsel olarak temizleyin.",
          "Geri dönüşüm kutularını durulayıp kapalı tutun.",
        ],
      },
      {
        id: "giris-yollari-ve-tasima",
        title: "Giriş yolları: böcekler eve nasıl ulaşır?",
        paragraphs: [
          "Evde hiçbir çekici koşul yokken bile hamam böceği görülüyorsa, böceklerin dışarıdan geliyor olma ihtimali güçlenir. İstanbul gibi yoğun yapılaşmanın olduğu şehirlerde iki yol öne çıkar.",
          "Zemin katlar ve bodrum katlar, rögar ve kanalizasyon hattına yakınlıkları nedeniyle daha fazla risk taşır. Yağmurlu dönemlerden sonra veya altyapı çalışmalarının ardından iri türlerin evlere girişinde artış görülebilir; bu dönemlerde gider kapaklarını ve kapı altlarını kontrol etmek faydalıdır.",
        ],
        subsections: [
          {
            id: "apartman-saftlari",
            title: "Apartman şaftları ve ortak tesisat",
            paragraphs: [
              "Çok katlı binalarda su, doğalgaz ve elektrik hatlarının geçtiği şaftlar daireleri birbirine bağlar. Boru geçişlerinin etrafında bırakılan boşluklar, böceklerin bir daireden diğerine ya da bodrumdan üst katlara ilerlemesine imkân tanır. Bu durumda yalnızca bir dairede yapılan uygulama, böcekleri geçici olarak komşu alanlara itmekle sınırlı kalabilir.",
            ],
          },
          {
            id: "disaridan-gelen-esyalar",
            title: "Koliler, ikinci el eşya ve teslimatlar",
            paragraphs: [
              "Karton koliler, market kasaları ve ikinci el beyaz eşya ya da mobilya, böceklerin veya yumurta kapsüllerinin eve taşınmasına aracılık edebilir. UC IPM rehberi de eve giren teslimatların ve kullanılmış eşyaların kontrol edilmesini önerir. Kolileri uzun süre depolamak yerine boşaltıp kısa sürede evden çıkarmak riski azaltır.",
            ],
          },
        ],
      },
      {
        id: "tur-farki",
        title: "Hangi tür olduğunu bilmek neden önemli?",
        paragraphs: [
          "Evlerde en sık görülen küçük, açık kahverengi tür genellikle mutfak ve beyaz eşya çevresinde yoğunlaşır ve bina içinde hızla çoğalabilir. Daha iri, koyu renkli türler ise çoğunlukla bodrum, rögar ve kanalizasyon hattıyla ilişkilidir ve eve dışarıdan girer. Biri iç mekânda saklanma alanlarına odaklanmayı, diğeri giriş noktalarının kapatılmasını gerektirir.",
          "Yanlış tür tespiti, emeğin yanlış alana harcanmasına neden olur. Bir böceği şeffaf bir kaba alıp fotoğraflamak ya da yapışkan izleme tuzağıyla nerelerde yoğunlaştığını görmek, uzmanla görüşürken çok işe yarayan bir bilgidir.",
          "Tür bilgisi aynı zamanda sorunun ne kadar hızlı büyüyebileceğine dair fikir verir. İç mekânda yaşayan türlerin dişileri yumurtalarını koruyucu bir kapsül içinde taşır ve bu kapsüller dış etkilere karşı dayanıklıdır. Bu yüzden ilk uygulamadan birkaç hafta sonra yeni bireylerin görülmesi şaşırtıcı değildir; planın bu evreyi hesaba katan bir takip içermesi gerekir.",
        ],
      },
      {
        id: "ilk-yapilabilecekler",
        title: "İlk fark ettiğinizde yapılabilecekler",
        paragraphs: [
          "Hamam böceği gördüğünüzde paniğe kapılıp evin her yerine rastgele sprey sıkmak çoğu zaman beklenen sonucu vermez. UC IPM, aerosol ve sis bombası tarzı ürünlerin kalıcı kontrol sağlamadığını ve böcekleri dağıtabileceğini belirtir. Bunun yerine şu adımlarla başlamak daha verimlidir:",
        ],
        bullets: [
          "Böceği nerede ve hangi saatte gördüğünüzü not edin.",
          "Lavabo altı, beyaz eşya arkası ve dolap köşelerinde dışkı lekesi veya kapsül arayın.",
          "Su sızıntılarını onarın, giderleri kapalı tutun.",
          "Boru geçişlerindeki ve süpürgelik arkasındaki boşlukları uygun bir dolgu malzemesiyle kapatın.",
          "Apartmanda yaşıyorsanız benzer sorunu yaşayan komşu olup olmadığını yönetimle paylaşın.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Temizlik ve boşlukların kapatılmasına rağmen iki üç hafta içinde görülme sıklığı azalmıyorsa, gündüz saatlerinde de böcek görülüyorsa ya da birden fazla odada iz tespit ediliyorsa sorun büyük olasılıkla görünenden geniştir. UC IPM rehberi de yoğun istilalarda genellikle lisanslı bir uygulayıcıya ihtiyaç duyulduğunu belirtir.",
          "Apartmanlarda yaşıyorsanız, sorunun kaynağı ortak alanlardaysa tek dairede yapılan uygulamanın etkisi sınırlı kalabilir. Bu durumda yönetimle birlikte bodrum, çöp odası ve şaftları kapsayan bir değerlendirme istemek, daha kalıcı bir sonuç için gereklidir.",
          "Profesyonel destek alırken uygulayıcının önce alanı incelemesini, türü belirlemesini ve hedefli bir plan sunmasını bekleyin. Uygulamada yalnızca ruhsatlı biyosidal ürünlerin etiket talimatlarına uygun kullanılması ve gerekiyorsa bir takip ziyaretinin planlanması önemlidir. Evde bebek, hamile, astımlı birey ya da evcil hayvan varsa bunu önceden mutlaka paylaşın.",
          "Uygulamadan sonra ilk günlerde böceklerin saklandıkları yerden çıkıp daha görünür hâle gelmesi bazı yöntemlerde beklenebilir. Bu durumu not edip uygulayıcıyla paylaşmak, takip ziyaretinde doğru değerlendirme yapılmasına yardımcı olur. Temizlik ve boşluk kapatma önerilerinin uygulanması, sorunun yeniden başlamaması için en az uygulama kadar önemlidir.",
        ],
      },
    ],
    sources: [UC_IPM_COCKROACHES, EPA_IPM_PRINCIPLES],
    relatedServices: ["hamam-bocegi-ilaclama", "ev-ilaclama", "apartman-ve-bina-ilaclama"],
  },

  /* ------------------------------------------------------------------ */
  "tahta-kurusu-belirtileri-nasil-anlasilir": {
    slug: "tahta-kurusu-belirtileri-nasil-anlasilir",
    summary:
      "Tahta kurusu genellikle yatak dikişlerinde ve çevresinde görülen pas rengi kan lekeleri, siyah dışkı noktaları, dökülmüş kabuklar ve canlı böceklerle anlaşılır. Sıra hâlinde veya kümeler hâlinde çıkan kaşıntılı kızarıklıklar da işaret olabilir; ancak ısırık tek başına teşhis için yeterli değildir. Şüphe varsa önce fiziksel kanıt aranmalı, ardından tür doğrulanmalıdır.",
    keyTakeaways: [
      "En güvenilir belirti, yatakta ve çevresinde bulunan fiziksel izlerdir.",
      "Isırıklar herkeste aynı tepkiyi oluşturmaz; bazı kişilerde hiç iz görülmeyebilir.",
      "Pire, halı böceği gibi canlılar tahta kurusuyla karıştırılabilir.",
      "Erken tespit, kontrol sürecini kısaltır ve yayılmayı sınırlar.",
    ],
    sections: [
      {
        id: "tahta-kurusu-nedir",
        title: "Tahta kurusu nedir, nerede saklanır?",
        paragraphs: [
          "Tahta kuruları, insan ve hayvan kanıyla beslenen, kanatsız, yassı gövdeli küçük böceklerdir. Yetişkinleri elma çekirdeği büyüklüğündedir; aç olduklarında yassı ve kahverengi, beslendikten sonra daha şişkin ve kırmızımsı görünürler. Gündüzleri ince aralıklarda saklanır, genellikle geceleri beslenirler.",
          "Tahta kuruları beslenmeden uzun süre hayatta kalabildikleri için bir süre boş kalan odalarda da varlıklarını sürdürebilirler. Yatağa yakın oldukları için en sık yatak dikişleri, baza ve karyola birleşimlerinde bulunurlar; istila büyüdükçe koltuklara, perde kıvrımlarına, priz kapaklarının arkasına ve duvar çatlaklarına yayılabilirler.",
          "Oregon Eyalet Üniversitesi bünyesindeki Ulusal Pestisit Bilgi Merkezi (NPIC), tahta kurularının bavul, mobilya ve giysilerle bir yerden başka bir yere taşındığını vurgular. Bu nedenle sorunun temizlik eksikliğiyle doğrudan ilgisi yoktur; en düzenli evde bile seyahat ya da ikinci el eşya sonrası ortaya çıkabilir.",
          "NPIC, tahta kurusu kontrolünün profesyoneller için bile zor olabileceğini ve birçok popülasyonun yaygın kullanılan ürünlere karşı direnç geliştirdiğini belirtir. Bu da erken tespitin ve doğru planlamanın neden önemli olduğunu gösterir: küçük ve sınırlı bir istila, yayılmış bir sorundan çok daha kolay kontrol altına alınır.",
        ],
      },
      {
        id: "yatakta-gorulen-izler",
        title: "Yatakta ve çevresinde görülen izler",
        paragraphs: [
          "ABD Hastalık Kontrol ve Önleme Merkezleri (CDC), tahta kurusu istilasının işaretleri arasında dökülmüş kabukları, yatak ve çarşaf kıvrımlarında böcek veya yumurtaları, yatak ve yakın mobilyalarda pas rengi lekeleri ve yoğun istilalarda tatlımsı, küf benzeri bir kokuyu sayar. İnceleme yaparken bu izleri sistemli biçimde aramak, tahmin yürütmekten çok daha güvenilirdir.",
        ],
        subsections: [
          {
            id: "lekeler",
            title: "Kan ve dışkı lekeleri",
            paragraphs: [
              "Çarşafta veya yatak kılıfında görülen küçük pas rengi lekeler, beslenmiş bir böceğin ezilmesinden kaynaklanabilir. Yatak dikişlerinde, baza köşelerinde ve başlık arkasında görülen keçeli kalemle yapılmış gibi siyah noktalar ise genellikle dışkı izidir ve kumaşa sürüldüğünde dağılabilir.",
            ],
          },
          {
            id: "kabuk-ve-yumurta",
            title: "Kabuklar, yumurtalar ve canlı böcekler",
            paragraphs: [
              "Tahta kuruları büyüdükçe kabuk değiştirir. Açık renkli, içi boş kabuklar ve pirinç tanesinin çok küçük bir parçası gibi görünen beyazımsı yumurtalar özellikle dikiş yerlerinde birikebilir. Bir el feneri ve ince uçlu bir kartla dikiş aralarını yavaşça taramak, bu izleri görmenin en pratik yoludur.",
            ],
          },
        ],
      },
      {
        id: "isirik-belirtileri",
        title: "Isırıklar neyi gösterir, neyi göstermez?",
        paragraphs: [
          "CDC'ye göre tahta kurusu ısırıkları genellikle yüz, boyun, kollar ve eller gibi uyurken açıkta kalan bölgelerde; küçük, hafif şiş, kırmızı ve kaşıntılı izler şeklinde görülür. İzler rastgele dağılabilir ya da düz bir hat üzerinde sıralanabilir. Aynı kaynak, izlerin ısırıktan günler sonra ortaya çıkabileceğini ve bazı kişilerde hiç tepki oluşmayabileceğini belirtir.",
          "Bu yüzden ısırık benzeri döküntüler tek başına tahta kurusu olduğunu göstermez; sivrisinek, pire, alerji ya da cilt hastalıkları da benzer görünebilir. CDC, tahta kurularının insanlara hastalık taşıdığının bilinmediğini, ancak kaşıntı, uyku kaybı ve nadiren alerjik tepkiye yol açabileceğini ifade eder. Ciltte yaygın döküntü, şişlik veya enfeksiyon belirtisi varsa hekime başvurmak gerekir.",
          "CDC, ısırıkları kaşımamanın enfeksiyon riskini azalttığını ve alerjik bir tepki şüphesinde tıbbi yardım alınması gerektiğini belirtir. Kaşıntıyı hafifletecek bir ürün için hekime veya eczacıya danışılabilir. Özellikle çocuklarda ve yaşlılarda uykusuzluk ile kaşıntının günlük yaşamı etkilemesi, sorunun ciddiye alınması için yeterli bir nedendir.",
        ],
      },
      {
        id: "benzer-sorunlar",
        title: "Tahta kurusuyla karıştırılabilen durumlar",
        paragraphs: [
          "NPIC, tahta kurusundan şüphelenildiğinde önce canlının doğru tanımlanmasını önerir; çünkü halı böcekleri, pireler ve yarasa kaynaklı benzer böcekler sıklıkla karıştırılır. Yanlış tanı, gereksiz uygulamalara ve gerçek sorunun sürmesine neden olabilir.",
        ],
        subsections: [
          {
            id: "pire-farki",
            title: "Pire",
            paragraphs: [
              "Pireler zıplayarak hareket eder ve ısırıkları çoğunlukla ayak bileği ve bacaklarda yoğunlaşır. Evde kedi veya köpek varsa ve hayvan sık kaşınıyorsa öncelikle pire ihtimali değerlendirilmelidir.",
            ],
          },
          {
            id: "hali-bocegi-ve-diger",
            title: "Halı böceği ve diğer canlılar",
            paragraphs: [
              "Halı böceği larvaları tüylüdür ve kan emmez; ancak tüyleri bazı kişilerde ciltte tahrişe yol açabilir. Çatı arasında yarasa ya da güvercin yuvası bulunan binalarda ise bu hayvanlarla ilişkili, tahta kurusuna çok benzeyen türler görülebilir. Böyle bir durumda kaynağın, yani yuvanın da ele alınması gerekir.",
              "Emin olamadığınız durumlarda böceği bir kaba alıp fotoğraflamak ya da yapışkan bir bantla sabitlemek, uzmanın türü doğru belirlemesini sağlar. Tür doğrulanmadan yapılan uygulamalar hem zaman kaybına hem de gereksiz maruziyete yol açabilir.",
            ],
          },
        ],
      },
      {
        id: "nasil-kontrol-edilir",
        title: "Evde adım adım kontrol",
        paragraphs: [
          "İncelemeye yataktan başlayın ve yatağın çevresinde bir iki metrelik alana doğru genişleyin. Gündüz ışığında ve iyi bir el feneriyle yapılan kontrol, gece yapılan rastgele aramalardan daha fazla bilgi verir.",
          "Kontrolü birkaç gün arayla tekrarlamak, tek seferlik bir aramadan daha fazla bilgi verir. Yatak ayaklarının altına yerleştirilen izleme kapları gibi basit araçlar, gece boyunca hareket eden böcekleri yakalayarak varlıklarını doğrulamaya yardımcı olabilir. Bulduğunuz her izi tarih ve konum bilgisiyle not etmek, uzmanla görüşürken işinizi kolaylaştırır.",
        ],
        bullets: [
          "Çarşafları kaldırıp yatağın dikiş yerlerini, etiket çevresini ve köşelerini inceleyin.",
          "Baza, karyola birleşim yerleri ve başlık arkasına bakın.",
          "Komodin çekmecelerini, priz kapaklarının ve süpürgeliklerin çevresini kontrol edin.",
          "Bulduğunuz bir böceği bantla bir kâğıda sabitleyip fotoğraflayın.",
          "Seyahat dönüşü bavulları yatağın üzerine değil, sert bir zemine açın.",
        ],
      },
      {
        id: "yayilmayi-onleme",
        title: "Yayılmayı sınırlamak için dikkat edilecekler",
        paragraphs: [
          "Tahta kurusundan şüphelenildiğinde yatağı veya koltuğu hemen başka bir odaya taşımak ya da evden atmak, böceklerin evin diğer bölümlerine yayılmasına yol açabilir. Atılacak eşyalar varsa streç filme sarılarak ve üzerine not düşülerek çıkarılmalıdır.",
          "Otel, yurt veya misafirhane gibi yoğun konaklama yapılan yerlerden dönüşte bavulu doğrudan yatak odasına taşımamak, giysileri hemen yıkamak ve bavulun dikiş yerlerini kontrol etmek basit ama etkili önlemlerdir. İkinci el yatak, koltuk ve başlık gibi eşyalar eve alınmadan önce dikkatle incelenmelidir.",
          "NPIC'in sıraladığı kimyasal olmayan seçenekler arasında süpürme, yatak ve bazayı özel kılıflarla kapatma, uygun tekstilleri yüksek ısıda kurutma, buharlı temizlik ve eşya kalabalığını azaltma yer alır. Kurum ayrıca sis bombası tarzı ürünlerin tahta kurusuna karşı etkili olmadığını belirtir. Bilinçsiz ve sık tekrarlanan kimyasal kullanımı direnç gelişimine katkıda bulunabileceğinden kaçınılmalıdır.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Yatakta canlı böcek, yumurta veya dışkı izi bulduysanız ya da ısırık benzeri izler birkaç gecedir sürüyorsa, CDC'nin de önerdiği gibi tahta kurusu konusunda deneyimli bir uygulayıcıyla görüşmek yerinde olur. Tahta kurusu kontrolü genellikle tek ziyaretle tamamlanmaz; inceleme, hazırlık, uygulama ve takip ziyaretinden oluşan bir süreç olarak planlanır.",
          "Apartman veya sitede yaşıyorsanız komşu daireler ve yönetimle iletişim kurmak, sorunun tekrarlama riskini azaltır. Uygulayıcıdan yöntem, hazırlık listesi ve takip takvimi hakkında yazılı bilgi istemek, süreci planlamanıza yardımcı olur.",
          "Uygulama öncesinde verilecek hazırlık listesine uymak, sürecin en kritik kısmıdır. Tekstillerin yıkanması, yatak altının boşaltılması ve eşya kalabalığının azaltılması, böceklerin saklanabileceği alanları daraltır ve uygulamanın bu alanlara ulaşmasını kolaylaştırır.",
        ],
      },
    ],
    sources: [
      {
        title: "About Bed Bugs",
        publisher: "Centers for Disease Control and Prevention (CDC)",
        url: "https://www.cdc.gov/bed-bugs/about/index.html",
      },
      {
        title: "Bed Bugs",
        publisher: "National Pesticide Information Center (NPIC), Oregon State University",
        url: "https://npic.orst.edu/pest/bedbug/index.html",
      },
      {
        title: "Bed Bugs: Get Them Out and Keep Them Out",
        publisher: "U.S. Environmental Protection Agency (EPA)",
        url: "https://www.epa.gov/bedbugs",
      },
    ],
    relatedServices: ["tahta-kurusu-ilaclama", "ev-ilaclama", "otel-ilaclama"],
  },

  /* ------------------------------------------------------------------ */
  "farelerin-yasam-alanina-girisini-onlemek": {
    slug: "farelerin-yasam-alanina-girisini-onlemek",
    summary:
      "Farelerin yaşam alanına girişini önlemenin en etkili yolu, binadaki açıklıkları dayanıklı malzemelerle kapatmak ve besin, su ve barınak kaynaklarını ortadan kaldırmaktır. Küçük bir boşluk bile giriş için yeterli olabileceğinden temel, boru geçişleri, kapı altları ve çatı birleşimleri sistemli biçimde kontrol edilmelidir. Bu yapısal önlemler, izleme ve gerektiğinde profesyonel kontrolle birlikte uygulandığında kalıcı sonuç verir.",
    keyTakeaways: [
      "Giriş noktalarının kapatılması, kemirgen kontrolünün en kalıcı adımıdır.",
      "Kapatma işleminde kemirgenlerin kemiremeyeceği metal veya beton esaslı malzemeler tercih edilir.",
      "Kapalı gıda saklama ve düzenli atık yönetimi, farelerin ilgisini azaltır.",
      "Bahçedeki bitki örtüsü ve depolama düzeni de giriş riskini etkiler.",
    ],
    sections: [
      {
        id: "neden-girer",
        title: "Fareler neden eve veya işyerine girer?",
        paragraphs: [
          "Fareler barınak, besin ve su arayışıyla yapılara yönelir. Hava soğudukça, çevrede inşaat veya altyapı çalışması yapıldıkça ya da yakındaki bir besin kaynağı ortadan kalktıkça yeni alanlara yönelmeleri hızlanabilir. Bir kez güvenli bir yuva ve düzenli besin bulduklarında aynı yolları tekrar tekrar kullanırlar.",
          "Ev faresi ile sıçan aynı canlı değildir; boyutları, yuva tercihleri ve davranışları farklıdır. Ev fareleri genellikle duvar içleri, dolap arkaları ve depolanmış eşyalar arasında yuva yaparken, sıçanlar daha çok bodrum, kanalizasyon hattı ve bina çevresindeki toprak alanlarla ilişkilidir. Hangi kemirgenle karşı karşıya olduğunuzu bilmek, önlemlerin nereye odaklanacağını belirler.",
          "Kaliforniya Üniversitesi IPM programı, ev faresiyle mücadelede yapıya girişin engellenmesini en başarılı ve en kalıcı yöntem olarak tanımlar. Yani kontrolün odağı, içerideki fareden önce farenin içeri nasıl girdiği sorusudur.",
        ],
      },
      {
        id: "giris-noktalari",
        title: "En sık kullanılan giriş noktaları",
        paragraphs: [
          "CDC, farelerin yaklaşık bir kurşun kalem genişliğindeki açıklıklardan geçebildiğini hatırlatır. Bu nedenle göze küçük görünen aralıklar da ciddiye alınmalıdır. Kontrol yaparken binanın hem iç hem dış yüzünü dolaşmak gerekir.",
        ],
        subsections: [
          {
            id: "temel-ve-tesisat",
            title: "Temel, duvar ve tesisat geçişleri",
            paragraphs: [
              "Temeldeki çatlaklar, su ve doğalgaz borularının duvardan geçtiği noktalar, havalandırma menfezleri ve kablo kanalları en sık rastlanan girişlerdir. Mutfak dolaplarının arkasında, lavabo altında ve kombi çevresinde kalan boru boşlukları da içeride gizli geçiş yolları oluşturabilir.",
            ],
          },
          {
            id: "kapi-ve-pencere",
            title: "Kapı altları, pencereler ve sineklikler",
            paragraphs: [
              "Tam oturmayan kapılar, aşınmış kapı altı fitilleri ve yırtık sineklikler özellikle zemin katlarda ve bahçe katlarında risk oluşturur. UC IPM, kapı, pencere ve sinekliklerin sıkı oturmasını ve kemirmeye karşı gerekirse kapı altlarına metal kenar uygulanmasını önerir.",
            ],
          },
          {
            id: "cati-ve-ust-katlar",
            title: "Çatı birleşimleri ve üst katlar",
            paragraphs: [
              "Fareler iyi tırmanıcıdır. Duvara yaslanan bitkiler, sarmaşıklar ve cepheye yakın ağaç dalları onları çatı birleşimlerine, saçak altlarına ve çatı arasına taşıyabilir. Bu nedenle sorun yalnızca zemin katlarla sınırlı değildir.",
            ],
          },
        ],
      },
      {
        id: "kapatma-malzemeleri",
        title: "Boşluklar hangi malzemelerle kapatılmalı?",
        paragraphs: [
          "Kapatma işleminin kalıcı olması, kullanılan malzemenin kemirgenlere dayanıklı olmasına bağlıdır. UC IPM; plastik, kauçuk, vinil, köpük ve ahşap gibi kemirilebilen malzemelerin delik kapatmada işe yaramadığını belirtir.",
          "Kapatma işine başlamadan önce içeride fare bulunup bulunmadığını değerlendirmek gerekir. Aktif bir yuva varken tüm çıkışların kapatılması, kemirgenlerin içeride kalarak yeni yollar açmaya çalışmasına ya da erişilemeyen bir boşlukta ölmesine yol açabilir. Bu nedenle kapatma çoğu zaman izleme ve kontrol adımlarıyla aynı plan içinde, belirli bir sıra gözetilerek yapılır.",
        ],
        subsections: [
          {
            id: "kalici-cozumler",
            title: "Kalıcı uygulamalar",
            paragraphs: [
              "Temel çatlakları ve boru çevresindeki büyük boşluklar için beton veya harç, menfez ve geniş açıklıklar için metal levha ya da sık gözlü metal tel örgü tercih edilir. Bu işlerin bir tesisatçı veya yapı ustasıyla birlikte planlanması, hem yapıya zarar vermemek hem de havalandırmayı kapatmamak açısından önemlidir.",
            ],
          },
          {
            id: "gecici-cozumler",
            title: "Geçici önlemler",
            paragraphs: [
              "Küçük aralıklar için çelik yün, dolgu malzemesiyle birlikte geçici bir çözüm olabilir. Ancak UC IPM'in belirttiği gibi çelik yün zamanla paslanabileceğinden bu noktaların dönemsel olarak kontrol edilmesi ve kalıcı malzemeyle yenilenmesi gerekir.",
            ],
          },
        ],
      },
      {
        id: "besin-ve-atik",
        title: "Besin, su ve atık düzeni",
        paragraphs: [
          "Giriş noktaları kapatılsa bile içeride kolay besin bulunması, farelerin yeni bir yol arama motivasyonunu artırır. Hem CDC hem UC IPM, gıda ve çöpün sıkı kapaklı kaplarda saklanmasını ve dökülen yiyeceklerin hemen temizlenmesini önerir.",
          "Su kaynakları da göz ardı edilmemelidir. Lavabo altındaki sızıntılar, klima tahliye suları ve bahçedeki su kapları kemirgenler için düzenli bir su kaynağı oluşturabilir. Bu kaynakların ortadan kaldırılması, alanın kemirgenler için çekiciliğini belirgin biçimde azaltır.",
        ],
        bullets: [
          "Kuru gıda, tahıl ve mamaları kapaklı metal veya kalın plastik kaplarda saklayın.",
          "Evcil hayvanlara bir öğünde yiyeceği kadar mama verin, kabı gece boyunca dolu bırakmayın.",
          "Çöp kovalarını kapaklı tutun ve düzenli boşaltın.",
          "Depo, kiler ve bodrumda karton yığınlarını ve kullanılmayan eşyaları azaltın.",
          "Damlayan muslukları ve sızıntıları onarın.",
        ],
      },
      {
        id: "bahce-ve-cevre",
        title: "Bahçe ve bina çevresinde alınabilecek önlemler",
        paragraphs: [
          "Binanın hemen çevresi, farelerin içeri girmeden önce barındığı alandır. CDC; kompost kutularının, odun yığınlarının ve kuş yemliklerinin binadan uzak tutulmasını, çim ve çalıların kısa ve düzenli bakılmasını önerir. Duvar diplerinde biriken moloz, kullanılmayan eşya ve sık bitki örtüsü saklanma alanı oluşturur.",
          "Bina çevresini dolaşırken duvar dibinde açılmış delikler, çöp alanına uzanan patikalar ve bahçe duvarı boyunca oluşmuş izler gibi belirtilere de dikkat edin. Bu izler, kemirgenlerin düzenli kullandığı güzergâhları gösterir ve hem kapatma hem de izleme noktalarının yerini belirlemede yol gösterir.",
          "Apartman ve sitelerde çöp konteynerlerinin kapaklarının kapalı tutulması, toplama saatlerinin düzenli olması ve çöp alanının yapıya bitişik olmaması da önemlidir. Bu önlemler yönetim ve sakinlerin ortak çabasını gerektirir.",
          "Bahçeli müstakil evlerde kuş yemi, düşen meyveler ve dışarıda bırakılan evcil hayvan maması da kemirgenleri çeken besin kaynaklarıdır. Bu kaynakları kontrol altında tutmak ve odun ile malzeme yığınlarını zeminden yükseltilmiş, duvardan uzak raflarda saklamak, barınma alanlarını azaltır.",
        ],
      },
      {
        id: "belirtiler-ve-temizlik",
        title: "Fare varlığının belirtileri ve dikkatli temizlik",
        paragraphs: [
          "Pirinç tanesi büyüklüğünde koyu dışkılar, ambalajlarda ve kablolarda kemirme izleri, duvar diplerinde yağlı sürtünme lekeleri ve gece saatlerinde tavan veya duvar içinden gelen tıkırtılar fare varlığına işaret edebilir. Bu izlerin yoğunlaştığı yerler, giriş noktasının nerede olabileceği hakkında da ipucu verir.",
          "Bu belirtileri fotoğraflamak ve bulunduğu yerleri not etmek, uzmanla yapılacak görüşmede çok işe yarar. Yeni dışkıların eski olanlardan ayırt edilebilmesi için tespit edilen alanların temizlendikten sonra birkaç gün izlenmesi, aktivitenin sürüp sürmediğini anlamaya yardımcı olur.",
          "Kemirgen dışkı ve idrarı bazı hastalık etkenlerinin bulaşmasında rol oynayabileceğinden, bu kalıntıları temizlerken eldiven kullanmak, toz kaldırmamaya özen göstermek ve sonrasında elleri iyice yıkamak önerilir. Ayrıntılı temizlik adımları için sağlık kurumlarının güncel rehberlerine başvurulabilir; kendinizde ya da ev halkında ateş, halsizlik gibi şikâyetler ortaya çıkarsa hekime danışın.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Kapatma ve temizlik önlemlerine rağmen yeni dışkı veya kemirme izleri görülüyorsa, fareler duvar içi ya da asma tavan gibi erişilmesi zor alanlara yerleşmişse veya bir işletmede gıdaya temas riski varsa profesyonel destek almak gerekir. CDC de temizlenmesi güç alanlara ulaşan kemirgenler için bir uzmandan yardım alınabileceğini belirtir.",
          "Profesyonel kemirgen kontrolünde genellikle önce giriş noktaları ve aktivite alanları belirlenir, ardından izleme istasyonları yerleştirilir ve yapısal öneriler raporlanır. Ruhsatlı ürünlerin çocukların ve evcil hayvanların erişemeyeceği şekilde, etiket talimatlarına uygun olarak yalnızca yetkili uygulayıcılar tarafından kullanılması önemlidir.",
          "Kontrol süreci tek bir ziyaretle sınırlı kalmamalıdır. Takip ziyaretlerinde izleme noktalarındaki aktivite değerlendirilir, önerilen kapatma işlerinin yapılıp yapılmadığına bakılır ve gerekiyorsa plan güncellenir. Yapısal önlemler tamamlandıkça izleme sıklığı azaltılabilir; amaç sürekli müdahale değil, kemirgenin yeniden girmesini engelleyen bir düzen kurmaktır.",
        ],
      },
    ],
    sources: [
      {
        title: "House Mouse — Pest Notes",
        publisher: "University of California Statewide IPM Program (UC IPM)",
        url: "https://ipm.ucanr.edu/PMG/PESTNOTES/pn7483.html",
      },
      CDC_SEAL_UP,
    ],
    relatedServices: [
      "fare-ve-kemirgen-kontrolu",
      "bodrum-ve-ortak-alan-kontrolu",
      "apartman-ve-bina-ilaclama",
      "depo-ilaclama",
    ],
  },

  /* ------------------------------------------------------------------ */
  "pire-sorununda-hangi-onlemler-alinabilir": {
    slug: "pire-sorununda-hangi-onlemler-alinabilir",
    summary:
      "Pire sorununda kalıcı sonuç için evcil hayvanın veteriner önerisiyle korunması, evin düzenli süpürülmesi ve tekstillerin sıcak suyla yıkanması birlikte yürütülmelidir. Pirelerin büyük bölümü yumurta, larva ve koza evresinde halı, koltuk ve yataklarda bulunduğundan yalnızca hayvana yönelik önlem yetmeyebilir. Yoğun durumlarda profesyonel uygulama, bu adımlarla eşgüdümlü olarak planlanır.",
    keyTakeaways: [
      "Pire kontrolü hayvan, ev içi ve gerekirse dış alan olmak üzere üç ayaklıdır.",
      "Evcil hayvan için ürün seçimi veterinerle birlikte yapılmalıdır.",
      "Süpürme ve tekstil yıkama, larva ve kozaları azaltmanın temel yoludur.",
      "Uygulama sonrasında bir süre pire görülmeye devam etmesi yaşam döngüsü nedeniyle beklenebilir.",
    ],
    sections: [
      {
        id: "pire-neden-zor",
        title: "Pire neden kolay bitmez? Yaşam döngüsünü anlamak",
        paragraphs: [
          "Yetişkin pireler konakçı hayvanın üzerinde yaşar, beslenir ve yumurtlar. Kaliforniya Üniversitesi IPM programına göre dişi pireler günde onlarca yumurta bırakabilir ve bu yumurtalar hayvanın üzerinden düşerek yatak, halı ve koltuklara dağılır. Yumurtadan çıkan larvalar, yetişkin pirelerin bıraktığı kurumuş kan ve atıklarla beslenir, ardından koza örerek gelişimini sürdürür.",
          "Bu nedenle evde gördüğünüz yetişkin pireler toplam popülasyonun yalnızca küçük bir kısmını oluşturur. Halı dipleri, koltuk aralıkları, yatak altları ve hayvanın yattığı köşeler, gözle görülmeyen evrelerin toplandığı asıl alanlardır ve kontrolün odağında bu bölgeler yer almalıdır.",
          "Aynı kaynak, kozadaki pirelerin sıcaklık, titreşim ve basınç gibi uyaranlarla dışarı çıktığını ve serin koşullarda uzun süre bekleyebildiğini belirtir. Bu nedenle uzun süre boş kalan bir eve taşındıktan sonra ya da tatilden dönüşte aniden pire şikâyeti başlaması sık rastlanan bir durumdur.",
          "UC IPM'e göre oda sıcaklığında yaşam döngüsü birkaç haftada tamamlanabilir. Yani bugün gördüğünüz yetişkin pireler, aslında haftalar önce bırakılmış yumurtaların sonucudur. Bu durum, kontrolün neden hem hayvana hem de çevreye yönelik olması ve neden birkaç hafta boyunca sürdürülmesi gerektiğini açıklar.",
        ],
      },
      {
        id: "evcil-hayvan",
        title: "Evcil hayvanın korunması",
        paragraphs: [
          "Evde kedi veya köpek varsa pire kontrolünün ilk adımı hayvandır. Hayvanın düzenli olarak kontrol edilmesi ve korunması, evdeki yeni yumurta akışını keser. UC IPM, veteriner tarafından önerilen ürünlerin eski tip toz, şampuan ve spreylere göre daha etkili ve daha uygun olduğunu belirtir.",
          "Evcil hayvanınızın yeni sahiplenilmiş olması, bir pansiyonda veya bakımevinde kalmış olması ya da başka hayvanlarla aynı ortamı paylaşması pire riskini artırabilir. Bu dönemlerde hayvanı eve almadan önce veteriner kontrolünden geçirmek ve yatağını ayrı bir alanda tutmak, sorunun eve yayılmasını önlemeye yardımcı olur. Hayvanın tüyünü pire tarağıyla düzenli kontrol etmek erken fark etmeyi kolaylaştırır.",
          "Ulusal Pestisit Bilgi Merkezi (NPIC), köpekler için üretilen bazı ürünlerin kediler için uygun olmadığını özellikle vurgular. Bu yüzden hayvanınız için hangi ürünün, hangi sıklıkla kullanılacağına mutlaka veterinerinizle birlikte karar verin; bir hayvan için alınan ürünü başka bir türe uygulamayın.",
          "Evcil hayvanınız dışarıda vakit geçiriyorsa, parklarda veya bahçede başka hayvanlarla temas ediyorsa yeniden pire taşıma ihtimali yüksektir. Bu nedenle koruma tek seferlik değil, veterinerin önerdiği aralıklarla sürdürülen bir rutin olarak düşünülmelidir. Hayvanın düzenli bakımı aynı zamanda evdeki pire popülasyonunun yeniden büyümesini önler.",
        ],
        bullets: [
          "Hayvanı pire tarağıyla düzenli tarayarak durumu izleyin.",
          "Evdeki tüm evcil hayvanları aynı dönemde veteriner kontrolüne alın.",
          "Hayvanın sık kaşınması, tüy dökülmesi veya ciltte kızarıklık varsa veterinere başvurun.",
        ],
      },
      {
        id: "ev-ici-temizlik",
        title: "Ev içinde yapılması gerekenler",
        paragraphs: [
          "Pirelerin olgunlaşmamış evreleri büyük ölçüde hayvanın dinlendiği yerlerde toplanır. Bu alanların düzenli temizliği, kimyasal bir uygulama yapılsa da yapılmasa da sürecin ayrılmaz parçasıdır.",
        ],
        subsections: [
          {
            id: "supurme",
            title: "Düzenli ve dikkatli süpürme",
            paragraphs: [
              "Halılar, koltuklar, yatak altları, süpürgelik dipleri ve hayvanın yattığı alanlar sık sık süpürülmelidir. Süpürme hem yumurta ve larvaları toplar hem de kozadaki pirelerin dışarı çıkmasını tetikleyerek ortaya çıkmalarını hızlandırır. Toz torbasını veya haznesini her seferinde ağzı kapalı bir poşetle evden çıkarmak, toplananların geri dönmesini önler.",
            ],
          },
          {
            id: "tekstil-yikama",
            title: "Tekstillerin yıkanması",
            paragraphs: [
              "Hayvan yatakları, battaniyeler, minder kılıfları ve hayvanın üzerine çıktığı yatak örtüleri kumaşın izin verdiği en yüksek sıcaklıkta yıkanmalıdır. UC IPM, hayvan yataklarının haftalık olarak sıcak, sabunlu suyla yıkanmasını önerir. Yıkanamayan eşyalar için buharlı temizlik bir seçenek olabilir.",
            ],
          },
        ],
      },
      {
        id: "dis-alan",
        title: "Bahçe, balkon ve dış alanlar",
        paragraphs: [
          "Bahçeli evlerde hayvanın dinlendiği gölgelik alanlar, kulübe çevresi ve teras altları pirelerin geliştiği yerler olabilir. UC IPM ve NPIC, dış alanda yapılacak uygulamaların genellikle gerekli olmadığını, yalnızca yoğun pire bulunan ve hayvanın vakit geçirdiği noktalarla sınırlı tutulması gerektiğini belirtir.",
          "Apartman dairelerinde ise dış alan genellikle balkon ve bina girişiyle sınırlıdır. Ortak alanlarda barınan sahipsiz hayvanlar pire kaynağı olabileceğinden, bu konuda yönetimle iletişim kurmak ve hayvanların sağlığı için yerel yönetimin veteriner hizmetlerinden destek istemek düşünülebilir.",
          "Sahipsiz kedi ve diğer yaban hayvanlarının bahçede barınmasını kolaylaştıran besin ve sığınak kaynaklarını azaltmak da yeniden pire taşınma riskini düşürür. Güneş alan, açık ve düzenli bakılan alanlar pire gelişimi için daha az elverişlidir.",
        ],
      },
      {
        id: "ise-yaramayan-yontemler",
        title: "Etkisi gösterilmemiş yöntemler",
        paragraphs: [
          "Pire sorunu yaşayan pek çok kişi internette önerilen ev yöntemlerine başvurur. UC IPM; B1 vitamini, bira mayası, bitkisel tasmalar ve ultrasonik cihazların pireyi önlemediğini belirtir; NPIC de ev yöntemlerinin iyi sonuç verdiğinin gösterilmediğini ifade eder.",
          "Bu yöntemlere güvenerek zaman kaybetmek, popülasyonun büyümesine yol açabilir. Ayrıca bazı esansiyel yağlar ve evde hazırlanan karışımlar, özellikle kediler için risk oluşturabilir. Hayvanınıza herhangi bir ürün uygulamadan önce veterinerinizin görüşünü alın.",
          "Benzer şekilde, sis bombası tarzı ürünler veya etiket talimatlarına uyulmadan yapılan geniş alan uygulamaları, pirenin saklandığı halı dipleri ve koltuk aralarına ulaşmayabilir ve ev halkı için gereksiz maruziyet oluşturabilir. Bir ürün kullanılacaksa ruhsatlı olmasına, hedef zararlı için uygun olmasına ve etiketindeki uyarılara uyulmasına dikkat edilmelidir.",
        ],
      },
      {
        id: "profesyonel-uygulama-ile-esgudum",
        title: "Profesyonel uygulama ile eşgüdüm",
        paragraphs: [
          "Yoğun pire sorunlarında ev içi alanlara yönelik profesyonel uygulama gerekebilir. Bu uygulamanın sonuç vermesi, hayvanın veteriner kontrolünün aynı dönemde yapılmasına ve temizlik adımlarının sürdürülmesine bağlıdır.",
        ],
        subsections: [
          {
            id: "uygulama-oncesi",
            title: "Uygulama öncesinde",
            paragraphs: [
              "Uygulama gününden önce zeminlerin boşaltılması, halı ve koltukların iyice süpürülmesi ve tekstillerin yıkanması gerekir. Evcil hayvanların uygulama sırasında ve uygulayıcının belirttiği süre boyunca alandan uzak tutulması, akvaryumların kapatılması gibi hazırlıklar önceden konuşulmalıdır.",
              "Uygulayıcıya evde bulunan tüm evcil hayvanları, bunların veteriner kontrolünün ne zaman yapıldığını ve hangi alanlarda vakit geçirdiklerini anlatmak, uygulamanın doğru noktalara yönelmesini sağlar.",
            ],
          },
          {
            id: "uygulama-sonrasi",
            title: "Uygulama sonrasında",
            paragraphs: [
              "UC IPM, uygulamadan sonra kozalardan çıkışın bir süre devam ettiğini ve süpürmenin yaklaşık iki hafta sürdürülmesini önerir. Bu nedenle ilk günlerde pire görmeye devam etmek, uygulamanın başarısız olduğu anlamına gelmeyebilir. Şikâyet birkaç hafta içinde azalmıyorsa uygulayıcıyla takip ziyareti planlanmalıdır.",
            ],
          },
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Hayvanın veteriner kontrolüne ve düzenli temizliğe rağmen birkaç hafta içinde azalma olmuyorsa, evde hiç evcil hayvan yokken pire görülüyorsa ya da ev halkında tekrarlayan ısırıklar varsa profesyonel bir inceleme yapılması yerinde olur. Evcil hayvan yokken görülen pireler, çatı arası veya bodrumda barınan bir yaban hayvanına işaret edebilir.",
          "Pire ısırıkları bazı kişilerde ve hayvanlarda alerjik tepkilere yol açabilir. NPIC, pirelerin bazı hastalıkların taşınmasında rol oynayabildiğini ve hem evcil hayvanların hem de insanların sağlığını etkileyebildiğini belirtir. Hayvanınızda halsizlik, iştahsızlık veya yoğun tüy kaybı gibi belirtiler görürseniz veterinerinize, kendinizde süren şikâyetler için hekiminize danışın.",
          "Isırık bölgelerinde yaygın kızarıklık, şişlik veya enfeksiyon belirtisi oluşursa hekime başvurun. Uygulayıcıdan kullanılacak ürünlerin ruhsat bilgisini, hazırlık listesini ve alana dönüş süresini önceden istemek, sürecin daha sorunsuz geçmesini sağlar.",
        ],
      },
    ],
    sources: [
      {
        title: "Fleas — Pest Notes",
        publisher: "University of California Statewide IPM Program (UC IPM)",
        url: "https://ipm.ucanr.edu/PMG/PESTNOTES/pn7419.html",
      },
      {
        title: "Fleas",
        publisher: "National Pesticide Information Center (NPIC), Oregon State University",
        url: "https://npic.orst.edu/pest/flea.html",
      },
    ],
    relatedServices: ["pire-ilaclama", "ev-ilaclama", "bahce-ve-acik-alan-kontrolu"],
  },

  /* ------------------------------------------------------------------ */
  "ilaclama-oncesinde-nelere-dikkat-edilmeli": {
    slug: "ilaclama-oncesinde-nelere-dikkat-edilmeli",
    summary:
      "İlaçlama öncesinde ev halkının sağlık durumu, evcil hayvanlar ve akvaryumlar gibi bilgilerin uygulayıcıyla paylaşılması, açıkta gıda ve kişisel eşya bırakılmaması ve uygulama alanına kolay erişim sağlanması gerekir. Uygulayıcıdan kullanılacak ürünün ruhsat bilgisini, etiket uyarılarını ve alana ne zaman dönülebileceğini önceden öğrenmek önemlidir. İyi bir hazırlık hem uygulamanın etkisini artırır hem de gereksiz maruziyeti azaltır.",
    keyTakeaways: [
      "Hamile, bebek, astımlı veya kronik hastalığı olan bireyler önceden bildirilmelidir.",
      "Gıdalar, mutfak eşyaları ve oyuncaklar kapalı yerlere kaldırılmalıdır.",
      "Kullanılacak ürünün etiketi ve alana dönüş süresi uygulayıcıdan sorulmalıdır.",
      "Uygulama sonrası temizlik zamanlaması, etkinliği doğrudan etkiler.",
    ],
    sections: [
      {
        id: "neden-hazirlik",
        title: "Hazırlık neden bu kadar önemli?",
        paragraphs: [
          "Profesyonel bir uygulamanın sonucu yalnızca kullanılan yönteme değil, alanın nasıl hazırlandığına da bağlıdır. Eşyalarla kapanmış köşeler, dolu dolap içleri veya ulaşılamayan beyaz eşya arkaları, böceklerin yoğun bulunduğu noktaların atlanmasına yol açabilir. Öte yandan açıkta bırakılan gıda, tabak çanak ve oyuncaklar gereksiz temasa neden olabilir.",
          "Hazırlık aynı zamanda ev halkının planını da kapsar. Uygulama günü evde kimin bulunacağını, evcil hayvanların nerede kalacağını ve alana ne zaman dönüleceğini önceden netleştirmek, son dakika aksaklıklarını önler. Çalışan aileler için uygulamanın, evin birkaç saat boş kalabileceği bir güne planlanması daha rahat bir süreç sağlar.",
          "ABD Çevre Koruma Ajansı (EPA), haşere kontrol hizmeti alırken uygulayıcının istediği eşyaların ve evcil hayvanların alandan çıkarılmasını, çocukların ve hayvanların uygulama yapılan yüzeyler kuruyana kadar alandan uzak tutulmasını ve akvaryumların korunmasını önerir. Bu öneriler, hazırlığın uygulamanın bir parçası olduğunu gösterir.",
        ],
      },
      {
        id: "bilgi-paylasimi",
        title: "Uygulayıcıyla önceden paylaşılması gereken bilgiler",
        paragraphs: [
          "Randevu alırken ya da keşif sırasında aşağıdaki bilgileri paylaşmak, uygulayıcının yöntem ve ürün seçimini buna göre planlamasına yardımcı olur. Bu bilgiler gizli tutulması gereken ayrıntılar değil, güvenli bir planın temel girdileridir.",
          "Bu bilgileri paylaştığınızda uygulayıcının yöntemi buna göre uyarlaması, örneğin daha hedefli bir yöntem seçmesi, uygulama alanını sınırlaması veya alana dönüş süresini uzatması beklenir. Sağlık durumuyla ilgili özel bir soru varsa uygulamadan önce kişinin kendi hekimine danışması da yerinde olur.",
        ],
        bullets: [
          "Evde hamile, bebek, küçük çocuk veya yaşlı birey olup olmadığı.",
          "Astım, alerji, kimyasal hassasiyet veya kronik hastalığı olan kişiler.",
          "Kedi, köpek, kuş, sürüngen ya da akvaryum gibi evcil hayvanlar.",
          "Sorunun ne zamandır sürdüğü, hangi odalarda ve hangi saatlerde görüldüğü.",
          "Daha önce yapılmış uygulamalar ve evde kullanılmış ürünler.",
        ],
      },
      {
        id: "alan-hazirligi",
        title: "Uygulama gününden önce alanın hazırlanması",
        paragraphs: [
          "Hazırlık listesi hedef zararlıya ve uygulama yöntemine göre değişir; bu nedenle uygulayıcının size özel verdiği talimatlar her zaman önceliklidir. Yine de çoğu konut uygulamasında geçerli olan bazı genel adımlar vardır.",
        ],
        subsections: [
          {
            id: "mutfak-hazirligi",
            title: "Mutfak",
            paragraphs: [
              "Açıkta duran gıdalar, baharatlar, meyve kaseleri, tabak çanak ve küçük mutfak aletleri kapalı dolaplara veya kapaklı kaplara kaldırılmalıdır. Hamam böceği gibi mutfakta yoğunlaşan zararlılarda, uygulayıcı dolap içlerinin boşaltılmasını isteyebilir. Ocak, buzdolabı ve bulaşık makinesi çevresinin önceden temizlenmesi, böceklerin saklanma noktalarının görülmesini kolaylaştırır.",
            ],
          },
          {
            id: "yatak-odasi-ve-tekstil",
            title: "Yatak odası ve tekstiller",
            paragraphs: [
              "Tahta kurusu veya pire gibi tekstille ilişkili zararlılarda çarşaf, yastık kılıfı ve perdelerin sıcak suyla yıkanması, yatak altının boşaltılması ve zeminin süpürülmesi istenebilir. Diş fırçası, kozmetik ürünler ve çocuk oyuncakları kapalı kutulara alınmalıdır.",
            ],
          },
          {
            id: "evcil-hayvan-ve-akvaryum",
            title: "Evcil hayvanlar ve akvaryum",
            paragraphs: [
              "Evcil hayvanların uygulama sırasında ve uygulayıcının belirttiği süre boyunca başka bir yerde kalması planlanmalıdır. Mama ve su kapları kaldırılmalı, kuş kafesleri ayrı bir yere taşınmalıdır. Akvaryumların üzeri kapatılmalı ve hava pompası gibi ekipmanlar için uygulayıcıdan bilgi alınmalıdır; EPA da akvaryumların korunmasını veya alandan çıkarılmasını önerir.",
            ],
          },
        ],
      },
      {
        id: "uygulayiciya-sorulacaklar",
        title: "Uygulayıcıya sorulması gereken sorular",
        paragraphs: [
          "EPA, hizmet alırken firmanın uygulama lisansını, kullanılacak ürünlerin etiketlerini ve uygulama bilgilerini görmek istemeyi önerir. Türkiye'de bu karşılık genellikle firmanın biyosidal ürün uygulama izni, mesul müdür bilgisi ve kullanılacak ürünlerin ruhsat bilgisidir.",
          "Bu soruların yanıtlarını önceden almak, uygulama günü yaşanabilecek belirsizlikleri ortadan kaldırır. Yanıtların yazılı olarak, örneğin mesajla veya bir bilgilendirme notuyla iletilmesini istemek, ev halkının tamamının aynı bilgiye ulaşmasını kolaylaştırır.",
        ],
        bullets: [
          "Hangi zararlıya yönelik, hangi yöntemle uygulama yapılacak?",
          "Kullanılacak ürünlerin ruhsat bilgisi ve etiket uyarıları nelerdir?",
          "Uygulama sırasında ve sonrasında alanda kimler, ne kadar süre bulunmamalı?",
          "Havalandırma ve temizlik ne zaman yapılabilir?",
          "Takip ziyareti planlanıyor mu, sonuç nasıl değerlendirilecek?",
        ],
      },
      {
        id: "uygulama-gunu",
        title: "Uygulama günü",
        paragraphs: [
          "Uygulama günü ekibin rahatça çalışabileceği bir ortam sağlamak ve sorunun görüldüğü noktaları göstermek faydalıdır. Uygulama sırasında ev halkının ve evcil hayvanların alanda bulunmaması, kapı ve pencerelerin uygulayıcının yönlendirmesine göre açık ya da kapalı tutulması gerekir.",
          "Uygulama sırasında ekipten açıklama istemekten çekinmeyin. Hangi noktalara uygulama yapıldığını görmek, sonrasında bu alanları nasıl kullanacağınızı ve neyi ne zaman temizleyebileceğinizi anlamanızı kolaylaştırır. Uygulama sonrasında düzenlenen işlem formunu veya kaydı mutlaka alın ve saklayın.",
          "Uygulama tamamlandığında ekipten hangi alanlara uygulama yapıldığını, hangi yüzeylere bir süre dokunulmaması gerektiğini ve alana dönüş saatini net olarak öğrenin. Bu bilgileri yazılı olarak almak, ev halkının hepsinin aynı talimatı uygulamasını kolaylaştırır.",
        ],
      },
      {
        id: "uygulama-sonrasi",
        title: "Uygulama sonrasında dikkat edilecekler",
        paragraphs: [
          "Uygulama sonrası adımlar, kullanılan yönteme göre farklılık gösterir. Bu nedenle genel bir kural yerine uygulayıcının ve ürün etiketinin talimatları esas alınmalıdır.",
          "Uygulamanın etkisini izlemek için ilk birkaç hafta zararlıyı nerede ve ne sıklıkta gördüğünüzü kısaca not edin. Bu notlar, takip ziyaretinde uygulayıcının sonucu değerlendirmesine ve gerekiyorsa planı güncellemesine yardımcı olur. Önerilen nem giderme, boşluk kapatma veya depolama düzenlemelerini de bu süre içinde tamamlamaya çalışın.",
        ],
        subsections: [
          {
            id: "havalandirma",
            title: "Alana dönüş ve havalandırma",
            paragraphs: [
              "Belirtilen süre dolmadan alana dönülmemeli, dönüşte önce kapı ve pencereler açılarak alan havalandırılmalıdır. Çocukların ve evcil hayvanların, uygulama yapılan yüzeyler kuruyana kadar bu alanlarla temas etmemesine dikkat edilmelidir.",
              "Uygulama yapılan alanda yemek hazırlamadan önce tezgâhları silmek, açıkta kalmış bir mutfak eşyası varsa yıkamak ve ellerinizi yıkamayı ihmal etmemek, temas riskini azaltan basit alışkanlıklardır. Evde küçük çocuk varsa zemine yakın alanlarda oynamadan önce uygulayıcının önerdiği sürenin geçtiğinden emin olun.",
            ],
          },
          {
            id: "temizlik-zamanlamasi",
            title: "Temizlik zamanlaması",
            paragraphs: [
              "Gıdayla temas eden tezgâh ve masaların silinmesi genellikle önerilir; ancak süpürgelik dipleri, dolap arkaları gibi hedefli uygulama yapılan noktaların hemen silinmesi etkinliği azaltabilir. Hangi yüzeylerin ne zaman temizlenebileceğini uygulayıcıya sorun.",
              "Çocukların oyun alanları, oyuncaklar ve evcil hayvan eşyaları alana dönüldükten sonra kontrol edilmeli, gerekiyorsa yıkanmalıdır. Uygulama öncesinde kaldırılan eşyaları yerine koymadan önce uygulayıcının önerdiği sürenin dolmasını beklemek yerinde olur.",
            ],
          },
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman ek destek istenmeli?",
        paragraphs: [
          "Uygulama sonrasında ev halkından birinde baş ağrısı, öksürük, nefes darlığı, ciltte tahriş veya mide bulantısı gibi şikâyetler ortaya çıkarsa alan havalandırılmalı, kişi temiz havaya çıkarılmalı ve şikâyet devam ederse hekime başvurulmalıdır. Türkiye'de zehirlenme şüphesinde Ulusal Zehir Danışma Merkezi'ne 114 numaralı hattan ulaşılabilir; görüşmede ürünün etiket bilgisinin elinizde olması işe yarar.",
          "Uygulamadan sonra zararlı görülmeye devam ediyorsa bunu not alıp uygulayıcıyla paylaşın. Bazı zararlılarda etkinin görülmesi zaman alır; takip ziyareti, sonucun değerlendirilmesi ve gerekirse planın güncellenmesi için doğru zamandır.",
          "Uygulama tarihini ertelemeniz gereken durumlar da olabilir. Evde yeni doğmuş bir bebek, yakın zamanda ameliyat olmuş ya da ağır solunum yolu hastalığı geçiren bir kişi varsa, bu durumu uygulayıcıyla paylaşıp uygun zamanlama ve yöntem konusunda birlikte karar vermek, gerekirse kişinin hekimine danışmak önemlidir.",
        ],
      },
    ],
    sources: [
      EPA_SELECTING_SERVICE,
      {
        title: "Citizen's Guide to Pest Control and Pesticide Safety",
        publisher: "U.S. Environmental Protection Agency (EPA)",
        url: "https://www.epa.gov/safepestcontrol/citizens-guide-pest-control-and-pesticide-safety",
      },
    ],
    relatedServices: ["ev-ilaclama", "bocek-ilaclama", "ofis-ilaclama"],
  },
  /* ------------------------------------------------------------------ */
  "profesyonel-hasere-kontrolu-nasil-planlanir": {
    slug: "profesyonel-hasere-kontrolu-nasil-planlanir",
    summary:
      "Profesyonel haşere kontrolü; ön görüşme ve yerinde inceleme, zararlının türünün doğru tespiti, müdahale gerektiren eşiğin belirlenmesi, önleyici ve hedefli yöntemlerin seçimi ve sonuçların takip ziyaretleriyle izlenmesi adımlarıyla planlanır. Bu yaklaşım entegre zararlı yönetimi (IPM) olarak bilinir. Kimyasal uygulama planın tamamı değil, gerektiğinde başvurulan parçalarından biridir.",
    keyTakeaways: [
      "Planlama, uygulamadan önce yapılan inceleme ve tür tespitiyle başlar.",
      "Her zararlı görülmesi otomatik olarak kimyasal uygulama gerektirmez.",
      "Önleyici ve fiziksel yöntemler, hedefli uygulamalarla birlikte kullanılır.",
      "Takip ve kayıt, planın işe yarayıp yaramadığını gösterir.",
    ],
    sections: [
      {
        id: "planli-yaklasim",
        title: "Planlı yaklaşım ne demek?",
        paragraphs: [
          "Haşere sorunlarında sık yapılan hata, sorunu görür görmez tüm alana aynı uygulamayı yapmaktır. Bu yöntem kısa süreli bir rahatlama sağlayabilir; ancak zararlının neden orada olduğu sorusu yanıtsız kaldığı için sorun çoğu zaman geri döner.",
          "Planlı yaklaşımın bir diğer avantajı, kaynakların doğru kullanılmasıdır. Sorunun gerçek kaynağına odaklanan bir plan, gereksiz uygulamaları azaltır, ev halkının veya çalışanların maruziyetini sınırlar ve zaman içinde daha az müdahaleyle aynı sonucun korunmasını sağlar. Bu nedenle plan, kısa vadeli rahatlamadan çok uzun vadeli düzeni hedefler.",
          "ABD Çevre Koruma Ajansı (EPA), entegre zararlı yönetimini dört temel adımla tanımlar: müdahale eşiğinin belirlenmesi, zararlının izlenmesi ve doğru tanımlanması, önleme ve gerektiğinde kontrol. Kaliforniya Üniversitesi IPM programı da bu yaklaşımı uzun vadeli önlemeye odaklanan, kimyasalları yalnızca izleme gerektirdiğini gösterdiğinde ve hedefe yönelik biçimde kullanan bir strateji olarak açıklar.",
        ],
      },
      {
        id: "ilk-gorusme-ve-inceleme",
        title: "İlk görüşme ve yerinde inceleme",
        paragraphs: [
          "İyi bir plan, alanı tanımakla başlar. Uygulayıcının sorunu telefonda dinleyip doğrudan uygulama önermesi yerine, mümkün olduğunda yerinde bir inceleme yapması daha sağlıklı sonuç verir.",
          "Yerinde inceleme, özellikle apartman, site ve işletmeler gibi birden fazla bölümden oluşan alanlarda vazgeçilmezdir. Sorunun görüldüğü yer ile kaynağın bulunduğu yer her zaman aynı değildir; bir dairede görülen böcek bodrumdan, bir mutfakta görülen fare bahçe duvarından geliyor olabilir. Plan, bu bağlantıları ortaya koyan bir incelemeye dayanmalıdır.",
        ],
        subsections: [
          {
            id: "bilgi-toplama",
            title: "Bilgi toplama",
            paragraphs: [
              "İlk görüşmede zararlının ne zamandır görüldüğü, hangi odalarda ve saatlerde fark edildiği, alanın nasıl kullanıldığı, daha önce yapılan uygulamalar ve ev halkı ya da çalışanlar arasında hassas gruplar olup olmadığı sorulur. Bir fotoğraf veya yakalanmış bir örnek, bu aşamada çok değerlidir.",
            ],
          },
          {
            id: "yerinde-inceleme",
            title: "Yerinde inceleme",
            paragraphs: [
              "İnceleme sırasında mutfak ve ıslak hacimler, tesisat geçişleri, depolama alanları, bodrum ve bina çevresi kontrol edilir. Dışkı, kemirme izi, kabuk, yumurta kapsülü gibi kanıtlar; nem sorunları, atık düzeni ve giriş noktalarıyla birlikte not edilir. Bu bulgular planın hem uygulama hem de önleme kısmını şekillendirir.",
              "İncelemenin sonunda alan sahibine bulguların kısa bir özeti sunulmalıdır. Hangi zararlının, nerede, hangi yoğunlukta görüldüğü ve hangi koşulların soruna katkı sağladığı açıkça anlatıldığında, önerilen planın mantığı da anlaşılır hâle gelir.",
            ],
          },
        ],
      },
      {
        id: "tur-tespiti",
        title: "Tür tespiti: doğru teşhis, doğru yöntem",
        paragraphs: [
          "EPA, zararlının doğru tanımlanmasının, sorun oluşturmayan veya faydalı canlılara gereksiz müdahaleyi önlediğini ve doğru kontrol yönteminin seçilmesini sağladığını vurgular. Örneğin iç mekânda çoğalan küçük hamam böceği türüyle kanalizasyondan gelen iri türün kontrolü farklıdır; benzer şekilde tahta kurusu ile pire, ev faresi ile sıçan farklı stratejiler gerektirir.",
          "Tür belirlendikten sonra o canlının yaşam döngüsü, saklanma alışkanlıkları ve hangi koşullardan beslendiği değerlendirilir. Plan, yalnızca yetişkin bireylere değil, yumurta ve larva gibi evrelere de yanıt verecek şekilde kurulur.",
          "Bazen ilk incelemede türü belirlemek mümkün olmaz. Bu durumda izleme tuzakları birkaç gün boyunca bırakılarak örnek toplanabilir. Aceleyle yapılan bir uygulama yerine kısa bir izleme dönemi, sonraki adımların çok daha isabetli seçilmesini sağlar.",
        ],
      },
      {
        id: "eylem-esigi",
        title: "Müdahale eşiği: her görüntü uygulama gerektirir mi?",
        paragraphs: [
          "EPA'nın tanımladığı ilk adım, hangi düzeyde zararlı varlığının veya hangi koşulların müdahale gerektirdiğinin belirlenmesidir. Tek bir zararlının görülmesi her zaman kontrol uygulaması gerektiği anlamına gelmez. Bahçeden içeri giren tek bir böcekle mutfak dolabında üreyen bir popülasyon aynı şekilde ele alınmaz.",
          "Eşik, alanın kullanımına göre değişir. Bir konutta kabul edilebilecek bir durum, gıda işletmesinde, hastanede ya da çocukların bulunduğu bir okulda kabul edilemeyebilir. Bu ayrım, gereksiz uygulamaları azaltırken riskli alanlarda hızlı davranmayı sağlar.",
          "Eşik belirlenirken alan sahibinin beklentisi de dikkate alınır. Örneğin bir site yönetimi ortak alanlarda hiç kemirgen izi görülmemesini hedefleyebilir; bir konut sahibi bahçede ara sıra görülen karıncaları kabul edilebilir bulabilir. Bu beklentilerin baştan konuşulması, planın ölçülebilir hedeflerle yürütülmesine yardımcı olur.",
        ],
      },
      {
        id: "yontem-secimi",
        title: "Yöntem seçimi",
        paragraphs: [
          "Planın merkezinde, en düşük riskle en etkili sonucu verecek yöntemlerin bir arada kullanılması vardır. EPA, önleme yeterli olmadığında öncelikle etkili ve düşük riskli seçeneklerin denenmesini, geniş alana hedefsiz uygulamanın ise son çare olarak görülmesini önerir.",
        ],
        subsections: [
          {
            id: "onleyici-ve-fiziksel",
            title: "Önleyici ve fiziksel yöntemler",
            paragraphs: [
              "Giriş noktalarının kapatılması, nem sorunlarının giderilmesi, atık ve depolama düzeninin iyileştirilmesi, sineklik ve kapı altı fitili gibi bariyerler, izleme tuzakları ve mekanik yakalama bu gruptadır. Bu önlemler çoğu zaman alan sahibi veya yönetimle birlikte uygulanır.",
              "Bu önlemlerin bir kısmı alan sahibinin, bir kısmı bina yönetiminin, bir kısmı ise teknik ustaların işidir. Planın içinde kimin neyi ne zamana kadar yapacağının belirtilmesi, önerilerin kâğıt üzerinde kalmamasını sağlar.",
            ],
          },
          {
            id: "hedefli-uygulama",
            title: "Hedefli kimyasal uygulama",
            paragraphs: [
              "Kimyasal uygulama gerektiğinde, zararlının bulunduğu noktalara yönelik, ruhsatlı biyosidal ürünlerle ve etiket talimatlarına uygun şekilde yapılır. Ürün ve yöntem seçiminde zararlının türü, alanın kullanımı, hassas gruplar ve direnç riski dikkate alınır. Bu kararlar yetkili uygulayıcının sorumluluğundadır.",
              "Aynı ürünün uzun süre ve sık aralıklarla kullanılması bazı zararlılarda direnç gelişimine katkıda bulunabilir. Bu nedenle uygulayıcı, gerektiğinde farklı yöntemleri dönüşümlü kullanarak ve önleyici önlemleri güçlendirerek kimyasal ihtiyacını azaltmayı hedefler.",
            ],
          },
        ],
      },
      {
        id: "takip-ve-kayit",
        title: "Takip ve kayıt",
        paragraphs: [
          "Plan, uygulama yapıldığında bitmez. Takip ziyaretlerinde izleme noktaları kontrol edilir, zararlı aktivitesinin azalıp azalmadığı değerlendirilir ve önerilen yapısal iyileştirmelerin yapılıp yapılmadığına bakılır. Sonuç beklenen düzeyde değilse yöntem gözden geçirilir.",
          "Takip ziyaretlerinin sıklığı zararlının türüne, sorunun yoğunluğuna ve alanın kullanımına göre belirlenir. Tahta kurusu gibi yaşam döngüsü nedeniyle tekrar değerlendirme gerektiren zararlılarda ziyaretler daha sık olabilir; işletmelerde ise belirli aralıklarla yapılan periyodik ziyaretler programın doğal parçasıdır.",
          "Her ziyaretin kaydedilmesi, özellikle işletmeler ve apartmanlar için büyük önem taşır. Kayıtlar; hangi tarihte, hangi alana, hangi yöntemle ve hangi ürünle uygulama yapıldığını, gözlenen bulguları ve verilen önerileri içermelidir. Bu sayede sorun tekrarladığında geçmiş veriler üzerinden daha isabetli karar verilebilir.",
        ],
        bullets: [
          "Uygulama tarihi ve uygulanan alanlar",
          "Tespit edilen zararlı türü ve yoğunluk gözlemi",
          "Kullanılan yöntem ve ürünlerin ruhsat bilgisi",
          "Alan sahibine verilen öneriler ve bir sonraki ziyaret tarihi",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel planlama gerekir?",
        paragraphs: [
          "Sorun birden fazla odaya veya kata yayılmışsa, kendi önlemlerinize rağmen birkaç hafta içinde azalmıyorsa, gıda üretilen ya da hassas grupların bulunduğu bir alandaysa veya tahta kurusu ve kemirgen gibi kontrolü uzmanlık isteyen bir zararlı söz konusuysa profesyonel planlama yerinde olur.",
          "Teklif alırken yalnızca uygulama tarihine değil, planın içeriğine bakın: inceleme yapılacak mı, tür nasıl tespit edilecek, hangi önleyici öneriler verilecek, takip ziyareti ve kayıt var mı? Bu soruların açık yanıtları, planlı bir hizmetle tek seferlik bir müdahale arasındaki farkı ortaya koyar.",
        ],
      },
    ],
    sources: [EPA_IPM_PRINCIPLES, UC_IPM_WHAT_IS_IPM],
    relatedServices: ["hasere-kontrolu", "entegre-zararli-yonetimi", "periyodik-pest-management"],
  },

  /* ------------------------------------------------------------------ */
  "apartmanlarda-ortak-alan-hasere-kontrolu": {
    slug: "apartmanlarda-ortak-alan-hasere-kontrolu",
    summary:
      "Apartmanlarda bodrum, çöp odası, tesisat şaftları ve ortak depolar birbirine bağlı olduğundan haşere kontrolü bu alanlar birlikte ele alınarak planlanmalıdır. Yalnızca tek bir dairede veya tek bir alanda yapılan uygulama, zararlıları geçici olarak başka bölümlere itebilir. Yönetim, görevli personel, sakinler ve uygulayıcının rollerinin net olduğu, takvimli ve kayıtlı bir program daha kalıcı sonuç verir.",
    keyTakeaways: [
      "Ortak alanlar, zararlıların daireler arasında geçiş yaptığı ana güzergâhtır.",
      "Bodrum, çöp odası ve şaftlar aynı programda değerlendirilmelidir.",
      "Sakinlerin bildirimi ve iş birliği, programın başarısını belirler.",
      "Takvimli ziyaretler ve kayıtlar, yönetimin süreci izlemesini kolaylaştırır.",
    ],
    sections: [
      {
        id: "neden-birlikte",
        title: "Ortak alanlar neden birlikte ele alınmalı?",
        paragraphs: [
          "Bir apartman, zararlılar açısından birbirinden bağımsız dairelerden değil, ortak tesisat ve boşluklarla bağlanmış tek bir yapıdan oluşur. Hamam böcekleri şaftlar boyunca yukarı çıkabilir, fareler bodrumdan çöp odasına ve oradan dairelere ulaşabilir. Bir dairede yapılan uygulama, kaynak ortak alanlarda olduğu sürece sorunu çözmekte yetersiz kalabilir.",
          "Ortak alan programı, bireysel daire uygulamalarının yerini almaz; onları tamamlar. Ortak alanlarda kaynak kontrol altına alındığında dairelerde yapılan uygulamalar daha kalıcı olur, sorun bildiren dairelerin sayısı azalır ve aynı zararlı için tekrar tekrar müdahale gereği ortadan kalkar.",
          "Bu bütüncül bakış, aynı zamanda maliyetleri de daha öngörülebilir kılar. Sorun ortaya çıktıkça tek tek dairelere yapılan müdahaleler yerine planlı bir takvimle yürütülen program, hem yönetimin bütçe planlamasını kolaylaştırır hem de sakinlerin şikâyetlerine daha hızlı yanıt verilmesini sağlar.",
          "ABD Çevre Koruma Ajansı'nın (EPA) çok daireli konut yöneticilerine yönelik rehberi de etkili bir programın; barınma alanlarını, besin ve su kaynaklarını ortadan kaldırmaya ve zararlıların binaya girişini engellemeye odaklanması gerektiğini vurgular.",
        ],
      },
      {
        id: "kritik-alanlar",
        title: "Kritik ortak alanlar",
        paragraphs: [
          "Her binanın yapısı farklıdır; ancak İstanbul'daki apartman ve sitelerde sorunların büyük kısmı belirli alanlarda yoğunlaşır. Bu alanların düzenli denetimi, programın temelini oluşturur.",
          "Bu alanlara ek olarak asansör kuyusu dibi, kazan dairesi, otopark ve bahçe duvarları da programın kapsamına alınabilir. Özellikle eski binalarda kullanılmayan kömürlükler ve depolar, uzun süre fark edilmeden zararlı barındırabilir.",
        ],
        subsections: [
          {
            id: "bodrum-ve-depolar",
            title: "Bodrum, sığınak ve depolar",
            paragraphs: [
              "Nemli, karanlık ve seyrek kullanılan bodrumlar hem hamam böcekleri hem de kemirgenler için uygun ortamlardır. Uzun süredir açılmayan depolar, eski mobilya ve karton yığınları saklanma alanını büyütür. Bodrum zemin süzgeçleri ve rögar kapakları da kanalizasyondan gelen türler için giriş noktası olabilir.",
            ],
          },
          {
            id: "cop-odasi",
            title: "Çöp odası ve konteyner alanı",
            paragraphs: [
              "Çöp odaları besin kaynağının en yoğun olduğu yerdir. Kapakları kapanmayan konteynerler, yere dökülen sıvılar ve düzensiz toplama saatleri zararlıları çeker. EPA, çöp konteynerlerinin binadan uzak tutulmasını, yeterli sayıda kapaklı kap bulunmasını ve geri dönüşüm malzemelerinin durulanarak biriktirilmesini önerir.",
            ],
          },
          {
            id: "saftlar-ve-tesisat",
            title: "Şaftlar ve tesisat geçişleri",
            paragraphs: [
              "Su, doğalgaz ve elektrik hatlarının geçtiği şaftlar, daireler arası geçişin ana yoludur. Boru çevresindeki boşlukların kapatılması, sızıntıların onarılması ve şaft kapaklarının sağlam olması önemlidir. EPA rehberi de havalandırma, kablo ve boru çevresindeki açıklıkların kapatılmasını öneriler arasında sayar.",
            ],
          },
        ],
      },
      {
        id: "ekip-ve-roller",
        title: "Kim, neyden sorumlu?",
        paragraphs: [
          "EPA, çok daireli binalarda başarılı bir zararlı yönetiminin yönetim, bakım ve temizlik personeli, sakinler ve profesyonel uygulayıcıdan oluşan bir ekip çalışması gerektirdiğini belirtir. Rollerin baştan netleştirilmesi, sorumluluğun belirsiz kalmasını önler.",
        ],
        subsections: [
          {
            id: "yonetim-rolu",
            title: "Yönetim ve görevli personel",
            paragraphs: [
              "Yönetim programın genel sorumluluğunu üstlenir, uygulayıcıyla iletişimi yürütür ve kayıtları saklar. Kapıcı veya görevli personel, ortak alanların temizliğini, çöp düzenini ve zararlı belirtilerinin bildirilmesini takip eder. Tesisat arızalarının ve giriş noktalarının onarımı da bu grubun işidir.",
              "Görevli personelin kısa bir bilgilendirmeyle dışkı, kemirme izi ve böcek kabuğu gibi işaretleri tanıyabilmesi, sorunların erken fark edilmesini sağlar. EPA rehberi de bakım ve teknik personelin izleme sürecine katılmasının önemine dikkat çeker.",
            ],
          },
          {
            id: "sakinler-ve-uygulayici",
            title: "Sakinler ve uygulayıcı",
            paragraphs: [
              "Sakinler kendi dairelerinde gördükleri zararlıları, sızıntıları ve nem sorunlarını zamanında bildirir, hazırlık talimatlarına uyar. Uygulayıcı ise inceleme, tür tespiti, hedefli uygulama ve raporlamadan sorumludur. EPA rehberi, sakinlerin iş birliğinin programın başarısı için temel olduğunu özellikle vurgular.",
            ],
          },
        ],
      },
      {
        id: "planlama-ve-takvim",
        title: "Program nasıl planlanır?",
        paragraphs: [
          "Ortak alan programı, binanın büyüklüğüne, yaşına ve geçmiş sorunlarına göre şekillenir. İlk adım tüm ortak alanların ve mümkünse sorun bildiren dairelerin incelenmesidir. Bulgulara göre izleme noktaları belirlenir, öncelikli alanlar sıralanır ve ziyaret sıklığı kararlaştırılır.",
          "Programın kapsamı yönetim planına veya kat malikleri kurulu kararına bağlanabilir. Hangi alanların düzenli olarak inceleneceği, dairelerden gelen şikâyetlerin nasıl ele alınacağı ve maliyetin nasıl paylaşılacağı baştan netleştirilirse, sorun çıktığında hızlı karar vermek kolaylaşır.",
          "Ziyaret takviminin mevsimsel değişimleri dikkate alması önemlidir. Sıcak aylarda böcek aktivitesi, soğuk aylarda ise kemirgenlerin binaya yönelmesi artabilir. Program, belirli aralıklarla sonuçlara göre güncellenmelidir.",
        ],
        bullets: [
          "Tüm ortak alanların ilk incelemesi ve risk haritası",
          "İzleme noktalarının belirlenmesi ve numaralandırılması",
          "Yapısal iyileştirme önerilerinin yönetime yazılı iletilmesi",
          "Mevsime göre güncellenen ziyaret takvimi",
        ],
      },
      {
        id: "sakinlerle-iletisim",
        title: "Sakinlerle iletişim",
        paragraphs: [
          "Uygulama tarihleri, hangi alanlarda çalışılacağı ve sakinlerden beklenen hazırlıklar en az birkaç gün önceden duyurulmalıdır. Asansör panosu, site uygulaması veya mesaj grupları bu duyurular için kullanılabilir. Evcil hayvan sahiplerinin ve küçük çocuğu olan ailelerin ortak alan uygulamalarından haberdar olması özellikle önemlidir.",
          "Sakinlere yönelik kısa bilgilendirmeler de programın parçası olabilir. Çöpün ağzı kapalı poşetlerle ve belirlenen saatlerde çıkarılması, balkon ve depolarda karton biriktirilmemesi, daire içi sızıntıların gecikmeden bildirilmesi gibi basit kurallar, ortak alanlardaki zararlı baskısını belirgin biçimde azaltabilir.",
          "Sakinlerin zararlı gördüklerinde kime, nasıl bildirimde bulunacağı da açıkça belirtilmelidir. Bildirimlerin tarih ve daire bilgisiyle kaydedilmesi, sorunun binanın hangi bölümünde yoğunlaştığını gösterir ve uygulayıcının çalışmasını yönlendirir.",
        ],
      },
      {
        id: "kayit-ve-raporlama",
        title: "Kayıt ve raporlama",
        paragraphs: [
          "Her ziyaret sonunda uygulayıcıdan, incelenen alanları, tespit edilen bulguları, yapılan uygulamaları ve kullanılan ürünlerin ruhsat bilgisini içeren bir rapor istenmelidir. Yönetim bu raporları düzenli olarak saklayarak hem sakinlere bilgi verebilir hem de programın etkinliğini izleyebilir.",
          "Raporlarda tekrarlayan yapısal sorunlar, örneğin kapanmayan bir şaft kapağı veya sürekli nemli bir bodrum köşesi, öncelikli bakım işi olarak ele alınmalıdır. Bu tür sorunlar giderilmeden yapılan uygulamalar, aynı bulguların bir sonraki ziyarette tekrar görülmesine yol açar.",
          "Raporların yıllık olarak gözden geçirilmesi, programın maliyet ve etkinlik açısından değerlendirilmesini sağlar. Hangi alanlarda sorunun azaldığı, hangilerinde sürdüğü ve hangi yapısal iyileştirmelerin bekletildiği bu değerlendirmede açıkça görülür; bir sonraki dönemin planı bu verilere göre yapılabilir.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Birden fazla daireden şikâyet geliyorsa, bodrum veya çöp odasında kemirgen izi görülüyorsa ya da bir dairede yapılan uygulamadan sonra komşu dairelerde zararlı artışı fark ediliyorsa bina ölçeğinde bir programa ihtiyaç vardır. Bu aşamada ortak alanları kapsayan bir inceleme, sorunun kaynağını görmek için doğru başlangıçtır.",
          "Program başladıktan sonra ilk birkaç ziyaretin sonuçlarını sakinlerle paylaşmak, iş birliğini artırır. Hangi alanlarda ilerleme sağlandığı ve hangi önerilerin hâlâ beklediği bilindiğinde, sakinlerin de kendi dairelerinde üzerine düşeni yapma olasılığı yükselir.",
          "Uygulayıcı seçerken ortak alanlar için takvim, kayıt ve raporlama sunup sunmadığına, yönetimle düzenli iletişim kurup kurmadığına ve yapısal öneriler verip vermediğine bakın. Sakinlerin sağlık şikâyetleri olursa hekime başvurmaları gerektiğini de duyurularınızda hatırlatabilirsiniz.",
        ],
      },
    ],
    sources: [
      {
        title: "Pest Control: Resources for Housing Managers",
        publisher: "U.S. Environmental Protection Agency (EPA)",
        url: "https://www.epa.gov/safepestcontrol/pest-control-resources-housing-managers",
      },
      UC_IPM_COCKROACHES,
      CDC_SEAL_UP,
    ],
    relatedServices: [
      "apartman-ve-bina-ilaclama",
      "site-ilaclama",
      "bodrum-ve-ortak-alan-kontrolu",
      "fare-ve-kemirgen-kontrolu",
    ],
  },

  /* ------------------------------------------------------------------ */
  "restoranlarda-entegre-zararli-yonetimi": {
    slug: "restoranlarda-entegre-zararli-yonetimi",
    summary:
      "Restoranlarda entegre zararlı yönetimi (IPM); mal kabulden depolamaya kadar önleme, izleme noktalarıyla düzenli takip, yalnızca gerektiğinde hedefli uygulama ve tüm bu adımların kayıt altına alınmasını birleştiren sürekli bir programdır. Amaç zararlıların gıdaya ve hazırlık alanlarına ulaşmasını önlemek ve denetimlerde gösterilebilir bir sistem kurmaktır. Program, işletme personeli ile yetkili uygulayıcının birlikte yürüttüğü bir süreçtir.",
    keyTakeaways: [
      "IPM, tek seferlik ilaçlama yerine önleme, izleme ve kaydı birleştirir.",
      "Mal kabul, depolama ve temizlik rutini, zararlı riskinin büyük kısmını belirler.",
      "Personelin zararlı belirtilerini tanıması ve bildirmesi erken müdahale sağlar.",
      "Düzenli kayıt, hem sorunu izlemeyi hem de denetimlere hazırlığı kolaylaştırır.",
    ],
    sections: [
      {
        id: "ipm-nedir",
        title: "Entegre zararlı yönetimi nedir?",
        paragraphs: [
          "Entegre zararlı yönetimi, zararlı sorunlarını insan sağlığına ve çevreye olan riski sınırlayarak çözmeyi amaçlayan bir yaklaşımdır. Kaliforniya Üniversitesi IPM programı bu yaklaşımı uzun vadeli önlemeye odaklanan, kimyasalları izleme sonuçlarına göre ve hedefe yönelik kullanan bir strateji olarak tanımlar.",
          "Bu yaklaşımda zararlı kontrolü yalnızca uygulayıcının işi değildir. Mutfak şefi, depo sorumlusu, temizlik ekibi ve işletme yöneticisi programın doğal paydaşlarıdır. Uygulayıcı teknik bilgi ve hedefli müdahaleyi sağlarken, günlük önleme ve gözlem büyük ölçüde işletme ekibinin elindedir.",
          "ABD Çevre Koruma Ajansı'na (EPA) göre IPM; müdahale eşiğinin belirlenmesi, zararlının izlenmesi ve tanımlanması, önleme ve gerektiğinde kontrol adımlarından oluşur. Restoranlarda bu adımlar mutfağın günlük işleyişine yerleştirildiğinde, zararlı kontrolü periyodik bir ziyaret olmaktan çıkıp işletmenin hijyen sisteminin bir parçası hâline gelir.",
        ],
      },
      {
        id: "neden-kritik",
        title: "Gıda işletmelerinde neden kritik?",
        paragraphs: [
          "Dünya Sağlık Örgütü (WHO), güvenli olmayan gıdanın her yıl dünya genelinde çok sayıda kişinin hastalanmasına yol açtığını ve gıda güvenliğinin üreticiden tüketiciye kadar ortak bir sorumluluk olduğunu vurgular. Hamam böcekleri, kemirgenler ve sinekler gibi zararlılar, gıdaya ve yüzeylere temas ederek bulaşma riskini artırabilen etkenler arasında yer alır.",
          "Restoranlarda zararlı varlığı yalnızca sağlık riski değil; müşteri güveni, itibar ve resmî denetimler açısından da ciddi sonuçlar doğurabilir. Bu nedenle sorunun ortaya çıkmasını beklemek yerine önleyici bir program yürütmek daha akılcıdır.",
          "Zararlılar yalnızca mutfakta değil, işletmenin tüm alanlarında sorun yaratabilir. Depo, personel soyunma odası, çöp alanı, bodrum ve teras gibi bölümler programın kapsamına alınmadığında, mutfakta yapılan kontrol bu alanlardan gelen yeni zararlılarla zayıflayabilir. Bu nedenle program işletmenin tamamını görecek şekilde kurulmalıdır.",
          "Paket servis ve teslimat yoğunluğunun yüksek olduğu işletmelerde arka kapıların sık açılması ve kolilerin sürekli giriş çıkışı, zararlıların içeri girişi için ek fırsatlar yaratır. Bu tür işletmelerde teslimat alanının düzeni ve kapıların kontrolü programın önemli bir parçası olmalıdır.",
        ],
      },
      {
        id: "onleme",
        title: "Önleme: zararlıya fırsat vermemek",
        paragraphs: [
          "IPM'in en güçlü halkası önlemedir. Zararlıların besin, su ve barınak bulamadığı bir mutfakta kontrol çok daha kolaydır. Önleme adımları büyük ölçüde işletme personelinin günlük rutinine dayanır.",
        ],
        subsections: [
          {
            id: "mal-kabul",
            title: "Mal kabul ve depolama",
            paragraphs: [
              "Gelen ürünlerin ambalajları hasar, kemirme izi ve canlı böcek açısından kontrol edilmelidir. Karton koliler mümkün olduğunca depoya alınmadan boşaltılmalı, ürünler kapaklı kaplara aktarılmalıdır. Depoda rafların zeminden ve duvardan biraz uzakta durması, temizliği ve kontrolü kolaylaştırır; ilk giren ilk çıkar düzeni ürünlerin uzun süre beklemesini önler.",
            ],
          },
          {
            id: "temizlik-rutini",
            title: "Temizlik rutini",
            paragraphs: [
              "Ocak arkaları, fritöz çevresi, bulaşık alanı ve zemin süzgeçleri yağ ve gıda artıklarının biriktiği noktalardır. Gün sonu temizliğinin bu alanları kapsaması, gece boyunca zararlılar için besin kalmamasını sağlar. Çöp kaplarının kapaklı olması ve gün içinde düzenli boşaltılması da önemlidir.",
            ],
          },
          {
            id: "yapisal-onlemler",
            title: "Yapısal önlemler",
            paragraphs: [
              "Kapı altı fitilleri, kendiliğinden kapanan kapılar, sağlam sineklikler ve boru geçişlerindeki boşlukların kapatılması zararlıların girişini zorlaştırır. Sızan musluklar ve yoğuşma yapan soğutma ekipmanları onarılmalı, kullanılmayan ekipman ve eşyalar alandan çıkarılmalıdır.",
              "Tadilat ve ekipman değişiklikleri sırasında yeni boşluklar oluşabileceğini unutmamak gerekir. Bu dönemlerde uygulayıcının alanı yeniden incelemesi ve izleme noktalarının güncellenmesi, gözden kaçan giriş noktalarının erken fark edilmesini sağlar.",
            ],
          },
        ],
      },
      {
        id: "izleme",
        title: "İzleme: sorunu büyümeden görmek",
        paragraphs: [
          "İzleme, zararlı varlığının erken tespit edilmesini ve müdahale gerekip gerekmediğine veriyle karar verilmesini sağlar. Hem fiziksel izleme noktaları hem de personelin gözlemleri bu sürecin parçasıdır.",
        ],
        subsections: [
          {
            id: "izleme-noktalari",
            title: "İzleme noktaları",
            paragraphs: [
              "Mutfak, depo, bulaşık alanı ve giriş kapıları çevresinde numaralandırılmış izleme tuzakları ve istasyonları kullanılır. Her ziyarette bu noktalar kontrol edilir ve bulgular kaydedilir. Bir noktada aktivitenin artması, o alana odaklanılması gerektiğini gösterir.",
              "İzleme noktalarının yeri ve numarası, işletmenin krokisinde işaretlenmelidir. Böylece hem uygulayıcı hem de işletme ekibi hangi noktada ne bulunduğunu takip edebilir ve denetimlerde sistem kolayca gösterilebilir.",
            ],
          },
          {
            id: "personel-bildirimi",
            title: "Personelin rolü",
            paragraphs: [
              "Mutfak personeli, zararlıyı en sık görecek kişilerdir. Dışkı, kemirme izi, canlı veya ölü böcek gördüklerinde bunu tarih, saat ve yer bilgisiyle bir deftere ya da dijital forma işlemeleri, uygulayıcının çalışmasını yönlendirir. Kısa bir eğitimle personelin hangi işaretlere dikkat etmesi gerektiğini öğrenmesi programın etkinliğini artırır.",
            ],
          },
        ],
      },
      {
        id: "mudahale",
        title: "Müdahale: gerektiğinde ve hedefli",
        paragraphs: [
          "İzleme sonuçları müdahale gerektirdiğinde, EPA'nın önerdiği gibi önce etkili ve düşük riskli seçenekler değerlendirilir. Gıda hazırlık alanlarında yapılacak her uygulamanın, ruhsatlı biyosidal ürünlerle, etiket talimatlarına uygun olarak ve yetkili uygulayıcı tarafından yapılması gerekir.",
          "Bir müdahaleden sonra, sorunun neden ortaya çıktığı da sorgulanmalıdır. Bozuk bir kapı fitili, düzenli temizlenmeyen bir ekipman altı veya mal kabulde atlanan bir kontrol, aynı sorunun tekrar etmesine yol açar. Bu nedenle her müdahale, ilgili önleyici önlemin güncellenmesiyle birlikte ele alınmalıdır.",
          "Uygulamaların servis saatleri dışında planlanması, gıdaların ve ekipmanların korunması ve uygulama sonrası hangi yüzeylerin ne zaman temizlenebileceğinin net olarak bildirilmesi önemlidir. Müdahale, her zaman önleme ve izleme adımlarıyla birlikte ele alınmalıdır.",
        ],
      },
      {
        id: "kayit-ve-denetim",
        title: "Kayıt ve denetime hazırlık",
        paragraphs: [
          "Kayıt, IPM programının hafızasıdır. Düzenli tutulan kayıtlar hem zararlı aktivitesindeki değişimi gösterir hem de resmî denetimlerde ve gıda güvenliği sistemlerinde işletmenin programı nasıl yürüttüğünü belgeler. Gıda güvenliği yönetim sistemleri uygulayan işletmelerde bu kayıtlar genellikle istenen belgeler arasındadır.",
          "Kayıtların sadece dosyada durması yeterli değildir; düzenli aralıklarla işletme yönetimi ve uygulayıcıyla birlikte gözden geçirilmesi gerekir. Hangi noktada aktivite arttı, hangi öneri yerine getirilmedi, hangi mevsimde sorun yoğunlaştı gibi sorular, programın bir sonraki dönem için nasıl güncelleneceğini belirler.",
        ],
        bullets: [
          "İzleme noktalarının yerini gösteren güncel kroki",
          "Her ziyaretin tarihi, bulguları ve yapılan işlemler",
          "Kullanılan ürünlerin ruhsat bilgisi ve uygulama belgeleri",
          "Uygulayıcı firmanın izin ve yetki belgelerinin kopyaları",
          "Verilen öneriler ve bunların ne zaman yerine getirildiği",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Yeni açılan bir işletmede, el değiştiren bir mekânda, tadilat sonrasında veya personel bildirimlerinde zararlı aktivitesi arttığında profesyonel bir inceleme ile programın kurulması ya da güncellenmesi yerinde olur. Kemirgen izi veya mutfakta üreyen böcek popülasyonu tespit edildiğinde gecikmeden harekete geçmek gerekir.",
          "Personel değişiminin sık olduğu işletmelerde, yeni çalışanlara zararlı belirtileri ve bildirim süreci hakkında kısa bir bilgilendirme yapılması programın sürekliliğini korur. Uygulayıcının bu konuda yazılı bir özet veya kısa bir eğitim sunması, mutfak ekibinin sürece aktif olarak katılmasını sağlar.",
          "Uygulayıcı seçerken yalnızca ziyaret sıklığına değil; inceleme, izleme noktası planı, raporlama, öneri takibi ve personel bilgilendirmesi sunup sunmadığına bakın. Programın işletmenin gıda güvenliği sistemiyle uyumlu olması, denetimlerde işinizi kolaylaştırır.",
        ],
      },
    ],
    sources: [
      UC_IPM_WHAT_IS_IPM,
      EPA_IPM_PRINCIPLES,
      {
        title: "Food safety",
        publisher: "World Health Organization (WHO)",
        url: "https://www.who.int/news-room/fact-sheets/detail/food-safety",
      },
    ],
    relatedServices: [
      "restoran-ve-kafe-pest-kontrol",
      "entegre-zararli-yonetimi",
      "periyodik-pest-management",
      "depo-ilaclama",
    ],
  },

  /* ------------------------------------------------------------------ */
  "yaz-aylarinda-sivrisinek-sorununu-azaltma": {
    slug: "yaz-aylarinda-sivrisinek-sorununu-azaltma",
    summary:
      "Yaz aylarında sivrisinek sorununu azaltmanın temeli, sivrisineklerin yumurta bıraktığı durgun suları haftalık olarak boşaltmak, kapatmak veya ortadan kaldırmaktır. Kapı ve pencerelerde sağlam sineklik kullanmak ve açık alanda kişisel korunma önlemleri almak ısırık riskini düşürür. Geniş açık alanlarda ise kaynak azaltma, larva kontrolü ve izlemeyi birleştiren planlı uygulamalar yetkili ekiplerce yürütülür.",
    keyTakeaways: [
      "Su biriktiren her kap, birkaç gün içinde sivrisinek üreme alanına dönüşebilir.",
      "Durgun su kontrolü haftalık bir rutin olarak yapılmalıdır.",
      "Sineklik ve uygun kıyafet, ev içinde ve dışında temel korunma araçlarıdır.",
      "Açık alan uygulamaları, kaynak azaltmayla birlikte planlandığında anlam taşır.",
    ],
    sections: [
      {
        id: "neden-yazin",
        title: "Sivrisinekler neden yazın artar?",
        paragraphs: [
          "Sivrisinekler yaşam döngülerinin ilk evrelerini suda geçirir. Sıcaklık arttıkça yumurtadan yetişkine geçiş süresi kısalır ve kısa sürede çok sayıda yeni birey ortaya çıkar. Yaz aylarında sulama, klima suları ve balkonlarda biriken yağmur suları da üreme alanlarını çoğaltır.",
          "İstanbul gibi büyük şehirlerde sivrisinek sorunu çoğu zaman tek bir evden değil, mahalle ölçeğindeki kaynaklardan beslenir. Rögarlar, bakımsız havuzlar, inşaat alanları ve su biriken boş arsalar geniş bir çevreye sivrisinek sağlayabilir. Bu nedenle bireysel önlemler, ortak alan ve belediye düzeyindeki çalışmalarla birlikte düşünülmelidir.",
          "ABD Hastalık Kontrol ve Önleme Merkezleri'ne (CDC) göre yalnızca dişi sivrisinekler kan emer; bunun nedeni yumurta üretimi için kana ihtiyaç duymalarıdır. Sivrisinekler hem gündüz hem gece ısırabilir ve iç mekânda da yaşayabilir. Bu nedenle önlemler hem ev içini hem de çevreyi kapsamalıdır.",
        ],
      },
      {
        id: "durgun-su",
        title: "Durgun su kaynaklarını yönetmek",
        paragraphs: [
          "CDC, sivrisineklerin suyun içine veya kenarına yumurta bıraktığını hatırlatarak su biriktiren eşyaların haftada bir boşaltılmasını, fırçalanmasını, ters çevrilmesini, kapatılmasını ya da atılmasını önerir. Bu basit rutin, kişisel ölçekte yapılabilecek en etkili önlemdir.",
          "Rutin aynı zamanda ev içini de kapsamalıdır. Vazolardaki su, bitki sulama kapları ve klima tahliye suyu toplanan kaplar da iç mekânda üreme alanı oluşturabilir. CDC, ev içindeki su tutan kapların da kontrol edilmesini önerir.",
        ],
        subsections: [
          {
            id: "balkon-ve-bahce",
            title: "Balkon, teras ve bahçe",
            paragraphs: [
              "Saksı altlıkları, kovalar, kullanılmayan çiçeklikler, çocuk oyuncakları, kuş banyoları, eski lastikler ve tıkalı yağmur olukları en sık rastlanan üreme alanlarıdır. Kullanılmayan kapları ters çevirin, kuş banyosu ve evcil hayvan su kaplarının suyunu birkaç günde bir değiştirin, olukları düzenli temizleyin.",
            ],
          },
          {
            id: "ortak-alanlar",
            title: "Site ve apartman ortak alanları",
            paragraphs: [
              "Süs havuzları, kullanılmayan fıskiyeler, rögar ve yağmur suyu ızgaraları, çatı terasları ve inşaat alanlarında biriken sular geniş ölçekli üreme alanları oluşturabilir. Bu alanların takibi site veya apartman yönetiminin sorumluluğundadır ve tek bir dairenin aldığı önlemler bu kaynakları ortadan kaldırmaz.",
              "Yönetimler için en pratik yöntem, ortak alanlardaki su toplanma noktalarını listeleyip haftalık bir kontrol çizelgesine bağlamaktır. Su tahliyesi mümkün olmayan alanlar için uzman görüşü alınarak larva evresine yönelik hedefli seçenekler değerlendirilebilir.",
            ],
          },
        ],
      },
      {
        id: "fiziksel-bariyerler",
        title: "Fiziksel bariyerler",
        paragraphs: [
          "Kapı ve pencerelerdeki sineklikler, sivrisineklerin ev içine girmesini engellemenin en pratik yoludur. CDC, sinekliklerin kullanılmasını ve yırtık ya da delik olanların onarılmasını önerir. Sürgülü kapıların kenarlarında ve klima borusu geçişlerinde kalan boşluklar da gözden kaçmamalıdır.",
          "Sinekliklerin sezon başında kontrol edilmesi, yırtık ve gevşek kenarların onarılması ve balkon kapılarının gün batımından sonra açık bırakılmaması, iç mekâna giren sivrisinek sayısını belirgin biçimde azaltabilir.",
          "Bebek ve küçük çocukların uyuduğu yerlerde, ayrıca puset ve ana kucağı üzerinde cibinlik kullanmak ek bir koruma sağlar. Dünya Sağlık Örgütü (WHO) de kapı ve pencere sineklikleri ile cibinlik gibi önlemlerin insan ile sivrisinek arasındaki teması azaltabileceğini belirtir.",
        ],
      },
      {
        id: "kisisel-korunma",
        title: "Kişisel korunma önlemleri",
        paragraphs: [
          "Akşam saatlerinde bahçede, sahilde veya parkta vakit geçirirken alınacak kişisel önlemler, ısırık sayısını belirgin biçimde azaltabilir.",
          "Gün batımı ve sonrasındaki saatler, birçok sivrisinek türünün en aktif olduğu dönemdir; ancak CDC bazı türlerin gündüz de ısırabildiğini hatırlatır. Bu nedenle korunma önlemlerini yalnızca geceyle sınırlamamak, özellikle gölgelik ve nemli alanlarda gün içinde de dikkatli olmak gerekir.",
          "Klima kullanılan odalarda pencerelerin kapalı tutulması, sivrisineklerin iç mekâna girişini sınırlar. Gece pencereler açık uyunuyorsa sinekliğin sağlam olduğundan emin olmak ve ışık kaynaklarını pencereden uzak tutmak da yardımcı olabilir.",
        ],
        subsections: [
          {
            id: "kovucular",
            title: "Sivrisinek kovucular",
            paragraphs: [
              "Cilde uygulanan kovucu ürünlerde ruhsatlı olanların tercih edilmesi ve etiket talimatlarına uyulması gerekir. CDC, ruhsat numarası taşıyan ürünlerin kullanılmasını, bazı içeriklerin küçük çocuklarda kullanılmamasını ve etkinliği bilinmeyen ürünlere karşı dikkatli olunmasını önerir. Bebek ve çocuklar için uygun ürün seçiminde hekime veya eczacıya danışılabilir.",
            ],
          },
          {
            id: "giysi",
            title: "Giysi seçimi",
            paragraphs: [
              "Bol kesimli, uzun kollu gömlekler ve uzun pantolonlar, özellikle akşam saatlerinde açıkta kalan cilt alanını azaltır. Çocukların kol ve bacaklarını örten kıyafetler giymesi de CDC'nin önerileri arasındadır.",
            ],
          },
        ],
      },
      {
        id: "acik-alan-uygulamalari",
        title: "Açık alan uygulamalarının rolü",
        paragraphs: [
          "Site bahçeleri, oteller, kamp alanları ve geniş yeşil alanlarda sivrisinek sorunu tek tek önlemlerle yönetilemeyecek kadar büyük olabilir. ABD Çevre Koruma Ajansı'nın (EPA) CDC ile birlikte hazırladığı entegre sivrisinek kontrolü rehberi; üreme alanlarının ortadan kaldırılmasını, fiziksel bariyerleri, larva evresine yönelik uygulamaları ve gerektiğinde yetişkin sivrisineklere yönelik uygulamaları birlikte ele alır.",
          "Aynı rehber, sürveyansın yani sivrisinek yoğunluğunun ve türlerinin izlenmesinin uygulamalara yön vermesi gerektiğini ve ürün seçiminin direnç ile çevresel risk gibi etkenler gözetilerek uzmanlarca yapılmasını vurgular. Açık alan uygulamalarının yetkili uygulayıcılar tarafından, ruhsatlı ürünlerle ve arı, balık gibi hedef dışı canlılar gözetilerek planlanması gerekir. Kaynak azaltma yapılmadan tekrarlanan uygulamalar kalıcı sonuç vermez.",
        ],
      },
      {
        id: "saglik-boyutu",
        title: "Sağlık açısından neden önemli?",
        paragraphs: [
          "Sivrisinek ısırıkları çoğu zaman kaşıntı ve şişlikle sınırlı kalır. Ancak WHO, sivrisineklerin dünya genelinde sıtma, dang humması ve Batı Nil ateşi gibi bazı hastalıkların taşınmasında rol oynayabildiğini belirtir. CDC de az sayıda enfekte sivrisineğin bile bir toplulukta salgın başlatabileceğini ifade eder.",
          "Isırık bölgesini kaşımamak ve temiz tutmak, ciltte enfeksiyon gelişmesini önlemeye yardımcı olur. Çocuklarda, yaşlılarda ve bağışıklığı zayıf kişilerde ısırık sonrasında belirgin şişlik, yayılan kızarıklık veya genel durum bozukluğu fark edilirse vakit kaybetmeden sağlık kuruluşuna başvurulmalıdır.",
          "Bu hastalıkların görülme riski bölgeye ve mevsime göre değişir. Seyahat öncesinde gidilecek bölgeye ilişkin sağlık önerilerini kontrol etmek ve ısırık sonrasında ateş, baş ağrısı, eklem ağrısı veya döküntü gibi şikâyetler ortaya çıkarsa hekime başvurmak önemlidir.",
          "Bu bilgiler panik yaratmak için değil, korunma önlemlerinin neden önemli olduğunu anlatmak içindir. Durgun suların yönetimi, sineklik ve kişisel korunma gibi basit adımlar hem rahatsızlığı hem de ısırığa bağlı olası riskleri azaltmaya yardımcı olur.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Ne zaman profesyonel destek alınmalı?",
        paragraphs: [
          "Durgun su kontrolüne ve sinekliklere rağmen sivrisinek yoğunluğu azalmıyorsa, kaynak bina dışında ortak bir alanda ya da erişilmesi zor bir noktadaysa veya site, otel ve işletme gibi geniş açık alanlar söz konusuysa profesyonel destek yerinde olur. Bu noktada amaç, önce üreme alanlarını tespit etmek ve kaynak azaltma önerileri geliştirmektir.",
          "Açık alan uygulaması planlanıyorsa, uygulama saatinin, alanı kullanan kişilerin ve evcil hayvanların bilgilendirilmesinin ve arı kovanı, balık havuzu gibi hassas noktaların korunmasının önceden konuşulması gerekir.",
          "Uygulayıcıdan alanın incelenmesini, üreme noktalarının raporlanmasını, gerekiyorsa larva evresine yönelik hedefli uygulamaların planlanmasını ve sezon boyunca takip yapılmasını bekleyin. Kamusal alanlardaki ve dere, kanal gibi kaynaklardaki sorunlar için belediyenin ilgili birimlerine bildirimde bulunmak da etkili bir adımdır.",
        ],
      },
    ],
    sources: [
      {
        title: "Preventing Mosquito Bites",
        publisher: "Centers for Disease Control and Prevention (CDC)",
        url: "https://www.cdc.gov/mosquitoes/prevention/index.html",
      },
      {
        title: "Vector-borne diseases",
        publisher: "World Health Organization (WHO)",
        url: "https://www.who.int/news-room/fact-sheets/detail/vector-borne-diseases",
      },
      {
        title: "Success in Mosquito Control: An Integrated Approach",
        publisher: "U.S. Environmental Protection Agency (EPA)",
        url: "https://www.epa.gov/mosquitocontrol/success-mosquito-control-integrated-approach",
      },
    ],
    relatedServices: [
      "sivrisinek-kontrolu",
      "bahce-ve-acik-alan-kontrolu",
      "site-ilaclama",
      "otel-ilaclama",
    ],
  },

  /* ------------------------------------------------------------------ */
  "ilaclama-hizmeti-secerken-hangi-belgelere-bakilmali": {
    slug: "ilaclama-hizmeti-secerken-hangi-belgelere-bakilmali",
    summary:
      "Türkiye'de halk sağlığı alanında biyosidal ürün uygulamaları Sağlık Bakanlığı mevzuatına tabidir. İlaçlama hizmeti seçerken genellikle firmanın Biyosidal Ürün Uygulama İzni, mesul müdür (sorumlu yönetici) bilgisi, uygulayıcıların yetki belgeleri, kullanılacak ürünlerin ruhsat bilgisi ve uygulama sonrasında düzenlenen işlem formu sorulabilir. Belgelerin güncel durumu ve gereklilikler için Bakanlığın ve resmî mevzuat sitesinin güncel metinlerine bakılması önerilir.",
    keyTakeaways: [
      "Uygulama yapan işyerlerinin il sağlık müdürlüğünden alınmış bir izin belgesi bulunması beklenir.",
      "Firmada sorumluluğu üstlenen bir mesul müdür ve yetki belgeli uygulayıcılar olmalıdır.",
      "Kullanılacak ürünlerin ruhsatlı biyosidal ürün olup olmadığı sorulabilir.",
      "Uygulama sonrasında yapılan işi gösteren bir form veya kayıt istenebilir.",
    ],
    sections: [
      {
        id: "mevzuat-cercevesi",
        title: "Türkiye'de ilaçlama hizmetleri hangi mevzuata tabi?",
        paragraphs: [
          "Ev, işyeri ve ortak alanlarda haşere kontrolü amacıyla kullanılan ürünler biyosidal ürün olarak sınıflandırılır. Türkiye'de bu ürünlerin piyasaya arzı ve ruhsatlandırılması Biyosidal Ürünler Yönetmeliği, halk sağlığı alanında bu ürünlerle uygulama yapan işyerlerinin çalışma usulleri ise Sağlık Bakanlığı tarafından yayımlanan Biyosidal Ürünlerin Kullanım Usul ve Esasları Hakkında Yönetmelik çerçevesinde düzenlenir.",
          "Bu düzenlemelerin amacı, halk sağlığı açısından risk taşıyabilecek ürünlerin yalnızca ruhsatlı olarak piyasaya çıkması ve yetkili, eğitimli kişilerce, kayıt altında kullanılmasıdır. Hizmet alan kişi için bu çerçeve, kimin sorumlu olduğunu ve hangi bilgilere ulaşabileceğini bilmek anlamına gelir.",
          "Mevzuat zaman içinde değişiklikler geçirebildiği için bu yazıdaki bilgiler genel bir çerçeve sunar. Belge türleri, adları ve koşulları hakkında en doğru bilgi için resmî mevzuat sitesindeki güncel yönetmelik metnine ve Sağlık Bakanlığı Halk Sağlığı Genel Müdürlüğü'nün duyurularına bakılması önerilir.",
        ],
      },
      {
        id: "uygulama-izni",
        title: "Biyosidal Ürün Uygulama İzni",
        paragraphs: [
          "Yönetmeliğe göre halk sağlığı alanında biyosidal ürünle uygulama yapacak işyerleri, il sağlık müdürlüğüne başvurarak gerekli şartları sağladıklarında bir uygulama izin belgesi alır. Yönetmelik metninde bu belge Biyosidal Ürün Uygulama İzin/Bildirim Belgesi olarak geçer ve işyerinin uygulama yapma yetkisini gösterir.",
          "İzin belgesi, firmanın faaliyet gösterdiği işyeri için düzenlenir ve belirli alet, cihaz ve donanım şartlarının sağlanmasına bağlıdır. Bu nedenle yalnızca telefonla hizmet veren, açık bir işyeri adresi bulunmayan veya unvanını paylaşmaktan kaçınan hizmet sağlayıcılara karşı temkinli olmak yerinde olur.",
          "Hizmet almadan önce firmaya bu belgenin olup olmadığını sormak ve belgenin firma unvanı ile adresinin hizmet veren işletmeyle uyumlu olduğuna bakmak makul bir adımdır. Belgenin geçerliliği konusunda tereddüt yaşanırsa ilgili il sağlık müdürlüğünden bilgi alınabilir.",
        ],
      },
      {
        id: "mesul-mudur-ve-ekip",
        title: "Mesul müdür ve uygulayıcılar",
        paragraphs: [
          "Mevzuat, uygulama yapan işyerlerinin teknik sorumluluğunu üstlenen bir mesul müdürle çalışmasını ve uygulamaların yetki belgeli kişilerce yapılmasını öngörür. Bu kişilerin eğitim ve sertifika şartları yönetmelikte ayrıntılı olarak tanımlanmıştır.",
          "Bu yapı, uygulamanın kimin gözetiminde ve kimin eliyle yapıldığını açık hâle getirir. Bir sorun yaşandığında muhatap alınacak kişinin belli olması, hizmet alan açısından önemli bir güvencedir.",
        ],
        subsections: [
          {
            id: "mesul-mudur",
            title: "Mesul müdür (sorumlu yönetici)",
            paragraphs: [
              "Yönetmelikte mesul müdür, belirli meslek gruplarından olup ilgili eğitimi almış ve uygulamalardan teknik olarak sorumlu tutulan kişi olarak tanımlanır. İşyeri adına bir mesul müdürlük belgesi düzenlenir. Firmaya mesul müdürün kim olduğunu ve belgesini sormak, hizmetin kimin sorumluluğunda yürütüldüğünü anlamanızı sağlar.",
            ],
          },
          {
            id: "uygulayici-belgeleri",
            title: "Ekip sorumlusu ve uygulayıcılar",
            paragraphs: [
              "Uygulamayı fiilen yapan ekipte, yönetmelikte tanımlanan eğitimleri almış ekip sorumlusu ve uygulayıcılar bulunur. Yönetmelik, mesul müdürler ve uygulayıcılar için kimlik kartı düzenlenmesini de öngörür. Uygulama günü gelen ekipten bu kartları göstermesini istemek, gelen kişilerin yetkili olup olmadığını görmenin basit bir yoludur.",
            ],
          },
        ],
      },
      {
        id: "urun-ruhsati",
        title: "Kullanılacak ürünlerin ruhsat bilgisi",
        paragraphs: [
          "Halk sağlığı alanında kullanılan biyosidal ürünlerin Sağlık Bakanlığı tarafından ruhsatlandırılmış olması gerekir. Ruhsatlı ürünlerin etiketinde ruhsat bilgisi, kullanım alanı, uyarılar ve ilk yardım bilgileri yer alır. Firmaya hangi ürünlerin kullanılacağını ve bu ürünlerin ruhsat bilgisini sormak, hem güvenlik hem de olası bir sağlık sorununda doğru bilgiye ulaşmak açısından önemlidir.",
          "Ruhsatlı bir ürünün de yalnızca etiketinde belirtilen alanlarda ve şekilde kullanılması gerekir. Örneğin tarım alanları için üretilmiş bir ürünün konut içinde kullanılması, ürün ruhsatlı olsa bile uygun değildir. Bu nedenle ürünün hangi kullanım alanı için ruhsatlandırıldığını sormak da anlamlıdır.",
          "ABD Çevre Koruma Ajansı (EPA) da haşere kontrol hizmeti alırken firmanın lisansını ve kullanılacak ürünlerin etiketlerini görmek istemeyi önerir. Gizli formül ya da etiketi olmayan karışım kullanacağını söyleyen hizmet sağlayıcılara karşı dikkatli olunmalıdır.",
          "Ürün bilgisini önceden almak, evde hassas grupların bulunduğu durumlarda uygulayıcıyla birlikte daha uygun bir yöntem veya ürün tercih edilmesine de imkân tanır. Bu bilgiyi sormak, hizmet alanın doğal bir hakkı olarak görülmelidir.",
        ],
      },
      {
        id: "uygulama-sonrasi-belge",
        title: "Uygulama sonrasında düzenlenen belge",
        paragraphs: [
          "Yönetmelik, yapılan her uygulama için bir Biyosidal Ürün Uygulama İşlem Formu düzenlenmesini öngörür. Bu form genellikle uygulama yapılan yeri, tarihi, hedef zararlıyı, kullanılan ürünleri ve uygulayıcı bilgilerini içerir; bir nüshası hizmet alana verilir.",
          "Bu belgeyi saklamak birkaç açıdan işe yarar: uygulama sonrasında bir sağlık şikâyeti olursa hekime veya Ulusal Zehir Danışma Merkezi'ne hangi ürünün kullanıldığını bildirebilirsiniz; takip ziyaretlerinde geçmiş uygulamalar görülebilir; işyerleri ve apartmanlar için denetimlerde ve kayıt düzeninde kullanılabilir.",
        ],
        subsections: [
          {
            id: "konut-musterileri",
            title: "Konutlarda",
            paragraphs: [
              "Ev uygulamalarında formun bir nüshasını, ürün etiket bilgileriyle birlikte erişilebilir bir yerde saklamak yeterlidir. Takip ziyareti planlandıysa tarihi formun üzerine not etmek, sürecin izlenmesini kolaylaştırır.",
            ],
          },
          {
            id: "kurumsal-musteriler",
            title: "İşyerleri ve apartmanlarda",
            paragraphs: [
              "Gıda işletmeleri, oteller, apartman ve site yönetimleri için bu formlar düzenli bir dosyada, tarih sırasıyla saklanmalıdır. Periyodik hizmet alınıyorsa her ziyaretin formu, izleme bulgularını içeren raporla birlikte arşivlenebilir.",
            ],
          },
        ],
        bullets: [
          "Uygulamanın tarihi ve yapıldığı adres",
          "Hedef zararlı ve uygulama yapılan alanlar",
          "Kullanılan ürünlerin adı ve ruhsat bilgisi",
          "Uygulayıcı ve mesul müdür bilgileri",
          "Alana dönüş ve uygulama sonrası uyarılar",
        ],
      },
      {
        id: "diger-sinyaller",
        title: "Belgelerin yanında dikkat edilebilecek işaretler",
        paragraphs: [
          "Belgeler, firmanın yasal olarak uygulama yapabildiğini gösterir; ancak hizmetin kalitesi hakkında tek başına fikir vermez. EPA'nın hizmet seçimiyle ilgili önerileri, karar verirken göz önünde bulundurulabilecek bazı ek işaretler sunar.",
          "Bir firmanın inceleme yapmadan, alanı görmeden ya da sorunu dinlemeden doğrudan uygulama önermesi de dikkat edilmesi gereken bir işarettir. Planlı bir hizmet; inceleme, tür tespiti, hazırlık bilgilendirmesi ve takip adımlarını içerir.",
        ],
        bullets: [
          "Çoğu haşere sorunu birkaç gün beklemeye dayanır; acele karar vermek yerine birden fazla firmayla görüşmek mümkündür.",
          "Kapıdan satış, hemen imza baskısı veya yalnızca fiyat üzerinden ikna etme girişimleri dikkat gerektirir.",
          "Resmî bir kurum tarafından desteklendiği iddiası temkinle karşılanmalıdır; kamu kurumları belirli bir firmayı veya ürünü önermez.",
          "Rutin ve sürekli uygulama yerine inceleme, hedefli uygulama ve takibi öneren bir plan daha anlamlıdır.",
          "Referans istemek ve önceki müşterilerin deneyimini sormak faydalı olabilir.",
        ],
      },
      {
        id: "profesyonel-destek",
        title: "Belgeleri nasıl doğrulayabilir, ne zaman destek alabilirsiniz?",
        paragraphs: [
          "Belgeleri sormak firmayı zor durumda bırakmak değil, aldığınız hizmetin sorumluluğunu kimin üstlendiğini öğrenmektir. Yetkili firmalar bu belgeleri genellikle talep edildiğinde paylaşır. Belgenin ibraz edilmemesi, bilgilerin tutarsız olması veya uygulama sonrasında form verilmemesi durumunda başka bir hizmet sağlayıcıyla görüşmek değerlendirilebilir.",
          "Kurumsal müşteriler için bu belgelerin bir kopyasının sözleşme dosyasında bulunması, denetimlerde ve iç kontrol süreçlerinde işi kolaylaştırır. Belgelerin geçerlilik durumunu belirli aralıklarla kontrol etmek ve mesul müdür ya da firma bilgilerinde değişiklik olduğunda güncel belgeleri istemek iyi bir uygulamadır.",
          "Bir belgenin geçerliliğinden emin olamazsanız işyerinin bağlı olduğu il sağlık müdürlüğüne başvurabilirsiniz. Uygulama sonrasında sağlık şikâyeti yaşanırsa elinizdeki işlem formuyla birlikte hekime başvurun; zehirlenme şüphesinde Ulusal Zehir Danışma Merkezi'ne 114 numaralı hattan ulaşılabilir.",
        ],
      },
    ],
    sources: [
      {
        title: "Biyosidal Ürünlerin Kullanım Usul ve Esasları Hakkında Yönetmelik",
        publisher: "T.C. Cumhurbaşkanlığı Mevzuat Bilgi Sistemi (Sağlık Bakanlığı yönetmeliği)",
        url: "https://www.mevzuat.gov.tr/mevzuat?MevzuatNo=32642&MevzuatTur=7&MevzuatTertip=5",
      },
      EPA_SELECTING_SERVICE,
    ],
    relatedServices: ["hasere-kontrolu", "ev-ilaclama", "isyeri-ilaclama", "periyodik-pest-management"],
  },
};

export function getBlogBody(slug: string) {
  return blogBodies[slug] ?? null;
}
