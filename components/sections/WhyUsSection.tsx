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

// Array ikon garis putih (SVG) minimalis bernuansa monokrom
const pointIcons = [
  // 01: Petir / Kilat
  <svg key="1" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  // 02: Perisai / Garansi
  <svg key="2" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>,
  // 03: Target / SEO & Konversi
  <svg key="3" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 6a4 4 0 100 8 4 4 0 000-8z" />
  </svg>,
  // 04: Berlian / Harga & Nilai
  <svg key="4" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 2L2 7l10 15L22 7l-10-5zM2 7h20M12 22V7" />
  </svg>,
];

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
    <section className="relative bg-black text-white py-16 sm:py-24 border-b border-zinc-800 overflow-hidden">

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-1.5 rounded-full mb-3">
            Keunggulan Kami
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ? (
              title
            ) : (
              <>
                Mengapa Harus{" "}
                <span className="text-zinc-400">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {finalPoints.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="bg-black border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col items-start transition-all hover:border-zinc-700 group"
            >
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-5 shadow-sm">
                {pointIcons[idx % pointIcons.length]}
              </div>
              <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-zinc-200 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};