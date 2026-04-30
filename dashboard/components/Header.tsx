'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const TABS = [
  { label: 'CLAUDE CODE', href: '/', color: '#D97706' },
  { label: 'VAULT', href: '/vault', color: '#10B981' },
  { label: 'DAILY NOTE', href: '/daily-note', color: '#3B82F6' },
  { label: 'RUNS FOLDER', href: '/runs', color: '#EF4444' },
  { label: 'INBOX', href: '/inbox', color: '#c084fc' },
  { label: 'SKILLS', href: '/skills', color: '#8B5CF6' },
]

const NAV_ITEMS = ['VAULT', 'MEMORY', 'SKILLS', 'PLAN', 'PERMISSIONS']

export function Header({ status }: { status: 'IDLE' | 'RUNNING' }) {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="pt-6 pb-2"
    >
      {/* Row 1: Title left, nav links + status right */}
      <div className="flex items-center justify-between">
        <div className="flex items-baseline gap-0">
          <span className="text-[60px] font-bold tracking-[0.02em] text-white leading-none">AGENTIC</span>
          <span className="text-[60px] font-bold tracking-[0.02em] text-[#D97706] leading-none">OS</span>
        </div>

        <div className="flex items-center">
          {NAV_ITEMS.map((item, i) => (
            <span key={item} className="text-[10px] text-[#4B5563] uppercase tracking-[0.1em]">
              {i > 0 && <span className="mx-2 text-[#333]">·</span>}
              {item}
            </span>
          ))}
          <div className="flex items-center gap-2 ml-4 pl-4 border-l border-[rgba(255,255,255,0.1)]">
            <div
              className={`h-2 w-2 rounded-full ${
                status === 'RUNNING' ? 'bg-[#D97706] animate-pulse' : 'bg-[#10B981]'
              }`}
            />
            <span className="text-[11px] text-[#6B7280] uppercase tracking-wider font-medium">
              {status}
            </span>
          </div>
        </div>
      </div>

      {/* Row 2: Tab bar — 24px below title */}
      <div className="flex items-center gap-1.5 mt-6">
        <div className="h-7 w-7 border border-[rgba(255,255,255,0.15)] rounded-lg flex items-center justify-center text-[12px] text-[#6B7280] hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors cursor-pointer shrink-0">
          +
        </div>
        {TABS.map((tab) => {
          const isActive = pathname === tab.href
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium tracking-[0.08em] uppercase transition-all border rounded-lg shrink-0 ${
                isActive
                  ? 'bg-[#D97706] text-black border-[#D97706]'
                  : 'bg-transparent text-[#6B7280] border-[rgba(255,255,255,0.1)] hover:text-[#9CA3AF] hover:border-[rgba(255,255,255,0.2)]'
              }`}
            >
              <div className="h-2 w-2 rounded-sm" style={{ background: isActive ? '#000' : tab.color }} />
              {tab.label}
            </Link>
          )
        })}
      </div>
    </motion.div>
  )
}
