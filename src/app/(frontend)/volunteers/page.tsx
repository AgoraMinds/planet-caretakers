import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { VolunteerGrid } from '@/components/sections/VolunteerGrid'
import { CTABanner } from '@/components/sections/CTABanner'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { Checklist } from '@/components/sections/Checklist'
import { SafetyInfo } from '@/components/sections/SafetyInfo'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Badge } from '@/components/ui/Badge'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Volunteers | Planet Caretakers',
  description: 'Meet our volunteer leaders across Portugal and the world.',
}

export default async function VolunteersPage() {
  let volunteersPage: any = {}
  let leaders: any = { docs: [] }

  try {
    const payload = await getPayload()

    ;[volunteersPage, leaders] = await Promise.all([
      payload.findGlobal({ slug: 'volunteers-page' }),
      payload.find({ collection: 'volunteer-leaders', sort: 'order', limit: 50, depth: 1 }),
    ])
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = volunteersPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const cta = volunteersPage.recruitmentCta as Record<string, unknown> | undefined
  const ctaButton = cta?.button as { label: string; url: string } | undefined
  const howItWorks = volunteersPage.howItWorks as Record<string, unknown> | undefined
  const whatToBring = volunteersPage.whatToBring as Record<string, unknown> | undefined
  const safetyInfoData = volunteersPage.safetyInfo as Record<string, unknown> | undefined
  const dbOpportunities = volunteersPage.opportunities as { title: string; description: string; location?: string; type?: string }[] | undefined

  const fallbackSteps = [
    { title: 'Sign Up', description: 'Fill out our volunteer form and tell us about yourself and your interests.' },
    { title: 'Get Matched', description: 'We will connect you with a local team leader in your area or help you start a new team.' },
    { title: 'Join a Cleanup', description: 'Attend your first cleanup event and meet fellow caretakers in your community.' },
    { title: 'Make It Regular', description: 'Become a regular volunteer and help us organize monthly cleanups in your area.' },
  ]

  const fallbackChecklist = [
    { item: 'Reusable water bottle', description: 'Stay hydrated without single-use plastic' },
    { item: 'Sunscreen & hat', description: 'Protect yourself from sun exposure' },
    { item: 'Sturdy closed-toe shoes', description: 'For safety on uneven terrain' },
    { item: 'Work gloves', description: 'We provide gloves, but bring your own if preferred' },
    { item: 'Comfortable clothing', description: 'Clothes you don\'t mind getting dirty' },
    { item: 'Positive attitude!', description: 'The most important thing to bring' },
  ]

  const fallbackOpportunities = [
    { title: 'Beach Cleanup Volunteer', description: 'Join our regular coastal cleanups removing trash and debris from beaches across Portugal.', location: 'Multiple locations, Portugal', type: 'beach-cleanup' },
    { title: 'Underwater Caretaker', description: 'Certified divers can join our underwater cleanup operations removing debris from the ocean floor.', location: 'Various coastal locations', type: 'underwater-cleanup' },
    { title: 'Team Leader', description: 'Lead your own local cleanup team. We provide training, resources, and ongoing support.', location: 'Anywhere in the world', type: 'team-leader' },
    { title: 'Education Ambassador', description: 'Help spread environmental awareness through school visits, workshops, and community events.', location: 'Portugal & worldwide', type: 'education' },
  ]

  const steps = (howItWorks?.steps as { title: string; description: string }[] | undefined)?.length
    ? (howItWorks!.steps as { title: string; description: string }[])
    : fallbackSteps

  const checklistItems = (whatToBring?.items as { item: string; description?: string }[] | undefined)?.length
    ? (whatToBring!.items as { item: string; description?: string }[])
    : fallbackChecklist

  const opportunities = dbOpportunities?.length ? dbOpportunities : fallbackOpportunities

  const typeLabels: Record<string, string> = {
    'beach-cleanup': 'Beach Cleanup',
    'forest-cleanup': 'Forest Cleanup',
    'urban-cleanup': 'Urban Cleanup',
    'underwater-cleanup': 'Underwater Cleanup',
    reforestation: 'Reforestation',
    education: 'Education',
    'team-leader': 'Team Leader',
  }

  const fallbackPortugal = [
    { name: 'Ana Brites', location: 'Ericeira', country: 'Portugal', photo: null, contact: { instagram: 'https://instagram.com/anabrites', email: null } },
    { name: 'Bárbara Camões', location: 'Cascais', country: 'Portugal', photo: null, contact: null },
    { name: 'Andreia', location: 'Sintra', country: 'Portugal', photo: null, contact: null },
    { name: 'Diana Tavares', location: 'Almada', country: 'Portugal', photo: null, contact: null },
    { name: 'Diogo Amaral', location: 'Figueira da Foz', country: 'Portugal', photo: null, contact: { instagram: 'https://instagram.com/xibanga79', email: null } },
    { name: 'Filipa Marques', location: 'Oeiras', country: 'Portugal', photo: null, contact: null },
    { name: 'Katia', location: 'Meco', country: 'Portugal', photo: null, contact: null },
    { name: 'Kristine', location: 'Fonte da Telha', country: 'Portugal', photo: null, contact: null },
    { name: 'Maria Gabriela', location: 'Ericeira', country: 'Portugal', photo: null, contact: null },
    { name: 'Marta Iva', location: 'Monte da Caparica', country: 'Portugal', photo: null, contact: null },
    { name: 'Pedro Trevidic', location: 'Setúbal', country: 'Portugal', photo: null, contact: null },
    { name: 'Rita Martins', location: 'Lisboa', country: 'Portugal', photo: null, contact: null },
    { name: 'Tânia Garfinho', location: 'Trafaria', country: 'Portugal', photo: null, contact: null },
  ]

  const fallbackWorldwide = [
    { name: 'Maddie Howarth', location: 'United Kingdom', country: 'United Kingdom', photo: null, contact: { instagram: 'https://instagram.com/maddiejhowarth', email: null } },
    { name: 'Pike', location: 'Malawi', country: 'Malawi', photo: null, contact: null },
    { name: 'Modou', location: 'Gambia', country: 'Gambia', photo: null, contact: null },
    { name: 'Himal', location: 'Nepal', country: 'Nepal', photo: null, contact: null },
  ]

  const dbPortugalLeaders = leaders.docs
    .filter((l: any) => l.region === 'portugal')
    .map((l: any) => ({
      name: l.name as string,
      location: l.location as string,
      country: l.country as string,
      isPlaceholder: l.isPlaceholder as boolean | undefined,
      photo: l.photo && typeof l.photo === 'object'
        ? { url: (l.photo as Record<string, string>).url, alt: (l.photo as Record<string, string>).alt }
        : null,
      contact: l.contact as { instagram?: string | null; email?: string | null } | null,
    }))

  const dbWorldwideLeaders = leaders.docs
    .filter((l: any) => l.region === 'worldwide')
    .map((l: any) => ({
      name: l.name as string,
      location: l.location as string,
      country: l.country as string,
      isPlaceholder: l.isPlaceholder as boolean | undefined,
      photo: l.photo && typeof l.photo === 'object'
        ? { url: (l.photo as Record<string, string>).url, alt: (l.photo as Record<string, string>).alt }
        : null,
      contact: l.contact as { instagram?: string | null; email?: string | null } | null,
    }))

  const portugalLeaders = dbPortugalLeaders.length > 0 ? dbPortugalLeaders : fallbackPortugal
  const worldwideLeaders = dbWorldwideLeaders.length > 0 ? dbWorldwideLeaders : fallbackWorldwide

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Our Volunteers'}
        subtitle={hero?.subtitle as string || 'Meet the passionate leaders bringing Planet Caretakers to communities worldwide.'}
        backgroundImageUrl={bgImage?.url}
      />

      {(howItWorks?.enabled !== false) && (
        <HowItWorks
          heading={(howItWorks?.heading as string) || 'How to Become a Volunteer'}
          steps={steps}
        />
      )}

      {(whatToBring?.enabled !== false) && (
        <Checklist
          heading={(whatToBring?.heading as string) || 'What to Bring'}
          items={checklistItems}
        />
      )}

      {(safetyInfoData?.enabled !== false) && (
        <SafetyInfo
          heading={(safetyInfoData?.heading as string) || 'Safety & Insurance'}
          content={(safetyInfoData?.content as string) || 'Your safety is our priority. All cleanup events are supervised by trained team leaders. We provide safety briefings before every event and ensure all necessary equipment is available. Volunteers under 16 must be accompanied by a parent or guardian.'}
          insuranceNote={(safetyInfoData?.insuranceNote as string) || 'All registered volunteers are covered by our volunteer insurance policy during official Planet Caretakers events.'}
        />
      )}

      {opportunities.length > 0 && (
        <section className="py-20">
          <Container>
            <SectionHeading title="Volunteer Opportunities" subtitle="Find the right role for you and start making a difference." />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {opportunities.map((opp, i) => (
                <div key={i} className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                  {opp.type && (
                    <Badge label={typeLabels[opp.type] || opp.type} variant="teal" className="mb-3" />
                  )}
                  <h3 className="text-lg font-bold text-brand-teal-dark">{opp.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{opp.description}</p>
                  {opp.location && (
                    <p className="mt-3 text-xs text-gray-500 flex items-center gap-1">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                      </svg>
                      {opp.location}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <VolunteerGrid
            title={(volunteersPage.portugalSection as Record<string, string>)?.heading || 'Portugal Team Leaders'}
            volunteers={portugalLeaders}
          />
          <VolunteerGrid
            title={(volunteersPage.worldwideSection as Record<string, string>)?.heading || 'Worldwide Leaders'}
            volunteers={worldwideLeaders}
          />
        </Container>
      </section>

      <CTABanner
        heading={(cta?.heading as string) || 'Want to get involved?'}
        description={(cta?.description as string) || 'Join our global community of volunteers making a real difference.'}
        buttonLabel={ctaButton?.label || 'Become a Volunteer'}
        buttonUrl={ctaButton?.url || '/contact'}
      />
    </>
  )
}
