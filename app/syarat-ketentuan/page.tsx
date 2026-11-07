// app/syarat-ketentuan/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// METADATA SEO
// ============================================================
export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan Ketentuan layanan KerabatWeb. Pelajari aturan main, hak, dan kewajiban Anda sebagai klien sebelum memesan jasa pembuatan website.",
  alternates: {
    canonical: `${SITE_URL}/syarat-ketentuan`,
  },
  openGraph: {
    title: "Syarat & Ketentuan | KerabatWeb",
    description:
      "Aturan main, hak, dan kewajiban klien KerabatWeb saat memesan jasa pembuatan website.",
    url: `${SITE_URL}/syarat-ketentuan`,
    type: "website",
  },
};

export default function SyaratKetentuanPage() {
  const lastUpdated = "7 November 2026";

  return (
    <div className="bg-[#003580] text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full py-16 sm:py-24 px-4 sm:px-6 relative">
        {/* Dekorasi background */}
        <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#00224f] to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-4 py-1.5 rounded-full shadow-sm mb-4">
              Legal & Aturan
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4">
              Syarat & <span className="text-[#FEBB02]">Ketentuan</span>
            </h1>
            <p className="text-sm text-blue-200">
              Terakhir diperbarui: <span className="font-semibold text-white">{lastUpdated}</span>
            </p>
          </div>

          {/* Content Box */}
          <div className="bg-[#00224f] border border-[#0066f5] rounded-3xl p-6 sm:p-10 shadow-xl">
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:text-[#FEBB02] prose-headings:font-bold prose-p:text-blue-100 prose-li:text-blue-100 prose-a:text-[#FEBB02] prose-a:no-underline hover:prose-a:underline">
              
              {/* Intro */}
              <p className="lead text-base sm:text-lg text-white mb-8">
                Selamat datang di <strong>KerabatWeb</strong>. Syarat dan Ketentuan ini mengatur penggunaan layanan jasa pembuatan website yang kami sediakan. Dengan melakukan pemesanan, melakukan pembayaran, atau menggunakan layanan kami, Anda dianggap telah membaca, memahami, dan menyetujui seluruh isi Syarat & Ketentuan ini.
              </p>

              {/* Section 1 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">1. Lingkup Layanan</h2>
              <p className="mb-4">
                KerabatWeb menyediakan layanan pembuatan website, meliputi:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Desain dan pengembangan Landing Page, Company Profile, dan E-Commerce.</li>
                <li>Penyediaan domain, hosting, dan sertifikat SSL (sesuai paket yang dipilih).</li>
                <li>Optimasi SEO dasar (On-Page) dan responsivitas mobile.</li>
                <li>Dukungan teknis dan pemeliharaan pasca-pengerjaan sesuai paket.</li>
              </ul>

              {/* Section 2 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">2. Alur Pemesanan & Pembayaran</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Pemesanan dianggap sah setelah klien menyetujui penawaran dan melakukan pembayaran <strong>Down Payment (DP) sebesar 50%</strong> dari total biaya.</li>
                <li>Sisa pelunasan 50% wajib dibayarkan setelah website selesai dikerjakan dan disetujui oleh klien (sebelum proses <em>go-live</em> atau naik ke hosting utama).</li>
                <li>Semua pembayaran dilakukan melalui transfer bank atau metode pembayaran lain yang disepakati.</li>
              </ul>

              {/* Section 3 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">3. Revisi dan Batasan Pengerjaan</h2>
              <p className="mb-4">
                Setiap paket memiliki kuota revisi yang berbeda (tercantum di halaman harga). Ketentuan revisi:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Revisi mencakup perubahan teks, gambar, atau penyesuaian layout minor.</li>
                <li><strong>Revisi tidak mencakup</strong> perubahan total konsep desain, perubahan struktur halaman, atau penambahan fitur baru setelah pengerjaan dimulai. Hal ini akan dikenakan biaya tambahan.</li>
                <li>Waktu pengerjaan dapat bertambah apabila klien terlambat memberikan materi (logo, teks, foto) atau terlambat merespons komunikasi.</li>
              </ul>

              {/* Section 4 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">4. Garansi dan Maintenance</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Garansi berlaku untuk kerusakan teknis akibat kesalahan sistem dari pihak kami (misal: error 500, tampilan berantakan akibat update sistem).</li>
                <li>Garansi <strong>tidak berlaku</strong> jika klien melakukan perubahan kode secara mandiri, menggunakan plugin pihak ketiga yang bentrok, atau website terkena serangan <em>hacking</em> akibat kelalaian penggunaan password.</li>
                <li>Layanan maintenance bulanan (jika diambil) mencakup update konten, backup data, dan pemantauan keamanan rutin.</li>
              </ul>

              {/* Section 5 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">5. Hak Cipta dan Kepemilikan</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Setelah pelunasan 100%, seluruh hak akses (cPanel, akun WordPress, domain, dan source code) sepenuhnya menjadi milik klien.</li>
                <li>KerabatWeb berhak menggunakan hasil karya (screenshot website) sebagai bagian dari portofolio kami, kecuali klien secara tertulis meminta sebaliknya (NDA).</li>
              </ul>

              {/* Section 6 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">6. Pembatalan dan Pengembalian Dana</h2>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Pembatalan oleh klien setelah DP dibayarkan dan pengerjaan dimulai <strong>tidak dapat diuangkan kembali</strong> (DP hangus), karena kami telah mengalokasikan waktu dan tenaga untuk proyek tersebut.</li>
                <li>Jika pembatalan dilakukan oleh pihak KerabatWeb karena alasan tertentu, kami akan mengembalikan dana secara proporsional sesuai progres pengerjaan.</li>
              </ul>

              {/* Section 7 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">7. Batasan Tanggung Jawab</h2>
              <p className="mb-6">
                KerabatWeb tidak bertanggung jawab atas kerugian finansial atau non-finansial yang timbul dari kegagalan server hosting pihak ketiga, perubahan kebijakan algoritma Google, atau tindakan peretasan yang tidak dapat dicegah secara wajar.
              </p>

              {/* Section 8 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">8. Perubahan Syarat & Ketentuan</h2>
              <p className="mb-6">
                Kami berhak mengubah atau memperbarui Syarat & Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Versi terbaru akan selalu diperbarui di halaman ini.
              </p>

              {/* Section 9 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">9. Hubungi Kami</h2>
              <p className="mb-6">
                Jika ada hal yang kurang jelas mengenai Syarat & Ketentuan ini, silakan hubungi kami:
              </p>
              <div className="bg-[#003580] p-5 rounded-xl border border-[#0066f5] inline-block">
                <p className="m-0 text-sm">
                  📧 Email: <strong>halo@kerabatweb.com</strong><br />
                  📱 WhatsApp: <strong>+62 859-3857-3419</strong>
                </p>
              </div>

            </div>
          </div>

          {/* Tombol Navigasi Bawah */}
          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#FEBB02] hover:bg-[#e0a802] text-[#00224f] font-extrabold text-sm rounded-xl shadow-md transition-all active:scale-95"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/kebijakan-privasi"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#00224f] hover:bg-[#001a3d] text-white font-semibold text-sm rounded-xl border border-[#0066f5] transition-all active:scale-95"
            >
              Baca Kebijakan Privasi
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}