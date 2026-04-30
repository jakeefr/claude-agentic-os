import fs from 'fs'
import path from 'path'
import { VAULT_ROOT } from './vault'

const RUNS_DIR = path.join(VAULT_ROOT, 'dashboard', '.runs')
const RUNS_FILE = path.join(RUNS_DIR, 'history.json')

export interface Run {
  id: string
  skill: string
  prompt: string
  status: 'running' | 'completed' | 'failed'
  startedAt: number
  completedAt: number | null
  output: string | null
  pid: number | null
}

function ensureRunsDir() {
  if (!fs.existsSync(RUNS_DIR)) {
    fs.mkdirSync(RUNS_DIR, { recursive: true })
  }
}

export function getRuns(limit = 20): Run[] {
  ensureRunsDir()
  if (!fs.existsSync(RUNS_FILE)) return []
  const data = JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8')) as Run[]
  return data.sort((a, b) => b.startedAt - a.startedAt).slice(0, limit)
}

export function addRun(run: Run): void {
  ensureRunsDir()
  const runs = fs.existsSync(RUNS_FILE)
    ? (JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8')) as Run[])
    : []
  runs.push(run)
  if (runs.length > 100) runs.splice(0, runs.length - 100)
  fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 2))
}

export function updateRun(id: string, updates: Partial<Run>): void {
  ensureRunsDir()
  if (!fs.existsSync(RUNS_FILE)) return
  const runs = JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8')) as Run[]
  const idx = runs.findIndex((r) => r.id === id)
  if (idx === -1) return
  runs[idx] = { ...runs[idx], ...updates }
  fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 2))
}

export function getRunOutput(id: string): string | null {
  const outputFile = path.join(RUNS_DIR, `${id}.out.txt`)
  if (!fs.existsSync(outputFile)) return null
  return fs.readFileSync(outputFile, 'utf-8')
}

export function getRunOutputPath(id: string): string {
  ensureRunsDir()
  return path.join(RUNS_DIR, `${id}.out.txt`)
}
