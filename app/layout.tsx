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
  interactiveWidget: "resizes-content",
  themeColor: "#070a13",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://deckpilotai.com"),
  title: {
    default: "deckpilotAI — From Prompt to Presentation | Agentic AI Presentation Platform",
    template: "%s | deckpilotAI",
  },
  description:
    "Turn rough ideas, financial reports, PDF whitepapers, and DOCX briefs into executive-level PowerPoint decks through conversation. Deterministic layouts, multi-agent orchestration, and native PPTX export.",
  keywords: [
    "AI Presentation Maker",
    "PowerPoint AI",
    "Pitch Deck Generator",
    "Executive Presentations",
    "Multi-Agent Presentation Engineering",
    "deckpilotAI",
    "Autonomous Presentation AI",
  ],
  authors: [{ name: "DeckPilotAI Inc." }],
  creator: "DeckPilotAI",
  publisher: "DeckPilotAI",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "192x192" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://deckpilotai.com",
    title: "deckpilotAI — From Prompt to Presentation",
    description:
      "Autonomous agentic AI presentation engineering. Transforms prompts, spreadsheets, and document briefs into fully editable PowerPoint decks.",
    siteName: "deckpilotAI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 675,
        alt: "DeckPilotAI — Autonomous AI Presentation Engineering Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "deckpilotAI — From Prompt to Presentation",
    description:
      "Autonomous agentic AI presentation engineering. Deterministic OpenXML layouts and native PPTX export.",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-dvh h-full bg-[#070a13] text-slate-100 antialiased selection:bg-[#0086FF]/30 selection:text-white font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
