import Image from 'next/image'

type Category = {
  title: string
  description: string
  icon?: { url: string; alt?: string } | null
  image?: { url: string; alt?: string } | null
}

export function ActivityCategoryGrid({ categories, heading = 'What We Do' }: { categories: Category[]; heading?: string }) {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-teal-dark text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat) => (
            <div key={cat.title} className="relative group rounded-2xl overflow-hidden h-56 shadow-md">
              {cat.image && (
                <Image
                  src={cat.image.url}
                  alt={cat.image.alt || cat.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                <h3 className="text-lg font-bold">{cat.title}</h3>
                <p className="mt-1 text-sm text-gray-200 line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
