import Link from 'next/link'

type ButtonProps = {
  label: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
}

const variants = {
  primary:
    'bg-brand-green text-white shadow-sm hover:bg-brand-green-light',
  secondary:
    'bg-brand-teal text-white shadow-sm hover:bg-brand-teal-light',
  outline:
    'border-2 border-white text-white hover:bg-white/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-sm',
  lg: 'px-8 py-3 text-base',
}

export function Button({
  label,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  type = 'button',
  onClick,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center rounded-full font-semibold transition-colors ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {label}
    </button>
  )
}
