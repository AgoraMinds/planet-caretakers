import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

type Milestone = {
  year: string
  title: string
  description: string
  stat?: string | null
}

export function ImpactTimeline({
  heading = 'Our Journey',
  milestones,
}: {
  heading?: string
  milestones: Milestone[]
}) {
  if (milestones.length === 0) return null

  return (
    <section className="py-20 bg-white">
      <Container>
        <SectionHeading title={heading} />

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-brand-teal md:-translate-x-px" />

          <div className="space-y-12">
            {milestones.map((milestone, index) => {
              const isLeft = index % 2 === 0

              return (
                <div key={index} className="relative flex items-start">
                  {/* Desktop layout: alternating sides */}
                  {/* Left content area */}
                  <div className="hidden md:flex w-1/2 justify-end pr-10">
                    {isLeft && (
                      <MilestoneCard
                        title={milestone.title}
                        description={milestone.description}
                        stat={milestone.stat}
                        align="right"
                      />
                    )}
                  </div>

                  {/* Year circle (centered on line) */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-brand-teal text-white text-xs font-bold shadow-lg">
                    {milestone.year}
                  </div>

                  {/* Right content area */}
                  <div className="hidden md:flex w-1/2 pl-10">
                    {!isLeft && (
                      <MilestoneCard
                        title={milestone.title}
                        description={milestone.description}
                        stat={milestone.stat}
                        align="left"
                      />
                    )}
                  </div>

                  {/* Mobile layout: always right-aligned */}
                  <div className="md:hidden ml-16">
                    <MilestoneCard
                      title={milestone.title}
                      description={milestone.description}
                      stat={milestone.stat}
                      align="left"
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

function MilestoneCard({
  title,
  description,
  stat,
  align,
}: {
  title: string
  description: string
  stat?: string | null
  align: 'left' | 'right'
}) {
  return (
    <div
      className={`rounded-2xl bg-white p-6 shadow-md border border-gray-100 max-w-md ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      <h3 className="text-lg font-bold text-brand-teal-dark">{title}</h3>
      <p className="mt-2 text-sm text-gray-600 leading-relaxed">{description}</p>
      {stat && (
        <span className="mt-3 inline-block rounded-full bg-brand-teal/10 px-3 py-1 text-xs font-semibold text-brand-teal">
          {stat}
        </span>
      )}
    </div>
  )
}
