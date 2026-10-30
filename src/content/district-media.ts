import { media, type MediaAsset } from "@/content/media";
import type { IstanbulSide } from "@/types/content";

/**
 * İlçe fotoğrafları — Unsplash (Unsplash License). Konumlar Unsplash konum etiketinden doğrulandı.
 * Doğrulanmış fotoğrafı olmayan ilçelerde yakasına göre genel İstanbul görseli kullanılır;
 * alt metin o ilçeymiş gibi yazılmaz.
 */
const d = (file: string, width: number, height: number, alt: string, id: string, focus = "50% 50%"): MediaAsset => ({
  src: `/images/districts/${file}.jpg`,
  width,
  height,
  alt,
  focus,
  source: `https://unsplash.com/photos/${id}`,
});

const OWN: Record<string, MediaAsset> = {
  adalar: d("adalar-buyukada-iskele", 2000, 2667, "Büyükada'da iskeleye bağlı küçük tekneler", "1664817515313-3271fec74bd6", "50% 60%"),
  atasehir: d("atasehir-yuksek-binalar", 2000, 1333, "Ataşehir'in yüksek binaları ve otoyol bağlantılarının havadan görünümü", "1683489158921-0aaca3ee55d1"),
  avcilar: d("avcilar-ambarli-tekneler", 2000, 1500, "Avcılar Ambarlı kıyısında sakin denizde tekneler", "1632467995568-045e172d671c"),
  basaksehir: d("basaksehir-basak-mahallesi", 2000, 2667, "Başakşehir Başak Mahallesi'nde mavi gökyüzü altında bir caminin minareleri", "1696628749598-c562455dedd8", "50% 40%"),
  besiktas: d("besiktas-dolmabahce", 2000, 2667, "Beşiktaş Dolmabahçe kıyısından bulutlu havada Boğaz", "1586732874084-3b03bcdf9a3d"),
  beykoz: d("beykoz-sahil", 2000, 3000, "Beykoz sahilinde Türk bayraklı bir tekne ve karşıda yeşil Boğaz kıyısı", "1714602755902-8b7a954602b1", "50% 65%"),
  beyoglu: d("beyoglu-galata-kulesi", 2000, 1333, "Denizden Beyoğlu silueti ve Galata Kulesi", "1587069892258-09d115d1b464"),
  buyukcekmece: d("buyukcekmece-gun-batimi", 2000, 1126, "Büyükçekmece'de gün batımında su kenarından şehir silueti", "1640726799106-a467e0d1d2df"),
  catalca: d("catalca-orman-dere", 2000, 3000, "Çatalca'da ormanın içinden akan küçük bir dere", "1699323842507-7a967fafae11", "50% 60%"),
  eyupsultan: d("eyupsultan-cami-gun-batimi", 2000, 2000, "Gün batımında Eyüpsultan'da cami ve çevresindeki yapılar", "1755982182609-0838b58b7e88"),
  fatih: d("fatih-eminonu-vapur", 2000, 1333, "Eminönü önünde vapur ve arka planda tarihî yarımada silueti", "1614714228750-91d367ecb096"),
  gaziosmanpasa: d("gaziosmanpasa-venezia", 2000, 2667, "Gaziosmanpaşa'da kanal çevresinde yüksek binalar", "1734126060376-1cdeff0fa901"),
  kadikoy: d("kadikoy-kalamis-gun-batimi", 2000, 3556, "Kadıköy Kalamış'ta gün batımında marina ve tekneler", "1752272140468-870fad593d5e", "50% 55%"),
  kartal: d("kartal-sahil", 2000, 959, "Kartal sahilinde kayalıklar ve Marmara Denizi", "1566399305030-dfc7e84e95be"),
  kucukcekmece: d("kucukcekmece-iskele", 2000, 1500, "Küçükçekmece'de su üzerine uzanan ahşap iskele", "1646687777911-713cefbbd883"),
  maltepe: d("maltepe-marmara-sahili", 2000, 1500, "Maltepe'de Marmara kıyısına uzanan su kanalı ve sahil yürüyüş yolu", "1604854877010-b14a7bd77fe5"),
  sariyer: d("sariyer-belgrad-ormani", 2000, 1333, "Sarıyer Belgrad Ormanı'nda ağaç dalları arasından gökyüzü", "1598962277067-f13ebd6cfdca"),
  sile: d("sile-karadeniz", 2000, 2667, "Şile'de Karadeniz kıyısındaki kayalık burun ve bulutlu gökyüzü", "1694017698020-47772b9bfd7a"),
  silivri: d("silivri-danamandira", 2000, 1333, "Silivri Danamandıra'da gün batımında uzun otlar ve ağaç", "1637610680212-46d3fbf37b78"),
  sisli: d("sisli-tesvikiye-camii", 2000, 3000, "Şişli Teşvikiye Camii'nin gece aydınlatılmış minaresi", "1710763045129-0f0e84e25105", "50% 35%"),
  umraniye: d("umraniye-yuksek-binalar", 2000, 1500, "Ümraniye'de bulutlu gökyüzü altında yüksek binalar", "1684270130497-75e3f8b0ebfc"),
  uskudar: d("uskudar-kiz-kulesi", 2000, 1333, "Üsküdar açıklarında Kız Kulesi ve Boğaz", "1741013243242-76706d47496e"),
};

const FALLBACK: Record<IstanbulSide, MediaAsset[]> = {
  anadolu: [
    d("istanbul-camlica-havadan", 2000, 3000, "Çamlıca'dan Boğaz Köprüsü ve İstanbul silueti", "1621873129944-8d88a5328a0c", "50% 45%"),
    media.istanbulMaidenTower,
  ],
  avrupa: [media.istanbulGalata, media.istanbulOrtakoy, media.istanbulOrtakoyReflection],
};

export function districtMedia(slug: string, side: IstanbulSide, index: number): { asset: MediaAsset; own: boolean } {
  const own = OWN[slug];
  if (own) return { asset: own, own: true };
  const list = FALLBACK[side];
  return { asset: list[index % list.length]!, own: false };
}
