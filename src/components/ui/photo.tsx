import Image from "next/image";
import type { MediaAsset } from "@/content/media";
import { cn } from "@/lib/utils";

/**
 * Tek görsel bileşeni: next/image → AVIF/WebP, srcset/sizes, width/height (CLS yok).
 * `fill` modunda kapsayıcı boyutu belirler; odak noktası asset'ten gelir.
 */
export function Photo({
  asset,
  sizes,
  className,
  priority = false,
  fill = true,
  decorative = false,
}: {
  asset: MediaAsset;
  sizes: string;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  decorative?: boolean;
}) {
  const common = {
    src: asset.src,
    sizes,
    preload: priority,
    fetchPriority: priority ? "high" : undefined,
    loading: priority ? undefined : "lazy",
    className: cn("object-cover", className),
    style: { objectPosition: asset.focus ?? "50% 50%" },
  } as const;
  return fill ? (
    <Image {...common} alt={decorative ? "" : asset.alt} fill />
  ) : (
    <Image {...common} alt={decorative ? "" : asset.alt} width={asset.width} height={asset.height} />
  );
}
