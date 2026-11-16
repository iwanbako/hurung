import React from "react";
import { DomainChecker } from "../common/DomainChecker";

interface Props {
  waNumber?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}

const HERO_BG =
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=60&w=1200&auto=format&fit=crop";

export const HeroSection: React.FC<Props> = ({
  waNumber = "6285938573419",
  badge = "Website Online dalam 48 Jam",
  headline,
  subheadline,
  ctaText = "Buatkan Saya Website",
}) => {
  const getWaLink = (msg: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative text-slate-900 overflow-hidden py-20 sm:py-28 md:py-36 flex items-center justify-center min-h-[85vh] bg-slate-100 border-b border-slate-200"
    >
      {/* ═══ BACKGROUND IMAGE ═══ */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center scale-105 opacity-50"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Gradasi lembut tipis di latar belakang agar gambar tetap tampak natural */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-white/60 via-transparent to-white/70" />

      {/* ═══ KONTEN UTAMA (Tanpa Kotak/BG Putih di Belakang Teks) ═══ */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        
        {/* BADGE */}
        <div className="mb-4 inline-block">
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-white/90 backdrop-blur-sm border border-red-200 text-red-700 px-4 py-1.5 rounded-full shadow-sm">
            {badge}
          </span>
        </div>

        {/* H1 — SEO-FRIENDLY & INSTANT RENDER */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl mx-auto mb-4 text-slate-900 drop-shadow-sm"
        >
          {headline || (
            <>
              <span className="text-red-600">
                Jasa Pembuatan Website
              </span>{" "}
              Profesional untuk Bisnis Anda
            </>
          )}
        </h1>

        {/* SUBHEADLINE */}
        <p className="text-sm sm:text-base md:text-lg text-slate-800 font-semibold leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-sm">
          {subheadline ||
            "Website cepat, SEO-friendly, dan fokus konversi. Dibangun dengan tech stack modern, siap tingkatkan penjualan Anda."}
        </p>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center mb-10">
          <a
            href={getWaLink(
              "Halo KerabatWeb, saya tertarik konsultasi pembuatan website."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base font-bold text-center shadow-lg shadow-red-600/20 transition-all duration-200 hover:scale-[1.02] active:scale-95"
          >
            {ctaText}
          </a>
          <a
            href="#harga"
            className="px-8 py-3.5 rounded-full bg-white/90 backdrop-blur-sm border border-slate-300 text-slate-900 hover:bg-white font-semibold text-center shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 text-sm sm:text-base"
          >
            Lihat Paket Harga
          </a>
        </div>

        {/* DOMAIN CHECKER */}
        <div className="w-full">
          <DomainChecker />
        </div>

      </div>
    </section>
  );
};