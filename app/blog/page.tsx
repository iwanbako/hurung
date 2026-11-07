// app/blog/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { blogPosts } from "@/data/blog-posts";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// METADATA SEO
// ============================================================
export const metadata: Metadata = {
  title: "Blog & Artikel",
  description:
    "Kumpulan artikel, tips bisnis, dan panduan seputar dunia website dari KerabatWeb. Belajar go-digital untuk bisnis Anda.",
  keywords: [
    "blog bisnis online",
    "tips website",
    "artikel digital marketing",
    "kerabatweb blog",
  ],
  alternates: { canonical: `${SITE_URL}/blog` },
  openGraph: {
    title: "Blog & Artikel | KerabatWeb",
    description:
      "Tips bisnis, panduan website, dan insight digital untuk membantu bisnis Anda tumbuh.",
    url: `${SITE_URL}/blog`,
    type: "website",
    siteName: "KerabatWeb",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog & Artikel | KerabatWeb",
    description:
      "Tips bisnis, panduan website, dan insight digital untuk membantu bisnis Anda tumbuh.",
  },
};

// ============================================================
// HELPER: Estimasi waktu baca (200 kata/menit)
// ============================================================
function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ============================================================
// HELPER: Format tanggal ISO -> tampilan singkat
// (tetap pakai `date` dari data agar konsisten dgn halaman detail)
// ============================================================

// ============================================================
// HELPER: Urutkan artikel berdasarkan isoDate (terbaru dulu)
// ============================================================
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
);

// ============================================================
// JSON-LD: Blog Schema
// ============================================================
function BlogJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Blog & Artikel KerabatWeb",
    url: `${SITE_URL}/blog`,
    description:
      "Kumpulan artikel, tips bisnis, dan panduan seputar dunia website dari KerabatWeb.",
    blogPost: sortedPosts.slice(0, 10).map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      description: post.excerpt,
      image: post.image,
      datePublished: post.isoDate,
      author: {
        "@type": "Person",
        name: post.author,
      },
      url: `${SITE_URL}/blog/${post.slug}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

// ============================================================
// HALAMAN BLOG
// ============================================================
export default function BlogPage() {
  return (
    <div className="bg-[#003580] text-white flex flex-col min-h-screen">
      <BlogJsonLd />
      <Header />

      <main className="flex-1 w-full py-16 sm:py-24 px-4 sm:px-6 relative">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0066f5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* ================= HEADER SECTION ================= */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-4 py-1.5 rounded-full shadow-sm mb-4">
              Blog & Wawasan
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Belajar <span className="text-[#FEBB02]">Go Digital</span>
            </h1>
            <p className="text-sm sm:text-base text-blue-100 max-w-2xl mx-auto">
              Tips bisnis, panduan website, dan insight digital untuk membantu
              bisnis Anda tumbuh lebih cepat.
            </p>
            <p className="text-xs sm:text-sm text-blue-200 mt-4">
              {sortedPosts.length} artikel tersedia
            </p>
          </div>

          {/* ================= EMPTY STATE ================= */}
          {sortedPosts.length === 0 && (
            <div className="text-center py-20 border border-dashed border-[#0066f5]/50 rounded-2xl">
              <p className="text-blue-100 text-sm sm:text-base">
                Belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti.
              </p>
            </div>
          )}

          {/* ================= GRID ARTIKEL ================= */}
          {sortedPosts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {sortedPosts.map((post, index) => {
                const readingTime = getReadingTime(post.content);
                const isFirst = index === 0;

                return (
                  <Link
                    key={post.slug}
                    href={`/blog/${post.slug}`}
                    className="bg-[#00224f] border border-[#0066f5] rounded-2xl overflow-hidden hover:border-[#FEBB02] hover:shadow-[0_8px_30px_rgba(254,187,2,0.15)] transition-all duration-300 group flex flex-col"
                  >
                    {/* Gambar Artikel */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={post.image}
                        alt={`Ilustrasi artikel: ${post.title}`}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                        loading={isFirst ? "eager" : "lazy"}
                        decoding="async"
                        fetchPriority={isFirst ? "high" : "auto"}
                      />
                      {/* Overlay gradient tipis di bawah gambar */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#00224f] to-transparent opacity-60" />

                      {/* Badge "Terbaru" untuk artikel paling atas */}
                      {isFirst && (
                        <span className="absolute top-3 left-3 bg-[#FEBB02] text-[#00224f] text-[10px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-md">
                          Terbaru
                        </span>
                      )}

                      {/* Badge waktu baca */}
                      <span className="absolute bottom-3 right-3 bg-[#003580]/90 text-[#FEBB02] text-[10px] sm:text-xs font-bold px-2.5 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <circle cx="12" cy="12" r="9" />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 7v5l3 2"
                          />
                        </svg>
                        {readingTime} mnt
                      </span>
                    </div>

                    {/* Konten Teks */}
                    <div className="p-5 sm:p-6 flex-1 flex flex-col">
                      {/* Meta: tanggal + penulis */}
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] sm:text-xs text-[#FEBB02] font-bold mb-2 uppercase tracking-wider">
                        <time dateTime={post.isoDate}>{post.date}</time>
                        <span className="text-blue-300/60">•</span>
                        <span className="text-blue-100 normal-case font-semibold tracking-normal">
                          {post.author}
                        </span>
                      </div>

                      <h2 className="text-base sm:text-lg font-bold text-white mb-3 group-hover:text-[#FEBB02] transition-colors line-clamp-2 leading-snug">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-blue-100 line-clamp-3 mb-4 flex-1 leading-relaxed">
                        {post.excerpt}
                      </p>

                      {/* Tag keyword (maks 3) */}
                      {post.keywords?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {post.keywords.slice(0, 3).map((kw) => (
                            <span
                              key={kw}
                              className="text-[10px] sm:text-[11px] text-blue-200 bg-[#003580] border border-[#0066f5]/60 px-2 py-0.5 rounded-md"
                            >
                              #{kw}
                            </span>
                          ))}
                        </div>
                      )}

                      <span className="text-xs sm:text-sm font-bold text-[#FEBB02] flex items-center gap-1 mt-auto">
                        Baca Artikel
                        <svg
                          className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}