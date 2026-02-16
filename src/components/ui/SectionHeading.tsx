type SectionHeadingProps = {
  title: string
  subtitle?: string | null
  align?: 'left' | 'center'
  light?: boolean
  className?: string
}

export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  return (
    <div
      className={`mb-12 ${align === 'center' ? 'text-center mx-auto max-w-2xl' : ''} ${className}`}
    >
      <h2
        className={`text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? 'text-white' : 'text-brand-teal-dark'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
