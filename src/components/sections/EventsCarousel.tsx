import Image from 'next/image'
import Link from 'next/link'
import { formatDateShort } from '@/lib/formatDate'

type Event = {
  title: string
  slug: string
  date: string
  type: string
  featuredImage?: { url: string; alt?: string } | null
  location?: { name: string; city: string; country: string } | null
}

export function EventsCarousel({ events, heading = 'Upcoming Events' }: { events: Event[]; heading?: string }) {
  if (events.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-teal-dark text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <Link
              key={event.slug}
              href={`/events/${event.slug}`}
              className="group rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {event.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={event.featuredImage.url}
                    alt={event.featuredImage.alt || event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <span className="inline-flex items-center rounded-full bg-brand-sand px-3 py-1 text-xs font-medium text-brand-teal-dark">
                  {event.type.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                </span>
                <h3 className="mt-3 text-lg font-bold text-gray-900 group-hover:text-brand-teal transition-colors">
                  {event.title}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {formatDateShort(event.date)}
                </p>
                {event.location && (
                  <p className="mt-1 text-sm text-gray-500">
                    {event.location.city}, {event.location.country}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
