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
    <header className="sticky top-0 z-50 bg-[#050505]/90 backdrop-blur-xl text-zinc-300 border-b border-zinc-800/80 shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
      
      {/* Garis Aksen Pelangi Modern di Bagian Paling Atas Header */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90 shadow-[0_0_15px_rgba(236,72,153,0.6)]"></div>

      <nav className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        
        {/* LOGO */}
        <Link href="/" className="group flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white shadow-lg shadow-pink-500/20 transition-transform duration-200 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-white">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
              <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
              <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300" />
              <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-300" />
            </svg>
          </span>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white">
            Kerabat<span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Web</span>
          </span>
        </Link>

        {/* MENU DESKTOP */}
        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-medium text-zinc-300 flex-1">
          <li>
            <Link href="/#layanan" className="py-1 hover:text-pink-400 transition-colors">
              Layanan
            </Link>
          </li>
          <li>
            <Link href="/#harga" className="py-1 hover:text-pink-400 transition-colors">
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
              className={`flex items-center gap-1.5 py-4 transition-colors ${isWilayahOpen ? 'text-pink-400' : 'hover:text-pink-400'}`}
              onClick={() => setIsWilayahOpen(!isWilayahOpen)}
            >
              Wilayah
              <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isWilayahOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Mega Menu Dropdown */}
            <div 
              className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-200 ${
                isWilayahOpen 
                  ? "visible opacity-100 translate-y-0 pointer-events-auto" 
                  : "invisible opacity-0 -translate-y-2 pointer-events-none"
              }`}
            >
              <div className="w-[750px] bg-[#0a0a0a] text-zinc-200 rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.9)] border border-zinc-800 flex overflow-hidden text-left h-[500px] ring-1 ring-white/10 relative">
                
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 z-10"></div>

                {/* SISI KIRI: Daftar Provinsi */}
                <div className="w-[35%] border-r border-zinc-800 bg-[#0d0d0d] flex flex-col pt-3">
                  <div className="px-4 py-2 border-b border-zinc-800 bg-[#050505]">
                    <span className="text-[11px] font-extrabold bg-gradient-to-r from-violet-400 to-pink-400 bg-clip-text text-transparent uppercase tracking-widest flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
                            ? "bg-gradient-to-r from-violet-600 to-pink-600 text-white shadow-lg shadow-pink-600/20 translate-x-1" 
                            : "text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200"
                        }`}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full mr-2.5 transition-colors ${activeProvinsi === prov.slug ? 'bg-cyan-300' : 'bg-transparent group-hover:bg-pink-400'}`}></div>
                        {prov.nama}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* SISI KANAN: Daftar Kabupaten/Kota */}
                <div className="w-[65%] flex flex-col bg-[#0a0a0a] pt-3 relative">
                  <div className="px-5 py-2 border-b border-zinc-800 flex items-center justify-between bg-[#050505]">
                    <span className="text-[11px] font-extrabold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent uppercase tracking-widest">
                      Kabupaten/Kota
                    </span>
                    {activeProvinsi && (
                      <span className="text-[11px] bg-zinc-800 text-pink-300 border border-zinc-700 px-2.5 py-0.5 rounded-md font-bold shadow-sm">
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
                              className="group flex items-center gap-2.5 px-3 py-2.5 text-xs sm:text-sm text-zinc-300 rounded-xl bg-zinc-900/60 border border-zinc-800 shadow-sm hover:bg-zinc-900 hover:border-pink-500/50 hover:text-pink-400 transition-all hover:-translate-y-0.5"
                            >
                              <svg className="w-3.5 h-3.5 text-zinc-500 group-hover:text-pink-400 transition-colors shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                              <span className="truncate font-semibold">{kab.name || (kab as any).nama}</span>
                            </Link>
                          ))}
                        </div>
                      );
                    })}

                    {!activeProvinsi && (
                      <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-sm absolute inset-0 bg-[#0a0a0a]">
                        <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        </div>
                        <p className="text-center leading-relaxed">Arahkan kursor ke provinsi<br/>untuk melihat kabupaten/kota.</p>
                      </div>
                    )}
                  </div>
                </div>
                
              </div>
            </div>
          </li>

          <li>
            <Link href="/blog" className="py-1 hover:text-pink-400 transition-colors">
              Blog
            </Link>
          </li>
          <li>
            <Link href="/kontak" className="py-1 hover:text-pink-400 transition-colors">
              Kontak
            </Link>
          </li>
        </ul>

        {/* TOMBOL WA */}
        <a href={waDefault} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white font-medium px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-xl shrink-0 shadow-lg shadow-pink-500/20 hover:opacity-95 transition-all hover:scale-[1.02]">
          Konsultasi Gratis
        </a>
      </nav>
    </header>
  );
};