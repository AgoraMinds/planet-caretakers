import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { DonationTiers } from '@/components/sections/DonationTiers'
import { CTABanner } from '@/components/sections/CTABanner'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Donate | Planet Caretakers',
  description: 'Support Planet Caretakers with a donation. Every contribution helps us clean, protect, and restore our planet.',
}

const fallbackTiers = [
  { amount: 5, currency: '€', label: '1 Bag of Trash Collected', description: 'Fund the collection and proper disposal of one full bag of trash from beaches, parks, or urban areas.' },
  { amount: 25, currency: '€', label: 'Fund One Community Cleanup', description: 'Cover the supplies and logistics for one community-led cleanup session in a local neighborhood.' },
  { amount: 50, currency: '€', label: 'Supply Cleanup Kits for a Team', description: 'Provide gloves, bags, pickers, and safety equipment for a full volunteer cleanup team.' },
  { amount: 100, currency: '€', label: 'Sponsor a Full Cleanup Event', description: 'Sponsor an entire cleanup event including equipment, transport, and volunteer coordination.' },
  { amount: 250, currency: '€', label: 'Fund an Underwater Caretakers Dive', description: 'Support a specialized underwater cleanup dive to remove debris from ocean floors and waterways.' },
  { amount: 500, currency: '€', label: 'Launch a New Country Branch', description: 'Help establish Planet Caretakers operations in a new country, training local leaders and building community.' },
]

export default async function DonatePage() {
  let donatePage: any = {}

  try {
    const payload = await getPayload()
    donatePage = await payload.findGlobal({ slug: 'donate-page' })
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = donatePage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const bankTransfer = donatePage.bankTransfer as { enabled?: boolean; heading?: string; description?: string; accountName?: string; iban?: string; swift?: string } | undefined
  const paypal = donatePage.paypal as { enabled?: boolean; heading?: string; paypalUrl?: string } | undefined
  const taxBenefits = donatePage.taxBenefits as { heading?: string; description?: string; nif?: string } | undefined
  const cta = donatePage.cta as Record<string, string> | undefined

  const tiers = (donatePage.impactTiers as { amount: number; currency: string; label: string; description: string }[])?.length
    ? (donatePage.impactTiers as { amount: number; currency: string; label: string; description: string }[])
    : fallbackTiers

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Support Our Mission'}
        subtitle={(hero?.subtitle as string) || 'Every donation helps us clean, protect, and restore our planet.'}
        backgroundImageUrl={bgImage?.url}
        primaryCta={{ label: 'Donate Now', url: '#donate-methods' }}
      />

      {/* Impact Tiers */}
      <DonationTiers tiers={tiers} />

      {/* Donation Methods */}
      <section id="donate-methods" className="py-20 bg-brand-sand-light">
        <Container>
          <SectionHeading
            title="How to Donate"
            subtitle="Choose the method that works best for you."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Bank Transfer */}
            {bankTransfer?.enabled !== false ? (
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-brand-teal-dark mb-4">
                  {bankTransfer?.heading || 'Bank Transfer'}
                </h3>
                {bankTransfer?.description ? (
                  <p className="text-gray-600 mb-4">{bankTransfer.description}</p>
                ) : null}
                <div className="space-y-3">
                  {bankTransfer?.accountName ? (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">Account Name</span>
                      <p className="text-gray-900 font-medium">{bankTransfer.accountName}</p>
                    </div>
                  ) : null}
                  {bankTransfer?.iban ? (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">IBAN</span>
                      <p className="text-gray-900 font-medium font-mono text-sm">{bankTransfer.iban}</p>
                    </div>
                  ) : null}
                  {bankTransfer?.swift ? (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">SWIFT / BIC</span>
                      <p className="text-gray-900 font-medium font-mono">{bankTransfer.swift}</p>
                    </div>
                  ) : null}
                  {!bankTransfer?.iban && !bankTransfer?.swift && (
                    <p className="text-gray-600 italic">Bank transfer details coming soon. Please contact us at info@planetcaretakers.org for details.</p>
                  )}
                </div>
              </div>
            ) : null}

            {/* PayPal */}
            {paypal?.enabled ? (
              <div className="rounded-2xl bg-white p-8 shadow-sm">
                <h3 className="text-xl font-bold text-brand-teal-dark mb-4">
                  {paypal?.heading || 'PayPal'}
                </h3>
                {paypal?.paypalUrl ? (
                  <a
                    href={paypal.paypalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
                  >
                    Donate via PayPal
                  </a>
                ) : (
                  <p className="text-gray-600 italic">PayPal donations coming soon.</p>
                )}
              </div>
            ) : null}

            {/* Direct Contact Fallback */}
            {(!bankTransfer?.enabled && !paypal?.enabled) && (
              <div className="rounded-2xl bg-white p-8 shadow-sm md:col-span-2">
                <h3 className="text-xl font-bold text-brand-teal-dark mb-4">Contact Us to Donate</h3>
                <p className="text-gray-600">
                  We are setting up our online donation methods. In the meantime, please reach out to us directly at{' '}
                  <a href="mailto:info@planetcaretakers.org" className="text-brand-green hover:text-brand-green-light transition-colors font-medium">
                    info@planetcaretakers.org
                  </a>
                  {' '}to arrange your donation.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Tax Benefits */}
      <section className="py-20">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <SectionHeading
              title={(taxBenefits?.heading as string) || 'Tax Benefits'}
              subtitle={(taxBenefits?.description as string) || 'As a registered nonprofit, your donations may be tax-deductible.'}
            />
            <div className="rounded-2xl bg-brand-sand-light p-8">
              <p className="text-gray-700 leading-relaxed">
                Planet Caretakers is a registered nonprofit in Portugal. You can consign your IRS to support our mission.
              </p>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-teal px-6 py-3">
                <span className="text-sm font-semibold text-white uppercase tracking-wide">NIF</span>
                <span className="text-lg font-bold text-white">{(taxBenefits?.nif as string) || '516305280'}</span>
              </div>
              <p className="mt-4 text-sm text-gray-500">
                Consign your IRS to Planet Caretakers — it costs you nothing and helps us do more.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <CTABanner
        heading={cta?.heading || 'Every action counts.'}
        description={cta?.description || 'Your generosity fuels cleanups, education, and environmental restoration around the world.'}
        buttonLabel="Get in Touch"
        buttonUrl="/contact"
      />
    </>
  )
}
