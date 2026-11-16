"use client";

import { useState } from "react";
import Link from "next/link";

type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  isoDate: string;
  author: string;
  content: string;
  keywords?: string[];
};

function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

const INITIAL_COUNT = 6;
const LOAD_STEP = 6;

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 border border-dashed border-slate-300 rounded-2xl bg-white shadow-sm">
        <p className="text-slate-600 text-sm sm:text-base px-4">
          Belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti.
        </p>
      </div>
    );
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {visiblePosts.map((post, index) => {
          const readingTime = getReadingTime(post.content);
          const isFirst = index === 0;

          return (
            <div key={post.slug} className="h-full">
              <Link
                href={`/blog/${post.slug}`}
                className="bg-white border border-slate-200 rounded-xl sm:rounded-2xl overflow-hidden hover:border-red-500 hover:shadow-lg transition-all duration-300 group flex flex-col h-full shadow-sm hover:-translate-y-1.5 active:scale-[0.98]"
              >
                {/* Gambar */}
                <div className="relative h-28 sm:h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={post.image}
                    alt={`Ilustrasi artikel: ${post.title}`}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                    loading={isFirst ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={isFirst ? "high" : "auto"}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent opacity-60" />

                  {isFirst && (
                    <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-600 text-white text-[8px] sm:text-xs font-extrabold uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md">
                      Terbaru
                    </span>
                  )}

                  <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-white/90 border border-slate-200 text-slate-700 text-[9px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm flex items-center gap-0.5 sm:gap-1 shadow-sm">
                    <svg
                      className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-600"
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
                    {readingTime}m
                  </span>
                </div>

                {/* Konten */}
                <div className="p-3 sm:p-6 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 gap-y-0.5 text-[9px] sm:text-xs font-bold mb-1.5 sm:mb-2 uppercase tracking-wider">
                    <time dateTime={post.isoDate} className="text-red-600 font-bold">{post.date}</time>
                    <span className="text-slate-300">•</span>
                    <span className="text-slate-500 normal-case font-semibold tracking-normal truncate max-w-[60%]">
                      {post.author}
                    </span>
                  </div>

                  <h2 className="text-xs sm:text-lg font-bold text-slate-900 mb-1.5 sm:mb-3 group-hover:text-red-600 transition-colors line-clamp-2 leading-snug">
                    {post.title}
                  </h2>

                  <p className="hidden sm:block text-xs sm:text-sm text-slate-600 line-clamp-3 mb-4 flex-1 leading-relaxed font-normal">
                    {post.excerpt}
                  </p>

                  {/* Kategori / Keywords dengan Desain Solid */}
                  {post.keywords && post.keywords.length > 0 && (
                    <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                      {post.keywords.slice(0, 3).map((kw) => (
                        <span
                          key={kw}
                          className="text-[11px] text-red-700 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-md font-medium shadow-sm"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>
                  )}

                  <span className="text-[10px] sm:text-sm font-bold text-red-600 flex items-center gap-0.5 sm:gap-1 mt-auto group-hover:underline">
                    Baca Artikel
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 group-hover:translate-x-1 transition-transform"
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
            </div>
          );
        })}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="mt-8 sm:mt-12 flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
            className="w-full sm:w-auto px-8 py-3.5 bg-red-600 text-white text-sm font-extrabold rounded-full hover:bg-red-700 shadow-md shadow-red-600/20 transition-all active:scale-95 cursor-pointer"
          >
            Muat Lebih Banyak
          </button>
          <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
            Menampilkan {visiblePosts.length} dari {posts.length} artikel
          </p>
        </div>
      )}
    </>
  );
}