"use client";

import React from "react";
import { motion } from "framer-motion";

const webVsSosmed = [
  {
    aspect: "Kepemilikan Aset",
    sosmed: "Sewa tempat (bisa diblokir sewaktu-waktu)",
    web: "100% Hak Milik Domain & Data Anda",
  },
  {
    aspect: "Pencarian Google (SEO)",
    sosmed: "Sangat sulit muncul di halaman 1",
    web: "Sangat Mudah Dioptimasi di Halaman 1 Google",
  },
  {
    aspect: "Kredibilitas Bisnis",
    sosmed: "Terlihat seperti jualan biasa",
    web: "Terlihat Resmi, Kredibel, & Profesional",
  },
  {
    aspect: "Katalog & Transaksi",
    sosmed: "Manual, sering tertimbun chat",
    web: "Sistematis, Otomatis, & Bebas Antre",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
}

export const WebVsSosmedSection: React.FC<Props> = ({ title, subtitle }) => {
  const finalSubtitle =
    subtitle ??
    "Media sosial hanya alat promosi. Website adalah aset bisnis Anda yang sesungguhnya.";

  return (
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Komparasi Strategis
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2 tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Mengapa Media Sosial Saja{" "}
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Tidak Cukup?
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Tabel Komparasi dengan Animasi Masuk */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto no-scrollbar rounded-2xl border border-zinc-800 bg-[#0a0a0a] shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-zinc-900/90 text-white border-b border-zinc-800">
                <th className="p-4 sm:p-5 font-bold text-zinc-300">
                  Aspek Bisnis
                </th>
                <th className="p-4 sm:p-5 font-bold bg-rose-950/20 text-rose-400">
                  Hanya Media Sosial
                </th>
                <th className="p-4 sm:p-5 font-bold bg-gradient-to-r from-violet-950/40 via-pink-950/40 to-cyan-950/40 text-white">
                  Website Resmi (KerabatWeb)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/60 text-zinc-300">
              {webVsSosmed.map((item, idx) => (
                <tr key={idx} className="hover:bg-zinc-900/40 transition-colors">
                  <td className="p-4 sm:p-5 font-bold text-white">
                    {item.aspect}
                  </td>
                  <td className="p-4 sm:p-5 text-rose-400 font-medium bg-rose-950/10">
                    ✕ {item.sosmed}
                  </td>
                  <td className="p-4 sm:p-5 text-emerald-300 font-bold bg-emerald-950/10">
                    ✓ {item.web}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};