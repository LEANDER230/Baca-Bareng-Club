"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchQuota, fileToPayload, submitToSheet } from "../lib/submitRegistration";

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
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchQuota().then((data) => {
      if (data?.online) setQuota(data.online);
      setLoadingQuota(false);
    });
  }, []);

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!nama.trim() || !email.trim() || !whatsapp.trim() || !tujuan.trim()) {
      setErrorMsg("Lengkapi seluruh data diri pada Langkah 1 terlebih dahulu.");
      return;
    }
    setStep(2);
  }

  function goToStep3() {
    setErrorMsg("");
    if (!tagFile) {
      setErrorMsg("Unggah bukti screenshot/PDF tag 5 teman di postingan pinned @bacabareng.club.");
      return;
    }
    setStep(3);
  }

  async function handleFinalSubmit() {
    setErrorMsg("");
    if (!tagFile) return;

    try {
      setLoading(true);
      const tagPayload = await fileToPayload(tagFile);
      const donationPayload = donationFile ? await fileToPayload(donationFile) : null;

      await submitToSheet({
        program: "30-day-challenge",
        nama,
        email,
        whatsapp,
        tujuan,
        tagFile: tagPayload,
        donationFile: donationPayload,
      });

      const updated = await fetchQuota();
      if (updated?.online) setQuota(updated.online);
      setSubmitted(true);
    } catch {
      setErrorMsg("Terjadi kendala jaringan. Silakan coba kirim ulang.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-24">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm font-bold text-[#28A9EB] hover:text-[#0B2D48] transition mb-6"
      >
        <span>←</span>
        <span>Kembali ke Beranda</span>
      </Link>

      {/* KARTU INFO PROGRAM */}
      <div className="bg-white border border-[#CBEBFF] rounded-3xl overflow-hidden shadow-xs mb-6">
        <div className="bg-gradient-to-r from-[#E8F7FF] to-[#F4FBFF] px-5 sm:px-8 py-6 border-b border-[#CBEBFF]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="bg-[#4CC3FA] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
              Online Program
            </span>
            {loadingQuota ? (
              <span className="bg-white text-slate-500 text-xs font-bold px-3.5 py-1 rounded-full border border-[#CBEBFF]">
                Memuat slot...
              </span>
            ) : quota.isFull ? (
              <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3.5 py-1 rounded-full">
                Kuota Penuh ({quota.total}/{quota.total})
              </span>
            ) : (
              <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3.5 py-1 rounded-full">
                Tersisa {quota.remaining} dari {quota.total} Slot
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] tracking-tight">
            30 Day Morning Reading Challenge
          </h1>
          <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
            Ganti kebiasaan <em>doom scrolling</em> pagi dengan bangun jam 05.00 WIB dan membaca buku bersama selama 30 hari penuh.
          </p>
        </div>

        {/* DETAIL JADWAL & FASILITAS TANPA PEMISAH TITIK */}
        <div className="p-5 sm:p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Jadwal Harian
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">Setiap Hari (05.00 – 06.00 WIB)</p>
              <p className="text-xs text-slate-500 mt-0.5">Via Zoom &amp; Grup WhatsApp</p>
            </div>

            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Biaya &amp; Fasilitas
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">Gratis / Bayar Seikhlasnya</p>
              <p className="text-xs text-slate-500 mt-0.5">Surat Welcoming &amp; PDF Komitmen via email</p>
            </div>
          </div>
        </div>
      </div>

      {/* AREA FORMULIR WIZARD */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <span className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Batch Ini Sudah Penuh
          </span>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Pantau Instagram{" "}
            <a
              href="https://instagram.com/bacabareng.club"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#28A9EB] hover:underline"
            >
              @bacabareng.club
            </a>{" "}
            untuk informasi pembukaan batch berikutnya.
          </p>
        </div>
      ) : submitted ? (
        <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-8 sm:p-10 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
            Selamat Bergabung, {nama}!
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
            Cek kotak masuk (atau folder spam) email <strong>{email}</strong> dalam beberapa menit ke depan untuk menerima <strong>Surat Welcoming Resmi + PDF Komitmen</strong>.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="text-sm font-bold text-[#28A9EB] hover:underline"
          >
            Daftarkan peserta lainnya
          </button>
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-3xl p-5 sm:p-8 shadow-xs">
          {/* STEPPER HEADER */}
          <div className="flex items-center justify-between mb-6 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-[#4CC3FA] text-white text-sm font-extrabold flex items-center justify-center">
                {step}
              </span>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Langkah {step} dari 3
                </p>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0B2D48]">
                  {step === 1 && "Data Diri Peserta"}
                  {step === 2 && "Bukti Tag Instagram"}
                  {step === 3 && "Dukungan Sukarela"}
                </h2>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className={`h-2 w-6 rounded-full ${step >= 1 ? "bg-[#4CC3FA]" : "bg-slate-200"}`} />
              <span className={`h-2 w-6 rounded-full ${step >= 2 ? "bg-[#4CC3FA]" : "bg-slate-200"}`} />
              <span className={`h-2 w-6 rounded-full ${step >= 3 ? "bg-[#4CC3FA]" : "bg-slate-200"}`} />
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
                  placeholder="Nama panggilan / lengkapmu"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
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
                  placeholder="nama@email.com (untuk kirim PDF Komitmen)"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
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
                  placeholder='Contoh: "Rutin baca 15 halaman/hari dan bangun sebelum jam 05.00"'
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
                />
              </div>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl">
                  {errorMsg}
                </p>
              )}

              <button
                type="submit"
                className="w-full bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-base py-4 rounded-2xl shadow-md shadow-[#4CC3FA]/25 transition"
              >
                Lanjut →
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-xs font-extrabold uppercase tracking-wider text-[#28A9EB]">
                    Syarat Wajib
                  </span>
                  <a
                    href="https://instagram.com/bacabareng.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-[#28A9EB] hover:underline"
                  >
                    Buka @bacabareng.club ↗
                  </a>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  Komentar dan <strong>tag 5 teman</strong> pada postingan <em>pinned</em> terbaru Instagram <strong>@bacabareng.club</strong>, lalu unggah bukti screenshot atau PDF-nya di bawah ini.
                </p>
              </div>

              <label className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-[#F9FDFF] hover:bg-[#F0F9FF] p-8 cursor-pointer transition text-center">
                <span className="text-sm font-extrabold text-[#0B2D48]">
                  {tagFile ? `✓ ${tagFile.name}` : "+ Unggah Bukti Tag 5 Teman"}
                </span>
                <span className="text-xs text-slate-400 mt-1">
                  {tagFile ? "Ketuk untuk mengganti file" : "Format Screenshot (JPG/PNG) atau PDF"}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setTagFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl">
                  {errorMsg}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setStep(1);
                  }}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-4 rounded-2xl transition"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  onClick={goToStep3}
                  className="w-2/3 bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-base py-4 rounded-2xl shadow-md shadow-[#4CC3FA]/25 transition"
                >
                  Lanjut →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-5">
              <div className="text-center">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB] bg-[#E8F7FF] px-3.5 py-1 rounded-full mb-2">
                  Opsional (Bayar Seikhlasnya)
                </span>
                <h3 className="text-lg font-extrabold text-[#0B2D48]">
                  Bantu Tumbuh Bareng yuk!
                </h3>
                <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto leading-relaxed">
                  Scan QRIS di bawah ini jika ingin menyisihkan dukungan operasional seikhlasnya. Jika belum berkenan, kamu bisa langsung menyelesaikan pendaftaran.
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
                  Simpan Gambar QRIS ↓
                </a>
              </div>

              <label className="flex flex-col items-center justify-center w-full rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 hover:bg-slate-100/70 p-4 cursor-pointer transition text-center">
                <span className="text-xs font-bold text-[#0B2D48]">
                  {donationFile ? `✓ ${donationFile.name}` : "+ Lampirkan Bukti QRIS (Opsional)"}
                </span>
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setDonationFile(e.target.files?.[0] || null)}
                  className="hidden"
                />
              </label>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl">
                  {errorMsg}
                </p>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => {
                    setErrorMsg("");
                    setStep(2);
                  }}
                  className="w-1/3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-sm py-4 rounded-2xl transition"
                >
                  ← Kembali
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleFinalSubmit}
                  className="w-2/3 bg-[#4CC3FA] hover:bg-[#33B5F2] disabled:bg-slate-300 text-white font-extrabold text-base py-4 rounded-2xl shadow-md shadow-[#4CC3FA]/25 transition"
                >
                  {loading ? "Mengirim..." : "Selesai & Daftar ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
