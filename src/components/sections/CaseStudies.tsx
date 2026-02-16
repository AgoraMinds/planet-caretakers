import Image from 'next/image'
import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

type CaseStudy = {
  title: string
  partnerName: string
  challenge: string
  solution: string
  outcomes: string
  logo?: { url: string; alt?: string } | null
  image?: { url: string; alt?: string } | null
}

type CaseStudiesProps = {
  caseStudies: CaseStudy[]
  heading?: string
}

export function CaseStudies({ caseStudies, heading = 'Case Studies' }: CaseStudiesProps) {
  if (!caseStudies || caseStudies.length === 0) return null

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={heading} subtitle="See how our partners are making an impact" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((cs, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
            >
              {cs.image && (
                <div className="relative h-48">
                  <Image
                    src={cs.image.url}
                    alt={cs.image.alt || cs.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className="p-6">
                {cs.logo && (
                  <div className="mb-4">
                    <Image
                      src={cs.logo.url}
                      alt={cs.logo.alt || cs.partnerName}
                      width={120}
                      height={40}
                      className="h-8 w-auto object-contain"
                    />
                  </div>
                )}
                <h3 className="text-lg font-bold text-brand-teal-dark">{cs.title}</h3>
                <p className="mt-1 text-sm font-medium text-gray-500">{cs.partnerName}</p>

                <div className="mt-4 space-y-3">
                  <div>
                    <h4 className="text-xs font-bold text-brand-teal uppercase tracking-wide">Challenge</h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{cs.challenge}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-green uppercase tracking-wide">Solution</h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{cs.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-brand-teal-dark uppercase tracking-wide">Outcomes</h4>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">{cs.outcomes}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
