import { spawn } from 'child_process'
import { addRun, updateRun, getRunOutputPath } from '@/lib/runs'
import { VAULT_ROOT } from '@/lib/vault'
import fs from 'fs'

export async function POST(request: Request) {
  const body = await request.json()
  const { prompt, skill, skillPath } = body as { prompt: string; skill: string; skillPath?: string }

  if (!prompt || typeof prompt !== 'string') {
    return Response.json({ error: 'prompt is required' }, { status: 400 })
  }

  const claudePrompt = skillPath
    ? `Using the ${skill} skill (${skillPath}), execute the following task: ${prompt}`
    : prompt

  const id = `run-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`

  const run = {
    id,
    skill: skill || 'custom',
    prompt,
    status: 'running' as const,
    startedAt: Date.now(),
    completedAt: null,
    output: null,
    pid: null as number | null,
  }

  addRun(run)

  const outputPath = getRunOutputPath(id)

  const child = spawn('claude', ['--print', '--dangerously-skip-permissions', claudePrompt], {
    cwd: VAULT_ROOT,
    shell: true,
    stdio: ['ignore', 'pipe', 'pipe'],
    env: { ...process.env },
  })

  run.pid = child.pid ?? null
  updateRun(id, { pid: run.pid })

  const outStream = fs.createWriteStream(outputPath)
  child.stdout.pipe(outStream)
  child.stderr.pipe(outStream)

  child.on('close', (code) => {
    outStream.end()
    const output = fs.existsSync(outputPath)
      ? fs.readFileSync(outputPath, 'utf-8').slice(0, 5000)
      : null
    updateRun(id, {
      status: code === 0 ? 'completed' : 'failed',
      completedAt: Date.now(),
      output,
    })
  })

  child.on('error', (err) => {
    outStream.end()
    updateRun(id, {
      status: 'failed',
      completedAt: Date.now(),
      output: `Process error: ${err.message}`,
    })
  })

  return Response.json({ id, status: 'running' })
}
