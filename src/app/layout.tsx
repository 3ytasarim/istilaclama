import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { JsonLd } from "@/components/shared/json-ld";
import { SITE_INDEXABLE, SITE_URL, absoluteUrl } from "@/lib/site";
import { BRAND, DEFAULT_OG_IMAGE, LOCALE } from "@/lib/seo/metadata";
import { PAGE_SEO } from "@/lib/seo/keywords";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/jsonld";
import { getSiteSettings } from "@/server/content";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `${PAGE_SEO.home.title} | ${BRAND}`, template: `%s | ${BRAND}` },
  description: PAGE_SEO.home.description,
  applicationName: BRAND,
  // Yayına alınana kadar arama motorlarına kapalı (SITE_INDEXABLE=true ile açılır)
  robots: SITE_INDEXABLE ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    type: "website",
    locale: LOCALE,
    siteName: BRAND,
    images: [
      {
        url: absoluteUrl(DEFAULT_OG_IMAGE.src),
        alt: DEFAULT_OG_IMAGE.alt,
        width: DEFAULT_OG_IMAGE.width,
        height: DEFAULT_OG_IMAGE.height,
      },
    ],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#081c25" },
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="tr" className={`${inter.variable} ${jakarta.variable}`} suppressHydrationWarning>
      <head>
        {/* Reveal animasyonu yalnız JS varken etkin; JS yoksa içerik görünür kalır */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <JsonLd data={[organizationJsonLd(settings), websiteJsonLd()]} />
        {children}
      </body>
    </html>
  );
}
