import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { ImpactStats } from '@/components/sections/ImpactStats'
import { PriorityCards } from '@/components/sections/PriorityCards'
import { EventsCarousel } from '@/components/sections/EventsCarousel'
import { PartnershipBenefits } from '@/components/sections/PartnershipBenefits'
import { PartnerLogos } from '@/components/sections/PartnerLogos'
import { LatestNews } from '@/components/sections/LatestNews'
import { ContactForm } from '@/components/sections/ContactForm'
import { VideoSection } from '@/components/sections/VideoSection'
import { Testimonials } from '@/components/sections/Testimonials'
import { FundraisingProgress } from '@/components/sections/FundraisingProgress'
import { RecruitmentCTA } from '@/components/sections/RecruitmentCTA'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Container } from '@/components/layout/Container'

export default async function HomePage() {
  let homePage: any = {}
  let events: any = { docs: [] }
  let blogPosts: any = { docs: [] }
  let partners: any = { docs: [] }

  try {
    const payload = await getPayload()

    ;[homePage, events, blogPosts, partners] = await Promise.all([
      payload.findGlobal({ slug: 'home-page' }),
      payload.find({
        collection: 'events',
        where: {
          _status: { equals: 'published' },
          date: { greater_than: new Date().toISOString() },
        },
        sort: 'date',
        limit: 6,
      }),
      payload.find({
        collection: 'blog-posts',
        where: { _status: { equals: 'published' } },
        sort: '-publishedDate',
        limit: 3,
        depth: 2,
      }),
      payload.find({
        collection: 'partners',
        sort: 'order',
        limit: 20,
        depth: 1,
      }),
    ])
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = homePage.hero as Record<string, unknown> | undefined
  const primaryCta = hero?.primaryCta as { label: string; url: string } | undefined
  const secondaryCta = hero?.secondaryCta as { label: string; url: string } | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined

  return (
    <>
      {/* Hero */}
      <HeroSection
        tagline={(hero?.tagline as string) || 'Every. Action. Counts.'}
        subtitle={hero?.subtitle as string || 'Join us in caring for our planet through community cleanups, education, and environmental conservation worldwide.'}
        backgroundImageUrl={bgImage?.url}
        primaryCta={primaryCta || { label: 'Get Involved', url: '/contact' }}
        secondaryCta={secondaryCta || { label: 'Learn More', url: '/about' }}
      />

      {/* Impact Stats */}
      {homePage.impactStats && (homePage.impactStats as unknown[]).length > 0 && (
        <ImpactStats
          stats={(homePage.impactStats as { value: string; label: string; suffix?: string }[])}
        />
      )}

      {/* What We Do */}
      {homePage.whatWeDo && (
        <section className="py-20">
          <Container>
            <SectionHeading
              title={(homePage.whatWeDo as Record<string, string>).heading || 'What We Do'}
              subtitle={(homePage.whatWeDo as Record<string, string>).description}
            />
          </Container>
        </section>
      )}

      {/* Priorities */}
      {homePage.priorities && (homePage.priorities as unknown[]).length > 0 && (
        <PriorityCards
          priorities={(homePage.priorities as { title: string; description: string; icon?: { url: string; alt: string } }[])}
        />
      )}

      {/* Upcoming Events */}
      {events.docs.length > 0 && (
        <EventsCarousel
          events={events.docs.map((e: any) => ({
            title: e.title as string,
            slug: e.slug as string,
            date: e.date as string,
            type: e.type as string,
            featuredImage: e.featuredImage && typeof e.featuredImage === 'object'
              ? { url: (e.featuredImage as Record<string, string>).url, alt: (e.featuredImage as Record<string, string>).alt }
              : null,
            location: e.location as { name: string; city: string; country: string } | null,
          }))}
          heading={(homePage.eventsSection as Record<string, string>)?.heading || 'Upcoming Events'}
        />
      )}

      {/* Partnership Benefits */}
      {homePage.partnershipSection && (
        <PartnershipBenefits
          benefits={(homePage.partnershipSection as Record<string, unknown>).benefits as { title: string; description: string; icon?: { url: string; alt: string } }[] || []}
          heading={(homePage.partnershipSection as Record<string, string>).heading}
        />
      )}

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
          heading="Our Partners"
        />
      )}

      {/* Video Section */}
      {(homePage.videoSection as Record<string, unknown>)?.enabled && (
        <VideoSection
          heading={(homePage.videoSection as Record<string, string>).heading}
          subtitle={(homePage.videoSection as Record<string, string>).subtitle}
          videoUrl={(homePage.videoSection as Record<string, string>).videoUrl}
        />
      )}

      {/* Fundraising Progress */}
      {(homePage.fundraising as Record<string, unknown>)?.enabled && (homePage.fundraising as Record<string, unknown>).projects && ((homePage.fundraising as Record<string, unknown>).projects as unknown[]).length > 0 && (
        <FundraisingProgress
          heading={(homePage.fundraising as Record<string, string>).heading}
          subtitle={(homePage.fundraising as Record<string, string>).subtitle}
          projects={((homePage.fundraising as Record<string, unknown>).projects as { title: string; raised: number; goal: number; currency?: string }[])}
        />
      )}

      {/* Testimonials */}
      {(homePage.testimonials as Record<string, unknown>)?.enabled && (homePage.testimonials as Record<string, unknown>).items && ((homePage.testimonials as Record<string, unknown>).items as unknown[]).length > 0 && (
        <Testimonials
          heading={(homePage.testimonials as Record<string, string>).heading}
          subtitle={(homePage.testimonials as Record<string, string>).subtitle}
          testimonials={((homePage.testimonials as Record<string, unknown>).items as { quote: string; author: string; role?: string | null; photo?: { url: string; alt?: string } | null }[])}
        />
      )}

      {/* Latest News */}
      {blogPosts.docs.length > 0 && (
        <LatestNews
          posts={blogPosts.docs.map((p: any) => ({
            title: p.title as string,
            slug: p.slug as string,
            excerpt: p.excerpt as string,
            publishedDate: p.publishedDate as string,
            featuredImage: p.featuredImage && typeof p.featuredImage === 'object'
              ? { url: (p.featuredImage as Record<string, string>).url, alt: (p.featuredImage as Record<string, string>).alt }
              : null,
            author: p.author && typeof p.author === 'object'
              ? { name: (p.author as Record<string, string>).name }
              : null,
          }))}
          heading={(homePage.newsSection as Record<string, string>)?.heading || 'Latest News'}
        />
      )}

      {/* Recruitment CTA */}
      {(homePage.recruitmentCta as Record<string, unknown>)?.enabled && (
        <RecruitmentCTA
          heading={(homePage.recruitmentCta as Record<string, string>).heading}
          description={(homePage.recruitmentCta as Record<string, string>).description}
          buttonLabel={(homePage.recruitmentCta as Record<string, string>).buttonLabel}
          buttonUrl={(homePage.recruitmentCta as Record<string, string>).buttonUrl}
        />
      )}

      {/* Contact Form */}
      {(homePage.contactCta as Record<string, unknown>)?.showForm !== false && (
        <section className="py-20 bg-brand-sand-light">
          <Container>
            <div className="mx-auto max-w-2xl">
              <ContactForm
                heading={(homePage.contactCta as Record<string, string>)?.heading || 'Get In Touch'}
              />
            </div>
          </Container>
        </section>
      )}
    </>
  )
}
