"use client";

import React from "react";
import { motion } from "framer-motion";
import { PricingPackage } from "../../types";

interface Props {
  pricing: PricingPackage[];
  waNumber?: string;
  locationName?: string;
  note?: string;
}

export const PricingSection: React.FC<Props> = ({
  pricing,
  waNumber = "6285938573419",
  locationName,
  note,
}) => {
  // Helper untuk membuat link WhatsApp langsung di dalam Client Component
  const getWaLink = (msg: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      id="harga"
      className="relative bg-[#030303] border-y border-zinc-800/80 py-16 sm:py-24 overflow-hidden"
    >
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi Masuk */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Paket Harga Transparan
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            Pilihan Paket{" "}
            <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
              Terbaik {locationName ? `di ${locationName}` : "Untuk Anda"}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            Investasi website profesional dengan fitur lengkap, performa tinggi, dan garansi keamanan penuh.
          </p>
        </motion.div>

        {/* Grid Kartu Harga */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {pricing.map((p, idx) => {
            const isPopular = p.popular;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: idx * 0.1,
                  ease: "easeOut",
                }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className={`rounded-3xl bg-[#0a0a0a] flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${
                  isPopular
                    ? "border-2 border-pink-500/80 ring-4 ring-pink-500/20 lg:-translate-y-2 shadow-[0_20px_50px_rgba(236,72,153,0.25)]"
                    : "border border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Badge Terpopuler / Rekomendasi Menyala Permanen (Glow + Pulse) */}
                {p.badge && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-violet-500 via-pink-500 to-amber-400 text-white text-[10px] sm:text-xs font-extrabold px-4 py-1.5 rounded-bl-2xl shadow-[0_0_25px_rgba(236,72,153,0.8)] uppercase tracking-wider animate-pulse border-b border-l border-white/30 z-20">
                    {p.badge}
                  </div>
                )}

                <div>
                  {/* Header Kartu */}
                  <div className="p-6 sm:p-7 text-left relative bg-zinc-900/80 text-white border-b border-zinc-800/80">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5">
                      {p.name}
                    </h3>
                    <p className="text-xs text-zinc-400 min-h-[32px] leading-relaxed mb-5">
                      {p.target}
                    </p>

                    {/* Kotak Harga */}
                    <div className="bg-[#050505] p-3.5 rounded-2xl border border-zinc-800 shadow-inner">
                      {p.priceNormal && (
                        <span className="text-xs text-rose-400 line-through block font-mono mb-0.5">
                          {p.priceNormal}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white">
                          {p.pricePromo}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] bg-pink-950/60 text-pink-400 border border-pink-800/50 font-semibold px-2 py-0.5 rounded-md">
                          {p.diskon}
                        </span>
                        <span className="text-[10px] text-zinc-400 font-mono tracking-wider">
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daftar Fitur */}
                  <div className="p-5 sm:p-6 bg-[#0a0a0a]">
                    <p className="text-xs font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-wider mb-4">
                      Layanan Meliputi:
                    </p>
                    <ul className="space-y-3 text-xs sm:text-sm text-zinc-300">
                      {p.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 pb-2.5 border-b border-zinc-800/60 last:border-0 last:pb-0"
                        >
                          <span className="w-4 h-4 rounded-full bg-zinc-900 text-pink-400 border border-zinc-700 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-sm">
                            ✓
                          </span>
                          <span className="flex-1 leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Aksi Bawah */}
                <div className="p-5 sm:p-6 bg-zinc-900/60 border-t border-zinc-800/80">
                  <a
                    href={getWaLink(
                      `Halo KerabatWeb, saya ingin memesan ${p.name} (${p.pricePromo})${
                        locationName ? ` untuk wilayah ${locationName}` : ""
                      }.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-4 py-3.5 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-lg active:scale-95 ${
                      isPopular
                        ? "bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white hover:opacity-95 shadow-pink-500/25 font-extrabold hover:scale-[1.02]"
                        : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700"
                    }`}
                  >
                    Jadwalkan Konsultasi
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Catatan Bawah */}
        <motion.p
          className="text-center text-xs text-zinc-500 mt-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {note ??
            "* Harga belum termasuk PPN. Konsultasi gratis via WhatsApp untuk kebutuhan kustom fitur khusus."}
        </motion.p>
      </div>
    </section>
  );
};