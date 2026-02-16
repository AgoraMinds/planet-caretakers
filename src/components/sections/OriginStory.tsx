import { Container } from '../layout/Container'
import { SectionHeading } from '../ui/SectionHeading'

type Stat = {
  value: string
  label: string
  suffix?: string
}

export function OriginStory({
  heading = 'Where It All Began',
  subheading = "Let's help together",
  description,
  stats,
}: {
  heading?: string
  subheading?: string
  description?: string | null
  stats?: Stat[]
}) {
  const defaultDescription = `When we act together, help becomes healing. Every effort — big or small — creates ripples of change that reach far beyond what we can see. It starts with compassion, grows with collaboration, and blossoms into hope for communities, coastlines, and ecosystems that need our care.

Together, we can turn solidarity into action and empathy into restoration. Let's build a network of care that connects people, purpose, and planet — proving that when humanity unites, the Earth thrives too.`

  const defaultStats: Stat[] = [
    { value: '44', label: 'Garbage collected', suffix: 'Tons' },
    { value: '300', label: 'Cleaning Actions', suffix: '+' },
    { value: '25', label: 'Countries Worldwide', suffix: '+' },
    { value: '2000', label: 'Volunteers', suffix: '+' },
  ]

  const displayStats = stats && stats.length > 0 ? stats : defaultStats

  return (
    <section className="py-20 bg-brand-sand-light">
      <Container>
        <SectionHeading title={heading} subtitle={subheading} />
        <div className="mt-8 mx-auto max-w-3xl">
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {description || defaultDescription}
          </p>
        </div>
        
        {displayStats.length > 0 && (
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
            {displayStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-4xl md:text-5xl font-extrabold text-brand-teal">
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span className="text-2xl font-bold text-brand-green">
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <p className="mt-2 text-sm font-medium text-gray-600 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  )
}
