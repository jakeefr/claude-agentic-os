'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Header } from '@/components/Header'

interface SkillDetail {
  name: string
  trigger: string
  category: string
  content: string
  inputs: string
  outputs: string
  dependencies: string
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<SkillDetail[]>([])
  const [expanded, setExpanded] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/skills')
      .then((r) => r.json())
      .then((d) => { setSkills(d.skills ?? []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  const categories = [...new Set(skills.map((s) => s.category))]

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
              SKILL FLEET
            </span>
            <span className="text-[10px] text-[#4B5563]">{skills.length} SKILLS</span>
          </div>

          {loading ? (
            <p className="text-[11px] text-[#6B7280] py-8 text-center">LOADING...</p>
          ) : skills.length === 0 ? (
            <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg p-8 text-center">
              <p className="text-[11px] text-[#333] uppercase">NO SKILLS FOUND</p>
              <p className="text-[9px] text-[#333] mt-2">Add SKILL.md files to skills/ subdirectories</p>
            </div>
          ) : (
            categories.map((category) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="space-y-2"
              >
                <p className="text-[9px] font-bold tracking-[0.2em] text-[#6B7280] uppercase">
                  {category}
                </p>
                <div className="bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg overflow-hidden">
                  {skills
                    .filter((s) => s.category === category)
                    .map((skill) => (
                      <div key={`${skill.category}-${skill.name}`}>
                        <button
                          onClick={() =>
                            setExpanded(
                              expanded === `${skill.category}-${skill.name}`
                                ? null
                                : `${skill.category}-${skill.name}`
                            )
                          }
                          className="w-full flex items-center gap-3 px-4 py-3 border-b border-[rgba(255,255,255,0.04)] hover:bg-[rgba(255,255,255,0.02)] transition-colors text-left"
                        >
                          <div className="h-2 w-2 bg-[#8B5CF6] shrink-0" />
                          <div className="min-w-0 flex-1">
                            <p className="text-[11px] text-white">{skill.name}</p>
                            {skill.trigger && (
                              <p className="text-[9px] text-[#4B5563]">trigger: {skill.trigger}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {skill.inputs && (
                              <span className="text-[8px] text-[#6B7280] border border-[rgba(255,255,255,0.08)] px-1.5 py-0.5">
                                INPUTS
                              </span>
                            )}
                            {skill.outputs && (
                              <span className="text-[8px] text-[#6B7280] border border-[rgba(255,255,255,0.08)] px-1.5 py-0.5">
                                OUTPUTS
                              </span>
                            )}
                          </div>
                        </button>
                        <AnimatePresence>
                          {expanded === `${skill.category}-${skill.name}` && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.15 }}
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-[#080808] border-b border-[rgba(255,255,255,0.04)] space-y-3">
                                {skill.inputs && (
                                  <div>
                                    <span className="text-[9px] text-[#D97706] uppercase tracking-wider">INPUTS:</span>
                                    <p className="text-[10px] text-[#9CA3AF] mt-1">{skill.inputs}</p>
                                  </div>
                                )}
                                {skill.outputs && (
                                  <div>
                                    <span className="text-[9px] text-[#10B981] uppercase tracking-wider">OUTPUTS:</span>
                                    <p className="text-[10px] text-[#9CA3AF] mt-1">{skill.outputs}</p>
                                  </div>
                                )}
                                {skill.dependencies && (
                                  <div>
                                    <span className="text-[9px] text-[#6B7280] uppercase tracking-wider">DEPS:</span>
                                    <p className="text-[10px] text-[#9CA3AF] mt-1">{skill.dependencies}</p>
                                  </div>
                                )}
                                <div>
                                  <span className="text-[9px] text-[#6B7280] uppercase tracking-wider">INSTRUCTIONS:</span>
                                  <pre className="text-[10px] text-[#6B7280] mt-1 whitespace-pre-wrap break-words max-h-64 overflow-y-auto leading-relaxed">
                                    {skill.content || 'No content'}
                                  </pre>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                </div>
              </motion.div>
            ))
          )}
        </motion.div>
      </div>
    </div>
  )
}
