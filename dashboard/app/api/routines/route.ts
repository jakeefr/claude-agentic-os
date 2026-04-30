import {
  getRoutineDefinitions,
  getTodayRoutineRuns,
  getRoutineRuns,
  getLastRunForRoutine,
} from '@/lib/routines'

export const dynamic = 'force-dynamic'

export async function GET() {
  const definitions = getRoutineDefinitions()
  const todayRuns = getTodayRoutineRuns()
  const recentRuns = getRoutineRuns(20)

  const todayCompleted = todayRuns.filter((r) => r.status === 'completed').length
  const todayCost = todayRuns.reduce((sum, r) => sum + (r.cost ?? 0), 0)

  const routinesWithStatus = definitions.map((def) => {
    const lastRun = getLastRunForRoutine(def.id)
    const todayRun = todayRuns.find((r) => r.routineId === def.id)
    return {
      ...def,
      lastRun: lastRun
        ? { at: lastRun.startedAt, status: lastRun.status }
        : null,
      todayStatus: todayRun?.status ?? 'pending',
      isRunning: todayRun?.status === 'running',
    }
  })

  return Response.json({
    routines: routinesWithStatus,
    today: {
      completed: todayCompleted,
      total: definitions.length,
      cost: todayCost,
    },
    recentRuns,
  })
}
