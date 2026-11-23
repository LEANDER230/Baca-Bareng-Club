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
  const [jalurKomitmen, setJalurKomitmen] = useState<"donasi-buku" | "commitment-fee" | "">("");
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
      setErrorMsg("Lengkapi seluruh data diri terlebih dahulu ya.");
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

    if (!jalurKomitmen) {
      setErrorMsg("Pilih salah satu komitmen: Donasi Buku atau Commitment Fee Rp15.000.");
      return;
    }
    if (jalurKomitmen === "donasi-buku" && !detailBuku.trim()) {
      setErrorMsg("Tuliskan judul & penulis buku yang akan didonasikan.");
      return;
    }
    if (jalurKomitmen === "commitment-fee" && !paymentFile) {
      setErrorMsg("Unggah dulu bukti pembayaran QRIS Rp15.000.");
      return;
    }

    try {
      setLoading(true);
      const paymentPayload = paymentFile ? await fileToPayload(paymentFile) : null;

      await submitToSheet({
        program: "digital-detox",
        nama,
        whatsapp,
        sumberInfo: sumberInfo === "Yang lain" ? `Lainnya: ${sumberLain}` : sumberInfo,
        harapan,
        jalurKomitmen,
        detailBuku,
        paymentFile: paymentPayload,
      });

      const updated = await fetchQuota();
      if (updated?.offline) setQuota(updated.offline);
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

      {/* RINGKASAN EVENT */}
      <div className="bg-gradient-to-br from-[#E8F7FF] to-[#F7FCFF] border border-[#CBEBFF] rounded-3xl p-5 sm:p-7 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="bg-[#4CC3FA] text-white text-[11px] font-extrabold tracking-wide px-3 py-1 rounded-full">
            OFFLINE • TAMAN LANGSAT
          </span>
          {loadingQuota ? (
            <span className="bg-white text-slate-500 text-xs font-bold px-3 py-1 rounded-full border border-[#CBEBFF]">
              Mengecek kursi...
            </span>
          ) : quota.isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-3 py-1 rounded-full">
              Kuota Batch Ini Penuh
            </span>
          ) : (
            <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-3 py-1 rounded-full">
              Sisa {quota.remaining} dari {quota.total} Kursi
            </span>
          )}
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] leading-tight">
          Digital Detox: Silent Reading
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
          Minggu, 22 November 2026 • 08.00 – 10.15 WIB • Taman Langsat, Jakarta Selatan
        </p>
        <p className="text-xs text-[#0E5A8A] font-semibold mt-2">
          CP: Fathur (0821 3816 6394) • Disarankan membawa air minum &amp; hadir tepat waktu.
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
            untuk jadwal pembukaan sesi berikutnya.
          </p>
        </div>
      ) : submitted ? (
        <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-7 sm:p-10 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
            ✓
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48] mb-2">
            Kursi Digital Detox Terkonfirmasi!
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed max-w-md mx-auto mb-6">
            Terima kasih <strong>{nama}</strong>! Data kehadiranmu sudah tercatat. Sampai bertemu di Taman Langsat!
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
          {/* PROGRESS BAR 2 LANGKAH */}
          <div className="mb-7">
            <div className="flex items-center justify-between text-xs font-extrabold text-[#0B2D48] mb-2">
              <span>Langkah {step} dari 2</span>
              <span className="text-[#28A9EB]">
                {step === 1 ? "1. Data Peserta" : "2. Komitmen Kehadiran"}
              </span>
            </div>
            <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#4CC3FA] transition-all duration-300 rounded-full"
                style={{ width: step === 1 ? "50%" : "100%" }}
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
                  placeholder="Masukkan nama lengkapmu"
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
                <label className="block text-sm font-bold text-[#0B2D48] mb-1.5">
                  Tau Event Digital Detox dari mana? <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {["Instagram", "Teman", "Komunitas Lainnya", "Yang lain"].map((opsi) => (
                    <button
                      key={opsi}
                      type="button"
                      onClick={() => setSumberInfo(opsi)}
                      className={`py-2.5 px-3 rounded-xl border text-xs font-bold transition ${
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
                    className="mt-2.5 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
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
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 focus:bg-white px-4 py-3.5 text-sm text-[#0B2D48] focus:border-[#4CC3FA] focus:outline-none"
                />
              </div>

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl">{errorMsg}</p>
              )}

              <button
                type="submit"
                className="w-full bg-[#4CC3FA] hover:bg-[#33B5F2] text-white font-extrabold text-base py-4 rounded-2xl shadow-md shadow-[#4CC3FA]/25 transition mt-2"
              >
                Lanjut →
              </button>
            </form>
          )}

          {/* STEP 2: PILIH SALAH SATU KOMITMEN */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-base font-extrabold text-[#0B2D48]">
                  Pilih Komitmen Kehadiran <span className="text-rose-500">*</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pilih salah satu opsi di bawah ini untuk mengunci kursimu.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setJalurKomitmen("donasi-buku");
                  }}
                  className={`text-left p-4 rounded-2xl border-2 transition ${
                    jalurKomitmen === "donasi-buku"
                      ? "border-[#4CC3FA] bg-[#F4FBFF]"
                      : "border-slate-200 hover:border-[#CBEBFF]"
                  }`}
                >
                  <span className="block font-extrabold text-sm text-[#0B2D48]">
                    Donasi Buku
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    Gratis Commitment Fee — bawa 1 buku layak baca saat hari-H.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setErrorMsg("");
                    setJalurKomitmen("commitment-fee");
                  }}
                  className={`text-left p-4 rounded-2xl border-2 transition ${
                    jalurKomitmen === "commitment-fee"
                      ? "border-[#4CC3FA] bg-[#F4FBFF]"
                      : "border-slate-200 hover:border-[#CBEBFF]"
                  }`}
                >
                  <span className="block font-extrabold text-sm text-[#0B2D48]">
                    Commitment Fee Rp15.000
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    Scan QRIS resmi Baca Bareng Club dan unggah bukti bayar.
                  </span>
                </button>
              </div>

              {jalurKomitmen === "donasi-buku" && (
                <div className="bg-[#F4FBFF] border border-[#CBEBFF] rounded-2xl p-4 sm:p-5">
                  <label className="block text-xs font-extrabold text-[#0B2D48] mb-2">
                    Judul &amp; Penulis Buku yang Akan Didonasikan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={detailBuku}
                    onChange={(e) => setDetailBuku(e.target.value)}
                    placeholder="Contoh: Atomic Habits - James Clear"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
                  />
                </div>
              )}

              {jalurKomitmen === "commitment-fee" && (
                <div className="bg-[#F4FBFF] border border-[#CBEBFF] rounded-2xl p-4 sm:p-5 space-y-4">
                  <div className="text-center">
                    <span className="inline-block bg-white border border-[#CBEBFF] text-[#0B2D48] font-extrabold text-xs px-3.5 py-1 rounded-full mb-3">
                      Nominal: Rp15.000
                    </span>
                    <div className="max-w-xs mx-auto bg-white p-3 rounded-2xl border border-[#CBEBFF]">
                      <img
                        src="/qris.jpeg"
                        alt="QRIS Baca Bareng Club"
                        className="w-full h-auto rounded-xl"
                      />
                      <a
                        href="/qris.jpeg"
                        download="QRIS-Baca-Bareng-Club.jpeg"
                        className="inline-block mt-2 text-xs font-extrabold text-[#28A9EB] hover:underline"
                      >
                        Simpan Gambar QRIS ↓
                      </a>
                    </div>
                  </div>

                  <label className="flex flex-col items-center justify-center w-full rounded-2xl border-2 border-dashed border-[#8ED8FC] bg-white hover:bg-[#F0F9FF] p-4 cursor-pointer transition text-center">
                    <span className="text-xs font-extrabold text-[#0B2D48]">
                      {paymentFile ? `✓ ${paymentFile.name}` : "+ Unggah Bukti Pembayaran QRIS"}
                    </span>
                    <span className="text-[11px] text-slate-400 mt-0.5">
                      Format JPG, PNG, atau PDF
                    </span>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                  </label>
                </div>
              )}

              {errorMsg && (
                <p className="text-xs font-bold text-rose-600 bg-rose-50 px-4 py-3 rounded-xl">{errorMsg}</p>
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
                  {loading ? "Mengirim..." : "Kirim Pendaftaran ✓"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
