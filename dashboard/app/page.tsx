export const dynamic = 'force-dynamic'

import { getRecentMemory, getSkills, getMemoryStats } from '@/lib/vault'
import { getRuns } from '@/lib/runs'
import { getRoutineDefinitions, getTodayRoutineRuns } from '@/lib/routines'
import { Header } from '@/components/Header'
import { TokenMeters } from '@/components/TokenMeters'
import { ActivityChart } from '@/components/ActivityChart'
import { IntegrationBar } from '@/components/IntegrationBar'
import { VaultPulse } from '@/components/VaultPulse'
import { DashboardClient } from '@/components/DashboardClient'

function buildActivityData(runs: { startedAt: number }[]): { date: string; runs: number }[] {
  const now = Date.now()
  const days: { date: string; runs: number }[] = []
  for (let i = 29; i >= 0; i--) {
    const d = new Date(now - i * 86400000)
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
    const dayEnd = dayStart + 86400000
    const count = runs.filter((r) => r.startedAt >= dayStart && r.startedAt < dayEnd).length
    days.push({ date: label, runs: count })
  }
  let cumulative = 0
  return days.map((d) => {
    cumulative += d.runs
    return { date: d.date, runs: cumulative }
  })
}

export default function Dashboard() {
  const memoryFiles = getRecentMemory(8)
  const skills = getSkills()
  const { noteCount } = getMemoryStats()
  const runs = getRuns(100)
  const routineDefinitions = getRoutineDefinitions()
  const todayRoutineRuns = getTodayRoutineRuns()

  const fiveHoursAgo = Date.now() - 5 * 3600000
  const recentRuns = runs.filter((r) => r.startedAt > fiveHoursAgo).length
  const oneWeekAgo = Date.now() - 7 * 86400000
  const weeklyRuns = runs.filter((r) => r.startedAt > oneWeekAgo).length
  const hasRunning = runs.some((r) => r.status === 'running')
  const activityData = buildActivityData(runs)
  const routinesTodayCompleted = todayRoutineRuns.filter((r) => r.status === 'completed').length

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="max-w-[1400px] mx-auto px-6 pb-6 space-y-4">
        <Header status={hasRunning ? 'RUNNING' : 'IDLE'} />
        <TokenMeters
          routinesToday={routinesTodayCompleted}
          routinesTotal={routineDefinitions.length}
        />

        <ActivityChart data={activityData} />
        <IntegrationBar skillCount={skills.length} />

        <hr className="border-t border-[rgba(255,255,255,0.08)]" />

        <DashboardClient recentRuns={recentRuns} />

        <hr className="border-t border-[rgba(255,255,255,0.08)]" />

        <VaultPulse files={memoryFiles} />
      </div>
    </div>
  )
}
