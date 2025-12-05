import type { Metadata } from "next";
import "../globals.css";
import "lenis/dist/lenis.css";
import LenisProvider from "@/src/components/lenis-provider";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Joseph | Frontend Developer & Full Stack Engineer",
  description:
    "Portafolio oficial de Joseph. Ingeniero de Software y Desarrollador Frontend especializado en React, Next.js y Tailwind CSS. Creando experiencias digitales desde Piedecuesta, Santander, Colombia.",
  keywords: [
    "Frontend Developer",
    "Full Stack",
    "React",
    "Next.js",
    "Santander",
    "Colombia",
    "Web Design",
  ],
  authors: [{ name: "Joseph" }],
  openGraph: {
    title: "Joseph | Frontend Developer",
    description: "Ingeniería de software con precisión técnica y alma creativa.",
    url: "https://jpalomino.dev",
    siteName: "Joseph Portfolio",
    locale: "es_CO",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png" },
    ],
  },
  manifest: "/favicon/site.webmanifest",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale} className={inter.variable}>
      <LenisProvider />
      <body suppressHydrationWarning={true} className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
