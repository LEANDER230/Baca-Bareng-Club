import React from "react";

// =========================================================================
// PENGATURAN KONTEN, KUOTA & LINK (Ubah bagian ini kapan saja dengan mudah)
// =========================================================================
const SITE_CONFIG = {
  onlineChallenge: {
    batchName: "Batch Terbaru — 30-Day Morning Reading Challenge",
    schedule: "Setiap Hari • Pukul 05.00 – 06.00 WIB (via Zoom)",
    totalSlots: 50,
    remainingSlots: 14, // <-- Ubah angka ini untuk update sisa kuota online
    registerUrl: "https://bit.ly/DaftarBacaBarengClubGB",
  },
  offlineDetox: {
    eventName: "Digital Detox: Silent Reading di Taman",
    schedule: "2x Sebulan • Minggu Pagi, 08.00 – 10.15 WIB",
    location: "Taman Suropati, Jakarta Pusat",
    totalSeats: 20,
    remainingSeats: 6, // <-- Ubah angka ini untuk update sisa kursi offline
    registerUrl: "https://bit.ly/bacabarengclub5",
  },
  support: {
    donationUrl: "https://bit.ly/DaftarBacaBarengClubGB",
    bookDonationUrl: "https://wa.me/6285694057352?text=Halo%20Admin%20Baca%20Bareng%20Club,%20saya%20ingin%20menyumbang%20buku",
    brandPartnerUrl: "https://wa.me/6285694057352?text=Halo%20Tim%20Grow%20Bareng,%20kami%20tertarik%20kolaborasi%20brand%20dengan%20Baca%20Bareng%20Club",
  },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <span className="font-bold text-xl text-sky-600 tracking-tight">
              Baca Bareng Club.
            </span>
            <span className="block text-xs text-slate-500">
              by Grow Bareng
            </span>
          </div>
          <nav className="hidden sm:flex gap-6 text-sm font-medium text-slate-600">
            <a href="#program" className="hover:text-sky-600 transition">Program</a>
            <a href="#dukungan" className="hover:text-sky-600 transition">Donasi & Buku</a>
            <a href="#kolaborasi" className="hover:text-sky-600 transition">Brand Partner</a>
          </nav>
          <a
            href="#program"
            className="bg-sky-600 hover:bg-sky-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition"
          >
            Gabung Growmates
          </a>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-16 text-center">
        <span className="inline-block bg-sky-100 text-sky-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
          Komunitas Literasi & Self-Growth Anak Muda
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-5">
          Bukan Cuma Menyelesaikan Buku, <br className="hidden sm:inline" />
          Tapi <span className="text-sky-600">Tumbuh Bareng</span> Setelah Membacanya.
        </h1>
        <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg mb-8 leading-relaxed">
          Bangun kebiasaan membaca yang konsisten bersama para <strong>Growmates</strong>. 
          Pilih ruang belajarmu: tantangan membaca rutin setiap pagi secara online atau 
          detoks layar gawai langsung di taman.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <a
            href="#online"
            className="bg-sky-600 hover:bg-sky-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-sm transition"
          >
            Ikut 30-Day Challenge (Online)
          </a>
          <a
            href="#offline"
            className="bg-white hover:bg-slate-100 text-slate-800 border border-slate-300 font-semibold px-6 py-3.5 rounded-xl transition"
          >
            Ikut Digital Detox (Offline)
          </a>
        </div>
      </section>

      {/* PROGRAM SECTION (ONLINE & OFFLINE) */}
      <section id="program" className="max-w-5xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
            Pilih Ruang Baca Bareng Kamu
          </h2>
          <p className="text-slate-600 mt-2">
            Gratis / Bayar Seikhlasnya. Amankan kuotamu sebelum pendaftaran ditutup.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* KARTU 1: ONLINE 30-DAY CHALLENGE */}
          <div
            id="online"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Online • Zoom & WhatsApp
                </span>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-3 py-1 rounded-full">
                  Sisa {SITE_CONFIG.onlineChallenge.remainingSlots} / {SITE_CONFIG.onlineChallenge.totalSlots} Slot
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                30-Day Morning Reading Challenge
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                {SITE_CONFIG.onlineChallenge.schedule}
              </p>

              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Ganti kebiasaan <em>doom scrolling</em> pagi hari dengan membaca buku bersama 
                selama satu bulan penuh ditemani sistem dan mentor:
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span><strong>45 Menit Silent Reading</strong> via Zoom (On-Cam membangun fokus).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span><strong>15 Menit Sharing & Journaling</strong> di breakout room interaktif.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-sky-600 font-bold">✓</span>
                  <span><strong>Grup WhatsApp Mentor,</strong> modul <em>1 Day 1 Insight</em>, Leaderboard, & E-Sertifikat.</span>
                </li>
              </ul>
            </div>

            <div>
              <a
                href={SITE_CONFIG.onlineChallenge.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3.5 rounded-xl transition"
              >
                Daftar 30-Day Challenge →
              </a>
              <p className="text-xs text-center text-slate-400 mt-2.5">
                Link grup WhatsApp & panduan onboarding dikirim setelah mengisi form.
              </p>
            </div>
          </div>

          {/* KARTU 2: OFFLINE DIGITAL DETOX */}
          <div
            id="offline"
            className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Offline • Tatap Muka
                </span>
                <span className="bg-rose-100 text-rose-700 text-xs font-bold px-3 py-1 rounded-full">
                  Terbatas! Sisa {SITE_CONFIG.offlineDetox.remainingSeats} dari {SITE_CONFIG.offlineDetox.totalSeats} Kursi
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {SITE_CONFIG.offlineDetox.eventName}
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                {SITE_CONFIG.offlineDetox.schedule} • {SITE_CONFIG.offlineDetox.location}
              </p>

              <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                Rehat sejenak dari notifikasi layar ponsel. Duduk santai di atas tikar taman 
                untuk membaca buku fisik dan berinteraksi langsung tanpa gangguan gawai:
              </p>

              <ul className="space-y-2.5 text-sm text-slate-700 mb-6">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Komitmen Bebas Layar:</strong> Ponsel dikumpulkan sementara selama sesi membaca.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Silent Reading & Self-Reflection</strong> di ruang terbuka hijau.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span><strong>Bonding Games & Tukar Cerita</strong> hangat bersama teman baru.</span>
                </li>
              </ul>
            </div>

            <div>
              <a
                href={SITE_CONFIG.offlineDetox.registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3.5 rounded-xl transition"
              >
                Amankan Kursi Digital Detox →
              </a>
              <p className="text-xs text-center text-slate-400 mt-2.5">
                Gratis pendaftaran. Kuota ketat maksimal 20 orang agar diskusi tetap intim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DUKUNGAN & SUMBANG BUKU SECTION */}
      <section id="dukungan" className="max-w-5xl mx-auto px-4 py-12">
        <div className="bg-sky-900 text-white rounded-3xl p-8 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-sky-300 text-xs font-bold uppercase tracking-wider">
              Dukung Gerakan Literasi
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold mt-2 mb-4">
              Bantu Baca Bareng Club Terus Bergerak
            </h2>
            <p className="text-sky-100 text-sm leading-relaxed mb-4">
              Seluruh program kami dapat diikuti secara <strong>gratis / bayar seikhlasnya</strong>. 
              Kontribusi dana dan buku dari kamu digunakan sepenuhnya untuk operasional Zoom, 
              alat desain, serta ongkos kirim hadiah buku bagi para Growmates pemenang tantangan.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <a
              href={SITE_CONFIG.support.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-center py-3.5 px-6 rounded-xl transition"
            >
              Donasi Operasional (Seikhlasnya)
            </a>
            <a
              href={SITE_CONFIG.support.bookDonationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-800 hover:bg-sky-700 border border-sky-600 text-white font-semibold text-center py-3.5 px-6 rounded-xl transition"
            >
              Sumbang Buku Fisik untuk Komunitas
            </a>
          </div>
        </div>
      </section>

      {/* BRAND COLLABORATION SECTION */}
      <section id="kolaborasi" className="max-w-5xl mx-auto px-4 py-12 text-center">
        <div className="bg-white border border-slate-200 rounded-2xl p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
            Kolaborasi Brand & Sponsorship
          </h2>
          <p className="text-slate-600 text-sm max-w-2xl mx-auto mb-6">
            Jangkau audiens aktif usia 18–30 tahun yang peduli pada pengembangan diri dan literasi. 
            Tersedia paket <em>Product Experience</em>, <em>Special Voucher</em>, hingga <em>Collaboration Post</em>.
          </p>
          <a
            href={SITE_CONFIG.support.brandPartnerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-6 py-3 rounded-xl transition"
          >
            Hubungi Tim Partnership via WhatsApp
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <p className="font-semibold text-slate-700 mb-1">
          Baca Bareng Club — Intellectual Property by Grow Bareng
        </p>
        <p>Instagram: @bacabareng.club • www.growbarengplatform.com</p>
      </footer>
    </div>
  );
}
