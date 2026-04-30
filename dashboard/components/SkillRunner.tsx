'use client'

import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Skill {
  name: string
  command: string
  skillPath?: string
}

const SKILL_GROUPS: { label: string; skills: Skill[] }[] = [
  {
    label: 'MEMORY',
    skills: [
      { name: 'Vault Cleanup', command: 'Run vault cleanup', skillPath: 'skills/productivity/vault-cleanup/SKILL.md' },
      { name: 'KB Query', command: 'search memory for ', skillPath: 'skills/research/kb-query/SKILL.md' },
      { name: 'KB Status', command: 'Run vault health check', skillPath: 'skills/productivity/vault-cleanup/SKILL.md' },
    ],
  },
  {
    label: 'PRODUCTIVITY',
    skills: [
      { name: 'Morning Brief', command: 'Run the morning brief', skillPath: 'skills/productivity/morning-brief/SKILL.md' },
      { name: 'Inbox Triage', command: 'Triage my inbox', skillPath: 'skills/productivity/gmail/SKILL.md' },
      { name: 'Calendar Check', command: 'Check my calendar for today', skillPath: 'skills/productivity/calendar/SKILL.md' },
    ],
  },
  {
    label: 'RESEARCH',
    skills: [
      { name: 'Deep Research', command: 'research ', skillPath: 'skills/research/deep-research/SKILL.md' },
      { name: 'YT Pipeline', command: '/watch-video ', skillPath: 'skills/research/yt-pipeline/SKILL.md' },
      { name: 'YT Search', command: 'search YouTube for ', skillPath: 'skills/research/yt-search/SKILL.md' },
      { name: 'GitHub Trending', command: 'Show GitHub trending repos', skillPath: 'skills/research/github-trending/SKILL.md' },
      { name: 'Competitor Analysis', command: 'Analyze competitor ', skillPath: 'skills/research/competitor-analysis/SKILL.md' },
    ],
  },
  {
    label: 'CONTENT',
    skills: [
      { name: 'Outlines', command: 'Create a content outline for ', skillPath: 'skills/content/outlines/SKILL.md' },
      { name: 'Ideation', command: 'Brainstorm content ideas about ', skillPath: 'skills/content/ideation/SKILL.md' },
      { name: 'X Growth', command: 'Draft X thread about ', skillPath: 'skills/content/x-growth/SKILL.md' },
      { name: 'Content Cascade', command: 'Repurpose this content: ', skillPath: 'skills/content/content-cascade/SKILL.md' },
      { name: 'Short-form', command: 'Create short-form script for ', skillPath: 'skills/content/short-form/SKILL.md' },
      { name: 'Carousel', command: 'Create carousel for ', skillPath: 'skills/content/carousel/SKILL.md' },
    ],
  },
  {
    label: 'DEV',
    skills: [
      { name: 'GitHub Status', command: 'Show GitHub status for all repos', skillPath: 'skills/dev/github/SKILL.md' },
      { name: 'Code Review', command: 'Review this code: ', skillPath: 'skills/dev/code-review/SKILL.md' },
      { name: 'Commit Summary', command: 'Summarize recent commits', skillPath: 'skills/dev/commit-summary/SKILL.md' },
      { name: 'README Gen', command: 'Generate a README for ', skillPath: 'skills/dev/readme-generator/SKILL.md' },
      { name: 'Deploy', command: 'Deploy to production' },
    ],
  },
  {
    label: 'BUSINESS',
    skills: [
      { name: 'Proposal', command: 'Write a proposal for ', skillPath: 'skills/business/proposal-generator/SKILL.md' },
      { name: 'Project Brief', command: 'Create a project brief for ', skillPath: 'skills/business/project-brief/SKILL.md' },
      { name: 'Status Update', command: 'Write a status update for ', skillPath: 'skills/business/status-update/SKILL.md' },
      { name: 'Cold Outreach', command: 'Draft outreach to ', skillPath: 'skills/business/cold-outreach/SKILL.md' },
    ],
  },
  {
    label: 'ROUTINES',
    skills: [
      { name: 'Morning Brief', command: 'Run morning intel brief', skillPath: 'skills/routines/morning-intel-brief/SKILL.md' },
      { name: 'Client Pulse', command: 'Run client pulse check', skillPath: 'skills/routines/client-pulse-check/SKILL.md' },
      { name: 'Content Pipeline', command: 'Run content pipeline', skillPath: 'skills/routines/content-pipeline/SKILL.md' },
      { name: 'Inbox Triage', command: 'Run inbox triage', skillPath: 'skills/routines/inbox-triage/SKILL.md' },
      { name: 'GitHub Health', command: 'Run GitHub repo health', skillPath: 'skills/routines/github-repo-health/SKILL.md' },
      { name: 'Lead Scanner', command: 'Run lead scanner', skillPath: 'skills/routines/lead-scanner/SKILL.md' },
      { name: 'Daily Wrap', command: 'Run daily wrap', skillPath: 'skills/routines/daily-wrap/SKILL.md' },
    ],
  },
  {
    label: 'AUTOMATIONS',
    skills: [
      { name: 'Memory Consolidation', command: 'Run memory consolidation' },
    ],
  },
]

export function SkillRunner({ onRunStarted }: { onRunStarted?: () => void }) {
  const [prompt, setPrompt] = useState('')
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null)
  const [running, setRunning] = useState(false)

  const selectSkill = useCallback((skill: Skill) => {
    setSelectedSkill(skill)
    setPrompt(skill.command)
  }, [])

  const run = useCallback(async () => {
    const trimmed = prompt.trim()
    if (!trimmed || running) return

    setRunning(true)
    try {
      const res = await fetch('/api/run-skill', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: trimmed,
          skill: selectedSkill?.name ?? 'custom',
          skillPath: selectedSkill?.skillPath ?? null,
        }),
      })
      if (res.ok) {
        setPrompt('')
        setSelectedSkill(null)
        onRunStarted?.()
      }
    } finally {
      setRunning(false)
    }
  }, [prompt, running, selectedSkill, onRunStarted])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.45 }}
      className="space-y-6"
    >
      <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-4">
        <div className="space-y-2">
          <p className="text-[10px] text-[#4B5563] uppercase tracking-[0.2em]">READY</p>
          <p className="text-[26px] font-bold tracking-[0.12em] text-white uppercase">
            RUN A <span className="text-[#D97706]">SKILL</span> TO BEGIN
          </p>
          <p className="text-[11px] text-[#6B7280] tracking-wider">
            click a skill · press run · or type any prompt
          </p>
        </div>

        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); run() }
          }}
          placeholder="type a command..."
          rows={5}
          className="w-full bg-[#0a0a0a] border border-[rgba(255,255,255,0.1)] rounded-lg px-5 py-4 text-[13px] text-white placeholder:text-[#333] focus:border-[#D97706]/50 focus:outline-none resize-none"
        />
        <div className="flex gap-2">
          <button
            onClick={run}
            disabled={!prompt.trim() || running}
            className="flex items-center gap-2 border border-[rgba(255,255,255,0.2)] rounded-lg px-5 py-2.5 text-[11px] font-bold text-white uppercase tracking-[0.15em] hover:border-[#D97706] hover:text-[#D97706] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            RUN →
          </button>
          <button
            onClick={() => setPrompt('')}
            className="border border-[rgba(255,255,255,0.1)] rounded-lg px-5 py-2.5 text-[11px] font-bold text-[#6B7280] uppercase tracking-[0.15em] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            CLEAR
          </button>
          {running && (
            <div className="flex items-center gap-2 ml-auto">
              <div className="h-2.5 w-2.5 bg-[#D97706] animate-pulse" />
              <span className="text-[11px] text-[#D97706] uppercase tracking-wider font-medium">RUNNING</span>
            </div>
          )}
        </div>
      </div>

      <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-5 space-y-5">
        <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
          SKILL FLEET
        </span>
        {SKILL_GROUPS.map((group, gi) => (
          <motion.div
            key={group.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + gi * 0.06 }}
          >
            <p className="text-[10px] font-bold tracking-[0.2em] text-[#4B5563] uppercase mb-2.5">
              {group.label}
            </p>
            <div className="flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <motion.button
                  key={skill.name}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 12px rgba(217,119,6,0.1)' }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => selectSkill(skill)}
                  className="border border-[rgba(255,255,255,0.08)] rounded-lg px-5 py-2 text-[11px] text-[#9CA3AF] hover:text-[#D97706] hover:border-[#D97706]/30 transition-colors min-w-[140px] text-left"
                >
                  {skill.name}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
