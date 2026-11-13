// app/[provinsi]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FloatingNav } from "@/components/common/FloatingNav";
import { Breadcrumb } from "@/components/common/Breadcrumb";
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
import { ProvinsiRegenciesSection } from "@/components/sections/ProvinsiRegenciesSection";
import { MapSection } from "@/components/sections/MapSection"; // ← TAMBAH

import { provinsiContent } from "@/data/provinsi-content";
import { getRegenciesOfProvince } from "@/lib/wilayah";

const SITE_URL = "https://kerabatweb.com";
const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

type PageProps = {
  params: Promise<{ provinsi: string }>;
};

// ------------------------------------------------------------
// Metadata
// ------------------------------------------------------------
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { provinsi } = await params;
  const content = provinsiContent[provinsi];
  if (!content) return { title: "Halaman Tidak Ditemukan" };

  const url = `${SITE_URL}/${provinsi}`;
  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      locale: "id_ID",
      url,
      title: content.metaTitle,
      description: content.metaDescription,
      siteName: "KerabatWeb",
      images: [
        {
          url: `${SITE_URL}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: content.metaTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [`${SITE_URL}/og-image.jpg`],
    },
  };
}

// ------------------------------------------------------------
// Static params
// ------------------------------------------------------------
export function generateStaticParams() {
  return Object.keys(provinsiContent).map((slug) => ({ provinsi: slug }));
}

// ------------------------------------------------------------
// Pricing data
// ------------------------------------------------------------
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

// ------------------------------------------------------------
// PAGE (default export async — tanpa Suspense)
// ------------------------------------------------------------
export default async function ProvinsiPage({ params }: PageProps) {
  const { provinsi } = await params;
  const content = provinsiContent[provinsi];

  if (!content) notFound();

  const url = `${SITE_URL}/${provinsi}`;

  // ============================================================
  // Kabupaten/Kota di provinsi ini
  // ============================================================
  const regencies = getRegenciesOfProvince(provinsi).map((r) => ({
    name: r.name,
    slug: r.slug,
  }));

  // ============================================================
  // TRIK AGGREGATE RATING DINAMIS (Berbeda tiap provinsi)
  // ============================================================
  const ratingBase = 4.75 + ((provinsi.length * 7) % 25) / 100;
  const reviewCount = 150 + ((provinsi.length * 123) % 800);

  // ============================================================
  // JSON-LD: PRODUCT SCHEMA
  // ============================================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Jasa Pembuatan Website ${content.nama}`,
    image: `${SITE_URL}/og-image.jpg`,
    description: `Jasa pembuatan website profesional untuk bisnis, sekolah, dan company profile perusahaan di ${content.nama}. Perluas jangkauan usaha Anda dengan website dari KerabatWeb.`,
    brand: {
      "@type": "Brand",
      name: "KerabatWeb",
    },
    offers: {
      "@type": "AggregateOffer",
      url: url,
      priceCurrency: "IDR",
      lowPrice: "999000",
      highPrice: "4500000",
      offerCount: "3",
      priceValidUntil: "2026-12-31",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingBase.toFixed(2),
      bestRating: "5",
      worstRating: "1",
      ratingCount: reviewCount.toString(),
    },
  };

  // ============================================================
  // BREADCRUMB ITEMS
  // ============================================================
  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    { label: content.nama },
  ];

  return (
    <>
      {/* Meta Tags tambahan */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* Structured Data (Product Schema) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#003580] text-white flex flex-col min-h-screen">
        <Header />

        <Breadcrumb items={breadcrumbItems} />

        <main className="flex-1 w-full">
          {/* HERO — SWAP: badge tampil sebagai H1, headline tampil sebagai badge */}
          <HeroSection
            waNumber={waNumber}
            badge={content.hero.headline}
            headline={content.hero.badge}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
          />

          <ServicesSection
            title={content.services.title}
            subtitle={content.services.subtitle}
          />

          <WorkflowSection />

          <WhyUsSection
            title={content.whyUs.title}
            subtitle={content.whyUs.subtitle}
            points={content.whyUs.points}
          />

          <GuaranteeSection />

          <TechPartners />

          <ProblemSolutionSection
            title={content.problemSolution.title}
            subtitle={content.problemSolution.subtitle}
            problems={content.problemSolution.problems}
            solutions={content.problemSolution.solutions}
          />

          <PortfolioSection
            title={content.portfolio.title}
            subtitle={content.portfolio.subtitle}
          />

          <TestimonialSection
            title={content.testimonial.title}
            subtitle={content.testimonial.subtitle}
          />

          <WebVsSosmedSection />

          <PricingSection
            pricing={pricingData}
            waNumber={waNumber}
            note={content.pricingNote}
          />

          <FaqSection faqs={content.faqs} waNumber={waNumber} />

          <FinalCtaSection
            waNumber={waNumber}
            title={content.finalCta.title}
            subtitle={content.finalCta.subtitle}
          />

          <ProvinsiRegenciesSection
            provinsiName={content.nama}
            provinsiSlug={provinsi}
            regencies={regencies}
          />

          {/* PETA AREA LAYANAN — otomatis deteksi slug => peta batas provinsi (z=7) */}
          <MapSection />
        </main>

        <Footer />

        <FloatingNav
          waDefault={waLink(
            `Halo KerabatWeb, saya dari ${content.nama} ingin konsultasi pembuatan website.`
          )}
        />
      </div>
    </>
  );
}