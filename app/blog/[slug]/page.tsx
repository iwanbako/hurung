// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog-posts";
import { BlogDetail } from "./BlogDetail";

const SITE_URL = "https://kerabatweb.com";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return { title: "Artikel Tidak Ditemukan" };
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords ?? [],
    alternates: { canonical: url },
    openGraph: {
      title: `${post.title} | KerabatWeb`,
      description: post.excerpt,
      url,
      type: "article",
      publishedTime: post.isoDate,
      authors: [post.author],
      images: post.image ? [{ url: post.image, alt: post.title }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: post.image ? [post.image] : undefined,
    },
  };
}

export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Ambil 3 artikel terkait (selain artikel saat ini)
  const relatedPosts = [...blogPosts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, 3);

  // ============================================================
  // HELPER: Format Tanggal ke Standar ISO 8601 (Google Schema)
  // ============================================================
  // Mengubah "2026-11-01" menjadi "2026-11-01T00:00:00+07:00" (Waktu Indonesia Barat)
  const formatIsoDate = (dateStr: string) => {
    // Jika format sudah memiliki huruf 'T' (berarti sudah ada jam), biarkan saja
    if (dateStr.includes("T")) return dateStr;
    // Jika hanya tanggal (YYYY-MM-DD), tambahkan jam dan zona waktu WIB
    return `${dateStr}T00:00:00+07:00`;
  };

  const validDatePublished = formatIsoDate(post.isoDate);
  const validDateModified = formatIsoDate(post.isoDate); // Ubah jika ada field dateModified khusus

  // Pastikan URL gambar valid (jika post.image kosong, gunakan OG Image default)
  const imageUrl = post.image || `${SITE_URL}/og-image.jpg`;

  // ============================================================
  // SCHEMA: BLOG POSTING (Artikel)
  // ============================================================
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: imageUrl,
      width: 1200,
      height: 630,
    },
    datePublished: validDatePublished,
    dateModified: validDateModified,
    author: {
      "@type": "Person",
      name: post.author,
      url: `${SITE_URL}/tentang-kami`, // Menambahkan URL agar valid (opsional)
    },
    publisher: {
      "@type": "Organization",
      name: "KerabatWeb",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/web-app-manifest-192x192.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };

  // ============================================================
  // SCHEMA: BREADCRUMB
  // ============================================================
  const breadcrumbSchema = {
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
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* Injeksi Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <BlogDetail post={post} relatedPosts={relatedPosts} />
    </>
  );
}