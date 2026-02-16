import type { GlobalConfig } from 'payload'

export const PartnersPage: GlobalConfig = {
  slug: 'partners-page',
  label: 'Partners Page',
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
        { name: 'heading', type: 'text', defaultValue: 'Corporate Partners' },
        { name: 'subtitle', type: 'textarea', defaultValue: 'Be the brand that acts — not just talks. Join us in restoring the planet.' },
        { name: 'backgroundImage', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'partnershipPitch',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Partner With Us' },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      name: 'benefits',
      type: 'array',
      label: 'Partnership Benefits',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'icon', type: 'upload', relationTo: 'media' },
      ],
    },
    {
      name: 'originStory',
      type: 'group',
      label: 'Where It All Began Section',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'Where It All Began' },
        { name: 'subheading', type: 'text', defaultValue: "Let's help together" },
        { name: 'description', type: 'textarea' },
        {
          name: 'stats',
          type: 'array',
          label: 'Impact Statistics',
          maxRows: 6,
          fields: [
            { name: 'value', type: 'text', required: true },
            { name: 'label', type: 'text', required: true },
            { name: 'suffix', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'cta',
      type: 'group',
      fields: [
        { name: 'heading', type: 'text', defaultValue: 'Ready to make a difference?' },
        { name: 'description', type: 'textarea' },
        { name: 'buttonLabel', type: 'text', defaultValue: "Let's Go!" },
        { name: 'buttonUrl', type: 'text', defaultValue: '/contact' },
      ],
    },
  ],
}
