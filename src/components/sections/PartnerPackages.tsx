import Link from 'next/link'
import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

type Package = {
  name: string
  tagline?: string
  features: { feature: string }[]
  ctaLabel: string
  ctaUrl: string
  highlighted: boolean
}

type PartnerPackagesProps = {
  packages: Package[]
  heading?: string
}

export function PartnerPackages({ packages, heading = 'Partnership Packages' }: PartnerPackagesProps) {
  if (!packages || packages.length === 0) return null

  const gridCols =
    packages.length === 1
      ? 'max-w-md mx-auto'
      : packages.length === 2
        ? 'grid-cols-1 sm:grid-cols-2 max-w-3xl mx-auto'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={heading} subtitle="Choose the partnership tier that fits your organization" />
        <div className={`grid gap-8 ${gridCols}`}>
          {packages.map((pkg, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 ${
                pkg.highlighted
                  ? 'bg-brand-teal text-white scale-105 ring-2 ring-brand-teal shadow-xl'
                  : 'bg-white border border-gray-200 hover:shadow-lg hover:border-brand-teal hover:-translate-y-1'
              }`}
            >
              {pkg.highlighted && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-green px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">
                  Recommended
                </span>
              )}
              <h3 className={`text-xl font-bold ${pkg.highlighted ? 'text-white' : 'text-brand-teal-dark'}`}>
                {pkg.name}
              </h3>
              {pkg.tagline && (
                <p className={`mt-1 text-sm ${pkg.highlighted ? 'text-gray-200' : 'text-gray-500'}`}>
                  {pkg.tagline}
                </p>
              )}
              <ul className="mt-6 space-y-3">
                {pkg.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm">
                    <svg
                      className={`mt-0.5 h-5 w-5 flex-shrink-0 ${pkg.highlighted ? 'text-brand-green-light' : 'text-brand-green'}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span className={pkg.highlighted ? 'text-gray-100' : 'text-gray-700'}>{f.feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <Link
                  href={pkg.ctaUrl}
                  className={`inline-flex w-full items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
                    pkg.highlighted
                      ? 'bg-white text-brand-teal hover:bg-gray-100'
                      : 'bg-brand-green text-white hover:bg-brand-green-light'
                  }`}
                >
                  {pkg.ctaLabel}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
