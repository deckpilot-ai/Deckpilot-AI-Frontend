import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import {
  Sparkles,
  ArrowRight,
  Shield,
  Lightbulb,
  Cpu,
  Target,
  Users,
  Compass,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us — DeckPilotAI | Mission, Vision & Startup Story",
  description:
    "DeckPilotAI is an emerging AI startup developing autonomous presentation engineering agents. Learn our story, mission, vision, and approach to responsible AI.",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#070a13] text-slate-100 selection:bg-[#0086FF]/30 selection:text-white bg-dot-grid relative">
      <Header />

      <main className="flex-1">
        {/* ================= HERO SECTION ================= */}
        <section className="relative overflow-hidden pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="pointer-events-none absolute -top-32 left-1/2 -z-10 h-[600px] w-[800px] -translate-x-1/2 rounded-full bg-[#0086FF]/12 blur-[140px]" />

          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-1.5 text-xs font-medium text-[#38bdf8] backdrop-blur-md mb-8">
              <Sparkles className="h-3.5 w-3.5 text-[#0086FF]" />
              <span>About DeckPilotAI</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-300">Independent AI Startup</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl leading-[1.12]">
              Reimagining presentations from the ground up with{" "}
              <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 bg-clip-text text-transparent">
                autonomous agents.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed">
              We are an emerging technology startup building intelligent, agentic AI solutions for productivity and enterprise workflows. Our flagship product automates the creation of professional, fully editable PowerPoint presentations.
            </p>
          </div>
        </section>

        {/* ================= MISSION & VISION ================= */}
        <section className="py-16 border-y border-white/5 bg-[#090e1a]/60">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Mission Card */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden group hover:border-[#0086FF]/40 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0086FF]/15 text-[#38bdf8] border border-[#0086FF]/20 mb-6">
                  <Target className="h-6 w-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#38bdf8]">
                  Our Mission
                </div>
                <h2 className="mt-2 text-2xl font-bold text-white tracking-tight">
                  Effortless presentation intelligence.
                </h2>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Make professional presentation creation intelligent, accessible, and effortless through autonomous AI agents. We believe every team deserves board-ready visual communication without spending hours wrestling with slide margins, typography scales, or broken layouts.
                </p>
              </div>

              {/* Vision Card */}
              <div className="rounded-3xl border border-white/10 bg-[#0c1222]/80 p-8 sm:p-10 backdrop-blur-xl relative overflow-hidden group hover:border-emerald-500/40 transition-all">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 mb-6">
                  <Compass className="h-6 w-6" />
                </div>
                <div className="text-xs font-semibold uppercase tracking-wider text-emerald-400">
                  Our Vision
                </div>
                <h2 className="mt-2 text-2xl font-bold text-white tracking-tight">
                  Focus on ideas, strategy & decisions.
                </h2>
                <p className="mt-4 text-sm text-slate-300 leading-relaxed">
                  Build AI-powered productivity tools that eliminate repetitive mechanical work, allowing founders, consultants, and executives to focus on deep thinking, core strategy, and high-stakes decisions rather than slide formatting.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= OUR STORY ================= */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1 text-xs font-medium text-slate-300 mb-4">
                <Lightbulb className="h-3.5 w-3.5 text-amber-400" />
                <span>Origins</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                The problem that inspired DeckPilotAI.
              </h2>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed">
              <p>
                Every day, millions of knowledge workers spend countless hours preparing presentations. Founders pitching investors, strategy consultants delivering quarterly reviews, and product leaders briefing executive boards all share the same frustration: the mechanics of creating slides consistently overshadow the quality of the ideas.
              </p>
              <p>
                The existing options force an uncomfortable compromise. On one hand, manual presentation design in legacy tools requires manually reading lengthy documents, copying data into spreadsheets, calculating chart ratios, and formatting shapes pixel by pixel. On the other hand, early generative AI tools often take shortcuts: generating static, non-editable image files, hallucinating financial metrics, or creating generic slides that fail executive scrutiny.
              </p>
              <p>
                We founded <strong className="text-white">DeckPilotAI</strong> with a clear conviction: presentations shouldn&apos;t be generated by a single prompt guessing at visual coordinates. They should be built by a disciplined team of specialized software agents—collaborating just like human presentation designers, copywriters, and quality assurance specialists.
              </p>
              <p>
                By combining multi-agent reasoning with a deterministic OpenXML compilation engine, DeckPilotAI produces presentations that are factually grounded, aesthetically balanced, and 100% editable in native PowerPoint.
              </p>
            </div>
          </div>
        </section>

        {/* ================= WHAT WE ARE BUILDING ================= */}
        <section className="py-20 border-t border-white/5 bg-[#080d19]/80">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <div className="inline-flex items-center gap-1.5 rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-3.5 py-1 text-xs font-medium text-[#38bdf8] mb-4">
                <Cpu className="h-3.5 w-3.5 text-[#0086FF]" />
                <span>Product Architecture</span>
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight sm:text-4xl">
                What we&apos;re building.
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                A multi-agent platform where specialized agents collaborate across the presentation creation lifecycle.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  Document Grounding
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Extracts verified facts, tables, and metrics from PDFs, Word briefs, and Excel spreadsheets without hallucinating ungrounded claims.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  Minto Narrative Architecture
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Structures presentations using proven executive frameworks (Situation, Complication, Solution) with clear, action-oriented headlines.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  Deterministic OpenXML
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Compiles mathematical coordinates into true Microsoft PowerPoint shapes and master layouts—never locked raster images.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  124 Automated QA Gates
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Evaluates contrast, margins, collision limits, typographic hierarchy, and data readability before any file is exported.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  Self-Healing Repair
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  When a QA checkpoint detects an overflow or visual collision, automated repair agents adjust layouts and re-evaluate autonomously.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-[#0c1222] p-6">
                <div className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#38bdf8]" />
                  Conversational Revisions
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Refine slides through ongoing dialogue. Request deeper analysis, change color schemes, or rewrite key takeaways in seconds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= RESPONSIBLE AI & PHILOSOPHY ================= */}
        <section className="py-24">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#0c162e] to-[#080e1b] p-8 sm:p-12 relative overflow-hidden">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#38bdf8] mb-4">
                <Shield className="h-4 w-4" />
                <span>Our Principles</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Our approach to responsible AI.
              </h2>

              <div className="mt-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  At DeckPilotAI, we hold strict standards for responsible AI development:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-white">Customer Data Privacy:</strong> User documents, uploaded briefs, and generated presentations are strictly private. We never sell user data and never train foundational models on customer documents.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-white">Factual Grounding:</strong> Our multi-agent pipeline enforces strict separation between source data and generative text. Claims made in data slides are explicitly linked back to ingested materials.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-1 shrink-0" />
                    <span>
                      <strong className="text-white">Human Control:</strong> AI serves as an accelerator, not an opaque black box. Because all presentations export to native PowerPoint, human professionals always retain full editorial authority.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <span className="text-xs text-slate-400">
                  Questions about our team or technology?
                </span>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-[#0086FF] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#0075ED] transition-all"
                >
                  <span>Contact Our Team</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
