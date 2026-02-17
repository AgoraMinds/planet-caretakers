import type { Metadata } from 'next'

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
  return children
}
