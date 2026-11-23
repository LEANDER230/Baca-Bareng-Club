"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
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

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-12 pb-20 space-y-12 sm:space-y-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-br from-[#E8F7FF] via-[#F4FBFF] to-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-12 text-center">
        <span className="inline-block bg-[#4CC3FA] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-4">
          Komunitas Membaca &amp; Bertumbuh
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] tracking-tight leading-tight max-w-2xl mx-auto">
          Bangun Kebiasaan Membaca Bersama Baca Bareng Club
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-3.5 max-w-xl mx-auto leading-relaxed">
          Ruang aman dan suportif untuk lepas sejenak dari layar gawai, menuntaskan buku bacaan, dan bertemu teman bertumbuh baru.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <a
            href="#program"
            className="w-full sm:w-auto bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-md shadow-[#4CC3FA]/25 transition"
          >
            Pilih Program Sekarang
          </a>
          <a
            href="https://instagram.com/bacabareng.club"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto bg-white hover:bg-[#F4FBFF] text-[#0B2D48] border border-[#CBEBFF] font-bold text-sm sm:text-base px-7 py-3.5 rounded-2xl transition"
          >
            Instagram @bacabareng.club
          </a>
        </div>
      </section>

      {/* DAFTAR PROGRAM (KUOTA REAL-TIME DARI SPREADSHEET) */}
      <section id="program" className="space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-wider text-[#28A9EB]">
              Pendaftaran Terbuka
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] mt-1">
              Program Baca Bareng Club
            </h2>
          </div>
          <p className="text-xs text-slate-500">
            Kuota diperbarui otomatis sesuai ketersediaan slot.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* KARTU 1: 30 DAY CHALLENGE */}
          <div className="bg-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#4CC3FA] transition">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="bg-[#E8F7FF] text-[#0E5A8A] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  Online Program
                </span>
                {loadingQuota ? (
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                    Mengecek slot...
                  </span>
                ) : quota.online.isFull ? (
                  <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full">
                    Kuota Penuh ({quota.online.total}/{quota.online.total})
                  </span>
                ) : (
                  <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full">
                    Tersisa {quota.online.remaining} dari {quota.online.total} Slot
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
                30 Day Morning Reading Challenge
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Bangun pukul 05.00 WIB dan membaca buku bersama via Zoom selama 30 hari penuh ditemani mentor dan sistem pelaporan harian.
              </p>

              <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4 space-y-2 text-xs mb-6">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Jadwal Sesi</span>
                  <span className="font-bold text-[#0B2D48]">Setiap Hari (05.00 – 06.00 WIB)</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Biaya</span>
                  <span className="font-bold text-[#0B2D48]">Gratis / Bayar Seikhlasnya</span>
                </div>
              </div>
            </div>

            <Link
              href="/30-day-challenge"
              className={`block w-full text-center font-extrabold text-sm py-3.5 rounded-2xl transition ${
                !loadingQuota && quota.online.isFull
                  ? "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  : "bg-[#4CC3FA] hover:bg-[#33B5F2] text-white shadow-sm shadow-[#4CC3FA]/25"
              }`}
            >
              {!loadingQuota && quota.online.isFull
                ? "Lihat Detail (Kuota Penuh)"
                : "Daftar 30 Day Challenge →"}
            </Link>
          </div>

          {/* KARTU 2: DIGITAL DETOX */}
          <div className="bg-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:border-[#4CC3FA] transition">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <span className="bg-[#E8F7FF] text-[#0E5A8A] text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full">
                  Offline Event Vol. 6
                </span>
                {loadingQuota ? (
                  <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                    Mengecek kursi...
                  </span>
                ) : quota.offline.isFull ? (
                  <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full">
                    Kuota Penuh ({quota.offline.total}/{quota.offline.total})
                  </span>
                ) : (
                  <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-3 py-1 rounded-full">
                    Sisa {quota.offline.remaining} dari {quota.offline.total} Kursi
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
                Digital Detox: Silent Reading
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-5">
                Tutup sosial media dan nikmati sesi membaca buku fisik secara tenang di ruang terbuka hijau bersama teman-teman baru.
              </p>

              <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4 space-y-2 text-xs mb-6">
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Waktu</span>
                  <span className="font-bold text-[#0B2D48]">Minggu, 22 Nov 2026 (08.00 WIB)</span>
                </div>
                <div className="flex justify-between gap-2">
                  <span className="text-slate-500">Lokasi</span>
                  <span className="font-bold text-[#0B2D48]">Taman Langsat, Jakarta Selatan</span>
                </div>
              </div>
            </div>

            <Link
              href="/digital-detox"
              className={`block w-full text-center font-extrabold text-sm py-3.5 rounded-2xl transition ${
                !loadingQuota && quota.offline.isFull
                  ? "bg-slate-200 text-slate-600 hover:bg-slate-300"
                  : "bg-[#4CC3FA] hover:bg-[#33B5F2] text-white shadow-sm shadow-[#4CC3FA]/25"
              }`}
            >
              {!loadingQuota && quota.offline.isFull
                ? "Lihat Detail (Kuota Penuh)"
                : "Amankan Kursi Sekarang →"}
            </Link>
          </div>
        </div>
      </section>

      {/* NILAI & AKTIVITAS KOMUNITAS */}
      <section className="bg-white border border-slate-200/90 rounded-3xl p-6 sm:p-8">
        <div className="max-w-xl mb-6">
          <span className="text-xs font-extrabold uppercase tracking-wider text-[#28A9EB]">
            Kenapa Bergabung?
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mt-1">
            Lebih dari Sekadar Membaca Sendirian
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-5">
            <h3 className="text-sm font-extrabold text-[#0B2D48] mb-1.5">
              Fokus Tanpa Distraksi
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Sesi membaca terstruktur membantu kamu menyelesaikan halaman demi halaman tanpa terganggu notifikasi ponsel.
            </p>
          </div>

          <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-5">
            <h3 className="text-sm font-extrabold text-[#0B2D48] mb-1.5">
              Diskusi &amp; Refleksi Hangat
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Berbagi sudut pandang dari buku yang sedang dibaca tanpa tekanan dan saling mendukung progres satu sama lain.
            </p>
          </div>

          <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-5">
            <h3 className="text-sm font-extrabold text-[#0B2D48] mb-1.5">
              Lingkungan Suportif
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Terhubung dengan pembaca dari berbagai latar belakang yang sama-sama ingin bertumbuh lewat literasi.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
