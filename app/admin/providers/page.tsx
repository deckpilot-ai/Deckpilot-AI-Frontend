"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  api,
  AIProviderInfo,
  AIProviderModelInfo,
  DiscoveredModel,
} from "@/lib/api";
import {
  Cpu,
  Server,
  Zap,
  Sliders,
  Key,
  RefreshCw,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  AlertCircle,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronUp,
  Layers,
  ShieldCheck,
  Sparkles,
  ArrowUpRight,
  ShieldAlert,
  HelpCircle,
} from "lucide-react";

export default function AdminProvidersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  const [providers, setProviders] = useState<AIProviderInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusOverview, setStatusOverview] = useState<{
    openrouter_cascade_active: boolean;
    experientiallabs_cascade_active: boolean;
    total_free_models_discovered: number;
    available_free_models_count: number;
    top_model: string | null;
  } | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Modals
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showFetchModal, setShowFetchModal] = useState<AIProviderInfo | null>(null);
  const [showKeyModal, setShowKeyModal] = useState<AIProviderInfo | null>(null);
  const [showEditModal, setShowEditModal] = useState<AIProviderInfo | null>(null);
  const [showAddModelModal, setShowAddModelModal] = useState<AIProviderInfo | null>(null);

  // Expanded provider cards (for model lists)
  const [expandedProviders, setExpandedProviders] = useState<Record<string, boolean>>({});

  // Create Provider Form State
  const [newName, setNewName] = useState("");
  const [newBaseUrl, setNewBaseUrl] = useState("");
  const [newApiKey, setNewApiKey] = useState("");
  const [newPriority, setNewPriority] = useState(50);
  const [showNewKey, setShowNewKey] = useState(false);
  const [createTesting, setCreateTesting] = useState(false);
  const [createDiscoveredModels, setCreateDiscoveredModels] = useState<DiscoveredModel[]>([]);
  const [selectedModelIds, setSelectedModelIds] = useState<Record<string, boolean>>({});
  const [modelPriorities, setModelPriorities] = useState<Record<string, number>>({});
  const [createSubmitting, setCreateSubmitting] = useState(false);

  // Fetch / Sync Models Modal State
  const [fetchLoading, setFetchLoading] = useState(false);
  const [fetchedModels, setFetchedModels] = useState<DiscoveredModel[]>([]);
  const [syncSelectedModels, setSyncSelectedModels] = useState<Record<string, boolean>>({});
  const [syncPriorities, setSyncPriorities] = useState<Record<string, number>>({});
  const [syncSubmitting, setSyncSubmitting] = useState(false);

  // Key Modal State
  const [keyLabel, setKeyLabel] = useState("");
  const [keySecret, setKeySecret] = useState("");
  const [showKeySecret, setShowKeySecret] = useState(false);
  const [keySubmitting, setKeySubmitting] = useState(false);

  // Edit Provider Modal State
  const [editName, setEditName] = useState("");
  const [editBaseUrl, setEditBaseUrl] = useState("");
  const [editPriority, setEditPriority] = useState(1);
  const [editEnabled, setEditEnabled] = useState(true);
  const [editSubmitting, setEditSubmitting] = useState(false);

  // Add Manual Model Modal State
  const [manualModelId, setManualModelId] = useState("");
  const [manualDisplayName, setManualDisplayName] = useState("");
  const [manualPriority, setManualPriority] = useState(50);
  const [manualSubmitting, setManualSubmitting] = useState(false);

  useEffect(() => {
    if (!authLoading && (!user || user.role !== "admin")) {
      router.replace("/workspace");
    }
  }, [user, authLoading, router]);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [provList, status] = await Promise.all([
        api.listProviders(),
        api.getProvidersStatus().catch(() => null),
      ]);
      setProviders(provList);
      if (status) setStatusOverview(status);

      // Expand all providers by default
      const exp: Record<string, boolean> = {};
      provList.forEach((p) => {
        exp[p.id] = true;
      });
      setExpandedProviders(exp);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to load providers");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user?.role === "admin") {
      void loadData();
    }
  }, [user, loadData]);

  const showNotification = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(null), 4000);
  };

  const toggleExpand = (id: string) => {
    setExpandedProviders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // 1. Create Provider Handlers
  const handleTestCreateConnection = async () => {
    if (!newBaseUrl.trim()) {
      setError("Please provide a Base URL first");
      return;
    }
    setCreateTesting(true);
    setError(null);
    try {
      const res = await api.fetchProviderModels({
        base_url: newBaseUrl.trim(),
        api_key: newApiKey.trim() || undefined,
      });
      setCreateDiscoveredModels(res.models);
      const sel: Record<string, boolean> = {};
      const prio: Record<string, number> = {};
      res.models.forEach((m, idx) => {
        sel[m.id] = idx < 8; // select top 8 by default
        prio[m.id] = m.default_priority || Math.max(100 - idx * 5, 10);
      });
      setSelectedModelIds(sel);
      setModelPriorities(prio);
      showNotification(`Successfully discovered ${res.models.length} models!`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch models from provider");
    } finally {
      setCreateTesting(false);
    }
  };

  const handleCreateProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newBaseUrl.trim()) {
      setError("Name and Base URL are required");
      return;
    }
    setCreateSubmitting(true);
    setError(null);

    // Build models array if any were selected
    const selectedModels = createDiscoveredModels
      .filter((m) => selectedModelIds[m.id])
      .map((m) => ({
        model_id: m.id,
        display_name: m.name,
        priority: modelPriorities[m.id] || 50,
        enabled: 1,
        context_length: m.context_length,
      }));

    try {
      await api.createProvider({
        name: newName.trim().toLowerCase().replace(/[^a-z0-9_-]/g, "-"),
        base_url: newBaseUrl.trim(),
        priority: newPriority,
        api_key: newApiKey.trim() || undefined,
        key_label: `${newName.trim()}-primary-key`,
        models: selectedModels.length > 0 ? selectedModels : undefined,
      });

      setShowCreateModal(false);
      setNewName("");
      setNewBaseUrl("");
      setNewApiKey("");
      setNewPriority(50);
      setCreateDiscoveredModels([]);
      showNotification("AI Provider successfully created and configured!");
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to create provider");
    } finally {
      setCreateSubmitting(false);
    }
  };

  // 2. Fetch / Sync Models for Existing Provider
  const handleOpenFetchModal = async (prov: AIProviderInfo) => {
    setShowFetchModal(prov);
    setFetchLoading(true);
    setFetchedModels([]);
    setError(null);
    try {
      const res = await api.fetchProviderModels({ provider_id: prov.id });
      setFetchedModels(res.models);

      // Existing configured models
      const existingMap = new Map(prov.models.map((m) => [m.model_id, m]));
      const sel: Record<string, boolean> = {};
      const prio: Record<string, number> = {};

      res.models.forEach((m, idx) => {
        const existing = existingMap.get(m.id);
        if (existing) {
          sel[m.id] = existing.enabled;
          prio[m.id] = existing.priority;
        } else {
          sel[m.id] = idx < 5;
          prio[m.id] = m.default_priority || Math.max(100 - idx * 5, 10);
        }
      });

      setSyncSelectedModels(sel);
      setSyncPriorities(prio);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to fetch provider models");
    } finally {
      setFetchLoading(false);
    }
  };

  const handleSaveSyncModels = async () => {
    if (!showFetchModal) return;
    setSyncSubmitting(true);
    setError(null);

    const modelsToSave = fetchedModels
      .filter((m) => syncSelectedModels[m.id])
      .map((m) => ({
        model_id: m.id,
        display_name: m.name,
        priority: syncPriorities[m.id] || 50,
        enabled: 1,
        context_length: m.context_length,
      }));

    try {
      await api.saveProviderModels(showFetchModal.id, modelsToSave);
      showNotification(`Saved ${modelsToSave.length} models for ${showFetchModal.name}`);
      setShowFetchModal(null);
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
      else setError("Failed to save provider models");
    } finally {
      setSyncSubmitting(false);
    }
  };

  // 3. Model Priority & Status Inline Handlers
  const handleUpdateModelPriority = async (
    provId: string,
    model: AIProviderModelInfo,
    newPrio: number
  ) => {
    try {
      await api.updateModelPriority(provId, model.id, { priority: newPrio });
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id !== provId) return p;
          const updatedModels = p.models
            .map((m) => (m.id === model.id ? { ...m, priority: newPrio } : m))
            .sort((a, b) => b.priority - a.priority);
          return { ...p, models: updatedModels };
        })
      );
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleToggleModelEnabled = async (provId: string, model: AIProviderModelInfo) => {
    const nextState = !model.enabled;
    try {
      await api.updateModelPriority(provId, model.id, { enabled: nextState ? 1 : 0 });
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id !== provId) return p;
          return {
            ...p,
            models: p.models.map((m) =>
              m.id === model.id ? { ...m, enabled: nextState } : m
            ),
          };
        })
      );
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  const handleDeleteModel = async (provId: string, modelDbId: string) => {
    if (!confirm("Are you sure you want to remove this model configuration?")) return;
    try {
      await api.deleteProviderModel(provId, modelDbId);
      setProviders((prev) =>
        prev.map((p) => {
          if (p.id !== provId) return p;
          return { ...p, models: p.models.filter((m) => m.id !== modelDbId) };
        })
      );
      showNotification("Model removed");
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // 4. Provider Toggle Enabled
  const handleToggleProviderEnabled = async (prov: AIProviderInfo) => {
    const nextState = !prov.enabled;
    try {
      await api.updateProvider(prov.id, { enabled: nextState ? 1 : 0 });
      setProviders((prev) =>
        prev.map((p) => (p.id === prov.id ? { ...p, enabled: nextState } : p))
      );
      showNotification(`${prov.name} is now ${nextState ? "enabled" : "disabled"}`);
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // 5. Add Key to Provider
  const handleAddKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showKeyModal || !keySecret.trim()) return;
    setKeySubmitting(true);
    setError(null);
    try {
      await api.addProviderKey(showKeyModal.id, {
        label: keyLabel.trim() || `${showKeyModal.name}-key`,
        secret: keySecret.trim(),
      });
      setShowKeyModal(null);
      setKeyLabel("");
      setKeySecret("");
      showNotification("API Key added securely");
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setKeySubmitting(false);
    }
  };

  // 6. Edit Provider
  const handleOpenEditModal = (prov: AIProviderInfo) => {
    setShowEditModal(prov);
    setEditName(prov.name);
    setEditBaseUrl(prov.base_url);
    setEditPriority(prov.priority);
    setEditEnabled(prov.enabled);
  };

  const handleSaveEditProvider = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showEditModal) return;
    setEditSubmitting(true);
    setError(null);
    try {
      await api.updateProvider(showEditModal.id, {
        name: editName.trim(),
        base_url: editBaseUrl.trim(),
        priority: editPriority,
        enabled: editEnabled ? 1 : 0,
      });
      setShowEditModal(null);
      showNotification("Provider updated successfully");
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setEditSubmitting(false);
    }
  };

  // 7. Delete Provider
  const handleDeleteProvider = async (prov: AIProviderInfo) => {
    if (!confirm(`Are you sure you want to delete AI Provider "${prov.name}" and all its keys and model settings?`)) {
      return;
    }
    try {
      await api.deleteProvider(prov.id);
      showNotification(`Provider ${prov.name} deleted`);
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    }
  };

  // 8. Add Manual Model
  const handleAddManualModel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!showAddModelModal || !manualModelId.trim()) return;
    setManualSubmitting(true);
    setError(null);
    try {
      await api.saveProviderModels(showAddModelModal.id, [
        {
          model_id: manualModelId.trim(),
          display_name: manualDisplayName.trim() || manualModelId.trim(),
          priority: manualPriority,
          enabled: 1,
        },
      ]);
      setShowAddModelModal(null);
      setManualModelId("");
      setManualDisplayName("");
      setManualPriority(50);
      showNotification("Model added to provider configuration");
      await loadData();
    } catch (err: unknown) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setManualSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 flex flex-col selection:bg-[#0086FF]/30">
      {/* Top Header */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#090e1a]/90 backdrop-blur-xl px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/workspace" className="flex items-center gap-2 group">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] shadow-md shadow-[#0086FF]/30 group-hover:scale-105 transition-transform">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-base font-bold text-white tracking-tight">
              deckpilot<span className="text-[#0086FF]">AI</span>
            </span>
          </Link>
          <span className="text-slate-500 text-sm">/</span>
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 bg-white/5 border border-white/10 px-2.5 py-1 rounded-full">
            Admin Console
          </span>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2">
          <Link
            href="/admin/providers"
            className="flex items-center gap-1.5 rounded-full bg-[#0086FF] px-3.5 py-1.5 text-xs font-medium text-white shadow-md shadow-[#0086FF]/25"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>AI Providers & Models</span>
          </Link>
          <Link
            href="/admin/logs"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0c1222] px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
          >
            <ShieldAlert className="h-3.5 w-3.5 text-amber-400" />
            <span>Production Logs</span>
          </Link>
          <Link
            href="/workspace"
            className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-slate-400 hover:text-white transition-colors"
          >
            Back to Workspace
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-8 space-y-6">
        {/* Banner Title & Quick Action */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <Server className="h-6 w-6 text-[#0086FF]" />
              AI Providers & Model Priority Engine
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Configure any AI Provider using Base URL & API Key, dynamically fetch live models, and fine-tune execution priority.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              onClick={() => void loadData()}
              disabled={loading}
              className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-[#0c1222] px-3.5 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all cursor-pointer disabled:opacity-50"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin text-[#0086FF]" : ""}`} />
              <span>Refresh</span>
            </button>
            <button
              onClick={() => {
                setCreateDiscoveredModels([]);
                setShowCreateModal(true);
              }}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0086FF] to-[#0075ED] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0086FF]/30 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              <Plus className="h-4 w-4" />
              <span>Configure New AI Provider</span>
            </button>
          </div>
        </div>

        {/* Notifications & Error alerts */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300">
            <AlertCircle className="h-5 w-5 shrink-0 text-red-400" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError(null)} className="text-red-400 hover:text-white">✕</button>
          </div>
        )}

        {successMsg && (
          <div className="flex items-center gap-3 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" />
            <span className="flex-1">{successMsg}</span>
            <button onClick={() => setSuccessMsg(null)} className="text-emerald-400 hover:text-white">✕</button>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/10 bg-[#0c1222]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Configured Providers</span>
              <Server className="h-4 w-4 text-[#0086FF]" />
            </div>
            <div className="text-2xl font-bold text-white mt-1.5">{providers.length}</div>
            <div className="text-[11px] text-slate-400 mt-1">
              {providers.filter((p) => p.enabled).length} active & enabled
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c1222]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Secure API Keys</span>
              <Key className="h-4 w-4 text-emerald-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1.5">
              {providers.reduce((acc, p) => acc + p.keys.length, 0)}
            </div>
            <div className="text-[11px] text-emerald-400/90 mt-1 flex items-center gap-1">
              <ShieldCheck className="h-3 w-3" /> Encrypted with AES-GCM
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c1222]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Configured Models</span>
              <Cpu className="h-4 w-4 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-white mt-1.5">
              {providers.reduce((acc, p) => acc + p.models.length, 0)}
            </div>
            <div className="text-[11px] text-slate-400 mt-1">
              Prioritized execution cascade
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-[#0c1222]/80 p-4 backdrop-blur-xl">
            <div className="flex items-center justify-between text-slate-400 text-xs">
              <span>Routing Strategy</span>
              <Zap className="h-4 w-4 text-amber-400" />
            </div>
            <div className="text-base font-bold text-white mt-2 truncate">
              {providers.length > 0 ? `${providers[0].name} (Priority ${providers[0].priority})` : "Dynamic Fallback"}
            </div>
            <div className="text-[11px] text-amber-300/80 mt-1">
              Top provider tried first
            </div>
          </div>
        </div>

        {/* Providers Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white flex items-center gap-2">
              <Layers className="h-4 w-4 text-[#38bdf8]" />
              Configured AI Providers (Ordered by Priority)
            </h2>
            <span className="text-xs text-slate-400">
              DeckPilot AI evaluates providers from highest to lowest priority
            </span>
          </div>

          {loading ? (
            <div className="py-16 text-center text-slate-400 flex flex-col items-center gap-3">
              <RefreshCw className="h-6 w-6 animate-spin text-[#0086FF]" />
              <span className="text-xs">Loading AI Providers and model configurations...</span>
            </div>
          ) : providers.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-white/10 p-12 text-center bg-[#0c1222]/40">
              <Server className="h-10 w-10 text-slate-600 mx-auto mb-3" />
              <h3 className="text-base font-semibold text-white">No AI Providers Configured</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1 mb-5">
                Add any OpenAI-compatible provider (e.g. Groq, DeepSeek, Together, Ollama, OpenAI) using its Base URL and API key.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="rounded-xl bg-[#0086FF] px-4 py-2 text-xs font-semibold text-white shadow-lg shadow-[#0086FF]/25 hover:bg-[#0075ED]"
              >
                + Configure Your First Provider
              </button>
            </div>
          ) : (
            providers.map((prov) => {
              const isExpanded = !!expandedProviders[prov.id];
              return (
                <div
                  key={prov.id}
                  className={`rounded-3xl border transition-all ${
                    prov.enabled
                      ? "border-white/10 bg-[#0c1222]/90 shadow-xl"
                      : "border-white/5 bg-[#090e1a]/60 opacity-70"
                  }`}
                >
                  {/* Provider Header Row */}
                  <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5">
                    <div className="flex items-start sm:items-center gap-3.5">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0086FF]/20 to-[#38bdf8]/10 border border-[#0086FF]/30 text-[#38bdf8]">
                        <Cpu className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-bold text-white uppercase tracking-tight">
                            {prov.name}
                          </span>
                          <span className="rounded-full bg-[#0086FF]/15 border border-[#0086FF]/30 px-2.5 py-0.5 text-[10px] font-bold text-[#38bdf8]">
                            Priority: {prov.priority}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-medium border ${
                              prov.enabled
                                ? "bg-emerald-500/15 text-emerald-300 border-emerald-500/30"
                                : "bg-slate-500/15 text-slate-400 border-slate-500/30"
                            }`}
                          >
                            {prov.enabled ? "Active" : "Disabled"}
                          </span>
                          <span className="rounded-full bg-white/5 border border-white/10 px-2 py-0.5 text-[10px] text-slate-400">
                            {prov.provider_type}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-slate-400 font-mono">
                          <span className="truncate max-w-md">{prov.base_url}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions on Provider */}
                    <div className="flex flex-wrap items-center gap-2 pt-2 lg:pt-0">
                      {/* Active Key Status Pill */}
                      <button
                        onClick={() => {
                          setShowKeyModal(prov);
                          setKeyLabel(`${prov.name}-key-${prov.keys.length + 1}`);
                          setKeySecret("");
                        }}
                        className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
                        title="Manage API Keys"
                      >
                        <Key className="h-3.5 w-3.5 text-emerald-400" />
                        <span>{prov.keys.length > 0 ? `${prov.keys.length} Key(s)` : "Add Key"}</span>
                      </button>

                      {/* Fetch Models Action */}
                      <button
                        onClick={() => void handleOpenFetchModal(prov)}
                        className="flex items-center gap-1.5 rounded-xl border border-[#0086FF]/40 bg-[#0086FF]/15 px-3.5 py-1.5 text-xs font-semibold text-[#38bdf8] hover:bg-[#0086FF]/25 hover:border-[#0086FF]/60 transition-all cursor-pointer shadow-sm"
                        title="Fetch available models from endpoint"
                      >
                        <RefreshCw className="h-3.5 w-3.5" />
                        <span>Fetch / Sync Models</span>
                      </button>

                      {/* Enable/Disable Toggle */}
                      <button
                        onClick={() => void handleToggleProviderEnabled(prov)}
                        className={`rounded-xl px-3 py-1.5 text-xs font-medium border transition-all cursor-pointer ${
                          prov.enabled
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300 hover:bg-emerald-500/20"
                            : "border-slate-600 bg-slate-800 text-slate-300 hover:bg-slate-700"
                        }`}
                      >
                        {prov.enabled ? "Enabled" : "Enable"}
                      </button>

                      {/* Edit Provider */}
                      <button
                        onClick={() => handleOpenEditModal(prov)}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Provider"
                      >
                        <Edit3 className="h-3.5 w-3.5" />
                      </button>

                      {/* Delete Provider */}
                      <button
                        onClick={() => void handleDeleteProvider(prov)}
                        className="p-1.5 rounded-lg border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 transition-colors"
                        title="Delete Provider"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>

                      {/* Collapse / Expand */}
                      <button
                        onClick={() => toggleExpand(prov.id)}
                        className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-white transition-colors"
                        title={isExpanded ? "Collapse Models" : "Expand Models"}
                      >
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                    </div>
                  </div>

                  {/* Provider Body: Models & Priorities */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 bg-black/20 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sliders className="h-4 w-4 text-purple-400" />
                          <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Model Execution Hierarchy ({prov.models.length} configured)
                          </h4>
                        </div>
                        <button
                          onClick={() => {
                            setShowAddModelModal(prov);
                            setManualModelId("");
                            setManualDisplayName("");
                            setManualPriority(50);
                          }}
                          className="flex items-center gap-1 text-xs text-[#38bdf8] hover:underline cursor-pointer"
                        >
                          <Plus className="h-3 w-3" /> Add Custom Model ID
                        </button>
                      </div>

                      {prov.models.length === 0 ? (
                        <div className="rounded-2xl border border-white/5 bg-white/[0.02] p-6 text-center text-xs text-slate-400">
                          No custom models explicitly pinned. Click{" "}
                          <button
                            onClick={() => void handleOpenFetchModal(prov)}
                            className="text-[#38bdf8] underline font-medium hover:text-white"
                          >
                            Fetch / Sync Models
                          </button>{" "}
                          to discover and set priority order, or default models will be used.
                        </div>
                      ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {prov.models.map((m, idx) => (
                            <div
                              key={m.id}
                              className={`flex items-center justify-between gap-3 rounded-2xl border p-3.5 transition-all ${
                                m.enabled
                                  ? "border-white/10 bg-[#0c1222] shadow-sm"
                                  : "border-white/5 bg-white/[0.02] opacity-60"
                              }`}
                            >
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/5 text-[10px] font-mono text-slate-400">
                                    {idx + 1}
                                  </span>
                                  <span className="text-xs font-semibold text-white truncate">
                                    {m.display_name || m.model_id}
                                  </span>
                                </div>
                                <div className="text-[11px] text-slate-400 font-mono truncate pl-7">
                                  {m.model_id}
                                  {m.context_length ? ` • ${(m.context_length / 1000).toFixed(0)}k ctx` : ""}
                                </div>
                              </div>

                              {/* Priority Adjuster & Controls */}
                              <div className="flex items-center gap-2 shrink-0">
                                <div className="flex items-center rounded-xl border border-white/10 bg-[#070a13] px-2 py-1">
                                  <span className="text-[10px] uppercase font-mono text-slate-400 mr-1.5">
                                    Prio
                                  </span>
                                  <input
                                    type="number"
                                    min="0"
                                    max="100"
                                    value={m.priority}
                                    onChange={(e) => {
                                      const val = parseInt(e.target.value) || 0;
                                      void handleUpdateModelPriority(prov.id, m, Math.min(Math.max(val, 0), 100));
                                    }}
                                    className="w-10 bg-transparent text-center text-xs font-bold text-[#38bdf8] focus:outline-none"
                                  />
                                </div>

                                <button
                                  onClick={() => void handleToggleModelEnabled(prov.id, m)}
                                  className={`px-2 py-1 rounded-lg text-[10px] font-semibold border transition-colors ${

                                    m.enabled
                                      ? "border-emerald-500/30 bg-emerald-500/15 text-emerald-300"
                                      : "border-slate-600 bg-slate-800 text-slate-400"
                                  }`}
                                  title={m.enabled ? "Model Active" : "Model Inactive"}
                                >
                                  {m.enabled ? "ON" : "OFF"}
                                </button>

                                <button
                                  onClick={() => void handleDeleteModel(prov.id, m.id)}
                                  className="text-slate-500 hover:text-red-400 p-1"
                                  title="Remove Model"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 1. Modal: Configure New Provider */}
      {/* ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0c1222] p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0086FF]/20 text-[#38bdf8]">
                  <Plus className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Configure New AI Provider</h3>
                  <p className="text-xs text-slate-400">Connect any OpenAI-compatible API endpoint</p>
                </div>
              </div>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-full p-2 text-slate-400 hover:text-white hover:bg-white/10"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProvider} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Provider Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. deepseek, groq, ollama, together"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Provider Priority (1 - 100)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={newPriority}
                      onChange={(e) => setNewPriority(parseInt(e.target.value))}
                      className="flex-1 accent-[#0086FF]"
                    />
                    <span className="w-12 text-center rounded-lg border border-white/10 bg-[#070a13] py-1 text-xs font-bold text-[#38bdf8]">
                      {newPriority}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Base URL <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. https://api.deepseek.com/v1 or http://localhost:11434/v1"
                  value={newBaseUrl}
                  onChange={(e) => setNewBaseUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] focus:outline-none font-mono"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Must be an absolute endpoint supporting <code>/chat/completions</code> and <code>/models</code>.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  API Key / Secret Token
                </label>
                <div className="relative">
                  <input
                    type={showNewKey ? "text" : "password"}
                    placeholder="sk-..."
                    value={newApiKey}
                    onChange={(e) => setNewApiKey(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3.5 py-2.5 pr-10 text-xs text-white placeholder-slate-500 focus:border-[#0086FF] focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewKey(!showNewKey)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showNewKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Stored securely using AES-256-GCM encryption. Never returned in plaintext.
                </span>
              </div>

              {/* Test and Fetch Button */}
              <div className="pt-2 border-t border-white/5 flex items-center justify-between">
                <button
                  type="button"
                  onClick={handleTestCreateConnection}
                  disabled={createTesting || !newBaseUrl}
                  className="flex items-center gap-1.5 rounded-xl border border-[#0086FF]/40 bg-[#0086FF]/10 px-3.5 py-2 text-xs font-semibold text-[#38bdf8] hover:bg-[#0086FF]/20 transition-all cursor-pointer disabled:opacity-50"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${createTesting ? "animate-spin" : ""}`} />
                  <span>{createTesting ? "Testing & Querying..." : "Test Connection & Fetch Models"}</span>
                </button>
                <span className="text-[11px] text-slate-400">Optional: preview models before save</span>
              </div>

              {/* Discovered Models Preview */}
              {createDiscoveredModels.length > 0 && (
                <div className="rounded-2xl border border-white/10 bg-black/40 p-4 space-y-3 max-h-48 overflow-y-auto">
                  <div className="text-xs font-semibold text-white flex items-center justify-between">
                    <span>Discovered Models ({createDiscoveredModels.length})</span>
                    <span className="text-[11px] text-slate-400">Select models to include & set priority</span>
                  </div>
                  <div className="space-y-2">
                    {createDiscoveredModels.map((m) => (
                      <div
                        key={m.id}
                        className="flex items-center justify-between gap-2 p-2 rounded-xl bg-white/5 text-xs"
                      >
                        <label className="flex items-center gap-2 cursor-pointer truncate flex-1">
                          <input
                            type="checkbox"
                            checked={!!selectedModelIds[m.id]}
                            onChange={(e) =>
                              setSelectedModelIds({ ...selectedModelIds, [m.id]: e.target.checked })
                            }
                            className="rounded accent-[#0086FF]"
                          />
                          <span className="truncate font-medium text-slate-200">{m.name || m.id}</span>
                        </label>
                        {selectedModelIds[m.id] && (
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-[10px] text-slate-400 font-mono">Prio:</span>
                            <input
                              type="number"
                              min="1"
                              max="100"
                              value={modelPriorities[m.id] || 50}
                              onChange={(e) =>
                                setModelPriorities({
                                  ...modelPriorities,
                                  [m.id]: parseInt(e.target.value) || 1,
                                })
                              }
                              className="w-12 rounded border border-white/10 bg-[#070a13] px-1.5 py-0.5 text-center text-xs font-bold text-[#38bdf8]"
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Actions */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createSubmitting}
                  className="rounded-xl bg-[#0086FF] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#0086FF]/25 hover:bg-[#0075ED] disabled:opacity-50 cursor-pointer"
                >
                  {createSubmitting ? "Creating Provider..." : "Save Provider Configuration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. Modal: Fetch / Sync Models */}
      {/* ========================================================================= */}
      {showFetchModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-3xl border border-white/15 bg-[#0c1222] p-6 sm:p-8 shadow-2xl space-y-5 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0086FF]/20 text-[#38bdf8]">
                  <RefreshCw className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Fetch & Prioritize Models: {showFetchModal.name}
                  </h3>
                  <p className="text-xs text-slate-400">Discovered from {showFetchModal.base_url}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFetchModal(null)}
                className="rounded-full p-2 text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            {fetchLoading ? (
              <div className="py-12 text-center text-slate-400 flex flex-col items-center gap-3">
                <RefreshCw className="h-6 w-6 animate-spin text-[#0086FF]" />
                <span className="text-xs">Querying provider models endpoint...</span>
              </div>
            ) : fetchedModels.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 bg-white/5 rounded-2xl">
                No models discovered or provider does not support listing. You can still add models manually.
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400 px-1">
                  <span>Found {fetchedModels.length} models</span>
                  <span>Set priority scores (higher = tried first)</span>
                </div>

                <div className="max-h-80 overflow-y-auto space-y-2 pr-1">
                  {fetchedModels.map((m) => (
                    <div
                      key={m.id}
                      className={`flex items-center justify-between gap-3 p-3 rounded-2xl border transition-all ${
                        syncSelectedModels[m.id]
                          ? "border-[#0086FF]/30 bg-[#0086FF]/5 text-white"
                          : "border-white/5 bg-white/[0.02] text-slate-400"
                      }`}
                    >
                      <label className="flex items-center gap-3 cursor-pointer min-w-0 flex-1">
                        <input
                          type="checkbox"
                          checked={!!syncSelectedModels[m.id]}
                          onChange={(e) =>
                            setSyncSelectedModels({
                              ...syncSelectedModels,
                              [m.id]: e.target.checked,
                            })
                          }
                          className="rounded accent-[#0086FF]"
                        />
                        <div className="min-w-0 truncate">
                          <div className="font-semibold text-xs text-white truncate">
                            {m.name || m.id}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono truncate">
                            {m.id} {m.context_length ? `• ${(m.context_length / 1000).toFixed(0)}k ctx` : ""}
                          </div>
                        </div>
                      </label>

                      {syncSelectedModels[m.id] && (
                        <div className="flex items-center gap-1.5 shrink-0">
                          <span className="text-[10px] font-mono text-slate-400 uppercase">Priority:</span>
                          <input
                            type="number"
                            min="1"
                            max="100"
                            value={syncPriorities[m.id] || 50}
                            onChange={(e) =>
                              setSyncPriorities({
                                ...syncPriorities,
                                [m.id]: parseInt(e.target.value) || 1,
                              })
                            }
                            className="w-14 rounded-xl border border-white/10 bg-[#070a13] px-2 py-1 text-center text-xs font-bold text-[#38bdf8] focus:border-[#0086FF] focus:outline-none"
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
              <button
                type="button"
                onClick={() => setShowFetchModal(null)}
                className="rounded-xl px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveSyncModels}
                disabled={syncSubmitting || fetchedModels.length === 0}
                className="rounded-xl bg-[#0086FF] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-[#0086FF]/25 hover:bg-[#0075ED] disabled:opacity-50 cursor-pointer"
              >
                {syncSubmitting ? "Saving Models..." : "Save Selected Models & Priorities"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. Modal: Manage / Add Key */}
      {/* ========================================================================= */}
      {showKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0c1222] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Key className="h-4 w-4 text-emerald-400" />
                Add API Key for {showKeyModal.name}
              </h3>
              <button onClick={() => setShowKeyModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddKey} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Key Label</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. prod-key-primary"
                  value={keyLabel}
                  onChange={(e) => setKeyLabel(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 text-xs text-white focus:border-[#0086FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">API Key Secret</label>
                <div className="relative">
                  <input
                    type={showKeySecret ? "text" : "password"}
                    required
                    placeholder="sk-..."
                    value={keySecret}
                    onChange={(e) => setKeySecret(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 pr-10 text-xs text-white focus:border-[#0086FF] focus:outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowKeySecret(!showKeySecret)}
                    className="absolute right-3 top-2.5 text-slate-400 hover:text-white"
                  >
                    {showKeySecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowKeyModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={keySubmitting}
                  className="rounded-xl bg-[#0086FF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0075ED] disabled:opacity-50"
                >
                  {keySubmitting ? "Saving..." : "Save Key"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. Modal: Edit Provider */}
      {/* ========================================================================= */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0c1222] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Edit3 className="h-4 w-4 text-[#38bdf8]" />
                Edit AI Provider: {showEditModal.name}
              </h3>
              <button onClick={() => setShowEditModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveEditProvider} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Provider Name</label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 text-xs text-white focus:border-[#0086FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Base URL</label>
                <input
                  type="text"
                  required
                  value={editBaseUrl}
                  onChange={(e) => setEditBaseUrl(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 text-xs text-white focus:border-[#0086FF] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Priority (1 - 100)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={editPriority}
                    onChange={(e) => setEditPriority(parseInt(e.target.value))}
                    className="flex-1 accent-[#0086FF]"
                  />
                  <span className="w-12 text-center rounded-lg border border-white/10 bg-[#070a13] py-1 text-xs font-bold text-[#38bdf8]">
                    {editPriority}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="editEnabled"
                  checked={editEnabled}
                  onChange={(e) => setEditEnabled(e.target.checked)}
                  className="rounded accent-[#0086FF]"
                />
                <label htmlFor="editEnabled" className="text-xs text-slate-300 cursor-pointer">
                  Provider is Active and Enabled
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowEditModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={editSubmitting}
                  className="rounded-xl bg-[#0086FF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0075ED] disabled:opacity-50"
                >
                  {editSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. Modal: Add Manual Custom Model */}
      {/* ========================================================================= */}
      {showAddModelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
          <div className="w-full max-w-md rounded-3xl border border-white/15 bg-[#0c1222] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Plus className="h-4 w-4 text-[#38bdf8]" />
                Add Custom Model ID: {showAddModelModal.name}
              </h3>
              <button onClick={() => setShowAddModelModal(null)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleAddManualModel} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Model Identifier <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. gpt-4o, llama-3.3-70b, deepseek-coder"
                  value={manualModelId}
                  onChange={(e) => setManualModelId(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 text-xs text-white focus:border-[#0086FF] focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Llama 3.3 70B Fast"
                  value={manualDisplayName}
                  onChange={(e) => setManualDisplayName(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#070a13] px-3 py-2 text-xs text-white focus:border-[#0086FF] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Model Priority (1 - 100)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={manualPriority}
                    onChange={(e) => setManualPriority(parseInt(e.target.value))}
                    className="flex-1 accent-[#0086FF]"
                  />
                  <span className="w-12 text-center rounded-lg border border-white/10 bg-[#070a13] py-1 text-xs font-bold text-[#38bdf8]">
                    {manualPriority}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setShowAddModelModal(null)}
                  className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={manualSubmitting}
                  className="rounded-xl bg-[#0086FF] px-4 py-2 text-xs font-semibold text-white hover:bg-[#0075ED] disabled:opacity-50"
                >
                  {manualSubmitting ? "Adding..." : "Add Model"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
