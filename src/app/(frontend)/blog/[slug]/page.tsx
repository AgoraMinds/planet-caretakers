import { getPayload } from '@/lib/payload'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Container } from '@/components/layout/Container'
import { RichTextRenderer } from '@/components/rich-text/RichTextRenderer'
import type { Metadata } from 'next'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  
  try {
    const payload = await getPayload()
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 1,
    })
    const post = posts.docs[0]
    if (!post) return { title: 'Post Not Found' }

    const image = post.featuredImage && typeof post.featuredImage === 'object'
      ? (post.featuredImage as Record<string, string>)
      : null

    return {
      title: `${post.title} | Planet Caretakers`,
      description: post.excerpt as string,
      openGraph: {
        title: post.title as string,
        description: post.excerpt as string,
        images: image ? [{ url: image.url }] : [],
      },
    }
  } catch (error) {
    console.error('Failed to fetch metadata from Payload CMS:', error)
    return { title: 'Blog Post | Planet Caretakers' }
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  
  let post: any = null

  try {
    const payload = await getPayload()
    const posts = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: slug }, _status: { equals: 'published' } },
      limit: 1,
      depth: 2,
    })
    post = posts.docs[0]
  } catch (error) {
    console.error('Failed to fetch data from Payload CMS:', error)
  }

  if (!post) {
    return (
      <article>
        <section className="bg-brand-teal-dark py-16">
          <Container>
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
                Content Coming Soon
              </h1>
              <p className="mt-4 text-gray-300">
                This blog post is not yet available. Check back soon!
              </p>
            </div>
          </Container>
        </section>
        <section className="py-20">
          <Container>
            <div className="max-w-3xl mx-auto">
              <Link
                href="/blog"
                className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
              >
                &larr; Back to Blog
              </Link>
            </div>
          </Container>
        </section>
      </article>
    )
  }

  const image = post.featuredImage && typeof post.featuredImage === 'object'
    ? (post.featuredImage as Record<string, string>)
    : null
  const author = post.author && typeof post.author === 'object'
    ? (post.author as Record<string, string>)
    : null

  return (
    <article>
      {/* Header */}
      <section className="bg-brand-teal-dark py-16">
        <Container>
          <div className="max-w-3xl mx-auto text-center">
            {post.categories && (
              <div className="flex flex-wrap gap-2 justify-center mb-4">
                {(post.categories as string[]).map((cat) => (
                  <span key={cat} className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-gray-300">
                    {cat.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-extrabold text-white sm:text-4xl lg:text-5xl">
              {post.title as string}
            </h1>
            <div className="mt-4 flex items-center justify-center gap-4 text-sm text-gray-300">
              <span>
                {new Date(post.publishedDate as string).toLocaleDateString('en-US', {
                  month: 'long', day: 'numeric', year: 'numeric',
                })}
              </span>
              {author && <span>by {author.name}</span>}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured Image */}
      {image && (
        <div className="relative h-[400px] lg:h-[500px]">
          <Image
            src={image.url}
            alt={image.alt || (post.title as string)}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Content */}
      <section className="py-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            {post.content && (
              <RichTextRenderer content={post.content as never} />
            )}
          </div>
        </Container>
      </section>

      {/* Back Link */}
      <section className="pb-20">
        <Container>
          <div className="max-w-3xl mx-auto">
            <Link
              href="/blog"
              className="inline-flex items-center text-sm font-semibold text-brand-green hover:text-brand-green-light transition-colors"
            >
              &larr; Back to Blog
            </Link>
          </div>
        </Container>
      </section>
    </article>
  )
}
