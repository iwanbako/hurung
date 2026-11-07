// components/sections/WebVsSosmedSection.tsx
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
    <section className="bg-[#003580] py-10 sm:py-16 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1 rounded-full shadow-sm">
            Komparasi Strategis
          </span>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mt-2">
            {title ? (
              title
            ) : (
              <>
                Mengapa Media Sosial Saja{" "}
                <span className="text-[#FEBB02]">Tidak Cukup?</span>
              </>
            )}
          </h2>

          {subtitle && (
            <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
              {finalSubtitle}
            </p>
          )}
        </motion.div>

        {/* Tabel Komparasi dengan Animasi Masuk */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="overflow-x-auto no-scrollbar"
        >
          <table className="w-full text-left border-collapse bg-[#00224f] rounded-2xl overflow-hidden border-2 border-[#0066f5] shadow-lg text-xs sm:text-sm">
            <thead>
              <tr className="bg-[#001a3d] text-white border-b border-[#0066f5]">
                <th className="p-3.5 sm:p-4 font-bold text-blue-200">
                  Aspek Bisnis
                </th>
                <th className="p-3.5 sm:p-4 font-bold bg-red-950/60 text-red-300">
                  Hanya Media Sosial
                </th>
                <th className="p-3.5 sm:p-4 font-bold bg-[#FEBB02] text-[#00224f]">
                  Website Resmi (KerabatWeb)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#003580] text-gray-200">
              {webVsSosmed.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#002b5c] transition">
                  <td className="p-3.5 sm:p-4 font-bold text-white">
                    {item.aspect}
                  </td>
                  <td className="p-3.5 sm:p-4 text-red-300 font-medium bg-red-950/30">
                    ✕ {item.sosmed}
                  </td>
                  <td className="p-3.5 sm:p-4 text-emerald-300 font-bold bg-emerald-950/30">
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