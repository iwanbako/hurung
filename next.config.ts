// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ============================================================
  // STATIC EXPORT (wajib untuk Cloudflare Pages preset "Static HTML Export")
  // Menghasilkan folder `out/` saat build
  // ============================================================
  output: "export",

  // ============================================================
  // IMAGE OPTIMIZATION
  // Static export tidak mendukung next/image bawaan optimizer.
  // Nonaktifkan optimization untuk menghindari error build.
  // ============================================================
  images: {
    unoptimized: true,
  },

  // ============================================================
  // TRAILING SLASH
  // Static hosting (Cloudflare Pages) butuh trailing slash
  // untuk konsistensi routing (/aceh/ bukan /aceh)
  // ============================================================
  trailingSlash: true,

  // ============================================================
  // EXPERIMENTAL
  // ============================================================
  experimental: {
    agentFeedback: true,
  },

  // ============================================================
  // PENTING: JANGAN aktifkan fitur berikut saat `output: "export"`
  // - cacheComponents   → butuh PPR (tidak support static export)
  // - partialPrefetching → butuh server runtime
  // ============================================================
  // cacheComponents: true,      ← DISABLED
  // partialPrefetching: true,   ← DISABLED

  // ============================================================
  // TURBOPACK
  // Loader Tailwind untuk Turbopack
  // ============================================================
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;