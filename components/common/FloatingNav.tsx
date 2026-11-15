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
      {/* Tombol Back to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Kembali ke atas"
        className={`fixed right-4 bottom-20 md:bottom-6 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0a0a0a] text-white shadow-[0_10px_25px_rgba(0,0,0,0.8)] border border-zinc-700 flex items-center justify-center transition-all duration-300 hover:bg-zinc-900 hover:border-pink-500 hover:scale-105 active:scale-95 ${
          showTopBtn ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="w-5 h-5 text-pink-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
      </button>

      {/* Floating Bottom Nav khusus Mobile */}
      <div className="md:hidden fixed bottom-3 left-4 right-4 z-50 bg-[#0a0a0a]/95 backdrop-blur-md border border-zinc-800 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.9)] px-2 py-2.5">
        <div className="flex items-center justify-between">
          <a href="#" className="flex flex-col items-center justify-center flex-1 py-1 text-zinc-300 active:scale-90 transition-transform hover:text-white">
            <span className="text-[11px] sm:text-xs font-bold tracking-wide">🏠 Home</span>
          </a>
          <a href="#layanan" className="flex flex-col items-center justify-center flex-1 py-1 text-zinc-300 active:scale-90 transition-transform hover:text-white">
            <span className="text-[11px] sm:text-xs font-bold">⚙️ Layanan</span>
          </a>
          <a href="#harga" className="flex flex-col items-center justify-center flex-1 py-1 text-zinc-300 active:scale-90 transition-transform hover:text-white">
            <span className="text-[11px] sm:text-xs font-bold">💎 Harga</span>
          </a>
          <a href={waDefault} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center flex-1 py-1 active:scale-90 transition-transform">
            <span className="text-[11px] sm:text-xs font-extrabold tracking-wide bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">💬 WA Chat</span>
          </a>
        </div>
      </div>
    </>
  );
};