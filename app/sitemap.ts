// app/sitemap.ts
import type { MetadataRoute } from "next";
import { provinsiContent } from "@/data/provinsi-content";
import { getAllRegencyParams } from "@/lib/wilayah";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// WAJIB UNTUK STATIC EXPORT (output: "export")
// Beri tahu Next.js bahwa route ini statis saat build
// ============================================================
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ============================================================
  // 1. HOMEPAGE (priority tertinggi)
  // ============================================================
  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  // ============================================================
  // 2. HALAMAN PROVINSI (38 halaman)
  // ============================================================
  const provinsiPages: MetadataRoute.Sitemap = Object.keys(
    provinsiContent
  ).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // ============================================================
  // 3. HALAMAN KABUPATEN/KOTA (514 halaman)
  // ============================================================
  const kabupatenPages: MetadataRoute.Sitemap = getAllRegencyParams().map(
    (p) => ({
      url: `${SITE_URL}/${p.provinsi}/${p.kabupaten}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  // ============================================================
  // GABUNG SEMUA
  // ============================================================
  return [...homepage, ...provinsiPages, ...kabupatenPages];
}