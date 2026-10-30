import { getSiteSettings } from "@/server/settings";
import { requireUser } from "@/lib/auth/session";
import { ContactSettingsForm } from "./contact-form";

export const dynamic = "force-dynamic";
export const metadata = { title: "Site ayarları" };

export default async function Page() {
  await requireUser(["admin"]);
  const s = await getSiteSettings();
  const v = (f: { value: string | null; verified: boolean }) => (f.verified ? (f.value ?? "") : "");

  return (
    <>
      <h1 className="font-display text-2xl font-bold text-foreground">Site ayarları</h1>
      <p className="mt-1 max-w-2xl text-sm text-muted">
        Buradaki iletişim bilgileri sitede her yerde kullanılır: header, footer, İletişim sayfası, WhatsApp butonları,
        istilaclamaAI yanıtları ve arama motorları için yapısal veri. Boş bırakılan alan sitede gösterilmez.
      </p>
      <ContactSettingsForm
        initial={{
          phone: v(s.phone),
          whatsapp: v(s.whatsapp),
          email: v(s.email),
          address: v(s.address),
          workingHours: v(s.workingHours),
        }}
      />
    </>
  );
}
