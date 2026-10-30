"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

/**
 * Tek bir IntersectionObserver ile tüm [data-reveal] öğelerini yönetir (bileşen başına JS yok).
 * Ayrıca ekran dışındaki bölümlere `anim-off` ekler; sürekli dönen CSS animasyonları görünmezken
 * duraklar (boşa boyama/GPU yükü olmaz).
 */
export function RevealObserver() {
  const pathname = usePathname();
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-visible), [data-split]:not(.is-visible)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));

    const zones = document.querySelectorAll<HTMLElement>("main section, footer");
    const zio = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("anim-off", !e.isIntersecting);
      },
      { rootMargin: "120px 0px" },
    );
    zones.forEach((z) => zio.observe(z));

    return () => {
      io.disconnect();
      zio.disconnect();
      zones.forEach((z) => z.classList.remove("anim-off"));
    };
  }, [pathname]);
  return null;
}
