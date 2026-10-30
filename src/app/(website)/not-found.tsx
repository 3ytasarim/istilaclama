import Link from "next/link";
import { buttonClasses } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <p className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-on-mint">404</p>
      <h1 className="mt-3 text-h2 font-bold text-foreground">Aradığınız sayfa bulunamadı</h1>
      <p className="mt-4 max-w-md text-muted">Sayfa taşınmış ya da kaldırılmış olabilir.</p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className={buttonClasses("primary")}>Ana sayfaya dön</Link>
        <Link href="/hizmetlerimiz" className={buttonClasses("secondary")}>Hizmetler</Link>
      </div>
    </section>
  );
}
