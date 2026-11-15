import Link from "next/link";

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
    <section className="relative py-16 px-4 bg-black text-white border-b border-zinc-800 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-white tracking-tight">
          Kecamatan Lain di {kabupatenName}
        </h2>
        <p className="text-center text-zinc-400 mb-8 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed font-normal">
          Kami juga melayani jasa pembuatan website di seluruh kecamatan
          berikut di {kabupatenName}. Klik kecamatan Anda untuk melihat
          detail layanan.
        </p>

        {/* Grid link kecamatan */}
        <div className="flex flex-wrap justify-center gap-2">
          {others.map((d) => (
            <Link
              key={d.slug}
              href={`/${provinsiSlug}/${kabupatenSlug}/${d.slug}`}
              className="px-4 py-2 rounded-xl bg-black border border-zinc-800 hover:border-zinc-700 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all whitespace-nowrap"
              title={`Jasa Pembuatan Website ${d.name}`}
            >
              {d.name}
            </Link>
          ))}
        </div>

        {/* Info total */}
        <p className="text-center text-zinc-500 text-xs mt-8 font-normal">
          Menampilkan {others.length} kecamatan di {kabupatenName}
        </p>
      </div>
    </section>
  );
}