import { NextResponse } from 'next/server'
import { getSkillDetails } from '@/lib/vault'

export const dynamic = 'force-dynamic'

export async function GET() {
  const skills = getSkillDetails()
  return NextResponse.json({ skills })
}
