"use client";
import React, { useState } from "react";
import Link from "next/link";

// Logo Resmi Baca Bareng Club. (Persis sesuai referensi: ikon biru langit + teks 3 baris hitam)
export function BacaBarengLogo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const iconSize =
    size === "sm" ? "w-8 h-9" : size === "lg" ? "w-14 h-16" : "w-10 h-11";
  const textSize =
    size === "sm"
      ? "text-[13px] leading-[1.08]"
      : size === "lg"
      ? "text-2xl leading-[1.05]"
      : "text-[15px] leading-[1.06]";

  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        viewBox="0 0 100 116"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSize} shrink-0`}
      >
        {/* Bagian Kanan / Speech Bubble Biru Muda */}
        <path
          d="M16 24C16 20.6863 18.6863 18 22 18H82C85.3137 18 88 20.6863 88 24V90C88 93.3137 85.3137 96 82 96H67L69 112L52 96H22C18.6863 96 16 93.3137 16 90V24Z"
          fill="#8CE0FF"
        />
        {/* Bagian Kiri / Halaman Buku Biru Cerah */}
        <path
          d="M16 24C16 20.4 18.5 17.3 22 16.1L63 3.2C66.5 2.1 70 4.7 70 8.4V75.5C70 78.7 67.9 81.5 64.8 82.4L22.5 95.8C18.9 96.9 16 94.2 16 90.5V24Z"
          fill="#47C2F7"
        />
        {/* Area Overlap Tengah */}
        <path
          d="M16 24C16 20.6863 18.6863 18 22 18H70V75.5C70 78.7 67.9 81.5 64.8 82.4L22.5 95.8C18.9 96.9 16 94.2 16 90.5V24Z"
          fill="#3BB7F5"
          fillOpacity="0.45"
        />
      </svg>

      <div className={`font-extrabold tracking-tight text-slate-900 ${textSize}`}>
        <span className="block">Baca</span>
        <span className="block">Bareng</span>
        <span className="block">Club.</span>
      </div>
    </div>
  );
}

// Logo Resmi Grow Bareng (Ikon Chevron Hijau + Panah Putih + Huruf W Grafik Naik)
export function GrowBarengLogo() {
  return (
    <div className="inline-flex items-center gap-3 select-none">
      {/* Ikon Pohon / Panah Bertumpuk */}
      <svg
        viewBox="0 0 48 56"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-8 h-9 shrink-0"
      >
        {/* Chevron Paling Atas (Hijau Emerald) */}
        <path
          d="M11 20L24 8L37 20"
          stroke="#00B884"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Chevron Tengah (Hijau Tosca Cerah) */}
        <path
          d="M8 31L24 17L40 31"
          stroke="#10C493"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Panah Bawah (Putih Gading) */}
        <path
          d="M8 42L24 27L40 42"
          stroke="#F5F7E8"
          strokeWidth="6.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M24 29V49"
          stroke="#F5F7E8"
          strokeWidth="6.5"
          strokeLinecap="round"
        />
      </svg>

      {/* Tipografi GROW BARENG */}
      <div className="leading-none">
        <div className="flex items-end font-black text-xl tracking-wide text-[#00B884]">
          <span>GRO</span>
          <svg
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-7 h-6 -ml-0.5 mb-[1px]"
          >
            <path
              d="M3 6L8.5 19L15 8L21.5 19L29 2"
              stroke="#00B884"
              strokeWidth="4.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="block text-[9.5px] font-bold tracking-[0.34em] text-[#F5F7E8] mt-1">
          BARENG
        </span>
      </div>
    </div>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* LOGO BACA BARENG CLUB (BERSIH & FOKUS) */}
        <Link href="/" className="hover:opacity-90 transition">
          <BacaBarengLogo size="md" />
        </Link>

        {/* NAVIGASI RAPI */}
        <nav className="hidden md:flex items-center gap-8 text-[15px] font-semibold text-slate-600">
          <Link href="/" className="hover:text-sky-500 transition">
            Beranda
          </Link>
          <Link href="/30-day-challenge" className="hover:text-sky-500 transition">
            30-Day Challenge
          </Link>
          <Link href="/digital-detox" className="hover:text-sky-500 transition">
            Digital Detox
          </Link>
          <Link href="/kolaborasi" className="hover:text-sky-500 transition">
            Kolaborasi Brand
          </Link>
          <Link href="/donasi" className="hover:text-sky-500 transition">
            Donasi &amp; Buku
          </Link>
        </nav>

        {/* TOMBOL AKSI UTAMA */}
        <div className="hidden md:block">
          <Link
            href="/30-day-challenge"
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-sm transition"
          >
            Gabung Sekarang
          </Link>
        </div>

        {/* TOMBOL MENU HP */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100"
          aria-label="Menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* MENU DROPDOWN HP */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 px-6 py-5 space-y-3 text-sm font-semibold text-slate-700">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Beranda
          </Link>
          <Link href="/30-day-challenge" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            30-Day Challenge
          </Link>
          <Link href="/digital-detox" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Digital Detox
          </Link>
          <Link href="/kolaborasi" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Kolaborasi Brand
          </Link>
          <Link href="/donasi" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Donasi &amp; Buku
          </Link>
        </div>
      )}
    </header>
  );
}
