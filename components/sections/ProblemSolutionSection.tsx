// components/sections/ProblemSolutionSection.tsx
"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProblemSolutionPair {
  problem: string;
  solution: string;
}

const defaultPairs: ProblemSolutionPair[] = [
  {
    problem:
      "Media sosial dibatasi algoritma & akun bisa diblokir sewaktu-waktu.",
    solution:
      "100% hak milik: domain & data pelanggan aman sepenuhnya di tangan Anda.",
  },
  {
    problem:
      "Susah muncul di Google saat calon pembeli mencari produk/jasa Anda.",
    solution:
      "SEO-optimized: struktur pSEO & semantik bersih, mudah nangkring di Google.",
  },
  {
    problem:
      "Katalog & transaksi manual via chat bikin kewalahan dan menumpuk.",
    solution:
      "Sistem otomatis: katalog rapi, tombol WhatsApp langsung, bebas antre 24/7.",
  },
  {
    problem:
      "Bisnis terlihat kurang kredibel karena hanya andalkan lapak instan.",
    solution:
      "Citra profesional: tampil resmi, berkelas, membangun kepercayaan klien.",
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
  const pairs: ProblemSolutionPair[] =
    problems && solutions && problems.length > 0 && solutions.length > 0
      ? problems.map((p, i) => ({
          problem: p,
          solution: solutions[i] ?? "",
        }))
      : defaultPairs;

  // Item pertama default terbuka
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? -1 : idx));
  };

  const finalSubtitle =
    subtitle ??
    "Jangan biarkan bisnis Anda tertinggal kompetitor karena masih mengandalkan cara-cara lama yang terbatas.";

  return (
    <section className="bg-[#003580] py-12 sm:py-16 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-10"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3 py-1 rounded-full shadow-sm mb-3">
            Transformasi Bisnis
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Dari <span className="text-rose-300">Kendala Lama</span> ke{" "}
                <span className="text-[#FEBB02]">Solusi Modern</span>
              </>
            )}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-2 sm:space-y-2.5">
          {pairs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`bg-[#00224f] border rounded-xl overflow-hidden transition-colors ${
                  isOpen
                    ? "border-[#FEBB02]/70"
                    : "border-[#0066f5]/60 hover:border-[#0066f5]"
                }`}
              >
                {/* Header — tombol trigger */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 px-3.5 sm:px-5 py-3 sm:py-3.5 text-left transition-colors hover:bg-[#002b5c]/50"
                >
                  {/* Icon masalah */}
                  <span className="text-base sm:text-lg shrink-0 leading-none">
                    {problemIcons[idx % problemIcons.length]}
                  </span>

                  {/* Text problem */}
                  <div className="flex-1 min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-rose-300 mb-0.5">
                      Masalah #{idx + 1}
                    </span>
                    <p className="text-[11px] sm:text-xs text-blue-100 font-medium leading-snug line-clamp-2">
                      {item.problem}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-[#FEBB02]"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>

                {/* Content — solusi */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-4 pt-1">
                        <div className="flex items-start gap-2.5 pl-7 sm:pl-8">
                          <span className="text-base sm:text-lg shrink-0 leading-none mt-0.5">
                            {solutionIcons[idx % solutionIcons.length]}
                          </span>
                          <div className="min-w-0">
                            <span className="block text-[9px] font-bold uppercase tracking-wider text-[#FEBB02] mb-0.5">
                              Solusi KerabatWeb
                            </span>
                            <p className="text-[11px] sm:text-xs text-[#FEBB02] font-semibold leading-snug">
                              {item.solution}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Hint kecil */}
        <p className="text-center text-[10px] text-blue-200/70 mt-4">
          Klik tiap masalah untuk melihat solusinya
        </p>
      </div>
    </section>
  );
};