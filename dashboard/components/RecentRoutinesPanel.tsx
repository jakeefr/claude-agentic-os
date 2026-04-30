'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface RoutineRun {
  id: string
  routineId: string
  status: 'running' | 'completed' | 'failed'
  startedAt: number
  completedAt: number | null
  outputPreview: string | null
  cost: number | null
}

interface RoutineWithStatus {
  id: string
  name: string
  scheduleHuman: string
  todayStatus: string
  isRunning: boolean
  lastRun: { at: number; status: string } | null
}

function timeStr(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago',
  })
}

const statusColors: Record<string, string> = {
  running: '#D97706',
  completed: '#10B981',
  failed: '#ef4444',
  pending: '#4B5563',
}

export function RecentRoutinesPanel({ refreshKey }: { refreshKey: number }) {
  const [recentRuns, setRecentRuns] = useState<RoutineRun[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch('/api/routines')
      if (res.ok) {
        const data = await res.json()
        setRecentRuns(data.recentRuns ?? [])
      }
    } catch {}
  }, [])

  useEffect(() => { fetchData() }, [fetchData, refreshKey])

  useEffect(() => {
    const hasRunning = recentRuns.some((r) => r.status === 'running')
    if (!hasRunning) return
    const interval = setInterval(fetchData, 3000)
    return () => clearInterval(interval)
  }, [recentRuns, fetchData])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          RECENT ROUTINES
        </span>
        <span className="text-[11px] text-[#4B5563]">{recentRuns.length}</span>
      </div>

      {recentRuns.length === 0 ? (
        <p className="text-[12px] text-[#333] py-6 text-center">NO ROUTINE RUNS YET</p>
      ) : (
        <div className="space-y-0">
          <AnimatePresence initial={false}>
            {recentRuns.slice(0, 6).map((run) => (
              <motion.div
                key={run.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => setExpanded(expanded === run.id ? null : run.id)}
                  className="w-full flex items-center gap-4 py-2.5 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left"
                >
                  <span className="text-[11px] text-[#6B7280] shrink-0 w-14 font-medium">
                    {timeStr(run.startedAt)}
                  </span>
                  <div
                    className="h-1.5 w-1.5 shrink-0"
                    style={{ background: statusColors[run.status] }}
                  />
                  <span className="text-[12px] text-white truncate flex-1">{run.routineId}</span>
                  {run.cost != null && (
                    <span className="text-[10px] text-[#6B7280] shrink-0 mr-4">
                      ${run.cost.toFixed(2)}
                    </span>
                  )}
                </button>
                <AnimatePresence>
                  {expanded === run.id && run.outputPreview && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <pre className="text-[11px] text-[#6B7280] p-4 bg-[#080808] border border-[rgba(255,255,255,0.04)] whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                        {run.outputPreview}
                      </pre>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  )
}
