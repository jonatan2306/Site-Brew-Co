import { NextRequest, NextResponse } from 'next/server'

// URL réelle du webhook n8n — requête faite côté serveur, pas de CORS
const N8N_WEBHOOK_URL =
  'https://n8n.nexoria-dev.online/webhook/4ff810b1-4c1d-4038-807f-68107bbd6036/chat'

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const contentType = request.headers.get('content-type') ?? 'application/json'

    const n8nResponse = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': contentType },
      body,
    })

    const responseText = await n8nResponse.text()

    return new NextResponse(responseText, {
      status: n8nResponse.status,
      headers: {
        'Content-Type': n8nResponse.headers.get('content-type') ?? 'application/json',
      },
    })
  } catch (error) {
    console.error('[chat proxy] POST error:', error)
    return NextResponse.json(
      { error: 'Impossible de joindre le service de chat.' },
      { status: 502 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const qs = searchParams.toString()
    const url = qs ? `${N8N_WEBHOOK_URL}?${qs}` : N8N_WEBHOOK_URL

    const n8nResponse = await fetch(url)
    const responseText = await n8nResponse.text()

    return new NextResponse(responseText, {
      status: n8nResponse.status,
      headers: {
        'Content-Type': n8nResponse.headers.get('content-type') ?? 'application/json',
      },
    })
  } catch (error) {
    console.error('[chat proxy] GET error:', error)
    return NextResponse.json(
      { error: 'Impossible de joindre le service de chat.' },
      { status: 502 }
    )
  }
}
