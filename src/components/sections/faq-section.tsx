import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { FaqAccordion } from "@/components/shared/faq-accordion";
import type { FaqItem } from "@/types/content";

export function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <section aria-labelledby="sss-baslik" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
          <SectionHeading
            id="sss-baslik"
            eyebrow="Sık sorulan sorular"
            title="Merak edilenler"
            description="Süreç, hazırlık ve güvenlikle ilgili en çok sorulan soruların kısa cevapları."
          />
          <Link
            href="/sik-sorulan-sorular"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            Tüm sorular <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <div data-reveal>
          <FaqAccordion items={items} />
        </div>
      </div>
    </section>
  );
}
