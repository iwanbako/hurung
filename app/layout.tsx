// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// ✅ TAMBAHKAN IMPORT INI
import ScrollToTop from "@/components/common/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ============================================================
// KONSTANTA
// ============================================================
const SITE_URL = "https://kerabatweb.com";
const SITE_NAME = "KerabatWeb";

// ============================================================
// METADATA
// ============================================================
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "KerabatWeb - Jasa Pembuatan Website Profesional, Cepat & Ramah SEO",
    template: `%s | ${SITE_NAME}`,
  },

  description:
    "Jasa pembuatan website landing page, company profile, dan toko online (e-commerce) bergaransi resmi. Pengerjaan kilat 3-5 hari, bebas domain & SSL, harga transparan mulai Rp 999rb.",

  keywords: [
    "jasa pembuatan website",
    "buat landing page murah",
    "jasa company profile profesional",
    "pembuatan toko online e-commerce",
    "jasa web design seo friendly",
    "kerabatweb",
  ],

  authors: [{ name: "KerabatWeb Team", url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/web-app-manifest-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/web-app-manifest-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },

  manifest: "/site.webmanifest",

  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "KerabatWeb - Jasa Pembuatan Website Profesional & Bergaransi",
    description:
      "Solusi digital bisnis Anda: Landing Page, Company Profile, dan E-Commerce dengan performa super cepat dan ramah SEO.",
    images: [
      {
        url: "/web-app-manifest-512x512.png", 
        width: 512,
        height: 512,
        alt: "KerabatWeb Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "KerabatWeb - Jasa Pembuatan Website Profesional & Bergaransi",
    description:
      "Buat website bisnis Anda sekarang juga. Cepat, aman, dan siap mendatangkan cuan!",
    images: ["/web-app-manifest-512x512.png"],
  },

  alternates: {
    canonical: SITE_URL,
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

// ============================================================
// VIEWPORT
// ============================================================
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#003580" },
    { media: "(prefers-color-scheme: dark)", color: "#001f4d" },
  ],
  colorScheme: "light",
};

// ============================================================
// ROOT LAYOUT
// ============================================================
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {/* ✅ TAMBAHKAN KOMPONEN INI DI SINI */}
        <ScrollToTop />
        
        {children}
      </body>
    </html>
  );
}