'use client'

import { motion } from 'framer-motion'

interface MemoryFile {
  name: string
  relativePath: string
  mtime: number
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

function isRecent(ts: number): boolean {
  return Date.now() - ts < 86400000
}

export function VaultPulse({ files }: { files: MemoryFile[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.6 }}
      className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-3"
    >
      <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
        VAULT PULSE
      </span>

      {files.length === 0 ? (
        <p className="text-[12px] text-[#333] py-4 text-center">VAULT EMPTY</p>
      ) : (
        <div className="space-y-0">
          {files.map((f, i) => {
            const folder = f.relativePath.split('/')[0]
            const label = isRecent(f.mtime) ? 'CREATED' : 'UPDATED'
            return (
              <motion.div
                key={f.relativePath}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.65 + i * 0.04 }}
                className="flex items-center gap-4 py-2.5 border-b border-[rgba(255,255,255,0.04)]"
              >
                <span className="text-[10px] text-[#D97706] font-bold uppercase shrink-0 w-16">
                  {label}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] text-[#9CA3AF] truncate">{f.name}</p>
                  <p className="text-[10px] text-[#4B5563]">{folder}/</p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-[10px] text-[#6B7280]">{timeStr(f.mtime)}</p>
                  <p className="text-[10px] text-[#4B5563]">{dateStr(f.mtime)}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}
    </motion.div>
  )
}
