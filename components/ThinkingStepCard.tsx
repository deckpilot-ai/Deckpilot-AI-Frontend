"use client";

import { useEffect, useState } from "react";
import {
  Sparkles,
  CheckCircle2,
  Clock,
  ChevronDown,
  ChevronUp,
  XCircle,
  Download,
  Sliders,
  Layers,
  Palette,
  LayoutTemplate,
  FileText,
  FileCode,
  ShieldCheck,
  Check,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GenerationJobInfo } from "@/lib/api";

const STAGE_METADATA: Record<
  string,
  { label: string; desc: string; icon: LucideIcon }
> = {
  reference_intake: {
    label: "Reference Intake & Ingestion",
    desc: "Ingesting reference files and analyzing document assets",
    icon: Layers,
  },
  source_grounding: {
    label: "Source Fact Grounding",
    desc: "Extracting factual claims, metrics, and core talking points",
    icon: FileText,
  },
  font_brand_detection: {
    label: "Brand & Style Intelligence",
    desc: "Choosing topic-appropriate colors and presentation typography",
    icon: Palette,
  },
  deck_planner: {
    label: "Deck Architecture Planning",
    desc: "Structuring presentation narrative arc and slide layout matrix",
    icon: LayoutTemplate,
  },
  slide_writer: {
    label: "Slide Content Writing",
    desc: "Formulating high-impact headlines and grounded takeaways",
    icon: FileCode,
  },
  pptx_renderer: {
    label: "Native 16:9 PPTX Rendering",
    desc: "Rendering widescreen slides into deterministic OpenXML shapes",
    icon: Sliders,
  },
  visual_qa: {
    label: "PPTX Structure Validation",
    desc: "Checking slide count, canvas bounds, and file structure",
    icon: ShieldCheck,
  },
  gatekeeper: {
    label: "Packaging & Verification",
    desc: "Final delivery sign-off and presentation artifact assembly",
    icon: CheckCircle2,
  },
};

const STAGE_KEYS = [
  "reference_intake",
  "source_grounding",
  "font_brand_detection",
  "deck_planner",
  "slide_writer",
  "pptx_renderer",
  "visual_qa",
  "gatekeeper",
];


interface ThinkingStepCardProps {
  job: GenerationJobInfo;
  deckVersion?: number;
  onCancel?: () => void;
  onDownload?: () => void;
}

export function ThinkingStepCard({
  job,
  deckVersion = 1,
  onCancel,
  onDownload,
}: ThinkingStepCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);


  // Track elapsed time while running
  useEffect(() => {
    if (job.status !== "running" && job.status !== "queued") return;

    const start = job.started_at ? job.started_at * 1000 : Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.max(0, Math.floor((Date.now() - start) / 1000)));
    }, 1000);



    return () => {
      clearInterval(interval);

    };
  }, [job.status, job.started_at]);

  // Determine stage progress
  const completedCount = job.tasks.filter((t) => t.status === "completed").length;
  const currentRunningTask = job.tasks.find((t) => t.status === "running");
  const percent =
    job.status === "completed"
      ? 100
      : Math.min(95, Math.round((completedCount / STAGE_KEYS.length) * 100) || 5);

  const activeStageKey = currentRunningTask?.agent_type || STAGE_KEYS[Math.min(completedCount, 7)];
  const activeMeta = STAGE_METADATA[activeStageKey] || {
    label: "Processing Stage",
    desc: "Orchestrating multi-agent workflow...",
    icon: Sparkles,
  };
  const ActiveIcon = activeMeta.icon;

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  // 1. Completed State
  if (job.status === "completed") {
    return (
      <div className="my-4 overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-[#0c1a2e] to-[#07111c] p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Check className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white">
                  Presentation Ready
                </span>
                <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                  Deck v{deckVersion}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Presentation generated and PowerPoint structure checked
              </p>
            </div>
          </div>

          <button
            onClick={onDownload}
            className="flex items-center gap-2 rounded-full bg-[#0086FF] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#0086FF]/30 hover:bg-[#0075ED] transition-all cursor-pointer w-full sm:w-auto justify-center"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Download PowerPoint (.PPTX)</span>
          </button>
        </div>

        {/* Presentation Metadata Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10 flex items-center gap-1.5 font-mono text-[10px]">
            <Sliders className="h-3 w-3 text-[#38bdf8]" />
            16:9 Widescreen
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10 flex items-center gap-1.5 font-mono text-[10px]">
            <Palette className="h-3 w-3 text-[#0086FF]" />
            Executive Color System
          </span>
          <span className="rounded-full bg-white/5 px-3 py-1 border border-white/10 flex items-center gap-1.5 font-mono text-[10px]">
            <ShieldCheck className="h-3 w-3 text-emerald-400" />
            Structure Checks Passed
          </span>
        </div>
      </div>
    );
  }

  // 2. Cancelled State
  if (job.status === "cancelled") {
    return (
      <div className="my-4 rounded-3xl border border-amber-500/30 bg-[#16120d] p-4 text-xs text-amber-300 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <XCircle className="h-4 w-4 text-amber-400" />
          <span>Generation was cancelled by user.</span>
        </div>
      </div>
    );
  }

  // 3. Failed State
  if (job.status === "permanently_failed") {
    return (
      <div className="my-4 rounded-3xl border border-red-500/30 bg-[#1e0e12] p-4 text-xs text-red-300 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-2.5">
          <XCircle className="h-4 w-4 text-red-400" />
          <span>Generation failed. Please refine your prompt or retry.</span>
        </div>
      </div>
    );
  }

  // 4. Running / Queued State (TokenRouter Live Monitor)
  return (
    <div className="my-4 overflow-hidden rounded-3xl border border-[#0086FF]/30 bg-[#0c1424] p-5 shadow-2xl backdrop-blur-xl">
      {/* Top Status Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0086FF]/20 text-[#0086FF] border border-[#0086FF]/30">
            <ActiveIcon className="h-4 w-4 animate-pulse" />
            <div className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-[#38bdf8] animate-ping" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-white">
                deckpilotAI is thinking & building...
              </span>
              <span className="rounded-full bg-[#0086FF]/20 px-2 py-0.5 text-[10px] font-medium text-[#38bdf8] border border-[#0086FF]/30">
                Step {completedCount + 1} of 8
              </span>
            </div>
            <p className="text-[11px] text-[#38bdf8] font-medium mt-0.5">
              {activeMeta.label}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] text-slate-300 font-mono bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
            <Clock className="h-3 w-3 text-[#38bdf8]" />
            <span>{formatTimer(elapsedSeconds)}</span>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-950/30 px-3 py-1 text-[11px] font-medium text-red-300 hover:bg-red-900/50 hover:text-red-200 transition-colors cursor-pointer"
            >
              <XCircle className="h-3 w-3" />
              <span>Cancel</span>
            </button>
          )}
        </div>
      </div>

      {/* Progress Bar & Dynamic Thought Ticker */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center justify-between text-[10px] text-slate-400 gap-2">
          <div className="flex items-center gap-1.5 min-w-0 flex-1">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38bdf8] shrink-0 animate-pulse" />
            <span

              className="font-mono text-slate-300 truncate animate-in fade-in duration-300"
            >
              {job.live_agent === activeStageKey && job.live_message ? job.live_message : activeMeta.desc}
            </span>
          </div>
          <span className="font-mono text-[#38bdf8] shrink-0">{percent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#15233e]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Expandable Step-by-Step Details */}
      <div className="mt-3.5 border-t border-white/10 pt-2.5">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex w-full items-center justify-between text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer py-1"
        >
          <span>View all 8 agent pipeline stages</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5" />
          )}
        </button>

        {expanded && (
          <div className="mt-2.5 space-y-1.5 rounded-2xl bg-[#080d18] p-3.5 border border-white/10">
            {STAGE_KEYS.map((key, idx) => {
              const taskInfo = job.tasks.find((t) => t.agent_type === key);
              const meta = STAGE_METADATA[key];
              const isCompleted = taskInfo?.status === "completed";
              const isRunning = taskInfo?.status === "running";

              return (
                <div
                  key={key}
                  className={`flex items-center justify-between rounded-xl px-2.5 py-1.5 text-xs transition-colors ${
                    isRunning
                      ? "bg-[#0086FF]/20 text-white font-medium border border-[#0086FF]/40"
                      : isCompleted
                      ? "text-slate-300"
                      : "text-slate-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-slate-400 w-3">
                      {idx + 1}.
                    </span>
                    <span>{meta.label}</span>
                  </div>

                  <div>
                    {isCompleted && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                    )}
                    {isRunning && (
                      <Sparkles className="h-3.5 w-3.5 text-[#38bdf8] animate-spin" />
                    )}
                    {!isCompleted && !isRunning && (
                      <span className="text-[10px] text-slate-400">pending</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

