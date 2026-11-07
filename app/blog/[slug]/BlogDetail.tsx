// app/blog/[slug]/BlogDetail.tsx
"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import type { BlogPost } from "@/data/blog-posts";

function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

type Props = {
  post: BlogPost;
  relatedPosts: BlogPost[];
};

// ✅ FIX: anotasi : Variants + ease pakai cubic-bezier array
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

export function BlogDetail({ post, relatedPosts }: Props) {
  const readingTime = getReadingTime(post.content);

  return (
    <div className="bg-[#003580] text-white flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0066f5]/10 rounded-full blur-3xl pointer-events-none" />

        {/* max-w-5xl (1024px) adalah ukuran yang pas: Lebar tapi tetap nyaman dibaca */}
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <motion.article
            className="min-w-0 w-full"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* BREADCRUMB */}
            <motion.nav
              variants={fadeInUp}
              className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-blue-200 mb-6"
            >
              <Link href="/" className="hover:text-[#FEBB02] transition-colors">
                Beranda
              </Link>
              <span className="text-blue-400/50">/</span>
              <Link
                href="/blog"
                className="hover:text-[#FEBB02] transition-colors"
              >
                Blog
              </Link>
              <span className="text-blue-400/50">/</span>
              <span className="text-[#FEBB02] line-clamp-1 break-all">
                {post.title}
              </span>
            </motion.nav>

            {/* HEADER ARTIKEL */}
            <motion.header variants={fadeInUp} className="mb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#FEBB02] font-bold mb-4 uppercase tracking-wider">
                <time dateTime={post.isoDate}>{post.date}</time>
                <span className="text-blue-300/60">•</span>
                <span className="text-blue-100 normal-case font-semibold tracking-normal">
                  {post.author}
                </span>
                <span className="text-blue-300/60">•</span>
                <span className="text-blue-100 normal-case font-semibold tracking-normal flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5"
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
                  {readingTime} menit baca
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 break-words">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed border-l-4 border-[#FEBB02] pl-4 italic">
                {post.excerpt}
              </p>
            </motion.header>

            {/* GAMBAR UTAMA */}
            {post.image && (
              <motion.figure
                variants={fadeInUp}
                className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden border border-[#0066f5] mb-10 shadow-2xl"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00224f]/80 via-transparent to-transparent" />
              </motion.figure>
            )}

            {/* KONTEN ARTIKEL */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-6 sm:p-10 md:p-12 mb-10 shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FEBB02] to-[#0066f5]" />
              <div
                className="
                  prose prose-invert max-w-none w-full

                  /* Ukuran teks pas untuk layar 1024px */
                  prose-p:text-blue-100/90 prose-p:leading-[1.9] prose-p:text-[15px] sm:prose-p:text-[16px] md:prose-p:text-[17px] prose-p:mb-6 prose-p:break-words

                  /* DROP CAP */
                  prose-p:first-of-type:first-letter:text-5xl sm:prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-extrabold
                  prose-p:first-of-type:first-letter:text-[#FEBB02] prose-p:first-of-type:first-letter:float-left
                  prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1 prose-p:first-of-type:first-letter:leading-[0.8]

                  /* HEADING 2 (Kuning Emas) */
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-[#FEBB02]
                  prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-[#FEBB02]/40 prose-h2:break-words

                  /* HEADING 3 (Biru Terang) */
                  prose-h3:text-lg sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-[#4d94ff] prose-h3:mt-8 prose-h3:mb-4 prose-h3:break-words

                  /* List / Daftar */
                  prose-ul:text-blue-100/90 prose-ol:text-blue-100/90 prose-ul:leading-relaxed prose-ol:leading-relaxed
                  prose-ul:my-6 prose-li:my-2 prose-li:marker:text-[#FEBB02] prose-li:pl-2

                  /* Teks Tebal, Link, Blockquote */
                  prose-strong:text-white prose-strong:font-bold
                  prose-a:text-[#FEBB02] prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:underline-offset-4 prose-a:break-all
                  prose-blockquote:border-l-4 prose-blockquote:border-[#FEBB02] prose-blockquote:bg-[#003580]/60
                  prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6 sm:prose-blockquote:my-8
                  prose-blockquote:text-blue-50 prose-blockquote:shadow-inner
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* TOMBOL KEMBALI */}
            <motion.div
              variants={fadeInUp}
              className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#0066f5]/30 pt-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-[#FEBB02] hover:gap-3 transition-all"
              >
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
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Kembali ke Blog
              </Link>
              <span className="text-xs text-white italic">
                Terakhir diperbarui: {post.date}
              </span>
            </motion.div>
          </motion.article>

          {/* =========================================
              ARTIKEL TERKAIT
          ========================================= */}
          {relatedPosts.length > 0 && (
            <motion.section
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-[#0066f5]/40 pt-10 mt-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold">
                  Artikel <span className="text-[#FEBB02]">Terkait</span>
                </h2>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-[#FEBB02] hover:underline flex items-center gap-1"
                >
                  Lihat Semua
                  <svg
                    className="w-3.5 h-3.5"
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
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
                {relatedPosts.map((item, idx) => (
                  <motion.div
                    key={item.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.5 + idx * 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group block bg-[#00224f] border border-[#0066f5] rounded-2xl overflow-hidden hover:border-[#FEBB02] hover:shadow-[0_8px_30px_rgba(254,187,2,0.15)] transition-all duration-300 h-full flex flex-col"
                    >
                      <div className="relative w-full h-40 sm:h-44 overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#00224f]/70 to-transparent" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-[10px] text-[#FEBB02] font-bold mb-2 uppercase tracking-wider">
                          {item.date}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-[#FEBB02] transition-colors line-clamp-2 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-xs text-blue-100/80 line-clamp-2 mb-3 flex-1">
                          {item.excerpt}
                        </p>
                        <span className="text-xs font-bold text-[#FEBB02] flex items-center gap-1 mt-auto">
                          Baca Artikel
                          <svg
                            className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform"
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
                  </motion.div>
                ))}
              </div>
            </motion.section>
          )}
        </div>
      </main>

      {/* =========================================
          GARIS PEMBATAS PUTIH DI ATAS FOOTER
      ========================================= */}
      <div className="border-t border-white/20 max-w-5xl mx-auto w-full mt-8 mb-4" />

      <Footer />
    </div>
  );
}