'use client'

import { useState } from 'react'
import { SkillRunner } from './SkillRunner'
import { RecentRunsPanel } from './RecentRunsPanel'
import { ForecastPanel } from './ForecastPanel'
import { QuickLinks } from './QuickLinks'
import { RecentRoutinesPanel } from './RecentRoutinesPanel'
import { RoutineSchedulePanel } from './RoutineSchedulePanel'

export function DashboardClient({ recentRuns }: { recentRuns: number }) {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6">
      <div>
        <SkillRunner onRunStarted={() => setRefreshKey((k) => k + 1)} />
      </div>
      <div className="space-y-4">
        <RecentRunsPanel refreshKey={refreshKey} />
        <RecentRoutinesPanel refreshKey={refreshKey} />
        <ForecastPanel recentRuns={recentRuns} />
        <QuickLinks />
        <RoutineSchedulePanel refreshKey={refreshKey} />
      </div>
    </div>
  )
}
