"use client";

import { Accordion } from "radix-ui";
import { Plus } from "lucide-react";
import type { FaqItem } from "@/types/content";

/** Kapalı cevaplar da forceMount ile kaynak HTML'de bulunur (SEO/GEO), görsel olarak gizlenir. */
export function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={items[0]?.id}
      className="divide-y divide-border rounded-[var(--radius-card)] border border-border bg-surface"
    >
      {items.map((f) => (
        <Accordion.Item key={f.id} value={f.id}>
          <Accordion.Header asChild>
            <h3>
              <Accordion.Trigger className="group flex min-h-16 w-full items-center justify-between gap-6 px-6 py-5 text-left font-display text-[1.0625rem] font-semibold text-foreground transition-colors hover:text-primary">
                {f.question}
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-mint text-on-mint transition-transform duration-300 group-data-[state=open]:rotate-45">
                  <Plus aria-hidden="true" className="size-4" />
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content forceMount className="overflow-hidden data-[state=closed]:hidden">
            <p className="px-6 pb-6 leading-relaxed text-muted">{f.answer}</p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
