"use client";

import { useState, useEffect } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

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
  const [expanded, setExpanded] = useState<boolean>(defaultExpanded);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  useEffect(() => {
    if (!isStreaming) return;
    const start = Date.now();
    const interval = setInterval(() => {
      setElapsedSeconds(Math.max(1, Math.floor((Date.now() - start) / 1000)));
    }, 1000);
    return () => clearInterval(interval);
  }, [isStreaming]);

  // Keep collapsed by default once done like Claude, open if streaming
  useEffect(() => {
    if (isStreaming) {
      setExpanded(true);
    } else {
      setExpanded(false);
    }
  }, [isStreaming]);

  const cleanThinking = thinkingText.trim();
  if (!cleanThinking && !isStreaming) return null;

  // Approximate duration display
  const durationLabel = isStreaming
    ? `Thinking (${elapsedSeconds}s)...`
    : elapsedSeconds > 0
    ? `Thought for ${elapsedSeconds} seconds`
    : `Thought for a few seconds`;

  return (
    <div className="mb-2.5 select-none">
      {/* Claude-style Dropdown Trigger */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="group inline-flex items-center gap-1.5 py-1 text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
        title={expanded ? "Hide thought process" : "Show thought process"}
      >
        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 transition-transform" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 text-slate-500 group-hover:text-slate-300 transition-transform" />
        )}
        <span className="italic tracking-tight text-[11px] sm:text-xs text-slate-400 group-hover:text-slate-200">
          {durationLabel}
        </span>
        {isStreaming && (
          <span className="flex h-1.5 w-1.5 relative ml-0.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#0086FF]"></span>
          </span>
        )}
      </button>

      {/* Claude-style Expanded Thought Drawer */}
      {expanded && (
        <div className="my-1.5 border-l-2 border-slate-700/60 pl-3.5 py-1 text-xs text-slate-400 leading-relaxed font-sans whitespace-pre-wrap animate-in fade-in slide-in-from-top-1 duration-200">
          {cleanThinking || (
            <span className="italic text-slate-500">Deconstructing prompt requirements...</span>
          )}
        </div>
      )}
    </div>
  );
}
