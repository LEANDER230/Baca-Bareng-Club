import React from "react";
import Link from "next/link";

const PARTNER_LINKS = {
  donationUrl: "https://bit.ly/DaftarBacaBarengClubGB",
  bookDonationUrl: "https://wa.me/6285694057352?text=Halo%20Admin%20Baca%20Bareng%20Club,%20saya%20ingin%20menyumbang%20buku",
  brandPartnerUrl: "https://wa.me/6285694057352?text=Halo%20Tim%20Grow%20Bareng,%20kami%20tertarik%20kolaborasi%20brand%20dengan%20Baca%20Bareng%20Club",
};

export default function PartnerPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-sky-600 hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 mb-12">
        <span className="text-sky-500 font-bold text-sm uppercase tracking-wider">
          Collaboration & Support
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 mt-2 mb-4">
          Kolaborasi Bareng, Kasih Impact Bareng.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Jangkau audiens anak muda aktif berusia 18–30 tahun (68,4% perempuan) yang peduli pada 
          literasi, kesehatan mental, dan pengembangan diri.
        </p>
      </div>

      {/* RATE CARD / PAKET KOLABORASI BRAND (DARI PROPOSAL) */}
      <div className="grid md:grid-cols-3 gap-6 mb-14">
        <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              Paket 01
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-4 mb-2">
              Collaboration Post / Logo Placement
            </h3>
            <p className="text-2xl font-extrabold text-sky-500 mb-4">Rp 300.000</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Publikasi bersama di media sosial Baca Bareng Club dan penempatan logo brand pada materi promosi acara.
            </p>
          </div>
        </div>

        <div className="bg-white border-2 border-sky-500 rounded-2xl p-7 flex flex-col justify-between shadow-lg shadow-sky-100">
          <div>
            <span className="text-xs font-bold text-white bg-sky-500 px-3 py-1 rounded-full">
              Populer • Paket 02
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-4 mb-2">
              Reels Activity Product
            </h3>
            <p className="text-2xl font-extrabold text-sky-500 mb-4">Rp 500.000</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Konten video Reels kreatif memperkenalkan produk/layanan brand, sudah termasuk <em>logo placement</em> di poster promosi & event.
            </p>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-7 flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold text-sky-600 bg-sky-50 px-3 py-1 rounded-full">
              Paket 03
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 mt-4 mb-2">
              Product Experience & Voucher
            </h3>
            <p className="text-2xl font-extrabold text-sky-500 mb-4">Rp 600.000</p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aktivasi produk langsung kepada peserta Digital Detox / 30-Day Challenge serta distribusi voucher hadiah pemenang.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mb-16">
        <a
          href={PARTNER_LINKS.brandPartnerUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-slate-950 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition"
        >
          Diskusi Kolaborasi Brand via WhatsApp →
        </a>
      </div>

      {/* BAGIAN DONASI & SUMBANG BUKU */}
      <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 sm:p-10 grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-950 mb-3">
            Dukung Gerakan Baca Bareng
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Seluruh kontribusi donasi operasional maupun hibah buku fisik akan disalurkan 
            untuk keberlangsungan ruang baca gratis dan hadiah buku bagi para Growmates.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <a
            href={PARTNER_LINKS.donationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-sky-500 hover:bg-sky-600 text-white font-bold text-center py-3.5 px-6 rounded-xl transition"
          >
            Donasi Operasional (Seikhlasnya)
          </a>
          <a
            href={PARTNER_LINKS.bookDonationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white hover:bg-sky-100 text-slate-900 border border-sky-200 font-bold text-center py-3.5 px-6 rounded-xl transition"
          >
            Sumbang Buku Fisik
          </a>
        </div>
      </div>
    </div>
  );
}
