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
    <section className="relative bg-black border-y border-zinc-800 py-16 sm:py-24 overflow-hidden">
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Animasi */}
        <motion.div 
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-white px-4 py-1.5 rounded-full mb-3">
            FAQ & Tanya Jawab
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3 tracking-tight">
            Pertanyaan yang <span className="text-white">Sering Diajukan</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-white max-w-xl mx-auto leading-relaxed font-normal">
            Temukan jawaban lengkap seputar layanan, proses pengerjaan, dan garansi pembuatan website di KerabatWeb.
          </p>
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
                    ? "bg-black border-zinc-600 shadow-sm" 
                    : "bg-black border-zinc-800 hover:border-zinc-700"
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
                        ? "bg-white text-black shadow-sm" 
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
                      <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm md:text-base text-zinc-400 leading-relaxed border-t border-zinc-800 font-normal bg-black">
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
          className="mt-12 text-center bg-black border border-zinc-800 rounded-2xl p-6 sm:p-8 relative overflow-hidden"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-sm sm:text-base text-white font-medium">
            Masih punya pertanyaan lain yang belum terjawab?
          </p>
          <a
            href={getWaLink("Halo KerabatWeb, saya ingin bertanya hal lain diluar FAQ website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-zinc-200 transition-all shadow-sm active:scale-95"
          >
            💬 Konsultasi Langsung via WhatsApp
          </a>
        </motion.div>

      </div>
    </section>
  );
};