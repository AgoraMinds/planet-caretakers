'use client'

import { useActionState } from 'react'

type FormState = { success: boolean; error?: string } | null

async function submitForm(_prev: FormState, formData: FormData): Promise<FormState> {
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        subject: formData.get('subject'),
        message: formData.get('message'),
      }),
    })
    if (!res.ok) throw new Error('Failed to submit')
    return { success: true }
  } catch {
    return { success: false, error: 'Something went wrong. Please try again.' }
  }
}

export function ContactForm({ heading }: { heading?: string }) {
  const [state, formAction, isPending] = useActionState(submitForm, null)

  if (state?.success) {
    return (
      <div className="rounded-2xl bg-green-50 p-8 text-center">
        <h3 className="text-xl font-bold text-green-800">Thank you!</h3>
        <p className="mt-2 text-green-700">Your message has been sent. We will get back to you soon.</p>
      </div>
    )
  }

  return (
    <div>
      {heading && <h2 className="text-2xl font-bold text-brand-teal-dark mb-6">{heading}</h2>}
      <form action={formAction} className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition"
              placeholder="you@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition"
              placeholder="+351 XXX XXX XXX"
            />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
            <input
              type="text"
              id="subject"
              name="subject"
              required
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition"
              placeholder="What is this about?"
            />
          </div>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none transition resize-none"
            placeholder="Tell us how we can help..."
          />
        </div>
        {state?.error && (
          <p className="text-sm text-red-600">{state.error}</p>
        )}
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isPending ? 'Sending...' : 'Send Message'}
        </button>
      </form>
    </div>
  )
}
