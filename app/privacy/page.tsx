import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Shield, Lock, FileText, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — DeckPilotAI | Data Handling & Document Security",
  description:
    "Review DeckPilotAI's Privacy Policy: how document uploads are processed, AI model provider policies, subprocessors, and user data rights.",
};

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center sm:text-left border-b border-white/10 pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-slate-300 mb-4">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              <span>Legal & Privacy</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white sm:text-5xl tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-3 text-xs sm:text-sm text-slate-400">
              Effective Date: March 2026 • Last updated: March 2026 • DeckPilotAI Inc.
            </p>
          </div>

          <div className="space-y-10 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                1. Overview & Commitment
              </h2>
              <p>
                At DeckPilotAI (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), we take the security and confidentiality of your information seriously. This Privacy Policy describes how we collect, process, store, and safeguard data when you use the DeckPilotAI website (<Link href="/" className="text-[#38bdf8] underline">deckpilotai.com</Link>) and our agentic presentation generation platform.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                2. Data We Collect
              </h2>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Account Information:</strong> When you register, we collect your email address, authentication credentials (hashed using industry-standard Argon2/bcrypt), and account creation timestamps.
                </li>
                <li>
                  <strong className="text-white">User Prompts & Instructions:</strong> Natural language presentation topics, slide objectives, formatting preferences, and conversation turns.
                </li>
                <li>
                  <strong className="text-white">Uploaded Reference Files:</strong> Document files you provide for grounding (including PDF, DOCX, XLSX, and TXT files) uploaded through the workspace attachment interface.
                </li>
                <li>
                  <strong className="text-white">Technical Telemetry:</strong> Anonymized performance logs, response latencies, and API error codes necessary to maintain platform reliability.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                3. How We Process Documents with AI
              </h2>
              <p>
                When you attach documents to a presentation project, our extraction agents parse textual claims, metrics, and structural outlines strictly to generate your requested presentation slides.
              </p>
              <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                <div className="flex items-center gap-2 font-semibold text-emerald-400 text-xs sm:text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Zero Foundation Model Training</span>
                </div>
                <p className="text-xs text-slate-300">
                  We do not use customer documents, confidential pitch data, financial tables, or generated slides to train, fine-tune, or improve any public artificial intelligence or foundation models.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                4. Infrastructure & Subprocessors
              </h2>
              <p>
                To provide our platform, we engage reputable, security-focused cloud infrastructure providers:
              </p>
              <ul className="space-y-2 list-disc pl-5">
                <li>
                  <strong className="text-white">Cloudflare:</strong> Global CDN, DDoS mitigation, and Cloudflare R2 object storage for encrypted file storage.
                </li>
                <li>
                  <strong className="text-white">Turso (ChiselStrike Inc.):</strong> Distributed edge libSQL database for transactional user accounts and project metadata.
                </li>
                <li>
                  <strong className="text-white">AWS (Amazon Web Services):</strong> Compute instances running our FastAPI presentation rendering pipeline.
                </li>
                <li>
                  <strong className="text-white">AI Model Providers:</strong> Commercial API endpoints accessed via enterprise zero-data-retention agreements solely for prompt execution.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                5. Data Retention & Deletion
              </h2>
              <p>
                Uploaded documents and generated presentations are stored in tenant-isolated storage buckets with short-lived, presigned access controls. You may delete your presentation projects, attachments, or entire user account at any time. When deleted, associated storage records and R2 objects are permanently expunged.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-white tracking-tight">
                6. Contact & Data Protection Officer
              </h2>
              <p>
                For questions regarding this policy, data export requests, or deletion inquiries, contact our team at:
              </p>
              <div className="p-4 rounded-xl border border-white/10 bg-white/5">
                <div className="text-white font-medium">DeckPilotAI Privacy Office</div>
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
