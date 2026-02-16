import Image from 'next/image'

type Partner = {
  name: string
  url?: string | null
  logo?: { url: string; alt?: string } | null
}

export function PartnerLogos({ partners, heading }: { partners: Partner[]; heading?: string }) {
  if (partners.length === 0) return null

  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {heading && (
          <h2 className="text-2xl font-bold text-brand-teal-dark text-center mb-10">{heading}</h2>
        )}
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
          {partners.map((partner) => (
            <div key={partner.name} className="flex items-center justify-center">
              {partner.logo ? (
                <a
                  href={partner.url || '#'}
                  target={partner.url ? '_blank' : undefined}
                  rel={partner.url ? 'noopener noreferrer' : undefined}
                  className="grayscale hover:grayscale-0 opacity-70 hover:opacity-100 transition-all"
                >
                  <Image
                    src={partner.logo.url}
                    alt={partner.logo.alt || partner.name}
                    width={120}
                    height={60}
                    className="h-12 w-auto object-contain"
                  />
                </a>
              ) : (
                <span className="text-sm font-medium text-gray-500">{partner.name}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
