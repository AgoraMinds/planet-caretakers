const variants: Record<string, string> = {
  default: 'bg-brand-sand text-brand-teal-dark',
  green: 'bg-green-100 text-green-800',
  teal: 'bg-brand-teal/10 text-brand-teal',
  yellow: 'bg-yellow-100 text-yellow-800',
}

export function Badge({
  label,
  variant = 'default',
  className = '',
}: {
  label: string
  variant?: string
  className?: string
}) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
        variants[variant] || variants.default
      } ${className}`}
    >
      {label}
    </span>
  )
}
