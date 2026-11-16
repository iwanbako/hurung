import React from "react";

interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

const defaultSteps: WorkflowStep[] = [
  {
    step: "01",
    title: "Konsultasi & Pilih Paket",
    desc: "Diskusikan kebutuhan bisnis Anda via WhatsApp dan pilih paket website yang paling sesuai.",
  },
  {
    step: "02",
    title: "Pengiriman Materi & Data",
    desc: "Kirimkan logo, profil bisnis, foto produk, atau materi teks yang ingin ditampilkan di website.",
  },
  {
    step: "03",
    title: "Proses Pengerjaan",
    desc: "Tim kami langsung merancang dan membangun website Anda dengan performa tinggi & SEO-friendly.",
  },
  {
    step: "04",
    title: "Review & Website Online",
    desc: "Anda cek hasil akhirnya, lakukan revisi jika diperlukan, dan website resmi siap mendatangkan cuan!",
  },
];

// Array ikon garis putih (SVG) untuk masing-masing langkah
const stepIcons = [
  // 01: Chat / Konsultasi
  <svg key="1" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>,
  // 02: Folder / Dokumen
  <svg key="2" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>,
  // 03: Petir / Pengerjaan Cepat
  <svg key="3" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>,
  // 04: Roket / Launching
  <svg key="4" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 11.464a5 5 0 10-7.072 0m7.072 0l5.656 5.656a2 2 0 010 2.828l-.707.707a2 2 0 01-2.828 0l-5.656-5.656m7.072-7.072a5 5 0 01-7.072 0m7.072 0L9.879 4.293a2 2 0 00-2.828 0l-.707.707a2 2 0 000 2.828l5.656 5.656" />
  </svg>,
];

interface Props {
  title?: string;
  subtitle?: string;
  steps?: WorkflowStep[];
}

export const WorkflowSection: React.FC<Props> = ({
  title,
  subtitle,
  steps,
}) => {
  const finalSteps = steps && steps.length > 0 ? steps : defaultSteps;

  return (
    <section className="relative bg-black text-white py-16 sm:py-24 border-b border-zinc-800 overflow-hidden">
      
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-zinc-900 border border-zinc-800 text-zinc-400 px-4 py-1.5 rounded-full mb-3">
            Cara Kerja Sederhana
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight">
            {title ?? (
              <>
                4 Langkah Mudah{" "}
                <span className="text-zinc-400">
                  Punya Website
                </span>
              </>
            )}
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-zinc-400 max-w-xl mx-auto leading-relaxed">
            {subtitle ??
              "Proses cepat, transparan, dan tidak ribet. Kami dampingi dari nol sampai website Anda online."}
          </p>
        </div>

        {/* Grid Alur Kerja */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {finalSteps.map((item, idx) => (
            <div
              key={idx}
              className="bg-black border border-zinc-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-200 hover:border-zinc-700 hover:-translate-y-1 group"
            >
              <div>
                {/* Nomor Urut & Ikon Garis Putih */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-2xl sm:text-3xl font-black text-white">
                    {item.step}
                  </span>
                  <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shadow-sm">
                    {stepIcons[idx % stepIcons.length]}
                  </div>
                </div>

                <h3 className="font-bold text-white text-base sm:text-lg mb-2 group-hover:text-zinc-200 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};