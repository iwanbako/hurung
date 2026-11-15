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
            Cara Kerja Sederhana
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ?? (
              <>
                4 Langkah Mudah{" "}
                <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                  Punya Website
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
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
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-[0_15px_30px_rgba(0,0,0,0.8)] transition-all relative group hover:border-pink-500/50 hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)]"
            >
              <div>
                {/* Nomor Urut & Ikon */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 flex items-center justify-center text-lg shadow-lg shadow-pink-500/20 font-bold">
                    {item.icon}
                  </div>
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-pink-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
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