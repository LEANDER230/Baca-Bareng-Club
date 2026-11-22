import React from "react";
import Link from "next/link";

const BOOK_DONATION_URL =
  "https://wa.me/6285694057352?text=Halo%20Admin%20Baca%20Bareng%20Club,%20saya%20ingin%20menyumbang%20buku%20untuk%20komunitas";

export default function DonasiPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-16">
      <Link href="/" className="text-sm font-bold text-[#28A9EB] hover:underline">
        ← Kembali ke Beranda
      </Link>

      <div className="mt-6 mb-10">
        <span className="text-[#35B6F5] font-bold text-sm uppercase tracking-wider">
          Gerakan Literasi Komunitas
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-[#0B2D48] mt-2 mb-4">
          Donasi &amp; Sumbang Buku
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Punya buku bacaan yang sudah selesai dibaca dan ingin berbagi manfaatnya? 
          Hibahkan bukumu agar bisa terus dibaca bersama dan menjadi hadiah apresiasi bagi para Growmates.
        </p>
      </div>

      {/* KARTU KHUSUS DONASI BUKU */}
      <div className="bg-[#F4FBFF] border-2 border-[#CBEBFF] rounded-3xl p-8 sm:p-12">
        <span className="inline-block bg-[#4CC3FA] text-white text-xs font-bold px-3.5 py-1.5 rounded-full mb-5">
          Hibah Buku Fisik
        </span>

        <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0B2D48] mb-4">
          Salurkan Buku Terbaikmu untuk Komunitas
        </h2>

        <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
          Kami menerima sumbangan buku fisik layak baca dalam berbagai kategori—mulai dari buku 
          pengembangan diri (<em>self-improvement</em>), psikologi populer, biografi, bisnis, 
          hingga novel fiksi inspiratif.
        </p>

        <ul className="space-y-3 text-sm sm:text-base text-[#0B2D48] mb-9">
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span>Buku dalam kondisi bersih, halaman lengkap, dan layak baca.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span>Akan disalurkan untuk sesi baca bersama saat Digital Detox dan apresiasi peserta 30-Day Challenge.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-[#35B6F5] font-extrabold">✓</span>
            <span>Konfirmasi judul buku dan alamat pengiriman langsung melalui WhatsApp admin kami.</span>
          </li>
        </ul>

        <a
          href={BOOK_DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto text-center bg-[#0B2D48] hover:bg-[#123E61] text-white font-bold px-8 py-4 rounded-2xl transition"
        >
          Konfirmasi Sumbang Buku via WhatsApp →
        </a>
      </div>
    </div>
  );
}
