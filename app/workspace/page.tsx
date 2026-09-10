"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api, ApiError, Project, Message, GenerationJobInfo, GenerationProgressEvent, DecisionQuestion, DeckPlanSpec, Attachment } from "@/lib/api";
import { Sidebar } from "@/components/Sidebar";
import { Composer, ComposerMode } from "@/components/Composer";
import { MessageList } from "@/components/MessageList";
import { Loader2, Download, Menu, X } from "lucide-react";

function deriveInitialProjectTitle(content: string, files?: File[]): string {
  if (files && files.length > 0 && files[0]?.name) {
    const cleanName = files[0].name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ").trim();
    if (cleanName.length > 1) {
      return cleanName.length > 40 ? cleanName.slice(0, 40) : cleanName;
    }
  }

  const trimmed = (content || "").trim();
  if (!trimmed) return "New Presentation";

  // Check if conversational, a question, or too brief to be a presentation topic
  const words = trimmed.split(/\s+/).filter(Boolean);

  // If question or interrogative inquiry
  if (trimmed.endsWith("?") || /^(who|what|where|when|why|how|can\s+you|could\s+you|is\s+there|help)\b/i.test(trimmed)) {
    return "New Presentation";
  }

  // If very brief without presentation keywords
  const hasDeckKw = /(presentation|deck|slide|pitch|powerpoint|keynote|roadmap|brief|strategy|report)/i.test(trimmed);
  if (words.length < 3 && !hasDeckKw) {
    return "New Presentation";
  }

  // Clean prompt for title: strip common leading command phrases like "create a deck for", "make a presentation on"
  const cleaned = trimmed
    .replace(/^(please\s+)?(create|make|build|generate|design|draft)\s+(a\s+)?(new\s+)?(presentation|deck|slides|pitch\s*deck)?(\s+(about|on|for))?\s*/i, "")
    .replace(/^(about|on|for)\s+/i, "")
    .trim();

  const candidate = cleaned || trimmed;
  if (candidate.length > 45) {
    return candidate.slice(0, 45).trim() + "...";
  }
  return candidate.charAt(0).toUpperCase() + candidate.slice(1);
}

export default function WorkspacePage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const params = useParams();
  const routeSessionId = (params?.sessionId as string) || null;

  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(routeSessionId);
  const activeProjectId = selectedProjectId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState("Processing your request...");
  const [currentJob, setCurrentJob] = useState<GenerationJobInfo | null>(null);
  const [composerPrompt, setComposerPrompt] = useState("");
  const [activeMode, setActiveMode] = useState<ComposerMode>("autopilot");
  const [decisionQuestions, setDecisionQuestions] = useState<DecisionQuestion[] | null>(null);
  const [planSpec, setPlanSpec] = useState<DeckPlanSpec | null>(null);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);
  const [workspaceErrorId, setWorkspaceErrorId] = useState<string | null>(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Per-session fast cache (in-memory + sessionStorage) for instant 0ms conversation load
  const messageCacheRef = useRef<Record<string, Message[]>>({});
  const activeProjectIdRef = useRef<string | null>(activeProjectId);
  const fetchCounterRef = useRef(0);
  const submittingProjectIdRef = useRef<string | null>(null);

  const getCachedMessages = useCallback((projectId: string): Message[] | null => {
    if (messageCacheRef.current[projectId] && messageCacheRef.current[projectId].length > 0) {
      return messageCacheRef.current[projectId];
    }
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        const raw = window.sessionStorage.getItem(`dp_msgs_${projectId}`);
        if (raw) {
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            messageCacheRef.current[projectId] = parsed;
            return parsed;
          }
        }
      }
    } catch {}
    return null;
  }, []);

  const saveCachedMessages = useCallback((projectId: string, msgs: Message[]) => {
    messageCacheRef.current[projectId] = msgs;
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.setItem(`dp_msgs_${projectId}`, JSON.stringify(msgs.slice(-100)));
      }
    } catch {}
  }, []);

  const clearCachedMessages = useCallback((projectId: string) => {
    delete messageCacheRef.current[projectId];
    try {
      if (typeof window !== "undefined" && window.sessionStorage) {
        window.sessionStorage.removeItem(`dp_msgs_${projectId}`);
      }
    } catch {}
  }, []);

  const mergeMessagesWithPending = useCallback((incoming: Message[], current: Message[]): Message[] => {
    const pendingOptimistic = current.filter((m) => m.id.startsWith("temp-"));
    if (pendingOptimistic.length === 0) {
      return incoming;
    }
    const incomingIds = new Set(incoming.map((m) => m.id));
    const stillPending = pendingOptimistic.filter((m) => !incomingIds.has(m.id));
    return [...incoming, ...stillPending];
  }, []);

  useEffect(() => {
    activeProjectIdRef.current = activeProjectId;
  }, [activeProjectId]);

  // Synchronize routeSessionId on initial page mount or hard URL navigation
  const [prevRouteSessionId, setPrevRouteSessionId] = useState(routeSessionId);
  if (routeSessionId !== prevRouteSessionId) {
    setPrevRouteSessionId(routeSessionId);
    if (routeSessionId) {
      setSelectedProjectId(routeSessionId);
    }
  }

  // Handle browser Back / Forward buttons without full-page reload
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const match = pathname.match(/^\/workspace\/([^/?#]+)/);
      const sessionIdFromUrl = match ? match[1] : null;
      setSelectedProjectId(sessionIdFromUrl);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    if (!mobileSidebarOpen) return;
    const navigation = document.getElementById("workspace-navigation");
    const previousFocus = document.activeElement as HTMLElement | null;
    const focusable = () => Array.from(navigation?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled])'
    ) ?? []);
    focusable()[0]?.focus();
    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (window.matchMedia("(min-width: 1024px)").matches) return;
      if (event.key === "Escape") setMobileSidebarOpen(false);
      if (event.key === "Tab") {
        const items = focusable();
        const first = items[0];
        const last = items.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); first?.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocus?.focus();
    };
  }, [mobileSidebarOpen]);

  const pollTimerRef = useRef<NodeJS.Timeout | null>(null);
  const pollGenerationRef = useRef(0);
  const wsRef = useRef<WebSocket | null>(null);
  const sendingRef = useRef(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      router.replace("/login");
    }
  }, [user, authLoading, router]);

  // Load user projects once on mount or when projects update
  const loadProjects = useCallback(async () => {
    try {
      const projs = await api.listProjects();
      setProjects(projs);
    } catch {
      // Ignore initial load error
    }
  }, []);

  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    api.listProjects()
      .then((items) => {
        if (!cancelled) setProjects(items);
      })
      .catch(() => {
        if (!cancelled) setWorkspaceError("Projects could not be loaded. Please retry.");
      });
    return () => {
      cancelled = true;
    };
  }, [user]);

  // Cleanup polling timer on unmount or project switch
  const stopPolling = useCallback(() => {
    pollGenerationRef.current += 1;
    if (pollTimerRef.current) {
      clearTimeout(pollTimerRef.current);
      pollTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => stopPolling();
  }, [stopPolling]);

  // Poll active job status with session isolation
  const startPollingJob = useCallback(
    (jobId: string, projectId: string) => {
      stopPolling();
      const pollGeneration = pollGenerationRef.current;
      let consecutiveFailures = 0;

      const poll = async () => {
        if (pollGenerationRef.current !== pollGeneration) return;
        try {
          const freshJob = await api.getJob(jobId);
          if (pollGenerationRef.current !== pollGeneration) return;
          consecutiveFailures = 0;

          if (activeProjectIdRef.current === projectId) {
            setCurrentJob((prev) => ({
              ...freshJob,
              live_message: freshJob.live_message || (prev?.id === freshJob.id ? prev.live_message : undefined),
              live_agent: freshJob.live_agent || (prev?.id === freshJob.id ? prev.live_agent : undefined),
              progress_events: freshJob.progress_events?.length
                ? freshJob.progress_events
                : (prev?.id === freshJob.id ? prev.progress_events : []),
              qa_summary: freshJob.qa_summary || (prev?.id === freshJob.id ? prev.qa_summary : null),
            }));
          }

          if (freshJob.status === "completed") {
            stopPolling();
            sendingRef.current = false;
            setSendingMessage(false);

            // Fetch authoritative messages for the target project and cache them
            api.listMessages(projectId).then((msgs) => {
              saveCachedMessages(projectId, msgs);
              if (activeProjectIdRef.current === projectId) {
                setMessages((prev) => mergeMessagesWithPending(msgs, prev));
              }
            }).catch(() => {});

            // Update deck version in local state without full reload
            setProjects((prev) =>
              prev.map((p) =>
                p.id === projectId
                  ? { ...p, current_deck_version: (p.current_deck_version || 0) + 1 }
                  : p
              )
            );
            void loadProjects();
            return;
          } else if (
            freshJob.status === "permanently_failed" ||
            freshJob.status === "cancelled"
          ) {
            stopPolling();
            sendingRef.current = false;
            setSendingMessage(false);
            if (activeProjectIdRef.current === projectId) {
              setWorkspaceError(null);
            }
            return;
          }
        } catch (pollErr) {
          consecutiveFailures += 1;
          // In production with large PDF extraction or long jobs, temporary network hiccups should not abort polling
          if (consecutiveFailures >= 120) {
            stopPolling();
            sendingRef.current = false;
            setSendingMessage(false);
            if (activeProjectIdRef.current === projectId) {
              setCurrentJob((prev) => (prev ? { ...prev, status: "permanently_failed" } : null));
              setWorkspaceError(null);
            }
            return;
          }
        }

        if (pollGenerationRef.current === pollGeneration) {
          const delay = consecutiveFailures > 2 ? 2500 : 1500;
          pollTimerRef.current = setTimeout(poll, delay);
        }
      };

      pollTimerRef.current = setTimeout(poll, 1500);
    },
    [stopPolling, loadProjects]
  );

  // Load messages and check active job whenever active project changes
  const loadProjectData = useCallback(
    async (projectId: string) => {
      // If a message is actively being submitted for this project, DO NOT interfere
      if (
        submittingProjectIdRef.current &&
        (submittingProjectIdRef.current === projectId || submittingProjectIdRef.current === "new-project")
      ) {
        return;
      }

      stopPolling();
      setDecisionQuestions(null);
      setPlanSpec(null);

      // 1. Immediately display cached messages with 0ms delay (zero blanking)
      const cached = getCachedMessages(projectId);
      if (cached && cached.length > 0) {
        setMessages((prev) => mergeMessagesWithPending(cached, prev));
        setLoadingMessages(false);
      } else {
        setMessages([]);
        setLoadingMessages(true);
      }

      const reqId = ++fetchCounterRef.current;

      try {
        const [msgs, activeRes] = await Promise.all([
          api.listMessages(projectId),
          api.getActiveJob(projectId).catch(() => null),
        ]);

        // Always store authoritative messages into cache
        saveCachedMessages(projectId, msgs);

        // If the user has switched sessions while fetching, avoid overwriting visible UI
        if (fetchCounterRef.current !== reqId || activeProjectIdRef.current !== projectId) {
          return;
        }

        // If a submission started while fetching was in progress, don't clobber it
        if (
          submittingProjectIdRef.current &&
          (submittingProjectIdRef.current === projectId || submittingProjectIdRef.current === "new-project")
        ) {
          return;
        }

        setMessages((prev) => mergeMessagesWithPending(msgs, prev));
        setWorkspaceError(null);

        // Check if there is an active or latest job for this project
        if (activeRes && activeRes.job) {
          if (
            activeRes.job.status === "queued" ||
            activeRes.job.status === "running"
          ) {
            setCurrentJob(activeRes.job);
            setSendingMessage(true);
            sendingRef.current = true;
            startPollingJob(activeRes.job.id, projectId);
          } else if (activeRes.job.status === "completed") {
            const lastMsg = msgs.length > 0 ? msgs[msgs.length - 1] : null;
            const completedAt = activeRes.job.completed_at || 0;
            if (!lastMsg || lastMsg.created_at <= completedAt + 5) {
              setCurrentJob(activeRes.job);
            } else {
              setCurrentJob(null);
            }
            setSendingMessage(false);
            sendingRef.current = false;
          } else if (activeRes.job.status === "permanently_failed") {
            // Keep the failed job status visible in ThinkingStepCard so user knows it failed and can retry
            setCurrentJob(activeRes.job);
            setSendingMessage(false);
            sendingRef.current = false;
          } else {
            setCurrentJob(null);
            setSendingMessage(false);
            sendingRef.current = false;
          }
        } else {
          setCurrentJob(null);
          setSendingMessage(false);
          sendingRef.current = false;
        }
      } catch (err) {
        console.error("Failed to load session messages", err);
        if (fetchCounterRef.current === reqId && activeProjectIdRef.current === projectId) {
          if (!messageCacheRef.current[projectId]?.length) {
            setWorkspaceError("This presentation could not be loaded. Please retry.");
          }
        }
      } finally {
        if (fetchCounterRef.current === reqId && activeProjectIdRef.current === projectId) {
          setLoadingMessages(false);
        }
      }
    },
    [stopPolling, startPollingJob]
  );

  // Real-time WebSocket connection for live step streaming
  useEffect(() => {
    if (!activeProjectId) {
      if (wsRef.current) {
        wsRef.current.close();
        wsRef.current = null;
      }
      return;
    }

    const currentWsProjectId = activeProjectId;
    let socket: WebSocket | null = null;
    try {
      const wsUrl = api.getWebSocketUrl(currentWsProjectId);
      socket = new WebSocket(wsUrl);
      wsRef.current = socket;

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === "attachment_progress") {
            if (activeProjectIdRef.current === currentWsProjectId) {
              setCurrentJob((prev) => {
                if (!prev) return prev;
                return { ...prev, live_message: data.message, live_agent: "reference_intake" };
              });
            }
          } else if (data.type === "agent_task" && data.agent_type !== "job_completed") {
            if (activeProjectIdRef.current === currentWsProjectId) {
              setCurrentJob((prev) => {
                if (!prev) return prev;
                if (data.job_id && prev.id && prev.id !== data.job_id) return prev;
                const tasks = [...prev.tasks];
                const idx = tasks.findIndex((t) => t.agent_type === data.agent_type);
                const now = Math.floor(Date.now() / 1000);
                if (idx >= 0) {
                  tasks[idx] = {
                    ...tasks[idx],
                    status: data.status,
                    completed_at: data.status === "completed" ? now : tasks[idx].completed_at,
                  };
                } else {
                  tasks.push({
                    id: `task-${data.agent_type}`,
                    agent_type: data.agent_type,
                    status: data.status,
                    started_at: now,
                    completed_at: data.status === "completed" ? now : null,
                  });
                }
                const incomingEvent: GenerationProgressEvent | null = data.event_id ? {
                  event_id: data.event_id,
                  sequence: data.sequence || Date.now(),
                  timestamp: data.timestamp || Math.floor(Date.now() / 1000),
                  agent_type: data.agent_type,
                  status: data.status,
                  message: data.message,
                  current_step: data.current_step || prev.current_step || 1,
                  total_steps: data.total_steps || prev.total_steps || 8,
                  progress_percent: data.progress_percent ?? prev.progress_percent ?? 5,
                  phase: data.phase,
                  pass_number: data.pass_number,
                  repair_iteration: data.repair_iteration,
                  qa_summary: data.qa_summary,
                } : null;
                const progressEvents = [...(prev.progress_events || [])];
                if (incomingEvent && !progressEvents.some((item) => item.event_id === incomingEvent.event_id)) {
                  progressEvents.push(incomingEvent);
                  progressEvents.sort((a, b) => a.sequence - b.sequence);
                }
                return {
                  ...prev,
                  tasks,
                  live_message: data.message,
                  live_agent: data.agent_type,
                  current_step: data.current_step || prev.current_step,
                  total_steps: data.total_steps || prev.total_steps,
                  progress_percent: data.progress_percent ?? prev.progress_percent,
                  progress_events: progressEvents,
                  qa_summary: data.qa_summary || prev.qa_summary,
                };
              });
            }
          } else if (data.type === "job_completed" || data.agent_type === "job_completed") {
            if (activeProjectIdRef.current === currentWsProjectId) {
              setSendingMessage(false);
              sendingRef.current = false;
            }
            api.listMessages(currentWsProjectId).then((msgs) => {
              saveCachedMessages(currentWsProjectId, msgs);
              if (activeProjectIdRef.current === currentWsProjectId) {
                setMessages((prev) => mergeMessagesWithPending(msgs, prev));
              }
            }).catch(() => {});
            void loadProjects();
          } else if (data.type === "error") {
            // Backend broadcast an error with optional error_id
            if (activeProjectIdRef.current === currentWsProjectId) {
              setSendingMessage(false);
              sendingRef.current = false;
              setWorkspaceError(data.message || "An error occurred during generation.");
              if (data.error_id) setWorkspaceErrorId(data.error_id);
            }
          }
        } catch {
          // Ignore parse errors
        }
      };
    } catch (err) {
      console.warn("WebSocket init notice, falling back to HTTP polling", err);
    }

    return () => {
      if (socket) {
        socket.close();
      }
      wsRef.current = null;
    };
  }, [activeProjectId, stopPolling, loadProjects]);

  useEffect(() => {
    if (activeProjectId) {
      void loadProjectData(activeProjectId);
    } else {
      stopPolling();
    }
  }, [activeProjectId, loadProjectData, stopPolling]);

  // Smooth in-place project selection without unmounting layout or reloading session list
  const handleSelectProject = (id: string) => {
    setMobileSidebarOpen(false);
    if (id === activeProjectId) {
      void loadProjectData(id);
      return;
    }
    window.history.pushState(null, "", `/workspace/${id}`);
    setSelectedProjectId(id);
  };

  // Smooth draft switch without unmounting layout or reloading session list
  const handleNewProject = () => {
    stopPolling();
    sendingRef.current = false;
    submittingProjectIdRef.current = null;
    setMessages([]);
    setCurrentJob(null);
    setSendingMessage(false);
    setComposerPrompt("");
    setWorkspaceError(null);
    setMobileSidebarOpen(false);
    setDecisionQuestions(null);
    setPlanSpec(null);
    window.history.pushState(null, "", "/workspace");
    setSelectedProjectId(null);
  };

  // Delete project
  const handleDeleteProject = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const projectTitle = projects.find((project) => project.id === id)?.title || "this presentation";
    if (!window.confirm(`Delete "${projectTitle}" and all of its files? This cannot be undone.`)) {
      return;
    }
    try {
      await api.deleteProject(id);
      clearCachedMessages(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      if (activeProjectId === id) {
        window.history.pushState(null, "", "/workspace");
        setSelectedProjectId(null);
        setMessages([]);
        setCurrentJob(null);
      }
    } catch (err) {
      console.error("Failed to delete project", err);
      setWorkspaceError(err instanceof Error ? err.message : "The presentation could not be deleted.");
    }
  };

  // Cancel running job
  const handleCancelJob = async () => {
    if (!currentJob) return;
    try {
      await api.cancelJob(currentJob.id);
      setCurrentJob((prev) => (prev ? { ...prev, status: "cancelled" } : null));
      setSendingMessage(false);
      sendingRef.current = false;
      stopPolling();
    } catch (err) {
      console.error("Failed to cancel job", err);
      setWorkspaceError(err instanceof Error ? err.message : "The generation job could not be cancelled.");
    }
  };

  // Download PPTX
  const handleDownloadDeck = async () => {
    if (!activeProjectId || isDownloading) return;
    const activeProj = projects.find((p) => p.id === activeProjectId);
    const version = activeProj?.current_deck_version || 1;
    setIsDownloading(true);
    try {
      await api.downloadDeck(activeProjectId, version, activeProj?.title);
    } catch (err) {
      console.error("Failed to download presentation", err);
      setWorkspaceError(err instanceof Error ? err.message : "Failed to download presentation.");
    } finally {
      setIsDownloading(false);
    }
  };

  // Send message & trigger background generation
  const handleSendMessage = async (
    content: string,
    files?: File[],
    mode: ComposerMode = activeMode
  ) => {
    if (sendingRef.current) return;
    sendingRef.current = true;
    setSendingMessage(true);
    setWorkspaceError(null);
    const effectiveContent = content.trim() || "Create a presentation using the attached reference files.";
    let targetProjectId = activeProjectId;
    submittingProjectIdRef.current = targetProjectId || "new-project";

    // 0. INSTANT OPTIMISTIC REFLECTION (0ms): Render user's message & file chips immediately
    const tempMsgId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const initialOptimisticAttachments: Attachment[] = (files || []).map((file, idx) => ({
      id: `temp-att-${Date.now()}-${idx}`,
      project_id: targetProjectId || "pending-project",
      user_id: user?.id || "",
      message_id: tempMsgId,
      file_name: file.name,
      byte_size: file.size,
      mime_type: file.type || "application/octet-stream",
      storage_key: "",
      sha256: "",
      status: "uploading",
      ownership_flag: "user_upload",
      created_at: Math.floor(Date.now() / 1000),
    }));

    const tempUserMsg: Message = {
      id: tempMsgId,
      project_id: targetProjectId || "pending-project",
      user_id: user?.id || null,
      role: "user",
      content: effectiveContent,
      created_at: Math.floor(Date.now() / 1000),
      attachments: initialOptimisticAttachments,
    };

    setMessages((prev) => {
      const next = [...prev, tempUserMsg];
      if (targetProjectId) {
        saveCachedMessages(targetProjectId, next);
      }
      return next;
    });

    setDecisionQuestions(null);
    setPlanSpec(null);

    // Initial status for immediate visual feedback
    if (!targetProjectId) {
      setSubmissionStatus("Initializing workspace...");
    } else if (files && files.length > 0) {
      setSubmissionStatus(`Uploading and extracting ${files[0].name}...`);
    } else {
      setSubmissionStatus("Processing your message...");
    }

    if (!targetProjectId) {
      try {
        const title = deriveInitialProjectTitle(effectiveContent, files);
        const newProj = await api.createProject({ title });
        submittingProjectIdRef.current = newProj.id;
        targetProjectId = newProj.id;
        activeProjectIdRef.current = newProj.id;

        // Associate tempUserMsg with new project ID in state and cache
        tempUserMsg.project_id = newProj.id;
        saveCachedMessages(newProj.id, [tempUserMsg]);
        setMessages((prev) =>
          prev.map((m) => (m.id === tempMsgId ? { ...m, project_id: newProj.id } : m))
        );

        setProjects((prev) => [newProj, ...prev]);
        setSelectedProjectId(newProj.id);
        // Update URL to /workspace/:sessionId so page refresh maintains active session
        window.history.replaceState(null, "", `/workspace/${newProj.id}`);
      } catch (err) {
        console.error("Failed to create project on message", err);
        setWorkspaceError("A new presentation could not be created. Please retry.");
        sendingRef.current = false;
        setSendingMessage(false);
        submittingProjectIdRef.current = null;
        return;
      }
    }

    let uploadedAttachmentCount = 0;
    const uploadedAttachments: Attachment[] = [];
    const uploadedAttachmentIds: string[] = [];

    try {
      // 1. Upload any attached reference files
      if (files && files.length > 0) {
        for (const file of files) {
          try {
            setSubmissionStatus(`Uploading ${file.name}...`);
            const att = await api.uploadAttachment(targetProjectId, file);
            uploadedAttachmentCount += 1;
            let currentAtt = att;

            // In Plan or Ask mode, we need extracted text immediately for interactive chat reasoning.
            // In Autopilot (deck generation) mode, the background job orchestrator's reference_intake
            // stage handles extraction asynchronously with live WebSocket updates without hitting client timeouts!
            if (mode !== "autopilot") {
              try {
                const readyAtt = await api.waitForAttachmentReady(targetProjectId, att, {
                  timeoutMs: 30000,
                  onPoll: (polled) => {
                    if (polled.status === "extracting") {
                      setSubmissionStatus(`Extracting text and images from ${file.name}...`);
                    }
                  },
                });
                currentAtt = readyAtt;
              } catch (waitErr) {
                console.warn("Continuing with background extraction for conversation", waitErr);
              }
            }

            uploadedAttachments.push(currentAtt);
            uploadedAttachmentIds.push(currentAtt.id);

            // Update user message with real attachment details in UI as each completes
            setMessages((prev) =>
              prev.map((m) =>
                m.id === tempMsgId
                  ? {
                      ...m,
                      attachments: [
                        ...uploadedAttachments,
                        ...initialOptimisticAttachments.slice(uploadedAttachments.length),
                      ],
                    }
                  : m
              )
            );
          } catch (uploadErr) {
            console.error("Failed to upload attachment", uploadErr);
            const reason =
              uploadErr instanceof Error && uploadErr.message ? uploadErr.message : "";
            throw new Error(
              `Could not upload ${file.name}. ${reason || "Please retry."}`
            );
          }
        }
      }

      if (!content.trim() && uploadedAttachmentCount === 0) {
        throw new Error("No attachment could be uploaded. Add a message or choose another file.");
      }

      // 2. Route through Copilot chat with active mode (autopilot, plan, ask) and attachment IDs
      if (uploadedAttachmentCount > 0) {
        setSubmissionStatus("Analyzing reference materials with Copilot...");
      } else {
        setSubmissionStatus("Consulting Copilot...");
      }
      const chatRes = await api.sendChatMessage(
        targetProjectId,
        effectiveContent,
        uploadedAttachmentCount > 0,
        mode,
        uploadedAttachmentIds
      );

      // 3. Persist real user message and assistant message
      setMessages((prev) => {
        const withoutTemp = prev.map((m) => {
          if (m.id === tempMsgId) {
            const respAttachments = chatRes.user_message?.attachments;
            const finalAttachments =
              respAttachments && respAttachments.length > 0
                ? respAttachments
                : (uploadedAttachments && uploadedAttachments.length > 0
                  ? uploadedAttachments
                  : (m.attachments || []));
            return {
              ...chatRes.user_message,
              attachments: finalAttachments,
            };
          }
          return m;
        });
        let next = withoutTemp;
        if (chatRes.assistant_message) {
          const alreadyInList = withoutTemp.some(
            (m) => m.id === chatRes.assistant_message?.id
          );
          if (!alreadyInList) {
            next = [...withoutTemp, chatRes.assistant_message];
          }
        }
        if (targetProjectId) {
          saveCachedMessages(targetProjectId, next);
        }
        return next;
      });

      // Update interactive plan spec or decision questions
      if (chatRes.plan_spec) {
        setPlanSpec(chatRes.plan_spec);
      }
      if (chatRes.decision_questions) {
        setDecisionQuestions(chatRes.decision_questions);
      }

      // If plan spec gave a real deck title, update workspace project title if currently generic
      if (chatRes.plan_spec?.deckTitle && targetProjectId) {
        const planTitle = chatRes.plan_spec.deckTitle;
        const currentProject = projects.find((p) => p.id === targetProjectId);
        if (!currentProject || currentProject.title === "New Presentation" || currentProject.title === "Untitled Presentation") {
          api.updateProject(targetProjectId, { title: planTitle }).then((updated) => {
            setProjects((prev) => prev.map((p) => (p.id === targetProjectId ? { ...p, title: updated.title } : p)));
          }).catch(() => {});
        }
      }

      // 4. If mode is ask, plan, or conversational -> DO NOT trigger generation pipeline
      if (!chatRes.should_generate) {
        setCurrentJob(null);
        setSendingMessage(false);
        sendingRef.current = false;
        submittingProjectIdRef.current = null;
        void loadProjects();
        return;
      }

      // If generating and current title is generic, derive a title from the generation prompt
      if (targetProjectId) {
        const currentProject = projects.find((p) => p.id === targetProjectId);
        if (!currentProject || currentProject.title === "New Presentation" || currentProject.title === "Untitled Presentation") {
          const derivedTitle = deriveInitialProjectTitle(effectiveContent, files);
          if (derivedTitle && derivedTitle !== "New Presentation") {
            api.updateProject(targetProjectId, { title: derivedTitle }).then((updated) => {
              setProjects((prev) => prev.map((p) => (p.id === targetProjectId ? { ...p, title: updated.title } : p)));
            }).catch(() => {});
          }
        }
      }

      // 5. Autopilot Presentation Intent -> Trigger asynchronous background generation job
      setSubmissionStatus("Designing presentation flow & structure...");
      const jobRes = await api.startJob(targetProjectId, {
        prompt: effectiveContent,
        mode: "generate",
        background: true,
        idempotencyKey: crypto.randomUUID(),
      });

      // 6. Initialize job state and begin real-time polling
      const initialJob: GenerationJobInfo = {
        id: jobRes.job_id,
        project_id: targetProjectId,
        status: "queued",
        mode: jobRes.mode,
        started_at: Math.floor(Date.now() / 1000),
        completed_at: null,
        tasks: [],
      };
      setCurrentJob(initialJob);
      submittingProjectIdRef.current = null;
      startPollingJob(jobRes.job_id, targetProjectId);
    } catch (err) {
      console.error("Failed to process message", err);
      // Preserve the user message in the chat history; DO NOT wipe it
      setWorkspaceError(err instanceof Error ? err.message : "The message could not be processed. Please retry.");
      setSendingMessage(false);
      sendingRef.current = false;
      submittingProjectIdRef.current = null;
    }
  };

  const handleEditMessage = async (
    messageId: string,
    newContent: string,
    removedAttachmentIds: string[],
    newFiles: File[]
  ) => {
    if (!activeProjectId || sendingRef.current) return;
    submittingProjectIdRef.current = activeProjectId;
    sendingRef.current = true;
    setSendingMessage(true);
    setWorkspaceError(null);

    // Optimistically update message content in visible messages immediately
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, content: newContent } : m))
    );

    try {
      // 1. Upload any new files
      const newAttachmentIds: string[] = [];
      if (newFiles && newFiles.length > 0) {
        for (const file of newFiles) {
          setSubmissionStatus(`Uploading ${file.name}...`);
          const att = await api.uploadAttachment(activeProjectId, file);
          newAttachmentIds.push(att.id);
          if (activeMode !== "autopilot") {
            try {
              await api.waitForAttachmentReady(activeProjectId, att, {
                timeoutMs: 30000,
                onPoll: (polled) => {
                  if (polled.status === "extracting") {
                    setSubmissionStatus(`Extracting text and images from ${file.name}...`);
                  }
                },
              });
            } catch (pollErr) {
              console.warn("Continuing with background extraction for edit", pollErr);
            }
          }
        }
      }

      setSubmissionStatus("Updating message and recalculating response...");
      const chatRes = await api.editChatMessage(activeProjectId, messageId, {
        content: newContent,
        removed_attachment_ids: removedAttachmentIds,
        new_attachment_ids: newAttachmentIds,
        mode: activeMode,
      });

      // 2. Truncate messages in state: replace target message with updated user_message, and remove everything after it
      setMessages((prev) => {
        const targetIndex = prev.findIndex((m) => m.id === messageId);
        if (targetIndex === -1) return prev;
        const prefix = prev.slice(0, targetIndex);
        const originalMsg = prev[targetIndex];
        const respAttachments = chatRes.user_message?.attachments;
        const preservedAttachments =
          respAttachments && respAttachments.length > 0
            ? respAttachments
            : (originalMsg.attachments || []);
        const nextList = [...prefix, { ...chatRes.user_message, attachments: preservedAttachments }];
        if (chatRes.assistant_message) {
          nextList.push(chatRes.assistant_message);
        }
        if (activeProjectId) {
          saveCachedMessages(activeProjectId, nextList);
        }
        return nextList;
      });

      // Update interactive plan spec or decision questions
      if (chatRes.plan_spec) {
        setPlanSpec(chatRes.plan_spec);
      } else {
        setPlanSpec(null);
      }
      if (chatRes.decision_questions) {
        setDecisionQuestions(chatRes.decision_questions);
      } else {
        setDecisionQuestions(null);
      }

      // 3. If mode is ask, plan, or conversational -> DO NOT trigger generation pipeline
      if (!chatRes.should_generate) {
        setCurrentJob(null);
        setSendingMessage(false);
        sendingRef.current = false;
        submittingProjectIdRef.current = null;
        void loadProjects();
        return;
      }

      // 4. Autopilot Presentation Intent -> Trigger asynchronous background generation job
      setSubmissionStatus("Starting updated presentation generation...");
      const jobRes = await api.startJob(activeProjectId, {
        prompt: newContent,
        mode: "generate",
        background: true,
        idempotencyKey: crypto.randomUUID(),
      });

      const initialJob: GenerationJobInfo = {
        id: jobRes.job_id,
        project_id: activeProjectId,
        status: "queued",
        mode: jobRes.mode,
        started_at: Math.floor(Date.now() / 1000),
        completed_at: null,
        tasks: [],
      };
      setCurrentJob(initialJob);
      submittingProjectIdRef.current = null;
      startPollingJob(jobRes.job_id, activeProjectId);
    } catch (err) {
      console.error("Failed to edit message", err);
      const errorMsg = err instanceof Error ? err.message : "The message could not be edited.";
      const errorId = err instanceof ApiError ? err.errorId ?? null : null;
      setWorkspaceError(errorMsg);
      if (errorId) setWorkspaceErrorId(errorId);
      setSendingMessage(false);
      sendingRef.current = false;
      submittingProjectIdRef.current = null;
    }
  };

  const handleApprovePlan = async () => {
    if (!activeProjectId || sendingRef.current) return;
    sendingRef.current = true;
    setWorkspaceError(null);
    setSendingMessage(true);
    try {
      const prompt = planSpec?.deckTitle
        ? `Create presentation based on approved plan: ${planSpec.deckTitle}`
        : "Generate approved presentation deck";
      const jobRes = await api.startJob(activeProjectId, {
        prompt,
        mode: "generate",
        background: true,
        idempotencyKey: crypto.randomUUID(),
      });
      setPlanSpec(null);
      setDecisionQuestions(null);
      const initialJob: GenerationJobInfo = {
        id: jobRes.job_id,
        project_id: activeProjectId,
        status: "queued",
        mode: jobRes.mode,
        started_at: Math.floor(Date.now() / 1000),
        completed_at: null,
        tasks: [],
      };
      setCurrentJob(initialJob);
      startPollingJob(jobRes.job_id, activeProjectId);
    } catch (err) {
      console.error("Failed to approve plan", err);
      setWorkspaceError(err instanceof Error ? err.message : "The plan could not be approved.");
      setSendingMessage(false);
      sendingRef.current = false;
    }
  };

  const handleSelectDecision = (questionIdOrOption: string, maybeOption?: string) => {
    setDecisionQuestions(null);
    const selected = maybeOption || questionIdOrOption;
    handleSendMessage(`Selected Option: ${selected}`);
  };

  if (authLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070a13]">
        <Loader2 className="h-8 w-8 animate-spin text-[#0086FF]" />
      </div>
    );
  }

  const activeProject = projects.find((p) => p.id === activeProjectId);

  return (
    <div className="workspace-shell fixed inset-0 flex h-full max-h-dvh w-full overflow-hidden bg-[#070a13]">
      {/* Sidebar */}
      {mobileSidebarOpen && (
        <button
          type="button"
          aria-label="Close navigation"
          className="fixed inset-0 z-30 bg-black/60 lg:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}
      <div
        id="workspace-navigation"
        className={`workspace-navigation fixed inset-y-0 left-0 z-40 transform transition-transform lg:static lg:translate-x-0 ${
          mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <Sidebar
          projects={projects}
          activeProjectId={activeProjectId}
          onSelectProject={handleSelectProject}
          onNewProject={handleNewProject}
          onDeleteProject={handleDeleteProject}
        />
        <button
          type="button"
          aria-label="Close navigation"
          onClick={() => setMobileSidebarOpen(false)}
          className="absolute right-3 top-4 rounded-lg p-1 text-slate-300 lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Main Chat Workspace */}
      <div className="flex min-w-0 flex-1 flex-col h-full overflow-hidden bg-[#070a13] bg-dot-grid relative">
        {/* Workspace Top Header */}
        <div className="flex min-h-14 shrink-0 items-center gap-2 justify-between border-b border-white/10 bg-[#080d18]/85 px-3 backdrop-blur-xl sm:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
            <button
              type="button"
              aria-label="Open navigation"
              aria-expanded={mobileSidebarOpen}
              aria-controls="workspace-navigation"
              onClick={() => setMobileSidebarOpen(true)}
              className="shrink-0 rounded-lg p-1 text-slate-300 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h1 className="truncate text-sm font-semibold text-white tracking-tight">
              {activeProject ? activeProject.title : "New Presentation"}
            </h1>
            {activeProject && (
              <span className="shrink-0 rounded-full bg-[#0086FF]/15 px-2.5 py-0.5 text-[10px] font-medium text-[#38bdf8] border border-[#0086FF]/30 font-mono">
                Deck v{activeProject.current_deck_version}
              </span>
            )}
            {activeProject && activeProject.current_deck_version > 0 && (
              <button
                onClick={handleDownloadDeck}
                disabled={isDownloading}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-medium transition-all ${
                  isDownloading
                    ? "bg-emerald-500/5 border-emerald-500/20 text-emerald-500/50 cursor-not-allowed"
                    : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border-emerald-500/30 cursor-pointer"
                }`}
                aria-label="Download current PowerPoint (.PPTX)"
                title="Download current PowerPoint (.PPTX)"
              >
                {isDownloading ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <Download className="h-3 w-3" />
                )}
                <span className="hidden sm:inline">
                  {isDownloading ? "Preparing…" : "Download .PPTX"}
                </span>
              </button>
            )}
            {!activeProject && (
              <span className="hidden sm:inline-flex shrink-0 rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400 border border-white/10 font-mono">
                Draft Session
              </span>
            )}

          </div>

          <div className="hidden items-center gap-3 text-xs text-slate-400 xl:flex shrink-0">
            <span className="text-emerald-400 flex items-center gap-1.5 font-mono text-[11px] rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              1M Context Active
            </span>
            <span className="text-slate-600">•</span>
            <div>
              <span>Plan: </span>
              <span className="text-[#38bdf8] font-medium capitalize">
                {user.role}
              </span>
            </div>
          </div>
        </div>

        {/* Conversation Area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          {workspaceError && (
            <div
              role="alert"
              className="mx-4 mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2 text-xs text-red-200 flex items-start gap-2"
            >
              <span className="flex-1">{workspaceError}</span>
              {workspaceErrorId && (
                <span className="shrink-0 flex items-center gap-1.5">
                  <span className="font-mono text-[10px] opacity-70">{workspaceErrorId}</span>
                  <button
                    type="button"
                    title="Copy Error ID"
                    onClick={() => navigator.clipboard.writeText(workspaceErrorId).catch(() => {})}
                    className="rounded border border-red-500/40 px-1.5 py-0.5 text-[10px] hover:bg-red-500/20 transition-colors"
                  >
                    Copy ID
                  </button>
                </span>
              )}
            </div>
          )}
          {loadingMessages ? (
            <div className="flex flex-1 items-center justify-center">
              <Loader2 className="h-6 w-6 animate-spin text-[#0086FF]" />
            </div>
          ) : (
            <MessageList
              messages={messages}
              loading={sendingMessage && !currentJob}
              submissionStatus={submissionStatus}
              currentJob={currentJob}
              projectId={activeProjectId}
              deckVersion={activeProject?.current_deck_version || 1}
              decisionQuestions={decisionQuestions}
              planSpec={planSpec}
              onCancelJob={handleCancelJob}
              onDownloadDeck={handleDownloadDeck}
              isDownloading={isDownloading}
              onSelectSuggestion={(prompt) => setComposerPrompt(prompt)}
              onSelectDecision={handleSelectDecision}
              onApprovePlan={handleApprovePlan}
              onEditMessage={handleEditMessage}
            />
          )}
        </div>

        {/* Composer Area */}
        <div className="workspace-composer shrink-0 border-t border-white/10 bg-[#080d18]/90 backdrop-blur-xl">
          <Composer
            onSend={handleSendMessage}
            disabled={sendingMessage}
            prompt={composerPrompt}
            onPromptChange={setComposerPrompt}
            activeMode={activeMode}
            onModeChange={setActiveMode}
          />
        </div>
      </div>
    </div>
  );
}
