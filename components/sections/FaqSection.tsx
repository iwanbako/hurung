"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaqItem } from "../../types";

interface Props {
  faqs: FaqItem[];
  waNumber?: string; // Menerima nomor WhatsApp sebagai string (bukan fungsi)
}

export const FaqSection: React.FC<Props> = ({ faqs, waNumber = "6285938573419" }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  // Helper untuk membuat link WhatsApp langsung di dalam Client Component
  const getWaLink = (msg: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section className="relative bg-[#030303] border-y border-zinc-800/80 py-16 sm:py-24 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Animasi */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            FAQ & Tanya Jawab
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3">
            Pertanyaan yang <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Sering Diajukan</span>
          </h2>
        </motion.div>

        {/* List FAQ */}
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? "bg-[#0a0a0a] border-pink-500/50 shadow-[0_10px_30px_rgba(236,72,153,0.15)]" 
                    : "bg-[#0a0a0a]/80 border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 cursor-pointer text-left bg-transparent hover:bg-zinc-900/50 transition-colors"
                >
                  <span className="font-bold text-white text-sm sm:text-base md:text-lg pr-3">
                    {f.q}
                  </span>
                  
                  <motion.div 
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center shrink-0 font-bold transition-colors ${
                      isOpen 
                        ? "bg-gradient-to-tr from-violet-600 to-pink-600 text-white shadow-md shadow-pink-500/30" 
                        : "bg-zinc-900 border border-zinc-800 text-zinc-400"
                    }`}
                  >
                    ↓
                  </motion.div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed border-t border-zinc-800/80 bg-[#050505]/60">
                        <p>{f.a}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

        {/* Box CTA Bawah */}
        <motion.div 
          className="mt-12 text-center bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 shadow-[0_15px_40px_rgba(0,0,0,0.8)] relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {/* Garis aksen bawah box */}
          <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-60"></div>

          <p className="text-sm sm:text-base text-zinc-200 font-medium">
            Masih punya pertanyaan lain yang belum terjawab?
          </p>
          <a
            href={getWaLink("Halo KerabatWeb, saya ingin bertanya hal lain diluar FAQ website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white font-extrabold text-xs sm:text-sm hover:opacity-95 transition-all shadow-lg shadow-pink-500/25 active:scale-95 hover:scale-105"
          >
            💬 Konsultasi Langsung via WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
};