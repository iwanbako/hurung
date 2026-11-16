import React from "react";

interface Props {
  title?: string;
  subtitle?: string;
  kabupaten?: string;
}

// Helper: bangun URL Unsplash dengan format WebP + ukuran kecil
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
        <span className="text-red-600">
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
    <section className="relative bg-white py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Studi Kasus &amp; Portofolio
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 sm:mt-3 tracking-tight">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {finalSubtitle}
          </p>
        </div>

        {/* Grid Portofolio */}
        <div className="grid gap-6 md:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-200 hover:border-red-400 hover:shadow-lg hover:-translate-y-1 group shadow-sm"
            >
              <div className="overflow-hidden relative bg-slate-100">
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
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[10px] font-bold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-md tracking-wide uppercase inline-block mb-3 shadow-sm">
                    {item.tag}
                  </span>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg leading-snug group-hover:text-red-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2.5 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};