// components/sections/TestimonialSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Bapak Budi Santoso",
    business: "Pemilik Kuliner Kopi Nusantara",
    comment:
      "Website selesai sangat cepat dan performanya luar biasa! Penjualan online kami meningkat drastis setelah pindah ke website profesional ini.",
    rating: 5,
    avatar: "☕",
  },
  {
    name: "Dr. Siti Rahma",
    business: "Klinik Sehat Utama",
    comment:
      "Sangat puas dengan pelayanannya. Fitur tombol WhatsApp langsung sangat membantu pasien berkonsultasi dengan mudah.",
    rating: 5,
    avatar: "👩‍⚕️",
  },
  {
    name: "Reza Pratama",
    business: "Founder EduTech Academy",
    comment:
      "Struktur SEO-nya mantap! Baru beberapa minggu online, website langsung nongkrong di halaman pertama pencarian Google.",
    rating: 5,
    avatar: "🎓",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
}

export const TestimonialSection: React.FC<Props> = ({ title, subtitle }) => {
  const finalTitle = title ?? "Apa Kata Klien Kami?";
  const finalSubtitle =
    subtitle ??
    "Kepuasan klien adalah prioritas utama kami dalam menghadirkan solusi digital terbaik.";

  return (
    <section className="bg-[#003580] py-12 sm:py-20 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-2">
            Testimoni & Kepercayaan
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Apa Kata <span className="text-[#FEBB02]">Klien Kami?</span>
              </>
            )}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Testimoni dengan Animasi Framer Motion */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#00224f] rounded-2xl p-6 sm:p-7 border-2 border-[#0066f5] shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                {/* Rating Bintang */}
                <div className="flex items-center gap-1 text-[#FEBB02] mb-3 text-sm">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>

                {/* Komentar */}
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed italic mb-6">
                  &ldquo;{t.comment}&rdquo;
                </p>
              </div>

              {/* Profil Pemberi Ulasan */}
              <div className="flex items-center gap-3 pt-4 border-t border-[#003580]">
                <div className="w-10 h-10 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] flex items-center justify-center text-lg font-bold shadow-sm">
                  {t.avatar}
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">{t.name}</h3>
                  <span className="text-[11px] text-blue-200 font-medium">
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