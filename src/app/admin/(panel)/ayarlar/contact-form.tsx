"use client";

import { useActionState, useState } from "react";
import { CheckCircle2, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { normalizeWhatsapp, type ContactField } from "@/lib/settings/contact-fields";
import { updateContactSettings, type SettingsState } from "./actions";

type FieldDef = {
  name: ContactField;
  label: string;
  hint: string;
  icon: typeof Phone;
  placeholder: string;
  type?: string;
  multiline?: boolean;
  inputMode?: "tel" | "email";
};

const FIELDS: FieldDef[] = [
  { name: "phone", label: "Telefon", hint: "Header, footer ve İletişim sayfasında arama bağlantısı olarak görünür.", icon: Phone, placeholder: "0216 123 45 67", inputMode: "tel" },
  { name: "whatsapp", label: "WhatsApp numarası", hint: "Tüm WhatsApp butonları ve asistanın WhatsApp yönlendirmesi bu numaraya gider.", icon: MessageCircle, placeholder: "0532 123 45 67", inputMode: "tel" },
  { name: "email", label: "E-posta", hint: "Footer ve İletişim sayfasında görünür.", icon: Mail, placeholder: "info@istilaclama.com.tr", type: "email", inputMode: "email" },
  { name: "address", label: "Adres", hint: "Footer ve İletişim sayfasında görünür; İletişim sayfasında haritada açılır. Satır atlayabilirsiniz.", icon: MapPin, placeholder: "Mahalle, cadde/sokak, no\nİlçe / İstanbul", multiline: true },
  { name: "workingHours", label: "Çalışma saatleri", hint: "İletişim sayfasında ve asistan yanıtlarında kullanılır.", icon: Clock, placeholder: "Pazartesi–Cumartesi 09:00–19:00" },
];

export function ContactSettingsForm({ initial }: { initial: Record<ContactField, string> }) {
  const [state, action, pending] = useActionState<SettingsState, FormData>(updateContactSettings, {});
  const [values, setValues] = useState(initial);
  const wa = values.whatsapp ? normalizeWhatsapp(values.whatsapp) : "";

  return (
    <form action={action} className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-xs">
        <h2 className="font-display font-bold text-foreground">İletişim bilgileri</h2>
        <div className="mt-5 space-y-5">
          {FIELDS.map((f) => {
            const err = state.errors?.[f.name];
            const Icon = f.icon;
            const common = {
              id: f.name,
              name: f.name,
              value: values[f.name],
              placeholder: f.placeholder,
              "aria-invalid": err ? true : undefined,
              "aria-describedby": `${f.name}-hint${err ? ` ${f.name}-err` : ""}`,
              onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                setValues((v) => ({ ...v, [f.name]: e.target.value })),
            };
            const cls = cn(
              "mt-1.5 w-full rounded-xl border bg-background px-3.5 text-foreground outline-none transition-[border-color,box-shadow] placeholder:text-muted/70 focus:border-primary focus:shadow-[0_0_0_4px_rgb(8_127_109/0.12)]",
              err ? "border-red-500" : "border-border",
            );
            return (
              <div key={f.name}>
                <label htmlFor={f.name} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <Icon aria-hidden="true" className="size-4 text-primary" /> {f.label}
                </label>
                {f.multiline ? (
                  <textarea {...common} rows={3} maxLength={300} className={cn(cls, "py-3")} />
                ) : (
                  <input {...common} type={f.type ?? "text"} inputMode={f.inputMode} autoComplete="off" className={cn(cls, "min-h-12")} />
                )}
                <p id={`${f.name}-hint`} className="mt-1 text-xs text-muted">
                  {f.hint}
                  {f.name === "whatsapp" && wa && (
                    <>
                      {" "}Kaydedilecek biçim: <span className="font-mono text-foreground">wa.me/{wa}</span>
                    </>
                  )}
                </p>
                {err && (
                  <p id={`${f.name}-err`} className="mt-1 text-sm font-medium text-red-600 dark:text-red-400">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-navy px-5 font-semibold text-white disabled:opacity-60 dark:bg-primary dark:text-primary-foreground"
          >
            {pending && <Loader2 aria-hidden="true" className="size-4 animate-spin" />}
            {pending ? "Kaydediliyor…" : "Kaydet ve siteyi güncelle"}
          </button>
          <p role="status" aria-live="polite" className="text-sm">
            {state.message && (
              <span className={cn("inline-flex items-center gap-1.5 font-medium", state.ok ? "text-primary" : "text-red-600 dark:text-red-400")}>
                {state.ok ? <CheckCircle2 aria-hidden="true" className="size-4" /> : <TriangleAlert aria-hidden="true" className="size-4" />}
                {state.message}
              </span>
            )}
          </p>
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-border bg-surface p-6 shadow-xs">
        <h2 className="font-display font-bold text-foreground">Sitede nasıl görünür?</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {FIELDS.map((f) => {
            const Icon = f.icon;
            const val = values[f.name].trim();
            return (
              <li key={f.name} className="flex gap-3">
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg", val ? "bg-mint text-on-mint" : "bg-sunken text-muted")}>
                  <Icon aria-hidden="true" className="size-4" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-muted">{f.label}</span>
                  {val ? (
                    <span className="block whitespace-pre-line break-words text-foreground">{val}</span>
                  ) : (
                    <span className="block text-muted">Sitede gizli</span>
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      </aside>
    </form>
  );
}
