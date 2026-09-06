"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { Sparkles, LogOut, Layout, User as UserIcon, ArrowRight } from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2">
      <div className="mx-auto flex min-h-14 max-w-6xl flex-wrap gap-2 items-center justify-between rounded-3xl py-2 border border-white/10 bg-[#090e1a]/85 px-4 sm:px-6 backdrop-blur-xl shadow-2xl shadow-black/40 transition-all">
        {/* Brand Logo */}
        <Link href="/" className="flex shrink-0 items-center gap-2 text-decoration-none group">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] shadow-md shadow-[#0086FF]/30 group-hover:scale-105 transition-transform">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-base font-bold tracking-tight text-white">
              deckpilot<span className="text-[#0086FF]">AI</span>
            </span>
            <span className="hidden sm:inline-flex items-center rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-2 py-0.5 text-[10px] font-medium text-[#38bdf8]">
              v2.0
            </span>
          </div>
        </Link>

        {/* Center Nav Links */}
        <nav className="order-last grid grid-cols-2 min-[480px]:flex w-full items-center justify-between gap-x-5 gap-y-2 py-1 lg:order-none lg:w-auto lg:py-0 lg:gap-6 text-xs font-medium text-slate-300">
          <a
            href="#hero-showcase"
            className="hover:text-white transition-colors"
          >
            Live Pipeline
          </a>
          <a
            href="#features"
            className="hover:text-white transition-colors"
          >
            Capabilities
          </a>
          <a
            href="#architecture"
            className="hover:text-white transition-colors"
          >
            Architecture
          </a>
          <a
            href="#playground"
            className="hover:text-white transition-colors"
          >
            Playground
          </a>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/workspace"
                className="flex items-center gap-1.5 rounded-full bg-[#0086FF] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0075ED] transition-all shadow-md shadow-[#0086FF]/25 cursor-pointer"
              >
                <Layout className="h-3.5 w-3.5" />
                <span>Workspace</span>
              </Link>
              <div className="hidden xl:flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0c1222] px-3 py-1 text-[11px] text-slate-300">
                <UserIcon className="h-3 w-3 text-slate-400" />
                <span className="max-w-[120px] truncate">{user.email}</span>
                {user.role === "admin" && (
                  <span className="rounded-full bg-[#0086FF]/20 px-1.5 py-0.2 text-[9px] font-semibold text-[#38bdf8] border border-[#0086FF]/30">
                    ADMIN
                  </span>
                )}
              </div>
              <button
                onClick={logout}
                title="Log out"
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-slate-400 hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/30 transition-all cursor-pointer"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="rounded-full px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="flex items-center gap-1 rounded-full bg-[#0086FF] px-3 py-1.5 text-xs font-medium text-white hover:bg-[#0075ED] transition-all shadow-md shadow-[#0086FF]/25 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
