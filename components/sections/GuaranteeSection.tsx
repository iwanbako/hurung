// components/sections/GuaranteeSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  kabupaten?: string;
  title?: string;
  subtitle?: string;
}

export const GuaranteeSection: React.FC<Props> = ({
  kabupaten,
  title,
  subtitle,
}) => {
  // ============================================================
  // DATA GARANSI (dinamis mengikuti kabupaten kalau ada)
  // ============================================================
  const guarantees = [
    {
      icon: "🛡️",
      title: "Garansi Keamanan SSL & Data",
      desc: kabupaten
        ? `Setiap website untuk bisnis di ${kabupaten} dilengkapi sertifikat SSL resmi dan berjalan di atas infrastruktur server berkecepatan tinggi yang aman dari serangan siber.`
        : "Setiap website dilengkapi sertifikat SSL resmi dan berjalan di atas infrastruktur server berkecepatan tinggi yang aman dari serangan siber.",
    },
    {
      icon: "🔄",
      title: "Garansi Revisi Desain",
      desc: kabupaten
        ? `Kami sediakan kuota revisi desain agar tampilan akhir website bisnis Anda di ${kabupaten} benar-benar pas dengan identitas dan keinginan Anda.`
        : "Kami sediakan kuota revisi desain agar tampilan akhir website benar-benar pas dan sesuai dengan identitas serta keinginan bisnis Anda.",
    },
    {
      icon: "🤝",
      title: "Pendampingan & Support Teknis",
      desc: kabupaten
        ? `Tidak paham teknis? Tenang! Kami pandu klien di ${kabupaten} dari nol, mulai dari setup domain, hosting, hingga website siap aktif menghasilkan cuan.`
        : "Tidak paham teknis? Tenang! Kami bantu pandu dari nol, mulai dari setup domain, hosting, hingga website siap aktif menghasilkan cuan.",
    },
  ];

  // ============================================================
  // HEADER TEXT (dinamis mengikuti kabupaten kalau ada)
  // ============================================================
  const finalTitle = title ?? (
    <>
      100%{" "}
      <span className="text-[#FEBB02]">Garansi Kepuasan</span>
      {kabupaten ? ` untuk Bisnis di ${kabupaten}` : " untuk Anda"}
    </>
  );

  const finalSubtitle =
    subtitle ??
    (kabupaten
      ? `Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik untuk bisnis di ${kabupaten} dengan standar kualitas profesional berteknologi tinggi.`
      : "Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik dengan standar kualitas profesional berteknologi tinggi.");

  return (
    <section className="bg-[#003580] py-16 sm:py-24 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi Masuk */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-3">
            Komitmen & Proteksi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {finalTitle}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Garansi dengan Animasi Stagger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {guarantees.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.15,
                ease: "easeOut",
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-2xl p-6 sm:p-8 flex flex-col items-start shadow-lg transition-all relative overflow-hidden"
            >
              {/* Aksen Glow Kuning Permanen di Sudut Atas */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FEBB02]/15 rounded-full blur-2xl pointer-events-none"></div>

              {/* Icon Kotak dengan Warna Kuning Permanen */}
              <div className="w-12 h-12 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] flex items-center justify-center text-xl mb-5 shadow-sm font-bold">
                {item.icon}
              </div>

              <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};