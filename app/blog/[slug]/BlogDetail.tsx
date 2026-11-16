import Link from "next/link";
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

export function BlogDetail({ post, relatedPosts }: Props) {
  const readingTime = getReadingTime(post.content);

  return (
    <div className="bg-white text-slate-900 flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Garis Aksen Merah Tipis di Atas Section */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600"></div>

        {/* Dekorasi Background Glow Merah Halus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />

        {/* max-w-5xl (1024px) adalah ukuran yang pas: Lebar tapi tetap nyaman dibaca */}
        <div className="relative z-10 max-w-5xl mx-auto w-full">
          <article className="min-w-0 w-full">
            {/* BREADCRUMB */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-slate-500 mb-6"
            >
              <Link href="/" className="hover:text-red-600 transition-colors font-medium">
                Beranda
              </Link>
              <span className="text-slate-300">/</span>
              <Link
                href="/blog"
                className="hover:text-red-600 transition-colors font-medium"
              >
                Blog
              </Link>
              <span className="text-slate-300">/</span>
              <span className="text-slate-900 font-bold line-clamp-1 break-all">
                {post.title}
              </span>
            </nav>

            {/* HEADER ARTIKEL */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm font-bold mb-4 uppercase tracking-wider">
                <time dateTime={post.isoDate} className="text-red-600">{post.date}</time>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 normal-case font-semibold tracking-normal">
                  {post.author}
                </span>
                <span className="text-slate-300">•</span>
                <span className="text-slate-700 normal-case font-semibold tracking-normal flex items-center gap-1">
                  <svg
                    className="w-3.5 h-3.5 text-red-600"
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

              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 break-words tracking-tight text-slate-900">
                {post.title}
              </h1>

              <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed border-l-4 border-red-600 pl-4 italic font-normal">
                {post.excerpt}
              </p>
            </header>

            {/* GAMBAR UTAMA */}
            {post.image && (
              <figure className="relative w-full h-64 sm:h-80 md:h-[400px] rounded-2xl overflow-hidden border border-slate-200 mb-10 shadow-md bg-slate-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="object-cover w-full h-full"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent" />
              </figure>
            )}

            {/* KONTEN ARTIKEL */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-10 md:p-12 mb-10 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600" />
              <div
                className="
                  prose prose-slate max-w-none w-full

                  /* Ukuran teks pas untuk layar 1024px */
                  prose-p:text-slate-700 prose-p:leading-[1.9] prose-p:text-[15px] sm:prose-p:text-[16px] md:prose-p:text-[17px] prose-p:mb-6 prose-p:break-words

                  /* DROP CAP */
                  prose-p:first-of-type:first-letter:text-5xl sm:prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-extrabold
                  prose-p:first-of-type:first-letter:text-red-600 prose-p:first-of-type:first-letter:float-left
                  prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1 prose-p:first-of-type:first-letter:leading-[0.8]

                  /* HEADING 2 */
                  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:font-extrabold prose-h2:text-slate-900
                  prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-slate-200 prose-h2:break-words

                  /* HEADING 3 */
                  prose-h3:text-lg sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-slate-800 prose-h3:mt-8 prose-h3:mb-4 prose-h3:break-words

                  /* List / Daftar */
                  prose-ul:text-slate-700 prose-ol:text-slate-700 prose-ul:leading-relaxed prose-ol:leading-relaxed
                  prose-ul:my-6 prose-li:my-2 prose-li:marker:text-red-600 prose-li:pl-2

                  /* Teks Tebal, Link, Blockquote */
                  prose-strong:text-slate-900 prose-strong:font-bold
                  prose-a:text-red-600 prose-a:no-underline prose-a:font-semibold hover:prose-a:underline hover:prose-a:underline-offset-4 prose-a:break-all
                  prose-blockquote:border-l-4 prose-blockquote:border-red-600 prose-blockquote:bg-red-50/50
                  prose-blockquote:py-3 sm:prose-blockquote:py-4 prose-blockquote:px-4 sm:prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic prose-blockquote:my-6 sm:prose-blockquote:my-8
                  prose-blockquote:text-slate-700 prose-blockquote:shadow-sm
                "
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>

            {/* TOMBOL KEMBALI */}
            <div className="mb-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-slate-200 pt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-600 hover:text-red-700 transition-all"
              >
                <svg
                  className="w-4 h-4 text-red-600"
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
              <span className="text-xs text-slate-500 italic">
                Terakhir diperbarui: {post.date}
              </span>
            </div>
          </article>

          {/* =========================================
              ARTIKEL TERKAIT
          ========================================= */}
          {relatedPosts.length > 0 && (
            <section className="border-t border-slate-200 pt-10 mt-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900">
                  Artikel <span className="text-red-600">Terkait</span>
                </h2>
                <Link
                  href="/blog"
                  className="text-xs sm:text-sm font-bold text-red-600 hover:underline flex items-center gap-1"
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
                {relatedPosts.map((item) => (
                  <div key={item.slug}>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="group block bg-white border border-slate-200 rounded-2xl overflow-hidden hover:border-red-500 hover:shadow-lg transition-all duration-300 h-full flex flex-col shadow-sm hover:-translate-y-1.5"
                    >
                      <div className="relative w-full h-40 sm:h-44 overflow-hidden shrink-0 bg-slate-100">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                      </div>
                      <div className="p-4 flex-1 flex flex-col">
                        <p className="text-[10px] font-bold mb-2 uppercase tracking-wider text-red-600">
                          {item.date}
                        </p>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug group-hover:text-red-600 transition-colors line-clamp-2 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-xs text-slate-600 line-clamp-2 mb-3 flex-1 leading-relaxed font-normal">
                          {item.excerpt}
                        </p>
                        <span className="text-xs font-bold text-red-600 flex items-center gap-1 mt-auto">
                          Baca Artikel
                          <svg
                            className="w-3.5 h-3.5 text-red-600 group-hover:translate-x-1 transition-transform"
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
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* =========================================
          GARIS PEMBATAS DI ATAS FOOTER
      ========================================= */}
      <div className="border-t border-slate-200 max-w-5xl mx-auto w-full mt-8 mb-4" />

      <Footer />
    </div>
  );
}