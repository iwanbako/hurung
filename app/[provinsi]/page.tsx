// app/[provinsi]/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
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
// KOMPONEN ANAK
// ------------------------------------------------------------
async function ProvinsiContent({ params }: PageProps) {
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
  // JSON-LD (Hanya ProfessionalService, Breadcrumb dihapus)
  // ============================================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `KerabatWeb - Jasa Website ${content.nama}`,
    image: `${SITE_URL}/og-image.jpg`,
    url,
    telephone: "+6285938573419",
    priceRange: "Rp 999.000 - Rp 4.500.000",
    areaServed: { "@type": "State", name: content.nama },
    address: { "@type": "PostalAddress", addressCountry: "ID" },
    description: content.metaDescription,
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
      {/* Structured Data (Hanya ProfessionalService) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#003580] text-white flex flex-col min-h-screen">
        <Header />

        {/* BREADCRUMB (Komponen ini sudah otomatis membuat schema JSON-LD) */}
        <Breadcrumb items={breadcrumbItems} />

        <main className="flex-1 w-full">
          {/* HERO */}
          <HeroSection
            waNumber={waNumber}
            badge={content.hero.badge}
            headline={content.hero.headline}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
          />

          {/* SERVICES */}
          <ServicesSection
            title={content.services.title}
            subtitle={content.services.subtitle}
          />

          {/* WORKFLOW */}
          <WorkflowSection />

          {/* WHY US */}
          <WhyUsSection
            title={content.whyUs.title}
            subtitle={content.whyUs.subtitle}
            points={content.whyUs.points}
          />

          {/* GUARANTEE */}
          <GuaranteeSection />

          {/* TECH PARTNERS */}
          <TechPartners />

          {/* PROBLEM & SOLUTION */}
          <ProblemSolutionSection
            title={content.problemSolution.title}
            subtitle={content.problemSolution.subtitle}
            problems={content.problemSolution.problems}
            solutions={content.problemSolution.solutions}
          />

          {/* PORTFOLIO */}
          <PortfolioSection
            title={content.portfolio.title}
            subtitle={content.portfolio.subtitle}
          />

          {/* TESTIMONIAL */}
          <TestimonialSection
            title={content.testimonial.title}
            subtitle={content.testimonial.subtitle}
          />

          {/* WEB vs SOSMED */}
          <WebVsSosmedSection />

          {/* PRICING */}
          <PricingSection
            pricing={pricingData}
            waNumber={waNumber}
            note={content.pricingNote}
          />

          {/* FAQ */}
          <FaqSection faqs={content.faqs} waNumber={waNumber} />

          {/* FINAL CTA */}
          <FinalCtaSection
            waNumber={waNumber}
            title={content.finalCta.title}
            subtitle={content.finalCta.subtitle}
          />

          {/* SEMUA KABUPATEN/KOTA DI PROVINSI INI (chip kecil, klik-able) */}
          <ProvinsiRegenciesSection
            provinsiName={content.nama}
            provinsiSlug={provinsi}
            regencies={regencies}
          />
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

// ------------------------------------------------------------
// PAGE UTAMA
// ------------------------------------------------------------
export default function ProvinsiPage({ params }: PageProps) {
  return (
    <Suspense
      fallback={
        <div className="bg-[#003580] min-h-screen flex items-center justify-center text-white">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[#FEBB02] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-sm text-blue-200">Memuat halaman...</p>
          </div>
        </div>
      }
    >
      <ProvinsiContent params={params} />
    </Suspense>
  );
}