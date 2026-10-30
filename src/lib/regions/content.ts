import "server-only";
import { DATA_SOURCE, heightProfile, stockProfile, type BuildingStats, type Neighbourhood } from "./data";

/* ───────── Türkçe ek yardımcıları ───────── */
const VOWELS = "aeıioöuüAEIİOÖUÜ";
const BACK = "aıouAIOU";
const HARD = "fstkçşhpFSTKÇŞHP";

function lastVowel(word: string) {
  for (let i = word.length - 1; i >= 0; i--) if (VOWELS.includes(word[i]!)) return word[i]!;
  return "e";
}
/** Bulunma eki: Kadıköy'de, Tuzla'da, Beşiktaş'ta, Esenyurt'ta */
export function loc(name: string) {
  const last = name[name.length - 1]!;
  const a = BACK.includes(lastVowel(name)) ? "a" : "e";
  const d = HARD.includes(last) ? "t" : "d";
  return `${name}'${d}${a}`;
}
/** Ayrılma eki: Kadıköy'den, Tuzla'dan, Beşiktaş'tan */
export function abl(name: string) {
  const last = name[name.length - 1]!;
  const a = BACK.includes(lastVowel(name)) ? "a" : "e";
  const d = HARD.includes(last) ? "t" : "d";
  return `${name}'${d}${a}n`;
}

const n = (x: number) => x.toLocaleString("tr-TR");
/** Slug'a bağlı, deterministik varyant seçimi (aynı sayfa hep aynı metni üretir). */
function pick<T>(seed: string, list: T[]): T {
  let h = 0;
  for (const c of seed) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return list[h % list.length]!;
}

/* ───────── İlçe ───────── */
export function districtStatsText(name: string, s: BuildingStats & { count: number }) {
  return `${DATA_SOURCE.label.split(" — ")[0]} verilerine (${DATA_SOURCE.year}) göre ${loc(name)} ${s.count} mahallede toplam ${n(s.total)} bina bulunuyor. Binaların %${s.agePct[0]}'i 1980 öncesinde, %${s.agePct[1]}'i 1980–2000 arasında, %${s.agePct[2]}'i ise 2000 sonrasında inşa edilmiş; yapıların %${s.floorPct[0]}'i 1–4 katlı.`;
}

export function districtSeoText(name: string, slug: string) {
  return pick(slug, [
    `İST İlaçlama, ${loc(name)} ev, apartman, site ve iş yerleri için planlı haşere kontrolü hizmeti sunar. ${name} böcek ilaçlama, hamam böceği, fare ve kemirgen kontrolü, tahta kurusu ve pire uygulamaları için önce alanı inceler, ardından yazılı bir uygulama planı hazırlar. ${name} ilaçlama talepleriniz için teklif formunu doldurabilir veya bize yazabilirsiniz.`,
    `${name} ilaçlama ihtiyaçlarında İST İlaçlama; zararlının türünü ve kaynağını tespit ederek alana uygun yöntemi belirler. ${loc(name)} konutlar için ev ilaçlama, apartman ve site yönetimleri için ortak alan programları, restoran, otel ve depolar için periyodik pest kontrol hizmetleri planlanır.`,
    `İST İlaçlama olarak ${name} haşere kontrolü hizmetlerimizde ürün etiket talimatlarına uygun uygulama ve takip ziyaretini esas alıyoruz. ${loc(name)} hamam böceği ilaçlama, karınca ve sivrisinek kontrolü ile kemirgen izleme için bölgenize özel plan hazırlıyoruz.`,
  ]);
}

/* ───────── Mahalle ───────── */
const AGE_LABEL = ["1980 öncesi", "1980–2000 arası", "2000 sonrası"];
const FLOOR_LABEL = ["1–4 katlı", "5–9 katlı", "10 kat ve üzeri"];

export function neighbourhoodIntro(m: Neighbourhood, districtName: string) {
  const dominantAge = m.agePct.indexOf(Math.max(...m.agePct));
  const dominantFloor = m.floorPct.indexOf(Math.max(...m.floorPct));
  return `${m.name} Mahallesi, İstanbul'un ${districtName} ilçesine bağlı bir mahalledir. ${DATA_SOURCE.label.split(" — ")[0]} verilerine (${DATA_SOURCE.year}) göre mahallede ${n(m.total)} bina bulunur; yapı stokunun en büyük bölümü (%${m.agePct[dominantAge]}) ${AGE_LABEL[dominantAge]} dönemde inşa edilmiştir ve binaların çoğunluğu (%${m.floorPct[dominantFloor]}) ${FLOOR_LABEL[dominantFloor]} yapılardan oluşur.`;
}

export function neighbourhoodComparison(m: Neighbourhood, d: BuildingStats & { count: number }, districtName: string) {
  const oldDiff = m.agePct[0] - d.agePct[0];
  const newDiff = m.agePct[2] - d.agePct[2];
  const size =
    m.rank <= 3
      ? `bina sayısı bakımından ${districtName} ilçesinin en büyük ${m.rank === 1 ? "mahallesidir" : `${m.rank}. mahallesidir`}`
      : m.rank > d.count - 3
        ? `${districtName} ilçesinin bina sayısı en az olan mahalleleri arasındadır`
        : `bina sayısı bakımından ${districtName} ilçesindeki ${d.count} mahalle arasında ${m.rank}. sıradadır`;
  const age =
    oldDiff >= 8
      ? `yapı stoku ilçe ortalamasına göre belirgin biçimde daha eskidir (1980 öncesi bina oranı ilçede %${d.agePct[0]}, mahallede %${m.agePct[0]})`
      : newDiff >= 8
        ? `yapı stoku ilçe ortalamasına göre daha yenidir (2000 sonrası bina oranı ilçede %${d.agePct[2]}, mahallede %${m.agePct[2]})`
        : `yapı yaşı dağılımı ilçe ortalamasına yakındır`;
  return `${m.name}, ${size}; ${age}.`;
}

export function neighbourhoodPestAdvice(m: Neighbourhood) {
  const sp = stockProfile(m);
  const hp = heightProfile(m);
  const parts: string[] = [];
  if (sp === "eski")
    parts.push(
      "Eski yapılarda tesisat boşlukları, bodrumlar ve ahşap detaylar hamam böceği ve kemirgenler için saklanma alanı oluşturabilir; bu nedenle uygulama planında ıslak hacimler, tesisat geçişleri ve bodrumlar önceliklidir.",
    );
  if (sp === "yeni")
    parts.push(
      "Yeni yapı ağırlıklı bölgelerde haşere sorunları çoğunlukla ortak alanlar, otoparklar ve çöp odaları üzerinden başlar; site ve apartman yönetimiyle planlanan periyodik kontroller kalıcılığı artırır.",
    );
  if (sp === "karma")
    parts.push(
      "Eski ve yeni yapıların bir arada bulunduğu mahallelerde her binanın ihtiyacı farklıdır; eski binalarda tesisat ve bodrum, yeni binalarda ortak alanlar odaklı bir plan izlenir.",
    );
  if (hp === "yuksek")
    parts.push(
      "Çok katlı binalarda tesisat şaftları ve çöp hatları haşerelerin katlar arasında taşınmasına aracılık edebilir; tek daire yerine bina ölçeğinde uygulama daha etkili sonuç verir.",
    );
  if (hp === "alcak")
    parts.push(
      "Az katlı ve bahçeli yapıların yoğun olduğu bölgelerde karınca, kemirgen ve mevsimsel sivrisinek şikâyetleri öne çıkar; bahçe ve bina çevresi de plana dahil edilmelidir.",
    );
  if (hp === "orta")
    parts.push(
      "Orta katlı apartmanlarda bodrum, sığınak ve merdiven boşlukları gibi ortak alanlar düzenli kontrol edilmesi gereken başlıca noktalardır.",
    );
  return parts;
}

export function neighbourhoodFaq(m: Neighbourhood, districtName: string) {
  const sp = stockProfile(m);
  return [
    {
      q: `${m.name} Mahallesi'nde ilaçlama hizmeti veriyor musunuz?`,
      a: `${m.name}, ${districtName} ilçesine bağlıdır. Hizmet kapsamı ve uygun randevu zamanı için teklif formunu doldurabilir veya WhatsApp üzerinden bize yazabilirsiniz; talebiniz incelenerek size dönüş yapılır.`,
    },
    {
      q: `${m.name} Mahallesi'nde en sık hangi haşere sorunları görülür?`,
      a:
        sp === "eski"
          ? "Yapı stokunun önemli bir bölümü eski olduğundan tesisat ve bodrum kaynaklı hamam böceği, kemirgen ve pire sorunları sık karşılaşılan başlıklardır. Kesin tespit yerinde inceleme ile yapılır."
          : sp === "yeni"
            ? "Yeni yapıların ağırlıkta olduğu bölgelerde ortak alanlar, çöp odaları ve otoparklar kaynaklı hamam böceği ve kemirgen sorunları öne çıkar. Kesin tespit yerinde inceleme ile yapılır."
            : "Eski ve yeni yapıların bir arada olması nedeniyle sorunlar binadan binaya değişir; hamam böceği, karınca ve kemirgen en sık karşılaşılan başlıklardır. Kesin tespit yerinde inceleme ile yapılır.",
    },
    {
      q: "Apartmanın tamamı için uygulama yapılabilir mi?",
      a: "Evet. Tesisat ve ortak alanlar paylaşıldığında bina ölçeğinde planlama daha kalıcı sonuç verir; apartman veya site yönetimiyle birlikte takvimli bir program hazırlanabilir.",
    },
  ];
}

export function neighbourhoodSeoText(m: Neighbourhood, districtName: string) {
  return pick(m.slug + m.districtSlug, [
    `İST İlaçlama, ${m.name} Mahallesi'nde ev, apartman ve iş yerleri için planlı haşere kontrolü hizmeti sunar. ${m.name} böcek ilaçlama, hamam böceği ilaçlama ve fare kontrolü taleplerinizde önce alanı inceler, ${districtName} ve çevresindeki yapı özelliklerine uygun bir uygulama planı hazırlarız.`,
    `${m.name} ilaçlama ihtiyaçlarınız için İST İlaçlama; zararlının türünü ve kaynağını tespit ederek alana uygun yöntemi belirler. ${districtName} ${m.name} Mahallesi'ndeki konutlar, apartman ortak alanları ve işletmeler için takip ziyaretli programlar planlanır.`,
    `${districtName} ilçesine bağlı ${m.name} Mahallesi'nde İST İlaçlama olarak hamam böceği, karınca, pire, tahta kurusu ve kemirgen kontrolünde ürün etiket talimatlarına uygun uygulama ve yazılı plan esasıyla çalışıyoruz.`,
    `${m.name} Mahallesi böcek ilaçlama ve haşere kontrolü için İST İlaçlama'ya teklif formu veya WhatsApp üzerinden ulaşabilirsiniz. ${districtName} genelinde ev, site ve iş yerleri için ihtiyaca göre planlanan uygulamalar sunuyoruz.`,
  ]);
}

export { AGE_LABEL, FLOOR_LABEL };
