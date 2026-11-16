"use client";

import React, { useState } from "react";

interface DomainResult {
  domain: string;
  available: boolean | null;
}

const waNumber = "6285938573419";

export const DomainChecker: React.FC = () => {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<DomainResult[]>([]);
  const [errorMsg, setErrorMsg] = useState("");

  const tlds = ["com", "id", "co.id", "my.id", "web.id", "biz.id"];

  const getRdapUrl = (domain: string) => {
    const tld = domain.split(".").slice(1).join(".");
    if (tld === "com")
      return `https://rdap.verisign.com/com/v1/domain/${domain}`;
    if (tld.endsWith("id"))
      return `https://rdap.pandi.id/rdap/domain/${domain}`;
    return `https://rdap.org/domain/${domain}`;
  };

  const checkDomainAvailability = async (
    domainToCheck: string
  ): Promise<boolean | null> => {
    try {
      const response = await fetch(getRdapUrl(domainToCheck), {
        method: "GET",
        headers: { Accept: "application/rdap+json, application/json" },
      });
      if (response.status === 200) return false;
      if (response.status === 404) return true;
      return null;
    } catch {
      return null;
    }
  };

  const handleCheck = async () => {
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) {
      setErrorMsg("Silakan masukkan nama domain terlebih dahulu.");
      setResults([]);
      return;
    }

    setErrorMsg("");
    setLoading(true);
    const baseName = trimmed.split(".")[0];

    try {
      const checkPromises = tlds.map(async (tld) => {
        const domainToCheck = `${baseName}.${tld}`;
        const available = await checkDomainAvailability(domainToCheck);
        return { domain: domainToCheck, available };
      });

      const res = await Promise.all(checkPromises);
      setResults(res);
    } catch {
      setErrorMsg("Gagal terhubung ke layanan RDAP. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 w-full max-w-4xl bg-white rounded-3xl border border-slate-200 text-left overflow-hidden shadow-xl relative backdrop-blur-md">
      {/* Header */}
      <div className="px-5 sm:px-6 py-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block animate-pulse"></span>
              Cek Ketersediaan Domain
            </h2>
            <p className="text-xs text-slate-600 mt-1">
              Pastikan nama domain impian Anda masih tersedia sebelum kehabisan.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-700 bg-red-50 border border-red-200 px-3 py-1 rounded-full whitespace-nowrap shadow-sm">
            <svg
              className="w-3.5 h-3.5 text-red-600"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Gratis SSL & Hosting
          </span>
        </div>
      </div>

      {/* Input + Button */}
      <div className="px-5 sm:px-6 py-5 bg-white">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCheck()}
            placeholder="contoh: sayursuper"
            className="w-full px-4 py-3 rounded-full bg-slate-50 border border-slate-300 focus:border-red-500 focus:ring-1 focus:ring-red-500 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm font-medium"
          />
          <button
            type="button"
            onClick={handleCheck}
            disabled={loading}
            className="px-6 py-3 bg-red-600 text-white font-bold rounded-full hover:bg-red-700 active:scale-[0.98] transition-all text-sm whitespace-nowrap disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-md shadow-red-600/20"
          >
            {loading ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Memeriksa
              </>
            ) : (
              "Cari Domain"
            )}
          </button>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mt-3 px-3 py-2.5 text-xs text-red-600 bg-red-50 rounded-xl border border-red-200 flex items-center gap-2 font-medium">
            <svg
              className="w-4 h-4 shrink-0 text-red-500"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {errorMsg}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="mt-3 flex items-center gap-2 text-xs text-slate-600 font-medium">
            <span className="w-3.5 h-3.5 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            Memeriksa ketersediaan domain via RDAP...
          </div>
        )}
      </div>

      {/* Hasil */}
      {results.length > 0 && !loading && (
        <div className="px-5 sm:px-6 pb-5 bg-white border-t border-slate-100 pt-4">
          <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
            Hasil Pencarian
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {results.map((item, idx) => {
              const waCheckoutLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(
                `Halo KerabatWeb, saya ingin memesan pembuatan website dengan domain *${item.domain}* yang statusnya tersedia.`
              )}`;

              const isAvailable = item.available === true;
              const isTaken = item.available === false;

              return (
                <div
                  key={idx}
                  className={`relative flex flex-col justify-between p-4 rounded-2xl border transition-all ${
                    isAvailable
                      ? "border-red-300 bg-red-50/40 hover:border-red-400 shadow-sm"
                      : isTaken
                      ? "border-slate-200 bg-slate-50 opacity-60"
                      : "border-amber-200 bg-amber-50/40"
                  }`}
                >
                  {/* Highlight line for available */}
                  {isAvailable && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-red-600 rounded-t-2xl" />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      {/* Status badge */}
                      <span
                        className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isAvailable
                            ? "text-red-700 bg-red-100 border border-red-200"
                            : isTaken
                            ? "text-slate-500 bg-slate-200 border border-slate-300"
                            : "text-amber-700 bg-amber-100 border border-amber-200"
                        }`}
                      >
                        {isAvailable ? (
                          <>
                            <svg
                              className="w-2.5 h-2.5 text-red-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                            Tersedia
                          </>
                        ) : isTaken ? (
                          <>
                            <svg
                              className="w-2.5 h-2.5 text-slate-500"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                            Terdaftar
                          </>
                        ) : (
                          <>
                            <svg
                              className="w-2.5 h-2.5 text-amber-600"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v2m0 4h.01"
                              />
                            </svg>
                            Gangguan
                          </>
                        )}
                      </span>
                    </div>

                    {/* Domain name */}
                    <p
                      className={`text-sm font-bold truncate ${
                        isTaken
                          ? "text-slate-500 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {item.domain}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-3">
                    {isAvailable ? (
                      <a
                        href={waCheckoutLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full py-2 px-3 bg-red-600 hover:bg-red-700 text-white text-[11px] font-bold rounded-full text-center transition-all shadow-sm"
                      >
                        Klaim Domain
                      </a>
                    ) : isTaken ? (
                      <p className="text-[11px] text-slate-500 text-center py-2 font-medium">
                        Tidak tersedia
                      </p>
                    ) : (
                      <p className="text-[11px] text-amber-700 text-center py-2 font-medium">
                        Coba lagi nanti
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer note */}
          <p className="text-[11px] text-slate-500 mt-4 text-center font-medium">
            Data ketersediaan dari RDAP. Konfirmasi akhir via WhatsApp.
          </p>
        </div>
      )}
    </div>
  );
};