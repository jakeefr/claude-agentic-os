import { getUsage } from '@/lib/token-tracker'

export const dynamic = 'force-dynamic'

export async function GET() {
  return Response.json(getUsage())
}
