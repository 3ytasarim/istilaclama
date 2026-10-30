import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Check, Clock, FileText, Mail, MapPin, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { Breadcrumbs } from "@/components/shared/page-hero";
import { JsonLd } from "@/components/shared/json-ld";
import { Photo } from "@/components/ui/photo";
import { Eyebrow, SectionHeading } from "@/components/ui/section-heading";
import { media } from "@/content/media";
import { contactPage as c } from "@/content/pages";
import { phoneLink, verified, whatsappHref } from "@/lib/contact";
import { absoluteUrl } from "@/lib/site";
import { getSiteSettings, listDistricts } from "@/server/content";
import { buildMetadata } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { ORGANIZATION_ID } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({ ...PAGE_SEO.contact, path: "/iletisim" });

type Channel = { key: string; icon: LucideIcon; title: string; text: string; value: string; href?: string; external?: boolean };

export default async function Page() {
  const [settings, districts] = await Promise.all([getSiteSettings(), listDistricts()]);

  // Yalnız doğrulanmış kanallar listelenir; doğrulanmamış alanlar hiç görünmez.
  const phone = phoneLink(settings);
  const whatsapp = whatsappHref(settings);
  const email = verified(settings.email);
  const address = verified(settings.address);
  const hours = verified(settings.workingHours);
  const channels: Channel[] = [
    ...(phone ? [{ key: "phone", icon: Phone, ...c.channels.phone, value: phone.label, href: phone.href }] : []),
    ...(whatsapp ? [{ key: "whatsapp", icon: MessageCircle, ...c.channels.whatsapp, value: "Mesaj gönder", href: whatsapp, external: true }] : []),
    ...(email ? [{ key: "email", icon: Mail, ...c.channels.email, value: email, href: `mailto:${email}` }] : []),
    ...(address
      ? [{
          key: "address",
          icon: MapPin,
          ...c.channels.address,
          value: address,
          href: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address.replace(/\s+/g, " "))}`,
          external: true,
        }]
      : []),
    ...(hours ? [{ key: "hours", icon: Clock, ...c.channels.hours, value: hours }] : []),
  ];
  const anadolu = districts.filter((d) => d.side === "anadolu").length;
  const avrupa = districts.length - anadolu;

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "İletişim", item: absoluteUrl("/iletisim") },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: PAGE_SEO.contact.title,
            description: PAGE_SEO.contact.description,
            url: absoluteUrl("/iletisim"),
            about: {
              "@type": "Organization",
              "@id": ORGANIZATION_ID,
              name: settings.businessName,
              url: absoluteUrl("/"),
              ...(phone ? { telephone: phone.label } : {}),
              ...(email ? { email } : {}),
            },
          },
        ]}
      />

      {/* ───────── Hero ───────── */}
      <section className="relative -mt-[var(--header-h)] overflow-hidden bg-[#06161d] text-white">
        <div className="absolute inset-0 animate-hero-zoom">
          <Photo asset={media.istanbulGalata} sizes="100vw" priority className="opacity-60" />
        </div>
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-[#06161d] via-[#06161d]/80 to-[#06161d]/20" />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#06161d] via-transparent to-[#06161d]/50" />
        <div className="container-page relative pb-20 pt-[calc(var(--header-h)+2.5rem)] sm:pb-28">
          <div className="[&_a]:text-white/70 [&_a:hover]:text-white [&_span]:text-white [&_svg]:text-white/40 [&_ol]:text-white/70">
            <Breadcrumbs items={[{ label: "İletişim" }]} />
          </div>
          <div className="mt-10 max-w-3xl">
            <Eyebrow tone="light">{c.hero.eyebrow}</Eyebrow>
            <h1 className="animate-rise mt-5 text-display font-extrabold">
              {c.hero.titleLead} <span className="hero-word">{c.hero.titleAccent}</span>
            </h1>
            <p className="animate-rise mt-6 max-w-2xl text-lead text-white/75 [animation-delay:120ms]">{c.hero.description}</p>
          </div>
        </div>
      </section>

      {/* ───────── Kanallar ───────── */}
      <section aria-labelledby="kanallar" className="section-y">
        <div className="container-page">
          <SectionHeading
            id="kanallar"
            eyebrow={c.channels.eyebrow}
            title={
              <>
                Size en uygun <span className="text-gradient">kanalı seçin</span>
              </>
            }
            description={c.channels.description}
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_1fr]">
            {/* Teklif formu — her zaman açık birincil kanal */}
            <div data-reveal className="relative overflow-hidden rounded-[var(--radius-panel)] bg-[#071b24] p-8 text-white sm:p-10">
              <div aria-hidden="true" className="animate-aurora-a absolute -left-24 -top-24 size-[380px] rounded-full bg-[#087f6d]/40 blur-[100px]" />
              <div aria-hidden="true" className="animate-aurora-b absolute -bottom-32 right-0 size-[320px] rounded-full bg-[#087ea4]/35 blur-[100px]" />
              <span className="relative grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-[#2fb59b] to-[#3aa9d1] text-[#04201b]">
                <FileText aria-hidden="true" className="size-6" />
              </span>
              <h3 className="relative mt-6 font-display text-2xl font-bold sm:text-3xl">{c.channels.form.title}</h3>
              <p className="relative mt-3 max-w-md text-white/75">{c.channels.form.text}</p>
              <Link
                href="/teklif-al"
                className="group/btn ind-primary relative mt-8 inline-flex min-h-14 items-center justify-between gap-3 rounded-full bg-gradient-to-r from-[#2fb59b] to-[#3aa9d1] pl-7 pr-2 font-bold text-[#04201b] shadow-[0_18px_40px_-14px_rgb(47_181_155/0.9)] transition-transform hover:-translate-y-0.5"
              >
                {c.channels.form.cta}
                <span className="grid size-10 place-items-center rounded-full bg-[#04201b] text-white">
                  <ArrowRight aria-hidden="true" className="size-4" />
                </span>
              </Link>
            </div>

            {channels.length > 0 ? (
              <ul className="grid gap-4">
                {channels.map((ch, i) => {
                  const Icon = ch.icon;
                  const inner = (
                    <>
                      <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-mint text-on-mint">
                        <Icon aria-hidden="true" className="size-5" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm text-muted">{ch.title}</span>
                        <span className="block whitespace-pre-line break-words font-display text-lg font-bold text-foreground">{ch.value}</span>
                        <span className="block text-sm text-muted">{ch.text}</span>
                      </span>
                    </>
                  );
                  const cls = "flex items-center gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5";
                  return (
                    <li key={ch.key} data-reveal style={{ "--reveal-i": i } as React.CSSProperties}>
                      {ch.href ? (
                        <a
                          href={ch.href}
                          {...(ch.external ? { target: "_blank", rel: "noopener" } : {})}
                          className={`${cls} transition-[box-shadow,border-color] hover:border-primary/40 hover:shadow-md`}
                        >
                          {inner}
                        </a>
                      ) : (
                        <div className={cls}>{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div data-reveal className="flex flex-col justify-center rounded-[var(--radius-panel)] border border-dashed border-border-strong bg-sunken p-8">
                <span className="grid size-12 place-items-center rounded-2xl bg-surface text-muted">
                  <Clock aria-hidden="true" className="size-5" />
                </span>
                <p className="mt-5 leading-relaxed text-muted">{c.channels.pendingNote}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ───────── Talep hazırlığı ───────── */}
      <section aria-labelledby="hazirlik" className="section-y bg-sunken">
        <div className="container-page grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+48px)] lg:self-start">
            <SectionHeading
              id="hazirlik"
              eyebrow={c.checklist.eyebrow}
              title={
                <>
                  Mesajınızda <span className="text-gradient">bunları paylaşın</span>
                </>
              }
              description={c.checklist.description}
            />
          </div>
          <ol className="grid gap-3">
            {c.checklist.items.map((it, i) => (
              <li
                key={it.title}
                data-reveal
                style={{ "--reveal-i": i } as React.CSSProperties}
                className="flex gap-4 rounded-[var(--radius-card)] border border-border bg-surface p-5"
              >
                <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Check aria-hidden="true" className="size-4" />
                </span>
                <span>
                  <span className="block font-display font-bold text-foreground">{it.title}</span>
                  <span className="mt-0.5 block text-muted">{it.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────── Bölgeler ───────── */}
      <section aria-labelledby="bolgeler" className="section-y">
        <div className="container-page">
          <div className="relative grid overflow-hidden rounded-[2rem] border border-border bg-surface lg:grid-cols-2">
            <div className="relative min-h-64 lg:min-h-full">
              <Photo asset={media.istanbulMaidenTower} sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
            <div className="p-8 sm:p-12">
              <Eyebrow>{c.regions.eyebrow}</Eyebrow>
              <h2 id="bolgeler" className="mt-5 text-h2 font-bold text-foreground">
                İstanbul’un <span className="text-gradient">iki yakasında</span>
              </h2>
              <p className="mt-5 text-muted">{c.regions.text}</p>
              <dl className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-mint/60 p-5">
                  <dt className="text-sm text-muted">Anadolu Yakası</dt>
                  <dd className="font-display text-3xl font-extrabold text-on-mint">{anadolu} ilçe</dd>
                </div>
                <div className="rounded-2xl bg-ice p-5">
                  <dt className="text-sm text-muted">Avrupa Yakası</dt>
                  <dd className="font-display text-3xl font-extrabold text-foreground">{avrupa} ilçe</dd>
                </div>
              </dl>
              <Link
                href="/hizmet-bolgeleri"
                className="mt-8 inline-flex min-h-12 items-center gap-1.5 rounded-full bg-navy px-6 font-semibold text-white dark:bg-primary dark:text-primary-foreground"
              >
                {c.regions.cta} <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
            </div>
          </div>
          <p className="mt-8 flex items-start gap-3 text-sm leading-relaxed text-muted">
            <ShieldCheck aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
            <span>
              {c.privacy}{" "}
              <Link href="/kvkk-aydinlatma-metni" className="font-semibold text-primary hover:underline">
                KVKK Aydınlatma Metni
              </Link>
            </span>
          </p>
        </div>
      </section>
    </>
  );
}
