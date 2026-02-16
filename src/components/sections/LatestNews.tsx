import Image from 'next/image'
import Link from 'next/link'
import { formatDate } from '@/lib/formatDate'

type BlogPost = {
  title: string
  slug: string
  excerpt: string
  publishedDate: string
  featuredImage?: { url: string; alt?: string } | null
  author?: { name: string } | null
}

export function LatestNews({ posts, heading = 'Latest News' }: { posts: BlogPost[]; heading?: string }) {
  if (posts.length === 0) return null

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-3xl font-bold text-brand-teal-dark">{heading}</h2>
          <Link href="/blog" className="text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors">
            View all &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage.url}
                    alt={post.featuredImage.alt || post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}
              <div className="p-5">
                <p className="text-xs text-gray-500">
                  {formatDate(post.publishedDate)}
                  {post.author && ` by ${post.author.name}`}
                </p>
                <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-brand-teal transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="mt-2 text-sm text-gray-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
