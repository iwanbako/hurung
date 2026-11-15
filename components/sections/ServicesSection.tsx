"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const defaultServices = [
  {
    icon: "🚀",
    title: "Landing Page",
    desc: "Halaman fokus konversi untuk campaign, produk, atau jasa Anda.",
  },
  {
    icon: "🏢",
    title: "Company Profile",
    desc: "Profil perusahaan kredibel yang membangun kepercayaan klien.",
  },
  {
    icon: "🛒",
    title: "E-Commerce",
    desc: "Toko online siap jualan dengan pembayaran & inventori.",
  },
  {
    icon: "⚙️",
    title: "Web App & CMS",
    desc: "Aplikasi web custom sesuai alur bisnis Anda.",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
  locationName?: string;
}

export const ServicesSection: React.FC<Props> = ({
  title,
  subtitle,
  locationName,
}) => {
  // State untuk memastikan komponen sudah ter-mount di client (mencegah hydration mismatch)
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Default judul mengikuti locationName (kompatibel dengan pemakaian lama)
  const finalTitle =
    title ??
    `Apa yang Bisa Kami Bantu${locationName ? ` di ${locationName}` : ""}?`;

  const finalSubtitle =
    subtitle ??
    "Solusi website sesuai kebutuhan bisnis Anda, dari landing page sampai web app custom.";

  return (
    <section
      id="layanan"
      className="relative bg-[#030303] text-white border-y border-zinc-800/80 py-16 sm:py-24 overflow-hidden"
    >
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={isMounted ? { opacity: 0, y: 20 } : false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Layanan Kami
          </span>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mt-2 sm:mt-3 tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Layanan dengan Animasi Framer Motion */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {defaultServices.map((s, idx) => (
            <motion.div
              key={idx}
              initial={isMounted ? { opacity: 0, y: 30 } : false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl p-6 sm:p-7 flex flex-col bg-[#0a0a0a] border border-zinc-800 shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 grid place-items-center text-lg sm:text-xl mb-4 shadow-lg shadow-pink-500/20 font-bold">
                {s.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-white group-hover:text-pink-300 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};