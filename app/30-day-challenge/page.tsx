import React from "react";
import Link from "next/link";

const CHALLENGE_DATA = {
  totalSlots: 50,
  remainingSlots: 0, // Ubah angka ini saat kuota batch berikutnya dibuka
  schedule: "Setiap Hari • 05.00 - 06.00 WIB",
  fee: "Gratis / Bayar Seikhlasnya",
  registerUrl: "https://bit.ly/DaftarBacaBarengClubGB",
};

export default function ChallengePage() {
  const isFull = CHALLENGE_DATA.remainingSlots <= 0;

  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-3xl p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            ONLINE PROGRAM • VIA ZOOM &amp; WHATSAPP
          </span>
          {isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Kuota Batch Ini Penuh ({CHALLENGE_DATA.totalSlots}/{CHALLENGE_DATA.totalSlots} Slot)
            </span>
          ) : (
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Urgent: Tersisa {CHALLENGE_DATA.remainingSlots} dari {CHALLENGE_DATA.totalSlots} Slot
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-4">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Ganti kebiasaan <em>doom scrolling</em> tiap pagi dengan bangun jam 05.00 WIB dan membaca 
          buku bareng selama satu bulan penuh ditemani sistem, mentor, dan komunitas yang 
          suportif.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Jadwal Sesi</span>
            <p className="font-bold text-[#0B2D48] mt-1">{CHALLENGE_DATA.schedule}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Biaya Pendaftaran</span>
            <p className="font-bold text-[#0B2D48] mt-1">{CHALLENGE_DATA.fee}</p>
          </div>
        </div>

        <h2 className="text-xl font-extrabold text-[#0B2D48] mb-4">
          Apa Saja yang Dilakukan &amp; Didapatkan?
        </h2>
        <ul className="space-y-3 text-slate-700 text-sm sm:text-base mb-10">
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>45 Menit Silent Reading (05.00–05.45 WIB):</strong> Membaca buku pilihanmu masing-masing via Zoom Meeting agar fokus dan konsisten setiap pagi.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>15 Menit Sharing &amp; 1 Day 1 Insight:</strong> Berbagi intisari bacaan harian dan berdiskusi hangat bersama teman-teman Growmates.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span><strong>Pendampingan Mentor &amp; Sistem Accountability:</strong> Pemantauan progres harian di grup WhatsApp hingga tuntas 30 hari.</span>
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
              href={CHALLENGE_DATA.registerUrl}
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
