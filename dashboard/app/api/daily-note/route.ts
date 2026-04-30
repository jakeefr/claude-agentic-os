import { NextRequest, NextResponse } from 'next/server'
import { getDailyNote, saveDailyNote } from '@/lib/vault'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const date = request.nextUrl.searchParams.get('date')
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json({ error: 'Invalid date format' }, { status: 400 })
  }
  const result = getDailyNote(date)
  return NextResponse.json(result)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { date, content } = body
  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date) || typeof content !== 'string') {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }
  saveDailyNote(date, content)
  return NextResponse.json({ ok: true })
}
