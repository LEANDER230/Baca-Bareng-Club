"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchQuota, fileToPayload, submitToSheet } from "../lib/submitRegistration";

export default function ChallengePage() {
  const [quota, setQuota] = useState({ total: 50, remaining: 50, isFull: false });
  const [loadingQuota, setLoadingQuota] = useState(true);

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [tagFile, setTagFile] = useState<File | null>(null);
  const [donationFile, setDonationFile] = useState<File | null>(null);
  const [copied, setCopied] = useState(false);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchQuota().then((data) => {
      if (data?.online) setQuota(data.online);
      setLoadingQuota(false);
    });
  }, []);

  function copyRekening() {
    navigator.clipboard.writeText("3210904441");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!tagFile) {
      setErrorMsg("Unggah dulu bukti screenshot/PDF tag 5 teman di postingan pinned @bacabareng.club.");
      return;
    }

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
    <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#28A9EB] hover:underline mb-5">
        <span>←</span>
        <span>Kembali ke Beranda</span>
      </Link>

      {/* HEADER PROGRAM */}
      <div className="bg-gradient-to-br from-[#E8F7FF] to-[#F7FCFF] border border-[#CBEBFF] rounded-3xl p-5 sm:p-9 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span className="bg-[#4CC3FA] text-white text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full">
            ONLINE • ZOOM &amp; WHATSAPP
          </span>
          {loadingQuota ? (
            <span className="bg-white text-slate-500 text-xs font-bold px-3.5 py-1 rounded-full border border-[#CBEBFF]">
              Mengecek kuota...
            </span>
          ) : quota.isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3.5 py-1 rounded-full">
              Kuota Batch Ini Penuh
            </span>
          ) : (
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3.5 py-1 rounded-full">
              Tersisa {quota.remaining} dari {quota.total} Slot
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-extrabold text-[#0B2D48] leading-tight mb-3">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-5">
          Bangun jam 05.00 WIB dan baca buku bareng selama 30 hari penuh ditemani sistem, mentor, dan komunitas yang suportif.
        </p>

        <div className="grid grid-cols-2 gap-3 bg-white/90 p-4 rounded-2xl border border-[#D9F1FF] text-xs sm:text-sm">
          <div>
            <span className="block text-[11px] font-bold text-[#35B6F5] uppercase">Jadwal</span>
            <span className="font-bold text-[#0B2D48] mt-0.5 block">05.00 – 06.00 WIB</span>
          </div>
          <div>
            <span className="block text-[11px] font-bold text-[#35B6F5] uppercase">Biaya</span>
            <span className="font-bold text-[#0B2D48] mt-0.5 block">Gratis / Seikhlasnya</span>
          </div>
        </div>
      </div>

      {/* KONDISI KUOTA PENUH / SUKSES / FORM */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center shadow-xs">
          <div className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Batch Ini Sudah Penuh
          </div>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Terima kasih atas antusiasmenya! Pantau Instagram{" "}
            <a
              href="https://instagram.com/bacabareng.club"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-[#28A9EB] hover:underline"
            >
              @bacabareng.club
            </a>{" "}
            untuk info pembukaan batch berikutnya.
          </p>
        </div>
      ) : submitted ? (
        <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-7 sm:p-10 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
            Pendaftaran Berhasil, {nama}!
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
        <form onSubmit={handleSubmit} className="bg-white sm:border sm:border-slate-200/90 sm:rounded-3xl sm:p-8 sm:shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-lg sm:text-xl font-extrabold text-[#0B2D48]">
              Formulir Pendaftaran
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Surat Welcoming &amp; PDF Komitmen otomatis dikirim ke email setelah submit.
            </p>
          </div>

          <div className="space-y-4">
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
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:ring-2 focus:ring-[#4CC3FA]/20 focus:outline-none transition"
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
                placeholder="nama@email.com (pastikan bebas typo)"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:ring-2 focus:ring-[#4CC3FA]/20 focus:outline-none transition"
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
                placeholder="081234567890"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:ring-2 focus:ring-[#4CC3FA]/20 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                Tujuan Spesifik 30 Hari ke Depan <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                placeholder='Contoh: "Rutin baca 15 halaman/hari dan bangun sebelum jam 05.00"'
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:ring-2 focus:ring-[#4CC3FA]/20 focus:outline-none transition"
              />
            </div>
          </div>

          {/* SYARAT TAG 5 TEMAN */}
          <div className="rounded-2xl bg-[#F4FBFF] border border-[#CBEBFF] p-4 sm:p-5 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#0E5A8A]">
                Syarat Wajib <span className="text-rose-500">*</span>
              </span>
              <a
                href="https://instagram.com/bacabareng.club"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#28A9EB] hover:underline"
              >
                <span>Buka Instagram</span>
                <span>↗</span>
              </a>
            </div>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Komentar &amp; <strong>tag 5 teman</strong> di postingan <em>pinned</em> terbaru <strong>@bacabareng.club</strong>, lalu unggah bukti screenshot atau PDF-nya:
            </p>

            <label className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-white hover:bg-[#F0F9FF] p-4 cursor-pointer transition text-center">
              <span className="text-xs font-extrabold text-[#0B2D48]">
                {tagFile ? `✓ ${tagFile.name}` : "+ Pilih Screenshot / File PDF"}
              </span>
              <span className="text-[11px] text-slate-400 mt-0.5">
                {tagFile ? "Ketuk untuk mengganti file" : "Format JPG, PNG, atau PDF (Maks 10MB)"}
              </span>
              <input
                type="file"
                accept="image/*,.pdf"
                required
                onChange={(e) => setTagFile(e.target.files?.[0] || null)}
                className="hidden"
              />
            </label>
          </div>

          {/* DUKUNGAN SUKARELA */}
          <div className="rounded-2xl border border-slate-200 p-4 sm:p-5 space-y-4">
            <div>
              <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-[#0E5A8A] bg-[#E8F7FF] px-2.5 py-0.5 rounded-full mb-1.5">
                Opsional • Sukarela
              </span>
              <h3 className="text-base font-extrabold text-[#0B2D48]">
                Bantu Tumbuh Bareng yuk!
              </h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Sisihkan dukungan seikhlasnya untuk operasional program. Boleh dilewati jika belum berkenan.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50/80 p-4 rounded-2xl">
              <div className="w-44 shrink-0 bg-white p-2.5 rounded-2xl border border-slate-200 text-center shadow-2xs">
                <img
                  src="/qris.jpeg"
                  alt="QRIS Baca Bareng Club"
                  className="w-full h-auto rounded-xl"
                />
                <a
                  href="/qris.jpeg"
                  download="QRIS-Baca-Bareng-Club.jpeg"
                  className="inline-block mt-2 text-xs font-bold text-[#28A9EB] hover:underline"
                >
                  Simpan QRIS ↓
                </a>
              </div>

              <div className="w-full space-y-3 text-xs">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                  <div>
                    <span className="block text-[11px] text-slate-400">Transfer BCA</span>
                    <strong className="text-sm text-[#0B2D48] block">3210904441</strong>
                    <span className="text-slate-500">a.n. Faisal Reza Pratama</span>
                  </div>
                  <button
                    type="button"
                    onClick={copyRekening}
                    className="shrink-0 bg-[#E8F7FF] hover:bg-[#D4F0FF] text-[#0E5A8A] font-bold px-3 py-2 rounded-xl transition"
                  >
                    {copied ? "Tersalin ✓" : "Salin"}
                  </button>
                </div>

                <label className="flex flex-col items-center justify-center w-full rounded-xl border border-dashed border-slate-300 bg-white hover:bg-slate-50 p-3 cursor-pointer transition text-center">
                  <span className="font-bold text-[#0B2D48]">
                    {donationFile ? `✓ ${donationFile.name}` : "+ Lampirkan Bukti (Opsional)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setDonationFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold px-4 py-3 rounded-2xl">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#4CC3FA] hover:bg-[#33B5F2] disabled:bg-slate-300 text-white font-extrabold text-base py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition"
          >
            {loading ? "Mengirim Pendaftaran..." : "Kirim Pendaftaran Sekarang →"}
          </button>
        </form>
      )}
    </div>
  );
}
