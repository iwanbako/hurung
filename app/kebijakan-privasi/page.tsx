import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// METADATA SEO
// ============================================================
export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan Privasi KerabatWeb. Pelajari bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda saat menggunakan layanan kami.",
  alternates: {
    canonical: `${SITE_URL}/kebijakan-privasi`,
  },
  openGraph: {
    title: "Kebijakan Privasi | KerabatWeb",
    description:
      "Pelajari bagaimana KerabatWeb melindungi data pribadi dan privasi Anda.",
    url: `${SITE_URL}/kebijakan-privasi`,
    type: "website",
  },
};

export default function KebijakanPrivasiPage() {
  const lastUpdated = "7 November 2026";

  return (
    <div className="bg-[#030303] text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Garis Aksen Pelangi Tipis di Atas Section */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

        {/* Dekorasi Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
              Legal & Privasi
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">
              Kebijakan <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Privasi</span>
            </h1>
            <p className="text-sm text-zinc-400">
              Terakhir diperbarui: <span className="font-semibold text-white">{lastUpdated}</span>
            </p>
          </div>

          {/* Content Box */}
          <div className="bg-[#0a0a0a] border border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)]">
            <div className="prose prose-invert prose-sm sm:prose-base max-w-none prose-headings:bg-gradient-to-r prose-headings:from-violet-400 prose-headings:via-pink-400 prose-headings:to-cyan-400 prose-headings:bg-clip-text prose-headings:text-transparent prose-headings:font-bold prose-p:text-zinc-300 prose-li:text-zinc-300 prose-a:text-pink-400 prose-a:no-underline hover:prose-a:underline">
              
              {/* Intro */}
              <p className="lead text-base sm:text-lg text-white mb-8">
                Di <strong>KerabatWeb</strong>, privasi Anda adalah prioritas kami. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat Anda mengunjungi website <a href={SITE_URL}>{SITE_URL}</a> atau menggunakan layanan kami.
              </p>

              {/* Section 1 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">1. Informasi yang Kami Kumpulkan</h2>
              <p className="mb-4">
                Kami dapat mengumpulkan beberapa jenis informasi saat Anda berinteraksi dengan kami:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li><strong>Informasi Identitas:</strong> Nama, nama bisnis, dan alamat email yang Anda berikan saat konsultasi.</li>
                <li><strong>Informasi Kontak:</strong> Nomor WhatsApp dan/atau nomor telepon untuk memudahkan komunikasi terkait proyek.</li>
                <li><strong>Data Transaksi:</strong> Informasi pembayaran (transfer bank) yang diperlukan untuk memproses pesanan layanan website Anda.</li>
                <li><strong>Data Teknis (Otomatis):</strong> Alamat IP, jenis browser, dan halaman yang Anda kunjungi di website kami (melalui cookie atau alat analitik).</li>
              </ul>

              {/* Section 2 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">2. Bagaimana Kami Menggunakan Informasi Anda</h2>
              <p className="mb-4">
                Data yang kami kumpulkan digunakan secara eksklusif untuk:
              </p>
              <ul className="list-disc pl-6 space-y-2 mb-6">
                <li>Memproses pesanan pembuatan website dan berkomunikasi dengan Anda terkait progres pengerjaan.</li>
                <li>Memberikan layanan dukungan pelanggan (<em>after-sales service</em>) dan garansi.</li>
                <li>Meningkatkan kualitas website, layanan, dan pengalaman pengguna kami.</li>
                <li>Mengirimkan informasi promosi atau penawaran khusus (hanya jika Anda memberikan persetujuan).</li>
              </ul>

              {/* Section 3 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">3. Perlindungan Data</h2>
              <p className="mb-6">
                Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk melindungi data pribadi Anda dari akses, perubahan, atau pengungkapan yang tidak sah. Website kami menggunakan enkripsi <strong>SSL (Secure Sockets Layer)</strong> untuk mengamankan transmisi data.
              </p>

              {/* Section 4 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">4. Berbagi Informasi dengan Pihak Ketiga</h2>
              <p className="mb-6">
                <strong>Kami tidak akan pernah menjual atau menyewakan data pribadi Anda kepada pihak ketiga.</strong> Kami hanya membagikan informasi Anda kepada pihak ketiga tepercaya (seperti penyedia layanan hosting atau domain) jika hal tersebut diperlukan secara teknis untuk menyelesaikan proyek website Anda.
              </p>

              {/* Section 5 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">5. Penggunaan Cookies</h2>
              <p className="mb-6">
                Website kami menggunakan &quot;cookie&quot; untuk meningkatkan pengalaman browsing Anda. Cookie adalah file teks kecil yang disimpan di perangkat Anda. Anda dapat memilih untuk menonaktifkan cookie melalui pengaturan browser Anda, meskipun hal ini mungkin mempengaruhi fungsionalitas beberapa bagian website.
              </p>

              {/* Section 6 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">6. Hak Anda</h2>
              <p className="mb-6">
                Anda berhak untuk mengakses, mengoreksi, atau meminta penghapusan data pribadi Anda yang kami simpan. Jika Anda ingin menggunakan hak tersebut, silakan hubungi kami melalui informasi kontak yang tersedia di bawah ini.
              </p>

              {/* Section 7 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">7. Perubahan Kebijakan Privasi</h2>
              <p className="mb-6">
                Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Setiap perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan yang baru. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.
              </p>

              {/* Section 8 */}
              <h2 className="text-xl sm:text-2xl mt-10 mb-4">8. Hubungi Kami</h2>
              <p className="mb-6">
                Jika Anda memiliki pertanyaan, kekhawatiran, atau permintaan terkait Kebijakan Privasi ini atau data pribadi Anda, silakan hubungi kami:
              </p>
              <div className="bg-[#030303] p-5 rounded-2xl border border-zinc-800 inline-block shadow-lg">
                <p className="m-0 text-sm text-zinc-300">
                  📧 Email: <strong className="text-white">halo@kerabatweb.com</strong><br />
                  📱 WhatsApp: <strong className="text-white">+62 859-3857-3419</strong>
                </p>
              </div>

            </div>
          </div>

          {/* Tombol Navigasi Bawah */}
          <div className="mt-12 text-center flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-pink-500/20 transition-all active:scale-95"
            >
              ← Kembali ke Beranda
            </Link>
            <Link
              href="/kontak"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white font-semibold text-sm rounded-xl border border-zinc-800 transition-all active:scale-95 shadow-lg"
            >
              Hubungi Kami
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}