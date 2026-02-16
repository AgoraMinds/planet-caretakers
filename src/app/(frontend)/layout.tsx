import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppWidget } from '@/components/layout/WhatsAppWidget'
import { CookieConsent } from '@/components/layout/CookieConsent'

export default function FrontendLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <WhatsAppWidget />
      <CookieConsent />
    </>
  )
}
