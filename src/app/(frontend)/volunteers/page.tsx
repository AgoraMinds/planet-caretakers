import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { VolunteerGrid } from '@/components/sections/VolunteerGrid'
import { CTABanner } from '@/components/sections/CTABanner'
import { Container } from '@/components/layout/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volunteers | Planet Caretakers',
  description: 'Meet our volunteer leaders across Portugal and the world.',
}

export default async function VolunteersPage() {
  const payload = await getPayload()

  const [volunteersPage, leaders] = await Promise.all([
    payload.findGlobal({ slug: 'volunteers-page' }),
    payload.find({ collection: 'volunteer-leaders', sort: 'order', limit: 50, depth: 1 }),
  ])

  const hero = volunteersPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const cta = volunteersPage.recruitmentCta as Record<string, unknown> | undefined
  const ctaButton = cta?.button as { label: string; url: string } | undefined

  const portugalLeaders = leaders.docs
    .filter((l) => l.region === 'portugal')
    .map((l) => ({
      name: l.name as string,
      location: l.location as string,
      country: l.country as string,
      photo: l.photo && typeof l.photo === 'object'
        ? { url: (l.photo as Record<string, string>).url, alt: (l.photo as Record<string, string>).alt }
        : null,
      contact: l.contact as { instagram?: string | null; email?: string | null } | null,
    }))

  const worldwideLeaders = leaders.docs
    .filter((l) => l.region === 'worldwide')
    .map((l) => ({
      name: l.name as string,
      location: l.location as string,
      country: l.country as string,
      photo: l.photo && typeof l.photo === 'object'
        ? { url: (l.photo as Record<string, string>).url, alt: (l.photo as Record<string, string>).alt }
        : null,
      contact: l.contact as { instagram?: string | null; email?: string | null } | null,
    }))

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Our Volunteers'}
        subtitle={hero?.subtitle as string}
        backgroundImageUrl={bgImage?.url}
      />

      <section className="py-20">
        <Container>
          {portugalLeaders.length > 0 && (
            <VolunteerGrid
              title={(volunteersPage.portugalSection as Record<string, string>)?.heading || 'Portugal Team Leaders'}
              volunteers={portugalLeaders}
            />
          )}
          {worldwideLeaders.length > 0 && (
            <VolunteerGrid
              title={(volunteersPage.worldwideSection as Record<string, string>)?.heading || 'Worldwide Leaders'}
              volunteers={worldwideLeaders}
            />
          )}
        </Container>
      </section>

      <CTABanner
        heading={(cta?.heading as string) || 'Want to get involved?'}
        description={cta?.description as string}
        buttonLabel={ctaButton?.label || 'Become a Volunteer'}
        buttonUrl={ctaButton?.url || '/contact'}
      />
    </>
  )
}
