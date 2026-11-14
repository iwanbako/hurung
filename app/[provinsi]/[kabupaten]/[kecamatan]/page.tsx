// app/[provinsi]/[kabupaten]/[kecamatan]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FloatingNav } from "@/components/common/FloatingNav";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { HeroSection } from "@/components/sections/HeroSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { WorkflowSection } from "@/components/sections/WorkflowSection";
import { GuaranteeSection } from "@/components/sections/GuaranteeSection";
import { TechPartners } from "@/components/sections/TechPartners";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { PortfolioSection } from "@/components/sections/PortfolioSection";
import { TestimonialSection } from "@/components/sections/TestimonialSection";
import { WebVsSosmedSection } from "@/components/sections/WebVsSosmedSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FaqSection } from "@/components/sections/FaqSection";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";
import { OtherDistrictsSection } from "@/components/sections/OtherDistrictsSection";
import { MapSection } from "@/components/sections/MapSection";

import { findDistrict, getAllDistrictParams } from "@/lib/wilayah";
import { generateKecamatanContent } from "@/lib/kecamatan-content";

// ============================================================
// KONSTANTA
// ============================================================
const SITE_URL = "https://kerabatweb.com";
const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

type PageProps = {
  params: Promise<{
    provinsi: string;
    kabupaten: string;
    kecamatan: string;
  }>;
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
// DATA KEUNGGULAN (inline, tidak bergantung pada kecamatan-content)
// ============================================================
const keunggulanData = [
  {
    icon: "⚡",
    title: "Proses Cepat",
    desc: "Website landing page selesai 3–7 hari kerja. Company profile 7–14 hari. Tanpa drama, tanpa delay.",
  },
  {
    icon: "💰",
    title: "Harga Transparan",
    desc: "Mulai Rp 999.000/tahun. Sudah termasuk domain, hosting, SSL. Tidak ada biaya tersembunyi.",
  },
  {
    icon: "🔍",
    title: "SEO-Friendly",
    desc: "Struktur semantik bersih, meta tag lengkap, sitemap otomatis. Mudah ditemukan di Google.",
  },
  {
    icon: "📱",
    title: "Mobile Responsive",
    desc: "Tampil sempurna di HP, tablet, dan desktop. Lebih dari 70% pengunjung Anda pakai HP.",
  },
  {
    icon: "🛡️",
    title: "Garansi & Support",
    desc: "Garansi revisi, support maintenance, dan pendampingan setelah website live.",
  },
  {
    icon: "🎯",
    title: "Fokus Konversi",
    desc: "Tombol WhatsApp, form kontak, dan CTA yang dirancang untuk mengubah pengunjung jadi pelanggan.",
  },
];

// ============================================================
// METADATA
// ============================================================
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { provinsi, kabupaten, kecamatan } = await params;

  const data = findDistrict(provinsi, kabupaten, kecamatan);
  if (!data) {
    return {
      title: { absolute: "Halaman Tidak Ditemukan | KerabatWeb" },
      robots: { index: false, follow: false },
    };
  }

  const content = generateKecamatanContent(
    data.province,
    data.regency,
    data.district.name
  );

  const url = `${SITE_URL}/${provinsi}/${kabupaten}/${kecamatan}`;
  const ogImage = `${SITE_URL}/og-image.jpg`;

  return {
    title: { absolute: content.metaTitle },
    description: content.metaDescription,
    keywords: [
      `jasa pembuatan website ${content.namaKecamatan}`,
      `jasa website ${content.namaKecamatan}`,
      `web design ${content.namaKecamatan}`,
      `website umkm ${content.namaKecamatan}`,
      `jasa website ${content.namaKabupaten}`,
      `jasa website ${content.namaProvinsi}`,
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
// STATIC PARAMS
// ============================================================
export function generateStaticParams() {
  return getAllDistrictParams();
}

// ============================================================
// PAGE
// ============================================================
export default async function KecamatanPage({ params }: PageProps) {
  const { provinsi, kabupaten, kecamatan } = await params;

  const data = findDistrict(provinsi, kabupaten, kecamatan);
  if (!data) notFound();

  const content = generateKecamatanContent(
    data.province,
    data.regency,
    data.district.name
  );

  const url = `${SITE_URL}/${provinsi}/${kabupaten}/${kecamatan}`;
  const ogImage = `${SITE_URL}/og-image.jpg`;

  // Aggregate rating dinamis per kecamatan
  const hash = provinsi.length + kabupaten.length + kecamatan.length;
  const ratingBase = 4.75 + ((hash * 7) % 25) / 100;
  const reviewCount = 80 + ((hash * 213) % 500);

  // JSON-LD Product
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `Jasa Pembuatan Website ${content.namaLengkap}`,
    image: ogImage,
    description: `Jasa pembuatan website profesional untuk bisnis, sekolah, dan company profile di ${content.namaLengkap}, ${content.namaKabupaten}, ${content.namaProvinsi}. Perluas jangkauan usaha Anda dengan website dari KerabatWeb.`,
    brand: { "@type": "Brand", name: "KerabatWeb" },
    offers: {
      "@type": "AggregateOffer",
      url,
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

  // JSON-LD FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: content.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  // Breadcrumb
  const breadcrumbItems = [
    { label: "Beranda", href: "/" },
    { label: content.namaProvinsi, href: `/${provinsi}` },
    { label: content.namaKabupaten, href: `/${provinsi}/${kabupaten}` },
    { label: content.namaKecamatan },
  ];

  return (
    <>
      <meta
        name="robots"
        content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
      />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

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

        <Breadcrumb items={breadcrumbItems} />

        <main className="flex-1 w-full">
          {/* 1. HERO */}
          <HeroSection
            waNumber={waNumber}
            badge={content.hero.headline}
            headline={content.hero.badge}
            subheadline={content.hero.subheadline}
            ctaText={content.hero.ctaText}
          />

          {/* 2. SERVICES */}
          <ServicesSection
            title={content.services.title}
            subtitle={content.services.subtitle}
          />

          {/* 3. WORKFLOW */}
          <WorkflowSection
            title={`4 Langkah Mudah Punya Website di ${content.namaKecamatan}`}
            subtitle={`Proses cepat, transparan, dan tidak ribet. Kami dampingi bisnis di Kecamatan ${content.namaKecamatan}, ${content.namaKabupaten} dari nol sampai website online.`}
          />

          {/* 4. WHY US — INLINE SECTION (tanpa komponen WhyUsSection) */}
          <section className="bg-[#003580] py-12 sm:py-16 border-b border-[#0066f5] overflow-hidden">
            <div className="max-w-6xl mx-auto px-4 sm:px-6">
              {/* Header */}
              <div className="text-center mb-8 sm:mb-10">
                <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-3">
                  Keunggulan Kami
                </span>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                  Kenapa Pilih KerabatWeb di{" "}
                  <span className="text-[#FEBB02]">
                    {content.namaKecamatan}
                  </span>
                  ?
                </h2>

                <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
                  Kami paham kebutuhan digital bisnis lokal di Kecamatan{" "}
                  {content.namaKecamatan}, {content.namaKabupaten},{" "}
                  {content.namaProvinsi}. Berikut alasan mengapa ratusan
                  pelaku usaha mempercayakan website mereka kepada kami.
                </p>
              </div>

              {/* Grid 6 keunggulan */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {keunggulanData.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-[#00224f] border border-[#0066f5]/60 hover:border-[#FEBB02]/70 rounded-xl p-4 sm:p-5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl sm:text-3xl shrink-0 leading-none">
                        {item.icon}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-sm sm:text-base font-bold text-white mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[11px] sm:text-xs text-blue-100 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA kecil */}
              <div className="text-center mt-8">
                <a
                  href={waLink(
                    `Halo KerabatWeb, saya dari Kecamatan ${content.namaKecamatan}, ${content.namaKabupaten} ingin konsultasi pembuatan website.`
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#FEBB02] text-[#00224f] font-bold px-5 py-2.5 rounded-lg hover:bg-yellow-300 transition-colors text-sm sm:text-base"
                >
                  Konsultasi Gratis Sekarang
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>

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
            kabupaten={content.namaKabupaten}
          />

          {/* 9. TESTIMONIAL */}
          <TestimonialSection
            title={content.testimonial.title}
            subtitle={content.testimonial.subtitle}
            kabupaten={content.namaKabupaten}
          />

          {/* 10. WEB vs SOSMED */}
          <WebVsSosmedSection />

          {/* 11. PRICING */}
          <PricingSection
            pricing={pricingData}
            waNumber={waNumber}
            locationName={content.namaKecamatan}
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

          {/* 14. KECAMATAN LAIN */}
          <OtherDistrictsSection
            provinsiSlug={provinsi}
            kabupatenSlug={kabupaten}
            kabupatenName={content.namaKabupaten}
            currentKecamatanSlug={kecamatan}
            districts={content.districts}
          />

          {/* 15. PETA AREA LAYANAN */}
          <MapSection />
        </main>

        <Footer />

        <FloatingNav
          waDefault={waLink(
            `Halo KerabatWeb, saya dari Kecamatan ${content.namaKecamatan}, ${content.namaKabupaten} ingin konsultasi pembuatan website.`
          )}
        />
      </div>
    </>
  );
}