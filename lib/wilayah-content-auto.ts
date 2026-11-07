// lib/wilayah-content-auto.ts
import type { District, Province, Regency } from "./wilayah";
import type { LocalCharacter } from "./wilayah-content";

/**
 * Generate karakter lokal otomatis untuk kota yang belum ada di kamus.
 * Menggunakan nama wilayah, provinsi, dan kecamatan untuk membuat
 * konten yang tetap unik tanpa perlu isi manual.
 */
export function generateAutoCharacter(
  province: Province,
  regency: Regency,
  existingLocal: LocalCharacter = {}
): LocalCharacter {
  // Kalau kamus sudah lengkap, tidak perlu generate
  if (
    existingLocal.ikon &&
    existingLocal.industri?.length &&
    existingLocal.destinasi?.length
  ) {
    return existingLocal;
  }

  const nama = regency.name.replace(/^(Kota|Kabupaten)\s+/i, "").trim();
  const isKota = /^Kota\s+/i.test(regency.name);

  // Ambil 3 kecamatan pertama sebagai "ikon" berbasis wilayah
  const sampleDistricts = regency.districts
    .slice(0, 3)
    .map((d) => d.name);

  // Industri default per jenis wilayah
  const industriDefault = isKota
    ? ["kuliner", "perdagangan", "jasa", "startup"]
    : ["pertanian", "perkebunan", "UMKM", "perdagangan"];

  // Generate ikon dari nama wilayah (kalau belum ada)
  const ikon =
    existingLocal.ikon ??
    (isKota
      ? `Kota ${nama} dengan Segudang Potensi`
      : `${nama} dengan Potensi Agraris dan UMKM`);

  // Generate industri kalau belum ada
  const industri =
    existingLocal.industri && existingLocal.industri.length > 0
      ? existingLocal.industri
      : industriDefault;

  // Generate budaya kalau belum ada
  const budaya =
    existingLocal.budaya ??
    `Budaya ${nama} dan ${province.name} yang kaya tradisi`;

  // Generate destinasi berdasarkan kecamatan (kalau belum ada)
  const destinasi =
    existingLocal.destinasi && existingLocal.destinasi.length > 0
      ? existingLocal.destinasi
      : sampleDistricts.map((d) => `Kecamatan ${d}`);

  return {
    ikon,
    industri,
    budaya,
    destinasi,
  };
}