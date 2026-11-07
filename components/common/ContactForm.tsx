// components/common/ContactForm.tsx
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
        <label htmlFor="name" className="block text-xs font-semibold text-blue-100 mb-1.5">Nama Lengkap</label>
        <input
          type="text"
          id="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Contoh: Budi Santoso"
          className="w-full px-4 py-3 rounded-xl bg-[#001a3d] border border-[#0066f5] focus:border-[#FEBB02] text-white placeholder-gray-500 outline-none transition-all text-sm"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-xs font-semibold text-blue-100 mb-1.5">Alamat Email</label>
        <input
          type="email"
          id="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="budi@example.com"
          className="w-full px-4 py-3 rounded-xl bg-[#001a3d] border border-[#0066f5] focus:border-[#FEBB02] text-white placeholder-gray-500 outline-none transition-all text-sm"
        />
      </div>

      <div>
        <label htmlFor="service" className="block text-xs font-semibold text-blue-100 mb-1.5">Jenis Layanan</label>
        <select
          id="service"
          required
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="w-full px-4 py-3 rounded-xl bg-[#001a3d] border border-[#0066f5] focus:border-[#FEBB02] text-white outline-none transition-all text-sm appearance-none"
        >
          <option value="">Pilih Layanan...</option>
          <option value="Landing Page">Landing Page</option>
          <option value="Company Profile">Company Profile</option>
          <option value="Toko Online (E-Commerce)">Toko Online (E-Commerce)</option>
          <option value="Custom / Web App">Custom / Web App</option>
          <option value="Lainnya">Lainnya</option>
        </select>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-semibold text-blue-100 mb-1.5">Pesan / Kebutuhan Anda</label>
        <textarea
          id="message"
          rows={4}
          required
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ceritakan sedikit tentang bisnis dan website yang Anda inginkan..."
          className="w-full px-4 py-3 rounded-xl bg-[#001a3d] border border-[#0066f5] focus:border-[#FEBB02] text-white placeholder-gray-500 outline-none transition-all text-sm resize-none"
        ></textarea>
      </div>

      <button
        type="submit"
        className="w-full py-3.5 bg-[#FEBB02] hover:bg-[#e0a802] text-[#00224f] font-extrabold rounded-xl shadow-lg transition-all active:scale-95 text-sm flex items-center justify-center gap-2 mt-2"
      >
        Kirim via WhatsApp
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </form>
  );
};