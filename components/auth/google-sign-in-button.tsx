"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { api, User } from "@/lib/api";
import { Loader2 } from "lucide-react";

declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient: (config: {
            client_id: string;
            scope: string;
            callback: (response: { access_token?: string; error?: string }) => void;
            error_callback?: (err: unknown) => void;
          }) => {
            requestAccessToken: (overrideConfig?: { prompt?: string }) => void;
          };
        };
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          prompt: () => void;
        };
      };
    };
  }
}

interface GoogleSignInButtonProps {
  mode?: "signin" | "signup";
  onSuccess?: (user: User) => void;
  onError?: (error: string) => void;
  className?: string;
}

export function GoogleSignInButton({
  mode = "signin",
  onSuccess,
  onError,
  className = "",
}: GoogleSignInButtonProps) {
  const router = useRouter();
  const { loginWithGoogle } = useAuth();
  const [clientId, setClientId] = useState<string | null>(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || null
  );
  const [isConfigured, setIsConfigured] = useState<boolean>(true);
  const [isScriptReady, setIsScriptReady] = useState<boolean>(false);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const tokenClientRef = useRef<any>(null);

  // 1. Fetch provider configuration from backend if not set via env
  useEffect(() => {
    let mounted = true;

    if (clientId) {
      setIsConfigured(true);
      return;
    }

    api
      .getAuthProviders()
      .then((res) => {
        if (!mounted) return;
        if (res?.google?.enabled && res.google.client_id) {
          setClientId(res.google.client_id);
          setIsConfigured(true);
        } else {
          setIsConfigured(false);
        }
      })
      .catch(() => {
        if (mounted) setIsConfigured(false);
      });

    return () => {
      mounted = false;
    };
  }, [clientId]);

  // 2. Load Google Identity Services script
  useEffect(() => {
    if (!clientId) return;
    let mounted = true;

    const setupClients = () => {
      if (!window.google?.accounts?.oauth2) return;

      try {
        tokenClientRef.current = window.google.accounts.oauth2.initTokenClient({
          client_id: clientId,
          scope: "email profile openid",
          callback: async (resp: { access_token?: string; error?: string }) => {
            if (resp.error) {
              onError?.(resp.error);
              setIsAuthenticating(false);
              return;
            }
            if (resp.access_token) {
              try {
                setIsAuthenticating(true);
                const user = await loginWithGoogle(resp.access_token);
                if (onSuccess) {
                  onSuccess(user);
                } else {
                  if (user.role === "admin") {
                    router.push("/admin/providers");
                  } else {
                    router.push("/workspace");
                  }
                }
              } catch (err: unknown) {
                const msg =
                  err instanceof Error ? err.message : "Google authentication failed";
                onError?.(msg);
              } finally {
                if (mounted) setIsAuthenticating(false);
              }
            }
          },
          error_callback: (err: unknown) => {
            console.error("Google OAuth token error:", err);
            if (mounted) setIsAuthenticating(false);
          },
        });

        // Also initialize One Tap / ID Token client if available
        if (window.google?.accounts?.id) {
          window.google.accounts.id.initialize({
            client_id: clientId,
            callback: async (response: { credential: string }) => {
              try {
                setIsAuthenticating(true);
                const user = await loginWithGoogle(response.credential);
                if (onSuccess) {
                  onSuccess(user);
                } else {
                  router.push(user.role === "admin" ? "/admin/providers" : "/workspace");
                }
              } catch (err: unknown) {
                onError?.(err instanceof Error ? err.message : "Google authentication failed");
              } finally {
                if (mounted) setIsAuthenticating(false);
              }
            },
            auto_select: false,
            cancel_on_tap_outside: true,
          });
        }

        if (mounted) setIsScriptReady(true);
      } catch (err) {
        console.error("Failed to initialize Google clients:", err);
      }
    };

    if (window.google?.accounts?.oauth2) {
      setupClients();
      return;
    }

    const scriptId = "google-gsi-client";
    const existingScript = document.getElementById(scriptId);
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (mounted) setupClients();
      };
      script.onerror = () => {
        if (mounted) onError?.("Unable to load Google Identity Service");
      };
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", setupClients);
    }

    return () => {
      mounted = false;
    };
  }, [clientId, loginWithGoogle, onSuccess, onError, router]);

  const handleClick = () => {
    if (isAuthenticating) return;

    if (!isConfigured || !clientId) {
      onError?.(
        "Google Sign-In is not configured yet. Set GOOGLE_CLIENT_ID in your environment."
      );
      return;
    }

    if (tokenClientRef.current) {
      tokenClientRef.current.requestAccessToken({ prompt: "" });
    } else if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    } else {
      onError?.("Google authentication service is initializing. Please try again in a moment.");
    }
  };

  const buttonLabel = mode === "signup" ? "Sign up with Google" : "Continue with Google";

  return (
    <div className={`w-full ${className}`}>
      <button
        type="button"
        onClick={handleClick}
        disabled={isAuthenticating}
        aria-label={buttonLabel}
        className="group relative flex w-full items-center justify-center gap-3 rounded-full border border-white/12 bg-gradient-to-b from-[#161f36]/90 to-[#0e1628]/95 px-4 py-2.5 sm:py-3 text-sm font-medium text-slate-100 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-xl transition-all duration-200 hover:border-[#0086FF]/50 hover:from-[#1b2642] hover:to-[#121c33] hover:text-white hover:shadow-[0_0_20px_rgba(0,134,255,0.15)] active:scale-[0.985] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
      >
        {isAuthenticating ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin text-[#0086FF]" />
            <span className="truncate text-xs sm:text-sm font-medium text-slate-300">
              Connecting with Google...
            </span>
          </>
        ) : (
          <>
            {/* Crisp Google multicolor SVG brand icon */}
            <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-transform duration-200 group-hover:scale-105">
              <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.15z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
            </div>
            <span className="truncate text-xs sm:text-sm font-semibold tracking-tight">
              {buttonLabel}
            </span>
          </>
        )}
      </button>
    </div>
  );
}
