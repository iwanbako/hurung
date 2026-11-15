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
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Keunggulan Kami
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Mengapa Harus{" "}
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Memilih Kami?
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
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
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col items-start shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 flex items-center justify-center text-xl mb-5 shadow-lg shadow-pink-500/20 font-bold">
                {pointIcons[idx % pointIcons.length]}
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-pink-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};