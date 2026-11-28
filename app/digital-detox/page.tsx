"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchQuota,
  fileToPayload,
  getCachedQuota,
  submitToSheet,
} from "../lib/submitRegistration";

const MENTOR_WA_NUMBER = "6285694057352";

const SUMBER_INFO_OPTIONS = [
  "Instagram @bacabareng.club",
  "TikTok / Reels",
  "Teman / Komunitas",
  "Alumni Batch Sebelumnya",
];

export default function DigitalDetoxPage() {
  const [quota, setQuota] = useState({ total: 20, remaining: 20, isFull: false });
  const [loadingQuota, setLoadingQuota] = useState(true);

  const [step, setStep] = useState<1 | 2>(1);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sumberInfo, setSumberInfo] = useState("Instagram @bacabareng.club");
  const [harapan, setHarapan] = useState("");
  const [donasiBuku, setDonasiBuku] = useState<"ya" | "tidak">("tidak");
  const [detailBuku, setDetailBuku] = useState("");
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const cached = getCachedQuota();
    if (cached?.offline) {
      setQuota(cached.offline);
      setLoadingQuota(false);
    }

    fetchQuota().then((data) => {
      if (data?.offline) setQuota(data.offline);
      setLoadingQuota(false);
    });
  }, []);

  useEffect(() => {
    if (!loading) {
      setLoadingStep(0);
      return;
    }
    const t1 = setTimeout(() => setLoadingStep(1), 900);
    const t2 = setTimeout(() => setLoadingStep(2), 2100);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [loading]);

  function getMentorWhatsAppUrl() {
    const participantName = nama.trim() || "Calon Peserta";
    const participantEmail = email.trim() ? ` (${email.trim()})` : "";
    const message = `Halo Kak Mentor, saya ${participantName}${participantEmail}. Saya sudah daftar Digital Detox Vol. 7 Baca Bareng Club, mau tanya terkait pendaftaran saya.`;
    return `https://wa.me/${MENTOR_WA_NUMBER}?text=${encodeURIComponent(message)}`;
  }

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!nama.trim() || !email.trim() || !whatsapp.trim() || !harapan.trim()) {
      setErrorMsg("Lengkapi dulu semua data diri di langkah pertama sebelum lanjut.");
      return;
    }
    if (donasiBuku === "ya" && !detailBuku.trim()) {
      setErrorMsg("Tulis dulu judul atau jenis buku yang mau kamu donasikan.");
      return;
    }
    setStep(2);
  }

  async function handleFinalSubmit() {
    setErrorMsg("");
    if (!paymentFile) {
      setErrorMsg("Unggah dulu bukti transfer QRIS Rp25.000 untuk mengunci kursi.");
      return;
    }

    try {
      setLoading(true);
      const paymentPayload = await fileToPayload(paymentFile);

      await submitToSheet({
        program: "digital-detox",
        nama,
        email,
        whatsapp,
        sumberInfo,
        harapan,
        detailBuku: donasiBuku === "ya" ? detailBuku : "Tidak membawa donasi buku",
        paymentFile: paymentPayload,
      });

      setSubmitted(true);
      fetchQuota().then((updated) => {
        if (updated?.offline) setQuota(updated.offline);
      });
    } catch (err) {
      const detail =
        err instanceof Error
          ? err.message
          : "Koneksi sempat terputus. Silakan coba kirim ulang.";
      setErrorMsg(`Pendaftaran belum terkirim: ${detail}`);
    } finally {
      setLoading(false);
    }
  }

  const processSteps = [
    "Memeriksa file lampiran",
    "Menyimpan data pendaftaran",
    "Menyiapkan pengiriman email welcoming",
  ];

  const usedCount = Math.max(0, quota.total - quota.remaining);
  const fillPercentage =
    quota.total > 0 ? Math.min(100, Math.round((usedCount / quota.total) * 100)) : 0;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-5 sm:pt-10 pb-24">
      {/* OVERLAY ANIMASI PENGIRIMAN */}
      {loading && (
        <div className="fixed inset-0 z-50 bg-[#0B2D48]/45 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl shadow-2xl max-w-sm w-full p-7 text-center">
            <div className="relative w-14 h-14 mx-auto mb-5">
              <div className="absolute inset-0 rounded-full border-4 border-[#E1F3FF]" />
              <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#28A9EB] border-r-[#4CC3FA] animate-spin" />
              <div className="absolute inset-2.5 rounded-full bg-[#F4FBFF] flex items-center justify-center">
                <span className="w-2 h-2 rounded-full bg-[#28A9EB] animate-ping" />
              </div>
            </div>

            <h3 className="text-base font-extrabold text-[#0B2D48] tracking-tight">
              Sedang Mengirim Pendaftaran
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Tunggu sebentar ya, jangan tutup halaman ini dulu.
            </p>

            <div className="space-y-2 text-left bg-slate-50 rounded-2xl p-3.5 border border-slate-100">
              {processSteps.map((label, idx) => {
                const isDone = loadingStep > idx;
                const isCurrent = loadingStep === idx;
                return (
                  <div key={label} className="flex items-center gap-2.5 text-xs">
                    {isDone ? (
                      <span className="w-4 h-4 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                        <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                          <path
                            d="M2.5 6L5 8.5L9.5 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    ) : isCurrent ? (
                      <span className="w-4 h-4 rounded-full border-2 border-[#28A9EB] border-t-transparent animate-spin shrink-0" />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-slate-300 bg-white shrink-0" />
                    )}
                    <span
                      className={
                        isDone
                          ? "font-semibold text-slate-600"
                          : isCurrent
                          ? "font-bold text-[#0B2D48]"
                          : "text-slate-400"
                      }
                    >
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* NAVIGASI KEMBALI */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#28A9EB] hover:text-[#0B2D48] transition mb-5"
      >
        <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span>Kembali ke Beranda</span>
      </Link>

      {/* KARTU INFORMASI EVENT */}
      <div className="bg-white border border-[#CBEBFF] rounded-3xl overflow-hidden shadow-xs mb-6">
        <div className="bg-gradient-to-b from-[#EBF8FF] to-[#F7FCFF] px-5 sm:px-8 py-6 border-b border-[#CBEBFF]">
          <span className="inline-block bg-[#3BB9F7] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3.5">
            Offline Event • Vol. 7
          </span>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] tracking-tight leading-snug">
            Digital Detox Vol. 7: Silent Reading
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Simpan sejenak ponselmu, bawa buku fisik favoritmu, dan nikmati sesi membaca tenang bareng teman-teman{" "}
            <strong>Baca Bareng Club</strong> di ruang terbuka hijau.
          </p>

          {/* BAR STATUS KURSI */}
          <div className="mt-5 bg-white border border-[#D4EEFF] rounded-2xl p-4">
            <div className="flex items-center justify-between gap-3 mb-2.5">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap">
                Kuota Tersedia
              </span>

              {loadingQuota ? (
                <span className="text-xs font-bold text-slate-400 whitespace-nowrap">
                  Memuat...
                </span>
              ) : quota.isFull ? (
                <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-700 text-xs font-extrabold px-2.5 py-1 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                  <span>Penuh ({quota.total}/{quota.total})</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200/70 text-xs font-extrabold px-2.5 py-0.5 rounded-full whitespace-nowrap">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>
                    {quota.remaining} / {quota.total} Kursi
                  </span>
                </span>
              )}
            </div>

            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-500 ${
                  quota.isFull ? "bg-slate-400" : "bg-gradient-to-r from-[#4CC3FA] to-[#1D8FE1]"
                }`}
                style={{ width: `${loadingQuota ? 15 : fillPercentage}%` }}
              />
            </div>
          </div>
        </div>

        {/* GRID DETAIL WAKTU & LOKASI INTERAKTIF */}
        <div className="p-5 sm:p-8 space-y-3.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#F8FCFF] border border-[#DCEEFF] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Hari &amp; Waktu
              </span>
              <p className="text-sm font-extrabold text-[#0B2D48] mt-1">
                Sabtu, 5 Desember 2026
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Pukul 08.00 – 10.15 WIB
              </p>
            </div>

            <div className="bg-[#F8FCFF] border border-[#DCEEFF] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Biaya Komitmen
              </span>
              <p className="text-sm font-extrabold text-[#0B2D48] mt-1">
                Rp25.000 / Peserta
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Welcome Letter &amp; Panduan Sesi (PDF)
              </p>
            </div>
          </div>

          {/* KARTU LOKASI RINGKAS DENGAN TOMBOL GOOGLE MAPS BERANIMASI */}
          <a
            href="https://maps.google.com/?q=Taman+Suropati+Menteng+Jakarta+Pusat"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center justify-between gap-3 bg-[#F8FCFF] hover:bg-[#EDF8FF] border border-[#DCEEFF] hover:border-[#8ED8FC] rounded-2xl p-4 sm:px-5 transition-all"
          >
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="relative w-10 h-10 rounded-xl bg-white border border-[#CBEBFF] flex items-center justify-center shrink-0 text-[#28A9EB] group-hover:scale-105 transition-transform">
                <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#3BB9F7] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#28A9EB]" />
                </span>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 21C16 17 19 13.4183 19 9.5C19 5.35786 15.866 2 12 2C8.13401 2 5 5.35786 5 9.5C5 13.4183 8 17 12 21Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="9.5" r="2.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </div>

              <div className="min-w-0">
                <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                  Titik Kumpul Lokasi
                </span>
                <p className="text-sm font-extrabold text-[#0B2D48] truncate">
                  Taman Suropati, Menteng
                </p>
                <p className="text-xs text-slate-500 truncate">
                  Jakarta Pusat
                </p>
              </div>
            </div>

            <span className="shrink-0 inline-flex items-center gap-1.5 bg-white group-hover:bg-[#3BB9F7] text-[#0B2D48] group-hover:text-white border border-[#CBEBFF] group-hover:border-[#3BB9F7] text-xs font-extrabold px-3.5 py-2 rounded-xl transition-colors">
              <span>Buka Maps</span>
              <svg
                className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                viewBox="0 0 16 16"
                fill="none"
              >
                <path
                  d="M5 11L11 5M11 5H6M11 5V10"
                  stroke="currentColor"
                  strokeWidth="1.9"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>

      {/* AREA KONFIRMASI / FORMULIR */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <span className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Digital Detox Vol. 7 Sudah Penuh
          </span>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed mb-5">
            Pantau terus info batch berikutnya di Instagram{" "}
            <a
              href="https://instagram.com/bacabareng.club"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#28A9EB] hover:underline"
            >
              @bacabareng.club
            </a>
            .
          </p>
          <a
            href={getMentorWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-3 rounded-2xl transition"
          >
            <span>WhatsApp Mentor</span>
          </a>
        </div>
      ) : submitted ? (
        <div className="bg-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#3BB9F7] to-[#1D8FE1] text-white flex items-center justify-center mx-auto mb-5 shadow-md shadow-[#3BB9F7]/25">
              <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none">
                <path
                  d="M5 12.5L9.5 17L19 7.5"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <span className="inline-block bg-[#EBF8FF] text-[#0E5A8A] text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-3">
              Pendaftaran Berhasil
            </span>

            <p className="text-xs sm:text-sm font-bold text-slate-500">
              Terima kasih sudah bergabung,
            </p>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] tracking-tight mt-0.5 leading-snug">
              {nama}
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed mt-3">
              Kursi kehadiranmu di <strong>Taman Suropati</strong> pada{" "}
              <strong>Sabtu, 5 Desember 2026 (08.00 – 10.15 WIB)</strong> sudah tercatat di sistem{" "}
              <strong>Baca Bareng Club</strong>. Surat <strong>Welcome Letter</strong> sedang dikirimkan ke alamat email kamu:
            </p>

            {/* KOTAK EMAIL */}
            <div className="mt-4 mb-5 w-full flex items-center justify-center gap-2 bg-[#F4FBFF] border border-[#CBEBFF] px-4 py-3 rounded-2xl text-xs sm:text-sm font-bold text-[#0B2D48]">
              <svg className="w-4 h-4 text-[#28A9EB] shrink-0" viewBox="0 0 20 20" fill="none">
                <path
                  d="M3 5.5C3 4.67157 3.67157 4 4.5 4H15.5C16.3284 4 17 4.67157 17 5.5V14.5C17 15.3284 16.3284 16 15.5 16H4.5C3.67157 16 3 15.3284 3 14.5V5.5Z"
                  stroke="currentColor"
                  strokeWidth="1.7"
                />
                <path
                  d="M3.5 5.5L10 10.5L16.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span className="truncate">{email}</span>
            </div>

            {/* INFO PENGECEKAN EMAIL & WHATSAPP MENTOR */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-left mb-6 space-y-3">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-wider text-[#0B2D48] mb-2">
                  Catatan Penting
                </p>
                <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
                  <li>
                    Pengiriman email otomatis butuh waktu sekitar <strong>1–3 menit</strong>.
                  </li>
                  <li>
                    Kalau belum masuk di <strong>Kotak Masuk (Inbox)</strong>, cek juga folder{" "}
                    <strong>Spam / Junk</strong> atau tab <strong>Promosi</strong>.
                  </li>
                  <li>
                    Di dalam email tersebut sudah ada tautan Google Maps dan grup koordinasi peserta.
                  </li>
                </ul>
              </div>

              <div className="pt-3 border-t border-slate-200/80">
                <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                  Kalau ada kendala atau butuh bantuan, langsung hubungi mentor kami:
                </p>
                <a
                  href={getMentorWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold py-3 px-4 rounded-xl transition"
                >
                  <span>WhatsApp Mentor</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link
                href="/"
                className="w-full bg-[#0B2D48] hover:bg-[#143F63] text-white text-xs font-bold py-3.5 px-5 rounded-2xl transition text-center"
              >
                Kembali ke Beranda
              </Link>
              <button
                type="button"
                onClick={() => window.location.reload()}
                className="w-full bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold py-3.5 px-5 rounded-2xl transition"
              >
                Daftarkan Peserta Lain
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs">
          {/* STEPPER HEADER */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#3BB9F7] text-white text-sm font-extrabold flex items-center justify-center">
                {step}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Langkah {step} dari 2
                </p>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0B2D48]">
                  {step === 1 ? "Data Diri Peserta" : "Biaya Komitmen & Konfirmasi"}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-8 rounded-full transition-colors ${step >= 1 ? "bg-[#3BB9F7]" : "bg-slate-200"}`} />
              <span className={`h-2 w-8 rounded-full transition-colors ${step >= 2 ? "bg-[#3BB9F7]" : "bg-slate-200"}`} />
            </div>
          </div>

          {/* STEP 1 */}
          {step === 1 && (
            <form onSubmit={goToStep2} className="space-y-5">
              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Nama Lengkap <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  placeholder="Tulis nama lengkap kamu"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Alamat Email Aktif <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Nomor WhatsApp <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Contoh: 081234567890"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none transition"
                />
              </div>

              {/* SUMBER INFO BERBENTUK KOTAK-KOTAK PILIHAN */}
              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                  Tahu Event Ini dari Mana?
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {SUMBER_INFO_OPTIONS.map((option) => {
                    const isSelected = sumberInfo === option;
                    return (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setSumberInfo(option)}
                        className={`p-3 rounded-2xl border text-left text-xs font-bold leading-snug transition flex items-center justify-between gap-2 ${
                          isSelected
                            ? "bg-[#EBF8FF] border-[#3BB9F7] text-[#0B2D48] shadow-2xs"
                            : "bg-slate-50/60 hover:bg-slate-100/70 border-slate-200 text-slate-600"
                        }`}
                      >
                        <span>{option}</span>
                        <span
                          className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 border ${
                            isSelected
                              ? "bg-[#3BB9F7] border-[#3BB9F7] text-white"
                              : "bg-white border-slate-300"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                              <path
                                d="M2.5 6L5 8.5L9.5 3.5"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Buku yang Mau Dibawa / Harapan Ikut Sesi Ini <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={harapan}
                  onChange={(e) => setHarapan(e.target.value)}
                  placeholder='Contoh: "Mau bawa buku Filosofi Teras dan kenalan sama teman baca baru"'
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none transition"
                />
              </div>

              {/* OPSI DONASI BUKU */}
              <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4 space-y-3">
                <label className="block text-sm font-bold text-[#0B2D48]">
                  Apakah kamu berencana membawa buku layak baca untuk didonasikan? (Opsional)
                </label>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setDonasiBuku("ya")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition ${
                      donasiBuku === "ya"
                        ? "bg-[#3BB9F7] text-white border-[#3BB9F7]"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Ya, Mau Donasi
                  </button>
                  <button
                    type="button"
                    onClick={() => setDonasiBuku("tidak")}
                    className={`flex-1 py-2.5 rounded-xl text-xs font-extrabold border transition ${
                      donasiBuku === "tidak"
                        ? "bg-[#0B2D48] text-white border-[#0B2D48]"
                        : "bg-white text-slate-600 border-slate-200"
                    }`}
                  >
                    Belum Kali Ini
                  </button>
                </div>

                {donasiBuku === "ya" && (
                  <input
                    type="text"
                    value={detailBuku}
                    onChange={(e) => setDetailBuku(e.target.value)}
                    placeholder="Tulis judul atau genre buku yang mau didonasikan"
                    className="w-full rounded-xl border border-[#CBEBFF] bg-white px-3.5 py-2.5 text-xs text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none"
                  />
                )}
              </div>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#3BB9F7] hover:bg-[#28A9EB] text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-md shadow-[#3BB9F7]/25 transition inline-flex items-center justify-center gap-2"
              >
                <span>Lanjut ke Langkah 2</span>
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M7.5 5L12.5 10L7.5 15"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-5 text-center">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB] bg-[#E8F7FF] px-3.5 py-1 rounded-full mb-2">
                  Biaya Komitmen: Rp25.000
                </span>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Scan QRIS di bawah ini sebesar <strong>Rp25.000</strong> untuk mengunci kursi kehadiranmu pada{" "}
                  <strong>Sabtu, 5 Desember 2026</strong> di <strong>Taman Suropati</strong>.
                </p>

                <div className="max-w-[230px] mx-auto mt-4 bg-white p-3 rounded-2xl border border-[#CBEBFF]">
                  <img
                    src="/qris.jpeg"
                    alt="QRIS Baca Bareng Club"
                    className="w-full h-auto rounded-xl"
                  />
                  <a
                    href="/qris.jpeg"
                    download="QRIS-Digital-Detox-Vol7.jpeg"
                    className="inline-block mt-2 text-xs font-extrabold text-[#28A9EB] hover:underline"
                  >
                    Simpan Gambar QRIS
                  </a>
                </div>
              </div>

              <label
                className={`block w-full min-w-0 rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-[#F9FDFF] p-5 text-center transition ${
                  loading ? "opacity-50 pointer-events-none" : "hover:bg-[#F0F9FF] cursor-pointer"
                }`}
              >
                {paymentFile ? (
                  <div className="min-w-0 space-y-1.5">
                    <span className="inline-flex items-center gap-1.5 bg-[#E8F7FF] text-[#0E5A8A] text-[11px] font-extrabold px-3 py-1 rounded-full">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Bukti Terpilih</span>
                    </span>
                    <p className="w-full truncate px-2 text-xs sm:text-sm font-bold text-[#0B2D48]">
                      {paymentFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">Ketuk di sini kalau mau ganti file</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-[#0B2D48]">
                      Unggah Bukti Pembayaran QRIS
                    </p>
                    <p className="text-xs text-slate-400">
                      Format gambar (JPG, PNG) atau PDF
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  disabled={loading}
                  onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-100 px-4 py-3 rounded-xl">
                  {errorMsg}
                </p>
              )}

              <div className="grid grid-cols-3 gap-3 pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setErrorMsg("");
                    setStep(1);
                  }}
                  className="col-span-1 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 font-bold text-sm py-4 rounded-2xl transition"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="col-span-2 bg-[#3BB9F7] hover:bg-[#28A9EB] disabled:bg-[#8ED8FC] text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-md shadow-[#3BB9F7]/25 transition"
                >
                  Selesaikan Pendaftaran
                </button>
              </div>
            </div>
          )}

          {/* BANTUAN WHATSAPP MENTOR DI BAWAH FORM */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Ada kendala saat daftar?{" "}
              <a
                href={getMentorWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#28A9EB] hover:underline"
              >
                Hubungi Mentor
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
