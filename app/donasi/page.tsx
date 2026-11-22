import React from "react";
import Link from "next/link";

const DONATION_LINKS = {
  operationalUrl: "https://bit.ly/DaftarBacaBarengClubGB",
  bookDonationUrl:
    "https://wa.me/6285694057352?text=Halo%20Admin%20Baca%20Bareng%20Club,%20saya%20ingin%20menyumbang%20buku%20untuk%20komunitas",
};

export default function DonasiPage() {
  return (
    <div className="max-w-4xl mx-auto px-5 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-sky-600 hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 mb-10">
        <span className="text-sky-500 font-bold text-sm uppercase tracking-wider">
          Gerakan Literasi Komunitas
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-950 mt-2 mb-4">
          Bantu Baca Bareng Club Terus Bergerak
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Seluruh program baca bareng kami dapat diikuti secara <strong>gratis / bayar seikhlasnya</strong>. 
          Dukungan dana maupun hibah buku dari kamu disalurkan sepenuhnya untuk operasional Zoom, 
          kebutuhan acara tatap muka, serta hadiah buku bagi para Growmates.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-sky-50 border border-sky-100 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-sky-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              Dukungan Dana
            </span>
            <h2 className="text-2xl font-extrabold text-slate-950 mb-3">
              Donasi Operasional (Seikhlasnya)
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Membantu biaya langganan Zoom meeting harian, perlengkapan sesi Digital Detox di taman, 
              dan ongkos kirim hadiah buku untuk peserta teraktif.
            </p>
          </div>
          <a
            href={DONATION_LINKS.operationalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 rounded-2xl shadow-sm transition"
          >
            Kirim Donasi Sekarang →
          </a>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl p-8 flex flex-col justify-between">
          <div>
            <span className="inline-block bg-slate-900 text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
              Hibah Buku
            </span>
            <h2 className="text-2xl font-extrabold text-slate-950 mb-3">
              Sumbang Buku Fisik
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              Punya buku pengembangan diri, fiksi inspiratif, atau nonfiksi yang sudah selesai dibaca? 
              Salurkan agar bisa dibaca bersama oleh para Growmates lainnya.
            </p>
          </div>
          <a
            href={DONATION_LINKS.bookDonationUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-slate-950 hover:bg-slate-800 text-white font-bold py-4 rounded-2xl transition"
          >
            Konfirmasi Sumbang Buku via WA →
          </a>
        </div>
      </div>
    </div>
  );
}
