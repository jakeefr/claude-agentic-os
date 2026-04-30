import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { VAULT_ROOT } from '@/lib/vault'
import {
  getRoutineDefinitions,
  addRoutineRun,
  updateRoutineRun,
} from '@/lib/routines'

export async function POST(request: Request) {
  const { routineId } = (await request.json()) as { routineId: string }

  if (!routineId || typeof routineId !== 'string') {
    return Response.json({ error: 'routineId is required' }, { status: 400 })
  }

  const definitions = getRoutineDefinitions()
  const routine = definitions.find((d) => d.id === routineId)

  if (!routine) {
    return Response.json({ error: 'routine not found' }, { status: 404 })
  }

  const skillPath = path.join(VAULT_ROOT, routine.skillPath)
  if (!fs.existsSync(skillPath)) {
    return Response.json({ error: 'skill file not found' }, { status: 404 })
  }

  const skillContent = fs.readFileSync(skillPath, 'utf-8')
  const id = `routine-${routineId}-${Date.now()}`

  const run = {
    id,
    routineId,
    status: 'running' as const,
    startedAt: Date.now(),
    completedAt: null,
    outputPreview: null,
    cost: null,
  }

  addRoutineRun(run)

  const prompt = `You are executing a scheduled routine. Read and follow the instructions below exactly.\n\nROUTINE: ${routine.name}\nDATE: ${new Date().toISOString().slice(0, 10)}\n\n${skillContent}`

  const outputDir = path.join(VAULT_ROOT, 'automations', 'logs')
  if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true })
  const outputPath = path.join(outputDir, `${id}.out.txt`)

  const child = spawn('claude', ['--print', '--dangerously-skip-permissions', prompt], {
    cwd: VAULT_ROOT,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  })

  const outStream = fs.createWriteStream(outputPath)
  child.stdout.pipe(outStream)
  child.stderr.pipe(outStream)

  child.on('close', (code) => {
    outStream.end()
    const output = fs.existsSync(outputPath)
      ? fs.readFileSync(outputPath, 'utf-8').slice(0, 5000)
      : null
    updateRoutineRun(id, {
      status: code === 0 ? 'completed' : 'failed',
      completedAt: Date.now(),
      outputPreview: output,
      cost: routine.estimatedCost,
    })
  })

  child.on('error', (err) => {
    outStream.end()
    updateRoutineRun(id, {
      status: 'failed',
      completedAt: Date.now(),
      outputPreview: `Process error: ${err.message}`,
      cost: 0,
    })
  })

  return Response.json({ id, routineId, status: 'running' })
}
