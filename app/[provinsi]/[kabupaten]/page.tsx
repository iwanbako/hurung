// app/[provinsi]/[kabupaten]/page.tsx
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
// KONTEN
// ============================================================
async function KabupatenContent({ params }: PageProps) {
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
  // JSON-LD ProfessionalService
  // ============================================================
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: `KerabatWeb - Jasa Website ${content.namaLengkap}`,
    image: ogImage,
    url,
    telephone: "+6285938573419",
    priceRange: "Rp 999.000 - Rp 4.500.000",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: `${content.namaLengkap}, ${content.provinsi}`,
      },
      {
        "@type": "AdministrativeArea",
        name: content.provinsi,
      },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "ID",
      addressRegion: content.provinsi,
    },
    description: content.metaDescription,
    serviceType: [
      "Jasa Pembuatan Website",
      "Jasa Landing Page",
      "Jasa Company Profile",
      "Jasa Toko Online",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `Paket Website ${content.namaLengkap}`,
      itemListElement: [
        {
          "@type": "Offer",
          name: "Paket Gold",
          price: "999000",
          priceCurrency: "IDR",
          description: "Landing page UMKM, selesai 3-5 hari",
        },
        {
          "@type": "Offer",
          name: "Paket Platinum",
          price: "1499000",
          priceCurrency: "IDR",
          description: "Company profile, selesai 7-10 hari",
        },
        {
          "@type": "Offer",
          name: "Paket Diamond",
          price: "3150000",
          priceCurrency: "IDR",
          description: "Toko online siap jualan",
        },
      ],
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
  // JSON-LD BreadcrumbList
  // ============================================================
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Beranda",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: content.provinsi,
        item: `${SITE_URL}/${provinsi}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: content.namaLengkap,
        item: url,
      },
    ],
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
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
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
          />

          {/* 2. SERVICES */}
          <ServicesSection
            title={content.services.title}
            subtitle={content.services.subtitle}
          />

          {/* 3. WORKFLOW — title & subtitle dinamis per kabupaten */}
          <WorkflowSection
            title={`4 Langkah Mudah Punya Website di ${content.namaLengkap}`}
            subtitle={`Proses cepat, transparan, dan tidak ribet. Kami dampingi bisnis di ${content.namaLengkap}, ${content.provinsi} dari nol sampai website online.`}
          />

          {/* 4. WHY US */}
          <WhyUsSection
            title={content.whyUs.title}
            subtitle={content.whyUs.subtitle}
            points={content.whyUs.points}
          />

          {/* 5. GUARANTEE */}
          <GuaranteeSection />

          {/* 6. TECH PARTNERS */}
          <TechPartners />

          {/* 7. PROBLEM & SOLUTION */}
          <ProblemSolutionSection
            title={content.problemSolution.title}
            subtitle={content.problemSolution.subtitle}
            problems={content.problemSolution.problems}
            solutions={content.problemSolution.solutions}
          />

          {/* 8. PORTFOLIO */}
          <PortfolioSection
            title={content.portfolio.title}
            subtitle={content.portfolio.subtitle}
          />

          {/* 9. TESTIMONIAL */}
          <TestimonialSection
            title={content.testimonial.title}
            subtitle={content.testimonial.subtitle}
          />

          {/* 10. WEB vs SOSMED */}
          <WebVsSosmedSection />

          {/* 11. PRICING */}
          <PricingSection
            pricing={pricingData}
            waNumber={waNumber}
            locationName={content.nama}
            note={content.pricingNote}
          />

          {/* 12. FAQ */}
          <FaqSection faqs={content.faqs} waNumber={waNumber} />

          {/* 13. FINAL CTA */}
          <FinalCtaSection
            waNumber={waNumber}
            title={content.finalCta.title}
            subtitle={content.finalCta.subtitle}
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

// ============================================================
// PAGE (Suspense wrapper)
// ============================================================
export default function KabupatenPage({ params }: PageProps) {
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
      <KabupatenContent params={params} />
    </Suspense>
  );
}