import React from "react";
import Link from "next/link";

// Ubah angka kursi & link pendaftaran offline di sini
const OFFLINE_DATA = {
  totalSeats: 20,
  remainingSeats: 6,
  location: "Taman Suropati, Jakarta Pusat",
  schedule: "2x Sebulan • Minggu Pagi, 08.00 – 10.15 WIB",
  registerUrl: "https://bit.ly/bacabarengclub5",
};

export default function DigitalDetoxPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-sky-600 hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-slate-900 text-white rounded-3xl p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-sky-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            OFFLINE EVENT • TATAP MUKA
          </span>
          <span className="bg-rose-500 text-white text-xs font-extrabold px-4 py-1.5 rounded-full">
            Kuota Ketat! Sisa {OFFLINE_DATA.remainingSeats} dari {OFFLINE_DATA.totalSeats} Kursi
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight mb-4">
          Digital Detox: Silent Reading di Taman
        </h1>
        <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8">
          Rehat sejenak dari notifikasi layar ponsel. Duduk santai di atas tikar taman bersama 
          teman-teman baru untuk membaca buku fisik dan berinteraksi secara hangat tanpa gangguan gawai.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-slate-800/80 p-6 rounded-2xl border border-slate-700 mb-8">
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase">Lokasi Pertemuan</span>
            <p className="font-bold text-white mt-1">{OFFLINE_DATA.location}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-sky-400 uppercase">Waktu Pelaksanaan</span>
            <p className="font-bold text-white mt-1">{OFFLINE_DATA.schedule}</p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-white mb-4">
          Rangkaian Aktivitas Digital Detox
        </h2>
        <ul className="space-y-3 text-slate-200 text-sm sm:text-base mb-10">
          <li className="flex items-start gap-3">
            <span className="text-sky-400 font-extrabold">✓</span>
            <span><strong>Komitmen Bebas Layar:</strong> Seluruh peserta mengumpulkan ponsel sementara selama sesi berlangsung agar benar-benar hadir di momen saat ini.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-sky-400 font-extrabold">✓</span>
            <span><strong>Silent Reading & Self-Reflection:</strong> Membaca buku fisik favorit di udara terbuka yang sejuk dan menuliskan refleksi singkat.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-sky-400 font-extrabold">✓</span>
            <span><strong>Bonding Games & Tukar Cerita:</strong> Permainan interaktif ringan dan obrolan hangat antar-Growmates.</span>
          </li>
        </ul>

        <a
          href={OFFLINE_DATA.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold text-lg py-4 rounded-2xl transition"
        >
          Amankan Kursi Digital Detox Sekarang →
        </a>
        <p className="text-xs text-center text-slate-400 mt-3">
          Gratis pendaftaran. Kuota dibatasi maksimal 20 orang agar suasana diskusi tetap intim dan nyaman.
        </p>
      </div>
    </div>
  );
}
