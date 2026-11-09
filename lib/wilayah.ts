// lib/wilayah.ts
import wilayahData from "@/data/wilayah_indonesia.json";

// ============================================================
// TIPE DATA
// ============================================================

export type District = {
  name: string;
  slug: string;
};

export type Regency = {
  name: string;
  slug: string;
  districts: District[];
};

export type Province = {
  name: string;
  slug: string;
  regencies: Regency[];
};

// ============================================================
// LOAD DATA
// ============================================================

const provinces = wilayahData as Province[];

// ============================================================
// QUERY PROVINSI
// ============================================================

/**
 * Ambil semua provinsi.
 */
export function getAllProvinces(): Province[] {
  return provinces;
}

/**
 * Cari provinsi berdasarkan slug.
 */
export function findProvince(slug: string): Province | undefined {
  return provinces.find((p) => p.slug === slug);
}

// ============================================================
// QUERY KABUPATEN / KOTA
// ============================================================

/**
 * Cari kabupaten/kota di dalam provinsi berdasarkan slug.
 * Return objek { province, regency } atau undefined kalau tidak ketemu.
 */
export function findRegency(
  provinsiSlug: string,
  kabupatenSlug: string
): { province: Province; regency: Regency } | undefined {
  const province = findProvince(provinsiSlug);
  if (!province) return undefined;

  const regency = province.regencies.find((r) => r.slug === kabupatenSlug);
  if (!regency) return undefined;

  return { province, regency };
}

/**
 * Ambil daftar kabupaten/kota dalam satu provinsi.
 */
export function getRegenciesOfProvince(provinsiSlug: string): Regency[] {
  const province = findProvince(provinsiSlug);
  return province ? province.regencies : [];
}

/**
 * Ambil semua kombinasi { provinsi, kabupaten } untuk generateStaticParams.
 * Hasil: array ~514 objek.
 */
export function getAllRegencyParams(): {
  provinsi: string;
  kabupaten: string;
}[] {
  const params: { provinsi: string; kabupaten: string }[] = [];
  for (const province of provinces) {
    for (const regency of province.regencies) {
      params.push({
        provinsi: province.slug,
        kabupaten: regency.slug,
      });
    }
  }
  return params;
}

// ============================================================
// QUERY KECAMATAN
// ============================================================

/**
 * Cari kecamatan di dalam kabupaten tertentu.
 */
export function findDistrict(
  provinsiSlug: string,
  kabupatenSlug: string,
  kecamatanSlug: string
): { province: Province; regency: Regency; district: District } | undefined {
  const result = findRegency(provinsiSlug, kabupatenSlug);
  if (!result) return undefined;

  const district = result.regency.districts.find(
    (d) => d.slug === kecamatanSlug
  );
  if (!district) return undefined;

  return { ...result, district };
}

/**
 * Ambil semua kombinasi { provinsi, kabupaten, kecamatan } untuk
 * generateStaticParams halaman kecamatan (kalau dibutuhkan).
 * Hasil: array ribuan objek.
 */
export function getAllDistrictParams(): {
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
}[] {
  const params: { provinsi: string; kabupaten: string; kecamatan: string }[] =
    [];
  for (const province of provinces) {
    for (const regency of province.regencies) {
      for (const district of regency.districts) {
        params.push({
          provinsi: province.slug,
          kabupaten: regency.slug,
          kecamatan: district.slug,
        });
      }
    }
  }
  return params;
}

// ============================================================
// STATISTIK (untuk debug / development)
// ============================================================

export function getStats() {
  let totalKabupaten = 0;
  let totalKecamatan = 0;

  for (const p of provinces) {
    totalKabupaten += p.regencies.length;
    for (const r of p.regencies) {
      totalKecamatan += r.districts.length;
    }
  }

  return {
    totalProvinsi: provinces.length,
    totalKabupaten,
    totalKecamatan,
  };
}