import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  kabupaten?: string;
}

export const TestimonialSection: React.FC<Props> = ({
  title,
  subtitle,
  kabupaten,
}) => {
  // ============================================================
  // DATA TESTIMONI (dinamis mengikuti kabupaten kalau ada)
  // ============================================================
  const testimonials = [
    {
      name: "Bapak Budi Santoso",
      business: kabupaten
        ? `Pemilik Kuliner Kopi Nusantara - Klien ${kabupaten}`
        : "Pemilik Kuliner Kopi Nusantara",
      comment: kabupaten
        ? `Website selesai sangat cepat dan performanya luar biasa! Bisnis kami di ${kabupaten} sekarang jauh lebih mudah ditemukan pelanggan baru lewat Google.`
        : "Website selesai sangat cepat dan performanya luar biasa! Penjualan online kami meningkat drastis setelah pindah ke website profesional ini.",
      rating: 5,
      initial: "BS",
    },
    {
      name: "Dr. Siti Rahma",
      business: kabupaten
        ? `Klinik Sehat Utama - Melayani Pasien ${kabupaten}`
        : "Klinik Sehat Utama",
      comment: kabupaten
        ? `Sangat puas dengan pelayanannya. Fitur tombol WhatsApp langsung sangat membantu pasien kami di ${kabupaten} berkonsultasi dengan mudah.`
        : "Sangat puas dengan pelayanannya. Fitur tombol WhatsApp langsung sangat membantu pasien berkonsultasi dengan mudah.",
      rating: 5,
      initial: "SR",
    },
    {
      name: "Reza Pratama",
      business: kabupaten
        ? `Founder EduTech Academy - Basis Klien ${kabupaten}`
        : "Founder EduTech Academy",
      comment: kabupaten
        ? `Struktur SEO-nya mantap! Baru beberapa minggu online, website kami langsung muncul di halaman pertama Google untuk pencarian di ${kabupaten}.`
        : "Struktur SEO-nya mantap! Baru beberapa minggu online, website langsung nongkrong di halaman pertama pencarian Google.",
      rating: 5,
      initial: "RP",
    },
  ];

  // ============================================================
  // HEADER TEXT
  // ============================================================
  const finalTitle = title ?? (
    <>
      Apa Kata{" "}
      <span className="text-red-600">
        {kabupaten ? `Klien Kami di ${kabupaten}` : "Klien Kami"}
      </span>
      ?
    </>
  );

  const finalSubtitle =
    subtitle ??
    (kabupaten
      ? `Testimoni jujur dari pemilik bisnis di ${kabupaten} yang sudah merasakan dampak nyata website profesional bersama KerabatWeb.`
      : "Kepuasan klien adalah prioritas utama kami dalam menghadirkan solusi digital terbaik.");

  return (
    <section className="relative bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Testimoni & Kepercayaan
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {finalSubtitle}
          </p>
        </div>

        {/* Grid Testimoni */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 transition-all duration-200 flex flex-col justify-between hover:border-red-500 hover:shadow-lg hover:-translate-y-1 group shadow-sm"
            >
              <div>
                {/* Rating Bintang */}
                <div className="flex items-center gap-1 text-red-500 mb-3 text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Komentar */}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic mb-6 font-normal">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Profil Pemberi Ulasan */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-slate-100 group-hover:border-red-100 transition-colors">
                <div className="w-10 h-10 rounded-full bg-red-50 border border-red-100 text-red-600 flex items-center justify-center text-xs font-bold shadow-sm">
                  {t.initial}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-sm group-hover:text-red-600 transition-colors">
                    {t.name}
                  </h3>
                  <span className="text-[11px] text-slate-500 font-normal">
                    {t.business}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};