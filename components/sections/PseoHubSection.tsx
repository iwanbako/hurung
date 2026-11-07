import React from "react";

interface RegionalItem {
  name: string;
  slug: string;
}

interface Props {
  regions: RegionalItem[];
  parentSlug?: string;
  waLink: (msg: string) => string;
}

export const PseoHubSection: React.FC<Props> = ({ regions, parentSlug, waLink }) => {
  return (
    <section class="bg-booking-700 text-white border-y border-white/10 py-14 sm:py-20">
      <div class="max-w-6xl mx-auto px-4 sm:px-6">
        <div class="text-center mb-10 sm:mb-12">
          <span class="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-yellow-400 text-booking-900 px-3 py-1 rounded-full shadow-xs">
            pSEO Hub & Jaringan Regional
          </span>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold mt-3 tracking-tight">
            Jangkauan Layanan Jasa Pembuatan Website
          </h2>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 mb-10">
          {regions.map((p, idx) => (
            <a
              key={idx}
              href={parentSlug ? `/${parentSlug}/${p.slug}` : `/${p.slug}`}
              class="group px-4 py-3.5 rounded-xl bg-white/10 border border-white/15 text-xs sm:text-sm text-white font-medium hover:bg-white hover:text-booking-900 hover:border-white transition-all duration-200 flex items-center justify-between shadow-sm"
            >
              <span class="truncate pr-2">{p.name}</span>
              <span class="text-yellow-400 group-hover:text-booking-700 font-bold text-base transition-transform group-hover:translate-x-0.5">&rarr;</span>
            </a>
          ))}
        </div>

        <div class="bg-booking-800/80 border border-white/15 rounded-2xl p-6 sm:p-8 text-center backdrop-blur shadow-xl">
          <p class="text-xs sm:text-sm text-white/90 mb-4 font-medium">Mencari cakupan area tingkat Kabupaten / Kota atau kecamatan spesifik?</p>
          <a
            href={waLink("Halo KerabatWeb, saya ingin menanyakan ketersediaan layanan pSEO untuk wilayah spesifik saya.")}
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-yellow-400 text-booking-900 font-extrabold text-xs sm:text-sm hover:bg-yellow-300 transition-all shadow-md active:scale-95"
          >
            <span>🔍 Konsultasikan Wilayah Anda</span>
          </a>
        </div>
      </div>
    </section>
  );
};