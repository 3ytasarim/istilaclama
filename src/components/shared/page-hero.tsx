import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Sayfa konumu">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted">
        <li>
          <Link href="/" className="inline-flex min-h-8 items-center hover:text-foreground">
            Ana Sayfa
          </Link>
        </li>
        {items.map((c) => (
          <li key={c.label} className="flex items-center gap-1.5">
            <ChevronRight aria-hidden="true" className="size-3.5" />
            {c.href ? (
              <Link href={c.href} className="inline-flex min-h-8 items-center hover:text-foreground">
                {c.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-foreground">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  crumbs,
  eyebrow,
  title,
  description,
  children,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_80%_at_0%_0%,var(--surface-mint),transparent_60%),radial-gradient(60%_70%_at_100%_0%,var(--surface-ice),transparent_60%)]"
      />
      <div aria-hidden="true" className="grid-lines absolute inset-0 -z-10 opacity-50 [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
      <div className="container-page pb-14 pt-8 sm:pb-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-10 max-w-3xl">
          {eyebrow && (
            <p className="text-[0.8125rem] font-semibold uppercase tracking-[0.14em] text-on-mint">{eyebrow}</p>
          )}
          <h1 className="mt-3 text-page font-extrabold text-foreground">{title}</h1>
          {description && <p className="mt-5 text-lead text-muted">{description}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

/** İçeriği henüz CMS'te tamamlanmamış sayfalar için dürüst durum notu (yayın öncesi). */
export function DraftNotice({ children }: { children: ReactNode }) {
  return (
    <div className="container-page py-14">
      <div className="rounded-[var(--radius-card)] border border-dashed border-border-strong bg-sunken p-8 text-muted">
        {children}
      </div>
    </div>
  );
}
