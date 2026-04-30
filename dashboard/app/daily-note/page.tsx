'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Header } from '@/components/Header'

function todayStr(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Chicago' })
}

export default function DailyNotePage() {
  const [date, setDate] = useState(todayStr)
  const [content, setContent] = useState('')
  const [exists, setExists] = useState(false)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchNote = useCallback(async (d: string) => {
    setLoading(true)
    try {
      const res = await fetch(`/api/daily-note?date=${d}`)
      if (res.ok) {
        const data = await res.json()
        setContent(data.content)
        setExists(data.exists)
      }
    } catch {} finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchNote(date) }, [date, fetchNote])

  async function save() {
    setSaving(true)
    setSaved(false)
    try {
      const res = await fetch('/api/daily-note', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, content }),
      })
      if (res.ok) {
        setExists(true)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    } finally {
      setSaving(false)
    }
  }

  function createTemplate() {
    const template = `# Daily Note — ${date}

## Priorities
-

## Notes
-

## End of Day
- What worked:
- What didn't:
- Tomorrow:
`
    setContent(template)
  }

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
            <span className="text-[10px] font-bold tracking-[0.15em] text-white uppercase">
              DAILY NOTE
            </span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  const d = new Date(date + 'T12:00:00')
                  d.setDate(d.getDate() - 1)
                  setDate(d.toLocaleDateString('en-CA'))
                }}
                className="text-[10px] text-[#6B7280] hover:text-white transition-colors px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-lg"
              >
                ← PREV
              </button>
              <span className="text-[11px] text-[#D97706] font-medium">{date}</span>
              <button
                onClick={() => {
                  const d = new Date(date + 'T12:00:00')
                  d.setDate(d.getDate() + 1)
                  setDate(d.toLocaleDateString('en-CA'))
                }}
                className="text-[10px] text-[#6B7280] hover:text-white transition-colors px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-lg"
              >
                NEXT →
              </button>
              <button
                onClick={() => setDate(todayStr())}
                className="text-[10px] text-[#6B7280] hover:text-[#D97706] transition-colors px-2 py-1 border border-[rgba(255,255,255,0.1)] rounded-lg"
              >
                TODAY
              </button>
            </div>
          </div>

          <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[9px] text-[#6B7280] uppercase tracking-wider">
                memory/daily-notes/{date}.md
              </span>
              <div className="flex items-center gap-2">
                {exists ? (
                  <span className="text-[9px] text-[#10B981] uppercase tracking-wider">EXISTS</span>
                ) : (
                  <span className="text-[9px] text-[#D97706] uppercase tracking-wider">NEW</span>
                )}
              </div>
            </div>

            {loading ? (
              <p className="text-[11px] text-[#6B7280] py-8 text-center">LOADING...</p>
            ) : (
              <>
                {!exists && !content && (
                  <div className="flex justify-center py-4">
                    <button
                      onClick={createTemplate}
                      className="border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-[10px] font-bold text-white uppercase tracking-[0.15em] hover:border-[#D97706] hover:text-[#D97706] transition-colors"
                    >
                      CREATE FROM TEMPLATE
                    </button>
                  </div>
                )}
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={20}
                  className="w-full bg-[#080808] border border-[rgba(255,255,255,0.06)] rounded-lg px-4 py-3 text-[12px] text-[#9CA3AF] placeholder:text-[#333] focus:border-[#D97706]/50 focus:outline-none resize-y leading-relaxed"
                  placeholder="Start writing..."
                />
                <div className="flex items-center gap-3">
                  <button
                    onClick={save}
                    disabled={saving}
                    className="border border-[rgba(255,255,255,0.2)] rounded-lg px-4 py-2 text-[10px] font-bold text-white uppercase tracking-[0.15em] hover:border-[#D97706] hover:text-[#D97706] transition-colors disabled:opacity-30"
                  >
                    {saving ? 'SAVING...' : 'SAVE'}
                  </button>
                  {saved && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-[10px] text-[#10B981] uppercase tracking-wider"
                    >
                      SAVED
                    </motion.span>
                  )}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
