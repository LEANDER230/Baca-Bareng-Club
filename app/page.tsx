"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BacaBarengLogo } from "./components/Navbar";
import { fetchQuota } from "./lib/submitRegistration";

export default function HomePage() {
  const [quota, setQuota] = useState({
    online: { total: 50, remaining: 50, isFull: false },
    offline: { total: 20, remaining: 20, isFull: false },
  });
  const [loadingQuota, setLoadingQuota] = useState(true);

  useEffect(() => {
    fetchQuota().then((data) => {
      if (data) {
        setQuota(data);
      }
      setLoadingQuota(false);
    });
  }, []);

  const isOfflineFull = quota.offline.isFull;
  const isOnlineFull = quota.online.isFull;

  return (
    <div className="pb-14 sm:pb-20">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F7FF] via-[#F5FBFF] to-white pt-8 pb-8 sm:pt-14 sm:pb-14">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 grid lg:grid-cols-12 gap-7 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#D4F0FF] text-[#0E5A8A] text-xs font-bold px-3.5 py-1.5 rounded-full mb-4">
              Komunitas Baca &amp; Self-Growth Anak Muda
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#0B2D48] leading-[1.15] tracking-tight mb-4">
              Baca Bareng, <br />
              Tumbuh Bareng, <br />
              <span className="text-[#35B6F5]">Kasih Impact Bareng.</span>
            </h1>

            <p className="text-slate-600 text-sm sm:text-lg leading-relaxed max-w-xl mb-6 sm:mb-8">
              Membaca bukan cuma soal menyelesaikan halaman buku, tapi tentang apa yang bertumbuh 
              di dalam dirimu setelahnya. Yuk, bangun kebiasaan baca yang seru dan konsisten bersama 
              ribuan <strong>Growmates</strong> lainnya.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Link
                href="/30-day-challenge"
                className="bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-bold px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition flex items-center justify-center gap-2"
              >
                <span>Ikut 30 Day Challenge</span>
                <span>→</span>
              </Link>
              <Link
                href="/digital-detox"
                className="bg-white hover:bg-[#F0F9FF] text-[#0B2D48] border border-[#BCE6FF] font-bold px-6 py-3.5 sm:px-7 sm:py-4 rounded-2xl transition flex items-center justify-center gap-2"
              >
                <span>Ikut Digital Detox</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* KARTU IDENTITAS */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#CBEBFF] shadow-lg shadow-[#4CC3FA]/10 p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <BacaBarengLogo size="md" />
                <span className="text-xs font-bold text-[#0E5A8A] bg-[#E8F7FF] px-3 py-1 rounded-full">
                  11+ Batches
                </span>
              </div>

              <h2 className="text-lg sm:text-xl font-extrabold text-[#0B2D48] mb-2.5">
                Kenapa Baca Bareng Club Hadir?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-5">
                Data PISA 2022 mencatat baru <strong>25%</strong> pelajar Indonesia mencapai standar 
                minimum literasi membaca. Kami menciptakan ruang aman agar membaca terasa ringan, 
                menyenangkan, dan relevan bagi generasi muda usia 18–30 tahun.
              </p>

              <div className="grid grid-cols-3 gap-2.5 pt-4 border-t border-[#E8F7FF] text-center">
                <div>
                  <span className="block text-lg sm:text-2xl font-extrabold text-[#0B2D48]">40++</span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 block">Peserta / Batch</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-extrabold text-[#35B6F5]">11+</span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 block">Batch Berjalan</span>
                </div>
                <div>
                  <span className="block text-lg sm:text-2xl font-extrabold text-[#0B2D48]">68,4%</span>
                  <span className="text-[11px] sm:text-xs text-slate-500 mt-0.5 block">Pembaca Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILIH PROGRAM */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-4 pb-10 sm:py-12">
        <div className="max-w-2xl mb-6 sm:mb-8">
          <span className="text-[#35B6F5] font-bold text-xs sm:text-sm uppercase tracking-wider">
            Program Utama
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B2D48] mt-1 mb-2">
            Pilih Ruang Tumbuh Kamu
          </h2>
          <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
            Tersedia kelas rutin online setiap pagi dan sesi tatap muka langsung di taman. Klik kartu program untuk melihat detail lengkapnya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-5 sm:gap-7">
          {/* KARTU 1: 30 DAY CHALLENGE */}
          <Link
            href="/30-day-challenge"
            className="group bg-[#F4FBFF] border-2 border-[#CBEBFF] hover:border-[#4CC3FA] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-lg hover:shadow-[#4CC3FA]/15 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="bg-white text-[#0E5A8A] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
                  ONLINE (ZOOM &amp; WHATSAPP)
                </span>
                {loadingQuota ? (
                  <span className="bg-white text-slate-500 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
                    Memuat slot...
                  </span>
                ) : isOnlineFull ? (
                  <span className="bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full">
                    Kuota Batch Ini Penuh
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full">
                    Sisa {quota.online.remaining} dari {quota.online.total} Slot
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2.5 group-hover:text-[#28A9EB] transition">
                30 Day Morning Reading Challenge
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Bangun jam 05.00 WIB dan baca buku bareng selama 30 hari penuh. Didampingi mentor 
                harian, <em>journaling</em>, <em>1 Day 1 Insight</em>, dan sesi diskusi hangat di pagi hari.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3.5 border-t border-[#D9F1FF]">
              <span className="font-bold text-sm text-[#0E5A8A]">Buka Halaman Program</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#35B6F5] group-hover:bg-[#4CC3FA] group-hover:text-white flex items-center justify-center font-extrabold shadow-2xs transition">
                →
              </span>
            </div>
          </Link>

          {/* KARTU 2: DIGITAL DETOX */}
          <Link
            href="/digital-detox"
            className="group bg-[#F4FBFF] border-2 border-[#CBEBFF] hover:border-[#4CC3FA] rounded-3xl p-6 sm:p-8 shadow-xs hover:shadow-lg hover:shadow-[#4CC3FA]/15 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="bg-white text-[#0E5A8A] text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
                  OFFLINE (TAMAN LANGSAT)
                </span>
                {loadingQuota ? (
                  <span className="bg-white text-slate-500 text-[11px] sm:text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
                    Memuat kursi...
                  </span>
                ) : isOfflineFull ? (
                  <span className="bg-slate-200 text-slate-700 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full">
                    Kuota Batch Ini Penuh
                  </span>
                ) : (
                  <span className="bg-rose-100 text-rose-700 text-[11px] sm:text-xs font-extrabold px-3 py-1 rounded-full">
                    Terbatas! Sisa {quota.offline.remaining} dari {quota.offline.total} Kursi
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2.5 group-hover:text-[#28A9EB] transition">
                Digital Detox: Silent Reading
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                Simpan sejenak ponselmu dan nikmati waktu membaca buku fisik langsung di ruang terbuka 
                hijau bersama teman-teman baru yang suportif.
              </p>
            </div>

            <div className="flex items-center justify-between pt-3.5 border-t border-[#D9F1FF]">
              <span className="font-bold text-sm text-[#0E5A8A]">Buka Halaman Event</span>
              <span className="w-8 h-8 rounded-full bg-white text-[#35B6F5] group-hover:bg-[#4CC3FA] group-hover:text-white flex items-center justify-center font-extrabold shadow-2xs transition">
                →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. TIGA PILAR BACA BARENG CLUB */}
      <section className="bg-[#F4FBFF] py-10 sm:py-14 border-y border-[#DCF2FF]">
        <div className="max-w-6xl mx-auto px-5 sm:px-6">
          <div className="text-center max-w-xl mx-auto mb-7 sm:mb-10">
            <span className="text-[#35B6F5] font-bold text-xs sm:text-sm uppercase tracking-wider">
              Cara Kami Bertumbuh
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] mt-1">
              Tiga Pilar Baca Bareng Club
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9F1FF]">
              <div className="w-9 h-9 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold text-sm flex items-center justify-center mb-3.5">
                01
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0B2D48] mb-1.5">Mindset Baru</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Membaca bukan aktivitas yang kaku atau membosankan, melainkan gaya hidup yang relevan, menyenangkan, dan memperkaya sudut pandang.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9F1FF]">
              <div className="w-9 h-9 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold text-sm flex items-center justify-center mb-3.5">
                02
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0B2D48] mb-1.5">Ruang Memulai</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lingkungan yang ramah dan tanpa penghakiman bagi siapa pun, termasuk bagi kamu yang baru saja ingin memulai kebiasaan membaca dari nol.
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-3xl border border-[#D9F1FF]">
              <div className="w-9 h-9 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold text-sm flex items-center justify-center mb-3.5">
                03
              </div>
              <h3 className="text-base sm:text-lg font-extrabold text-[#0B2D48] mb-1.5">Pendampingan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Konsistensi jauh lebih mudah dijaga ketika dilakukan bersama-sama dengan jadwal teratur, mentor, dan teman seperjalanan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAST COLLABORATORS (PRESISI DI HP & DESKTOP) */}
      <section className="max-w-6xl mx-auto px-5 sm:px-6 pt-10 sm:pt-14">
        <div className="bg-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-11 text-center shadow-xs">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5694BA] mb-6">
            Our Past Collaborators
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4 items-center justify-items-center mb-8">
            {/* Gramedia Digital */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center gap-2 overflow-hidden">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-[#00529C] text-white font-black text-sm flex items-center justify-center">
                G
              </span>
              <div className="text-left leading-none">
                <span className="block font-extrabold text-xs sm:text-sm text-[#00529C]">Gramedia</span>
                <span className="block text-[8px] sm:text-[9px] font-bold tracking-wider text-slate-500 mt-0.5">DIGITAL</span>
              </div>
            </div>

            {/* English Academy by Ruangguru */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center gap-2 overflow-hidden">
              <span className="w-7 h-7 shrink-0 rounded-full bg-[#E11D48] text-white font-black text-[10px] flex items-center justify-center">
                EA
              </span>
              <div className="text-left leading-none">
                <span className="block font-extrabold text-[10px] sm:text-xs text-[#1E1B4B]">ENGLISH ACADEMY</span>
                <span className="block text-[8px] sm:text-[9px] font-semibold text-slate-500 mt-0.5">By Ruangguru</span>
              </div>
            </div>

            {/* MySkill */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#0D9488]">
                MySkill
              </span>
            </div>

            {/* Lemonilo */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-black text-lg sm:text-xl tracking-tight text-[#65A30D]">
                lemonilo
              </span>
            </div>

            {/* Cressida */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-bold text-xs sm:text-base tracking-[0.14em] sm:tracking-[0.2em] text-[#DC2626] uppercase">
                CRESSIDA
              </span>
            </div>

            {/* CRiB */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center gap-2 overflow-hidden">
              <span className="w-7 h-7 shrink-0 rounded-lg bg-[#6D28D9] text-white font-black text-xs flex items-center justify-center">
                C
              </span>
              <span className="font-black text-sm sm:text-base text-[#4C1D95]">CRiB</span>
            </div>

            {/* CoverMake */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-light text-xs sm:text-base tracking-[0.1em] sm:tracking-[0.18em] text-slate-800 uppercase">
                COVER<strong className="font-extrabold">MAKE</strong>
              </span>
            </div>

            {/* Beauvrys */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center gap-2 overflow-hidden">
              <span className="w-7 h-7 shrink-0 rounded-full bg-slate-900 text-white font-serif italic font-bold text-xs flex items-center justify-center">
                B
              </span>
              <span className="font-serif font-bold text-sm sm:text-base text-slate-900">Beauvrys</span>
            </div>

            {/* Ruangguru */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <div className="leading-none text-left">
                <span className="block font-bold text-sm sm:text-base text-[#0891B2]">ruang</span>
                <span className="block font-bold text-sm sm:text-base text-[#0891B2] -mt-1">guru</span>
              </div>
            </div>

            {/* Finetiks */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center gap-2 overflow-hidden">
              <span className="w-6 h-6 shrink-0 rounded-md bg-[#0284C7] text-white font-black text-xs flex items-center justify-center">
                F
              </span>
              <span className="font-extrabold text-xs sm:text-base tracking-wider text-[#0F172A] uppercase">
                FINETIKS
              </span>
            </div>

            {/* Kacamatamoo */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="px-2.5 py-1 rounded-full bg-[#5EEAD4]/35 text-[#0F766E] font-extrabold text-[10px] sm:text-[11px] tracking-wide uppercase">
                KACAMATAMOO
              </span>
            </div>

            {/* Somethinc */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-black text-xs sm:text-sm tracking-[0.14em] sm:tracking-[0.24em] text-slate-950 uppercase">
                SOMETHINC
              </span>
            </div>

            {/* Campina */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="px-3.5 py-1 rounded-full bg-[#1D4ED8] text-amber-300 font-extrabold italic text-sm sm:text-base">
                Campina
              </span>
            </div>

            {/* Bosshire */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden">
              <span className="font-extrabold text-base sm:text-lg text-[#F59E0B]">
                bosshire
              </span>
            </div>

            {/* Glico */}
            <div className="w-full h-14 sm:h-16 px-3 rounded-2xl bg-slate-50/80 border border-slate-100 flex items-center justify-center overflow-hidden col-span-2 sm:col-span-1">
              <span className="font-black italic text-xl sm:text-2xl text-[#E11D48]">
                Glico
              </span>
            </div>
          </div>

          <div className="pt-6 border-t border-[#E8F7FF] flex justify-center">
            <Link
              href="/kolaborasi"
              className="w-full sm:w-auto bg-[#0B2D48] hover:bg-[#123E61] text-white text-sm font-bold px-7 py-3.5 rounded-2xl transition inline-flex items-center justify-center gap-2"
            >
              <span>Kolaborasi Brand &amp; Media Partner</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
