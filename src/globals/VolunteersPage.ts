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
      name: 'howItWorks',
      type: 'group',
      label: 'How It Works',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'How to Become a Volunteer' },
        {
          name: 'steps',
          type: 'array',
          maxRows: 6,
          fields: [
            { name: 'title', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true },
          ],
        },
      ],
    },
    {
      name: 'codeOfConduct',
      type: 'group',
      label: 'Code of Conduct',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'Our Code of Conduct' },
        { name: 'content', type: 'richText' },
      ],
    },
    {
      name: 'whatToBring',
      type: 'group',
      label: 'What to Bring',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'What to Bring' },
        {
          name: 'items',
          type: 'array',
          maxRows: 12,
          fields: [
            { name: 'item', type: 'text', required: true },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    {
      name: 'safetyInfo',
      type: 'group',
      label: 'Safety & Insurance',
      fields: [
        { name: 'enabled', type: 'checkbox', defaultValue: true },
        { name: 'heading', type: 'text', defaultValue: 'Safety & Insurance' },
        { name: 'content', type: 'richText' },
        {
          name: 'insuranceNote',
          type: 'textarea',
          defaultValue:
            'All registered volunteers are covered by our volunteer insurance policy during official Planet Caretakers events.',
        },
      ],
    },
    {
      name: 'opportunities',
      type: 'array',
      label: 'Volunteer Opportunities',
      maxRows: 8,
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'description', type: 'textarea', required: true },
        { name: 'location', type: 'text' },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Beach Cleanup', value: 'beach-cleanup' },
            { label: 'Forest Cleanup', value: 'forest-cleanup' },
            { label: 'Urban Cleanup', value: 'urban-cleanup' },
            { label: 'Underwater Cleanup', value: 'underwater-cleanup' },
            { label: 'Reforestation', value: 'reforestation' },
            { label: 'Education', value: 'education' },
            { label: 'Team Leader', value: 'team-leader' },
          ],
        },
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
