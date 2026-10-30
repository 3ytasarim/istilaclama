import "server-only";
import { detectDistrict, detectService, norm, type Kb } from "./knowledge";
import type { AssistantReply, ChatTurn } from "./types";

/**
 * Kural tabanlı yedek motor — OpenAI anahtarı yoksa veya hata/zaman aşımı olursa devreye girer.
 * Aynı akışı (zararlı → ilçe → iletişim → WhatsApp) basit anahtar kelimelerle yürütür.
 */
export function ruleAnswer(message: string, history: ChatTurn[], kb: Kb): Omit<AssistantReply, "whatsappHref"> {
  const all = [...history.map((h) => h.text), message].join(" \n ");
  const t = norm(message);
  const service = detectService(all, kb);
  const district = detectDistrict(all, kb);
  const serviceTitle = kb.services.find((s) => s.slug === service)?.title;
  const districtName = kb.districts.find((d) => d.slug === district)?.name;
  const base = { ai: false, quick: [] as string[], links: [] as AssistantReply["links"], whatsappText: null };

  if (/7\s*\/?\s*24|gece|hafta sonu|pazar|calisma saat|kacta|acik mi/.test(t)) {
    const h = kb.facts.workingHours;
    return {
      ...base,
      stage: "chat",
      text: h
        ? `Çalışma saatlerimiz: ${h}. Acil durumlar için WhatsApp'tan yazabilirsiniz.`
        : "Çalışma saatlerimiz ve acil hizmet kapsamımız için ekibimiz size net bilgi verecek. Talebinizi iletirseniz en kısa sürede dönüş yapılır.",
      quick: ["Teklif almak istiyorum"],
    };
  }
  if (/fiyat|ucret|kac para|ne kadar/.test(t)) {
    return {
      ...base,
      stage: "chat",
      text: "Fiyat; alanın büyüklüğüne, zararlı türüne ve yoğunluğuna göre değişir. Kısa bir ön değerlendirmeyle size özel teklif hazırlanır.",
      quick: ["Teklif almak istiyorum"],
      links: [{ label: "Teklif formu", href: "/teklif-al" }],
    };
  }

  const lastBot = norm([...history].reverse().find((h) => h.role === "assistant")?.text ?? "");
  const looksLikeContact = /[a-zçğıöşü]{2,}\s+[a-zçğıöşü]{2,}/i.test(message) && lastBot.includes("adiniz");

  if (looksLikeContact || (lastBot.includes("adiniz") && message.trim().length > 2)) {
    const text = buildWhatsappText(kb, serviceTitle, districtName, message.trim());
    return {
      ...base,
      stage: "handoff",
      text: "Teşekkürler! Mesajınızı hazırladım. Aşağıdaki butona bastığınızda WhatsApp açılır; gönder'e dokunmanız yeterli, ilgili ekibimiz en kısa sürede dönüş yapacak.",
      whatsappText: text,
    };
  }

  if (service && !district) {
    const s = kb.services.find((x) => x.slug === service);
    return {
      ...base,
      stage: "ask_location",
      text: `${s?.summary ?? s?.excerpt ?? ""} Kalıcı sonuç için profesyonel bir inceleme öneririz. Hangi ilçedesiniz?`,
      links: s ? [{ label: s.title, href: `/hizmetlerimiz/${s.slug}` }] : [],
      quick: ["Kadıköy", "Üsküdar", "Ataşehir", "Tuzla"],
    };
  }
  if (district) {
    return {
      ...base,
      stage: "ask_contact",
      text: `${districtName} için yardımcı olabiliriz. Size dönüş yapabilmemiz için adınızı ve soyadınızı yazar mısınız?`,
      links: [{ label: `${districtName} bölge sayfası`, href: `/hizmet-bolgeleri/istanbul/${district}` }],
    };
  }
  return {
    ...base,
    stage: "chat",
    text: "Size nasıl yardımcı olabilirim? Gördüğünüz zararlıyı (ör. karınca, hamam böceği, fare) ve bulunduğunuz ilçeyi yazarsanız yönlendireyim.",
    quick: ["Evde karınca var", "Hamam böceği gördüm", "7/24 hizmet var mı?", "Fiyatlar nasıl belirleniyor?"],
  };
}

export function buildWhatsappText(kb: Kb, service?: string, district?: string, contact?: string) {
  return [
    `Merhaba, ${kb.settings.businessName} web sitesi üzerinden yazıyorum.`,
    service && `Hizmet: ${service}.`,
    district && `Bölge: ${district}.`,
    contact && `İletişim: ${contact}.`,
    "Bilgi ve teklif almak istiyorum.",
  ]
    .filter(Boolean)
    .join(" ");
}
