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
  Loader2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { GenerationJobInfo, GenerationProgressEvent } from "@/lib/api";

const STAGE_METADATA: Record<
  string,
  { label: string; desc: string; agent: string; icon: LucideIcon }
> = {
  reference_intake: {
    label: "Document Analysis & Asset Extraction",
    desc: "Ingesting reference files and analyzing document assets",
    agent: "DocumentAnalysisAgent",
    icon: Layers,
  },
  source_grounding: {
    label: "Fact Grounding & Research",
    desc: "Extracting factual claims, metrics, and core talking points",
    agent: "ResearchAgent",
    icon: FileText,
  },
  font_brand_detection: {
    label: "Brand & Typography Intelligence",
    desc: "Calibrating topic-appropriate colors and typography",
    agent: "TypographyAgent",
    icon: Palette,
  },
  deck_planner: {
    label: "Presentation Architecture",
    desc: "Structuring presentation narrative arc and slide matrix",
    agent: "PresentationPlanningAgent",
    icon: LayoutTemplate,
  },
  slide_writer: {
    label: "Slide Generation & Content",
    desc: "Formulating high-impact headlines and grounded takeaways",
    agent: "SlideGenerationAgent",
    icon: FileCode,
  },
  pptx_renderer: {
    label: "Native 16:9 PPTX Layout Engine",
    desc: "Rendering widescreen slides into deterministic OpenXML shapes",
    agent: "LayoutAgent",
    icon: Sliders,
  },
  visual_qa: {
    label: "Quality Assurance & Structure Check",
    desc: "Checking slide count, canvas bounds, layout, and overflow",
    agent: "QualityAgent",
    icon: ShieldCheck,
  },
  gatekeeper: {
    label: "Workspace Delivery & Assembly",
    desc: "Final delivery sign-off and presentation artifact assembly",
    agent: "WorkspaceAgent",
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

function formatEventTime(timestamp: number) {
  return new Date(timestamp * 1000).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });
}

function ProgressTimeline({ events }: { events: GenerationProgressEvent[] }) {
  if (!events.length) return null;
  return (
    <div className="mt-3 rounded-2xl border border-white/10 bg-[#080d18] p-3.5">
      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-400">End-to-end activity</p>
      <div className="max-h-56 space-y-2 overflow-y-auto pr-1">
        {events.map((event) => (
          <div key={event.event_id} className="flex gap-2 text-[11px] text-slate-300">
            <span className="shrink-0 font-mono text-slate-500">{formatEventTime(event.timestamp)}</span>
            <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${event.status === "completed" ? "bg-emerald-400" : "bg-[#38bdf8]"}`} />
            <span>{event.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function QAProgressPanel({ job }: { job: GenerationJobInfo }) {
  const qaEvents = (job.progress_events || []).filter((event) => event.agent_type === "visual_qa");
  const summary = job.qa_summary || [...qaEvents].reverse().find((event) => event.qa_summary)?.qa_summary;
  if (!qaEvents.length && !summary) return null;

  return (
    <div className="mt-3 rounded-2xl border border-emerald-500/20 bg-emerald-950/10 p-3.5">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-wider text-emerald-300">QA activity and automatic repairs</p>
        {summary && (
          <div className="flex flex-wrap gap-1.5 text-[10px] font-mono">
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-emerald-300">{summary.score}/100</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-slate-300">{summary.checkpoints_passed}/{summary.checkpoints_total} passed</span>
          </div>
        )}
      </div>
      <div className="mt-2 max-h-72 space-y-2.5 overflow-y-auto pr-1">
        {qaEvents.map((event) => (
          <div key={event.event_id} className="rounded-xl border border-white/[0.07] bg-black/10 px-3 py-2">
            <div className="flex items-start gap-2">
              {event.status === "completed" ? (
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
              ) : (
                <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-[#38bdf8]" />
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-mono uppercase text-[#38bdf8]">{event.phase || event.status}</span>
                  {event.pass_number && <span className="text-[10px] text-slate-500">QA pass {event.pass_number}</span>}
                  <span className="ml-auto text-[10px] font-mono text-slate-500">{formatEventTime(event.timestamp)}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-slate-200">{event.message}</p>
                {event.phase === "results" && event.qa_summary && event.qa_summary.findings.length > 0 && (
                  <div className="mt-2 space-y-1 border-t border-white/[0.07] pt-2">
                    {event.qa_summary.findings.map((finding, index) => (
                      <div key={`${event.event_id}-${finding.checkpoint_id}-${finding.slide_number}-${index}`} className="flex gap-2 text-[10px] leading-relaxed text-slate-400">
                        <span className={`shrink-0 font-mono ${finding.severity === "CRITICAL" || finding.severity === "HIGH" ? "text-red-300" : finding.severity === "MEDIUM" ? "text-amber-300" : "text-slate-400"}`}>
                          {finding.checkpoint_id}
                        </span>
                        <span>Slide {finding.slide_number}: {finding.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


interface ThinkingStepCardProps {
  job: GenerationJobInfo;
  deckVersion?: number;
  onCancel?: () => void;
  onDownload?: () => void;
  isDownloading?: boolean;
}

export function ThinkingStepCard({
  job,
  deckVersion = 1,
  onCancel,
  onDownload,
  isDownloading = false,
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
      : Math.min(99, Math.round(job.progress_percent ?? ((completedCount / STAGE_KEYS.length) * 100)) || 5);

  const activeStageKey = currentRunningTask?.agent_type || STAGE_KEYS[Math.min(completedCount, 7)];
  const activeMeta = STAGE_METADATA[activeStageKey] || {
    label: "Processing Stage",
    desc: "Orchestrating multi-agent workflow...",
    agent: "AgentOrchestrator",
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

  // 1. Completed State - In modern Claude/ChatGPT style, completion is seamlessly presented in the message timeline with the file artifact card
  if (job.status === "completed") {
    return null;
  }

  // 2. Cancelled State
  if (job.status === "cancelled") {
    return (
      <div className="my-3 rounded-2xl border border-amber-500/30 bg-[#16120d]/80 p-3.5 text-xs text-amber-300 flex items-center justify-between shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-2.5">
          <XCircle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Generation was cancelled.</span>
        </div>
      </div>
    );
  }

  // 3. Failed State
  if (job.status === "permanently_failed") {
    return (
      <div className="my-3 rounded-2xl border border-red-500/30 bg-[#1e0e12]/80 p-4 text-xs text-red-300 shadow-xl backdrop-blur-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
              <XCircle className="h-4 w-4" />
            </div>
            <div>
              <span className="font-semibold text-white">Generation stopped</span>
              <p className="text-slate-400 text-xs mt-0.5">The agent encountered an issue. You can refine your prompt or retry.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 4. Running / Queued State (Claude & ChatGPT Style Conversational Reasoning Block)
  return (
    <div className="my-3 overflow-hidden rounded-3xl border border-[#0086FF]/30 bg-gradient-to-br from-[#0c1424]/95 via-[#080e1a]/95 to-[#050a14]/95 p-4 sm:p-5 shadow-2xl backdrop-blur-xl animate-fadeIn">
      {/* Top Status Header */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#0086FF]/20 text-[#38bdf8] border border-[#0086FF]/40 shadow-md shadow-[#0086FF]/20">
            <ActiveIcon className="h-4 w-4 animate-pulse text-[#38bdf8]" />
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0086FF]"></span>
            </span>
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs sm:text-sm font-semibold text-white tracking-tight">
                {activeMeta.label || "Building Presentation"}
              </span>
              <span className="rounded-full bg-[#0086FF]/15 px-2 py-0.5 text-[10px] font-mono text-[#38bdf8] border border-[#0086FF]/30 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {formatTimer(elapsedSeconds)}
              </span>
            </div>
            <p className="text-[11px] text-slate-400 truncate mt-0.5">
              {job.live_message || activeMeta.desc}
            </p>
          </div>
        </div>

        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1 rounded-full border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 text-[11px] font-medium text-red-300 hover:text-white transition-all cursor-pointer shrink-0"
            title="Cancel generation"
          >
            <XCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Cancel</span>
          </button>
        )}
      </div>

      {/* Modern Slim Progress Bar */}
      <div className="mt-3.5">
        <div className="flex justify-between items-center text-[10px] font-mono text-slate-400 mb-1.5">
          <span className="flex items-center gap-1.5 text-[#38bdf8]">
            <Sparkles className="h-3 w-3" />
            <span>Agent Stage {Math.min(completedCount + 1, 8)} of 8</span>
          </span>
          <span className="font-semibold text-slate-300">{percent}%</span>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-800/80">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-emerald-400 transition-all duration-500 ease-out"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Stage Dots progression */}
      <div className="mt-3 flex items-center justify-between gap-1 border-t border-white/5 pt-3">
        {STAGE_KEYS.map((key, idx) => {
          const isDone = idx < completedCount;
          const isCurrent = idx === completedCount;
          const meta = STAGE_METADATA[key];
          return (
            <div
              key={key}
              className="flex flex-col items-center flex-1"
              title={`${meta.agent}: ${meta.label}`}
            >
              <div
                className={`h-1.5 w-full rounded-full transition-all ${
                  isDone
                    ? "bg-emerald-400"
                    : isCurrent
                    ? "bg-[#38bdf8] animate-pulse"
                    : "bg-white/10"
                }`}
              />
            </div>
          );
        })}
      </div>

      {/* Expandable Reasoning / Activity Stream */}
      {(job.progress_events?.length || job.qa_summary) && (
        <div className="mt-3 border-t border-white/5 pt-2.5">
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between text-[11px] text-slate-400 hover:text-[#38bdf8] transition-colors py-1 cursor-pointer"
          >
            <span className="flex items-center gap-1.5">
              <span>Reasoning steps & agent stream ({job.progress_events?.length || 0})</span>
            </span>
            {expanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
          </button>
          {expanded && (
            <div className="mt-2 space-y-2 rounded-2xl bg-[#080d18] p-3.5 border border-white/10">
              {STAGE_KEYS.map((key, idx) => {
                const taskInfo = job.tasks.find((t) => t.agent_type === key);
                const meta = STAGE_METADATA[key];
                const isCompleted = taskInfo?.status === "completed";
                const isRunning = taskInfo?.status === "running";
                const stageMsg = isRunning
                  ? (taskInfo?.live_message || (job.live_agent === key ? job.live_message : null))
                  : null;

                return (
                  <div
                    key={key}
                    className={`flex flex-col rounded-xl px-3 py-2 text-xs transition-colors ${
                      isRunning
                        ? "bg-[#0086FF]/20 text-white font-medium border border-[#0086FF]/40 shadow-sm shadow-[#0086FF]/10"
                        : isCompleted
                        ? "text-slate-300 bg-white/[0.02]"
                        : "text-slate-400 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-slate-400 w-3">
                          {idx + 1}.
                        </span>
                        <span>{meta.label}</span>
                        <span className="rounded-full bg-white/5 px-2 py-0.5 text-[9px] font-mono text-[#38bdf8] border border-white/10 hidden sm:inline">
                          {meta.agent}
                        </span>
                      </div>

                      <div>
                        {isCompleted && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
                        )}
                        {isRunning && (
                          <Loader2 className="h-3.5 w-3.5 text-[#38bdf8] animate-spin" />
                        )}
                        {!isCompleted && !isRunning && (
                          <span className="text-[10px] text-slate-500">pending</span>
                        )}
                      </div>
                    </div>
                    {stageMsg && (
                      <div className="mt-1 pl-5 text-[11px] font-mono text-[#38bdf8] flex items-center gap-1.5 animate-pulse">
                        <span>↳</span>
                        <span className="truncate">{stageMsg}</span>
                      </div>
                    )}
                  </div>
                );
              })}
              <ProgressTimeline events={job.progress_events || []} />
              <QAProgressPanel job={job} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
