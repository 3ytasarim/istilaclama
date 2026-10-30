import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "light" | "outline-light";
type Size = "md" | "lg";

const base =
  "group/btn inline-flex min-h-12 whitespace-nowrap items-center justify-center gap-2 rounded-full font-semibold tracking-[-0.01em] transition-[background-color,color,box-shadow,transform,border-color] duration-300 ease-[var(--ease-out)] focus-visible:outline-2 focus-visible:outline-offset-3 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-[0_10px_24px_-10px_rgb(8_127_109/0.65)] hover:bg-primary-strong hover:shadow-[0_14px_30px_-10px_rgb(8_127_109/0.7)]",
  secondary:
    "border border-border-strong bg-surface text-foreground shadow-xs hover:border-primary hover:text-primary",
  ghost: "text-foreground hover:bg-sunken",
  light: "bg-white text-navy shadow-md hover:bg-mint",
  "outline-light": "border border-white/35 text-white hover:bg-white/10 hover:border-white/60",
};

const sizes: Record<Size, string> = {
  md: "px-5 text-[0.9375rem]",
  lg: "px-7 text-base",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
};

export function ButtonLink({ variant, size, className, icon, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {children}
      {icon}
    </Link>
  );
}
