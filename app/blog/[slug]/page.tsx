// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { blogPosts } from "@/data/blog-posts";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// TIPE PARAMS
// ============================================================
type PageProps = {
  params: Promise<{ slug: string }>;
};

// ============================================================
// GENERATE STATIC PARAMS (SSG)
// ============================================================
export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

// ============================================================
// HELPER: AMBIL POST BERDASARKAN SLUG
// ============================================================
function getPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

// ============================================================
// HELPER: ESTIMASI WAKTU BACA
// ============================================================
function getReadingTime(html: string): number {
  const text = html.replace(/<[^>]*>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// ============================================================
// METADATA SEO DINAMIS
// ============================================================
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

// ============================================================
// HALAMAN DETAIL BLOG
// ============================================================
export default async function BlogDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const readingTime = getReadingTime(post.content);
  
  // Ambil 4 artikel terbaru untuk sidebar (kecuali artikel yang sedang dibuka)
  const sidebarPosts = [...blogPosts]
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime())
    .slice(0, 4); 

  return (
    // MENAMBAHKAN overflow-x-hidden DI CONTAINER UTAMA AGAR TIDAK MELEBAR DI MOBILE
    <div className="bg-[#003580] text-white flex flex-col min-h-screen overflow-x-hidden">
      <Header />

      <main className="flex-1 w-full py-12 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Dekorasi Background - Dibatasi agar tidak menembus layar */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-[#0066f5]/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-6xl mx-auto">
          {/* Grid Layout: 2/3 untuk Konten, 1/3 untuk Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full">
            
            {/* =========================================
                KOLOM KIRI: KONTEN ARTIKEL (8/12)
            ========================================= */}
            <article className="lg:col-span-8 min-w-0 w-full">
              
              {/* BREADCRUMB */}
              <nav className="flex items-center flex-wrap gap-2 text-xs sm:text-sm text-blue-200 mb-6">
                <Link href="/" className="hover:text-[#FEBB02] transition-colors">Beranda</Link>
                <span className="text-blue-400/50">/</span>
                <Link href="/blog" className="hover:text-[#FEBB02] transition-colors">Blog</Link>
                <span className="text-blue-400/50">/</span>
                <span className="text-[#FEBB02] line-clamp-1 break-all">{post.title}</span>
              </nav>

              {/* HEADER ARTIKEL */}
              <header className="mb-8">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm text-[#FEBB02] font-bold mb-4 uppercase tracking-wider">
                  <time dateTime={post.isoDate}>{post.date}</time>
                  <span className="text-blue-300/60">•</span>
                  <span className="text-blue-100 normal-case font-semibold tracking-normal">
                    {post.author}
                  </span>
                  <span className="text-blue-300/60">•</span>
                  <span className="text-blue-100 normal-case font-semibold tracking-normal flex items-center gap-1">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="9" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
                    </svg>
                    {readingTime} menit baca
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-5 break-words">
                  {post.title}
                </h1>

                <p className="text-sm sm:text-base text-blue-100 leading-relaxed border-l-4 border-[#FEBB02] pl-4 italic">
                  {post.excerpt}
                </p>
              </header>

              {/* GAMBAR UTAMA */}
              {post.image && (
                <figure className="relative w-full h-56 sm:h-80 md:h-[420px] rounded-2xl overflow-hidden border border-[#0066f5] mb-10 shadow-2xl">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="object-cover w-full h-full"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#00224f]/80 via-transparent to-transparent" />
                </figure>
              )}

              {/* KONTEN ARTIKEL (STYLING PROSE KEREN) */}
              <div className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-5 sm:p-10 mb-10 shadow-xl relative overflow-hidden">
                {/* Aksen garis di kiri atas card */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FEBB02] to-[#0066f5]"></div>
                
                <div
                  className="
                    prose prose-invert max-w-none w-full
                    
                    /* Paragraf Umum */
                    prose-p:text-blue-100/90 prose-p:leading-[1.9] prose-p:text-[15px] sm:prose-p:text-[16px] prose-p:mb-6 prose-p:break-words
                    
                    /* DROP CAP */
                    prose-p:first-of-type:first-letter:text-5xl sm:prose-p:first-of-type:first-letter:text-6xl prose-p:first-of-type:first-letter:font-extrabold 
                    prose-p:first-of-type:first-letter:text-[#FEBB02] prose-p:first-of-type:first-letter:float-left 
                    prose-p:first-of-type:first-letter:mr-3 prose-p:first-of-type:first-letter:mt-1 prose-p:first-of-type:first-letter:leading-[0.8]
                    
                    /* HEADING 2 */
                    prose-h2:text-2xl sm:prose-h2:text-[30px] prose-h2:font-extrabold prose-h2:text-white 
                    prose-h2:mt-12 prose-h2:mb-5 prose-h2:pb-3 
                    prose-h2:border-b prose-h2:border-[#0066f5]/40 prose-h2:relative prose-h2:break-words
                    
                    /* HEADING 3 */
                    prose-h3:text-lg sm:prose-h3:text-2xl prose-h3:font-bold prose-h3:text-[#FEBB02] prose-h3:mt-8 prose-h3:mb-4 prose-h3:break-words
                    
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
              </div>

              {/* TOMBOL KEMBALI */}
              <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-[#0066f5]/30 pt-6">
                <Link
                  href="/blog"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#FEBB02] hover:gap-3 transition-all"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Kembali ke Blog
                </Link>
                <span className="text-xs text-blue-300/50 italic">Terakhir diperbarui: {post.date}</span>
              </div>
            </article>

            {/* =========================================
                KOLOM KANAN: SIDEBAR (4/12)
            ========================================= */}
            <aside className="lg:col-span-4 min-w-0 w-full space-y-6">
              
              {/* Widget: Artikel Terbaru dengan Gambar */}
              <div className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-5 sm:p-6 shadow-lg w-full">
                <h3 className="text-lg font-bold text-white mb-5 border-b border-[#0066f5]/40 pb-3 flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#FEBB02] shrink-0" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                  </svg>
                  Artikel <span className="text-[#FEBB02]">Lainnya</span>
                </h3>
                
                <div className="flex flex-col gap-4 sm:gap-5">
                  {sidebarPosts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="group flex items-start gap-3 sm:gap-4 w-full"
                    >
                      {/* Thumbnail Gambar Kecil */}
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden shrink-0 border border-[#0066f5]/50 group-hover:border-[#FEBB02] transition-colors">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Teks */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs sm:text-sm font-bold text-blue-50 leading-snug group-hover:text-[#FEBB02] transition-colors line-clamp-2">
                          {item.title}
                        </h4>
                        <p className="text-[9px] sm:text-[10px] text-blue-300 mt-1.5 uppercase tracking-wider font-semibold">
                          {item.date}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-5 sm:mt-6 pt-4 border-t border-[#0066f5]/30">
                  <Link href="/blog" className="text-xs font-bold text-[#FEBB02] hover:underline flex items-center justify-center gap-1 w-full">
                    Lihat Semua Artikel
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
              </div>

              {/* Widget: CTA / Promo */}
              <div className="bg-gradient-to-br from-[#0066f5] to-[#003580] border border-[#0066f5] rounded-2xl p-5 sm:p-6 shadow-lg text-center relative overflow-hidden group w-full">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 pointer-events-none group-hover:bg-white/20 transition-all duration-500" />
                <h3 className="text-lg font-bold text-white mb-2 relative z-10">
                  Butuh Website Profesional?
                </h3>
                <p className="text-xs text-blue-100 mb-5 relative z-10 leading-relaxed">
                  Konsultasikan kebutuhan bisnis Anda dengan tim KerabatWeb secara gratis. Dapatkan solusi digital yang tepat!
                </p>
                <a
                  href="https://wa.me/6281234567890" // Ganti dengan nomor WA Anda
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full bg-[#FEBB02] text-[#00224f] font-extrabold text-sm px-4 sm:px-6 py-3 rounded-xl hover:bg-yellow-400 transition-all hover:-translate-y-1 shadow-lg relative z-10"
                >
                  <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Konsultasi Gratis
                </a>
              </div>

            </aside>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}