"use client";

import Image from "next/image";
import Link from "next/link";
import { useActionState, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, Building2, Check, CheckCircle2, Factory, Home, Hotel, MapPin, MoreHorizontal, Store } from "lucide-react";
import { cn } from "@/lib/utils";
import { submitQuote, type QuoteState } from "./actions";

type Opt = { slug: string; title: string; image?: string };
type District = { slug: string; name: string; side: "anadolu" | "avrupa" };

const PLACES = [
  { v: "Ev / daire", icon: Home },
  { v: "Apartman / site", icon: Building2 },
  { v: "Ofis / işyeri", icon: Store },
  { v: "Restoran / kafe / otel", icon: Hotel },
  { v: "Depo / fabrika", icon: Factory },
  { v: "Diğer", icon: MoreHorizontal },
] as const;
const STEPS = ["Sorun", "Alan ve bölge", "İletişim"];

const input =
  "min-h-12 w-full rounded-xl border border-border bg-surface px-4 text-[0.9375rem] text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted focus:border-accent focus:ring-2 focus:ring-accent/25 aria-[invalid=true]:border-red-400";

export function QuoteForm({
  pests,
  services,
  districts,
  initial,
}: {
  pests: Opt[];
  services: Opt[];
  districts: District[];
  initial: { hizmet?: string; ilce?: string; mahalle?: string; kaynak?: string };
}) {
  const [state, action, pending] = useActionState<QuoteState, FormData>(submitQuote, {});
  const [step, setStep] = useState(0);
  const [hizmet, setHizmet] = useState(initial.hizmet ?? "");
  const [alan, setAlan] = useState("");
  const [ilce, setIlce] = useState(initial.ilce ?? "");
  const [mahalle, setMahalle] = useState(initial.mahalle ?? "");
  const [c, setC] = useState({ ad: "", telefon: "", eposta: "", mesaj: "", kvkk: false });
  const bind = (k: "ad" | "telefon" | "eposta" | "mesaj") => ({ value: c[k], onChange: (e: { target: { value: string } }) => setC((p) => ({ ...p, [k]: e.target.value })) });
  const [localErr, setLocalErr] = useState<string | null>(null);
  const [t] = useState(() => Date.now());
  const fe = state.fieldErrors ?? {};
  const districtName = useMemo(() => districts.find((d) => d.slug === ilce)?.name, [districts, ilce]);

  const next = () => {
    setLocalErr(null);
    if (step === 1 && (!alan || !ilce)) return setLocalErr("Alan türünü ve ilçeyi seçin.");
    setStep((s) => Math.min(2, s + 1));
  };

  if (state.ok) {
    return (
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="py-10 text-center" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-mint text-on-mint">
          <CheckCircle2 aria-hidden="true" className="size-8" />
        </span>
        <h2 className="mt-6 font-display text-2xl font-bold text-foreground">Talebiniz alındı</h2>
        <p className="mx-auto mt-2 max-w-md text-muted">
          Teşekkür ederiz. Talebiniz ilgili ekibimize iletildi; en kısa sürede sizinle iletişime geçilecektir.
        </p>
        <Link href="/" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-navy px-6 font-semibold text-white dark:bg-primary dark:text-primary-foreground">
          Ana sayfaya dön <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </motion.div>
    );
  }

  return (
    <form action={action} noValidate>
      {/* Adım göstergesi */}
      <ol className="mb-8 grid grid-cols-3 gap-2" aria-label="Form adımları">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={i === step ? "step" : undefined}>
            <span className={cn("block h-1.5 rounded-full transition-colors duration-500", i <= step ? "bg-brand-gradient" : "bg-sunken")} />
            <span className={cn("mt-2 block text-xs font-semibold uppercase tracking-wider", i === step ? "text-on-mint" : "text-muted")}>
              {i + 1}. {s}
            </span>
          </li>
        ))}
      </ol>

      {/* Gizli alanlar: tüm adımların değerleri form gönderiminde yer alır */}
      <input type="hidden" name="hizmet" value={hizmet} />
      <input type="hidden" name="alan" value={alan} />
      <input type="hidden" name="ilce" value={ilce} />
      <input type="hidden" name="mahalle" value={mahalle} />
      <input type="hidden" name="t" value={t} />
      <input type="hidden" name="kaynak" value={initial.kaynak ?? "/teklif-al"} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Web siteniz <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -24 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-foreground">Hangi sorunla karşılaştınız?</legend>
              <p className="mt-1 text-sm text-muted">Emin değilseniz atlayabilirsiniz; ekibimiz birlikte belirleyecektir.</p>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {pests.map((p) => (
                  <button
                    key={p.slug}
                    type="button"
                    aria-pressed={hizmet === p.slug}
                    onClick={() => setHizmet(hizmet === p.slug ? "" : p.slug)}
                    className={cn(
                      "group relative flex min-h-14 items-center gap-3 rounded-2xl border p-2 pr-3 text-left text-sm font-medium transition-[border-color,background-color,transform] hover:-translate-y-0.5",
                      hizmet === p.slug ? "border-primary bg-mint text-on-mint" : "border-border bg-surface text-foreground hover:border-primary/40",
                    )}
                  >
                    {p.image && (
                      <span className="relative size-10 shrink-0 overflow-hidden rounded-xl">
                        <Image src={p.image} alt="" fill sizes="40px" className="object-cover" />
                      </span>
                    )}
                    {p.title}
                    {hizmet === p.slug && <Check aria-hidden="true" className="ml-auto size-4" />}
                  </button>
                ))}
              </div>
              <label className="mt-5 block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">veya listeden seçin</span>
                <select value={hizmet} onChange={(e) => setHizmet(e.target.value)} className={input}>
                  <option value="">Emin değilim / diğer</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.slug}>
                      {s.title}
                    </option>
                  ))}
                </select>
              </label>
            </fieldset>
          )}

          {step === 1 && (
            <fieldset>
              <legend className="font-display text-xl font-bold text-foreground">Uygulama nerede yapılacak?</legend>
              <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {PLACES.map(({ v, icon: Icon }) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={alan === v}
                    onClick={() => setAlan(v)}
                    className={cn(
                      "flex min-h-14 items-center gap-2.5 rounded-2xl border px-3.5 text-left text-sm font-medium transition-colors",
                      alan === v ? "border-primary bg-mint text-on-mint" : "border-border bg-surface hover:border-primary/40",
                    )}
                  >
                    <Icon aria-hidden="true" className="size-5 shrink-0" /> {v}
                  </button>
                ))}
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">İlçe *</span>
                  <select value={ilce} onChange={(e) => setIlce(e.target.value)} className={input} aria-invalid={!!fe.ilce}>
                    <option value="">Seçiniz</option>
                    {(["anadolu", "avrupa"] as const).map((side) => (
                      <optgroup key={side} label={side === "anadolu" ? "Anadolu Yakası" : "Avrupa Yakası"}>
                        {districts
                          .filter((d) => d.side === side)
                          .map((d) => (
                            <option key={d.slug} value={d.slug}>
                              {d.name}
                            </option>
                          ))}
                      </optgroup>
                    ))}
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Mahalle (isteğe bağlı)</span>
                  <span className="relative block">
                    <MapPin aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                    <input value={mahalle} onChange={(e) => setMahalle(e.target.value)} maxLength={80} placeholder={districtName ? `${districtName} içinde` : "Mahalle"} className={cn(input, "pl-11")} />
                  </span>
                </label>
              </div>
            </fieldset>
          )}

          {step === 2 && (
            <fieldset className="space-y-4">
              <legend className="font-display text-xl font-bold text-foreground">Size nasıl ulaşalım?</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Ad soyad *</span>
                  <input name="ad" {...bind("ad")} required autoComplete="name" maxLength={80} className={input} aria-invalid={!!fe.ad} aria-describedby={fe.ad ? "err-ad" : undefined} />
                  {fe.ad && <span id="err-ad" className="mt-1 block text-sm text-red-600">{fe.ad}</span>}
                </label>
                <label className="block">
                  <span className="mb-1.5 block text-sm font-medium text-foreground">Telefon *</span>
                  <input name="telefon" {...bind("telefon")} required type="tel" inputMode="tel" autoComplete="tel" placeholder="05xx xxx xx xx" className={input} aria-invalid={!!fe.telefon} aria-describedby={fe.telefon ? "err-tel" : undefined} />
                  {fe.telefon && <span id="err-tel" className="mt-1 block text-sm text-red-600">{fe.telefon}</span>}
                </label>
              </div>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">E-posta (isteğe bağlı)</span>
                <input name="eposta" {...bind("eposta")} type="email" autoComplete="email" maxLength={120} className={input} aria-invalid={!!fe.eposta} />
                {fe.eposta && <span className="mt-1 block text-sm text-red-600">{fe.eposta}</span>}
              </label>
              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-foreground">Kısaca anlatın (isteğe bağlı)</span>
                <textarea name="mesaj" {...bind("mesaj")} rows={4} maxLength={1500} placeholder="Ne zamandır görüyorsunuz, hangi odalarda, alan yaklaşık kaç m²…" className={cn(input, "py-3")} />
              </label>
              <label className="flex items-start gap-3 rounded-xl bg-sunken p-4 text-sm">
                <input name="kvkk" type="checkbox" checked={c.kvkk} onChange={(e) => setC((p) => ({ ...p, kvkk: e.target.checked }))} required className="mt-0.5 size-5 shrink-0 accent-[#087f6d]" aria-invalid={!!fe.kvkk} />
                <span className="text-foreground/85">
                  Paylaştığım bilgilerin talebimin yanıtlanması amacıyla işlenmesine ilişkin{" "}
                  <Link href="/kvkk-aydinlatma-metni" target="_blank" className="font-semibold text-primary underline">
                    KVKK aydınlatma metnini
                  </Link>{" "}
                  okudum.
                  {fe.kvkk && <span className="mt-1 block text-red-600">{fe.kvkk}</span>}
                </span>
              </label>
            </fieldset>
          )}
        </motion.div>
      </AnimatePresence>

      {(state.error || localErr) && (
        <p role="alert" className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {localErr ?? state.error}
        </p>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        {step > 0 ? (
          <button type="button" onClick={() => setStep((s) => s - 1)} className="inline-flex min-h-12 items-center gap-2 rounded-full px-4 font-semibold text-muted hover:text-foreground">
            <ArrowLeft aria-hidden="true" className="size-4" /> Geri
          </button>
        ) : (
          <span />
        )}
        {step < 2 ? (
          <button type="button" onClick={next} className="group/btn ind-primary inline-flex min-h-13 items-center gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-6 pr-2 font-bold text-[#04201b]">
            Devam et
            <span className="grid size-9 place-items-center rounded-full bg-[#04201b] text-white">
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </button>
        ) : (
          <button type="submit" disabled={pending} className="group/btn ind-primary inline-flex min-h-13 items-center gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-6 pr-2 font-bold text-[#04201b] disabled:opacity-60">
            {pending ? "Gönderiliyor…" : "Teklif talebini gönder"}
            <span className="grid size-9 place-items-center rounded-full bg-[#04201b] text-white">
              <ArrowRight aria-hidden="true" className="size-4" />
            </span>
          </button>
        )}
      </div>
    </form>
  );
}
