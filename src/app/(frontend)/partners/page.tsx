import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { CTABanner } from '@/components/sections/CTABanner'
import { OriginStory } from '@/components/sections/OriginStory'
import { PartnerPackages } from '@/components/sections/PartnerPackages'
import { FAQ } from '@/components/sections/FAQ'
import { BookCall } from '@/components/sections/BookCall'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Corporate Partners | Planet Caretakers',
  description: 'Partner with Planet Caretakers and make a measurable environmental impact.',
}

export default async function PartnersPage() {
  let partnersPage: any = {}
  let partners: any = { docs: [] }

  try {
    const payload = await getPayload()

    ;[partnersPage, partners] = await Promise.all([
      payload.findGlobal({ slug: 'partners-page' }),
      payload.find({ collection: 'partners', sort: 'order', limit: 50, depth: 1 }),
    ])
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = partnersPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined
  const benefits = (partnersPage.benefits as { title: string; description: string; icon?: { url: string; alt: string } }[]) || []
  const cta = partnersPage.cta as Record<string, string> | undefined

  // Partnership Packages
  const fallbackPackages = [
    {
      name: 'Community Partner',
      tagline: 'Join the movement',
      features: [{ feature: 'Logo on website' }, { feature: 'Social media mention' }, { feature: 'Quarterly impact report' }, { feature: 'Volunteer day for your team' }],
      ctaLabel: 'Get Started',
      ctaUrl: '/contact',
      highlighted: false,
    },
    {
      name: 'Impact Partner',
      tagline: 'Lead the change',
      features: [{ feature: 'Everything in Community' }, { feature: 'Co-branded events' }, { feature: 'Dedicated account manager' }, { feature: 'Monthly impact dashboard' }, { feature: 'Press release collaboration' }],
      ctaLabel: 'Contact Us',
      ctaUrl: '/contact',
      highlighted: true,
    },
    {
      name: 'Strategic Partner',
      tagline: 'Transform together',
      features: [{ feature: 'Everything in Impact' }, { feature: 'Custom project sponsorship' }, { feature: 'Board advisory access' }, { feature: 'Annual sustainability report' }, { feature: 'International event naming rights' }],
      ctaLabel: "Let's Talk",
      ctaUrl: '/contact',
      highlighted: false,
    },
  ]

  const packages = (partnersPage.packages as typeof fallbackPackages) || []
  const displayPackages = packages.length > 0 ? packages : fallbackPackages

  // FAQ
  const fallbackFaq = [
    { question: 'What is the minimum partnership commitment?', answer: 'We offer flexible partnership models. Our Community Partner tier starts with a simple annual commitment, but we are happy to discuss custom arrangements that fit your organization.' },
    { question: 'How do you measure and report impact?', answer: 'We provide detailed quarterly impact reports including tons of waste collected, volunteer hours, number of cleanups, and environmental metrics specific to your sponsored activities.' },
    { question: 'Can our employees participate in cleanups?', answer: 'Absolutely! Team volunteer days are included in all partnership tiers. We organize dedicated events for your team and handle all logistics.' },
    { question: 'Do you operate outside of Portugal?', answer: 'Yes! We currently have active teams in 8+ countries including the UK, Malawi, Gambia, and Nepal. We can organize international partnership activities.' },
    { question: 'Is my contribution tax-deductible?', answer: 'As a registered nonprofit (NIF 516305280), contributions to Planet Caretakers may qualify for tax benefits. We recommend consulting with your tax advisor for specific guidance.' },
  ]

  const faqItems = (partnersPage.faq as typeof fallbackFaq) || []
  const displayFaq = faqItems.length > 0 ? faqItems : fallbackFaq

  // Case Studies
  const caseStudies = (partnersPage.caseStudies as { title: string; partnerName: string; challenge: string; solution: string; outcomes: string; logo?: { url: string; alt?: string } | null; image?: { url: string; alt?: string } | null }[]) || []

  // Book a Call
  const bookCall = partnersPage.bookCall as Record<string, unknown> | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Corporate Partners'}
        subtitle={hero?.subtitle as string || 'Partner with us to make a measurable environmental impact and engage your team in meaningful sustainability actions.'}
        backgroundImageUrl={bgImage?.url}
      />

      {/* Benefits */}
      <section className="py-20">
        <Container>
          <SectionHeading title="Partnership Benefits" subtitle="Why businesses choose to partner with Planet Caretakers" />
          {benefits.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((b, i) => (
                <div key={i} className="rounded-2xl bg-brand-sand-light p-6">
                  <h3 className="text-lg font-bold text-brand-teal-dark">{b.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">{b.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="rounded-2xl bg-brand-sand-light p-6">
                <h3 className="text-lg font-bold text-brand-teal-dark">Measurable Impact</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">Track and report on your environmental contributions with detailed impact data.</p>
              </div>
              <div className="rounded-2xl bg-brand-sand-light p-6">
                <h3 className="text-lg font-bold text-brand-teal-dark">Team Engagement</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">Build stronger teams through meaningful volunteer experiences that align with your values.</p>
              </div>
              <div className="rounded-2xl bg-brand-sand-light p-6">
                <h3 className="text-lg font-bold text-brand-teal-dark">Brand Alignment</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">Demonstrate your commitment to sustainability and connect with conscious consumers.</p>
              </div>
            </div>
          )}
        </Container>
      </section>

      {/* Partnership Packages */}
      <PartnerPackages packages={displayPackages} />

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <CaseStudies caseStudies={caseStudies} />
      )}

      {/* FAQ */}
      <FAQ items={displayFaq} />

      {/* Book a Call */}
      {bookCall?.enabled !== false && (
        <BookCall
          heading={bookCall?.heading as string | undefined}
          description={bookCall?.description as string | undefined}
          calendlyUrl={bookCall?.calendlyUrl as string | undefined}
        />
      )}

      {/* Origin Story */}
      {(partnersPage.originStory as Record<string, unknown>)?.enabled !== false && (
        <OriginStory
          heading={(partnersPage.originStory as Record<string, string>)?.heading}
          subheading={(partnersPage.originStory as Record<string, string>)?.subheading}
          description={(partnersPage.originStory as Record<string, string>)?.description}
          stats={((partnersPage.originStory as Record<string, unknown>)?.stats as { value: string; label: string; suffix?: string }[]) || undefined}
        />
      )}

      {/* Current Partners */}
      {partners.docs.length > 0 && (
        <PartnerLogos
          partners={partners.docs.map((p: any) => ({
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
        description={cta?.description || 'Partner with Planet Caretakers and join leading organizations in caring for our planet.'}
        buttonLabel={cta?.buttonLabel || "Let's Go!"}
        buttonUrl={cta?.buttonUrl || '/contact'}
      />
    </>
  )
}
