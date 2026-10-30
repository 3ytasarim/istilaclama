// Unsplash (Unsplash License — ticari kullanım serbest) stok görsellerini indirir.
// Kullanım: node scripts/fetch-stock.mjs  → public/images/stock/<seo-ad>.jpg
import { mkdirSync, writeFileSync, existsSync } from "node:fs";

const OUT = "public/images/stock";
mkdirSync(OUT, { recursive: true });

export const STOCK = {
  "ilaclama-teknisyeni-koruyucu-kiyafet-ev-ici": "1742483359033-13315b247c74",
  "koruyucu-tulum-sirt-pulverizator-koridor": "1636791013127-37effd526316",
  "teknisyen-duvar-kosesi-uygulama": "1669101283107-b32aab60587a",
  "teknisyen-tablet-alan-incelemesi": "1669101283561-642d16d924ba",
  "koruyucu-maskeli-bahce-uygulamasi": "1600092965062-2b0fd76ade11",
  "bina-disi-ilaclama-uygulamasi": "1783753445341-6e8571478579",
  "ev-disi-sirt-pulverizatoru": "1670989292166-8b20b9530438",
  "hamam-bocegi-yakin-cekim": "1611773236409-f3ee161007a1",
  "hamam-bocegi-tas-zemin": "1759379077720-b099c6cf2f71",
  "fare-tahta-altinda": "1575378064390-5a323bbac5d7",
  "fare-ahsap-uzerinde": "1624116518496-993146f67f4a",
  "kopek-kasinma-pire-belirtisi": "1780053550954-7c291e1e9eb1",
  "pire-mikroskobik-gorunum": "1574342467132-e25a78ed99b8",
  "tahta-kurusu-yakin-cekim": "1729294428628-6d97177fd053",
  "karinca-kolonisi": "1592331753290-91e0de78233f",
  "sivrisinek-cilt-uzerinde": "1707943768453-7850f916ebde",
  "kene-cilt-uzerinde": "1696006985991-876279342017",
  "guve-kanat-yakin-cekim": "1602244535576-d723f1bb59a0",
  "akrep-kaya-uzerinde": "1618479995657-6e2fbb7d5480",
  "nemli-bodrum-camasirhane": "1646592474273-86049d4f3575",
  "bodrum-kati-merdiven-tugla": "1604997266148-a2640dce04c6",
  "aydinlik-ev-salonu": "1628592102751-ba83b0314276",
  "apartman-bloklari": "1612637968894-660373e23b03",
  "havuzlu-konut-sitesi": "1580041065738-e72023775cdc",
  "acik-ofis-calisma-alani": "1556761175-4b46a572b786",
  "restoran-mutfagi-sef": "1622021142947-da7dedc7c39a",
  "otel-odasi": "1631049307264-da0ec9d70304",
  "depo-raf-koridoru": "1553413077-190dd305871c",
  "depo-kontrol-ekibi": "1664382953403-fc1ac77073a0",
  "fabrika-uretim-hatti": "1717386255773-1e3037c81788",
  "istanbul-ortakoy-bogaz": "1623439844752-524658b16ce6",
  "istanbul-galata-panorama": "1518084823714-2f59a7315a39",
  "istanbul-kiz-kulesi-gun-batimi": "1636537511494-c3e558e0702b",
  "istanbul-ortakoy-camii-yansima": "1564407727371-3eece6c58961",
  "karasinek-beyaz-zemin": "1596296455028-bb216ae02ff7",
  "ev-orumcegi-pencere": "1722554089277-887a14913a4f",
};

for (const [name, id] of Object.entries(STOCK)) {
  const file = `${OUT}/${name}.jpg`;
  if (existsSync(file)) continue;
  const res = await fetch(`https://images.unsplash.com/photo-${id}?w=2000&q=82&fm=jpg&fit=max`);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  writeFileSync(file, Buffer.from(await res.arrayBuffer()));
  console.log("✓", name);
}
