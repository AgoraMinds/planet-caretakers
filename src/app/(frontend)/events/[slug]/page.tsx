import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { formatDateTimeLong, formatDateLong, formatTime } from '@/lib/formatDate'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const payload = await getPayload()
    const events = await payload.find({
      collection: 'events',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 1,
    })
    const event = events.docs[0]
    if (!event) return { title: 'Event Not Found' }

    return {
      title: `${event.title} | Planet Caretakers`,
      description: `${event.type} event in ${(event.location as Record<string, string>)?.city || 'location TBD'}`,
    }
  } catch (error) {
    console.error('Failed to fetch metadata from Payload CMS:', error)
    return { title: 'Event | Planet Caretakers' }
  }
}

export default async function EventPage({ params }: Props) {
  const { slug } = await params
  
  let event: any = null

  try {
    const payload = await getPayload()
    const events = await payload.find({
      collection: 'events',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 2,
    })
    event = events.docs[0]
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
  }

  if (!event) {
    return (
      <article>
        <section className="bg-brand-teal-dark py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
                Event Coming Soon
              </h1>
              <p className="mt-4 text-gray-300">
                This event information is not yet available. Check back soon!
              </p>
            </div>
          </Container>
        </section>
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Link
                href="/activities"
                className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
              >
                &larr; Back to Activities
              </Link>
            </div>
          </Container>
        </section>
      </article>
    )
  }

  const image = event.featuredImage && typeof event.featuredImage === 'object'
    ? (event.featuredImage as Record<string, string>)
    : null
  const location = event.location as Record<string, unknown> | null
  const gallery = (event.gallery as { image: Record<string, string> }[]) || []

  return (
    <article>
      {/* Header */}
      <section className="bg-brand-teal-dark py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            <Badge
              label={(event.type as string).replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
              variant="teal"
              className="bg-white/10 text-white mb-4"
            />
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl">
              {event.title as string}
            </h1>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-sm text-gray-300">
              <span>
                {formatDateTimeLong(event.date as string)}
              </span>
              {location && (
                <span>{location.city as string}, {location.country as string}</span>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {image && (
        <div className="relative h-[400px] lg:h-[500px]">
          <Image
            src={image.url}
            alt={image.alt || (event.title as string)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main content */}
              <div className="lg:col-span-2">
                {event.description && (
                  <RichTextRenderer content={event.description as never} />
                )}
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="rounded-2xl bg-brand-sand-light p-6">
                  <h3 className="font-bold text-brand-teal-dark mb-4">Event Details</h3>
                  <dl className="space-y-3 text-sm">
                    <div>
                      <dt className="font-medium text-gray-500">Date</dt>
                      <dd className="text-gray-900">
                        {formatDateLong(event.date as string)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-500">Time</dt>
                      <dd className="text-gray-900">
                        {formatTime(event.date as string)}
                      </dd>
                    </div>
                    {location && (
                      <>
                        <div>
                          <dt className="font-medium text-gray-500">Location</dt>
                          <dd className="text-gray-900">{location.name as string}</dd>
                        </div>
                        {location.address && (
                          <div>
                            <dt className="font-medium text-gray-500">Address</dt>
                            <dd className="text-gray-900">{location.address as string}</dd>
                          </div>
                        )}
                      </>
                    )}
                    <div>
                      <dt className="font-medium text-gray-500">Type</dt>
                      <dd className="text-gray-900">
                        {(event.type as string).replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                      </dd>
                    </div>
                  </dl>

                  {event.registrationUrl && (
                    <div className="mt-6">
                      <Button
                        label="Register Now"
                        href={event.registrationUrl as string}
                        variant="primary"
                        size="lg"
                        className="w-full"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Gallery */}
            {gallery.length > 0 && (
              <div className="mt-16">
                <h2 className="text-2xl font-bold text-brand-teal-dark mb-8">Event Photos</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {gallery.map((item, i) => (
                    <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                      <Image
                        src={typeof item.image === 'object' ? item.image.url : ''}
                        alt={typeof item.image === 'object' ? item.image.alt || '' : ''}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Back Link */}
            <div className="mt-12">
              <Link
                href="/activities"
                className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
              >
                &larr; Back to Activities
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </article>
  )
}
