import type { Metadata } from "next";
import "./globals.css";
import { ISEYC_IDENTITY, ISEYC_TAGLINE } from "@/lib/links";

export const metadata: Metadata = {
  title: "ISEYC Command Hub",
  description:
    "Institutional hub for ISEYC staff — links to Civic Mandate and Civic Brain. Non-partisan.",
  robots: { index: false, follow: false },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen">
          <header className="border-b border-stone-200 bg-white">
            <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-forest-700">
                  ISEYC
                </p>
                <h1 className="font-serif text-xl text-slate-950">Command Hub</h1>
              </div>
              <p className="hidden text-right text-[10px] text-slate-500 sm:block">
                {ISEYC_IDENTITY}
              </p>
            </div>
          </header>
          <main className="mx-auto max-w-3xl px-4 py-8">{children}</main>
          <footer className="border-t border-stone-200 py-6 text-center text-xs text-slate-500">
            {ISEYC_TAGLINE} · Internal institutional surface · Not a campaign tool
          </footer>
        </div>
      </body>
    </html>
  );
}
