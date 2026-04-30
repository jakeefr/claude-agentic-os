#!/usr/bin/env npx tsx
/**
 * Standalone routine runner — invoked by Task Scheduler or cron.
 * Usage: npx tsx automations/run-routine.ts <routine-id>
 */

import fs from 'fs'
import path from 'path'
import { execSync, spawn } from 'child_process'

const ROOT = path.resolve(__dirname, '..')
const ROUTINES_FILE = path.join(ROOT, 'automations', 'routines.json')
const RUNS_FILE = path.join(ROOT, 'automations', 'routine-runs.json')
const LOGS_DIR = path.join(ROOT, 'automations', 'logs')

interface RoutineDefinition {
  id: string
  name: string
  skillPath: string
  estimatedCost: number
  enabled: boolean
}

interface RoutineRun {
  id: string
  routineId: string
  status: string
  startedAt: number
  completedAt: number | null
  outputPreview: string | null
  cost: number | null
}

const routineId = process.argv[2]
if (!routineId) {
  console.error('Usage: npx tsx automations/run-routine.ts <routine-id>')
  process.exit(1)
}

const definitions: RoutineDefinition[] = JSON.parse(fs.readFileSync(ROUTINES_FILE, 'utf-8'))
const routine = definitions.find((d) => d.id === routineId)

if (!routine) {
  console.error(`Routine "${routineId}" not found in routines.json`)
  process.exit(1)
}

if (!routine.enabled) {
  console.error(`Routine "${routineId}" is disabled`)
  process.exit(1)
}

const skillPath = path.join(ROOT, routine.skillPath)
if (!fs.existsSync(skillPath)) {
  console.error(`Skill file not found: ${skillPath}`)
  process.exit(1)
}

const skillContent = fs.readFileSync(skillPath, 'utf-8')
const runId = `routine-${routineId}-${Date.now()}`
const date = new Date().toISOString().slice(0, 10)

const prompt = `You are executing a scheduled routine. Read and follow the instructions below exactly.\n\nROUTINE: ${routine.name}\nDATE: ${date}\n\n${skillContent}`

if (!fs.existsSync(LOGS_DIR)) fs.mkdirSync(LOGS_DIR, { recursive: true })
const outputPath = path.join(LOGS_DIR, `${runId}.out.txt`)

const run: RoutineRun = {
  id: runId,
  routineId,
  status: 'running',
  startedAt: Date.now(),
  completedAt: null,
  outputPreview: null,
  cost: null,
}

const runs: RoutineRun[] = fs.existsSync(RUNS_FILE)
  ? JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8'))
  : []
runs.push(run)
fs.writeFileSync(RUNS_FILE, JSON.stringify(runs, null, 2))

console.log(`Starting routine: ${routine.name} (${runId})`)

const child = spawn('claude', ['--print', '--dangerously-skip-permissions', '-'], {
  cwd: ROOT,
  shell: true,
  stdio: ['pipe', 'pipe', 'pipe'],
  env: { ...process.env },
})

child.stdin.write(prompt)
child.stdin.end()

const outStream = fs.createWriteStream(outputPath)
child.stdout.pipe(outStream)
child.stdout.pipe(process.stdout)
child.stderr.pipe(outStream)
child.stderr.pipe(process.stderr)

child.on('close', (code) => {
  outStream.end()
  const output = fs.existsSync(outputPath)
    ? fs.readFileSync(outputPath, 'utf-8').slice(0, 5000)
    : null

  const updatedRuns: RoutineRun[] = JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8'))
  const idx = updatedRuns.findIndex((r) => r.id === runId)
  if (idx !== -1) {
    updatedRuns[idx] = {
      ...updatedRuns[idx],
      status: code === 0 ? 'completed' : 'failed',
      completedAt: Date.now(),
      outputPreview: output,
      cost: routine.estimatedCost,
    }
    fs.writeFileSync(RUNS_FILE, JSON.stringify(updatedRuns, null, 2))
  }

  console.log(`\nRoutine ${code === 0 ? 'completed' : 'failed'}: ${routine.name}`)
  process.exit(code ?? 1)
})

child.on('error', (err) => {
  outStream.end()
  console.error(`Process error: ${err.message}`)

  const updatedRuns: RoutineRun[] = JSON.parse(fs.readFileSync(RUNS_FILE, 'utf-8'))
  const idx = updatedRuns.findIndex((r) => r.id === runId)
  if (idx !== -1) {
    updatedRuns[idx] = {
      ...updatedRuns[idx],
      status: 'failed',
      completedAt: Date.now(),
      outputPreview: `Process error: ${err.message}`,
      cost: 0,
    }
    fs.writeFileSync(RUNS_FILE, JSON.stringify(updatedRuns, null, 2))
  }

  process.exit(1)
})
