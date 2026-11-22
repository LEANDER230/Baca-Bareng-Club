import React from "react";

export const metadata = {
  title: "Baca Bareng Club — by Grow Bareng",
  description: "Komunitas Literasi & Self-Growth Anak Muda. 30-Day Challenge & Digital Detox.",
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
      </head>
      <body className="bg-slate-50 text-slate-800 antialiased">
        {children}
      </body>
    </html>
  );
}
