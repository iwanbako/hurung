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
  // Banyak static hosting (termasuk Cloudflare Pages) lebih suka
  // URL dengan trailing slash untuk konsistensi routing.
  // ============================================================
  trailingSlash: true,

  // ============================================================
  // EXPERIMENTAL
  // ============================================================
  experimental: {
    agentFeedback: true,
  },

  // ============================================================
  // CACHE COMPONENTS & PARTIAL PREFETCHING
  // Fitur Next.js 16, tetap boleh aktif untuk build time optimization
  // ============================================================
  cacheComponents: true,
  partialPrefetching: true,

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