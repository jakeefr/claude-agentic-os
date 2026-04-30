'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'

const TABS = [
  { label: 'CLAUDE CODE', href: '/', color: '#D97706' },
  { label: 'VAULT', href: '/vault', color: '#10B981' },
  { label: 'DAILY NOTE', href: '/daily-note', color: '#3B82F6' },
  { label: 'RUNS FOLDER', href: '/runs', color: '#EF4444' },
  { label: 'SKILLS', href: '/skills', color: '#8B5CF6' },
]

export function TabBar() {
  const pathname = usePathname()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay: 0.05 }}
      className="flex items-center gap-2 px-6 pb-3 pt-1"
    >
      <div className="h-6 w-6 border border-[rgba(255,255,255,0.15)] flex items-center justify-center text-[11px] text-[#6B7280] hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors cursor-pointer">
        +
      </div>
      {TABS.map((tab) => {
        const isActive = pathname === tab.href
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex items-center gap-2 px-4 py-1.5 text-[11px] font-medium tracking-[0.1em] uppercase transition-all border ${
              isActive
                ? 'bg-[#D97706] text-black border-[#D97706]'
                : 'bg-transparent text-[#6B7280] border-[rgba(255,255,255,0.1)] hover:text-[#9CA3AF] hover:border-[rgba(255,255,255,0.2)]'
            }`}
          >
            <div className="h-2 w-2" style={{ background: isActive ? '#000' : tab.color }} />
            {tab.label}
          </Link>
        )
      })}
    </motion.div>
  )
}
