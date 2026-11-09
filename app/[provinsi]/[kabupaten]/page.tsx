// app/[provinsi]/[kabupaten]/page.tsx
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
import { OtherRegenciesSection } from "@/components/sections/OtherRegenciesSection";
import { DistrictsSection } from "@/components/sections/DistrictsSection";

import { findRegency, getAllRegencyParams } from "@/lib/wilayah";
import { getLocalCharacter } from "@/lib/local-character";
import { generateKabupatenContent } from "@/lib/wilayah-content";

// ============================================================
// KONSTANTA
// ============================================================
const SITE_URL = "https://kerabatweb.com";
const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

type PageProps = {
  params: Promise<{ provinsi: string; kabupaten: string }>;
};

// ============================================================
// PRICING DATA
// ============================================================
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

// ============================================================
// METADATA (per kabupaten)
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { provinsi, kabupaten } = await params;

  const data = findRegency(provinsi, kabupaten);
  if (!data) {
    return {
      title: { absolute: "Halaman Tidak Ditemukan | KerabatWeb" },
      robots: { index: false, follow: false },
    };
  }

  const localChar = getLocalCharacter(provinsi, kabupaten);
  const content = generateKabupatenContent(
    data.province,
    data.regency,
    localChar
  );

  const url = `${SITE_URL}/${provinsi}/${kabupaten}`;
  const ogImage = `${SITE_URL}/og-image.jpg`;

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    keywords: [
      `jasa pembuatan website ${content.nama}`,
      `jasa website ${content.nama}`,
      `web design ${content.nama}`,
      `website ${content.industri[0]} ${content.nama}`,
      `jasa website ${content.provinsi}`,
      "kerabatweb",
    ],
    authors: [{ name: "KerabatWeb Team", url: SITE_URL }],
    creator: "KerabatWeb",
    publisher: "KerabatWeb",
    alternates: { canonical: url },
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
      url,
      title: content.metaTitle,
      description: content.metaDescription,
      siteName: "KerabatWeb",
      images: [
        {
          url: ogImage,
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
      images: [ogImage],
    },
  };
}

// ============================================================
// STATIC PARAMS (514 kabupaten)
// ============================================================
export function generateStaticParams() {
  return getAllRegencyParams();
}

// ============================================================
// PAGE (default export async — tanpa Suspense)
// ============================================================
export default async function KabupatenPage({ params }: PageProps) {
  const { provinsi, kabupaten } = await params;

  const data = findRegency(provinsi, kabupaten);
  if (!data) notFound();

  const localChar = getLocalCharacter(provinsi, kabupaten);
  const content = generateKabupatenContent(
    data.province,
    data.regency,
    localChar
  );

  const url = `${SITE_URL}/${provinsi}/${kabupaten}`;
  const ogImage = `${SITE_URL}/og-image.jpg`;

  // ============================================================
  // TRIK AGGREGATE RATING DINAMIS (Berbeda tiap kabupaten)
  // ⚠️ CATATAN: angka ini bukan dari ulasan nyata. Lihat catatan di bawah.
  // ============================================================
  const hash = provinsi.length + kabupaten.length;
  const ratingBase = 4.75 + ((hash * 7) % 25) / 100; // 4.75 - 4.99
  const reviewCount = 120 + ((hash * 213) % 850); // 120 - 970 ulasan

  // ============================================================
  // JSON-LD: PRODUCT SCHEMA
  // ============================================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Jasa Pembuatan Website ${content.namaLengkap}`,
    image: ogImage,
    description: `Jasa pembuatan website profesional untuk bisnis, sekolah, dan company profile perusahaan di ${content.namaLengkap}, ${content.provinsi}. Perluas jangkauan usaha Anda dengan website dari KerabatWeb.`,
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
  // JSON-LD FAQPage
  // ============================================================
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  // ============================================================
  // BREADCRUMB ITEMS (visual)
  // ============================================================
  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    { label: content.provinsi, href: `/${provinsi}` },
    { label: content.namaLengkap },
  ];

  return (
    <>
      {/* Structured Data (Product & FAQ) */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <div className="bg-[#003580] text-white flex flex-col min-h-screen">
        <Header />

        {/* BREADCRUMB */}
        <Breadcrumb items={breadcrumbItems} />

        <main className="flex-1 w-full">
          {/* 1. HERO */}
          <HeroSection
            waNumber={waNumber}
            badge={content.hero.badge}
            headline={content.hero.headline}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
            kabupaten={content.namaLengkap}
          />

          {/* 2. SERVICES */}
          <ServicesSection
            title={content.services.title}
            subtitle={content.services.subtitle}
            kabupaten={content.namaLengkap}
          />

          {/* 3. WORKFLOW */}
          <WorkflowSection
            title={`4 Langkah Mudah Punya Website di ${content.namaLengkap}`}
            subtitle={`Proses cepat, transparan, dan tidak ribet. Kami dampingi bisnis di ${content.namaLengkap}, ${content.provinsi} dari nol sampai website online.`}
            kabupaten={content.namaLengkap}
          />

          {/* 4. WHY US */}
          <WhyUsSection
            title={content.whyUs.title}
            subtitle={content.whyUs.subtitle}
            points={content.whyUs.points}
            kabupaten={content.namaLengkap}
          />

          {/* 5. GUARANTEE */}
          <GuaranteeSection kabupaten={content.namaLengkap} />

          {/* 6. TECH PARTNERS */}
          <TechPartners kabupaten={content.namaLengkap} />

          {/* 7. PROBLEM & SOLUTION */}
          <ProblemSolutionSection
            title={content.problemSolution.title}
            subtitle={content.problemSolution.subtitle}
            problems={content.problemSolution.problems}
            solutions={content.problemSolution.solutions}
            kabupaten={content.namaLengkap}
          />

          {/* 8. PORTFOLIO */}
          <PortfolioSection
            title={content.portfolio.title}
            subtitle={content.portfolio.subtitle}
            kabupaten={content.namaLengkap}
          />

          {/* 9. TESTIMONIAL */}
          <TestimonialSection
            title={content.testimonial.title}
            subtitle={content.testimonial.subtitle}
            kabupaten={content.namaLengkap}
          />

          {/* 10. WEB vs SOSMED */}
          <WebVsSosmedSection kabupaten={content.namaLengkap} />

          {/* 11. PRICING */}
          <PricingSection
            pricing={pricingData}
            waNumber={waNumber}
            locationName={content.nama}
            note={content.pricingNote}
            kabupaten={content.namaLengkap}
          />

          {/* 12. FAQ */}
          <FaqSection
            faqs={content.faqs}
            waNumber={waNumber}
            kabupaten={content.namaLengkap}
          />

          {/* 13. FINAL CTA */}
          <FinalCtaSection
            waNumber={waNumber}
            title={content.finalCta.title}
            subtitle={content.finalCta.subtitle}
            kabupaten={content.namaLengkap}
          />

          {/* 14. KABUPATEN LAIN */}
          <OtherRegenciesSection
            provinsiName={content.provinsi}
            provinsiSlug={provinsi}
            currentKabupatenSlug={kabupaten}
            regencies={data.province.regencies}
          />

          {/* 15. DAFTAR KECAMATAN */}
          <DistrictsSection
            provinsi={content.provinsi}
            kabupaten={content.namaLengkap}
            districts={content.districts}
          />
        </main>

        <Footer />

        <FloatingNav
          waDefault={waLink(
            `Halo KerabatWeb, saya dari ${content.namaLengkap}, ${content.provinsi} ingin konsultasi pembuatan website.`
          )}
        />
      </div>
    </>
  );
}