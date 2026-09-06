import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "@/lib/auth-context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  interactiveWidget: "resizes-content",
  themeColor: "#070a13",
};

export const metadata: Metadata = {
  title: "deckpilotAI — From Prompt to Presentation | Your AI Presentation Team",
  description:
    "Turn rough ideas, financial reports, PDF whitepapers, and DOCX briefs into executive-level PowerPoint decks through conversation. Deterministic layouts, 1M context compaction, and native PPTX export.",
  keywords: [
    "AI Presentation Maker",
    "PowerPoint AI",
    "Pitch Deck Generator",
    "Executive Presentations",
    "Multi-Agent Presentation Engineering",
    "deckpilotAI",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-screen bg-[#070a13] text-slate-100 antialiased selection:bg-[#0086FF]/30 selection:text-white font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
