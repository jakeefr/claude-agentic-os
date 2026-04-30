'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Run {
  id: string
  skill: string
  prompt: string
  status: 'running' | 'completed' | 'failed'
  startedAt: number
  completedAt: number | null
  output: string | null
}

function timeStr(ts: number): string {
  return new Date(ts).toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Chicago',
  })
}

const statusColors = {
  running: '#D97706',
  completed: '#10B981',
  failed: '#ef4444',
}

export function RecentRunsPanel({ refreshKey }: { refreshKey: number }) {
  const [runs, setRuns] = useState<Run[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [expandedOutput, setExpandedOutput] = useState<string | null>(null)

  const fetchRuns = useCallback(async () => {
    try {
      const res = await fetch('/api/runs')
      if (res.ok) {
        const data = await res.json()
        setRuns(data.runs ?? [])
      }
    } catch {}
  }, [])

  useEffect(() => { fetchRuns() }, [fetchRuns, refreshKey])

  useEffect(() => {
    const hasRunning = runs.some((r) => r.status === 'running')
    if (!hasRunning) return
    const interval = setInterval(fetchRuns, 3000)
    return () => clearInterval(interval)
  }, [runs, fetchRuns])

  async function toggleExpand(id: string) {
    if (expanded === id) { setExpanded(null); setExpandedOutput(null); return }
    setExpanded(id)
    try {
      const res = await fetch(`/api/runs?id=${id}`)
      if (res.ok) { const data = await res.json(); setExpandedOutput(data.output) }
    } catch { setExpandedOutput('Failed to load output') }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-3"
    >
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          RECENT RUNS
        </span>
        <span className="text-[11px] text-[#4B5563]">{runs.length}</span>
      </div>

      {runs.length === 0 ? (
        <p className="text-[12px] text-[#333] py-6 text-center">NO RUNS YET</p>
      ) : (
        <div className="space-y-0">
          <AnimatePresence initial={false}>
            {runs.slice(0, 8).map((run) => (
              <motion.div
                key={run.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  onClick={() => toggleExpand(run.id)}
                  className="w-full flex items-center gap-4 py-2.5 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left"
                >
                  <span className="text-[11px] text-[#6B7280] shrink-0 w-14 font-medium">
                    {timeStr(run.startedAt)}
                  </span>
                  <div
                    className="h-1.5 w-1.5 shrink-0"
                    style={{ background: statusColors[run.status] }}
                  />
                  <span className="text-[12px] text-white truncate flex-1">{run.skill}</span>
                  <span className="text-[10px] text-[#D97706] uppercase tracking-wider shrink-0 hover:text-white mr-4">
                    OPEN
                  </span>
                </button>
                <AnimatePresence>
                  {expanded === run.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.15 }}
                      className="overflow-hidden"
                    >
                      <pre className="text-[11px] text-[#6B7280] p-4 bg-[#080808] border border-[rgba(255,255,255,0.04)] whitespace-pre-wrap break-words max-h-48 overflow-y-auto">
                        {expandedOutput ?? run.output ?? (run.status === 'running' ? 'RUNNING...' : 'NO OUTPUT')}
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
