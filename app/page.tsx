import React from "react";
import Link from "next/link";
import { BacaBarengLogo } from "./components/Navbar";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION (GRADASI BIRU LANGIT LEMBUT SESUAI LOGO) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#E8F7FF] via-[#F5FBFF] to-white pt-16 pb-24">
        <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <span className="inline-block bg-[#D4F0FF] text-[#0E5A8A] text-xs font-bold px-4 py-1.5 rounded-full mb-6">
              Komunitas Baca &amp; Self-Growth Anak Muda
            </span>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-[#0B2D48] leading-[1.12] tracking-tight mb-6">
              Baca Bareng, <br />
              Tumbuh Bareng, <br />
              <span className="text-[#35B6F5]">Kasih Impact Bareng.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-9">
              Membaca bukan cuma soal menyelesaikan halaman buku, tapi tentang apa yang bertumbuh 
              di dalam dirimu setelahnya. Yuk, bangun kebiasaan baca yang seru dan konsisten bersama 
              ribuan <strong>Growmates</strong> lainnya.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                href="/30-day-challenge"
                className="bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/35 transition flex items-center gap-2"
              >
                <span>Ikut 30-Day Challenge</span>
                <span>→</span>
              </Link>
              <Link
                href="/digital-detox"
                className="bg-white hover:bg-[#F0F9FF] text-[#0B2D48] border border-[#BCE6FF] font-bold px-8 py-4 rounded-2xl transition flex items-center gap-2"
              >
                <span>Ikut Digital Detox</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* KARTU IDENTITAS DENGAN AKSEN BIRU LOGO */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-[#CBEBFF] shadow-xl shadow-[#4CC3FA]/15 p-8 sm:p-9">
              <div className="flex items-center justify-between mb-7">
                <BacaBarengLogo size="md" />
                <span className="text-xs font-bold text-[#0E5A8A] bg-[#E8F7FF] px-3.5 py-1.5 rounded-full">
                  11+ Batches
                </span>
              </div>

              <h2 className="text-xl font-extrabold text-[#0B2D48] mb-3">
                Kenapa Baca Bareng Club Hadir?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-7">
                Data PISA 2022 mencatat baru <strong>25%</strong> pelajar Indonesia mencapai standar 
                minimum literasi membaca. Kami menciptakan ruang aman agar membaca terasa ringan, 
                menyenangkan, dan relevan bagi generasi muda usia 18-30 tahun.
              </p>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#E8F7FF] text-center">
                <div>
                  <span className="block text-2xl font-extrabold text-[#0B2D48]">40++</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Peserta / Batch</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-[#35B6F5]">11+</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Batch Berjalan</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-[#0B2D48]">68,4%</span>
                  <span className="text-xs text-slate-500 mt-0.5 block">Pembaca Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILIH PROGRAM (TONE BIRU LANGIT CERAH & LEMBUT) */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="max-w-2xl mb-12">
          <span className="text-[#35B6F5] font-bold text-sm uppercase tracking-wider">
            Program Utama
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B2D48] mt-1.5 mb-3">
            Pilih Ruang Tumbuh Kamu
          </h2>
          <p className="text-slate-500 text-base">
            Tersedia kelas rutin online setiap pagi dan sesi tatap muka langsung di taman. Klik kartu program untuk melihat detail lengkapnya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* KARTU 1: ONLINE */}
          <Link
            href="/30-day-challenge"
            className="group bg-[#F4FBFF] border-2 border-[#CBEBFF] hover:border-[#4CC3FA] rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:shadow-[#4CC3FA]/15 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <span className="bg-white text-[#0E5A8A] text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#CBEBFF]">
                  ONLINE • ZOOM &amp; WHATSAPP
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                  Sisa 14 Slot
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] mb-3 group-hover:text-[#28A9EB] transition">
                30-Day Morning Reading Challenge
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Bangun jam 05.00 WIB dan baca buku bareng selama 30 hari penuh. Didampingi mentor 
                harian, jurnal <em>1 Day 1 Insight</em>, dan sesi diskusi hangat di pagi hari.
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-[#D9F1FF]">
              <span className="font-bold text-sm text-[#0E5A8A]">Buka Halaman Program</span>
              <span className="w-10 h-10 rounded-full bg-white text-[#35B6F5] group-hover:bg-[#4CC3FA] group-hover:text-white flex items-center justify-center font-extrabold shadow-xs transition">
                →
              </span>
            </div>
          </Link>

          {/* KARTU 2: OFFLINE */}
          <Link
            href="/digital-detox"
            className="group bg-white border-2 border-[#E2F2FC] hover:border-[#0B2D48] rounded-3xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:shadow-slate-200/60 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-6">
                <span className="bg-[#E8F7FF] text-[#0E5A8A] text-xs font-bold px-3.5 py-1.5 rounded-full">
                  OFFLINE • TAMAN SUROPATI
                </span>
                <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                  Terbatas! Sisa 6 dari 20 Kursi
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] mb-3">
                Digital Detox: Silent Reading
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
                Simpan sejenak ponselmu dan nikmati waktu membaca buku fisik langsung di ruang terbuka 
                hijau bersama teman-teman baru yang suportif.
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-100">
              <span className="font-bold text-sm text-[#0B2D48]">Buka Halaman Event</span>
              <span className="w-10 h-10 rounded-full bg-[#E8F7FF] text-[#0B2D48] group-hover:bg-[#0B2D48] group-hover:text-white flex items-center justify-center font-extrabold transition">
                →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. TIGA PILAR BACA BARENG CLUB */}
      <section className="bg-[#F4FBFF] py-20 border-y border-[#DCF2FF]">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[#35B6F5] font-bold text-sm uppercase tracking-wider">
              Cara Kami Bertumbuh
            </span>
            <h2 className="text-3xl font-extrabold text-[#0B2D48] mt-1.5">
              Tiga Pilar Baca Bareng Club
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-7">
            <div className="bg-white p-8 rounded-3xl border border-[#D9F1FF]">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold flex items-center justify-center mb-5">
                01
              </div>
              <h3 className="text-lg font-extrabold text-[#0B2D48] mb-2">Mindset Baru</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Membaca bukan aktivitas yang kaku atau membosankan, melainkan gaya hidup yang relevan, menyenangkan, dan memperkaya sudut pandang.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D9F1FF]">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold flex items-center justify-center mb-5">
                02
              </div>
              <h3 className="text-lg font-extrabold text-[#0B2D48] mb-2">Ruang Memulai</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Lingkungan yang ramah dan tanpa penghakiman bagi siapa pun, termasuk bagi kamu yang baru saja ingin memulai kebiasaan membaca dari nol.
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-[#D9F1FF]">
              <div className="w-11 h-11 rounded-2xl bg-[#E8F7FF] text-[#28A9EB] font-extrabold flex items-center justify-center mb-5">
                03
              </div>
              <h3 className="text-lg font-extrabold text-[#0B2D48] mb-2">Pendampingan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Konsistensi jauh lebih mudah dijaga ketika dilakukan bersama-sama dengan jadwal teratur, mentor, dan teman seperjalanan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KOLABORATOR & AJAKAN KERJASAMA */}
      <section className="max-w-6xl mx-auto px-6 pt-20">
        <div className="bg-white border border-[#CBEBFF] rounded-3xl p-8 sm:p-14 text-center shadow-sm">
          <p className="text-xs font-bold uppercase tracking-widest text-[#5694BA] mb-5">
            Dipercaya &amp; Berkolaborasi Bersama
          </p>
          <div className="flex flex-wrap justify-center gap-x-9 gap-y-3 text-[#0B2D48] font-extrabold text-base sm:text-lg mb-10">
            <span>Gramedia Digital</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>Ruangguru</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>MySkill</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>Glico</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>Somethinc</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>Lemonilo</span>
            <span className="text-[#4CC3FA]">•</span>
            <span>Campina</span>
          </div>

          <div className="pt-8 border-t border-[#E8F7FF] grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            <Link
              href="/kolaborasi"
              className="bg-[#0B2D48] hover:bg-[#123E61] text-white text-sm font-bold px-6 py-4 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Kolaborasi Brand &amp; Media Partner</span>
              <span>→</span>
            </Link>
            <Link
              href="/donasi"
              className="bg-[#E8F7FF] hover:bg-[#D4F0FF] text-[#0E5A8A] border border-[#BCE6FF] text-sm font-bold px-6 py-4 rounded-2xl transition flex items-center justify-center gap-2"
            >
              <span>Donasi &amp; Sumbang Buku</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
