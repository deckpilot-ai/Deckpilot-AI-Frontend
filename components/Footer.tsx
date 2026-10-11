import Link from "next/link";
import { Sparkles, Mail, ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050811] pt-16 pb-12 text-xs text-slate-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 pb-12 border-b border-white/5">
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2.5 group">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-tr from-[#0086FF] to-[#38bdf8] shadow-md shadow-[#0086FF]/30 group-hover:scale-105 transition-transform">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="text-base font-bold tracking-tight text-white">
                deckpilot<span className="text-[#0086FF]">AI</span>
              </span>
            </Link>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Founded in August 2025. Autonomous AI presentation engineering with multi-agent orchestration, Minto narrative structuring, and deterministic OpenXML PowerPoint generation.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-3">
              <a
                href="mailto:contact@deckpilotai.com"
                className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300 hover:text-white hover:border-[#0086FF]/40 hover:bg-[#0086FF]/10 transition-colors"
              >
                <Mail className="h-3.5 w-3.5 text-[#38bdf8]" />
                <span>contact@deckpilotai.com</span>
              </a>
            </div>

            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400 font-mono">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All Systems Operational
              </span>
            </div>
          </div>

          {/* Column: Product */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Product
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/product" className="hover:text-white transition-colors">
                  Platform Overview
                </Link>
              </li>
              <li>
                <Link href="/#hero-showcase" className="hover:text-white transition-colors">
                  Interactive Cockpit
                </Link>
              </li>
              <li>
                <Link href="/product#features" className="hover:text-white transition-colors">
                  Core Capabilities
                </Link>
              </li>
              <li>
                <Link href="/product#roadmap" className="hover:text-white transition-colors">
                  Product Roadmap
                </Link>
              </li>
              <li>
                <Link href="/workspace" className="hover:text-white transition-colors inline-flex items-center gap-1 text-[#38bdf8]">
                  <span>Launch Workspace</span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Solutions */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Solutions
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/solutions#founders" className="hover:text-white transition-colors">
                  Startup Founders
                </Link>
              </li>
              <li>
                <Link href="/solutions#consultants" className="hover:text-white transition-colors">
                  Management Consultants
                </Link>
              </li>
              <li>
                <Link href="/solutions#executives" className="hover:text-white transition-colors">
                  Corporate Executives
                </Link>
              </li>
              <li>
                <Link href="/solutions#gtm" className="hover:text-white transition-colors">
                  Sales & GTM Teams
                </Link>
              </li>
              <li>
                <Link href="/solutions" className="hover:text-white transition-colors">
                  All Solution Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Technology */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Technology
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/technology" className="hover:text-white transition-colors">
                  Architecture Stack
                </Link>
              </li>
              <li>
                <Link href="/technology#agents" className="hover:text-white transition-colors">
                  Multi-Agent Mesh
                </Link>
              </li>
              <li>
                <Link href="/technology#compiler" className="hover:text-white transition-colors">
                  Deterministic PPTX
                </Link>
              </li>
              <li>
                <Link href="/technology#qa" className="hover:text-white transition-colors">
                  124 QA Checkpoints
                </Link>
              </li>
              <li>
                <Link href="/technology#models" className="hover:text-white transition-colors">
                  Multi-Model Routing
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Company & Legal */}
          <div className="space-y-3">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-white">
              Company
            </div>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-white transition-colors">
                  Security Architecture
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-center sm:text-left">
            <span>© 2026 DeckPilotAI. All rights reserved.</span>
            <span>•</span>
            <span>Founded August 2025</span>
            <span>•</span>
            <span>Autonomous Presentation Engineering</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[10px] text-slate-500">
            <span>FastAPI Core</span>
            <span>•</span>
            <span>Turso libSQL</span>
            <span>•</span>
            <span>Cloudflare R2</span>
            <span>•</span>
            <span>AWS Lightsail</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
