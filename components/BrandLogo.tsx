"use client";

import Image from "next/image";

interface BrandLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showBadge?: boolean;
}

export function BrandLogo({
  className = "",
  size = "md",
  showText = true,
  showBadge = false,
}: BrandLogoProps) {
  const sizeMap = {
    sm: { mark: "h-7 w-7", imgSize: 28, text: "text-sm", badgeText: "text-[9px]" },
    md: { mark: "h-8 w-8", imgSize: 32, text: "text-base", badgeText: "text-[10px]" },
    lg: { mark: "h-10 w-10", imgSize: 40, text: "text-lg", badgeText: "text-xs" },
    xl: { mark: "h-14 w-14", imgSize: 56, text: "text-2xl", badgeText: "text-xs" },
  };

  const currentSize = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 ${className}`}>
      {/* High-Tech Logo Mark Emblem */}
      <div
        className={`relative ${currentSize.mark} shrink-0 rounded-xl overflow-hidden border border-[#0086FF]/40 bg-[#090e1a] shadow-md shadow-[#0086FF]/25 group-hover:scale-105 group-hover:border-[#0086FF]/70 group-hover:shadow-[#0086FF]/40 transition-all duration-300 ring-1 ring-white/10`}
      >
        <Image
          src="/logo-mark.jpg"
          alt="DeckPilotAI Emblem"
          width={currentSize.imgSize}
          height={currentSize.imgSize}
          className="h-full w-full object-cover"
          priority
        />
      </div>

      {/* Brand Typography */}
      {showText && (
        <div className="flex items-center gap-2">
          <span className={`${currentSize.text} font-extrabold tracking-tight text-white`}>
            deckpilot
            <span className="bg-gradient-to-r from-[#0086FF] via-[#38bdf8] to-cyan-300 bg-clip-text text-transparent">
              AI
            </span>
          </span>

          {showBadge && (
            <span
              className={`hidden sm:inline-flex items-center rounded-full border border-[#0086FF]/30 bg-[#0086FF]/10 px-2 py-0.5 ${currentSize.badgeText} font-medium text-[#38bdf8]`}
            >
              Startup
            </span>
          )}
        </div>
      )}
    </div>
  );
}
