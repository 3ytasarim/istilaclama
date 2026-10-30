import "server-only";
import { whatsappLink } from "@/lib/contact";
import { buildWhatsappText, ruleAnswer } from "./engine";
import { loadKnowledge, norm, type Kb } from "./knowledge";
import { askOpenAI } from "./openai";
import type { AssistantReply, ChatTurn } from "./types";

/**
 * Doğrulanmamış iş bilgisi koruması — modelin talimata uymasına güvenmeden, sunucuda deterministik uygulanır.
 * (Test: model "7/24 hizmet sunuyoruz" diye uydurmuştu.)
 */
const HOURS_Q = /7\s*\/?\s*24|yedi\s*yirmi\s*dort|gece|hafta\s*sonu|pazar gunu|bayram|calisma saat|kacta|kaca kadar|acik misiniz|acil/;
const HOURS_CLAIM = /7\s*\/\s*24|7\s*24|24 saat|gece gunduz|her gun hizmet|hafta sonu da|tatil gunleri dahil/;
const PRICE_CLAIM = /\d[\d.,]*\s*(tl|lira|₺)|ucretsiz|bedava/;
const GUARANTEE = /garanti|%\s*100|yuzde yuz|kesin cozum|tamamen zararsiz|hic zarari yok/;

function hoursAnswer(kb: Kb) {
  return kb.facts.workingHours
    ? `Çalışma saatlerimiz: ${kb.facts.workingHours}. Talebinizi iletirseniz uygun zaman için size dönüş yapılır.`
    : "Çalışma saatlerimiz ve acil durum hizmet kapsamımız hakkında ekibimiz size net bilgi verecek. İsterseniz talebinizi hemen iletelim; size en kısa sürede dönüş yapılır.";
}

function guard(reply: Omit<AssistantReply, "whatsappHref">, message: string, kb: Kb) {
  const q = norm(message);
  const t = norm(reply.text);
  if (!kb.facts.workingHours && (HOURS_Q.test(q) || HOURS_CLAIM.test(t))) {
    return { ...reply, text: hoursAnswer(kb), quick: ["Talebimi iletmek istiyorum", ...reply.quick].slice(0, 4) };
  }
  if (GUARANTEE.test(q) || GUARANTEE.test(t)) {
    return {
      ...reply,
      text: "Sonuç; zararlının türüne, yoğunluğuna ve alanın yapısına bağlıdır. Bu yüzden önce inceleme yapıp yazılı bir uygulama planı hazırlıyor, gerekiyorsa takip ziyaretiyle sonucu birlikte değerlendiriyoruz. Garanti kapsamı ve koşulları hakkında ekibimiz teklif aşamasında net bilgi verir.",
      quick: ["Teklif almak istiyorum", ...reply.quick].slice(0, 4),
    };
  }
  if (PRICE_CLAIM.test(t)) {
    return {
      ...reply,
      text: "Fiyat; alanın büyüklüğüne, zararlı türüne ve yoğunluğuna göre değişir. Kısa bir ön değerlendirmeyle size özel teklif hazırlanır.",
      links: [{ label: "Teklif formu", href: "/teklif-al" }],
    };
  }
  return reply;
}

/** Hazırlanan WhatsApp mesajına standart giriş ekler (model eklemezse). */
function withGreeting(text: string, kb: Kb) {
  const intro = `Merhaba, ${kb.settings.businessName} web sitesi üzerinden yazıyorum.`;
  return norm(text).startsWith("merhaba") ? text : `${intro} ${text}`;
}

/** OpenAI varsa yapay zekâ (site verisine bağlı), yoksa/hata olursa kural motoru. Kullanıcı her durumda yanıt alır. */
export async function respond(message: string, history: ChatTurn[]): Promise<AssistantReply> {
  const kb = await loadKnowledge();
  const raw = (await askOpenAI(message, history, kb)) ?? ruleAnswer(message, history, kb);
  const reply = guard(raw, message, kb);
  const text = reply.stage === "handoff" ? withGreeting(reply.whatsappText ?? buildWhatsappText(kb), kb) : null;
  return { ...reply, whatsappText: text, whatsappHref: text ? whatsappLink(kb.settings, text) : null };
}
