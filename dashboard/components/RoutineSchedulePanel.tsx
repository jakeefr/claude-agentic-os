'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'

interface RoutineWithStatus {
  id: string
  name: string
  description: string
  scheduleHuman: string
  category: string
  estimatedMinutes: number
  estimatedCost: number
  enabled: boolean
  todayStatus: string
  isRunning: boolean
  lastRun: { at: number; status: string } | null
}

const statusColors: Record<string, string> = {
  running: '#D97706',
  completed: '#10B981',
  failed: '#ef4444',
  pending: '#4B5563',
}

const statusLabels: Record<string, string> = {
  running: 'RUNNING',
  completed: 'DONE',
  failed: 'FAILED',
  pending: 'PENDING',
}

function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}

export function RoutineSchedulePanel({ refreshKey }: { refreshKey: number }) {
  const [routines, setRoutines] = useState<RoutineWithStatus[]>([])
  const [triggering, setTriggering] = useState<string | null>(null)

  const fetchRoutines = useCallback(async () => {
    try {
      const res = await fetch('/api/routines')
      if (res.ok) {
        const data = await res.json()
        setRoutines(data.routines ?? [])
      }
    } catch {}
  }, [])

  useEffect(() => { fetchRoutines() }, [fetchRoutines, refreshKey])

  useEffect(() => {
    const hasRunning = routines.some((r) => r.isRunning)
    if (!hasRunning) return
    const interval = setInterval(fetchRoutines, 3000)
    return () => clearInterval(interval)
  }, [routines, fetchRoutines])

  async function triggerRoutine(routineId: string) {
    setTriggering(routineId)
    try {
      await fetch('/api/routines/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routineId }),
      })
      setTimeout(fetchRoutines, 500)
    } finally {
      setTriggering(null)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.65 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          ROUTINE SCHEDULE
        </span>
        <span className="text-[11px] text-[#4B5563]">{routines.length} ROUTINES</span>
      </div>

      {routines.length === 0 ? (
        <p className="text-[12px] text-[#333] py-6 text-center">NO ROUTINES LOADED</p>
      ) : (
        <div className="space-y-0">
          {routines.map((routine) => (
            <button
              key={routine.id}
              onClick={() => triggerRoutine(routine.id)}
              disabled={routine.isRunning || triggering === routine.id}
              className="w-full flex items-center gap-3 py-2.5 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left disabled:opacity-50"
            >
              <div
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ background: statusColors[routine.todayStatus] }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] text-white truncate">{routine.name}</p>
                <p className="text-[9px] text-[#4B5563]">{routine.scheduleHuman}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {routine.lastRun && (
                  <span className="text-[9px] text-[#4B5563]">
                    {timeAgo(routine.lastRun.at)}
                  </span>
                )}
                <span
                  className="text-[9px] font-bold uppercase tracking-wider"
                  style={{ color: statusColors[routine.todayStatus] }}
                >
                  {routine.isRunning || triggering === routine.id
                    ? 'RUNNING'
                    : statusLabels[routine.todayStatus]}
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </motion.div>
  )
}
