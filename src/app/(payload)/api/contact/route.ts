import { NextResponse } from 'next/server'
import { getPayload } from '@/lib/payload'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All required fields must be filled.' },
        { status: 400 },
      )
    }

    const payload = await getPayload()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, phone, subject, message },
    })

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 },
    )
  }
}
