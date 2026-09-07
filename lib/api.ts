/**
 * API client for deckpilotAI backend.
 * All API calls communicate with the FastAPI backend.
 * Base URL comes exclusively from NEXT_PUBLIC_API_BASE_URL environment variable.
 */

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === "production"
    ? "https://deckpilot-ai-backend.onrender.com/api/v1"
    : "http://localhost:8000/api/v1");

export interface User {
  id: string;
  email: string;
  role: "user" | "admin";
  status: string;
  created_at: number;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  current_deck_version: number;
  created_at: number;
  updated_at: number;
}

export interface Message {
  id: string;
  project_id: string;
  user_id: string | null;
  role: "user" | "assistant" | "system";
  content: string;
  created_at: number;
  attachments?: Attachment[];
}

export interface AgentTaskInfo {
  id: string;
  agent_type: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  started_at: number | null;
  completed_at: number | null;
}

export interface GenerationJobInfo {
  live_message?: string;
  live_agent?: string;
  id: string;
  project_id: string;
  status: "queued" | "running" | "completed" | "permanently_failed" | "cancelled";
  mode: string;
  started_at: number | null;
  completed_at: number | null;
  tasks: AgentTaskInfo[];
}

export interface ActiveJobResponse {
  active: boolean;
  job: GenerationJobInfo | null;
}

export interface DeckVersionInfo {
  version: number;
  status: string;
  created_at: number;
  spec: Record<string, unknown>;
}

export interface HealthResponse {
  status: string;
  service: string;
}

export interface DecisionQuestion {
  id: string;
  question: string;
  options: string[];
}

export interface PlannedSlide {
  slideId: string;
  chapter?: string;
  purpose: string;
  headline?: string;
  layoutHint?: string;
  keyTakeaways?: string[];
}

export interface DeckPlanSpec {
  deckTitle?: string;
  objective?: string;
  audience?: string;
  totalSlides?: number;
  slides?: PlannedSlide[];
}

export interface ChatTurnResponse {
  intent: "chat" | "generate" | "plan" | "ask";
  mode: "autopilot" | "plan" | "ask";
  should_generate: boolean;
  user_message: Message;
  assistant_message: Message | null;
  plan_spec?: DeckPlanSpec | null;
  decision_questions?: DecisionQuestion[] | null;
  guardrail_info?: Record<string, unknown> | null;
}

export interface Attachment {
  id: string;
  project_id: string;
  message_id: string | null;
  user_id: string;
  file_name: string;
  mime_type: string;
  byte_size: number;
  storage_key: string;
  sha256: string;
  status: string;
  ownership_flag: string;
  created_at: number;
}



const TOKEN_KEY = "deckpilotai_token";

export function getStoredToken(): string | null {
  if (typeof window !== "undefined") {
    try {
      return localStorage.getItem(TOKEN_KEY);
    } catch {
      return null;
    }
  }
  return null;
}

export function setStoredToken(token: string | null): void {
  if (typeof window !== "undefined") {
    try {
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
      } else {
        localStorage.removeItem(TOKEN_KEY);
      }
    } catch {
      // Ignore storage errors
    }
  }
}

export class ApiError extends Error {
  status: number;
  errorId?: string;
  constructor(message: string, status: number, errorId?: string) {
    super(message);
    this.status = status;
    this.errorId = errorId;
    this.name = "ApiError";
  }
}

export interface ApplicationLog {
  id: string;
  correlation_id: string;
  fingerprint: string | null;
  timestamp: number;
  level: string;
  environment: string;
  service: string;
  component: string | null;
  agent_name: string | null;
  operation: string | null;
  endpoint: string | null;
  http_method: string | null;
  status_code: number | null;
  user_id: string | null;
  workspace_id: string | null;
  project_id: string | null;
  conversation_id: string | null;
  job_id: string | null;
  error_type: string | null;
  error_message: string | null;
  provider: string | null;
  provider_status_code: number | null;
  model_name: string | null;
  duration_ms: number | null;
  resolved: number;
  resolution_notes: string | null;
  resolved_at: number | null;
}

export interface ApplicationLogDetail extends ApplicationLog {
  stack_trace: string | null;
  request_data: string | null;
  additional_context: string | null;
  related_logs: ApplicationLog[];
  similar_instances_count: number;
}

export interface ApplicationLogListResponse {
  items: ApplicationLog[];
  total: number;
  limit: number;
  offset: number;
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const token = getStoredToken();
  if (token && !headers.has("Authorization")) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url, {
    ...options,
    headers,
    credentials: "include", // send cookies
  });

  if (!res.ok) {
    if (
      res.status === 401 &&
      !path.startsWith("/auth/login") &&
      !path.startsWith("/auth/register") &&
      typeof window !== "undefined"
    ) {
      setStoredToken(null);
      window.dispatchEvent(new Event("deckpilotai:unauthorized"));
    }
    let errorMsg = `Request failed with status ${res.status}`;
    let errorId: string | undefined;
    try {
      const data = await res.json();
      if (data.error_id) errorId = data.error_id;
      if (data.request_id && !errorId) errorId = data.request_id;
      if (data.detail) {
        errorMsg = typeof data.detail === "string" ? data.detail : JSON.stringify(data.detail);
      } else if (data.message) {
        errorMsg = data.message;
      } else if (data.error?.message) {
        errorMsg = data.error.message;
      }
    } catch {
      // Ignore JSON parse error
    }
    throw new ApiError(errorMsg, res.status, errorId);
  }

  if (res.status === 204) {
    return {} as T;
  }

  return res.json();
}

export const api = {
  // System
  getHealth: () => request<HealthResponse>("/health"),

  // Auth
  register: (data: { email: string; password: string }) =>
    request<User>("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  login: async (data: { email: string; password: string }) => {
    const res = await request<{ user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (res?.token) {
      setStoredToken(res.token);
    }
    return res;
  },

  logout: async () => {
    try {
      return await request<{ status: string; message: string }>("/auth/logout", {
        method: "POST",
      });
    } finally {
      setStoredToken(null);
    }
  },

  getMe: () => request<User>("/auth/me"),

  // Projects
  listProjects: () => request<Project[]>("/projects"),

  createProject: (data: { title?: string }) =>
    request<Project>("/projects", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getProject: (projectId: string) =>
    request<Project>(`/projects/${projectId}`),

  updateProject: (projectId: string, data: { title: string }) =>
    request<Project>(`/projects/${projectId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  deleteProject: (projectId: string) =>
    request<void>(`/projects/${projectId}`, {
      method: "DELETE",
    }),

  // Messages
  listMessages: (projectId: string) =>
    request<Message[]>(`/projects/${projectId}/messages`),

  sendMessage: (projectId: string, content: string) =>
    request<Message>(`/projects/${projectId}/messages`, {
      method: "POST",
      body: JSON.stringify({ content, role: "user" }),
    }),

  sendChatMessage: (
    projectId: string,
    content: string,
    hasAttachments: boolean = false,
    mode: "autopilot" | "plan" | "ask" = "autopilot",
    attachmentIds: string[] = []
  ) =>
    request<ChatTurnResponse>(`/projects/${projectId}/chat`, {
      method: "POST",
      body: JSON.stringify({
        content,
        has_attachments: hasAttachments,
        mode,
        attachment_ids: attachmentIds,
      }),
    }),

  editChatMessage: (
    projectId: string,
    messageId: string,
    data: {
      content: string;
      removed_attachment_ids?: string[];
      new_attachment_ids?: string[];
      mode?: "autopilot" | "plan" | "ask";
    }
  ) =>
    request<ChatTurnResponse>(`/projects/${projectId}/messages/${messageId}/edit`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  getWebSocketUrl: (projectId: string) => {
    const wsBase = API_BASE_URL.replace(/^http/, "ws");
    const token = getStoredToken();
    return token ? `${wsBase}/ws/projects/${projectId}?token=${encodeURIComponent(token)}` : `${wsBase}/ws/projects/${projectId}`;
  },

  deleteAttachment: (projectId: string, attachmentId: string) =>
    request<void>(`/projects/${projectId}/attachments/${attachmentId}`, {
      method: "DELETE",
    }),




  // Generation & Real-Time Orchestration
  startJob: (
    projectId: string,
    data: { prompt: string; mode?: string; idempotencyKey?: string; background?: boolean }
  ) =>
    request<{ job_id: string; status: string; mode: string; project_id: string }>(
      `/projects/${projectId}/jobs`,
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    ),

  getJob: (jobId: string) =>
    request<GenerationJobInfo>(`/jobs/${jobId}`),

  cancelJob: (jobId: string) =>
    request<{ job_id: string; status: string; message: string }>(`/jobs/${jobId}/cancel`, {
      method: "POST",
    }),

  getActiveJob: (projectId: string) =>
    request<ActiveJobResponse>(`/projects/${projectId}/jobs/active`),

  getDeckVersion: (projectId: string, version: number) =>
    request<DeckVersionInfo>(`/projects/${projectId}/decks/${version}`),

  getDeckDownloadUrl: (projectId: string, version: number) => {
    const token = getStoredToken();
    return `${API_BASE_URL}/projects/${projectId}/decks/${version}/download${
      token ? `?token=${encodeURIComponent(token)}` : ""
    }`;
  },

  downloadDeck: async (projectId: string, version: number, fallbackTitle?: string) => {
    const token = getStoredToken();
    const url = `${API_BASE_URL}/projects/${projectId}/decks/${version}/download${
      token ? `?token=${encodeURIComponent(token)}` : ""
    }`;
    const res = await fetch(url, {
      method: "GET",
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Failed to download presentation (${res.status} ${res.statusText})`);
    }

    // Determine filename from Content-Disposition header
    let filename = "";
    const disposition = res.headers.get("Content-Disposition");
    if (disposition) {
      const matchUtf8 = disposition.match(/filename\*=UTF-8''([^;]+)/i);
      if (matchUtf8 && matchUtf8[1]) {
        filename = decodeURIComponent(matchUtf8[1]);
      } else {
        const matchAscii = disposition.match(/filename="?([^";]+)"?/i);
        if (matchAscii && matchAscii[1]) {
          filename = matchAscii[1];
        }
      }
    }
    if (!filename) {
      const cleanTitle = (fallbackTitle || "Presentation")
        .replace(/[\/\\:\*\?"<>|\r\n\t]+/g, "")
        .replace(/\s+/g, "_")
        .trim()
        .slice(0, 50);
      filename = `${cleanTitle || "Presentation"}_v${version}.pptx`;
    }
    if (!filename.toLowerCase().endsWith(".pptx")) {
      filename += ".pptx";
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
  },

  uploadAttachment: async (projectId: string, file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    return request<Attachment>(`/projects/${projectId}/attachments`, {
      method: "POST",
      body: formData,
    });
  },

  // Admin: Production Logs
  listAdminLogs: (params?: {
    search?: string;
    correlation_id?: string;
    level?: string;
    service?: string;
    agent_name?: string;
    provider?: string;
    environment?: string;
    error_type?: string;
    resolved?: number;
    start_time?: number;
    end_time?: number;
    limit?: number;
    offset?: number;
  }) => {
    const qs = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        if (v !== undefined && v !== null && v !== "") qs.set(k, String(v));
      });
    }
    const query = qs.toString();
    return request<ApplicationLogListResponse>(`/admin/logs${query ? `?${query}` : ""}`);
  },

  getAdminLog: (logId: string) =>
    request<ApplicationLogDetail>(`/admin/logs/${logId}`),

  updateAdminLog: (logId: string, data: { resolved: number; resolution_notes?: string }) =>
    request<ApplicationLog>(`/admin/logs/${logId}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),

  cleanupAdminLogs: () =>
    request<{ success: boolean; deleted_count: number; message: string }>("/admin/logs/cleanup", {
      method: "POST",
    }),
};
