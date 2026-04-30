'use client'

import { motion } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'

interface UsageData {
  fiveHourTokens: number
  fiveHourLimit: number
  weeklyTokens: number
  weeklyLimit: number
  fiveHourSessions: number
  weeklySessions: number
  fiveHourResetTime: number | null
  weeklyResetTime: number | null
  trend: 'flat' | 'rising' | 'falling'
  modelBreakdown: Record<string, number>
}

function formatTokens(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}K`
  return `${n}`
}

function formatResetTime(resetTime: number | null): string {
  if (!resetTime) return 'RESETS · --'
  const remaining = resetTime - Date.now()
  if (remaining <= 0) return 'RESETS · NOW'
  const d = new Date(resetTime)
  const now = new Date()
  const hours = d.getHours()
  const minutes = d.getMinutes()
  const ampm = hours >= 12 ? 'PM' : 'AM'
  const h12 = hours % 12 || 12
  const timeStr = minutes > 0 ? `${h12}:${String(minutes).padStart(2, '0')} ${ampm}` : `${h12} ${ampm}`
  if (d.toDateString() === now.toDateString()) return `RESETS · ${timeStr}`
  const month = d.toLocaleString('en-US', { month: 'short' }).toUpperCase()
  return `RESETS · ${month} ${d.getDate()}, ${timeStr}`
}

const SEGMENTED_BAR_BG = 'bg-[#1a1a1a]'
const SEGMENTED_GRADIENT = 'linear-gradient(90deg, #D97706, #F59E0B)'
const SEGMENTED_MASK =
  'repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 3px)'

function SegmentedBar({ pct, index }: { pct: number; index: number }) {
  return (
    <div className={`h-[10px] ${SEGMENTED_BAR_BG} overflow-hidden mt-4`}>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: [0.4, 0, 0.2, 1] }}
        className="h-full"
        style={{
          background: SEGMENTED_GRADIENT,
          WebkitMaskImage: SEGMENTED_MASK,
          maskImage: SEGMENTED_MASK,
        }}
      />
    </div>
  )
}

export function TokenMeters({
  routinesToday,
  routinesTotal,
}: {
  routinesToday: number
  routinesTotal: number
}) {
  const [usage, setUsage] = useState<UsageData | null>(null)
  const [, setTick] = useState(0)

  const fetchUsage = useCallback(async () => {
    try {
      const res = await fetch('/api/usage')
      if (res.ok) setUsage(await res.json())
    } catch {}
  }, [])

  useEffect(() => {
    fetchUsage()
    const dataInterval = setInterval(fetchUsage, 60_000)
    const tickInterval = setInterval(() => setTick((t) => t + 1), 60_000)
    return () => {
      clearInterval(dataInterval)
      clearInterval(tickInterval)
    }
  }, [fetchUsage])

  const fiveHourPct = usage
    ? Math.min((usage.fiveHourTokens / usage.fiveHourLimit) * 100, 100)
    : 0
  const weeklyPct = usage
    ? Math.min((usage.weeklyTokens / usage.weeklyLimit) * 100, 100)
    : 0
  const routinePct = routinesTotal > 0 ? Math.min((routinesToday / routinesTotal) * 100, 100) : 0

  const trendLabel = usage
    ? usage.trend === 'rising'
      ? '· RISING'
      : usage.trend === 'falling'
        ? '· FALLING'
        : '· FLAT'
    : '· --'

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* 5-HOUR WINDOW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 min-h-[120px] flex flex-col justify-between"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
            5-HOUR WINDOW
          </span>
          <span className="text-[10px] text-[#4B5563] uppercase tracking-wider">
            {usage ? formatResetTime(usage.fiveHourResetTime) : 'RESETS · --'}
          </span>
        </div>

        <SegmentedBar pct={fiveHourPct} index={0} />

        <div className="flex items-baseline justify-between mt-4">
          <div className="flex items-baseline gap-3">
            <span className="text-[20px] font-bold text-white tracking-wide">
              {usage ? formatTokens(usage.fiveHourTokens) : '--'}{' '}
              <span className="text-[14px] text-[#6B7280] font-normal">
                / {usage ? formatTokens(usage.fiveHourLimit) : '--'}
              </span>
            </span>
          </div>
          <span className="text-[11px] text-[#6B7280]">
            {usage ? `${usage.fiveHourSessions} SESSIONS` : '--'}
          </span>
        </div>
        <span className="text-[9px] text-[#4B5563] uppercase tracking-wider mt-1">
          {trendLabel}
        </span>
      </motion.div>

      {/* WEEKLY WINDOW */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18 }}
        className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 min-h-[120px] flex flex-col justify-between"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
            WEEKLY WINDOW
          </span>
          <span className="text-[10px] text-[#4B5563] uppercase tracking-wider">
            {usage ? formatResetTime(usage.weeklyResetTime) : 'RESETS · --'}
          </span>
        </div>

        <SegmentedBar pct={weeklyPct} index={1} />

        <div className="flex items-baseline justify-between mt-4">
          <div className="flex items-baseline gap-3">
            <span className="text-[20px] font-bold text-white tracking-wide">
              {usage ? formatTokens(usage.weeklyTokens) : '--'}{' '}
              <span className="text-[14px] text-[#6B7280] font-normal">
                / {usage ? formatTokens(usage.weeklyLimit) : '--'}
              </span>
            </span>
          </div>
          <span className="text-[11px] text-[#6B7280]">
            {usage ? `${usage.weeklySessions} SESSIONS` : '--'}
          </span>
        </div>
        {usage && Object.keys(usage.modelBreakdown).length > 0 ? (
          <div className="flex gap-3 mt-2 flex-wrap">
            {Object.entries(usage.modelBreakdown)
              .sort(([, a], [, b]) => b - a)
              .map(([model, tokens]) => (
                <span key={model} className="text-[9px] text-[#4B5563] uppercase tracking-wider">
                  {model.split('-')[0]} {formatTokens(tokens)}
                </span>
              ))}
          </div>
        ) : (
          <span className="text-[9px] text-[#4B5563] uppercase tracking-wider mt-1">· --</span>
        )}
      </motion.div>

      {/* ROUTINES · TODAY */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.26 }}
        className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 min-h-[120px] flex flex-col justify-between"
      >
        <div className="flex items-baseline justify-between">
          <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
            ROUTINES · TODAY
          </span>
          <span className="text-[10px] text-[#4B5563] uppercase tracking-wider">
            $0.00 TODAY
          </span>
        </div>

        <SegmentedBar pct={routinePct} index={2} />

        <div className="flex items-baseline justify-between mt-4">
          <span className="text-[20px] font-bold text-white tracking-wide">
            {routinesToday}{' '}
            <span className="text-[14px] text-[#6B7280] font-normal">/ {routinesTotal}</span>
          </span>
          <span className="text-[11px] text-[#6B7280]">
            {routinesToday} / {routinesTotal} complete
          </span>
        </div>
      </motion.div>
    </div>
  )
}
