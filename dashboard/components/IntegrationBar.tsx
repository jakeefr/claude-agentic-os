'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const INTEGRATIONS = [
  { label: 'GMAIL', connected: true },
  { label: 'GOOGLE CALENDAR', connected: true },
  { label: 'GOOGLE DRIVE', connected: true },
  { label: 'GITHUB', connected: true },
]

function SyncIndicator() {
  const [sync, setSync] = useState<{
    status: string
    lastSync: number | null
    message: string | null
  } | null>(null)

  useEffect(() => {
    const fetchSync = () =>
      fetch('/api/sync')
        .then((r) => r.json())
        .then(setSync)
        .catch(() => {})

    fetchSync()
    const interval = setInterval(fetchSync, 30_000)
    return () => clearInterval(interval)
  }, [])

  if (!sync) return null

  let dotColor = 'bg-[#6B7280]'
  let label = 'SYNC · —'

  if (sync.status === 'synced' && sync.lastSync) {
    dotColor = 'bg-[#10B981]'
    const mins = Math.round((Date.now() - sync.lastSync) / 60_000)
    label = mins < 1 ? 'SYNCED · JUST NOW' : `SYNCED · ${mins} MIN AGO`
  } else if (sync.status === 'error') {
    dotColor = 'bg-[#ef4444]'
    label = 'SYNC · ERROR'
  } else if (sync.status === 'never') {
    dotColor = 'bg-[#F59E0B]'
    label = 'SYNC · NEVER'
  }

  return (
    <div className="flex items-center gap-2" title={sync.message ?? undefined}>
      <div className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{label}</span>
    </div>
  )
}

export function IntegrationBar({ skillCount }: { skillCount: number }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.4 }}
      className="flex items-center gap-5 px-5 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg"
    >
      <span className="text-[10px] font-bold tracking-[0.15em] text-[#4B5563] uppercase">
        INTEGRATIONS
      </span>
      {INTEGRATIONS.map((int) => (
        <div key={int.label} className="flex items-center gap-2">
          <div
            className={`h-1.5 w-1.5 rounded-full ${
              int.connected ? 'bg-[#10B981]' : 'bg-[#ef4444]'
            }`}
          />
          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">{int.label}</span>
        </div>
      ))}
      <div className="ml-auto flex items-center gap-4">
        <SyncIndicator />
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6]" />
          <span className="text-[10px] text-[#6B7280] uppercase tracking-wider">SKILLS · {skillCount} LOADED</span>
        </div>
      </div>
    </motion.div>
  )
}
