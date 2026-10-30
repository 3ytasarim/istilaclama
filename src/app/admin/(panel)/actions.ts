"use server";

import { redirect } from "next/navigation";
import { audit, destroySession, getCurrentUser } from "@/lib/auth/session";

export async function logout() {
  const u = await getCurrentUser();
  if (u) await audit(u.id, "logout", "user", u.id);
  await destroySession();
  redirect("/admin/giris");
}
