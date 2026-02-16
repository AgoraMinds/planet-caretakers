import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { TeamGrid } from '@/components/sections/TeamGrid'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { PriorityCards } from '@/components/sections/PriorityCards'
import { ImpactTimeline } from '@/components/sections/ImpactTimeline'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import Image from 'next/image'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'About Us | Planet Caretakers',
  description: 'Learn about Planet Caretakers, our story, vision, and the team behind our mission.',
}

export default async function AboutPage() {
  let aboutPage: any = {}
  let teamMembers: any = { docs: [] }
  let partners: any = { docs: [] }

  try {
    const payload = await getPayload()

    ;[aboutPage, teamMembers, partners] = await Promise.all([
      payload.findGlobal({ slug: 'about-page' }),
      payload.find({ collection: 'team-members', sort: 'order', limit: 20, depth: 1 }),
      payload.find({ collection: 'partners', sort: 'order', limit: 20, depth: 1 }),
    ])
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const fallbackTeam = [
    { name: 'Débora Sá', role: 'Founder & CEO', photo: null, bio: null, socialLinks: null },
    { name: 'Pedro Olivença', role: 'ECO (Earth Conscious Officer)', photo: null, bio: null, socialLinks: null },
    { name: 'Fernando Amaral', role: 'Strategic Adviser', photo: null, bio: null, socialLinks: null },
    { name: 'Filipe Sá', role: 'CSE (Chief Software Engineer)', photo: null, bio: null, socialLinks: null },
    { name: 'Gustavo Schmidt', role: 'HADS', photo: null, bio: null, socialLinks: null },
    { name: 'Pedro de Freitas', role: 'EMP (Executive Mission Partner)', photo: null, bio: null, socialLinks: null },
    { name: 'Edgar Antunes', role: 'Planet Designer', photo: null, bio: null, socialLinks: null },
    { name: 'Marta Iva', role: 'Volunteer Manager', photo: null, bio: null, socialLinks: null },
  ]

  const fallbackPriorities = [
    { title: 'Community Education', description: 'Empower individuals and communities through education and hands-on involvement.' },
    { title: 'Ecosystem Restoration', description: 'Target natural ecosystem restoration and protection via cleanups, invasive species removal, and reforestation.' },
    { title: 'Institutional Engagement', description: 'Build partnerships with NGOs, businesses, and governments to amplify conservation impact.' },
    { title: 'Awareness Cleanups', description: 'Organize cleanups at beaches, forests, rivers, and vital ecosystems.' },
  ]

  const fallbackMilestones = [
    { year: '2021', title: 'Planet Caretakers Founded', description: 'Débora Sá organizes the first beach cleanup at Fonte da Telha, Portugal, planting the seed for a global movement.', stat: 'First cleanup' },
    { year: '2022', title: 'Growing Across Portugal', description: 'The movement expands with new volunteer leaders joining from Ericeira to the Açores, building a nationwide network of caretakers.', stat: '100+ cleanups' },
    { year: '2023', title: 'Going Global', description: 'Planet Caretakers crosses borders with volunteer teams launching in the UK, Malawi, Gambia, and Nepal. The first Simultaneous Cleanups event unites 8 countries.', stat: '8 countries' },
    { year: '2024', title: 'Scaling Impact', description: 'With 25 active teams conducting over 300 cleanups, the organization removes 44 tons of waste and launches the Underwater Caretakers diving project.', stat: '44 tons removed' },
  ]

  const hero = aboutPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const founderStory = aboutPage.founderStory as Record<string, unknown> | undefined
  const vision = aboutPage.vision as Record<string, unknown> | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'About Us'}
        subtitle={hero?.subtitle as string || 'A global nonprofit born in Portugal, dedicated to community cleanups, education, and environmental conservation worldwide.'}
        backgroundImageUrl={bgImage?.url}
      />

      {/* Our Story */}
      <section className="py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={(founderStory?.heading as string) || 'Our Story'}
                align="left"
              />
              <div className="prose prose-lg text-gray-600 max-w-none">
                {founderStory?.content ? (
                  <p>{founderStory.content as string}</p>
                ) : (
                  <>
                    <p>Planet Caretakers was founded by Débora Sá, a Network Management Technician and Yoga Instructor based in Costa da Caparica, Portugal. Shaped by her years in the Portuguese Scouts, Débora developed a deep connection to nature and community service early in life.</p>
                    <p className="mt-4">In 2020, a trip to Brazil changed everything. While working with the local community on Itaparica Island, she witnessed firsthand the devastating impact of pollution on coastal ecosystems and the people who depend on them.</p>
                    <p className="mt-4">Returning to Portugal, Débora began organizing small beach cleanups at Fonte da Telha. What started as a one-person mission quickly grew into a movement. Today, Planet Caretakers has expanded to 25 volunteer teams across Portugal and beyond, organizing over 300 cleanups and removing more than 44 tons of waste from beaches, forests, rivers, and urban areas across 8 countries.</p>
                  </>
                )}
              </div>
            </div>
            {founderStory && (founderStory.founderImage as Record<string, string> | null) && (
              <div className="relative h-96 rounded-2xl overflow-hidden">
                <Image
                  src={(founderStory.founderImage as Record<string, string>).url}
                  alt={(founderStory.founderName as string) || 'Founder'}
                  fill
                  className="object-cover"
                />
              </div>
            )}
          </div>
        </Container>
      </section>

      {/* Vision */}
      <section className="py-20 bg-brand-teal">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white">{(vision?.heading as string) || 'Our Vision'}</h2>
            <p className="mt-6 text-lg text-gray-200 leading-relaxed">
              {(vision?.content as string) || 'A world where every person is empowered to care for the planet, where communities thrive in harmony with nature, and where environmental action is a shared responsibility across all borders.'}
            </p>
          </div>
        </Container>
      </section>

      {/* Impact Timeline */}
      <ImpactTimeline
        heading={
          (aboutPage.impactTimeline as Record<string, unknown>)?.heading as string || 'Our Journey'
        }
        milestones={
          (aboutPage.impactTimeline as Record<string, unknown>)?.milestones &&
          ((aboutPage.impactTimeline as Record<string, unknown>).milestones as unknown[]).length > 0
            ? ((aboutPage.impactTimeline as Record<string, unknown>).milestones as { year: string; title: string; description: string; stat?: string }[])
            : fallbackMilestones
        }
      />

      {/* Priorities */}
      <PriorityCards
        priorities={aboutPage.priorityAreas && (aboutPage.priorityAreas as unknown[]).length > 0
          ? (aboutPage.priorityAreas as { title: string; description: string; image?: { url: string; alt: string } }[])
          : fallbackPriorities
        }
      />

      {/* Partner Logos */}
      {partners.docs.length > 0 && (
        <PartnerLogos
          partners={partners.docs.map((p: any) => ({
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
      <TeamGrid
        members={teamMembers.docs.length > 0
          ? teamMembers.docs.map((m: any) => ({
              name: m.name as string,
              role: m.role as string,
              bio: m.bio as string | null,
              photo: m.photo && typeof m.photo === 'object'
                ? { url: (m.photo as Record<string, string>).url, alt: (m.photo as Record<string, string>).alt }
                : null,
              socialLinks: m.socialLinks as Record<string, string | null> | null,
            }))
          : fallbackTeam
        }
        heading={(aboutPage.teamSection as Record<string, string>)?.heading || 'Our Team'}
      />
    </>
  )
}
