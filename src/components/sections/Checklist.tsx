import { Container } from '@/components/layout/Container'
import { SectionHeading } from '@/components/ui/SectionHeading'

type ChecklistItem = {
  item: string
  description?: string
}

type ChecklistProps = {
  heading?: string
  items: ChecklistItem[]
}

function CheckIcon() {
  return (
    <svg
      className="h-6 w-6 shrink-0 text-brand-green"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2.5}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
    </svg>
  )
}

export function Checklist({ heading = 'What to Bring', items }: ChecklistProps) {
  if (!items || items.length === 0) return null

  return (
    <section className="py-20">
      <Container>
        <SectionHeading title={heading} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {items.map((entry, i) => (
            <div key={i} className="flex gap-3">
              <CheckIcon />
              <div>
                <p className="font-bold text-brand-teal-dark">{entry.item}</p>
                {entry.description && (
                  <p className="mt-1 text-sm text-gray-600 leading-relaxed">{entry.description}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
