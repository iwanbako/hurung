// lib/wilayah-content.ts
import type { District, Province, Regency } from "./wilayah";
import type { FaqItem } from "@/types";
import { generateAutoCharacter } from "./wilayah-content-auto";

/**
 * Bentuk konten yang dihasilkan untuk satu kabupaten/kota.
 * Kompatibel 1:1 dengan props komponen section:
 * - HeroSection            -> hero
 * - ServicesSection        -> services
 * - WhyUsSection           -> whyUs
 * - ProblemSolutionSection -> problemSolution
 * - PortfolioSection       -> portfolio
 * - TestimonialSection     -> testimonial
 * - PricingSection         -> pricingNote
 * - FaqSection             -> faqs
 * - FinalCtaSection        -> finalCta
 */
export interface KabupatenContent {
  // Identitas
  nama: string;
  namaLengkap: string;
  provinsi: string;
  jenisWilayah: "Kota" | "Kabupaten";

  // Kecamatan
  districts: string[];
  daftarKecamatan: string;
  jumlahKecamatan: number;

  // Karakter lokal (dari kamus + auto-generate)
  ikon: string;
  industri: string[];
  budaya: string;
  destinasi: string[];

  // SEO
  metaTitle: string;
  metaDescription: string;

  // Section props
  hero: {
    badge: string;
    headline: string;
    subheadline: string;
    ctaText: string;
  };
  services: {
    title: string;
    subtitle: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    points: { title: string; description: string }[];
  };
  problemSolution: {
    title: string;
    subtitle: string;
    problems: string[];
    solutions: string[];
  };
  portfolio: {
    title: string;
    subtitle: string;
  };
  testimonial: {
    title: string;
    subtitle: string;
  };
  pricingNote: string;
  faqs: FaqItem[];
  finalCta: {
    title: string;
    subtitle: string;
  };
}

/**
 * Karakteristik lokal (opsional, dari kamus).
 */
export interface LocalCharacter {
  ikon?: string;
  industri?: string[];
  budaya?: string;
  destinasi?: string[];
}

// ============================================================
// HELPER
// ============================================================

/**
 * Hapus prefix "Kota " / "Kabupaten " dari nama wilayah.
 */
export function cleanNamaWilayah(nama: string): string {
  return nama.replace(/^(Kota|Kabupaten)\s+/i, "").trim();
}

/**
 * Deteksi apakah wilayah bertipe "Kota" atau "Kabupaten".
 */
export function detectJenisWilayah(nama: string): "Kota" | "Kabupaten" {
  return /^kota\s+/i.test(nama) ? "Kota" : "Kabupaten";
}

/**
 * Ambil N kecamatan pertama untuk ditampilkan di hero/FAQ.
 */
export function sampleDistricts(
  districts: District[],
  limit = 6
): { list: string[]; text: string } {
  const sample = districts.slice(0, limit).map((d) => d.name);
  const hasMore = districts.length > limit;
  const text = sample.join(", ") + (hasMore ? ", dan lainnya" : "");
  return { list: sample, text };
}

// ============================================================
// GENERATOR UTAMA
// ============================================================

/**
 * Generate semua konten untuk satu kabupaten/kota.
 *
 * @param province        Objek provinsi dari wilayah_indonesia.json
 * @param regency         Objek kabupaten dari wilayah_indonesia.json
 * @param localCharacter  Karakter lokal dari kamus (opsional).
 *                        Kalau kosong, auto-generator akan melengkapinya.
 */
export function generateKabupatenContent(
  province: Province,
  regency: Regency,
  localCharacter: LocalCharacter = {}
): KabupatenContent {
  // ==========================================
  // 1. Enrich karakter (override + auto)
  // ==========================================
  const local = generateAutoCharacter(province, regency, localCharacter);

  // ==========================================
  // 2. Identitas dasar
  // ==========================================
  const namaLengkap = regency.name; // "Kota Bandung" / "Bandung"
  const nama = cleanNamaWilayah(namaLengkap); // "Bandung"
  const prov = province.name;
  const jenisWilayah = detectJenisWilayah(namaLengkap);

  // ==========================================
  // 3. Karakter lokal (dari enrich)
  // ==========================================
  const ikon = local.ikon ?? `Wilayah ${nama}, ${prov}`;
  const industri =
    local.industri && local.industri.length > 0
      ? local.industri
      : ["UMKM", "kuliner", "jasa", "perdagangan"];
  const budaya = local.budaya ?? `Budaya khas ${nama} dan ${prov}`;
  const destinasi = local.destinasi ?? [];

  // ==========================================
  // 4. Kecamatan
  // ==========================================
  const jumlahKecamatan = regency.districts.length;
  const districtSample = sampleDistricts(regency.districts, 6);

  // ==========================================
  // 5. Teks turunan
  // ==========================================
  const industriText = industri.slice(0, 3).join(", ");
  const industriPertama = industri[0] ?? "UMKM";

  const destinasiText =
    destinasi.length > 0
      ? ` Destinasi khas ${nama} seperti ${destinasi
          .slice(0, 2)
          .join(" dan ")} juga jadi daya tarik tersendiri.`
      : "";

  const firstDistrict = regency.districts[0]?.name ?? nama;
  const lastDistrict =
    regency.districts[regency.districts.length - 1]?.name ?? nama;

  // ==========================================
  // 6. SEO
  // ==========================================
  // Meta title tanpa provinsi + fokus harga
  const metaTitle = `Jasa Pembuatan Website di ${namaLengkap} - Mulai Rp 999rb`;

  const metaDescription = `Jasa pembuatan website profesional di ${namaLengkap}, ${prov}. Spesialis bisnis ${industriText}. Melayani ${jumlahKecamatan} kecamatan termasuk ${districtSample.text}. Mulai Rp 999rb, bergaransi.`;

  // ==========================================
  // 7. Hero
  // ==========================================
  const hero = {
    badge: `${ikon} - Jasa Website Profesional`,
    headline: `Website Profesional untuk Bisnis ${industriText} di ${namaLengkap}`,
    subheadline: `Dari ${firstDistrict} hingga ${lastDistrict}, kami bantu UMKM, bisnis ${industriText}, dan instansi di ${namaLengkap} tampil profesional online.${destinasiText}`,
    ctaText: "Konsultasi Gratis via WhatsApp",
  };

  // ==========================================
  // 8. Services
  // ==========================================
  const services = {
    title: `Layanan Website untuk Bisnis di ${namaLengkap}`,
    subtitle: `Solusi digital untuk UMKM, toko, restoran, jasa, dan instansi di seluruh ${namaLengkap}.`,
  };

  // ==========================================
  // 9. Why Us
  // ==========================================
  const whyUs = {
    title: `Mengapa Bisnis ${nama} Pilih KerabatWeb?`,
    subtitle: `Kami paham karakter pasar ${namaLengkap}: ${budaya.toLowerCase()}.`,
    points: [
      {
        title: `Paham Pasar ${nama}`,
        description: `Website Anda kami rancang untuk audiens ${namaLengkap}: pelanggan lokal, wisatawan, dan pelaku bisnis ${prov}.`,
      },
      {
        title: `Fokus Industri Lokal ${nama}`,
        description: `Desain dan copywriting disesuaikan untuk industri khas ${namaLengkap}: ${industri
          .slice(0, 3)
          .join(", ")}.`,
      },
      {
        title: `SEO Lokal ${namaLengkap}`,
        description: `Website Anda muncul saat orang mencari produk atau jasa di ${namaLengkap} dan sekitarnya.${
          destinasi.length > 0
            ? ` Termasuk wisatawan yang cari ${destinasi[0]}.`
            : ""
        }`,
      },
      {
        title: `Support Online Penuh`,
        description: `Kami dampingi dari awal sampai live, full online via WhatsApp dan Zoom untuk klien di ${namaLengkap}.`,
      },
    ],
  };

  // ==========================================
  // 10. Problem & Solution
  // ==========================================
  const problemSolution = {
    title: `Masalah Umum Bisnis ${industriText} di ${namaLengkap} & Solusi Kami`,
    subtitle: `Banyak bisnis di ${namaLengkap} bagus produknya tapi sulit ditemukan online. Kami perbaiki itu.`,
    problems: [
      `Bisnis ${industriPertama} di ${nama} hanya dikenal dari mulut ke mulut`,
      `Belum punya website resmi, hanya sosial media`,
      `Kalah bersaing dengan kompetitor luar ${nama}`,
      `Pelanggan sulit menemukan info lengkap bisnis Anda`,
    ],
    solutions: [
      `Website profesional yang muncul di Google ${nama}`,
      `Profil bisnis lengkap dengan foto & testimoni`,
      `SEO lokal agar ditemukan pencari dari ${nama}`,
      `Multi-channel: website + sosial media terintegrasi`,
    ],
  };

  // ==========================================
  // 11. Portfolio & Testimonial
  // ==========================================
  const portfolio = {
    title: `Portofolio Website Klien dari ${prov}`,
    subtitle: `Beberapa proyek website yang kami kerjakan untuk bisnis ${industriText} di ${prov}, termasuk ${namaLengkap}.`,
  };

  const testimonial = {
    title: `Apa Kata Klien dari ${prov}?`,
    subtitle: `Testimoni jujur dari pemilik bisnis yang sudah bekerja sama dengan kami.`,
  };

  // ==========================================
  // 12. Pricing Note
  // ==========================================
  const pricingNote = `Harga transparan tanpa biaya tersembunyi. Berlaku untuk seluruh wilayah ${namaLengkap}, ${prov}.`;

  // ==========================================
  // 13. FAQ (base 5 + tambahan kontekstual)
  // ==========================================
  const faqs: FaqItem[] = [
    {
      q: `Berapa lama pembuatan website untuk bisnis di ${namaLengkap}?`,
      a: `Paket Gold selesai 3-5 hari kerja, Platinum 7-10 hari, Diamond 2-3 minggu. Prosesnya sama cepatnya untuk klien di ${namaLengkap} dan seluruh ${prov}.`,
    },
    {
      q: `Apakah KerabatWeb melayani klien dari ${namaLengkap} meski di luar kota?`,
      a: `Tentu. Kami bekerja 100% online via WhatsApp, Zoom, dan email. Sudah banyak klien kami dari ${namaLengkap} dan berbagai wilayah ${prov}.`,
    },
    {
      q: `Apakah bisa request desain khusus untuk bisnis ${industriPertama} di ${nama}?`,
      a: `Bisa. Kami sering membuat website untuk industri ${industriPertama} dengan sentuhan visual khas ${nama}, tanpa mengorbankan profesionalitas.`,
    },
    {
      q: `Bagaimana sistem pembayarannya untuk klien dari ${namaLengkap}?`,
      a: `Transfer bank (BCA, BRI, Mandiri, BNI) atau e-wallet. DP 50% di awal, pelunasan setelah website selesai dan Anda puas.`,
    },
    {
      q: `Kecamatan apa saja yang dilayani di ${namaLengkap}?`,
      a: `Kami melayani seluruh ${jumlahKecamatan} kecamatan di ${namaLengkap}, termasuk ${districtSample.text}. Semua proses 100% online tanpa biaya tambahan.`,
    },
  ];

  // FAQ tambahan: destinasi wisata
  if (destinasi.length > 0) {
    faqs.push({
      q: `Apakah bisa bantu bisnis wisata di ${nama} yang terkait ${destinasi[0]}?`,
      a: `Bisa. Kami sering bantu penginapan, tour operator, dan bisnis kuliner di sekitar ${destinasi
        .slice(0, 2)
        .join(" dan ")} membuat website yang menarik wisatawan domestik dan mancanegara.`,
    });
  }

  // FAQ tambahan: khusus Kota (biasanya lebih urban/digital)
  if (jenisWilayah === "Kota") {
    faqs.push({
      q: `Apakah bisa bantu startup atau bisnis digital di ${nama}?`,
      a: `Bisa. Kami sering bantu startup ${nama} dari fase MVP hingga scale-up, mulai dari landing page hingga platform kompleks dengan integrasi pembayaran dan API.`,
    });
  }

  // FAQ tambahan: kalau ada banyak kecamatan
  if (jumlahKecamatan >= 15) {
    faqs.push({
      q: `Apakah ada biaya tambahan untuk klien di luar pusat kota ${nama}?`,
      a: `Tidak ada. Kami melayani seluruh ${jumlahKecamatan} kecamatan di ${namaLengkap} dengan harga yang sama, tanpa biaya tambahan berdasarkan lokasi.`,
    });
  }

  // ==========================================
  // 14. Final CTA
  // ==========================================
  const finalCta = {
    title: `Siap Bawa Bisnis ${nama} Anda ke Level Berikutnya?`,
    subtitle: `Konsultasi gratis hari ini. Kami bantu dari konsep, desain, hingga website live.`,
  };

  // ==========================================
  // 15. Return
  // ==========================================
  return {
    // Identitas
    nama,
    namaLengkap,
    provinsi: prov,
    jenisWilayah,

    // Kecamatan
    districts: regency.districts.map((d) => d.name),
    daftarKecamatan: districtSample.text,
    jumlahKecamatan,

    // Karakter
    ikon,
    industri,
    budaya,
    destinasi,

    // SEO
    metaTitle,
    metaDescription,

    // Section props
    hero,
    services,
    whyUs,
    problemSolution,
    portfolio,
    testimonial,
    pricingNote,
    faqs,
    finalCta,
  };
}