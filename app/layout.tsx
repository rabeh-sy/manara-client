import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منارة - تطبيق تبرعات المساجد",
  description: "تطبيق لإدارة وعرض تبرعات المساجد في سوريا",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${rubik.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
