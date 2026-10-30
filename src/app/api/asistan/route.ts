import { createHash } from "node:crypto";
import { headers } from "next/headers";
import { z } from "zod";
import { respond } from "@/lib/assistant/respond";
import { rateLimited } from "@/lib/security/rate-limit";

const body = z.object({
  message: z.string().trim().min(1).max(500),
  history: z
    .array(z.object({ role: z.enum(["user", "assistant"]), text: z.string().max(1500) }))
    .max(12)
    .optional(),
});

export async function POST(req: Request) {
  const parsed = body.safeParse(await req.json().catch(() => null));
  if (!parsed.success) return Response.json({ error: "Mesaj 1–500 karakter olmalı." }, { status: 400 });

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  const key = createHash("sha256").update(`asistan:${ip}`).digest("hex").slice(0, 32);
  if (rateLimited(key, 30, 10 * 60_000)) {
    return Response.json(
      { text: "Kısa sürede çok fazla mesaj gönderdiniz. Lütfen birkaç dakika sonra tekrar deneyin.", links: [], quick: [], stage: "chat", whatsappText: null, whatsappHref: null, ai: false },
      { status: 429 },
    );
  }
  try {
    return Response.json(await respond(parsed.data.message, parsed.data.history ?? []), { headers: { "Cache-Control": "no-store" } });
  } catch (e) {
    console.error("[asistan]", (e as Error)?.message);
    return Response.json({
      text: "Şu an yanıt veremiyorum. Teklif formu üzerinden bize ulaşabilirsiniz.",
      links: [{ label: "Teklif formu", href: "/teklif-al" }],
      quick: [], stage: "chat", whatsappText: null, whatsappHref: null, ai: false,
    });
  }
}
