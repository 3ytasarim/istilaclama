"use client";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-24 text-center">
      <h1 className="text-h2 font-bold text-foreground">Bir sorun oluştu</h1>
      <p className="mt-4 max-w-md text-muted">Sayfa yüklenirken beklenmeyen bir hata oluştu.</p>
      <button type="button" onClick={reset} className="mt-8 min-h-12 rounded-full bg-primary px-6 font-semibold text-primary-foreground">Tekrar dene</button>
    </section>
  );
}
