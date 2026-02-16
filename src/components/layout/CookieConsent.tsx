'use client'

import { useState, useEffect } from 'react'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookieConsent')
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'accepted')
    setShowBanner(false)
  }

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-brand-teal-dark text-white p-4 shadow-2xl">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm leading-relaxed">
            We use cookies to improve your experience on our site. By continuing to browse, you accept our use of cookies. 
            <a href="/privacy-policy" className="underline hover:text-brand-sand ml-1">
              Learn more
            </a>
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleDecline}
            className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium hover:bg-white/10 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="rounded-full bg-brand-green px-6 py-2 text-sm font-semibold hover:bg-brand-green-light transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
