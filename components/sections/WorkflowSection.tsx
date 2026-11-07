// components/sections/WorkflowSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
  icon: string;
}

const defaultSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Konsultasi & Pilih Paket",
    desc: "Diskusikan kebutuhan bisnis Anda via WhatsApp dan pilih paket website yang paling sesuai.",
    icon: "💬",
  },
  {
    step: "02",
    title: "Pengiriman Materi & Data",
    desc: "Kirimkan logo, profil bisnis, foto produk, atau materi teks yang ingin ditampilkan di website.",
    icon: "📁",
  },
  {
    step: "03",
    title: "Proses Pengerjaan",
    desc: "Tim kami langsung merancang dan membangun website Anda dengan performa tinggi & SEO-friendly.",
    icon: "⚡",
  },
  {
    step: "04",
    title: "Review & Website Online",
    desc: "Anda cek hasil akhirnya, lakukan revisi jika diperlukan, dan website resmi siap mendatangkan cuan!",
    icon: "🚀",
  },
];

interface Props {
  title?: string;
  subtitle?: string;
  steps?: WorkflowStep[];
}

export const WorkflowSection: React.FC<Props> = ({
  title,
  subtitle,
  steps,
}) => {
  const finalSteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="bg-[#003580] py-12 sm:py-20 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section dengan Animasi */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm mb-2">
            Cara Kerja Sederhana
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ?? (
              <>
                4 Langkah Mudah{" "}
                <span className="text-[#FEBB02]">Punya Website</span>
              </>
            )}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {subtitle ??
              "Proses cepat, transparan, dan tidak ribet. Kami dampingi dari nol sampai website Anda online."}
          </p>
        </motion.div>

        {/* Grid Alur Kerja */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {finalSteps.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-lg transition-all relative"
            >
              <div>
                {/* Nomor Urut & Ikon */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] flex items-center justify-center text-lg shadow-sm font-bold">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};