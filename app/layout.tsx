import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "INR P2P Partner Portal — Private access for approved settlement operators",
  description:
    "Apply for review and work as an approved INR P2P partner with clear operating limits, live workflow tracking, proof history, reconciliation visibility and partner score. Review-based, private beta access.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased text-ink">{children}</body>
    </html>
  );
}
