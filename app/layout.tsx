import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INR P2P Partner Portal — Private access for approved settlement operators",
  description:
    "Apply for review and work as an approved INR P2P partner with clear operating limits, workflow tracking, proof history, reconciliation visibility and partner score. Review-based, private beta access.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
