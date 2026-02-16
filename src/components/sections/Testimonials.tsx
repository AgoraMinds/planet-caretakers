import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'
import Image from 'next/image'

type Testimonial = {
  quote: string
  author: string
  role?: string | null
  photo?: { url: string; alt?: string } | null
}

export function Testimonials({
  heading = 'Words From Volunteers',
  subtitle,
  testimonials,
}: {
  heading?: string
  subtitle?: string | null
  testimonials: Testimonial[]
}) {
  if (testimonials.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading
          title={heading}
          subtitle={subtitle}
        />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="rounded-2xl bg-brand-sand-light p-8 shadow-sm"
            >
              <div className="flex items-center gap-4 mb-6">
                {testimonial.photo && (
                  <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
                    <Image
                      src={testimonial.photo.url}
                      alt={testimonial.photo.alt || testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-bold text-gray-900">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  )}
                </div>
              </div>
              <blockquote className="text-gray-700 leading-relaxed">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
