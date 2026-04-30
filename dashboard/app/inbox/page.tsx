'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'

interface InboxItem {
  filename: string
  title: string
  type: string
  date: string
  routine: string
  content: string
  mtime: number
  isRead: boolean
}

const TYPE_COLORS: Record<string, string> = {
  'morning-brief': '#D97706',
  'client-pulse': '#10B981',
  'content-pipeline': '#8B5CF6',
  'inbox-triage': '#3B82F6',
  'github-health': '#EF4444',
  'lead-scan': '#F59E0B',
  'daily-wrap': '#6366F1',
  'note': '#6B7280',
}

function formatDate(dateStr: string): string {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })
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

export default function InboxPage() {
  const [items, setItems] = useState<InboxItem[]>([])
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [filter, setFilter] = useState<string>('all')

  useEffect(() => {
    fetch('/api/inbox')
      .then((r) => r.json())
      .then((data) => { setItems(data.items ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function markRead(filename: string) {
    await fetch('/api/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'markRead', filename }),
    })
    setItems((prev) => prev.map((i) => i.filename === filename ? { ...i, isRead: true } : i))
  }

  async function markAllRead() {
    await fetch('/api/inbox', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'markAllRead' }),
    })
    setItems((prev) => prev.map((i) => ({ ...i, isRead: true })))
  }

  function toggleExpand(filename: string) {
    if (expanded === filename) {
      setExpanded(null)
    } else {
      setExpanded(filename)
      const item = items.find((i) => i.filename === filename)
      if (item && !item.isRead) markRead(filename)
    }
  }

  const types = ['all', ...new Set(items.map((i) => i.type))]
  const filtered = filter === 'all' ? items : items.filter((i) => i.type === filter)
  const unreadCount = items.filter((i) => !i.isRead).length

  const groupedByDate: Record<string, InboxItem[]> = {}
  for (const item of filtered) {
    const key = item.date || new Date(item.mtime).toISOString().slice(0, 10)
    if (!groupedByDate[key]) groupedByDate[key] = []
    groupedByDate[key].push(item)
  }
  const sortedDates = Object.keys(groupedByDate).sort((a, b) => b.localeCompare(a))

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <Header status="IDLE" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold tracking-[0.15em] text-white uppercase">
                INBOX
              </span>
              {unreadCount > 0 && (
                <span className="bg-[#c084fc] text-black text-[9px] font-bold px-2 py-0.5 rounded-full">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            <div className="flex items-center gap-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllRead}
                  className="text-[10px] text-[#6B7280] uppercase tracking-wider hover:text-white transition-colors"
                >
                  MARK ALL READ
                </button>
              )}
              <span className="text-[10px] text-[#4B5563]">{items.length} ITEMS</span>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {types.map((type) => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 border rounded-lg transition-colors ${
                  filter === type
                    ? 'border-[#c084fc] text-[#c084fc] bg-[rgba(192,132,252,0.1)]'
                    : 'border-[rgba(255,255,255,0.08)] text-[#6B7280] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {loading ? (
            <p className="text-[11px] text-[#6B7280] py-8 text-center">LOADING...</p>
          ) : items.length === 0 ? (
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-8 text-center">
              <p className="text-[11px] text-[#333] uppercase">INBOX EMPTY</p>
              <p className="text-[9px] text-[#333] mt-2">Routine outputs will appear here</p>
            </div>
          ) : (
            sortedDates.map((date) => (
              <div key={date} className="space-y-2">
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#6B7280] uppercase">
                  {formatDate(date)}
                </p>
                <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
                  {groupedByDate[date].map((item) => (
                    <div key={item.filename}>
                      <button
                        onClick={() => toggleExpand(item.filename)}
                        className="w-full flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left"
                      >
                        {!item.isRead && (
                          <div className="h-2 w-2 rounded-full bg-[#c084fc] shrink-0" />
                        )}
                        {item.isRead && (
                          <div className="h-2 w-2 rounded-full bg-[rgba(255,255,255,0.1)] shrink-0" />
                        )}
                        <div
                          className="h-2 w-2 shrink-0"
                          style={{ background: TYPE_COLORS[item.type] || '#6B7280' }}
                        />
                        <div className="min-w-0 flex-1">
                          <p className={`text-[11px] truncate ${item.isRead ? 'text-[#9CA3AF]' : 'text-white font-medium'}`}>
                            {item.title}
                          </p>
                          <p className="text-[9px] text-[#4B5563]">{item.type} · {timeAgo(item.mtime)}</p>
                        </div>
                        {item.routine && (
                          <span className="text-[8px] text-[#6B7280] border border-[rgba(255,255,255,0.08)] px-1.5 py-0.5 shrink-0">
                            {item.routine}
                          </span>
                        )}
                      </button>
                      <AnimatePresence>
                        {expanded === item.filename && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 bg-[#080808] border-b border-[rgba(255,255,255,0.04)]">
                              <pre className="text-[11px] text-[#9CA3AF] whitespace-pre-wrap break-words max-h-96 overflow-y-auto leading-relaxed">
                                {item.content || 'No content'}
                              </pre>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
