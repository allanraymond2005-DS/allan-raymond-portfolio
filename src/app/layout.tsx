import type { Metadata } from "next";
import { Inter_Tight, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { PROFILE } from "@/lib/data";

const sans = Inter_Tight({ subsets: ["latin"], variable: "--f-sans", display: "swap" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-serif", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://allan-raymond-portfolio.vercel.app"),
  title: `${PROFILE.name} — ${PROFILE.role}`,
  description: `${PROFILE.name}, ${PROFILE.role} based in ${PROFILE.location}.`,
  openGraph: { images: ["/og.jpg"] },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
