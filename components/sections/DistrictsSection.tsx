import React from "react";
import Link from "next/link";

type District = { name: string; slug: string };

interface Props {
  title?: string;
  subtitle?: string;
  provinsi?: string;
  provinsiSlug?: string;
  kabupaten?: string;
  kabupatenSlug?: string;
  districts?: (string | District)[];
}

// Ambil slug dari item (string -> slugify, object -> .slug)
const getSlug = (item: string | District): string => {
  if (typeof item === "string") {
    return item
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }
  return item.slug;
};

// Ambil nama dari item
const getName = (item: string | District): string => {
  return typeof item === "string" ? item : item.name;
};

export const DistrictsSection: React.FC<Props> = ({
  title,
  subtitle,
  provinsi,
  provinsiSlug,
  kabupaten,
  kabupatenSlug,
  districts = [],
}) => {
  if (districts.length === 0) return null;

  const finalTitle =
    title ?? `Kecamatan yang Kami Layani di ${kabupaten ?? "Wilayah Ini"}`;
  const finalSubtitle =
    subtitle ??
    `Melayani seluruh ${districts.length} kecamatan${
      kabupaten ? ` di ${kabupaten}` : ""
    }${provinsi ? `, ${provinsi}` : ""} — klik kecamatan Anda untuk melihat detail layanan.`;

  // Apakah link bisa dibuat? Harus ada slug provinsi & kabupaten
  const canLink = !!(provinsiSlug && kabupatenSlug);

  return (
    <section className="relative bg-white py-12 sm:py-16 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header Compact */}
        <div className="text-center mb-6 sm:mb-8">
          <span className="inline-block text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-3.5 py-1 rounded-full mb-3 shadow-sm">
            Cakupan Layanan
          </span>

          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
            {finalTitle}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {finalSubtitle}
          </p>
        </div>

        {/* Grid Kecil & Padat — tiap item bisa diklik */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
          {districts.map((district, idx) => {
            const name = getName(district);
            const slug = getSlug(district);
            const href =
              canLink && slug
                ? `/${provinsiSlug}/${kabupatenSlug}/${slug}`
                : undefined;

            const chipClass =
              "bg-white border border-slate-200 rounded-lg px-2.5 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-xs text-slate-700 font-medium leading-none hover:border-red-300 hover:bg-red-50 hover:text-red-700 transition-all whitespace-nowrap inline-block shadow-sm";

            return (
              <span
                key={`${slug || name}-${idx}`}
                className="inline-block"
              >
                {href ? (
                  <Link
                    href={href}
                    className={chipClass}
                    title={`Jasa Pembuatan Website ${name}`}
                  >
                    {name}
                  </Link>
                ) : (
                  <span className={chipClass}>{name}</span>
                )}
              </span>
            );
          })}
        </div>

        {/* Footer Minimal */}
        <p className="text-center text-xs text-slate-500 mt-6 max-w-xl mx-auto font-normal">
          Tidak menemukan kecamatan Anda?{" "}
          <span className="text-slate-900 font-semibold">
            Tetap bisa konsultasi gratis
          </span>{" "}
          — melayani seluruh Indonesia.
        </p>
      </div>
    </section>
  );
};