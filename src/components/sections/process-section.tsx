import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonClasses } from "@/components/ui/button";
import { ProcessTimeline, type ProcessStep } from "@/components/sections/process-timeline";
import { media } from "@/content/media";

const img = (k: keyof typeof media) => ({ src: media[k].src, alt: media[k].alt });

const steps: ProcessStep[] = [
  {
    title: "İletişim ve ön değerlendirme",
    text: "Alanı, gözlemlerinizi ve beklentinizi dinleyerek ilk değerlendirmeyi yaparız.",
    points: ["Alan türü", "Gözlemlenen zararlı", "Hane / işletme bilgisi"],
    image: img("office"),
  },
  {
    title: "Alanın ve zararlının incelenmesi",
    text: "Gerektiğinde yerinde inceleme ile tür, yoğunluk ve kaynak bölgeleri belirlenir.",
    points: ["Tür tespiti", "Yoğunluk", "Giriş ve kaynak noktaları"],
    image: img("inspection"),
  },
  {
    title: "Uygulama planı",
    text: "Yöntem, hazırlık listesi ve gerekiyorsa takip ziyaretleri yazılı olarak paylaşılır.",
    points: ["Yöntem seçimi", "Hazırlık listesi", "Ziyaret takvimi"],
    image: img("warehouseTeam"),
  },
  {
    title: "Profesyonel uygulama",
    text: "Uygulama, plana ve ürün etiket talimatlarına uygun şekilde gerçekleştirilir.",
    points: ["Koruyucu ekipman", "Etikete uygun kullanım", "Alana dönüş bilgisi"],
    image: img("heroTechnician"),
  },
  {
    title: "Takip ve önleyici öneriler",
    text: "Sonuç birlikte değerlendirilir; tekrarın önlenmesi için yapısal öneriler sunulur.",
    points: ["Sonuç kontrolü", "Yapısal öneriler", "Periyodik plan"],
    image: img("houseExterior"),
  },
];

export function ProcessSection() {
  return (
    <section aria-labelledby="surec-baslik" className="section-y relative">
      <div className="container-page grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:self-start">
          <SectionHeading
            id="surec-baslik"
            eyebrow="Hizmet sürecimiz"
            title={
              <>
                Beş adımda <span className="text-gradient">planlı</span> haşere kontrolü
              </>
            }
            description="Her adımda ne olacağını önceden bilirsiniz. Sürpriz yok, belirsizlik yok."
          />
          <Link data-reveal href="/teklif-al" className={buttonClasses("primary", "lg", "mt-8")}>
            Süreci başlatın <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>
        <ProcessTimeline steps={steps} />
      </div>
    </section>
  );
}
