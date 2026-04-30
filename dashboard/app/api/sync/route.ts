import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

const SYNC_LOG = path.resolve(process.cwd(), '..', 'automations', 'logs', 'sync.log')

export async function GET() {
  if (!fs.existsSync(SYNC_LOG)) {
    return Response.json({ status: 'never', lastSync: null, message: null })
  }

  let last = ''
  try {
    const fd = fs.openSync(SYNC_LOG, 'r')
    try {
      const stat = fs.fstatSync(fd)
      if (stat.size === 0) {
        return Response.json({ status: 'never', lastSync: null, message: null })
      }
      const readSize = Math.min(stat.size, 2048)
      const buf = Buffer.alloc(readSize)
      fs.readSync(fd, buf, 0, readSize, stat.size - readSize)
      const tail = buf.toString('utf-8')
      const lines = tail.trim().split('\n')
      last = lines[lines.length - 1]
    } finally {
      fs.closeSync(fd)
    }
  } catch {
    return Response.json({ status: 'unknown', lastSync: null, message: null })
  }

  const match = last.match(/^\[(\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\] (.+)$/)
  if (!match) {
    return Response.json({ status: 'unknown', lastSync: null, message: last })
  }

  const timestamp = new Date(match[1]).getTime()
  const message = match[2]
  const isSynced = message.startsWith('SYNCED')
  const isError = message.startsWith('ERROR') || message.startsWith('CONFLICT') || message.startsWith('PULL FAILED')

  return Response.json({
    status: isSynced ? 'synced' : isError ? 'error' : 'unknown',
    lastSync: timestamp,
    message,
  })
}
