import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import { ProjectGallery } from '@/components/sections/ProjectGallery'
import { CTABanner } from '@/components/sections/CTABanner'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

const fallbackProjects: Record<string, any> = {
  'underwater-caretakers': {
    title: 'Underwater Caretakers',
    subtitle: 'Working as one to save our oceans',
    descriptionText: 'The project operates with a well-coordinated system involving experienced divers, local fishermen, surfers, and land volunteers to manage and process marine waste effectively. We host educational workshops and activities that raise awareness about marine pollution and inspire participants to become advocates for ocean conservation. By engaging the public, the Underwater Caretakers project not only benefits the environment but also strengthens community involvement and corporate social responsibility.',
    stats: [{ label: 'Editions', value: '2' }, { label: 'Divers', value: '50+' }],
  },
  'simultaneous-cleanups': {
    title: 'Simultaneous Cleanups',
    subtitle: 'Overcoming geographical barriers for a common cause',
    descriptionText: 'This project unites countries across the world on the same day, same time, fostering global collaboration for a shared cause \u2013 environmental stewardship. Our aim is to involve diverse communities, raising awareness about environmental issues, and inspiring lasting change. By inviting NGOs, volunteers, and environmentalists from various nations we showcase the power of collective action and emphasize that environmental challenges know no borders.',
    stats: [{ label: 'Countries', value: '8' }, { label: 'Cleanups', value: '300+' }],
  },
  'water-bottles-concept': {
    title: 'Water Bottles Concept',
    subtitle: 'Turning the tide on single-use plastic water bottles',
    descriptionText: 'Tragically, discarded single-use plastic bottles often find their way into rivers and oceans, where they stubbornly persist for approximately 400 years, breaking down into toxic micro-plastics. We identified a crucial battleground for change: events! Whether it be playful gatherings, sports spectacles, or vibrant music festivals, the problem of single-use plastic water bottles remains prevalent. By ingeniously transforming disposable waste into captivating art, we are aiming to send a resounding message of awareness against single-use plastics and the pressing need for reuse.',
    stats: [],
  },
}

export async function generateStaticParams() {
  try {
    const payload = await getPayload()
    const projects = await payload.find({
      collection: 'projects',
      limit: 100,
      depth: 0,
    })
    return projects.docs.map((project) => ({ slug: project.slug as string }))
  } catch (error) {
    return []
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params

  try {
    const payload = await getPayload()
    const projects = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    const project = projects.docs[0]
    if (project) {
      return {
        title: `${project.title} | Planet Caretakers`,
        description: project.subtitle as string || undefined,
      }
    }
  } catch (error) {
    console.error('Failed to fetch metadata from Payload CMS:', error)
  }

  const fallback = fallbackProjects[slug]
  if (fallback) {
    return {
      title: `${fallback.title} | Planet Caretakers`,
      description: fallback.subtitle,
    }
  }

  return { title: 'Project | Planet Caretakers' }
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params

  let project: any = null

  try {
    const payload = await getPayload()
    const projects = await payload.find({
      collection: 'projects',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 2,
    })
    project = projects.docs[0]
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
  }

  // Try fallback if no DB result
  if (!project) {
    const fallback = fallbackProjects[slug]
    if (!fallback) notFound()

    return (
      <article>
        {/* Hero Header */}
        <section className="bg-brand-teal-dark py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                {fallback.title}
              </h1>
              {fallback.subtitle && (
                <p className="mt-4 text-lg text-gray-300">{fallback.subtitle}</p>
              )}
            </div>
          </Container>
        </section>

        {/* Stats Bar */}
        {fallback.stats && fallback.stats.length > 0 && (
          <section className="bg-brand-sand-light py-8">
            <Container>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
                {fallback.stats.map((stat: { label: string; value: string }, i: number) => (
                  <div key={i} className="text-center">
                    <p className="text-3xl font-extrabold text-brand-teal">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
                  </div>
                ))}
              </div>
            </Container>
          </section>
        )}

        {/* Description */}
        <section className="py-16">
          <Container>
            <div className="max-w-3xl mx-auto">
              <p className="text-gray-700 leading-relaxed text-lg">{fallback.descriptionText}</p>
            </div>
          </Container>
        </section>

        {/* CTA */}
        <CTABanner
          heading="Want to get involved?"
          description="Join us and make a real difference for our planet."
          buttonLabel="Contact Us"
          buttonUrl="/contact"
        />

        {/* Back Link */}
        <section className="py-12">
          <Container>
            <Link
              href="/"
              className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
            >
              &larr; Back to Home
            </Link>
          </Container>
        </section>
      </article>
    )
  }

  // Full DB-driven render
  const featuredImage = project.featuredImage && typeof project.featuredImage === 'object'
    ? (project.featuredImage as Record<string, string>)
    : null
  const stats = (project.stats as { label: string; value: string }[]) || []
  const gallery = (project.gallery as { image: Record<string, string> }[]) || []
  const galleryImages = gallery
    .filter((item) => item.image && typeof item.image === 'object')
    .map((item) => ({ url: item.image.url, alt: item.image.alt }))

  return (
    <article>
      {/* Hero Header */}
      <section className="bg-brand-teal-dark py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {project.title as string}
            </h1>
            {project.subtitle && (
              <p className="mt-4 text-lg text-gray-300">{project.subtitle as string}</p>
            )}
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {featuredImage && (
        <div className="relative max-h-[500px] h-[400px] lg:h-[500px]">
          <Image
            src={featuredImage.url}
            alt={featuredImage.alt || (project.title as string)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Stats Bar */}
      {stats.length > 0 && (
        <section className="bg-brand-sand-light py-8">
          <Container>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {stats.map((stat, i) => (
                <div key={i} className="text-center">
                  <p className="text-3xl font-extrabold text-brand-teal">{stat.value}</p>
                  <p className="mt-1 text-sm font-medium text-gray-600 uppercase tracking-wide">{stat.label}</p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Rich Text Description */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {project.description && (
              <RichTextRenderer content={project.description as never} />
            )}
          </div>
        </Container>
      </section>

      {/* Photo Gallery */}
      {galleryImages.length > 0 && (
        <section className="pb-16">
          <Container>
            <div className="max-w-5xl mx-auto">
              <h2 className="text-2xl font-bold text-brand-teal-dark mb-8">Project Gallery</h2>
              <ProjectGallery images={galleryImages} />
            </div>
          </Container>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        heading="Want to get involved?"
        description="Join us and make a real difference for our planet."
        buttonLabel="Contact Us"
        buttonUrl="/contact"
      />

      {/* Back Link */}
      <section className="py-12">
        <Container>
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
          >
            &larr; Back to Home
          </Link>
        </Container>
      </section>
    </article>
  )
}
