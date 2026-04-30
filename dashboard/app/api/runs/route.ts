import { getRuns, getRunOutput } from '@/lib/runs'

export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const id = url.searchParams.get('id')

  if (id) {
    const output = getRunOutput(id)
    return Response.json({ id, output })
  }

  const runs = getRuns(20)
  return Response.json({ runs })
}
