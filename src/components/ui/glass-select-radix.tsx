"use client";

import Image from "next/image";
import { Select } from "radix-ui";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRIGGER_CLASS, type GlassSelectProps } from "./glass-select";

/** GlassSelect'in Radix uygulaması — yalnız kullanıcı etkileşince yüklenir (bkz. glass-select.tsx). */
export function GlassSelectRadix({
  name,
  placeholder,
  groups,
  icon,
  label,
  defaultOpen,
  autoFocus,
}: GlassSelectProps & { defaultOpen?: boolean; autoFocus?: boolean }) {
  return (
    <Select.Root name={name} defaultOpen={defaultOpen}>
      <Select.Trigger aria-label={label} autoFocus={autoFocus} className={TRIGGER_CLASS}>
        <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br from-[#2fb59b]/30 to-[#3aa9d1]/30 text-[#8fe3d2]">
          {icon}
        </span>
        <span className="min-w-0 flex-1 truncate group-data-[placeholder]/trigger:text-white/55">
          <Select.Value placeholder={placeholder} />
        </span>
        <Select.Icon>
          <ChevronDown aria-hidden="true" className="size-4 text-white/60 transition-transform duration-300 group-data-[state=open]/trigger:rotate-180" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={8}
          collisionPadding={16}
          className="glass-select-content z-[80] max-h-[min(380px,var(--radix-select-content-available-height))] w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-white/15 bg-[#0b2430]/95 text-white shadow-[0_30px_60px_-20px_rgb(0_0_0/0.8)] backdrop-blur-xl"
        >
          <Select.ScrollUpButton className="flex h-7 items-center justify-center text-white/60">
            <ChevronUp aria-hidden="true" className="size-4" />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-1.5">
            {groups.map((g, gi) => (
              <Select.Group key={g.label}>
                {gi > 0 && <Select.Separator className="mx-2 my-1.5 h-px bg-white/10" />}
                <Select.Label className="px-3 pb-1.5 pt-2 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-[#8fe3d2]">
                  {g.label}
                </Select.Label>
                {g.options.map((o) => (
                  <Select.Item
                    key={o.value}
                    value={o.value}
                    className="relative flex min-h-11 cursor-pointer select-none items-center gap-3 rounded-xl py-1.5 pl-2 pr-9 text-[0.9375rem] text-white/85 outline-none transition-colors data-[highlighted]:bg-gradient-to-r data-[highlighted]:from-[#2fb59b]/25 data-[highlighted]:to-[#3aa9d1]/15 data-[highlighted]:text-white data-[state=checked]:text-white"
                  >
                    {o.image ? (
                      <span className="relative size-8 shrink-0 overflow-hidden rounded-lg ring-1 ring-white/15">
                        <Image src={o.image} alt="" fill sizes="32px" className="object-cover" />
                      </span>
                    ) : (
                      <span className={cn("ml-1.5 size-2 shrink-0 rounded-full", o.dot ?? "bg-[#5fd3bc]")} />
                    )}
                    <Select.ItemText>{o.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute right-3 grid size-5 place-items-center rounded-full bg-[#2fb59b] text-[#04201b]">
                      <Check aria-hidden="true" className="size-3.5" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Group>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton className="flex h-7 items-center justify-center text-white/60">
            <ChevronDown aria-hidden="true" className="size-4" />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
