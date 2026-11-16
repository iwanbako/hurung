import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/common/Header";
import { Footer } from "@/components/common/Footer";
import { ContactForm } from "@/components/common/ContactForm";

const SITE_URL = "https://kerabatweb.com";
const waNumber = "6285938573419";
const waLink = (msg: string) =>
  `https://wa.me/${waNumber}?text=${encodeURIComponent(msg)}`;

// ============================================================
// METADATA SEO
// ============================================================
export const metadata: Metadata = {
  title: "Hubungi Kami - Konsultasi Pembuatan Website Gratis",
  description:
    "Punya pertanyaan seputar pembuatan website? Hubungi tim KerabatWeb via WhatsApp atau Email. Konsultasi 100% gratis, respon cepat pada jam kerja.",
  keywords: [
    "kontak kerabatweb",
    "hubungi jasa pembuatan website",
    "konsultasi website gratis",
    "customer service kerabatweb",
  ],
  alternates: { canonical: `${SITE_URL}/kontak` },
  openGraph: {
    title: "Hubungi KerabatWeb - Konsultasi Gratis",
    description:
      "Siap membantu mewujudkan website impian Anda. Hubungi kami sekarang untuk konsultasi gratis.",
    url: `${SITE_URL}/kontak`,
    type: "website",
    siteName: "KerabatWeb",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hubungi KerabatWeb - Konsultasi Gratis",
    description:
      "Siap membantu mewujudkan website impian Anda. Hubungi kami sekarang untuk konsultasi gratis.",
  },
};

export default function KontakPage() {
  return (
    <div className="bg-white text-slate-900 flex flex-col min-h-screen">
      <Header />

      <main className="flex-1 w-full py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden">
        
        {/* Garis Aksen Merah Tipis di Atas Section */}
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-red-600"></div>

        {/* Dekorasi Background Glow Merah Halus */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-red-100/50 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 max-w-5xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block text-xs font-bold uppercase tracking-wider bg-red-50 border border-red-200 text-red-700 px-4 py-1.5 rounded-full shadow-sm mb-3">
              Kontak Kami
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 tracking-tight text-slate-900">
              Mari <span className="text-red-600">Berkolaborasi</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
              Punya ide, pertanyaan, atau ingin memulai proyek website? Tim kami siap membantu Anda. Konsultasi 100% gratis.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            
            {/* ================= KIRI: INFO KONTAK ================= */}
            <div className="space-y-4">
              {/* Card WhatsApp */}
              <a href={waLink("Halo KerabatWeb, saya ingin bertanya seputar pembuatan website.")} target="_blank" rel="noopener noreferrer" className="block bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-6 transition-all shadow-sm group hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-emerald-600/20 font-bold">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">WhatsApp (Tercepat)</h3>
                    <p className="text-sm text-slate-600 mb-2">Respons dalam hitungan menit pada jam kerja.</p>
                    <p className="text-sm font-semibold text-red-600">+62 859-3857-3419</p>
                  </div>
                </div>
              </a>

              {/* Card Email */}
              <a href="mailto:halo@kerabatweb.com" className="block bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-6 transition-all shadow-sm group hover:shadow-md">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0 shadow-md shadow-red-600/20 font-bold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-red-600 transition-colors">Email</h3>
                    <p className="text-sm text-slate-600 mb-2">Untuk pertanyaan detail atau kerjasama B2B.</p>
                    <p className="text-sm font-semibold text-red-600">halo@kerabatweb.com</p>
                  </div>
                </div>
              </a>

              {/* Card Lokasi & Alamat */}
              <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-white shrink-0 shadow-md font-bold">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Lokasi & Alamat</h3>
                    <p className="text-sm text-slate-600 mb-1 font-normal">
                      Kp. Cipagedongan, Desa Gadog, Kecamatan Pacet, Kabupaten Cianjur, Jawa Barat.
                    </p>
                    <p className="text-xs font-semibold text-red-600 mt-2">Senin - Sabtu: 08.00 - 20.00 WIB</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ================= KANAN: FORM KONTAK ================= */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600" />
              <h2 className="text-xl font-bold mb-2 text-slate-900">Kirim Pesan Langsung</h2>
              <p className="text-sm text-slate-600 mb-6 leading-relaxed font-normal">
                Isi form di bawah ini, lalu Anda akan diarahkan ke WhatsApp dengan pesan yang sudah terisi otomatis.
              </p>
              
              {/* Panggil komponen Client di sini */}
              <ContactForm />
              
            </div>

          </div>

          {/* ================= SECTION PETA LOKASI (GOOGLE MAPS EMBED) ================= */}
          <div className="mt-16 bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-red-600" />
            <div className="mb-6 text-center sm:text-left flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">Peta Lokasi Kami</h3>
                <p className="text-sm text-slate-600 font-normal">
                  Kp. Cipagedongan, Desa Gadog, Kecamatan Pacet, Kabupaten Cianjur, Jawa Barat
                </p>
              </div>
              <a 
                href="https://maps.google.com/?q=Kp+Cipagedongan+Gadog+Pacet+Cianjur" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 font-semibold text-xs rounded-xl border border-red-200 transition-all self-start sm:self-auto"
              >
                Buka di Google Maps →
              </a>
            </div>

            <div className="w-full h-[350px] sm:h-[400px] rounded-2xl overflow-hidden border border-slate-200 shadow-inner">
              <iframe
                title="Peta Lokasi Kp Cipagedongan Gadog Pacet Cianjur"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15843.34262145322!2d107.0355!3d-6.7833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69b329c5b5b5b5%3A0x5b5b5b5b5b5b5b5b!2sGadog%2C%20Pacet%2C%20Cianjur%20Regency%2C%20West%20Java!5e0!3m2!1sen!2sid!4v1650000000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Link href="/" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-semibold text-sm rounded-xl border border-slate-300 transition-all active:scale-95 shadow-sm">
              ← Kembali ke Beranda
            </Link>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}