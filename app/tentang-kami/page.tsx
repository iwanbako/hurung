import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { FinalCtaSection } from "@/components/sections/FinalCtaSection";

const SITE_URL = "https://kerabatweb.com";
const waNumber = "6285938573419";

// ============================================================
// METADATA SEO
// ============================================================
export const metadata: Metadata = {
  title: "Tentang Kami",
  description: "Kenali KerabatWeb lebih dekat. Kami adalah tim profesional yang berdedikasi membantu UMKM dan bisnis di Indonesia tampil di dunia digital dengan website cepat, aman, dan SEO-friendly.",
  alternates: {
    canonical: `${SITE_URL}/tentang-kami`,
  },
  openGraph: {
    title: "Tentang KerabatWeb - Jasa Pembuatan Website Profesional",
    description: "Kenali tim di balik KerabatWeb dan komitmen kami membantu bisnis Anda berkembang di internet.",
    url: `${SITE_URL}/tentang-kami`,
  },
};

export default function TentangKamiPage() {
  return (
    <div className="bg-[#030303] text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        {/* ================= HERO SECTION ================= */}
        <section className="py-16 sm:py-24 text-center px-4 sm:px-6 relative overflow-hidden border-b border-zinc-800/80">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          
          {/* Garis Aksen Pelangi Tipis di Atas Section */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

          {/* Dekorasi Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-4">
              Tentang Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6 tracking-tight">
              Membantu Bisnis Anda <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Go Digital</span> Tanpa Ribet
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto">
              KerabatWeb lahir dari satu visi sederhana: membuat website berkualitas tinggi bisa diakses oleh siapa saja, termasuk UMKM dan bisnis lokal di seluruh Indonesia.
            </p>
          </div>
        </section>

        {/* ================= CERITA KAMI ================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#0a0a0a] border-b border-zinc-800/80">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 tracking-tight">
                Lebih dari Sekadar <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Jasa Website</span>
              </h2>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-4">
                Kami melihat banyak pemilik bisnis hebat yang memiliki produk luar biasa, tetapi kesulitan bersaing di internet karena terkendala biaya dan teknis.
              </p>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
                Itulah mengapa KerabatWeb hadir. Kami merancang sistem, proses, dan tim yang efisien agar bisa memberikan layanan kelas *enterprise* dengan harga yang sangat bersahabat untuk Anda.
              </p>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-[#030303] border border-zinc-800 p-6 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <h3 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-1">500+</h3>
                <p className="text-xs text-zinc-400 font-medium">Proyek Selesai</p>
              </div>
              <div className="bg-[#030303] border border-zinc-800 p-6 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <h3 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-1">4.9/5</h3>
                <p className="text-xs text-zinc-400 font-medium">Rating Klien</p>
              </div>
              <div className="bg-[#030303] border border-zinc-800 p-6 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <h3 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-1">99%</h3>
                <p className="text-xs text-zinc-400 font-medium">Kepuasan</p>
              </div>
              <div className="bg-[#030303] border border-zinc-800 p-6 rounded-2xl text-center shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
                <h3 className="text-3xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-1">100%</h3>
                <p className="text-xs text-zinc-400 font-medium">Tepat Waktu</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= NILAI-NILAI KAMI ================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-b border-zinc-800/80 bg-[#030303]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
                Nilai yang Kami <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Pegang</span>
              </h2>
              <p className="text-sm text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                Setiap baris kode dan desain yang kami buat didasari oleh prinsip-prinsip ini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center hover:border-pink-500/50 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.8)] group hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]">
                <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-5 text-white shadow-lg shadow-pink-500/20 font-bold">
                  🤝
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-pink-300 transition-colors">Jujur & Transparan</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Tidak ada biaya tersembunyi. Semua fitur, batasan, dan estimasi waktu dijelaskan sejak awal.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center hover:border-pink-500/50 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.8)] group hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]">
                <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-5 text-white shadow-lg shadow-pink-500/20 font-bold">
                  ⚡
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-pink-300 transition-colors">Fokus pada Hasil</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Website bukan sekadar pajangan. Kami merancang website yang siap mendatangkan *leads* dan penjualan.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 text-center hover:border-pink-500/50 transition-all shadow-[0_15px_30px_rgba(0,0,0,0.8)] group hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]">
                <div className="w-14 h-14 mx-auto bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 rounded-2xl flex items-center justify-center text-2xl mb-5 text-white shadow-lg shadow-pink-500/20 font-bold">
                  🛡️
                </div>
                <h3 className="text-lg font-bold mb-2 text-white group-hover:text-pink-300 transition-colors">Dukungan Penuh</h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                  Kami tidak lepas tangan setelah website jadi. Ada garansi dan *support* yang siap membantu Anda.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA SECTION ================= */}
        <FinalCtaSection 
          waNumber={waNumber}
          title="Siap Bekerja Sama dengan Tim Kami?"
          subtitle="Mari diskusikan ide dan kebutuhan website Anda. Konsultasi 100% gratis, tanpa paksaan."
        />
      </main>

      <Footer />
    </div>
  );
}