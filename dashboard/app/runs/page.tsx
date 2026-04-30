'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'

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

function dateStr(ts: number): string {
  return new Date(ts).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', timeZone: 'America/Chicago',
  })
}

function duration(start: number, end: number | null): string {
  const ms = (end ?? Date.now()) - start
  const s = Math.floor(ms / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  return `${m}m ${s % 60}s`
}

const statusColors = {
  running: '#D97706',
  completed: '#10B981',
  failed: '#ef4444',
}

export default function RunsPage() {
  const [runs, setRuns] = useState<Run[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [expandedOutput, setExpandedOutput] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  const fetchRuns = useCallback(async () => {
    try {
      const res = await fetch('/api/runs')
      if (res.ok) {
        const data = await res.json()
        setRuns(data.runs ?? [])
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchRuns() }, [fetchRuns])

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
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <Header status={runs.some((r) => r.status === 'running') ? 'RUNNING' : 'IDLE'} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold tracking-[0.15em] text-white uppercase">
              RUN HISTORY
            </span>
            <div className="flex items-center gap-4">
              <span className="text-[10px] text-[#6B7280]">{runs.length} RUNS</span>
              <button
                onClick={fetchRuns}
                className="text-[10px] text-[#6B7280] hover:text-[#D97706] transition-colors px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-lg"
              >
                REFRESH
              </button>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
            <div className="flex items-center gap-3 px-4 py-2 border-b border-[rgba(255,255,255,0.06)] text-[9px] text-[#6B7280] uppercase tracking-wider">
              <span className="w-2"></span>
              <span className="flex-1">SKILL / PROMPT</span>
              <span className="w-24 text-right">DURATION</span>
              <span className="w-28 text-right">TIME</span>
            </div>

            {loading ? (
              <p className="text-[11px] text-[#6B7280] py-8 text-center">LOADING...</p>
            ) : runs.length === 0 ? (
              <p className="text-[11px] text-[#333] py-8 text-center">NO RUNS YET</p>
            ) : (
              <AnimatePresence initial={false}>
                {runs.map((run) => (
                  <motion.div
                    key={run.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <button
                      onClick={() => toggleExpand(run.id)}
                      className="w-full flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left"
                    >
                      <div
                        className="h-2 w-2 shrink-0"
                        style={{ background: statusColors[run.status] }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-[11px] text-white truncate">{run.skill}</p>
                        <p className="text-[9px] text-[#4B5563] truncate">{run.prompt}</p>
                      </div>
                      <span className="w-24 text-right text-[10px] text-[#6B7280] shrink-0">
                        {duration(run.startedAt, run.completedAt)}
                      </span>
                      <div className="w-28 text-right shrink-0">
                        <p className="text-[9px] text-[#6B7280]">{timeStr(run.startedAt)}</p>
                        <p className="text-[9px] text-[#333]">{dateStr(run.startedAt)}</p>
                      </div>
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
                          <pre className="text-[10px] text-[#6B7280] p-4 bg-[#080808] border-b border-[rgba(255,255,255,0.04)] whitespace-pre-wrap break-words max-h-64 overflow-y-auto">
                            {expandedOutput ?? run.output ?? (run.status === 'running' ? 'RUNNING...' : 'NO OUTPUT')}
                          </pre>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
