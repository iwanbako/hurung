"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { provinsiContent } from "@/data/provinsi-content";
import { getRegenciesOfProvince } from "@/lib/wilayah";

const waNumber = "6285938573419";
const waDefault = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo KerabatWeb, saya ingin konsultasi pembuatan website.")}`;

const promoTexts = [
  "Jasa Pembuatan Website Profesional & Cepat — Mulai dari Rp 999.000 / Tahun",
  "100% Bergaransi, Hosting & Domain Gratis — Setup Cepat Siap Jualan",
  "Optimasi SEO Google & Mobile Friendly — Jangkau Pelanggan Lebih Luas",
];

export const Header: React.FC = () => {
  const [isWilayahOpen, setIsWilayahOpen] = useState(false);
  const [activeProvinsi, setActiveProvinsi] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // State untuk efek mengetik
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  const allProvinces = Object.values(provinsiContent).sort((a, b) => 
    a.nama.localeCompare(b.nama)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWilayahOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Efek Mengetik / Typing Effect
  useEffect(() => {
    const fullText = promoTexts[currentTextIndex];

    const handleTyping = () => {
      if (!isDeleting) {
        setDisplayText(fullText.substring(0, displayText.length + 1));
        if (displayText === fullText) {
          setTimeout(() => setIsDeleting(true), 2000); // Jeda sebelum menghapus
          setTypingSpeed(50);
        }
      } else {
        setDisplayText(fullText.substring(0, displayText.length - 1));
        if (displayText === "") {
          setIsDeleting(false);
          setCurrentTextIndex((prev) => (prev + 1) % promoTexts.length);
          setTypingSpeed(100);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, currentTextIndex, typingSpeed]);

  const handleMouseEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsWilayahOpen(true);
  };

  const handleMouseLeave = () => {
    closeTimerRef.current = setTimeout(() => {
      setIsWilayahOpen(false);
      setActiveProvinsi(null);
    }, 200);
  };

  return (
    <header className="sticky top-0 z-50 bg-white text-slate-900 border-b border-slate-200 shadow-sm">
      
      {/* ================= TOP BAR MERAH DENGAN EFEK KETIK ================= */}
      <div className="bg-red-600 text-white text-[10px] sm:text-xs py-1.5 px-4 font-medium overflow-hidden">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 truncate">
            <span className="bg-white text-red-600 font-bold px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider shrink-0 shadow-sm">
              Promo
            </span>
            <span className="truncate">
              {displayText}
              <span className="inline-block w-1.5 h-3 bg-white ml-0.5 animate-pulse"></span>
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-4 shrink-0">
            <a href="mailto:halo@kerabatweb.com" className="hover:underline transition-all">
              halo@kerabatweb.com
            </a>
            <span>•</span>
            <span className="text-red-100">100% Bergaransi & Support Full</span>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR ================= */}
      <nav className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white transition-all duration-300 group-hover:scale-105 shadow-sm active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-white">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
              <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
              <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-red-200" />
              <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-red-200" />
            </svg>
          </span>
          <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900">
            Kerabat<span className="text-red-600">Web</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-semibold text-slate-900 flex-1">
          <li>
            <Link href="/#layanan" className="py-1.5 px-3 transition-colors hover:text-red-600">
              Layanan
            </Link>
          </li>
          <li>
            <Link href="/#harga" className="py-1.5 px-3 transition-colors hover:text-red-600">
              Harga
            </Link>
          </li>
          
          {/* MEGA MENU WILAYAH */}
          <li 
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className="flex items-center gap-1.5 py-1.5 px-3 transition-colors hover:text-red-600 font-semibold"
              onClick={() => setIsWilayahOpen(!isWilayahOpen)}
            >
              Wilayah
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isWilayahOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega Menu Dropdown */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${
                isWilayahOpen 
                  ? "visible opacity-100 translate-y-0 pointer-events-auto" 
                  : "invisible opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="w-[750px] bg-white text-slate-900 rounded-2xl shadow-2xl border border-slate-200 flex overflow-hidden text-left h-[500px] relative">

                {/* SISI KIRI: Daftar Provinsi */}
                <div className="w-[35%] border-r border-slate-200 bg-slate-50 flex flex-col pt-3">
                  <div className="px-4 py-2 border-b border-slate-200 bg-slate-50">
                    <span className="text-[11px] font-bold text-red-600 uppercase tracking-wider flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Pilih Provinsi
                    </span>
                  </div>
                  <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-0.5">
                    {allProvinces.map((prov) => (
                      <Link 
                        key={prov.slug} 
                        href={`/${prov.slug}`}
                        onMouseEnter={() => setActiveProvinsi(prov.slug)}
                        className={`group flex items-center px-3.5 py-2 text-sm font-medium rounded-xl transition-all duration-150 ${
                          activeProvinsi === prov.slug 
                            ? "bg-red-600 text-white font-semibold shadow-sm" 
                            : "text-slate-800 hover:text-slate-950 hover:bg-slate-200/60"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${activeProvinsi === prov.slug ? 'bg-white' : 'bg-transparent group-hover:bg-red-500'}`}></div>
                        {prov.nama}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* SISI KANAN: Daftar Kabupaten/Kota */}
                <div className="w-[65%] flex flex-col bg-white pt-3 relative">
                  <div className="px-5 py-2 border-b border-slate-200 flex items-center justify-between bg-white">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider">
                      Kabupaten/Kota
                    </span>
                    {activeProvinsi && (
                      <span className="text-[11px] bg-red-50 text-red-700 px-3 py-0.5 rounded-full font-medium border border-red-200">
                        {provinsiContent[activeProvinsi].nama}
                      </span>
                    )}
                  </div>
                  
                  <div className="overflow-y-auto custom-scrollbar flex-1 p-4 relative">
                    {allProvinces.map((prov) => {
                      const regencies = getRegenciesOfProvince(prov.slug);
                      const isActive = activeProvinsi === prov.slug;

                      return (
                        <div 
                          key={prov.slug}
                          className={`grid grid-cols-2 gap-2 ${isActive ? "block" : "hidden"}`}
                        >
                          {regencies.map((kab) => (
                            <Link
                              key={kab.slug}
                              href={`/${prov.slug}/${kab.slug}`}
                              className="group flex items-center gap-2.5 px-3.5 py-2.5 text-xs sm:text-sm text-slate-900 hover:text-red-600 font-semibold rounded-xl bg-slate-50 border border-slate-200 hover:border-red-300 hover:bg-red-50/50 transition-all"
                            >
                              <svg className="w-3.5 h-3.5 text-red-600 group-hover:text-red-600 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                              <span className="truncate">{kab.name || (kab as any).nama}</span>
                            </Link>
                          ))}
                        </div>
                      );
                    })}

                    {!activeProvinsi && (
                      <div className="h-full flex flex-col items-center justify-center text-slate-500 text-sm absolute inset-0 bg-white">
                        <div className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <p className="text-center leading-relaxed font-semibold text-slate-700">Arahkan kursor ke provinsi<br/>untuk melihat kabupaten/kota.</p>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          </li>

          <li>
            <Link href="/blog" className="py-1.5 px-3 transition-colors hover:text-red-600">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/kontak" className="py-1.5 px-3 transition-colors hover:text-red-600">
              Kontak
            </Link>
          </li>
        </ul>

        {/* TOMBOL WHATSAPP (Merah Putih) */}
        <a href={waDefault} target="_blank" rel="noopener noreferrer" className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 sm:px-5 py-2 text-xs sm:text-sm rounded-full shrink-0 transition-all shadow-md shadow-red-600/20 active:scale-95">
          Konsultasi Gratis
        </a>
      </nav>
    </header>
  );
};