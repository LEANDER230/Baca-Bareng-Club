"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { fetchQuota, fileToPayload, submitToSheet } from "../lib/submitRegistration";

export default function DigitalDetoxPage() {
  const [quota, setQuota] = useState({ total: 20, remaining: 20, isFull: false });
  const [loadingQuota, setLoadingQuota] = useState(true);

  const [step, setStep] = useState<1 | 2>(1);
  const [nama, setNama] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [sumberInfo, setSumberInfo] = useState("Instagram");
  const [sumberLain, setSumberLain] = useState("");
  const [harapan, setHarapan] = useState("");
  const [detailBuku, setDetailBuku] = useState("");
  const [paymentFile, setPaymentFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    fetchQuota().then((data) => {
      if (data?.offline) setQuota(data.offline);
      setLoadingQuota(false);
    });
  }, []);

  function goToStep2(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    if (!nama.trim() || !whatsapp.trim() || !harapan.trim()) {
      setErrorMsg("Lengkapi seluruh data diri wajib pada Langkah 1 terlebih dahulu.");
      return;
    }
    if (sumberInfo === "Yang lain" && !sumberLain.trim()) {
      setErrorMsg("Sebutkan sumber informasi event terlebih dahulu.");
      return;
    }
    setStep(2);
  }

  async function handleFinalSubmit() {
    setErrorMsg("");

    if (!paymentFile) {
      setErrorMsg("Unggah bukti pembayaran Commitment Fee Rp15.000 via QRIS terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      const paymentPayload = await fileToPayload(paymentFile);

      await submitToSheet({
        program: "digital-detox",
        nama,
        whatsapp,
        sumberInfo: sumberInfo === "Yang lain" ? `Lainnya: ${sumberLain}` : sumberInfo,
        harapan,
        jalurKomitmen: "Commitment Fee Rp15.000",
        detailBuku: detailBuku.trim() ? detailBuku.trim() : "Tidak membawa donasi buku",
        paymentFile: paymentPayload,
      });

      const updated = await fetchQuota();
      if (updated?.offline) setQuota(updated.offline);
      setSubmitted(true);
    } catch {
      setErrorMsg("Terjadi kendala koneksi. Silakan coba kirim ulang.");
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

      {/* KARTU INFO EVENT */}
      <div className="bg-white border border-[#CBEBFF] rounded-3xl overflow-hidden shadow-xs mb-6">
        <div className="bg-gradient-to-r from-[#E8F7FF] to-[#F4FBFF] px-5 sm:px-8 py-6 border-b border-[#CBEBFF]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <span className="bg-[#4CC3FA] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full">
              Offline Event Vol. 6
            </span>
            {loadingQuota ? (
              <span className="bg-white text-slate-500 text-xs font-bold px-3.5 py-1 rounded-full border border-[#CBEBFF]">
                Memuat kursi...
              </span>
            ) : quota.isFull ? (
              <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3.5 py-1 rounded-full">
                Kuota Penuh ({quota.total}/{quota.total})
              </span>
            ) : (
              <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-3.5 py-1 rounded-full">
                Sisa {quota.remaining} dari {quota.total} Kursi
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] tracking-tight">
            Digital Detox: Silent Reading
          </h1>
          <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
            Tutup sosial media, buka halaman pertama. Nikmati sesi membaca buku fisik bersama di ruang terbuka hijau.
          </p>
        </div>

        {/* DETAIL JADWAL & CATATAN RAPI TANPA PEMISAH TITIK */}
        <div className="p-5 sm:p-8 space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Hari &amp; Waktu
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">Minggu, 22 November 2026</p>
              <p className="text-xs text-slate-500 mt-0.5">Pukul 08.00 – 10.15 WIB</p>
            </div>

            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Lokasi &amp; Commitment Fee
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">Taman Langsat, Jakarta Selatan</p>
              <p className="text-xs text-slate-500 mt-0.5">Commitment Fee: Rp15.000</p>
            </div>
          </div>

          <div className="border-t border-slate-100 pt-4">
            <h2 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-3">
              Benefit &amp; Ketentuan Peserta
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="text-[#35B6F5] font-extrabold">✓</span>
                <span>Baca bareng, sharing seru, &amp; self reflection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#35B6F5] font-extrabold">✓</span>
                <span>Hadir tepat waktu sebelum sesi dimulai</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#35B6F5] font-extrabold">✓</span>
                <span>Disarankan membawa air minum pribadi</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#35B6F5] font-extrabold">✓</span>
                <span>
                  Contact Person: <strong>Fathur</strong> (0821 3816 6394)
                </span>
              </li>
            </ul>
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
            Kursi Berhasil Diamankan!
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
            Terima kasih <strong>{nama}</strong>! Bukti Commitment Fee Rp15.000 sudah diterima. Sampai bertemu di Taman Langsat!
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
                  Langkah {step} dari 2
                </p>
                <h2 className="text-base sm:text-lg font-extrabold text-[#0B2D48]">
                  {step === 1 ? "Data Peserta & Donasi Buku" : "Pembayaran Commitment Fee"}
                </h2>
              </div>
            </div>
            <div className="flex gap-1.5">
              <span className={`h-2 w-8 rounded-full ${step >= 1 ? "bg-[#4CC3FA]" : "bg-slate-200"}`} />
              <span className={`h-2 w-8 rounded-full ${step >= 2 ? "bg-[#4CC3FA]" : "bg-slate-200"}`} />
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
                  placeholder="Masukkan nama lengkapmu"
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
                <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                  Tau Event Digital Detox dari mana? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2.5">
                  {["Instagram", "Teman", "Komunitas Lainnya", "Yang lain"].map((opsi) => (
                    <button
                      key={opsi}
                      type="button"
                      onClick={() => setSumberInfo(opsi)}
                      className={`py-3 px-3.5 rounded-2xl border text-xs font-bold transition ${
                        sumberInfo === opsi
                          ? "border-[#4CC3FA] bg-[#F4FBFF] text-[#0B2D48]"
                          : "border-slate-200 text-slate-600 hover:border-[#CBEBFF]"
                      }`}
                    >
                      {opsi}
                    </button>
                  ))}
                </div>
                {sumberInfo === "Yang lain" && (
                  <input
                    type="text"
                    required
                    value={sumberLain}
                    onChange={(e) => setSumberLain(e.target.value)}
                    placeholder="Sebutkan sumber informasinya..."
                    className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Apa yang kamu harapkan dari event ini? <span className="text-rose-500">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={harapan}
                  onChange={(e) => setHarapan(e.target.value)}
                  placeholder="Ceritakan harapanmu mengikuti sesi ini..."
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
                />
              </div>

              {/* DONASI BUKU OPSIONAL */}
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <label className="text-sm font-extrabold text-[#0B2D48]">
                    Punya buku bagus yang sudah selesai dibaca?
                  </label>
                  <span className="shrink-0 text-[10px] font-extrabold uppercase tracking-wider text-[#28A9EB] bg-white border border-[#CBEBFF] px-2.5 py-0.5 rounded-full">
                    Opsional
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Yuk donasikan ke Baca Bareng Club untuk kami <em>giveaway</em> kepada peserta yang menyelesaikan 30 Day Reading Challenge. Jika ada, tulis Nama &amp; Judul Bukunya di bawah:
                </p>
                <input
                  type="text"
                  value={detailBuku}
                  onChange={(e) => setDetailBuku(e.target.value)}
                  placeholder="Contoh: Atomic Habits - James Clear (kosongkan jika tidak ada)"
                  className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none mt-1"
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
                Lanjut ke Pembayaran →
              </button>
            </form>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-5 space-y-4">
                <div className="text-center">
                  <span className="inline-block bg-white border border-[#CBEBFF] text-[#0B2D48] font-extrabold text-xs px-4 py-1.5 rounded-full mb-2">
                    Commitment Fee (Wajib): Rp15.000
                  </span>
                  <p className="text-xs text-slate-600 max-w-sm mx-auto mb-3">
                    Scan kode <strong>QRIS BACA BARENG CLUB</strong> di bawah ini menggunakan e-wallet atau mobile banking apa saja.
                  </p>

                  <div className="max-w-[235px] mx-auto bg-white p-3 rounded-2xl border border-[#CBEBFF] shadow-2xs">
                    <img
                      src="/qris.jpeg"
                      alt="QRIS Baca Bareng Club"
                      className="w-full h-auto rounded-xl"
                    />
                    <a
                      href="/qris.jpeg"
                      download="QRIS-Baca-Bareng-Club.jpeg"
                      className="inline-block mt-2.5 text-xs font-extrabold text-[#28A9EB] hover:underline"
                    >
                      Simpan Gambar QRIS ↓
                    </a>
                  </div>
                </div>

                <label className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-white hover:bg-[#F0F9FF] p-4 cursor-pointer transition text-center">
                  <span className="text-xs font-extrabold text-[#0B2D48]">
                    {paymentFile ? `✓ ${paymentFile.name}` : "+ Unggah Bukti Pembayaran Rp15.000 *"}
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5">
                    {paymentFile ? "Ketuk untuk mengganti file" : "Wajib (Format JPG, PNG, atau PDF)"}
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                    className="hidden"
                  />
                </label>
              </div>

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
                    setStep(1);
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
