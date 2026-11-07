import React from "react";

const tahun = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="bg-booking-700 text-white/95 mt-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
        
        <div className="col-span-2 md:col-span-2">
          <a href="/" className="flex items-center gap-2.5 mb-3 group w-fit">
            <span className="w-8 h-8 sm:w-9 sm:h-9 grid place-items-center rounded-xl bg-white text-booking-700 shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 sm:w-5 sm:h-5 text-booking-700">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" className="fill-booking-50/50" />
                <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
                <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
                <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500" />
                <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" className="text-amber-500" />
              </svg>
            </span>
            <span className="font-bold text-base sm:text-lg text-white">
              Kerabatweb<span className="text-yellow-400">.com</span>
            </span>
          </a>
          <p className="text-[11px] sm:text-sm leading-relaxed max-w-sm text-white/80">
            Membantu bisnis Anda tampil profesional di internet dengan website cepat, modern, dan siap konversi.
          </p>
        </div>

        <div>
          <h4 className="text-white font-bold mb-2.5 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-wider text-yellow-400/90">Layanan</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-white/80">
            {["Landing Page", "Company Profile", "Toko Online", "Maintenance"].map((item, idx) => (
              <li key={idx}>
                <a href="#layanan" className="hover:text-yellow-400 transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-2.5 sm:mb-3 text-[11px] sm:text-xs uppercase tracking-wider text-yellow-400/90">Kontak</h4>
          <ul className="space-y-2 text-xs sm:text-sm text-white/80">
            <li>📧 halo@Kerabatweb.com</li>
            <li>📱 +62 859-3857-3419</li>
            <li>📍 Indonesia</li>
          </ul>
        </div>

      </div>

      <div className="border-t border-white/10 bg-booking-800/50">
        <p className="max-w-5xl mx-auto px-4 sm:px-6 py-4 text-[11px] text-white/60 text-center">
          © {tahun} <span className="text-yellow-400 font-semibold">Kerabatweb.com</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};