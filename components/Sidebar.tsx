"use client";

import { useState } from "react";
import Link from "next/link";
import { Project } from "@/lib/api";
import {
  Plus,
  Presentation,
  Trash2,
  Search,
  Sparkles,
  ChevronRight,
  LogOut,
  ShieldAlert,
  Cpu,
} from "lucide-react";

import { useAuth } from "@/lib/auth-context";

interface SidebarProps {
  projects: Project[];
  activeProjectId: string | null;
  onSelectProject: (id: string) => void;
  onNewProject: () => void;
  onDeleteProject: (id: string, e: React.MouseEvent) => void;
}

export function Sidebar({
  projects,
  activeProjectId,
  onSelectProject,
  onNewProject,
  onDeleteProject,
}: SidebarProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const { user, logout } = useAuth();

  const filteredProjects = projects.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <aside className="flex h-full w-[min(18rem,85vw)] lg:w-64 xl:w-72 flex-col border-r border-white/10 bg-[#080d18]">
      {/* Brand Header */}
      <div className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 px-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] shadow-md shadow-[#0086FF]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-bold text-base text-white tracking-tight">
            deckpilot<span className="text-[#0086FF]">AI</span>
          </span>
        </Link>
      </div>

      {/* New Project CTA - TokenRouter Pill Button */}
      <div className="p-3">
        <button
          type="button"
          onClick={onNewProject}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0086FF] px-4 py-2.5 text-xs font-semibold text-white shadow-md shadow-[#0086FF]/25 hover:bg-[#0075ED] hover:scale-[1.01] active:scale-[0.99] transition-all cursor-pointer"
        >
          <Plus className="h-4 w-4" />
          <span>New presentation</span>
        </button>
      </div>

      {/* Search Input - Pill styled */}
      <div className="px-3 py-1">
        <div className="relative">
          <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-slate-500" />
          <input
            aria-label="Search presentations"
            type="text"
            placeholder="Search decks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-white/10 bg-[#0c1222] py-2 pl-9 pr-3 text-xs text-slate-200 placeholder-slate-500 focus:border-[#0086FF] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Projects List */}
      <div className="min-h-0 flex-1 overflow-y-auto px-3 py-2 space-y-1">
        <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
          Recent Projects
        </div>

        {filteredProjects.length === 0 ? (
          <div className="px-3 py-6 text-center text-xs text-slate-400">
            {searchTerm ? "No matching presentations" : "No presentations yet"}
          </div>
        ) : (
          filteredProjects.map((p) => {
            const isActive = p.id === activeProjectId;
            return (
              <div key={p.id} className="group flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onSelectProject(p.id)}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-w-0 flex-1 items-center justify-between rounded-xl px-3 py-2.5 text-left text-xs transition-all ${
                  isActive
                    ? "bg-[#0086FF]/15 border border-[#0086FF]/40 text-white font-medium shadow-sm shadow-[#0086FF]/10"
                    : "text-slate-300 hover:bg-white/5 hover:text-white border border-transparent"
                }`}
                >
                <span className="flex items-center gap-2.5 overflow-hidden">
                  <Presentation
                    className={`h-3.5 w-3.5 shrink-0 ${
                      isActive ? "text-[#38bdf8]" : "text-slate-500 group-hover:text-slate-300"
                    }`}
                  />
                  <span className="truncate">{p.title}</span>
                </span>
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-slate-400" />
                </button>
                <button
                  type="button"
                  onClick={(e) => onDeleteProject(p.id, e)}
                  aria-label={`Delete ${p.title}`}
                  className="rounded-lg p-2 text-slate-400 opacity-70 transition-all hover:text-red-400 focus:opacity-100 group-hover:opacity-100 [@media(hover:hover)]:opacity-0"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* Footer User Menu */}
      {user && (
        <div className="shrink-0 border-t border-white/10 p-3 flex flex-col gap-2 bg-[#060912]">
          {user.role === "admin" && (
            <div className="flex flex-col gap-1.5">
              <Link
                href="/admin/providers"
                className="flex items-center gap-2 rounded-lg border border-[#0086FF]/30 bg-[#0086FF]/10 px-3 py-1.5 text-[11px] font-medium text-[#38bdf8] hover:bg-[#0086FF]/20 transition-all"
              >
                <Cpu className="h-3 w-3 shrink-0" />
                AI Providers & Models
              </Link>
              <Link
                href="/admin/logs"
                className="flex items-center gap-2 rounded-lg border border-amber-500/25 bg-amber-500/10 px-3 py-1.5 text-[11px] font-medium text-amber-300 hover:bg-amber-500/20 transition-all"
              >
                <ShieldAlert className="h-3 w-3 shrink-0" />
                Production Logs
              </Link>
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="truncate text-xs font-medium text-slate-200">
                {user.email}
              </span>
              <span className="text-[10px] text-slate-400 capitalize">
                {user.role} plan
              </span>
            </div>
            <button
              type="button"
              onClick={() => void logout()}
              title="Sign out"
              aria-label="Sign out"
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
