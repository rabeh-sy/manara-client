import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin", "arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "منارة - تطبيق تبرعات المساجد",
  description: "تطبيق لإدارة وعرض تبرعات المساجد في سوريا. ابحث عن المساجد في دمشق، حلب، حمص وغيرها من المدن السورية.",
  keywords: "مساجد، تبرعات، سوريا، دمشق، حلب، حمص، منارة",
  authors: [{ name: "منارة" }],
  openGraph: {
    title: "منارة - تطبيق تبرعات المساجد",
    description: "تطبيق لإدارة وعرض تبرعات المساجد في سوريا",
    type: "website",
    locale: "ar",
    siteName: "منارة",
  },
  twitter: {
    card: "summary_large_image",
    title: "منارة - تطبيق تبرعات المساجد",
    description: "تطبيق لإدارة وعرض تبرعات المساجد في سوريا",
  },
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
      <GoogleAnalytics gaId="G-WGT914D0EL" />
    </html>
  );
}
