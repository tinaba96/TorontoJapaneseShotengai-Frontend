import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Serif_JP } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
// AdSense パブリッシャーID（公開情報）。env で上書き可、未設定時は直値をフォールバック。
const ADSENSE_CLIENT =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT || "ca-pub-8140225190723823";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const notoSerifJP = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["400", "500", "600", "700", "900"],
});

const SITE_NAME = "Toronto Japanese Shotengai Rentals";
const SITE_DESC =
  "日本からトロントに来る方へ。安心して住める家具付き賃貸を、到着前からオンライン内見・予約できます。";
const OG_IMAGE = "/images/rental/garden-1.jpg"; // SNSプレビュー画像（横長・差し替え可）

export const metadata: Metadata = {
  metadataBase: new URL("https://www.toronto-shotengai.com"),
  title: SITE_NAME + " — トロントの信頼できる賃貸",
  description: SITE_DESC,
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESC,
    url: "https://www.toronto-shotengai.com",
    siteName: SITE_NAME,
    images: [{ url: OG_IMAGE, alt: SITE_NAME }],
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESC,
    images: [OG_IMAGE],
  },
  other: {
    // AdSense 所有権確認用メタタグ
    "google-adsense-account": ADSENSE_CLIENT,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} ${notoSerifJP.variable}`}
    >
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
      {ADSENSE_CLIENT && (
        <Script
          id="adsbygoogle-init"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </html>
  );
}
