import React from "react";
import Link from "next/link";

const ONLINE_DATA = {
  batch: "Batch 12",
  remainingSlots: 0, // Ubah angka ini saat kuota batch berikutnya dibuka
  schedule: "Setiap Hari • 05.00 - 05.45 WIB",
  platform: "Zoom Meeting & WhatsApp Group",
  registerUrl: "https://bit.ly/DaftarBacaBarengClubGB",
};

export default function ChallengePage() {
  const isFull = ONLINE_DATA.remainingSlots <= 0;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-3xl p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            ONLINE PROGRAM • {ONLINE_DATA.batch.toUpperCase()}
          </span>
          {isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Kuota {ONLINE_DATA.batch} Penuh
            </span>
          ) : (
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Tersisa {ONLINE_DATA.remainingSlots} Slot Pendaftaran
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-4">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Program rutin 30 hari untuk membangun kebiasaan bangun pagi dan membaca buku secara konsisten 
          bersama mentor dan teman-teman Growmates dari seluruh Indonesia.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Jadwal Harian</span>
            <p className="font-bold text-[#0B2D48] mt-1">{ONLINE_DATA.schedule}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Platform</span>
            <p className="font-bold text-[#0B2D48] mt-1">{ONLINE_DATA.platform}</p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-[#0B2D48] mb-4">
          Apa Saja yang Kamu Dapatkan?
        </h2>
        <ul className="space-y-3 text-slate-700 text-sm sm:text-base mb-10">
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Morning Reading Session:</strong> Membaca hening bersama setiap pukul 05.00 WIB agar fokus sebelum memulai aktivitas harian.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>1 Day 1 Insight:</strong> Jurnal refleksi harian singkat untuk mengikat intisari bacaan dan bertukar sudut pandang.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Pendampingan Mentor &amp; Accountability Partner:</strong> Grup suportif yang menjaga konsistensi hingga hari ke-30.</span>
          </li>
        </ul>

        {isFull ? (
          <div>
            <div className="block w-full text-center bg-slate-200 text-slate-500 font-extrabold text-lg py-4 rounded-2xl cursor-not-allowed">
              Kuota Batch Ini Sudah Penuh
            </div>
            <p className="text-xs text-center text-slate-500 mt-3">
              Pantau Instagram{" "}
              <a
                href="https://instagram.com/bacabareng.club"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#28A9EB] hover:underline"
              >
                @bacabareng.club
              </a>{" "}
              untuk informasi pembukaan pendaftaran batch berikutnya.
            </p>
          </div>
        ) : (
          <div>
            <a
              href={ONLINE_DATA.registerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition"
            >
              Daftar 30 Day Challenge Sekarang →
            </a>
            <p className="text-xs text-center text-slate-500 mt-3">
              Kamu akan diarahkan ke formulir pendaftaran resmi Baca Bareng Club.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
