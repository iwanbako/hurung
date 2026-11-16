import React from "react";
import Link from "next/link";

interface Provinsi {
  nama: string;
  slug: string;
}

interface Props {
  provinsiList: Provinsi[];
}

export const AllProvincesSection: React.FC<Props> = ({ provinsiList }) => {
  if (!provinsiList || provinsiList.length === 0) return null;

  return (
    <section className="relative bg-white py-12 sm:py-16 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Compact */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-3.5 py-1 rounded-full mb-3 shadow-sm">
            Cakupan Layanan
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Melayani Seluruh Provinsi di Indonesia
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {provinsiList.length} provinsi — semua terlayani 100% online tanpa
            biaya tambahan.
          </p>
        </div>

        {/* Chip Kecil Semua Provinsi */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {provinsiList.map((prov) => (
            <Link
              key={prov.slug}
              href={`/${prov.slug}`}
              className="inline-block bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-slate-700 font-medium leading-none hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all whitespace-nowrap shadow-sm"
            >
              {prov.nama}
            </Link>
          ))}
        </div>

        {/* Footer Minimal */}
        <p className="text-center text-xs text-slate-500 mt-6 max-w-xl mx-auto font-normal">
          Tidak menemukan provinsi Anda?{" "}
          <span className="text-slate-900 font-semibold">
            Tetap bisa konsultasi gratis
          </span>{" "}
          — melayani seluruh Indonesia.
        </p>
      </div>
    </section>
  );
};