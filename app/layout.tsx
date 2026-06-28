import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "INR P2P Partner Portal",
  description: "Private partner portal for approved INR P2P settlement operators.",
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
