// lib/kecamatan-content.ts
import type { Province, Regency } from "./wilayah";

export type DistrictContent = {
  namaKecamatan: string;
  namaKabupaten: string;
  namaProvinsi: string;
  namaLengkap: string;
  metaTitle: string;
  metaDescription: string;
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  services: { title: string; subtitle: string };
  whyUs: { title: string; subtitle: string; points: string[] };
  problemSolution: {
    title: string;
    subtitle: string;
    problems: string[];
    solutions: string[];
  };
  portfolio: { title: string; subtitle: string };
  testimonial: { title: string; subtitle: string };
  pricingNote: string;
  finalCta: { title: string; subtitle: string };
  faqs: { q: string; a: string }[];
  industries: string[];
  districts: { name: string; slug: string }[];
};

export function generateKecamatanContent(
  province: Province,
  regency: Regency,
  districtName: string
): DistrictContent {
  const namaKecamatan = districtName;
  const namaKabupaten = regency.name;
  const namaProvinsi = province.name;
  const namaLengkap = `Kecamatan ${namaKecamatan}, ${namaKabupaten}`;

  const industri = [
    "UMKM",
    "Toko Online",
    "Company Profile",
    "Sekolah",
    "Klinik & Praktik",
    "Jasa Profesional",
    "Restoran & Kuliner",
    "Properti",
  ];

  return {
    namaKecamatan,
    namaKabupaten,
    namaProvinsi,
    namaLengkap,
    industries: industri,
    districts: regency.districts,

    metaTitle: `Jasa Pembuatan Website ${namaKecamatan} ${namaKabupaten} | KerabatWeb`,
    metaDescription: `Jasa pembuatan website profesional di Kecamatan ${namaKecamatan}, ${namaKabupaten}, ${namaProvinsi}. Cocok untuk UMKM, toko online, sekolah, dan company profile. Harga mulai Rp 999.000, gratis domain & hosting 1 tahun.`,

    hero: {
      badge: `Website Profesional untuk Bisnis di Kecamatan ${namaKecamatan}`,
      headline: `Jasa Pembuatan Website ${namaKecamatan} ${namaKabupaten}`,
      subheadline: `Bantu bisnis, UMKM, dan instansi di Kecamatan ${namaKecamatan}, ${namaKabupaten} tampil online dengan website cepat, SEO-friendly, dan mobile responsive bersama KerabatWeb.`,
      ctaText: "Konsultasi Gratis via WhatsApp",
    },

    services: {
      title: `Layanan Pembuatan Website di ${namaKecamatan}`,
      subtitle: `Dari landing page UMKM hingga company profile, kami siapkan solusi website yang cocok untuk kebutuhan bisnis Anda di Kecamatan ${namaKecamatan}, ${namaKabupaten}.`,
    },

    whyUs: {
      title: `Kenapa Pilih KerabatWeb di ${namaKecamatan}?`,
      subtitle: `Kami paham kebutuhan digital bisnis lokal di ${namaKecamatan}, ${namaKabupaten}, ${namaProvinsi}.`,
      points: [
        `Tim lokal yang paham pasar Kecamatan ${namaKecamatan}`,
        "Harga transparan, tanpa biaya tersembunyi",
        "Website cepat, aman, dan SEO-friendly",
        "Support & maintenance setelah website live",
        "Gratis domain + hosting 1 tahun untuk paket tertentu",
      ],
    },

    problemSolution: {
      title: `Masalah Digital Bisnis di ${namaKecamatan}`,
      subtitle: `Banyak pelaku usaha di Kecamatan ${namaKecamatan} masih mengandalkan media sosial saja. Website memberi kredibilitas dan jangkauan lebih luas.`,
      problems: [
        "Bisnis sulit ditemukan di Google",
        "Kurang kredibel di mata calon pelanggan",
        "Media sosial saja tidak cukup untuk jangka panjang",
        "Kesulitan menampilkan katalog produk secara rapi",
        "Tidak punya rumah digital sendiri",
      ],
      solutions: [
        "Website dioptimasi SEO agar mudah ditemukan",
        "Desain profesional menambah kepercayaan",
        "Website adalah aset digital jangka panjang",
        "Katalog produk & layanan tampil rapi",
        "Domain & hosting sendiri atas nama bisnis Anda",
      ],
    },

    portfolio: {
      title: `Portofolio Website untuk Klien di ${namaKabupaten}`,
      subtitle: `Beberapa contoh website yang kami kerjakan untuk bisnis di sekitar Kecamatan ${namaKecamatan} dan ${namaKabupaten}.`,
    },

    testimonial: {
      title: `Apa Kata Klien di ${namaKecamatan}?`,
      subtitle: `Testimoni dari pelaku usaha di Kecamatan ${namaKecamatan}, ${namaKabupaten}, ${namaProvinsi}.`,
    },

    pricingNote: `Harga di atas berlaku untuk klien di Kecamatan ${namaKecamatan}, ${namaKabupaten}. Konsultasi gratis, pembayaran fleksibel.`,

    finalCta: {
      title: `Siap Go Digital di ${namaKecamatan}?`,
      subtitle: `Konsultasi gratis dengan tim KerabatWeb. Kami bantu bisnis Anda di Kecamatan ${namaKecamatan}, ${namaKabupaten} tampil online.`,
    },

    faqs: [
      {
        q: `Berapa harga jasa pembuatan website di Kecamatan ${namaKecamatan}?`,
        a: `Harga jasa pembuatan website di Kecamatan ${namaKecamatan}, ${namaKabupaten} mulai dari Rp 999.000 per tahun untuk paket landing page. Tersedia juga paket company profile dan toko online.`,
      },
      {
        q: `Apakah bisa konsultasi tatap muka di Kecamatan ${namaKecamatan}?`,
        a: `Bisa. Tim KerabatWeb dapat mengatur konsultasi online via WhatsApp atau Zoom, atau tatap muka di wilayah ${namaKabupaten} sesuai kesepakatan.`,
      },
      {
        q: `Berapa lama proses pembuatan website?`,
        a: `Untuk paket landing page biasanya 3 sampai 7 hari kerja. Company profile 7 sampai 14 hari kerja. Toko online 14 sampai 21 hari kerja, tergantung kompleksitas.`,
      },
      {
        q: `Apakah termasuk domain dan hosting?`,
        a: `Ya, paket Gold, Platinum, dan Diamond sudah termasuk domain, hosting 1 tahun, dan SSL gratis.`,
      },
      {
        q: `Apakah website bisa dioptimasi untuk Google?`,
        a: `Ya. Semua paket kami sudah SEO-friendly dan mobile responsive. Kami juga menyediakan setup awal agar website mudah ditemukan di Google.`,
      },
      {
        q: `Bagaimana cara pembayarannya?`,
        a: `Pembayaran bisa dilakukan via transfer bank atau e-wallet. Umumnya DP 50 persen di awal, pelunasan setelah website selesai dan disetujui.`,
      },
    ],
  };
}