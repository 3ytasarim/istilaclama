"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowUp, Check, Copy, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AssistantReply, ChatTurn } from "@/lib/assistant/types";

type Msg = {
  id: number;
  from: "bot" | "user";
  text: string;
  links?: AssistantReply["links"];
  quick?: string[];
  whatsappText?: string | null;
  whatsappHref?: string | null;
};

const STORE = "ist_ai_v1";
const AUTO_KEY = "ist_ai_auto";
const AUTO_DELAY = 4000;
const WELCOME: Msg = {
  id: 0,
  from: "bot",
  text: "Merhaba, ben istilaclamaAI. Haşere sorunları, hizmetlerimiz ve süreç hakkında sorularınızı yanıtlayabilirim. Size nasıl yardımcı olayım?",
  quick: ["Evde karınca var, ne yapmalıyım?", "Hamam böceği gördüm", "7/24 hizmet var mı?", "Fiyatlar nasıl belirleniyor?"],
};

const read = () => {
  try {
    return JSON.parse(window.sessionStorage.getItem(STORE) ?? "null") as Msg[] | null;
  } catch {
    return null;
  }
};
const write = (m: Msg[]) => {
  try {
    window.sessionStorage.setItem(STORE, JSON.stringify(m.slice(-30)));
  } catch {}
};

/** Böcek ikonu (marka ikon setinden PNG, maske ile beyaza boyanır). */
function BugIcon({ className }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block bg-current", className)}
      style={{
        WebkitMaskImage: "url(/images/icons/pest/bocek-yasak.png)",
        maskImage: "url(/images/icons/pest/bocek-yasak.png)",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
      }}
    />
  );
}

export function AssistantWidget({ whatsapp }: { whatsapp: string | null }) {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);
  const [teaser, setTeaser] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  const nextId = useRef(1);
  const autoOpened = useRef(false);

  // Oturum içi sohbeti geri yükle
  useEffect(() => {
    const t = window.setTimeout(() => {
      const saved = read();
      if (saved?.length) {
        setMsgs(saved);
        nextId.current = Math.max(...saved.map((m) => m.id)) + 1;
      }
    }, 0);
    return () => window.clearTimeout(t);
  }, []);

  // 4 sn sonra kendiliğinden aç (oturum başına bir kez). Mobilde tam ekran panel yerine karşılama balonu.
  useEffect(() => {
    let done = false;
    try {
      done = window.sessionStorage.getItem(AUTO_KEY) === "1";
    } catch {}
    // Form sayfalarında kendiliğinden açılma (kullanıcının yazdığı alanı bölmesin)
    if (done || window.location.pathname.startsWith("/teklif-al")) return;
    const t = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(AUTO_KEY, "1");
      } catch {}
      // Kullanıcı o sırada bir alana yazıyorsa paneli açma; yalnız balon göster
      const typing = document.activeElement?.matches("input, textarea, select, [contenteditable]");
      if (window.matchMedia("(min-width: 640px)").matches && !typing) {
        autoOpened.current = true;
        setOpen(true);
      } else setTeaser(true);
    }, Math.max(800, AUTO_DELAY - performance.now()));
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, busy, open]);

  useEffect(() => {
    if (!open) return;
    // Kendiliğinden açıldıysa odağı çalma; kullanıcı açtıysa yazı alanına odaklan
    const t = window.setTimeout(() => {
      if (!autoOpened.current) inputRef.current?.focus();
      autoOpened.current = false;
    }, 250);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        launcherRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const send = useCallback(
    async (raw: string) => {
      const text = raw.trim();
      if (!text || busy) return;
      const userMsg: Msg = { id: nextId.current++, from: "user", text };
      const history: ChatTurn[] = msgs
        .filter((m) => m.id !== 0)
        .map((m) => ({ role: m.from === "user" ? "user" : "assistant", text: m.text }));
      const withUser = [...msgs, userMsg];
      setMsgs(withUser);
      setInput("");
      setBusy(true);
      try {
        const res = await fetch("/api/asistan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text, history: history.slice(-10) }),
        });
        const data = (await res.json()) as Partial<AssistantReply> & { error?: string };
        const bot: Msg = {
          id: nextId.current++,
          from: "bot",
          text: data.text ?? data.error ?? "Bir sorun oluştu, lütfen tekrar deneyin.",
          links: data.links,
          quick: data.quick,
          whatsappText: data.whatsappText,
          whatsappHref: data.whatsappHref,
        };
        const next = [...withUser, bot];
        setMsgs(next);
        write(next);
      } catch {
        setMsgs([...withUser, { id: nextId.current++, from: "bot", text: "Bağlantı kurulamadı. Lütfen tekrar deneyin." }]);
      } finally {
        setBusy(false);
      }
    },
    [busy, msgs],
  );

  const reset = () => {
    setMsgs([WELCOME]);
    try {
      window.sessionStorage.removeItem(STORE);
    } catch {}
  };

  const copy = async (m: Msg) => {
    if (!m.whatsappText) return;
    try {
      await navigator.clipboard.writeText(m.whatsappText);
      setCopied(m.id);
      window.setTimeout(() => setCopied(null), 2000);
    } catch {}
  };

  const last = msgs[msgs.length - 1];

  return (
    <div className="fixed bottom-4 right-4 z-[70] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Sohbet paneli */}
      {open && (
          <section
            role="dialog"
            aria-modal="false"
            aria-label="istilaclamaAI asistan"
            className="ai-pop fixed inset-x-3 bottom-3 top-20 flex origin-bottom-right flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#071b24] text-white shadow-[0_40px_80px_-20px_rgb(0_0_0/0.6)] sm:absolute sm:inset-auto sm:bottom-[4.75rem] sm:right-0 sm:h-[min(640px,calc(100svh-8rem))] sm:w-[400px]"
          >
            {/* Başlık */}
            <header className="relative overflow-hidden px-5 pb-4 pt-5">
              <div aria-hidden="true" className="animate-aurora-a absolute -left-16 -top-20 size-56 rounded-full bg-[#087f6d]/50 blur-3xl" />
              <div aria-hidden="true" className="animate-aurora-b absolute -right-16 -top-10 size-48 rounded-full bg-[#087ea4]/45 blur-3xl" />
              <div className="relative flex items-center gap-3">
                <span className="relative grid size-11 place-items-center rounded-2xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-white shadow-lg">
                  <BugIcon className="size-6" />
                  <span className="absolute -right-0.5 -top-0.5 size-3 rounded-full border-2 border-[#071b24] bg-[#4ade80]" />
                </span>
                <div className="flex-1">
                  <p className="flex items-center gap-1.5 font-display text-lg font-bold">
                    istilaclama<span className="text-[#5fd3bc]">AI</span>
                    <Sparkles aria-hidden="true" className="size-4 text-[#8fe3d2]" />
                  </p>
                  <p className="text-xs text-white/60">Yapay zekâ destekli haşere asistanı</p>
                </div>
                <button
                  type="button"
                  onClick={reset}
                  className="rounded-full px-2.5 py-1.5 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white"
                >
                  Yeni sohbet
                </button>
                <button
                  type="button"
                  aria-label="Asistanı kapat"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full bg-white/10 hover:bg-white/20"
                >
                  <X aria-hidden="true" className="size-5" />
                </button>
              </div>
            </header>

            {/* Mesajlar */}
            <div ref={listRef} className="flex-1 space-y-4 overflow-y-auto overscroll-contain bg-[#0a222d] px-4 py-5" aria-live="polite">
              {msgs.map((m) => (
                <div key={m.id} className={cn("flex flex-col gap-2", m.from === "user" ? "items-end" : "items-start")}>
                  <div
                    className={cn(
                      "max-w-[86%] whitespace-pre-line rounded-2xl px-4 py-3 text-[0.9375rem] leading-relaxed",
                      m.from === "user"
                        ? "rounded-br-md bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b]"
                        : "rounded-bl-md border border-white/10 bg-white/[0.06] text-white/90",
                    )}
                  >
                    {m.text}
                  </div>

                  {m.whatsappText && (
                    <div className="w-[92%] overflow-hidden rounded-2xl border border-[#4ade80]/30 bg-[#0f2e25]">
                      <p className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-[#86efac]">
                        <MessageCircle aria-hidden="true" className="size-4" /> Hazırlanan WhatsApp mesajı
                      </p>
                      <p className="px-4 py-3 text-sm leading-relaxed text-white/85">{m.whatsappText}</p>
                      <div className="flex gap-2 px-3 pb-3">
                        {m.whatsappHref ? (
                          <a
                            href={m.whatsappHref}
                            target="_blank"
                            rel="noopener"
                            className="flex min-h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-[#25d366] font-semibold text-[#052e16] transition-transform hover:-translate-y-0.5"
                          >
                            <MessageCircle aria-hidden="true" className="size-4" /> WhatsApp ile gönder
                          </a>
                        ) : (
                          <span className="flex min-h-11 flex-1 items-center justify-center rounded-xl bg-white/10 px-3 text-center text-xs text-white/70">
                            WhatsApp hattı henüz tanımlanmadı
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => copy(m)}
                          aria-label="Mesajı kopyala"
                          className="grid size-11 place-items-center rounded-xl bg-white/10 hover:bg-white/20"
                        >
                          {copied === m.id ? <Check aria-hidden="true" className="size-4 text-[#86efac]" /> : <Copy aria-hidden="true" className="size-4" />}
                        </button>
                      </div>
                    </div>
                  )}

                  {m.links && m.links.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {m.links.map((l) => (
                        <Link
                          key={l.href}
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="inline-flex min-h-9 items-center rounded-full border border-[#5fd3bc]/40 bg-[#5fd3bc]/10 px-3.5 text-sm font-medium text-[#8fe3d2] transition-colors hover:bg-[#5fd3bc]/20"
                        >
                          {l.label} →
                        </Link>
                      ))}
                    </div>
                  )}

                  {m === last && m.from === "bot" && m.quick && m.quick.length > 0 && !busy && (
                    <div className="flex flex-wrap gap-2">
                      {m.quick.map((q) => (
                        <button
                          key={q}
                          type="button"
                          onClick={() => send(q)}
                          className="min-h-9 rounded-full border border-white/15 bg-white/[0.04] px-3.5 text-sm text-white/85 transition-colors hover:border-[#5fd3bc]/50 hover:bg-white/10"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {busy && (
                <div className="flex items-center gap-1.5 rounded-2xl rounded-bl-md border border-white/10 bg-white/[0.06] px-4 py-3.5 w-fit" aria-label="Yanıt yazılıyor">
                  {[0, 1, 2].map((i) => (
                    <span key={i} className="size-2 animate-bounce rounded-full bg-[#5fd3bc]" style={{ animationDelay: `${i * 0.15}s` }} />
                  ))}
                </div>
              )}
            </div>

            {/* Giriş */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="border-t border-white/10 bg-[#071b24] p-3"
            >
              <div className="flex items-center gap-2 rounded-2xl border border-white/15 bg-white/[0.06] p-1.5 pl-4 focus-within:border-[#5fd3bc]">
                <label htmlFor="ai-input" className="sr-only">
                  Mesajınız
                </label>
                <input
                  id="ai-input"
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  maxLength={500}
                  autoComplete="off"
                  placeholder="Sorunuzu yazın…"
                  className="min-h-10 flex-1 bg-transparent text-[0.9375rem] text-white outline-none placeholder:text-white/45"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || busy}
                  aria-label="Gönder"
                  className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b] transition-opacity disabled:opacity-40"
                >
                  <Send aria-hidden="true" className="size-4" />
                </button>
              </div>
              <p className="mt-2 px-1 text-[0.6875rem] leading-snug text-white/45">
                Yanıtlar yapay zekâ ile üretilir ve bilgilendirme amaçlıdır. Paylaştığınız bilgiler yalnızca talebinizi yanıtlamak için
                kullanılır; <Link href="/kvkk-aydinlatma-metni" className="underline hover:text-white/70">KVKK aydınlatma metni</Link>.
              </p>
            </form>
          </section>
        )}

      {/* Yukarı çık */}
      {showTop && !open && !teaser && (
          <button
            type="button"
            aria-label="Sayfanın başına dön"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="ai-pop grid size-12 place-items-center rounded-full border border-border bg-surface/90 text-foreground shadow-md backdrop-blur-md transition-colors hover:bg-navy hover:text-white"
          >
            <ArrowUp aria-hidden="true" className="size-5" />
          </button>
        )}

      {/* WhatsApp (yalnız doğrulanmış numara varsa) */}
      {whatsapp && !open && (
        <a
          href={whatsapp}
          target="_blank"
          rel="noopener"
          aria-label="WhatsApp üzerinden yazın"
          className="grid size-12 place-items-center rounded-full bg-[#25d366] text-[#052e16] shadow-md transition-transform hover:scale-105"
        >
          <MessageCircle aria-hidden="true" className="size-5" />
        </a>
      )}

      {/* Mobil karşılama balonu */}
      {teaser && !open && (
          // Akış dışında (absolute): balon çıkınca başlatıcı yerinden oynamaz (CLS 0)
          <div className="ai-pop absolute bottom-full right-0 mb-3 w-[260px] max-w-[calc(100vw-2rem)] rounded-2xl rounded-br-md border border-border bg-surface p-4 pr-9 text-sm text-foreground shadow-lg"
          >
            <button type="button" onClick={() => { setTeaser(false); setOpen(true); }} className="text-left">
              <span className="block font-semibold">Merhaba! Ben istilaclamaAI.</span>
              <span className="mt-1 block text-muted">Haşere sorununuzu yazın, hemen yönlendireyim.</span>
            </button>
            <button
              type="button"
              aria-label="Karşılama mesajını kapat"
              onClick={() => setTeaser(false)}
              className="absolute right-1.5 top-1.5 grid size-8 place-items-center rounded-full text-muted hover:bg-sunken"
            >
              <X aria-hidden="true" className="size-4" />
            </button>
          </div>
        )}

      {/* istilaclamaAI başlatıcı */}
      <button
        ref={launcherRef}
        type="button"
        onClick={() => {
          setTeaser(false);
          setOpen((v) => !v);
        }}
        aria-expanded={open}
        aria-label={open ? "Asistanı kapat" : "istilaclamaAI asistanını aç"}
        className={cn(
          "ai-launcher group relative h-14 items-center gap-2.5 rounded-full bg-gradient-to-br from-[#0a9f86] to-[#087ea4] pl-2 pr-5 text-white shadow-[0_18px_40px_-12px_rgb(8_127_109/0.8)] transition-transform hover:-translate-y-0.5",
          open ? "hidden sm:flex" : "flex",
        )}
      >
        <span className="relative grid size-10 place-items-center rounded-full bg-white/15">
          {!open && <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-white/40" />}
          {open ? <X aria-hidden="true" className="relative size-5" /> : <BugIcon className="relative size-6" />}
        </span>
        <span className="font-display text-[0.9375rem] font-bold tracking-[-0.01em]">
          istilaclama<span className="text-[#a7f3d0]">AI</span>
        </span>
      </button>
    </div>
  );
}
