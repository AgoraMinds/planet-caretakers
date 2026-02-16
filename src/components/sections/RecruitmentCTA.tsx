import { Container } from '../layout/Container'
import Link from 'next/link'

export function RecruitmentCTA({
  heading = 'Become a Planet Caretaker',
  description,
  buttonLabel = 'Join Us Today',
  buttonUrl = '/contact',
}: {
  heading?: string
  description?: string | null
  buttonLabel?: string
  buttonUrl?: string
}) {
  return (
    <section className="py-20 bg-brand-teal-dark text-white">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-6">{heading}</h2>
          <p className="text-lg text-gray-200 leading-relaxed mb-8">
            {description || 'Want to make a real difference? Join our community to help clean beaches, restore forests, protect wildlife, and raise environmental awareness. Your action counts — become a Planet Caretaker today!'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href={buttonUrl}
              className="inline-flex items-center justify-center rounded-full bg-brand-green px-8 py-4 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
            >
              {buttonLabel}
            </Link>
            <div className="text-sm text-gray-300">
              <p className="font-medium">Why Join?</p>
              <ul className="mt-2 space-y-1 text-left">
                <li>✓ Make immediate environmental impact</li>
                <li>✓ Connect with passionate people</li>
                <li>✓ Learn creative ways to reuse waste</li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
