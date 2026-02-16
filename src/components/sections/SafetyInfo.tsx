import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

type SafetyInfoProps = {
  heading?: string
  content?: string
  insuranceNote?: string
}

function ShieldIcon() {
  return (
    <svg
      className="mx-auto h-12 w-12 text-brand-teal"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
      />
    </svg>
  )
}

export function SafetyInfo({
  heading = 'Safety & Insurance',
  content,
  insuranceNote,
}: SafetyInfoProps) {
  if (!content && !insuranceNote) return null

  return (
    <section className="py-20 bg-brand-sand-light">
      <Container>
        <div className="mb-8">
          <ShieldIcon />
        </div>
        <SectionHeading title={heading} />
        <div className="max-w-3xl mx-auto">
          {content && (
            <p className="text-gray-600 leading-relaxed text-center">{content}</p>
          )}
          {insuranceNote && (
            <div className="mt-8 rounded-xl bg-white border-l-4 border-brand-green p-6">
              <p className="text-sm text-gray-700 leading-relaxed">{insuranceNote}</p>
            </div>
          )}
        </div>
      </Container>
    </section>
  )
}
