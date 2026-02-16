import type { CollectionConfig } from 'payload'

export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'publishedDate', 'author'],
    group: 'Content',
    description: 'News articles and blog posts.',
  },
  versions: {
    drafts: {
      autosave: { interval: 300 },
    },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      return { _status: { equals: 'published' } }
    },
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  hooks: {
    afterChange: [
      async ({ doc }) => {
        const { revalidatePath } = await import('next/cache')
        revalidatePath('/blog')
        revalidatePath(`/blog/${doc.slug}`)
        revalidatePath('/')
      },
    ],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: { position: 'sidebar', description: 'URL-friendly identifier.' },
      hooks: {
        beforeValidate: [
          ({ data, value }) => {
            if (!value && data?.title) {
              return data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
            }
            return value
          },
        ],
      },
    },
    { name: 'featuredImage', type: 'upload', relationTo: 'media', required: true },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 300,
      admin: { description: 'Short summary for cards and SEO. Max 300 characters.' },
    },
    { name: 'content', type: 'richText', required: true },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'team-members',
      admin: { position: 'sidebar' },
    },
    {
      name: 'categories',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'News', value: 'news' },
        { label: 'Events', value: 'events' },
        { label: 'Impact Stories', value: 'impact-stories' },
        { label: 'Tips', value: 'tips' },
        { label: 'Partnerships', value: 'partnerships' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedDate',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' } },
    },
  ],
}
