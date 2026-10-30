import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Başlığı kelimelere böler; her kelime `.w` span'ı olur ve [data-split] görünür olunca sırayla netleşir.
 * Metin DOM'da aynen kalır (SEO/ekran okuyucu etkilenmez). İç içe <span> (ör. gradyan vurgu) desteklenir.
 */
function splitWords(node: ReactNode, counter: { i: number }): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, k) =>
      /^\s+$/.test(part) || part === "" ? (
        part
      ) : (
        <span key={`${counter.i}-${k}`} className="w" style={{ "--w": counter.i++ } as React.CSSProperties}>
          {part}
        </span>
      ),
    );
  }
  if (Array.isArray(node)) return node.map((n) => splitWords(n, counter));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    return cloneElement(el, { key: el.key ?? counter.i }, Children.map(el.props.children, (c) => splitWords(c, counter)));
  }
  return node;
}

export function SplitHeading({ children }: { children: ReactNode }) {
  return <>{splitWords(children, { i: 0 })}</>;
}

export function Eyebrow({
  children,
  className,
  tone = "default",
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "light";
}) {
  return (
    <p
      className={cn(
        "eyebrow-pill relative inline-flex items-center gap-2 overflow-hidden rounded-full border py-1.5 pl-2 pr-3.5 text-[0.75rem] font-semibold uppercase tracking-[0.16em]",
        tone === "light"
          ? "border-white/15 bg-white/[0.08] text-[#8fe3d2] backdrop-blur-md"
          : "border-primary/15 bg-mint/70 text-on-mint",
        className,
      )}
    >
      <span className="relative grid size-4 place-items-center">
        <span aria-hidden="true" className="absolute inset-0 animate-pulse-ring rounded-full bg-current opacity-40" />
        <span className="size-1.5 rounded-full bg-current" />
      </span>
      {children}
    </p>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  action,
  tone = "default",
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  id?: string;
  action?: ReactNode;
  tone?: "default" | "light";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        align === "center" && "items-center text-center md:flex-col md:items-center",
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow && (
          <div data-reveal>
            <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
          </div>
        )}
        <h2
          id={id}
          data-split
          className={cn("mt-5 text-h2 font-bold", tone === "light" ? "text-white" : "text-foreground")}
        >
          <SplitHeading>{title}</SplitHeading>
        </h2>
        {description && (
          <p
            data-reveal
            style={{ "--reveal-i": 3 } as React.CSSProperties}
            className={cn(
              "mt-5 max-w-2xl text-lead",
              align === "center" && "mx-auto",
              tone === "light" ? "text-white/75" : "text-muted",
            )}
          >
            {description}
          </p>
        )}
      </div>
      {action && (
        <div data-reveal style={{ "--reveal-i": 4 } as React.CSSProperties} className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
