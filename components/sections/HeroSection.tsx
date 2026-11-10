// components/sections/HeroSection.tsx
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
      className="relative text-white overflow-hidden py-16 sm:py-24 md:py-32 flex items-center justify-center min-h-[80vh]"
    >
      {/* ============================================================
          BACKGROUND IMAGE
          ============================================================ */}
      <img
        src={HERO_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 z-0 w-full h-full object-cover object-center scale-105"
        loading="eager"
        fetchPriority="high"
        decoding="async"
      />

      {/* Overlay Gelap */}
      <div className="absolute inset-0 z-10 bg-booking-900/90" />

      {/* Konten Utama */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center">
        {/* ═══ BADGE ═══ */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold uppercase tracking-wider bg-yellow-500 text-booking-700 px-4 py-1.5 rounded-full shadow-md mb-4">
            {badge}
          </span>
        </motion.div>

        {/* ═══ H1 — TANPA ANIMASI OPACITY (SEO-SAFE) ═══
            h1 selalu visible, bahkan sebelum JS hydrate.
            Animasi y tetap ada lewat CSS kalau mau, tapi opacity tidak disentuh. */}
        <h1
          id="hero-heading"
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight drop-shadow-lg max-w-4xl mx-auto mb-4"
        >
          {headline || (
            <>
              <span className="bk-highlight">Jasa Pembuatan Website</span>{" "}
              Profesional untuk Bisnis Anda
            </>
          )}
        </h1>

        {/* ═══ SUBHEADLINE ═══ */}
        <motion.p
          className="text-sm sm:text-base md:text-lg text-white/90 leading-relaxed max-w-2xl mx-auto mb-8 drop-shadow-md"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {subheadline ||
            "Website cepat, SEO-friendly, dan fokus konversi. Dibangun dengan tech stack modern, siap tingkatkan penjualan Anda."}
        </motion.p>

        {/* ═══ CTA ═══ */}
        <motion.div
          className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto justify-center mb-10"
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
            className="bk-btn-yellow px-8 py-3.5 text-sm sm:text-base font-bold text-center shadow-lg active:scale-95 transition-all hover:scale-105"
          >
            {ctaText}
          </a>
          <a
            href="#harga"
            className="px-8 py-3.5 rounded-xl bg-white/10 border border-white/30 text-white font-semibold hover:bg-white/20 active:scale-95 transition-all text-sm sm:text-base text-center backdrop-blur-sm"
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