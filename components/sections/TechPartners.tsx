"use client";

import React from "react";
import { motion } from "framer-motion";

const techStack = [
  { name: "Next.js", role: "App Router & SSR", icon: "▲" },
  { name: "TypeScript", role: "Type-Safe Code", icon: "TS" },
  { name: "Tailwind CSS", role: "Responsive Styling", icon: "CSS" },
  { name: "Cloudflare", role: "Edge Performance & SSL", icon: "CF" },
  { name: "Vercel", role: "Fast Deployment", icon: "⚡" },
  { name: "Python", role: "Automation & pSEO", icon: "PY" },
];

export const TechPartners: React.FC = () => {
  return (
    <section className="relative bg-black py-16 sm:py-24 border-b border-zinc-800 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-1.5 rounded-full mb-3">
            Standar Industri Global
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Dibangun dengan <span className="text-zinc-400">Teknologi Modern & Terbaik</span>
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto mb-12 leading-relaxed font-normal">
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
              className="bg-black border border-zinc-800 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center transition-all hover:border-zinc-700 group"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-zinc-900 border border-zinc-800 text-white flex items-center justify-center font-bold text-xs sm:text-sm mb-3 shadow-sm">
                {tech.icon}
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base group-hover:text-zinc-200 transition-colors">
                {tech.name}
              </h3>
              <span className="text-[10px] sm:text-xs text-zinc-400 mt-1 font-normal">{tech.role}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};