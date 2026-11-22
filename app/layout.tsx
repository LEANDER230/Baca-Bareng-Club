import React from "react";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Baca Bareng Club. — by Grow Bareng",
  description:
    "Komunitas Literasi & Self-Growth Anak Muda Indonesia. 30-Day Morning Reading Challenge & Digital Detox.",
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
      <body className="bg-white text-slate-900 antialiased selection:bg-sky-200 selection:text-sky-900">
        <Navbar />
        <main>{children}</main>
        <footer className="bg-slate-950 text-white py-14 mt-20">
          <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-extrabold text-2xl tracking-tight mb-2">
                Baca Bareng <span className="text-sky-400">Club.</span>
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Baca Bareng, Kolaborasi Bareng, Kasih Impact Bareng. Intellectual Property (IP) turunan dari Grow Bareng.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-sky-400 mb-3">
                Program Utama
              </h4>
              <ul className="space-y-2 text-sm text-slate-300">
                <li><a href="/30-day-challenge" className="hover:text-white">30-Day Morning Reading Challenge</a></li>
                <li><a href="/digital-detox" className="hover:text-white">Digital Detox di Taman</a></li>
                <li><a href="/partner" className="hover:text-white">Brand Collaboration & Donasi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-sm uppercase tracking-wider text-sky-400 mb-3">
                Terhubung dengan Kami
              </h4>
              <p className="text-sm text-slate-300 mb-1">Instagram: @bacabareng.club</p>
              <p className="text-sm text-slate-300">Web: www.growbarengplatform.com</p>
            </div>
          </div>
          <div className="max-w-6xl mx-auto px-5 pt-8 mt-8 border-t border-slate-800 text-xs text-slate-500 text-center">
            © {new Date().getFullYear()} Baca Bareng Club by Grow Bareng. All rights reserved.
          </div>
        </footer>
      </body>
    </html>
  );
}
