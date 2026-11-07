// components/sections/FinalCtaSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

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
  // Helper untuk membuat link WhatsApp langsung di dalam Client Component
  const getWaLink = (msg: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  const finalSubtitle =
    subtitle ??
    "Jangan biarkan kompetitor mendahului Anda. Konsultasikan kebutuhan website Anda sekarang secara gratis dan dapatkan penawaran khusus minggu ini!";

  return (
    <section className="relative bg-[#003580] text-white py-16 sm:py-24 overflow-hidden border-2 border-[#0066f5] rounded-2xl bg-[#00224f] shadow-lg">
      {/* Efek Background Glow / Gradient Dekoratif */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-[#0066f5]/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/4 right-1/4 w-[250px] h-[250px] bg-[#FEBB02]/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge Animasi Masuk */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-4 py-1.5 rounded-full shadow-sm mb-4">
            🚀 Mulai Transformasi Digital Anda Hari Ini
          </span>
        </motion.div>

        {/* Heading Utama */}
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
        >
          {title ? (
            title
          ) : (
            <>
              Siap Tingkatkan Penjualan Bisnis dengan{" "}
              <span className="text-[#FEBB02]">Website Profesional?</span>
            </>
          )}
        </motion.h2>

        {/* Deskripsi */}
        <motion.p
          className="text-xs sm:text-sm md:text-base text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
        >
          {finalSubtitle}
        </motion.p>

        {/* Tombol Aksi (CTA) */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.45, ease: "easeOut" }}
        >
          <a
            href={getWaLink(
              "Halo KerabatWeb, saya siap membuat website profesional untuk bisnis saya. Mohon info lebih lanjut."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-[#FEBB02] hover:bg-[#e0a802] text-[#00224f] font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg shadow-[#FEBB02]/25 active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <span>💬 Konsultasi Gratis via WhatsApp</span>
          </a>

          <a
            href="#harga"
            className="w-full sm:w-auto bg-[#001a3d] hover:bg-[#002b5c] text-white font-semibold px-8 py-4 rounded-xl border border-[#0066f5] transition-all text-xs sm:text-sm flex items-center justify-center gap-2"
          >
            <span>Lihat Paket Harga</span>
          </a>
        </motion.div>

        {/* Keunggulan Singkat di Bawah */}
        <motion.div
          className="mt-12 pt-8 border-t border-[#0066f5]/80 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-blue-200"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="flex items-center gap-2">
            <span className="text-[#FEBB02] font-bold">✓</span> Tanpa Biaya
            Tersembunyi
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#FEBB02] font-bold">✓</span> Proses
            Pengerjaan Cepat
          </span>
          <span className="flex items-center gap-2">
            <span className="text-[#FEBB02] font-bold">✓</span> Garansi Support
            Penuh
          </span>
        </motion.div>
      </div>
    </section>
  );
};