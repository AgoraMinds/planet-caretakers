import '@payloadcms/next/css'
import type React from 'react'

export const metadata = {
  title: 'Planet Caretakers CMS',
}

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
