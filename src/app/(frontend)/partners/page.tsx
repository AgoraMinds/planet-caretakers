import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { CTABanner } from '@/components/sections/CTABanner'
import { OriginStory } from '@/components/sections/OriginStory'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Partners | Planet Caretakers',
  description: 'Partner with Planet Caretakers and make a measurable environmental impact.',
}

export default async function PartnersPage() {
  const payload = await getPayload()

  const [partnersPage, partners] = await Promise.all([
    payload.findGlobal({ slug: 'partners-page' }),
    payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 1 }),
  ])

  const hero = partnersPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const benefits = (partnersPage.benefits as { title: string; description: string; icon?: { url: string; alt: string } }[]) || []
  const cta = partnersPage.cta as Record<string, string> | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Corporate Partners'}
        subtitle={hero?.subtitle as string}
        backgroundImageUrl={bgImage?.url}
      />

      {/* Benefits */}
      {benefits.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading title="Partnership Benefits" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="rounded-2xl bg-brand-sand-light p-6">
                  <h3 className="text-lg font-bold text-brand-teal-dark">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Origin Story */}
      {(partnersPage.originStory as Record<string, unknown>)?.enabled !== false && (
        <OriginStory
          heading={(partnersPage.originStory as Record<string, string>).heading}
          subheading={(partnersPage.originStory as Record<string, string>).subheading}
          description={(partnersPage.originStory as Record<string, string>).description}
          stats={((partnersPage.originStory as Record<string, unknown>).stats as { value: string; label: string; suffix?: string }[]) || undefined}
        />
      )}

      {/* Current Partners */}
      {partners.docs.length > 0 && (
        <PartnerLogos
          partners={partners.docs.map((p) => ({
            name: p.name as string,
            url: p.url as string | null,
            logo: p.logo && typeof p.logo === 'object'
              ? { url: (p.logo as Record<string, string>).url, alt: (p.logo as Record<string, string>).alt }
              : null,
          }))}
          heading="Our Partners"
        />
      )}

      <CTABanner
        heading={cta?.heading || 'Ready to make a difference?'}
        description={cta?.description}
        buttonLabel={cta?.buttonLabel || "Let's Go!"}
        buttonUrl={cta?.buttonUrl || '/contact'}
      />
    </>
  )
}
