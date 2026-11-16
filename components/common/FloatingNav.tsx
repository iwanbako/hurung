"use client";

import React, { useEffect, useState } from "react";

interface Props {
  waDefault: string;
}

export const FloatingNav: React.FC<Props> = ({ waDefault }) => {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Tombol Back to Top dengan Border Tipis Merah */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas"
        className={`fixed right-4 bottom-20 md:bottom-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white text-red-600 shadow-xl border border-red-500 flex items-center justify-center transition-all duration-300 hover:bg-red-50 hover:border-red-600 hover:scale-105 active:scale-95 ${
          showTopBtn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 text-red-600">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Floating Bottom Nav khusus Mobile dengan Border Tipis Merah */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-50 bg-white/95 backdrop-blur-md border border-red-500 rounded-2xl shadow-xl px-2 py-2.5">
        <div className="flex items-center justify-between">
          <a href="#" className="flex flex-col items-center justify-center flex-1 py-1 text-slate-700 active:scale-90 transition-transform hover:text-red-600">
            <span className="text-[11px] sm:text-xs font-bold tracking-wide text-slate-900">Home</span>
          </a>
          <a href="#layanan" className="flex flex-col items-center justify-center flex-1 py-1 text-slate-700 active:scale-90 transition-transform hover:text-red-600">
            <span className="text-[11px] sm:text-xs font-bold text-slate-900">Layanan</span>
          </a>
          <a href="#harga" className="flex flex-col items-center justify-center flex-1 py-1 text-slate-700 active:scale-90 transition-transform hover:text-red-600">
            <span className="text-[11px] sm:text-xs font-bold text-slate-900">Harga</span>
          </a>
          <a href={waDefault} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center flex-1 py-1 active:scale-90 transition-transform bg-red-600 text-white rounded-xl py-1.5 shadow-sm shadow-red-600/20">
            <span className="text-[11px] sm:text-xs font-extrabold tracking-wide text-white">WhatsApp</span>
          </a>
        </div>
      </div>
    </>
  );
};