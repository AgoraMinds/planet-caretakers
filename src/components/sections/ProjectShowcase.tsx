import Image from 'next/image'
import Link from 'next/link'

type Project = {
  title: string
  slug: string
  subtitle?: string | null
  featuredImage?: { url: string; alt?: string } | null
  stats?: { label: string; value: string }[]
}

export function ProjectShowcase({ projects, heading = 'Featured Projects' }: { projects: Project[]; heading?: string }) {
  if (projects.length === 0) return null

  return (
    <section className="py-20 bg-brand-sand-light">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-brand-teal-dark text-center mb-12">{heading}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {project.featuredImage && (
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={project.featuredImage.url}
                    alt={project.featuredImage.alt || project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                {project.subtitle && <p className="mt-1 text-gray-600">{project.subtitle}</p>}
                {project.stats && project.stats.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-4">
                    {project.stats.map((stat, i) => (
                      <div key={i} className="text-center">
                        <p className="text-lg font-bold text-brand-teal">{stat.value}</p>
                        <p className="text-xs text-gray-500">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
