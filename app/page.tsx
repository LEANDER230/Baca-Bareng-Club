import React from "react";
import Link from "next/link";
import { BacaBarengLogo } from "./components/Navbar";

export default function HomePage() {
  return (
    <div>
      {/* 1. HERO SECTION (Gaya Clean Proposal Baca Bareng Club) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sky-50 via-white to-white pt-16 pb-20">
        <div className="max-w-6xl mx-auto px-5 grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 bg-sky-100/80 text-sky-700 text-xs font-bold px-3.5 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 rounded-full bg-sky-500"></span>
              Intellectual Property by Grow Bareng
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-950 leading-[1.12] tracking-tight mb-6">
              Baca Bareng, <br />
              Tumbuh Bareng, <br />
              <span className="text-sky-500">Kasih Impact Bareng.</span>
            </h1>

            <p className="text-slate-600 text-base sm:text-lg leading-relaxed max-w-xl mb-8">
              Membaca bukan cuma tentang menyelesaikan buku, tapi tentang apa yang berubah 
              setelah membacanya. Bangun <em>self-awareness</em> dan kebiasaan positif bersama 
              ribuan <strong>Growmates</strong> di seluruh Indonesia.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/30-day-challenge"
                className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-7 py-4 rounded-2xl shadow-lg shadow-sky-200 transition flex items-center gap-2"
              >
                <span>Ikut 30-Day Challenge</span>
                <span>→</span>
              </Link>
              <Link
                href="/digital-detox"
                className="bg-white hover:bg-sky-50 text-slate-900 border-2 border-slate-200 hover:border-sky-300 font-bold px-7 py-4 rounded-2xl transition flex items-center gap-2"
              >
                <span>Ikut Digital Detox</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* KARTU VISUAL BRANDING DI KANAN */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-3xl border border-sky-100 shadow-xl shadow-sky-100/50 p-8 relative">
              <div className="flex items-center justify-between mb-6">
                <BacaBarengLogo className="w-14 h-16" />
                <span className="text-xs font-bold uppercase tracking-widest text-sky-600 bg-sky-50 px-3 py-1.5 rounded-full">
                  Since 2024 • 11+ Batches
                </span>
              </div>
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                What & Why Baca Bareng?
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed mb-6">
                Data PISA 2022 menunjukkan baru <strong>25%</strong> siswa Indonesia mencapai standar 
                minimum kemampuan membaca. Kami hadir menjadikan membaca sebagai gaya hidup yang 
                relevan, seru, dan reflektif bagi anak muda usia 18–30 tahun.
              </p>
              <div className="grid grid-cols-3 gap-3 pt-5 border-t border-slate-100 text-center">
                <div>
                  <span className="block text-2xl font-extrabold text-sky-500">40++</span>
                  <span className="text-xs text-slate-500 font-medium">Peserta / Batch</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-sky-500">11+</span>
                  <span className="text-xs text-slate-500 font-medium">Batch Terlaksana</span>
                </div>
                <div>
                  <span className="block text-2xl font-extrabold text-sky-500">68,4%</span>
                  <span className="text-xs text-slate-500 font-medium">Pembaca Aktif</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PILIH PROGRAM (KLIK UNTUK PINDAH KE HALAMAN DETAIL MASING-MASING) */}
      <section className="max-w-6xl mx-auto px-5 py-16">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-sky-500 font-bold text-sm uppercase tracking-wider">
              Program Komunitas
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 mt-1">
              Pilih Ruang Tumbuh Kamu
            </h2>
          </div>
          <p className="text-slate-500 text-sm max-w-md">
            Klik salah satu program di bawah ini untuk melihat detail kegiatan, jadwal, sisa kuota, dan link pendaftaran.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* KARTU PROGRAM 1: 30-DAY CHALLENGE -> PINDAH HALAMAN */}
          <Link
            href="/30-day-challenge"
            className="group bg-sky-500 text-white rounded-3xl p-8 sm:p-10 shadow-lg shadow-sky-200/60 hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
                  ONLINE • VIA ZOOM & WHATSAPP
                </span>
                <span className="bg-amber-300 text-slate-950 text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                  Sisa 14 Slot
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                30-Day Morning Reading Challenge
              </h3>
              <p className="text-sky-50 text-sm sm:text-base leading-relaxed mb-8">
                Setiap jam 05.00 – 06.00 WIB baca buku bareng selama satu bulan penuh. 
                Dilengkapi pendampingan mentor harian, modul <em>1 Day 1 Insight</em>, dan sistem leaderboard.
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-sky-400/50">
              <span className="font-bold text-sm">Lihat Detail & Daftar Program</span>
              <span className="w-10 h-10 rounded-full bg-white text-sky-600 flex items-center justify-center font-extrabold group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </Link>

          {/* KARTU PROGRAM 2: DIGITAL DETOX -> PINDAH HALAMAN */}
          <Link
            href="/digital-detox"
            className="group bg-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-lg hover:-translate-y-1 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-6">
                <span className="bg-white/10 text-sky-300 text-xs font-bold px-3.5 py-1.5 rounded-full">
                  OFFLINE • TAMAN SUROPATI
                </span>
                <span className="bg-rose-500 text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                  Terbatas! Sisa 6 dari 20 Kursi
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold mb-3">
                Digital Detox: Silent Reading
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-8">
                Kegiatan membaca buku fisik bersama secara langsung di taman dengan komitmen 
                mengurangi <em>screen time</em>, main <em>bonding games</em>, dan refleksi bareng.
              </p>
            </div>

            <div className="flex items-center justify-between pt-5 border-t border-slate-800">
              <span className="font-bold text-sm text-sky-400">Lihat Detail & Amankan Kursi</span>
              <span className="w-10 h-10 rounded-full bg-sky-500 text-white flex items-center justify-center font-extrabold group-hover:translate-x-1 transition">
                →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* 3. TIGA PILAR HOW WE WORK (DARI BRAND PROPOSAL) */}
      <section className="bg-slate-50 py-16 border-y border-slate-100">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-sky-500 font-bold text-sm uppercase tracking-wider">
              How We Work
            </span>
            <h2 className="text-3xl font-extrabold text-slate-950 mt-1">
              Tiga Hal yang Kami Fokuskan
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white p-7 rounded-2xl border border-slate-200/80">
              <span className="inline-block w-10 h-10 rounded-xl bg-sky-100 text-sky-600 font-extrabold flex items-center justify-center mb-4">
                01
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Mindset</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Membaca bukan aktivitas yang membosankan atau eksklusif, tetapi sebuah <em>lifestyle</em> yang relevan, menyenangkan, dan keren untuk dijalani.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80">
              <span className="inline-block w-10 h-10 rounded-xl bg-sky-100 text-sky-600 font-extrabold flex items-center justify-center mb-4">
                02
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Ruang Memulai</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Menciptakan ruang yang nyaman dan terbuka bagi semua level pembaca, termasuk bagi kamu yang baru ingin memulai kebiasaan membaca.
              </p>
            </div>

            <div className="bg-white p-7 rounded-2xl border border-slate-200/80">
              <span className="inline-block w-10 h-10 rounded-xl bg-sky-100 text-sky-600 font-extrabold flex items-center justify-center mb-4">
                03
              </span>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">Pendampingan</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Memulai membaca mungkin mudah, tetapi membangun konsistensi hingga menemukan ritme dan menikmati prosesnya butuh sistem dan mentor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PAST COLLABORATORS & BRAND PARTNER CTA */}
      <section className="max-w-6xl mx-auto px-5 pt-16">
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
            Dipercaya & Berkolaborasi Bersama
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-slate-700 font-extrabold text-base sm:text-lg mb-8">
            <span>Gramedia Digital</span>
            <span className="text-sky-300">•</span>
            <span>Ruangguru</span>
            <span className="text-sky-300">•</span>
            <span>MySkill</span>
            <span className="text-sky-300">•</span>
            <span>Glico</span>
            <span className="text-sky-300">•</span>
            <span>Somethinc</span>
            <span className="text-sky-300">•</span>
            <span>Lemonilo</span>
            <span className="text-sky-300">•</span>
            <span>Campina</span>
          </div>

          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-center gap-4">
            <p className="text-sm text-slate-600">
              Ingin berkolaborasi sebagai brand partner atau mendukung donasi buku?
            </p>
            <Link
              href="/partner"
              className="bg-sky-500 hover:bg-sky-600 text-white text-sm font-bold px-6 py-3 rounded-xl transition"
            >
              Lihat Paket Kolaborasi & Donasi →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
