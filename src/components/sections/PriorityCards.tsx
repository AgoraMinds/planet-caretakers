import Image from 'next/image'

type Priority = {
  title: string
  description: string
  icon?: { url: string; alt: string } | null
}

export function PriorityCards({ priorities }: { priorities: Priority[] }) {
  return (
    <section className="py-20 bg-brand-sand-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {priorities.map((priority, i) => (
            <div
              key={i}
              className="rounded-2xl bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              {priority.icon && (
                <Image
                  src={priority.icon.url}
                  alt={priority.icon.alt || ''}
                  width={48}
                  height={48}
                  className="h-12 w-12 mb-4"
                />
              )}
              <h3 className="text-lg font-bold text-brand-teal-dark">{priority.title}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{priority.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
