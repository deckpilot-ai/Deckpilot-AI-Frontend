import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  Download,
  Layers,
  FileSpreadsheet,
  FileText,
  Sliders,
  CheckCircle2,
  Clock,
  ShieldCheck,
  TrendingUp,
  Cpu,
  RefreshCw,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Product — DeckPilotAI | Agentic AI Presentation Platform",
  description:
    "Explore DeckPilotAI: multi-agent presentation generation from natural language or uploaded documents with deterministic PowerPoint OpenXML compilation.",
};

export default function ProductPage() {
  const targetUsers = [
    {
      title: "Startup Founders",
      role: "Seed to Series B Founders",
      description:
        "Transform traction models, ARR numbers, and competitive moats into compelling investor pitch decks and board updates in minutes.",
      badge: "Venture Ready",
    },
    {
      title: "Management Consultants",
      role: "Strategy & Advisory Teams",
      description:
        "Synthesize complex client briefs, market research reports, and SWOT assessments into structured Barbara Minto Pyramid presentations.",
      badge: "Executive Advisory",
    },
    {
      title: "Corporate Executives",
      role: "VPs, Directors & C-Suite",
      description:
        "Build Quarterly Business Reviews (QBRs), company all-hands, and annual strategic planning decks with zero formatting friction.",
      badge: "Boardroom Polished",
    },
    {
      title: "Sales & Solutions Engineers",
      role: "Enterprise GTM Leaders",
      description:
        "Generate tailored client proposals, RFP summaries, and technical architecture decks grounded in verified product capabilities.",
      badge: "Conversion Focused",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-[#0086FF]/15 blur-[140px]" />

          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-1.5 text-xs font-medium text-[#38bdf8] backdrop-blur-md mb-8">
              <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>DeckPilotAI Platform</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Deterministic PPTX Engine v2.0</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              Turn complex information into{" "}
              <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                boardroom-ready decks.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              DeckPilotAI is an agentic presentation engineering platform that transforms prompts, spreadsheets, and document briefs into fully editable Microsoft PowerPoint files.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/workspace"
                className="flex items-center justify-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Launch Studio Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/register"
                className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
              >
                Create Account
              </Link>
            </div>
          </div>
        </section>

        {/* ================= TARGET AUDIENCE ================= */}
        <section className="py-20 border-y border-white/5 bg-[#090e1a]/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Designed for high-stakes communicators.
              </h2>
              <p className="mt-2 text-sm text-slate-400">
                Tailored workflows for professionals whose presentations drive major business outcomes.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {targetUsers.map((user, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 flex flex-col justify-between hover:border-[#0086FF]/40 transition-all"
                >
                  <div>
                    <span className="rounded-full bg-[#0086FF]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#38bdf8] border border-[#0086FF]/20">
                      {user.badge}
                    </span>
                    <h3 className="text-base font-bold text-white mt-4">
                      {user.title}
                    </h3>
                    <div className="text-[11px] text-[#38bdf8] font-mono mt-0.5">
                      {user.role}
                    </div>
                    <p className="text-xs text-slate-300 mt-3 leading-relaxed">
                      {user.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= CORE PLATFORM WORKFLOW ================= */}
        <section className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Sliders className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>End-to-End Pipeline</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                How DeckPilotAI works.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Four decoupled stages ensure factual integrity and pixel-perfect PowerPoint geometry.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <div className="text-2xl font-mono font-bold text-[#0086FF]">01</div>
                <h3 className="text-base font-bold text-white mt-3">Document Intake</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Upload PDF whitepapers, Excel spreadsheets, or Word briefs. Extraction agents isolate key claims and data tables.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <div className="text-2xl font-mono font-bold text-[#38bdf8]">02</div>
                <h3 className="text-base font-bold text-white mt-3">Minto Structuring</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Storyline agents organize points into Situation-Complication-Resolution hierarchy with executive takeaways.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <div className="text-2xl font-mono font-bold text-emerald-400">03</div>
                <h3 className="text-base font-bold text-white mt-3">OpenXML Compilation</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Our Python renderer writes native shapes, master layouts, and vector typography into true Microsoft PowerPoint (.pptx).
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <div className="text-2xl font-mono font-bold text-amber-400">04</div>
                <h3 className="text-base font-bold text-white mt-3">124 QA Gates</h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Visual quality inspectors check contrast, margins, and density before delivery, triggering self-healing repairs if needed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LIVE CAPABILITIES VS ROADMAP ================= */}
        <section id="roadmap" className="py-20 border-t border-white/5 bg-[#080d19]/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                Current capabilities & development roadmap.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Transparent visibility into what is live today versus actively under development.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Live Today */}
              <div className="rounded-3xl border border-emerald-500/30 bg-[#0c1524] p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-6">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Live & Operational Now</span>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Native OpenXML PPTX Export:</strong> True vector shapes, master slides, 16:9 canvas.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Format Document Intake:</strong> PDF, DOCX, XLSX, and TXT grounding.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>124 QA Checkpoints:</strong> Margin bounds, WCAG contrast, typography, and density gates.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Self-Healing Repair Loop:</strong> Automated detection and layout repositioning.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Model Dynamic Routing:</strong> Priority tiers with encrypted key security.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Cloudflare R2 Storage:</strong> Tenant-isolated storage with expiring presigned download URLs.</span>
                  </li>
                </ul>
              </div>

              {/* Upcoming Roadmap */}
              <div className="rounded-3xl border border-[#0086FF]/30 bg-[#0c1428] p-8">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mb-6">
                  <Clock className="h-4 w-4 text-[#38bdf8]" />
                  <span>Under Active Development (Roadmap)</span>
                </div>

                <ul className="space-y-4 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-[#38bdf8] shrink-0 mt-1.5" />
                    <span><strong>In-Browser Slide Preview Canvas:</strong> Real-time rendering of generated slide thumbnails in chat.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-[#38bdf8] shrink-0 mt-1.5" />
                    <span><strong>Enterprise Brand Kit Ingestion:</strong> Automated extraction of corporate color codes, typography, and logo assets.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-[#38bdf8] shrink-0 mt-1.5" />
                    <span><strong>Native Chart Data Binding:</strong> Interactive editable Excel graphs embedded directly into PowerPoint shapes.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="h-2 w-2 rounded-full bg-[#38bdf8] shrink-0 mt-1.5" />
                    <span><strong>Team Workspaces & Collaboration:</strong> Shared organization asset libraries, multi-user project access, and role governance.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ================= CTA ================= */}
        <section className="py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Experience the presentation engine yourself.
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
              Start building your first slide deck with natural language or uploaded documents.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/workspace"
                className="flex items-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all"
              >
                <span>Launch DeckPilotAI Studio</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
