"use client";

import React, { useMemo } from "react";
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

  const resolvedData = useMemo(() => {
    // 1. Jika parent override manual
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

    // 2. Homepage = Indonesia
    if (pathname === "/" || pathname === "") {
      return {
        mapQuery: "Indonesia",
        mapZoom: 4,
        displayArea: "Seluruh Indonesia",
        mapLabel: "Indonesia",
        level: "indonesia" as MapLevel,
      };
    }

    // 3. Halaman lain = parsing slug
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

          if (kecamatanSlug && districts.length > 0) {
            const found = districts.find(
              (d: any) => d.slug === kecamatanSlug
            );
            if (found) {
              namaKecamatan = getSafeName(found);
            }
          }

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

  const { mapQuery, mapZoom, displayArea, mapLabel } = resolvedData;

  // GOOGLE MAPS EMBED URL
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
        <span className="text-red-600">
          {displayArea}
        </span>
      </>
    );

  const finalSubtitle =
    subtitle ??
    "Kami melayani pembuatan website profesional di wilayah ini. Tim kami siap membantu bisnis Anda go-digital, 100% online tanpa biaya kunjungan.";

  return (
    <section className="relative bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Peta Area Layanan
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {finalSubtitle}
          </p>
        </div>

        {/* Map Wrapper dengan Border Merah */}
        <div className="bg-white border-2 border-red-600 rounded-3xl overflow-hidden shadow-md">
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
              className="w-full h-full"
            />
          </div>

          {/* Info bar bawah */}
          <div className="px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3 bg-red-50/40 border-t border-slate-200">
            <p className="text-xs sm:text-sm text-slate-700 text-center sm:text-left flex items-center gap-2 font-medium">
              <span aria-hidden className="text-red-600">📍</span>
              <span className="font-semibold text-slate-900">{displayArea}</span>
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-full transition-all shadow-md shadow-red-600/20 active:scale-95"
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
        </div>

      </div>
    </section>
  );
};