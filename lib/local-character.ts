// lib/local-character.ts
import localCharData from "@/data/local-character.json";
import type { LocalCharacter } from "./wilayah-content";

interface ProvinceEntry {
  provinsi?: LocalCharacter;
  [kabupatenSlug: string]: LocalCharacter | undefined;
}

const localChar = localCharData as Record<string, ProvinceEntry>;

/**
 * Ambil karakter lokal untuk kabupaten tertentu.
 * Prioritas: kabupaten ? provinsi ? kosong.
 */
export function getLocalCharacter(
  provinsiSlug: string,
  kabupatenSlug: string
): LocalCharacter {
  const provinceEntry = localChar[provinsiSlug];
  if (!provinceEntry) return {};

  const provinsiDefault = provinceEntry.provinsi;
  const kabupatenOverride = provinceEntry[kabupatenSlug];

  return {
    ...provinsiDefault,
    ...kabupatenOverride,
  };
}

/**
 * Cek apakah kabupaten punya override di kamus.
 */
export function hasKabupatenOverride(
  provinsiSlug: string,
  kabupatenSlug: string
): boolean {
  const provinceEntry = localChar[provinsiSlug];
  return Boolean(provinceEntry?.[kabupatenSlug]);
}