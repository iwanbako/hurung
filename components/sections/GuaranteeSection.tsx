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
      <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
        Garansi Kepuasan
      </span>
      {kabupaten ? ` untuk Bisnis di ${kabupaten}` : " untuk Anda"}
    </>
  );

  const finalSubtitle =
    subtitle ??
    (kabupaten
      ? `Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik untuk bisnis di ${kabupaten} dengan standar kualitas profesional berteknologi tinggi.`
      : "Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik dengan standar kualitas profesional berteknologi tinggi.");

  return (
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-pink-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi Masuk */}
        <motion.div
          className="text-center mb-12 sm:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Komitmen & Proteksi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {finalTitle}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
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
              className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col items-start shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all relative overflow-hidden group hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]"
            >
              {/* Aksen Glow Pelangi Halus di Sudut Atas Card */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-violet-500/10 to-pink-500/10 rounded-full blur-2xl pointer-events-none group-hover:from-violet-500/20 group-hover:to-pink-500/20 transition-all"></div>

              {/* Icon Kotak dengan Gradasi Pelangi */}
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 flex items-center justify-center text-xl mb-5 shadow-lg shadow-pink-500/20 font-bold">
                {item.icon}
              </div>

              <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};