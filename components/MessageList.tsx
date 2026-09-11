"use client";

import { useEffect, useRef, useState, ChangeEvent } from "react";
import { Message, GenerationJobInfo, DecisionQuestion, DeckPlanSpec, Attachment } from "@/lib/api";
import {
  Sparkles,
  User,
  Presentation,
  Clock,
  ArrowUpRight,
  HelpCircle,
  Compass,
  Zap,
  Pencil,
  X,
  Paperclip,
  FileText,
  Check,
  Loader2,
  Download,
} from "lucide-react";
import { ThinkingStepCard } from "./ThinkingStepCard";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MessageListProps {
  messages: Message[];
  loading?: boolean;
  submissionStatus?: string;
  currentJob?: GenerationJobInfo | null;
  projectId?: string | null;
  deckVersion?: number;
  decisionQuestions?: DecisionQuestion[] | null;
  planSpec?: DeckPlanSpec | null;
  onCancelJob?: () => void;
  onDownloadDeck?: (version?: number) => void;
  isDownloading?: boolean;
  onSelectSuggestion?: (text: string) => void;
  onSelectDecision?: (questionId: string, option: string) => void;
  onApprovePlan?: () => void;
  onEditMessage?: (
    messageId: string,
    content: string,
    removedAttachmentIds: string[],
    newFiles: File[]
  ) => Promise<void>;
}

function parseDeckReadyTag(content: string): { cleanContent: string; deckInfo: { version: number; title: string; slides: number } | null } {
  const match = content.match(/\[DECK_READY:version=(\d+):title=([^:\]]+):slides=(\d+)\]/);
  if (match) {
    const version = parseInt(match[1], 10);
    const title = match[2].trim();
    const slides = parseInt(match[3], 10);
    const cleanContent = content.replace(/\[DECK_READY:version=\d+:title=[^:\]]+:slides=\d+\]\n*/g, "").trim();
    return {
      cleanContent,
      deckInfo: { version, title, slides },
    };
  }

  // Fallback pattern match for completion messages
  const legacyMatch = content.match(/I have (?:created|updated) your presentation \*\*"([^"]+)"\*\*(?:\s*\(Version\s*(\d+)\))?\s*with\s*(\d+)\s*executive widescreen slides/i);
  if (legacyMatch) {
    const title = legacyMatch[1].trim();
    const version = legacyMatch[2] ? parseInt(legacyMatch[2], 10) : 1;
    const slides = parseInt(legacyMatch[3], 10);
    return {
      cleanContent: content,
      deckInfo: { version, title, slides },
    };
  }

  return { cleanContent: content, deckInfo: null };
}

function formatFileSize(bytes: number): string {
  if (!bytes || bytes <= 0) return "0 KB";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(fileName: string, mimeType?: string) {
  const ext = fileName.split(".").pop()?.toLowerCase();
  if (ext === "pdf" || mimeType === "application/pdf") {
    return <FileText className="h-3.5 w-3.5 text-rose-300 shrink-0" />;
  }
  if (
    ["png", "jpg", "jpeg", "webp", "gif", "svg"].includes(ext || "") ||
    mimeType?.startsWith("image/")
  ) {
    return <FileText className="h-3.5 w-3.5 text-emerald-300 shrink-0" />;
  }
  if (
    ["xlsx", "xls", "csv"].includes(ext || "") ||
    mimeType?.includes("spreadsheet") ||
    mimeType?.includes("csv")
  ) {
    return <FileText className="h-3.5 w-3.5 text-teal-300 shrink-0" />;
  }
  if (["pptx", "ppt"].includes(ext || "") || mimeType?.includes("presentation")) {
    return <Presentation className="h-3.5 w-3.5 text-amber-300 shrink-0" />;
  }
  return <FileText className="h-3.5 w-3.5 text-sky-300 shrink-0" />;
}



const SUGGESTIONS = [
  {
    title: "💼 Seed Pitch Deck",
    prompt: "Build a 10-slide Seed round pitch deck emphasizing our 45% MoM traction and expansion into enterprise SaaS.",
    badge: "Startup",
  },
  {
    title: "📊 Executive QBR",
    prompt: "Create an executive quarterly business review highlighting revenue milestones, customer retention, and roadmap.",
    badge: "Executive",
  },
  {
    title: "🚀 Product Launch",
    prompt: "Draft an engaging product launch keynote presentation covering the problem, solution, architecture, and go-to-market.",
    badge: "Keynote",
  },
  {
    title: "🎯 Strategy Review",
    prompt: "Generate an annual strategic planning deck with SWOT analysis, KPI benchmarks, and resource allocation models.",
    badge: "Corporate",
  },
];


function FormattedMessage({ content }: { content: string }) {
  return (
    <div className="prose prose-invert min-w-0 [overflow-wrap:anywhere] max-w-none text-slate-200 leading-relaxed text-xs sm:text-sm">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => (
            <h1 className="text-base font-bold text-white mt-3 mb-1.5">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-sm sm:text-base font-bold text-white mt-3 mb-1.5 flex items-center gap-1.5">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xs sm:text-sm font-semibold text-white mt-2 mb-1">
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-2 leading-relaxed text-slate-300 last:mb-0">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-white">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-slate-300">{children}</em>
          ),
          hr: () => <hr className="my-3 border-white/10" />,
          ul: ({ children }) => (
            <ul className="my-1.5 ml-4 space-y-1 list-disc marker:text-[#0086FF]">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-1.5 ml-4 space-y-1 list-decimal marker:text-[#38bdf8]">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="pl-1 text-slate-300 leading-relaxed">{children}</li>
          ),
          pre: ({ children }) => <pre className="max-w-full overflow-x-auto whitespace-pre p-3">{children}</pre>,
          table: ({ children }) => (
            <div className="my-3 overflow-x-auto rounded-xl border border-white/10 bg-[#070b14]/90 shadow-md">
              <table className="w-full text-left text-xs border-collapse">{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="border-b border-white/10 bg-white/5 text-slate-200 font-semibold">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-white/5">{children}</tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-white/[0.02] transition-colors">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 text-slate-200 font-semibold">{children}</th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 text-slate-300 align-top leading-normal">{children}</td>
          ),
          code: ({ children }) => (
            <code className="rounded bg-white/10 px-1.5 py-0.5 text-xs text-[#38bdf8] font-mono">
              {children}
            </code>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

export function MessageList({
  messages,
  loading = false,
  submissionStatus = "Processing your request...",
  currentJob = null,
  projectId = null,
  deckVersion = 1,
  decisionQuestions = null,
  planSpec = null,
  onCancelJob,
  onDownloadDeck,
  isDownloading = false,
  onSelectSuggestion,
  onSelectDecision,
  onApprovePlan,
  onEditMessage,
}: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  const [editingMessageId, setEditingMessageId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [activeAttachments, setActiveAttachments] = useState<Attachment[]>([]);
  const [removedAttachmentIds, setRemovedAttachmentIds] = useState<string[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [isSavingEdit, setIsSavingEdit] = useState<boolean>(false);
  const editFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, currentJob, loading]);

  const startEditing = (msg: Message) => {
    setEditingMessageId(msg.id);
    setEditContent(msg.content);
    setActiveAttachments([...(msg.attachments || [])]);
    setRemovedAttachmentIds([]);
    setNewFiles([]);
  };

  const cancelEditing = () => {
    setEditingMessageId(null);
    setEditContent("");
    setActiveAttachments([]);
    setRemovedAttachmentIds([]);
    setNewFiles([]);
    setIsSavingEdit(false);
  };

  const handleRemoveExistingAttachment = (attId: string) => {
    setActiveAttachments((prev) => prev.filter((a) => a.id !== attId));
    setRemovedAttachmentIds((prev) => [...prev, attId]);
  };

  const handleRemoveNewFile = (idx: number) => {
    setNewFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleEditFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewFiles((prev) => [...prev, ...Array.from(e.target.files!)]);
    }
  };

  const handleSaveEdit = async (messageId: string) => {
    if (!onEditMessage) return;
    setIsSavingEdit(true);
    try {
      await onEditMessage(messageId, editContent, removedAttachmentIds, newFiles);
      setEditingMessageId(null);
    } catch (err) {
      console.error("Failed to save edit", err);
    } finally {
      setIsSavingEdit(false);
    }
  };

  if (messages.length === 0 && !loading && !currentJob) {
    return (
      <div className="flex min-h-0 w-full flex-1 flex-col items-center overflow-y-auto p-4 sm:p-8 text-center max-w-2xl mx-auto">
        <div className="flex h-12 w-12 shrink-0 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0086FF]/10 border border-[#0086FF]/30 text-[#0086FF] mb-5 shadow-xl shadow-[#0086FF]/15">
          <Presentation className="h-8 w-8 text-[#0086FF]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2 tracking-tight">
          From Prompt to Presentation.
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mb-8 max-w-md leading-relaxed">
          Ask deckpilotAI to build a presentation from scratch or attach spreadsheets, PDFs, and notes to generate boardroom-ready slides.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full text-left">
          {SUGGESTIONS.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectSuggestion && onSelectSuggestion(item.prompt)}
              className="group p-4 rounded-2xl border border-white/10 bg-[#0c1222]/80 hover:bg-[#111a30] hover:border-[#0086FF]/50 text-xs text-slate-300 transition-all cursor-pointer shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white group-hover:text-[#38bdf8] transition-colors">
                    {item.title}
                  </span>
                  <span className="rounded-full bg-[#0086FF]/10 px-2 py-0.5 text-[9px] font-medium text-[#38bdf8] border border-[#0086FF]/20">
                    {item.badge}
                  </span>
                </div>
                <p className="text-slate-400 line-clamp-2 text-[11px] leading-relaxed">
                  &quot;{item.prompt}&quot;
                </p>
              </div>
              <div className="mt-3 flex items-center justify-end text-[10px] text-[#0086FF] font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                <span>Use prompt</span>
                <ArrowUpRight className="h-3 w-3 ml-0.5" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const lastMessage = messages.length > 0 ? messages[messages.length - 1] : null;
  const showSuggestionChips =
    !currentJob &&
    !loading &&
    lastMessage &&
    lastMessage.role === "assistant" &&
    (lastMessage.content.toLowerCase().includes("would you like to build") ||
      lastMessage.content.toLowerCase().includes("presentation") ||
      lastMessage.content.toLowerCase().includes("create"));

  return (
    <div className="min-h-0 min-w-0 flex-1 overflow-y-auto px-3 sm:px-4 py-4 sm:py-6 space-y-6 max-w-4xl mx-auto w-full">
      {messages.map((msg) => {
        const isUser = msg.role === "user";
        const isEditingThis = editingMessageId === msg.id;

        return (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
          >
            {/* Avatar */}
            <div
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                isUser
                  ? "bg-slate-700 text-slate-200"
                  : "bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] text-white shadow-md shadow-[#0086FF]/30"
              }`}
            >
              {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4" />}
            </div>

            {/* Bubble */}
            <div
              className={`flex min-w-0 flex-col [overflow-wrap:anywhere] max-w-[calc(100%-2.75rem)] sm:max-w-[80%] rounded-3xl px-4 py-3 text-sm shadow-md ${
                isUser
                  ? "bg-[#0086FF] text-white rounded-tr-none"
                  : "border border-white/10 bg-[#0c1222] text-slate-200 rounded-tl-none"
              } ${isEditingThis ? "w-full max-w-full sm:max-w-[90%]" : ""}`}
            >
              {isUser && isEditingThis ? (
                /* Inline Message Editor */
                <div className="w-full space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={3}
                    className="w-full resize-none rounded-2xl border border-white/20 bg-[#080e1b] p-3 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:border-[#38bdf8] focus:outline-none focus:ring-1 focus:ring-[#38bdf8]"
                    placeholder="Edit your prompt..."
                    autoFocus
                  />

                  {/* Attached files chips with individual remove [×] button */}
                  {(activeAttachments.length > 0 || newFiles.length > 0) && (
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-medium text-blue-100">Attached references:</div>
                      <div className="flex flex-wrap gap-2">
                        {activeAttachments.map((att) => (
                          <div
                            key={att.id}
                            className="flex items-center gap-1.5 rounded-xl border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-white shadow-sm"
                          >
                            {getFileIcon(att.file_name, att.mime_type)}
                            <span className="max-w-[150px] truncate font-medium">{att.file_name}</span>
                            <span className="text-[10px] text-blue-100/80">({formatFileSize(att.byte_size)})</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExistingAttachment(att.id)}
                              className="ml-1 rounded p-0.5 text-blue-200 hover:text-red-300 hover:bg-white/10 transition-colors cursor-pointer"
                              title="Remove attachment"
                              aria-label={`Remove ${att.file_name}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}

                        {newFiles.map((file, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1.5 rounded-xl border border-sky-400/30 bg-sky-500/20 px-2.5 py-1 text-xs text-sky-100 shadow-sm"
                          >
                            <FileText className="h-3.5 w-3.5 text-sky-300 shrink-0" />
                            <span className="max-w-[150px] truncate font-medium">{file.name}</span>
                            <span className="text-[10px] text-sky-200">({formatFileSize(file.size)})</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveNewFile(idx)}
                              className="ml-1 rounded p-0.5 text-sky-200 hover:text-red-300 hover:bg-white/10 transition-colors cursor-pointer"
                              title="Remove new file"
                              aria-label={`Remove ${file.name}`}
                            >
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions inside edit mode */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-white/15">
                    <div>
                      <input
                        type="file"
                        ref={editFileInputRef}
                        onChange={handleEditFileSelect}
                        multiple
                        accept=".pdf,.pptx,.docx,.xlsx,.png,.jpg,.jpeg,.txt,.md,.csv"
                        className="hidden"
                      />
                      <button
                        type="button"
                        onClick={() => editFileInputRef.current?.click()}
                        className="flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-2.5 py-1 text-xs text-blue-100 hover:bg-white/20 hover:text-white transition-all cursor-pointer"
                      >
                        <Paperclip className="h-3 w-3 text-sky-300" />
                        <span>Add reference</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={cancelEditing}
                        disabled={isSavingEdit}
                        className="rounded-full px-3 py-1 text-xs font-medium text-blue-100 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveEdit(msg.id)}
                        disabled={isSavingEdit || (!editContent.trim() && activeAttachments.length === 0 && newFiles.length === 0)}
                        className="flex items-center gap-1.5 rounded-full bg-white text-[#0086FF] hover:bg-slate-100 px-3.5 py-1 text-xs font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
                      >
                        {isSavingEdit ? (
                          <>
                            <span className="h-3 w-3 border-2 border-[#0086FF]/30 border-t-[#0086FF] rounded-full animate-spin" />
                            <span>Saving...</span>
                          </>
                        ) : (
                          <>
                            <Check className="h-3.5 w-3.5" />
                            <span>Save & Submit</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Normal Message Content View */
                <>
                  {/* Attached references display on sent user messages */}
                  {isUser && msg.attachments && msg.attachments.length > 0 && (
                    <div className="mb-2.5 flex flex-wrap gap-2">
                      {msg.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 px-3 py-1.5 text-xs text-white transition-all shadow-sm"
                          title={att.file_name}
                        >
                          {getFileIcon(att.file_name, att.mime_type)}
                          <div className="flex flex-col min-w-0">
                            <span className="font-medium truncate max-w-[180px] sm:max-w-[220px]">
                              {att.file_name}
                            </span>
                            <span className="text-[10px] text-blue-100/80">
                              {formatFileSize(att.byte_size)}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {(() => {
                    const { cleanContent, deckInfo } = !isUser
                      ? parseDeckReadyTag(msg.content)
                      : { cleanContent: msg.content, deckInfo: null };

                    return (
                      <>
                        <div className="text-xs sm:text-sm">
                          {isUser ? (
                            <div className="whitespace-pre-wrap leading-relaxed">{msg.content}</div>
                          ) : (
                            <FormattedMessage content={cleanContent} />
                          )}
                        </div>

                        {deckInfo && (
                          <div className="mt-3.5 p-3 rounded-2xl bg-gradient-to-r from-[#0c1a30] via-[#0d2244] to-[#0c1424] border border-[#0086FF]/40 shadow-lg flex flex-wrap items-center justify-between gap-3">
                            <div className="flex items-center gap-2.5 min-w-0">
                              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#0086FF]/20 text-[#38bdf8] border border-[#0086FF]/30">
                                <FileText className="h-5 w-5" />
                              </div>
                              <div className="min-w-0">
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-semibold text-white truncate max-w-[200px] sm:max-w-[280px]">
                                    {deckInfo.title}
                                  </span>
                                  <span className="rounded-full bg-[#0086FF]/25 px-2 py-0.5 text-[10px] font-mono text-[#38bdf8] border border-[#0086FF]/40 font-semibold shrink-0">
                                    v{deckInfo.version}
                                  </span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-mono">
                                  {deckInfo.slides} slides • 16:9 Widescreen (.pptx)
                                </span>
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => onDownloadDeck && onDownloadDeck(deckInfo.version)}
                              disabled={isDownloading}
                              className="flex items-center gap-1.5 rounded-full bg-[#0086FF] hover:bg-[#0070d6] px-3.5 py-1.5 text-xs font-semibold text-white shadow-md shadow-[#0086FF]/30 transition-all hover:scale-105 active:scale-95 cursor-pointer disabled:opacity-50 shrink-0"
                            >
                              <Download className="h-3.5 w-3.5" />
                              <span>Download .PPTX (v{deckInfo.version})</span>
                            </button>
                          </div>
                        )}
                      </>
                    );
                  })()}

                  <div
                    className={`mt-2 flex items-center justify-between gap-2 border-t ${
                      isUser ? "border-white/10" : "border-white/5"
                    } pt-1.5 text-[10px]`}
                  >
                    {isUser && onEditMessage && !loading && (
                      <button
                        type="button"
                        onClick={() => startEditing(msg)}
                        className="flex items-center gap-1 rounded-md px-1.5 py-0.5 text-blue-100 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                        title="Edit message and manage attachments"
                      >
                        <Pencil className="h-3 w-3" />
                        <span>Edit</span>
                      </button>
                    )}
                    <div
                      className={`flex items-center gap-1 ${
                        isUser ? "text-blue-100 ml-auto" : "text-slate-500 ml-auto"
                      }`}
                    >
                      <Clock className="h-3 w-3" />
                      <span>
                        {new Date(msg.created_at * 1000).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        );
      })}


      {/* Interactive Quick Deck Suggestion Chips */}
      {showSuggestionChips && (
        <div className="pt-1 sm:pl-11">
          <div className="text-[11px] text-slate-400 font-medium mb-2 flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-[#38bdf8]" />
            <span>Click to start a deck or describe your own:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() =>
                onSelectSuggestion &&
                onSelectSuggestion(
                  "Build a 10-slide Seed round pitch deck emphasizing our 45% MoM traction and expansion into enterprise SaaS."
                )
              }
              className="rounded-full border border-white/10 bg-[#0c1222]/80 hover:bg-[#111a30] hover:border-[#0086FF]/60 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm group"
            >
              <span className="font-semibold text-[#38bdf8]">💼 Pitch Deck</span>
              <span className="text-slate-400 group-hover:text-slate-300">(10 Slides)</span>
            </button>
            <button
              onClick={() =>
                onSelectSuggestion &&
                onSelectSuggestion(
                  "Create an executive quarterly business review (QBR) highlighting revenue milestones, customer retention, and roadmap."
                )
              }
              className="rounded-full border border-white/10 bg-[#0c1222]/80 hover:bg-[#111a30] hover:border-[#0086FF]/60 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm group"
            >
              <span className="font-semibold text-emerald-400">📊 Executive QBR</span>
              <span className="text-slate-400 group-hover:text-slate-300">(Milestones & KPIs)</span>
            </button>
            <button
              onClick={() =>
                onSelectSuggestion &&
                onSelectSuggestion(
                  "Draft an engaging product launch presentation covering the problem, solution, architecture, and go-to-market."
                )
              }
              className="rounded-full border border-white/10 bg-[#0c1222]/80 hover:bg-[#111a30] hover:border-[#0086FF]/60 px-3.5 py-1.5 text-xs text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 shadow-sm group"
            >
              <span className="font-semibold text-purple-400">🚀 Product Launch</span>
              <span className="text-slate-400 group-hover:text-slate-300">(Keynote)</span>
            </button>
          </div>
        </div>
      )}

      {/* Interactive Plan Mode Review Card */}
      {planSpec && !currentJob && (
        <div className="pt-2 sm:pl-11">
          <div className="p-5 rounded-3xl border border-emerald-500/30 bg-[#0c1a24]/90 backdrop-blur-xl max-w-2xl shadow-2xl">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-3 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-md shadow-emerald-500/10">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white tracking-tight">
                    {planSpec.deckTitle || "Presentation Architecture"}
                  </h3>
                  <span className="text-[10px] text-emerald-400 font-mono">
                    {planSpec.slides?.length || planSpec.totalSlides || 5} Planned Slides • Minto Narrative Arc
                  </span>
                </div>
              </div>
              <button
                onClick={onApprovePlan}
                className="flex items-center gap-1.5 rounded-full bg-emerald-500 hover:bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/30 transition-all cursor-pointer hover:scale-105"
              >
                <Zap className="h-3.5 w-3.5" />
                <span>Approve & Build (.pptx)</span>
              </button>
            </div>

            {planSpec.objective && (
              <p className="text-xs text-slate-300 mb-3 italic">
                &quot;{planSpec.objective}&quot;
              </p>
            )}

            {planSpec.slides && planSpec.slides.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {planSpec.slides.map((s, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-white/5 border border-white/5 text-xs hover:border-emerald-500/30 transition-colors"
                  >
                    <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-400 shrink-0 font-semibold">
                      S{idx + 1}
                    </span>
                    <div className="min-w-0 flex-1 [overflow-wrap:anywhere]">
                      <span className="font-semibold text-white">{s.purpose}</span>
                      {s.headline && (
                        <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                          {s.headline}
                        </p>
                      )}
                    </div>
                    {s.layoutHint && (
                      <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[9px] text-slate-400 font-mono shrink-0">
                        {s.layoutHint}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Decision Questions */}
      {decisionQuestions && decisionQuestions.length > 0 && !currentJob && (
        <div className="pt-2 sm:pl-11 space-y-3">
          {decisionQuestions.map((dq) => (
            <div
              key={dq.id}
              className="p-4 rounded-2xl border border-[#0086FF]/30 bg-[#0c1424]/90 backdrop-blur-md max-w-lg shadow-lg"
            >
              <div className="text-xs font-semibold text-white mb-2.5 flex items-center gap-2">
                <HelpCircle className="h-4 w-4 text-[#38bdf8]" />
                <span>{dq.question}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {dq.options.map((opt, oIdx) => (
                  <button
                    key={oIdx}
                    type="button"
                    onClick={() => onSelectDecision && onSelectDecision(dq.id, opt)}
                    className="rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 hover:bg-[#0086FF]/25 hover:border-[#0086FF]/60 px-3.5 py-1.5 sm:py-1 text-xs text-[#38bdf8] hover:text-white active:scale-95 transition-all cursor-pointer shadow-sm flex items-center"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {currentJob && projectId && (
        <ThinkingStepCard
          job={currentJob}
          deckVersion={deckVersion}
          onCancel={onCancelJob}
          onDownload={onDownloadDeck}
        />
      )}

      {loading && !currentJob && (
        <div className="flex items-start gap-3 animate-fadeIn">
          {/* Avatar */}
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] text-white shadow-lg shadow-[#0086FF]/30">
            <Sparkles className="h-4 w-4 animate-spin" />
          </div>

          {/* Thinking / Status Card */}
          <div className="flex min-w-0 flex-col max-w-[calc(100%-2.75rem)] sm:max-w-[80%] rounded-3xl rounded-tl-none border border-[#0086FF]/30 bg-[#0c1424]/90 px-4 py-3 shadow-xl shadow-[#0086FF]/5 backdrop-blur-md">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#38bdf8] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0086FF]"></span>
              </span>
              <span className="text-xs font-semibold text-white tracking-tight">Copilot is thinking...</span>
              <div className="ml-auto flex items-center gap-1">
                <span className="h-1 w-1 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:-0.3s]" />
                <span className="h-1 w-1 rounded-full bg-[#38bdf8] animate-bounce [animation-delay:-0.15s]" />
                <span className="h-1 w-1 rounded-full bg-[#38bdf8] animate-bounce" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <Loader2 className="h-3.5 w-3.5 animate-spin text-[#38bdf8] shrink-0" />
              <span className="truncate">{submissionStatus}</span>
            </div>
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
}
