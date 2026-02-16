import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

type FundraisingProject = {
  title: string
  raised: number
  goal: number
  currency?: string
}

export function FundraisingProgress({
  heading,
  subtitle,
  projects,
}: {
  heading?: string | null
  subtitle?: string | null
  projects: FundraisingProject[]
}) {
  if (projects.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <Container>
        {heading && (
          <SectionHeading
            title={heading}
            subtitle={subtitle}
          />
        )}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project, index) => {
            const percentage = Math.min(100, Math.round((project.raised / project.goal) * 100))
            const currency = project.currency || '$'
            
            return (
              <div key={index} className="rounded-2xl bg-brand-sand-light p-6 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4">{project.title}</h3>
                <div className="mb-2">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-brand-teal">{currency}{project.raised.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">of {currency}{project.goal.toLocaleString()}</span>
                  </div>
                </div>
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="absolute inset-y-0 left-0 bg-brand-green rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-brand-teal">{percentage}%</p>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
