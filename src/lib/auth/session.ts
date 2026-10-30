import "server-only";
import { createHash, randomBytes } from "node:crypto";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { and, eq, gt, lt } from "drizzle-orm";
import { db, schema } from "@/db";

export const SESSION_COOKIE = "ist_session";
const TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 gün
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export type Role = "admin" | "editor" | "seo";
export type SessionUser = { id: string; email: string; name: string; role: Role };

export async function clientIpHash() {
  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "local";
  return sha(`ip:${ip}:${process.env.SESSION_SECRET ?? ""}`).slice(0, 32);
}

export async function createSession(userId: string) {
  const token = randomBytes(32).toString("base64url");
  const h = await headers();
  await db.insert(schema.sessions).values({
    id: sha(token),
    userId,
    expiresAt: new Date(Date.now() + TTL_MS),
    ipHash: await clientIpHash(),
    userAgent: h.get("user-agent")?.slice(0, 200) ?? null,
  });
  (await cookies()).set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TTL_MS / 1000,
  });
  // Süresi dolmuş oturumları temizle (fırsatçı)
  await db.delete(schema.sessions).where(lt(schema.sessions.expiresAt, new Date()));
}

export const getCurrentUser = cache(async (): Promise<SessionUser | null> => {
  const token = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const rows = await db
    .select({ id: schema.users.id, email: schema.users.email, name: schema.users.name, role: schema.users.role, active: schema.users.isActive })
    .from(schema.sessions)
    .innerJoin(schema.users, eq(schema.users.id, schema.sessions.userId))
    .where(and(eq(schema.sessions.id, sha(token)), gt(schema.sessions.expiresAt, new Date())))
    .limit(1);
  const u = rows[0];
  if (!u || !u.active) return null;
  return { id: u.id, email: u.email, name: u.name, role: u.role };
});

export async function destroySession() {
  const jar = await cookies();
  const token = jar.get(SESSION_COOKIE)?.value;
  if (token) await db.delete(schema.sessions).where(eq(schema.sessions.id, sha(token)));
  jar.delete(SESSION_COOKIE);
}

/** Sayfa/eylem koruması: oturum yoksa girişe yönlendirir; rol yetmiyorsa engeller. */
export async function requireUser(roles?: Role[]) {
  const user = await getCurrentUser();
  if (!user) redirect("/admin/giris");
  if (roles && !roles.includes(user.role)) redirect("/admin?yetki=yok");
  return user;
}

export async function audit(userId: string | null, action: string, entity: string, entityId?: string, data?: unknown) {
  await db.insert(schema.auditLogs).values({ userId, action, entity, entityId: entityId ?? null, data: (data ?? null) as never });
}
