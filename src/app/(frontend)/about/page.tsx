import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { PriorityCards } from '@/components/sections/PriorityCards'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About Us | Planet Caretakers',
  description: 'Learn about Planet Caretakers, our story, vision, and the team behind our mission.',
}

export default async function AboutPage() {
  const payload = await getPayload()

  const [aboutPage, teamMembers, partners] = await Promise.all([
    payload.findGlobal({ slug: 'about-page' }),
    payload.find({ collection: 'team-members', sort: 'order', limit: 20, depth: 1 }),
    payload.find({ collection: 'partners', sort: 'order', limit: 20, depth: 1 }),
  ])

  const hero = aboutPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const founderStory = aboutPage.founderStory as Record<string, unknown> | undefined
  const vision = aboutPage.vision as Record<string, unknown> | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'About Us'}
        subtitle={hero?.subtitle as string}
        backgroundImageUrl={bgImage?.url}
      />

      {/* Our Story */}
      {founderStory && (
        <section className="py-20">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <SectionHeading
                  title={(founderStory.heading as string) || 'Our Story'}
                  align="left"
                />
                <div className="prose prose-lg text-gray-600 max-w-none">
                  <p>Planet Caretakers was born from a deep love of nature and community. Founded by {(founderStory.founderName as string) || 'Débora Sá'}, our journey started with small beach cleanups in Portugal and has grown into a global movement.</p>
                </div>
              </div>
              {(founderStory.founderImage as Record<string, string> | null) && (
                <div className="relative h-96 rounded-2xl overflow-hidden">
                  <img
                    src={(founderStory.founderImage as Record<string, string>).url}
                    alt={(founderStory.founderName as string) || 'Founder'}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Vision */}
      {vision && (
        <section className="py-20 bg-brand-teal">
          <Container>
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white">{(vision.heading as string) || 'Our Vision'}</h2>
              <p className="mt-6 text-lg text-gray-200 leading-relaxed">{vision.content as string}</p>
            </div>
          </Container>
        </section>
      )}

      {/* Priorities */}
      {aboutPage.priorityAreas && (aboutPage.priorityAreas as unknown[]).length > 0 && (
        <PriorityCards
          priorities={(aboutPage.priorityAreas as { title: string; description: string; image?: { url: string; alt: string } }[])}
        />
      )}

      {/* Partner Logos */}
      {partners.docs.length > 0 && (
        <PartnerLogos
          partners={partners.docs.map((p) => ({
            name: p.name as string,
            url: p.url as string | null,
            logo: p.logo && typeof p.logo === 'object'
              ? { url: (p.logo as Record<string, string>).url, alt: (p.logo as Record<string, string>).alt }
              : null,
          }))}
          heading="They Trust Us"
        />
      )}

      {/* Team */}
      {teamMembers.docs.length > 0 && (
        <TeamGrid
          members={teamMembers.docs.map((m) => ({
            name: m.name as string,
            role: m.role as string,
            bio: m.bio as string | null,
            photo: m.photo && typeof m.photo === 'object'
              ? { url: (m.photo as Record<string, string>).url, alt: (m.photo as Record<string, string>).alt }
              : null,
            socialLinks: m.socialLinks as Record<string, string | null> | null,
          }))}
          heading={(aboutPage.teamSection as Record<string, string>)?.heading || 'Our Team'}
        />
      )}
    </>
  )
}
