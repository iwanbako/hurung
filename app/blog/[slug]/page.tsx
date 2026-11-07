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

  return <BlogDetail post={post} relatedPosts={relatedPosts} />;
}