// app/sitemap.ts
import type { MetadataRoute } from "next";
import { provinsiContent } from "@/data/provinsi-content";
import { getAllRegencyParams } from "@/lib/wilayah";

const SITE_URL = "https://kerabatweb.com";

// ============================================================
// WAJIB UNTUK STATIC EXPORT DI NEXT.JS 16
// Tambahkan KEDUA baris ini:
// ============================================================
export const dynamic = "force-static";
export const revalidate = false;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  // ... (sisa kode sitemap Anda tetap sama)
  
  const homepage: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
  ];

  const provinsiPages: MetadataRoute.Sitemap = Object.keys(
    provinsiContent
  ).map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const kabupatenPages: MetadataRoute.Sitemap = getAllRegencyParams().map(
    (p) => ({
      url: `${SITE_URL}/${p.provinsi}/${p.kabupaten}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    })
  );

  return [...homepage, ...provinsiPages, ...kabupatenPages];
}