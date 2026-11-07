// app/blog/page.tsx
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
      datePublished: post.isoDate,
      author: { "@type": "Person", name: post.author },
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
    <div className="bg-[#003580] text-white flex flex-col min-h-screen">
      <BlogJsonLd />
      <Header />

      <main className="flex-1 w-full py-12 sm:py-24 px-3 sm:px-6 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0066f5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* HEADER SECTION */}
          <div className="text-center mb-8 sm:mb-16 px-2">
            <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3 sm:px-4 py-1.5 rounded-full shadow-sm mb-3 sm:mb-4">
              Blog & Wawasan
            </span>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold mb-3 sm:mb-4">
              Belajar <span className="text-[#FEBB02]">Go Digital</span>
            </h1>
            <p className="text-xs sm:text-base text-blue-100 max-w-2xl mx-auto">
              Tips bisnis, panduan website, dan insight digital untuk membantu
              bisnis Anda tumbuh lebih cepat.
            </p>
            <p className="text-[11px] sm:text-sm text-blue-200 mt-3 sm:mt-4">
              {sortedPosts.length} artikel tersedia
            </p>
          </div>

          {/* GRID + LOAD MORE (client component) */}
          <BlogList posts={sortedPosts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}