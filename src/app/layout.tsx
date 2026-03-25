import type { Metadata } from "next";
import { Sora, Inter } from "next/font/google";
import "./globals.css";

const sora = Sora({
  variable: "--font-sora-var",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter-var",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pico — A Tiny Robot That Feels Alive",
  description:
    "Meet Pico, the expressive robot companion that reacts, rests, plays, and connects. Not just a device — a presence.",
  openGraph: {
    title: "Pico — A Tiny Robot That Feels Alive",
    description:
      "Meet Pico, the expressive robot companion that reacts, rests, plays, and connects.",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
