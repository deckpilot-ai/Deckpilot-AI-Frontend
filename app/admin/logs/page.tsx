"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  api,
  ApplicationLog,
  ApplicationLogDetail,
  ApplicationLogListResponse,
} from "@/lib/api";
import {
  ShieldAlert,
  RefreshCw,
  Trash2,
  CheckCircle,
  Circle,
  ChevronLeft,
  ChevronRight,
  X,
  Copy,
  Clock,
  AlertTriangle,
  AlertCircle,
  Info,
} from "lucide-react";

const LEVEL_STYLES: Record<string, { label: string; className: string }> = {
  CRITICAL: { label: "CRITICAL", className: "bg-red-600/20 text-red-300 border-red-600/40" },
  ERROR: { label: "ERROR", className: "bg-red-500/15 text-red-400 border-red-500/30" },
  WARNING: { label: "WARNING", className: "bg-amber-500/15 text-amber-300 border-amber-500/30" },
  INFO: { label: "INFO", className: "bg-sky-500/15 text-sky-300 border-sky-500/30" },
  DEBUG: { label: "DEBUG", className: "bg-slate-500/15 text-slate-400 border-slate-500/25" },
};

function LevelBadge({ level }: { level: string }) {
  const s = LEVEL_STYLES[level] || LEVEL_STYLES.INFO;
  return (
    <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-[10px] font-semibold tracking-wider ${s.className}`}>
      {s.label}
    </span>
  );
}

function formatTs(ts: number) {
  return new Date(ts * 1000).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "medium",
  });
}

function copyText(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}

export default function AdminLogsPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [data, setData] = useState<ApplicationLogListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const LIMIT = 50;

  // Filters
  const [search, setSearch] = useState("");
  const [filterLevel, setFilterLevel] = useState("");
  const [filterResolved, setFilterResolved] = useState<number | undefined>(undefined);
  const [filterProvider, setFilterProvider] = useState("");
  const [filterAgent, setFilterAgent] = useState("");

  // Detail modal
  const [detail, setDetail] = useState<ApplicationLogDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);

  // Cleanup
  const [cleanupLoading, setCleanupLoading] = useState(false);
  const [cleanupMsg, setCleanupMsg] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.replace("/workspace");
    }
  }, [user, authLoading, router]);

  const loadLogs = useCallback(async (newOffset: number = 0) => {
    setLoading(true);
    try {
      const res = await api.listAdminLogs({
        search: search || undefined,
        level: filterLevel || undefined,
        resolved: filterResolved,
        provider: filterProvider || undefined,
        agent_name: filterAgent || undefined,
        limit: LIMIT,
        offset: newOffset,
      });
      setData(res);
      setOffset(newOffset);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }, [search, filterLevel, filterResolved, filterProvider, filterAgent]);

  useEffect(() => {
    if (user?.role === "admin") void loadLogs(0);
  }, [user, loadLogs]);

  const openDetail = async (id: string) => {
    setDetailLoading(true);
    setDetail(null);
    try {
      const res = await api.getAdminLog(id);
      setDetail(res);
    } catch {
      // ignore
    } finally {
      setDetailLoading(false);
    }
  };

  const toggleResolution = async (log: ApplicationLog) => {
    const newResolved = log.resolved === 1 ? 0 : 1;
    try {
      const updated = await api.updateAdminLog(log.id, { resolved: newResolved });
      setData((prev) =>
        prev
          ? {
              ...prev,
              items: prev.items.map((i) => (i.id === log.id ? { ...i, resolved: updated.resolved } : i)),
            }
          : prev
      );
      if (detail?.id === log.id) {
        setDetail((prev) => prev ? { ...prev, resolved: updated.resolved } : prev);
      }
    } catch {
      // ignore
    }
  };

  const handleCleanup = async () => {
    setCleanupLoading(true);
    setCleanupMsg(null);
    try {
      const res = await api.cleanupAdminLogs();
      setCleanupMsg(`Cleaned up ${res.deleted_count} old logs.`);
      void loadLogs(0);
    } catch {
      setCleanupMsg("Cleanup failed.");
    } finally {
      setCleanupLoading(false);
    }
  };

  if (authLoading || !user) return null;
  if (user.role !== "admin") return null;

  const totalPages = data ? Math.ceil(data.total / LIMIT) : 0;
  const currentPage = Math.floor(offset / LIMIT) + 1;

  return (
    <div className="min-h-screen bg-[#060912] text-slate-200">
      {/* Header */}
      <div className="sticky top-0 z-10 border-b border-white/10 bg-[#080d18]/90 backdrop-blur-xl px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-400" />
          <h1 className="text-base font-bold text-white">Production Logs</h1>
          {data && (
            <span className="rounded-full bg-slate-700/60 px-2 py-0.5 text-[11px] text-slate-400">
              {data.total.toLocaleString()} total
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => void loadLogs(0)}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs hover:bg-white/10 transition-all disabled:opacity-50"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleCleanup}
            disabled={cleanupLoading}
            className="flex items-center gap-1.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs text-red-300 hover:bg-red-500/20 transition-all disabled:opacity-50"
          >
            <Trash2 className="h-3.5 w-3.5" />
            Cleanup Old Logs
          </button>
        </div>
      </div>

      {cleanupMsg && (
        <div className="mx-6 mt-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs text-emerald-300">
          {cleanupMsg}
        </div>
      )}

      {/* Filters */}
      <div className="sticky top-[65px] z-10 border-b border-white/5 bg-[#060912]/95 backdrop-blur px-6 py-3 flex flex-wrap gap-2">
        <input
          type="search"
          placeholder="Search correlation ID, message, project…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void loadLogs(0)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs placeholder-slate-500 focus:border-[#0086FF]/60 focus:outline-none w-64"
        />
        <select
          value={filterLevel}
          onChange={(e) => { setFilterLevel(e.target.value); void loadLogs(0); }}
          className="rounded-lg border border-white/10 bg-[#0d1424] px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="">All Levels</option>
          <option value="CRITICAL">CRITICAL</option>
          <option value="ERROR">ERROR</option>
          <option value="WARNING">WARNING</option>
        </select>
        <select
          value={filterResolved === undefined ? "" : String(filterResolved)}
          onChange={(e) => {
            setFilterResolved(e.target.value === "" ? undefined : Number(e.target.value));
            void loadLogs(0);
          }}
          className="rounded-lg border border-white/10 bg-[#0d1424] px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
        >
          <option value="">All Status</option>
          <option value="0">Unresolved</option>
          <option value="1">Resolved</option>
        </select>
        <input
          type="text"
          placeholder="Provider…"
          value={filterProvider}
          onChange={(e) => setFilterProvider(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void loadLogs(0)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs placeholder-slate-500 focus:border-[#0086FF]/60 focus:outline-none w-32"
        />
        <input
          type="text"
          placeholder="Agent…"
          value={filterAgent}
          onChange={(e) => setFilterAgent(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && void loadLogs(0)}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs placeholder-slate-500 focus:border-[#0086FF]/60 focus:outline-none w-28"
        />
        <button
          type="button"
          onClick={() => void loadLogs(0)}
          className="rounded-lg border border-[#0086FF]/40 bg-[#0086FF]/15 px-3 py-1.5 text-xs text-[#38bdf8] hover:bg-[#0086FF]/25 transition-all"
        >
          Apply
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-xs">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Time</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Level</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Error Type</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Message</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Agent / Provider</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Correlation ID</th>
              <th className="px-4 py-2 text-left text-[11px] font-medium text-slate-500">Status</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loading && !data && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  Loading logs…
                </td>
              </tr>
            )}
            {!loading && data?.items.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-12 text-center text-slate-500">
                  No logs found
                </td>
              </tr>
            )}
            {data?.items.map((log) => (
              <tr
                key={log.id}
                className={`border-b border-white/5 hover:bg-white/[0.025] transition-colors ${log.resolved === 1 ? "opacity-50" : ""}`}
              >
                <td className="px-4 py-2.5 text-slate-500 whitespace-nowrap">
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(log.timestamp * 1000).toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </div>
                  <div className="text-[10px] mt-0.5 opacity-70">
                    {new Date(log.timestamp * 1000).toLocaleDateString()}
                  </div>
                </td>
                <td className="px-4 py-2.5">
                  <LevelBadge level={log.level} />
                </td>
                <td className="px-4 py-2.5 font-mono text-[10px] text-slate-400 max-w-[120px] truncate">
                  {log.error_type ?? "—"}
                </td>
                <td className="px-4 py-2.5 max-w-[250px]">
                  <span className="block truncate" title={log.error_message ?? ""}>
                    {log.error_message ?? <span className="text-slate-600 italic">No message</span>}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-400 text-[10px]">
                  {log.agent_name && <div className="text-sky-400">{log.agent_name}</div>}
                  {log.provider && <div className="text-amber-400">{log.provider}</div>}
                  {!log.agent_name && !log.provider && <span className="text-slate-600">—</span>}
                </td>
                <td className="px-4 py-2.5 font-mono text-[10px] text-slate-500">
                  <button
                    type="button"
                    onClick={() => copyText(log.correlation_id)}
                    title="Copy"
                    className="hover:text-slate-300 transition-colors"
                  >
                    {log.correlation_id.slice(0, 20)}…
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => void toggleResolution(log)}
                    title={log.resolved === 1 ? "Mark unresolved" : "Mark resolved"}
                    className="flex items-center gap-1 text-[10px] transition-colors"
                  >
                    {log.resolved === 1 ? (
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                    ) : (
                      <Circle className="h-3.5 w-3.5 text-slate-600" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-2.5">
                  <button
                    type="button"
                    onClick={() => void openDetail(log.id)}
                    className="rounded border border-white/10 px-2 py-0.5 text-[10px] hover:bg-white/10 transition-all"
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {data && data.total > LIMIT && (
        <div className="flex items-center justify-between border-t border-white/5 px-6 py-3">
          <span className="text-[11px] text-slate-500">
            Page {currentPage} of {totalPages} · {data.total} total
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={offset === 0}
              onClick={() => void loadLogs(offset - LIMIT)}
              className="flex items-center gap-1 rounded border border-white/10 px-2.5 py-1 text-[11px] hover:bg-white/10 disabled:opacity-40"
            >
              <ChevronLeft className="h-3 w-3" /> Prev
            </button>
            <button
              type="button"
              disabled={offset + LIMIT >= data.total}
              onClick={() => void loadLogs(offset + LIMIT)}
              className="flex items-center gap-1 rounded border border-white/10 px-2.5 py-1 text-[11px] hover:bg-white/10 disabled:opacity-40"
            >
              Next <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {(detail || detailLoading) && (
        <div className="fixed inset-0 z-50 flex items-start justify-end bg-black/60 backdrop-blur-sm pt-0">
          <div className="relative flex h-screen w-full max-w-2xl flex-col overflow-y-auto border-l border-white/10 bg-[#0d1424] shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between border-b border-white/10 bg-[#0d1424] px-5 py-3">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-400" />
                <span className="text-sm font-semibold">Log Detail</span>
              </div>
              <button
                type="button"
                onClick={() => setDetail(null)}
                className="rounded-full p-1 hover:bg-white/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {detailLoading && (
              <div className="flex flex-1 items-center justify-center py-20 text-slate-500 text-sm">
                Loading…
              </div>
            )}

            {detail && (
              <div className="p-5 space-y-5 text-xs">
                {/* Header badges */}
                <div className="flex flex-wrap gap-2">
                  <LevelBadge level={detail.level} />
                  {detail.environment !== "production" && (
                    <span className="rounded border border-slate-600/40 bg-slate-600/15 px-1.5 py-0.5 text-[10px] text-slate-400">
                      {detail.environment}
                    </span>
                  )}
                  <span className="rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono">
                    {detail.service}
                  </span>
                </div>

                {/* Identification */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Identification</h3>
                  <div className="rounded-xl border border-white/5 bg-white/[0.025] divide-y divide-white/5">
                    {[
                      ["Correlation ID", detail.correlation_id],
                      ["Fingerprint", detail.fingerprint],
                      ["Timestamp", detail.timestamp ? formatTs(detail.timestamp) : null],
                      ["Endpoint", detail.endpoint ? `${detail.http_method || ""} ${detail.endpoint}` : null],
                      ["Status Code", detail.status_code],
                      ["Similar Instances", detail.similar_instances_count],
                    ].filter(([, v]) => v !== null && v !== undefined).map(([label, val]) => (
                      <div key={String(label)} className="flex gap-4 px-3 py-2">
                        <span className="w-32 shrink-0 text-slate-500">{label}</span>
                        <span className="font-mono text-slate-300 break-all">{String(val)}</span>
                        {(label === "Correlation ID" || label === "Fingerprint") && val && (
                          <button type="button" onClick={() => copyText(String(val))} className="ml-auto shrink-0 text-slate-600 hover:text-slate-300">
                            <Copy className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                {/* Error */}
                {(detail.error_type || detail.error_message) && (
                  <section className="space-y-1.5">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Error</h3>
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 divide-y divide-red-500/10">
                      {detail.error_type && (
                        <div className="flex gap-4 px-3 py-2">
                          <span className="w-32 shrink-0 text-slate-500">Type</span>
                          <span className="font-mono text-red-300">{detail.error_type}</span>
                        </div>
                      )}
                      {detail.error_message && (
                        <div className="px-3 py-2">
                          <div className="text-slate-500 mb-1">Message</div>
                          <pre className="whitespace-pre-wrap text-red-200 font-mono text-[10px]">{detail.error_message}</pre>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Stack Trace */}
                {detail.stack_trace && (
                  <section className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Stack Trace</h3>
                      <button
                        type="button"
                        onClick={() => copyText(detail.stack_trace!)}
                        className="flex items-center gap-1 text-[10px] text-slate-500 hover:text-slate-300"
                      >
                        <Copy className="h-3 w-3" /> Copy
                      </button>
                    </div>
                    <pre className="max-h-64 overflow-y-auto rounded-xl border border-white/5 bg-[#060912] px-3 py-3 font-mono text-[10px] text-slate-400 whitespace-pre-wrap">
                      {detail.stack_trace}
                    </pre>
                  </section>
                )}

                {/* Context */}
                {(detail.user_id || detail.project_id || detail.job_id) && (
                  <section className="space-y-1.5">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Context</h3>
                    <div className="rounded-xl border border-white/5 bg-white/[0.025] divide-y divide-white/5">
                      {[
                        ["User ID", detail.user_id],
                        ["Project ID", detail.project_id],
                        ["Job ID", detail.job_id],
                        ["Agent", detail.agent_name],
                        ["Provider", detail.provider],
                        ["Model", detail.model_name],
                        ["Duration", detail.duration_ms ? `${detail.duration_ms}ms` : null],
                      ].filter(([, v]) => v !== null && v !== undefined).map(([label, val]) => (
                        <div key={String(label)} className="flex gap-4 px-3 py-2">
                          <span className="w-32 shrink-0 text-slate-500">{label}</span>
                          <span className="font-mono text-slate-300">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Related Logs */}
                {detail.related_logs.length > 0 && (
                  <section className="space-y-1.5">
                    <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      Related Logs ({detail.related_logs.length})
                    </h3>
                    <div className="space-y-1">
                      {detail.related_logs.map((rl) => (
                        <div key={rl.id} className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.02] px-3 py-2">
                          <LevelBadge level={rl.level} />
                          <span className="truncate text-slate-400">{rl.error_message || rl.error_type || "—"}</span>
                          <span className="ml-auto text-[10px] text-slate-600">
                            {new Date(rl.timestamp * 1000).toLocaleTimeString()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Resolution */}
                <section className="space-y-1.5">
                  <h3 className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">Resolution</h3>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => void toggleResolution(detail)}
                      className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs transition-all ${
                        detail.resolved === 1
                          ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                          : "border-white/10 bg-white/5 text-slate-400 hover:bg-white/10"
                      }`}
                    >
                      {detail.resolved === 1 ? <CheckCircle className="h-3.5 w-3.5" /> : <Circle className="h-3.5 w-3.5" />}
                      {detail.resolved === 1 ? "Resolved" : "Mark as Resolved"}
                    </button>
                  </div>
                  {detail.resolved_at && (
                    <p className="text-[10px] text-slate-600">
                      Resolved at {formatTs(detail.resolved_at)} {detail.resolution_notes ? `· ${detail.resolution_notes}` : ""}
                    </p>
                  )}
                </section>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
