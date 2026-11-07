// components/sections/WhyUsSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface WhyUsPoint {
  title: string;
  description: string;
}

const defaultPoints: WhyUsPoint[] = [
  {
    title: "Pengerjaan Kilat 3-5 Hari",
    description:
      "Website Anda langsung online dan siap digunakan dalam hitungan hari tanpa menunggu lama.",
  },
  {
    title: "Garansi & Maintenance",
    description:
      "Sudah termasuk gratis domain, SSL, hosting, serta dukungan pemeliharaan teknis rutin.",
  },
  {
    title: "Fokus Konversi & SEO",
    description:
      "Struktur website dirancang khusus untuk meningkatkan penjualan dan mudah ditemukan di Google.",
  },
  {
    title: "Harga Transparan & Murah",
    description:
      "Tanpa biaya tersembunyi. Dapatkan fitur kelas enterprise dengan investasi yang sangat ramah di kantong.",
  },
];

const pointIcons = ["⚡", "🛡️", "🎯", "💎"];

interface Props {
  title?: string;
  subtitle?: string;
  points?: WhyUsPoint[];
}

export const WhyUsSection: React.FC<Props> = ({
  title,
  subtitle,
  points,
}) => {
  const finalTitle = title ?? "Mengapa Harus Memilih Kami?";
  const finalSubtitle =
    subtitle ??
    "Kami menghadirkan solusi pembuatan website profesional yang tidak hanya indah dipandang, tapi juga menghasilkan profit nyata untuk bisnis Anda.";

  const finalPoints =
    points && points.length > 0 ? points : defaultPoints;

  return (
    <section className="bg-[#003580] py-12 sm:py-20 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-2">
            Keunggulan Kami
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Mengapa Harus{" "}
                <span className="text-[#FEBB02]">Memilih Kami?</span>
              </>
            )}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Keunggulan */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-2xl p-6 sm:p-7 flex flex-col items-start shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] flex items-center justify-center text-xl mb-4 shadow-sm font-bold">
                {pointIcons[idx % pointIcons.length]}
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};