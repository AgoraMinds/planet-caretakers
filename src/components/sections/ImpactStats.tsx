'use client'

import { useEffect, useRef, useState } from 'react'

type Stat = {
  value: string
  label: string
  suffix?: string | null
}

function AnimatedNumber({ target, suffix }: { target: number; suffix?: string | null }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const steps = 60
          const increment = target / steps
          let current = 0
          const timer = setInterval(() => {
            current += increment
            if (current >= target) {
              setCount(target)
              clearInterval(timer)
            } else {
              setCount(Math.floor(current))
            }
          }, duration / steps)
        }
      },
      { threshold: 0.3 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
      {suffix}
    </span>
  )
}

export function ImpactStats({ stats }: { stats: Stat[] }) {
  return (
    <section className="bg-brand-teal py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map((stat, i) => {
            const numericValue = parseInt(stat.value.replace(/[^0-9]/g, ''), 10) || 0
            return (
              <div key={i} className="text-center">
                <p className="text-4xl font-extrabold text-white sm:text-5xl">
                  <AnimatedNumber target={numericValue} suffix={stat.suffix} />
                </p>
                <p className="mt-2 text-sm font-medium text-gray-300 uppercase tracking-wide">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
