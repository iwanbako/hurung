// components/sections/ServicesSection.tsx
"use client";

import React from "react";
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
      className="bg-[#003580] text-white border-y border-[#0066f5] py-12 sm:py-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[11px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm">
            Layanan Kami
          </span>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mt-2 sm:mt-3">
            {finalTitle}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Layanan dengan Animasi Framer Motion */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {defaultServices.map((s, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl p-5 sm:p-6 flex flex-col bg-[#00224f] border-2 border-[#0066f5] shadow-lg transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] grid place-items-center text-lg sm:text-xl mb-3 sm:mb-4 shadow-sm font-bold">
                {s.icon}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-white">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-blue-100 leading-relaxed flex-1">
                {s.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};