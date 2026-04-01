"use client"

import { cn } from "@/lib/utils"

interface Logo3DProps {
  collapsed?: boolean
}

export function Logo3D({ collapsed = false }: Logo3DProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-3",
        collapsed && "justify-center"
      )}
    >
      {/* 3D Logo Container */}
      <div className="relative" style={{ perspective: "1200px" }}>
        {/* Ambient glow layer - softer backdrop */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 blur-2xl" style={{ animation: "glow-pulse 3s ease-in-out infinite" }} />

        {/* Main 3D cube with enhanced depth */}
        <div className="animate-float relative" style={{ animation: "float 6s ease-in-out infinite" }}>
          <div
            className="relative flex size-11 items-center justify-center rounded-2xl transition-all duration-300 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, var(--primary) 0%, #00d9ff 50%, oklch(0.45 0.12 260) 100%)",
              transformStyle: "preserve-3d",
              boxShadow: `
                0 20px 40px -10px rgba(0, 217, 255, 0.3),
                inset -2px -2px 8px rgba(0, 0, 0, 0.3),
                inset 2px 2px 8px rgba(255, 255, 255, 0.1)
              `,
              filter: "drop-shadow(0 10px 20px rgba(0, 217, 255, 0.2))",
            }}
          >
            {/* Top glossy reflection */}
            <div
              className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
              style={{
                background: "linear-gradient(180deg, rgba(255,255,255,0.4) 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
              }}
            />

            {/* Inner depth shadow (3D bottom face) */}
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.1), transparent 60%)",
                transformStyle: "preserve-3d",
                transform: "translateZ(2px)",
              }}
            />

            {/* Side depth edge */}
            <div
              className="absolute -bottom-1 -right-1 size-11 rounded-2xl opacity-60"
              style={{
                background: "linear-gradient(135deg, oklch(0.35 0.10 260), oklch(0.25 0.08 260))",
                zIndex: -1,
              }}
            />

            {/* Letter with premium styling */}
            <span className="relative text-[18px] font-black tracking-tighter text-white drop-shadow-[0_2px_8px_rgba(0,217,255,0.4)]" style={{ textShadow: "0 2px 4px rgba(0,0,0,0.5)" }}>
              K
            </span>

            {/* Corner accent light */}
            <div className="absolute -right-0.5 -top-0.5 flex size-4 items-center justify-center">
              <div className="absolute size-2.5 rounded-full bg-cyan-300/60 blur-md" style={{ animation: "glow-pulse 2s ease-in-out infinite" }} />
              <div className="size-1 rounded-full bg-cyan-200" />
            </div>
          </div>
        </div>

        {/* Premium status indicator */}
        <div className="absolute -bottom-0.5 -right-0.5 z-10 size-3 rounded-full border-2 border-card bg-gradient-to-br from-emerald-400 to-emerald-500 dark:from-emerald-500 dark:to-emerald-600">
          <div className="absolute inset-0 rounded-full bg-emerald-400 dark:bg-emerald-500" style={{ animation: "dot-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite" }} />
        </div>
      </div>

      {/* Brand text */}
      {!collapsed && (
        <div className="overflow-hidden animate-slide-in-right">
          <h1 className="text-[16px] font-black tracking-tight text-foreground leading-none">
            Devproflow
          </h1>
          <div className="mt-1 flex items-center gap-1.5">
            <div className="h-px w-3 bg-gradient-to-r from-primary/60 to-transparent" />
            <p className="text-[9px] font-bold tracking-[0.2em] uppercase text-muted-foreground/60">
              Enterprise
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
