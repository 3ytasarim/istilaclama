"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const AssistantWidget = dynamic(() => import("./assistant-widget").then((m) => m.AssistantWidget), { ssr: false });

const EVENTS = ["pointerdown", "keydown", "scroll", "touchstart", "mousemove"] as const;

/**
 * Asistan (ve motion kütüphanesi) ilk boyamayı geciktirmesin diye ilk etkileşimde
 * ya da en geç ~3 sn sonra (otomatik açılıştan önce) tarayıcı boştayken yüklenir.
 */
export function AssistantLazy({ whatsapp }: { whatsapp: string | null }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let idle = 0;
    const go = () => setReady(true);
    const t = window.setTimeout(() => {
      idle = window.requestIdleCallback ? window.requestIdleCallback(go, { timeout: 600 }) : window.setTimeout(go, 0);
    }, 2800);
    EVENTS.forEach((e) => window.addEventListener(e, go, { once: true, passive: true }));
    return () => {
      window.clearTimeout(t);
      if (idle && window.cancelIdleCallback) window.cancelIdleCallback(idle);
      EVENTS.forEach((e) => window.removeEventListener(e, go));
    };
  }, []);
  return ready ? <AssistantWidget whatsapp={whatsapp} /> : null;
}
