"use client";

import React from "react";
import { motion } from "framer-motion";
import { DomainChecker } from "../common/DomainChecker";

interface Props {
  waNumber?: string;
  badge?: string;
  headline?: string;
  subheadline?: string;
  ctaText?: string;
}

// ✅ OPTIMASI: lebar 1200, kualitas 60
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
      className="relative text-white overflow-hidden py-20 sm:py-28 md:py-36 flex items-center justify-center min-h-[85vh] bg-[#030303]"
    >
      {/* ============================================================
          BACKGROUND IMAGE & OVERLAY PELANGI MODERN
          ============================================================ */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center scale-105 opacity-25 mix-blend-luminosity"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Gradasi Overlay Hitam Pekat & Glow Pelangi */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#030303]/95 via-[#050505]/90 to-[#030303]" />
      
      {/* Efek Glow Cahaya Pelangi di Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-violet-600/20 via-pink-600/20 to-cyan-500/20 rounded-full blur-[120px] pointer-events-none z-10" />

      {/* Konten Utama */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* ═══ BADGE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-4">
            {badge}
          </span>
        </motion.div>

        {/* ═══ H1 — SEO-SAFE ═══ */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-xl max-w-4xl mx-auto mb-4 text-zinc-100"
        >
          {headline || (
            <>
              <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Jasa Pembuatan Website
              </span>{" "}
              Profesional untuk Bisnis Anda
            </>
          )}
        </h1>

        {/* ═══ SUBHEADLINE ═══ */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-zinc-400 leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {subheadline ||
            "Website cepat, SEO-friendly, dan fokus konversi. Dibangun dengan tech stack modern, siap tingkatkan penjualan Anda."}
        </motion.p>

        {/* ═══ CTA ═══ */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3.5 w-full sm:w-auto justify-center mb-12"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={getWaLink(
              "Halo KerabatWeb, saya tertarik konsultasi pembuatan website."
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white text-sm sm:text-base font-bold text-center shadow-lg shadow-pink-600/25 active:scale-95 transition-all hover:scale-105 hover:opacity-95"
          >
            {ctaText}
          </a>
          <a
            href="#harga"
            className="px-8 py-3.5 rounded-xl bg-zinc-900/80 border border-zinc-800 text-zinc-300 font-semibold hover:bg-zinc-800 hover:text-white active:scale-95 transition-all text-sm sm:text-base text-center backdrop-blur-md shadow-lg"
          >
            Lihat Paket Harga
          </a>
        </motion.div>

        {/* ═══ DOMAIN CHECKER ═══ */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <DomainChecker />
        </motion.div>
      </div>
    </section>
  );
};