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
  currentKabupatenSlug: string;
  regencies: Regency[];
  limit?: number; // default 5
}

export const OtherRegenciesSection: React.FC<Props> = ({
  provinsiName,
  provinsiSlug,
  currentKabupatenSlug,
  regencies,
  limit = 5,
}) => {
  // Filter: buang kabupaten saat ini, TANPA sort (urutan sesuai JSON)
  const otherRegencies = regencies.filter(
    (r) => r.slug !== currentKabupatenSlug
  );

  if (otherRegencies.length === 0) return null;

  const displayed = otherRegencies.slice(0, limit);

  return (
    <section className="relative bg-[#030303] py-12 sm:py-16 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 right-10 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8 flex items-center justify-between flex-wrap gap-3"
        >
          <div>
            <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-3 py-1 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-2">
              Wilayah Lain di {provinsiName}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight">
              Jasa Website Profesional di{" "}
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                {provinsiName}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Beberapa kabupaten/kota lain di {provinsiName} yang kami layani.
            </p>
          </div>

          <Link
            href={`/${provinsiSlug}`}
            className="text-xs sm:text-sm font-bold bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity whitespace-nowrap"
          >
            Lihat Semua {otherRegencies.length} Wilayah →
          </Link>
        </motion.div>

        {/* Grid Kartu Kabupaten Lain */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
          {displayed.map((regency, idx) => (
            <motion.div
              key={regency.slug}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.25, delay: idx * 0.03 }}
            >
              <Link
                href={`/${provinsiSlug}/${regency.slug}`}
                className="group flex items-center gap-2.5 bg-[#0a0a0a] border border-zinc-800 border-l-4 border-l-pink-500 hover:border-pink-500/60 rounded-xl px-3 py-2.5 hover:bg-zinc-900 transition-all duration-200 h-full shadow-sm hover:shadow-[0_0_15px_rgba(236,72,153,0.15)]"
              >
                <span className="text-pink-400 text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
                  ▸
                </span>
                <span className="text-[11px] sm:text-xs text-zinc-300 group-hover:text-white font-medium leading-tight line-clamp-2 transition-colors">
                  {regency.name}
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};