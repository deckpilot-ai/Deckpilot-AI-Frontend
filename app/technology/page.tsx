import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  Cpu,
  Layers,
  Database,
  ShieldCheck,
  Server,
  Cloud,
  Lock,
  Workflow,
  CheckCircle2,
  Terminal,
  Activity,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Architecture — DeckPilotAI | Multi-Agent Presentation Engineering",
  description:
    "Explore the technical architecture of DeckPilotAI: FastAPI backend, Next.js App Router, Turso libSQL, Cloudflare R2, multi-agent mesh, and 124 QA checkpoints.",
};

export default function TechnologyPage() {
  const stackComponents = [
    {
      title: "Backend Core",
      tech: "Python 3.12 + FastAPI",
      desc: "High-performance asynchronous API orchestration handling tenant isolation, prompt parsing, agent scheduling, and WebSocket progress streaming.",
      icon: Server,
    },
    {
      title: "Frontend Application",
      tech: "Next.js 16 App Router + React 19",
      desc: "Strict TypeScript browser workspace with optimistic message handling, dual-track agent progress monitoring, and dark-mode glass styling.",
      icon: Layers,
    },
    {
      title: "Database Layer",
      tech: "Turso Cloud (Edge libSQL / SQLite)",
      desc: "Distributed serverless edge database providing low-latency schema persistence for users, projects, messages, and deck version histories.",
      icon: Database,
    },
    {
      title: "Storage & CDN",
      tech: "Cloudflare R2 + Cloudflare Edge",
      desc: "S3-compatible object storage for document attachments and compiled presentations, secured with short-lived presigned expiring URLs.",
      icon: Cloud,
    },
    {
      title: "Presentation Compiler",
      tech: "Deterministic OpenXML (python-pptx)",
      desc: "Mathematical layout compilation into true Microsoft PowerPoint shapes and master templates. Zero rasterized screenshot illusions.",
      icon: Cpu,
    },
    {
      title: "Hosting Infrastructure",
      tech: "AWS Lightsail Compute",
      desc: "Dedicated Linux cloud instance powering background generation jobs, document extraction workers, and isolated memory pipelines.",
      icon: Activity,
    },
  ];

  const agentCatalog = [
    {
      name: "Requirements Agent",
      role: "Intent Understanding",
      desc: "Deconstructs natural language prompts, detects user goals, audience constraints, and deck scope.",
    },
    {
      name: "Extraction Agent",
      role: "Document Ingestion",
      desc: "Processes PDF briefs, Excel spreadsheets, and DOCX whitepapers to isolate verified claims and tables.",
    },
    {
      name: "Storyline Agent",
      role: "Minto Narrative Arc",
      desc: "Structures presentation chapters using the Minto Pyramid (Situation → Complication → Resolution).",
    },
    {
      name: "Design Intelligence Agent",
      role: "Layout & Archetypes",
      desc: "Maps content to calibrated 16:9 widescreen archetypes, obsidian color tokens, and font pairings.",
    },
    {
      name: "QA Gatekeeper Agent",
      role: "124 Checkpoints",
      desc: "Inspects margin safety, WCAG contrast ratios, shape collisions, and typographic density.",
    },
    {
      name: "Repair Agent",
      role: "Self-Healing Loop",
      desc: "Autonomously repositions overlapping shapes and adjusts font sizes if any QA gate fails.",
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
              <Cpu className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>Technical Architecture</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Verified System Design</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              Decoupled multi-agent systems meet{" "}
              <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                deterministic rendering.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              We reject the premise that presentation AI should be a single chain-of-thought mega-prompt guessing coordinates. DeckPilotAI orchestrates specialized agents with mathematical layout compilers.
            </p>
          </div>
        </section>

        {/* ================= STACK OVERVIEW GRID ================= */}
        <section className="py-20 border-y border-white/5 bg-[#090e1a]/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                Production technology stack.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Verified components powering DeckPilotAI across backend, database, storage, and presentation compilation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stackComponents.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 backdrop-blur-xl hover:border-[#0086FF]/40 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0086FF]/10 text-[#38bdf8] border border-[#0086FF]/20 mb-5">
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="text-[11px] font-mono text-[#38bdf8]">
                        {item.tech}
                      </div>
                      <h3 className="text-base font-bold text-white mt-1">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= MULTI-AGENT MESH ================= */}
        <section id="agents" className="py-24 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Workflow className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Specialized Mesh</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                How our agents collaborate.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Agents receive typed Pydantic inputs and return validated JSON schemas. No agent invents arbitrary pixel coordinates.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {agentCatalog.map((agent, idx) => (
                <div
                  key={idx}
                  className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 hover:border-cyan-500/40 transition-all"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs text-[#38bdf8]">
                      0{idx + 1}
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 border border-white/10">
                      {agent.role}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {agent.name}
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {agent.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= 124 QA CHECKPOINTS & DETERMINISTIC COMPILER ================= */}
        <section id="qa" className="py-20 border-t border-white/5 bg-[#080d19]/80 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  <span>Quality Assurance Architecture</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  124 Automated QA checkpoints & self-healing repair.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Before a presentation is delivered, our Quality Assurance Agent executes 124 deterministic inspection checks across the entire slide deck to guarantee executive Polish.
                </p>

                <div className="space-y-3 text-xs text-slate-300">
                  <div className="p-3 rounded-xl border border-white/10 bg-[#0c1424]">
                    <strong className="text-white block mb-1">1. Spatial Boundary & Margin Safety</strong>
                    Ensures all text containers, callout chips, and metric tables remain within the 13.333&quot; × 7.5&quot; widescreen canvas boundaries with 0.6&quot; minimum outer margins.
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#0c1424]">
                    <strong className="text-white block mb-1">2. Contrast & Visual Hierarchy</strong>
                    Verifies WCAG 2.2 AA contrast ratios between typography and backgrounds across obsidian dark themes.
                  </div>
                  <div className="p-3 rounded-xl border border-white/10 bg-[#0c1424]">
                    <strong className="text-white block mb-1">3. Automated Shape Collision Repair</strong>
                    Detects text container overlaps or vertical crowding and triggers automated font shrinkage and shape re-spacing.
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                  <span className="font-mono text-emerald-400 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                    QA Inspection Pass Log
                  </span>
                  <span className="text-slate-400">124 Checkpoints Evaluated</span>
                </div>

                <div className="space-y-2 font-mono text-[11px]">
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span>CP-012: Canvas Widescreen Ratio (16:9)</span>
                    <span className="font-bold">PASSED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span>CP-034: Text Boundary Margin &gt;= 0.60in</span>
                    <span className="font-bold">PASSED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span>CP-058: Typography Hierarchy (Lead &gt; Sub &gt; Body)</span>
                    <span className="font-bold">PASSED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span>CP-089: WCAG AA Luminance Contrast &gt; 4.5:1</span>
                    <span className="font-bold">PASSED</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                    <span>CP-118: Shape Collision Matrix (Zero Overlap)</span>
                    <span className="font-bold">PASSED</span>
                  </div>
                </div>

                <div className="pt-2 text-center text-xs text-slate-400">
                  Overall Score: <strong className="text-emerald-400">100%</strong> • Package Integrity Confirmed
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FOUNDATION MODEL ARCHITECTURE ================= */}
        <section id="models" className="py-24 scroll-mt-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#0086FF]/30 bg-gradient-to-b from-[#0c162e] to-[#080e1b] p-8 sm:p-12 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mb-4">
                <Sparkles className="h-4 w-4" />
                <span>Multi-Model AI Integration</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                How Foundation Models Power DeckPilotAI.
              </h2>

              <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  DeckPilotAI utilizes a decoupled multi-provider routing layer (`app/services/provider_router.py`) that matches specific agents with the optimal foundation model for each subtask.
                </p>
                <p>
                  Within this architecture, leading high-cognition reasoning models are integrated and prioritized for specialized tasks:
                </p>
                <ul className="space-y-3 pl-2">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Minto Pyramid Narrative Strategy:</strong> Advanced reasoning models excel at deconstructing complex source documents and formulating logical Situation-Complication-Resolution outlines without missing nuanced business context.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Complex Document Synthesis:</strong> Ingesting multi-page financial reports or technical specifications requires extended reasoning to extract grounded quantitative takeaways.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-[#38bdf8] shrink-0 mt-0.5" />
                    <span>
                      <strong className="text-white">Executive Headline Copywriting:</strong> Transforming passive bullet points into persuasive, boardroom-caliber claims answering the &quot;So What?&quot; for each slide.
                    </span>
                  </li>
                </ul>

                <div className="mt-6 p-4 rounded-2xl border border-white/10 bg-white/5 text-xs text-slate-400">
                  <strong className="text-slate-300">Independent Architecture:</strong> DeckPilotAI operates an independent, vendor-agnostic routing framework. We prioritize prompt security, low-latency failover, and strict data privacy, ensuring no customer data is ever retained for model training.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-20 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Inspect the technology in action.
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
              Launch our live workspace to experience multi-agent presentation generation.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/workspace"
                className="flex items-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all"
              >
                <span>Launch Workspace</span>
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
