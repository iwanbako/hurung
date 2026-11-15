"use client";

import React from "react";
import { motion } from "framer-motion";

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
      avatar: "☕",
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
      avatar: "👩‍⚕️",
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
      avatar: "🎓",
    },
  ];

  // ============================================================
  // HEADER TEXT (dinamis mengikuti kabupaten kalau ada)
  // ============================================================
  const finalTitle = title ?? (
    <>
      Apa Kata{" "}
      <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
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
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Testimoni & Kepercayaan
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Testimoni dengan Animasi Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all flex flex-col justify-between hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] group"
            >
              <div>
                {/* Rating Bintang */}
                <div className="flex items-center gap-1 text-amber-400 mb-3 text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Komentar */}
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Profil Pemberi Ulasan */}
              <div className="flex items-center gap-3.5 pt-4 border-t border-zinc-800/80">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 flex items-center justify-center text-lg font-bold shadow-md shadow-pink-500/20">
                  {t.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm group-hover:text-pink-300 transition-colors">
                    {t.name}
                  </h3>
                  <span className="text-[11px] text-zinc-400 font-medium">
                    {t.business}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};