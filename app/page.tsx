// app/page.tsx
import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FloatingNav } from "@/components/common/FloatingNav";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { TechPartners } from "@/components/sections/TechPartners";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WebVsSosmedSection } from "@/components/sections/WebVsSosmedSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { AllProvincesSection } from "@/components/sections/AllProvincesSection";

import { provinsiContent } from "@/data/provinsi-content";

const SITE_URL = "https://kerabatweb.com";

export const metadata: Metadata = {
  title: "KerabatWeb - Jasa Pembuatan Website Profesional, Cepat & Ramah SEO",
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
  creator: "KerabatWeb",
  publisher: "KerabatWeb",
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
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: SITE_URL,
    title: "KerabatWeb - Jasa Pembuatan Website Profesional & Bergaransi",
    description:
      "Solusi digital bisnis Anda: Landing Page, Company Profile, dan E-Commerce dengan performa super cepat dan ramah SEO.",
    siteName: "KerabatWeb",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "KerabatWeb - Jasa Pembuatan Website Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "KerabatWeb - Jasa Pembuatan Website Profesional & Bergaransi",
    description:
      "Buat website bisnis Anda sekarang juga. Cepat, aman, dan siap mendatangkan cuan!",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

const pricingData = [
  {
    name: "Gold",
    target: "Paket Website Landing Page / UMKM",
    priceNormal: "Rp 2.500.000",
    pricePromo: "Rp 999.000",
    diskon: "Diskon 60%",
    periode: "PER TAHUN",
    popular: false,
    badge: null,
    features: [
      "Hosting 1 Tahun",
      "Gratis Domain",
      "Gratis Sertifikat SSL",
      "1x Revisi Design Minor",
      "4x Update",
      "SEO & Mobile Friendly",
      "Support Maintenance",
      "Setup 1 Halaman",
      "Input 5 Produk Awal",
      "Button WhatsApp (CTA)",
      "Slider Banner",
    ],
  },
  {
    name: "Platinum",
    target: "Paket Website Company Profile Berkembang",
    priceNormal: "Rp 3.500.000",
    pricePromo: "Rp 1.499.000",
    diskon: "Diskon 57%",
    periode: "PER TAHUN",
    popular: false,
    badge: "Recommended",
    features: [
      "Hosting 1 Tahun",
      "Gratis Domain",
      "Gratis Sertifikat SSL",
      "2x Revisi Design",
      "12x Update",
      "SEO & Mobile Friendly",
      "Support Maintenance",
      "Setup 5 Halaman",
      "Input 10 Produk Awal",
      "Button WhatsApp (CTA)",
      "Slider Banner",
    ],
  },
  {
    name: "Diamond",
    target: "Paket Toko Online / E-Commerce Siap Jualan",
    priceNormal: "Rp 4.500.000",
    pricePromo: "Rp 3.150.000",
    diskon: "Diskon 30%",
    periode: "PER TAHUN",
    popular: true,
    badge: "Terpopuler",
    features: [
      "Hosting 1 Tahun",
      "Gratis Domain",
      "Gratis Sertifikat SSL",
      "2x Revisi Design",
      "12x Update",
      "SEO & Mobile Friendly",
      "Prioritas Support Maintenance",
      "Setup 5 Halaman",
      "Input 10 Produk Awal",
      "Slider Banner",
      "Keranjang Belanja",
      "Fitur Cek Ongkir",
      "Integrasi WhatsApp",
      "Integrasi Marketplace",
    ],
  },
  {
    name: "Custom",
    target: "Solusi Skala Besar & Kebutuhan Khusus",
    priceNormal: "",
    pricePromo: "Sesuai Kebutuhan",
    diskon: "Custom Budget",
    periode: "PER TAHUN",
    popular: false,
    badge: "Fleksibel",
    features: [
      "Hosting Custom",
      "Bisa Pilih Domain",
      "Gratis Sertifikat SSL",
      "3x Revisi Design",
      "12x Update",
      "SEO & Mobile Friendly",
      "Dedicated Support",
      "Halaman Sesuai Kebutuhan",
      "Integrasi Sesuai Kebutuhan",
      "Design Custom",
      "Akses Penuh",
      "Dan lain-lain",
    ],
  },
];

const faqsData = [
  {
    q: "Berapa lama proses pengerjaan pembuatan website?",
    a: "Paket Gold selesai dalam 3–5 hari kerja, Platinum 7–10 hari, sedangkan Diamond atau Custom memakan waktu 2–3 minggu tergantung tingkat kompleksitas fitur.",
  },
  {
    q: "Apakah sudah termasuk domain dan hosting?",
    a: "Ya! Paket Gold, Platinum, dan Diamond sudah termasuk gratis domain (.com / my.id) selama 1 tahun penuh beserta hosting performa tinggi.",
  },
  {
    q: "Apakah saya bisa melakukan revisi selama proses pembuatan?",
    a: "Tentu saja. Setiap paket sudah mencakup kuota revisi desain (minor hingga standar) agar hasil akhirnya sesuai dengan keinginan Anda.",
  },
  {
    q: "Apakah website dijamin ramah SEO (Search Engine Optimization)?",
    a: "Sangat ramah SEO. Setiap website dibangun dengan struktur kode semantik yang bersih, kecepatan muat super cepat, serta meta tags lengkap.",
  },
];

export default function HomePage() {
  // ============================================================
  // Daftar semua provinsi (untuk internal link di bawah CTA)
  // ============================================================
  const allProvinsi = Object.values(provinsiContent).map((p) => ({
    nama: p.nama,
    slug: p.slug,
  }));

  // Structured Data Schema.org JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "KerabatWeb",
    image: `${SITE_URL}/og-image.jpg`,
    url: SITE_URL,
    telephone: "+6285938573419",
    priceRange: "Rp 999.000 - Rp 4.500.000",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
    },
    description:
      "Jasa pembuatan website profesional, cepat, dan ramah SEO untuk UMKM dan perusahaan.",
    sameAs: [SITE_URL],
  };

  return (
    <>
      {/* Script Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#003580] text-white flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 w-full">
          <HeroSection waNumber={waNumber} />
          <ServicesSection />
          <WorkflowSection />
          <WhyUsSection />
          <GuaranteeSection />
          <TechPartners />
          <ProblemSolutionSection />
          <PortfolioSection />
          <TestimonialSection />
          <WebVsSosmedSection />
          <PricingSection pricing={pricingData} waNumber={waNumber} />
          <FaqSection faqs={faqsData} waNumber={waNumber} />
          <FinalCtaSection waNumber={waNumber} />

          {/* SEMUA PROVINSI (chip kecil klik-able) */}
          <AllProvincesSection provinsiList={allProvinsi} />
        </main>
        <Footer />
        <FloatingNav
          waDefault={waLink(
            "Halo KerabatWeb, saya ingin konsultasi pembuatan website."
          )}
        />
      </div>
    </>
  );
}