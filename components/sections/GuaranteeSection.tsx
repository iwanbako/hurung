import React from "react";

interface Props {
  kabupaten?: string;
  title?: string;
  subtitle?: string;
}

export const GuaranteeSection: React.FC<Props> = ({
  kabupaten,
  title,
  subtitle,
}) => {
  // ============================================================
  // DATA GARANSI (dinamis mengikuti kabupaten kalau ada)
  // ============================================================
  const guarantees = [
    {
      title: "Garansi Keamanan SSL & Data",
      desc: kabupaten
        ? `Setiap website untuk bisnis di ${kabupaten} dilengkapi sertifikat SSL resmi dan berjalan di atas infrastruktur server berkecepatan tinggi yang aman dari serangan siber.`
        : "Setiap website dilengkapi sertifikat SSL resmi dan berjalan di atas infrastruktur server berkecepatan tinggi yang aman dari serangan siber.",
    },
    {
      title: "Garansi Revisi Desain",
      desc: kabupaten
        ? `Kami sediakan kuota revisi desain agar tampilan akhir website bisnis Anda di ${kabupaten} benar-benar pas dengan identitas dan keinginan Anda.`
        : "Kami sediakan kuota revisi desain agar tampilan akhir website benar-benar pas dan sesuai dengan identitas serta keinginan bisnis Anda.",
    },
    {
      title: "Pendampingan & Support Teknis",
      desc: kabupaten
        ? `Tidak paham teknis? Tenang! Kami pandu klien di ${kabupaten} dari nol, mulai dari setup domain, hosting, hingga website siap aktif menghasilkan cuan.`
        : "Tidak paham teknis? Tenang! Kami bantu pandu dari nol, mulai dari setup domain, hosting, hingga website siap aktif menghasilkan cuan.",
    },
  ];

  // Ikon Garis Merah/Putih SVG Minimalis
  const guaranteeIcons = [
    // 01: Shield / Keamanan SSL
    <svg key="1" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
    </svg>,
    // 02: Refresh / Revisi
    <svg key="2" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>,
    // 03: Handshake / Support
    <svg key="3" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>,
  ];

  // ============================================================
  // HEADER TEXT
  // ============================================================
  const finalTitle = title ?? (
    <>
      100%{" "}
      <span className="text-red-600">
        Garansi Kepuasan
      </span>
      {kabupaten ? ` untuk Bisnis di ${kabupaten}` : " untuk Anda"}
    </>
  );

  const finalSubtitle =
    subtitle ??
    (kabupaten
      ? `Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik untuk bisnis di ${kabupaten} dengan standar kualitas profesional berteknologi tinggi.`
      : "Investasi Anda aman bersama kami. Kami berkomitmen memberikan hasil terbaik dengan standar kualitas profesional berteknologi tinggi.");

  return (
    <section className="relative bg-white text-slate-900 py-16 sm:py-24 border-b border-slate-200 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full mb-3 shadow-sm">
            Komitmen & Proteksi
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            {finalTitle}
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
            {finalSubtitle}
          </p>
        </div>

        {/* Grid Garansi */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {guarantees.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col items-start transition-all duration-200 relative overflow-hidden group hover:border-red-500 hover:shadow-lg hover:-translate-y-1 shadow-sm"
            >
              {/* Icon Kotak Bundar Merah Solid */}
              <div className="w-12 h-12 rounded-full bg-red-600 border border-red-700 flex items-center justify-center mb-5 shadow-sm shadow-red-600/20">
                {guaranteeIcons[idx % guaranteeIcons.length]}
              </div>

              <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-2 group-hover:text-red-600 transition-colors">
                {item.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};