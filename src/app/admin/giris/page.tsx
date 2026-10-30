import { redirect } from "next/navigation";
import Image from "next/image";
import { getCurrentUser } from "@/lib/auth/session";
import logo from "../../../../public/images/brand/istilaclama-logo.png";
import { LoginForm } from "./login-form";

export const metadata = { title: "Giriş" };

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/admin");
  return (
    <main className="grid min-h-svh place-items-center bg-[radial-gradient(70%_60%_at_20%_0%,var(--surface-mint),transparent_60%),radial-gradient(60%_50%_at_100%_100%,var(--surface-ice),transparent_60%)] px-4">
      <div className="w-full max-w-md rounded-[1.75rem] border border-border bg-surface p-8 shadow-lg sm:p-10">
        <Image src={logo} alt="istilaclama.com.tr" className="h-14 w-auto" preload />
        <h1 className="mt-8 font-display text-2xl font-bold text-foreground">Yönetim paneline giriş</h1>
        <p className="mt-1.5 text-sm text-muted">İçerik, teklif ve site ayarlarını buradan yönetebilirsiniz.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
