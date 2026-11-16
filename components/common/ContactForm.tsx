"use client";

import React, { useState } from "react";

const waNumber = "6285938573419";

export const ContactForm: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [service, setService] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Halo KerabatWeb,\n\nNama: ${name}\nEmail: ${email}\nLayanan: ${service}\n\nPesan:\n${message}`;
    const waLink = `https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`;
    window.open(waLink, "_blank");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Budi Santoso"
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm font-normal shadow-sm"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">Alamat Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="budi@example.com"
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm font-normal shadow-sm"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">Jenis Layanan</label>
        <select
          id="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-900 outline-none transition-all text-sm appearance-none font-normal shadow-sm"
        >
          <option value="" className="bg-white text-slate-400">Pilih Layanan...</option>
          <option value="Landing Page" className="bg-white text-slate-900">Landing Page</option>
          <option value="Company Profile" className="bg-white text-slate-900">Company Profile</option>
          <option value="Toko Online (E-Commerce)" className="bg-white text-slate-900">Toko Online (E-Commerce)</option>
          <option value="Custom / Web App" className="bg-white text-slate-900">Custom / Web App</option>
          <option value="Lainnya" className="bg-white text-slate-900">Lainnya</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wider">Pesan / Kebutuhan Anda</label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan sedikit tentang bisnis dan website yang Anda inginkan..."
          className="w-full px-4 py-3 rounded-xl bg-white border border-slate-300 focus:border-red-600 focus:ring-1 focus:ring-red-600 text-slate-900 placeholder-slate-400 outline-none transition-all text-sm resize-none font-normal shadow-sm"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-red-600 hover:bg-red-700 text-white font-extrabold rounded-full shadow-md shadow-red-600/20 transition-all active:scale-95 text-xs sm:text-sm flex items-center justify-center gap-2 mt-2 cursor-pointer"
      >
        Kirim via WhatsApp
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
};