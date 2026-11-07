// components/sections/PortfolioSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

const portfolioItems = [
  {
    title: "Kopi Nusantara (Lonjakan Penjualan 40%)",
    desc: "Penggantian platform lama ke arsitektur modern menurunkan loading time dari 5s menjadi 0.8s.",
    tag: "E-Commerce / F&B",
    img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "Klinik Sehat Utama (PageSpeed 100)",
    desc: "Website medis profesional dengan integrasi form WhatsApp otomatis.",
    tag: "Company Profile",
    img: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "EduTech Academy (Lead Naik 3x Lipat)",
    desc: "Optimalisasi UI/UX conversion-focused memangkas bounce rate hingga di bawah 25%.",
    tag: "Landing Page",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
}

export const PortfolioSection: React.FC<Props> = ({ title, subtitle }) => {
  const finalTitle = title ?? "Hasil Nyata Klien Kami";
  const finalSubtitle =
    subtitle ??
    "Bukti performa dan efektivitas desain website kami dalam meningkatkan kredibilitas serta konversi bisnis.";

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
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm">
            Studi Kasus & Portofolio
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3">
            {title ? (
              title
            ) : (
              <>
                Hasil Nyata{" "}
                <span className="text-[#FEBB02]">Klien Kami</span>
              </>
            )}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Grid Portofolio dengan Animasi Framer Motion */}
        <div className="grid gap-6 md:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all"
            >
              <div className="overflow-hidden relative">
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#00224f] bg-[#FEBB02] px-2.5 py-1 rounded-md tracking-wide uppercase inline-block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};