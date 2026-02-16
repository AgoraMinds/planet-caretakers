import type { CollectionConfig } from 'payload'

export const Events: CollectionConfig = {
  slug: 'events',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'date', 'location', 'status'],
    group: 'Content',
    description: 'Cleanup events, meetups, and activities.',
  },
  versions: { drafts: true },
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
        revalidatePath('/activities')
        revalidatePath('/')
        revalidatePath(`/events/${doc.slug}`)
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
      admin: { position: 'sidebar' },
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
    { name: 'description', type: 'richText', required: true },
    {
      name: 'date',
      type: 'date',
      required: true,
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'endDate',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayAndTime' }, description: 'Optional. For multi-day events.' },
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        { name: 'name', type: 'text', required: true, label: 'Location Name' },
        { name: 'address', type: 'text' },
        { name: 'city', type: 'text', required: true },
        { name: 'country', type: 'text', required: true },
        {
          name: 'coordinates',
          type: 'group',
          admin: { description: 'Optional. For map display.' },
          fields: [
            { name: 'lat', type: 'number' },
            { name: 'lng', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Beach Cleanup', value: 'beach-cleanup' },
        { label: 'Forest Cleanup', value: 'forest-cleanup' },
        { label: 'Urban Cleanup', value: 'urban-cleanup' },
        { label: 'Reforestation', value: 'reforestation' },
        { label: 'Invasive Plant Removal', value: 'invasive-removal' },
        { label: 'Illegal Dumping', value: 'illegal-dumping' },
        { label: 'Underwater Cleanup', value: 'underwater-cleanup' },
        { label: 'Other', value: 'other' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'registrationUrl',
      type: 'text',
      label: 'Registration Link',
      admin: { description: 'External URL for event sign-up.' },
    },
    {
      name: 'gallery',
      type: 'array',
      label: 'Event Photos',
      admin: { description: 'Add photos after the event.' },
      fields: [
        { name: 'image', type: 'upload', relationTo: 'media', required: true },
      ],
    },
  ],
}
