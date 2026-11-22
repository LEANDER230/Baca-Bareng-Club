import React from "react";
import Link from "next/link";

const BRAND_CONTACT_URL =
  "https://wa.me/6285694057352?text=Halo%20Tim%20Grow%20Bareng,%20kami%20tertarik%20kolaborasi%20brand%20dengan%20Baca%20Bareng%20Club";

export default function KolaborasiPage() {
  return (
    <div className="max-w-5xl mx-auto px-5 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-sky-600 hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 mb-12">
        <span className="text-sky-500 font-bold text-sm uppercase tracking-wider">
          Brand & Media Partnership
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 mt-2 mb-4">
          Hi, Brand! Let&apos;s Make Something Matter.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg max-w-2xl leading-relaxed">
          Jangkau audiens anak muda aktif berusia 18-30 tahun (68,4% perempuan) yang peduli pada 
          literasi, kesehatan mental, dan pengembangan diri.
        </p>
      </div>

      {/* RATE CARD / PAKET KOLABORASI BRAND */}
      <div className="grid md:grid-cols-3 gap-6 mb-12">
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
              Konten video Reels kreatif memperkenalkan produk atau layanan brand, sudah termasuk <em>logo placement</em> di poster promosi & event.
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

      <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h2 className="text-2xl font-extrabold mb-2">Siap Berkolaborasi Bersama Kami?</h2>
          <p className="text-slate-300 text-sm">
            Terbuka juga untuk diskusi paket kolaborasi khusus sesuai kebutuhan kampanye brand kamu.
          </p>
        </div>
        <a
          href={BRAND_CONTACT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold px-7 py-4 rounded-2xl transition whitespace-nowrap"
        >
          Hubungi Tim Partnership →
        </a>
      </div>
    </div>
  );
}
