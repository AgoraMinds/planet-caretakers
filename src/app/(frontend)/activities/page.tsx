import { getPayload } from '@/lib/payload'
import { HeroSection } from '@/components/sections/HeroSection'
import { ProjectShowcase } from '@/components/sections/ProjectShowcase'
import { ActivityCategoryGrid } from '@/components/sections/ActivityCategoryGrid'
import { EventsCarousel } from '@/components/sections/EventsCarousel'
import { CTABanner } from '@/components/sections/CTABanner'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Activities | Planet Caretakers',
  description: 'Explore our environmental activities, featured projects, and upcoming cleanup events.',
}

export default async function ActivitiesPage() {
  let activitiesPage: any = {}
  let projects: any = { docs: [] }
  let categories: any = { docs: [] }
  let events: any = { docs: [] }

  try {
    const payload = await getPayload()

    ;[activitiesPage, projects, categories, events] = await Promise.all([
      payload.findGlobal({ slug: 'activities-page' }),
      payload.find({
        collection: 'projects',
        where: { isFeatured: { equals: true } },
        sort: 'order',
        limit: 4,
        depth: 1,
      }),
      payload.find({ collection: 'activity-categories', sort: 'order', limit: 10, depth: 1 }),
      payload.find({
        collection: 'events',
        where: {
          _status: { equals: 'published' },
          date: { greater_than: new Date().toISOString() },
        },
        sort: 'date',
        limit: 6,
        depth: 1,
      }),
    ])
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const hero = activitiesPage.hero as Record<string, unknown> | undefined
  const bgImage = hero?.backgroundImage as { url: string } | undefined

  return (
    <>
      <HeroSection
        tagline={(hero?.heading as string) || 'Our Activities'}
        subtitle={hero?.subtitle as string || 'From beach cleanups to educational programs, discover the many ways we care for our planet.'}
        backgroundImageUrl={bgImage?.url}
      />

      {projects.docs.length > 0 && (
        <ProjectShowcase
          projects={projects.docs.map((p: any) => ({
            title: p.title as string,
            slug: p.slug as string,
            subtitle: p.subtitle as string | null,
            featuredImage: p.featuredImage && typeof p.featuredImage === 'object'
              ? { url: (p.featuredImage as Record<string, string>).url, alt: (p.featuredImage as Record<string, string>).alt }
              : null,
            stats: (p.stats as { label: string; value: string }[]) || [],
          }))}
          heading={(activitiesPage.featuredProjectsSection as Record<string, string>)?.heading || 'Featured Projects'}
        />
      )}

      {categories.docs.length > 0 && (
        <ActivityCategoryGrid
          categories={categories.docs.map((c: any) => ({
            title: c.title as string,
            description: c.description as string,
            icon: c.icon && typeof c.icon === 'object'
              ? { url: (c.icon as Record<string, string>).url, alt: (c.icon as Record<string, string>).alt }
              : null,
            image: c.image && typeof c.image === 'object'
              ? { url: (c.image as Record<string, string>).url, alt: (c.image as Record<string, string>).alt }
              : null,
          }))}
          heading={(activitiesPage.categoriesSection as Record<string, string>)?.heading || 'What We Do'}
        />
      )}

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
          heading={(activitiesPage.eventsSection as Record<string, string>)?.heading || 'Upcoming Events'}
        />
      )}

      <CTABanner
        heading="Get Involved Today"
        description="For a thriving planet — one act of care at a time."
        buttonLabel="Contact Us"
        buttonUrl="/contact"
      />
    </>
  )
}
