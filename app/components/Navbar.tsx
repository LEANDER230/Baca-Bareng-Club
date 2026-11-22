"use client";
import React, { useState } from "react";
import Link from "next/link";

// Logo Resmi Baca Bareng Club (Buku Terbuka + Gelembung Chat Biru Langit)
export function BacaBarengLogo({ className = "w-9 h-9" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M15 24C15 20.6863 17.6863 18 21 18H82C85.3137 18 88 20.6863 88 24V92C88 95.3137 85.3137 98 82 98H66L68 114L51 98H21C17.6863 98 15 95.3137 15 92V24Z"
        fill="#7DD3FC"
        fillOpacity="0.75"
      />
      <path
        d="M15 24C15 20.5 17.5 17.5 20.8 16.2L63.5 3.5C66.8 2.5 70 5 70 8.5V77.5C70 80.5 68 83.2 65.1 84.1L21.5 97.5C18 98.5 15 95.9 15 92.3V24Z"
        fill="#38BDF8"
      />
    </svg>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-sky-100">
      <div className="max-w-6xl mx-auto px-5 py-4 flex items-center justify-between">
        {/* LOGO + BRAND NAME */}
        <Link href="/" className="flex items-center gap-3 group">
          <BacaBarengLogo className="w-9 h-10 transition-transform group-hover:scale-105" />
          <div className="leading-none">
            <span className="block font-extrabold text-lg text-slate-900 tracking-tight">
              Baca Bareng
            </span>
            <span className="block font-extrabold text-lg text-sky-500 tracking-tight">
              Club.
            </span>
          </div>
        </Link>

        {/* MENU DESKTOP (KOLABORASI & DONASI SUDAH DIPISAH) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-semibold text-slate-600">
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
            Donasi & Buku
          </Link>
        </nav>

        {/* TOMBOL KANAN */}
        <div className="hidden md:flex items-center gap-3">
          <Link
            href="/30-day-challenge"
            className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-5 py-2.5 rounded-full shadow-sm shadow-sky-200 transition"
          >
            Mulai Baca Bareng
          </Link>
        </div>

        {/* TOMBOL MENU HP */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded-lg text-slate-700 hover:bg-sky-50"
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

      {/* DROPDOWN MENU HP */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-sky-100 px-5 py-4 space-y-3 text-sm font-semibold text-slate-700">
          <Link href="/" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Beranda
          </Link>
          <Link href="/30-day-challenge" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            30-Day Challenge (Online)
          </Link>
          <Link href="/digital-detox" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Digital Detox (Offline)
          </Link>
          <Link href="/kolaborasi" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Kolaborasi Brand
          </Link>
          <Link href="/donasi" onClick={() => setMenuOpen(false)} className="block py-1.5 hover:text-sky-500">
            Donasi & Sumbang Buku
          </Link>
        </div>
      )}
    </header>
  );
}
