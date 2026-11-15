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
    <section className="relative bg-black py-12 sm:py-16 border-b border-zinc-800 overflow-hidden">
      
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
            <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-white px-3 py-1 rounded-full mb-2">
              Wilayah Lain di {provinsiName}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight tracking-tight">
              Jasa Website Profesional di{" "}
              <span className="text-white">
                {provinsiName}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1 font-normal">
              Beberapa kabupaten/kota lain di {provinsiName} yang kami layani.
            </p>
          </div>

          <Link
            href={`/${provinsiSlug}`}
            className="text-xs sm:text-sm font-semibold text-white hover:opacity-80 transition-opacity whitespace-nowrap"
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
                className="group flex items-center gap-2.5 bg-black border border-zinc-800 border-l-4 border-l-white hover:border-zinc-700 rounded-xl px-3 py-2.5 hover:bg-zinc-900 transition-all duration-200 h-full shadow-sm"
              >
                <span className="text-white text-xs group-hover:translate-x-0.5 transition-transform shrink-0">
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