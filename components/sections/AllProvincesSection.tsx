"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface Provinsi {
  nama: string;
  slug: string;
}

interface Props {
  provinsiList: Provinsi[];
}

export const AllProvincesSection: React.FC<Props> = ({ provinsiList }) => {
  if (!provinsiList || provinsiList.length === 0) return null;

  return (
    <section className="relative bg-[#030303] py-12 sm:py-16 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-6 sm:mb-8"
        >
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-3.5 py-1 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Cakupan Layanan
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white tracking-tight leading-tight">
            Melayani Seluruh Provinsi di Indonesia
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {provinsiList.length} provinsi — semua terlayani 100% online tanpa
            biaya tambahan.
          </p>
        </motion.div>

        {/* Chip Kecil Semua Provinsi */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.05 }}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2"
        >
          {provinsiList.map((prov, idx) => (
            <motion.div
              key={prov.slug}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.2, delay: idx * 0.005 }}
            >
              <Link
                href={`/${prov.slug}`}
                className="inline-block bg-[#0a0a0a] border border-zinc-800 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-zinc-300 font-medium leading-none hover:border-pink-500/60 hover:bg-zinc-900 hover:text-white hover:shadow-[0_0_15px_rgba(236,72,153,0.2)] transition-all whitespace-nowrap"
              >
                {prov.nama}
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
          className="text-center text-xs text-zinc-400 mt-6 max-w-xl mx-auto"
        >
          Tidak menemukan provinsi Anda?{" "}
          <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent font-semibold">
            Tetap bisa konsultasi gratis
          </span>{" "}
          — melayani seluruh Indonesia.
        </motion.p>
      </div>
    </section>
  );
};