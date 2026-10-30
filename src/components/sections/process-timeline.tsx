"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ProcessStep = { title: string; text: string; points: string[]; image: { src: string; alt: string } };

/**
 * Kaydırmaya bağlı zaman çizelgesi (Aceternity "Timeline" kalıbı):
 * dikey çizgi kaydırdıkça dolar, ekranın ortasına gelen adım vurgulanır. Azaltılmış harekette çizgi dolu gelir.
 */
export function ProcessTimeline({ steps }: { steps: ProcessStep[] }) {
  const wrapRef = useRef<HTMLOListElement>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      requestAnimationFrame(() => {
        setProgress(1);
        setActive(steps.length - 1);
      });
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const mid = window.innerHeight * 0.55;
      setProgress(Math.min(1, Math.max(0, (mid - rect.top) / rect.height)));
      const items = Array.from(el.querySelectorAll<HTMLElement>("[data-step]"));
      let idx = 0;
      items.forEach((it, i) => {
        if (it.getBoundingClientRect().top < mid) idx = i;
      });
      setActive(idx);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [steps.length]);

  return (
    <ol ref={wrapRef} className="relative">
      {/* Çizgi + dolum */}
      <span aria-hidden="true" className="absolute bottom-6 left-[1.6875rem] top-6 w-0.5 rounded-full bg-border sm:left-[2.1875rem]">
        <span
          className="absolute inset-x-0 top-0 rounded-full bg-gradient-to-b from-primary via-accent to-primary shadow-[0_0_14px_rgb(8_127_109/0.6)]"
          style={{ height: `${progress * 100}%` }}
        />
      </span>

      {steps.map((s, i) => {
        const on = i <= active;
        const current = i === active;
        return (
          <li key={s.title} data-step className="relative grid grid-cols-[3.5rem_1fr] gap-5 pb-14 last:pb-0 sm:grid-cols-[4.5rem_1fr] sm:gap-8">
            <div className="relative z-10 flex justify-center pt-1">
              <span
                className={cn(
                  "grid size-14 place-items-center rounded-2xl border font-display text-lg font-extrabold transition-all duration-500 ease-[var(--ease-out)] sm:size-[4.5rem] sm:text-2xl",
                  on
                    ? "border-transparent bg-brand-gradient text-white shadow-[0_14px_30px_-10px_rgb(8_127_109/0.7)]"
                    : "border-border bg-surface text-muted",
                  current && "scale-110",
                )}
              >
                0{i + 1}
              </span>
            </div>

            <div
              className={cn(
                "grid gap-6 rounded-[var(--radius-panel)] border p-5 transition-all duration-700 ease-[var(--ease-out)] sm:p-6 md:grid-cols-[1fr_220px] lg:grid-cols-[1fr_260px]",
                current ? "border-primary/25 bg-surface shadow-lg" : "border-border bg-surface/60",
                // Pasif adım: metin tam kontrastlı kalır (WCAG), yalnız görsel soluklaşır
                !on && "[&_img]:opacity-55 [&_img]:grayscale",
              )}
            >
              <div>
                <h3 className="font-display text-xl font-bold tracking-[-0.02em] text-foreground sm:text-2xl">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{s.text}</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.points.map((p) => (
                    <li key={p} className="rounded-full border border-border bg-sunken px-3 py-1 text-[0.8125rem] font-medium text-foreground/80">
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl md:aspect-auto md:min-h-[170px]">
                <Image
                  src={s.image.src}
                  alt={s.image.alt}
                  fill
                  sizes="(min-width:1024px) 260px, (min-width:768px) 220px, 90vw"
                  className={cn("object-cover transition-transform duration-[1.2s] ease-[var(--ease-out)]", current ? "scale-105" : "scale-100")}
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
