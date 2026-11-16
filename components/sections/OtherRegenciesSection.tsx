import React from "react";

interface Regency {
  name: string;
  slug: string;
}

interface Props {
  provinsiName: string;
  provinsiSlug: string;
  currentKabupatenSlug: string;
  regencies: Regency[];
  limit?: number; // default 5
}

export const OtherRegenciesSection: React.FC<Props> = ({
  provinsiName,
  provinsiSlug,
  currentKabupatenSlug,
  regencies,
  limit = 5,
}) => {
  // Filter: buang kabupaten saat ini, TANPA sort (urutan sesuai JSON)
  const otherRegencies = regencies.filter(
    (r) => r.slug !== currentKabupatenSlug
  );

  if (otherRegencies.length === 0) return null;

  const displayed = otherRegencies.slice(0, limit);

  return (
    <section className="relative bg-white py-12 sm:py-16 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-6 sm:mb-8 flex items-center justify-between flex-wrap gap-3">
          <div>
            <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-3 py-1 rounded-full mb-2 shadow-sm">
              Wilayah Lain di {provinsiName}
            </span>
            <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 leading-tight tracking-tight">
              Jasa Website Profesional di{" "}
              <span className="text-red-600">
                {provinsiName}
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-normal">
              Beberapa kabupaten/kota lain di {provinsiName} yang kami layani.
            </p>
          </div>

          <a
            href={`/${provinsiSlug}`}
            className="text-xs sm:text-sm font-semibold text-red-600 hover:text-red-700 hover:underline transition-all whitespace-nowrap"
          >
            Lihat Semua {otherRegencies.length} Wilayah →
          </a>
        </div>

        {/* Grid Kartu Kabupaten Lain */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5 sm:gap-3">
          {displayed.map((regency) => (
            <a
              key={regency.slug}
              href={`/${provinsiSlug}/${regency.slug}`}
              className="group flex items-center gap-2.5 bg-white border border-slate-200 border-l-4 border-l-red-600 hover:border-red-500 rounded-xl px-3 py-2.5 hover:bg-red-50/50 transition-all duration-200 h-full shadow-sm"
            >
              <span className="text-red-600 text-xs group-hover:translate-x-0.5 transition-transform shrink-0 font-bold">
                ▸
              </span>
              <span className="text-[11px] sm:text-xs text-slate-700 group-hover:text-red-700 font-medium leading-tight line-clamp-2 transition-colors">
                {regency.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};