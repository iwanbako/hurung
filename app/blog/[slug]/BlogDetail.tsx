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
    <div className="bg-[#030303] text-white flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Garis Aksen Pelangi Tipis di Atas Section */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

        {/* Dekorasi Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

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
              className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-zinc-400 mb-6"
            >
              <Link href="/" className="hover:text-pink-400 transition-colors">
                Beranda
              </Link>
              <span className="text-zinc-600">/</span>
              <Link
                href="/blog"
                className="hover:text-pink-400 transition-colors"
              >
                Blog
              </Link>
              <span className="text-zinc-600">/</span>
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-bold line-clamp-1 break-all">
                {post.title}
              </span>
            </motion.nav>

            {/* HEADER ARTIKEL */}
            <motion.header variants={fadeInUp} className="mb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-bold mb-4 uppercase tracking-wider">
                <time dateTime={post.isoDate} className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">{post.date}</time>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300 normal-case font-semibold tracking-normal">
                  {post.author}
                </span>
                <span className="text-zinc-600">•</span>
                <span className="text-zinc-300 normal-case font-semibold tracking-normal flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 text-pink-400"
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

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 break-words tracking-tight">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed border-l-4 border-pink-500 pl-4 italic">
                {post.excerpt}
              </p>
            </motion.header>

            {/* GAMBAR UTAMA */}
            {post.image && (
              <motion.figure
                variants={fadeInUp}
                className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden border border-zinc-800 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/90 via-transparent to-transparent" />
              </motion.figure>
            )}

            {/* KONTEN ARTIKEL */}
            <motion.div
              variants={fadeInUp}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 sm:p-10 md:p-12 mb-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400" />
              <div
                className="
                  prose prose-invert max-w-none w-full

                  /* Ukuran teks pas untuk layar 1024px */
                  prose-p:text-zinc-300 prose-p:leading-[1.9] prose-p:text-[15px] sm:prose-p:text-[16px] md:prose-p:text-[17px] prose-p:mb-6 prose-p:break-words

                  /* DROP CAP */
                  prose-p:first-of-type:first-letter:text-5xl sm:prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-extrabold
                  prose-p:first-of-type:first-letter:bg-gradient-to-r prose-p:first-of-type:first-letter:from-violet-400 prose-p:first-of-type:first-letter:via-pink-400 prose-p:first-of-type:first-letter:to-cyan-400 prose-p:first-of-type:first-letter:bg-clip-text prose-p:first-of-type:first-letter:text-transparent prose-p:first-of-type:first-letter:float-left
                  prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1 prose-p:first-of-type:first-letter:leading-[0.8]

                  /* HEADING 2 */
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:bg-gradient-to-r prose-h2:from-violet-400 prose-h2:via-pink-400 prose-h2:to-cyan-400 prose-h2:bg-clip-text prose-h2:text-transparent
                  prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-zinc-800 prose-h2:break-words

                  /* HEADING 3 */
                  prose-h3:text-lg sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-pink-300 prose-h3:mt-8 prose-h3:mb-4 prose-h3:break-words

                  /* List / Daftar */
                  prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-ul:leading-relaxed prose-ol:leading-relaxed
                  prose-ul:my-6 prose-li:my-2 prose-li:marker:text-pink-400 prose-li:pl-2

                  /* Teks Tebal, Link, Blockquote */
                  prose-strong:text-white prose-strong:font-bold
                  prose-a:text-pink-400 prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:underline-offset-4 prose-a:break-all
                  prose-blockquote:border-l-4 prose-blockquote:border-pink-500 prose-blockquote:bg-zinc-900/60
                  prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6 sm:prose-blockquote:my-8
                  prose-blockquote:text-zinc-200 prose-blockquote:shadow-inner
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </motion.div>

            {/* TOMBOL KEMBALI */}
            <motion.div
              variants={fadeInUp}
              className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-zinc-800 pt-6"
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-all"
              >
                <svg
                  className="w-4 h-4 text-pink-400"
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
              <span className="text-xs text-zinc-500 italic">
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
              className="border-t border-zinc-800 pt-10 mt-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  Artikel <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Terkait</span>
                </h2>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-pink-400 hover:underline flex items-center gap-1"
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
                      className="group block bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] transition-all duration-300 h-full flex flex-col shadow-[0_15px_30px_rgba(0,0,0,0.8)]"
                    >
                      <div className="relative w-full h-40 sm:h-44 overflow-hidden shrink-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 to-transparent" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-[10px] font-bold mb-2 uppercase tracking-wider bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                          {item.date}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-white leading-snug group-hover:text-pink-300 transition-colors line-clamp-2 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-xs text-zinc-400 line-clamp-2 mb-3 flex-1 leading-relaxed">
                          {item.excerpt}
                        </p>
                        <span className="text-xs font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-1 mt-auto">
                          Baca Artikel
                          <svg
                            className="w-3.5 h-3.5 text-pink-400 group-hover:translate-x-1 transition-transform"
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
          GARIS PEMBATAS DI ATAS FOOTER
      ========================================= */}
      <div className="border-t border-zinc-800 max-w-5xl mx-auto w-full mt-8 mb-4" />

      <Footer />
    </div>
  );
}