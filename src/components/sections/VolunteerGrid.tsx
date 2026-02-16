import Image from 'next/image'

type Volunteer = {
  name: string
  location: string
  country: string
  photo?: { url: string; alt?: string } | null
  contact?: {
    instagram?: string | null
    email?: string | null
  } | null
}

export function VolunteerGrid({
  title,
  volunteers,
}: {
  title: string
  volunteers: Volunteer[]
}) {
  if (volunteers.length === 0) return null

  return (
    <div className="mb-16">
      <h3 className="text-2xl font-bold text-brand-teal-dark mb-8">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {volunteers.map((v) => (
          <div key={v.name} className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-sm">
            <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-full bg-gray-200">
              {v.photo && (
                <Image
                  src={v.photo.url}
                  alt={v.photo.alt || v.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{v.name}</p>
              <p className="text-xs text-gray-500">{v.location}, {v.country}</p>
              <div className="mt-1 flex items-center gap-2">
                {v.contact?.instagram && (
                  <a href={v.contact.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-teal" aria-label="Instagram">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                )}
                {v.contact?.email && (
                  <a href={`mailto:${v.contact.email}`} className="text-gray-400 hover:text-brand-teal" aria-label="Email">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
