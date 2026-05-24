import { NextRequest, NextResponse } from 'next/server'

/**
 * Route proxy – Réservation de table
 *
 * Objectif : transmettre les données du formulaire au webhook n8n
 * sans jamais exposer son URL dans le bundle client.
 *
 * Protections :
 *  1. Méthode POST uniquement
 *  2. Vérification Origin / Referer  → rejette les appels directs hors-site
 *  3. Rate-limit par IP              → max 5 soumissions / 10 min
 *  4. Validation stricte du payload  → aucun champ arbitraire ne passe
 *  5. URL n8n stockée dans .env.local (côté serveur uniquement)
 */

// ── Webhook n8n (jamais visible côté client) ──────────────────────────────────
const WEBHOOK_URL = process.env.N8N_RESERVATION_WEBHOOK

// ── Rate-limit en mémoire ─────────────────────────────────────────────────────
// (suffisant pour une app monoprocéssus ; remplacer par Redis/Upstash en multi)
const RATE_MAP = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT   = 5                  // requêtes max par fenêtre
const RATE_WINDOW  = 10 * 60 * 1000    // 10 minutes en ms

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

function isRateLimited(ip: string): boolean {
  const now  = Date.now()
  const slot = RATE_MAP.get(ip)

  if (!slot || now > slot.resetAt) {
    RATE_MAP.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  if (slot.count >= RATE_LIMIT) return true
  slot.count++
  return false
}

// ── Vérification de l'origine de la requête ───────────────────────────────────
function isAllowedOrigin(req: NextRequest): boolean {
  const host   = req.headers.get('host') ?? ''
  const origin = req.headers.get('origin') ?? ''
  const ref    = req.headers.get('referer') ?? ''

  // Toujours autoriser localhost en développement
  if (host.startsWith('localhost') || host.startsWith('127.0.0.1')) return true

  // Construction des origines autorisées à partir du host réel
  const allowed = [`https://${host}`, `http://${host}`]

  if (origin && allowed.some(a => origin === a)) return true
  if (ref    && allowed.some(a => ref.startsWith(a))) return true

  return false
}

// ── Validation du payload ─────────────────────────────────────────────────────
interface ReservationData {
  name:      string
  partySize: number
  date:      string
  time:      string
}

function validateBody(raw: unknown): { ok: true; data: ReservationData } | { ok: false; error: string } {
  if (typeof raw !== 'object' || raw === null) {
    return { ok: false, error: 'Payload invalide.' }
  }

  const b = raw as Record<string, unknown>

  // Nom
  if (
    typeof b.name !== 'string' ||
    b.name.trim().length < 2   ||
    b.name.trim().length > 100
  ) {
    return { ok: false, error: 'Nom invalide (2–100 caractères requis).' }
  }

  // Nombre de personnes
  const partySize = Number(b.partySize)
  if (!Number.isInteger(partySize) || partySize < 1 || partySize > 10) {
    return { ok: false, error: 'Nombre de personnes invalide (1–10).' }
  }

  // Date (format YYYY-MM-DD, non passée)
  if (typeof b.date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(b.date)) {
    return { ok: false, error: 'Date invalide.' }
  }
  const today = new Date().toISOString().split('T')[0]
  if (b.date < today) {
    return { ok: false, error: 'La date ne peut pas être dans le passé.' }
  }

  // Heure (format HH:MM)
  if (typeof b.time !== 'string' || !/^\d{2}:\d{2}$/.test(b.time)) {
    return { ok: false, error: 'Heure invalide.' }
  }

  return {
    ok:   true,
    data: {
      name:      b.name.trim(),
      partySize,
      date:      b.date,
      time:      b.time,
    },
  }
}

// ── Handler POST ──────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  // 0. Vérification de la config serveur
  if (!WEBHOOK_URL) {
    console.error('[reservation] N8N_RESERVATION_WEBHOOK non défini dans .env.local')
    return NextResponse.json(
      { error: 'Service de réservation non configuré.' },
      { status: 503 }
    )
  }

  // 1. Origine autorisée ?
  if (!isAllowedOrigin(request)) {
    return NextResponse.json(
      { error: 'Accès refusé.' },
      { status: 403 }
    )
  }

  // 2. Rate-limit
  const ip = getIp(request)
  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Trop de tentatives. Patientez quelques minutes avant de réessayer.' },
      { status: 429 }
    )
  }

  // 3. Parsing JSON
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return NextResponse.json({ error: 'Format JSON invalide.' }, { status: 400 })
  }

  // 4. Validation métier
  const result = validateBody(raw)
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 422 })
  }

  // 5. Transmission au webhook n8n (URL invisible côté client)
  try {
    const n8nRes = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(result.data),
    })

    if (!n8nRes.ok) {
      console.error('[reservation] n8n a répondu avec le statut', n8nRes.status)
      return NextResponse.json(
        { error: 'Impossible de finaliser la réservation. Veuillez réessayer.' },
        { status: 502 }
      )
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (err) {
    console.error('[reservation] Erreur réseau vers n8n :', err)
    return NextResponse.json(
      { error: 'Le service de réservation est temporairement indisponible.' },
      { status: 502 }
    )
  }
}

// Bloquer explicitement les autres méthodes HTTP
export async function GET()    { return NextResponse.json({ error: 'Méthode non autorisée.' }, { status: 405 }) }
export async function PUT()    { return NextResponse.json({ error: 'Méthode non autorisée.' }, { status: 405 }) }
export async function DELETE() { return NextResponse.json({ error: 'Méthode non autorisée.' }, { status: 405 }) }
