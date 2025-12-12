import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  title: "Axiom Trade Pulse - Real-Time Token Discovery & Trading",
  description: "Discover and trade trending tokens in real-time. Monitor new pairs, final stretch tokens, and migrated coins with live price updates and comprehensive analytics.",
  keywords: ["crypto", "trading", "tokens", "DeFi", "real-time", "token discovery"],
  authors: [{ name: "Axiom Trade" }],
  openGraph: {
    title: "Axiom Trade Pulse - Token Discovery",
    description: "Real-time token discovery and trading dashboard",
    type: "website",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
