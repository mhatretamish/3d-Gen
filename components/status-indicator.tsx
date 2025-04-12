"use client"

import { useEffect, useState } from "react"
import ProgressBar from "./progress-bar"

interface StatusIndicatorProps {
  isLoading: boolean
  jobStatuses: Array<{ uuid: string; status: string }>
}

export default function StatusIndicator({ isLoading, jobStatuses }: StatusIndicatorProps) {
  const [statusText, setStatusText] = useState("Initializing...")
  const [dots, setDots] = useState("")

  useEffect(() => {
    if (!isLoading) return

    // Update status text based on job progress
    if (jobStatuses.length === 0) {
      setStatusText("Initializing")
    } else if (jobStatuses.every((job) => job.status === "Done")) {
      setStatusText("Finalizing")
    } else {
      setStatusText("Generating 3D model")
    }

    // Animated dots
    const interval = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."))
    }, 500)

    return () => clearInterval(interval)
  }, [isLoading, jobStatuses])

  if (!isLoading) {
    return null
  }

  // Add one additional task to the total count
  const actualTasks = jobStatuses.length
  const totalTasks = actualTasks > 0 ? actualTasks + 1 : 0

  // Count the first task (initial request) as completed when we have job statuses
  const completedJobTasks = jobStatuses.filter((job) => job.status === "Done").length
  const initialRequestComplete = actualTasks > 0 ? 1 : 0
  const completedTasks = completedJobTasks + initialRequestComplete

  const showProgress = actualTasks > 0
  const isIndeterminate = actualTasks === 0

  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20">
      <div className="w-80 flex flex-col items-center gap-4">
        <div className="text-center">
          <h3 className="text-xl font-mono text-cyan-400 animate-pulse mb-1">
            {statusText}
            <span>{dots}</span>
          </h3>
          <p className="text-sm text-white/70">
            {showProgress ? `Processing ${completedTasks} of ${totalTasks} tasks` : "Preparing your model"}
          </p>
        </div>
        <ProgressBar
          totalTasks={totalTasks}
          completedTasks={completedTasks}
          isIndeterminate={isIndeterminate}
          className="h-3"
        />
      </div>
    </div>
  )
}
