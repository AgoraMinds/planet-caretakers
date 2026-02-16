import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

export function VideoSection({
  heading = 'Turning Care Into Action',
  subtitle,
  videoUrl,
}: {
  heading?: string
  subtitle?: string | null
  videoUrl?: string | null
}) {
  if (!videoUrl) return null

  return (
    <section className="py-20 bg-brand-sand-light">
      <Container>
        <SectionHeading
          title={heading}
          subtitle={subtitle || 'Watch how our commitment to the planet becomes real, hands-on action. Every action tells a story of responsibility, respect, and hope.'}
        />
        <div className="mt-12 mx-auto max-w-4xl">
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={videoUrl}
              title={heading}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
