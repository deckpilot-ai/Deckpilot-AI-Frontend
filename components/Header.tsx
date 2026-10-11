"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { BrandLogo } from "@/components/BrandLogo";
import {
  LogOut,
  Layout,
  User as UserIcon,
  ArrowRight,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";

export function Header() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Product", href: "/product" },
    { label: "Solutions", href: "/solutions" },
    { label: "Technology", href: "/technology" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full px-4 sm:px-6 pt-4 pb-2">
      <div className="mx-auto flex min-h-14 max-w-6xl items-center justify-between rounded-full border border-white/10 bg-[#090e1a]/90 px-4 sm:px-6 py-2 backdrop-blur-xl shadow-2xl shadow-black/50 transition-all">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex shrink-0 items-center text-decoration-none group"
          onClick={() => setMobileMenuOpen(false)}
        >
          <BrandLogo size="md" showBadge={true} />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2 text-xs font-medium text-slate-300">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-1.5 transition-all ${
                  active
                    ? "bg-white/10 text-white font-semibold shadow-inner"
                    : "text-slate-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center gap-2">
          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/workspace"
                className="flex items-center gap-1.5 rounded-full bg-[#0086FF] px-3.5 py-1.5 text-xs font-medium text-white hover:bg-[#0075ED] transition-all shadow-md shadow-[#0086FF]/25 cursor-pointer"
              >
                <Layout className="h-3.5 w-3.5" />
                <span>Workspace</span>
              </Link>
              <div className="hidden lg:flex items-center gap-1.5 rounded-full border border-white/10 bg-[#0c1222] px-3 py-1 text-[11px] text-slate-300">
                <UserIcon className="h-3 w-3 text-slate-400" />
                <span className="max-w-[120px] truncate">{user.email}</span>
                {user.role === "admin" && (
                  <Link
                    href="/admin/providers"
                    className="flex items-center gap-1 rounded-full bg-[#0086FF]/20 px-2 py-0.5 text-[10px] font-semibold text-[#38bdf8] border border-[#0086FF]/30 hover:bg-[#0086FF]/30 transition-colors"
                    title="AI Provider & Model Configuration"
                  >
                    <span>ADMIN AI</span>
                  </Link>
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
                className="flex items-center gap-1 rounded-full bg-[#0086FF] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#0075ED] transition-all shadow-md shadow-[#0086FF]/25 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center gap-2">
          {user ? (
            <Link
              href="/workspace"
              className="flex items-center gap-1 rounded-full bg-[#0086FF] px-3 py-1 text-xs font-medium text-white"
            >
              <Layout className="h-3 w-3" />
              <span>App</span>
            </Link>
          ) : (
            <Link
              href="/register"
              className="rounded-full bg-[#0086FF] px-3 py-1 text-xs font-medium text-white"
            >
              Get Started
            </Link>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 mx-auto max-w-6xl rounded-2xl border border-white/10 bg-[#090e1a]/95 p-4 backdrop-blur-2xl shadow-2xl animate-in fade-in slide-in-from-top-2 duration-150">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => {
              const active = isActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-white font-semibold"
                      : "text-slate-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="h-4 w-4 text-slate-500" />
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-2">
            {user ? (
              <div className="space-y-2">
                <div className="px-3.5 py-1 text-xs text-slate-400 truncate">
                  Signed in as <span className="text-white font-medium">{user.email}</span>
                </div>
                <Link
                  href="/workspace"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-xl bg-[#0086FF] px-4 py-2 text-sm font-medium text-white"
                >
                  <Layout className="h-4 w-4" />
                  <span>Launch Workspace</span>
                </Link>
                {user.role === "admin" && (
                  <Link
                    href="/admin/providers"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1 rounded-xl border border-[#0086FF]/30 bg-[#0086FF]/10 px-4 py-2 text-xs font-semibold text-[#38bdf8]"
                  >
                    <span>ADMIN AI PROVIDERS</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    logout();
                  }}
                  className="w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-xs text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="h-3.5 w-3.5" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl border border-white/10 px-4 py-2 text-xs font-medium text-slate-200 hover:bg-white/5 text-center"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center rounded-xl bg-[#0086FF] px-4 py-2 text-xs font-medium text-white text-center shadow-md shadow-[#0086FF]/25"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
