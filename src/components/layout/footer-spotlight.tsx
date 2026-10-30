"use client";

import { useRef, type ReactNode } from "react";

/** Fareyi takip eden yumuşak ışık (CSS değişkenleri; dokunmatikte ve azaltılmış harekette pasif). */
export function FooterSpotlight({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref}
      className={className}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        ref.current.style.setProperty("--sx", `${e.clientX - r.left}px`);
        ref.current.style.setProperty("--sy", `${e.clientY - r.top}px`);
        ref.current.style.setProperty("--so", "1");
      }}
      onPointerLeave={() => ref.current?.style.setProperty("--so", "0")}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 motion-reduce:hidden"
        style={{
          opacity: "var(--so, 0)",
          background: "radial-gradient(520px circle at var(--sx, 50%) var(--sy, 50%), rgb(47 181 155 / 0.16), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
