import React from "react";
import Link from "next/link";

const ONLINE_DATA = {
  totalSlots: 50,
  remainingSlots: 14,
  registerUrl: "https://bit.ly/DaftarBacaBarengClubGB",
};

export default function ChallengePage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-[#F4FBFF] border border-[#CBEBFF] rounded-3xl p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            ONLINE PROGRAM • VIA ZOOM &amp; WHATSAPP
          </span>
          <span className="bg-amber-200 text-amber-950 text-xs font-extrabold px-4 py-1.5 rounded-full">
            Urgent: Tersisa {ONLINE_DATA.remainingSlots} dari {ONLINE_DATA.totalSlots} Slot
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-4">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Ganti kebiasaan <em>doom scrolling</em> tiap pagi dengan bangun jam 05.00 WIB dan membaca 
          buku bareng selama satu bulan penuh ditemani sistem, mentor, dan komunitas yang suportif.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Jadwal Sesi</span>
            <p className="font-bold text-[#0B2D48] mt-1">Setiap Hari • 05.00 - 06.00 WIB</p>
          </div>
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase">Biaya Pendaftaran</span>
            <p className="font-bold text-[#0B2D48] mt-1">Gratis / Bayar Seikhlasnya</p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-[#0B2D48] mb-4">
          Apa Saja yang Dilakukan &amp; Didapatkan?
        </h2>
        <ul className="space-y-3 text-slate-700 text-sm sm:text-base mb-10">
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>45 Menit Silent Reading (05.00-05.45 WIB):</strong> Membaca buku pilihanmu masing-masing via Zoom dengan kamera menyala agar tetap fokus.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>15 Menit Sharing &amp; Journaling (05.45-06.00 WIB):</strong> Diskusi santai di <em>breakout room</em> untuk membagikan satu pelajaran dari bacaan hari itu.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Pendampingan Mentor &amp; Grup WhatsApp:</strong> Pengingat harian, modul <em>1 Day 1 Insight</em>, sistem leaderboard poin kehadiran, E-Sertifikat, dan hadiah buku bagi peserta teraktif.</span>
          </li>
        </ul>

        <a
          href={ONLINE_DATA.registerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition"
        >
          Isi Form Pendaftaran Online Sekarang →
        </a>
        <p className="text-xs text-center text-slate-500 mt-3">
          Setelah mengisi form, kamu akan mendapatkan panduan onboarding dan link masuk ke grup WhatsApp peserta.
        </p>
      </div>
    </div>
  );
}
