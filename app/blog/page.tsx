import type { Metadata } from "next";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { blogPosts } from "@/data/blog-posts";
import { BlogList } from "./BlogList";

const SITE_URL = "https://kerabatweb.com";

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

// Urutkan artikel berdasarkan isoDate (terbaru dulu)
const sortedPosts = [...blogPosts].sort(
  (a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime(),
);

// Helper: Format tanggal ke standar ISO 8601 (Google Schema)
const formatIsoDate = (dateStr: string) => {
  if (dateStr.includes("T")) return dateStr;
  return `${dateStr}T00:00:00+07:00`; // Waktu Indonesia Barat
};

// JSON-LD: Blog Schema
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
      datePublished: formatIsoDate(post.isoDate), // ✅ FIX: Format tanggal valid
      author: { 
        "@type": "Person", 
        name: post.author,
        url: `${SITE_URL}/tentang-kami`, // ✅ FIX: Tambah URL penulis
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

export default function BlogPage() {
  return (
    <div className="bg-[#030303] text-white flex flex-col min-h-screen">
      <BlogJsonLd />
      <Header />

      <main className="flex-1 w-full py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
        
        {/* Garis Aksen Pelangi Tipis di Atas Section */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

        {/* Dekorasi Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* HEADER SECTION */}
          <div className="text-center mb-10 sm:mb-16 px-2">
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-3.5 sm:px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3 sm:mb-4">
              Blog & Wawasan
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4 tracking-tight">
              Belajar <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Go Digital</span>
            </h1>
            <p className="text-xs sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
              Tips bisnis, panduan website, dan insight digital untuk membantu
              bisnis Anda tumbuh lebih cepat.
            </p>
            <p className="text-[11px] sm:text-sm text-zinc-500 mt-3 sm:mt-4 font-medium">
              {sortedPosts.length} artikel tersedia
            </p>
          </div>

          {/* GRID + LOAD MORE (client component) */}
          <BlogList posts={sortedPosts} />
          
          {/* GARIS PEMBATAS DI BAWAH LIST BLOG */}
          <div className="w-full border-b border-zinc-800 mt-12 sm:mt-20 mb-4" />
          
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}