// app/blog/BlogList.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";

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

// Container: stagger anak-anaknya
const gridVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07, delayChildren: 0.05 },
  },
};

// Setiap kartu
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: { opacity: 0, y: -12, transition: { duration: 0.2 } },
};

export function BlogList({ posts }: { posts: BlogPost[] }) {
  const [visibleCount, setVisibleCount] = useState(INITIAL_COUNT);

  if (posts.length === 0) {
    return (
      <div className="text-center py-16 sm:py-20 border border-dashed border-[#0066f5]/50 rounded-2xl">
        <p className="text-blue-100 text-sm sm:text-base px-4">
          Belum ada artikel yang dipublikasikan. Silakan kembali lagi nanti.
        </p>
      </div>
    );
  }

  const visiblePosts = posts.slice(0, visibleCount);
  const hasMore = visibleCount < posts.length;

  return (
    <>
      <motion.div
        variants={gridVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {visiblePosts.map((post, index) => {
            const readingTime = getReadingTime(post.content);
            const isFirst = index === 0;

            return (
              <motion.div
                key={post.slug}
                variants={cardVariants}
                exit="exit"
                layout
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 300, damping: 24 }}
                className="h-full"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="bg-[#00224f] border border-[#0066f5] rounded-xl sm:rounded-2xl overflow-hidden hover:border-[#FEBB02] hover:shadow-[0_8px_30px_rgba(254,187,2,0.15)] transition-[border-color,box-shadow] duration-300 group flex flex-col h-full"
                >
                  {/* Gambar */}
                  <div className="relative h-28 sm:h-48 w-full overflow-hidden">
                    <img
                      src={post.image}
                      alt={`Ilustrasi artikel: ${post.title}`}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                      loading={isFirst ? "eager" : "lazy"}
                      decoding="async"
                      fetchPriority={isFirst ? "high" : "auto"}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#00224f] to-transparent opacity-60" />

                    {isFirst && (
                      <motion.span
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.3 }}
                        className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#FEBB02] text-[#00224f] text-[8px] sm:text-xs font-extrabold uppercase tracking-wider px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full shadow-md"
                      >
                        Terbaru
                      </motion.span>
                    )}

                    <span className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 bg-[#003580]/90 text-[#FEBB02] text-[9px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full backdrop-blur-sm flex items-center gap-0.5 sm:gap-1">
                      <svg
                        className="w-2.5 h-2.5 sm:w-3 sm:h-3"
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
                    <div className="flex flex-wrap items-center gap-x-1 sm:gap-x-2 gap-y-0.5 text-[9px] sm:text-xs text-[#FEBB02] font-bold mb-1.5 sm:mb-2 uppercase tracking-wider">
                      <time dateTime={post.isoDate}>{post.date}</time>
                      <span className="text-blue-300/60">•</span>
                      <span className="text-blue-100 normal-case font-semibold tracking-normal truncate max-w-[60%]">
                        {post.author}
                      </span>
                    </div>

                    <h2 className="text-xs sm:text-lg font-bold text-white mb-1.5 sm:mb-3 group-hover:text-[#FEBB02] transition-colors line-clamp-2 leading-snug">
                      {post.title}
                    </h2>

                    <p className="hidden sm:block text-xs sm:text-sm text-blue-100 line-clamp-3 mb-4 flex-1 leading-relaxed">
                      {post.excerpt}
                    </p>

                    {post.keywords && post.keywords.length > 0 && (
                      <div className="hidden sm:flex flex-wrap gap-1.5 mb-4">
                        {post.keywords.slice(0, 3).map((kw) => (
                          <span
                            key={kw}
                            className="text-[11px] text-blue-200 bg-[#003580] border border-[#0066f5]/60 px-2 py-0.5 rounded-md"
                          >
                            #{kw}
                          </span>
                        ))}
                      </div>
                    )}

                    <span className="text-[10px] sm:text-sm font-bold text-[#FEBB02] flex items-center gap-0.5 sm:gap-1 mt-auto">
                      Baca
                      <motion.svg
                        className="w-3 h-3 sm:w-4 sm:h-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                        whileHover={{ x: 4 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </motion.svg>
                    </span>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Load More */}
      <AnimatePresence>
        {hasMore && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.3 }}
            className="mt-8 sm:mt-12 flex flex-col items-center gap-3"
          >
            <motion.button
              type="button"
              onClick={() => setVisibleCount((c) => c + LOAD_STEP)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              className="w-full sm:w-auto px-6 py-3 bg-[#FEBB02] text-[#00224f] text-sm font-extrabold rounded-full hover:bg-[#ffc933] shadow-lg shadow-[#FEBB02]/20"
            >
              Muat Lebih Banyak
            </motion.button>
            <p className="text-[11px] sm:text-xs text-blue-200">
              Menampilkan {visiblePosts.length} dari {posts.length} artikel
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}