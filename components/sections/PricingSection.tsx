"use client";

import React from "react";
import { PricingPackage } from "../../types";

interface Props {
  pricing: PricingPackage[];
  waNumber?: string;
  locationName?: string;
  note?: string;
}

export const PricingSection: React.FC<Props> = ({
  pricing,
  waNumber = "6285938573419",
  locationName,
  note,
}) => {
  // Helper untuk membuat link WhatsApp langsung di dalam Client Component
  const getWaLink = (msg: string) =>
    `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

  return (
    <section
      id="harga"
      className="relative bg-white border-y border-slate-200 py-16 sm:py-24 overflow-hidden"
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Paket Harga Transparan
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mt-1">
            Pilihan Paket{" "}
            <span className="text-red-600">
              Terbaik {locationName ? `di ${locationName}` : "Untuk Anda"}
            </span>
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            Investasi website profesional dengan fitur lengkap, performa tinggi, dan garansi keamanan penuh.
          </p>
        </div>

        {/* Grid Kartu Harga */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {pricing.map((p, idx) => {
            const isPopular = p.popular;

            return (
              <div
                key={idx}
                className={`rounded-3xl flex flex-col justify-between transition-all duration-300 relative overflow-hidden group hover:-translate-y-1 shadow-sm ${
                  isPopular
                    ? "bg-red-600 text-white border-2 border-red-700 ring-2 ring-red-600/20 lg:-translate-y-2 shadow-2xl"
                    : "bg-white text-slate-900 border border-slate-200 hover:border-red-500 shadow-sm"
                }`}
              >
                {/* Badge Terpopuler / Rekomendasi */}
                {p.badge && (
                  <div
                    className={`absolute top-0 right-0 text-[10px] sm:text-xs font-extrabold px-4 py-1.5 rounded-bl-2xl uppercase tracking-wider z-20 shadow-sm ${
                      isPopular
                        ? "bg-white text-red-600 border-b border-l border-red-200 font-black"
                        : "bg-red-600 text-white border-b border-l border-red-700"
                    }`}
                  >
                    {p.badge}
                  </div>
                )}

                <div>
                  {/* Header Kartu */}
                  <div
                    className={`p-6 sm:p-7 text-left relative border-b transition-colors ${
                      isPopular
                        ? "bg-red-700/50 border-red-500/50 text-white"
                        : "bg-slate-50/60 border-slate-200 text-slate-900 group-hover:border-red-100"
                    }`}
                  >
                    <h3
                      className={`text-xl sm:text-2xl font-extrabold mb-1.5 ${
                        isPopular ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {p.name}
                    </h3>
                    <p
                      className={`text-xs min-h-[32px] leading-relaxed mb-5 font-normal ${
                        isPopular ? "text-red-100" : "text-slate-600"
                      }`}
                    >
                      {p.target}
                    </p>

                    {/* Kotak Harga */}
                    <div
                      className={`p-3.5 rounded-2xl border shadow-sm ${
                        isPopular
                          ? "bg-red-700 border-red-500 text-white"
                          : "bg-white border-slate-200 text-slate-900"
                      }`}
                    >
                      {p.priceNormal && (
                        <span
                          className={`text-xs block font-mono mb-0.5 line-through ${
                            isPopular ? "text-red-200" : "text-slate-400"
                          }`}
                        >
                          {p.priceNormal}
                        </span>
                      )}
                      <div className="flex items-baseline gap-1.5 flex-wrap">
                        <span
                          className={`text-2xl sm:text-3xl font-extrabold ${
                            isPopular ? "text-white" : "text-slate-900"
                          }`}
                        >
                          {p.pricePromo}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <span
                          className={`text-[11px] font-semibold px-2 py-0.5 rounded-md border ${
                            isPopular
                              ? "bg-white/10 text-white border-white/20"
                              : "bg-red-50 text-red-700 border-red-200"
                          }`}
                        >
                          {p.diskon}
                        </span>
                        <span
                          className={`text-[10px] font-mono tracking-wider ${
                            isPopular ? "text-red-200" : "text-slate-500"
                          }`}
                        >
                          {p.periode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Daftar Fitur */}
                  <div
                    className={`p-5 sm:p-6 ${
                      isPopular ? "bg-red-600 text-white" : "bg-white text-slate-900"
                    }`}
                  >
                    <p
                      className={`text-xs font-bold uppercase tracking-wider mb-4 ${
                        isPopular ? "text-red-200" : "text-slate-500"
                      }`}
                    >
                      Layanan Meliputi:
                    </p>
                    <ul
                      className={`space-y-3 text-xs sm:text-sm ${
                        isPopular ? "text-red-50" : "text-slate-700"
                      }`}
                    >
                      {p.features.map((f, i) => (
                        <li
                          key={i}
                          className={`flex items-start gap-2.5 pb-2.5 border-b last:border-0 last:pb-0 ${
                            isPopular ? "border-red-500/50" : "border-slate-100"
                          }`}
                        >
                          <span
                            className={`w-4 h-4 rounded-full flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5 shadow-sm border ${
                              isPopular
                                ? "bg-white text-red-600 border-white"
                                : "bg-red-50 text-red-600 border-red-200"
                            }`}
                          >
                            ✓
                          </span>
                          <span className="flex-1 leading-snug font-normal">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tombol Aksi Bawah */}
                <div
                  className={`p-5 sm:p-6 border-t ${
                    isPopular
                      ? "bg-red-700/50 border-red-500/50"
                      : "bg-slate-50/50 border-slate-200 group-hover:border-red-100"
                  } transition-colors`}
                >
                  <a
                    href={getWaLink(
                      `Halo KerabatWeb, saya ingin memesan ${p.name} (${p.pricePromo})${
                        locationName ? ` untuk wilayah ${locationName}` : ""
                      }.`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`block text-center px-4 py-3.5 rounded-full font-semibold transition-all text-xs sm:text-sm shadow-sm active:scale-95 ${
                      isPopular
                        ? "bg-white hover:bg-red-50 text-red-600 font-bold shadow-md"
                        : "bg-white hover:bg-slate-100 text-slate-900 border border-slate-300"
                    }`}
                  >
                    Jadwalkan Konsultasi
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Catatan Bawah */}
        <p className="text-center text-xs text-slate-500 mt-10 font-normal">
          {note ??
            "* Harga belum termasuk PPN. Konsultasi gratis via WhatsApp untuk kebutuhan kustom fitur khusus."}
        </p>
      </div>
    </section>
  );
};