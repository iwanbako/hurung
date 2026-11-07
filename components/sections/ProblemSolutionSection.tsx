// components/sections/ProblemSolutionSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface ProblemSolutionPair {
  problem: string;
  solution: string;
}

const defaultPairs: ProblemSolutionPair[] = [
  {
    problem:
      "Media sosial sering dibatasi algoritmanya atau akun sewaktu-waktu bisa diblokir.",
    solution:
      "100% Hak Milik Aset Digital: Domain dan data pelanggan aman sepenuhnya di tangan Anda.",
  },
  {
    problem:
      "Susah muncul di halaman utama Google saat calon pembeli mencari produk atau jasa Anda.",
    solution:
      "SEO-Optimized: Dibangun dengan struktur pSEO dan semantik bersih agar mudah nangkring di Google.",
  },
  {
    problem:
      "Katalog produk dan transaksi manual via chat membuat kewalahan dan sering tertimbun.",
    solution:
      "Sistem Otomatis: Katalog terstruktur rapi, tombol WhatsApp langsung, bebas antre 24/7.",
  },
  {
    problem:
      "Bisnis terlihat kurang kredibel karena hanya mengandalkan lapak instan.",
    solution:
      "Citra Profesional: Tampil resmi, berkelas, dan langsung membangun kepercayaan tinggi klien.",
  },
];

const problemIcons = ["⚠️", "🔍", "💬", "📉"];
const solutionIcons = ["🛡️", "📈", "⚡", "💎"];

interface Props {
  title?: string;
  subtitle?: string;
  problems?: string[];
  solutions?: string[];
}

export const ProblemSolutionSection: React.FC<Props> = ({
  title,
  subtitle,
  problems,
  solutions,
}) => {
  // Kalau `problems` & `solutions` dari props diisi, pakai itu.
  // Kalau tidak, pakai defaultPairs.
  const pairs: ProblemSolutionPair[] =
    problems && solutions && problems.length > 0 && solutions.length > 0
      ? problems.map((p, i) => ({
          problem: p,
          solution: solutions[i] ?? "",
        }))
      : defaultPairs;

  const finalTitle = title ?? "Dari Kendala Lama Menuju Solusi Modern";
  const finalSubtitle =
    subtitle ??
    "Jangan biarkan bisnis Anda tertinggal kompetitor karena masih mengandalkan cara-cara lama yang terbatas.";

  return (
    <section className="bg-[#003580] py-14 sm:py-20 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-3">
            Transformasi Bisnis
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Dari <span className="text-rose-300">Kendala Lama</span> Menuju{" "}
                <span className="text-[#FEBB02]">Solusi Modern</span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-2xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Problem vs Solution */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {pairs.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#00224f] rounded-2xl p-6 sm:p-8 border-2 border-[#0066f5] shadow-lg transition-all flex flex-col justify-between"
            >
              {/* Sisi Masalah */}
              <div className="mb-5 pb-5 border-b border-[#003580]">
                <div className="flex items-start gap-3">
                  <span className="text-xl sm:text-2xl shrink-0 mt-0.5">
                    {problemIcons[idx % problemIcons.length]}
                  </span>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300 bg-rose-950/80 border border-rose-900 px-2 py-0.5 rounded">
                      Masalah Umum
                    </span>
                    <p className="mt-1.5 text-xs sm:text-sm text-blue-100 font-medium leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                </div>
              </div>

              {/* Sisi Solusi */}
              <div className="flex items-start gap-3">
                <span className="text-xl sm:text-2xl shrink-0 mt-0.5">
                  {solutionIcons[idx % solutionIcons.length]}
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#00224f] bg-[#FEBB02] px-2 py-0.5 rounded">
                    Solusi KerabatWeb
                  </span>
                  <p className="mt-1.5 text-xs sm:text-sm text-[#FEBB02] font-bold leading-relaxed">
                    {item.solution}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};