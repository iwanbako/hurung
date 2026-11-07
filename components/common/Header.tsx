import React from "react";

const navLinks = [
  { href: "#layanan", label: "Layanan" },
  { href: "#harga", label: "Harga" },
  { href: "#kontak", label: "Kontak" },
];

const waNumber = "6285938573419";
const waDefault = `https://wa.me/${waNumber}?text=${encodeURIComponent("Halo KerabatWeb, saya ingin konsultasi pembuatan website.")}`;

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-40 bg-booking-700 text-white shadow-md">
      <nav className="max-w-5xl mx-auto px-4 h-14 sm:h-16 flex items-center justify-between gap-3">
        <a href="/" className="group flex items-center gap-2.5 shrink-0">
          <span className="w-9 h-9 grid place-items-center rounded-xl bg-white text-booking-700 shadow-md transition-transform duration-200 active:scale-95">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-booking-700">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" className="fill-booking-50/50" />
              <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
              <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
              <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-500" />
              <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" className="text-amber-500" />
            </svg>
          </span>
          <span className="font-bold text-base sm:text-lg tracking-tight text-white">
            Kerabat<span className="text-yellow-400">Web</span>
          </span>
        </a>

        <ul className="hidden md:flex items-center justify-center gap-6 lg:gap-8 text-sm font-medium text-white/90 flex-1">
          {navLinks.map((l, i) => (
            <li key={i}>
              <a href={l.href} className="py-1 hover:text-yellow-400 transition-colors duration-200">
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <a href={waDefault} target="_blank" rel="noopener noreferrer" className="bk-btn-yellow px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm shrink-0 shadow-md">
          Konsultasi Gratis
        </a>
      </nav>
    </header>
  );
};