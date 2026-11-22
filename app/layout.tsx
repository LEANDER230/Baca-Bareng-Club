import React from "react";
import Navbar, { GrowBarengLogo } from "./components/Navbar";

export const metadata = {
  title: "Baca Bareng Club | Komunitas Literasi & Self-Growth",
  description:
    "Ruang baca bareng yang hangat, ramah, dan suportif bagi anak muda Indonesia. 30-Day Morning Reading Challenge & Digital Detox.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <style>{`
          body { font-family: 'Plus Jakarta Sans', sans-serif; }
        `}</style>
      </head>
      <body className="bg-white text-slate-900 antialiased selection:bg-[#8EE0FF]/50 selection:text-[#0B3553]">
        <Navbar />
        <main>{children}</main>

        {/* FOOTER DENGAN TONE BIRU GELAP LEMBUT & POWERED BY GROW BARENG */}
        <footer className="bg-[#0B2D48] text-white pt-16 pb-10 mt-24">
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-12 gap-10 pb-12 border-b border-sky-900/70">
            <div className="md:col-span-5">
              <h3 className="font-extrabold text-2xl tracking-tight mb-3">
                Baca Bareng Club
              </h3>
              <p className="text-sky-100/75 text-sm leading-relaxed max-w-sm mb-6">
                Baca Bareng, Kolaborasi Bareng, Kasih Impact Bareng. Ruang tumbuh yang nyaman untuk membangun kebiasaan membaca setiap hari.
              </p>
              <div className="inline-flex flex-col gap-2 bg-[#082238] border border-sky-900/80 px-5 py-3.5 rounded-2xl">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-sky-200/70">
                  Powered by
                </span>
                <GrowBarengLogo />
              </div>
            </div>

            <div className="md:col-span-4">
              <h4 className="font-bold text-sm text-[#8EE0FF] mb-4">Program &amp; Halaman</h4>
              <ul className="space-y-2.5 text-sm text-sky-100/80">
                <li>
                  <a href="/30-day-challenge" className="hover:text-[#4CC3FA] transition">
                    30-Day Morning Reading Challenge
                  </a>
                </li>
                <li>
                  <a href="/digital-detox" className="hover:text-[#4CC3FA] transition">
                    Digital Detox: Silent Reading
                  </a>
                </li>
                <li>
                  <a href="/kolaborasi" className="hover:text-[#4CC3FA] transition">
                    Kolaborasi Brand &amp; Media Partner
                  </a>
                </li>
                <li>
                  <a href="/donasi" className="hover:text-[#4CC3FA] transition">
                    Donasi &amp; Sumbang Buku
                  </a>
                </li>
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="font-bold text-sm text-[#8EE0FF] mb-4">Kontak &amp; Sosial Media</h4>
              <ul className="space-y-2.5 text-sm text-sky-100/80">
                <li>
                  <a
                    href="https://instagram.com/bacabareng.club"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#4CC3FA] transition"
                  >
                    Instagram: @bacabareng.club
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-6xl mx-auto px-6 pt-8 text-xs text-sky-200/50 flex flex-col sm:flex-row justify-between items-center gap-2">
            <span>© {new Date().getFullYear()} Baca Bareng Club. All rights reserved.</span>
            <span>An initiative by Grow Bareng</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
