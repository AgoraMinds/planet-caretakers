import type { MetadataRoute } from 'next'
import { getPayload } from '@/lib/payload'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://planetcaretakers.org'
  const payload = await getPayload()

  const [blogPosts, events] = await Promise.all([
    payload.find({
      collection: 'blog-posts',
      where: { _status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true, updatedAt: true },
    }),
    payload.find({
      collection: 'events',
      where: { _status: { equals: 'published' } },
      limit: 1000,
      select: { slug: true, updatedAt: true },
    }),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), priority: 1.0, changeFrequency: 'weekly' },
    { url: `${siteUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${siteUrl}/activities`, priority: 0.8, changeFrequency: 'weekly' },
    { url: `${siteUrl}/volunteers`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${siteUrl}/partners`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${siteUrl}/contact`, priority: 0.7, changeFrequency: 'yearly' },
    { url: `${siteUrl}/blog`, priority: 0.8, changeFrequency: 'weekly' },
  ]

  const blogUrls: MetadataRoute.Sitemap = blogPosts.docs.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.updatedAt as string),
    priority: 0.6,
    changeFrequency: 'monthly',
  }))

  const eventUrls: MetadataRoute.Sitemap = events.docs.map((event) => ({
    url: `${siteUrl}/events/${event.slug}`,
    lastModified: new Date(event.updatedAt as string),
    priority: 0.5,
    changeFrequency: 'weekly',
  }))

  return [...staticPages, ...blogUrls, ...eventUrls]
}
