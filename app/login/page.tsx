"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api } from "@/lib/api";
import { Sparkles, ArrowRight, Lock, Mail, AlertCircle, Loader2 } from "lucide-react";


export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await login({ email, password });
      try {
        const me = await api.getMe();
        if (me.role === "admin") {
          router.push("/admin/providers");
          return;
        }
      } catch {
        // Default to workspace if getMe check fails
      }
      router.push("/workspace");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Invalid email or password");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-[#070a13] bg-dot-grid px-4 py-6 sm:py-12 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#0086FF]/15 blur-[140px]" />

      {/* Brand Header */}
      <Link href="/" className="mb-8 flex items-center gap-2.5 group">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] shadow-lg shadow-[#0086FF]/30 group-hover:scale-105 transition-transform">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-bold tracking-tight text-white">
            deckpilot<span className="text-[#0086FF]">AI</span>
          </span>
          <span className="text-[10px] text-slate-400 font-mono tracking-wider uppercase">
            From Prompt to Presentation
          </span>
        </div>
      </Link>

      {/* Glassmorphic Card */}
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#0c1222]/90 p-5 sm:p-8 shadow-2xl backdrop-blur-2xl">
        <div className="mb-6 text-center">
          <h1 className="text-xl font-bold text-white tracking-tight">Sign in to your account</h1>
          <p className="mt-1 text-xs text-slate-400">
            Access your AI presentations or administrator control console
          </p>
        </div>


        {error && (
          <div role="alert" aria-live="polite" className="mb-5 flex items-center gap-2.5 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-xs text-red-300">
            <AlertCircle className="h-4 w-4 shrink-0 text-red-400" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="login-email" className="mb-1.5 block text-xs font-medium text-slate-300">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full rounded-full border border-white/10 bg-[#080d18] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#0086FF] focus:ring-1 focus:ring-[#0086FF] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-slate-300">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                required
                maxLength={128}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-full border border-white/10 bg-[#080d18] py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-[#0086FF] focus:ring-1 focus:ring-[#0086FF] focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#0086FF] py-3 text-sm font-semibold text-white shadow-lg shadow-[#0086FF]/30 hover:bg-[#0075ED] disabled:opacity-50 transition-all cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Signing in...</span>
              </>
            ) : (
              <>
                <span>Sign In</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center text-xs text-slate-400">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-[#38bdf8] hover:underline"
          >
            Create one free
          </Link>
        </div>
      </div>
    </div>
  );
}
