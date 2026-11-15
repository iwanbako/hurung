"use client";

import React from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", role: "App Router & SSR", icon: "▲" },
  { name: "TypeScript", role: "Type-Safe Code", icon: "TS" },
  { name: "Tailwind CSS", role: "Responsive Styling", icon: "🎨" },
  { name: "Cloudflare", role: "Edge Performance & SSL", icon: "☁️" },
  { name: "Vercel", role: "Fast Deployment", icon: "⚡" },
  { name: "Python", role: "Automation & pSEO", icon: "🐍" },
];

export const TechPartners: React.FC = () => {
  return (
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Standar Industri Global
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Dibangun dengan <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">Teknologi Modern & Terbaik</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed">
            Kami memastikan setiap website memiliki performa super cepat, aman dari serangan siber, dan ramah mesin pencari Google.
          </p>
        </motion.div>

        {/* Grid Tech Stack Minimalis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.8)] transition-all hover:border-pink-500/50 hover:shadow-[0_15px_35px_rgba(236,72,153,0.15)] group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-tr from-violet-600 via-pink-600 to-amber-500 text-white border border-white/10 flex items-center justify-center font-extrabold text-base sm:text-lg mb-3 shadow-lg shadow-pink-500/20">
                {tech.icon}
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-pink-300 transition-colors">
                {tech.name}
              </h3>
              <span className="text-[10px] sm:text-xs text-zinc-400 mt-1 font-medium">{tech.role}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};