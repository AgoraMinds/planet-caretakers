import type { GlobalConfig } from 'payload'

export const VolunteersPage: GlobalConfig = {
  slug: 'volunteers-page',
  label: 'Volunteers Page',
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
        { name: 'heading', type: 'text', defaultValue: 'Our Volunteers' },
        { name: 'subtitle', type: 'textarea', defaultValue: "Choosing eco-friendly isn't just a choice; it's a commitment to a brighter, greener tomorrow." },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'portugalSection',
      type: 'group',
      label: 'Portugal Team',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Portugal Team Leaders' },
      ],
    },
    {
      name: 'worldwideSection',
      type: 'group',
      label: 'Worldwide Team',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Worldwide Leaders' },
      ],
    },
    {
      name: 'recruitmentCta',
      type: 'group',
      label: 'Recruitment Call-to-Action',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Want to get involved?' },
        { name: 'description', type: 'textarea', defaultValue: 'Join our team of volunteer leaders and make a difference in your community.' },
        {
          name: 'button',
          type: 'group',
          fields: [
            { name: 'label', type: 'text', defaultValue: 'Become a Volunteer' },
            { name: 'url', type: 'text', defaultValue: '/contact' },
          ],
        },
      ],
    },
  ],
}
