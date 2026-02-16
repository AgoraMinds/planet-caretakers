import { getPayload } from '@/lib/payload'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Planet Caretakers',
  description: 'Latest news, stories, and updates from Planet Caretakers.',
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; category?: string }>
}) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const category = params.category

  let posts: any = { docs: [], totalPages: 1 }

  try {
    const payload = await getPayload()
    posts = await payload.find({
      collection: 'blog-posts',
      where: {
        _status: { equals: 'published' },
        ...(category ? { categories: { contains: category } } : {}),
      },
      sort: '-publishedDate',
      page: currentPage,
      limit: 9,
      depth: 2,
    })
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
    // Continue with empty/fallback data
  }

  const categories = ['news', 'events', 'impact-stories', 'tips', 'partnerships']

  return (
    <>
      <section className="bg-brand-teal-dark py-20">
        <Container>
          <h1 className="text-4xl font-extrabold text-white text-center">Blog</h1>
          <p className="mt-4 text-lg text-gray-300 text-center">
            Stories, news, and updates from our global community.
          </p>
        </Container>
      </section>

      <section className="py-12">
        <Container>
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10 justify-center">
            <Link
              href="/blog"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                !category ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/blog?category=${cat}`}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  category === cat ? 'bg-brand-teal text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
              </Link>
            ))}
          </div>

          {/* Posts Grid */}
          {posts.docs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.docs.map((post: any) => {
                const image = post.featuredImage && typeof post.featuredImage === 'object'
                  ? post.featuredImage as Record<string, string>
                  : null
                const author = post.author && typeof post.author === 'object'
                  ? post.author as Record<string, string>
                  : null

                return (
                  <Link
                    key={post.slug as string}
                    href={`/blog/${post.slug}`}
                    className="group rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    {image && (
                      <div className="relative h-48 overflow-hidden">
                        <Image
                          src={image.url}
                          alt={image.alt || (post.title as string)}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-5">
                      <p className="text-xs text-gray-500">
                        {new Date(post.publishedDate as string).toLocaleDateString('en-US', {
                          month: 'long', day: 'numeric', year: 'numeric',
                        })}
                        {author && ` by ${author.name}`}
                      </p>
                      <h2 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-brand-teal transition-colors line-clamp-2">
                        {post.title as string}
                      </h2>
                      <p className="mt-2 text-sm text-gray-600 line-clamp-3">
                        {post.excerpt as string}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">No posts available yet.</p>
              <p className="text-sm text-gray-400">Check back soon for updates and stories from Planet Caretakers!</p>
            </div>
          )}

          {/* Pagination */}
          {posts.totalPages > 1 && (
            <div className="mt-12 flex items-center justify-center gap-2">
              {Array.from({ length: posts.totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={`/blog?page=${page}${category ? `&category=${category}` : ''}`}
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                    page === currentPage
                      ? 'bg-brand-teal text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
