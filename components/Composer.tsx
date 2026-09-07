"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Send, Paperclip, Sparkles, X, FileText, Compass, Zap, BookOpen } from "lucide-react";

export type ComposerMode = "autopilot" | "plan" | "ask";

interface ComposerProps {
  onSend: (content: string, files?: File[], mode?: ComposerMode) => void;
  disabled?: boolean;
  placeholder?: string;
  prompt: string;
  onPromptChange: (value: string) => void;
  activeMode?: ComposerMode;
  onModeChange?: (mode: ComposerMode) => void;
}

const MODE_CONFIGS = {
  autopilot: {
    label: "Autopilot",
    icon: Zap,
    color: "text-blue-400",
    bgActive: "bg-[#0086FF]/20 border-[#0086FF]/60 text-white shadow-lg shadow-[#0086FF]/20",
    btnText: "Generate",
    placeholder: "Describe the presentation to build end-to-end (e.g. 'Build a 10-slide pitch deck for our seed round...')...",
  },
  plan: {
    label: "Plan",
    icon: Compass,
    color: "text-emerald-400",
    bgActive: "bg-emerald-500/20 border-emerald-500/60 text-white shadow-lg shadow-emerald-500/20",
    btnText: "Plan Deck",
    placeholder: "Describe the presentation to structure; Copilot will design the narrative arc and slide outline for your review...",
  },
  ask: {
    label: "Ask",
    icon: BookOpen,
    color: "text-purple-400",
    bgActive: "bg-purple-500/20 border-purple-500/60 text-white shadow-lg shadow-purple-500/20",
    btnText: "Ask",
    placeholder: "Ask research questions, explore market data, or seek strategic storytelling advice without generating slides...",
  },
};

export function Composer({
  onSend,
  disabled = false,
  placeholder,
  prompt,
  onPromptChange,
  activeMode = "autopilot",
  onModeChange,
}: ComposerProps) {
  const [files, setFiles] = useState<File[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSelectMode = (newMode: ComposerMode) => {
    onModeChange?.(newMode);
  };

  const handleSend = () => {
    const trimmed = prompt.trim();
    if (!trimmed && files.length === 0) return;
    if (disabled) return;

    onSend(trimmed, files, activeMode);
    onPromptChange("");
    setFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const activeConfig = MODE_CONFIGS[activeMode];
  const dynamicPlaceholder = placeholder || activeConfig.placeholder;

  return (
    <div className="w-full min-w-0 max-w-4xl mx-auto px-2.5 pt-2 pb-1.5 sm:px-4 sm:pt-3 sm:pb-3">
      {/* File attachments preview chips */}
      {files.length > 0 && (
        <div className="mb-2.5 flex max-h-24 overflow-y-auto flex-wrap gap-2">
          {files.map((file, idx) => (
            <div
              key={idx}
              className="flex min-w-0 max-w-full items-center gap-1.5 rounded-full border border-white/10 bg-[#0c1424] px-3 py-1 text-xs text-slate-300 shadow-sm"
            >
              <FileText className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span className="max-w-[150px] truncate">{file.name}</span>
              <span className="text-[10px] text-slate-500">
                ({(file.size / 1024).toFixed(0)} KB)
              </span>
              <button
                type="button"
                onClick={() => removeFile(idx)}
                aria-label={`Remove ${file.name}`}
                className="ml-1 text-slate-500 hover:text-red-400 cursor-pointer"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Main Composer Box */}
      <div className="relative rounded-3xl border border-white/10 bg-[#0c1222]/90 shadow-2xl backdrop-blur-xl transition-all duration-200 focus-within:border-[#0086FF] focus-within:ring-2 focus-within:ring-[#0086FF]/35 focus-within:shadow-[0_0_24px_rgba(0,134,255,0.22)]">
        <textarea
          aria-label="Presentation request"
          ref={textareaRef}
          value={prompt}
          onChange={(e) => {
            onPromptChange(e.target.value);
            e.target.style.height = "auto";
            e.target.style.height = `${Math.min(e.target.scrollHeight, 200)}px`;
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={dynamicPlaceholder}
          rows={2}
          className="w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-base sm:text-sm text-slate-100 placeholder-slate-500 border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 ring-0 shadow-none min-h-[50px] sm:min-h-[68px]"
          style={{ outline: "none", boxShadow: "none" }}
        />

        {/* Action bar inside composer */}
        <div className="flex flex-wrap items-center justify-between gap-2 px-3 pb-3 pt-0.5">
          {/* Left Actions: 3-Mode Selector & File Attachment */}
          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap min-w-0">
            {/* 3 Modes Switcher */}
            <div className="flex items-center rounded-full border border-white/10 bg-[#080d18]/80 p-0.5">
              {(["autopilot", "plan", "ask"] as ComposerMode[]).map((m) => {
                const cfg = MODE_CONFIGS[m];
                const Icon = cfg.icon;
                const isActive = activeMode === m;
                return (
                  <button
                    key={m}
                    type="button"
                    onClick={() => handleSelectMode(m)}
                    aria-pressed={isActive}
                    className={`flex items-center gap-1 sm:gap-1.5 rounded-full px-2 sm:px-3 py-1.5 sm:py-2 text-[10px] sm:text-[11px] font-medium transition-all cursor-pointer ${
                      isActive
                        ? cfg.bgActive
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/5 border border-transparent"
                    }`}
                  >
                    <Icon className={`h-3 w-3 ${isActive ? "text-white" : cfg.color}`} />
                    <span>{cfg.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Reference Upload */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              multiple
              accept=".pdf,.pptx,.docx,.xlsx,.png,.jpg,.jpeg,.txt,.md,.csv"
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              title="Attach references (PDF, PPTX, DOCX, XLSX, images)"
              aria-label="Attach reference files"
              className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 sm:px-3 py-1.5 text-xs text-slate-300 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
            >
              <Paperclip className="h-3.5 w-3.5 text-[#38bdf8]" />
              <span className="hidden sm:inline">Add references</span>
            </button>
          </div>

          {/* Right Actions: Send Button */}
          <div className="flex items-center gap-2 shrink-0 ml-auto">
            <span className="hidden text-[11px] text-slate-500 xl:inline font-mono">
              Enter ↵
            </span>
            <button
              type="button"
              onClick={handleSend}
              disabled={disabled || (!prompt.trim() && files.length === 0)}
              className="flex items-center gap-1.5 rounded-full bg-[#0086FF] px-4 sm:px-5 py-2 text-xs font-semibold text-white shadow-md shadow-[#0086FF]/30 hover:bg-[#0075ED] active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>{activeConfig.btnText}</span>
              <Send className="h-3 w-3 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
