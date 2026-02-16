'use server'

import { getPayload } from '@/lib/payload'

export async function submitContactForm(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phone = formData.get('phone') as string
  const subject = formData.get('subject') as string
  const message = formData.get('message') as string

  if (!name || !email || !subject || !message) {
    return { success: false, error: 'All required fields must be filled.' }
  }

  try {
    const payload = await getPayload()
    await payload.create({
      collection: 'contact-submissions',
      data: { name, email, phone, subject, message },
    })
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}
