import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

type Step = {
  title: string
  description: string
}

type HowItWorksProps = {
  heading?: string
  steps: Step[]
}

export function HowItWorks({ heading = 'How to Become a Volunteer', steps }: HowItWorksProps) {
  if (!steps || steps.length === 0) return null

  return (
    <section className="py-20 bg-brand-sand-light">
      <Container>
        <SectionHeading title={heading} />
        <div className="relative max-w-3xl mx-auto">
          {steps.map((step, i) => (
            <div key={i} className="relative flex gap-6 pb-12 last:pb-0">
              {/* Dotted connector line */}
              {i < steps.length - 1 && (
                <div className="absolute left-6 top-12 bottom-0 w-px border-l-2 border-dashed border-brand-teal/30" />
              )}
              {/* Number circle */}
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand-teal text-white text-lg font-bold">
                {i + 1}
              </div>
              {/* Content */}
              <div className="pt-1">
                <h3 className="text-lg font-bold text-brand-teal-dark">{step.title}</h3>
                <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
