// components/sections/OtherDistrictsSection.tsx
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
    <section className="py-16 px-4 bg-white text-[#003580]">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
          Kecamatan Lain di {kabupatenName}
        </h2>
        <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
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
              className="px-4 py-2 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 text-sm font-medium transition-colors"
              title={`Jasa Pembuatan Website ${d.name}`}
            >
              {d.name}
            </Link>
          ))}
        </div>

        {/* Info total */}
        <p className="text-center text-gray-400 text-xs mt-8">
          Menampilkan {others.length} kecamatan di {kabupatenName}
        </p>
      </div>
    </section>
  );
}