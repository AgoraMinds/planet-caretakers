import Link from 'next/link'
import { Container } from '@/components/layout/Container'

export default function NotFound() {
  return (
    <section className="py-32">
      <Container>
        <div className="text-center">
          <h1 className="text-6xl font-extrabold text-brand-teal">404</h1>
          <p className="mt-4 text-xl text-gray-600">Page not found</p>
          <p className="mt-2 text-gray-500">The page you are looking for does not exist or has been moved.</p>
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center rounded-full bg-brand-green px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-green-light transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
