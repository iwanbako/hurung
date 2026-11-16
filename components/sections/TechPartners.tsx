import React from "react";

interface TechStackItem {
  name: string;
  role: string;
  icon: string;
}

const techStack: TechStackItem[] = [
  { name: "Next.js", role: "App Router & SSR", icon: "▲" },
  { name: "TypeScript", role: "Type-Safe Code", icon: "TS" },
  { name: "Tailwind CSS", role: "Responsive Styling", icon: "CSS" },
  { name: "Cloudflare", role: "Edge Performance & SSL", icon: "CF" },
  { name: "Vercel", role: "Fast Deployment", icon: "⚡" },
  { name: "Python", role: "Automation & pSEO", icon: "PY" },
];

export const TechPartners: React.FC = () => {
  return (
    <section className="relative bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center">
        
        {/* Header Section */}
        <div>
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Standar Industri Global
          </span>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Dibangun dengan <span className="text-red-600">Teknologi Modern & Terbaik</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto mb-12 leading-relaxed font-normal">
            Kami memastikan setiap website memiliki performa super cepat, aman dari serangan siber, dan ramah mesin pencari Google.
          </p>
        </div>

        {/* Grid Tech Stack Minimalis */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {techStack.map((tech, idx) => (
            <div 
              key={idx}
              className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center transition-all duration-200 hover:border-red-500 hover:bg-red-50/20 hover:-translate-y-1 group shadow-sm"
            >
              {/* Ikon langsung "nyala" (bg merah solid, teks putih) */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-600 border border-red-700 text-white flex items-center justify-center font-bold text-xs sm:text-sm mb-3 shadow-sm shadow-red-600/20">
                {tech.icon}
              </div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base group-hover:text-red-600 transition-colors">
                {tech.name}
              </h3>
              <span className="text-[10px] sm:text-xs text-slate-500 mt-1 font-normal">{tech.role}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};