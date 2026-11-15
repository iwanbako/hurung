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
    <section className="relative bg-[#030303] text-white py-16 sm:py-24 overflow-hidden border border-zinc-800/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] max-w-5xl mx-auto my-12 px-4">
      
      {/* Garis Aksen Pelangi Tipis di Atas Box */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow / Gradient Dekoratif Pelangi */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] bg-gradient-to-tr from-violet-600/30 via-pink-600/30 to-cyan-500/30 rounded-full blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge Animasi Masuk */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-4">
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
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Website Profesional?
              </span>
            </>
          )}
        </motion.h2>

        {/* Deskripsi */}
        <motion.p
          className="text-xs sm:text-sm md:text-base text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed"
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
            className="w-full sm:w-auto bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 hover:opacity-95 text-white font-extrabold px-8 py-4 rounded-xl transition-all shadow-lg shadow-pink-500/25 active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 hover:scale-105"
          >
            <span>💬 Konsultasi Gratis via WhatsApp</span>
          </a>

          <a
            href="#harga"
            className="w-full sm:w-auto bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white font-semibold px-8 py-4 rounded-xl border border-zinc-800 transition-all text-xs sm:text-sm flex items-center justify-center gap-2 backdrop-blur-md shadow-lg"
          >
            <span>Lihat Paket Harga</span>
          </a>
        </motion.div>

        {/* Keunggulan Singkat di Bawah */}
        <motion.div
          className="mt-12 pt-8 border-t border-zinc-800/80 flex flex-wrap items-center justify-center gap-6 text-xs sm:text-sm text-zinc-400"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <span className="flex items-center gap-2">
            <span className="text-pink-400 font-bold">✓</span> Tanpa Biaya
            Tersembunyi
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400 font-bold">✓</span> Proses
            Pengerjaan Cepat
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-400 font-bold">✓</span> Garansi Support
            Penuh
          </span>
        </motion.div>
      </div>
    </section>
  );
};