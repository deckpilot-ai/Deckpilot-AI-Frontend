"use client";

import { useState, useEffect, useRef } from "react";
import { Brain, ChevronDown, ChevronUp, Terminal, Cpu } from "lucide-react";

// Curated sequential thinking stages for presentation strategy & prompt deconstruction
const SEQUENTIAL_THINKING_STAGES = [
  "Parsing prompt context, domain parameters, and deck requirements...",
  "Analyzing explicit negative constraints, formatting rules, and style boundaries...",
  "Extracting core value proposition, audience personas, and stakeholder decision triggers...",
  "Formulating Barbara Minto Pyramid narrative flow (Situation → Complication → Core Thesis)...",
  "Structuring slide chapter chapters: Market Context, Proprietary Architecture, Traction, Execution Roadmap...",
  "Synthesizing unit economics, net retention benchmarks, and verifiable ROI proof points...",
  "Evaluating 16:9 widescreen layout allocation and visual cognitive weight...",
  "Calibrating typography hierarchy, font pairing, and executive obsidian palette...",
  "Drafting action-oriented headlines answering the 'So What?' for each slide...",
  "Designing modular two-column and metric card layout specifications...",
  "Verifying negative constraints (hyphen rules, asset preservation, slide ceiling)...",
  "Packaging presentation architecture and compiling executive brief...",
];

// Combinatorial vocabulary engine (40 verbs × 12 adverbs × 30 domains × 15 goals = 216,000+ unique thoughts)
const VERBS = [
  "Analyzing", "Synthesizing", "Deconstructing", "Structuring", "Formulating",
  "Calibrating", "Evaluating", "Refining", "Optimizing", "Grounding",
  "Extracting", "Architecting", "Validating", "Cross-referencing", "Harmonizing",
  "Balancing", "Benchmarking", "Sequencing", "Cataloging", "Aligning",
  "Curating", "Generating", "Drafting", "Composing", "Verifying",
  "Inspecting", "Polishing", "Tailoring", "Reviewing", "Modeling",
  "Engineering", "Mapping", "Iterating", "Distilling", "Formatting",
  "Normalizing", "Correlating", "Contextualizing", "Refactoring", "Auditing"
];

const ADVERBS = [
  "rigorously", "systematically", "strategically", "holistically", "iteratively",
  "proactively", "comprehensively", "dynamically", "quantitatively", "deterministically",
  "architecturally", "meticulously"
];

const DOMAINS = [
  "Minto Pyramid narrative arc", "enterprise unit economics", "ARR expansion metrics",
  "TAM/SAM/SOM market sizing", "competitive moats and defensibility", "boardroom presentation standards",
  "negative constraints and boundaries", "16:9 widescreen layout grids", "typography scale and font metrics",
  "action-oriented headlines", "quantitative proof points", "executive summary narratives",
  "quarterly KPI milestones", "OpenXML shape definitions", "contrast ratios and visual QA",
  "customer ROI benchmarks", "go-to-market execution vectors", "stakeholder decision triggers",
  "slide cognitive weight distribution", "two-column comparative structures", "financial payback velocity",
  "enterprise procurement criteria", "cross-slide narrative continuity", "metric callout cards",
  "timeline milestones and roadmap", "value proposition thesis", "market positioning vectors",
  "widescreen margin ratios", "visual balance hierarchy", "corporate aesthetic fidelity"
];

const GOALS = [
  "for boardroom clarity", "against enterprise standards", "across widescreen viewports",
  "to eliminate cognitive friction", "with quantitative precision", "under strict layout constraints",
  "for maximum investor conviction", "ensuring high scannability", "calibrating visual balance",
  "aligning with executive priorities", "optimizing information density", "verifying zero placeholder fluff",
  "strengthening narrative momentum", "guaranteeing executive polish", "anchoring on verifiable metrics"
];

function generateDynamicThought(seed: number): string {
  const v = VERBS[seed % VERBS.length];
  const adv = ADVERBS[(seed * 3) % ADVERBS.length];
  const d = DOMAINS[(seed * 7) % DOMAINS.length];
  const g = GOALS[(seed * 11) % GOALS.length];
  return `${v} ${d} ${adv} ${g}...`;
}

export function ClaudeThinkingCard() {
  const [expanded, setExpanded] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [currentThoughtIndex, setCurrentThoughtIndex] = useState(0);
  const [thoughtHistory, setThoughtHistory] = useState<Array<{ text: string; time: number }>>([
    { text: SEQUENTIAL_THINKING_STAGES[0], time: 0 },
  ]);
  const terminalBottomRef = useRef<HTMLDivElement>(null);

  // 1. Live elapsed timer
  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.max(1, Math.floor((Date.now() - start) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 2. Dynamic thought stream rotation (every 1.6s)
  useEffect(() => {
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      let nextThought: string;
      if (step < SEQUENTIAL_THINKING_STAGES.length) {
        nextThought = SEQUENTIAL_THINKING_STAGES[step];
      } else {
        nextThought = generateDynamicThought(step);
      }

      setCurrentThoughtIndex(step);
      setThoughtHistory((prev) => [
        ...prev,
        { text: nextThought, time: Math.floor(step * 1.6) },
      ]);
    }, 1600);

    return () => clearInterval(interval);
  }, []);

  // Auto-scroll inside expanded terminal view
  useEffect(() => {
    if (expanded && terminalBottomRef.current) {
      terminalBottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [thoughtHistory, expanded]);

  const currentThought =
    thoughtHistory.length > 0
      ? thoughtHistory[thoughtHistory.length - 1].text
      : SEQUENTIAL_THINKING_STAGES[0];

  return (
    <div className="my-3 max-w-2xl overflow-hidden rounded-3xl border border-[#0086FF]/30 bg-gradient-to-br from-[#0c1424]/95 via-[#080d18]/95 to-[#060a12]/95 p-4 shadow-2xl backdrop-blur-xl transition-all">
      {/* Interactive Claude Thinking Header */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Animated Brain Icon */}
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0086FF]/15 text-[#38bdf8] border border-[#0086FF]/30 shadow-md shadow-[#0086FF]/20">
            <Brain className="h-4 w-4 animate-pulse" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                <span>Thinking</span>
                <span className="text-slate-400 font-normal">({elapsedSeconds}s)</span>
              </span>
              <span className="rounded-full bg-[#0086FF]/15 px-2 py-0.5 text-[9px] font-mono text-[#38bdf8] border border-[#0086FF]/30">
                Update #{currentThoughtIndex + 1}
              </span>
            </div>

            {/* Rotating Active Thought with Fade Transition */}
            <div className="mt-0.5 flex items-center gap-1.5 overflow-hidden">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0 animate-pulse" />
              <p
                key={currentThoughtIndex}
                className="text-[11px] text-slate-300 font-medium truncate font-mono animate-in fade-in slide-in-from-bottom-1 duration-300"
              >
                {currentThought}
              </p>
            </div>
          </div>
        </div>

        {/* Expand / Collapse Thinking Log */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          title="Toggle Claude-style thinking timeline"
        >
          <Terminal className="h-3 w-3 text-[#38bdf8]" />
          <span>{expanded ? "Hide Details" : "Inspect Thoughts"}</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Expandable Claude Thinking Stream Log */}
      {expanded && (
        <div className="mt-3.5 border-t border-white/10 pt-3">
          <div className="flex items-center justify-between text-[10px] text-slate-400 uppercase tracking-wider font-mono mb-2 px-1">
            <span className="flex items-center gap-1.5">
              <Cpu className="h-3 w-3 text-[#0086FF]" />
              Live Thinking Process Timeline
            </span>
            <span>{thoughtHistory.length} reasoning steps</span>
          </div>

          <div className="max-h-56 overflow-y-auto space-y-1.5 rounded-2xl bg-[#040810]/90 p-3.5 border border-white/5 font-mono text-[11px] shadow-inner">
            {thoughtHistory.map((t, idx) => {
              const isLatest = idx === thoughtHistory.length - 1;
              return (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 transition-colors ${
                    isLatest ? "text-white font-medium" : "text-slate-400"
                  }`}
                >
                  <span className="text-[#38bdf8] select-none text-[10px] shrink-0 font-bold">
                    +{t.time}s
                  </span>
                  <span className="text-[#0086FF] select-none shrink-0 font-bold">›</span>
                  <span className="leading-relaxed flex-1">
                    {t.text}
                    {isLatest && (
                      <span className="inline-block w-1.5 h-3 ml-1 bg-[#38bdf8] animate-pulse align-middle" />
                    )}
                  </span>
                </div>
              );
            })}
            <div ref={terminalBottomRef} />
          </div>
        </div>
      )}
    </div>
  );
}
