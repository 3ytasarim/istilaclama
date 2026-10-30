"use client";

import { useActionState } from "react";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { login, type LoginState } from "./actions";

export function LoginForm() {
  const [state, action, pending] = useActionState<LoginState, FormData>(login, {});
  return (
    <form action={action} className="space-y-4" noValidate>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">E-posta</span>
        <span className="relative block">
          <Mail aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input name="email" type="email" required autoComplete="username" className="min-h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
        </span>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm font-medium text-foreground">Şifre</span>
        <span className="relative block">
          <Lock aria-hidden="true" className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
          <input name="password" type="password" required autoComplete="current-password" className="min-h-12 w-full rounded-xl border border-border bg-surface pl-11 pr-4 outline-none focus:border-accent focus:ring-2 focus:ring-accent/25" />
        </span>
      </label>
      {state.error && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-navy font-semibold text-white transition-colors hover:bg-[#0b2a37] disabled:opacity-60 dark:bg-primary dark:text-primary-foreground">
        {pending ? "Giriş yapılıyor…" : "Giriş yap"} <ArrowRight aria-hidden="true" className="size-4" />
      </button>
    </form>
  );
}
