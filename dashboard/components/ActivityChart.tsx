'use client'

import { memo, useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'

interface DataPoint {
  date: string
  runs: number
}

export const ActivityChart = memo(function ActivityChart({ data }: { data: DataPoint[] }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setSize({ width, height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const total = data.length > 0 ? data[data.length - 1].runs : 0
  const last30 = total

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.35 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-4"
    >
      <div className="flex items-baseline justify-between">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          AGENTIC OS — CUMULATIVE ACTIVITY · 30D
        </span>
        <span className="text-[11px] text-[#6B7280] uppercase tracking-wider">
          {total} TOTAL · {last30} LAST 30D
        </span>
      </div>

      <div ref={containerRef} className="h-[200px] min-w-0">
        {size.width > 0 && size.height > 0 && <AreaChart data={data} width={size.width} height={size.height} margin={{ top: 4, right: 4, bottom: 0, left: 0 }}>
            <defs>
              <linearGradient id="amber-fill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D97706" stopOpacity={0.3} />
                <stop offset="100%" stopColor="#D97706" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.04)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10, fill: '#4B5563' }}
              axisLine={{ stroke: 'rgba(255,255,255,0.06)' }}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#4B5563' }}
              axisLine={false}
              tickLine={false}
              width={35}
            />
            <Tooltip
              contentStyle={{
                background: '#111',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 0,
                fontSize: 12,
                fontFamily: 'JetBrains Mono, monospace',
                color: '#fff',
                padding: '8px 12px',
              }}
            />
            <Area
              type="monotone"
              dataKey="runs"
              stroke="#D97706"
              strokeWidth={1.5}
              fill="url(#amber-fill)"
            />
        </AreaChart>}
      </div>
    </motion.div>
  )
})
