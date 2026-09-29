import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ISEYC Digital Operations Centre",
  description:
    "ISEYC institutional operations hub — Command Brief, civic systems, and staff workspace. Non-partisan.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
