// components/sections/DistrictsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  subtitle?: string;
  provinsi?: string;
  kabupaten?: string;
  districts?: string[];
}

export const DistrictsSection: React.FC<Props> = ({
  title,
  subtitle,
  provinsi,
  kabupaten,
  districts = [],
}) => {
  if (districts.length === 0) return null;

  const finalTitle =
    title ?? `Kecamatan yang Kami Layani di ${kabupaten ?? "Wilayah Ini"}`;
  const finalSubtitle =
    subtitle ??
    `Melayani seluruh ${districts.length} kecamatan${
      kabupaten ? ` di ${kabupaten}` : ""
    }${provinsi ? `, ${provinsi}` : ""} — 100% online tanpa biaya tambahan.`;

  return (
    <section className="bg-[#003580] py-8 sm:py-12 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-5 sm:mb-6"
        >
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-2.5 py-1 rounded-full shadow-sm mb-2">
            Cakupan Layanan
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
            {finalTitle}
          </h2>

          <p className="mt-1.5 text-[10px] sm:text-xs text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Kecil & Padat */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {districts.map((district, idx) => (
            <motion.span
              key={`${district}-${idx}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.005 }}
              className="bg-[#00224f] border border-[#0066f5] rounded-md px-2 py-1 sm:px-2.5 sm:py-1.5 text-[10px] sm:text-xs text-blue-100 font-medium leading-none hover:border-[#FEBB02] hover:bg-[#002b5c] hover:text-white transition-colors whitespace-nowrap"
            >
              {district}
            </motion.span>
          ))}
        </motion.div>

        {/* Footer Minimal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center text-[10px] sm:text-xs text-blue-200 mt-5 max-w-xl mx-auto"
        >
          Tidak menemukan kecamatan Anda?{" "}
          <span className="text-[#FEBB02] font-semibold">
            Tetap bisa konsultasi gratis
          </span>{" "}
          — melayani seluruh Indonesia.
        </motion.p>
      </div>
    </section>
  );
};