// İlçe fotoğrafları (Unsplash License). Konumları Unsplash konum etiketinden doğrulandı.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
const OUT = "public/images/districts";
mkdirSync(OUT, { recursive: true });
export const DISTRICT_PHOTOS = {
  "adalar-buyukada-iskele": "1664817515313-3271fec74bd6",
  "atasehir-yuksek-binalar": "1683489158921-0aaca3ee55d1",
  "avcilar-ambarli-tekneler": "1632467995568-045e172d671c",
  "basaksehir-basak-mahallesi": "1696628749598-c562455dedd8",
  "besiktas-dolmabahce": "1586732874084-3b03bcdf9a3d",
  "beykoz-sahil": "1714602755902-8b7a954602b1",
  "beyoglu-galata-kulesi": "1587069892258-09d115d1b464",
  "buyukcekmece-gun-batimi": "1640726799106-a467e0d1d2df",
  "catalca-orman-dere": "1699323842507-7a967fafae11",
  "eyupsultan-cami-gun-batimi": "1755982182609-0838b58b7e88",
  "fatih-eminonu-vapur": "1614714228750-91d367ecb096",
  "gaziosmanpasa-venezia": "1734126060376-1cdeff0fa901",
  "kadikoy-kalamis-gun-batimi": "1752272140468-870fad593d5e",
  "kartal-sahil": "1566399305030-dfc7e84e95be",
  "kucukcekmece-iskele": "1646687777911-713cefbbd883",
  "maltepe-marmara-sahili": "1604854877010-b14a7bd77fe5",
  "pendik-deniz": "1610204057254-d18eec5e3529",
  "sariyer-belgrad-ormani": "1598962277067-f13ebd6cfdca",
  "silivri-danamandira": "1637610680212-46d3fbf37b78",
  "sile-karadeniz": "1694017698020-47772b9bfd7a",
  "sisli-tesvikiye-camii": "1710763045129-0f0e84e25105",
  "umraniye-yuksek-binalar": "1684270130497-75e3f8b0ebfc",
  "uskudar-kiz-kulesi": "1741013243242-76706d47496e",
  "istanbul-camlica-havadan": "1621873129944-8d88a5328a0c",
};
for (const [name, id] of Object.entries(DISTRICT_PHOTOS)) {
  const file = `${OUT}/${name}.jpg`;
  if (existsSync(file)) continue;
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2000&q=82&fm=jpg&fit=max`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
}
console.log("ok");
