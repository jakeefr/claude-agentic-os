import fs from 'fs'
import path from 'path'
import os from 'os'

const CLAUDE_DIR = path.join(os.homedir(), '.claude')
const STATS_CACHE_PATH = path.join(CLAUDE_DIR, 'stats-cache.json')
const HISTORY_PATH = path.join(CLAUDE_DIR, 'history.jsonl')
const MANUAL_USAGE_PATH = path.resolve(process.cwd(), '..', 'manual-usage.json')

const FIVE_HOUR_LIMIT = 5_000_000
const WEEKLY_LIMIT = 60_000_000
const CACHE_TTL_MS = 30_000

interface ManualUsage {
  fiveHourResetTime?: number | null
  weeklyResetTime?: number | null
}

interface DailyModelTokens {
  date: string
  tokensByModel: Record<string, number>
}

interface StatsCache {
  dailyModelTokens: DailyModelTokens[]
}

export interface UsageData {
  fiveHourTokens: number
  fiveHourLimit: number
  weeklyTokens: number
  weeklyLimit: number
  fiveHourSessions: number
  weeklySessions: number
  fiveHourResetTime: number | null
  weeklyResetTime: number | null
  trend: 'flat' | 'rising' | 'falling'
  modelBreakdown: Record<string, number>
}

let cachedResult: { data: UsageData; timestamp: number } | null = null

function loadManualUsage(): ManualUsage {
  if (!fs.existsSync(MANUAL_USAGE_PATH)) return {}
  try {
    return JSON.parse(fs.readFileSync(MANUAL_USAGE_PATH, 'utf-8'))
  } catch {
    return {}
  }
}

function loadStatsCache(): StatsCache | null {
  if (!fs.existsSync(STATS_CACHE_PATH)) return null
  try {
    return JSON.parse(fs.readFileSync(STATS_CACHE_PATH, 'utf-8'))
  } catch {
    return null
  }
}

function getTokensFromTranscripts(windowMs: number): { tokens: number; models: Record<string, number> } {
  let tokens = 0
  const models: Record<string, number> = {}

  try {
    const projectsDir = path.join(CLAUDE_DIR, 'projects')
    if (!fs.existsSync(projectsDir)) return { tokens, models }

    const cutoffMs = Date.now() - windowMs

    const projectDirs = fs.readdirSync(projectsDir)
    for (const dir of projectDirs) {
      const projPath = path.join(projectsDir, dir)
      try {
        const stat = fs.statSync(projPath)
        if (!stat.isDirectory()) continue
      } catch { continue }

      const files = fs.readdirSync(projPath).filter((f) => f.endsWith('.jsonl'))
      for (const file of files) {
        const filePath = path.join(projPath, file)
        try {
          const fstat = fs.statSync(filePath)
          if (fstat.mtimeMs < cutoffMs) continue
        } catch { continue }

        const content = fs.readFileSync(filePath, 'utf-8')
        const lines = content.split('\n').filter(Boolean)
        for (const line of lines) {
          try {
            const entry = JSON.parse(line)
            if (entry.type !== 'assistant' || !entry.message?.usage) continue
            const ts = entry.timestamp || entry.message?.created_at
            if (ts && new Date(ts).getTime() < cutoffMs) continue

            const u = entry.message.usage
            const turnTokens =
              (u.input_tokens || 0) +
              (u.output_tokens || 0)
            tokens += turnTokens

            const model = entry.message.model || 'unknown'
            const shortName = model.replace('claude-', '').replace(/-\d{8}$/, '')
            models[shortName] = (models[shortName] || 0) + turnTokens
          } catch {}
        }
      }
    }
  } catch {}

  return { tokens, models }
}

function getSessionCount(windowMs: number): number {
  if (!fs.existsSync(HISTORY_PATH)) return 0
  try {
    const content = fs.readFileSync(HISTORY_PATH, 'utf-8')
    const lines = content.split('\n').filter(Boolean)
    const cutoff = Date.now() - windowMs
    const sessionIds = new Set<string>()
    for (const line of lines) {
      try {
        const entry = JSON.parse(line)
        if (entry.timestamp >= cutoff && entry.sessionId) {
          sessionIds.add(entry.sessionId)
        }
      } catch {}
    }
    return sessionIds.size
  } catch {
    return 0
  }
}

function localDateStr(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getUsage(): UsageData {
  if (cachedResult && Date.now() - cachedResult.timestamp < CACHE_TTL_MS) {
    return cachedResult.data
  }

  const stats = loadStatsCache()
  const manual = loadManualUsage()

  const now = new Date()
  const todayStr = localDateStr(now)

  let weeklyTokens = 0
  const modelBreakdown: Record<string, number> = {}

  if (stats) {
    const sevenDaysAgo = new Date(now.getTime() - 7 * 86400_000)
    const cutoffStr = localDateStr(sevenDaysAgo)

    for (const entry of stats.dailyModelTokens) {
      if (entry.date >= cutoffStr) {
        for (const [model, tokens] of Object.entries(entry.tokensByModel)) {
          weeklyTokens += tokens
          const shortName = model.replace('claude-', '').replace(/-\d{8}$/, '')
          modelBreakdown[shortName] = (modelBreakdown[shortName] || 0) + tokens
        }
      }
    }
  }

  const weeklySessions = getSessionCount(7 * 86400_000)

  const todayTranscripts = getTokensFromTranscripts(24 * 3600_000)
  const statsHasToday = stats?.dailyModelTokens.some((e) => e.date === todayStr) ?? false

  if (!statsHasToday && todayTranscripts.tokens > 0) {
    weeklyTokens += todayTranscripts.tokens
    for (const [model, tokens] of Object.entries(todayTranscripts.models)) {
      modelBreakdown[model] = (modelBreakdown[model] || 0) + tokens
    }
  }

  const fiveHourData = getTokensFromTranscripts(5 * 3600_000)
  const fiveHourTokens = fiveHourData.tokens
  const fiveHourSessions = getSessionCount(5 * 3600_000)

  const fiveHourResetTime = manual.fiveHourResetTime ?? null
  const weeklyResetTime = manual.weeklyResetTime ?? null

  let trend: 'flat' | 'rising' | 'falling' = 'flat'
  if (stats && stats.dailyModelTokens.length >= 3) {
    const recent = stats.dailyModelTokens.slice(-3)
    const totals = recent.map((e) =>
      Object.values(e.tokensByModel).reduce((a, b) => a + b, 0)
    )
    if (totals[2] > totals[0] * 1.3) trend = 'rising'
    else if (totals[2] < totals[0] * 0.7) trend = 'falling'
  }

  const data: UsageData = {
    fiveHourTokens,
    fiveHourLimit: FIVE_HOUR_LIMIT,
    weeklyTokens,
    weeklyLimit: WEEKLY_LIMIT,
    fiveHourSessions,
    weeklySessions,
    fiveHourResetTime,
    weeklyResetTime,
    trend,
    modelBreakdown,
  }

  cachedResult = { data, timestamp: Date.now() }
  return data
}
