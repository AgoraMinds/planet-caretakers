import Link from 'next/link'

type CTABannerProps = {
  heading: string
  description?: string | null
  buttonLabel: string
  buttonUrl: string
}

export function CTABanner({ heading, description, buttonLabel, buttonUrl }: CTABannerProps) {
  return (
    <section className="bg-brand-teal py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white sm:text-4xl">{heading}</h2>
        {description && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-gray-300">{description}</p>
        )}
        <div className="mt-8">
          <Link
            href={buttonUrl}
            className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
          >
            {buttonLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
