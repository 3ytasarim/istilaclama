"use client";

import { useEffect, useRef, useState } from "react";
import { Bug, ClipboardList, Layers3, MapPinned } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Hero altı istatistik bandı. Yalnız doğrulanabilir site verisi kullanılır (sahte başarı/müşteri sayısı yok);
 * gerçek işletme rakamları doğrulandığında CMS'ten eklenecek.
 * Sayılar ilk HTML'de son değeriyle gelir (JS'siz/SEO), görünür olunca sıfırdan sayar.
 */
export type Stat = { value: number; suffix?: string; label: string; detail: string; icon: "layers" | "bug" | "map" | "steps" };

const ICONS = { layers: Layers3, bug: Bug, map: MapPinned, steps: ClipboardList };

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => e?.isIntersecting && (setInView(true), io.disconnect()), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, inView] as const;
}

function CountUp({ to, run }: { to: number; run: boolean }) {
  const [n, setN] = useState(to);
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!run) return; // görünür olana kadar son değer kalır (SEO / botlar)
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return <>{n}</>;
}

export function StatsBand({ stats }: { stats: Stat[] }) {
  const [ref, inView] = useInView<HTMLDivElement>();
  return (
    <section aria-label="Kısaca İST İlaçlama" className="relative z-10 -mt-20 sm:-mt-24">
      <div className="container-page">
        <div
          ref={ref}
          className="relative overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-[0_40px_80px_-32px_rgb(16_51_66/0.35)]"
        >
          <div aria-hidden="true" className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
          <ul className="grid divide-border sm:grid-cols-2 sm:divide-x lg:grid-cols-4 [&>li:nth-child(n+3)]:border-t [&>li:nth-child(n+3)]:border-border lg:[&>li:nth-child(n+3)]:border-t-0 [&>li:nth-child(2)]:border-t sm:[&>li:nth-child(2)]:border-t-0">
            {stats.map((s, i) => {
              const Icon = ICONS[s.icon];
              return (
                <li
                  key={s.label}
                  data-in={inView || undefined}
                  className="stat-card group relative flex h-full flex-col p-7 transition-[background-color,opacity,transform] duration-700 ease-[var(--ease-out)] hover:bg-mint/40 lg:p-8"
                  style={{ transitionDelay: inView ? `${i * 120}ms` : "0ms" }}
                >
                  {/* Hover: üstte beliren ışık çizgisi */}
                  <span aria-hidden="true" className="absolute inset-x-6 top-0 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-primary to-accent transition-transform duration-500 group-hover:scale-x-100" />

                  <div className="flex items-center justify-between">
                    <span
                      className={cn("stat-icon grid size-12 place-items-center rounded-2xl bg-mint text-on-mint", inView && "is-in")}
                      style={{ "--d": `${i * 120 + 200}ms` } as React.CSSProperties}
                    >
                      <Icon aria-hidden="true" className="size-5 transition-transform duration-500 group-hover:-rotate-12 group-hover:scale-110" />
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">0{i + 1}</span>
                  </div>

                  <p className="order-2 mt-5 font-display text-5xl font-extrabold leading-none tracking-[-0.04em] tabular-nums lg:text-6xl">
                    <span className="text-gradient">
                      <CountUp to={s.value} run={inView} />
                    </span>
                    {s.suffix && <span className="ml-1 text-2xl text-muted">{s.suffix}</span>}
                  </p>
                  <p className="order-3 mt-4">
                    <span className="block font-display text-base font-bold text-foreground">{s.label}</span>
                    <span className="mt-1 block min-h-[2.75rem] text-sm leading-relaxed text-muted">{s.detail}</span>
                  </p>

                  {/* Dolan ilerleme çizgisi + üzerinden geçen ışık — hepsi en altta hizalı */}
                  <span aria-hidden="true" className="order-4 mt-auto block pt-5">
                    <span className="relative block h-1 overflow-hidden rounded-full bg-sunken">
                      <span
                        className={cn(
                          "relative block h-full overflow-hidden rounded-full bg-gradient-to-r from-primary to-accent transition-[width] duration-[1600ms] ease-[var(--ease-out)]",
                          inView ? "w-full" : "w-0",
                        )}
                        style={{ transitionDelay: `${i * 150 + 200}ms` }}
                      >
                        <span className="stat-shine absolute inset-y-0 w-1/3" style={{ animationDelay: `${2000 + i * 400}ms` }} />
                      </span>
                    </span>
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
