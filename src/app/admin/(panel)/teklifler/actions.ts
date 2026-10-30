"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { db, schema } from "@/db";
import { audit, requireUser } from "@/lib/auth/session";
import { LEAD_STATUSES } from "@/lib/admin/leads";

export async function setLeadStatus(id: string, status: string) {
  const user = await requireUser();
  const s = z.enum(LEAD_STATUSES).parse(status);
  const lid = z.string().uuid().parse(id);
  await db.update(schema.leads).set({ status: s }).where(eq(schema.leads.id, lid));
  await audit(user.id, "lead.status", "lead", lid, { status: s });
  revalidatePath("/admin/teklifler");
  revalidatePath(`/admin/teklifler/${lid}`);
}

export async function addLeadNote(id: string, form: FormData) {
  const user = await requireUser();
  const lid = z.string().uuid().parse(id);
  const note = z.string().trim().min(1).max(2000).safeParse(form.get("note"));
  if (!note.success) return;
  await db.insert(schema.leadNotes).values({ leadId: lid, userId: user.id, note: note.data });
  await audit(user.id, "lead.note", "lead", lid);
  revalidatePath(`/admin/teklifler/${lid}`);
}
