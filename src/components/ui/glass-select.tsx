"use client";

import dynamic from "next/dynamic";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export type GlassOption = { value: string; label: string; image?: string; dot?: string };
export type GlassGroup = { label: string; options: GlassOption[] };
export type GlassSelectProps = {
  name: string;
  placeholder: string;
  groups: GlassGroup[];
  icon: ReactNode;
  label: string;
};

export const TRIGGER_CLASS =
  "group/trigger flex min-h-13 w-full items-center gap-3 rounded-xl border border-white/15 bg-white/[0.07] px-3.5 text-left text-[0.9375rem] text-white outline-none transition-[border-color,background-color,box-shadow] hover:border-white/30 hover:bg-white/10 focus-visible:border-[#5fd3bc] focus-visible:shadow-[0_0_0_4px_rgb(95_211_188/0.18)] data-[state=open]:border-[#5fd3bc] data-[state=open]:bg-white/10";

const load = () => import("./glass-select-radix");
const GlassSelectRadix = dynamic(() => load().then((m) => m.GlassSelectRadix), { ssr: false });

/**
 * Koyu cam görünümlü, gruplu seçim listesi (Radix Select — klavye, typeahead, ekran okuyucu desteği).
 * `name` verildiğinde form içinde gizli native select üretir; GET formu aynen çalışır.
 *
 * Performans: Radix Select (~28 KB) ilk yüklemede indirilmez. Önce aynı görünümlü hafif bir tetikleyici
 * çizilir; üzerine gelinince/odaklanınca paket önceden yüklenir, tıklanınca gerçek liste açık olarak gelir.
 */
export function GlassSelect(props: GlassSelectProps) {
  const [open, setOpen] = useState(false);

  if (open) return <GlassSelectRadix {...props} defaultOpen autoFocus />;

  return (
    <button
      type="button"
      aria-label={props.label}
      aria-haspopup="listbox"
      aria-expanded={false}
      className={TRIGGER_CLASS}
      onPointerEnter={() => void load()}
      onFocus={() => void load()}
      onTouchStart={() => void load()}
      onClick={() => setOpen(true)}
      onKeyDown={(e) => {
        if (["Enter", " ", "ArrowDown", "ArrowUp"].includes(e.key)) {
          e.preventDefault();
          setOpen(true);
        }
      }}
    >
      <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#2fb59b]/30 to-[#3aa9d1]/30 text-[#8fe3d2]">
        {props.icon}
      </span>
      <span className="min-w-0 flex-1 truncate text-white/55">{props.placeholder}</span>
      <ChevronDown aria-hidden="true" className="size-4 text-white/60" />
    </button>
  );
}
