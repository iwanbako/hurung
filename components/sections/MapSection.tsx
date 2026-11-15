"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { provinsiContent } from "@/data/provinsi-content";
import { getRegenciesOfProvince } from "@/lib/wilayah";

interface Props {
  provinsi?: string;
  kabupaten?: string;
  kecamatan?: string;
  title?: string;
  subtitle?: string;
  height?: number;
}

const DUMMY_KECAMATAN = [
  "Sukamaju", "Cilandak", "Menteng", "Coblong", "Kebayoran", "Sumbersari",
  "Sukajadi", "Banjarsari", "Tebet", "Gubeng", "Denpasar Barat", "Medan Baru",
];

const getSafeName = (item: any) => {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.name || item.nama || "";
};

const getDeterministicIndex = (seed: string, length: number) => {
  if (length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
};

type MapLevel = "indonesia" | "provinsi" | "kabupaten" | "kecamatan";

export const MapSection: React.FC<Props> = ({
  provinsi,
  kabupaten,
  kecamatan,
  title,
  subtitle,
  height = 380,
}) => {
  const pathname = usePathname();

  const { mapQuery, mapZoom, displayArea, mapLabel, level } = useMemo(() => {
    // ==========================================================
    // 1. Jika parent override manual
    // ==========================================================
    if (provinsi) {
      let lvl: MapLevel = "provinsi";
      if (kecamatan && kabupaten) lvl = "kecamatan";
      else if (kabupaten) lvl = "kabupaten";

      const query =
        lvl === "kecamatan"
          ? `${kecamatan}, ${kabupaten}, ${provinsi}, Indonesia`
          : lvl === "kabupaten"
          ? `${kabupaten}, ${provinsi}, Indonesia`
          : `${provinsi}, Indonesia`;

      const zoom =
        lvl === "kecamatan" ? 13 : lvl === "kabupaten" ? 10 : 7;

      return {
        mapQuery: query,
        mapZoom: zoom,
        displayArea: [kecamatan, kabupaten, provinsi].filter(Boolean).join(", "),
        mapLabel: query,
        level: lvl,
      };
    }

    // ==========================================================
    // 2. Homepage = Indonesia
    // ==========================================================
    if (pathname === "/" || pathname === "") {
      return {
        mapQuery: "Indonesia",
        mapZoom: 4,
        displayArea: "Seluruh Indonesia",
        mapLabel: "Indonesia",
        level: "indonesia" as MapLevel,
      };
    }

    // ==========================================================
    // 3. Halaman lain = parsing slug
    // ==========================================================
    let namaProvinsi = "";
    let namaKabupaten = "";
    let namaKecamatan = "";

    const segments = pathname.split("/").filter(Boolean);
    const provinsiSlug = segments[0];
    const kabupatenSlug = segments[1];
    const kecamatanSlug = segments[2];

    const isProvinsiValid = provinsiSlug && provinsiContent[provinsiSlug];

    if (isProvinsiValid) {
      const provData = provinsiContent[provinsiSlug];
      namaProvinsi = provData.nama;
      const regencies = getRegenciesOfProvince(provinsiSlug);

      if (kabupatenSlug && regencies.length > 0) {
        const kabData = regencies.find((r) => r.slug === kabupatenSlug);
        if (kabData) {
          namaKabupaten = getSafeName(kabData);

          const districts = (kabData as any).districts || [];

          // ============================================================
          // PRIORITAS 1: URL kecamatan -> cari slug dulu (bukan name)
          // ============================================================
          if (kecamatanSlug && districts.length > 0) {
            const found = districts.find(
              (d: any) => d.slug === kecamatanSlug
            );
            if (found) {
              namaKecamatan = getSafeName(found);
            }
          }

          // PRIORITAS 2: fallback acak
          if (!namaKecamatan) {
            if (districts.length > 0) {
              const idx = getDeterministicIndex(pathname, districts.length);
              namaKecamatan = getSafeName(districts[idx]);
            } else {
              const idx = getDeterministicIndex(
                pathname,
                DUMMY_KECAMATAN.length
              );
              namaKecamatan = DUMMY_KECAMATAN[idx];
            }
          }
        }
      }

      if (!namaKabupaten && regencies.length > 0) {
        const idx = getDeterministicIndex(pathname, regencies.length);
        namaKabupaten = getSafeName(regencies[idx]);
        const distIdx = getDeterministicIndex(pathname, DUMMY_KECAMATAN.length);
        namaKecamatan = DUMMY_KECAMATAN[distIdx];
      }
    }

    // Fallback jika URL tidak valid
    if (!namaProvinsi || !namaKabupaten) {
      const allProvinceSlugs = Object.keys(provinsiContent);
      const provIdx = getDeterministicIndex(pathname, allProvinceSlugs.length);
      const randomProvSlug = allProvinceSlugs[provIdx];
      namaProvinsi = provinsiContent[randomProvSlug].nama;

      const regencies = getRegenciesOfProvince(randomProvSlug);
      if (regencies.length > 0) {
        const kabIdx = getDeterministicIndex(pathname, regencies.length);
        const randomKabItem = regencies[kabIdx];
        namaKabupaten = getSafeName(randomKabItem);

        const districts = (randomKabItem as any).districts || [];
        if (districts.length > 0) {
          const distIdx = getDeterministicIndex(pathname, districts.length);
          namaKecamatan = getSafeName(districts[distIdx]);
        } else {
          const distIdx = getDeterministicIndex(
            pathname,
            DUMMY_KECAMATAN.length
          );
          namaKecamatan = DUMMY_KECAMATAN[distIdx];
        }
      } else {
        namaKabupaten = "Kota Utama";
        const distIdx = getDeterministicIndex(pathname, DUMMY_KECAMATAN.length);
        namaKecamatan = DUMMY_KECAMATAN[distIdx];
      }
    }

    // ==========================================================
    // 4. TENTUKAN QUERY, ZOOM, & DISPLAY BERDASARKAN LEVEL
    // ==========================================================
    const isProvinsiOnly = !!namaProvinsi && !segments[1];
    const isKecamatanPage = !!kecamatanSlug && !!namaKecamatan;

    const lvl: MapLevel = isProvinsiOnly
      ? "provinsi"
      : isKecamatanPage
      ? "kecamatan"
      : "kabupaten";

    const query =
      lvl === "kecamatan"
        ? `${namaKecamatan}, ${namaKabupaten}, ${namaProvinsi}, Indonesia`
        : lvl === "provinsi"
        ? `${namaProvinsi}, Indonesia`
        : `${namaKabupaten}, ${namaProvinsi}, Indonesia`;

    const zoom = lvl === "kecamatan" ? 13 : lvl === "provinsi" ? 7 : 10;

    const displayArea =
      lvl === "kecamatan"
        ? `Kec. ${namaKecamatan}, Kab. ${namaKabupaten}, Prov. ${namaProvinsi}`
        : lvl === "provinsi"
        ? `Prov. ${namaProvinsi}`
        : `Kab. ${namaKabupaten}, Prov. ${namaProvinsi}`;

    const mapLabel =
      lvl === "kecamatan"
        ? `${namaKecamatan}, ${namaKabupaten}`
        : lvl === "provinsi"
        ? namaProvinsi
        : `${namaKabupaten}, ${namaProvinsi}`;

    return {
      mapQuery: query,
      mapZoom: zoom,
      displayArea,
      mapLabel,
      level: lvl,
    };
  }, [pathname, provinsi, kabupaten, kecamatan]);

  // ==========================================================
  // GOOGLE MAPS EMBED URL
  // ==========================================================
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    mapQuery
  )}&z=${mapZoom}&output=embed&hl=id`;

  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    mapQuery
  )}`;

  const finalTitle =
    title ?? (
      <>
        Area Layanan{" "}
        <span className="bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
          {displayArea}
        </span>
      </>
    );

  const finalSubtitle =
    subtitle ??
    "Kami melayani pembuatan website profesional di wilayah ini. Tim kami siap membantu bisnis Anda go-digital, 100% online tanpa biaya kunjungan.";

  return (
    <section className="relative bg-[#030303] py-16 sm:py-24 border-b border-zinc-800/80 overflow-hidden">
      
      {/* Garis Aksen Pelangi Tipis di Atas Section */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 opacity-90"></div>

      {/* Efek Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-violet-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-700/80 bg-gradient-to-r from-violet-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent px-4 py-1.5 rounded-full shadow-[0_5px_20px_rgba(0,0,0,0.5)] mb-3">
            Peta Area Layanan
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3 tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        {/* Map Wrapper */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0a0a0a] border border-zinc-800 rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
        >
          <div className="relative" style={{ height }}>
            <iframe
              src={mapSrc}
              title={`Peta wilayah layanan KerabatWeb di ${mapLabel}`}
              width="100%"
              height={height}
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full grayscale-[0.2] contrast-[1.05]"
            />
          </div>

          {/* Info bar bawah */}
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#0a0a0a] border-t border-zinc-800">
            <p className="text-xs sm:text-sm text-zinc-300 text-center sm:text-left flex items-center gap-2">
              <span aria-hidden className="text-pink-400">📍</span>
              <span className="font-semibold text-white">{displayArea}</span>
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-gradient-to-r from-violet-600 via-pink-600 to-amber-500 text-white px-4 py-2 rounded-xl hover:opacity-95 transition-all shadow-lg shadow-pink-500/20 active:scale-95"
            >
              Buka di Google Maps
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};