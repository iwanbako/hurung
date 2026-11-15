"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Regency {
  name: string;
  slug: string;
}

interface Props {
  provinsiName: string;
  provinsiSlug: string;
  regencies: Regency[];
}

export const ProvinsiRegenciesSection: React.FC<Props> = ({
  provinsiName,
  provinsiSlug,
  regencies,
}) => {
  if (!regencies || regencies.length === 0) return null;

  return (
    <section className="relative bg-black py-12 sm:py-16 border-b border-zinc-800 overflow-hidden">
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-white px-3.5 py-1 rounded-full mb-3">
            Cakupan Layanan
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
            Melayani Seluruh Kabupaten/Kota di {provinsiName}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed font-normal">
            {regencies.length} kabupaten/kota di {provinsiName} — semua
            terlayani 100% online tanpa biaya tambahan.
          </p>
        </motion.div>

        {/* Chip Kecil Semua Kabupaten */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {regencies.map((regency, idx) => (
            <motion.div
              key={regency.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.005 }}
            >
              <Link
                href={`/${provinsiSlug}/${regency.slug}`}
                className="inline-block bg-black border border-zinc-800 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-zinc-300 font-medium leading-none hover:border-zinc-700 hover:bg-zinc-900 hover:text-white transition-all whitespace-nowrap"
              >
                {regency.name}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Minimal */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="text-center text-xs text-zinc-500 mt-6 max-w-xl mx-auto font-normal"
        >
          Tidak menemukan wilayah Anda?{" "}
          <span className="text-white font-semibold">
            Tetap bisa konsultasi gratis
          </span>{" "}
          — melayani seluruh Indonesia.
        </motion.p>
      </div>
    </section>
  );
};