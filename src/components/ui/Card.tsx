import Link from 'next/link'

type CardProps = {
  children: React.ReactNode
  className?: string
  href?: string
}

export function Card({ children, className = '', href }: CardProps) {
  const classes = `rounded-2xl bg-white shadow-md overflow-hidden transition-shadow hover:shadow-lg ${className}`

  if (href) {
    return (
      <Link href={href} className={`block ${classes}`}>
        {children}
      </Link>
    )
  }

  return <div className={classes}>{children}</div>
}
