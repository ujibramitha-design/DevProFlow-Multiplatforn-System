"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

export function LiveClock() {
  const [time, setTime] = useState<Date | null>(null)
  const [prevSecond, setPrevSecond] = useState(-1)

  useEffect(() => {
    setTime(new Date())
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) {
    return (
      <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-[13px] font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 dark:shadow-primary/25 dark:hover:shadow-primary/35">
        <Clock className="size-4 text-primary-foreground" strokeWidth={2} />
        <div className="h-4 w-16 rounded bg-primary-foreground/30 animate-pulse" />
      </button>
    )
  }

  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const seconds = time.getSeconds().toString().padStart(2, "0")
  const currentSecond = time.getSeconds()
  const shouldAnimate = currentSecond !== prevSecond

  if (shouldAnimate && prevSecond !== currentSecond) {
    // Trigger re-render tracking
    if (prevSecond !== currentSecond) {
      // We use a ref-like pattern via setState
      setTimeout(() => setPrevSecond(currentSecond), 0)
    }
  }

  const dayName = time.toLocaleDateString("id-ID", { weekday: "short" })
  const dateStr = time.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  })

  return (
    <button className="flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-[13px] font-bold text-primary-foreground shadow-md shadow-primary/15 transition-all duration-300 hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/20 dark:shadow-primary/25 dark:hover:shadow-primary/35">
      {/* Clock icon */}
      <Clock className="size-4 text-primary-foreground" strokeWidth={2} />

      {/* Time display */}
      <div className="flex items-baseline gap-0.5 font-mono">
        <span className="text-[13px] font-bold text-primary-foreground tabular-nums">
          {hours}
        </span>
        <span className="text-[13px] font-bold text-primary-foreground/80">:</span>
        <span className="text-[13px] font-bold text-primary-foreground tabular-nums">
          {minutes}
        </span>
        <span className="text-[13px] font-bold text-primary-foreground/80">:</span>
        <span key={seconds} className="text-[13px] font-bold text-primary-foreground tabular-nums">
          {seconds}
        </span>
      </div>
    </button>
  )
}
