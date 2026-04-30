import fs from 'fs'
import path from 'path'
import { VAULT_ROOT, parseFrontmatter } from '@/lib/vault'

export const dynamic = 'force-dynamic'

const INBOX_DIR = path.join(VAULT_ROOT, 'memory', 'inbox')
const READ_STATE_FILE = path.join(INBOX_DIR, '.read-state.json')

interface InboxItem {
  filename: string
  title: string
  type: string
  date: string
  routine: string
  content: string
  mtime: number
  isRead: boolean
}

function getReadState(): Record<string, boolean> {
  if (!fs.existsSync(READ_STATE_FILE)) return {}
  try {
    return JSON.parse(fs.readFileSync(READ_STATE_FILE, 'utf-8'))
  } catch {
    return {}
  }
}

function saveReadState(state: Record<string, boolean>) {
  if (!fs.existsSync(INBOX_DIR)) fs.mkdirSync(INBOX_DIR, { recursive: true })
  fs.writeFileSync(READ_STATE_FILE, JSON.stringify(state, null, 2))
}

export async function GET() {
  if (!fs.existsSync(INBOX_DIR)) {
    return Response.json({ items: [], unreadCount: 0 })
  }

  const readState = getReadState()
  const items: InboxItem[] = []

  for (const entry of fs.readdirSync(INBOX_DIR)) {
    if (!entry.endsWith('.md')) continue
    const fullPath = path.join(INBOX_DIR, entry)
    const stat = fs.statSync(fullPath)
    const raw = fs.readFileSync(fullPath, 'utf-8')
    const fm = parseFrontmatter(raw)
    const contentAfterFm = raw.replace(/^---[\s\S]*?---\n*/, '')

    const titleMatch = contentAfterFm.match(/^#\s+(.+)/m)
    const title = titleMatch ? titleMatch[1] : entry.replace(/\.md$/, '')

    items.push({
      filename: entry,
      title,
      type: fm.type || 'note',
      date: fm.date || '',
      routine: fm.routine || '',
      content: contentAfterFm,
      mtime: stat.mtime.getTime(),
      isRead: readState[entry] === true,
    })
  }

  items.sort((a, b) => b.mtime - a.mtime)
  const unreadCount = items.filter((i) => !i.isRead).length

  return Response.json({ items, unreadCount })
}

export async function POST(request: Request) {
  const { action, filename } = (await request.json()) as {
    action: 'markRead' | 'markUnread' | 'markAllRead'
    filename?: string
  }

  const readState = getReadState()

  if (action === 'markAllRead') {
    if (fs.existsSync(INBOX_DIR)) {
      for (const entry of fs.readdirSync(INBOX_DIR)) {
        if (entry.endsWith('.md')) readState[entry] = true
      }
    }
  } else if (filename) {
    readState[filename] = action === 'markRead'
  }

  saveReadState(readState)
  return Response.json({ ok: true })
}
