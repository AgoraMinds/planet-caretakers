import type { GlobalConfig } from 'payload'

export const AboutPage: GlobalConfig = {
  slug: 'about-page',
  label: 'About Page',
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
        { name: 'heading', type: 'text', defaultValue: 'About Us' },
        { name: 'subtitle', type: 'textarea' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'founderStory',
      type: 'group',
      label: 'Our Story',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Story' },
        { name: 'content', type: 'richText', required: true },
        { name: 'founderImage', type: 'upload', relationTo: 'media' },
        { name: 'founderName', type: 'text', defaultValue: 'Débora Sá' },
        { name: 'founderTitle', type: 'text', defaultValue: 'Founder & CEO' },
      ],
    },
    {
      name: 'vision',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Vision' },
        { name: 'content', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'priorityAreas',
      type: 'array',
      label: 'Key Priorities',
      maxRows: 5,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'image', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'teamSection',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Our Team' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
