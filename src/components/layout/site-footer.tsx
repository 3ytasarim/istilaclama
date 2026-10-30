/*
 * Modern footer: fareyi izleyen ışık, akan gradyan çizgi, beyaz kartta logo,
 * hover efektli hızlı erişim kartları, sırayla beliren link kolonları. Yalnız doğrulanmış iletişim gösterilir.
 */
import Link from "next/link";
import { ArrowUpRight, FileText, HelpCircle, Mail, MapPin, MessageCircle, Phone, Sparkles } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { FooterSpotlight } from "@/components/layout/footer-spotlight";
import { phoneLink, verified, whatsappHref } from "@/lib/contact";
import { getNavigation, getSiteSettings, listDistricts, listServices } from "@/server/content";

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group relative inline-flex min-h-9 items-center gap-1.5 text-[0.9375rem] text-white/65 transition-colors duration-300 hover:text-white"
    >
      <span aria-hidden="true" className="absolute -left-3.5 top-1/2 size-1.5 -translate-y-1/2 scale-0 rounded-full bg-[#5fd3bc] shadow-[0_0_10px_#5fd3bc] transition-transform duration-300 group-hover:scale-100" />
      <span className="transition-transform duration-300 ease-[var(--ease-out)] group-hover:translate-x-1">{children}</span>
      <ArrowUpRight
        aria-hidden="true"
        className="size-3.5 shrink-0 -translate-x-1 text-[#5fd3bc] opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-x-1 group-hover:opacity-100"
      />
    </Link>
  );
}

const QUICK = [
  { href: "/teklif-al", icon: FileText, title: "Teklif alın", text: "Sorununuzu kısaca anlatın" },
  { href: "/hizmet-bolgeleri", icon: MapPin, title: "Bölgenizi bulun", text: "İstanbul ilçe rehberi" },
  { href: "/sik-sorulan-sorular", icon: HelpCircle, title: "Merak edilenler", text: "Hazırlık ve süreç soruları" },
];

export async function SiteFooter() {
  const [settings, nav, services, districts] = await Promise.all([
    getSiteSettings(),
    getNavigation(),
    listServices({ featured: true }),
    listDistricts(),
  ]);
  const phone = phoneLink(settings);
  const email = verified(settings.email);
  const address = verified(settings.address);
  const wa = whatsappHref(settings);
  const popular = ["kadikoy", "uskudar", "atasehir", "umraniye", "besiktas", "sisli"]
    .map((slug) => districts.find((d) => d.slug === slug))
    .filter((d) => d !== undefined);

  const columns = [
    {
      title: "Kurumsal",
      links: [
        { text: "Hakkımızda", url: "/kurumsal" },
        { text: "Bilgi merkezi", url: "/blog" },
        { text: "İletişim", url: "/iletisim" },
        ...nav.legal.map((l) => ({ text: l.label, url: l.href })),
      ],
    },
    {
      title: "Hizmetler",
      links: [
        ...services.slice(0, 6).map((s) => ({ text: s.title, url: `/hizmetlerimiz/${s.slug}` })),
        { text: "Tüm hizmetler", url: "/hizmetlerimiz" },
      ],
    },
    {
      title: "Bölgeler",
      links: [
        ...popular.map((d) => ({ text: d.name, url: `/hizmet-bolgeleri/istanbul/${d.slug}` })),
        { text: "Tüm bölgeler", url: "/hizmet-bolgeleri" },
      ],
    },
  ];

  return (
    <footer aria-labelledby="footer-baslik" className="footer-bg relative w-full overflow-hidden text-white">
      <h2 id="footer-baslik" className="sr-only">
        Site alt bilgisi
      </h2>
      {/* Akan gradyan çizgi */}
      <div aria-hidden="true" className="footer-beam absolute inset-x-0 top-0 h-px" />

      <FooterSpotlight className="relative">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="animate-blob-a absolute -left-40 -top-40 size-[620px] rounded-full bg-[#0fa287]/35 blur-[120px]" />
          <div className="animate-blob-b absolute -right-40 top-1/4 size-[560px] rounded-full bg-[#0b8fc0]/35 blur-[120px]" />
          <div className="animate-blob-c absolute -bottom-56 left-1/2 size-[520px] rounded-full bg-[#2fb59b]/25 blur-[120px]" />
          <div className="grid-lines absolute inset-0 opacity-[0.05]" />
        </div>

        <div className="container-page relative pb-10 pt-20">
          {/* Hızlı erişim kartları */}
          <ul className="grid gap-3 sm:grid-cols-3">
            {QUICK.map(({ href, icon: Icon, title, text }, i) => (
              <li key={href} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                <Link
                  href={href}
                  className="group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-[border-color,background-color,transform] duration-500 hover:-translate-y-1 hover:border-[#5fd3bc]/40 hover:bg-white/[0.07]"
                >
                  <span aria-hidden="true" className="absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 group-hover:translate-x-[300%]" />
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b] transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                    <Icon aria-hidden="true" className="size-5" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-display font-bold">{title}</span>
                    <span className="block text-sm text-white/55">{text}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" className="size-5 text-white/40 transition-[transform,color] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#5fd3bc]" />
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-16 grid gap-12 lg:grid-cols-[1.15fr_2fr]">
            {/* Marka */}
            <div data-reveal className="mx-auto max-w-sm text-center lg:mx-0 lg:text-left">
              <div className="inline-flex rounded-2xl bg-white px-4 py-2 shadow-[0_20px_40px_-20px_rgb(0_0_0/0.6)]">
                <Logo priority={false} variant="full" />
              </div>
              <p className="mt-6 text-[0.9375rem] leading-relaxed text-white/60">
                Ev ve iş yerleri için planlı, izlenebilir ve alanın ihtiyacına göre tasarlanan haşere kontrolü. Önce
                inceliyor, sonra uyguluyor, ardından birlikte takip ediyoruz.
              </p>
              <ul className="mt-6 flex flex-col items-center space-y-2 lg:items-start">
                {phone && (
                  <li>
                    <a href={phone.href} className="inline-flex min-h-10 items-center gap-2.5 text-white/85 hover:text-white">
                      <Phone aria-hidden="true" className="size-4 text-[#5fd3bc]" /> {phone.label}
                    </a>
                  </li>
                )}
                {wa && (
                  <li>
                    <a href={wa} target="_blank" rel="noopener" className="inline-flex min-h-10 items-center gap-2.5 text-white/85 hover:text-white">
                      <MessageCircle aria-hidden="true" className="size-4 text-[#4ade80]" /> WhatsApp
                    </a>
                  </li>
                )}
                {email && (
                  <li>
                    <a href={`mailto:${email}`} className="inline-flex min-h-10 items-center gap-2.5 text-white/85 hover:text-white">
                      <Mail aria-hidden="true" className="size-4 text-[#5fd3bc]" /> {email}
                    </a>
                  </li>
                )}
                {address && (
                  <li className="flex gap-2.5 text-white/70">
                    <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-[#5fd3bc]" />
                    <address className="whitespace-pre-line not-italic">{address}</address>
                  </li>
                )}
              </ul>
            </div>

            {/* Linkler */}
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {columns.map((col, ci) => (
                <nav key={col.title} aria-label={col.title} data-reveal style={{ "--reveal-i": ci + 1 } as React.CSSProperties}>
                  <p className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#8fe3d2]">
                    <span className="h-px w-4 bg-current" />
                    {col.title}
                  </p>
                  <ul className="space-y-0.5">
                    {col.links.map((l) => (
                      <li key={l.url}>
                        <FooterLink href={l.url}>{l.text}</FooterLink>
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10">
          <div className="flex w-full items-start justify-between gap-4 pb-28 pt-6 sm:items-center sm:pb-24 lg:pb-6 pl-[max(1rem,calc((100vw-1480px)/2+3.5rem))] pr-4 text-sm text-white/50 sm:pr-6">
            <div className="flex min-w-0 flex-1 flex-col gap-2 pr-16 sm:pr-20 md:flex-row md:flex-wrap md:items-center md:gap-x-5 lg:pr-0">
              <p>
                © {new Date().getFullYear()} {settings.businessName}. Tüm hakları saklıdır.
              </p>
              <a
                href="https://www.3ytasarim.com"
                target="_blank"
                rel="noopener"
                className="group/credit inline-flex w-fit flex-wrap items-center gap-x-1.5 gap-y-0.5 rounded-md py-1 text-white/50 transition-colors hover:text-white/80"
              >
                <span aria-hidden="true" className="mr-3 hidden h-3.5 w-px bg-white/20 md:inline-block" />
                <Sparkles aria-hidden="true" className="credit-spark size-3.5 text-[#5fd3bc]" />
                <span>Design by</span>{" "}
                <span className="relative font-semibold">
                  <span className="credit-name">3Y Tasarım &amp; Yazılım Hizmetleri</span>
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-[#5fd3bc] to-[#4fb8dc] transition-transform duration-500 group-hover/credit:scale-x-100"
                  />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-3.5 -translate-x-1 opacity-0 transition-[opacity,transform] duration-300 group-hover/credit:translate-x-0 group-hover/credit:opacity-100"
                />
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
            </div>
            {/* "Yukarı çık" butonu sağ alttaki sabit butonda (assistant-widget) — burada ikinci kopya yok */}
          </div>
        </div>
      </FooterSpotlight>
    </footer>
  );
}
