// components/sections/PortfolioSection.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";

interface Props {
  title?: string;
  subtitle?: string;
  kabupaten?: string;
}

// Helper: bangun URL Unsplash dengan format WebP + ukuran kecil
// Static export tidak punya optimizer, jadi optimasi dilakukan di sisi Unsplash CDN.
const buildImg = (base: string, w: number, format: "webp" | "jpg" = "webp") =>
  `${base}?fm=${format}&q=55&w=${w}&fit=crop&auto=format`;

export const PortfolioSection: React.FC<Props> = ({
  title,
  subtitle,
  kabupaten,
}) => {
  const portfolioItems = [
    {
      title: kabupaten
        ? `Kopi Nusantara Cabang ${kabupaten} (Lonjakan Penjualan 40%)`
        : "Kopi Nusantara (Lonjakan Penjualan 40%)",
      desc: kabupaten
        ? `Penggantian platform lama ke arsitektur modern menurunkan loading time dari 5s menjadi 0.8s. Kini pelanggan di ${kabupaten} lebih mudah memesan langsung dari website.`
        : "Penggantian platform lama ke arsitektur modern menurunkan loading time dari 5s menjadi 0.8s.",
      tag: "E-Commerce / F&B",
      alt: kabupaten
        ? `Website e-commerce Kopi Nusantara cabang ${kabupaten} dengan performa loading 0.8 detik`
        : "Website e-commerce Kopi Nusantara dengan performa loading 0.8 detik",
      imgTitle: kabupaten
        ? `Portofolio Kopi Nusantara ${kabupaten} - Jasa Pembuatan Website KerabatWeb`
        : "Portofolio Kopi Nusantara - Jasa Pembuatan Website KerabatWeb",
      imgBase: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    },
    {
      title: kabupaten
        ? `Klinik Sehat Utama ${kabupaten} (PageSpeed 100)`
        : "Klinik Sehat Utama (PageSpeed 100)",
      desc: kabupaten
        ? `Website medis profesional dengan integrasi form WhatsApp otomatis. Pasien di ${kabupaten} kini bisa mendaftar konsultasi tanpa antre.`
        : "Website medis profesional dengan integrasi form WhatsApp otomatis.",
      tag: "Company Profile",
      alt: kabupaten
        ? `Website company profile Klinik Sehat Utama ${kabupaten} dengan skor PageSpeed 100`
        : "Website company profile Klinik Sehat Utama dengan skor PageSpeed 100",
      imgTitle: kabupaten
        ? `Portofolio Klinik Sehat Utama ${kabupaten} - KerabatWeb`
        : "Portofolio Klinik Sehat Utama - KerabatWeb",
      imgBase: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d",
    },
    {
      title: kabupaten
        ? `EduTech Academy ${kabupaten} (Lead Naik 3x Lipat)`
        : "EduTech Academy (Lead Naik 3x Lipat)",
      desc: kabupaten
        ? `Optimalisasi UI/UX conversion-focused memangkas bounce rate hingga di bawah 25%. Pendaftar dari ${kabupaten} meningkat signifikan.`
        : "Optimalisasi UI/UX conversion-focused memangkas bounce rate hingga di bawah 25%.",
      tag: "Landing Page",
      alt: kabupaten
        ? `Landing page EduTech Academy ${kabupaten} dengan conversion rate meningkat 3x`
        : "Landing page EduTech Academy dengan conversion rate meningkat 3x",
      imgTitle: kabupaten
        ? `Portofolio EduTech Academy ${kabupaten} - KerabatWeb`
        : "Portofolio EduTech Academy - KerabatWeb",
      imgBase: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    },
  ];

  const finalTitle =
    title ?? (
      <>
        Hasil Nyata{" "}
        <span className="text-[#FEBB02]">
          {kabupaten ? `Klien Kami di ${kabupaten}` : "Klien Kami"}
        </span>
      </>
    );

  const finalSubtitle =
    subtitle ??
    (kabupaten
      ? `Bukti performa website kami untuk bisnis di ${kabupaten} - mulai dari UMKM, klinik, hingga lembaga pendidikan.`
      : "Bukti performa dan efektivitas desain website kami dalam meningkatkan kredibilitas serta konversi bisnis.");

  return (
    <section className="bg-[#003580] py-12 sm:py-20 border-b border-[#0066f5] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[#FEBB02] text-[#00224f] px-3.5 py-1.5 rounded-full shadow-sm">
            Studi Kasus &amp; Portofolio
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 sm:mt-3">
            {finalTitle}
          </h2>

          <p className="mt-2 text-xs sm:text-sm text-blue-100 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: idx * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-[#00224f] border-2 border-[#0066f5] rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between transition-all"
            >
              {/*
                OPTIMASI STATIC EXPORT:
                - <picture> + <source type="image/webp"> → browser modern unduh WebP
                - srcSet 400w/600w/800w → mobile hanya unduh 400w
                - sizes → hint lebar render
                - fm=webp&q=55 → Unsplash kirim WebP kualitas 55 (file ~10 KB)
                - alt deskriptif → SEO & a11y lolos
                - title → tooltip preview auditor
                - width/height eksplisit → cegah CLS
                - loading=lazy → gambar bawah fold tidak dibebani di awal
                - wrapper bg-[#00224f] → placeholder solid, tidak ada flash putih
              */}
              <div className="overflow-hidden relative bg-[#00224f]">
                <picture>
                  <source
                    type="image/webp"
                    srcSet={`
                      ${buildImg(item.imgBase, 400, "webp")} 400w,
                      ${buildImg(item.imgBase, 600, "webp")} 600w,
                      ${buildImg(item.imgBase, 800, "webp")} 800w
                    `}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <img
                    src={buildImg(item.imgBase, 600, "jpg")}
                    srcSet={`
                      ${buildImg(item.imgBase, 400, "jpg")} 400w,
                      ${buildImg(item.imgBase, 600, "jpg")} 600w,
                      ${buildImg(item.imgBase, 800, "jpg")} 800w
                    `}
                    sizes="(max-width: 768px) 100vw, 33vw"
                    alt={item.alt}
                    title={item.imgTitle}
                    width={600}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-500"
                  />
                </picture>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-extrabold text-[#00224f] bg-[#FEBB02] px-2.5 py-1 rounded-md tracking-wide uppercase inline-block mb-2">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-white text-base sm:text-lg leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-blue-100 mt-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};