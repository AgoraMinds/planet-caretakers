import Link from 'next/link'
import { Container } from '../layout/Container'

type BookCallProps = {
  heading?: string
  description?: string
  calendlyUrl?: string
}

export function BookCall({
  heading = 'Ready to partner with us?',
  description = 'Schedule a call to discuss how we can work together.',
  calendlyUrl,
}: BookCallProps) {
  const href = calendlyUrl || '/contact'
  const isExternal = !!calendlyUrl

  return (
    <section className="bg-brand-teal-dark py-16">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
          {description && (
            <p className="mt-4 text-lg text-gray-300 leading-relaxed">{description}</p>
          )}
          <div className="mt-8">
            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
              >
                Book a Call
              </a>
            ) : (
              <Link
                href={href}
                className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
              >
                Book a Call
              </Link>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}
