"use client";

import Link from "next/link";
import { useState } from "react";
import { Header } from "@/components/Header";
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
  Clock,
  Database,
  Lock,
  ChevronRight,
  TrendingUp,
  FileSpreadsheet,
  Check,
  Play,
  Sliders,
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

  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      {/* Top Floating Header */}
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
          {/* Ambient Radial Spotlight Gradients */}
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-[#0086FF]/15 blur-[140px]" />
          <div className="pointer-events-none absolute top-1/4 right-0 -z-10 h-[450px] w-[550px] rounded-full bg-[#38bdf8]/10 blur-[120px]" />

          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center">
            {/* Pill Announcement Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-1.5 text-xs font-medium text-[#38bdf8] backdrop-blur-md mb-8 hover:border-[#0086FF]/50 transition-colors">
              <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>Multi-Agent Presentation Intelligence</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Deterministic PPTX Engine</span>
              <ChevronRight className="h-3 w-3 text-[#38bdf8]" />
            </div>

            {/* Main Headline (TokenRouter Style) */}
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              <span className="block">One Prompt.</span>
              <span className="block bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
                Executive Presentations.
              </span>
              <span className="block bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                Zero Formatting.
              </span>
            </h1>

            {/* Subheading */}
            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              <strong className="text-white font-medium">Your AI Presentation Team.</strong> Turn rough ideas, financial spreadsheets, PDF whitepapers, and DOCX briefs into executive-level PowerPoint decks through conversation.
            </p>

            {/* Action Pill CTAs */}
            <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Link
                href="/workspace"
                className="flex items-center justify-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer w-full sm:w-auto"
              >
                <span>Start Building Free</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href="#hero-showcase"
                className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-3.5 text-sm font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-all w-full sm:w-auto"
              >
                <Play className="h-3.5 w-3.5 fill-slate-300 text-slate-300" />
                <span>Explore Live Cockpit</span>
              </a>
            </div>

            {/* Quick Trust Highlights */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                100% Native OpenXML (.pptx)
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                1M Context Auto-Compacting
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                Live Multi-Step Agent Execution
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
                    deckpilotAI Studio — Presentation Engine v2.0
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-0.5 text-[11px] font-medium text-emerald-400">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Agent Mesh Active
                  </span>
                  <span className="text-xs text-slate-400 font-mono hidden md:inline">
                    Latency: 3.4s • 1M Context
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
                        8 of 8 Stages Complete
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
                            2. Deck Architect & Planner
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
                            3. Executive Copywriter & Stylist
                          </div>
                          <div className="text-[10px] text-slate-400">
                            High-impact headlines & obsidian palette
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
                      <span>deckpilotAI Engine • OpenXML Presentation</span>
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

        {/* ================= STATS & TRUST BAR ================= */}
        <section className="border-y border-white/5 bg-[#090e1a]/60 py-12">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-4 text-center">
              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  100%
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">
                  Native OpenXML PPTX
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  True editable shapes & masters
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0086FF] tracking-tight">
                  &lt; 8s
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">
                  Pipeline Latency
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  Multi-agent asynchronous execution
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  1M
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">
                  Context Window
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  Auto-compacting session memory
                </div>
              </div>

              <div className="p-4">
                <div className="text-3xl sm:text-4xl font-extrabold text-emerald-400 tracking-tight">
                  Zero
                </div>
                <div className="mt-1 text-xs font-medium text-slate-400">
                  Format Hallucination
                </div>
                <div className="mt-0.5 text-[11px] text-slate-400">
                  Strict OpenXML layout gates
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= BENTO GRID: CAPABILITIES ================= */}
        <section id="features" className="py-24 relative">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Zap className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Enterprise Architecture</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                Built for boardroom-ready presentations.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                A purpose-built multi-agent architecture designed to replace hours of manual PowerPoint drafting with instant executive clarity.
              </p>
            </div>

            {/* Bento Grid (TokenRouter Style) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0086FF]/10 text-[#0086FF] border border-[#0086FF]/20 mb-5 group-hover:scale-110 transition-transform">
                  <Layers className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Deterministic PPTX Engine
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Unlike tools that export fuzzy HTML snapshots, deckpilotAI generates raw native PowerPoint shapes, master slide layouts, and clean vector typography.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-[#38bdf8]">
                  <span>Native OpenXML 16:9</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Card 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <FileText className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Intelligent Document Grounding
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Attach complex PDF reports, Word briefs, or financial spreadsheets. Our grounding agents extract facts, numbers, and takeaways without hallucinating.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-cyan-400">
                  <span>PDF, DOCX, XLSX Ingestion</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Card 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <Clock className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Real-Time Thinking & Background Jobs
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Follow step-by-step progress as each agent works. Log out or close the browser tab at any time—detached backend workers finish the deck reliably.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-emerald-400">
                  <span>Detached Asynchronous Workers</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Card 4 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  1M Context Session Memory
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  ChatGPT-style draft sessions automatically title themselves on your first message. Long multi-turn conversations compact automatically without losing context.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-violet-400">
                  <span>Smart Auto-Compaction</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Card 5 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Visual QA & Verification Gates
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Automated visual inspection runs on every slide before delivery, verifying contrast ratios, margin alignment, and typography hierarchies.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-amber-400">
                  <span>Automated Quality Gates</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>

              {/* Card 6 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-6 backdrop-blur-xl hover:border-[#0086FF]/50 transition-all group">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-teal-500/10 text-teal-400 border border-teal-500/20 mb-5 group-hover:scale-110 transition-transform">
                  <Lock className="h-5 w-5" />
                </div>
                <h3 className="text-base font-semibold text-white">
                  Enterprise Cloudflare R2 Storage
                </h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  All presentations and uploaded references are stored securely with signed presigned URLs in Cloudflare R2, backed by edge libSQL on Turso Cloud.
                </p>
                <div className="mt-5 flex items-center gap-2 text-[11px] font-medium text-teal-400">
                  <span>Turso Cloud + Cloudflare R2</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= ARCHITECTURE WORKFLOW ================= */}
        <section id="architecture" className="border-t border-white/5 bg-[#080d19]/80 py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Sliders className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>How It Works</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                From natural conversation to presentation.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                Four orchestrated phases execute in real-time to deliver board-ready decks.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {/* Step 1 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <span className="rounded-full bg-[#0086FF]/20 px-2.5 py-1 text-[11px] font-mono text-[#38bdf8] border border-[#0086FF]/30">
                  01
                </span>
                <h3 className="text-base font-bold text-white mt-4">Prompt & Attach</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Type your core idea or attach financial spreadsheets, strategy notes, or PDF whitepapers.
                </p>
              </div>

              {/* Step 2 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <span className="rounded-full bg-[#0086FF]/20 px-2.5 py-1 text-[11px] font-mono text-[#38bdf8] border border-[#0086FF]/30">
                  02
                </span>
                <h3 className="text-base font-bold text-white mt-4">Ground & Architect</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Fact-grounding agents analyze source documents and map the complete narrative slide arc.
                </p>
              </div>

              {/* Step 3 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <span className="rounded-full bg-[#0086FF]/20 px-2.5 py-1 text-[11px] font-mono text-[#38bdf8] border border-[#0086FF]/30">
                  03
                </span>
                <h3 className="text-base font-bold text-white mt-4">Compile OpenXML</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  The deterministic PPTX renderer outputs native widescreen master shapes and executive typography.
                </p>
              </div>

              {/* Step 4 */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222] p-6 relative">
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-1 text-[11px] font-mono text-emerald-400 border border-emerald-500/30">
                  04
                </span>
                <h3 className="text-base font-bold text-white mt-4">Instant Export</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Download an editable `.pptx` file directly or request iterative revisions through ongoing chat.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= INTERACTIVE PROMPT PLAYGROUND ================= */}
        <section id="playground" className="py-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Quick Starter Templates</span>
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
                    &quot;Build a 10-slide Seed round pitch deck emphasizing our 45% MoM ARR traction, market TAM, and enterprise pipeline.&quot;
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
              {/* Central Electric Blue Glow */}
              <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[350px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0086FF]/20 blur-[100px]" />

              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-6">
                <span>Start Generating Decks</span>
              </div>

              <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl max-w-xl mx-auto">
                Ready to elevate your presentations?
              </h2>

              <p className="mx-auto mt-4 max-w-md text-sm text-slate-300">
                Join teams who save hours of formatting every week with deckpilotAI.
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

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/5 bg-[#05070d] py-10 text-xs text-slate-400">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8]">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <div>
              <span className="font-bold text-white">deckpilotAI</span>
              <span className="mx-2 text-slate-600">—</span>
              <span className="text-slate-400">From Prompt to Presentation.</span>
            </div>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400 font-mono text-[11px]">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              All Systems Operational
            </span>
            <span className="text-slate-500">•</span>
            <span>Cloudflare R2</span>
            <span>Turso libSQL</span>
            <span>FastAPI Core</span>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-white/5 text-center sm:text-left text-[11px] text-slate-500">
          © {new Date().getFullYear()} deckpilotAI Inc. All rights reserved. Deterministic multi-agent presentation engineering.
        </div>
      </footer>
    </div>
  );
}
