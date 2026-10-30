export type ChatTurn = { role: "user" | "assistant"; text: string };

export type AssistantStage = "chat" | "ask_location" | "ask_contact" | "handoff";

export interface AssistantReply {
  text: string;
  links: { label: string; href: string }[];
  quick: string[];
  stage: AssistantStage;
  /** Kullanıcının WhatsApp'tan göndereceği hazır mesaj (handoff aşamasında). */
  whatsappText: string | null;
  /** Doğrulanmış işletme numarası varsa wa.me bağlantısı; yoksa null. */
  whatsappHref: string | null;
  ai: boolean;
}
