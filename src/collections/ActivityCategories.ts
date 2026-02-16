import type { CollectionConfig } from 'payload'

export const ActivityCategories: CollectionConfig = {
  slug: 'activity-categories',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    description: 'Types of activities (Beach Cleanup, Reforestation, etc.).',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => !!user,
    update: ({ req: { user } }) => !!user,
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
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
    { name: 'description', type: 'textarea', required: true },
    { name: 'icon', type: 'upload', relationTo: 'media', required: true },
    { name: 'image', type: 'upload', relationTo: 'media', required: true },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
