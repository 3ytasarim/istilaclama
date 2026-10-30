/**
 * İlçe profilleri — her ilçe için özgün iki paragraf + komşu ilçeler (iç bağlantı).
 * Yalnız genel ve doğrulanabilir coğrafi/yapısal bilgiler kullanıldı; firma iddiası içermez.
 * Bina istatistikleri ayrıca İBB açık verisinden (2017) hesaplanır: src/content/data/ibb-mahalle-bina-2017.json
 */
export interface DistrictProfile {
  /** İlçenin coğrafi ve yapısal karakteri */
  about: string;
  /** Haşere kontrolü açısından öne çıkan noktalar */
  pestContext: string;
  neighbours: string[];
}

export const districtProfiles: Record<string, DistrictProfile> = {
  adalar: {
    about:
      "Adalar; Büyükada, Heybeliada, Burgazada ve Kınalıada başta olmak üzere Marmara Denizi'ndeki adalardan oluşan, İstanbul'un motorlu araç trafiğinin sınırlı tutulduğu ilçesidir. Tarihî ahşap köşkler, bahçeli yapılar ve çam ormanlarıyla çevrili yerleşimler ilçenin dokusunu belirler; yaz aylarında nüfus belirgin biçimde artar.",
    pestContext:
      "Ahşap ve eski yapı stoku, bahçeli evler ve uzun süre kapalı kalan yazlık konutlar; tahta kurusu, güve, karınca ve kemirgen kontrolünde dikkatli planlama gerektirir. Kapalı dönem sonrası açılan evlerde pire ve böcek kontrolü sezon başında öne çıkar.",
    neighbours: ["kadikoy", "maltepe", "kartal", "pendik"],
  },
  arnavutkoy: {
    about:
      "Arnavutköy, İstanbul'un Avrupa Yakası'nda Karadeniz kıyısına uzanan, kentin en geniş yüzölçümlü ilçelerinden biridir. İstanbul Havalimanı'nın da bulunduğu ilçede yeni konut alanları, köy yerleşimleri, tarım arazileri ve sanayi bölgeleri bir arada yer alır.",
    pestContext:
      "Tarım alanlarına ve açık arazilere yakın yerleşimler kemirgen, kene ve sivrisinek kontrolünü önemli kılar. Yeni yapılaşan sitelerde ise ortak alanlar, otoparklar ve çöp odaları periyodik kontrol için öncelikli noktalardır.",
    neighbours: ["basaksehir", "eyupsultan", "catalca", "esenyurt", "sultangazi"],
  },
  atasehir: {
    about:
      "Ataşehir, Anadolu Yakası'nın yüksek katlı konut projeleri, iş merkezleri ve finans bölgesiyle öne çıkan modern ilçelerinden biridir. Planlı site yerleşimleri ile daha eski mahalle dokusu ilçede yan yana bulunur.",
    pestContext:
      "Çok katlı bloklarda tesisat şaftları ve çöp hatları üzerinden hamam böceği yayılımı görülebilir; bu nedenle tek daire yerine blok veya site ölçeğinde planlama daha kalıcı sonuç verir. Ofis ve iş merkezlerinde mesai düzenine uygun periyodik programlar tercih edilir.",
    neighbours: ["kadikoy", "umraniye", "maltepe", "sancaktepe", "uskudar"],
  },
  avcilar: {
    about:
      "Avcılar, Küçükçekmece Gölü ile Marmara Denizi arasında konumlanan, Avrupa Yakası'nın batısındaki yoğun nüfuslu konut ilçelerinden biridir. Üniversite kampüsü, sahil şeridi ve apartman ağırlıklı mahalleleriyle canlı bir kent dokusuna sahiptir.",
    pestContext:
      "Göl ve deniz kıyısına yakınlık, sıcak aylarda sivrisinek kontrolünü gündeme getirir. Apartman yoğunluğu yüksek mahallelerde bodrum, sığınak ve ortak alan uygulamaları haşere kontrolünün temelini oluşturur.",
    neighbours: ["kucukcekmece", "esenyurt", "beylikduzu", "basaksehir"],
  },
  bagcilar: {
    about:
      "Bağcılar, Avrupa Yakası'nın en kalabalık ilçeleri arasında yer alan, yoğun konut dokusu ile tekstil ve küçük sanayi işletmelerinin iç içe bulunduğu bir ilçedir. Toplu taşıma bağlantıları ve ticari akslarıyla bölgenin önemli merkezlerindendir.",
    pestContext:
      "Bitişik nizam apartmanlar ve ortak duvarlı yapılar, haşerelerin binalar arasında yayılmasını kolaylaştırabilir. Atölye ve depolarda kemirgen kontrolü, gıda işletmelerinde ise kayıtlı periyodik program öne çıkar.",
    neighbours: ["bahcelievler", "gungoren", "esenler", "kucukcekmece", "basaksehir"],
  },
  bahcelievler: {
    about:
      "Bahçelievler, E-5 karayolu çevresinde gelişen, yerleşik konut mahalleleri ve ticari akslarıyla Avrupa Yakası'nın merkezî ilçelerinden biridir. Havalimanı bağlantısına yakınlığı ve gelişmiş toplu taşıma ağıyla bilinir.",
    pestContext:
      "Uzun yıllardır kullanılan apartman stokunda tesisat kaynaklı hamam böceği ve bodrum kaynaklı pire sorunları sık görülen başlıklardır. Ticari akslardaki gıda işletmeleri için düzenli kontrol ve kayıt önemlidir.",
    neighbours: ["bakirkoy", "bagcilar", "gungoren", "kucukcekmece"],
  },
  bakirkoy: {
    about:
      "Bakırköy, Marmara kıyısında yer alan, köklü yerleşim dokusu, sahil parkları ve Ataköy gibi planlı konut bölgeleriyle bilinen bir Avrupa Yakası ilçesidir. Alışveriş, sağlık ve ulaşım hizmetleri açısından bölgenin merkezlerinden biridir.",
    pestContext:
      "Eski yapılardaki ahşap ve tesisat detayları ile sahile yakın yeşil alanlar; hamam böceği, karınca ve sivrisinek kontrolünde farklı yaklaşımlar gerektirir. Planlı sitelerde ortak alan programları yönetimle birlikte kurgulanır.",
    neighbours: ["bahcelievler", "zeytinburnu", "kucukcekmece", "gungoren"],
  },
  basaksehir: {
    about:
      "Başakşehir, son yıllarda hızla gelişen büyük konut projeleri, Bahçeşehir gibi planlı yerleşimleri ve organize sanayi bölgeleriyle Avrupa Yakası'nın genç ilçelerinden biridir. Geniş yeşil alanlar ve göletler ilçenin karakterine eşlik eder.",
    pestContext:
      "Gölet ve yeşil alanlara yakın sitelerde sivrisinek ve kene, bahçeli konutlarda karınca ve kemirgen kontrolü öne çıkar. Sanayi bölgelerindeki depo ve üretim alanlarında risk haritalı periyodik izleme önerilir.",
    neighbours: ["arnavutkoy", "esenyurt", "kucukcekmece", "bagcilar", "sultangazi", "avcilar"],
  },
  bayrampasa: {
    about:
      "Bayrampaşa, Avrupa Yakası'nın merkezinde, otogar ve sebze-meyve hali çevresinde gelişmiş, konut ile ticari alanların iç içe geçtiği kompakt bir ilçedir. Ulaşım akslarının kesiştiği konumuyla lojistik açıdan yoğun bir bölgedir.",
    pestContext:
      "Gıda ticareti ve lojistik faaliyetlerin yoğunluğu, depolar ve ticari alanlarda kemirgen ve depo zararlısı kontrolünü önemli kılar. Konutlarda ise apartman ortak alanlarına yönelik düzenli uygulamalar fayda sağlar.",
    neighbours: ["esenler", "gaziosmanpasa", "eyupsultan", "zeytinburnu", "fatih"],
  },
  besiktas: {
    about:
      "Beşiktaş, Boğaz kıyısında saraylar, üniversiteler, tarihî mahalleler ve iş merkezlerini bir araya getiren, İstanbul'un en tanınan ilçelerinden biridir. Ortaköy, Bebek ve Etiler gibi semtleri farklı yapı tipleri ve yoğun bir sosyal yaşam barındırır.",
    pestContext:
      "Tarihî ve eski yapılardaki ahşap, bodrum ve tesisat detayları ile yoğun restoran–kafe faaliyeti, hem konut hem işletme tarafında planlı haşere kontrolü gerektirir. Boğaz'a yakın yeşil alanlarda mevsimsel sivrisinek kontrolü gündeme gelir.",
    neighbours: ["sisli", "sariyer", "beyoglu"],
  },
  beykoz: {
    about:
      "Beykoz, Anadolu Yakası'nda Boğaz'ın Karadeniz'e açılan bölümünde, geniş orman alanları, yalılar ve köy yerleşimleriyle İstanbul'un en yeşil ilçelerinden biridir. Kıyı ile iç kesim arasında yapı tipleri belirgin biçimde değişir.",
    pestContext:
      "Ormana ve açık araziye yakın bahçeli evlerde kene, karınca, akrep ve kemirgen kontrolü öne çıkar. Yalı ve eski yapılarda ahşap kaynaklı zararlılar ile nem kaynaklı gümüş böceği sorunları dikkate alınmalıdır.",
    neighbours: ["uskudar", "umraniye", "cekmekoy", "sile"],
  },
  beylikduzu: {
    about:
      "Beylikdüzü, Avrupa Yakası'nın batısında Marmara kıyısında yer alan, planlı site yerleşimleri, geniş caddeleri ve yeni yapı stokuyla bilinen bir ilçedir. Sahil parkları ve yeşil alanlar ilçe yaşamının önemli bir parçasıdır.",
    pestContext:
      "Site yerleşimlerinde ortak alanlar, otoparklar ve peyzaj alanları periyodik kontrol için öncelikli noktalardır. Sahil ve park alanlarına yakın konutlarda sıcak aylarda sivrisinek ve karınca şikâyetleri artabilir.",
    neighbours: ["esenyurt", "avcilar", "buyukcekmece"],
  },
  beyoglu: {
    about:
      "Beyoğlu, Galata, Cihangir, Karaköy ve İstiklal Caddesi çevresindeki tarihî dokusuyla İstanbul'un kültür, eğlence ve turizm merkezlerinden biridir. Asırlık apartmanlar, dar sokaklar ve yoğun işletme faaliyeti ilçeyi tanımlar.",
    pestContext:
      "Eski yapı stoku, bitişik binalar ve yoğun restoran–otel faaliyeti; hamam böceği ve kemirgen kontrolünü bina ve işletme ölçeğinde planlamayı gerektirir. Konaklama tesislerinde tahta kurusu için düzenli inceleme önem taşır.",
    neighbours: ["sisli", "besiktas", "kagithane", "eyupsultan", "fatih"],
  },
  buyukcekmece: {
    about:
      "Büyükçekmece, Avrupa Yakası'nın batısında Büyükçekmece Gölü ve Marmara kıyısı arasında uzanan, yazlık siteler ile yeni konut alanlarını barındıran bir ilçedir. Tarihî köprüsü ve sahil şeridiyle bilinir.",
    pestContext:
      "Göl ve deniz kıyısına yakınlık sivrisinek kontrolünü, bahçeli yazlık siteler ise karınca, kene ve kemirgen kontrolünü öne çıkarır. Uzun süre kapalı kalan yazlıklarda sezon açılışında kontrol önerilir.",
    neighbours: ["beylikduzu", "esenyurt", "catalca", "silivri", "arnavutkoy"],
  },
  catalca: {
    about:
      "Çatalca, İstanbul'un Avrupa Yakası'nda geniş tarım arazileri, ormanlık alanları ve köy yerleşimleriyle kırsal karakterini koruyan ilçelerinden biridir. Karadeniz ve Marmara arasında uzanan geniş bir alana yayılır.",
    pestContext:
      "Tarım ve hayvancılık alanlarına yakın yerleşimlerde kemirgen, kene ve sinek kontrolü, müstakil ve bahçeli yapılarda ise karınca ve akrep kontrolü öne çıkar. Depolar ve ahır çevresinde periyodik izleme fayda sağlar.",
    neighbours: ["arnavutkoy", "buyukcekmece", "silivri", "esenyurt"],
  },
  cekmekoy: {
    about:
      "Çekmeköy, Anadolu Yakası'nda Ömerli ve Alemdağ ormanlarına yakın konumuyla yeşil alanları bol, site ve müstakil konut ağırlıklı bir ilçedir. Son yıllarda hızlı bir konut gelişimi yaşamıştır.",
    pestContext:
      "Orman ve açık alanlara yakın konutlarda kene, karınca ve kemirgen kontrolü önemli bir başlıktır. Site yerleşimlerinde bahçe, peyzaj ve ortak alanlar için mevsime göre planlanan programlar tercih edilir.",
    neighbours: ["umraniye", "sancaktepe", "beykoz", "sile", "sultanbeyli"],
  },
  esenler: {
    about:
      "Esenler, Avrupa Yakası'nın merkezinde, yoğun konut dokusu ve küçük işletmeleriyle öne çıkan, kompakt yapılı bir ilçedir. Ulaşım bağlantılarının kesiştiği konumuyla gün boyu hareketli bir yaşam sunar.",
    pestContext:
      "Bitişik nizam apartmanlarda ortak tesisat ve bodrumlar, hamam böceği ve pire kontrolünde bina ölçeğinde planlamayı gerektirir. Küçük işletme ve depolarda kemirgen izleme düzenli olarak yapılmalıdır.",
    neighbours: ["bagcilar", "gungoren", "bayrampasa", "gaziosmanpasa", "basaksehir", "sultangazi"],
  },
  esenyurt: {
    about:
      "Esenyurt, İstanbul'un en kalabalık ilçelerinden biri olarak hızla gelişen konut projeleri, yüksek katlı siteleri ve ticari alanlarıyla Avrupa Yakası'nın batısında yer alır.",
    pestContext:
      "Yüksek yapı yoğunluğu ve çok bloklu siteler, haşere kontrolünün tek daire yerine blok ve site ölçeğinde planlanmasını önemli kılar. Çöp odaları, otoparklar ve şaftlar düzenli kontrol edilmesi gereken başlıca noktalardır.",
    neighbours: ["beylikduzu", "avcilar", "basaksehir", "buyukcekmece", "arnavutkoy"],
  },
  eyupsultan: {
    about:
      "Eyüpsultan, Haliç kıyısındaki tarihî merkezinden Karadeniz'e uzanan orman alanlarına kadar geniş bir alana yayılan, hem tarihî hem kırsal dokuyu barındıran bir ilçedir. Göktürk ve Kemerburgaz gibi yeni yerleşim alanlarını da kapsar.",
    pestContext:
      "Tarihî merkezde eski yapı stoku, kuzeydeki yeni yerleşimlerde ise orman ve yeşil alan yakınlığı farklı haşere başlıkları doğurur: eski binalarda hamam böceği ve kemirgen, bahçeli sitelerde kene ve karınca öne çıkar.",
    neighbours: ["gaziosmanpasa", "kagithane", "sariyer", "bayrampasa", "fatih", "arnavutkoy", "sultangazi"],
  },
  fatih: {
    about:
      "Fatih, tarihî yarımadanın tamamını kapsayan; Sultanahmet, Eminönü, Balat ve Fener gibi semtleriyle İstanbul'un tarih ve ticaret merkezidir. Asırlık yapılar, çarşılar ve yoğun turizm faaliyeti ilçeyi tanımlar.",
    pestContext:
      "Tarihî yapı stoku, çarşı ve hanlardaki yoğun ticaret ile restoran ve otel yoğunluğu; kemirgen, hamam böceği ve tahta kurusu kontrolünü işletme bazında planlamayı zorunlu kılar. Bitişik yapılarda bina ölçeğinde koordinasyon fayda sağlar.",
    neighbours: ["beyoglu", "eyupsultan", "zeytinburnu", "bayrampasa"],
  },
  gaziosmanpasa: {
    about:
      "Gaziosmanpaşa, Avrupa Yakası'nın kuzeybatısında yoğun konut dokusu ve kentsel dönüşüm projeleriyle değişim yaşayan bir ilçedir. Eski ve yeni yapı stoku ilçede yan yana bulunur.",
    pestContext:
      "Dönüşüm sürecindeki mahallelerde yıkım ve inşaat faaliyetleri kemirgenlerin yer değiştirmesine yol açabilir; çevre binalarda bu dönemde izleme önerilir. Eski apartmanlarda tesisat kaynaklı hamam böceği kontrolü öne çıkar.",
    neighbours: ["eyupsultan", "sultangazi", "bayrampasa", "esenler"],
  },
  gungoren: {
    about:
      "Güngören, Avrupa Yakası'nın merkezinde yer alan, yüzölçümü küçük ancak nüfus yoğunluğu yüksek bir ilçedir. Konut ile tekstil ve ticaret işletmeleri ilçede iç içe bulunur.",
    pestContext:
      "Yüksek yapı yoğunluğu ve bitişik binalar, haşerelerin binalar arasında yayılmasını kolaylaştırır; bu nedenle komşu yapılarla koordineli uygulama kalıcılığı artırır. İşletmelerde kemirgen ve depo zararlısı kontrolü önemlidir.",
    neighbours: ["bagcilar", "bahcelievler", "esenler", "bakirkoy", "zeytinburnu"],
  },
  kadikoy: {
    about:
      "Kadıköy, Anadolu Yakası'nın kültür ve ticaret merkezi olarak Moda, Fenerbahçe, Göztepe ve Bostancı gibi semtleriyle sahil boyunca uzanan köklü bir ilçedir. Eski apartmanlar ile yenilenen yapılar, canlı çarşı ve restoran yaşamıyla bir arada bulunur.",
    pestContext:
      "Eski apartman stokunda tesisat ve bodrum kaynaklı hamam böceği, çarşı ve restoran yoğunluğunda ise kemirgen kontrolü öne çıkan başlıklardır. Sahil parkları ve bahçeli yapılarda mevsimsel sivrisinek ve karınca şikâyetleri görülebilir.",
    neighbours: ["uskudar", "atasehir", "maltepe", "adalar"],
  },
  kagithane: {
    about:
      "Kağıthane, Avrupa Yakası'nın merkezinde, eski sanayi alanlarının yerini yeni konut ve ofis projelerine bıraktığı, hızla dönüşen bir ilçedir. Kağıthane Deresi çevresi ve yerleşik mahalleleriyle karma bir yapıya sahiptir.",
    pestContext:
      "Dere çevresi sivrisinek ve kemirgen açısından, dönüşüm sürecindeki alanlar ise kemirgenlerin yer değiştirmesi açısından takip gerektirir. Yeni ofis ve rezidans projelerinde ortak alanlar için periyodik program önerilir.",
    neighbours: ["sisli", "beyoglu", "eyupsultan", "sariyer"],
  },
  kartal: {
    about:
      "Kartal, Anadolu Yakası'nda Marmara kıyısında, sahil şeridi, kentsel dönüşüm projeleri ve gelişen merkeziyle öne çıkan bir ilçedir. Eski sanayi alanlarının konut ve ticaret alanlarına dönüştüğü bir süreçten geçmektedir.",
    pestContext:
      "Sahil parkı ve yeşil alanlara yakın konutlarda sivrisinek, eski yapılarda ise hamam böceği ve kemirgen kontrolü sık karşılaşılan başlıklardır. Dönüşüm alanlarına komşu binalarda dönemsel izleme önerilir.",
    neighbours: ["maltepe", "pendik", "sultanbeyli", "sancaktepe", "adalar"],
  },
  kucukcekmece: {
    about:
      "Küçükçekmece, Küçükçekmece Gölü çevresinde yer alan, Avrupa Yakası'nın kalabalık ve geniş ilçelerinden biridir. Halkalı, Sefaköy ve Atakent gibi semtleriyle farklı yapı tiplerini bir arada barındırır.",
    pestContext:
      "Göl kıyısına yakın mahallelerde sivrisinek, yoğun konut bölgelerinde ise apartman ortak alanlarına yönelik hamam böceği ve pire kontrolü öne çıkar. Ticari ve lojistik alanlarda kemirgen izleme önemlidir.",
    neighbours: ["avcilar", "basaksehir", "bagcilar", "bahcelievler", "bakirkoy", "esenyurt"],
  },
  maltepe: {
    about:
      "Maltepe, Anadolu Yakası'nda Marmara kıyısı boyunca uzanan geniş sahil dolgu alanı, yerleşik konut mahalleleri ve üniversiteleriyle bilinen bir ilçedir. Sahilden iç kesimlere doğru yapı tipi ve yoğunluğu değişir.",
    pestContext:
      "Sahil parkları ve yeşil alanlara yakın konutlarda mevsimsel sivrisinek ve karınca, apartman yoğun bölgelerde ise hamam böceği kontrolü öne çıkar. Site yerleşimlerinde ortak alan programları yönetimle birlikte planlanır.",
    neighbours: ["kadikoy", "atasehir", "kartal", "sancaktepe", "adalar"],
  },
  pendik: {
    about:
      "Pendik, Anadolu Yakası'nın doğusunda Marmara kıyısında yer alan; liman, Sabiha Gökçen Havalimanı ve hızlı tren bağlantılarıyla önemli bir ulaşım merkezidir. Kıyı mahalleleri ile iç kesimdeki yeni konut alanları ilçede birlikte bulunur.",
    pestContext:
      "Liman ve ulaşım tesislerine yakın ticari alanlarda kemirgen kontrolü, sahil bölgelerinde sivrisinek, yeni sitelerde ise ortak alan uygulamaları öne çıkar.",
    neighbours: ["kartal", "tuzla", "sultanbeyli", "sancaktepe", "adalar"],
  },
  sancaktepe: {
    about:
      "Sancaktepe, Anadolu Yakası'nda hızla gelişen konut projeleri ve ormanlık alanlara yakın konumuyla dikkat çeken, görece genç bir ilçedir. Yeni siteler ile yerleşik mahalle dokusu ilçede bir arada yer alır.",
    pestContext:
      "Yeşil alan ve orman yakınlığı kene ve karınca, yeni sitelerde ise çöp odaları ve otoparklar üzerinden kemirgen kontrolü gündeme getirir. Site yönetimleriyle planlanan periyodik programlar kalıcılığı artırır.",
    neighbours: ["umraniye", "cekmekoy", "sultanbeyli", "maltepe", "kartal", "pendik", "atasehir"],
  },
  sariyer: {
    about:
      "Sarıyer, Boğaz'ın Avrupa kıyısında yalılar, Belgrad Ormanı ve Kilyos sahilleriyle doğal ve tarihî dokuyu bir arada barındıran bir ilçedir. Maslak gibi iş merkezleri ile sahil köyleri aynı ilçe sınırları içindedir.",
    pestContext:
      "Ormana yakın konutlarda kene, karınca ve kemirgen, yalı ve eski yapılarda ahşap kaynaklı zararlılar ve nem kaynaklı gümüş böceği öne çıkar. İş merkezlerinde mesai dışı planlanan periyodik programlar tercih edilir.",
    neighbours: ["besiktas", "sisli", "kagithane", "eyupsultan"],
  },
  silivri: {
    about:
      "Silivri, İstanbul'un Avrupa Yakası'nın en batısında Marmara kıyısında yer alan; yazlık siteleri, tarım arazileri ve sahil şeridiyle yarı kırsal karakterini koruyan bir ilçedir.",
    pestContext:
      "Tarım alanlarına yakın yerleşimlerde kemirgen ve sinek, yazlık sitelerde sezon açılışında böcek ve pire kontrolü öne çıkar. Sahil ve dere çevrelerinde mevsimsel sivrisinek kontrolü gündeme gelir.",
    neighbours: ["buyukcekmece", "catalca"],
  },
  sultanbeyli: {
    about:
      "Sultanbeyli, Anadolu Yakası'nda Ömerli Barajı havzasına yakın konumda, konut ağırlıklı ve hızlı nüfus artışı yaşamış bir ilçedir. Kentsel dönüşüm projeleriyle yapı stoku değişmektedir.",
    pestContext:
      "Baraj havzası ve yeşil alanlara yakınlık mevsimsel sivrisinek ve kene kontrolünü, yoğun konut bölgeleri ise bina ölçeğinde hamam böceği ve kemirgen kontrolünü öne çıkarır.",
    neighbours: ["sancaktepe", "pendik", "kartal", "cekmekoy"],
  },
  sultangazi: {
    about:
      "Sultangazi, Avrupa Yakası'nın kuzeyinde, konut ağırlıklı dokusu ve ormanlık alanlara yakın konumuyla bilinen, kalabalık bir ilçedir. Yeni yapılaşma ile yerleşik mahalleler ilçede birlikte yer alır.",
    pestContext:
      "Orman ve açık alanlara yakın mahallelerde kemirgen ve kene, apartman yoğun bölgelerde ise ortak alanlara yönelik hamam böceği ve pire kontrolü öne çıkar.",
    neighbours: ["gaziosmanpasa", "eyupsultan", "esenler", "basaksehir", "arnavutkoy"],
  },
  sile: {
    about:
      "Şile, Anadolu Yakası'nda Karadeniz kıyısında yer alan; plajları, ormanları ve köy yerleşimleriyle İstanbul'un tatil ve doğa ilçelerinden biridir. Yaz aylarında nüfusu belirgin şekilde artar.",
    pestContext:
      "Orman ve kırsal alanlara yakın yazlık ve müstakil evlerde kene, akrep, karınca ve kemirgen kontrolü öne çıkar. Uzun süre kapalı kalan yazlıklarda sezon öncesi kontrol önerilir.",
    neighbours: ["beykoz", "cekmekoy"],
  },
  sisli: {
    about:
      "Şişli, Avrupa Yakası'nın iş, ticaret ve konut merkezlerinden biri olarak Mecidiyeköy, Nişantaşı ve Bomonti gibi semtleri kapsar. Tarihî apartmanlar, plazalar ve alışveriş merkezleri ilçede bir arada bulunur.",
    pestContext:
      "Eski apartmanlarda tesisat kaynaklı hamam böceği, plaza ve ofislerde mesai düzenine uygun periyodik programlar, yoğun restoran faaliyetinde ise kayıtlı kemirgen kontrolü öne çıkar.",
    neighbours: ["besiktas", "beyoglu", "kagithane", "sariyer", "eyupsultan"],
  },
  tuzla: {
    about:
      "Tuzla, Anadolu Yakası'nın en doğusunda Marmara kıyısında yer alan; tersaneleri, organize sanayi bölgeleri, üniversiteleri ve sahil mahalleleriyle sanayi ile konutun bir arada bulunduğu bir ilçedir.",
    pestContext:
      "Sanayi ve depo alanlarında kemirgen ile depo zararlılarına yönelik risk haritalı periyodik izleme, sahil mahallelerinde mevsimsel sivrisinek, site yerleşimlerinde ise ortak alan uygulamaları öne çıkar.",
    neighbours: ["pendik"],
  },
  umraniye: {
    about:
      "Ümraniye, Anadolu Yakası'nın en kalabalık ilçelerinden biri olarak iş merkezleri, alışveriş alanları ve büyük konut projeleriyle hızla gelişmiştir. Yerleşik mahalleler ile yeni siteler ilçede bir arada yer alır.",
    pestContext:
      "Çok bloklu sitelerde şaft ve çöp odaları üzerinden hamam böceği yayılımı, iş merkezlerinde ise periyodik program ihtiyacı öne çıkar. Yeşil alanlara yakın konutlarda karınca ve kene şikâyetleri görülebilir.",
    neighbours: ["uskudar", "atasehir", "sancaktepe", "cekmekoy", "beykoz"],
  },
  uskudar: {
    about:
      "Üsküdar, Boğaz'ın Anadolu kıyısında tarihî camileri, Kız Kulesi ve köklü mahalleleriyle İstanbul'un en eski yerleşimlerinden biridir. Kıyıdaki tarihî doku ile iç kesimdeki yeni konut alanları ilçede bir arada bulunur.",
    pestContext:
      "Tarihî ve eski yapılarda bodrum, ahşap ve tesisat detayları; hamam böceği, gümüş böceği ve kemirgen kontrolünü önemli kılar. Korular ve yeşil alanlara yakın konutlarda mevsimsel karınca ve sivrisinek şikâyetleri görülebilir.",
    neighbours: ["kadikoy", "atasehir", "umraniye", "beykoz"],
  },
  zeytinburnu: {
    about:
      "Zeytinburnu, Avrupa Yakası'nda tarihî surların dışında, Marmara kıyısında yer alan; tekstil ve deri ticareti, sahil parkları ve kentsel dönüşüm projeleriyle bilinen bir ilçedir.",
    pestContext:
      "Atölye ve depo yoğunluğu kemirgen ile depo zararlısı kontrolünü, eski konut stoku ise hamam böceği kontrolünü öne çıkarır. Sahil parkına yakın bölgelerde sıcak aylarda sivrisinek şikâyetleri görülebilir.",
    neighbours: ["fatih", "bakirkoy", "gungoren", "bayrampasa"],
  },
};
