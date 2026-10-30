import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import logoFull from "../../../public/images/brand/istilaclama-logo.png";
import logoMark from "../../../public/images/brand/istilaclama-logo-header.png";

/**
 * Firma logosu.
 * - `header`: sloganı görselden çıkarılmış sürüm + slogan gerçek metin olarak (küçük boyutta okunur kalsın diye).
 * - `full`: orijinal logo (footer gibi geniş alanlar).
 */
export function Logo({
  className,
  priority = true,
  variant = "header",
}: {
  className?: string;
  priority?: boolean;
  variant?: "header" | "full";
}) {
  if (variant === "full") {
    return (
      <Link href="/" aria-label="İST İlaçlama ana sayfa" className={cn("inline-flex min-h-12 shrink-0 items-center rounded-lg", className)}>
        <Image src={logoFull} alt="istilaclama.com.tr logosu" sizes="(min-width:640px) 270px, 220px" preload={priority} className="h-16 w-auto sm:h-20" />
      </Link>
    );
  }
  return (
    <Link href="/" aria-label="İST İlaçlama ana sayfa" className={cn("group inline-flex shrink-0 flex-col items-center justify-center rounded-lg", className)}>
      <Image
        src={logoMark}
        alt="istilaclama.com.tr logosu"
        sizes="(min-width:1280px) 240px, 180px"
        preload={priority}
        className="h-[2.75rem] w-auto max-w-none shrink-0 object-contain sm:h-[3.25rem] lg:h-[2.75rem] xl:h-[4.25rem]"
      />
      <span className="mt-1 hidden whitespace-nowrap text-center text-[0.5625rem] font-semibold uppercase leading-none tracking-[0.06em] text-navy/75 sm:block lg:hidden xl:block xl:text-[0.625rem] dark:text-foreground/70">
        Daha sağlıklı, daha güvenli yaşam alanları
      </span>
    </Link>
  );
}
