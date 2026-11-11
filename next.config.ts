import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
    // remotePatterns tidak diperlukan saat unoptimized: true
  },
  trailingSlash: true,
  experimental: {
    agentFeedback: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  // CATATAN: redirects() tidak didukung di output: "export".
  // Redirect /index.html ke / ditangani oleh:
  //   - Netlify/Cloudflare Pages : public/_redirects
  //   - Vercel                   : vercel.json
  //   - Apache/cPanel            : .htaccess di folder out/
};

export default nextConfig;