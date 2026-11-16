import React from "react";

interface Props {
  waNumber?: string;
  title?: string;
  subtitle?: string;
}

export const FinalCtaSection: React.FC<Props> = ({
  waNumber = "6285938573419",
  title,
  subtitle,
}) => {
  // Helper untuk membuat link WhatsApp langsung
  const getWaLink = (msg: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  const finalSubtitle =
    subtitle ??
    "Jangan biarkan kompetitor mendahului Anda. Konsultasikan kebutuhan website Anda sekarang secara gratis dan dapatkan penawaran khusus minggu ini!";

  return (
    <section className="relative bg-white text-slate-900 py-16 sm:py-24 overflow-hidden border border-slate-200 rounded-3xl shadow-xl max-w-5xl mx-auto my-12 px-4">
      
      {/* Garis Aksen Merah Tipis di Atas Box */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600"></div>

      {/* Efek Background Glow / Gradient Dekoratif Merah Halus */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-red-100 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <div>
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full shadow-sm mb-4">
            🚀 Mulai Transformasi Digital Anda Hari Ini
          </span>
        </div>

        {/* Heading Utama */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 mb-6 leading-tight">
          {title ? (
            title
          ) : (
            <>
              Siap Tingkatkan Penjualan Bisnis dengan{" "}
              <span className="text-red-600">
                Website Profesional?
              </span>
            </>
          )}
        </h2>

        {/* Deskripsi */}
        <p className="text-xs sm:text-sm md:text-base text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {finalSubtitle}
        </p>

        {/* Tombol Aksi (CTA) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href={getWaLink(
              "Halo KerabatWeb, saya siap membuat website profesional untuk bisnis saya. Mohon info lebih lanjut."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-md shadow-red-600/20 active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-105"
          >
            <span>💬 Konsultasi Gratis via WhatsApp</span>
          </a>

          <a
            href="#harga"
            className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-900 font-semibold px-8 py-4 rounded-xl border border-slate-300 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Lihat Paket Harga</span>
          </a>
        </div>

        {/* Keunggulan Singkat di Bawah */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-slate-600">
          <span className="flex items-center gap-2">
            <span className="text-red-600 font-bold">✓</span> Tanpa Biaya
            Tersembunyi
          </span>
          <span className="flex items-center gap-2">
            <span className="text-red-600 font-bold">✓</span> Proses
            Pengerjaan Cepat
          </span>
          <span className="flex items-center gap-2">
            <span className="text-red-600 font-bold">✓</span> Garansi Support
            Penuh
          </span>
        </div>
      </div>
    </section>
  );
};