import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FileText, ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service — DeckPilotAI | Terms of Use",
  description:
    "Review the Terms of Service for DeckPilotAI, governing user ownership of generated presentations, permitted use, and platform terms.",
};

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:text-left border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-slate-300 mb-4">
              <FileText className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span>Commercial Terms</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-400">
              Effective Date: March 2026 • Last updated: March 2026 • DeckPilotAI Inc.
            </p>
          </div>

          <div className="space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                1. Acceptance of Terms
              </h2>
              <p>
                By accessing or using DeckPilotAI (<Link href="/" className="text-[#38bdf8] underline">deckpilotai.com</Link>) or our related presentation generation services, you agree to be bound by these Terms of Service. If you do not agree to these terms, do not access or use the platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                2. User Ownership of Generated Decks
              </h2>
              <p>
                <strong className="text-white">You own your content.</strong> You retain 100% intellectual property ownership of any documents, spreadsheets, and reference materials you upload to DeckPilotAI, as well as the resulting Microsoft PowerPoint (.pptx) presentations generated for your account. DeckPilotAI claims no copyright or proprietary interest in your slide output.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                3. Permitted & Acceptable Use
              </h2>
              <p>
                DeckPilotAI is designed for professional presentation engineering, executive briefings, investor pitch decks, and educational materials. You agree not to:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>Upload unlawful, defamatory, infringing, or malicious content.</li>
                <li>Attempt to reverse-engineer, decompile, or extract the underlying model weights or prompt architectures.</li>
                <li>Launch denial-of-service attacks or circumvent API rate limits.</li>
                <li>Misrepresent AI-generated presentations as human-certified financial audits or legal counsel.</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                4. Service Availability & Quality Assurance
              </h2>
              <p>
                While our 124-point Quality Assurance engine inspects visual contrast, margins, and geometric collisions, all presentations should be reviewed by the user prior to high-stakes delivery. The service is provided &quot;as is&quot; without warranties of uninterrupted uptime or error-free rendering.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                5. Account Termination
              </h2>
              <p>
                We reserve the right to suspend or terminate accounts that violate our security guidelines or engage in abusive platform behavior. Users may terminate their account at any time via the workspace settings or by contacting our team.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                6. Contact Information
              </h2>
              <p>
                For legal questions or notices regarding these Terms of Service, contact:
              </p>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium">DeckPilotAI Legal Operations</div>
                <div className="text-xs text-slate-400 mt-1">
                  Email: <a href="mailto:contact@deckpilotai.com" className="text-[#38bdf8] underline">contact@deckpilotai.com</a>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
