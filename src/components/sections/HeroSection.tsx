import Link from 'next/link'

type HeroSectionProps = {
  tagline: string
  subtitle?: string | null
  backgroundImageUrl?: string | null
  primaryCta?: { label: string; url: string } | null
  secondaryCta?: { label: string; url: string } | null
  overlay?: boolean
}

export function HeroSection({
  tagline,
  subtitle,
  backgroundImageUrl,
  primaryCta,
  secondaryCta,
  overlay = true,
}: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden bg-brand-teal-dark">
      {backgroundImageUrl && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        />
      )}
      {overlay && <div className="absolute inset-0 bg-brand-teal-dark/70" />}
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          {tagline}
        </h1>
        {subtitle && (
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-200 leading-relaxed">
            {subtitle}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.url}
                className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-base font-semibold text-white shadow-lg hover:bg-brand-green-light transition-colors"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.url}
                className="inline-flex items-center rounded-full border-2 border-white px-8 py-3 text-base font-semibold text-white hover:bg-white/10 transition-colors"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
