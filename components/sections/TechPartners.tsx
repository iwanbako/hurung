// components/sections/TechPartners.tsx
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
    <section className="bg-[#003580] py-12 sm:py-16 border-b border-[#0066f5]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Badge Kuning Khas Booking.com */}
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1 rounded-full shadow-sm mb-3">
            Standar Industri Global
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
            Dibangun dengan <span className="text-[#FEBB02]">Teknologi Modern & Terbaik</span>
          </h2>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto mb-10 leading-relaxed">
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
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-xl p-4 sm:p-5 flex flex-col items-center justify-center shadow-md transition-all"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FEBB02] text-[#00224f] border border-[#FEBB02] flex items-center justify-center font-extrabold text-base sm:text-lg mb-2.5 shadow-sm">
                {tech.icon}
              </div>
              <h3 className="font-bold text-white text-sm sm:text-base">
                {tech.name}
              </h3>
              <span className="text-[10px] sm:text-xs text-blue-200 mt-0.5 font-medium">{tech.role}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};