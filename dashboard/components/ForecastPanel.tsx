'use client'

import { motion } from 'framer-motion'

const SEGMENTED_GRADIENT = 'linear-gradient(90deg, #D97706, #F59E0B)'
const SEGMENTED_MASK =
  'repeating-linear-gradient(90deg, transparent 0px, transparent 1px, white 1px, white 3px)'

export function ForecastPanel({ recentRuns }: { recentRuns: number }) {
  const burnRate = recentRuns > 0 ? Math.round((recentRuns / 5) * 10) / 10 : 0
  const pct = Math.min((recentRuns / 20) * 100, 100)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.55 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-4"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          FORECAST · 5H
        </span>
        <span className="text-[10px] text-[#4B5563] uppercase tracking-wider">
          BURN RATE
        </span>
      </div>

      <div className="h-[10px] bg-[#1a1a1a] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="h-full"
          style={{
            background: SEGMENTED_GRADIENT,
            WebkitMaskImage: SEGMENTED_MASK,
            maskImage: SEGMENTED_MASK,
          }}
        />
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-[16px] font-bold text-white">
          {burnRate} <span className="text-[11px] text-[#6B7280] font-normal">runs/hr</span>
        </span>
        <span className="text-[11px] text-[#6B7280]">
          {recentRuns} / 20 capacity
        </span>
      </div>
    </motion.div>
  )
}
