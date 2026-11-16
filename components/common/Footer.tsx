"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { provinsiContent } from "@/data/provinsi-content";
import { getRegenciesOfProvince } from "@/lib/wilayah";

const tahun = new Date().getFullYear();

const DUMMY_KECAMATAN = [
  "Sukamaju", "Cilandak", "Menteng", "Coblong", "Kebayoran", "Sumbersari",
  "Sukajadi", "Banjarsari", "Tebet", "Gubeng", "Denpasar Barat", "Medan Baru",
];

const getSafeName = (item: any) => {
  if (!item) return "";
  if (typeof item === "string") return item;
  return item.name || item.nama || "";
};

// Fungsi pembuat index acak yang konsisten (Deterministic Random)
const getDeterministicIndex = (seed: string, length: number) => {
  if (length === 0) return 0;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash << 5) - hash + seed.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) % length;
};

export const Footer: React.FC = () => {
  const pathname = usePathname();

  // ============================================================
  // LOGIKA AREA LAYANAN DINAMIS (Bebas Hydration Error)
  // ============================================================
  const { displayArea } = useMemo(() => {
    // 1. JIKA DI HOMEPAGE
    if (pathname === "/" || pathname === "") {
      return {
        displayArea: "Seluruh Indonesia",
      };
    }

    // 2. JIKA DI HALAMAN LAIN
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
            const matched = districts.find(
              (d: any) => d.slug === kecamatanSlug
            );
            if (matched) {
              namaKecamatan = getSafeName(matched);
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

    return {
      displayArea: `Kec. ${namaKecamatan}, Kab. ${namaKabupaten}, Prov. ${namaProvinsi}`,
    };
  }, [pathname]);

  return (
    <footer className="relative bg-red-600 text-white mt-auto overflow-hidden">

      {/* ================= EFEK KERTAS SOBEK / JIGZAG DI ATAS FOOTER ================= */}
      <div 
        className="absolute top-0 left-0 right-0 h-6 bg-white pointer-events-none z-10"
        style={{
          clipPath: "polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)"
        }}
      ></div>

      {/* ================= MAIN FOOTER ================= */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 pt-16 pb-12 sm:pb-16 grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        
        {/* Kolom 1: Brand & Deskripsi */}
        <div className="col-span-2 md:col-span-2">
          <Link
            href="/"
            className="flex items-center gap-2.5 mb-3 group w-fit"
          >
            <span className="w-8 h-8 sm:w-9 sm:h-9 grid place-items-center rounded-xl bg-white text-red-600 shadow-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 text-red-600"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2" strokeWidth="2" />
                <line x1="8" y1="21" x2="16" y2="21" strokeWidth="2.5" />
                <line x1="12" y1="17" x2="12" y2="21" strokeWidth="2.5" />
                <path d="M7 8l3 3-3 3" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400" />
                <line x1="13" y1="14" x2="17" y2="14" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="text-red-400" />
              </svg>
            </span>
            <span className="font-bold text-base sm:text-lg text-white">
              Kerabat<span className="text-red-200">Web</span>
            </span>
          </Link>
          <p className="text-[11px] sm:text-sm leading-relaxed max-w-sm text-red-100 mb-4 font-normal">
            Membantu bisnis Anda tampil profesional di internet dengan website cepat, modern, dan siap konversi.
          </p>

          {/* ================= AREA LAYANAN ================= */}
          <div className="max-w-sm mb-5 p-3 rounded-2xl bg-red-700/60 border border-red-500/50 shadow-sm">
            <p className="text-[10px] sm:text-xs text-red-200 font-bold mb-0.5 uppercase tracking-wider">
              Area Layanan Utama
            </p>
            <p className="text-[11px] sm:text-sm text-white font-medium leading-relaxed">
              {displayArea}
            </p>
          </div>

          {/* Sosial Media / Kontak Cepat */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/6285938573419"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-full bg-red-700 border border-red-500 text-white flex items-center justify-center hover:bg-white hover:text-red-600 hover:border-white transition-all duration-300 shadow-sm"
              aria-label="WhatsApp"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </a>
            <a
              href="mailto:halo@kerabatweb.com"
              className="w-9 h-9 rounded-full bg-red-700 border border-red-500 text-white flex items-center justify-center hover:bg-white hover:text-red-600 hover:border-white transition-all duration-300 shadow-sm"
              aria-label="Email"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </a>
          </div>
        </div>

        {/* Kolom 2: Layanan */}
        <div>
          <h3 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
            Layanan
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-red-100 font-medium">
            {["Landing Page", "Company Profile", "Toko Online", "Maintenance"].map((item, idx) => (
              <li key={idx}>
                <Link href="/#layanan" className="hover:text-white hover:underline transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Kolom 3: Perusahaan & Legal */}
        <div>
          <h3 className="text-white font-bold mb-3 sm:mb-4 text-xs sm:text-sm uppercase tracking-wider">
            Informasi
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-red-100 font-medium">
            <li>
              <Link href="/blog" className="hover:text-white hover:underline transition-colors">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/tentang-kami" className="hover:text-white hover:underline transition-colors">
                Tentang Kami
              </Link>
            </li>
            <li>
              <Link href="/kebijakan-privasi" className="hover:text-white hover:underline transition-colors">
                Kebijakan Privasi
              </Link>
            </li>
            <li>
              <Link href="/syarat-ketentuan" className="hover:text-white hover:underline transition-colors">
                Syarat & Ketentuan
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* ================= BOTTOM BAR ================= */}
      <div className="border-t border-red-700 bg-red-700/50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-[11px] text-red-200 font-medium text-center sm:text-left">
            © {tahun}{" "}
            <span className="text-white font-semibold">
              Kerabatweb.com
            </span>
            . All rights reserved.
          </p>
          <p className="text-[11px] text-red-200 font-medium text-center sm:text-right flex items-center gap-1">
            Dibuat dengan <span className="text-white animate-pulse">❤</span> di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
};