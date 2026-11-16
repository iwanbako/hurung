import React from "react";

type District = {
  name: string;
  slug: string;
};

type Props = {
  provinsiSlug: string;
  kabupatenSlug: string;
  kabupatenName: string;
  currentKecamatanSlug: string;
  districts: District[];
};

export function OtherDistrictsSection({
  provinsiSlug,
  kabupatenSlug,
  kabupatenName,
  currentKecamatanSlug,
  districts,
}: Props) {
  // Kecualikan kecamatan yang sedang dibuka
  const others = districts.filter((d) => d.slug !== currentKecamatanSlug);

  // Kalau tidak ada kecamatan lain, jangan render section
  if (others.length === 0) return null;

  return (
    <section className="relative py-16 px-4 bg-white text-slate-900 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-slate-900 tracking-tight">
          Kecamatan Lain di {kabupatenName}
        </h2>
        <p className="text-center text-slate-600 mb-8 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-normal">
          Kami juga melayani jasa pembuatan website di seluruh kecamatan
          berikut di {kabupatenName}. Klik kecamatan Anda untuk melihat
          detail layanan.
        </p>

        {/* Grid link kecamatan menggunakan tag a */}
        <div className="flex flex-wrap justify-center gap-2">
          {others.map((d) => (
            <a
              key={d.slug}
              href={`/${provinsiSlug}/${kabupatenSlug}/${d.slug}`}
              className="px-4 py-2 rounded-xl bg-white border border-slate-200 hover:border-red-500 hover:bg-red-50 text-slate-700 hover:text-red-700 text-xs sm:text-sm font-medium transition-all whitespace-nowrap shadow-sm"
              title={`Jasa Pembuatan Website ${d.name}`}
            >
              {d.name}
            </a>
          ))}
        </div>

        {/* Info total */}
        <p className="text-center text-slate-500 text-xs mt-8 font-normal">
          Menampilkan {others.length} kecamatan di {kabupatenName}
        </p>
      </div>
    </section>
  );
}