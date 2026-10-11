import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Briefcase,
  Users,
  Presentation,
  CheckCircle2,
  FileSpreadsheet,
  FileText,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Solutions — DeckPilotAI | Presentations Engineered for High-Stakes Teams",
  description:
    "Tailored presentation generation solutions for startup founders, management consultants, corporate executives, and enterprise sales teams.",
};

export default function SolutionsPage() {
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
              <span>Tailored Solutions</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Executive Grade Communication</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.08]">
              Engineered for the decks that{" "}
              <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                define your business.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              Whether you are raising capital, advising Fortune 500 leadership, reporting to your board, or closing enterprise deals, DeckPilotAI builds presentations with precision.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/workspace"
                className="flex items-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all"
              >
                <span>Start Generating Decks</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION 1: FOUNDERS ================= */}
        <section id="founders" className="py-20 border-t border-white/5 bg-[#090e1a]/70 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3 py-1 text-xs font-semibold text-[#38bdf8]">
                  <TrendingUp className="h-3.5 w-3.5" />
                  <span>For Startup Founders</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Fundraising decks that turn metrics into conviction.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Pitching investors requires balancing narrative momentum with undeniable unit economics. DeckPilotAI takes your rough founder notes, financial model spreadsheets, and market research to build compelling Seed, Series A, and Series B decks.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Verified ARR & Cohort Callouts:</strong> Highlights YoY growth, net retention, and payback periods accurately.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Minto Problem-Solution Thesis:</strong> Eliminates fluff and grounds market sizing (TAM/SAM/SOM) in real data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>100% Editable in PowerPoint:</strong> Refine slide notes, customize valuations, and format before partner meetings.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                  <span className="font-mono text-[#38bdf8]">Template: Seed Pitch Deck</span>
                  <span>10 Slides • 16:9</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-[#080d1a] p-5">
                  <div className="text-xs font-bold text-white mb-1">
                    Slide 4: Traction & Velocity
                  </div>
                  <div className="text-[11px] text-slate-400 mb-4">
                    Enterprise expansion with +142% YoY growth and 7-month payback
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div className="rounded-lg bg-white/5 p-2 text-center">
                      <div className="text-[10px] text-slate-400">Annual Run Rate</div>
                      <div className="text-sm font-bold text-white mt-0.5">$4.8M</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2 text-center">
                      <div className="text-[10px] text-slate-400">Net Retention</div>
                      <div className="text-sm font-bold text-emerald-400 mt-0.5">128%</div>
                    </div>
                    <div className="rounded-lg bg-white/5 p-2 text-center">
                      <div className="text-[10px] text-slate-400">LTV / CAC</div>
                      <div className="text-sm font-bold text-[#38bdf8] mt-0.5">3.9x</div>
                    </div>
                  </div>
                  <div className="mt-4 p-2.5 rounded-lg border border-[#0086FF]/20 bg-[#0086FF]/5 text-[11px] text-slate-300">
                    <strong className="text-white">Grounded Takeaway:</strong> Enterprise cohort retention stabilized at 128% across 45 Fortune 500 accounts.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION 2: CONSULTANTS ================= */}
        <section id="consultants" className="py-20 border-t border-white/5 bg-[#070b14] scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-semibold text-cyan-400">
                  <Briefcase className="h-3.5 w-3.5" />
                  <span>For Strategy Consultants</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Turn massive client briefs into structured recommendations.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Management consulting demands rigorous structure. Rather than spending weekends manually formatting two-column matrices, let DeckPilotAI organize findings according to Barbara Minto&apos;s Pyramid Principle.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Action-Oriented Headlines:</strong> Every slide answers the &quot;So What?&quot; directly in the lead title.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Multi-Document Ingestion:</strong> Attach PDF interviews, regulatory whitepapers, and operational data.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Zero Formatting Drift:</strong> Built on widescreen 16:9 master templates with verified margin alignment.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 lg:order-1 rounded-3xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                  <span className="font-mono text-cyan-400">Template: Strategic Market Assessment</span>
                  <span>Minto Pyramid Structure</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-[#080d1a] p-5 space-y-3">
                  <div className="p-3 rounded-lg border border-white/5 bg-white/5 text-xs text-slate-200">
                    <strong className="text-cyan-400 block mb-1">Situation</strong>
                    Legacy on-premise infrastructure imposes $14M in annual maintenance overhead.
                  </div>
                  <div className="p-3 rounded-lg border border-white/5 bg-white/5 text-xs text-slate-200">
                    <strong className="text-amber-400 block mb-1">Complication</strong>
                    Modern distributed compliance mandates require cloud-native auditability within 9 months.
                  </div>
                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-slate-200">
                    <strong className="text-emerald-400 block mb-1">Recommendation</strong>
                    Phased edge-migration roadmap cuts operational latency by 45% while reducing costs by $6.2M.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION 3: EXECUTIVES ================= */}
        <section id="executives" className="py-20 border-t border-white/5 bg-[#090e1a]/70 scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-violet-500/30 bg-violet-500/10 px-3 py-1 text-xs font-semibold text-violet-400">
                  <Presentation className="h-3.5 w-3.5" />
                  <span>For Corporate Executives</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Board reviews and QBRs without the late-night panic.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  When executive meetings approach, leaders don&apos;t have time to build slides from scratch. Provide your team&apos;s monthly KPI reports or meeting notes, and DeckPilotAI compiles the Quarterly Business Review in minutes.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Consistent Corporate Aesthetics:</strong> Obsidian palettes and crisp typography that command boardroom respect.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>124 Automated Quality Gates:</strong> Eliminates embarrassing text overlaps, broken margins, and illegible fonts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Conversational Editing:</strong> Request updates like &quot;add slide on Q4 headcount allocation&quot; in real-time chat.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 rounded-3xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                  <span className="font-mono text-violet-400">Template: Executive QBR</span>
                  <span>Board Level</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-[#080d1a] p-5">
                  <div className="text-xs font-bold text-white mb-2">
                    Q3 Executive Performance Scorecard
                  </div>
                  <div className="space-y-2 text-xs text-slate-300">
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span>Enterprise Pipeline Generated</span>
                      <span className="font-mono font-semibold text-emerald-400">$18.4M (+32% vs Target)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span>Customer Acquisition Cost</span>
                      <span className="font-mono font-semibold text-[#38bdf8]">$4,200 (-18% MoM)</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-white/5">
                      <span>Gross Margin Efficiency</span>
                      <span className="font-mono font-semibold text-white">84.2%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= SOLUTION 4: GTM & SALES ================= */}
        <section id="gtm" className="py-20 border-t border-white/5 bg-[#070b14] scroll-mt-24">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 lg:order-2 space-y-5">
                <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                  <Users className="h-3.5 w-3.5" />
                  <span>For Sales & Solutions Engineering</span>
                </div>
                <h2 className="text-3xl font-extrabold text-white tracking-tight sm:text-4xl">
                  Client proposals that accelerate enterprise deal cycles.
                </h2>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Tailor every presentation to your prospect&apos;s specific challenges, architectural constraints, and business ROI without reinventing slides for each prospective account.
                </p>
                <ul className="space-y-3 text-xs text-slate-300">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Customer-Centric Storylines:</strong> Highlights client pain points and maps technical solutions directly.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>RFP Ingestion:</strong> Attach client requirements and automatically generate compliant proposal slides.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong>Native PPTX Hand-off:</strong> Account executives can customize pricing or swap team bios before the call.</span>
                  </li>
                </ul>
              </div>

              <div className="lg:col-span-6 lg:order-1 rounded-3xl border border-white/10 bg-[#0c1222] p-6 shadow-2xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-slate-400">
                  <span className="font-mono text-emerald-400">Template: Enterprise Solution Proposal</span>
                  <span>RFP Alignment</span>
                </div>
                <div className="mt-4 rounded-xl border border-white/10 bg-[#080d1a] p-5 space-y-3">
                  <div className="text-xs font-bold text-white">
                    Client Value Proposition & ROI Forecast
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed">
                    By replacing manual presentation compilation across 120 team members, customer realizes an estimated annual productivity return of $480,000 within 6 months.
                  </p>
                  <div className="p-3 rounded-lg border border-emerald-500/20 bg-emerald-500/5 text-xs text-emerald-300">
                    Payback period: 2.4 months • Implementation: 14 days
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FINAL CTA ================= */}
        <section className="py-24 border-t border-white/5">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Elevate your team&apos;s presentation workflow.
            </h2>
            <p className="mt-3 text-sm text-slate-300 max-w-lg mx-auto">
              Join founders, consultants, and leaders who rely on DeckPilotAI for autonomous presentation engineering.
            </p>
            <div className="mt-8 flex justify-center gap-4">
              <Link
                href="/workspace"
                className="flex items-center gap-2 rounded-full bg-[#0086FF] px-8 py-3.5 text-sm font-semibold text-white shadow-xl shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all"
              >
                <span>Launch Studio Free</span>
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
