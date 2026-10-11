"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  Layers,
  ShieldCheck,
  ArrowRight,
  FileText,
  CheckCircle2,
  Cpu,
  Download,
  Terminal,
  Zap,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Check,
  Play,
  Sliders,
  AlertTriangle,
  Brain,
  Wand2,
  Workflow,
} from "lucide-react";

export default function HomePage() {
  const [activeSlideTab, setActiveSlideTab] = useState(0);

  const slidePreviews = [
    {
      title: "Market Traction & Unit Economics",
      subtitle: "Enterprise expansion across North America and EMEA with accelerating ARR",
      stat1: { label: "Annual Run Rate", value: "$4.8M", change: "+142% YoY" },
      stat2: { label: "Net Dollar Retention", value: "128%", change: "+14% MoM" },
      stat3: { label: "LTV / CAC Ratio", value: "3.9x", change: "7-mo Payback" },
      takeaway: "Enterprise segment conversion grew by 82% following deterministic agent rollout.",
    },
    {
      title: "Product Architecture & Agent Mesh",
      subtitle: "Decoupled multi-agent orchestration for zero-drift presentation rendering",
      stat1: { label: "Pipeline Latency", value: "3.4s", change: "4x Faster" },
      stat2: { label: "Deterministic Accuracy", value: "100%", change: "Zero Hallucination" },
      stat3: { label: "Context Window", value: "1M", change: "Compaction Active" },
      takeaway: "Unified agent pipeline guarantees OpenXML compliance and perfect font hierarchy.",
    },
    {
      title: "Strategic Go-To-Market Roadmap",
      subtitle: "Scaling enterprise outbound, self-serve developer tier, and partner integrations",
      stat1: { label: "Q1 Target Accounts", value: "250+", change: "Pipeline Built" },
      stat2: { label: "Self-Serve Conversion", value: "18.4%", change: "Industry Leading" },
      stat3: { label: "Gross Margin", value: "84%", change: "R2 + Edge SQLite" },
      takeaway: "Direct integrations with modern productivity stacks unlock viral team workspaces.",
    },
  ];

  const currentSlide = slidePreviews[activeSlideTab];

  const differentiators = [
    {
      title: "Agentic AI Architecture",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Decoupled agents for requirements, extraction, storyline structuring, layout selection, and quality assurance. No monolithic hallucinating mega-prompts.",
      icon: Cpu,
    },
    {
      title: "Intelligent Document Understanding",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Ingests complex PDF whitepapers, Excel financial spreadsheets, and DOCX briefs. Extracts facts, numbers, and tables without hallucinating claims.",
      icon: FileSpreadsheet,
    },
    {
      title: "Editable PowerPoint Output (.pptx)",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Compiled directly into native OpenXML presentation shapes, master slide layouts, and clean vector typography. Never locked raster images.",
      icon: Download,
    },
    {
      title: "Automated 124-Point QA Gates",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Deterministic visual and structural inspection verifying WCAG contrast ratios, safe 0.6in margins, shape bounds, and typographic hierarchy.",
      icon: ShieldCheck,
    },
    {
      title: "Self-Healing Repair Workflows",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Automated feedback loops detect shape collisions or text overflows, adjust font scaling, and re-run quality gates autonomously before delivery.",
      icon: Wand2,
    },
    {
      title: "Multi-Model AI Architecture",
      status: "Live in Production",
      statusColor: "emerald",
      desc: "Dynamic model routing with encrypted API keys, prioritizing leading foundation models for high-order narrative planning and Minto deconstruction.",
      icon: Workflow,
    },
    {
      title: "Flexible Design & Custom Branding",
      status: "In Active Beta",
      statusColor: "sky",
      desc: "Calibrated obsidian palettes, corporate typography hierarchies, and customizable design tokens tailored to enterprise brand guidelines.",
      icon: Sliders,
    },
    {
      title: "In-Browser Interactive Slide Canvas",
      status: "Roadmap Q3",
      statusColor: "amber",
      desc: "Real-time thumbnail slide previews directly inside the chat workspace before PowerPoint export.",
      icon: Layers,
    },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      {/* Top Floating Navigation */}
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
          {/* Ambient Radial Spotlight Gradients */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-[#0086FF]/15 blur-[140px]" />
          <div className="pointer-events-none absolute top-1/4 right-0 -z-10 h-[450px] w-[550px] rounded-full bg-[#38bdf8]/10 blur-[120px]" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-1.5 text-xs font-medium text-[#38bdf8] backdrop-blur-md mb-8 hover:border-[#0086FF]/50 transition-colors">
              <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>Agentic AI Presentation Platform</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Founded August 2025</span>
              <ChevronRight className="h-3 w-3 text-[#38bdf8]" />
            </div>

            {/* Primary Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08] max-w-5xl mx-auto">
              We&apos;re Building the Future of{" "}
              <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Intelligent Presentations.
              </span>
            </h1>

            {/* Supporting Headline */}
            <p className="mx-auto mt-6 max-w-3xl text-base sm:text-xl text-slate-300 font-normal leading-relaxed">
              Founded in August 2025, <strong className="text-white font-semibold">DeckPilotAI</strong> is an agentic AI-powered platform that turns ideas, documents, and complex information into professional, editable presentations.
            </p>

            {/* Two Primary CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/workspace"
                className="flex items-center justify-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Try DeckPilotAI</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#hero-showcase"
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
              >
                <Play className="h-3.5 w-3.5 fill-slate-300 text-slate-300" />
                <span>Explore DeckPilotAI</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Founded August 2025
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                100% Native OpenXML (.pptx)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                124 Automated QA Checkpoints
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Multi-Agent Decoupled Execution
              </span>
            </div>

            {/* ================= HERO SHOWCASE: PRESENTATION COCKPIT ================= */}
            <div
              id="hero-showcase"
              className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-[#0c1222]/90 p-4 sm:p-7 text-left shadow-2xl shadow-black/80 backdrop-blur-2xl transition-all"
            >
              {/* Window Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="flex items-center gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500/80" />
                    <div className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 pl-2">
                    DeckPilotAI Studio — Multi-Agent Presentation Engine v2.0
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Agent Mesh Active
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden md:inline">
                    Latency: 3.4s • 16:9 Widescreen
                  </span>
                </div>
              </div>

              {/* Cockpit Body: Split Grid */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Left: Input & Agent Routing Visualization (5 cols) */}
                <div className="lg:col-span-5 space-y-4">
                  {/* Prompt Box */}
                  <div className="rounded-2xl border border-white/10 bg-[#080d18] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Terminal className="h-3.5 w-3.5 text-[#0086FF]" />
                        Natural Language Intent
                      </span>
                      <span className="rounded-full bg-[#0086FF]/20 px-2 py-0.5 text-[10px] text-[#38bdf8] font-mono">
                        User Prompt
                      </span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed font-sans">
                      &quot;Build an executive 10-slide Seed Pitch Deck highlighting our +142% YoY ARR growth, product architecture, and 24-month expansion plan.&quot;
                    </p>

                    {/* Attached References Chips */}
                    <div className="mt-3 pt-3 border-t border-white/5 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-300">
                        <FileSpreadsheet className="h-3 w-3 text-emerald-400" />
                        Financial_Model_Q3.xlsx
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] text-slate-300">
                        <FileText className="h-3 w-3 text-[#38bdf8]" />
                        Executive_Brief.pdf
                      </span>
                    </div>
                  </div>

                  {/* Multi-Agent Routing Graph */}
                  <div className="rounded-2xl border border-white/10 bg-[#080d18] p-4 space-y-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <Cpu className="h-3.5 w-3.5 text-[#0086FF]" />
                        Orchestration Pipeline
                      </span>
                      <span className="text-[10px] text-emerald-400 font-mono">
                        All Stages Complete
                      </span>
                    </div>

                    {/* Agent 1 */}
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0c1424] px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-200 text-[11px]">
                            1. Document Grounder
                          </div>
                          <div className="text-[10px] text-slate-400">
                            12 financial claims & metrics extracted
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">0.8s</span>
                    </div>

                    {/* Agent 2 */}
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0c1424] px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-200 text-[11px]">
                            2. Storyline & Minto Planner
                          </div>
                          <div className="text-[10px] text-slate-400">
                            10-slide narrative arc structured
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">1.1s</span>
                    </div>

                    {/* Agent 3 */}
                    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0c1424] px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                        <div>
                          <div className="font-medium text-slate-200 text-[11px]">
                            3. Design Intelligence Agent
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Obsidian palette & calibrated typography
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-slate-400">0.9s</span>
                    </div>

                    {/* Agent 4 */}
                    <div className="flex items-center justify-between rounded-xl border border-[#0086FF]/30 bg-[#0086FF]/10 px-3 py-2 text-xs">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#0086FF] shrink-0" />
                        <div>
                          <div className="font-medium text-white text-[11px]">
                            4. Deterministic PPTX Compiler
                          </div>
                          <div className="text-[10px] text-[#38bdf8]">
                            16:9 widescreen OpenXML shape matrix
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-[#38bdf8]">0.6s</span>
                    </div>
                  </div>
                </div>

                {/* Right: Interactive 16:9 Slide Preview Mockup (7 cols) */}
                <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-white/10 bg-[#070b16] p-5">
                  {/* Slide Tabs */}
                  <div className="flex items-center justify-between pb-3 border-b border-white/10">
                    <div className="flex items-center gap-1.5">
                      {slidePreviews.map((slide, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSlideTab(idx)}
                          className={`rounded-full px-3 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                            activeSlideTab === idx
                              ? "bg-[#0086FF] text-white shadow-md shadow-[#0086FF]/30"
                              : "text-slate-400 hover:text-white hover:bg-white/5"
                          }`}
                        >
                          Slide {idx + 1}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] text-slate-400 border border-white/10 font-mono">
                        16:9 Widescreen
                      </span>
                    </div>
                  </div>

                  {/* 16:9 Slide Canvas Mockup */}
                  <div className="my-4 rounded-xl border border-white/10 bg-gradient-to-br from-[#0c162b] to-[#080e1b] p-6 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 right-0 h-40 w-40 bg-[#0086FF]/10 rounded-full blur-3xl pointer-events-none" />

                    {/* Slide Header */}
                    <div className="mb-6">
                      <span className="rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#38bdf8] mb-2 inline-block">
                        Enterprise Metrics
                      </span>
                      <h3 className="text-xl font-bold text-white tracking-tight">
                        {currentSlide.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1">
                        {currentSlide.subtitle}
                      </p>
                    </div>

                    {/* Metric Cards inside Slide */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {currentSlide.stat1.label}
                        </div>
                        <div className="text-lg font-bold text-white mt-0.5">
                          {currentSlide.stat1.value}
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-400 mt-0.5 flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" />
                          {currentSlide.stat1.change}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {currentSlide.stat2.label}
                        </div>
                        <div className="text-lg font-bold text-white mt-0.5">
                          {currentSlide.stat2.value}
                        </div>
                        <div className="text-[10px] font-semibold text-emerald-400 mt-0.5 flex items-center gap-0.5">
                          <TrendingUp className="h-3 w-3" />
                          {currentSlide.stat2.change}
                        </div>
                      </div>

                      <div className="rounded-xl border border-white/10 bg-white/5 p-3">
                        <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                          {currentSlide.stat3.label}
                        </div>
                        <div className="text-lg font-bold text-white mt-0.5">
                          {currentSlide.stat3.value}
                        </div>
                        <div className="text-[10px] font-semibold text-cyan-400 mt-0.5">
                          {currentSlide.stat3.change}
                        </div>
                      </div>
                    </div>

                    {/* Grounded Key Takeaway */}
                    <div className="rounded-xl border border-[#0086FF]/20 bg-[#0086FF]/5 p-3 text-xs text-slate-300 flex items-start gap-2">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#0086FF] mt-1.5 shrink-0" />
                      <div>
                        <span className="font-semibold text-white">Grounded Takeaway: </span>
                        <span>{currentSlide.takeaway}</span>
                      </div>
                    </div>

                    {/* Slide Footer */}
                    <div className="mt-4 flex items-center justify-between text-[9px] text-slate-400 pt-3 border-t border-white/5">
                      <span>DeckPilotAI Engine • OpenXML Presentation</span>
                      <span>Slide {activeSlideTab + 1} of 10</span>
                    </div>
                  </div>

                  {/* Slide Download CTA */}
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                    <div className="flex items-center gap-2 text-xs text-slate-300">
                      <ShieldCheck className="h-4 w-4 text-emerald-400" />
                      <span>Visual QA Verified: 100% Contrast & Margin Safe</span>
                    </div>

                    <Link
                      href="/workspace"
                      className="flex items-center gap-2 rounded-full bg-[#0086FF] px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#0086FF]/25 hover:bg-[#0075ED] transition-all cursor-pointer w-full sm:w-auto justify-center"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Export Editable PPTX</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= PROBLEM SECTION ================= */}
        <section className="py-24 border-t border-white/5 bg-[#090e1a]/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3.5 py-1 text-xs font-medium text-amber-400 mb-4">
                <AlertTriangle className="h-3.5 w-3.5" />
                <span>The Traditional Presentation Problem</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                Great Ideas Deserve Better Presentations.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Traditional presentation creation is painful, inefficient, and broken across the entire workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Problem 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-8 relative overflow-hidden">
                <div className="text-3xl mb-4 font-mono text-red-400 font-bold">01</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  The Formatting Grind
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Professionals spend hours manually moving text boxes, aligning card margins, calculating column widths, and adjusting font sizes instead of refining their core thesis.
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-red-300/80">
                  Result: Over 12 hours wasted per deck on manual mechanics.
                </div>
              </div>

              {/* Problem 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-8 relative overflow-hidden">
                <div className="text-3xl mb-4 font-mono text-amber-400 font-bold">02</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Fragmented Source Disconnect
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Valuable data is trapped across spreadsheets, PDF research briefs, and strategy memos. Copy-pasting metrics manually introduces errors and breaks narrative continuity.
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-amber-300/80">
                  Result: Mismatched numbers and unverified claims in executive meetings.
                </div>
              </div>

              {/* Problem 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-8 relative overflow-hidden">
                <div className="text-3xl mb-4 font-mono text-violet-400 font-bold">03</div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Generic AI Shortcuts
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  First-generation AI presentation tools generate locked image files, fuzzy HTML snapshots, or generic templates that cannot be edited or customized in native PowerPoint.
                </p>
                <div className="mt-6 pt-4 border-t border-white/5 text-[11px] text-violet-300/80">
                  Result: Unusable outputs that fail executive and partner scrutiny.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION SECTION ================= */}
        <section className="py-24 border-t border-white/5 bg-[#070b14]">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-medium text-emerald-400 mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Autonomous AI Solution</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                From Complex Information to Clear Communication.
              </h2>
              <p className="mt-4 text-base text-slate-300">
                DeckPilotAI automates the entire presentation lifecycle with specialized, autonomous agents that collaborate in real time.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-4">
                <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    Autonomous Grounding & Fact Extraction
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Our document agents parse PDFs, spreadsheets, and Word documents to isolate core numbers, claims, and strategic pillars before writing a single slide.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    Barbara Minto Pyramid Storytelling
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Storyline agents formulate logical chapters (Situation → Complication → Core Thesis) with crisp, action-oriented headlines answering &quot;So What?&quot;
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    Deterministic OpenXML Compilation
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    A mathematical layout engine converts JSON slide specs into real Microsoft PowerPoint shapes, vector paths, and master slides.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-5">
                  <div className="flex items-center gap-2 text-white font-bold text-sm mb-1">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
                    Automated Quality Gates & Repair
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed pl-6">
                    Every slide is audited against 124 visual checkpoints. If an overflow is detected, self-healing agents re-calibrate layouts autonomously.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-[#0c162e] to-[#070d1a] p-8 shadow-2xl relative overflow-hidden">
                <div className="text-xs font-mono uppercase tracking-wider text-[#38bdf8] mb-3">
                  Autonomous Multi-Agent Workflow
                </div>
                <h3 className="text-xl font-bold text-white mb-4">
                  Human-in-the-loop control with zero formatting pain.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-6">
                  Unlike opaque AI tools, DeckPilotAI outputs true native PowerPoint files. You can edit every headline, re-scale any metric card, adjust colors, or continue revising through chat.
                </p>
                <div className="p-4 rounded-xl border border-white/10 bg-white/5 space-y-2 text-xs text-slate-300">
                  <div className="flex items-center justify-between font-mono text-[11px] text-slate-400 pb-1 border-b border-white/5">
                    <span>Export Quality Guarantee</span>
                    <span className="text-emerald-400">100% Native PPTX</span>
                  </div>
                  <div>• OpenXML standard presentation file</div>
                  <div>• Clean vector fonts & shape hierarchies</div>
                  <div>• 16:9 modern widescreen presentation canvas</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= HOW IT WORKS (FOUR VISUAL STEPS) ================= */}
        <section className="py-24 border-t border-white/5 bg-[#080d19]/90">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Sliders className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Simple 4-Step Process</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                How It Works.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                From initial idea to verified presentation in minutes.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-[#0086FF]/20 px-3 py-1 text-xs font-mono font-bold text-[#38bdf8] border border-[#0086FF]/30">
                    Step 01
                  </span>
                  <h3 className="text-base font-bold text-white mt-4">
                    Enter your idea or upload a document
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Type your presentation topic or attach PDF reports, financial spreadsheets (XLSX), or strategy notes.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                  Multi-Format Intake
                </div>
              </div>

              {/* Step 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-[#0086FF]/20 px-3 py-1 text-xs font-mono font-bold text-[#38bdf8] border border-[#0086FF]/30">
                    Step 02
                  </span>
                  <h3 className="text-base font-bold text-white mt-4">
                    AI agents analyze and organize content
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Grounding agents extract verified facts while storyline agents structure a persuasive Minto narrative arc.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                  Minto Narrative Architecture
                </div>
              </div>

              {/* Step 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-[#0086FF]/20 px-3 py-1 text-xs font-mono font-bold text-[#38bdf8] border border-[#0086FF]/30">
                    Step 03
                  </span>
                  <h3 className="text-base font-bold text-white mt-4">
                    DeckPilotAI builds the presentation
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    Deterministic compilers translate slide specifications into native OpenXML widescreen PowerPoint shapes.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] text-slate-500 font-mono">
                  Deterministic OpenXML
                </div>
              </div>

              {/* Step 4 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative flex flex-col justify-between">
                <div>
                  <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-mono font-bold text-emerald-400 border border-emerald-500/30">
                    Step 04
                  </span>
                  <h3 className="text-base font-bold text-white mt-4">
                    Quality checks help refine the final output
                  </h3>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    124 automated QA checks inspect margins, contrast, and layout density, self-healing any detected imperfections.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-white/5 text-[10px] text-emerald-400 font-mono">
                  124 QA Gates & Export
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= WHY DECKPILOTAI? (DIFFERENTIATORS) ================= */}
        <section className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Zap className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Market Differentiation</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl leading-tight">
                Why DeckPilotAI?
              </h2>
              <p className="mt-4 text-base text-slate-300">
                Purpose-built presentation engineering backed by verifiable software architecture.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {differentiators.map((diff, idx) => {
                const Icon = diff.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl flex flex-col justify-between hover:border-[#0086FF]/50 transition-all"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#0086FF]/15 text-[#38bdf8] border border-[#0086FF]/20">
                          <Icon className="h-5 w-5" />
                        </div>
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-mono font-medium ${
                            diff.statusColor === "emerald"
                              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                              : diff.statusColor === "sky"
                              ? "bg-[#0086FF]/10 text-[#38bdf8] border border-[#0086FF]/20"
                              : "bg-amber-500/10 text-amber-400 border border-amber-500/20"
                          }`}
                        >
                          {diff.status}
                        </span>
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2">
                        {diff.title}
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {diff.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ================= BUILT WITH ADVANCED AI ================= */}
        <section className="py-24 border-t border-white/5 bg-[#080d19]/90">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-[#0086FF]/30 bg-gradient-to-b from-[#0c162e] to-[#080e1b] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-6">
                <Brain className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>AI-Native Architecture</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Built With Advanced AI.
              </h2>

              <p className="mt-4 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                DeckPilotAI is developing an AI-native presentation architecture leveraging large language models for reasoning, planning, document understanding, and multi-agent coordination.
              </p>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-[#070b16] p-5">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4 text-[#38bdf8]" />
                    Multi-Model Reasoning Architecture
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Within our multi-provider routing layer, high-cognition reasoning models are integrated and prioritized for specialized tasks: complex document grounding, Minto narrative deconstruction, and executive headline copywriting.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-[#070b16] p-5">
                  <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    Independent Startup Transparency
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    DeckPilotAI is an independent technology startup. We prioritize multi-model routing, prompt security, and strict data privacy, ensuring no customer data is ever used to train foundation models.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
                <span>Want to inspect our full technical stack?</span>
                <Link
                  href="/technology"
                  className="inline-flex items-center gap-1.5 text-[#38bdf8] hover:text-white font-medium"
                >
                  <span>Explore Technology Architecture</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE PROMPT PLAYGROUND ================= */}
        <section id="playground" className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Ready-To-Use Prompts</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Ready-to-use executive prompts.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Click any prompt template below to launch your workspace with that narrative ready.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                href="/workspace"
                className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 hover:border-[#0086FF]/60 hover:bg-[#111a30] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      💼 Seed Round Pitch Deck
                    </span>
                    <span className="rounded-full bg-[#0086FF]/10 px-2.5 py-0.5 text-[10px] font-medium text-[#38bdf8] border border-[#0086FF]/20">
                      Startup
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    &quot;Build a 10-slide Seed round pitch deck emphasizing our +142% MoM ARR traction, market TAM, and enterprise pipeline.&quot;
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-end text-xs text-[#0086FF] font-medium">
                  <span>Launch this prompt</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/workspace"
                className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 hover:border-[#0086FF]/60 hover:bg-[#111a30] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      📊 Executive Quarterly Review (QBR)
                    </span>
                    <span className="rounded-full bg-cyan-500/10 px-2.5 py-0.5 text-[10px] font-medium text-cyan-400 border border-cyan-500/20">
                      Executive
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    &quot;Create an executive quarterly business review highlighting revenue milestones, customer retention metrics, and product roadmap.&quot;
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-end text-xs text-cyan-400 font-medium">
                  <span>Launch this prompt</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/workspace"
                className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 hover:border-[#0086FF]/60 hover:bg-[#111a30] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      🚀 Product Launch Keynote
                    </span>
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-medium text-emerald-400 border border-emerald-500/20">
                      Keynote
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    &quot;Draft an engaging product launch keynote presentation covering the market challenge, architecture breakdown, and go-to-market.&quot;
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-end text-xs text-emerald-400 font-medium">
                  <span>Launch this prompt</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>

              <Link
                href="/workspace"
                className="rounded-3xl border border-white/10 bg-[#0c1222]/90 p-6 hover:border-[#0086FF]/60 hover:bg-[#111a30] transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-bold text-white group-hover:text-[#38bdf8] transition-colors">
                      🎯 Annual Strategic Plan
                    </span>
                    <span className="rounded-full bg-violet-500/10 px-2.5 py-0.5 text-[10px] font-medium text-violet-400 border border-violet-500/20">
                      Strategy
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    &quot;Generate a strategic planning deck with SWOT matrix, OKR benchmarks, resource allocation models, and risk mitigations.&quot;
                  </p>
                </div>
                <div className="mt-5 flex items-center justify-end text-xs text-violet-400 font-medium">
                  <span>Launch this prompt</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* ================= ENTERPRISE CTA BANNER ================= */}
        <section className="py-20 relative overflow-hidden">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c162e] to-[#080e1b] px-8 py-16 text-center shadow-2xl">
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0086FF]/20 blur-[100px]" />

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-6">
                <span>Start Generating Decks</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl max-w-xl mx-auto">
                Ready to elevate your presentations?
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm text-slate-300">
                Join founders, consultants, and leaders who save hours of formatting every week with DeckPilotAI.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link
                  href="/workspace"
                  className="flex items-center justify-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#0086FF]/30 hover:bg-[#0075ED] hover:scale-105 transition-all cursor-pointer w-full sm:w-auto"
                >
                  <span>Launch Workspace</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/register"
                  className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
