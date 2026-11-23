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
      setErrorMsg("Lengkapi seluruh data diri terlebih dahulu ya.");
      return;
    }
    setStep(2);
  }

  function goToStep3() {
    setErrorMsg("");
    if (!tagFile) {
      setErrorMsg("Unggah dulu bukti screenshot/PDF tag 5 teman di postingan pinned @bacabareng.club.");
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
    <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10 pb-20">
      <Link href="/" className="inline-flex items-center gap-1.5 text-sm font-bold text-[#28A9EB] hover:underline mb-5">
        <span>←</span>
        <span>Kembali ke Beranda</span>
      </Link>

      {/* RINGKASAN PROGRAM */}
      <div className="bg-gradient-to-br from-[#E8F7FF] to-[#F7FCFF] border border-[#CBEBFF] rounded-3xl p-5 sm:p-7 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="bg-[#4CC3FA] text-white text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full">
            ONLINE • 05.00 – 06.00 WIB
          </span>
          {loadingQuota ? (
            <span className="bg-white text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
              Mengecek slot...
            </span>
          ) : quota.isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full">
              Kuota Batch Ini Penuh
            </span>
          ) : (
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-3 py-1 rounded-full">
              Sisa {quota.remaining} dari {quota.total} Slot
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] leading-tight">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
          Gratis / Bayar Seikhlasnya • Surat Welcoming &amp; PDF Komitmen otomatis dikirim ke email.
        </p>
      </div>

      {/* KONTEN UTAMA */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <div className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Batch Ini Sudah Penuh
          </div>
          <p className="text-sm text-slate-600">
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
        <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-7 sm:p-10 text-center shadow-sm">
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
        <div className="bg-white border border-slate-200/90 rounded-3xl p-5 sm:p-8 shadow-xs">
          {/* PROGRESS BAR 3 LANGKAH */}
          <div className="mb-7">
            <div className="flex items-center justify-between text-xs font-extrabold text-[#0B2D48] mb-2">
              <span>Langkah {step} dari 3</span>
              <span className="text-[#28A9EB]">
                {step === 1 && "1. Data Diri"}
                {step === 2 && "2. Bukti Tag Instagram"}
                {step === 3 && "3. Dukungan & Selesai"}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4CC3FA] transition-all duration-300 rounded-full"
                style={{ width: `${(step / 3) * 100}%` }}
              />
            </div>
          </div>

          {/* STEP 1: DATA DIRI */}
          {step === 1 && (
            <form onSubmit={goToStep2} className="space-y-4">
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb
