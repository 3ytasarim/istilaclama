import { Microscope, Repeat, Route, Target } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Photo } from "@/components/ui/photo";
import { media } from "@/content/media";

const reasons = [
  { icon: Microscope, title: "İhtiyaç analizi", text: "Zararlının türünü, yoğunluğunu ve kaynağını belirlemeden uygulama planlamayız." },
  { icon: Target, title: "Doğru yöntem", text: "Jel, yem istasyonu, fiziksel önlem veya alan uygulaması; alanın kullanımına göre seçilir." },
  { icon: Route, title: "Şeffaf süreç", text: "Hazırlıktan uygulama sonrasına kadar her adım önceden ve yazılı paylaşılır." },
  { icon: Repeat, title: "Periyodik takip", text: "Yaşam döngüsü gereği takip gereken durumlarda ziyaret takvimi baştan planlanır." },
];

export function WhySection() {
  return (
    <section aria-labelledby="neden-baslik" className="section-y relative overflow-hidden bg-sunken">
      <div className="container-page grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Fotoğraf kolajı */}
        <div className="relative" data-reveal>
          <div className="grid grid-cols-[1.15fr_1fr] gap-4">
            <div className="relative row-span-2 aspect-[4/5.6] overflow-hidden rounded-[var(--radius-panel)] shadow-lg">
              <Photo asset={media.technicianHome} sizes="(min-width:1024px) 28vw, 55vw" />
            </div>
            <div className="relative aspect-square overflow-hidden rounded-[var(--radius-panel)] shadow-md">
              <Photo asset={media.inspection} sizes="(min-width:1024px) 22vw, 45vw" />
            </div>
            <div className="relative flex aspect-square flex-col justify-end overflow-hidden rounded-[var(--radius-panel)] bg-brand-gradient p-6 text-white shadow-md">
              <div aria-hidden="true" className="grid-lines absolute inset-0 opacity-25" />
              <p className="relative font-display text-4xl font-extrabold tracking-[-0.04em] sm:text-5xl">5 adım</p>
              <p className="relative mt-2 text-sm text-white/85">İletişimden takibe kadar planlı süreç</p>
            </div>
          </div>
          <div className="glass absolute -bottom-6 left-6 hidden max-w-[260px] rounded-2xl border border-white/70 p-4 shadow-lg sm:block dark:border-border">
            <p className="text-sm font-semibold text-foreground">Önce inceleme, sonra uygulama</p>
            <p className="mt-1 text-xs text-muted">Tür ve kaynak tespiti yapılmadan ilaçlama planlanmaz.</p>
          </div>
        </div>

        <div>
          <SectionHeading
            id="neden-baslik"
            eyebrow="Neden İST İlaçlama?"
            title={
              <>
                Önce anlıyoruz, <span className="text-gradient">sonra uyguluyoruz</span>
              </>
            }
            description="Haşere kontrolü tek bir ilaçlamadan ibaret değildir. Kalıcı sonuç; doğru teşhis, uygun yöntem ve düzenli takibin birleşiminden doğar."
          />
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {reasons.map(({ icon: Icon, title, text }, i) => (
              <li key={title} data-reveal style={{ "--reveal-i": i } as React.CSSProperties} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-surface text-primary shadow-sm ring-1 ring-border">
                  <Icon aria-hidden="true" className="size-5" />
                </span>
                <span>
                  <h3 className="font-display text-lg font-bold text-foreground">{title}</h3>
                  <p className="mt-1 text-[0.9375rem] leading-relaxed text-muted">{text}</p>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
