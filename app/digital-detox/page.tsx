"use client";

import React, { useState } from "react";
import Link from "next/link";
import { fileToPayload, submitToSheet } from "../lib/submitRegistration";

const OFFLINE_DATA = {
  totalSeats: 20,
  remainingSeats: 6, // Ubah ke 0 jika kuota sedang penuh
  title: "Baca Bareng Vol.6 - Taman Langsat",
  location: "Taman Langsat, Jakarta Selatan",
  schedule: "Minggu, 22 November 2026 • 08.00 - 10.15 WIB",
  cpName: "Fathur",
  cpPhone: "0821 3816 6394",
};

export default function DigitalDetoxPage() {
  const isFull = OFFLINE_DATA.remainingSeats <= 0;

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!jalurKomitmen) {
      setErrorMsg("Silakan pilih salah satu komitmen: Donasi Buku atau Commitment Fee Rp15.000.");
      return;
    }
    if (jalurKomitmen === "donasi-buku" && !detailBuku.trim()) {
      setErrorMsg("Tuliskan nama dan judul buku yang akan kamu donasikan.");
      return;
    }
    if (jalurKomitmen === "commitment-fee" && !paymentFile) {
      setErrorMsg("Silakan unggah bukti pembayaran Commitment Fee Rp15.000.");
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

      setSubmitted(true);
    } catch {
      setErrorMsg("Terjadi kendala koneksi. Silakan coba kirim ulang beberapa saat lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-5 sm:px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-3xl p-6 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <span className="bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full">
            OFFLINE EVENT • TATAP MUKA
          </span>
          {isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Kuota Batch Ini Penuh ({OFFLINE_DATA.totalSeats}/{OFFLINE_DATA.totalSeats} Kursi)
            </span>
          ) : (
            <span className="bg-rose-100 text-rose-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Kuota Ketat! Sisa {OFFLINE_DATA.remainingSeats} dari {OFFLINE_DATA.totalSeats} Kursi
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-3">
          Digital Detox: Silent Reading
        </h1>
        <p className="text-sm font-bold text-[#28A9EB] mb-4">{OFFLINE_DATA.title}</p>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Tutup Sosial Media, Buka Halaman Pertama. Yuk, tinggalkan sejenak layar ponselmu dan nikmati waktu membaca buku fisik langsung di ruang terbuka hijau bersama teman-teman baru.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Lokasi Pertemuan</span>
            <p className="font-bold text-[#0B2D48] mt-1">{OFFLINE_DATA.location}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Waktu Pelaksanaan</span>
            <p className="font-bold text-[#0B2D48] mt-1">{OFFLINE_DATA.schedule}</p>
          </div>
        </div>

        <div className="bg-white/80 rounded-2xl border border-[#D9F1FF] p-5 mb-8 text-sm text-slate-700 space-y-1.5">
          <p className="font-extrabold text-[#0B2D48] mb-2">Catatan Peserta:</p>
          <p>• Benefit: Baca Bareng, Sharing Seru, Teman Baru, dan Self Reflection.</p>
          <p>• Mohon hadir tepat waktu demi kelancaran acara &amp; disarankan membawa air minum.</p>
          <p>
            • Contact Person: <strong>{OFFLINE_DATA.cpName}</strong> ({OFFLINE_DATA.cpPhone})
          </p>
        </div>

        {isFull ? (
          <div className="bg-white rounded-2xl border border-[#CBEBFF] p-8 text-center">
            <div className="inline-block bg-slate-200 text-slate-600 font-extrabold text-base px-6 py-3 rounded-xl mb-3">
              Kuota Batch Ini Sudah Penuh
            </div>
            <p className="text-sm text-slate-500">
              Pantau Instagram{" "}
              <a
                href="https://instagram.com/bacabareng.club"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-[#28A9EB] hover:underline"
              >
                @bacabareng.club
              </a>{" "}
              untuk jadwal pembukaan batch berikutnya.
            </p>
          </div>
        ) : submitted ? (
          <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B2D48] mb-2">
              Pendaftaran Digital Detox Berhasil!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
              Terima kasih <strong>{nama}</strong>! Data kamu sudah tercatat di sistem panitia. Sampai jumpa di {OFFLINE_DATA.location}!
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
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-[#CBEBFF] p-6 sm:p-8 space-y-6">
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48]">
              Formulir Pendaftaran Digital Detox
            </h2>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Nama Lengkap <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                placeholder="Masukkan nama lengkapmu"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Nomor WhatsApp <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                placeholder="Contoh: 081234567890"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Tau Event Digital Detox by Baca Bareng ini dari mana? <span className="text-rose-500">*</span>
              </label>
              <div className="space-y-2 text-sm text-slate-700">
                {["Instagram", "Teman", "Komunitas Lainnya", "Yang lain"].map((opsi) => (
                  <label key={opsi} className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="radio"
                      name="sumberInfo"
                      value={opsi}
                      checked={sumberInfo === opsi}
                      onChange={(e) => setSumberInfo(e.target.value)}
                      className="accent-[#4CC3FA]"
                    />
                    <span>{opsi}</span>
                  </label>
                ))}
                {sumberInfo === "Yang lain" && (
                  <input
                    type="text"
                    required
                    value={sumberLain}
                    onChange={(e) => setSumberLain(e.target.value)}
                    placeholder="Sebutkan sumber informasinya..."
                    className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm focus:border-[#4CC3FA] focus:outline-none"
                  />
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Apa nih yang kamu cari atau harapkan dari event ini? <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={harapan}
                onChange={(e) => setHarapan(e.target.value)}
                placeholder="Ceritakan harapanmu mengikuti sesi ini..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
              />
            </div>

            {/* PILIHAN KOMITMEN (WAJIB SALAH SATU) */}
            <div className="pt-2 border-t border-[#E8F7FF]">
              <label className="block text-sm font-bold text-[#0B2D48] mb-1">
                Pilih Komitmen Kehadiran (Wajib Pilih Salah Satu) <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-4">
                Jika kamu membawa buku fisik untuk didonasikan saat acara, kamu bebas dari biaya Commitment Fee.
              </p>

              <div className="grid sm:grid-cols-2 gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setJalurKomitmen("donasi-buku")}
                  className={`text-left p-4 rounded-2xl border-2 transition ${
                    jalurKomitmen === "donasi-buku"
                      ? "border-[#4CC3FA] bg-[#F4FBFF]"
                      : "border-slate-200 hover:border-[#CBEBFF]"
                  }`}
                >
                  <span className="block font-extrabold text-sm text-[#0B2D48]">
                    Opsi A: Donasi Buku
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    Gratis Commitment Fee — bawa 1 buku layak baca untuk giveaway peserta 30 Day Challenge.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setJalurKomitmen("commitment-fee")}
                  className={`text-left p-4 rounded-2xl border-2 transition ${
                    jalurKomitmen === "commitment-fee"
                      ? "border-[#4CC3FA] bg-[#F4FBFF]"
                      : "border-slate-200 hover:border-[#CBEBFF]"
                  }`}
                >
                  <span className="block font-extrabold text-sm text-[#0B2D48]">
                    Opsi B: Commitment Fee Rp15.000
                  </span>
                  <span className="block text-xs text-slate-500 mt-1">
                    Bayar via QRIS atau transfer bank dan unggah bukti pembayarannya.
                  </span>
                </button>
              </div>

              {jalurKomitmen === "donasi-buku" && (
                <div className="bg-[#F4FBFF] border border-[#CBEBFF] rounded-2xl p-5">
                  <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                    Tuliskan Nama &amp; Judul Buku yang Akan Didonasikan <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={detailBuku}
                    onChange={(e) => setDetailBuku(e.target.value)}
                    placeholder="Contoh: Atomic Habits - James Clear"
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
                  />
                </div>
              )}

              {jalurKomitmen === "commitment-fee" && (
                <div className="bg-[#F4FBFF] border border-[#CBEBFF] rounded-2xl p-5 space-y-4">
                  <div className="flex flex-col sm:flex-row items-center gap-5">
                    <div className="w-44 shrink-0 bg-white p-2 rounded-2xl border border-[#CBEBFF] text-center">
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
                        Unduh Gambar QRIS
                      </a>
                    </div>

                    <div className="text-sm text-slate-700 space-y-2">
                      <p className="font-extrabold text-[#0B2D48] text-base">
                        Nominal: Rp15.000
                      </p>
                      <p>
                        Scan kode <strong>QRIS BACA BARENG CLUB</strong> di samping menggunakan e-wallet atau mobile banking apa saja.
                      </p>
                      <div className="bg-white px-3.5 py-2.5 rounded-xl border border-[#D9F1FF] text-xs">
                        <span className="block text-slate-500">Alternatif Transfer Bank:</span>
                        <strong className="text-[#0B2D48]">BCA 3210904441</strong> a.n. <strong>Faisal Reza Pratama</strong>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                      Upload Bukti Pembayaran (JPG / PNG / PDF) <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      required
                      onChange={(e) => setPaymentFile(e.target.files?.[0] || null)}
                      className="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#4CC3FA] file:text-white hover:file:bg-[#33B5F2]"
                    />
                  </div>
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold px-4 py-3 rounded-xl">
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#4CC3FA] hover:bg-[#33B5F2] disabled:bg-slate-300 text-white font-extrabold text-base sm:text-lg py-4 rounded-2xl shadow-lg shadow-[#4CC3FA]/30 transition"
            >
              {loading ? "Mengirim Pendaftaran..." : "Kirim Pendaftaran Digital Detox →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
