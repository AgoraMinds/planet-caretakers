'use client'

import { useState } from 'react'
import Link from 'next/link'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Activities', href: '/activities' },
  { label: 'Volunteers', href: '/volunteers' },
  { label: 'Partners', href: '/partners' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
]

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-brand-teal"
        aria-label="Open menu"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>

      {/* Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div className="fixed inset-0 bg-black/30" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex items-center justify-between p-4 border-b">
              <span className="text-lg font-bold text-brand-teal">Planet Caretakers</span>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-md p-2 text-gray-700 hover:bg-gray-100"
                aria-label="Close menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="p-4">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-lg px-4 py-3 text-base font-medium text-gray-700 hover:bg-brand-sand hover:text-brand-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-6 px-4 space-y-3">
                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-full bg-brand-green px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-green-light transition-colors"
                >
                  Get Involved
                </Link>
                <Link
                  href="/donate"
                  onClick={() => setIsOpen(false)}
                  className="block w-full rounded-full bg-brand-teal px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-brand-teal-dark transition-colors"
                >
                  Donate
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  )
}
