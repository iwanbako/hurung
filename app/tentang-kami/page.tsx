// app/tentang-kami/page.tsx
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
    <div className="bg-[#003580] text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full">
        {/* ================= HERO SECTION ================= */}
        <section className="py-16 sm:py-24 text-center px-4 sm:px-6 relative overflow-hidden border-b border-[#0066f5]">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-4 py-1.5 rounded-full shadow-sm mb-4">
              Tentang Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight mb-6">
              Membantu Bisnis Anda <span className="text-[#FEBB02]">Go Digital</span> Tanpa Ribet
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
              KerabatWeb lahir dari satu visi sederhana: membuat website berkualitas tinggi bisa diakses oleh siapa saja, termasuk UMKM dan bisnis lokal di seluruh Indonesia.
            </p>
          </div>
        </section>

        {/* ================= CERITA KAMI ================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 bg-[#00224f]">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-16">
            <div className="w-full md:w-1/2">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
                Lebih dari Sekadar <span className="text-[#FEBB02]">Jasa Website</span>
              </h2>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-4">
                Kami melihat banyak pemilik bisnis hebat yang memiliki produk luar biasa, tetapi kesulitan bersaing di internet karena terkendala biaya dan teknis.
              </p>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed">
                Itulah mengapa KerabatWeb hadir. Kami merancang sistem, proses, dan tim yang efisien agar bisa memberikan layanan kelas *enterprise* dengan harga yang sangat bersahabat untuk Anda.
              </p>
            </div>
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4">
              <div className="bg-[#003580] border border-[#0066f5] p-5 rounded-2xl text-center">
                <h3 className="text-3xl font-black text-[#FEBB02] mb-1">500+</h3>
                <p className="text-xs text-blue-200 font-medium">Proyek Selesai</p>
              </div>
              <div className="bg-[#003580] border border-[#0066f5] p-5 rounded-2xl text-center">
                <h3 className="text-3xl font-black text-[#FEBB02] mb-1">4.9/5</h3>
                <p className="text-xs text-blue-200 font-medium">Rating Klien</p>
              </div>
              <div className="bg-[#003580] border border-[#0066f5] p-5 rounded-2xl text-center">
                <h3 className="text-3xl font-black text-[#FEBB02] mb-1">99%</h3>
                <p className="text-xs text-blue-200 font-medium">Kepuasan</p>
              </div>
              <div className="bg-[#003580] border border-[#0066f5] p-5 rounded-2xl text-center">
                <h3 className="text-3xl font-black text-[#FEBB02] mb-1">100%</h3>
                <p className="text-xs text-blue-200 font-medium">Tepat Waktu</p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= NILAI-NILAI KAMI ================= */}
        <section className="py-16 sm:py-24 px-4 sm:px-6 border-y border-[#0066f5]">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Nilai yang Kami <span className="text-[#FEBB02]">Pegang</span>
              </h2>
              <p className="text-sm text-blue-100 max-w-2xl mx-auto">
                Setiap baris kode dan desain yang kami buat didasari oleh prinsip-prinsip ini.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Value 1 */}
              <div className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-6 sm:p-8 text-center hover:border-[#FEBB02] transition-colors">
                <div className="w-14 h-14 mx-auto bg-[#FEBB02] rounded-2xl flex items-center justify-center text-2xl mb-4 text-[#00224f]">
                  🤝
                </div>
                <h3 className="text-lg font-bold mb-2">Jujur & Transparan</h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Tidak ada biaya tersembunyi. Semua fitur, batasan, dan estimasi waktu dijelaskan sejak awal.
                </p>
              </div>
              
              {/* Value 2 */}
              <div className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-6 sm:p-8 text-center hover:border-[#FEBB02] transition-colors">
                <div className="w-14 h-14 mx-auto bg-[#FEBB02] rounded-2xl flex items-center justify-center text-2xl mb-4 text-[#00224f]">
                  ⚡
                </div>
                <h3 className="text-lg font-bold mb-2">Fokus pada Hasil</h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  Website bukan sekadar pajangan. Kami merancang website yang siap mendatangkan *leads* dan penjualan.
                </p>
              </div>

              {/* Value 3 */}
              <div className="bg-[#00224f] border border-[#0066f5] rounded-2xl p-6 sm:p-8 text-center hover:border-[#FEBB02] transition-colors">
                <div className="w-14 h-14 mx-auto bg-[#FEBB02] rounded-2xl flex items-center justify-center text-2xl mb-4 text-[#00224f]">
                  🛡️
                </div>
                <h3 className="text-lg font-bold mb-2">Dukungan Penuh</h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
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