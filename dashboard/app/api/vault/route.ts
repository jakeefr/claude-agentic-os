import { NextRequest, NextResponse } from 'next/server'
import { getVaultTree, readVaultFile } from '@/lib/vault'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const filePath = request.nextUrl.searchParams.get('file')

  if (filePath) {
    const content = readVaultFile(filePath)
    if (content === null) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 })
    }
    return NextResponse.json({ content })
  }

  const tree = getVaultTree()
  return NextResponse.json({ tree })
}
