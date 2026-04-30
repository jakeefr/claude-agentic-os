import fs from 'fs'
import path from 'path'
import { VAULT_ROOT } from './vault'

const ROUTINES_FILE = path.join(VAULT_ROOT, 'automations', 'routines.json')
const ROUTINE_RUNS_FILE = path.join(VAULT_ROOT, 'automations', 'routine-runs.json')

const TTL_MS = 60_000
const cache = new Map<string, { data: unknown; ts: number }>()

function cached<T>(key: string, fn: () => T): T {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < TTL_MS) return entry.data as T
  const data = fn()
  cache.set(key, { data, ts: Date.now() })
  return data
}

function invalidateRunsCache() {
  for (const key of cache.keys()) {
    if (key.startsWith('routineRuns:')) cache.delete(key)
  }
}

export interface RoutineDefinition {
  id: string
  name: string
  description: string
  schedule: string
  scheduleHuman: string
  category: string
  skillPath: string
  estimatedMinutes: number
  estimatedCost: number
  enabled: boolean
}

export interface RoutineRun {
  id: string
  routineId: string
  status: 'running' | 'completed' | 'failed'
  startedAt: number
  completedAt: number | null
  outputPreview: string | null
  cost: number | null
}

export function getRoutineDefinitions(): RoutineDefinition[] {
  return cached('routineDefinitions', () => {
    if (!fs.existsSync(ROUTINES_FILE)) return []
    return JSON.parse(fs.readFileSync(ROUTINES_FILE, 'utf-8'))
  })
}

function ensureRunsFile() {
  const dir = path.dirname(ROUTINE_RUNS_FILE)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  if (!fs.existsSync(ROUTINE_RUNS_FILE)) fs.writeFileSync(ROUTINE_RUNS_FILE, '[]')
}

export function getRoutineRuns(limit = 50): RoutineRun[] {
  return cached(`routineRuns:${limit}`, () => {
    ensureRunsFile()
    const data = JSON.parse(fs.readFileSync(ROUTINE_RUNS_FILE, 'utf-8')) as RoutineRun[]
    return data.sort((a, b) => b.startedAt - a.startedAt).slice(0, limit)
  })
}

export function addRoutineRun(run: RoutineRun): void {
  ensureRunsFile()
  const runs = JSON.parse(fs.readFileSync(ROUTINE_RUNS_FILE, 'utf-8')) as RoutineRun[]
  runs.push(run)
  if (runs.length > 200) runs.splice(0, runs.length - 200)
  fs.writeFileSync(ROUTINE_RUNS_FILE, JSON.stringify(runs, null, 2))
  invalidateRunsCache()
}

export function updateRoutineRun(id: string, updates: Partial<RoutineRun>): void {
  ensureRunsFile()
  const runs = JSON.parse(fs.readFileSync(ROUTINE_RUNS_FILE, 'utf-8')) as RoutineRun[]
  const idx = runs.findIndex((r) => r.id === id)
  if (idx === -1) return
  runs[idx] = { ...runs[idx], ...updates }
  fs.writeFileSync(ROUTINE_RUNS_FILE, JSON.stringify(runs, null, 2))
  invalidateRunsCache()
}

export function getTodayRoutineRuns(): RoutineRun[] {
  const runs = getRoutineRuns(200)
  const todayStart = new Date()
  todayStart.setHours(0, 0, 0, 0)
  return runs.filter((r) => r.startedAt >= todayStart.getTime())
}

export function getLastRunForRoutine(routineId: string): RoutineRun | null {
  const runs = getRoutineRuns(200)
  return runs.find((r) => r.routineId === routineId) ?? null
}
