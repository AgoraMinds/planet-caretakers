import Image from 'next/image'

type ProjectGalleryProps = {
  images: { url: string; alt?: string }[]
}

export function ProjectGallery({ images }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null

  return (
    <section className="py-12">
      <div className="grid grid-cols-2 gap-4">
        {images.map((image, i) => (
          <div
            key={i}
            className={`relative overflow-hidden rounded-xl ${
              i === 0 ? 'col-span-2 row-span-2 h-80 md:h-[400px]' : 'h-48 md:h-56'
            }`}
          >
            <Image
              src={image.url}
              alt={image.alt || ''}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  )
}
