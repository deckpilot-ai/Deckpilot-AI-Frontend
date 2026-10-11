import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  ShieldCheck,
  Lock,
  KeyRound,
  FileCheck2,
  Server,
  Cloud,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Security & Trust — DeckPilotAI | Security Architecture & Data Protection",
  description:
    "Learn about DeckPilotAI's real security practices: tenant isolation, AES-256 encryption at rest, SSRF protections, presigned R2 storage, and zero data training.",
};

export default function SecurityPage() {
  const securityPillars = [
    {
      title: "Strict Tenant Isolation",
      desc: "Every database query, attachment download, generation task, and WebSocket connection verifies tenant and project ownership. Cross-tenant leakage is architecturally blocked at the API gateway layer.",
      icon: Server,
    },
    {
      title: "AES-256 Key Encryption",
      desc: "AI provider API keys and secrets are encrypted at rest using industry-standard AES-256 encryption. Keys are never logged, never exposed to browser runtimes, and never returned in API payloads.",
      icon: KeyRound,
    },
    {
      title: "Presigned Ephemeral Storage",
      desc: "Presentations and uploaded references are stored in Cloudflare R2 object storage. Files are accessible solely via short-lived, signed URLs that expire automatically after download.",
      icon: Cloud,
    },
    {
      title: "Network SSRF Protections",
      desc: "All outbound provider and asset requests are validated by backend network security filters to block server-side request forgery (SSRF) and prevent access to private network ranges.",
      icon: Lock,
    },
    {
      title: "Magic-Byte Upload Validation",
      desc: "File uploads (PDF, DOCX, XLSX, TXT) undergo magic-byte verification, strict file size boundaries (25MB ceiling), and safe path sanitation before passing into extraction agents.",
      icon: FileCheck2,
    },
    {
      title: "Zero Model Training",
      desc: "Customer documents, conversation prompts, and generated slides are strictly private. We never use or sell customer content to train foundation or public machine learning models.",
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1 py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-medium text-emerald-400 mb-6">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>Security Architecture</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Verified System Controls</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.12]">
              Security engineered into every{" "}
              <span className="bg-gradient-to-r from-emerald-400 via-[#38bdf8] to-[#0086FF] bg-clip-text text-transparent">
                layer of our platform.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-base text-slate-300 leading-relaxed">
              Executive presentations and strategy documents contain sensitive business information. We design DeckPilotAI with defense-in-depth principles from the ground up.
            </p>
          </div>

          {/* Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {securityPillars.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 backdrop-blur-xl flex flex-col justify-between"
                >
                  <div>
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-white mb-2">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Transparent Certification Notice */}
          <div className="rounded-3xl border border-white/10 bg-[#090e1a]/80 p-8 sm:p-10 text-xs text-slate-300 space-y-4">
            <h2 className="text-base font-bold text-white">
              Authentic Security Posture & Compliance Note
            </h2>
            <p>
              As an emerging AI technology startup, DeckPilotAI builds on security best practices from day one. We host our infrastructure on enterprise-grade Cloudflare and AWS environments and utilize Turso Edge databases with end-to-end TLS encryption.
            </p>
            <p className="text-slate-400">
              In accordance with our commitment to transparency, we do not claim independent third-party certifications (such as SOC 2 Type II or ISO 27001) that have not yet been formally completed. As our enterprise offering expands, formal external compliance audits will be scheduled.
            </p>
            <div className="pt-2">
              <Link
                href="/contact"
                className="text-[#38bdf8] font-medium underline hover:text-white"
              >
                Have specific enterprise security or data processing requirements? Contact our team →
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
