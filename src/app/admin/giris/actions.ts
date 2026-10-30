"use server";

import { createHash } from "node:crypto";
import { redirect } from "next/navigation";
import { and, eq, gt, sql } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/db";
import { verifyPassword } from "@/lib/auth/password";
import { audit, clientIpHash, createSession } from "@/lib/auth/session";

const input = z.object({ email: z.string().trim().toLowerCase().email().max(200), password: z.string().min(1).max(200) });
const MAX_FAILS = 5;
const WINDOW_MS = 15 * 60_000;

export type LoginState = { error?: string };

export async function login(_: LoginState, form: FormData): Promise<LoginState> {
  const parsed = input.safeParse({ email: form.get("email"), password: form.get("password") });
  if (!parsed.success) return { error: "E-posta ve şifrenizi kontrol edin." };
  const { email, password } = parsed.data;
  const key = createHash("sha256").update(`${email}|${await clientIpHash()}`).digest("hex");

  const since = new Date(Date.now() - WINDOW_MS);
  const fails = await db
    .select({ n: sql<number>`count(*)::int` })
    .from(schema.loginAttempts)
    .where(and(eq(schema.loginAttempts.key, key), eq(schema.loginAttempts.success, false), gt(schema.loginAttempts.createdAt, since)));
  if ((fails[0]?.n ?? 0) >= MAX_FAILS) return { error: "Çok fazla hatalı deneme. Lütfen 15 dakika sonra tekrar deneyin." };

  const user = (await db.select().from(schema.users).where(sql`lower(${schema.users.email}) = ${email}`).limit(1))[0];
  // Kullanıcı yoksa da hash doğrulaması kadar zaman harca (kullanıcı varlığını sızdırma)
  const ok = user?.isActive ? await verifyPassword(user.passwordHash, password) : (await verifyPassword("$argon2id$v=19$m=19456,t=2,p=1$c29tZXNhbHQ$ZmFrZQ", password), false);
  await db.insert(schema.loginAttempts).values({ key, success: ok });
  if (!ok || !user) return { error: "E-posta veya şifre hatalı." };

  await db.update(schema.users).set({ lastLoginAt: new Date() }).where(eq(schema.users.id, user.id));
  await createSession(user.id);
  await audit(user.id, "login", "user", user.id);
  redirect("/admin");
}
