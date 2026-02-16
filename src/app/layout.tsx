import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { JsonLd } from '@/components/seo/JsonLd'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
})

export const metadata: Metadata = {
  title: 'Planet Caretakers - Every Action Counts',
  description:
    'Planet Caretakers is a nonprofit organization dedicated to environmental cleanups and conservation worldwide.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'NonprofitOrganization',
            name: 'Planet Caretakers',
            url: 'https://planetcaretakers.org',
            logo: 'https://planetcaretakers.org/images/logo/logo-full.png',
            description:
              'Planet Caretakers is a global nonprofit committed to protecting nature through community cleanups, education, and international collaboration.',
            foundingDate: '2021',
            foundingLocation: { '@type': 'Place', name: 'Costa da Caparica, Portugal' },
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Sobreda',
              addressCountry: 'PT',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+351960238484',
              contactType: 'customer service',
              email: 'info@planetcaretakers.org',
            },
            sameAs: [
              'https://instagram.com/planetcaretakers',
              'https://facebook.com/planetcaretakers',
              'https://linkedin.com/company/planetcaretakers',
              'https://youtube.com/@planetcaretakerss',
            ],
          }}
        />
        {children}
      </body>
    </html>
  )
}
