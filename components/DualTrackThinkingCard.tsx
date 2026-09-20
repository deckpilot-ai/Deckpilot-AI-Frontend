"use client";

import { useState, useEffect } from "react";
import { Brain, ChevronDown, ChevronUp, Cpu, Sparkles, CheckCircle2 } from "lucide-react";

interface DualTrackThinkingCardProps {
  thinkingText: string;
  isStreaming?: boolean;
  defaultExpanded?: boolean;
}

export function DualTrackThinkingCard({
  thinkingText,
  isStreaming = false,
  defaultExpanded = false,
}: DualTrackThinkingCardProps) {
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded || isStreaming);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!isStreaming) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.max(1, Math.floor((Date.now() - start) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Keep expanded while streaming
  useEffect(() => {
    if (isStreaming) {
      setExpanded(true);
    }
  }, [isStreaming]);

  const cleanThinking = thinkingText.trim();
  if (!cleanThinking && !isStreaming) return null;

  // Approximate word / token count for cognitive budget indicator
  const wordCount = cleanThinking ? cleanThinking.split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className="my-2.5 overflow-hidden rounded-2xl border border-[#0086FF]/25 bg-gradient-to-br from-[#0c1424]/95 via-[#080d18]/95 to-[#060a12]/95 p-3 sm:p-3.5 shadow-xl backdrop-blur-xl transition-all">
      {/* Header Bar */}
      <div className="flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0 flex-1">
          <div className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#0086FF]/15 text-[#38bdf8] border border-[#0086FF]/30 shadow-md shadow-[#0086FF]/20">
            {isStreaming ? (
              <>
                <Brain className="h-3.5 w-3.5 animate-pulse text-[#38bdf8]" />
                <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
              </>
            ) : (
              <Brain className="h-3.5 w-3.5 text-[#38bdf8]" />
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-white tracking-tight flex items-center gap-1.5">
                <span>{isStreaming ? "Thinking..." : "Thought Process"}</span>
                {elapsedSeconds > 0 && isStreaming && (
                  <span className="text-slate-400 font-normal text-[11px]">({elapsedSeconds}s)</span>
                )}
              </span>

              <span className="rounded-full bg-[#0086FF]/15 px-2 py-0.5 text-[9px] font-mono text-[#38bdf8] border border-[#0086FF]/30 flex items-center gap-1">
                <Cpu className="h-2.5 w-2.5" />
                <span>{isStreaming ? `${wordCount} words` : `${wordCount} cognitive tokens`}</span>
              </span>

              {!isStreaming && (
                <span className="rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-mono text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="h-2.5 w-2.5" />
                  <span>CoT Verified</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Toggle */}
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          className="flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] font-medium text-slate-300 hover:text-white transition-all cursor-pointer shadow-sm"
          title={expanded ? "Collapse thought process" : "Expand thought process"}
        >
          <span>{expanded ? "Hide Reasoning" : "Inspect Reasoning"}</span>
          {expanded ? (
            <ChevronUp className="h-3.5 w-3.5 text-slate-400" />
          ) : (
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          )}
        </button>
      </div>

      {/* Expandable Reasoning Monologue Area */}
      {expanded && (
        <div className="mt-3 border-t border-white/10 pt-2.5">
          <div className="max-h-64 overflow-y-auto rounded-xl bg-[#040810]/95 p-3 border border-white/5 font-mono text-[11px] leading-relaxed text-slate-300 shadow-inner whitespace-pre-wrap select-text">
            {cleanThinking || (
              <span className="text-slate-500 italic animate-pulse flex items-center gap-1.5">
                <Sparkles className="h-3 w-3 text-[#38bdf8]" />
                Calibrating task complexity and mapping internal monologue...
              </span>
            )}
            {isStreaming && (
              <span className="inline-block w-1.5 h-3 ml-1 bg-[#38bdf8] animate-pulse align-middle" />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
