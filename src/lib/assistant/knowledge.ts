import "server-only";
import { serviceDetails } from "@/content/service-details";
import { verified } from "@/lib/contact";
import { getSiteSettings, listDistricts, listFaq, listServices } from "@/server/content";

/** Türkçe duyarlı sadeleştirme (ı/İ, aksanlar) — eşleştirme için. */
export const norm = (s: string) =>
  s.toLocaleLowerCase("tr").replace(/ı/g, "i").normalize("NFKD").replace(/[̀-ͯ]/g, "");

export type Kb = Awaited<ReturnType<typeof loadKnowledge>>;

/** Asistanın dayanabileceği TEK bilgi kaynağı: sitenin kendi içeriği + yalnız doğrulanmış işletme bilgisi. */
export async function loadKnowledge() {
  const [settings, services, districts, faq] = await Promise.all([
    getSiteSettings(),
    listServices(),
    listDistricts(),
    listFaq(),
  ]);
  return {
    settings,
    services: services.map((s) => ({ slug: s.slug, title: s.title, excerpt: s.excerpt, summary: serviceDetails[s.slug]?.summary })),
    districts: districts.map((d) => ({ slug: d.slug, name: d.name, side: d.side })),
    faq,
    facts: {
      phone: verified(settings.phone),
      whatsapp: verified(settings.whatsapp),
      email: verified(settings.email),
      workingHours: verified(settings.workingHours),
      address: verified(settings.address),
    },
  };
}

export function kbContext(kb: Kb): string {
  const f = kb.facts;
  const unknown = "DOĞRULANMADI — kesin bilgi verme, ekibin teyit edeceğini söyle";
  return [
    `FİRMA: ${kb.settings.businessName} (istilaclama.com.tr) — İstanbul'da ev ve iş yerleri için planlı haşere kontrolü. Yaklaşım: önce inceleme, yazılı uygulama planı, ürün etiketine uygun uygulama, takip.`,
    `ÇALIŞMA SAATLERİ / 7-24 HİZMET: ${f.workingHours ?? unknown}`,
    `TELEFON: ${f.phone ?? unknown} | E-POSTA: ${f.email ?? unknown} | ADRES: ${f.address ?? "fiziksel adres bilgisi paylaşılmadı"}`,
    `FİYAT: Sabit fiyat yok; alan büyüklüğü, zararlı türü ve yoğunluğa göre inceleme sonrası teklif verilir.`,
    `HİZMETLER (slug | ad | özet):\n${kb.services.map((s) => `- ${s.slug} | ${s.title} | ${s.summary ?? s.excerpt}`).join("\n")}`,
    `İLÇELER (slug | ad | yaka): ${kb.districts.map((d) => `${d.slug}|${d.name}|${d.side}`).join(", ")}`,
    `SSS:\n${kb.faq.map((q) => `S: ${q.question} C: ${q.answer}`).join("\n")}`,
    `SAYFALAR: /hizmetlerimiz, /hizmetlerimiz/<slug>, /hizmet-bolgeleri, /hizmet-bolgeleri/istanbul/<ilce-slug>, /teklif-al, /iletisim, /sik-sorulan-sorular, /blog`,
  ].join("\n\n");
}

const SERVICE_KEYWORDS: [string, string[]][] = [
  ["hamam-bocegi-ilaclama", ["hamam bocegi", "hamambocegi", "kalorifer bocegi", "alman bocegi"]],
  ["fare-ve-kemirgen-kontrolu", ["fare", "sican", "kemirgen", "rat"]],
  ["tahta-kurusu-ilaclama", ["tahta kurusu", "tahtakurusu", "yatak bocegi"]],
  ["pire-ilaclama", ["pire"]],
  ["karinca-ilaclama", ["karinca"]],
  ["sivrisinek-kontrolu", ["sivrisinek", "sinek"]],
  ["kene-kontrolu", ["kene"]],
  ["gumus-bocegi-kontrolu", ["gumus bocegi", "gumusbocegi"]],
  ["guve-kontrolu", ["guve"]],
  ["akrep-kontrolu", ["akrep"]],
  ["restoran-ve-kafe-pest-kontrol", ["restoran", "kafe", "cafe", "lokanta"]],
  ["otel-ilaclama", ["otel", "pansiyon"]],
  ["depo-ilaclama", ["depo", "antrepo"]],
  ["fabrika-ve-endustriyel-alan-kontrolu", ["fabrika", "uretim tesisi"]],
  ["ofis-ilaclama", ["ofis", "buro"]],
  ["apartman-ve-bina-ilaclama", ["apartman", "bina"]],
  ["site-ilaclama", ["site yonetimi", "sitemiz"]],
  ["ev-ilaclama", ["evde", "evim", "daire", "evimde"]],
];

export function detectService(text: string, kb: Kb): string | null {
  const t = norm(text);
  for (const [slug, words] of SERVICE_KEYWORDS) {
    if (words.some((w) => t.includes(w)) && kb.services.some((s) => s.slug === slug)) return slug;
  }
  return null;
}

export function detectDistrict(text: string, kb: Kb): string | null {
  const t = ` ${norm(text).replace(/[^a-z0-9 ]/g, " ")} `;
  // Uzun adlar önce (ör. "Küçükçekmece" "Çekmeköy"den önce)
  const sorted = [...kb.districts].sort((a, b) => b.name.length - a.name.length);
  for (const d of sorted) {
    if (t.includes(` ${norm(d.name)}`)) return d.slug;
  }
  return null;
}
