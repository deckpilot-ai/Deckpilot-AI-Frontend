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
        id: {
          initialize: (config: {
            client_id: string;
            callback: (response: { credential: string }) => void;
            auto_select?: boolean;
            cancel_on_tap_outside?: boolean;
          }) => void;
          renderButton: (
            element: HTMLElement,
            options: {
              type?: "standard" | "icon";
              theme?: "outline" | "filled_blue" | "filled_black";
              size?: "large" | "medium" | "small";
              text?: "signin_with" | "signup_with" | "continue_with" | "signin";
              shape?: "rectangular" | "pill" | "circle" | "square";
              logo_alignment?: "left" | "center";
              width?: number | string;
              locale?: string;
            }
          ) => void;
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
  const [isLoadingScript, setIsLoadingScript] = useState<boolean>(true);
  const [isAuthenticating, setIsAuthenticating] = useState<boolean>(false);
  const buttonContainerRef = useRef<HTMLDivElement>(null);

  // 1. Fetch provider configuration from backend if not already set via env
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
          setIsLoadingScript(false);
        }
      })
      .catch(() => {
        if (mounted) {
          setIsConfigured(false);
          setIsLoadingScript(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [clientId]);

  // 2. Load Google Identity Services script
  useEffect(() => {
    if (!clientId) return;

    let mounted = true;

    const initGoogleAuth = () => {
      if (!window.google?.accounts?.id || !buttonContainerRef.current) return;

      try {
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: async (response: { credential: string }) => {
            try {
              setIsAuthenticating(true);
              const user = await loginWithGoogle(response.credential);
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
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        // Clear any previous render
        if (buttonContainerRef.current) {
          buttonContainerRef.current.innerHTML = "";
          window.google.accounts.id.renderButton(buttonContainerRef.current, {
            type: "standard",
            theme: "filled_black",
            size: "large",
            text: mode === "signup" ? "signup_with" : "continue_with",
            shape: "pill",
            logo_alignment: "left",
            width: 360,
          });
        }
      } catch (err) {
        console.error("Failed to initialize Google Sign-In:", err);
      } finally {
        if (mounted) setIsLoadingScript(false);
      }
    };

    if (window.google?.accounts?.id) {
      initGoogleAuth();
      return;
    }

    // Check if script element already exists
    const existingScript = document.getElementById("google-gsi-client");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "google-gsi-client";
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = () => {
        if (mounted) initGoogleAuth();
      };
      script.onerror = () => {
        if (mounted) {
          setIsLoadingScript(false);
          onError?.("Unable to load Google Identity Service");
        }
      };
      document.body.appendChild(script);
    } else {
      existingScript.addEventListener("load", initGoogleAuth);
    }

    return () => {
      mounted = false;
    };
  }, [clientId, mode, loginWithGoogle, onSuccess, onError, router]);

  const handleCustomClick = () => {
    if (isAuthenticating) return;
    if (!isConfigured || !clientId) {
      onError?.(
        "Google Sign-In is not configured yet. Set GOOGLE_CLIENT_ID in your environment."
      );
      return;
    }
    if (window.google?.accounts?.id) {
      window.google.accounts.id.prompt();
    }
  };

  return (
    <div className={`w-full flex flex-col items-center ${className}`}>
      {/* Container where Google's official GIS button will mount */}
      <div
        ref={buttonContainerRef}
        className="w-full flex justify-center [&>div]:!w-full [&>div]:!max-w-full [&_iframe]:!mx-auto"
        style={{ minHeight: "44px" }}
      />

      {/* Fallback button shown during loading or if Google GIS is unconfigured or blocked */}
      {(!clientId || isLoadingScript || isAuthenticating) && (
        <button
          type="button"
          onClick={handleCustomClick}
          disabled={isAuthenticating}
          className="w-full flex items-center justify-center gap-3 rounded-full border border-white/15 bg-white/5 py-2.5 px-4 text-sm font-medium text-slate-200 shadow-sm backdrop-blur-md hover:bg-white/10 hover:border-white/25 active:scale-[0.99] transition-all cursor-pointer disabled:opacity-50"
        >
          {isAuthenticating ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-[#0086FF]" />
              <span>Authenticating with Google...</span>
            </>
          ) : (
            <>
              {/* Google multicolor SVG logo */}
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
              <span>
                {mode === "signup" ? "Sign up with Google" : "Continue with Google"}
              </span>
            </>
          )}
        </button>
      )}
    </div>
  );
}
