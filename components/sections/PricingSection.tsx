// components/sections/PricingSection.tsx
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
      className="bg-[#003580] border-y border-[#0066f5] py-16 sm:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi Masuk */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-3">
            Paket Harga Transparan
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1">
            Pilihan Paket{" "}
            <span className="text-[#FEBB02]">
              Terbaik {locationName ? `di ${locationName}` : "Untuk Anda"}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
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
                className={`rounded-3xl bg-[#00224f] flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-lg ${
                  isPopular
                    ? "border-2 border-[#FEBB02] ring-4 ring-[#FEBB02]/20 lg:-translate-y-2"
                    : "border-2 border-[#0066f5] hover:border-blue-400"
                }`}
              >
                {/* Badge Terpopuler / Rekomendasi di Sudut Atas */}
                {p.badge && (
                  <div className="absolute top-0 right-0 bg-[#FEBB02] text-[#00224f] text-[10px] sm:text-xs font-bold px-4 py-1.5 rounded-bl-2xl shadow-sm uppercase tracking-wider">
                    {p.badge}
                  </div>
                )}

                <div>
                  {/* Header Kartu */}
                  <div className="p-6 sm:p-7 text-left relative bg-[#001a3d] text-white border-b border-[#0066f5]">
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white mb-1.5">
                      {p.name}
                    </h3>
                    <p className="text-xs text-blue-200 min-h-[32px] leading-relaxed mb-5">
                      {p.target}
                    </p>

                    {/* Kotak Harga */}
                    <div className="bg-[#003580] p-3.5 rounded-2xl border border-[#0066f5] backdrop-blur-sm">
                      {p.priceNormal && (
                        <span className="text-xs text-rose-300 line-through block font-mono mb-0.5">
                          {p.priceNormal}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span className="text-2xl sm:text-3xl font-extrabold text-white">
                          {p.pricePromo}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] bg-blue-950 text-[#FEBB02] border border-blue-800 font-semibold px-2 py-0.5 rounded-md">
                          {p.diskon}
                        </span>
                        <span className="text-[10px] text-blue-200 font-mono tracking-wider">
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daftar Fitur */}
                  <div className="p-5 sm:p-6 bg-[#00224f]">
                    <p className="text-xs font-bold text-[#FEBB02] uppercase tracking-wider mb-4">
                      Layanan Meliputi:
                    </p>
                    <ul className="space-y-3 text-xs sm:text-sm text-blue-100">
                      {p.features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2.5 pb-2.5 border-b border-[#003580] last:border-0 last:pb-0"
                        >
                          <span className="w-4 h-4 rounded-full bg-blue-950 text-[#FEBB02] border border-blue-800 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                            ✓
                          </span>
                          <span className="flex-1 leading-snug">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Aksi Bawah */}
                <div className="p-5 sm:p-6 bg-[#001a3d] border-t border-[#0066f5]">
                  <a
                    href={getWaLink(
                      `Halo KerabatWeb, saya ingin memesan ${p.name} (${p.pricePromo})${
                        locationName ? ` untuk wilayah ${locationName}` : ""
                      }.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-4 py-3.5 rounded-xl font-bold transition-all text-xs sm:text-sm shadow-md active:scale-95 ${
                      isPopular
                        ? "bg-[#FEBB02] text-[#00224f] hover:bg-[#e0a802] shadow-[#FEBB02]/25 font-extrabold"
                        : "bg-[#0066f5] text-white hover:bg-blue-600 shadow-blue-500/20"
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
          className="text-center text-xs text-blue-200 mt-10"
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