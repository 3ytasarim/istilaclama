/**
 * Görsel kayıt defteri — Sprint 5'te media_assets tablosuna aktarılacak.
 * Kaynak: Unsplash (Unsplash License, ticari kullanım serbest; atıf zorunlu değil ama kaydı tutuluyor).
 * Alt metinler fotoğrafta gerçekten görüneni anlatır; ilçe/marka/işlem iddiası içermez.
 */
export interface MediaAsset {
  src: string;
  width: number;
  height: number;
  alt: string;
  /** Odak noktası (object-position) */
  focus?: string;
  source: string;
}

const u = (id: string) => `https://unsplash.com/photos/${id}`;
const m = (file: string, width: number, height: number, alt: string, sourceId: string, focus?: string): MediaAsset => ({
  src: `/images/stock/${file}.jpg`,
  width,
  height,
  alt,
  focus,
  source: u(sourceId),
});

export const media = {
  heroTechnician: m("koruyucu-tulum-sirt-pulverizator-koridor", 2000, 1333,
    "Beyaz koruyucu tulum, maske ve gözlük takmış, sırt pülverizatörüyle koridorda uygulama yapan teknisyen", "1636791013127-37effd526316", "60% 35%"),
  technicianHome: m("ilaclama-teknisyeni-koruyucu-kiyafet-ev-ici", 2000, 2997,
    "Koruyucu tulumlu bir uygulayıcının salon zemininde sisleme cihazıyla çalışması", "1742483359033-13315b247c74", "40% 50%"),
  inspection: m("teknisyen-tablet-alan-incelemesi", 2000, 1333,
    "Lacivert koruyucu kıyafetli iki personelden birinin tabletle kayıt tuttuğu, diğerinin püskürtme şişesi kullandığı inceleme anı", "1669101283561-642d16d924ba", "40% 40%"),
  surfaceHygiene: m("teknisyen-duvar-kosesi-uygulama", 2000, 1334,
    "Lacivert koruyucu kıyafetli personelin uzun saplı aparatla duvar yüzeyini temizlemesi", "1669101283107-b32aab60587a", "70% 50%"),
  gardenMask: m("koruyucu-maskeli-bahce-uygulamasi", 2000, 2840,
    "Gaz maskeli ve beyaz tulumlu bir kişinin ağaçlık alanda püskürtme yapması", "1600092965062-2b0fd76ade11", "50% 40%"),
  buildingExterior: m("bina-disi-ilaclama-uygulamasi", 2000, 3000,
    "Reflektif yelekli bir çalışanın bina önündeki çalılık alanda püskürtme uygulaması yapması", "1783753445341-6e8571478579", "50% 55%"),
  houseExterior: m("ev-disi-sirt-pulverizatoru", 2000, 1333,
    "Sırt pülverizatörlü bir kişinin evin önündeki bahçe bitkilerine uygulama yapması", "1670989292166-8b20b9530438", "50% 50%"),
  cockroach: m("hamam-bocegi-yakin-cekim", 2000, 2952,
    "Beyaz zemin üzerinde hamam böceğinin yakın çekimi", "1611773236409-f3ee161007a1", "50% 50%"),
  cockroachFloor: m("hamam-bocegi-tas-zemin", 2000, 1333,
    "Pürüzlü taş zemin üzerinde duran hamam böceği", "1759379077720-b099c6cf2f71", "50% 50%"),
  rat: m("fare-tahta-altinda", 2000, 1333,
    "Ahşap bir tahtanın altından çıkan gri fare", "1575378064390-5a323bbac5d7", "55% 55%"),
  mouse: m("fare-ahsap-uzerinde", 2000, 1333,
    "Ahşap yüzey üzerinde duran gri fare", "1624116518496-993146f67f4a", "50% 50%"),
  dogScratching: m("kopek-kasinma-pire-belirtisi", 2000, 1333,
    "Beyaz-siyah tüylü küçük bir köpeğin kaldırımda arka ayağıyla kaşınması", "1780053550954-7c291e1e9eb1", "50% 55%"),
  flea: m("pire-mikroskobik-gorunum", 2000, 1574,
    "Açık zemin üzerinde pirenin büyütülmüş görüntüsü", "1574342467132-e25a78ed99b8", "50% 50%"),
  bedBug: m("tahta-kurusu-yakin-cekim", 2000, 1333,
    "Gri arka plan önünde yuvarlak gövdeli, kızıl-kahve bir böceğin yakın çekimi", "1729294428628-6d97177fd053", "55% 55%"),
  ants: m("karinca-kolonisi", 2000, 2667,
    "Açık renkli zeminde bir besin parçasının etrafında toplanan karıncalar", "1592331753290-91e0de78233f", "50% 50%"),
  mosquito: m("sivrisinek-cilt-uzerinde", 2000, 1333,
    "İnsan cildi üzerinde konmuş çizgili sivrisinek", "1707943768453-7850f916ebde", "40% 50%"),
  tick: m("kene-cilt-uzerinde", 2000, 1333,
    "İnsan cildi üzerinde duran kene", "1696006985991-876279342017", "50% 50%"),
  moth: m("guve-kanat-yakin-cekim", 2000, 3556,
    "Kahverengi kanatlı bir güvenin yakın çekimi", "1602244535576-d723f1bb59a0", "50% 45%"),
  scorpion: m("akrep-kaya-uzerinde", 2000, 2667,
    "Gri bir kaya üzerinde duran açık kahverengi akrep", "1618479995657-6e2fbb7d5480", "50% 50%"),
  basementLaundry: m("nemli-bodrum-camasirhane", 2000, 1333,
    "Çamaşır makineleri bulunan beyaz duvarlı bodrum katı", "1646592474273-86049d4f3575", "50% 50%"),
  basementStairs: m("bodrum-kati-merdiven-tugla", 2000, 1333,
    "Floresan ışıklı, tuğla duvarlı ve merdivenli bodrum katı", "1604997266148-a2640dce04c6", "50% 50%"),
  livingRoom: m("aydinlik-ev-salonu", 2000, 1058,
    "Açık renkli, modern döşenmiş bir ev salonu", "1628592102751-ba83b0314276", "50% 50%"),
  apartments: m("apartman-bloklari", 2000, 1333,
    "Balkonlu, çok katlı modern apartman blokları", "1612637968894-660373e23b03", "50% 50%"),
  residentialSite: m("havuzlu-konut-sitesi", 2000, 1333,
    "Havuzu ve yeşil alanı olan çok bloklu konut sitesi", "1580041065738-e72023775cdc", "50% 50%"),
  office: m("acik-ofis-calisma-alani", 2000, 1500,
    "Masalarında çalışan kişilerin bulunduğu aydınlık açık ofis", "1556761175-4b46a572b786", "50% 50%"),
  restaurantKitchen: m("restoran-mutfagi-sef", 2000, 1125,
    "Profesyonel restoran mutfağında çalışan şef", "1622021142947-da7dedc7c39a", "45% 50%"),
  hotelRoom: m("otel-odasi", 2000, 1333,
    "Çift kişilik yataklı, düzenli bir otel odası", "1631049307264-da0ec9d70304", "50% 50%"),
  warehouse: m("depo-raf-koridoru", 2000, 2667,
    "Yüksek raflarla dolu bir deponun koridoru", "1553413077-190dd305871c", "50% 50%"),
  warehouseTeam: m("depo-kontrol-ekibi", 2000, 1331,
    "Depo rafları arasında, biri reflektif yelekli ve elinde dosya olan iki çalışanın yürümesi", "1664382953403-fc1ac77073a0", "50% 45%"),
  factory: m("fabrika-uretim-hatti", 2000, 1334,
    "Geniş ve aydınlık bir fabrikada otomatik üretim hattı", "1717386255773-1e3037c81788", "50% 50%"),
  istanbulOrtakoy: m("istanbul-ortakoy-bogaz", 2000, 1125,
    "Deniz kıyısından görülen tarihi yarımada ve camiler", "1623439844752-524658b16ce6", "50% 50%"),
  istanbulGalata: m("istanbul-galata-panorama", 2000, 1333,
    "Gece ışıklarıyla İstanbul ve Boğaz köprüsü", "1518084823714-2f59a7315a39", "50% 50%"),
  istanbulMaidenTower: m("istanbul-kiz-kulesi-gun-batimi", 2000, 1333,
    "Gün batımında ışıkları yanan Kız Kulesi ve arka planda İstanbul silueti", "1636537511494-c3e558e0702b", "50% 60%"),
  istanbulOrtakoyReflection: m("istanbul-ortakoy-camii-yansima", 2000, 3000,
    "Ortaköy Camii ve Boğaziçi Köprüsünün sakin denizdeki yansıması", "1564407727371-3eece6c58961", "50% 40%"),
  housefly: m("karasinek-beyaz-zemin", 2000, 1500,
    "Beyaz zemin üzerinde duran karasinek", "1596296455028-bb216ae02ff7", "50% 50%"),
  spider: m("ev-orumcegi-pencere", 2000, 1333,
    "Pencere pervazında ağ kuran ince bacaklı bir ev örümceği", "1722554089277-887a14913a4f", "55% 60%"),
  /** Gümüş böceğinin doğrulanmış fotoğrafı yok: türün sevdiği nemli ortam gösterilir */
  silverfish: m("nemli-bodrum-camasirhane", 2000, 1333,
    "Gümüş böceğinin sık görüldüğü türden nemli bir bodrum çamaşırhanesi", "1646592474273-86049d4f3575", "50% 50%"),
} satisfies Record<string, MediaAsset>;

export type MediaKey = keyof typeof media;

/** Hizmet → kapak görseli */
export const serviceImage: Record<string, MediaKey> = {
  "bocek-ilaclama": "technicianHome",
  "hasere-kontrolu": "inspection",
  "hamam-bocegi-ilaclama": "cockroach",
  "fare-ve-kemirgen-kontrolu": "rat",
  "pire-ilaclama": "dogScratching",
  "tahta-kurusu-ilaclama": "bedBug",
  "karinca-ilaclama": "ants",
  "sivrisinek-kontrolu": "mosquito",
  "kene-kontrolu": "tick",
  "gumus-bocegi-kontrolu": "basementLaundry",
  "guve-kontrolu": "moth",
  "akrep-kontrolu": "scorpion",
  "ev-ilaclama": "livingRoom",
  "apartman-ve-bina-ilaclama": "apartments",
  "site-ilaclama": "residentialSite",
  "ofis-ilaclama": "office",
  "isyeri-ilaclama": "buildingExterior",
  "bahce-ve-acik-alan-kontrolu": "houseExterior",
  "bodrum-ve-ortak-alan-kontrolu": "basementStairs",
  "restoran-ve-kafe-pest-kontrol": "restaurantKitchen",
  "otel-ilaclama": "hotelRoom",
  "depo-ilaclama": "warehouse",
  "fabrika-ve-endustriyel-alan-kontrolu": "factory",
  "periyodik-pest-management": "warehouseTeam",
  "entegre-zararli-yonetimi": "surfaceHygiene",
};

export const blogImage: Record<string, MediaKey> = {
  "evde-hamam-bocegi-gorulmesinin-olasi-nedenleri": "cockroachFloor",
  "tahta-kurusu-belirtileri-nasil-anlasilir": "bedBug",
  "farelerin-yasam-alanina-girisini-onlemek": "mouse",
  "pire-sorununda-hangi-onlemler-alinabilir": "flea",
  "ilaclama-oncesinde-nelere-dikkat-edilmeli": "livingRoom",
  "profesyonel-hasere-kontrolu-nasil-planlanir": "inspection",
  "apartmanlarda-ortak-alan-hasere-kontrolu": "basementStairs",
  "restoranlarda-entegre-zararli-yonetimi": "restaurantKitchen",
  "yaz-aylarinda-sivrisinek-sorununu-azaltma": "mosquito",
  "ilaclama-hizmeti-secerken-hangi-belgelere-bakilmali": "surfaceHygiene",
};

export function serviceMedia(slug: string) {
  return media[serviceImage[slug] ?? "inspection"];
}
export function blogMedia(slug: string) {
  return media[blogImage[slug] ?? "inspection"];
}
