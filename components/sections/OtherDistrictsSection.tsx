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
    <section className="relative py-16 px-4 bg-[#030303] text-zinc-100 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-extrabold text-center mb-3 text-white">
          Kecamatan Lain di {kabupatenName}
        </h2>
        <p className="text-center text-zinc-400 mb-8 max-w-2xl mx-auto text-xs sm:text-sm leading-relaxed">
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
              className="px-4 py-2 rounded-xl bg-[#0a0a0a] border border-zinc-800 hover:border-pink-500/50 hover:bg-zinc-900 text-zinc-300 hover:text-white text-xs sm:text-sm font-medium transition-all hover:shadow-[0_0_15px_rgba(236,72,153,0.15)] whitespace-nowrap"
              title={`Jasa Pembuatan Website ${d.name}`}
            >
              {d.name}
            </Link>
          ))}
        </div>

        {/* Info total */}
        <p className="text-center text-zinc-500 text-xs mt-8">
          Menampilkan {others.length} kecamatan di {kabupatenName}
        </p>
      </div>
    </section>
  );
}