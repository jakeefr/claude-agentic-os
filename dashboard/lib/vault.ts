import fs from 'fs'
import path from 'path'

function findVaultRoot(): string {
  const parent = path.resolve(process.cwd(), '..')
  if (fs.existsSync(path.join(parent, 'CLAUDE.md'))) return parent
  if (fs.existsSync(path.join(process.cwd(), 'CLAUDE.md'))) return process.cwd()
  return parent
}

export const VAULT_ROOT = findVaultRoot()

const TTL_MS = 60_000
const cache = new Map<string, { data: unknown; ts: number }>()

function cached<T>(key: string, fn: () => T): T {
  const entry = cache.get(key)
  if (entry && Date.now() - entry.ts < TTL_MS) return entry.data as T
  const data = fn()
  cache.set(key, { data, ts: Date.now() })
  return data
}

export function parseFrontmatter(content: string): Record<string, string> {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const result: Record<string, string> = {}
  for (const line of match[1].split('\n')) {
    if (line.startsWith('  ') || line.startsWith('\t') || !line.includes(':')) continue
    const colonIdx = line.indexOf(':')
    const key = line.slice(0, colonIdx).trim()
    const value = line.slice(colonIdx + 1).trim().replace(/^["']|["']$/g, '')
    if (key) result[key] = value
  }
  return result
}

function walkFiles(dir: string, ext: string): string[] {
  if (!fs.existsSync(dir)) return []
  const results: string[] = []
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) results.push(...walkFiles(full, ext))
    else if (entry.name.endsWith(ext)) results.push(full)
  }
  return results
}

export interface Skill {
  name: string
  trigger: string
  category: string
}

export function getSkills(): Skill[] {
  return cached('skills', () => {
    const skillsRoot = path.join(VAULT_ROOT, 'skills')
    const skills: Skill[] = []
    if (!fs.existsSync(skillsRoot)) return skills

    for (const catEntry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
      if (!catEntry.isDirectory()) continue
      const catDir = path.join(skillsRoot, catEntry.name)
      for (const skillEntry of fs.readdirSync(catDir, { withFileTypes: true })) {
        if (!skillEntry.isDirectory()) continue
        const skillFile = path.join(catDir, skillEntry.name, 'SKILL.md')
        if (!fs.existsSync(skillFile)) continue
        const fm = parseFrontmatter(fs.readFileSync(skillFile, 'utf-8'))
        skills.push({
          name: fm.name || skillEntry.name,
          trigger: fm.trigger || '',
          category: catEntry.name,
        })
      }
    }
    return skills
  })
}

export interface MemoryFile {
  name: string
  relativePath: string
  mtime: number
}

export function getRecentMemory(limit = 10): MemoryFile[] {
  return cached(`recentMemory:${limit}`, () => {
    const memoryRoot = path.join(VAULT_ROOT, 'memory')
    const files: MemoryFile[] = walkFiles(memoryRoot, '.md').map((fp) => ({
      name: path.basename(fp, '.md'),
      relativePath: path.relative(memoryRoot, fp).replace(/\\/g, '/'),
      mtime: fs.statSync(fp).mtime.getTime(),
    }))
    return files.sort((a, b) => b.mtime - a.mtime).slice(0, limit)
  })
}

export function getMemoryStats(): { noteCount: number; lastModified: number | null } {
  return cached('memoryStats', () => {
    const files = walkFiles(path.join(VAULT_ROOT, 'memory'), '.md')
    let lastModified: number | null = null
    for (const f of files) {
      const t = fs.statSync(f).mtime.getTime()
      if (lastModified === null || t > lastModified) lastModified = t
    }
    return { noteCount: files.length, lastModified }
  })
}

export interface Project {
  name: string
  type: string
  status: string
  focus: string
  section: string
}

export function getActiveProjects(): Project[] {
  const filePath = path.join(VAULT_ROOT, 'context', 'active-projects.md')
  if (!fs.existsSync(filePath)) return []

  const projects: Project[] = []
  let currentSection = ''
  let current: Partial<Project> | null = null

  for (const line of fs.readFileSync(filePath, 'utf-8').split('\n')) {
    if (line.startsWith('## ')) {
      if (current?.name) projects.push(current as Project)
      current = null
      currentSection = line.replace(/^## /, '').trim()
    } else if (line.startsWith('### ')) {
      if (current?.name) projects.push(current as Project)
      current = { name: line.replace(/^### /, '').trim(), type: '', status: '', focus: '', section: currentSection }
    } else if (current) {
      const tm = line.match(/\*\*Type:\*\*\s*(.+)/)
      const sm = line.match(/\*\*Status:\*\*\s*(.+)/)
      const fm = line.match(/\*\*Current focus:\*\*\s*(.+)/)
      if (tm) current.type = tm[1].trim()
      if (sm) current.status = sm[1].trim()
      if (fm) current.focus = fm[1].trim()
    }
  }
  if (current?.name) projects.push(current as Project)

  return projects.filter((p) => p.name && !p.name.startsWith('|') && !p.name.startsWith('-'))
}

export function timeAgo(ts: number): string {
  const diff = Date.now() - ts
  const m = Math.floor(diff / 60000)
  const h = Math.floor(diff / 3600000)
  const d = Math.floor(diff / 86400000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  if (h < 24) return `${h}h ago`
  return `${d}d ago`
}

export interface VaultEntry {
  name: string
  relativePath: string
  isDirectory: boolean
  mtime: number
  children?: VaultEntry[]
}

export function getVaultTree(): VaultEntry[] {
  return cached('vaultTree', () => {
    const memoryRoot = path.join(VAULT_ROOT, 'memory')
    if (!fs.existsSync(memoryRoot)) return []

    function readDir(dir: string): VaultEntry[] {
      const entries: VaultEntry[] = []
      for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
        if (e.name.startsWith('.')) continue
        const full = path.join(dir, e.name)
        const rel = path.relative(memoryRoot, full).replace(/\\/g, '/')
        if (e.isDirectory()) {
          entries.push({
            name: e.name,
            relativePath: rel,
            isDirectory: true,
            mtime: fs.statSync(full).mtime.getTime(),
            children: readDir(full),
          })
        } else if (e.name.endsWith('.md')) {
          entries.push({
            name: e.name.replace(/\.md$/, ''),
            relativePath: rel,
            isDirectory: false,
            mtime: fs.statSync(full).mtime.getTime(),
          })
        }
      }
      return entries.sort((a, b) => {
        if (a.isDirectory !== b.isDirectory) return a.isDirectory ? -1 : 1
        return a.name.localeCompare(b.name)
      })
    }

    return readDir(memoryRoot)
  })
}

export function readVaultFile(relativePath: string): string | null {
  const memoryRoot = path.join(VAULT_ROOT, 'memory')
  const full = path.join(memoryRoot, relativePath)
  const rel = path.relative(memoryRoot, full)
  if (rel.startsWith('..') || path.isAbsolute(rel) || !fs.existsSync(full)) return null
  return fs.readFileSync(full, 'utf-8')
}

export function getDailyNote(date: string): { content: string; exists: boolean } {
  const filePath = path.join(VAULT_ROOT, 'memory', 'daily-notes', `${date}.md`)
  if (fs.existsSync(filePath)) {
    return { content: fs.readFileSync(filePath, 'utf-8'), exists: true }
  }
  return { content: '', exists: false }
}

export function saveDailyNote(date: string, content: string): void {
  const dir = path.join(VAULT_ROOT, 'memory', 'daily-notes')
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, `${date}.md`), content)
}

export interface SkillDetail {
  name: string
  trigger: string
  category: string
  content: string
  inputs: string
  outputs: string
  dependencies: string
}

export function getSkillDetails(): SkillDetail[] {
  return cached('skillDetails', () => {
    const skillsRoot = path.join(VAULT_ROOT, 'skills')
    const results: SkillDetail[] = []
    if (!fs.existsSync(skillsRoot)) return results

    for (const catEntry of fs.readdirSync(skillsRoot, { withFileTypes: true })) {
      if (!catEntry.isDirectory()) continue
      const catDir = path.join(skillsRoot, catEntry.name)
      for (const skillEntry of fs.readdirSync(catDir, { withFileTypes: true })) {
        if (!skillEntry.isDirectory()) continue
        const skillFile = path.join(catDir, skillEntry.name, 'SKILL.md')
        if (!fs.existsSync(skillFile)) continue
        const raw = fs.readFileSync(skillFile, 'utf-8')
        const fm = parseFrontmatter(raw)
        const contentAfterFm = raw.replace(/^---[\s\S]*?---\n*/, '')
        results.push({
          name: fm.name || skillEntry.name,
          trigger: fm.trigger || '',
          category: catEntry.name,
          content: contentAfterFm,
          inputs: fm.inputs || '',
          outputs: fm.outputs || '',
          dependencies: fm.dependencies || '',
        })
      }
    }
    return results
  })
}
