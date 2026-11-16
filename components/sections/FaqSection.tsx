"use client";

import React, { useState } from "react";
import { FaqItem } from "../../types";

interface Props {
  faqs: FaqItem[];
  waNumber?: string;
}

export const FaqSection: React.FC<Props> = ({ faqs, waNumber = "6285938573419" }) => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  const getWaLink = (msg: string) => `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section className="relative bg-white border-y border-slate-200 py-16 sm:py-24 overflow-hidden">
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            FAQ & Tanya Jawab
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">
            Pertanyaan yang <span className="text-red-600">Sering Diajukan</span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Temukan jawaban lengkap seputar layanan, proses pengerjaan, dan garansi pembuatan website di KerabatWeb.
          </p>
        </div>

        {/* List FAQ */}
        <div className="space-y-4">
          {faqs.map((f, i) => {
            const isOpen = openIdx === i;

            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden shadow-sm ${
                  isOpen 
                    ? "bg-white border-red-300 shadow-md" 
                    : "bg-white border-slate-200 hover:border-slate-300"
                }`}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-5 sm:px-6 py-4 sm:py-5 cursor-pointer text-left bg-transparent hover:bg-slate-50/60 transition-colors"
                >
                  <span className="font-bold text-slate-900 text-sm sm:text-base md:text-lg pr-3">
                    {f.q}
                  </span>
                  
                  <div 
                    className={`hidden sm:flex w-8 h-8 rounded-full items-center justify-center shrink-0 font-bold transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-red-600 text-white shadow-sm" : "bg-slate-100 border border-slate-200 text-slate-600"
                    }`}
                  >
                    ↓
                  </div>
                </button>

                {/* Konten Jawaban dengan transisi CSS grid */}
                <div 
                  className={`grid transition-all duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 sm:px-6 pb-5 pt-2 text-xs sm:text-sm md:text-base text-slate-600 leading-relaxed border-t border-slate-100 font-normal bg-white">
                      <p>{f.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Box CTA Bawah */}
        <div className="mt-12 text-center bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 relative overflow-hidden shadow-sm">
          <p className="text-sm sm:text-base text-slate-900 font-semibold">
            Masih punya pertanyaan lain yang belum terjawab?
          </p>
          <a
            href={getWaLink("Halo KerabatWeb, saya ingin bertanya hal lain diluar FAQ website.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md shadow-red-600/20 active:scale-95"
          >
            💬 Konsultasi Langsung via WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
};