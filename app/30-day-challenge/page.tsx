"use client";

import React, { useState } from "react";
import Link from "next/link";
import { fileToPayload, submitToSheet } from "../lib/submitRegistration";

const CHALLENGE_DATA = {
  totalSlots: 50,
  remainingSlots: 14, // Ubah ke 0 jika kuota sedang penuh
  schedule: "Setiap Hari • 05.00 - 06.00 WIB",
  fee: "Gratis / Bayar Seikhlasnya",
};

export default function ChallengePage() {
  const isFull = CHALLENGE_DATA.remainingSlots <= 0;

  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [tagFile, setTagFile] = useState<File | null>(null);
  const [donationFile, setDonationFile] = useState<File | null>(null);

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");

    if (!tagFile) {
      setErrorMsg("Silakan unggah bukti screenshot/PDF sudah tag 5 teman di postingan pinned @bacabareng.club.");
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
            ONLINE PROGRAM • VIA ZOOM &amp; WHATSAPP
          </span>
          {isFull ? (
            <span className="bg-slate-200 text-slate-700 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Kuota Batch Ini Penuh ({CHALLENGE_DATA.totalSlots}/{CHALLENGE_DATA.totalSlots} Slot)
            </span>
          ) : (
            <span className="bg-amber-100 text-amber-800 text-xs font-extrabold px-4 py-1.5 rounded-full">
              Urgent: Tersisa {CHALLENGE_DATA.remainingSlots} dari {CHALLENGE_DATA.totalSlots} Slot
            </span>
          )}
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] leading-tight mb-4">
          30 Day Morning Reading Challenge
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-8">
          Ganti kebiasaan <em>doom scrolling</em> tiap pagi dengan bangun jam 05.00 WIB dan membaca buku bareng selama satu bulan penuh ditemani sistem, mentor, dan komunitas yang suportif.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 bg-white p-6 rounded-2xl border border-[#D9F1FF] mb-8">
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Jadwal Sesi</span>
            <p className="font-bold text-[#0B2D48] mt-1">{CHALLENGE_DATA.schedule}</p>
          </div>
          <div>
            <span className="text-xs font-bold text-[#35B6F5] uppercase">Biaya Pendaftaran</span>
            <p className="font-bold text-[#0B2D48] mt-1">{CHALLENGE_DATA.fee}</p>
          </div>
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
              untuk informasi pembukaan batch berikutnya.
            </p>
          </div>
        ) : submitted ? (
          <div className="bg-white border-2 border-[#4CC3FA] rounded-3xl p-8 text-center">
            <div className="w-14 h-14 rounded-full bg-[#E8F7FF] text-[#28A9EB] text-2xl font-extrabold flex items-center justify-center mx-auto mb-4">
              ✓
            </div>
            <h2 className="text-2xl font-extrabold text-[#0B2D48] mb-2">
              Selamat Bergabung, {nama}!
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-md mx-auto mb-6">
              Data pendaftaranmu sudah berhasil dikirim. Cek kotak masuk (atau folder spam) email <strong>{email}</strong> dalam beberapa menit ke depan untuk menerima <strong>Surat Welcoming Resmi + PDF Komitmen</strong>.
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
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B2D48]">
                Formulir Pendaftaran 30 Day Challenge
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Setelah submit, <strong>Surat Welcoming Resmi + PDF Komitmen</strong> akan langsung dikirim ke email kamu secara otomatis.
              </p>
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Nama lengkapmu siapa nih, supaya kita bisa nyapa dengan pas? <span className="text-rose-500">*</span>
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
                Alamat email aktifmu <span className="text-rose-500">*</span>
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Pastikan tulisan emailnya sudah benar dan bebas <em>typo</em> ya, karena surat welcoming dan lampiran PDF komitmenmu akan dikirim ke sini!
              </p>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-[#0B2D48] mb-2">
                Nomor telepon yang terhubung ke WhatsApp <span className="text-rose-500">*</span>
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
                Apa tujuanmu yang spesifik pengen banget kamu capai? <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={tujuan}
                onChange={(e) => setTujuan(e.target.value)}
                placeholder='Contoh: "Rutin baca buku 15 halaman/hari dan berhasil bangun sebelum jam 05.00"'
                className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:border-[#4CC3FA] focus:outline-none"
              />
            </div>

            {/* SYARAT WAJIB TAG 5 TEMAN */}
            <div className="bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-2xl p-5 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label className="text-sm font-extrabold text-[#0B2D48]">
                  Bukti Tag 5 Teman di Postingan Pinned Instagram <span className="text-rose-500">*</span>
                </label>
                <a
                  href="https://instagram.com/bacabareng.club"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold bg-[#4CC3FA] text-white px-3 py-1.5 rounded-lg hover:bg-[#33B5F2] transition"
                >
                  Buka @bacabareng.club →
                </a>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Komentar dan <strong>tag 5 temanmu</strong> pada postingan terbaru yang disematkan (<em>pinned</em>) di Instagram <strong>@bacabareng.club</strong>, lalu unggah bukti tangkapan layar (<em>screenshot</em>) atau PDF-nya di bawah ini.
              </p>
              <input
                type="file"
                accept="image/*,.pdf"
                required
                onChange={(e) => setTagFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-[#0B2D48] file:text-white hover:file:bg-[#123E61]"
              />
            </div>

            {/* DUKUNGAN SUKARELA (OPSIONAL) */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div>
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-[#28A9EB] bg-[#E8F7FF] px-2.5 py-1 rounded-md mb-2">
                  Sukarela / Opsional
                </span>
                <h3 className="text-base font-extrabold text-[#0B2D48]">
                  Bantu Tumbuh Bareng yuk!
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  Kamu bisa menyisihkan dukungan seikhlasnya untuk operasional dan pengembangan program Grow Bareng. <em>(Jika belum berkenan, kamu bisa langsung melewati bagian ini).</em>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-5">
                <div className="w-40 shrink-0 bg-white p-2 rounded-2xl border border-slate-200 text-center">
                  <img
                    src="/qris.jpeg"
                    alt="QRIS Baca Bareng Club"
                    className="w-full h-auto rounded-xl"
                  />
                  <a
                    href="/qris.jpeg"
                    download="QRIS-Baca-Bareng-Club.jpeg"
                    className="inline-block mt-1.5 text-[11px] font-bold text-[#28A9EB] hover:underline"
                  >
                    Unduh QRIS
                  </a>
                </div>

                <div className="text-xs text-slate-700 space-y-2 w-full">
                  <div className="bg-white px-3.5 py-2.5 rounded-xl border border-slate-200">
                    <span className="block text-slate-500">Transfer Bank:</span>
                    <strong className="text-[#0B2D48]">BCA 3210904441</strong> (a.n. <strong>Faisal Reza Pratama</strong>)
                  </div>
                  <div>
                    <label className="block font-bold text-[#0B2D48] mb-1.5">
                      Upload Bukti Dukungan (Opsional • JPG/PNG/PDF)
                    </label>
                    <input
                      type="file"
                      accept="image/*,.pdf"
                      onChange={(e) => setDonationFile(e.target.files?.[0] || null)}
                      className="block w-full text-xs text-slate-600 file:mr-3 file:py-2 file:px-3.5 file:rounded-lg file:border-0 file:font-bold file:bg-slate-200 file:text-slate-700 hover:file:bg-slate-300"
                    />
                  </div>
                </div>
              </div>
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
              {loading ? "Memproses Pendaftaran..." : "Kirim Pendaftaran 30 Day Challenge →"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
