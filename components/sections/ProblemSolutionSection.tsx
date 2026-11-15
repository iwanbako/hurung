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
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Transformasi Bisnis
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Dari <span className="text-rose-400">Kendala Lama</span> ke{" "}
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Solusi Modern
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="space-y-3 sm:space-y-3.5">
          {pairs.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? "bg-[#0a0a0a] border-pink-500/50 shadow-[0_10px_30px_rgba(236,72,153,0.15)]"
                    : "bg-[#0a0a0a]/80 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                {/* Header — tombol trigger */}
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3.5 px-4 sm:px-6 py-4 text-left transition-colors hover:bg-zinc-900/50 cursor-pointer"
                >
                  {/* Icon masalah */}
                  <span className="text-base sm:text-lg shrink-0 leading-none">
                    {problemIcons[idx % problemIcons.length]}
                  </span>

                  {/* Text problem */}
                  <div className="flex-1 min-w-0">
                    <span className="block text-[9px] font-bold uppercase tracking-wider text-rose-400 mb-0.5">
                      Masalah #{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-200 font-medium leading-snug">
                      {item.problem}
                    </p>
                  </div>

                  {/* Chevron */}
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="shrink-0 text-pink-400"
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
                      <div className="px-4 sm:px-6 pb-4 sm:pb-5 pt-1 border-t border-zinc-800/80 bg-[#050505]/60">
                        <div className="flex items-start gap-3 pl-7 sm:pl-8 pt-2">
                          <span className="text-base sm:text-lg shrink-0 leading-none mt-0.5">
                            {solutionIcons[idx % solutionIcons.length]}
                          </span>
                          <div className="min-w-0">
                            <span className="block text-[9px] font-bold uppercase tracking-wider bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent mb-0.5">
                              Solusi KerabatWeb
                            </span>
                            <p className="text-xs sm:text-sm text-zinc-300 font-semibold leading-relaxed">
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
        <p className="text-center text-xs text-zinc-500 mt-6">
          Klik tiap masalah untuk melihat solusinya
        </p>
      </div>
    </section>
  );
};