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
  const [sumberInfo, setSumberInfo] = useState("Instagram @bacabareng.club");
  const [harapan, setHarapan] = useState("");
  const [donasiBuku, setDonasiBuku] = useState<"ya" | "tidak">("tidak");
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
      setErrorMsg("Lengkapi seluruh data peserta pada Langkah 1 terlebih dahulu.");
      return;
    }
    if (donasiBuku === "ya" && !detailBuku.trim()) {
      setErrorMsg("Tuliskan judul/jenis buku yang ingin kamu donasikan.");
      return;
    }
    setStep(2);
  }

  async function handleFinalSubmit() {
    setErrorMsg("");
    if (!paymentFile) {
      setErrorMsg("Unggah bukti pembayaran komitmen Rp25.000 terlebih dahulu.");
      return;
    }

    try {
      setLoading(true);
      const paymentPayload = await fileToPayload(paymentFile);

      await submitToSheet({
        program: "digital-detox",
        nama,
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
      const detail = err instanceof Error ? err.message : "Silakan coba kirim ulang.";
      setErrorMsg(`Gagal mengirim: ${detail}`);
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
              Offline Event • Vol. 7
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
                Tersisa {quota.remaining} dari {quota.total} Kursi
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] tracking-tight">
            Digital Detox Vol. 7: Silent Reading
          </h1>
          <p className="text-slate-600 text-sm mt-1.5 leading-relaxed">
            Simpan sejenak ponselmu, bawa buku fisik favoritmu, dan nikmati sesi membaca tenang serta diskusi hangat di ruang terbuka hijau.
          </p>
        </div>

        {/* DETAIL WAKTU, LOKASI & GOOGLE MAPS */}
        <div className="p-5 sm:p-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Hari &amp; Waktu
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">
                Sabtu, 5 Desember 2026
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Pukul 08.00 – 10.15 WIB
              </p>
            </div>

            <div className="bg-[#F8FCFF] border border-[#E1F3FF] rounded-2xl p-4">
              <span className="block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB]">
                Titik Kumpul Lokasi
              </span>
              <p className="text-sm font-bold text-[#0B2D48] mt-1">
                Taman Suropati
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Menteng, Jakarta Pusat
              </p>
            </div>
          </div>

          {/* PETA GOOGLE MAPS INTERAKTIF */}
          <div className="rounded-2xl overflow-hidden border border-[#CBEBFF] bg-[#F8FCFF]">
            <iframe
              title="Peta Lokasi Taman Suropati, Jakarta Pusat"
              src="https://maps.google.com/maps?q=Taman%20Suropati%20Menteng%20Jakarta%20Pusat&t=&z=16&ie=UTF8&iwloc=&output=embed"
              className="w-full h-52 sm:h-60 border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="px-4 py-2.5 bg-white border-t border-[#E1F3FF] flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-600 truncate">
                Jl. Taman Suropati, Menteng, Jakarta Pusat
              </span>
              <a
                href="https://maps.google.com/?q=Taman+Suropati+Jakarta+Pusat"
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 text-xs font-extrabold text-[#28A9EB] hover:underline"
              >
                Buka Google Maps ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* AREA FORMULIR */}
      {!loadingQuota && quota.isFull ? (
        <div className="bg-white border border-slate-200 rounded-3xl p-8 text-center">
          <span className="inline-block bg-slate-100 text-slate-700 font-extrabold text-sm px-5 py-2.5 rounded-full mb-3">
            Kuota Digital Detox Vol. 7 Sudah Penuh
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
            untuk jadwal sesi offline berikutnya.
          </p>
        </div>
      ) : submitted ? (
        <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-8 sm:p-10 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
            Kursi Kamu Terdaftar, {nama}!
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
            Sampai bertemu di <strong>Taman Suropati, Jakarta Pusat</strong> pada{" "}
            <strong>Sabtu, 5 Desember 2026 (08.00 – 10.15 WIB)</strong>. Admin akan menghubungi WhatsApp{" "}
            <strong>{whatsapp}</strong> untuk undangan grup koordinasi.
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
                  {step === 1 ? "Data Peserta & Donasi Buku" : "Commitment Fee & Konfirmasi"}
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
                  placeholder="Nama panggilan / lengkapmu"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Nomor WhatsApp Aktif <span className="text-rose-500">*</span>
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
                  Tahu Event Ini dari Mana?
                </label>
                <select
                  value={sumberInfo}
                  onChange={(e) => setSumberInfo(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
                >
                  <option value="Instagram @bacabareng.club">Instagram @bacabareng.club</option>
                  <option value="Teman / Komunitas">Teman / Komunitas</option>
                  <option value="TikTok / Reels">TikTok / Reels</option>
                  <option value="Alumni Batch Sebelumnya">Alumni Batch Sebelumnya</option>
                  <option value="Lainnya">Lainnya</option>
                </select>
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/60 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none transition"
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
                        ? "bg-[#4CC3FA] text-white border-[#4CC3FA]"
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
                    placeholder="Tuliskan judul/genre buku yang akan didonasikan"
                    className="w-full rounded-xl border border-[#CBEBFF] bg-white px-3.5 py-2.5 text-xs text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none"
                  />
                )}
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
              <div className="bg-[#F8FCFF] border border-[#CBEBFF] rounded-2xl p-5 text-center">
                <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#28A9EB] bg-[#E8F7FF] px-3.5 py-1 rounded-full mb-2">
                  Commitment Fee: Rp25.000
                </span>
                <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
                  Scan QRIS di bawah ini sebesar <strong>Rp25.000</strong> untuk mengunci kursi kehadiranmu pada <strong>Sabtu, 5 Desember 2026</strong> di <strong>Taman Suropati</strong>.
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
                    Simpan Gambar QRIS ↓
                  </a>
                </div>
              </div>

              <label className="block w-full min-w-0 rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-[#F9FDFF] hover:bg-[#F0F9FF] p-5 cursor-pointer transition text-center">
                {paymentFile ? (
                  <div className="min-w-0 space-y-1">
                    <span className="inline-block bg-[#E8F7FF] text-[#0E5A8A] text-[11px] font-extrabold px-2.5 py-0.5 rounded-full">
                      Bukti Terpilih ✓
                    </span>
                    <p className="w-full truncate px-2 text-xs sm:text-sm font-bold text-[#0B2D48]">
                      {paymentFile.name}
                    </p>
                    <p className="text-[11px] text-slate-400">Ketuk untuk mengganti file</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-sm font-extrabold text-[#0B2D48]">
                      + Unggah Bukti Pembayaran QRIS
                    </p>
                    <p className="text-xs text-slate-400">
                      Format Screenshot (JPG/PNG) atau PDF
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
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
                  {loading ? "Mengirim..." : "Kunci Kursi & Daftar ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
