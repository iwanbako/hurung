import React from "react";

const defaultServices = [
  {
    title: "Landing Page",
    desc: "Halaman fokus konversi untuk campaign, produk, atau jasa Anda.",
  },
  {
    title: "Company Profile",
    desc: "Profil perusahaan kredibel yang membangun kepercayaan klien.",
  },
  {
    title: "E-Commerce",
    desc: "Toko online siap jualan dengan pembayaran & inventori.",
  },
  {
    title: "Web App & CMS",
    desc: "Aplikasi web custom sesuai alur bisnis Anda.",
  },
];

// Array ikon garis merah minimalis bernuansa Light Mode
const serviceIcons = [
  // 01: Roket / Landing Page
  <svg key="1" className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 11.464a5 5 0 10-7.072 0m7.072 0l5.656 5.656a2 2 0 010 2.828l-.707.707a2 2 0 01-2.828 0l-5.656-5.656m7.072-7.072a5 5 0 01-7.072 0m7.072 0L9.879 4.293a2 2 0 00-2.828 0l-.707.707a2 2 0 000 2.828l5.656 5.656" />
  </svg>,
  // 02: Gedung / Company Profile
  <svg key="2" className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>,
  // 03: Keranjang / E-Commerce
  <svg key="3" className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>,
  // 04: Pengaturan / Web App & CMS
  <svg key="4" className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>,
];

interface Props {
  title?: string;
  subtitle?: string;
  locationName?: string;
}

export const ServicesSection: React.FC<Props> = ({
  title,
  subtitle,
  locationName,
}) => {
  const finalTitle =
    title ??
    `Apa yang Bisa Kami Bantu${locationName ? ` di ${locationName}` : ""}?`;

  const finalSubtitle =
    subtitle ??
    "Solusi website sesuai kebutuhan bisnis Anda, dari landing page sampai web app custom.";

  return (
    <section
      id="layanan"
      className="relative bg-white text-slate-900 border-y border-slate-200 py-16 sm:py-24 overflow-hidden"
    >
      {/* Efek Ambient Glow Halus */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-red-400/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Layanan Kami
          </span>

          <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold mt-2 sm:mt-3 tracking-tight text-slate-900">
            {finalTitle}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed font-normal">
            {finalSubtitle}
          </p>
        </div>

        {/* Grid Layanan */}
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {defaultServices.map((s, idx) => (
            <div
              key={idx}
              className="rounded-2xl p-6 sm:p-7 flex flex-col bg-white border border-slate-200 transition-all duration-200 hover:border-red-400 hover:shadow-lg hover:-translate-y-1 group shadow-sm"
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-red-50 border border-red-100 grid place-items-center mb-4 shadow-sm group-hover:bg-red-100 transition-colors">
                {serviceIcons[idx % serviceIcons.length]}
              </div>
              <h3 className="font-bold text-base sm:text-lg mb-2 text-slate-900 group-hover:text-red-600 transition-colors">
                {s.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed flex-1 font-normal">
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};