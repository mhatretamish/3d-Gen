"use client"

import { cn } from "@/lib/utils"

interface ProgressBarProps {
  totalTasks: number
  completedTasks: number
  className?: string
  isIndeterminate?: boolean
}

export default function ProgressBar({
  totalTasks,
  completedTasks,
  className,
  isIndeterminate = false,
}: ProgressBarProps) {
  // Calculate percentage
  const percentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <div
      className={cn("w-full bg-black/50 rounded-full h-2 overflow-hidden border border-cyan-900/50 p-[1px]", className)}
    >
      {isIndeterminate ? (
        <div className="h-full relative w-full">
          <div className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 absolute w-[40%] animate-progress-indeterminate rounded-full" />
        </div>
      ) : (
        <div
          className="h-full bg-gradient-to-r from-cyan-500 to-cyan-300 transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      )}
    </div>
  )
}
