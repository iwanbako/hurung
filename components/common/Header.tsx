// components/common/Header.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { provinsiContent } from "@/data/provinsi-content";
import { getRegenciesOfProvince } from "@/lib/wilayah";

const waNumber = "6285938573419";
const waDefault = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo KerabatWeb, saya ingin konsultasi pembuatan website.")}`;

export const Header: React.FC = () => {
  const [isWilayahOpen, setIsWilayahOpen] = useState(false);
  const [activeProvinsi, setActiveProvinsi] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLLIElement>(null);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);

  const allProvinces = Object.values(provinsiContent).sort((a, b) => 
    a.nama.localeCompare(b.nama)
  );

  const activeRegencies = activeProvinsi 
    ? getRegenciesOfProvince(activeProvinsi) 
    : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsWilayahOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    <header className="sticky top-0 z-50 bg-booking-700 text-white shadow-lg">
      <nav className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-xl bg-white text-booking-700 shadow-md transition-transform duration-200 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-booking-700">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" className="fill-booking-50/50" />
              <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
              <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500" />
              <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" className="text-amber-500" />
            </svg>
          </span>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white">
            Kerabat<span className="text-yellow-400">Web</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-medium text-white/90 flex-1">
          <li>
            <Link href="/#layanan" className="py-1 hover:text-yellow-400 transition-colors">
              Layanan
            </Link>
          </li>
          <li>
            <Link href="/#harga" className="py-1 hover:text-yellow-400 transition-colors">
              Harga
            </Link>
          </li>
          
          {/* ================= MEGA MENU WILAYAH (TRANSPARAN) ================= */}
          <li 
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button 
              className={`flex items-center gap-1.5 py-4 transition-colors ${isWilayahOpen ? 'text-yellow-400' : 'hover:text-yellow-400'}`}
              onClick={() => setIsWilayahOpen(!isWilayahOpen)}
            >
              Wilayah
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isWilayahOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega Menu Dropdown */}
            {isWilayahOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                {/* Latar Transparan Kaca (Glassmorphism) */}
                <div className="w-[700px] bg-white/70 backdrop-blur-xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] border border-white/40 flex overflow-hidden text-left h-[450px] ring-1 ring-black/5 animate-in fade-in slide-in-from-top-2 duration-200">
                  
                  {/* Garis Aksen Kuning */}
                  <div className="absolute top-2 left-0 w-full h-1.5 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-400 z-10 rounded-t-2xl"></div>

                  {/* SISI KIRI: Daftar Provinsi */}
                  <div className="w-[40%] border-r border-white/40 bg-white/30 flex flex-col pt-3">
                    <div className="px-4 py-2 border-b border-white/40 bg-white/20">
                      <span className="text-[11px] font-extrabold text-booking-900 uppercase tracking-widest flex items-center gap-1.5">
                        <svg className="w-3.5 h-3.5 text-booking-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        Pilih Provinsi
                      </span>
                    </div>
                    <div className="overflow-y-auto custom-scrollbar flex-1 p-2 space-y-0.5">
                      {allProvinces.map((prov) => (
                        <Link 
                          key={prov.slug} 
                          href={`/${prov.slug}`}
                          onMouseEnter={() => setActiveProvinsi(prov.slug)}
                          className={`group flex items-center px-3 py-2 text-sm rounded-lg transition-all duration-200 ${
                            activeProvinsi === prov.slug 
                              ? "bg-booking-700 text-white shadow-md translate-x-1" 
                              : "text-gray-800 hover:bg-white/60"
                          }`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${activeProvinsi === prov.slug ? 'bg-yellow-400' : 'bg-transparent group-hover:bg-booking-400'}`}></div>
                          {prov.nama}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* SISI KANAN: Daftar Kabupaten/Kota */}
                  <div className="w-[60%] flex flex-col bg-transparent pt-3 relative">
                    <div className="px-5 py-2 border-b border-white/40 flex items-center justify-between bg-white/20">
                      <span className="text-[11px] font-extrabold text-booking-900 uppercase tracking-widest">
                        {activeProvinsi ? `Kabupaten/Kota` : "Pilih Provinsi"}
                      </span>
                      {activeProvinsi && (
                        <span className="text-[11px] bg-yellow-400 text-booking-900 px-2.5 py-0.5 rounded-md font-bold shadow-sm">
                          {provinsiContent[activeProvinsi].nama}
                        </span>
                      )}
                    </div>
                    
                    <div className="overflow-y-auto custom-scrollbar flex-1 p-4">
                      {!activeProvinsi && (
                        <div className="h-full flex flex-col items-center justify-center text-gray-600 text-sm">
                          <div className="w-16 h-16 bg-white/40 rounded-full flex items-center justify-center mb-3 border border-white/50 shadow-sm">
                            <svg className="w-8 h-8 text-booking-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          </div>
                          <p className="text-center leading-relaxed font-medium">Arahkan kursor ke provinsi<br/>untuk melihat kabupaten/kota.</p>
                        </div>
                      )}

                      {activeProvinsi && activeRegencies.length > 0 && (
                        <div className="grid grid-cols-2 gap-2">
                          {activeRegencies.map((kab) => (
                            <Link
                              key={kab.slug}
                              href={`/${activeProvinsi}/${kab.slug}`}
                              className="group flex items-center gap-2.5 px-3 py-2.5 text-xs sm:text-sm text-gray-800 rounded-xl bg-white/50 border border-white/60 shadow-sm hover:bg-white hover:border-booking-300 hover:text-booking-700 transition-all hover:-translate-y-0.5"
                            >
                              <svg className="w-3.5 h-3.5 text-gray-500 group-hover:text-booking-500 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                              <span className="truncate font-semibold">{kab.name || (kab as any).nama}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  
                </div>
              </div>
            )}
          </li>

          <li>
            <Link href="/blog" className="py-1 hover:text-yellow-400 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/kontak" className="py-1 hover:text-yellow-400 transition-colors">
              Kontak
            </Link>
          </li>
        </ul>

        {/* TOMBOL WA */}
        <a href={waDefault} target="_blank" rel="noopener noreferrer" className="bk-btn-yellow px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shrink-0 shadow-lg hover:shadow-xl transition-shadow">
          Konsultasi Gratis
        </a>
      </nav>
    </header>
  );
};