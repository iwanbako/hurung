// app/not-found.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";

export const metadata: Metadata = {
  title: "Halaman Tidak Ditemukan (404) | KerabatWeb",
  description: "Halaman yang Anda cari tidak ditemukan. Kembali ke beranda atau hubungi kami via WhatsApp.",
  robots: {
    index: false,
    follow: true,
  },
};

const SITE_URL = "https://kerabatweb.id";
const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

export default function NotFound() {
  return (
    <div className="bg-[#003580] text-white flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full flex items-center justify-center px-4 py-16 sm:py-24">
        <div className="max-w-3xl mx-auto text-center">
          {/* Badge */}
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-4 py-1.5 rounded-full shadow-md mb-6">
            404 - Halaman Tidak Ditemukan
          </span>

          {/* Angka 404 Besar */}
          <div className="relative mb-6">
            <h1 className="text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none text-[#FEBB02] drop-shadow-lg select-none">
              404
            </h1>
          </div>

          {/* Headline */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-4 leading-tight">
            Waduh, Halaman yang Anda Cari{" "}
            <span className="text-[#FEBB02]">Tidak Ada</span>
          </h2>

          {/* Deskripsi */}
          <p className="text-sm sm:text-base text-blue-100 max-w-xl mx-auto mb-10 leading-relaxed">
            Mungkin URL-nya salah ketik, halaman sudah dipindahkan, atau memang
            tidak pernah ada. Tenang, Anda tidak perlu kemana-mana, langsung
            pilih salah satu opsi di bawah ini.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <Link
              href="/"
              className="bg-[#FEBB02] hover:bg-[#e0a802] text-[#00224f] font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-lg active:scale-95 text-sm flex items-center justify-center gap-2"
            >
              🏠 Kembali ke Beranda
            </Link>
            <a
              href={waLink(
                "Halo KerabatWeb, saya tersesat di halaman 404. Bisa bantu?"
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#001a3d] hover:bg-[#002b5c] text-white font-semibold px-6 py-3.5 rounded-xl border border-[#0066f5] transition-all text-sm flex items-center justify-center gap-2"
            >
              💬 Chat Kami via WhatsApp
            </a>
          </div>

          {/* Bantuan Navigasi */}
          <div className="border-t border-[#0066f5] pt-8">
            <p className="text-xs sm:text-sm text-blue-200 mb-4 font-semibold uppercase tracking-wider">
              Mungkin Anda Mencari:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm">
              <Link
                href="/#layanan"
                className="bg-[#00224f] hover:bg-[#002b5c] border border-[#0066f5] text-blue-100 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                Layanan
              </Link>
              <Link
                href="/#harga"
                className="bg-[#00224f] hover:bg-[#002b5c] border border-[#0066f5] text-blue-100 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                Paket Harga
              </Link>
              <Link
                href="/#faq"
                className="bg-[#00224f] hover:bg-[#002b5c] border border-[#0066f5] text-blue-100 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                FAQ
              </Link>
              <Link
                href="/aceh"
                className="bg-[#00224f] hover:bg-[#002b5c] border border-[#0066f5] text-blue-100 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                Website di Aceh
              </Link>
              <Link
                href="/dki-jakarta"
                className="bg-[#00224f] hover:bg-[#002b5c] border border-[#0066f5] text-blue-100 hover:text-white px-4 py-2 rounded-lg transition-all"
              >
                Website di Jakarta
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}