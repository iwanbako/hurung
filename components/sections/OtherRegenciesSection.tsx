// components/sections/OtherRegenciesSection.tsx
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
    <section className="bg-[#003580] py-10 sm:py-14 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-6 sm:mb-8 flex items-center justify-between flex-wrap gap-3"
        >
          <div>
            <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-2.5 py-1 rounded-full shadow-sm mb-2">
              Wilayah Lain di {provinsiName}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-white leading-tight">
              Jasa Website Profesional di{" "}
              <span className="text-[#FEBB02]">{provinsiName}</span>
            </h2>
            <p className="text-[10px] sm:text-xs text-blue-100 mt-1">
              Beberapa kabupaten/kota lain di {provinsiName} yang kami layani.
            </p>
          </div>

          <Link
            href={`/${provinsiSlug}`}
            className="text-[10px] sm:text-xs font-bold text-[#FEBB02] hover:text-yellow-300 transition-colors whitespace-nowrap"
          >
            Lihat Semua {otherRegencies.length} Wilayah →
          </Link>
        </motion.div>

        {/* Grid 5 Kartu Kabupaten Lain */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2 sm:gap-3">
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
                className="group flex items-center gap-2 bg-[#00224f] border-l-4 border-[#0066f5] hover:border-[#FEBB02] rounded-r-lg px-2.5 py-2 hover:bg-[#002b5c] transition-all duration-200 h-full"
              >
                <span className="text-[#FEBB02] text-sm group-hover:translate-x-0.5 transition-transform">
                  ▸
                </span>
                <span className="text-[10px] sm:text-xs text-blue-100 group-hover:text-white font-medium leading-tight line-clamp-2 transition-colors">
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