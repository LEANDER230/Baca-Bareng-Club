"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  fetchQuota,
  fileToPayload,
  getCachedQuota,
  submitToSheet,
} from "../lib/submitRegistration";

export default function ChallengePage() {
  const [quota, setQuota] = useState({ total: 50, remaining: 50, isFull: false });
  const [loadingQuota, setLoadingQuota] = useState(true);

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [tagFile, setTagFile] = useState<File | null>(null);
  const [donationFile, setDonationFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const cached = getCachedQuota();
    if (cached?.online) {
      setQuota(cached.online);
      setLoadingQuota(false);
    }

    fetchQuota().then((data) => {
      if (data?.online) setQuota(data.online);
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

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!nama.trim() || !email.trim() || !whatsapp.trim() || !tujuan.trim()) {
      setErrorMsg("Mohon lengkapi seluruh informasi peserta pada Tahap 1 sebelum melanjutkan.");
      return;
    }
    setStep(2);
  }

  function goToStep3() {
    setErrorMsg("");
    if (!tagFile) {
      setErrorMsg("Mohon unggah bukti tangkapan layar atau dokumen PDF sebagai syarat verifikasi.");
      return;
    }
    setStep(3);
  }

  async function handleFinalSubmit() {
    setErrorMsg("");
    if (!tagFile) {
      setErrorMsg("Berkas bukti verifikasi belum dilampirkan.");
      return;
    }

    try {
      setLoading(true);
      const [tagPayload, donationPayload] = await Promise.all([
        fileToPayload(tagFile),
        donationFile ? fileToPayload(donationFile) : Promise.resolve(null),
      ]);

      await submitToSheet({
        program: "30-day-challenge",
        nama,
        email,
        whatsapp,
        tujuan,
        tagFile: tagPayload,
        donationFile: donationPayload,
      });

      setSubmitted(true);
      fetchQuota().then((updated) => {
        if (updated?.online) setQuota(updated.online);
      });
    } catch (err) {
      const detail =
        err instanceof Error
          ? err.message
          : "Terjadi gangguan koneksi. Silakan coba beberapa saat lagi.";
      setErrorMsg(`Pengiriman belum berhasil: ${detail}`);
    } finally {
      setLoading(false);
    }
  }

  const processSteps = [
    "Memverifikasi berkas lampiran",
    "Mendaftarkan data ke sistem",
    "Menjadwalkan pengiriman dokumen",
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-5 sm:pt-10 pb-24">
      {/* OVERLAY ANIMASI PENGIRIMAN PROFESIONAL */}
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
              Memproses Pendaftaran
            </h3>
            <p className="text-xs text-slate-500 mt-1 mb-5">
              Mohon tetap di halaman ini hingga proses selesai.
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

      {/* KARTU INFORMASI PROGRAM */}
      <div className="bg-white border border-[#CBEBFF] rounded-3xl overflow-hidden shadow-xs mb-6">
        <div className="bg-gradient-to-b from-[#EBF8FF] to-[#F7FCFF] px-5 sm:px-8 py-6 border-b border-[#CBEBFF]">
          <div className="flex items-center justify-between gap-2 mb-3.5">
            <span className="bg-[#3BB9F7] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
              Online Program
            </span>
            {loadingQuota ? (
              <span className="bg-white/90 text-slate-500 text-xs font-bold px-3.5 py-1.5 rounded-full border border-[#CBEBFF]">
                Memeriksa kuota...
              </span>
            ) : quota.isFull ? (
              <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                Kuota Penuh ({quota.total}/{quota.total})
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3.5 py-1.5 rounded-full">
                Tersisa {quota.remaining} dari {quota.total} Slot
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] tracking-tight leading-snug">
            30 Day Morning Reading Challenge
          </h1>
          <p className="text-slate-600 text-sm mt-2 leading-relaxed">
            Bangun kebiasaan membaca yang terstruktur setiap pagi pukul 05.00 WIB bersama komunitas{" "}
            <strong>Baca Bareng Club</strong> selama 30 hari penuh.
          </p>
        </div>

        {/* GRID DETAIL SIMETRIS */}
        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#F8FCFF] border border-[#DCEEFF] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Jadwal Harian
              </span>
              <p className="text-sm font-extrabold text-[#0B2D48] mt-1">
                Setiap Hari (05.00 – 06.00 WIB)
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Dilaksanakan via Zoom &amp; Grup WhatsApp
              </p>
            </div>

            <div className="bg-[#F8FCFF] border border-[#DCEEFF] rounded-2xl p-4 sm:p-5 flex flex-col justify-center">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Biaya &amp; Fasilitas
              </span>
              <p className="text-sm font-extrabold text-[#0B2D48] mt-1">
                Gratis / Kontribusi Sukarela
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Welcome Letter &amp; Commitment Sheet (PDF)
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* AREA KONFIRMASI / FORMULIR */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <span className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Batch Ini Telah Terpenuhi
          </span>
          <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
            Ikuti pembaruan resmi melalui Instagram{" "}
            <a
              href="https://instagram.com/bacabareng.club"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#28A9EB] hover:underline"
            >
              @bacabareng.club
            </a>{" "}
            untuk jadwal pembukaan pendaftaran batch berikutnya.
          </p>
        </div>
      ) : submitted ? (
        <div className="bg-white border border-[#CBEBFF] rounded-3xl p-6 sm:p-10 shadow-sm">
          {/* IKON CENTANG VEKTOR PROFESIONAL */}
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

          <div className="text-center">
            <span className="inline-block bg-[#EBF8FF] text-[#0E5A8A] text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full mb-2.5">
              Registrasi Terkonfirmasi
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] tracking-tight">
              Terima Kasih, {nama}
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mt-2">
              Data kepesertaan Anda telah resmi tercatat dalam sistem{" "}
              <strong>Baca Bareng Club</strong>. Dokumen{" "}
              <strong>Welcome Letter</strong> beserta{" "}
              <strong>Commitment Sheet (PDF)</strong> sedang dikirimkan secara otomatis ke alamat email terdaftar:
            </p>

            <div className="mt-4 mb-6 inline-flex items-center gap-2 bg-[#F4FBFF] border border-[#CBEBFF] px-4 py-2.5 rounded-xl text-sm font-bold text-[#0B2D48]">
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
              <span>{email}</span>
            </div>
          </div>

          {/* PANDUAN PENERIMAAN EMAIL */}
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 max-w-md mx-auto mb-7">
            <p className="text-xs font-extrabold uppercase tracking-wider text-[#0B2D48] mb-2">
              Informasi Pengiriman Email
            </p>
            <ul className="text-xs text-slate-600 space-y-2 list-disc pl-4 leading-relaxed">
              <li>
                Proses pengiriman dokumen otomatis memerlukan waktu sekitar{" "}
                <strong>1–3 menit</strong>.
              </li>
              <li>
                Apabila email belum terlihat di <strong>Kotak Masuk (Inbox)</strong>, mohon periksa folder{" "}
                <strong>Spam / Junk</strong> atau tab <strong>Promosi (Promotions)</strong>.
              </li>
              <li>
                Simpan tautan grup koordinasi yang tercantum di dalam dokumen tersebut untuk bergabung bersama peserta lainnya.
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className="w-full sm:w-auto bg-[#0B2D48] hover:bg-[#143F63] text-white text-xs font-bold px-6 py-3 rounded-xl transition text-center"
            >
              Kembali ke Halaman Utama
            </Link>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="w-full sm:w-auto bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 text-xs font-bold px-6 py-3 rounded-xl transition"
            >
              Daftarkan Peserta Lain
            </button>
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
                  Tahap {step} dari 3
                </p>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0B2D48]">
                  {step === 1 && "Informasi Data Diri"}
                  {step === 2 && "Verifikasi Media Sosial"}
                  {step === 3 && "Kontribusi Sukarela"}
                </h2>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`h-2 w-6 rounded-full transition-colors ${step >= 1 ? "bg-[#3BB9F7]" : "bg-slate-200"}`} />
              <span className={`h-2 w-6 rounded-full transition-colors ${step >= 2 ? "bg-[#3BB9F7]" : "bg-slate-200"}`} />
              <span className={`h-2 w-6 rounded-full transition-colors ${step >= 3 ? "bg-[#3BB9F7]" : "bg-slate-200"}`} />
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
                  placeholder="Masukkan nama lengkap Anda"
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
                  placeholder="nama@domain.com (untuk pengiriman Welcome Letter)"
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

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Target Bacaan 30 Hari ke Depan <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={tujuan}
                  onChange={(e) => setTujuan(e.target.value)}
                  placeholder='Contoh: "Menyelesaikan 2 buku non-fiksi dan konsisten membaca 20 menit setiap pagi"'
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#3BB9F7] focus:outline-none transition"
                />
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
                <span>Lanjutkan ke Tahap Berikutnya</span>
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
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#28A9EB]">
                    Persyaratan Program
                  </span>
                  <a
                    href="https://instagram.com/bacabareng.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#28A9EB] hover:underline"
                  >
                    Buka @bacabareng.club
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Berikan komentar dan <strong>tag 5 rekan</strong> pada unggahan tersemat (<em>pinned post</em>) terbaru di akun Instagram{" "}
                  <strong>@bacabareng.club</strong>, kemudian lampirkan tangkapan layar atau dokumen PDF sebagai bukti.
                </p>
              </div>

              <label className="block w-full min-w-0 rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-[#F9FDFF] hover:bg-[#F0F9FF] p-6 cursor-pointer transition text-center">
                {tagFile ? (
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
                      <span>Berkas Terlampir</span>
                    </span>
                    <p className="w-full truncate px-2 text-xs sm:text-sm font-bold text-[#0B2D48]">
                      {tagFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">Ketuk area ini untuk mengganti berkas</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-[#0B2D48]">
                      Unggah Bukti Tag 5 Rekan
                    </p>
                    <p className="text-xs text-slate-400">
                      Mendukung format gambar (JPG, PNG) atau PDF
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setTagFile(e.target.files?.[0] || null)}
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
                  onClick={() => {
                    setErrorMsg("");
                    setStep(1);
                  }}
                  className="col-span-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-4 rounded-2xl transition"
                >
                  Kembali
                </button>
                <button
                  type="button"
                  onClick={goToStep3}
                  className="col-span-2 bg-[#3BB9F7] hover:bg-[#28A9EB] text-white font-extrabold text-sm sm:text-base py-4 rounded-2xl shadow-md shadow-[#3BB9F7]/25 transition inline-flex items-center justify-center gap-2"
                >
                  <span>Lanjutkan</span>
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
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB] bg-[#E8F7FF] px-3.5 py-1 rounded-full mb-2">
                  Opsional — Kontribusi Sukarela
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2D48]">
                  Dukungan Operasional Komunitas
                </h3>
                <p className="text-xs text-slate-500 mt-1.5 max-w-md mx-auto leading-relaxed">
                  Anda dapat memindai kode QRIS berikut untuk memberikan dukungan operasional sukarela. Apabila belum berkenan, Anda dapat langsung menyelesaikan proses pendaftaran.
                </p>
              </div>

              <div className="max-w-[240px] mx-auto bg-[#F8FCFF] p-3.5 rounded-3xl border border-[#CBEBFF] text-center">
                <img
                  src="/qris.jpeg"
                  alt="QRIS Baca Bareng Club"
                  className="w-full h-auto rounded-2xl bg-white"
                />
                <a
                  href="/qris.jpeg"
                  download="QRIS-Baca-Bareng-Club.jpeg"
                  className="inline-block mt-2.5 text-xs font-extrabold text-[#28A9EB] hover:underline"
                >
                  Unduh Gambar QRIS
                </a>
              </div>

              <label
                className={`block w-full min-w-0 rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 p-4 text-center transition ${
                  loading ? "opacity-50 pointer-events-none" : "hover:bg-slate-100/70 cursor-pointer"
                }`}
              >
                {donationFile ? (
                  <div className="min-w-0 space-y-1">
                    <span className="inline-flex items-center gap-1.5 bg-[#E8F7FF] text-[#0E5A8A] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      <svg className="w-3.5 h-3.5" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.5 8.5L6.5 11.5L12.5 4.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span>Bukti Terlampir</span>
                    </span>
                    <p className="w-full truncate px-2 text-xs font-bold text-[#0B2D48]">
                      {donationFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">Ketuk area ini untuk mengganti berkas</p>
                  </div>
                ) : (
                  <p className="text-xs font-bold text-[#0B2D48]">
                    Lampirkan Bukti Transfer QRIS (Opsional)
                  </p>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  disabled={loading}
                  onChange={(e) => setDonationFile(e.target.files?.[0] || null)}
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
                    setStep(2);
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
        </div>
      )}
    </div>
  );
}
