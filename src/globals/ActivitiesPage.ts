import type { GlobalConfig } from 'payload'

export const ActivitiesPage: GlobalConfig = {
  slug: 'activities-page',
  label: 'Activities Page',
  admin: { group: 'Pages' },
  access: {
    read: () => true,
    update: ({ req: { user } }) => !!user,
  },
  fields: [
    {
      name: 'hero',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Activities' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'featuredProjectsSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Featured Projects' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'categoriesSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'What We Do' },
        { name: 'description', type: 'textarea' },
      ],
    },
    {
      name: 'eventsSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Upcoming Events' },
      ],
    },
  ],
}
