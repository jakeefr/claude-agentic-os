'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'

interface VaultEntry {
  name: string
  relativePath: string
  isDirectory: boolean
  mtime: number
  children?: VaultEntry[]
}

function FolderNode({
  entry,
  depth,
  onSelect,
  selectedPath,
}: {
  entry: VaultEntry
  depth: number
  onSelect: (path: string) => void
  selectedPath: string | null
}) {
  const [open, setOpen] = useState(depth === 0)

  if (!entry.isDirectory) {
    const isActive = selectedPath === entry.relativePath
    return (
      <button
        onClick={() => onSelect(entry.relativePath)}
        className={`w-full text-left flex items-center gap-2 py-1.5 hover:bg-[rgba(255,255,255,0.03)] transition-colors ${
          isActive ? 'text-[#D97706]' : 'text-[#9CA3AF]'
        }`}
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="text-[9px] text-[#6B7280]">·</span>
        <span className="text-[11px] truncate">{entry.name}</span>
      </button>
    )
  }

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left flex items-center gap-2 py-1.5 hover:bg-[rgba(255,255,255,0.03)] transition-colors"
        style={{ paddingLeft: `${depth * 16 + 12}px` }}
      >
        <span className="text-[9px] text-[#D97706]">{open ? '▼' : '▶'}</span>
        <span className="text-[11px] text-white font-medium">{entry.name}/</span>
        {entry.children && (
          <span className="text-[9px] text-[#4B5563]">{entry.children.length}</span>
        )}
      </button>
      <AnimatePresence>
        {open && entry.children && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="overflow-hidden"
          >
            {entry.children.map((child) => (
              <FolderNode
                key={child.relativePath}
                entry={child}
                depth={depth + 1}
                onSelect={onSelect}
                selectedPath={selectedPath}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function VaultPage() {
  const [tree, setTree] = useState<VaultEntry[]>([])
  const [selectedPath, setSelectedPath] = useState<string | null>(null)
  const [fileContent, setFileContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/vault')
      .then((r) => r.json())
      .then((d) => { setTree(d.tree ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function selectFile(path: string) {
    setSelectedPath(path)
    setFileContent(null)
    try {
      const res = await fetch(`/api/vault?file=${encodeURIComponent(path)}`)
      if (res.ok) {
        const data = await res.json()
        setFileContent(data.content)
      } else {
        setFileContent('Failed to load file')
      }
    } catch {
      setFileContent('Failed to load file')
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 pb-6">
        <Header status="IDLE" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex items-center justify-between mb-6">
            <span className="text-[10px] font-bold tracking-[0.15em] text-white uppercase">
              MEMORY VAULT
            </span>
            <span className="text-[10px] text-[#4B5563]">memory/</span>
          </div>

          {loading ? (
            <p className="text-[11px] text-[#6B7280] py-8 text-center">LOADING...</p>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-6">
              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-2 max-h-[70vh] overflow-y-auto">
                {tree.length === 0 ? (
                  <p className="text-[11px] text-[#333] py-4 text-center">VAULT EMPTY</p>
                ) : (
                  tree.map((entry) => (
                    <FolderNode
                      key={entry.relativePath}
                      entry={entry}
                      depth={0}
                      onSelect={selectFile}
                      selectedPath={selectedPath}
                    />
                  ))
                )}
              </div>

              <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-4 min-h-[50vh] max-h-[70vh] overflow-y-auto">
                {selectedPath ? (
                  <div>
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-[rgba(255,255,255,0.06)]">
                      <span className="text-[11px] text-[#D97706] font-medium truncate">
                        {selectedPath}
                      </span>
                    </div>
                    <pre className="text-[11px] text-[#9CA3AF] whitespace-pre-wrap break-words leading-relaxed">
                      {fileContent ?? 'Loading...'}
                    </pre>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-[11px] text-[#333] uppercase tracking-wider">
                      SELECT A FILE
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
