import React from "react";
import Link from "next/link";

const OFFLINE_DATA = {
  totalSeats: 20,
  remainingSeats: 6,
  location: "Taman Suropati, Jakarta Pusat",
  schedule: "2x Sebulan • Minggu Pagi, 08.00 - 10.15 WIB",
  registerUrl: "https://bit.ly/bacabarengclub5",
};

export default function DigitalDetoxPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-3xl p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            OFFLINE EVENT • TATAP MUKA
          </span>
          <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
            Kuota Ketat! Sisa {OFFLINE_DATA.remainingSeats} dari {OFFLINE_DATA.totalSeats} Kursi
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-4">
          Digital Detox: Silent Reading di Taman
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Rehat sejenak dari notifikasi layar ponsel. Duduk santai di atas tikar taman bersama 
          teman-teman baru untuk membaca buku fisik dan berinteraksi secara hangat tanpa gangguan gawai.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Lokasi Pertemuan</span>
            <p className="font-bold text-[#0B2D48] mt-1">{OFFLINE_DATA.location}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Waktu Pelaksanaan</span>
            <p className="font-bold text-[#0B2D48] mt-1">{OFFLINE_DATA.schedule}</p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-[#0B2D48] mb-4">
          Rangkaian Aktivitas Digital Detox
        </h2>
        <ul className="space-y-3 text-slate-700 text-sm sm:text-base mb-10">
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Komitmen Bebas Layar:</strong> Seluruh peserta mengumpulkan ponsel sementara selama sesi berlangsung agar benar-benar hadir di momen saat ini.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Silent Reading &amp; Self-Reflection:</strong> Membaca buku fisik favorit di udara terbuka yang sejuk dan menuliskan refleksi singkat.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Bonding Games &amp; Tukar Cerita:</strong> Permainan interaktif ringan dan obrolan hangat antar-Growmates.</span>
          </li>
        </ul>

        <a
          href={OFFLINE_DATA.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition"
        >
          Amankan Kursi Digital Detox Sekarang →
        </a>
        <p className="text-xs text-center text-slate-500 mt-3">
          Gratis pendaftaran. Ku
